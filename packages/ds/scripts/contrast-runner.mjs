#!/usr/bin/env node
/**
 * Contrast runner — OKLCH → sRGB → WCAG relative contrast.
 * Thresholds from tokens/contrast.pairs.json `margin` (AA + margin).
 * exempt pairs report EXEMPT and never fail CI.
 * APCA field is informational only (ignored for exit code).
 * Use --inject-fail to verify the runner fails on a bad pair.
 */
import {
  loadContrastPairs,
  loadTokenTree,
  listBrands,
  resolveToken,
  contrastRatio,
  apcaContrast,
} from "./token-lib.mjs";

const injectFail = process.argv.includes("--inject-fail");

const config = loadContrastPairs();
const pairs = config.pairs;
if (!Array.isArray(pairs) || pairs.length === 0) {
  console.error("No contrast pairs defined in tokens/contrast.pairs.json");
  process.exit(1);
}

const margin = {
  normal: config.margin?.normal ?? 4.6,
  large: config.margin?.large ?? 3.0,
  ui: config.margin?.ui ?? 3.0,
};

const themes = ["light", "dark"];
const brands = listBrands();
const report = [];
let failed = false;

for (const brand of brands) {
  const tree = loadTokenTree({ brand });
  for (const theme of themes) {
    for (const pair of pairs) {
      const pairId = pair.id ?? `${pair.foreground}/${pair.background}`;
      const fgPath = `color.${theme}.${pair.foreground}`;
      const bgPath = `color.${theme}.${pair.background}`;
      let fg = resolveToken(tree, fgPath);
      let bg = resolveToken(tree, bgPath);

      if (
        injectFail &&
        brand === "default" &&
        theme === "light" &&
        (pairId.includes("on-primary") || pair.foreground === "text.on-primary")
      ) {
        fg = "oklch(0.55 0.02 250)";
        bg = "oklch(0.5 0.02 250)";
      }

      const ratio = contrastRatio(fg, bg);
      const level =
        pair.level === "ui" || pair.level === "large" ? pair.level : "normal";
      const min = margin[level] ?? margin.normal;
      const exempt = pair.exempt === true;
      const ok = exempt || ratio >= min;
      const apca = apcaContrast(fg, bg);
      const status = exempt ? "EXEMPT" : ok ? "PASS" : "FAIL";
      const row = {
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
        apca,
        ok,
        status,
      };
      report.push(row);
      const line = `${status} [${brand}/${theme}] ${pairId}: ${row.ratio}:1 (min ${min}:1) apca≈${apca}`;
      if (status === "FAIL") {
        console.error(line);
        failed = true;
      } else {
        console.log(line);
      }
    }
  }
}

if (report.length === 0) {
  console.error("Runner produced no pairs");
  process.exit(1);
}

console.log(
  `\nEvaluated ${report.length} pairs across ${brands.length} brand(s) × ${themes.length} theme(s)`
);
if (injectFail) {
  if (!failed) {
    console.error("Expected failure with --inject-fail, but all pairs passed");
    process.exit(1);
  }
  console.log("Injected failure detected as expected");
  process.exit(0);
}

process.exit(failed ? 1 : 0);
