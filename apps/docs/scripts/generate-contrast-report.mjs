#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadJson,
  loadTokenTree,
  resolveToken,
  contrastRatio,
} from "../../../packages/ds/scripts/token-lib.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "src", "data");
mkdirSync(outDir, { recursive: true });

const semantic = loadJson("semantic.json");
const pairs = semantic.$extensions?.["org.soluciones-alexendros.contrastPairs"] ?? [];
const tree = loadTokenTree();
const report = [];

for (const theme of ["light", "dark"]) {
  for (const pair of pairs) {
    const fg = resolveToken(tree, `color.${theme}.${pair.foreground}`);
    const bg = resolveToken(tree, `color.${theme}.${pair.background}`);
    const ratio = contrastRatio(fg, bg);
    const min = pair.level === "ui" || pair.level === "large" ? 3 : 4.5;
    report.push({
      theme,
      name: pair.name,
      foreground: fg,
      background: bg,
      ratio: Number(ratio.toFixed(3)),
      min,
      ok: ratio >= min,
    });
  }
}

writeFileSync(join(outDir, "contrast-report.json"), JSON.stringify(report, null, 2));
console.log(`Wrote ${report.length} contrast rows → src/data/contrast-report.json`);
