#!/usr/bin/env node
/** F3-06: Astro→renderX; React HTML === canónico (DOM-normalized). */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";
import * as C from "../src/components/index.js";
import * as R from "../src/react/index.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let failed = 0;
const fail = (m) => {
  console.error(`FAIL ${m}`);
  failed += 1;
};
const ok = (m) => console.log(`OK  ${m}`);

function norm(html) {
  const el = new JSDOM(`<body>${html}</body>`).window.document.body
    .firstElementChild;
  if (!el) return "";
  const walk = (n) => {
    const tag = n.tagName.toLowerCase();
    const attrs = [...n.attributes]
      .filter((a) => !(a.name === "value" && n.tagName === "INPUT"))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((a) => (a.value === "" ? ` ${a.name}` : ` ${a.name}="${a.value}"`))
      .join("");
    if (tag === "input") {
      const v = n.getAttribute("value") ?? n.value ?? "";
      return `<${tag}${attrs} value="${v}">`;
    }
    const kids = [...n.childNodes]
      .map((c) =>
        c.nodeType === 3 ? c.textContent : c.nodeType === 1 ? walk(c) : ""
      )
      .join("");
    return `<${tag}${attrs}>${kids}</${tag}>`;
  };
  return walk(el);
}

const names = [
  "Button",
  "Input",
  "Card",
  "Alert",
  "Link",
  "Stack",
  "Field",
  "Select",
  "Checkbox",
  "Banner",
  "ThemeToggle",
];
for (const n of names) {
  const s = readFileSync(join(root, `src/astro/${n}.astro`), "utf8");
  if (!s.includes(`render${n}`) || !s.includes("set:html={html}")) fail(n);
  else ok(`Astro ${n}`);
}

const cases = [
  ["Button", { variant: "primary", label: "Save" }],
  ["Button", { loading: true, label: "Save" }],
  ["Input", { id: "email", label: "Email", value: "" }],
  ["Card", { elevated: true, body: "Body" }],
  ["Alert", { tone: "error", role: "alert", message: "Fail" }],
  ["Link", { href: "/docs", label: "Docs" }],
  ["Stack", { gap: "sm", body: "<span>item</span>" }],
  ["Field", { id: "work", label: "Work", invalid: true, error: "Required" }],
  [
    "Select",
    {
      id: "region",
      label: "Region",
      options: [
        { value: "", label: "Choose…" },
        { value: "eu", label: "Europe" },
      ],
      value: "eu",
    },
  ],
  ["Checkbox", { id: "terms", label: "Accept", checked: true }],
  ["Banner", { tone: "warning", body: "Soon" }],
  ["ThemeToggle", { value: "dark", label: "Color theme" }],
];
for (const [n, p] of cases) {
  const a = norm(C[`render${n}`](p));
  const b = norm(renderToStaticMarkup(createElement(R[n], p)));
  if (a !== b) fail(`${n}: ${a} !== ${b}`);
  else ok(`${n} === canónico`);
}

if (R.renderButton !== C.renderButton) fail("reexport");
else ok("deprecated reexport");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
for (const k of [
  "./tokens.css",
  "./theme",
  "./theme-boot",
  "./css",
  "./astro",
  "./react",
]) {
  if (!pkg.exports[k]) fail(k);
  else ok(`exports ${k}`);
}
process.exit(failed ? 1 : 0);
