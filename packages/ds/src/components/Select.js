/**
 * @deprecated Use `Select` from `@soluciones-alexendros/ds/react` or `/astro`. Kept until 0.2.0.
 * Minimal Select primitive (forms) — native select.
 * @param {object} props
 * @param {string} [props.id]
 * @param {{ value: string, label: string }[]} [props.options]
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.invalid]
 * @param {string} [props.describedBy]
 * @param {string} [props.value]
 * @param {string} [props.label]
 * @param {boolean} [props.omitAriaLabel]
 */
export function renderSelect({
  id = "ds-select",
  options = [
    { value: "", label: "Choose…" },
    { value: "a", label: "Option A" },
  ],
  disabled = false,
  invalid = false,
  describedBy,
  value = "",
  label = "Select",
  omitAriaLabel = false,
} = {}) {
  const attrs = [
    `id="${id}"`,
    `class="ds-select"`,
    omitAriaLabel ? "" : `aria-label="${label}"`,
    invalid ? 'aria-invalid="true"' : "",
    describedBy ? `aria-describedby="${describedBy}"` : "",
    disabled ? "disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const opts = options
    .map((o) => {
      const selected = o.value === value ? " selected" : "";
      return `<option value="${o.value}"${selected}>${o.label}</option>`;
    })
    .join("");
  return `<select ${attrs}>${opts}</select>`;
}
