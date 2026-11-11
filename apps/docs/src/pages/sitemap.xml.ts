import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { absoluteUrl, SITE_ORIGIN, STATIC_ROUTES } from "../lib/site";

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? SITE_ORIGIN;
  const components = await getCollection("components");
  const paths = [
    ...STATIC_ROUTES,
    ...components.map((entry) => `/components/${entry.id}/`),
  ];
  const urls = [...new Set(paths)]
    .map(
      (path) => `  <url>
    <loc>${absoluteUrl(path, origin)}</loc>
  </url>`
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    }
  );
};
