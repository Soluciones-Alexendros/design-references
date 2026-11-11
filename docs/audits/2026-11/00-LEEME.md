# Auditoría design-references · paquete de documentos (10 nov 2026)

## Contenido

| Ruta                                               | Qué es                                                           |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| `docs/audits/2026-11/00-LEEME.md`                  | Este archivo: orden de lectura y uso                             |
| `docs/audits/2026-11/01-hallazgos.md`              | Informe de hallazgos y errores de concepto                       |
| `docs/audits/2026-11/02-arquitectura.md`           | Arquitectura objetivo del repo y del sitio vitrina               |
| `docs/audits/2026-11/03-referencias-decisiones.md` | Referencias nuevas y decisiones razonadas                        |
| `docs/audits/2026-11/04-plan-prompt.md`            | Prompt maestro por fases para Cursor (contiene el bloque PROMPT) |
| `.cursor/rules/ds-core.mdc`                        | Regla permanente de Cursor (alwaysApply)                         |

## Orden de lectura

1. `00-LEEME.md` (este archivo)
2. `01-hallazgos.md` — el diagnóstico; las etiquetas [I] y [?] son hipótesis
3. `02-arquitectura.md` — el estado objetivo
4. `03-referencias-decisiones.md` — por qué cada cambio
5. `04-plan-prompt.md` — el prompt maestro y los criterios de aprobación por fase

## Uso del tarball

1. Previsualiza: `tar -tzf design-references-audit-2026-11.tar.gz`
2. Extrae en la raíz del repo (las rutas ya son relativas a ella): `tar -xzf design-references-audit-2026-11.tar.gz -C /ruta/a/design-references`
3. Comprueba: `ls docs/audits/2026-11 .cursor/rules` (deben aparecer 5 documentos y `ds-core.mdc`)
4. Abre el repo en Cursor, cambia a **Plan** y pega el prompt de arranque de abajo.
5. Aprueba el plan fase a fase. No avances de la Fase 0 sin revisar `00-verificacion.md`.

Nota: el tarball solo añade archivos nuevos; no sobrescribe nada del repo salvo que ya existan esas rutas.

## Prompt de arranque (pegar en Cursor, modo Plan)

```text
Modo Plan. No edites archivos todavía.

Lee en este orden:
1. docs/audits/2026-11/00-LEEME.md
2. docs/audits/2026-11/01-hallazgos.md
3. docs/audits/2026-11/02-arquitectura.md
4. docs/audits/2026-11/03-referencias-decisiones.md
5. docs/audits/2026-11/04-plan-prompt.md

El bloque PROMPT de 04-plan-prompt.md es tu instrucción maestra: síguelo tal cual, con sus reglas, valores por defecto, fases y formato de salida. Aplica también .cursor/rules/ds-core.mdc.

Entrega ahora: (a) un resumen de 10 líneas de lo que has entendido y (b) el plan detallado de la Fase 0 únicamente, con su tabla de tareas. Espera mi aprobación antes de planificar la Fase 1.
```
