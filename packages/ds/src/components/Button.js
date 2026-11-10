/**
 * Minimal Button primitive (forms).
 * @param {object} props
 * @param {"primary"|"secondary"|"danger"} [props.variant]
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.loading]
 * @param {string} [props.type]
 * @param {string} [props.label]
 */
export function renderButton({
  variant = "primary",
  disabled = false,
  loading = false,
  type = "button",
  label = "Button",
} = {}) {
  const classes = ["ds-button", `ds-button--${variant}`].join(" ");
  const attrs = [
    `class="${classes}"`,
    `type="${type}"`,
    disabled || loading ? "disabled" : "",
    loading ? 'aria-busy="true"' : "",
  ]
    .filter(Boolean)
    .join(" ");
  const text = loading ? `${label} (loading)` : label;
  return `<button ${attrs}>${text}</button>`;
}
