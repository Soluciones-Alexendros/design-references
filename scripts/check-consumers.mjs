#!/usr/bin/env node
/**
 * F4-03 / F4-06: pack → install tarball only → build → axe (Playwright Chromium).
 * G-CONS: fail if consumers resolve @soluciones-alexendros/ds from packages/ds source.
 */
import {
  mkdirSync,
  rmSync,
  readdirSync,
  readFileSync,
  existsSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { createServer } from "node:http";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const consumersRoot = join(root, "fixtures", "consumers");
const tarballDir = join(consumersRoot, ".tarballs");
const consumers = ["astro-min", "next-min"];

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {
    encoding: "utf8",
    cwd: opts.cwd || root,
    env: { ...process.env, ...(opts.env || {}) },
    stdio: opts.stdio || "pipe",
  });
  if (r.status !== 0) {
    console.error(r.stdout);
    console.error(r.stderr);
    throw new Error(`${cmd} ${args.join(" ")} failed (${r.status})`);
  }
  return r;
}

function ok(msg) {
  console.log(`OK    ${msg}`);
}

rmSync(tarballDir, { recursive: true, force: true });
mkdirSync(tarballDir, { recursive: true });

run("npm", ["run", "build", "-w", "@soluciones-alexendros/ds"]);
run("npm", [
  "pack",
  "--ignore-scripts",
  "-w",
  "@soluciones-alexendros/ds",
  "--pack-destination",
  tarballDir,
]);

const tgz = readdirSync(tarballDir).find((f) => f.endsWith(".tgz"));
if (!tgz) throw new Error("no tarball produced");
const tarballPath = join(tarballDir, tgz);
ok(`packed ${tgz}`);

for (const name of consumers) {
  const dir = join(consumersRoot, name);
  rmSync(join(dir, "node_modules"), { recursive: true, force: true });
  rmSync(join(dir, "package-lock.json"), { force: true });
  rmSync(join(dir, "dist"), { recursive: true, force: true });
  rmSync(join(dir, "out"), { recursive: true, force: true });
  rmSync(join(dir, ".next"), { recursive: true, force: true });

  run("npm", ["install", "--no-fund", "--no-audit"], { cwd: dir });
  run("npm", ["install", "--no-fund", "--no-audit", tarballPath], { cwd: dir });

  const lock = readFileSync(join(dir, "package-lock.json"), "utf8");
  if (
    lock.includes("packages/ds") ||
    /file:.*\/packages\/ds/.test(lock) ||
    lock.includes('"link": true')
  ) {
    throw new Error(`G-CONS fail [${name}]: lock references monorepo source`);
  }
  if (!lock.includes(".tgz") && !lock.includes(tgz.replace(/\.tgz$/, ""))) {
    // npm may record integrity without filename; require resolved ends with .tgz
    const pkg = JSON.parse(lock);
    const resolved =
      pkg.packages?.["node_modules/@soluciones-alexendros/ds"]?.resolved ||
      pkg.dependencies?.["@soluciones-alexendros/ds"]?.resolved ||
      "";
    if (!String(resolved).endsWith(".tgz") && !resolved.includes(".tarballs")) {
      throw new Error(
        `G-CONS fail [${name}]: ds resolved=${resolved || "(empty)"} (want tarball)`
      );
    }
  }
  ok(`G-CONS [${name}] installed from tarball`);

  run("npm", ["run", "build"], { cwd: dir });
  ok(`build [${name}]`);
}

async function serveStatic(dir) {
  const { createReadStream, statSync } = await import("node:fs");
  const { extname } = await import("node:path");
  const types = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".svg": "image/svg+xml",
    ".json": "application/json",
  };
  const server = createServer((req, res) => {
    let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (urlPath.endsWith("/")) urlPath += "index.html";
    const file = join(dir, urlPath.replace(/^\//, ""));
    try {
      const st = statSync(file);
      if (!st.isFile()) throw new Error("dir");
      res.writeHead(200, {
        "content-type": types[extname(file)] || "text/plain",
      });
      createReadStream(file).pipe(res);
    } catch {
      res.writeHead(404).end("not found");
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  return { server, base: `http://127.0.0.1:${port}` };
}

async function axeUrl(url, label) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  await context.close();
  await browser.close();
  if (results.violations.length) {
    console.error(
      `FAIL axe [${label}] ${results.violations.length} violation(s)`
    );
    for (const v of results.violations.slice(0, 6)) {
      console.error(`  - ${v.id}: ${v.help}`);
    }
    throw new Error(`axe failed for ${label}`);
  }
  ok(`axe [${label}] 0 violations`);
}

const astroDist = join(consumersRoot, "astro-min", "dist");
const nextOut = join(consumersRoot, "next-min", "out");
if (!existsSync(astroDist)) throw new Error("astro dist missing");
if (!existsSync(nextOut)) throw new Error("next out missing");

const a = await serveStatic(astroDist);
await axeUrl(`${a.base}/`, "astro-min");
a.server.close();

const n = await serveStatic(nextOut);
await axeUrl(`${n.base}/`, "next-min");
n.server.close();

console.log("PASS check-consumers (tarball only)");
