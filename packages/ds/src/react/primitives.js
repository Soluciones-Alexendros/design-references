import { createElement, useEffect } from "react";
import { StatusIcon } from "./StatusIcon.js";
import { attachThemeToggle } from "../components/ThemeToggle.js";

export function Button({
  variant = "primary",
  disabled = false,
  loading = false,
  type = "button",
  label = "Button",
} = {}) {
  const attrs = { className: `ds-button ds-button--${variant}`, type };
  if (disabled || loading) attrs.disabled = true;
  if (loading) attrs["aria-busy"] = "true";
  return createElement("button", attrs, loading ? `${label} (loading)` : label);
}

export function Input({
  type = "text",
  disabled = false,
  invalid = false,
  describedBy,
  value = "",
  label = "Field",
  id = "ds-input",
  omitAriaLabel = false,
} = {}) {
  const attrs = { id, className: "ds-input", type, defaultValue: value };
  if (!omitAriaLabel) attrs["aria-label"] = label;
  if (invalid) attrs["aria-invalid"] = "true";
  if (describedBy) attrs["aria-describedby"] = describedBy;
  if (disabled) attrs.disabled = true;
  return createElement("input", attrs);
}

export function Card({ elevated = false, body = "Card content" } = {}) {
  return createElement(
    "div",
    {
      className: ["ds-card", elevated ? "ds-card--elevated" : ""]
        .filter(Boolean)
        .join(" "),
    },
    body
  );
}

function toneBlock(kind, tone, role, text) {
  const prefix = tone.charAt(0).toUpperCase() + tone.slice(1);
  return createElement(
    "div",
    { className: `ds-${kind} ds-${kind}--${tone}`, role },
    createElement(StatusIcon, { tone }),
    createElement(
      "div",
      { className: `ds-${kind}__body` },
      createElement("strong", null, `${prefix}:`),
      ` ${text}`
    )
  );
}

export function Alert({
  tone = "info",
  role = "status",
  message = "Notification",
} = {}) {
  return toneBlock("alert", tone, role, message);
}

export function Link({ href = "#", label = "Link" } = {}) {
  return createElement("a", { className: "ds-link", href }, label);
}

export function Stack({ gap = "md", body = "" } = {}) {
  const className = `ds-stack ds-stack--gap-${gap}`;
  if (typeof body === "string") {
    return createElement("div", {
      className,
      dangerouslySetInnerHTML: body ? { __html: body } : undefined,
    });
  }
  return createElement("div", { className }, body);
}

export function Field({
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
  return createElement(
    "div",
    { className: "ds-field" },
    createElement(
      "label",
      { className: "ds-field__label", htmlFor: id },
      label
    ),
    createElement(Input, {
      id,
      label,
      type,
      disabled,
      value,
      invalid: showError,
      describedBy: showError ? errorId : undefined,
      omitAriaLabel: true,
    }),
    showError
      ? createElement(
          "p",
          { id: errorId, className: "ds-field__error", role: "alert" },
          createElement(StatusIcon, { tone: "error" }),
          createElement(
            "span",
            { className: "ds-field__error-text" },
            createElement("strong", null, "Error:"),
            ` ${error || "Invalid value"}`
          )
        )
      : null
  );
}

export function Select({
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
  const attrs = { id, className: "ds-select", defaultValue: value };
  if (!omitAriaLabel) attrs["aria-label"] = label;
  if (invalid) attrs["aria-invalid"] = "true";
  if (describedBy) attrs["aria-describedby"] = describedBy;
  if (disabled) attrs.disabled = true;
  return createElement(
    "select",
    attrs,
    ...options.map((o) =>
      createElement("option", { key: o.value, value: o.value }, o.label)
    )
  );
}

export function Checkbox({
  id = "ds-checkbox",
  label = "Option",
  checked = false,
  disabled = false,
} = {}) {
  const attrs = { id, className: "ds-checkbox__input", type: "checkbox" };
  if (checked) attrs.defaultChecked = true;
  if (disabled) attrs.disabled = true;
  return createElement(
    "label",
    { className: "ds-checkbox", htmlFor: id },
    createElement("input", attrs),
    createElement("span", { className: "ds-checkbox__label" }, label)
  );
}

export function Banner({
  tone = "info",
  role = "status",
  body = "Notice",
} = {}) {
  return toneBlock("banner", tone, role, body);
}

const MODES = ["light", "dark", "system"];

export function ThemeToggle({ value = "system", label = "Theme" } = {}) {
  const current =
    value === "light" || value === "dark" || value === "system"
      ? value
      : "system";
  useEffect(() => {
    attachThemeToggle();
  }, []);
  return createElement(
    "div",
    { className: "ds-theme-toggle", role: "group", "aria-label": label },
    ...MODES.map((mode) =>
      createElement(
        "button",
        {
          key: mode,
          type: "button",
          className: "ds-theme-toggle__btn",
          "data-ds-theme": mode,
          "aria-pressed": mode === current ? "true" : "false",
        },
        mode.charAt(0).toUpperCase() + mode.slice(1)
      )
    )
  );
}
