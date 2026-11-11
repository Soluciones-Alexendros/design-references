# ADR-0002 — Contrato CSS-first y wrappers; destino de `renderX`

- **Estado:** Accepted
- **Fecha:** 2026-11-10

## Contexto

El paquete expone `renderX(props)` → HTML string. El objetivo de producto es CSS-first con wrappers que emiten HTML canónico.

## Decisión

- Meta: HTML canónico + CSS en `@layer`; wrappers Astro/React sin lógica visual propia.
- `renderX` es API actual; su deprecación/sustitución sigue [`docs/spec/stability.md`](../spec/stability.md) (libre hasta 0.1.0; deprecated una minor después).

## Alternativas

- Mantener solo `renderX` a largo plazo — dificulta consumo CSS-only.
- Eliminar `renderX` ya en Fase 1 — fuera de alcance; rompe playground/tests actuales.

## Consecuencias

Fases posteriores implementan capas CSS y wrappers; no se ejecuta el rename en Fase 1.
