/**
 * Shared a11y fixture markup (jsdom smoke + Playwright gate).
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  renderButton,
  renderInput,
  renderCard,
  renderAlert,
  renderLink,
  renderField,
  renderSelect,
  renderCheckbox,
  renderBanner,
  renderThemeToggle,
} from "../src/components/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const pkgRoot = join(__dirname, "..");

export function loadStyles() {
  const styles = readFileSync(join(pkgRoot, "dist", "styles.css"), "utf8");
  const compDir = join(pkgRoot, "src", "components");
  const componentCss = readdirSync(compDir)
    .filter((f) => f.endsWith(".css"))
    .map((f) => readFileSync(join(compDir, f), "utf8"))
    .join("\n");
  const layers = readFileSync(
    join(pkgRoot, "src", "css", "layers.css"),
    "utf8"
  );
  return `${styles}\n${layers}\n${componentCss}`;
}

export function fixtureMarkup() {
  return `
<main>
  ${renderButton({ variant: "primary", label: "Save" })}
  ${renderButton({ variant: "secondary", label: "Cancel" })}
  ${renderInput({ label: "Email", id: "email" })}
  ${renderCard({ elevated: true, body: "Card body" })}
  ${renderAlert({ tone: "error", role: "alert", message: "Something failed" })}
  ${renderAlert({ tone: "success", role: "status", message: "Saved" })}
  ${renderLink({ href: "#main", label: "Skip to content" })}
  ${renderField({ id: "fullname-email", label: "Work email", invalid: true, error: "Enter a valid email" })}
  ${renderSelect({
    id: "region",
    label: "Region",
    options: [
      { value: "", label: "Choose…" },
      { value: "eu", label: "Europe" },
    ],
  })}
  ${renderCheckbox({ id: "terms", label: "Accept terms", checked: false })}
  ${renderBanner({ tone: "warning", role: "status", body: "Maintenance window tonight" })}
  ${renderThemeToggle({ value: "system", label: "Theme" })}
</main>`;
}

export function fixtureDocument({ theme = "light", brand = "default" } = {}) {
  const brandAttr = brand === "default" ? "" : ` data-brand="${brand}"`;
  const base = `html,body{margin:0;background:var(--ds-color-bg-surface);color:var(--ds-color-text-default);font-family:var(--ds-type-family-sans);}`;
  return `<!doctype html><html lang="en" data-theme="${theme}"${brandAttr}><head><meta charset="utf-8"/><title>DS a11y</title><style>${loadStyles()}\n${base}</style></head><body>${fixtureMarkup()}</body></html>`;
}
