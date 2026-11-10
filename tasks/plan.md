# Implementation Plan: repo-structure + primitives-link-stack-field

## Overview

Tras la SPEC aprobada en `.autoworkspace/SPEC.md`, implementar en paralelo (con checkpoints) el cierre P1 de estructura del repo y tres primitives mínimos (Link, Stack, Field) que reutilizan tokens `--ds-*` existentes, sin reabrir paleta/iconos/motion/multi-brand.

## Architecture Decisions

- **Checker P1 como gate de `repo-structure`.** El criterio de cierre es `check-product-structure.sh` perfil P1, no un invento ad hoc de ficheros.
- **CI dual.** `ci.yml` = quality / test / smoke. `a11y.yml` permanece dueño de contrast + axe (sin duplicar).
- **Renovate canónico bajo `.github/`.** Mover `renovate.json` → `.github/renovate.json`; no Dependabot.
- **Primitives = `renderX` + CSS tokens-only.** Mismo patrón que Button/Input/Card/Alert. Field compone `renderInput` (ya soporta `describedBy` / `invalid`).
- **Link usa `--ds-color-text-link`.** Par contrast `text.link / bg.surface` ya en `$extensions`; cero tokens nuevos.
- **Axe scope.** Link + Field en el fixture; Stack fuera (como Card). `:focus-visible` assert en `Link.css`.
- **Docs workspace dep.** `"@soluciones-alexendros/ds": "*"` (link npm workspaces; `workspace:*` no usable en este npm).
- **Acciones pinneadas.** Mismos SHA que `a11y.yml` (`checkout@11d5960…`, `setup-node@49933ea…`) + `permissions: contents: read`.

## Parallelism

```text
repo-structure ──► T1 meta/docs ──► T2 makefile/env ──► T3 github/ci/renovate ──► CP-A
                                                                             │
primitives ──────► T4 Link ──► T5 Stack ──► T6 Field ──► T7 wire+a11y+playground ──► CP-B
                                                                             │
                                                                             ▼
                                                                    CP-C cierre conjunto
```

Las dos líneas no se bloquean mutuamente. CP-C exige ambas.

## Task List

Detalle completo en [`tasks/todo.md`](todo.md). Índice:

### Línea A — `repo-structure`

- [ ] T1: Meta docs P1 + propósito
- [ ] T2: Makefile + `.env.example` + árbol `docs/`
- [ ] T3: GitHub (CODEOWNERS, PR template, Renovate move, `ci.yml`, workspace:*)

### Checkpoint A

- [ ] Checker P1 OK; sin Dependabot; Renovate solo en `.github/`

### Línea B — `primitives-link-stack-field`

- [ ] T4: Link + contrato parcial
- [ ] T5: Stack + contrato parcial
- [ ] T6: Field + contrato parcial
- [ ] T7: Barrel, playground, a11y-runner, exports

### Checkpoint B

- [ ] lint:tokens-only, test:a11y, test:contrast, playground build

### Checkpoint C — Cierre

- [ ] Checker P1 OK + `npm test` + build docs + a11y verde
- [ ] Diff sin tokens nuevos ni alcance fuera de SPEC

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Checker P1 exige wording exacto `### Propósito de este documento` | Med | Copiar heading literal; verificar con el script |
| Field rompe label/ARIA al componer Input | Med | Reusar `describedBy`/`invalid` de Input; fixture axe con error visible |
| `ci.yml` smoke lento o flaky (Astro) | Med | Job aislado; no mezclar con a11y |
| Renovate raíz + `.github/` duplicados | Low | Borrar raíz en el mismo commit que el move |
| Acciones `@v4` por error | High | Copiar SHA desde `a11y.yml` |

## Open Questions

Ninguna. SPEC aprobada 2026-11-10; asunción 2 confirmada por el operador.

## Next after PLAN/TASKS

Con PLAN/TASKS aceptados: fase Autoworkspace **SCHEMAS** (schemas de aceptación + stubs) → **IMPLEMENT** tarea a tarea con `role-front` + `role-design` (+ `role-clean-code` si hay refactor). No `project-publish` sin petición explícita.
