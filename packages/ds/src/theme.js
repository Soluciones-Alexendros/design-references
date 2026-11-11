/**
 * Theme API: setTheme + localStorage key `ds-theme`.
 * Modes: light | dark | system. Unknown → system.
 * Without JS, system follows prefers-color-scheme via CSS @media.
 */

export const THEME_STORAGE_KEY = "ds-theme";

/**
 * @returns {"light"|"dark"|"system"|null}
 */
export function getStoredTheme() {
  if (typeof localStorage === "undefined") return null;
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" || value === "system"
      ? value
      : null;
  } catch {
    return null;
  }
}

/**
 * @param {"light"|"dark"|"system"|string} mode
 * @param {{ persist?: boolean }} [options]
 * @returns {"light"|"dark"|"system"}
 */
export function setTheme(mode, options = {}) {
  const persist = options.persist !== false;
  const root =
    typeof document !== "undefined" ? document.documentElement : null;
  const normalized =
    mode === "light" || mode === "dark" || mode === "system" ? mode : "system";

  if (root) {
    if (normalized === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", normalized);
    }
  }

  if (persist && typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, normalized);
    } catch {
      /* ignore quota / private mode */
    }
  }

  return normalized;
}
