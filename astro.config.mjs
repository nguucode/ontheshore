// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://ontheshore.biz",
  trailingSlash: "always",
  redirects: { "/cv/": "/about/", "/vi/cv/": "/vi/about/" },
  build: {
    format: "directory",
  },
});
