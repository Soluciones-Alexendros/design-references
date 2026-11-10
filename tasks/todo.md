# Tasks — docs-surface-sync + next-primitives-scope

Fuente de verdad: `.autoworkspace/SPEC.md` (aprobada). Plan: `tasks/plan.md`.

---

## Task 1: Homepage inventory sync

**Description:** Actualizar el copy de la homepage para listar los 7 primitives del inventario canónico.

**Acceptance criteria:**
- [x] `apps/docs/src/pages/index.astro` menciona Button, Input, Card, Alert, Link, Stack y Field
- [x] El texto es coherente con `packages/ds/src/components.md` (mismos nombres; sin inventar componentes)
- [x] Enlaces a `/tokens/` y `/playground/` se mantienen

**Verification:**
- [x] Grep/inspección de los siete nombres en `index.astro`
- [x] `npm run build -w @soluciones-alexendros/ds-docs`

**Dependencies:** None

**Implementation roles:** role-front (superficie docs)

**Test surfaces:** docs smoke build

**Files likely touched:**
- `apps/docs/src/pages/index.astro`

**Estimated scope:** Small

---

## Checkpoint A — tras T1 (`docs-surface-sync`)

- [x] Homepage alineada con inventario
- [x] Build docs OK
- [x] Sin cambios en `tokens/` ni CSS de primitives

---

## Task 2: Select primitive

**Description:** Añadir Select nativo (`renderSelect`) con CSS tokens-only y `:focus-visible`.

**Acceptance criteria:**
- [x] `Select.js` + `Select.css`; props `id`, `options` (value/label), `disabled?`, `invalid?`, `describedBy?`
- [x] Markup `<select class="ds-select">` nativo
- [x] Solo tokens `--ds-*` (misma familia que Input: surface, border, focus, disabled, type, space, radius)
- [x] Entrada Select en `components.md`

**Verification:**
- [x] `npm run lint:tokens-only -w @soluciones-alexendros/ds` (debe pasar al cerrar T2 o a más tardar en T5)
- [x] Inspección `:focus-visible` y `aria-invalid` en markup/CSS

**Dependencies:** None tras CP-A (puede empezar en paralelo con T3/T4)

**Implementation roles:** role-design, role-front

**Test surfaces:** `renderSelect`; Select.css focus-visible

**Files likely touched:**
- `packages/ds/src/components/Select.js`
- `packages/ds/src/components/Select.css`
- `packages/ds/src/components.md`

**Estimated scope:** Small–Medium

---

## Task 3: Checkbox primitive

**Description:** Checkbox nativo con label visible asociado.

**Acceptance criteria:**
- [x] `Checkbox.js` + `Checkbox.css`; props `id`, `label`, `checked?`, `disabled?`
- [x] Label visible asociado al input; tokens existentes únicamente
- [x] `:focus-visible` con `--ds-color-border-focus`
- [x] Entrada Checkbox en `components.md`

**Verification:**
- [x] `npm run lint:tokens-only -w @soluciones-alexendros/ds`
- [x] Markup con asociación label/`for` o wrapping correcto

**Dependencies:** None (paralelo a T2/T4)

**Implementation roles:** role-design, role-front

**Test surfaces:** `renderCheckbox`

**Files likely touched:**
- `packages/ds/src/components/Checkbox.js`
- `packages/ds/src/components/Checkbox.css`
- `packages/ds/src/components.md`

**Estimated scope:** Small

---

## Task 4: Banner primitive

**Description:** Banner de feedback persistente reutilizando tonos de Alert (no Toast).

**Acceptance criteria:**
- [x] `Banner.js` + `Banner.css`; props `tone` (info|success|warning|error), `role?` (status|alert), `body`
- [x] Prefijo textual de tono (no solo color); tokens de Alert existentes
- [x] Sin timer, cola ni motion
- [x] Entrada Banner en `components.md`

**Verification:**
- [x] `npm run lint:tokens-only -w @soluciones-alexendros/ds`
- [x] Markup incluye `role` y cue no cromático

**Dependencies:** None (paralelo a T2/T3)

**Implementation roles:** role-design, role-front

**Test surfaces:** `renderBanner`

**Files likely touched:**
- `packages/ds/src/components/Banner.js`
- `packages/ds/src/components/Banner.css`
- `packages/ds/src/components.md`

**Estimated scope:** Small

---

## Task 5: Wire barrel, playground, primitives tests y a11y-runner

**Description:** Exportar los tres primitives, montarlos en playground y extender runners.

**Acceptance criteria:**
- [x] `components/index.js` exporta `renderSelect`, `renderCheckbox`, `renderBanner`
- [x] Playground muestra los tres
- [x] `test-primitives.mjs` cubre contratos parciales Select/Checkbox/Banner
- [x] `a11y-runner.mjs` incluye Select + Checkbox + Banner; assert `:focus-visible` en Select.css y Checkbox.css; Stack/Card siguen fuera
- [x] Contraste sin cambios de tokens

**Verification:**
- [x] `npm run test:primitives -w @soluciones-alexendros/ds`
- [x] `npm run test:a11y -w @soluciones-alexendros/ds`
- [x] `npm run test:contrast -w @soluciones-alexendros/ds`
- [x] `npm run build -w @soluciones-alexendros/ds-docs`

**Dependencies:** T2, T3, T4

**Implementation roles:** role-front, role-design

**Test surfaces:** a11y-runner light/dark; primitives runner; playground build; lint:tokens-only

**Files likely touched:**
- `packages/ds/src/components/index.js`
- `packages/ds/scripts/a11y-runner.mjs`
- `packages/ds/scripts/test-primitives.mjs`
- `apps/docs/src/pages/playground.astro`

**Estimated scope:** Medium

---

## Checkpoint B — tras T2–T5 (`next-primitives-scope`)

- [x] `lint:tokens-only` OK
- [x] `test:primitives` OK
- [x] `test:a11y` OK con Select + Checkbox + Banner
- [x] `test:contrast` OK (sin tokens nuevos)
- [x] Build docs OK; playground monta Select/Checkbox/Banner

---

## Checkpoint C — Cierre conjunto

- [x] `npm test` OK
- [x] Build docs OK
- [x] Diff sin `tokens/` ni alcance fuera de SPEC
- [x] Homepage sigue alineada (CP-A)
- [x] Listo para SCHEMAS evidence / IMPLEMENT handoff — **no** `project-publish` implícito
