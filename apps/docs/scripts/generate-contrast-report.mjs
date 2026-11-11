#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadContrastPairs,
  loadTokenTree,
  listBrands,
  resolveToken,
  contrastRatio,
  apcaContrast,
} from "../../../packages/ds/scripts/token-lib.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "src", "data");
mkdirSync(outDir, { recursive: true });

const config = loadContrastPairs();
const pairs = config.pairs ?? [];
const margin = {
  normal: config.margin?.normal ?? 4.6,
  large: config.margin?.large ?? 3.0,
  ui: config.margin?.ui ?? 3.0,
};
const report = [];

for (const brand of listBrands()) {
  const tree = loadTokenTree({ brand });
  for (const theme of ["light", "dark"]) {
    for (const pair of pairs) {
      const pairId = pair.id ?? `${pair.foreground}/${pair.background}`;
      const fg = resolveToken(tree, `color.${theme}.${pair.foreground}`);
      const bg = resolveToken(tree, `color.${theme}.${pair.background}`);
      const ratio = contrastRatio(fg, bg);
      const level =
        pair.level === "ui" || pair.level === "large" ? pair.level : "normal";
      const min = margin[level] ?? margin.normal;
      const exempt = pair.exempt === true;
      report.push({
        brand,
        theme,
        id: pairId,
        name: pairId,
        foreground: fg,
        background: bg,
        ratio: Number(ratio.toFixed(3)),
        min,
        level,
        exempt,
        apca: apcaContrast(fg, bg),
        ok: exempt || ratio >= min,
        status: exempt ? "EXEMPT" : ratio >= min ? "PASS" : "FAIL",
      });
    }
  }
}

writeFileSync(
  join(outDir, "contrast-report.json"),
  JSON.stringify(report, null, 2)
);
console.log(
  `Wrote ${report.length} contrast rows → src/data/contrast-report.json`
);
