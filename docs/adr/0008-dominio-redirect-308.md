# ADR-0008 — Dominio canónico y redirecciones (308)

- **Estado:** Accepted
- **Fecha:** 2026-11-10

## Contexto

Un solo proyecto Vercel `design-references`. Dominios: `design.alexendros.dev` (canónico) y alias `design-references-two.vercel.app` sin redirect (F0).

## Decisión

- Canónico: `https://design.alexendros.dev`.
- Redirect **308** por host: `design-references-two.vercel.app` → `https://design.alexendros.dev/:path*` vía `vercel.json` (F1-01).

## Alternativas

- Eliminar el alias en Vercel — pierde compatibilidad de URLs antiguas.
- 302 temporal — incorrecto para canonicidad permanente.

## Consecuencias

Tras deploy en Vercel, verificar:

```bash
curl -sI https://design-references-two.vercel.app/
# esperar: HTTP/2 308 y Location: https://design.alexendros.dev/
curl -sI https://design.alexendros.dev/
# no debe redirigir en bucle
```

Rollback: revertir o vaciar `redirects` en `vercel.json`.
