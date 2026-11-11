#!/usr/bin/env node
/**
 * DTCG → dist/styles.css (--ds-*) + dist/tokens.d.ts + copy theme-boot.
 * Includes :root, [data-theme="dark"], [data-brand], and prefers-color-scheme.
 */
import { mkdirSync, writeFileSync, readFileSync, cpSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import {
  loadTokenTree,
  listBrands,
  walkTokens,
  resolveToken,
  cssVarName,
  formatCssValue,
  REPO_ROOT,
} from "./token-lib.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(__dirname, "..");
const dist = join(pkgRoot, "dist");

const validate = spawnSync(
  process.execPath,
  [join(REPO_ROOT, "scripts", "validate-dtcg.mjs")],
  { encoding: "utf8" }
);
if (validate.status !== 0) {
  console.error(validate.stdout);
  console.error(validate.stderr);
  console.error("Build aborted: invalid DTCG tokens");
  process.exit(1);
}

mkdirSync(dist, { recursive: true });

function collectDecls(tree) {
  const lightDecls = [];
  const darkDecls = [];
  const sharedDecls = [];
  const typeNames = new Set();

  walkTokens(tree, "", undefined, (path) => {
    if (path.startsWith("color.light.")) {
      const name = cssVarName(path, "light");
      const value = formatCssValue(resolveToken(tree, path));
      lightDecls.push(`  ${name}: ${value};`);
      typeNames.add(name);
      return;
    }
    if (path.startsWith("color.dark.")) {
      const name = cssVarName(path, "dark");
      const value = formatCssValue(resolveToken(tree, path));
      darkDecls.push(`  ${name}: ${value};`);
      typeNames.add(name);
      return;
    }
    if (path.startsWith("color.")) return;

    const name = cssVarName(path);
    const value = formatCssValue(resolveToken(tree, path));
    sharedDecls.push(`  ${name}: ${value};`);
    typeNames.add(name);
  });

  lightDecls.sort();
  darkDecls.sort();
  sharedDecls.sort();
  return { lightDecls, darkDecls, sharedDecls, typeNames };
}

const defaultTree = loadTokenTree({ brand: "default" });
const { lightDecls, darkDecls, sharedDecls, typeNames } =
  collectDecls(defaultTree);

const brandBlocks = [];
for (const brand of listBrands()) {
  if (brand === "default") continue;
  const brandTree = loadTokenTree({ brand });
  const brandDecls = collectDecls(brandTree);
  brandBlocks.push(`
[data-brand="${brand}"] {
${brandDecls.lightDecls.join("\n")}
}

[data-theme="dark"][data-brand="${brand}"] {
${brandDecls.darkDecls.join("\n")}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"])[data-brand="${brand}"] {
${brandDecls.darkDecls.join("\n")}
  }
}
`);
  for (const n of brandDecls.typeNames) typeNames.add(n);
}

const css = `/* Generated from DTCG tokens — do not edit by hand */
:root {
${sharedDecls.join("\n")}
${lightDecls.join("\n")}
}

[data-theme="dark"] {
${darkDecls.join("\n")}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${darkDecls.join("\n")}
  }
}
${brandBlocks.join("")}`;

writeFileSync(join(dist, "styles.css"), css, "utf8");

const dts = `/* Generated from DTCG tokens — do not edit by hand */
export type DsCssVar =
${[...typeNames]
  .sort()
  .map((n) => `  | "${n}"`)
  .join("\n")};

export type ThemeMode = "light" | "dark" | "system";

export declare function setTheme(mode: ThemeMode | string): ThemeMode;
`;

writeFileSync(join(dist, "tokens.d.ts"), dts, "utf8");

const themeSrc = readFileSync(join(pkgRoot, "src", "theme.js"), "utf8");
writeFileSync(join(dist, "index.js"), themeSrc, "utf8");
writeFileSync(
  join(dist, "index.d.ts"),
  `export type ThemeMode = "light" | "dark" | "system";\nexport declare function setTheme(mode: ThemeMode | string): ThemeMode;\n`,
  "utf8"
);
writeFileSync(
  join(dist, "theme.d.ts"),
  `export type ThemeMode = "light" | "dark" | "system";\nexport declare function setTheme(mode: ThemeMode | string): ThemeMode;\n`,
  "utf8"
);
cpSync(join(pkgRoot, "src", "theme.js"), join(dist, "theme.js"));

cpSync(join(pkgRoot, "src", "components"), join(dist, "components"), {
  recursive: true,
});

if (!css.includes("--ds-color-bg-primary")) {
  console.error("Generated CSS missing --ds-color-bg-primary");
  process.exit(1);
}
if (!css.includes("oklch(")) {
  console.error("Generated CSS missing OKLCH values");
  process.exit(1);
}
if (!css.includes("@media (prefers-color-scheme: dark)")) {
  console.error("Generated CSS missing prefers-color-scheme media query");
  process.exit(1);
}
if (!css.includes("--ds-motion-duration-normal")) {
  console.error("Generated CSS missing motion duration tokens");
  process.exit(1);
}
if (!css.includes("--ds-border-width-hairline")) {
  console.error("Generated CSS missing border-width tokens");
  process.exit(1);
}
if (!css.includes('[data-brand="archmaker"]')) {
  console.error("Generated CSS missing archmaker brand block");
  process.exit(1);
}

console.log(
  `Wrote ${join(dist, "styles.css")} (${lightDecls.length} light, ${darkDecls.length} dark, ${sharedDecls.length} shared, brands=${listBrands().join(",")})`
);
console.log(`Wrote ${join(dist, "tokens.d.ts")} (${typeNames.size} vars)`);
