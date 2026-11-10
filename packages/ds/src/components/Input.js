/**
 * Minimal Input primitive (forms).
 * @param {object} props
 * @param {string} [props.type]
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.invalid]
 * @param {string} [props.describedBy]
 * @param {string} [props.value]
 * @param {string} [props.label]
 * @param {boolean} [props.omitAriaLabel] when a visible <label for> is provided by the caller
 */
export function renderInput({
  type = "text",
  disabled = false,
  invalid = false,
  describedBy,
  value = "",
  label = "Field",
  id = "ds-input",
  omitAriaLabel = false,
} = {}) {
  const attrs = [
    `id="${id}"`,
    `class="ds-input"`,
    `type="${type}"`,
    `value="${value}"`,
    omitAriaLabel ? "" : `aria-label="${label}"`,
    invalid ? 'aria-invalid="true"' : "",
    describedBy ? `aria-describedby="${describedBy}"` : "",
    disabled ? "disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return `<input ${attrs} />`;
}
