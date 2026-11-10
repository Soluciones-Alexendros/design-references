# Runbooks

## CI red (a11y)

1. Read the failing job log (`contrast + axe` or `ci.yml`).
2. Contrast failures: adjust semantic pairs in `tokens/semantic.json` (keep OKLCH).
3. Axe failures: fix primitive markup/CSS; re-run `npm run test:a11y -w @soluciones-alexendros/ds`.
