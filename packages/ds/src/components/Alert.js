/**
 * Minimal Alert primitive (feedback).
 * @param {object} props
 * @param {"info"|"success"|"warning"|"error"} [props.tone]
 * @param {"status"|"alert"} [props.role]
 * @param {string} [props.message]
 */
export function renderAlert({
  tone = "info",
  role = "status",
  message = "Notification",
} = {}) {
  const prefix = tone.charAt(0).toUpperCase() + tone.slice(1);
  return `<div class="ds-alert ds-alert--${tone}" role="${role}"><strong>${prefix}:</strong> ${message}</div>`;
}
