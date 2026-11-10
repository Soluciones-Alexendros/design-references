#!/usr/bin/env node
/**
 * SCHEMAS stubs: fail until SPEC acceptance criteria paths/exports exist.
 * Run: node scripts/acceptance-stubs.mjs
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const schemaDir = join(root, ".autoworkspace", "schemas");
let failed = 0;

function fail(id, msg) {
  console.error(`FAIL ${id}: ${msg}`);
  failed += 1;
}

function runSchema(file) {
  const schema = JSON.parse(readFileSync(join(schemaDir, file), "utf8"));
  for (const c of schema.criteria) {
    switch (c.assert) {
      case "files_exist":
        for (const p of c.paths) {
          if (!existsSync(join(root, p))) fail(c.id, `missing file ${p}`);
        }
        break;
      case "dirs_exist":
        for (const p of c.paths) {
          const abs = join(root, p);
          if (!existsSync(abs) || !statSync(abs).isDirectory()) fail(c.id, `missing dir ${p}`);
        }
        break;
      case "file_absent":
        for (const p of c.paths) {
          if (existsSync(join(root, p))) fail(c.id, `must not exist ${p}`);
        }
        break;
      case "files_contain":
        for (const p of c.paths) {
          const abs = join(root, p);
          if (!existsSync(abs)) {
            fail(c.id, `missing file ${p}`);
            continue;
          }
          if (!readFileSync(abs, "utf8").includes(c.needle)) {
            fail(c.id, `${p} missing ${JSON.stringify(c.needle)}`);
          }
        }
        break;
      case "exports_named": {
        const abs = join(root, c.path);
        if (!existsSync(abs)) {
          fail(c.id, `missing ${c.path}`);
          break;
        }
        const src = readFileSync(abs, "utf8");
        for (const name of c.names) {
          if (!src.includes(name)) fail(c.id, `${c.path} missing export ${name}`);
        }
        break;
      }
      case "ci_jobs": {
        const abs = join(root, c.path);
        if (!existsSync(abs)) {
          fail(c.id, `missing ${c.path}`);
          break;
        }
        const src = readFileSync(abs, "utf8");
        for (const job of c.jobs) {
          if (!new RegExp(`^\\s*${job}:`, "m").test(src)) fail(c.id, `ci missing job ${job}`);
        }
        if (/test:a11y|test:contrast|axe-core|contrast runner/i.test(src)) {
          fail(c.id, "ci.yml must not duplicate a11y/contrast");
        }
        break;
      }
      case "package_json_dep": {
        const abs = join(root, c.path);
        if (!existsSync(abs)) {
          fail(c.id, `missing ${c.path}`);
          break;
        }
        const pkg = JSON.parse(readFileSync(abs, "utf8"));
        const val = pkg.dependencies?.[c.name] ?? pkg.devDependencies?.[c.name];
        if (val !== c.value) fail(c.id, `${c.name}=${JSON.stringify(val)} want ${c.value}`);
        break;
      }
      default:
        fail(c.id, `unknown assert ${c.assert}`);
    }
  }
}

const files = readdirSync(schemaDir).filter((f) => f.endsWith(".acceptance.json"));
if (files.length === 0) {
  console.error("FAIL: no .acceptance.json under .autoworkspace/schemas");
  process.exit(1);
}

for (const f of files) runSchema(f);

if (failed) {
  console.error(`acceptance stubs: ${failed} failure(s)`);
  process.exit(1);
}
console.log(`OK  acceptance stubs (${files.length} schemas)`);
