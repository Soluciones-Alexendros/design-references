# Contributing

### Propósito de este documento

Explica cómo contribuir al monorepo del design system (tokens, paquete y docs).

## Setup

```bash
npm install
npm test
```

Node `>=22.23.4` required (Astro 7).

## Workflow

1. Branch from `main`.
2. Keep visual values in DTCG tokens (`tokens/`); components consume only `--ds-*`.
3. Run `npm test` and, for docs, `npm run build -w @soluciones-alexendros/ds-docs`.
4. Open a PR using the repository template.

## Language

- Prosa (documentación, ADR, explicaciones): **español**.
- Identificadores, props, nombres de código y scripts npm: **inglés**.
- Conventional Commits y la plantilla de PR del repo siguen vigentes.
- Release: `.github/workflows/release.yml` (`workflow_dispatch`: `dry-run` | `version`). No publica a npm hasta F4-05 + aprobación explícita (ADR-0005).

## Structure

See `ARCHITECTURE.md`, `AGENTS.md`, and `docs/spec/` for orientation.
