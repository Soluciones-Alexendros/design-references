# Component: Stack

### Propósito de este documento

Spec viva de Stack: layout vertical con gap tokenizado (DoD 1–3).

**Descripción.** Contenedor flex en columna; no interactivo.

| Propiedad | Tipo                 | Defecto | Descripción    |
| --------- | -------------------- | ------- | -------------- |
| `gap`     | `sm` \| `md` \| `lg` | `md`    | `--ds-space-*` |
| `body`    | string (HTML)        | `""`    | Hijos          |

| Estado       | Visual                   | Comportamiento |
| ------------ | ------------------------ | -------------- |
| gap-sm/md/lg | `gap: var(--ds-space-*)` | —              |

**Accesibilidad.** Contenedor neutro; fuera del fixture axe interactivo (como Card).

| Hacer           | Evitar                            |
| --------------- | --------------------------------- |
| Gaps vía tokens | Márgenes hardcodeados entre hijos |

**HTML canónico:**

```html
<div class="ds-stack ds-stack--gap-md"><!-- children --></div>
```

**Módulo:** `Stack.js` + `Stack.css` · `renderStack`.
