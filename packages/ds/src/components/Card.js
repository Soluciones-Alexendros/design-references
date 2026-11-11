/**
 * @deprecated Use `Card` from `@soluciones-alexendros/ds/react` or `/astro`. Kept until 0.2.0.
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
