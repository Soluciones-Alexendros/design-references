#!/usr/bin/env node
/**
 * Validate DTCG 2025.10 token files (structural checks).
 * Fails on invalid JSON, unknown $type, leaf nodes without $value,
 * or color values that are neither OKLCH nor a {color} alias.
 * Excludes contrast.pairs.json (contrast contract, not DTCG).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensDir = join(__dirname, "..", "tokens");

const EXCLUDE_FILES = new Set(["contrast.pairs.json"]);

const ALLOWED_TYPES = new Set([
  "color",
  "dimension",
  "fontFamily",
  "fontWeight",
  "duration",
  "cubicBezier",
  "number",
  "strokeStyle",
  "border",
  "transition",
  "shadow",
  "gradient",
  "typography",
  "string",
]);

const OKLCH_RE =
  /^oklch\(\s*[\d.]+\s*%?\s+[\d.]+\s+[\d.-]+\s*(?:\/\s*[\d.]+%?)?\s*\)$/i;
const ALIAS_RE = /^\{[a-zA-Z0-9_.-]+(?:\.[a-zA-Z0-9_.-]+)*\}$/;

function isTokenNode(node) {
  return (
    node !== null &&
    typeof node === "object" &&
    !Array.isArray(node) &&
    Object.prototype.hasOwnProperty.call(node, "$value")
  );
}

function isGroupNode(node) {
  return node !== null && typeof node === "object" && !Array.isArray(node);
}

function validateColorValue(value, path) {
  if (typeof value === "string") {
    if (ALIAS_RE.test(value) || OKLCH_RE.test(value)) return;
    throw new Error(
      `${path}: color $value must be OKLCH or {alias}, got ${JSON.stringify(value)}`
    );
  }
  if (value && typeof value === "object" && value.colorSpace === "oklch") {
    return;
  }
  throw new Error(`${path}: unsupported color $value shape`);
}

function walk(node, path, inheritedType, errors) {
  if (!isGroupNode(node)) {
    errors.push(`${path}: expected object`);
    return;
  }

  const type = node.$type ?? inheritedType;

  if (node.$type !== undefined && !ALLOWED_TYPES.has(node.$type)) {
    errors.push(`${path}: unknown $type "${node.$type}"`);
  }

  if (isTokenNode(node)) {
    if (type === "color") {
      try {
        validateColorValue(node.$value, path);
      } catch (e) {
        errors.push(e.message);
      }
    }
    return;
  }

  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    walk(child, path ? `${path}.${key}` : key, type, errors);
  }
}

function validateFile(filePath) {
  const raw = readFileSync(filePath, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    throw new Error(`${filePath}: invalid JSON — ${e.message}`);
  }
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(`${filePath}: root must be a JSON object`);
  }
  const errors = [];
  walk(data, "", undefined, errors);
  if (errors.length) {
    throw new Error(`${filePath}:\n  - ${errors.join("\n  - ")}`);
  }
}

function collectJsonFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...collectJsonFiles(full));
      continue;
    }
    if (!name.endsWith(".json")) continue;
    if (EXCLUDE_FILES.has(name) || EXCLUDE_FILES.has(basename(full))) continue;
    out.push(full);
  }
  return out;
}

const files = collectJsonFiles(tokensDir);

if (files.length === 0) {
  console.error("No token JSON files found in tokens/");
  process.exit(1);
}

let failed = false;
for (const file of files) {
  try {
    validateFile(file);
    console.log(`OK  ${file}`);
  } catch (e) {
    failed = true;
    console.error(`FAIL ${e.message}`);
  }
}

process.exit(failed ? 1 : 0);
