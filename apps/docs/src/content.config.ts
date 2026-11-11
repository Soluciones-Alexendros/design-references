import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const components = defineCollection({
  loader: glob({
    pattern:
      "{alert,banner,button,card,checkbox,field,input,link,select,stack,theme-toggle}.md",
    base: new URL("../../../docs/spec/components", import.meta.url),
  }),
});

const guides = defineCollection({
  loader: glob({
    pattern: "{install-astro,install-next}.md",
    base: new URL("../../../docs/guides", import.meta.url),
  }),
});

export const collections = { components, guides };
