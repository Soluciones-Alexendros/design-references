#!/usr/bin/env node
/**
 * Observable behavior for Link / Stack / Field (plan-validators).
 * Complements axe (a11y-runner) and acceptance-stubs.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import {
  renderLink,
  renderStack,
  renderField,
} from "../src/components/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const compDir = join(__dirname, "..", "src", "components");
let failed = 0;

function fail(msg) {
  console.error(`FAIL ${msg}`);
  failed += 1;
}

function ok(msg) {
  console.log(`OK  ${msg}`);
}

function parse(html) {
  return new JSDOM(`<!doctype html><body>${html}</body>`).window.document;
}

// --- Link ---
{
  const html = renderLink({ href: "/docs", label: "Docs" });
  const doc = parse(html);
  const a = doc.querySelector("a.ds-link");
  if (!a) fail("Link: missing a.ds-link");
  else {
    if (a.getAttribute("href") !== "/docs") fail("Link: href");
    if (a.textContent !== "Docs") fail("Link: label text");
    else ok("Link: href + label");
  }
  const css = readFileSync(join(compDir, "Link.css"), "utf8");
  if (!css.includes(":focus-visible")) fail("Link.css: :focus-visible");
  if (!css.includes("--ds-color-text-link")) fail("Link.css: --ds-color-text-link");
  if (!css.includes("--ds-color-border-focus")) fail("Link.css: --ds-color-border-focus");
  else ok("Link.css: tokens + focus-visible");
}

// --- Stack ---
{
  for (const gap of ["sm", "md", "lg"]) {
    const html = renderStack({ gap, body: "<span>item</span>" });
    const doc = parse(html);
    const el = doc.querySelector(`.ds-stack.ds-stack--gap-${gap}`);
    if (!el) fail(`Stack: missing .ds-stack--gap-${gap}`);
    else if (!el.querySelector("span") || el.textContent !== "item") {
      fail(`Stack: body not rendered for gap=${gap}`);
    } else ok(`Stack: gap=${gap}`);
  }
  const css = readFileSync(join(compDir, "Stack.css"), "utf8");
  let spaceOk = true;
  for (const token of ["--ds-space-sm", "--ds-space-md", "--ds-space-lg"]) {
    if (!css.includes(token)) {
      fail(`Stack.css: missing ${token}`);
      spaceOk = false;
    }
  }
  if (spaceOk) ok("Stack.css: space tokens");
}

// --- Field ---
{
  const html = renderField({
    id: "work-email",
    label: "Work email",
    invalid: true,
    error: "Enter a valid email",
  });
  const doc = parse(html);
  const label = doc.querySelector("label.ds-field__label");
  const input = doc.querySelector("input.ds-input");
  const err = doc.querySelector("#work-email-error");
  if (!label || label.getAttribute("for") !== "work-email") {
    fail("Field: label[for] must match id");
  } else ok("Field: visible label association");
  if (!input || input.id !== "work-email") fail("Field: input id");
  if (input?.hasAttribute("aria-label")) {
    fail("Field: input must omit aria-label when visible label exists");
  } else ok("Field: omitAriaLabel");
  if (input?.getAttribute("aria-invalid") !== "true") fail("Field: aria-invalid");
  else ok("Field: aria-invalid");
  if (input?.getAttribute("aria-describedby") !== "work-email-error") {
    fail("Field: aria-describedby → error id");
  } else ok("Field: aria-describedby");
  if (!err || !err.textContent.includes("Error:") || !err.textContent.includes("Enter a valid email")) {
    fail("Field: error text must include Error: prefix and message");
  } else if (err.getAttribute("role") !== "alert") {
    fail("Field: error role=alert");
  } else ok("Field: error announcement");
}

{
  const html = renderField({ id: "ok", label: "OK" });
  const doc = parse(html);
  const input = doc.querySelector("input");
  if (input?.hasAttribute("aria-describedby")) {
    fail("Field: no aria-describedby when valid");
  }
  if (doc.querySelector(".ds-field__error")) fail("Field: no error node when valid");
  else ok("Field: valid state clean");
}

{
  const html = renderField({ id: "inv", label: "X", invalid: true });
  const doc = parse(html);
  const err = doc.querySelector("#inv-error");
  if (!err || !err.textContent.includes("Invalid value")) {
    fail("Field: invalid without error string → default message");
  } else ok("Field: default invalid message");
}

if (failed) {
  console.error(`test-primitives: ${failed} failure(s)`);
  process.exit(1);
}
console.log("PASS test-primitives");
