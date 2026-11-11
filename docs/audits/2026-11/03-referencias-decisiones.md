# Nuevas referencias y mejoras documentales — cambios clave razonados

**Base:** informes 01 y 02 · **Fecha:** 10 nov 2026 · **Uso:** cada fila de la sección 1 se convierte en un ADR en `docs/adr/`.

## 1. Decisiones actuales: veredicto y razón

| #   | Decisión o documento actual                                  | Veredicto                  | Razón                                                                                                                                                    |
| --- | ------------------------------------------------------------ | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Tokens en DTCG 2025.10 como fuente única                     | **Mantener**               | Estándar estable e interoperable (Style Dictionary, Terrazzo, Figma Variables). Cambiar ahora costaría sin aportar                                       |
| 2   | Colores en OKLCH                                             | **Mantener**               | Uniformidad perceptual: escalas y estados por luminosidad predecible. Emitir sRGB hex solo para consumidores no CSS (JSON, Figma, correo)                |
| 3   | Contraste medido con WCAG 2.1 AA                             | **Cambiar**                | WCAG 2.2 es la versión vigente. Añadir pares no textuales (1.4.11), foco (2.4.11), objetivo (2.5.8). APCA solo informativo: no es normativo              |
| 4   | Pares de contraste dentro de `$extensions`                   | **Cambiar**                | `$extensions` es válido pero oculta un contrato crítico. Un `contrast.pairs.json` propio es revisable, versionable y reutilizable por el sitio y la CI   |
| 5   | `renderX(props)` devuelve HTML                               | **Cambiar**                | No encaja con Astro/Next. CSS-first + wrappers conserva un único HTML canónico y gana tipado y composición                                               |
| 6   | No-objetivo: multi-marca                                     | **Cambiar**                | Contradice el propósito de núcleo común de una flota con identidades distintas. La capa de marca es solo override semántico                              |
| 7   | No-objetivo: iconografía completa                            | **Cambiar (parcial)**      | No hace falta un set completo, pero Alert, Banner y error de Field necesitan un icono de estado mínimo: el color no puede ser el único indicador (1.4.1) |
| 8   | No-objetivo: motion avanzado                                 | **Mantener y acotar**      | Sin animaciones complejas, pero tokens básicos de duración y easing y una regla única de `prefers-reduced-motion`                                        |
| 9   | No-objetivo: WCAG AAA                                        | **Mantener**               | AAA global es inalcanzable. Adoptar solo criterios AAA baratos donde ya se cumplen (p. ej. 7:1 en texto principal, 2.4.13 en foco)                       |
| 10  | `text.on-disabled` evaluado contra 3:1                       | **Cambiar**                | WCAG exime a controles inactivos. Etiquetar «exento, informativo» evita un PASS sin base normativa                                                       |
| 11  | SDD + `.autoworkspace` + `tasks` + `docs`                    | **Consolidar**             | Una spec viva con ADRs; el resto, histórico enlazado. Evita divergencia entre humanos y agentes                                                          |
| 12  | `acceptance-stubs.mjs` en `npm test`                         | **Retirar**                | Un stub en verde es una señal falsa. Sustituir por pruebas reales con criterios de la spec                                                               |
| 13  | Paquete «provisional» sin releases                           | **Resolver**               | Decidir nombre, registro y semver; publicar `0.1.0`                                                                                                      |
| 14  | Theme-boot + `setTheme`                                      | **Mantener y simplificar** | CSS-first con `color-scheme` y `light-dark()`; el script solo persiste la elección del usuario antes del primer pintado                                  |
| 15  | AGENTS.md con skills privadas                                | **Cambiar**                | Debe funcionar en Cursor y otros agentes sin conocer el entorno del autor                                                                                |
| 16  | Sitio de 3 páginas                                           | **Ampliar**                | Un DS se adopta por su documentación: página por componente, guías, a11y y estado de adopción                                                            |
| 17  | Renovate, Actions fijadas por SHA, MIT, SECURITY, CODEOWNERS | **Mantener**               | Higiene de cadena de suministro ya correcta; añadir provenance al publicar                                                                               |
| 18  | Docs mezcladas ES/EN                                         | **Normalizar**             | Prosa en español, identificadores en inglés; escribirlo en CONTRIBUTING                                                                                  |

## 2. Cambios por documento

| Documento         | Cambio clave                         | Contenido mínimo exigido                                                                                                     |
| ----------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `README.md`       | Pasar de portada a puerta de entrada | Qué es, instalación por framework, versión, enlaces a sitio, spec y ADRs, estado de componentes generado, política de idioma |
| `ARCHITECTURE.md` | Alinear con documento 02             | Contenedores, contratos de consumo, pirámide de verificación, no-objetivos revisados con fecha                               |
| `AGENTS.md`       | Neutral y corto (≤ 60 líneas)        | Comandos reales, reglas de tokens, definición de hecho, límites (qué no tocar), dónde está la spec                           |
| `CONTRIBUTING.md` | Flujo completo                       | Ramas, Conventional Commits, changeset obligatorio, cómo añadir un componente, idioma                                        |
| `CHANGELOG.md`    | Generado por changesets              | Sin edición manual; primera entrada `0.1.0`                                                                                  |
| `docs/adr/`       | Nuevo                                | Plantilla MADR: contexto, decisión, alternativas, consecuencias, estado                                                      |
| `docs/spec/`      | Nuevo — única verdad                 | Principios, tokens, componentes, compatibilidad, a11y                                                                        |
| `docs/guides/`    | Nuevo                                | Instalación Astro y Next, tematización y marca, migración, declaración de accesibilidad                                      |
| `SECURITY.md`     | Mantener                             | Añadir contacto y política de divulgación con plazo                                                                          |

### 2.1 ADRs iniciales propuestos

ADR-0001 Fuente única de especificación · ADR-0002 Contrato CSS-first y wrappers · ADR-0003 Objetivo WCAG 2.2 AA y modelo de contraste · ADR-0004 Capa de marca · ADR-0005 Versionado, registro y provenance · ADR-0006 Base del sitio (Starlight o Astro plano) · ADR-0007 Política de idioma · ADR-0008 Dominio canónico y redirecciones.

## 3. Plantilla de documentación de componente (skill `document`)

Ejemplo aplicado a Button; el resto sigue la misma estructura.

### Component: Button

**Descripción.** Acción principal o secundaria en un formulario o una vista. Para navegación se usa Link.

| Variante    | Cuándo usarla                          |
| ----------- | -------------------------------------- |
| `primary`   | Una acción dominante por vista         |
| `secondary` | Acciones de apoyo                      |
| `ghost`     | Acciones terciarias o en barras densas |
| `danger`    | Acciones destructivas con confirmación |

| Propiedad  | Tipo                                      | Defecto   | Descripción                                                  |
| ---------- | ----------------------------------------- | --------- | ------------------------------------------------------------ |
| `variant`  | `primary`, `secondary`, `ghost`, `danger` | `primary` | Jerarquía visual                                             |
| `size`     | `sm`, `md`, `lg`                          | `md`      | Altura mínima 24, 32, 40 px (2.5.8 exige ≥ 24 px)            |
| `loading`  | boolean                                   | `false`   | Muestra indicador y marca `aria-busy`                        |
| `disabled` | boolean                                   | `false`   | Usa `aria-disabled` si debe seguir en el orden de tabulación |
| `type`     | `button`, `submit`, `reset`               | `button`  | Evita envíos accidentales                                    |

| Estado        | Visual                                  | Comportamiento                                            |
| ------------- | --------------------------------------- | --------------------------------------------------------- |
| Default       | `bg.primary` con `text.on-primary`      | —                                                         |
| Hover         | Paso de luminosidad del token de estado | Cursor `pointer`                                          |
| Focus-visible | Anillo `border.focus` con offset        | Nunca se oculta; visible sobre cualquier fondo            |
| Active        | Un paso más oscuro                      | —                                                         |
| Disabled      | `bg.disabled` con `text.on-disabled`    | No interactivo, exento de contraste                       |
| Loading       | Spinner con `aria-busy=true`            | Bloquea reenvío; animación desactivada con reduced-motion |

**Accesibilidad.** Rol nativo `button`; teclado: Tab para llegar, Enter y Espacio para activar; lector de pantalla: «botón, <etiqueta>» y «ocupado» en loading; objetivo mínimo 24 × 24 px.

| Hacer                                     | Evitar                          |
| ----------------------------------------- | ------------------------------- |
| Etiqueta verbal clara («Guardar cambios») | Solo icono sin nombre accesible |
| Un `primary` por vista                    | Varios `primary` compitiendo    |
| `type="button"` fuera de formularios      | Usar `<div>` clicable           |

**Código canónico:** `<button class="ds-button ds-button--primary" type="button">Guardar</button>`; el wrapper Astro y el React generan exactamente ese HTML.

## 4. Propuesta de extensión (skill `extend`): ThemeToggle

**Problema.** El sitio ofrece «Light Dark System» pero no hay un componente documentado; cada consumidor lo reimplementa.

| Componente relacionado | Similitud         | Por qué no basta                           |
| ---------------------- | ----------------- | ------------------------------------------ |
| Button                 | Acción con estado | No expresa selección exclusiva de un grupo |
| Checkbox               | Estado binario    | El tema tiene tres valores                 |

**API.** `value`: `light`, `dark`, `system` (defecto `system`); `onChange`; `label` (accesible, obligatoria); `brand` opcional para mostrar la marca activa.
**Variantes.** Segmentado (3 opciones visibles) y compacto (menú).
**Estados.** Default, hover, focus-visible, seleccionado, disabled.
**Tokens.** `bg.secondary`, `bg.primary`, `text.on-primary`, `border.focus`, tokens de espacio y radius.
**Accesibilidad.** `role="group"` con nombre; cada opción `button` con `aria-pressed` (o `radiogroup`); el estado `system` refleja `prefers-color-scheme` en vivo; el valor persistido se aplica antes del primer pintado.
**Preguntas abiertas.** ¿Persistir en `localStorage` o cookie para SSR? ¿Mostrar el tema efectivo cuando el valor es `system`?

## 5. Referencias nuevas y por qué se incorporan

Las URL son las páginas raíz conocidas de cada referencia; revalidarlas en la Fase 0 antes de enlazarlas.

| Referencia                                                                         | Para qué                                                                                   | Cambio que respalda                   |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------- |
| WCAG 2.2 (`w3.org/TR/WCAG22/`)                                                     | Criterios vigentes: 1.4.1, 1.4.11, 2.4.11, 2.5.8, 3.3.8                                    | Decisión 3                            |
| WAI-ARIA Authoring Practices (`w3.org/WAI/ARIA/apg/`)                              | Patrones de teclado y roles de Select, Checkbox, grupo de toggle                           | Notas de accesibilidad por componente |
| Design Tokens Format Module (`designtokens.org`)                                   | Tipos, alias, `$deprecated`, `$extensions`                                                 | Decisiones 1, 4 y deprecaciones       |
| Style Dictionary (`styledictionary.com`) y Terrazzo (`terrazzo.app`)               | Transformaciones DTCG → CSS, JSON, TS; comparar antes de mantener el build propio          | Contrato de build                     |
| MDN: `light-dark()`, `color-scheme`, `@layer`, `prefers-contrast`, `forced-colors` | Tema CSS-first y capas                                                                     | Decisión 14 y contratos de consumo    |
| APCA (`git.apcacontrast.com`)                                                      | Segunda opinión perceptual, no normativa                                                   | Decisión 3                            |
| GOV.UK Design System (`design-system.service.gov.uk`)                              | Modelo de documentación por componente con ejemplos, accesibilidad y research              | Plantilla de la sección 3             |
| Sistema de diseño de la Administración General del Estado                          | Referente local de govtech; comprobar URL y versión vigentes antes de citarlo              | Guía de marca pública                 |
| Primer (GitHub) y Atlassian Design Tokens                                          | Convenciones de naming semántico y páginas de tokens                                       | Naming de pares (H-03)                |
| Radix Primitives, React Aria, Ark UI                                               | Comportamiento accesible probado si algún componente se vuelve complejo (Select, Combobox) | Wrappers React                        |
| Starlight (`starlight.astro.build`)                                                | Base de docs con búsqueda y accesibilidad de partida                                       | ADR-0006                              |
| Changesets (`github.com/changesets/changesets`)                                    | Versionado y changelog                                                                     | Decisión 13                           |
| npm provenance (`docs.npmjs.com`, sección de provenance)                           | Trazabilidad de publicación desde Actions                                                  | Decisión 17                           |
| Playwright y `@axe-core/playwright`                                                | Pruebas de accesibilidad en navegador real, capturas visuales                              | Pirámide de verificación              |
| Lighthouse CI (`github.com/GoogleChrome/lighthouse-ci`)                            | Presupuestos de rendimiento y accesibilidad del sitio                                      | Presupuestos del sitio                |
| MADR (`adr.github.io/madr/`)                                                       | Plantilla ligera de ADR                                                                    | Sección 2.1                           |
| Documentación de Cursor: Plan Mode y Rules                                         | Formato de `.cursor/rules` y AGENTS.md                                                     | Documento 04                          |

## 6. Reglas de redacción para la documentación del DS

1. Cada documento empieza con un párrafo «Para qué sirve este documento» de una frase.
2. Cada afirmación de estado (versión, número de componentes, ratios) se genera, no se escribe a mano.
3. Cada documento declara fecha y estado (Draft, Aprobado, Obsoleto) y enlaza a su ADR.
4. Los ejemplos de código se ejecutan en CI como parte de los fixtures de consumo.
5. Un cambio de token o de HTML canónico sin changeset ni entrada en la spec no se acepta.
