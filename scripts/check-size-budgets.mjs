#!/usr/bin/env node
/**
 * F5-07 / G-SITE size budgets:
 * - tokens.css / styles.css ≤ 8 KiB gzip
 * - theme-boot.js ≤ 1 KiB raw (before paint)
 *
 * Run: npm run test:budgets  (requires dist/ from build)
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "packages", "ds", "dist");

const STYLES_GZIP_MAX = 8 * 1024;
const THEME_BOOT_RAW_MAX = 1024;

let failed = 0;

function fail(msg) {
  console.error(`FAIL ${msg}`);
  failed += 1;
}

function ok(msg) {
  console.log(`OK  ${msg}`);
}

const stylesPath = join(dist, "styles.css");
if (!existsSync(stylesPath)) {
  fail(
    `missing ${stylesPath} — run npm run build -w @soluciones-alexendros/ds`
  );
} else {
  const raw = readFileSync(stylesPath);
  const gzipBytes = gzipSync(raw).length;
  const label = `styles.css / tokens.css gzip ${gzipBytes}B (budget ${STYLES_GZIP_MAX}B; raw ${raw.length}B)`;
  if (gzipBytes > STYLES_GZIP_MAX) fail(label);
  else ok(label);
}

const bootPath = join(dist, "theme-boot.js");
if (!existsSync(bootPath)) {
  fail(`missing ${bootPath}`);
} else {
  const rawBytes = statSync(bootPath).size;
  const gzipBytes = gzipSync(readFileSync(bootPath)).length;
  const label = `theme-boot.js raw ${rawBytes}B (budget ${THEME_BOOT_RAW_MAX}B; gzip ${gzipBytes}B)`;
  if (rawBytes > THEME_BOOT_RAW_MAX) fail(label);
  else ok(label);
}

if (failed) process.exit(1);
console.log("size budgets PASS");
