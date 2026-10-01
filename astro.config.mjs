// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ontheshore.biz",
  trailingSlash: "always",
  redirects: { "/cv/": "/about/", "/vi/cv/": "/vi/about/" },
  // Trang redirect /cv/ không vào sitemap.
  integrations: [sitemap({ filter: (page) => !/\/cv\/$/.test(page) })],
  build: {
    format: "directory",
  },
});
