#!/usr/bin/env node
/**
 * F3-07: Playwright + axe gate — light/dark/forced-colors/prefers-contrast,
 * brands, reflow 320px, zoom 200%. Zero violations.
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { fixtureDocument, pkgRoot } from "./a11y-fixture.mjs";
import { existsSync } from "node:fs";
import { join } from "node:path";

if (!existsSync(join(pkgRoot, "dist", "styles.css"))) {
  console.error("FAIL dist/styles.css missing — run build first");
  process.exit(1);
}

const scenarios = [
  { name: "light", theme: "light", brand: "default" },
  { name: "dark", theme: "dark", brand: "default" },
  { name: "archmaker-light", theme: "light", brand: "archmaker" },
  { name: "archmaker-dark", theme: "dark", brand: "archmaker" },
  {
    name: "forced-colors",
    theme: "light",
    brand: "default",
    media: { forcedColors: "active" },
  },
  {
    name: "prefers-contrast",
    theme: "light",
    brand: "default",
    media: { prefersContrast: "more" },
  },
];

let failed = 0;

async function runAxe(page, label) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  const blockers = results.violations.filter((v) =>
    ["serious", "critical"].includes(v.impact)
  );
  if (blockers.length || results.violations.length) {
    // Gate: zero violations (not only serious/critical)
    console.error(
      `FAIL axe [${label}] ${results.violations.length} violation(s)`
    );
    for (const v of results.violations.slice(0, 8)) {
      console.error(`  - ${v.id} (${v.impact}): ${v.help}`);
    }
    failed += 1;
  } else {
    console.log(`PASS axe [${label}] 0 violations`);
  }
}

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
});
const page = await context.newPage();

for (const s of scenarios) {
  await page.setContent(fixtureDocument({ theme: s.theme, brand: s.brand }), {
    waitUntil: "load",
  });
  if (s.media) await page.emulateMedia(s.media);
  else
    await page.emulateMedia({
      forcedColors: "none",
      prefersContrast: "no-preference",
    });
  await runAxe(page, s.name);
}

// Reflow 320px
await page.setContent(fixtureDocument({ theme: "light" }), {
  waitUntil: "load",
});
await page.setViewportSize({ width: 320, height: 640 });
await runAxe(page, "reflow-320");
const overflow = await page.evaluate(() => {
  const doc = document.documentElement;
  return doc.scrollWidth > doc.clientWidth + 1;
});
if (overflow) {
  console.error("FAIL reflow-320: horizontal overflow");
  failed += 1;
} else console.log("PASS reflow-320: no horizontal overflow");

// Zoom 200% (layout viewport equivalent ~640 CSS px at 1280 device)
await page.setViewportSize({ width: 640, height: 480 });
await page.evaluate(() => {
  document.documentElement.style.zoom = "200%";
});
await runAxe(page, "zoom-200");

await browser.close();
process.exit(failed ? 1 : 0);
