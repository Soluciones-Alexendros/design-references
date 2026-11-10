# Spec: design-references — DEFINE (docs surface + siguiente capa)

## Capability Map

| Module id | Responsibility | Depends on |
|-----------|----------------|------------|
| docs-surface-sync | Alinear la superficie pública (`design.alexendros.dev`) con el inventario real de primitives | inventario en `packages/ds/src/components.md` (ya en `main`) |
| next-primitives-scope | Definir e implementar como máximo 3 primitives de la siguiente capa, solo con tokens `--ds-*` existentes | docs-surface-sync (puede ir en paralelo tras aprobación; no bloquea la escritura de la spec) |

Build order (implementación): `docs-surface-sync` primero (cambio mínimo de docs); luego `next-primitives-scope`. No reabrir paleta, iconos, motion ni multi-brand. No tocar `tokens/`.

## ASSUMPTIONS I'M MAKING

1. Tip de producto: `main` @ `e85084a` (P1 + Link/Stack/Field + recibos INTEGRATE). Docs live en https://design.alexendros.dev/.
2. El inventario canónico son los 7 primitives de [packages/ds/src/components.md](../packages/ds/src/components.md): Button, Input, Card, Alert, Link, Stack, Field.
3. La homepage pública ([apps/docs/src/pages/index.astro](../apps/docs/src/pages/index.astro)) aún lista solo Button, Input, Card, Alert — eso es el gap de `docs-surface-sync`.
4. Siguiente capa (máximo 3): **Select**, **Checkbox**, **Banner** (feedback no modal; no Toast con timer/cola en esta capa).
5. Cero tokens nuevos; cero pares de contraste nuevos. Reutilizar pares ya en el contrast runner (`text.on-surface`, `border.focus`, `text.link`, tones de Alert, etc.).
6. Stack y Card (y Banner si se define no interactivo) fuera de axe; Select y Checkbox en axe + `:focus-visible`. Banner con `role="status"|"alert"` como Alert, en axe si anuncia estado.
7. Node `engines` del repo (`>=22.23.4`); Astro docs en la versión de `main`. `ci.yml` no duplica contrast/axe (`a11y.yml` sigue siendo el dueño).
→ Correct me now or I'll proceed with these.

## Objective

Cerrar DEFINE con una fuente de verdad aprobable para:

1. **docs-surface-sync** — homepage (y textos públicos inconsistentes) alineados con el inventario de 7 primitives; `/tokens` y `/playground` siguen correctos.
2. **next-primitives-scope** — Select, Checkbox y Banner especificados e implementables sin ampliar el sistema de tokens.

Continúa la opción A de `design-references-sdd/spec.md` y el cierre P1/Link/Stack/Field ya en `main`.

## Tech Stack

- Monorepo npm workspaces: `packages/ds` (`@soluciones-alexendros/ds`), `apps/docs` (`@soluciones-alexendros/ds-docs`)
- Tokens: DTCG 2025.10 JSON → CSS OKLCH + tipos (`--ds-*`); **sin cambios en esta iniciativa**
- Docs: Astro (versión en `main`); deploy Vercel proyecto `design-references` → `design.alexendros.dev`
- CI: GitHub Actions; `ci.yml` = quality/test/smoke; `a11y.yml` = contrast + axe
- Primitives: `renderX(props)` → HTML string + CSS tokens-only (mismo patrón que Button/Input/Link/Field)

## Commands

```bash
npm install
npm run validate:tokens
npm run lint:tokens-only -w @soluciones-alexendros/ds
npm test
npm run build -w @soluciones-alexendros/ds
npm run build -w @soluciones-alexendros/ds-docs
npm run test:a11y -w @soluciones-alexendros/ds
npm run test:contrast -w @soluciones-alexendros/ds
npm run test:primitives -w @soluciones-alexendros/ds
npm run test:acceptance
npm run dev -w @soluciones-alexendros/ds-docs
```

## Project Structure (target deltas)

```text
apps/docs/src/pages/index.astro          # lista los 7 primitives
packages/ds/src/components/{Select,Checkbox,Banner}.{js,css}
packages/ds/src/components.md            # entradas Select, Checkbox, Banner
packages/ds/src/components/index.js      # export renderSelect, renderCheckbox, renderBanner
packages/ds/scripts/a11y-runner.mjs      # Select + Checkbox (+ Banner si interactivo/anunciable)
packages/ds/scripts/test-primitives.mjs  # contratos parciales
apps/docs/src/pages/playground.astro     # montar los tres
# tokens/ sin cambios
```

## Code Style

- Solo variables `--ds-*` en CSS nuevo; `lint:tokens-only` en verde.
- Focus interactivo: `:focus-visible` con `--ds-color-border-focus`.
- Feedback no depende solo del color (prefijo textual o equivalente, como Alert/Field).
- Docs meta existentes no se reabren salvo que el sync de homepage lo exija.

## Testing Strategy

- **docs-surface-sync:** inspección + build docs; homepage enumera Button, Input, Card, Alert, Link, Stack, Field en el mismo orden/semántica que `components.md`.
- **next-primitives-scope:** `lint:tokens-only`; `test:primitives`; `test:a11y` (Select, Checkbox; Banner según contrato); `test:contrast` sin pares nuevos; playground build.
- Smoke: `npm run build -w @soluciones-alexendros/ds-docs`.

## Boundaries

### Always

- Consumir solo tokens `--ds-*` ya generados.
- Mantener umbrales contrast 4.5:1 / 3:1 y axe serious/critical.
- Mantener Stack/Card fuera del fixture axe.
- Declarar `permissions: contents: read` si se tocan workflows (no previsto).

### Ask first

- Sustituir Select por Combobox, o Banner por Toast.
- Nuevos tokens / escalas de color / pares de contraste.
- Publicar el paquete npm o invocar `project-publish`.
- Cambiar el dominio público o el proyecto Vercel.

### Never

- Modificar `tokens/` (reference, semantic, component).
- Reabrir paleta, iconografía completa, motion avanzado o multi-brand.
- Duplicar contrast/axe dentro de `ci.yml`.
- Hardcodear color/spacing/type en CSS de primitives.
- Commitear secretos.

---

## Capability: `docs-surface-sync`

### Deliverables

| Artefacto | Criterio |
|-----------|----------|
| `apps/docs/src/pages/index.astro` | El copy lista los 7 primitives del inventario (Button, Input, Card, Alert, Link, Stack, Field); no omite Link/Stack/Field |
| `/tokens` | Sin regresión; sigue documentando tokens + contraste |
| `/playground` | Sin regresión; ya monta Link/Stack/Field además de los base |
| Criterio de verdad | Texto de homepage coherente con `packages/ds/src/components.md` |

### Success criteria (`docs-surface-sync`)

1. Homepage menciona los siete nombres del inventario (no solo Button/Input/Card/Alert).
2. `npm run build -w @soluciones-alexendros/ds-docs` pasa.
3. No hay cambios en `tokens/` ni en CSS de primitives en esta capability.

---

## Capability: `next-primitives-scope`

### Select (forms)

- **Modules:** `Select.js` + `Select.css`
- **Props:** `id`, `options` (value/label), `disabled?`, `invalid?`, `describedBy?` (alineado con Input)
- **Markup:** `<select class="ds-select">` nativo (no Combobox custom en esta capa)
- **Tokens:** reutilizar superficie/borde/foco/disabled de Input (`--ds-color-bg-surface-elevated`, `--ds-color-text-on-surface`, `--ds-color-border-*`, `--ds-color-border-focus`, spacing/type/radius de control)
- **A11y:** `:focus-visible`; `aria-invalid` cuando `invalid`; en axe light/dark

### Checkbox (forms)

- **Modules:** `Checkbox.js` + `Checkbox.css`
- **Props:** `id`, `label`, `checked?`, `disabled?`
- **Markup:** `<input type="checkbox">` + label visible asociado
- **Tokens:** text on surface, border default/focus, disabled pairs existentes; touch/spacing existentes
- **A11y:** label visible; `:focus-visible`; en axe light/dark; no solo color para estado

### Banner (feedback)

- **Modules:** `Banner.js` + `Banner.css`
- **Props:** `tone`: `info` \| `success` \| `warning` \| `error`; `role?: status|alert`; `body` (texto/HTML)
- **Behavior:** feedback persistente en página (no cola Toast, no auto-dismiss en esta capa)
- **Tokens:** mismos pares de tono que Alert (`bg`/`text` primary|success|warning|error + spacing/type)
- **A11y:** `role="status"` o `role="alert"`; prefijo textual de tono (como Alert); en fixture axe

### Shared updates

- Entradas en `packages/ds/src/components.md`.
- Export desde `packages/ds/src/components/index.js`.
- Montaje en `apps/docs/src/pages/playground.astro`.
- Extender `a11y-runner.mjs` y `test-primitives.mjs`.
- Stack/Card siguen fuera de axe.

### Success criteria (`next-primitives-scope`)

1. `npm run lint:tokens-only -w @soluciones-alexendros/ds` pasa.
2. `npm run test:primitives -w @soluciones-alexendros/ds` pasa con contratos Select/Checkbox/Banner.
3. `npm run test:a11y -w @soluciones-alexendros/ds` pasa con Select, Checkbox y Banner en el fixture.
4. `npm run test:contrast -w @soluciones-alexendros/ds` pasa sin tokens ni pares nuevos.
5. Playground renderiza los tres; theme-boot sigue funcionando.
6. Ningún valor hardcodeado de color/spacing/type en el CSS nuevo.

## Success Criteria (conjunto)

- Esta SPEC aprobada por el operador.
- Tras IMPLEMENT (fuera de este DEFINE): homepage alineada + Select/Checkbox/Banner documentados, testeados y en playground; docs build verde.
- Diff de producto de DEFINE: solo `.autoworkspace/SPEC.md` (y tablero tasks si se regenera en PLAN). Sin implementación en este paso.

## Open Questions

Ninguna bloqueante si se aceptan las asunciones 4–6 (Select nativo, no Combobox; Banner no Toast). Corregir ahora si se prefiere otra terna.

## Estado DEFINE

- **SPEC:** aprobada por el operador (2026-11-10); asunciones 1–7 confirmadas (Select nativo, Banner no Toast, cero tokens, Node engines actuales).
- **PLAN/TASKS:** [`tasks/plan.md`](../tasks/plan.md), [`tasks/todo.md`](../tasks/todo.md) — aceptados.
- **SCHEMAS:** schemas DS/NP + inventario; RED→GREEN vía `test:acceptance`.
- **IMPLEMENT:** T1–T5 cerradas en esta sesión (`npm test` + docs build OK). Sin cambios en `tokens/`.
- **Base:** `main` @ `e85084a` + working tree local; superficie pública `design.alexendros.dev` (redeploy al merge).
- **Stop antes de project-publish.** PR/merge solo con petición explícita.

VALIDATE/INTEGRATE/`project-publish` requieren petición explícita.
