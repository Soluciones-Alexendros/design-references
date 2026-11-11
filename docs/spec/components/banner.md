# Component: Banner

### Propósito de este documento

Spec viva de Banner: feedback persistente de página (DoD 1–3).

**Descripción.** Aviso persistente (sin timer/toast). Alert es feedback local.

| Propiedad | Tipo                                        | Defecto    | Descripción   |
| --------- | ------------------------------------------- | ---------- | ------------- |
| `tone`    | `info` \| `success` \| `warning` \| `error` | `info`     | Pares bg/text |
| `role`    | `status` \| `alert`                         | `status`   | Live region   |
| `body`    | string                                      | `"Notice"` | Texto         |

| Estado   | Visual                                    | Comportamiento                |
| -------- | ----------------------------------------- | ----------------------------- |
| Por tono | bg/text + prefijo textual (+ icono F3-03) | Persistente; sin auto-dismiss |

**Accesibilidad.** Rol ARIA; prefijo textual; icono `aria-hidden` (F3-03); contraste tone.

| Hacer                                   | Evitar                                |
| --------------------------------------- | ------------------------------------- |
| Un banner por mensaje crítico de página | Sustituir Alert contextual por Banner |
| Texto + icono además del color          | Solo color como indicador             |

**HTML canónico:**

```html
<div class="ds-banner ds-banner--warning" role="status">
  <strong>Warning:</strong> Maintenance tonight
</div>
```

**Módulo:** `Banner.js` + `Banner.css` · `renderBanner`.
