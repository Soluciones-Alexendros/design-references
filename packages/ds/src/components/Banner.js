import { statusIcon } from "./status-icon.js";

/**
 * @deprecated Use `Banner` from `@soluciones-alexendros/ds/react` or `/astro`. Kept until 0.2.0.
 * Minimal Banner primitive (feedback) — persistent, no toast timer.
 * @param {object} props
 * @param {"info"|"success"|"warning"|"error"} [props.tone]
 * @param {"status"|"alert"} [props.role]
 * @param {string} [props.body]
 */
export function renderBanner({
  tone = "info",
  role = "status",
  body = "Notice",
} = {}) {
  const prefix = tone.charAt(0).toUpperCase() + tone.slice(1);
  return `<div class="ds-banner ds-banner--${tone}" role="${role}">${statusIcon(tone)}<div class="ds-banner__body"><strong>${prefix}:</strong> ${body}</div></div>`;
}
