#!/usr/bin/env node
/**
 * T5 verification: setTheme updates data-theme; unknown → system.
 */
import { JSDOM } from "jsdom";
import { setTheme } from "../src/theme.js";

const dom = new JSDOM("<!doctype html><html><body></body></html>");
globalThis.document = dom.window.document;

const dark = setTheme("dark");
if (dark !== "dark" || document.documentElement.getAttribute("data-theme") !== "dark") {
  console.error("FAIL setTheme('dark')");
  process.exit(1);
}
console.log("OK  setTheme('dark') → data-theme=dark");

const light = setTheme("light");
if (light !== "light" || document.documentElement.getAttribute("data-theme") !== "light") {
  console.error("FAIL setTheme('light')");
  process.exit(1);
}
console.log("OK  setTheme('light') → data-theme=light");

const system = setTheme("system");
if (system !== "system" || document.documentElement.hasAttribute("data-theme")) {
  console.error("FAIL setTheme('system') should remove data-theme");
  process.exit(1);
}
console.log("OK  setTheme('system') → attribute removed (prefers-color-scheme)");

const fallback = setTheme("neon");
if (fallback !== "system" || document.documentElement.hasAttribute("data-theme")) {
  console.error("FAIL unknown mode should fallback to system");
  process.exit(1);
}
console.log("OK  setTheme('neon') → system fallback");
