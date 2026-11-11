# ADR-0004 — Capa de marca (`data-brand`)

- **Estado:** Accepted
- **Fecha:** 2026-11-10
- **Actualizado:** 2026-11-10 (Fase 2)

## Contexto

Default del prompt: capa `data-brand` (p. ej. default + archmaker) sobre tokens semánticos.

## Decisión

- Adoptar `data-brand` como contrato de producto.
- Fuentes: `tokens/brands/default.json` (identidad / sin overrides) y `tokens/brands/archmaker.json` (overrides semánticos).
- Build emite `:root` (default) y `[data-brand="archmaker"]` (+ combinaciones con `data-theme` / `prefers-color-scheme`).
- Overrides de marca: solo semánticos de acento (primary / link / focus y derivados hover-active), no la rampa completa.
- ArchMaker usa paleta **provisional teal** documentada como placeholder hasta adopción de marca real.
- Runner de contraste: matriz **tema × marca**.

## Alternativas

- Temas por repo sin atributo compartido — fragmenta la flota.
- Multi-brand completo con rampas propias por marca — supera el alcance pre-0.1.0.

## Consecuencias

Consumidores fijan `data-brand` en el root document. Sin atributo ≡ default. Contraste debe pasar en todas las combinaciones publicadas.
