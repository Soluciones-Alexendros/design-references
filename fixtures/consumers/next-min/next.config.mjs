import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  // Keep tracing inside the fixture (avoid monorepo root lockfile confusion).
  outputFileTracingRoot: dir,
  turbopack: { root: dir },
};

export default nextConfig;
