# Instalar en Next.js

Guía alineada con el fixture verificado `fixtures/consumers/next-min` (F4-03):
App Router, `output: "export"`, tarball/`npm`, build + axe 0 violaciones.

## 1. Dependencia

Tras publicar (`F4-05`):

```bash
npm install @soluciones-alexendros/ds
```

Hasta entonces (G-CONS — solo tarball):

```bash
npm pack -w @soluciones-alexendros/ds --pack-destination fixtures/consumers/.tarballs
cd fixtures/consumers/next-min
npm install ../.tarballs/soluciones-alexendros-ds-*.tgz
```

`resolved` en el lockfile debe ser un `.tgz`, no `packages/ds`.

## 2. CSS (tokens + componentes)

En el layout raíz:

```js
import "@soluciones-alexendros/ds/tokens.css";
import "@soluciones-alexendros/ds/css";
```

Ambos son obligatorios; `/css` aporta `@layer` y estilos de primitivos.

## 3. theme-boot

Next no inyecta bien el fuente via `readFileSync` en el layout durante
`output: "export"`. El fixture copia el export a `public/` en `prebuild`:

```js
// copy-theme-boot.mjs
import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
mkdirSync(join(root, "public"), { recursive: true });
copyFileSync(
  require.resolve("@soluciones-alexendros/ds/theme-boot"),
  join(root, "public", "theme-boot.js")
);
```

```json
{
  "scripts": { "prebuild": "node ./copy-theme-boot.mjs", "build": "next build" }
}
```

```jsx
// app/layout.jsx
<head>
  <script src="/theme-boot.js" />
</head>
```

## 4. Wrappers React

```jsx
import { Button, Alert, Field } from "@soluciones-alexendros/ds/react";

export default function Page() {
  return (
    <main>
      <Button label="Save" variant="primary" />
      <Alert tone="info" message="Listo" />
      <Field label="Email" id="email" type="email" />
    </main>
  );
}
```

Peer: `react` 18 o 19. Sin `"use client"` para estos primitivos (sin hooks).

## 5. Config mínima del fixture

```js
// next.config.mjs — output estático para smoke axe
export default {
  output: "export",
  reactStrictMode: true,
  outputFileTracingRoot: /* directorio del fixture */,
};
```

## 6. Verificar

```bash
npm run build   # genera out/
npm run test:consumers   # en el monorepo
```

Referencias: `fixtures/consumers/next-min/app/{layout,page}.jsx`,
`copy-theme-boot.mjs`.
