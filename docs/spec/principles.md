# Principios

### Propósito de este documento

Principios de producto del design system (absorbe SDD + SPEC histórica).

## Una sola verdad

- Spec viva: `docs/spec/` + decisiones en `docs/adr/`.
- Tokens: solo `tokens/*.json` (DTCG 2025.10). Prefijo CSS `--ds-*`; `--_ds-*` es privado.
- Prohibido hardcodear color, espaciado, tipografía, radius, sombra, border-width o duración en CSS de componentes (usar `--ds-*`).

## CSS-first

- Contrato objetivo: HTML canónico + CSS en capas; wrappers Astro/React generan ese HTML.
- Hoy el paquete expone `renderX(props)` → string HTML. Destino de `renderX`: ver ADR-0002. Política de deprecación: [stability.md](stability.md).

## Accesibilidad

- Objetivo: WCAG 2.2 AA.
- Foco visible siempre (`:focus-visible`); respetar `prefers-reduced-motion` y `forced-colors`.
- Contraste: pares en `tokens/contrast.pairs.json`; márgenes WCAG 2.2 AA (normal ≥ 4.6; ui/large ≥ 3.0); APCA informativo.

## Temas y marca

- Temas: light / dark / system vía `setTheme` + `data-theme`.
- Capa de marca `data-brand`: ADR-0004; tokens en `tokens/brands/` (default + archmaker).

## Idioma

- Prosa en español; identificadores, props y código en inglés (ADR-0007, CONTRIBUTING).
