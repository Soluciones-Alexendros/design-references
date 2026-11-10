/**
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
  return `<div class="ds-banner ds-banner--${tone}" role="${role}"><strong>${prefix}:</strong> ${body}</div>`;
}
