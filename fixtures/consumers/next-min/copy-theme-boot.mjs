import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
mkdirSync(join(root, "public"), { recursive: true });
copyFileSync(
  require.resolve("@soluciones-alexendros/ds/theme-boot"),
  join(root, "public", "theme-boot.js")
);
console.log("copied theme-boot.js → public/");
