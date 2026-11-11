# ADR-0006 — Base del sitio (Starlight vs Astro plano)

- **Estado:** Accepted
- **Fecha:** 2026-11-10
- **Actualizado:** 2026-11-11

## Contexto

Docs en `apps/docs` (Astro plano). Default del plan Fase 5: Astro + Starlight con tema sobre `--ds-*`. Mitigación documentada: si Starlight limita la identidad o el build, caer a Astro plano con las mismas rutas foundations.

## Decisión

**Astro plano** (sin Starlight) como base del sitio vitrina en W1.

Evidencia F5-01: `@astrojs/starlight@0.42.10` + Astro `7.4.8` / Vite 8 Rolldown falla el build con:

`Rolldown failed to resolve import "virtual:starlight/route-middleware"`

Eso bloquea la identidad operativa del sitio (no hay artefacto desplegable). Se activa el escape del plan: mismas rutas foundations sobre `--ds-*`.

## Alcance aceptado

- Rutas: `/`, `/foundations/{color,typography,spacing,radius,elevation,motion}/`, `/playground/`; `/tokens/` → 301 a `/foundations/color/`.
- CSS del sitio solo `var(--ds-*)`.
- Chrome de tema: placeholder con `setTheme` + `localStorage` clave `ds-theme` hasta F3 ThemeToggle (F5-06).
- Reevaluación de Starlight permitida cuando el virtual-module/Rolldown esté verde en este stack; no reabrir sin evidencia de build.

## Alternativas

- Starlight con tema remapeado a `--ds-*` — preferida; bloqueada por build en W1.
- MDX custom sin Starlight — más coste; no necesario para foundations.

## Consecuencias

- Sin dependencia `@astrojs/starlight` en `@soluciones-alexendros/ds-docs`.
- Layout propio (`src/layouts/Base.astro`) y páginas Astro en `src/pages/`.
- Pagefind / sidebar Starlight quedan fuera hasta reevaluación.
