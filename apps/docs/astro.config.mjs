import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://design.alexendros.dev",
  srcDir: "src",
  outDir: "dist",
  trailingSlash: "always",
  server: { port: 4321 },
});
