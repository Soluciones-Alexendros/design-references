# design-references

### Propósito de este documento

Presenta el núcleo común del design system (`--ds-*`, theme-boot, primitives y docs) para la flota Astro/Next.

## Package

`@soluciones-alexendros/ds` (aún **no publicado** en npm).

```js
import "@soluciones-alexendros/ds/styles.css";
import { setTheme } from "@soluciones-alexendros/ds";

setTheme("dark"); // "light" | "dark" | "system"
```

Exports actuales: `.`, `./styles.css`, `./tokens`, `./package.json`. Tokens: `tokens/*.json` (DTCG 2025.10, OKLCH).

**Fuente de verdad:** [`docs/spec/`](docs/spec/) · decisiones: [`docs/adr/`](docs/adr/). Histórico: `design-references-sdd/`, `.autoworkspace/SPEC.md`.

Sitio: [design.alexendros.dev](https://design.alexendros.dev) (alias `*.vercel.app` → 308; ver ADR-0008).

## Scripts

```bash
npm install
npm run validate:tokens
npm run build -w @soluciones-alexendros/ds
npm test
npm run test:structure
npm run dev -w @soluciones-alexendros/ds-docs
```

CI job `a11y` (`.github/workflows/a11y.yml`): contrast runner + axe-core en light/dark.
