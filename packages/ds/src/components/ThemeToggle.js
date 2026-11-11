import { setTheme, getStoredTheme } from "../theme.js";

const MODES = ["light", "dark", "system"];

/**
 * ThemeToggle: exclusive mode group with aria-pressed.
 * @param {object} [props]
 * @param {"light"|"dark"|"system"} [props.value]
 * @param {string} [props.label]
 */
export function renderThemeToggle({
  value = "system",
  label = "Theme",
} = {}) {
  const current =
    value === "light" || value === "dark" || value === "system"
      ? value
      : "system";
  const buttons = MODES.map((mode) => {
    const pressed = mode === current ? "true" : "false";
    const text = mode.charAt(0).toUpperCase() + mode.slice(1);
    return `<button type="button" class="ds-theme-toggle__btn" data-ds-theme="${mode}" aria-pressed="${pressed}">${text}</button>`;
  }).join("");
  return `<div class="ds-theme-toggle" role="group" aria-label="${label}">${buttons}</div>`;
}

/**
 * Wire ThemeToggle groups: setTheme + persist + sync aria-pressed.
 * @param {ParentNode} [root]
 */
export function attachThemeToggle(root) {
  const scope = root || (typeof document !== "undefined" ? document : null);
  if (!scope) return;
  const stored = getStoredTheme();
  if (stored) {
    setTheme(stored);
    syncPressed(scope, stored);
  }
  scope.querySelectorAll(".ds-theme-toggle").forEach((group) => {
    group.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-ds-theme]");
      if (!btn || !group.contains(btn)) return;
      const mode = btn.getAttribute("data-ds-theme") || "system";
      setTheme(mode);
      syncPressed(group, mode);
    });
  });
}

function syncPressed(scope, mode) {
  scope.querySelectorAll("[data-ds-theme]").forEach((btn) => {
    btn.setAttribute(
      "aria-pressed",
      btn.getAttribute("data-ds-theme") === mode ? "true" : "false"
    );
  });
}
