# Research — design-references

> **Histórico.** Spec viva: [`docs/spec/`](../docs/spec/).

Fecha de consulta: 2026-11-10

## Fuentes (mínimo 3)

1. **Material Design 3 — Design tokens**  
   URL: https://m3.material.io/foundations/design-tokens  
   Fecha: 2026-11-10  
   Resumen: Tres capas (reference, system, component). En web se exponen como CSS custom properties (`--md-sys-color-*`, `--md-ref-*`). Tokens nombrados por rol, no por valor. Soporte de temas vía scoping de CSS variables.

2. **IBM Carbon Design System — Color tokens & architecture**  
   URL: https://carbondesignsystem.com/elements/color/tokens/  
   Fecha: 2026-11-10  
   Resumen: Monorepo con paquetes separados (`@carbon/themes`, `@carbon/colors`, `@carbon/type`, `@carbon/react`). Tokens de core (background, layer, field, border, text…) + component tokens. Temas como colecciones de valores. Layering model explícito.

3. **Atlassian Design — Design tokens**  
   URL: https://atlassian.design/tokens/design-tokens  
   Fecha: 2026-11-10  
   Resumen: Tokens como source of truth. `token()` helper que resuelve a CSS variables (`--ds-*`). Theming global (`setGlobalTheme`, `data-theme`, `data-color-mode`). Capas de color, elevation, spacing, typography. Soporte light/dark/high-contrast.

4. **W3C Design Tokens Community Group — Spec 2025.10 (estable)**  
   URL: https://www.designtokens.org/TR/2025.10/format/  
   Fecha: 2026-11-10  
   Resumen: Formato JSON interoperable. Grupos, `$value`, `$type`, aliases. Soporte theming multi-brand y color spaces modernos. Primera versión estable (octubre 2025).

## Patrones comunes extraídos

- **Capas de tokens**: reference/core → semantic/system → component.
- **CSS custom properties** como formato de consumo web (prefijo de sistema: `--md-`, `--ds-`, Carbon Sass).
- **Theming**: light/dark/system mediante atributos HTML o selectores + sets de variables.
- **Distribución**: paquetes npm (tokens + componentes o solo tokens). Carbon y Atlassian publican paquetes dedicados.
- **Documentación + playground**: sitios propios con ejemplos vivos (Carbon website unificado, Atlassian Design, Material).
- **Contraste y a11y**: roles de color con pares on-* / surface; tests de contraste explícitos en algunos sistemas.

## Fallos habituales

- Tokens hardcodeados o sin capas → imposibilidad de theming.
- Prefijos inconsistentes o mezcla de valores crudos y tokens.
- Design system “declarado” sin package consumible ni website de muestra.
- Ausencia de theme-boot y de tests de contraste (exactamente el estado actual de design-references).

## Criterios de elección para design-references

- Alineación con consumidores Astro + Next/React.
- Prefijo `--ds-*` ya declarado.
- Paquete npm (CSS + JS/TS).
- Light + dark + system.
- Alcance completo (layout + forms + feedback).
- Website de muestra = docs + playground.
- Referencias Material / Carbon / Atlassian como guía de capas y theming.
