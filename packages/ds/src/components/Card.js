/**
 * Minimal Card primitive (layout).
 * @param {object} props
 * @param {boolean} [props.elevated]
 * @param {string} [props.body]
 */
export function renderCard({ elevated = false, body = "Card content" } = {}) {
  const classes = ["ds-card", elevated ? "ds-card--elevated" : ""]
    .filter(Boolean)
    .join(" ");
  return `<div class="${classes}">${body}</div>`;
}
