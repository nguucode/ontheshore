// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ontheshore.biz",
  trailingSlash: "always",
  redirects: {
    "/cv/": "/about/",
    "/vi/cv/": "/vi/about/",
    // case study TrueProfit từng ẩn danh dưới tên này vài giờ ngày 2026-10-01
    "/projects/shopify-profit-analytics/": "/projects/trueprofit/",
    "/vi/projects/shopify-profit-analytics/": "/vi/projects/trueprofit/",
  },
  // Trang redirect không vào sitemap.
  integrations: [sitemap({ filter: (page) => !/\/(cv|cv-print|shopify-profit-analytics)\/$/.test(page) })],
  build: {
    format: "directory",
  },
});
