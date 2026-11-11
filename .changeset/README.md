# Changesets

This folder stores changeset files for `@soluciones-alexendros/ds`.

Until `0.1.0` is published, renames may ship without alias/`$deprecated` (see `docs/spec/stability.md`). After `0.1.0`, renames require alias + `$deprecated` for a full minor.

Release automation skeleton: `.github/workflows/release.yml` (manual `dry-run` / Version Packages PR). npm publish, provenance, tags and GitHub Releases stay off until F4-05.

## Pre-publish version path (F4)

`packages/ds/package.json` already declares `0.1.0` but the package is **not published**. Pending changesets were originally typed `minor`, which would make `changeset version` bump to **`0.2.0`**.

All pre-publish changesets are **`patch`** so a mistaken Version Packages run stays on the `0.1.x` line (→ `0.1.1`), never `0.2.0`.

**F4-05 first publish:** publish the current `0.1.0` (or fold these patches into the `0.1.0` CHANGELOG without bumping). Do **not** run `changeset version` before the first npm publish if the goal is the literal tag `0.1.0`.
