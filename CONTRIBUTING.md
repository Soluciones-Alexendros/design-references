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

## Structure

See `ARCHITECTURE.md` and `AGENTS.md` for agent/human orientation.
