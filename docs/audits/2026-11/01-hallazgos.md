# Informe de hallazgos y errores de concepto — design-references

**Objetivos auditados:** repo `Soluciones-Alexendros/design-references` y deploy `design.alexendros.dev` · **Fecha:** 10 nov 2026 · **Método:** `/design-system audit` (naming, cobertura de tokens, completitud de componentes) más revisión de arquitectura y documentación.

## 0. Alcance, límites y convención de evidencia

**Inspeccionado directamente:** portada del repo (README, listado raíz, issues), `ARCHITECTURE.md`, `AGENTS.md`, `package.json`, `CHANGELOG.md`, y del deploy `/`, `/tokens/` y `/playground/`.

**No inspeccionado** (GitHub bloqueó el árbol de carpetas a clientes automáticos y después limitó las peticiones): `tokens/*.json`, `packages/ds` (fuente y tests), `apps/docs`, `docs/`, `design-references-sdd/`, `.autoworkspace/`, `tasks/`, `scripts/`, workflows de `.github/`, `CONTRIBUTING.md`, `SECURITY.md`, `Makefile`. Lo que afecta a esas zonas es inferencia y se cierra en la Fase 0 del plan (documento 04).

Etiquetas: **[V]** verificado en la fuente · **[I]** inferido de lo declarado o de la estructura · **[?]** hipótesis a confirmar.

## 1. Resumen (formato skill)

**Componentes revisados:** 10 (Button, Input, Card, Alert, Link, Stack, Field, Select, Checkbox, Banner) | **Hallazgos:** 17 (6 de concepto, 11 de implementación/documentación) | **Puntuación estimada:** 50/100 (acceso parcial; revisar tras la Fase 0)

| Dimensión               | Peso | Nota | Motivo principal                                                        |
| ----------------------- | ---- | ---- | ----------------------------------------------------------------------- |
| Fundación de tokens     | 25%  | 75   | DTCG 2025.10, OKLCH, 13 pares de contraste por tema, automatizado en CI |
| Componentes             | 25%  | 45   | Strings HTML, sin matriz de estados ni variantes documentadas           |
| Documentación           | 20%  | 40   | Sin páginas por componente, deriva entre README, Home y playground      |
| Gobernanza y versionado | 15%  | 35   | Paquete provisional, sin releases, CHANGELOG todo en Unreleased         |
| Sitio vitrina           | 15%  | 45   | 3 páginas, sin metadatos, sin guías ni estado de adopción               |

**Veredicto:** la base (tokens + contraste automatizado) es sólida y poco habitual a esta madurez. El problema no es la base sino que (a) los componentes están concebidos como cadenas HTML y no como piezas consumibles por la flota Astro/Next, (b) no existe camino de entrega ni versionado, y (c) la documentación y el sitio describen menos de lo que el sistema ya hace y de lo que la flota necesita.

## 2. Lo que funciona (conservar)

- **[V]** Fuente única en `tokens/*.json` (DTCG 2025.10, colores OKLCH) y prefijo estable `--ds-*`.
- **[V]** Pares de contraste declarados en `$extensions` y publicados con ratio calculado en `/tokens/`; todos en PASS en light y dark.
- **[V]** Tres modos (light, dark, system) con `setTheme` y `data-theme`; el cambio de tema no toca el markup.
- **[V]** CI con job `a11y` (runner de contraste + axe-core en light/dark), Actions fijadas por SHA, Renovate, licencia MIT, SECURITY.md, CODEOWNERS.
- **[V]** `AGENTS.md` con reglas de producto claras (no hardcodear color, espaciado ni tipografía) y no-objetivos explícitos en `ARCHITECTURE.md`.

## 3. Errores de concepto

### C-01 · Los primitives son cadenas HTML, no componentes [V]

**Evidencia:** `ARCHITECTURE.md` → Contracts: «Primitives export `renderX(props)` HTML strings and token-only CSS».
**Por qué es un error:** la flota es Astro + Next/React. Una cadena HTML no tiene props tipadas, composición, estados controlados ni hidratación; obliga a `set:html` o `dangerouslySetInnerHTML` (superficie XSS si algún prop lleva texto de usuario) y deja la accesibilidad (roles, ids, `aria-*`) en manos del consumidor.
**Corrección:** CSS-first (clases y atributos estables) + wrappers finos `.astro` y React. El HTML canónico de cada componente vive en la documentación como contrato.

### C-02 · «Núcleo común de la flota» con no-objetivo de multi-marca [V]

**Evidencia:** la descripción del repo cita zedazo, ArchMaker y alexendros.dev como consumidores; `ARCHITECTURE.md` excluye «multi-brand theming».
**Por qué es un error:** son productos con identidades distintas. Sin capa de marca, cada consumidor reintroduce tokens locales (el problema que el DS debía resolver) o hace fork.
**Corrección:** la marca es una capa de override sobre tokens semánticos, con matriz de contraste tema × marca.

### C-03 · Tres fuentes de verdad para la especificación [V]

**Evidencia:** el README dice «Spec aprobada en `design-references-sdd/`»; `AGENTS.md` dice que la fuente de verdad es `.autoworkspace/SPEC.md` y las tareas `tasks/todo.md`; además existen `docs/` y `apps/docs`.
**Por qué es un error:** cuando divergen, ni personas ni agentes saben cuál manda. Además hay más andamiaje de proceso (Autoworkspace, SDD, tasks, husky) que producto (10 componentes) [I].
**Corrección:** una sola `docs/spec/` + ADRs; el resto se archiva o se genera.

### C-04 · Modelo de contraste desfasado e incompleto [V]

**Evidencia:** `/tokens/` declara «WCAG 2.1 AA». El estándar vigente es WCAG 2.2 (añade 2.4.11 Focus Not Obscured, 2.5.8 Target Size Minimum, 3.3.8 Accessible Authentication). Los 13 pares por tema son texto sobre fondo, iconos y foco sobre `bg.surface`.
**Faltan:** borde de input frente a la superficie (1.4.11, 3:1); foco sobre `bg.primary` y `bg.error`; fondo de Alert/Banner frente a la superficie; `text.link` frente al texto circundante (1.4.1: subrayado o 3:1); estados hover, active y visited; tamaño de objetivo.
**Corrección:** ampliar la matriz; objetivo WCAG 2.2 AA; APCA solo como dato informativo.

### C-05 · No hay ciclo de entrega: el DS no se puede consumir con fiabilidad [V/I]

**Evidencia:** paquete `@soluciones-alexendros/ds (provisional)`; la portada de GitHub no muestra releases ni packages; `CHANGELOG.md` entero en `[Unreleased]`. Cómo consumen zedazo, ArchMaker o alexendros.dev no está documentado.
**Por qué es un error:** el principio «versionar y migrar» queda sin aplicar; cualquier cambio de token es un cambio roto silencioso para la flota.
**Corrección:** semver + changesets + publicación (npm con provenance o GitHub Packages) + smoke de consumidores en CI.

### C-06 · La puerta de calidad incluye stubs [V]

**Evidencia:** `package.json` → `test` ejecuta `test:acceptance` = `node scripts/acceptance-stubs.mjs`. El `test` raíz no invoca `test:a11y` ni `lint:tokens-only` (pueden estar dentro del `test` del workspace [?]); a11y corre solo en un workflow aparte.
**Por qué es un error:** un stub que siempre pasa da falso verde; la señal de calidad miente.
**Corrección:** sustituir los stubs por aceptación real o eliminarlos; que `npm test` sea la puerta completa y CI solo la reutilice.

## 4. Hallazgos de implementación y documentación

| ID   | Sev. | Ev. | Hallazgo                                                                                                                                                                                                     | Acción                                                                                  |
| ---- | ---- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| H-01 | P1   | V   | El playground muestra solo Primary, Secondary y Danger; sin hover, focus, disabled, loading ni tamaños; Alert solo en Warning, Banner solo en Info                                                           | Matriz de estados × variantes × tamaños por componente                                  |
| H-02 | P1   | V   | El sitio publica solo tokens semánticos de color. No hay reference, component, spacing, tipografía, radius, shadow ni motion pese a declarar tres niveles y a que Card cite un «elevation token»             | Páginas de foundations; confirmar en `tokens/` qué existe [?]                           |
| H-03 | P2   | V   | Naming de pares irregular: `text.on-surface`, `text.link`, `border.focus`, `icon.on-*` mezclan «contenido sobre X» con «rol»                                                                                 | Convención única `categoría.rol.estado`, alias de deprecación                           |
| H-04 | P2   | V   | `text.on-disabled` se evalúa contra 3:1 y se marca PASS (4.443 light, 3.924 dark). WCAG exime a los componentes inactivos: el umbral no tiene base normativa                                                 | Reetiquetar como «exento, informativo»                                                  |
| H-05 | P2   | V   | `text.on-warning` = 4.516:1 en ambos temas (margen 0.016): un cambio de redondeo lo rompe                                                                                                                    | Margen mínimo configurable (≥ 4.6) en el runner                                         |
| H-06 | P2   | V   | Deriva documental: Home y README listan 7 primitives; el playground muestra 10 (Select, Checkbox, Banner); el CHANGELOG no los cita                                                                          | Generar el listado desde un manifiesto de componentes                                   |
| H-07 | P2   | V   | Metadatos del deploy: solo `viewport` y `title` («Inicio · design-references»); sin description, OG, canonical, theme-color ni color-scheme; enlaces con y sin barra final (`/tokens` y `/tokens/`)          | Plantilla de `<head>` y redirect de barra final                                         |
| H-08 | P2   | I   | Identidad dispersa: repo `design-references`, paquete `ds`, app `ds-docs`, dominio `design.alexendros.dev`, alias `design-references-two.vercel.app` (el sufijo `-two` sugiere un proyecto Vercel duplicado) | Nombre único y 308 al dominio canónico                                                  |
| H-09 | P2   | V   | Mezcla ES/EN: README y sitio en español, `ARCHITECTURE.md` en inglés, UI del playground en inglés                                                                                                            | Política: prosa en ES, identificadores y código en EN                                   |
| H-10 | P2   | V   | `AGENTS.md` usa vocabulario privado (`local-maintenance`, `role-front`, `project-publish`) sin definirlo                                                                                                     | Reescribir neutral; mover lo privado a reglas locales                                   |
| H-11 | P3   | V/? | `engines.node >=22.23.4` (mínimo a nivel de parche), Dashboard de Renovate abierto desde el 26 oct (#1), 8 commits y 0 releases                                                                              | Revisar que Astro 7 y las versiones fijadas resuelven con `npm ci`; vaciar el dashboard |

Nota de accesibilidad pendiente [?]: el selector «Light Dark System» debe ser un grupo con estado expuesto (`aria-pressed` o radios) y el estado `system` debe seguir `prefers-color-scheme` en vivo; no pude comprobarlo en el DOM renderizado.

## 5. Tablas del skill

### Naming Consistency

| Issue                              | Components                 | Recommendation                                                                         |
| ---------------------------------- | -------------------------- | -------------------------------------------------------------------------------------- |
| Pares `on-X` mezclados con roles   | Tokens semánticos          | `color.text.default`, `color.text.on-primary`, `color.text.link`, `color.border.focus` |
| Cuatro nombres para una misma cosa | Repo, paquete, app, Vercel | Un nombre público (`ds`) y un nombre de repo documentados en ARCHITECTURE              |
| Idioma mixto                       | Docs y playground          | Política ES/EN escrita en CONTRIBUTING                                                 |
| API de componente `renderX`        | Primitives                 | `Button`, `Input`… como wrappers; HTML canónico en docs                                |

### Token Coverage

| Category               | Defined                                              | Hardcoded Values Found                               |
| ---------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| Colors                 | 13 pares semánticos por tema (light y dark) visibles | No medible sin código; existe `lint:tokens-only` [?] |
| Spacing                | No visible en el deploy                              | [?]                                                  |
| Typography             | No visible en el deploy                              | [?]                                                  |
| Radius, shadow, motion | Solo se cita «elevation token» en Card               | [?]                                                  |

### Component Completeness (según playground)

| Component | States     | Variants | Docs | Score |
| --------- | ---------- | -------- | ---- | ----- |
| Button    | ⚠️         | ⚠️ (3)   | ❌   | 5/10  |
| Input     | ⚠️         | ⚠️       | ❌   | 4/10  |
| Card      | ⚠️         | ⚠️       | ❌   | 5/10  |
| Alert     | ⚠️         | ⚠️       | ❌   | 4/10  |
| Link      | ⚠️         | ✅       | ❌   | 5/10  |
| Stack     | ✅         | ✅       | ❌   | 6/10  |
| Field     | ✅ (error) | ⚠️       | ❌   | 5/10  |
| Select    | ⚠️         | ⚠️       | ❌   | 4/10  |
| Checkbox  | ⚠️         | ⚠️       | ❌   | 4/10  |
| Banner    | ⚠️         | ⚠️       | ❌   | 4/10  |

## 6. Acciones prioritarias

1. **Cerrar la verdad única:** una `docs/spec/` y ADRs; archivar `design-references-sdd/` y `.autoworkspace/SPEC.md` como histórico (C-03).
2. **Reemplazar el contrato `renderX`** por CSS-first + wrappers Astro/React (C-01).
3. **Ampliar el contrato de contraste** a WCAG 2.2 AA, pares no textuales y margen mínimo (C-04, H-04, H-05).
4. **Abrir el ciclo de entrega:** changesets, v0.1.0, publicación y smoke de consumidores (C-05).
5. **Quitar los stubs** de la puerta de calidad (C-06).
6. **Introducir la capa de marca** y las categorías de tokens que faltan (C-02, H-02).
7. **Rehacer el sitio** con páginas por componente, metadatos y dominio canónico (H-01, H-06, H-07, H-08).

## 7. Hipótesis a cerrar en la Fase 0

- ¿Existen en `tokens/` spacing, tipografía, radius, shadow y motion, y se publican?
- ¿Qué ejecuta realmente `npm test` dentro de `packages/ds` (a11y, lint tokens-only, primitives)?
- ¿Qué cubre `acceptance-stubs.mjs`?
- ¿Cómo se consume hoy el paquete en cada repo de la flota?
- ¿Hay FOUC al cargar con tema oscuro persistido (comportamiento de `theme-boot`)?
- ¿Está duplicado el proyecto Vercel y cuál es el canónico?
- ¿Resuelven `npm ci` y el build con las versiones fijadas de Astro, Prettier y lint-staged?
