import { defineConfig } from "astro/config";

export default defineConfig({
  srcDir: "src",
  outDir: "dist",
  trailingSlash: "always",
  server: { port: 4321 },
});
