# Implementation Plan: docs-surface-sync + next-primitives-scope

## Overview

Tras la SPEC aprobada en `.autoworkspace/SPEC.md` (2026-11-10), alinear la homepage pública con el inventario de 7 primitives y añadir Select, Checkbox y Banner solo con tokens `--ds-*` existentes. Sin tocar `tokens/`, sin motion, sin iconos, sin multi-brand.

## Architecture Decisions

- **Homepage = mirror de `components.md`.** Criterio de `docs-surface-sync`: los siete nombres (Button, Input, Card, Alert, Link, Stack, Field) aparecen en [apps/docs/src/pages/index.astro](../apps/docs/src/pages/index.astro).
- **Select nativo `<select>`.** No Combobox custom; mismo contrato parcial que Input (`invalid`, `describedBy`, disabled, `:focus-visible`).
- **Checkbox = input nativo + label visible.** Sin dependencias; tokens de superficie/borde/foco/disabled ya usados por Input.
- **Banner = feedback persistente.** Reutiliza pares de tono de Alert; no Toast (sin timer/cola/motion). En axe con `role` status|alert + prefijo textual.
- **Axe scope.** Select + Checkbox + Banner en el fixture; Stack/Card fuera.
- **Cero tokens / pares nuevos.** `test:contrast` debe pasar sin cambios en `tokens/` ni en el contrast runner.
- **CI dual intacta.** `ci.yml` = quality/test/smoke; `a11y.yml` = contrast + axe.
- **Orden.** Docs sync primero (diff mínimo, deploy automático a `design.alexendros.dev`); luego primitives.

## Parallelism

```text
docs-surface-sync ──► T1 homepage inventory sync ──► CP-A
                                                         │
next-primitives ──────► T2 Select ──► T3 Checkbox ──► T4 Banner ──► T5 wire+a11y+playground ──► CP-B
                                                         │
                                                         ▼
                                                CP-C cierre conjunto
```

T2–T4 pueden solaparse entre sí tras CP-A; T5 espera T2–T4.

## Task List

Detalle en [`tasks/todo.md`](todo.md). Índice:

### Línea A — `docs-surface-sync`

- [x] T1: Homepage lista los 7 primitives

### Checkpoint A

- [x] Homepage alineada con `components.md`; build docs OK

### Línea B — `next-primitives-scope`

- [x] T2: Select + contrato parcial
- [x] T3: Checkbox + contrato parcial
- [x] T4: Banner + contrato parcial
- [x] T5: Barrel, playground, a11y-runner, test-primitives

### Checkpoint B

- [x] lint:tokens-only, test:primitives, test:a11y, test:contrast, playground build

### Checkpoint C — Cierre

- [x] `npm test` + build docs OK
- [x] Diff sin cambios en `tokens/` ni alcance fuera de SPEC
- [x] Listo para SCHEMAS evidence / IMPLEMENT handoff — **no** `project-publish` implícito

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Select custom styling rompe tokens-only | Med | Copiar patrón CSS de Input; lint:tokens-only en cada T |
| Banner duplica Alert sin valor | Low | Contrato distinto (body libre + persistente); documentar en components.md |
| Axe noise en Checkbox/Select nativos | Med | Fixture mínimo; umbral serious/critical sin bajar |
| Homepage copy diverge de components.md | Low | Checklist de los 7 nombres en verificación T1 |

## Open Questions

Ninguna. SPEC aprobada con asunciones 1–7 (Select nativo, Banner no Toast, cero tokens, Node engines actuales).

## Next after PLAN/TASKS

Con PLAN/TASKS aceptados: fase Autoworkspace **SCHEMAS** (schemas + stubs) → **IMPLEMENT** con `role-front` + `role-design` (y `role-clean-code` solo si hay refactor). No `project-publish` sin petición explícita.
