# Component: Link

### Propósito de este documento

Spec viva de Link: navegación con contraste y foco (DoD 1–3).

**Descripción.** Navegación. Acciones in-page usan Button.

| Propiedad | Tipo   | Defecto  | Descripción   |
| --------- | ------ | -------- | ------------- |
| `href`    | string | `"#"`    | Destino       |
| `label`   | string | `"Link"` | Texto visible |

| Estado        | Visual                  | Comportamiento                                                                                                                                                                                                                          |
| ------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default       | `text.link` + underline | —                                                                                                                                                                                                                                       |
| Hover         | `text.link-hover`       | —                                                                                                                                                                                                                                       |
| Focus-visible | Anillo `border.focus`   | —                                                                                                                                                                                                                                       |
| Visited       | **N/A (F3-08)**         | Sin token `text.link-visited` ni estilo `:visited`; no hay par en `contrast.pairs.json`. Se documenta a propósito: UA `:visited` styling es limitado por privacidad; se reabrirá solo si el producto exige un token + par de contraste. |

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
