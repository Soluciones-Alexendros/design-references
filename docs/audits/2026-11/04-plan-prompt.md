# Plan-prompt para Cursor (modo Plan) — design-references

**Base:** documentos 01, 02 y 03 · **Fecha:** 10 nov 2026 · **Objetivo:** que Cursor produzca un plan ejecutable por fases, verificable y revisable, antes de tocar código.

## Cómo usarlo

1. Extrae el tarball en la raíz del repo (ver `00-LEEME.md`); los documentos quedan en `docs/audits/2026-11/` y la regla en `.cursor/rules/ds-core.mdc`.
2. Abre Cursor en la raíz del repo, cambia a **Plan** y pega el prompt de arranque de `00-LEEME.md`. Ese prompt remite a este documento: el bloque «PROMPT» de abajo es el prompt maestro.
3. Revisa el plan generado. Apruébalo **fase a fase**; la Fase 0 es solo lectura y condiciona el resto.

## PROMPT

```text
ROL
Actúa como arquitecto/a de design systems y revisor/a de accesibilidad. Trabajas en el monorepo design-references (Soluciones-Alexendros) y en su sitio design.alexendros.dev.

MODO
PLAN. No edites ningún archivo hasta que apruebe cada fase. Entrega un plan, no código.

ENTRADAS (léelas primero, en este orden)
1. docs/audits/2026-11/01-hallazgos.md   (hallazgos C-01..C-06, H-01..H-11)
2. docs/audits/2026-11/02-arquitectura.md (repo y sitio objetivo)
3. docs/audits/2026-11/03-referencias-decisiones.md (veredictos 1..18, ADRs, plantillas)
4. AGENTS.md, ARCHITECTURE.md, README.md, package.json, CHANGELOG.md
Los hallazgos marcados [I] o [?] son hipótesis. No las des por ciertas: la Fase 0 las confirma o las refuta.

REGLAS INAMOVIBLES
- Los tokens viven en tokens/*.json (DTCG 2025.10). No hardcodees color, espaciado ni tipografía en CSS de componentes. Prefijo --ds-*.
- No invoques local-maintenance, local-security, local-email ni project-publish. role-front y role-design solo al tocar superficie visual real.
- No inventes versiones, rutas, salidas de comandos ni resultados. Verifica con comandos (npm view, npm ci, npm test) y cita la salida.
- Cambios en ramas y PRs pequeños (≤ 400 líneas de diff), Conventional Commits, un changeset por cambio visible al consumidor.
- Tras cada fase: npm run validate:tokens, npm test y npm run test:a11y -w @soluciones-alexendros/ds deben pasar.
- No elimines nada que otro repo de la flota pueda estar consumiendo sin alias de deprecación durante una minor completa.
- Si algo bloquea el avance y no se puede decidir con los valores por defecto de abajo, detente y hazlo constar. No preguntes lo evidente.

VALORES POR DEFECTO (decisiones ya tomadas; cámbialas solo si la Fase 0 las invalida)
- Un solo paquete @soluciones-alexendros/ds con exports por subruta (/tokens.css, /theme, /css, /astro, /react).
- Contrato CSS-first con wrappers Astro y React; renderX queda deprecated una minor.
- Objetivo WCAG 2.2 AA; APCA solo informativo; pares exentos etiquetados.
- Capa de marca con data-brand; marcas iniciales: default y archmaker.
- Versionado con changesets, primera release 0.1.0, publicación en npm con provenance.
- Sitio con Astro + Starlight; prosa en español, identificadores en inglés.
- Dominio canónico design.alexendros.dev; el alias vercel.app redirige con 308.

FASES

FASE 0 — Verificación (solo lectura)
Objetivo: confirmar o refutar cada hipótesis [I]/[?] del informe 01.
Tareas:
- Leer tokens/*.json, packages/ds (src y test), apps/docs, docs/, design-references-sdd/, .autoworkspace/, tasks/, scripts/, .github/workflows/, CONTRIBUTING.md, SECURITY.md, Makefile.
- Determinar qué ejecuta realmente npm test (a11y, lint:tokens-only, primitives) y qué cubre scripts/acceptance-stubs.mjs.
- Inventariar categorías de tokens existentes (reference, semantic, component, spacing, type, radius, shadow, motion).
- Comprobar si el paquete está publicado (npm view @soluciones-alexendros/ds) y cómo lo consumen zedazo, ArchMaker y alexendros.dev.
- Ejecutar npm ci, npm test y el build del sitio; anotar versiones resueltas de Node, Astro, Prettier y lint-staged.
- Revisar la configuración de Vercel (proyectos, dominios, alias design-references-two) y el Dependency Dashboard de Renovate (#1).
- Probar en navegador: FOUC con tema oscuro persistido, estado system en vivo, selector de tema con teclado y lector.
Entregable: docs/audits/2026-11/00-verificacion.md con una tabla ID | hipótesis | confirmada, refutada o parcial | evidencia (comando o archivo y línea).
Aceptación: ninguna hipótesis queda sin estado. Detente y espera mi aprobación antes de la Fase 1.

FASE 1 — Verdad única y higiene documental
Tareas: crear docs/spec/ (absorbe SDD y .autoworkspace/SPEC.md, dejando los originales como histórico enlazado); crear docs/adr/ con ADR-0001..0008 usando MADR; reescribir AGENTS.md neutral (≤ 60 líneas, comandos reales, sin skills privadas); sincronizar README y ARCHITECTURE con el estado verificado; escribir política de idioma en CONTRIBUTING.
Aceptación: una sola spec referenciada desde README, AGENTS y ARCHITECTURE; ningún enlace roto (compruébalo con un script).

FASE 2 — Tokens y contraste
Tareas: mover los pares a tokens/contrast.pairs.json; ampliar con pares no textuales (borde de input, foco sobre primary y error, fondo de Alert y Banner, link frente a texto, estados hover y active); pasar el runner a WCAG 2.2 AA con margen mínimo configurable (≥ 4.6 para texto normal) y etiquetar text.on-disabled como exento; añadir las categorías que falten (space, type, radius, shadow, motion); normalizar naming a categoría.rol.estado con alias y $deprecated; introducir tokens/brands/ y la matriz tema × marca.
Aceptación: validate:tokens y el runner pasan para todas las combinaciones tema × marca; cambios de nombre con alias; changeset incluido.

FASE 3 — Componentes CSS-first y wrappers
Tareas: definir el HTML canónico de los 10 componentes actuales (Button, Input, Card, Alert, Link, Stack, Field, Select, Checkbox, Banner); implementar CSS en @layer ds.base y ds.components; crear wrappers Astro y React que generen exactamente ese HTML; matriz de estados por componente; icono de estado mínimo para Alert, Banner y error de Field; sustituir acceptance-stubs por pruebas reales; axe en Playwright en light, dark, forced-colors y prefers-contrast: more.
Aceptación: cero violaciones axe; snapshot del HTML canónico; npm test sin stubs; renderX conservado como deprecated.

FASE 4 — Entrega y consumo
Tareas: configurar changesets, workflow release con provenance, tags y GitHub Releases; fixtures/consumers/astro-min y next-min que instalan el tarball de npm pack, compilan y pasan axe; Renovate para los consumidores; publicar 0.1.0 solo tras mi aprobación explícita.
Aceptación: workflow consumers en verde; CHANGELOG generado; guía de instalación probada en ambos fixtures.

FASE 5 — Sitio vitrina
Tareas: migrar apps/docs a Starlight con tema sobre --ds-*; implementar el mapa de sitio del documento 02 (foundations, components/[slug], patterns, guides, a11y, tokens.json y tokens.css, changelog, fleet, playground); plantilla de cabecera (title, description, canonical, OG, theme-color, color-scheme, sitemap, robots); selector de tema como grupo con aria-pressed; redirecciones de barra final y 308 desde el alias vercel.app; Lighthouse CI.
Aceptación: Lighthouse accesibilidad 100 y rendimiento ≥ 95 en todas las rutas; axe sin violaciones; tokens.css ≤ 8 KB gzip; theme-boot ≤ 1 KB.

FASE 6 — Adopción piloto
Tareas: elegir un consumidor (alexendros.dev) y migrarlo en una rama a @soluciones-alexendros/ds 0.1.x; eliminar sus tokens locales duplicados; medir diferencias visuales y de contraste; informar de la fricción encontrada y ajustar la guía de migración.
Aceptación: el consumidor compila, pasa axe y su diff visual está revisado; la guía de migración refleja los pasos reales.

FORMATO DE SALIDA DEL PLAN
1. Resumen en 10 líneas como máximo.
2. Una tabla por fase con: ID de tarea | descripción | archivos afectados | comando de verificación | dependencias | tamaño (S, M, L) | riesgo.
3. Orden de PRs propuesto, cada uno con su rollback.
4. Riesgos transversales y cómo se mitigan.
5. Como máximo 5 preguntas abiertas, solo las que bloqueen y no tengan valor por defecto.

DEFINICIÓN DE HECHO GLOBAL
- npm run validate:tokens, npm test y npm run test:a11y pasan en CI sin stubs.
- Todos los componentes tienen spec, matriz de estados, notas de accesibilidad, test, captura visual y página en el sitio.
- 0.1.0 publicado con provenance y un consumidor migrado.
- design.alexendros.dev es canónico, con metadatos completos y presupuestos cumplidos.
- Una sola spec viva y ADRs vigentes.
```

## Anexo A — `.cursor/rules/ds-core.mdc`

Incluido ya en el tarball; contenido de referencia:

```text
---
description: Reglas permanentes del design system
alwaysApply: true
---
- Fuente de verdad: docs/spec/ y docs/adr/. No crear especificaciones paralelas.
- Tokens solo en tokens/*.json (DTCG 2025.10). Prefijo --ds-*; --_ds-* es privado.
- Prohibido hardcodear color, espaciado, tipografía, radius, sombra o duración en CSS de componentes.
- Todo componente: HTML canónico documentado, matriz de estados, notas de accesibilidad, test y página de docs.
- Objetivo de accesibilidad: WCAG 2.2 AA. Foco visible siempre; respetar prefers-reduced-motion y forced-colors.
- Cambios visibles al consumidor requieren changeset; renombrar un token requiere alias y $deprecated.
- Prosa en español; identificadores, props y código en inglés.
- No inventes versiones ni resultados: verifica con comandos y cita la salida.
```

## Anexo B — Criterios para aprobar cada fase

| Fase | Aprobar si                                          | Rechazar si                                             |
| ---- | --------------------------------------------------- | ------------------------------------------------------- |
| 0    | Cada hipótesis tiene estado y evidencia citada      | Hay conclusiones sin comando o archivo que las respalde |
| 1    | Una sola spec y enlaces sin romper                  | Quedan dos fuentes de verdad activas                    |
| 2    | Matriz tema × marca en verde con pares no textuales | Se baja un umbral para que pase                         |
| 3    | axe a cero y snapshots estables                     | Persisten stubs o HTML distinto entre wrappers          |
| 4    | Fixtures de consumo en verde desde tarball          | Los fixtures importan desde el código fuente            |
| 5    | Presupuestos cumplidos en todas las rutas           | El sitio usa valores fuera de `--ds-*`                  |
| 6    | Consumidor migrado sin tokens locales duplicados    | Se mantiene un fork paralelo                            |
