# Component: Card

### Propósito de este documento

Spec viva de Card: contenedor de superficie (DoD 1–3).

**Descripción.** Contenedor no interactivo para agrupar contenido.

| Propiedad  | Tipo          | Defecto          | Descripción                                           |
| ---------- | ------------- | ---------------- | ----------------------------------------------------- |
| `elevated` | boolean       | `false`          | Aplica `ds-card--elevated` + `--ds-elevation-surface` |
| `body`     | string (HTML) | `"Card content"` | Contenido interno                                     |

| Estado   | Visual                        | Comportamiento |
| -------- | ----------------------------- | -------------- |
| Default  | borde + `bg.surface-elevated` | —              |
| Elevated | sombra `elevation.surface`    | —              |

**Accesibilidad.** Sin rol interactivo; no requiere foco salvo que el consumidor lo haga focusable.

| Hacer                       | Evitar                                    |
| --------------------------- | ----------------------------------------- |
| Usar para agrupar contenido | Convertir la card entera en botón sin rol |

**HTML canónico:**

```html
<div class="ds-card ds-card--elevated">Contenido</div>
```

**Módulo:** `Card.js` + `Card.css` · `renderCard`.
