#!/usr/bin/env node
/**
 * Fail if component CSS/JS hardcodes colors, px lengths, or hex/rgb/hsl
 * outside of var(--ds-*). Hairlines and focus rings must use border tokens.
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, "..", "src", "components");

const FORBIDDEN = [
  { re: /#[0-9a-fA-F]{3,8}\b/, msg: "hex color" },
  { re: /\b(?:rgb|rgba|hsl|hsla)\s*\(/i, msg: "rgb/hsl color" },
  { re: /\boklch\s*\(/i, msg: "raw oklch (use var(--ds-*))" },
  {
    re: /(?<!var\(--ds-[^)]*)\b\d+(?:\.\d+)?(?:px|rem|em)\b/,
    msg: "hardcoded length (use --ds-border-width-* / --ds-space-* / motion tokens)",
  },
];

const files = readdirSync(dir).filter(
  (f) => f.endsWith(".css") || f.endsWith(".js")
);
let failed = false;

for (const file of files) {
  if (file === "index.js") continue;
  const path = join(dir, file);
  const src = readFileSync(path, "utf8");
  const lines = src.split("\n");
  lines.forEach((line, i) => {
    if (line.trim().startsWith("//") || line.trim().startsWith("*")) return;
    for (const { re, msg } of FORBIDDEN) {
      if (!re.test(line)) continue;
      if (
        file.endsWith(".js") &&
        msg !== "hex color" &&
        msg !== "rgb/hsl color" &&
        msg !== "raw oklch (use var(--ds-*))"
      ) {
        continue;
      }
      console.error(`FAIL ${file}:${i + 1} ${msg}: ${line.trim()}`);
      failed = true;
    }
    if (
      file.endsWith(".css") &&
      /:\s*[^;]*\b(?:red|blue|white|black|gray|grey)\b/i.test(line)
    ) {
      console.error(`FAIL ${file}:${i + 1} named color: ${line.trim()}`);
      failed = true;
    }
  });
}

if (!failed)
  console.log(`OK  linted ${files.length} component files (tokens only)`);
process.exit(failed ? 1 : 0);
