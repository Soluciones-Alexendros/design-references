/** Canonical docs origin (ADR-0008 / arquitectura §6). */
export const SITE_ORIGIN = "https://design.alexendros.dev";

/** Static routes for sitemap and nav (trailing slash). */
export const STATIC_ROUTES = [
  "/",
  "/foundations/color/",
  "/foundations/typography/",
  "/foundations/spacing/",
  "/foundations/radius/",
  "/foundations/elevation/",
  "/foundations/motion/",
  "/components/",
  "/patterns/",
  "/guides/",
  "/a11y/",
  "/changelog/",
  "/fleet/",
  "/playground/",
] as const;

/**
 * Resolve --ds-color-bg-surface from generated styles for theme-color meta.
 * Values come from tokens via build; not hand-picked hex.
 */
export function themeColorsFromCss(css: string): {
  light: string;
  dark: string;
} {
  const rootMatch = css.match(/:root\s*\{([\s\S]*?)\n\}/);
  const darkMatch = css.match(/\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/);
  const pick = (block: string | undefined, fallback: string) => {
    const m = block?.match(/--ds-color-bg-surface:\s*([^;]+);/);
    return m?.[1]?.trim() ?? fallback;
  };
  return {
    light: pick(rootMatch?.[1], "oklch(0.985 0.005 250)"),
    dark: pick(darkMatch?.[1], "oklch(0.18 0.015 250)"),
  };
}

export function absoluteUrl(path: string, site = SITE_ORIGIN): string {
  const base = site.endsWith("/") ? site : `${site}/`;
  const rel = path.startsWith("/") ? path.slice(1) : path;
  return new URL(rel, base).href;
}
