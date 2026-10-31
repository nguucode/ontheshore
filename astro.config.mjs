// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ontheshore.biz",
  trailingSlash: "always",
  // Chỉ link có data-astro-prefetch (menu) được tải trước, để bấm menu trên mobile ra trang ngay.
  prefetch: true,
  redirects: {
    "/cv/": "/about/",
    "/vi/cv/": "/vi/about/",
    // case study TrueProfit từng ẩn danh dưới tên này vài giờ ngày 2026-10-01
    "/projects/shopify-profit-analytics/": "/projects/trueprofit/",
    "/vi/projects/shopify-profit-analytics/": "/vi/projects/trueprofit/",
    // AccountKit từng ẩn danh là "Accounting SaaS" (2026-10-01 → 2026-10-31)
    "/projects/accounting-saas/": "/projects/accountkit/",
    "/vi/projects/accounting-saas/": "/vi/projects/accountkit/",
  },
  // Trang redirect không vào sitemap.
  integrations: [sitemap({ filter: (page) => !/\/(cv|cv-print|shopify-profit-analytics|accounting-saas)\/$/.test(page) })],
  // Chỉ dùng tsconfig của project. Worktree nằm trong .claude/worktrees của repo chính, Vite tự dò
  // lên tsconfig cha (không có node_modules) và lỗi "Tsconfig not found astro/tsconfigs/strict".
  vite: { tsconfig: "./tsconfig.json" },
  build: {
    format: "directory",
  },
});
