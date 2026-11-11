# Política de estabilidad pre-0.1.0

### Propósito de este documento

Define qué se permite **hasta** la primera publicación `0.1.0` y qué rige **después**. Excepción documentada solo aquí y en ADR-0005 (no se modifica `.cursor/rules/ds-core.mdc` en Fase 1).

## Tabla

| Situación                      | Hasta publicar `0.1.0`                   | Desde `0.1.0` en adelante                        |
| ------------------------------ | ---------------------------------------- | ------------------------------------------------ |
| Renombrar token                | Permitido **sin** alias ni `$deprecated` | Alias + `$deprecated` durante una minor completa |
| Cambiar / ampliar `exports`    | Permitido sin periodo de deprecación     | Semver + migración documentada                   |
| Eliminar o sustituir `renderX` | Permitido sin `deprecated` de una minor  | Conservar deprecated una minor                   |

## Justificación (F0 + F1-00)

- Paquete `E404` en npm; cero imports de `@soluciones-alexendros/ds` en zedazo, ArchMaker y alexendros.dev.
- Hits del patrón `design-references|--ds-|ds/styles.css` en flota son copias/CSS locales, no consumo de este paquete.

## Alcance

Fase 2 **usa** esta política: renombres limpios (`text.on-surface` → `text.default`, etc.) **sin** alias/`$deprecated`. **Desde `0.1.0`:** cualquier renombre futuro exige alias + `$deprecated` durante una minor completa (ver ADR-0005).
