#!/usr/bin/env node
/**
 * Theme: setTheme data-theme + localStorage `ds-theme` + theme-boot size.
 */
import { readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import {
  setTheme,
  getStoredTheme,
  THEME_STORAGE_KEY,
} from "../src/theme.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const bootPath = join(__dirname, "..", "src", "theme-boot.js");
const bootBytes = statSync(bootPath).size;
if (bootBytes > 1024) {
  console.error(`FAIL theme-boot.js ${bootBytes}B > 1KB`);
  process.exit(1);
}
console.log(`OK  theme-boot.js size ${bootBytes}B ≤ 1024`);

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "https://example.test/",
});
globalThis.document = dom.window.document;
globalThis.localStorage = dom.window.localStorage;
localStorage.clear();

const dark = setTheme("dark");
if (
  dark !== "dark" ||
  document.documentElement.getAttribute("data-theme") !== "dark" ||
  localStorage.getItem(THEME_STORAGE_KEY) !== "dark"
) {
  console.error("FAIL setTheme('dark') persist");
  process.exit(1);
}
console.log("OK  setTheme('dark') → data-theme=dark + localStorage");

const light = setTheme("light");
if (
  light !== "light" ||
  document.documentElement.getAttribute("data-theme") !== "light" ||
  getStoredTheme() !== "light"
) {
  console.error("FAIL setTheme('light')");
  process.exit(1);
}
console.log("OK  setTheme('light') → data-theme=light");

const system = setTheme("system");
if (
  system !== "system" ||
  document.documentElement.hasAttribute("data-theme") ||
  getStoredTheme() !== "system"
) {
  console.error("FAIL setTheme('system')");
  process.exit(1);
}
console.log("OK  setTheme('system') → attribute removed, stored");

const fallback = setTheme("neon");
if (fallback !== "system" || document.documentElement.hasAttribute("data-theme")) {
  console.error("FAIL unknown mode should fallback to system");
  process.exit(1);
}
console.log("OK  setTheme('neon') → system fallback");

setTheme("dark", { persist: false });
if (getStoredTheme() !== "system") {
  console.error("FAIL persist:false should not overwrite storage");
  process.exit(1);
}
console.log("OK  setTheme(..., { persist: false })");

const boot = readFileSync(bootPath, "utf8");
if (!boot.includes('localStorage.getItem("ds-theme")')) {
  console.error("FAIL theme-boot missing ds-theme key");
  process.exit(1);
}
console.log("OK  theme-boot reads ds-theme");
