# VALIDATE inventory — behavior → tests

Stack discovery: npm workspaces, Node `>=22.23.4` (engines), node scripts (no Jest/Vitest).  
Full suite: `npm test`  
Focused: `npm run test:primitives`, `npm run test:a11y`, `npm run test:contrast`, `npm run test:structure`

| Observable behavior                              | Test / gate                                       | Status                     |
| ------------------------------------------------ | ------------------------------------------------- | -------------------------- |
| DTCG tokens valid                                | `validate:tokens`                                 | covered                    |
| Semantic resolve light/dark                      | `test:resolve`                                    | covered                    |
| `setTheme` light/dark/system                     | `test:theme`                                      | covered                    |
| Contrast pairs AA thresholds                     | `test:contrast`                                   | covered                    |
| Component CSS tokens-only                        | `lint:tokens-only`                                | covered                    |
| Link / Stack / Field contracts                   | `test:primitives`                                 | covered                    |
| Link+Field axe serious/critical light/dark       | `test:a11y`                                       | covered                    |
| Stack outside axe (non-interactive)              | N/A — intentional                                 | documented                 |
| P1 structure + prior Link/Stack/Field acceptance | `test:structure` (schemas)                        | covered                    |
| Homepage lists 7 primitives                      | `test:structure` DS-01…DS-07                      | covered (RED proven)       |
| Homepage keeps /tokens/ and /playground/         | `test:structure` DS-08…DS-09                      | covered (RED proven)       |
| Select/Checkbox/Banner modules + exports         | `test:structure` NP-01…NP-02                      | covered (RED proven)       |
| Select/Checkbox focus tokens                     | `test:structure` NP-03…NP-04                      | covered (RED proven)       |
| Banner role + docs + playground + axe wiring     | `test:structure` NP-05…NP-11                      | covered (RED proven)       |
| Select/Checkbox/Banner behavior contracts        | `test:primitives` (IMPLEMENT)                     | planned                    |
| Select+Checkbox+Banner axe light/dark            | `test:a11y` (IMPLEMENT)                           | planned                    |
| Docs smoke build                                 | `npm run build -w @soluciones-alexendros/ds-docs` | covered outside `npm test` |
| Browser playground interaction                   | N/A — static Astro smoke only                     | documented                 |
