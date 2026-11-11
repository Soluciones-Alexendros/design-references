# Inventario actual vs objetivo

### Propósito de este documento

Contrasta el mapa real del paquete (verificado en Fase 0–2) con la meta de exports y superficie.

## Exports reales (`packages/ds/package.json`)

| Subpath          | Estado                                      |
| ---------------- | ------------------------------------------- |
| `.`              | presente (`setTheme`, API JS)               |
| `./styles.css`   | presente (tokens CSS)                       |
| `./tokens.css`   | alias → `./dist/styles.css`                 |
| `./tokens`       | presente (tipos)                            |
| `./theme`        | presente (`setTheme`, `THEME_STORAGE_KEY`)  |
| `./css`          | presente (layers + component CSS flattened) |
| `./astro`        | presente (wrappers `.astro` vía renderX)    |
| `./react`        | presente (wrappers + `renderX` deprecated)  |
| `./package.json` | presente                                    |

## Primitives actuales

Button, Input, Card, Alert, Link, Stack, Field, Select, Checkbox, Banner — módulos en `packages/ds/src/components/`, contrato de módulos en `packages/ds/src/components.md`, specs vivas en [`components/`](components/), montados en playground.

## Tokens publicados en CSS

| Categoría                                                                       | Estado  |
| ------------------------------------------------------------------------------- | ------- |
| Espacio (`--ds-space-*`)                                                        | sí      |
| Tipografía (`--ds-type-*`)                                                      | sí      |
| Radius (`--ds-radius-*`)                                                        | sí      |
| Elevación / sombra (`--ds-elevation-*`; `shadow` ≡ `elevation`)                 | sí      |
| Motion (`--ds-motion-duration-*`, `--ds-motion-easing-*`)                       | sí (F2) |
| Border width / focus offset (`--ds-border-width-*`, `--ds-border-offset-focus`) | sí (F2) |
| Color semántico + marcas (`data-brand`)                                         | sí (F2) |

## Contraste

Pares en `tokens/contrast.pairs.json` (excluido de DTCG). Márgenes WCAG 2.2 AA; matriz tema × marca.

## Docs públicas

Astro en `apps/docs` → `design.alexendros.dev` (homepage, `/tokens`, `/playground`). Starlight: decisión pendiente (ADR-0006).
