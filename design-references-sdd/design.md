# Design — design-references

## Contexto (C4)
Sistema de design tokens y componentes base consumido por webs Astro y Next/React de la flota.  
El repositorio `design-references` publica un paquete npm y un website de documentación + playground.

## Contenedores
- **tokens** (source of truth): archivos JSON DTCG 2025.10.
- **package** (`@soluciones-alexendros/ds`): genera CSS variables `--ds-*` + tipos TS + theme-boot.
- **website**: Astro (docs estáticas + playground interactivo).
- **ci**: tests de contraste + axe-core sobre componentes base.

## Componentes (no obvios)
- **Token pipeline**: JSON DTCG → CSS custom properties (OKLCH) + `.d.ts`.
- **Theme boot**: script mínimo que lee `prefers-color-scheme` o atributo `data-theme` y aplica el set de variables.
- **Contrast runner**: lee pares semánticos del DTCG, calcula ratio (OKLCH → sRGB) y falla CI.
- **Playground**: iframe o componente que monta los primitives y permite cambiar tema en vivo.

## Datos
- **Formato**: DTCG 2025.10.
- **Capas**:
  - `reference`: valores crudos (OKLCH, spacing, type scale).
  - `semantic`: roles (`color.bg.primary`, `color.text.on-primary`, etc.).
  - `component`: overrides por componente si hacen falta.
- **Colores**: OKLCH (con comentario sRGB de fallback).
- **Temas**: light / dark (system resuelve en runtime).

## Contratos
- **Package export**:
  - CSS: `@soluciones-alexendros/ds/styles.css` (variables en `:root` y `[data-theme="dark"]`).
  - JS: `setTheme(mode: 'light' | 'dark' | 'system')`.
  - Tipos: `tokens.d.ts`.
- **Website**: documentación de cada token + playground con selector de tema.
- **CI**: job `a11y` que ejecuta contrast runner + axe sobre primitives.

## Errores
- Token DTCG inválido → fallo de build del package.
- Ratio de contraste < umbral → fallo de CI (no bloquea consumo local, sí merge).
- Theme no reconocido → fallback a system.

## Seguridad
- Sin secretos.
- Package público o scoped privado según política de org.
- Website estático (sin backend).

## Observabilidad
- CI publica informe de contraste (pares que fallan + ratio).
- Website muestra el valor OKLCH y el ratio calculado de cada par semántico.

## Pruebas
- Unit: generación de CSS desde DTCG.
- Contrast: script que evalúa todos los pares semánticos light/dark.
- Component: axe-core en primitives (focus visible, roles, contraste).
- Smoke: website arranca y el playground cambia de tema.

## Migración
- Estado actual: repositorio vacío (solo README).
- Paso 1: añadir estructura de tokens DTCG + pipeline.
- Paso 2: publicar package mínimo.
- Paso 3: website de muestra.
- Consumidores existentes no se tocan hasta que el package esté estable.

## Decisiones (MADR corto)

### ADR-1 — Formato DTCG 2025.10 como source of truth
- **Contexto**: necesidad de interoperabilidad y theming.
- **Decisión**: tokens en JSON DTCG; CSS se genera.
- **Consecuencias**: herramientas modernas pueden importar; un paso de build extra.

### ADR-2 — Colores en OKLCH
- **Contexto**: mejor uniformidad perceptual y soporte nativo en CSS moderno.
- **Decisión**: reference y semantic usan OKLCH. Alternativa descartada: sRGB puro (menor uniformidad perceptual).
- **Consecuencias**: tests de contraste convierten a sRGB; fallback documentado.

### ADR-3 — Theme-boot por CSS + atributo
- **Contexto**: consumidores Astro/Next; evitar runtime pesado.
- **Decisión**: variables en CSS + `setTheme` mínimo que setea `data-theme`. Alternativa descartada: runtime JS completo tipo Atlassian token().
- **Consecuencias**: sin JS el tema system funciona vía `prefers-color-scheme`; con JS se puede forzar.

### ADR-4 — Tests de contraste como gate de CI
- **Contexto**: requisito WCAG AA.
- **Decisión**: contrast runner dedicado + axe; falla en serious/critical o ratio insuficiente.
- **Consecuencias**: no se puede mergear un token que rompa contraste.
