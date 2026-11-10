# Brief — design-references

## Objetivo
Definir la arquitectura de repositorio, estructura de datos de tokens, módulos necesarios, referencias profesionales y website de muestra del design system compartido de la flota.

## Actor
Mantenedor de la flota Soluciones-Alexendros / Alexendros (consumidores: webs Astro + Next/React).

## Problema
El repositorio design-references está vacío (solo README declarativo). No existe fuente única de tokens `--ds-*`, theme-boot ni componentes. Esto impide cohesión visual y reutilización entre zedazo, ArchMaker, alexendros.dev y el resto de la flota.

## No-objetivos
- Implementar componentes de producción en este ciclo.
- Modificar repositorios consumidores.
- Elegir stack de runtime más allá de lo necesario para el package y el website de muestra.

## Plazo
Spec completa lista para implementación.

## Riesgo
Inconsistencia de marca y deuda de estilos si el DS no se convierte en la fuente de verdad consumible.

## Decisiones de Intake
- Distribución: paquete npm (CSS + JS/TS).
- Consumidores prioritarios: Astro + Next/React (webs).
- Website de muestra: documentación estática + playground interactivo.
- Temas: light + dark + system.
- Referencias profesionales prioritarias: Material / IBM Carbon / Atlassian.
- Alcance inicial de módulos: completo (layout + forms + feedback).
- Tokens: prefijo `--ds-*` (declarado en README).

## Stack (hipótesis a confirmar)
- Package: TypeScript + CSS variables + posible Tailwind theme export.
- Website de muestra: Astro o Next + playground.
- Consumidores: Astro, Next/React, TypeScript, Tailwind (flota existente).

## UNKNOWN restante
- Nombre del paquete npm y scope.
- Paleta y tipografía base concretas (se definirán en Contraste/Diseño a partir de referencias).
