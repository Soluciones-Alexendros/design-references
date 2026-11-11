# F5 gate parcial (Anexo B) — F5-07 / F5-08 / F5-09

- **Fecha:** 2026-11-11
- **Base:** `main` @ `b52ef940cc678c3dd323c7d603624b6d774926e5`
- **Alcance:** Lighthouse CI + presupuestos gzip + verificación 308 (sin publish F4-05, sin F6)

## Anexo B — Fase 5

| Criterio                                                  | Estado                 | Evidencia                                                                        |
| --------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------- |
| Presupuestos cumplidos en rutas clave (a11y=100, perf≥95) | ver corrida LHCI abajo | `npm run test:lighthouse` + `lighthouserc.cjs`                                   |
| `tokens.css` / `styles.css` ≤ 8 KB gzip                   | PASS                   | `npm run test:budgets` → gzip **1297 B**                                         |
| `theme-boot` ≤ 1 KB                                       | PASS                   | raw **315 B** (gzip 231 B)                                                       |
| Sitio solo `--ds-*` (sin hardcode en CSS de sitio)        | PASS previo Oleada 2   | `apps/docs/src/styles/site.css` + `lint:tokens-only`                             |
| 308 alias → canónico                                      | ver F5-08              | HEAD pre-fix = **200** (blocker); fix en `vercel.json` + `apps/docs/vercel.json` |

**Aprobar F5 completo:** no — gate parcial hasta redeploy que demuestre 308 y LHCI verde en CI.

**Rechazar si (Anexo B):** sitio usa valores fuera de `--ds-*` — no observado en este alcance.

## F5-07 — Lighthouse + presupuestos

Comandos:

```bash
npm run build -w @soluciones-alexendros/ds
npm run test:budgets
npm run build -w @soluciones-alexendros/ds-docs
CHROME_PATH="$(node -e "import('playwright').then((p)=>console.log(p.chromium.executablePath()))")" \
  npm run test:lighthouse
```

Rutas clave (`lighthouserc.cjs`, preset desktop, 1 run):

| Ruta                  | a11y | perf |
| --------------------- | ---: | ---: |
| `/`                   |  100 |  100 |
| `/foundations/color/` |  100 |  100 |
| `/components/`        |  100 |  100 |
| `/components/button/` | 100* |  100 |
| `/playground/`        | 100* |  100 |
| `/a11y/`              |  100 |  100 |
| `/guides/`            |  100 |  100 |

\* Tras fixes: heading-order en specs (`###`→`##`); playground `aside[role=status]` → `renderAlert` (`div[role=status]`).

Pre-fix (no inventar PASS): button a11y **98** (`heading-order`); playground a11y **99** (`aria-allowed-role` en `<aside role="status">`).

## F5-08 — 308

Pre-fix (2026-11-11, Node `https.request` HEAD, sin follow):

```text
https://design-references-two.vercel.app/ → status 200, location null
https://design-references-two.vercel.app/guides/ → status 200, location null
https://design.alexendros.dev/ → status 200
```

`vercel.json` en raíz existía desde F1 pero no aplicaba en prod (probable Root Directory `apps/docs`). Fix: host regex escapado (docs Vercel) + copia en `apps/docs/vercel.json`. **Verificación post-merge/redeploy pendiente** — no citar PASS 308 hasta `curl -sI` → 308 + `Location: https://design.alexendros.dev/`.

## F5-09

Gate parcial: presupuestos PASS; LHCI a11y/perf en rutas clave PASS tras fixes locales; 308 **blocked** hasta evidencia post-deploy.
