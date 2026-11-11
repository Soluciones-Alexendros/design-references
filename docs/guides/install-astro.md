# Instalar en Astro

Guía alineada con el fixture verificado `fixtures/consumers/astro-min` (F4-03):
instalación desde tarball/`npm`, build estático y axe 0 violaciones.

## 1. Dependencia

Tras publicar en npm (`F4-05`):

```bash
npm install @soluciones-alexendros/ds
```

Hasta entonces, el gate del monorepo usa **solo** el tarball de `npm pack`
(nunca `file:../../packages/ds`):

```bash
npm pack -w @soluciones-alexendros/ds --pack-destination fixtures/consumers/.tarballs
cd fixtures/consumers/astro-min
npm install ../.tarballs/soluciones-alexendros-ds-*.tgz
```

Comprobar G-CONS: en `package-lock.json`,
`node_modules/@soluciones-alexendros/ds.resolved` debe apuntar a un `.tgz`.

## 2. CSS (tokens + componentes)

Hay que importar **ambos**:

```js
import "@soluciones-alexendros/ds/tokens.css"; // o styles.css
import "@soluciones-alexendros/ds/css";
```

Solo `styles.css` / `tokens.css` no incluye capas ni estilos de componentes.

## 3. theme-boot (antes del paint)

En el fixture se lee el export `./theme-boot` y se inyecta inline:

```astro
---
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const themeBoot = readFileSync(
  require.resolve("@soluciones-alexendros/ds/theme-boot"),
  "utf8"
);
---
<script is:inline set:html={themeBoot} />
```

## 4. Wrappers Astro

```astro
---
import Button from "@soluciones-alexendros/ds/astro/Button.astro";
import Alert from "@soluciones-alexendros/ds/astro/Alert.astro";
import Field from "@soluciones-alexendros/ds/astro/Field.astro";
---
<Button label="Save" variant="primary" />
<Alert tone="info" message="Listo" />
<Field label="Email" id="email" type="email" />
```

Props = las del HTML canónico / `renderX` (p. ej. Alert usa `message`, no `title`).

## 5. Verificar

```bash
npm run build   # en el app Astro
# En el monorepo:
npm run test:consumers
```

Referencia canónica: `fixtures/consumers/astro-min/src/pages/index.astro`.
