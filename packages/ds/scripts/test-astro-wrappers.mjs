#!/usr/bin/env node
/** F3-05: Astro wrappers delegate to renderX via set:html. */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const names = [
  "Button",
  "Input",
  "Card",
  "Alert",
  "Link",
  "Stack",
  "Field",
  "Select",
  "Checkbox",
  "Banner",
  "ThemeToggle",
];
let failed = 0;
for (const name of names) {
  const src = readFileSync(join(root, "src/astro", `${name}.astro`), "utf8");
  if (!src.includes(`render${name}`) || !src.includes("set:html={html}")) {
    console.error(`FAIL Astro ${name}`);
    failed += 1;
  } else console.log(`OK  Astro ${name}`);
}
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
for (const key of ["./tokens.css", "./theme", "./css", "./astro"]) {
  if (!pkg.exports[key]) {
    console.error(`FAIL exports ${key}`);
    failed += 1;
  } else console.log(`OK  exports ${key}`);
}
if (pkg.exports["./tokens.css"] !== "./dist/styles.css") {
  console.error("FAIL tokens.css alias");
  failed += 1;
} else console.log("OK  tokens.css → styles.css");
if (
  readdirSync(join(root, "src/astro")).filter((f) => f.endsWith(".astro"))
    .length < names.length
) {
  console.error("FAIL Astro count");
  failed += 1;
}
process.exit(failed ? 1 : 0);
