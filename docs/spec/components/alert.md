# Component: Alert

### Propósito de este documento

Spec viva de Alert: feedback puntual con tono y rol ARIA (DoD 1–3).

**Descripción.** Mensaje de feedback en contexto. Banner es persistente a nivel de página.

| Propiedad | Tipo                                        | Defecto          | Descripción            |
| --------- | ------------------------------------------- | ---------------- | ---------------------- |
| `tone`    | `info` \| `success` \| `warning` \| `error` | `info`           | Pares bg/text por tono |
| `role`    | `status` \| `alert`                         | `status`         | Live region            |
| `message` | string                                      | `"Notification"` | Texto                  |

| Estado                     | Visual                                                 | Comportamiento        |
| -------------------------- | ------------------------------------------------------ | --------------------- |
| info/success/warning/error | `bg`/`text` del tono + prefijo textual (+ icono F3-03) | No solo color (1.4.1) |

**Accesibilidad.** `role="status"` o `role="alert"`; prefijo textual del tono; icono decorativo `aria-hidden` (F3-03); contraste de pares tone.

| Hacer                                     | Evitar                            |
| ----------------------------------------- | --------------------------------- |
| Prefijo + icono además del color          | Confiar solo en el color del tono |
| `role="alert"` solo para errores urgentes | Alertas no urgentes con `alert`   |

**HTML canónico:**

```html
<div class="ds-alert ds-alert--error" role="alert">
  <strong>Error:</strong> Falló el guardado
</div>
```

**Módulo:** `Alert.js` + `Alert.css` · `renderAlert`.
