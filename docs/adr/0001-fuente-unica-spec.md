# ADR-0001 — Fuente única de especificación

- **Estado:** Accepted
- **Fecha:** 2026-11-10

## Contexto

Había doble verdad entre `design-references-sdd/`, `.autoworkspace/SPEC.md` y docs raíz. Agentes y humanos no tenían un único puntero.

## Decisión

- Spec viva: `docs/spec/`.
- Decisiones: `docs/adr/`.
- SDD y `.autoworkspace/SPEC.md` quedan como **histórico enlazado** (banner + enlace), no se borran.

## Alternativas

- Seguir usando solo `.autoworkspace/SPEC.md` — acopla proceso Autoworkspace a la spec de producto.
- Borrar SDD — pierde historial de intake.

## Consecuencias

README, AGENTS y ARCHITECTURE apuntan solo a `docs/spec/` + `docs/adr/` como verdad. Schemas de aceptación actualizan `source` a `docs/spec/`.
