# ADR-0005 — Versionado, registro y provenance (primera release 0.1.0)

- **Estado:** Accepted
- **Fecha:** 2026-11-10

## Contexto

El paquete declara `0.1.0` en `package.json` pero **no está publicado** (npm E404). No hay consumidores verificados del paquete en flota.

## Decisión

- Primera publicación pública = `0.1.0` con changesets + npm provenance (meta).
- Hasta esa publicación: política pre-0.1.0 en [`docs/spec/stability.md`](../spec/stability.md) — renombrar tokens / cambiar exports / retirar `renderX` **sin** exigir alias/`$deprecated`.
- Esa excepción vive en `docs/spec/` (+ este ADR). **No** se modifica `.cursor/rules/ds-core.mdc` en Fase 1.

## Alternativas

- Congelar API ya — no justificado sin consumidores.
- Actualizar `ds-core.mdc` ahora — el operador cerró: solo docs/spec + ADR.

## Consecuencias

Fases 2–3 pueden romper API interna del paquete bajo la política pre-0.1.0; desde 0.1.0 aplica semver estricto de tokens/exports.
