/**
 * @deprecated Use `Link` from `@soluciones-alexendros/ds/react` or `/astro`. Kept until 0.2.0.
 * Minimal Link primitive (navigation).
 * @param {object} props
 * @param {string} [props.href]
 * @param {string} [props.label]
 */
export function renderLink({ href = "#", label = "Link" } = {}) {
  return `<a class="ds-link" href="${href}">${label}</a>`;
}
