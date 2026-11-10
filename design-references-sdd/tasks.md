# Tasks — design-references

Ordenadas por dependencia. Cada una verificable de forma aislada. No implementan el feature.

## T1 — Estructura de repositorio y source of truth
- Crear directorios: `tokens/`, `packages/ds/`, `apps/docs/`, `.github/workflows/`.
- Añadir `tokens/reference.json`, `tokens/semantic.json`, `tokens/component.json` vacíos con esquema DTCG 2025.10.
- Verificar: los tres JSON validan contra el schema DTCG y el árbol existe.

## T2 — Tokens de referencia (OKLCH)
- Poblar `tokens/reference.json` con escalas de color en OKLCH, spacing, type scale, radii y elevation.
- Verificar: cada color es un valor OKLCH válido y el archivo sigue siendo DTCG válido.

## T3 — Tokens semánticos y temas
- Definir roles semánticos (bg, text, border, etc.) que apuntan a reference.
- Crear sets light y dark.
- Verificar: un script o test puede resolver un token semántico a su valor OKLCH en ambos temas.

## T4 — Pipeline de generación CSS + tipos
- Añadir script que lee los JSON DTCG y emite `styles.css` (variables `--ds-*`) y `tokens.d.ts`.
- Verificar: el CSS generado contiene `--ds-color-bg-primary` (o equivalente) con valor OKLCH y el `.d.ts` exporta los tipos.

## T5 — Theme-boot
- Implementar función mínima `setTheme(mode)` que aplica `data-theme` y documentar el fallback `prefers-color-scheme`.
- Verificar: al llamar `setTheme('dark')` el atributo cambia y las variables dark se activan.

## T6 — Contrast runner
- Escribir script/test que lee pares semánticos, convierte OKLCH → sRGB y calcula ratio.
- Fallar si texto normal < 4.5:1 o texto grande/UI < 3:1.
- Verificar: el runner reporta al menos un par de ejemplo y falla correctamente con un valor inválido inyectado.

## T7 — Componentes base (contrato)
- Definir la lista de primitives (layout, forms, feedback) y sus props/tokens esperados.
- Verificar: existe `packages/ds/src/components.md` (o equivalente) que lista cada primitive, sus props y los tokens `--ds-*` que debe consumir; un test de lint falla si un componente referencia un valor no tokenizado.

## T8 — Suite axe + CI
- Añadir job de CI que ejecuta contrast runner + axe-core sobre los primitives en light y dark.
- Verificar: el workflow existe y falla el job si se introduce una violación de contraste o falta `:focus-visible`.

## T9 — Website de muestra (docs + playground)
- Esqueleto Astro con páginas de documentación de tokens y un playground que monta los primitives y permite cambiar tema.
- Verificar: el sitio arranca localmente y el selector de tema altera la apariencia del playground.

## T10 — Publicación del package
- Configurar `package.json` del package (`@soluciones-alexendros/ds`) con exports de CSS, JS y tipos.
- Verificar: `npm pack` produce un tarball que incluye `styles.css` y los tipos.
