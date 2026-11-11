# Spec — design-references

### Propósito de este documento

Fuente única de especificación viva del design system. Los ADR viven en [`docs/adr/`](../adr/).

## Estado

- Spec viva: este directorio (`docs/spec/`).
- Histórico (solo lectura / contexto): [`design-references-sdd/`](../../design-references-sdd/), [`.autoworkspace/SPEC.md`](../../.autoworkspace/SPEC.md).
- Paquete: `@soluciones-alexendros/ds` — **no publicado** en npm (E404). Flota verificada sin consumo del paquete: zedazo, ArchMaker, alexendros.dev.

## Índice

| Documento                                      | Contenido                                                      |
| ---------------------------------------------- | -------------------------------------------------------------- |
| [principles.md](principles.md)                 | Tokens DTCG, CSS-first, WCAG 2.2 AA, una sola verdad           |
| [inventory.md](inventory.md)                   | Exports y primitives actuales vs meta                          |
| [stability.md](stability.md)                   | **Política pre-0.1.0** (alias/`$deprecated`/exports/`renderX`) |
| [definition-of-done.md](definition-of-done.md) | Definición de hecho por componente (fases posteriores)         |
| [components/](components/)                     | Inventario F3-00 + specs por slug (DoD 1–3)                    |
| [../adr/](../adr/)                             | Decisiones ADR-0001…0008                                       |

## Dominio

Canónico: `https://design.alexendros.dev`. Alias `design-references-two.vercel.app` → 308 (ver ADR-0008 y `vercel.json`).
