/**
 * @deprecated Use `Checkbox` from `@soluciones-alexendros/ds/react` or `/astro`. Kept until 0.2.0.
 * Minimal Checkbox primitive (forms).
 * @param {object} props
 * @param {string} [props.id]
 * @param {string} [props.label]
 * @param {boolean} [props.checked]
 * @param {boolean} [props.disabled]
 */
export function renderCheckbox({
  id = "ds-checkbox",
  label = "Option",
  checked = false,
  disabled = false,
} = {}) {
  const attrs = [
    `id="${id}"`,
    `class="ds-checkbox__input"`,
    `type="checkbox"`,
    checked ? "checked" : "",
    disabled ? "disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return `<label class="ds-checkbox" for="${id}"><input ${attrs} /><span class="ds-checkbox__label">${label}</span></label>`;
}
