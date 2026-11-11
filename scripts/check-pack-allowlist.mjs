#!/usr/bin/env node
/**
 * F4-02: npm pack contents must match the public allowlist (G-CONS prep).
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync, existsSync } from "node:fs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkgJson = JSON.parse(
  readFileSync(join(root, "packages/ds/package.json"), "utf8")
);

const required = [
  "package.json",
  "dist/styles.css",
  "dist/css/components.css",
  "dist/css/layers.css",
  "dist/theme.js",
  "dist/theme-boot.js",
  "dist/index.js",
  "dist/tokens.d.ts",
  "src/astro/Button.astro",
  "src/astro/index.js",
  "src/react/index.js",
  "src/react/primitives.js",
  "src/components/Button.js",
  "src/theme.js",
];

const forbiddenPrefixes = ["scripts/", "test/", "node_modules/", ".changeset/"];
const forbiddenExact = new Set(["src/components.md"]);

if (!existsSync(join(root, "packages/ds/dist/styles.css"))) {
  const build = spawnSync(
    "npm",
    ["run", "build", "-w", "@soluciones-alexendros/ds"],
    {
      cwd: root,
      encoding: "utf8",
    }
  );
  if (build.status !== 0) {
    console.error(build.stdout, build.stderr);
    process.exit(1);
  }
}

const result = spawnSync(
  "npm",
  [
    "pack",
    "--dry-run",
    "--ignore-scripts",
    "-w",
    "@soluciones-alexendros/ds",
    "--json",
  ],
  { cwd: root, encoding: "utf8" }
);

if (result.status !== 0) {
  console.error(result.stdout);
  console.error(result.stderr);
  process.exit(1);
}

const packs = JSON.parse(result.stdout);
const pack = Array.isArray(packs) ? packs[0] : packs;
const files = new Set((pack.files || []).map((f) => f.path));

let failed = 0;
function fail(msg) {
  console.error(`FAIL  ${msg}`);
  failed += 1;
}
function ok(msg) {
  console.log(`OK    ${msg}`);
}

for (const path of required) {
  if (!files.has(path)) fail(`missing required ${path}`);
  else ok(`required ${path}`);
}

for (const path of files) {
  if (forbiddenExact.has(path)) fail(`forbidden exact ${path}`);
  for (const prefix of forbiddenPrefixes) {
    if (path === prefix.slice(0, -1) || path.startsWith(prefix)) {
      fail(`forbidden ${path}`);
    }
  }
}

for (const key of [
  ".",
  "./styles.css",
  "./tokens.css",
  "./theme",
  "./theme-boot",
  "./css",
  "./astro",
  "./react",
]) {
  if (!pkgJson.exports?.[key]) fail(`exports missing ${key}`);
  else ok(`exports ${key}`);
}

if (!pkgJson.files?.includes("dist")) fail('files missing "dist"');
else ok('files includes "dist"');
if (!pkgJson.files?.some((f) => f.startsWith("src"))) {
  fail("files missing src entries");
} else ok("files includes src entries");

console.log(`pack files counted: ${files.size}`);
if (failed) {
  console.error(`FAIL check-pack-allowlist (${failed})`);
  process.exit(1);
}
console.log("PASS check-pack-allowlist");
