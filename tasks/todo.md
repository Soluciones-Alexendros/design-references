# Tasks — repo-structure + primitives-link-stack-field

Fuente de verdad: `.autoworkspace/SPEC.md` (aprobada). Plan: `tasks/plan.md`.

---

## Task 1: Meta docs P1 + propósito

**Description:** Crear/actualizar ficheros meta exigidos por el checker P1 con la sección exacta `### Propósito de este documento` donde aplique.

**Acceptance criteria:**
- [x] Existen `CHANGELOG.md`, `SECURITY.md`, `CONTRIBUTING.md`, `AGENTS.md`, `ARCHITECTURE.md`
- [x] `README.md` y esos meta (salvo CHANGELOG) incluyen `### Propósito de este documento`
- [x] CHANGELOG tiene al menos una entrada coherente con el estado actual del repo

**Verification:**
- [x] `grep -Fq '### Propósito de este documento'` en README, AGENTS, ARCHITECTURE, SECURITY, CONTRIBUTING
- [x] Ficheros presentes en la raíz

**Dependencies:** None

**Implementation roles:** role-clean-code

**Test surfaces:** check-product-structure (parcial, hasta CP-A)

**Files likely touched:**
- `README.md`
- `CHANGELOG.md`
- `SECURITY.md`
- `CONTRIBUTING.md`
- `AGENTS.md`
- `ARCHITECTURE.md`

**Estimated scope:** Medium (3–5+ files)

---

## Task 2: Makefile, env example y árbol docs

**Description:** Añadir Makefile con targets npm, `.env.example` sin secretos (Node >=20) y stubs `docs/`.

**Acceptance criteria:**
- [x] `Makefile` con `install`, `validate`, `test`, `build`, `dev` delegando a npm
- [x] `.env.example` declara ausencia de secretos de runtime y Node `>=20`
- [x] Existen `docs/README.md` (con Propósito), `docs/architecture/`, `docs/guides/`, `docs/runbooks/`

**Verification:**
- [x] `make validate` / `make test` invocables (tras `npm install` si hace falta)
- [x] Dirs docs presentes

**Dependencies:** None (puede ir en paralelo con T1)

**Implementation roles:** role-clean-code

**Test surfaces:** Makefile targets; check-product-structure (parcial)

**Files likely touched:**
- `Makefile`
- `.env.example`
- `docs/README.md`
- `docs/architecture/.gitkeep` (o README stub)
- `docs/guides/.gitkeep`
- `docs/runbooks/.gitkeep`

**Estimated scope:** Small–Medium

---

## Task 3: GitHub CI, CODEOWNERS, Renovate, workspace dep

**Description:** Completar superficie GitHub P1 y fijar dependencia workspace en docs.

**Acceptance criteria:**
- [x] `.github/CODEOWNERS` contiene `* @Alexendros`
- [x] `.github/PULL_REQUEST_TEMPLATE.md` con Summary + Test plan
- [x] `.github/workflows/ci.yml` con jobs `quality`, `test`, `smoke`; `permissions: contents: read`; SHA pinneados como `a11y.yml`; quality = validate:tokens + lint:tokens-only; test = `npm test`; smoke = build docs; sin contrast/axe
- [x] `renovate.json` raíz movido a `.github/renovate.json` (contenido npm weekly); raíz eliminada
- [x] `apps/docs/package.json` usa `"@soluciones-alexendros/ds": "*"` (link de workspace npm; `workspace:*` no soportado aquí)
- [x] No hay `dependabot.yml`

**Verification:**
- [x] Diff de `ci.yml` sin `contrast`/`axe`/`test:a11y`/`test:contrast`
- [x] Solo `.github/renovate.json` (no raíz)
- [x] Checker P1 OK (tras T1–T3)

**Dependencies:** T1, T2 (para que el checker pase completo)

**Implementation roles:** role-clean-code

**Test surfaces:** `.github/workflows/ci.yml` jobs; Renovate path

**Files likely touched:**
- `.github/CODEOWNERS`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/workflows/ci.yml`
- `.github/renovate.json`
- `renovate.json` (delete)
- `apps/docs/package.json`
- `package-lock.json` (si `npm install` lo actualiza)

**Estimated scope:** Medium

---

## Checkpoint A — tras T1–T3 (`repo-structure`)

- [x] `check-product-structure.sh` perfil P1 → OK
- [x] No Dependabot; Renovate solo bajo `.github/`
- [x] `ci.yml` tiene quality/test/smoke
- [x] Review con operador antes de dar por cerrada la línea A (opcional si B sigue)

---

## Task 4: Link primitive

**Description:** Añadir Link (`renderLink`) con CSS tokens-only y `:focus-visible`.

**Acceptance criteria:**
- [x] `Link.js` + `Link.css` existen; props `href`, `label`
- [x] Usa `--ds-color-text-link` y `--ds-color-border-focus` (sin valores hardcodeados de color/spacing/type)
- [x] Entrada Link en `components.md`

**Verification:**
- [x] `npm run lint:tokens-only -w @soluciones-alexendros/ds` (puede fallar hasta que el CSS esté limpio; debe pasar al cerrar T4)
- [x] Inspección visual de `:focus-visible` en CSS

**Dependencies:** None (paralelo a línea A)

**Implementation roles:** role-design, role-front

**Test surfaces:** `renderLink`; Link.css focus-visible

**Files likely touched:**
- `packages/ds/src/components/Link.js`
- `packages/ds/src/components/Link.css`
- `packages/ds/src/components.md`

**Estimated scope:** Small

---

## Task 5: Stack primitive

**Description:** Contenedor de layout con `gap` sm|md|lg mapeado a `--ds-space-*`.

**Acceptance criteria:**
- [x] `Stack.js` + `Stack.css`; props `gap`, body/children HTML
- [x] Solo tokens `--ds-*`; no foco
- [x] Entrada Stack en `components.md`

**Verification:**
- [x] `npm run lint:tokens-only -w @soluciones-alexendros/ds`

**Dependencies:** None (puede seguir a T4 o en paralelo)

**Implementation roles:** role-design, role-front

**Test surfaces:** `renderStack` (playground only; no axe)

**Files likely touched:**
- `packages/ds/src/components/Stack.js`
- `packages/ds/src/components/Stack.css`
- `packages/ds/src/components.md`

**Estimated scope:** Small

---

## Task 6: Field primitive

**Description:** Field con label visible, composición de `renderInput`, error + `aria-describedby`.

**Acceptance criteria:**
- [x] `Field.js` + `Field.css`; props `id`, `label`, `invalid`, `error`
- [x] Error visible (texto) + `aria-describedby` cuando hay error/invalid
- [x] Tokens existentes únicamente (`text-on-surface`, `border-error`, etc.)
- [x] Entrada Field en `components.md`

**Verification:**
- [x] `npm run lint:tokens-only -w @soluciones-alexendros/ds`
- [x] Markup de Field incluye describedby → id del mensaje de error

**Dependencies:** None (Input ya existe)

**Implementation roles:** role-design, role-front

**Test surfaces:** `renderField`; ARIA describedby + invalid

**Files likely touched:**
- `packages/ds/src/components/Field.js`
- `packages/ds/src/components/Field.css`
- `packages/ds/src/components.md`

**Estimated scope:** Small–Medium

---

## Task 7: Wire barrel, playground y a11y-runner

**Description:** Exportar los tres primitives, montarlos en el playground y extender axe (Link + Field; `:focus-visible` en Link.css). Stack solo playground.

**Acceptance criteria:**
- [x] `components/index.js` exporta Link, Stack, Field
- [x] Playground muestra los tres
- [x] `a11y-runner.mjs` incluye Link + Field; assert focus-visible en Link.css; Stack no en fixture axe
- [x] Contraste sin cambios de tokens

**Verification:**
- [x] `npm run test:a11y -w @soluciones-alexendros/ds`
- [x] `npm run test:contrast -w @soluciones-alexendros/ds`
- [x] `npm run build -w @soluciones-alexendros/ds-docs`

**Dependencies:** T4, T5, T6

**Implementation roles:** role-front, role-design

**Test surfaces:** a11y-runner light/dark; playground build; lint:tokens-only

**Files likely touched:**
- `packages/ds/src/components/index.js`
- `packages/ds/scripts/a11y-runner.mjs`
- `apps/docs/src/pages/playground.astro`
- (posible) `packages/ds/package.json` exports si aplica

**Estimated scope:** Medium

---

## Checkpoint B — tras T4–T7 (`primitives-link-stack-field`)

- [x] `lint:tokens-only` OK
- [x] `test:a11y` OK con Link + Field
- [x] `test:contrast` OK (sin tokens nuevos)
- [x] Build docs OK; playground monta Link/Stack/Field

---

## Checkpoint C — Cierre conjunto

- [x] Checker P1 OK
- [x] `npm test` OK
- [x] Jobs `ci.yml` + `a11y.yml` coherentes con SPEC
- [x] Sin alcance fuera de SPEC (no paleta/iconos/motion/multi-brand)
- [x] Listo para SCHEMAS evidence / IMPLEMENT handoff — **no** `project-publish` implícito
