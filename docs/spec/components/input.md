# Component: Input

## Propósito de este documento

Spec viva de Input: control de texto nativo con tokens y estados (DoD 1–3).

**Descripción.** Campo de entrada. Preferir Field cuando haga falta label visible + error.

| Propiedad       | Tipo                           | Defecto    | Descripción                              |
| --------------- | ------------------------------ | ---------- | ---------------------------------------- |
| `type`          | text \| email \| password \| … | `text`     | Tipo nativo                              |
| `id`            | string                         | `ds-input` | Id del control                           |
| `label`         | string                         | `"Field"`  | `aria-label` si no hay label visible     |
| `omitAriaLabel` | boolean                        | `false`    | Omitir cuando Field aporta `<label for>` |
| `disabled`      | boolean                        | `false`    | Atributo `disabled`                      |
| `invalid`       | boolean                        | `false`    | `aria-invalid="true"`                    |
| `describedBy`   | string?                        | —          | `aria-describedby`                       |
| `value`         | string                         | `""`       | Valor                                    |

| Estado        | Visual                                   | Comportamiento                   |
| ------------- | ---------------------------------------- | -------------------------------- |
| Default       | `bg.surface-elevated` / `border.default` | —                                |
| Focus-visible | Anillo `border.focus`                    | —                                |
| Error         | `border.error` + `aria-invalid`          | Anunciar vía describedby (Field) |
| Disabled      | `bg.disabled` / `text.on-disabled`       | No editable                      |

**Accesibilidad.** `<input>` nativo; foco visible; no transmitir error solo con color (Field añade texto).

| Hacer                           | Evitar                       |
| ------------------------------- | ---------------------------- |
| Asociar label visible vía Field | Placeholder como único label |
| `aria-describedby` al error     | Color solo para invalid      |

**HTML canónico:**

```html
<input id="email" class="ds-input" type="email" value="" aria-label="Email" />
```

**Módulo:** `Input.js` + `Input.css` · `renderInput`.
