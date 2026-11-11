#!/usr/bin/env node
/**
 * Smoke: axe-core in jsdom (light + dark). Playwright is the primary gate.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { JSDOM } from "jsdom";
import axe from "axe-core";
import { fixtureMarkup, loadStyles, pkgRoot } from "./a11y-fixture.mjs";

const compDir = join(pkgRoot, "src", "components");
for (const file of [
  "Button.css",
  "Input.css",
  "Link.css",
  "Select.css",
  "Checkbox.css",
]) {
  const src = readFileSync(join(compDir, file), "utf8");
  if (!src.includes(":focus-visible")) {
    console.error(`FAIL ${file} missing :focus-visible`);
    process.exit(1);
  }
}
console.log("OK  :focus-visible on interactive CSS");

async function runTheme(theme) {
  const dom = new JSDOM(
    `<!doctype html><html lang="en" data-theme="${theme}"><head><title>DS a11y smoke</title><style>${loadStyles()}</style></head><body>${fixtureMarkup()}</body></html>`,
    {
      url: "http://localhost/",
      pretendToBeVisual: true,
      runScripts: "dangerously",
    }
  );
  const { window } = dom;
  const script = window.document.createElement("script");
  script.textContent = axe.source;
  window.document.head.appendChild(script);
  if (!window.axe) throw new Error("axe failed to install");
  const results = await window.axe.run(window.document, {
    runOnly: {
      type: "tag",
      values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
    },
    rules: { "color-contrast": { enabled: false } },
  });
  const blockers = results.violations.filter((v) =>
    ["serious", "critical"].includes(v.impact)
  );
  if (blockers.length) {
    console.error(
      `FAIL axe smoke [${theme}] ${blockers.length} serious/critical`
    );
    return false;
  }
  console.log(
    `PASS axe smoke [${theme}] ${results.violations.length} non-blocking`
  );
  return true;
}

const ok = (await runTheme("light")) && (await runTheme("dark"));
process.exit(ok ? 0 : 1);
