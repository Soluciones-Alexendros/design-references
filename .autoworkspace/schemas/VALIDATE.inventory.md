# VALIDATE inventory — behavior → tests

Stack discovery: npm workspaces, Node `>=20`, node scripts (no Jest/Vitest).  
Full suite: `npm test`  
Focused: `npm run test:primitives`, `npm run test:a11y`, `npm run test:contrast`, `npm run test:acceptance`

| Observable behavior | Test / gate | Status |
|---------------------|-------------|--------|
| DTCG tokens valid | `validate:tokens` | covered |
| Semantic resolve light/dark | `test:resolve` | covered |
| `setTheme` light/dark/system | `test:theme` | covered |
| Contrast pairs AA thresholds | `test:contrast` | covered |
| Component CSS tokens-only | `lint:tokens-only` | covered |
| Link href/label + focus tokens | `test:primitives` | covered (RED proven) |
| Stack gap sm/md/lg + space tokens | `test:primitives` | covered |
| Field label/`for`, describedby, error text, omitAriaLabel | `test:primitives` | covered |
| Link+Field axe serious/critical light/dark | `test:a11y` | covered |
| Stack outside axe (non-interactive) | N/A — intentional; playground + primitives runner | documented |
| P1 structure files / ci jobs / no a11y dup | `test:acceptance` + `check-product-structure --profile P1` | covered |
| Docs smoke build | `npm run build -w @soluciones-alexendros/ds-docs` (ci smoke) | covered outside `npm test` |
| Browser playground interaction | N/A — static Astro smoke only; no browser E2E in repo | documented |
