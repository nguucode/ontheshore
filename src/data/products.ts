/* Kiểm kê thật từ Figma Community @nguunguyen73, 19/09/2026.
   Số liệu đọc trực tiếp từ trang profile.
   Thêm mục mới: thêm object vào đúng mảng, không cần sửa gì khác.
   Mục chưa dùng được (chưa có href) hiện nhãn "Đang phát triển", không bấm được, không tính vào số đã publish.
   wip: có trang giới thiệu nhưng chưa dùng được: vẫn bấm được, vẫn hiện nhãn, không tính vào số đã publish.
   local: href là trang trong site này, cần gắn tiền tố /vi/ khi xem bản tiếng Việt.
   price: sản phẩm trả phí, hiện thay số lượt dùng, không tính vào số miễn phí.
   thumb: hiện ở khung Featured trên trang chủ khi mục này có nhiều lượt dùng nhất. */
import type { ImageMetadata } from "astro";
import circleCharts from "../assets/products/circle-charts.png";
import basicCharts from "../assets/products/basic-charts.png";
import polarisChart from "../assets/products/polaris-chart.png";

export type Item = {
  name: string;
  thumb?: ImageMetadata; // ảnh cover tải từ trang Figma Community (og:image)
  href?: string;
  local?: boolean;
  uses?: number;
  wip?: boolean;
  price?: string;
  note: { vi: string; en: string };
};

const figmaTemplates: Item[] = [
  {
    name: "Circle Charts",
    href: "https://www.figma.com/community/file/1227645405724568768/circle-charts",
    thumb: circleCharts,
    uses: 72600,
    note: { vi: "Circle chart dựng sẵn cho dashboard. Trong các template, đây là cái được dùng nhiều nhất.", en: "Ready-made circle charts for dashboards. Of all the templates, the most drawn upon." },
  },
  {
    name: "Basic Charts",
    href: "https://www.figma.com/community/file/1295304364849245693/basic-charts",
    thumb: basicCharts,
    uses: 18700,
    note: { vi: "Bar, line, area. Những dạng cơ bản, giữ nguyên sự cơ bản.", en: "Bar, line, area. The plain forms, kept plain." },
  },
  {
    name: "Polaris Chart",
    href: "https://www.figma.com/community/file/1235877373897536001/polaris-chart",
    thumb: polarisChart,
    uses: 12600,
    note: { vi: "Chart theo design system Polaris. Đặt giữa các component của nó mà không lộ đường nối.", en: "Charts built on the Polaris design system. Made to sit among its components without a seam." },
  },
  {
    name: "Country Flags",
    href: "https://www.figma.com/community/file/1360105018474702873/country-flags",
    uses: 104,
    note: { vi: "Bộ cờ quốc gia. Những ngọn cờ nhỏ của nhiều xứ sở.", en: "Country flag set. Small banners of many realms." },
  },
];

const figmaPlugins: Item[] = [
  {
    name: "Kusabimaru",
    href: "/products/kusabimaru/",
    local: true,
    price: "$20",
    note: {
      vi: "Đặt ảnh chụp màn hình vào thiết bị 3D thật, xoay tới góc ưng ý, tải về PNG nền trong suốt. Chạy trên web, plugin Figma đang chờ duyệt. 50 lượt đầu miễn phí.",
      en: "Put a screenshot on a real 3D device, turn it to any angle, download a transparent PNG. Runs on the web; the Figma plugin is in review. The first 50 exports are free.",
    },
  },
];

const figmaSkills: Item[] = [
  {
    name: "flatten-icon-frames",
    href: "https://www.figma.com/community/skill/89555/flatten-icon-frames",
    note: {
      vi: "Xử lý icon frame hàng loạt: outline stroke, union, fill đen, flatten thành một vector. Mỗi lượt bốn trăm cái, không một lời than.",
      en: "Batch-cleans icon frames: outline stroke, union, black fill, flatten to one vector. Four hundred at a time, without complaint.",
    },
  },
];

const openSource: Item[] = [
  {
    name: "Blasphemous",
    href: "/products/blasphemous/",
    local: true,
    wip: true,
    note: {
      vi: "Trình chiếu prototype Figma cho khách bằng một link: không cần tài khoản Figma, chuyển phone, tablet, desktop ngay trên trang, iPhone 3D xoay được. Khách thấy sản phẩm, Figma thì ẩn đi.",
      en: "Show Figma prototypes to clients with one link: no Figma account, switch phone, tablet, desktop on the page, a rotatable 3D iPhone. The client sees the product. Figma stays hidden.",
    },
  },
  {
    name: "Moonveil Icons",
    href: "https://nguucode.github.io/moonveilicons/",
    wip: true,
    note: {
      vi: "Icon library SVG open source, hai style outline và solid. Dùng qua npm, React, Vue, Web Component, webfont, CDN và CLI. Việc rèn vẫn chưa xong.",
      en: "Open-source SVG icon library, outline and solid. Ships via npm, React, Vue, Web Component, webfont, CDN and CLI. Its forging is not yet finished.",
    },
  },
  {
    name: "Zweihänder",
    href: "/zweihander/",
    note: {
      vi: "UI kit cho React: CSS Modules trên một lớp design token sinh tự động, tài liệu trên Storybook. Mới rèn xong Button và Text Input.",
      en: "React UI kit: CSS Modules over a generated design-token layer, documented in Storybook. Only Button and Text Input have been forged so far.",
    },
  },
];

export const groups = [
  { kind: "OSS", heading: { vi: "Open source", en: "Open source" }, items: openSource },
  { kind: "Figma", heading: { vi: "Figma — Templates", en: "Figma — Templates" }, items: figmaTemplates },
  { kind: "Skill", heading: { vi: "Figma — AI Skills", en: "Figma — AI Skills" }, items: figmaSkills },
  { kind: "Plugin", heading: { vi: "Figma — Plugins", en: "Figma — Plugins" }, items: figmaPlugins },
];

export const all = groups.flatMap((g) => g.items.map((it) => ({ ...it, kind: g.kind })));

export const isPublished = (it: Item) => Boolean(it.href && !it.wip);
export const totalPublished = all.filter(isPublished).length;
export const totalFree = all.filter((it) => isPublished(it) && !it.price).length;
export const totalUses = all.reduce((n, it) => n + (it.uses ?? 0), 0);
export const topByUses = all.filter((it) => it.uses).sort((a, b) => b.uses! - a.uses!);

// 72600 -> "72.6k"
export const compact = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);
