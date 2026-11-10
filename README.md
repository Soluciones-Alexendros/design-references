# design-references

Núcleo común del design system: variables de diseño `--ds-*`, theme-boot y test de contraste (zedazo, ArchMaker, alexendros.dev).

## Package

`@soluciones-alexendros/ds` (provisional)

```js
import "@soluciones-alexendros/ds/styles.css";
import { setTheme } from "@soluciones-alexendros/ds";

setTheme("dark"); // "light" | "dark" | "system"
```

Source of truth: `tokens/*.json` (DTCG 2025.10, colores OKLCH). Spec aprobada en `design-references-sdd/`.

## Scripts

```bash
npm install
npm run validate:tokens
npm run build -w @soluciones-alexendros/ds
npm test
npm run dev -w @soluciones-alexendros/ds-docs
```

CI job `a11y` (`.github/workflows/a11y.yml`): contrast runner + axe-core en light/dark.
