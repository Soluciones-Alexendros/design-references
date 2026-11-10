/**
 * Theme-boot: set data-theme on <html>.
 * Modes: light | dark | system.
 * Without JS, system follows prefers-color-scheme via CSS @media.
 * Unknown modes fall back to system.
 *
 * @param {"light"|"dark"|"system"|string} mode
 * @returns {"light"|"dark"|"system"}
 */
export function setTheme(mode) {
  const root =
    typeof document !== "undefined" ? document.documentElement : null;
  const normalized =
    mode === "light" || mode === "dark" || mode === "system" ? mode : "system";

  if (!root) return normalized;

  if (normalized === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", normalized);
  }
  return normalized;
}
