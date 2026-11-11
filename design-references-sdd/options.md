# Options — design-references

> **Histórico.** Spec viva: [`docs/spec/`](../docs/spec/).

## A — Capas DTCG + CSS vars + package mínimo

- Tokens en JSON (DTCG 2025.10): reference → semantic → component.
- Generación a CSS variables `--ds-*` + tipos TS.
- Theme-boot: `data-theme` / `prefers-color-scheme` (light/dark/system).
- Package: `@soluciones-alexendros/ds` (CSS + JS/TS mínimo).
- Website: Astro docs + playground interactivo.
- Componentes: primitives (layout, forms, feedback) que consumen tokens.

## B — Carbon-like monorepo multi-package

- Paquetes separados: tokens, themes, components, icons.
- Mayor escalabilidad futura.
- Más overhead de publicación y consumo.

## C — Atlassian-style token() + theming runtime

- Helper `token('color.bg.primary')` que resuelve a CSS var.
- Theming por runtime JS.
- Más control pero mayor peso y acoplamiento.

## Recomendación

A. Mejor relación encaje/complejidad/riesgo para consumidores Astro + Next/React y el estado vacío actual del repo.
