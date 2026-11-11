# Component: Checkbox

## Propósito de este documento

Spec viva de Checkbox con label visible (DoD 1–3).

**Descripción.** Opción booleana nativa asociada a label.

| Propiedad  | Tipo    | Defecto       | Descripción         |
| ---------- | ------- | ------------- | ------------------- |
| `id`       | string  | `ds-checkbox` | Id del input        |
| `label`    | string  | `"Option"`    | Texto visible       |
| `checked`  | boolean | `false`       | Atributo `checked`  |
| `disabled` | boolean | `false`       | Atributo `disabled` |

| Estado            | Visual                 | Comportamiento |
| ----------------- | ---------------------- | -------------- |
| Default / checked | `accent-color` primary | —              |
| Focus-visible     | Anillo en el input     | —              |
| Disabled          | `text.on-disabled`     | No interactivo |

**Accesibilidad.** `<label for>` + input; objetivo táctil vía `min-height: touch`; foco visible.

| Hacer                                | Evitar                 |
| ------------------------------------ | ---------------------- |
| Label visible asociado               | Checkbox sin texto     |
| Grupo con leyenda cuando haya varios | Solo color para estado |

**HTML canónico:**

```html
<label class="ds-checkbox" for="terms">
  <input id="terms" class="ds-checkbox__input" type="checkbox" />
  <span class="ds-checkbox__label">Accept terms</span>
</label>
```

**Módulo:** `Checkbox.js` + `Checkbox.css` · `renderCheckbox`.
