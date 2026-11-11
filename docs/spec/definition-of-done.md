# Definición de hecho por componente

### Propósito de este documento

Contrato mínimo para dar un componente por cerrado (aplicable en fases posteriores; no se implementa en Fase 1).

## Checklist

1. HTML canónico documentado.
2. Matriz de estados (default, hover, focus, disabled, error, etc. según rol).
3. Notas de accesibilidad (roles, nombres, foco, contraste, reduced-motion / forced-colors).
4. Test automatizado (primitives y/o axe según interactivo).
5. Página o sección de docs / playground.
6. Solo tokens `--ds-*` en CSS (lint:tokens-only).
7. Changeset si el cambio es visible al consumidor **después** de `0.1.0` (ver [stability.md](stability.md)).
