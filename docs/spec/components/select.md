# Component: Select

### Propósito de este documento

Spec viva de Select nativo (DoD 1–3).

**Descripción.** Lista de opciones con `<select>` nativo (sin listbox custom).

| Propiedad                              | Tipo              | Defecto     | Descripción                        |
| -------------------------------------- | ----------------- | ----------- | ---------------------------------- |
| `id`                                   | string            | `ds-select` | Id                                 |
| `options`                              | `{value,label}[]` | Choose… / A | Opciones                           |
| `value`                                | string            | `""`        | Selección                          |
| `label`                                | string            | `"Select"`  | `aria-label` salvo `omitAriaLabel` |
| `disabled` / `invalid` / `describedBy` | —                 | —           | Igual que Input                    |

| Estado        | Visual                          | Comportamiento |
| ------------- | ------------------------------- | -------------- |
| Default       | familia control (Input)         | —              |
| Focus-visible | Anillo `border.focus`           | —              |
| Error         | `border.error` + `aria-invalid` | —              |
| Disabled      | tokens disabled                 | —              |

**Accesibilidad.** Control nativo; teclado del UA; foco visible.

| Hacer                            | Evitar                                 |
| -------------------------------- | -------------------------------------- |
| Label visible o `aria-label`     | Select sin nombre accesible            |
| Primera opción vacía como prompt | Placeholder no seleccionable sin value |

**HTML canónico:**

```html
<select id="region" class="ds-select" aria-label="Region">
  <option value="">Choose…</option>
  <option value="eu" selected>Europe</option>
</select>
```

**Módulo:** `Select.js` + `Select.css` · `renderSelect`.
