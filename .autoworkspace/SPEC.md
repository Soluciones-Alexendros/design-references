# Spec: design-references — DEFINE (estructura P1 + Link/Stack/Field)

## Capability Map

| Module id | Responsibility | Depends on |
|-----------|----------------|------------|
| repo-structure | Hacer pasar `check-product-structure.sh` perfil P1 (docs, CI, meta, Renovate) | — |
| primitives-link-stack-field | Tres primitives mínimos (Link, Stack, Field) solo con tokens `--ds-*` existentes | contrato + CI (no bloquea la escritura de la spec en paralelo) |

Build order (implementación): `repo-structure` y `primitives-link-stack-field` pueden avanzar en paralelo tras la aprobación de esta spec. La capa de primitives no reabre paleta, iconos, motion ni multi-brand.

## ASSUMPTIONS I'M MAKING

1. El checker P1 vive en el harness Autoworkspace (`check-product-structure.sh`) y es el criterio de cierre de `repo-structure`.
2. `--ds-color-text-link` y el par contrast `text.link / bg.surface` ya existen en `tokens/semantic.json`; Link los reutiliza (no se añade token nuevo).
3. Field compone `renderInput` existente; no se reimplementa Input.
4. Stack y Card quedan fuera de axe (no interactivos); Link y Field entran en el runner axe + `:focus-visible` donde aplique.
5. Node `>=20`, workspaces npm, Astro docs en la versión ya presente en `main` (incluye bump de seguridad #3).
6. CODEOWNERS apunta a `@Alexendros` (owner GitHub del repo).
→ Correct me now or I'll proceed with these.

## Objective

Cerrar la fase DEFINE dejando una fuente de verdad aprobable para dos entregables:

1. **repo-structure** — repo P1-compliant (meta, docs, Makefile, CI quality/test/smoke, Renovate bajo `.github/`).
2. **primitives-link-stack-field** — extender el inventario de [packages/ds/src/components.md](../packages/ds/src/components.md) con Link, Stack y Field, playground y gates a11y existentes.

Continúa la spec aprobada en `design-references-sdd/spec.md` (opción A) sin reabrir límites: tokens DTCG, `--ds-*`, contrast AA, axe serious/critical.

## Tech Stack

- Monorepo npm workspaces: `packages/ds` (`@soluciones-alexendros/ds`), `apps/docs` (`@soluciones-alexendros/ds-docs`)
- Tokens: DTCG 2025.10 JSON → CSS OKLCH + tipos
- Docs: Astro (versión en `main` post-#3)
- CI: GitHub Actions; acciones pinneadas a SHA (mismo criterio que `a11y.yml`)
- Renovate: manager npm, schedule semanal

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
npm run dev -w @soluciones-alexendros/ds-docs
# Tras repo-structure:
make install validate test build
# Checker (desde harness Autoworkspace, perfil P1):
# check-product-structure.sh → OK P1
```

## Project Structure (target)

```text
CHANGELOG.md, SECURITY.md, CONTRIBUTING.md, AGENTS.md, ARCHITECTURE.md
Makefile, .env.example, LICENSE (ya existe), README.md (actualizar propósito)
docs/README.md, docs/architecture/, docs/guides/, docs/runbooks/
.github/CODEOWNERS
.github/PULL_REQUEST_TEMPLATE.md
.github/renovate.json          # movido desde renovate.json raíz
.github/workflows/ci.yml       # quality, test, smoke
.github/workflows/a11y.yml     # sin cambios de alcance (sigue contrast+axe)
packages/ds/src/components/{Link,Stack,Field}.{js,css}
packages/ds/src/components.md  # contrato actualizado
apps/docs/src/pages/playground.astro
.autoworkspace/{project.yaml,status.yaml,SPEC.md}
```

## Code Style

- Primitives: módulos JS + CSS que exportan `renderX(props)` → HTML string (mismo patrón que Button/Input).
- Solo variables `--ds-*` en CSS de componentes; el lint `lint:tokens-only` debe seguir en verde.
- Focus interactivo: `:focus-visible` con `--ds-color-border-focus`.
- Docs meta: cada fichero listado abajo incluye la sección exacta `### Propósito de este documento`.

## Testing Strategy

- **repo-structure:** `check-product-structure.sh` perfil P1 exit 0; `ci.yml` jobs `quality` / `test` / `smoke` verdes; no Dependabot.
- **primitives:** actualizar `a11y-runner.mjs` (Link + Field en markup light/dark; `:focus-visible` en `Link.css`; Field vía Input); Stack montado en playground, fuera de axe.
- Contrast runner existente sin pares nuevos.
- Smoke docs: `npm run build -w @soluciones-alexendros/ds-docs`.

## Boundaries

### Always

- Consumir solo tokens `--ds-*` ya generados.
- Mantener umbrales contrast 4.5:1 / 3:1 y axe serious/critical como gate.
- Pinnear acciones de GitHub a SHA completo (mismo par que `a11y.yml`).
- Declarar `permissions: contents: read` en jobs nuevos.
- Incluir `### Propósito de este documento` en README, AGENTS, ARCHITECTURE, SECURITY, CONTRIBUTING y `docs/README.md`.

### Ask first

- Nuevos tokens / escalas de color.
- Nuevos managers de Renovate o Dependabot.
- Publicar el paquete npm o invocar `project-publish`.
- Cambiar owner en CODEOWNERS.

### Never

- Reabrir paleta, iconografía completa, motion avanzado o multi-brand.
- Duplicar contrast/axe dentro de `ci.yml` (viven en `a11y.yml`).
- Hardcodear colores/spacing tipografía en CSS de primitives.
- Commitear secretos; `.env.example` declara ausencia de secretos de runtime.

---

## Capability: `repo-structure`

### Deliverables

| Artefacto | Criterio |
|-----------|----------|
| `CHANGELOG.md` | Historial Keep-a-Changelog o equivalente mínimo con entrada actual |
| `SECURITY.md` | Política de reporte + sección Propósito |
| `CONTRIBUTING.md` | Cómo contribuir + Propósito |
| `AGENTS.md` | Guía para agentes + Propósito |
| `ARCHITECTURE.md` | C4 corto del monorepo + Propósito |
| `Makefile` | Targets: `install`, `validate`, `test`, `build`, `dev` → scripts npm existentes |
| `.env.example` | Sin secretos; documenta Node `>=20` |
| `docs/` | `README.md` + dirs `architecture/`, `guides/`, `runbooks/` (stubs aceptables) |
| `.github/CODEOWNERS` | `* @Alexendros` |
| `.github/PULL_REQUEST_TEMPLATE.md` | Summary + Test plan |
| `.github/workflows/ci.yml` | Jobs `quality`, `test`, `smoke`; `permissions: contents: read`; checkout/setup-node pinneados como `a11y.yml` |
| quality | `npm run validate:tokens` + `npm run lint:tokens-only -w @soluciones-alexendros/ds` |
| test | `npm test` |
| smoke | `npm run build -w @soluciones-alexendros/ds-docs` |
| Renovate | Mover `renovate.json` → `.github/renovate.json` (mismo contenido npm weekly); eliminar raíz |
| workspace dep | `apps/docs/package.json`: `"@soluciones-alexendros/ds": "*"` (npm workspaces link; `workspace:*` rejected by project npm with EUNSUPPORTEDPROTOCOL) |
| README.md | Añadir `### Propósito de este documento` |

### Success criteria (`repo-structure`)

1. `check-product-structure.sh` con perfil P1 termina OK.
2. No existe `dependabot.yml`.
3. Existe `.github/renovate.json` y no queda `renovate.json` en la raíz.
4. `ci.yml` declara los tres jobs y no ejecuta contrast ni axe.
5. Dependencia docs usa `*` resuelto al workspace local (lockfile → `packages/ds`).

---

## Capability: `primitives-link-stack-field`

### Link (forms / navigation)

- **Modules:** `Link.js` + `Link.css`
- **Props:** `href`, `label`
- **Markup:** `<a class="ds-link">` nativo
- **Tokens:** `--ds-color-text-link`, `--ds-color-border-focus`, spacing/type existentes (`--ds-type-family-sans`, `--ds-type-size-body` o label)
- **A11y:** `:focus-visible`; incluido en axe light/dark; assert `:focus-visible` en `Link.css` como Button/Input

### Stack (layout)

- **Modules:** `Stack.js` + `Stack.css`
- **Props:** `gap`: `sm` \| `md` \| `lg` → `--ds-space-sm|md|lg`; `children` / `body` HTML
- **Markup:** contenedor no interactivo (p. ej. `div.ds-stack`)
- **A11y:** sin foco; fuera de axe (como Card); sí en playground

### Field (forms)

- **Modules:** `Field.js` + `Field.css`
- **Props:** `id`, `label`, `invalid?: boolean`, `error?: string` (+ props de Input necesarias vía composición)
- **Behavior:** label visible asociado; llama `renderInput`; mensaje de error con `id` referenciado por `aria-describedby` cuando `invalid`/`error`
- **Tokens:** reutilizar pares ya testeados (`--ds-color-text-on-surface`, `--ds-color-border-error`, `--ds-color-text-on-error` o texto de error sobre superficie ya cubierto); no tokens nuevos
- **A11y:** no depende solo del color (texto de error); incluido en axe light/dark

### Shared updates

- Actualizar `packages/ds/src/components.md` con las tres entradas.
- Exportar desde `packages/ds/src/components/index.js`.
- Montar Link, Stack y Field en `apps/docs/src/pages/playground.astro`.
- Extender `packages/ds/scripts/a11y-runner.mjs` (Link + Field; check `:focus-visible` en Link.css).

### Success criteria (`primitives-link-stack-field`)

1. `npm run lint:tokens-only -w @soluciones-alexendros/ds` pasa.
2. `npm run test:a11y -w @soluciones-alexendros/ds` pasa con Link y Field en el fixture.
3. `npm run test:contrast -w @soluciones-alexendros/ds` pasa sin tokens nuevos.
4. Playground renderiza los tres primitives y el theme-boot sigue funcionando.
5. Ningún valor hardcodeado de color/spacing/type en el CSS nuevo.

## Success Criteria (conjunto)

- Esta SPEC aprobada por el operador.
- Tras IMPLEMENT (fuera de este DEFINE): checker P1 OK + CI `quality`/`test`/`smoke` + `a11y` verdes; inventario Link/Stack/Field documentado y testeado.
- Diff de producto de DEFINE: solo `.autoworkspace/SPEC.md` (más scaffold ya presente). Sin implementación en este paso.

## Open Questions

Ninguna bloqueante para aprobar esta SPEC. Decisiones ya cerradas en el plan DEFINE:

- Sin token de enlace nuevo (`--ds-color-text-link` existente).
- `ci.yml` no duplica contrast/axe.
- Capacidades especificables en paralelo.

## Estado pipeline

- **SPEC:** aprobada por el operador (2026-11-10); asunción 2 confirmada (`text.link` + par contrast existentes).
- **PLAN/TASKS:** [`tasks/plan.md`](../tasks/plan.md), [`tasks/todo.md`](../tasks/todo.md) — entregables en `main` (#6) + Node 22 (#7).
- **Recibos:** DEFINE → SCHEMAS → IMPLEMENT → VALIDATE cerrados con evidencia (2026-11-10); INTEGRATE vía `/project-publish` (gate Husky + PR de cierre).
- **Deriva anotada:** SPEC dice Node `>=20`; `package.json` `engines` exige `>=22.23.4` tras #7.
- **Stop antes de release.** Tag anotado / `gh release create` / bump de versión requieren sí aparte. Sin sellar `awaiting_phase` hacia la siguiente fase de forma automática.
