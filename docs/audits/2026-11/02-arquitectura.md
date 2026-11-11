# Arquitectura objetivo — repositorio y website vitrina

**Base:** informe 01 (hallazgos C-01 a C-06, H-01 a H-11) · **Fecha:** 10 nov 2026 · **Alcance:** estado final deseado y camino incremental; el orden de ejecución está en el documento 04.

## 1. Principios de diseño

1. **Tokens como única fuente** (DTCG 2025.10, OKLCH). Todo lo demás se genera.
2. **CSS-first, wrappers finos.** El contrato son clases y atributos estables; Astro y React solo los envuelven.
3. **Un componente existe cuando tiene** spec, matriz de estados, notas de accesibilidad, test y página de docs.
4. **Una sola verdad de especificación** (`docs/spec/` + ADRs). Nada de tres carpetas rivales.
5. **Versionado real**: semver, changesets, releases, migraciones.
6. **Proceso proporcional al producto.** Menos andamiaje, más componentes verificados.
7. **Dogfooding:** el sitio de docs solo usa `--ds-*`; si el sitio rompe contraste, el build falla.

## 2. Repositorio objetivo

```
design-references/
├─ AGENTS.md                    # neutral, ≤ 60 líneas, sin vocabulario privado
├─ .cursor/rules/*.mdc          # reglas finas: tokens, componentes, docs
├─ README.md  CONTRIBUTING.md  SECURITY.md  LICENSE  CODEOWNERS
├─ .changeset/                  # versionado y changelog
├─ docs/
│  ├─ spec/                     # ÚNICA spec viva (absorbe SDD y .autoworkspace/SPEC.md)
│  ├─ adr/                      # ADR-0001… decisiones con fecha y estado
│  ├─ guides/                   # install, theming, brands, migration, a11y-statement
│  └─ audits/2026-11/           # los 4 documentos de esta auditoría
├─ tokens/                      # DTCG 2025.10
│  ├─ reference/                # color, space, type, radius, shadow, motion
│  ├─ semantic/                 # light.json, dark.json
│  ├─ component/                # button.json, input.json…
│  ├─ brands/                   # default.json, archmaker.json… (solo override semántico)
│  └─ contrast.pairs.json       # pares texto y no texto, fuera de $extensions
├─ packages/
│  └─ ds/                       # @soluciones-alexendros/ds (un paquete, subpath exports)
│     ├─ src/tokens/            # build → tokens.css, tokens.json, tokens.d.ts
│     ├─ src/theme/             # theme-boot (≤ 1 KB) + setTheme
│     ├─ src/css/               # componentes, @layer ds.base, ds.components
│     ├─ src/astro/             # wrappers .astro
│     ├─ src/react/             # wrappers + tipos
│     └─ test/                  # contraste, unit, axe, fixtures de consumo
├─ apps/docs/                   # sitio vitrina → design.alexendros.dev
├─ fixtures/consumers/          # astro-min y next-min: instalan el tarball empaquetado
├─ scripts/                     # validate-dtcg, build-contrast, check-consumers
└─ .github/workflows/           # ci, a11y, visual, release, consumers
```

**Decisión de empaquetado:** un solo paquete con `exports` por subruta (`/tokens.css`, `/theme`, `/css`, `/astro`, `/react`). Se divide en varios paquetes solo cuando un consumidor lo justifique (p. ej. un backend que necesite solo `tokens.json`). Dividir hoy multiplicaría el coste de versionado sin beneficio medible.

## 3. Contratos de consumo

| Contrato       | Regla                                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Tokens         | `--ds-*` es API pública y estable. `--_ds-*` es privada. Renombrar = major; valor = minor si el contraste no empeora                            |
| Deprecación    | Marcar con `$deprecated` (DTCG) y emitir alias durante una minor completa                                                                       |
| Tema           | `color-scheme: light dark` en `:root`; override con `data-theme` en `html`; `system` sigue `prefers-color-scheme` sin JS                        |
| Color por tema | Emitir `--ds-color-*` con `light-dark()` cuando el consumidor lo soporte; `theme-boot` solo para persistir la elección antes del primer pintado |
| Marca          | `data-brand` en `html`; cada marca sobrescribe solo tokens semánticos (primary, accent, focus)                                                  |
| CSS            | Capas `@layer ds.base, ds.components, ds.utilities`; clases `.ds-button`, `.ds-button--primary`, `.ds-button[aria-disabled=true]`               |
| Componentes    | HTML canónico documentado por componente; wrappers Astro y React generan exactamente ese HTML                                                   |
| Movimiento     | Todo uso de transiciones pasa por tokens de motion y respeta `prefers-reduced-motion`                                                           |
| Compatibilidad | Matriz de navegadores declarada en `docs/spec/`; `forced-colors` y `prefers-contrast: more` soportados                                          |

## 4. Pirámide de verificación

1. **Esquema DTCG** (`validate-dtcg`): estructura, referencias, tipos, ciclos.
2. **Matriz de contraste** tema × marca, con pares de texto y no texto; margen mínimo configurable; los pares exentos van etiquetados.
3. **Unitarios** del HTML generado por wrappers (snapshot del HTML canónico).
4. **axe-core en navegador real** (Playwright) sobre cada componente y estado, en light, dark, `forced-colors` y `prefers-contrast: more`, con reflow a 320 px y zoom 200%.
5. **Regresión visual** (capturas por componente y tema).
6. **Smoke de consumidores:** empaquetar con `npm pack`, instalar en `fixtures/consumers/*`, compilar y ejecutar axe.

`npm test` ejecuta 1 a 4 en local; CI añade 5 y 6. Sin stubs: una prueba pendiente falla como `todo`, no como verde.

## 5. Entrega y versionado

- **Changesets** para versionar y generar el CHANGELOG; Conventional Commits para los mensajes.
- Primera release `0.1.0`; `1.0.0` cuando haya al menos dos consumidores en producción y la API de tokens esté congelada.
- Publicación en npm con provenance (o GitHub Packages si se prefiere registro privado); tag y GitHub Release por versión.
- Renovate en cada repo consumidor con grupo `@soluciones-alexendros/ds`; el sitio muestra qué versión usa cada uno.
- Guía de migración por cada major, enlazada desde el CHANGELOG.

## 6. Website vitrina objetivo

**Propósito:** documentación de referencia, banco de pruebas y panel de adopción del sistema. **URL canónica:** `design.alexendros.dev`; el alias `*.vercel.app` redirige con 308 (mismo patrón que ya usa el proyecto vapelog).

### 6.1 Mapa del sitio

| Ruta                                                                      | Contenido                                                                                                                                                     | Fuente                           |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `/`                                                                       | Qué es, versión actual, instalación en 3 líneas, salud (CI, contraste, versión)                                                                               | `package.json`, estado de CI     |
| `/foundations/color`                                                      | Reference y semántico, matriz de contraste filtrable por tema y marca, copiar token                                                                           | `tokens/`, `contrast.pairs.json` |
| `/foundations/typography`, `/spacing`, `/radius`, `/elevation`, `/motion` | Escalas, usos, ejemplos                                                                                                                                       | `tokens/`                        |
| `/components`                                                             | Índice con madurez (Draft, Beta, Stable) y filtros                                                                                                            | manifiesto de componentes        |
| `/components/[slug]`                                                      | Plantilla única: descripción, anatomía, variantes, props, matriz de estados, accesibilidad, do y don’t, código (HTML, Astro, React), tokens usados, historial | `docs/spec/components/*`         |
| `/patterns`                                                               | Formularios, feedback, navegación                                                                                                                             | MDX                              |
| `/guides/*`                                                               | Instalación (Astro y Next), tematización y marcas, migración, contribuir                                                                                      | `docs/guides/`                   |
| `/a11y`                                                                   | Declaración: objetivo WCAG 2.2 AA, matriz de cumplimiento, limitaciones conocidas                                                                             | generado desde el runner         |
| `/tokens.json`, `/tokens.css`                                             | Descargas versionadas (`/v0/…`)                                                                                                                               | build                            |
| `/changelog`                                                              | Releases                                                                                                                                                      | GitHub Releases                  |
| `/fleet`                                                                  | Consumidores y versión en uso, último smoke                                                                                                                   | `scripts/check-consumers`        |
| `/playground`                                                             | Tema, marca, densidad y dirección; matriz de estados; estado compartible por URL                                                                              | componentes reales               |

### 6.2 Decisiones técnicas del sitio

- **Astro con Starlight** como base (búsqueda Pagefind, navegación y accesibilidad de partida) con el tema reescrito sobre `--ds-*`. Si Starlight limita la identidad visual, se cambia por Astro plano: la decisión queda en ADR.
- **Idioma:** prosa en español (`lang=es`); identificadores, props y código en inglés; inglés completo como segunda fase.
- **Cabecera por página:** `title` con plantilla, `description`, canonical, Open Graph con imagen generada, `theme-color` por esquema, `color-scheme`, `sitemap.xml`, `robots.txt`.
- **Accesibilidad del propio sitio:** enlace de salto, landmarks, selector de tema como grupo con `aria-pressed`, foco visible que cumpla 2.4.11, objetivos ≥ 24 px (2.5.8).
- **Presupuestos:** `tokens.css` ≤ 8 KB gzip, `theme-boot` ≤ 1 KB, Lighthouse CI con accesibilidad = 100 y rendimiento ≥ 95.
- **Redirecciones:** barra final unificada, `design-references-two.vercel.app` → dominio canónico, canonical declarado.

## 7. Mapa de migración (actual → objetivo)

| Hoy                                                                 | Destino                         | Paso                                              |
| ------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------- |
| `design-references-sdd/`, `.autoworkspace/SPEC.md`, `tasks/todo.md` | `docs/spec/` + `docs/adr/`      | Consolidar, archivar lo histórico con enlace      |
| `renderX(props)`                                                    | CSS + wrappers                  | Mantener `renderX` como deprecated una minor      |
| Pares de contraste en `$extensions`                                 | `tokens/contrast.pairs.json`    | Mover, ampliar con pares no textuales             |
| `acceptance-stubs.mjs`                                              | Pruebas reales o eliminado      | Convertir en tests con criterios de la spec       |
| 3 páginas del sitio                                                 | Mapa de la sección 6.1          | Por fases: foundations, componentes, guías, fleet |
| Paquete provisional                                                 | `0.1.0` publicado               | Changesets + release + smoke                      |
| `AGENTS.md` con vocabulario privado                                 | AGENTS neutral + reglas locales | Reescribir (ver documento 03)                     |

## 8. Definición de hecho por componente

Spec en `docs/spec/components/<slug>.md`; tokens de componente sin valores sueltos; HTML canónico y wrappers; matriz de estados (default, hover, focus-visible, active, disabled, loading, error cuando aplique); notas de accesibilidad (rol, teclado, lector); axe sin violaciones en light, dark y `forced-colors`; captura visual aprobada; página en el sitio; entrada en el changeset.
