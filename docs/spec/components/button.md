# Component: Button

## Propósito de este documento

Spec viva de Button: anatomía, props, estados, a11y y HTML canónico (DoD 1–3).

**Descripción.** Acción principal o secundaria. Para navegación usar Link.

| Variante    | Cuándo usarla                          |
| ----------- | -------------------------------------- |
| `primary`   | Una acción dominante por vista         |
| `secondary` | Acciones de apoyo                      |
| `danger`    | Acciones destructivas con confirmación |

| Propiedad  | Tipo                                 | Defecto    | Descripción                     |
| ---------- | ------------------------------------ | ---------- | ------------------------------- |
| `variant`  | `primary` \| `secondary` \| `danger` | `primary`  | Jerarquía visual                |
| `loading`  | boolean                              | `false`    | Texto «(loading)» + `aria-busy` |
| `disabled` | boolean                              | `false`    | Atributo `disabled` nativo      |
| `type`     | `button` \| `submit` \| `reset`      | `button`   | Evita envíos accidentales       |
| `label`    | string                               | `"Button"` | Contenido visible               |

| Estado        | Visual                                                 | Comportamiento                                           |
| ------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| Default       | `bg`/`text` según variante                             | —                                                        |
| Hover         | `bg.primary-hover` / `bg.error-hover` (primary/danger) | Cursor `pointer`                                         |
| Focus-visible | Anillo `border.focus`                                  | Nunca oculto                                             |
| Active        | `bg.primary-active` / `bg.error-active`                | —                                                        |
| Disabled      | `bg.disabled` / `text.on-disabled`                     | No interactivo                                           |
| Loading       | `aria-busy="true"` + `disabled`                        | Bloquea reenvío; `prefers-reduced-motion` sin transición |

**Accesibilidad.** Rol nativo `button`; Tab + Enter/Espacio; objetivo ≥ 24×24 (`--ds-space-touch`); foco visible; reduced-motion en transiciones.

| Hacer                          | Evitar                       |
| ------------------------------ | ---------------------------- |
| Etiqueta verbal clara          | Solo icono sin nombre        |
| Un `primary` por vista         | Varios `primary` compitiendo |
| `type="button"` fuera de forms | `<div>` clicable             |

**HTML canónico:**

```html
<button class="ds-button ds-button--primary" type="button">Guardar</button>
```

**Módulo:** `packages/ds/src/components/Button.js` + `Button.css` · `renderButton`.
