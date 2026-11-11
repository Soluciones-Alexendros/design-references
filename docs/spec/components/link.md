# Component: Link

### Propósito de este documento

Spec viva de Link: navegación con contraste y foco (DoD 1–3).

**Descripción.** Navegación. Acciones in-page usan Button.

| Propiedad | Tipo   | Defecto  | Descripción   |
| --------- | ------ | -------- | ------------- |
| `href`    | string | `"#"`    | Destino       |
| `label`   | string | `"Link"` | Texto visible |

| Estado        | Visual                  | Comportamiento  |
| ------------- | ----------------------- | --------------- |
| Default       | `text.link` + underline | —               |
| Hover         | `text.link-hover`       | —               |
| Focus-visible | Anillo `border.focus`   | —               |
| Visited       | Diferido (F3-08) o N/A  | No expuesto aún |

**Accesibilidad.** `<a>` nativo; foco visible; par `text.link` / `bg.surface`.

| Hacer                     | Evitar                       |
| ------------------------- | ---------------------------- |
| Texto de destino claro    | «Haz clic aquí» sin contexto |
| Usar Button para acciones | `<a>` sin `href` como botón  |

**HTML canónico:**

```html
<a class="ds-link" href="/docs">Documentación</a>
```

**Módulo:** `Link.js` + `Link.css` · `renderLink`.
