/**
 * Shared DTCG load / alias resolve / CSS name helpers.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = join(__dirname, "..", "..", "..");
export const TOKENS_DIR = join(REPO_ROOT, "tokens");

export function loadJson(name) {
  return JSON.parse(readFileSync(join(TOKENS_DIR, name), "utf8"));
}

export function deepMerge(a, b) {
  if (Array.isArray(a) || Array.isArray(b)) return b ?? a;
  if (
    a &&
    b &&
    typeof a === "object" &&
    typeof b === "object" &&
    !("$value" in a) &&
    !("$value" in b)
  ) {
    const out = { ...a };
    for (const [k, v] of Object.entries(b)) {
      out[k] = k in out ? deepMerge(out[k], v) : v;
    }
    return out;
  }
  return b ?? a;
}

export function loadTokenTree() {
  const reference = loadJson("reference.json");
  const semantic = loadJson("semantic.json");
  const component = loadJson("component.json");
  return deepMerge(deepMerge(reference, semantic), component);
}

export function getPath(tree, path) {
  const parts = path.split(".");
  let cur = tree;
  for (const part of parts) {
    if (cur == null || typeof cur !== "object" || !(part in cur)) {
      throw new Error(`Token path not found: ${path}`);
    }
    cur = cur[part];
  }
  return cur;
}

export function resolveValue(tree, value, seen = new Set()) {
  if (typeof value === "string" && value.startsWith("{") && value.endsWith("}")) {
    const path = value.slice(1, -1);
    if (seen.has(path)) throw new Error(`Circular alias: ${path}`);
    seen.add(path);
    const node = getPath(tree, path);
    if (node && typeof node === "object" && "$value" in node) {
      return resolveValue(tree, node.$value, seen);
    }
    throw new Error(`Alias target has no $value: ${path}`);
  }
  if (Array.isArray(value)) {
    return value.map((v) =>
      v && typeof v === "object" && "color" in v
        ? { ...v, color: resolveValue(tree, v.color, new Set(seen)) }
        : resolveValue(tree, v, new Set(seen)),
    );
  }
  return value;
}

export function resolveToken(tree, path) {
  const node = getPath(tree, path);
  if (!node || typeof node !== "object" || !("$value" in node)) {
    throw new Error(`Not a token: ${path}`);
  }
  return resolveValue(tree, node.$value);
}

export function walkTokens(node, path, inheritedType, visit) {
  if (!node || typeof node !== "object" || Array.isArray(node)) return;
  const type = node.$type ?? inheritedType;
  if ("$value" in node) {
    visit(path, node, type);
    return;
  }
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    walkTokens(child, path ? `${path}.${key}` : key, type, visit);
  }
}

/** Map semantic path color.light.bg.primary → --ds-color-bg-primary */
export function cssVarName(path, theme) {
  let p = path;
  if (theme && p.startsWith(`color.${theme}.`)) {
    p = "color." + p.slice(`color.${theme}.`.length);
  }
  return `--ds-${p.replace(/\./g, "-")}`;
}

export function formatCssValue(value) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return "none";
    if (typeof value[0] === "string") {
      return value.map((v) => (/\s/.test(v) ? `"${v}"` : v)).join(", ");
    }
    // shadow list
    return value
      .map((s) => {
        if (!s || typeof s !== "object") return String(s);
        const {
          offsetX = "0",
          offsetY = "0",
          blur = "0",
          spread = "0",
          color = "transparent",
        } = s;
        return `${offsetX} ${offsetY} ${blur} ${spread} ${color}`;
      })
      .join(", ");
  }
  return String(value);
}

/** Rough OKLCH → sRGB for contrast (WCAG relative luminance). */
export function oklchToSrgb(oklchStr) {
  const m = String(oklchStr)
    .trim()
    .match(
      /^oklch\(\s*([\d.]+)\s*%?\s+([\d.]+)\s+([\d.-]+)\s*(?:\/\s*([\d.]+)%?)?\s*\)$/i,
    );
  if (!m) throw new Error(`Not OKLCH: ${oklchStr}`);
  let L = parseFloat(m[1]);
  if (m[1].includes("%") || L > 1) L = L / 100;
  const C = parseFloat(m[2]);
  const H = parseFloat(m[3]);
  const a = C * Math.cos((H * Math.PI) / 180);
  const b = C * Math.sin((H * Math.PI) / 180);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ * l_ * l_;
  const mm = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  let r = +4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s;
  let bl = -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s;

  const clamp01 = (x) => Math.min(1, Math.max(0, x));
  const toSrgb = (c) => {
    c = clamp01(c);
    return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
  };
  return { r: toSrgb(r), g: toSrgb(g), b: toSrgb(bl) };
}

export function relativeLuminance({ r, g, b }) {
  const f = (c) => {
    const cs = c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    return cs;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

export function contrastRatio(fgOklch, bgOklch) {
  const L1 = relativeLuminance(oklchToSrgb(fgOklch));
  const L2 = relativeLuminance(oklchToSrgb(bgOklch));
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}
