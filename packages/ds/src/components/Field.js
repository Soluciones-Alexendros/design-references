import { renderInput } from "./Input.js";

/**
 * Minimal Field primitive: visible label + Input + error (forms).
 * Wires aria-describedby to the error message via renderInput({ describedBy }).
 * @param {object} props
 * @param {string} [props.id]
 * @param {string} [props.label]
 * @param {boolean} [props.invalid]
 * @param {string} [props.error]
 * @param {string} [props.type]
 * @param {boolean} [props.disabled]
 * @param {string} [props.value]
 */
export function renderField({
  id = "ds-field",
  label = "Field",
  invalid = false,
  error = "",
  type = "text",
  disabled = false,
  value = "",
} = {}) {
  const errorId = `${id}-error`;
  const showError = Boolean(invalid || error);
  const input = renderInput({
    id,
    label,
    type,
    disabled,
    value,
    invalid: showError,
    describedBy: showError ? errorId : undefined,
    omitAriaLabel: true,
  });
  const errorHtml = showError
    ? `<p id="${errorId}" class="ds-field__error" role="alert"><strong>Error:</strong> ${error || "Invalid value"}</p>`
    : "";
  return `<div class="ds-field"><label class="ds-field__label" for="${id}">${label}</label>${input}${errorHtml}</div>`;
}
