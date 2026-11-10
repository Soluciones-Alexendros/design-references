# AGENTS

### Propósito de este documento

Orienta a agentes de código sobre el ciclo de vida Autoworkspace y los límites del design system.

## Pipeline

```text
DEFINE → SCHEMAS → IMPLEMENT → VALIDATE → INTEGRATE → STATUS
```

Source of truth for the current initiative: `.autoworkspace/SPEC.md`. Tasks: `tasks/todo.md`.

## Product rules

- Tokens live in `tokens/*.json` (DTCG 2025.10). Do not hardcode colors/spacing/type in component CSS.
- Prefix: `--ds-*`. Themes: light / dark / system via `setTheme` + `data-theme`.
- Do not invoke `local-maintenance`, `local-security`, `local-email` or `project-publish` without an explicit operator request.
- `role-front` and `role-design` only when touching real UI/visual surfaces.

## Commands

```bash
npm run validate:tokens
npm test
npm run test:a11y -w @soluciones-alexendros/ds
npm run dev -w @soluciones-alexendros/ds-docs
node scripts/acceptance-stubs.mjs
```
