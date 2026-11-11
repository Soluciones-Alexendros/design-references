# ADR-0008 — Dominio canónico y redirecciones (308)

- **Estado:** Accepted
- **Fecha:** 2026-11-10

## Contexto

Un solo proyecto Vercel `design-references`. Dominios: `design.alexendros.dev` (canónico) y alias `design-references-two.vercel.app` sin redirect (F0).

## Decisión

- Canónico: `https://design.alexendros.dev`.
- Redirect **308** del alias: project domain redirect (`redirect=design.alexendros.dev`, `redirectStatusCode=308`) — F5-08. `vercel.json` host redirects no bastaron en el alias `*.vercel.app`.

## Alternativas

- Eliminar el alias en Vercel — pierde compatibilidad de URLs antiguas.
- 302 temporal — incorrecto para canonicidad permanente.

## Consecuencias

Verificar (sin follow):

```bash
curl -sI https://design-references-two.vercel.app/
# esperar: HTTP/2 308 y Location: https://design.alexendros.dev/
curl -sI https://design.alexendros.dev/
# no debe redirigir en bucle
```

Rollback: `PATCH` el dominio alias con `redirect: null` / `redirectStatusCode: null`.
