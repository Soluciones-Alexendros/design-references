#!/usr/bin/env node
/**
 * T8: axe-core over primitives in light and dark.
 * Also asserts :focus-visible rules exist in component CSS.
 * Fails on serious/critical violations.
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import axe from "axe-core";
import {
  renderButton,
  renderInput,
  renderCard,
  renderAlert,
  renderLink,
  renderField,
} from "../src/components/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(__dirname, "..");
const styles = readFileSync(join(pkgRoot, "dist", "styles.css"), "utf8");
const compDir = join(pkgRoot, "src", "components");
const cssFiles = readdirSync(compDir).filter((f) => f.endsWith(".css"));
const componentCss = cssFiles
  .map((f) => readFileSync(join(compDir, f), "utf8"))
  .join("\n");

for (const file of ["Button.css", "Input.css", "Link.css"]) {
  const src = readFileSync(join(compDir, file), "utf8");
  if (!src.includes(":focus-visible")) {
    console.error(`FAIL ${file} missing :focus-visible`);
    process.exit(1);
  }
}
console.log("OK  :focus-visible present on Button.css, Input.css and Link.css");

const markup = `
  <main>
    ${renderButton({ variant: "primary", label: "Save" })}
    ${renderButton({ variant: "secondary", label: "Cancel" })}
    ${renderInput({ label: "Email", id: "email" })}
    ${renderCard({ elevated: true, body: "Card body" })}
    ${renderAlert({ tone: "error", role: "alert", message: "Something failed" })}
    ${renderAlert({ tone: "success", role: "status", message: "Saved" })}
    ${renderLink({ href: "#main", label: "Skip to content" })}
    ${renderField({ id: "fullname-email", label: "Work email", invalid: true, error: "Enter a valid email" })}
  </main>
`;

function runTheme(theme) {
  const dom = new JSDOM(
    `<!doctype html><html lang="en" data-theme="${theme}"><head><title>DS a11y fixture</title><style>${styles}\n${componentCss}</style></head><body>${markup}</body></html>`,
    {
      url: "http://localhost/",
      pretendToBeVisual: true,
      runScripts: "dangerously",
    },
  );
  const { window } = dom;
  const { document } = window;

  // Install axe into this JSDOM window (UMD expects globalThis/window)
  const script = document.createElement("script");
  script.textContent = axe.source;
  document.head.appendChild(script);

  if (!window.axe) {
    throw new Error("axe failed to install into JSDOM window");
  }

  return window.axe
    .run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
      },
      // color-contrast needs canvas in JSDOM; covered by contrast-runner.mjs
      rules: {
        "color-contrast": { enabled: false },
      },
    })
    .then((results) => {
      const blockers = results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact),
      );
      if (blockers.length) {
        console.error(`FAIL axe [${theme}] ${blockers.length} serious/critical`);
        for (const v of blockers) {
          console.error(`  - ${v.id} (${v.impact}): ${v.help}`);
          for (const node of v.nodes.slice(0, 3)) {
            console.error(
              `    ${node.target.join(" ")} — ${node.failureSummary}`,
            );
          }
        }
        return false;
      }
      console.log(
        `PASS axe [${theme}] ${results.violations.length} non-blocking, ${results.passes.length} passes`,
      );
      return true;
    });
}

const lightOk = await runTheme("light");
const darkOk = await runTheme("dark");
process.exit(lightOk && darkOk ? 0 : 1);
