#!/usr/bin/env node
/**
 * T3 verification: resolve semantic tokens to OKLCH in light and dark.
 */
import { loadTokenTree, resolveToken } from "./token-lib.mjs";

const tree = loadTokenTree();
const samples = [
  "color.light.bg.primary",
  "color.light.text.on-primary",
  "color.dark.bg.primary",
  "color.dark.text.on-primary",
  "color.light.bg.surface",
  "color.dark.bg.surface",
];

let failed = false;
for (const path of samples) {
  try {
    const value = resolveToken(tree, path);
    if (typeof value !== "string" || !value.startsWith("oklch(")) {
      console.error(`FAIL ${path} → ${JSON.stringify(value)} (expected OKLCH)`);
      failed = true;
    } else {
      console.log(`OK  ${path} → ${value}`);
    }
  } catch (e) {
    console.error(`FAIL ${path}: ${e.message}`);
    failed = true;
  }
}

process.exit(failed ? 1 : 0);
