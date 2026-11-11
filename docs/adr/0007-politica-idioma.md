# ADR-0007 — Política de idioma

- **Estado:** Accepted
- **Fecha:** 2026-11-10

## Contexto

Flota y operadores trabajan en español; identificadores de código y paquetes npm son inglés.

## Decisión

- Prosa (docs, ADR, comentarios orientados a humanos): **español**.
- Identificadores, props, nombres de fichero de código, scripts npm: **inglés**.

Documentado también en `CONTRIBUTING.md`.

## Alternativas

- Todo en inglés — fricción con operadores.
- Todo en español en código — rompe convenciones npm/JS.

## Consecuencias

Schemas y needles pueden mezclar prosa ES con ids EN; no traducir nombres de assert.
