/**
 * @deprecated Use `Stack` from `@soluciones-alexendros/ds/react` or `/astro`. Kept until 0.2.0.
 * Minimal Stack layout primitive (non-interactive).
 * @param {object} props
 * @param {"sm"|"md"|"lg"} [props.gap]
 * @param {string} [props.body]
 */
export function renderStack({ gap = "md", body = "" } = {}) {
  return `<div class="ds-stack ds-stack--gap-${gap}">${body}</div>`;
}
