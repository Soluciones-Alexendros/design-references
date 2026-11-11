export type Maturity = "Draft" | "Beta" | "Stable";

/** Madurez de docs hasta wrappers F3-05. */
export const COMPONENT_MATURITY: Record<string, Maturity> = {
  alert: "Draft",
  banner: "Draft",
  button: "Draft",
  card: "Draft",
  checkbox: "Draft",
  field: "Draft",
  input: "Draft",
  link: "Draft",
  select: "Draft",
  stack: "Draft",
  "theme-toggle": "Beta",
};
