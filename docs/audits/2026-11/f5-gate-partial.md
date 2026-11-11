# F5 gate parcial (Anexo B) — F5-07 / F5-08 / F5-09

- **Fecha:** 2026-11-11
- **Base:** `main` @ `b52ef940cc678c3dd323c7d603624b6d774926e5`
- **Alcance:** Lighthouse CI + presupuestos gzip + verificación 308 (sin publish F4-05, sin F6)

## Anexo B — Fase 5

| Criterio                                                  | Estado                 | Evidencia                                                            |
| --------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------- |
| Presupuestos cumplidos en rutas clave (a11y=100, perf≥95) | ver corrida LHCI abajo | `npm run test:lighthouse` + `lighthouserc.cjs`                       |
| `tokens.css` / `styles.css` ≤ 8 KB gzip                   | PASS                   | `npm run test:budgets` → gzip **1297 B**                             |
| `theme-boot` ≤ 1 KB                                       | PASS                   | raw **315 B** (gzip 231 B)                                           |
| Sitio solo `--ds-*` (sin hardcode en CSS de sitio)        | PASS previo Oleada 2   | `apps/docs/src/styles/site.css` + `lint:tokens-only`                 |
| 308 alias → canónico                                      | PASS                   | Domain redirect 308 (API PATCH); HEAD post = 308 + Location canónico |

**Aprobar F5 completo:** gate parcial — 308 cerrado; LHCI en CI aún por confirmar si el workflow remoto no está verde.

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

**Causa raíz:** el alias `design-references-two.vercel.app` tenía `redirect: null` en el proyecto. Root Directory = `.` (no `apps/docs`); `vercel.json` en repo + `apps/docs/vercel.json` no producían 308 en el alias.

**Fix:** `PATCH /v9/projects/design-references/domains/design-references-two.vercel.app` (token CLI Vercel) con `redirect=design.alexendros.dev`, `redirectStatusCode=308`. Sin remove+add; sin redeploy.

Pre (2026-11-11, Node HEAD sin follow):

```text
https://design-references-two.vercel.app/ → status 200, location null
https://design-references-two.vercel.app/guides/ → status 200, location null
https://design.alexendros.dev/ → status 200, location null
```

Post (misma sesión, tras PATCH; MCP `get_project_domain` → redirect + 308):

```text
https://design-references-two.vercel.app/ → status 308, location https://design.alexendros.dev/
https://design-references-two.vercel.app/guides/ → status 308, location https://design.alexendros.dev/guides/
https://design-references-two.vercel.app/components/button/ → status 308, location https://design.alexendros.dev/components/button/
https://design.alexendros.dev/ → status 200, location null
```

**F5-08: PASS**

## F5-09

Gate parcial: presupuestos PASS; LHCI a11y/perf local PASS; 308 **PASS**. Blockers restantes fuera de F5-08: LHCI en CI remoto si aún falla; F4-05 publish y F6 fuera de alcance.
