# Component: Field

## Propósito de este documento

Spec viva de Field: label visible + Input + error anunciado (DoD 1–3).

**Descripción.** Composición de formulario con asociación label/control/error.

| Propiedad                     | Tipo    | Defecto    | Descripción                       |
| ----------------------------- | ------- | ---------- | --------------------------------- |
| `id`                          | string  | `ds-field` | Id del input                      |
| `label`                       | string  | `"Field"`  | Texto del `<label for>`           |
| `invalid`                     | boolean | `false`    | Fuerza estado error               |
| `error`                       | string  | `""`       | Mensaje (default «Invalid value») |
| `type` / `disabled` / `value` | —       | —          | Delegados a `renderInput`         |

| Estado  | Visual                                                                  | Comportamiento               |
| ------- | ----------------------------------------------------------------------- | ---------------------------- |
| Default | label + input                                                           | —                            |
| Error   | `ds-field__error` + `aria-invalid` + `aria-describedby` (+ icono F3-03) | `role="alert"` en el mensaje |

**Accesibilidad.** Label visible; error con prefijo `Error:` (no solo color); foco en el input.

| Hacer                     | Evitar                                     |
| ------------------------- | ------------------------------------------ |
| Mensaje de error concreto | Marcar invalid sin texto                   |
| `for`/`id` coincidentes   | Solo `aria-label` cuando hay label visible |

**HTML canónico:**

```html
<div class="ds-field">
  <label class="ds-field__label" for="email">Email</label>
  <input
    id="email"
    class="ds-input"
    type="email"
    value=""
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <p id="email-error" class="ds-field__error" role="alert">
    <strong>Error:</strong> Enter a valid email
  </p>
</div>
```

**Módulo:** `Field.js` + `Field.css` · `renderField`.
