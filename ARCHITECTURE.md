# Architecture

### Propósito de este documento

Describe los contenedores del monorepo design-references y sus contratos de consumo.

## Context

Shared design system for Astro and Next/React sites in the Soluciones-Alexendros fleet. Spec: [`docs/spec/`](docs/spec/). ADRs: [`docs/adr/`](docs/adr/).

## Containers

| Container | Path                      | Role                                                        |
| --------- | ------------------------- | ----------------------------------------------------------- |
| Spec      | `docs/spec/`, `docs/adr/` | Fuente de verdad viva                                       |
| Tokens    | `tokens/`                 | DTCG 2025.10 (reference → semantic → component)             |
| Package   | `packages/ds`             | CSS `--ds-*`, types, theme-boot, primitives                 |
| Docs      | `apps/docs`               | Astro documentation + playground                            |
| CI        | `.github/workflows/`      | `ci.yml` (quality/test/smoke) + `a11y.yml` (contrast + axe) |

## Contracts

- Import `@soluciones-alexendros/ds/styles.css` and `setTheme('light'|'dark'|'system')`.
- Primitives export `renderX(props)` HTML strings and token-only CSS (meta CSS-first: ADR-0002).
- Contrast pairs live in `tokens/contrast.pairs.json` (outside DTCG; `validate-dtcg` excludes it). Runner: `test:contrast` with WCAG 2.2 AA margins.
- Brands: `tokens/brands/` + `data-brand` (default + archmaker). Theme × brand contrast matrix in CI.
- Package not yet on npm; fleet does not consume it as a dependency (F0/F1-00).

## Non-goals (current)

Full iconography, advanced motion choreography, WCAG AAA.
