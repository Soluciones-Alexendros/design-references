# Component: ThemeToggle

### Propósito de este documento

Spec viva de ThemeToggle + persistencia `ds-theme` y theme-boot ≤1KB (F3-04 / N-01).

**Descripción.** Selector exclusivo light / dark / system. Persiste en `localStorage` clave `ds-theme`. `theme-boot.js` aplica el valor antes del primer pintado.

| Propiedad | Tipo | Defecto | Descripción |
| --- | --- | --- | --- |
| `value` | `light` \| `dark` \| `system` | `system` | Modo seleccionado |
| `label` | string | `"Theme"` | Nombre accesible del `role="group"` |

| Estado | Visual | Comportamiento |
| --- | --- | --- |
| Default | grupo sobre `bg.secondary` | — |
| Selected | `aria-pressed="true"` + `bg.primary` | Llama `setTheme` + persiste |
| Focus-visible | Anillo `border.focus` | — |
| Hover (no selected) | borde `border.default` | — |

**Accesibilidad.** `role="group"` + `aria-label`; cada opción es `<button>` con `aria-pressed`.

| Hacer | Evitar |
| --- | --- |
| Incluir `theme-boot.js` en `<head>` | Aplicar tema solo tras `DOMContentLoaded` |
| Persistir con clave `ds-theme` | Claves distintas por consumidor |

**HTML canónico:**

```html
<div class="ds-theme-toggle" role="group" aria-label="Theme">
  <button type="button" class="ds-theme-toggle__btn" data-ds-theme="light" aria-pressed="false">Light</button>
  <button type="button" class="ds-theme-toggle__btn" data-ds-theme="dark" aria-pressed="false">Dark</button>
  <button type="button" class="ds-theme-toggle__btn" data-ds-theme="system" aria-pressed="true">System</button>
</div>
```

**Módulos:** `ThemeToggle.js` + `ThemeToggle.css`; `theme.js` (`setTheme`, `getStoredTheme`); `theme-boot.js`.
