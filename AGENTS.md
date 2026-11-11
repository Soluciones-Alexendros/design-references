# AGENTS

### Propósito de este documento

Orienta a agentes de código sobre el ciclo de vida Autoworkspace y los límites del design system.

## Pipeline

```text
DEFINE → SCHEMAS → IMPLEMENT → VALIDATE → INTEGRATE → STATUS
```

Fuente de verdad: [`docs/spec/`](docs/spec/) + [`docs/adr/`](docs/adr/). Histórico: `design-references-sdd/`, `.autoworkspace/SPEC.md`. Tasks: `tasks/todo.md`.

## Product rules

- Tokens solo en `tokens/*.json` (DTCG 2025.10). Prefijo `--ds-*`. Pares de contraste: `tokens/contrast.pairs.json` (no DTCG).
- Brands: `tokens/brands/` + `data-brand` (default, archmaker).
- No hardcodear color/spacing/type/radius/shadow/border-width/duration en CSS de componentes.
- Temas: light / dark / system vía `setTheme` + `data-theme`.
- Hasta `0.1.0`: política de estabilidad en `docs/spec/stability.md` (sin alias obligatorio al renombrar).
- No invocar `local-maintenance`, `local-security`, `local-email` ni `project-publish` sin petición explícita del operador.
- `role-front` / `role-design` solo con superficie UI/visual real.

## Commands

```bash
npm run validate:tokens
npm test
npm run test:structure
npm run test:a11y -w @soluciones-alexendros/ds
npm run dev -w @soluciones-alexendros/ds-docs
```
