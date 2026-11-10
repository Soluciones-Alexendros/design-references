#!/usr/bin/env node
/**
 * T6: contrast runner — OKLCH → sRGB → WCAG relative contrast.
 * Fails if normal text < 4.5:1 or large/UI < 3:1.
 * Use --inject-fail to verify the runner fails on a bad pair.
 */
import {
  loadJson,
  loadTokenTree,
  resolveToken,
  contrastRatio,
} from "./token-lib.mjs";

const THRESHOLD = { normal: 4.5, ui: 3, large: 3 };
const injectFail = process.argv.includes("--inject-fail");

const semantic = loadJson("semantic.json");
const pairs = semantic.$extensions?.["org.soluciones-alexendros.contrastPairs"];
if (!Array.isArray(pairs) || pairs.length === 0) {
  console.error("No contrast pairs defined in semantic.json $extensions");
  process.exit(1);
}

const tree = loadTokenTree();
const themes = ["light", "dark"];
const report = [];
let failed = false;

for (const theme of themes) {
  for (const pair of pairs) {
    const fgPath = `color.${theme}.${pair.foreground}`;
    const bgPath = `color.${theme}.${pair.background}`;
    let fg = resolveToken(tree, fgPath);
    let bg = resolveToken(tree, bgPath);

    if (injectFail && theme === "light" && pair.name.includes("on-primary")) {
      fg = "oklch(0.55 0.02 250)";
      bg = "oklch(0.5 0.02 250)";
    }

    const ratio = contrastRatio(fg, bg);
    const level = pair.level === "ui" || pair.level === "large" ? pair.level : "normal";
    const min = THRESHOLD[level] ?? THRESHOLD.normal;
    const ok = ratio >= min;
    const row = {
      theme,
      name: pair.name,
      foreground: fg,
      background: bg,
      ratio: Number(ratio.toFixed(3)),
      min,
      level,
      ok,
    };
    report.push(row);
    const line = `${ok ? "PASS" : "FAIL"} [${theme}] ${pair.name}: ${row.ratio}:1 (min ${min}:1)`;
    if (ok) console.log(line);
    else {
      console.error(line);
      failed = true;
    }
  }
}

if (report.length === 0) {
  console.error("Runner produced no pairs");
  process.exit(1);
}

console.log(`\nEvaluated ${report.length} pairs`);
if (injectFail) {
  if (!failed) {
    console.error("Expected failure with --inject-fail, but all pairs passed");
    process.exit(1);
  }
  console.log("Injected failure detected as expected");
  process.exit(0);
}

process.exit(failed ? 1 : 0);
