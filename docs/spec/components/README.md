# Componentes — inventario F3-00 y specs

### Propósito de este documento

Inventario del HTML que emiten los 10 `renderX` actuales frente a la plantilla de componente (anatomía, estados, a11y, do/don’t, HTML canónico). Las specs por slug cierran DoD 1–3; wrappers (F3-05) y Playwright (F3-07) quedan fuera.

## Inventario HTML actual (`packages/ds/src/components/*`)

| Slug     | `renderX`        | HTML actual (resumen)                                                                          | Gaps vs plantilla                                           |
| -------- | ---------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| button   | `renderButton`   | `<button class="ds-button ds-button--{variant}" type … disabled? aria-busy?>`                  | Sin `ghost`/`size`; loading solo texto; sin página docs     |
| input    | `renderInput`    | `<input class="ds-input" id type value aria-label? aria-invalid? aria-describedby? disabled?>` | Sin label visible propio (Field lo aporta); sin página docs |
| card     | `renderCard`     | `<div class="ds-card [ds-card--elevated]">`                                                    | Sin estados interactivos; sin página docs                   |
| alert    | `renderAlert`    | `<div class="ds-alert ds-alert--{tone}" role>` + prefijo textual                               | Sin icono de estado (F3-03); sin página docs                |
| link     | `renderLink`     | `<a class="ds-link" href>`                                                                     | Sin `visited` documentado; sin página docs                  |
| stack    | `renderStack`    | `<div class="ds-stack ds-stack--gap-{sm\|md\|lg}">`                                            | Solo layout; sin página docs                                |
| field    | `renderField`    | label + `renderInput` + `<p class="ds-field__error" role="alert">`                             | Sin icono en error (F3-03); sin página docs                 |
| select   | `renderSelect`   | `<select class="ds-select">` + `<option>`                                                      | Nativo (OK); sin página docs                                |
| checkbox | `renderCheckbox` | `<label class="ds-checkbox"><input class="ds-checkbox__input">` + span                         | Sin indeterminate; sin página docs                          |
| banner   | `renderBanner`   | `<div class="ds-banner ds-banner--{tone}" role>` + prefijo textual                             | Sin icono (F3-03); sin página docs                          |

Fuente de contrato previo: `packages/ds/src/components.md` (se mantiene como índice de módulos; la spec viva por slug es este directorio).

## Specs (F3-01)

| Slug                | Spec              |
| ------------------- | ----------------- |
| [button](button.md) | [input](input.md) | [card](card.md)     | [alert](alert.md)       | [link](link.md)     |
| [stack](stack.md)   | [field](field.md) | [select](select.md) | [checkbox](checkbox.md) | [banner](banner.md) |

ThemeToggle: [`theme-toggle.md`](theme-toggle.md) (F3-04).
