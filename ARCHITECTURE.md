# Architecture

### Propósito de este documento

Describe los contenedores del monorepo design-references y sus contratos de consumo.

## Context

Shared design system for Astro and Next/React sites in the Soluciones-Alexendros fleet.

## Containers

| Container | Path | Role |
|-----------|------|------|
| Tokens | `tokens/` | DTCG 2025.10 source of truth (reference → semantic → component) |
| Package | `packages/ds` | Generates CSS `--ds-*`, types, theme-boot, base primitives |
| Docs | `apps/docs` | Astro documentation + playground |
| CI | `.github/workflows/` | `ci.yml` (quality/test/smoke) + `a11y.yml` (contrast + axe) |

## Contracts

- Import `@soluciones-alexendros/ds/styles.css` and `setTheme('light'|'dark'|'system')`.
- Primitives export `renderX(props)` HTML strings and token-only CSS.
- Contrast pairs are declared in `tokens/semantic.json` `$extensions`.

## Non-goals (current)

Full iconography, advanced motion, multi-brand theming, WCAG AAA.
