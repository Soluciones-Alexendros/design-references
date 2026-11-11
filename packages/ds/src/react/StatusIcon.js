import { createElement } from "react";

const PATHS = {
  info: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 10v6M12 7h.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  success:
    '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="m8 12 2.5 2.5L16 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  warning:
    '<path d="M12 4 21 20H3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 10v4M12 16h.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  error:
    '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="m9 9 6 6M15 9l-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
};

/** @param {{ tone?: "info"|"success"|"warning"|"error" }} props */
export function StatusIcon({ tone = "info" }) {
  return createElement(
    "span",
    { className: "ds-status-icon", "data-tone": tone, "aria-hidden": "true" },
    createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      focusable: "false",
      dangerouslySetInnerHTML: { __html: PATHS[tone] || PATHS.info },
    })
  );
}
