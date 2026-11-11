/**
 * F5-07 Lighthouse CI — a11y = 100 (hard), performance ≥ 95 on key docs routes.
 * Collects against the static Astro build in apps/docs/dist.
 */
module.exports = {
  ci: {
    collect: {
      staticDistDir: "./apps/docs/dist",
      numberOfRuns: 1,
      url: [
        "http://localhost/",
        "http://localhost/foundations/color/",
        "http://localhost/components/",
        "http://localhost/components/button/",
        "http://localhost/playground/",
        "http://localhost/a11y/",
        "http://localhost/guides/",
      ],
      settings: {
        // Docs are content-led; desktop form-factor matches the vitrina layout.
        preset: "desktop",
        chromeFlags: "--no-sandbox --disable-dev-shm-usage",
      },
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:performance": ["error", { minScore: 0.95 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./.lighthouseci",
    },
  },
};
