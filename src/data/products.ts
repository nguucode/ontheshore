/* Kiểm kê thật từ Figma Community @nguunguyen73, 19/09/2026.
   Số liệu đọc trực tiếp từ trang profile.
   Thêm mục mới: thêm object vào đúng mảng, không cần sửa gì khác.
   Mục chưa dùng được (chưa có href) hiện nhãn "Đang phát triển", không bấm được, không tính vào số đã publish.
   wip: có trang giới thiệu nhưng chưa dùng được: vẫn bấm được, vẫn hiện nhãn, không tính vào số đã publish.
   local: href là trang trong site này, cần gắn tiền tố /vi/ khi xem bản tiếng Việt.
   price: sản phẩm trả phí, hiện thay số lượt dùng, không tính vào số miễn phí.
   kind: nhãn riêng cho mục chạy trên nhiều nền tảng (vd. Kusabimaru: web + plugin Figma).
   thumb: ảnh ở khung Featured trên trang chủ (mục nhiều lượt dùng nhất và app trả phí). */
import type { ImageMetadata } from "astro";
import circleCharts from "../assets/products/circle-charts.png";
import basicCharts from "../assets/products/basic-charts.png";
import polarisChart from "../assets/products/polaris-chart.png";
import kusabimaru from "../assets/products/kusabimaru/macbook.png";

export type Item = {
  name: string;
  thumb?: ImageMetadata; // ảnh cover tải từ trang Figma Community (og:image)
  href?: string;
  local?: boolean;
  uses?: number;
  wip?: boolean;
  price?: string;
  kind?: string; // ghi đè nhãn nhóm trên từng dòng
  note: { vi: string; en: string };
};

const figmaTemplates: Item[] = [
  {
    name: "Circle Charts",
    href: "https://www.figma.com/community/file/1227645405724568768/circle-charts",
   thumb: circleCharts,
    uses: 72600,
    note: { vi: "Circle chart dựng sẵn cho dashboard. Template được dùng nhiều nhất.", en: "Ready-made circle charts for dashboards. My most-used template." },
  },
  {
    name: "Basic Charts",
    href: "https://www.figma.com/community/file/1295304364849245693/basic-charts",
   thumb: basicCharts,
    uses: 18700,
    note: { vi: "Bar, line và area chart cho dashboard thông dụng.", en: "Bar, line and area charts for everyday dashboards." },
  },
  {
    name: "Polaris Chart",
    href: "https://www.figma.com/community/file/1235877373897536001/polaris-chart",
   thumb: polarisChart,
    uses: 12600,
    note: { vi: "Chart theo design system Polaris của Shopify, khớp với các component có sẵn.", en: "Charts built on Shopify's Polaris design system, consistent with its components." },
  },
  {
    name: "Country Flags",
    href: "https://www.figma.com/community/file/1360105018474702873/country-flags",
    uses: 104,
    note: { vi: "Bộ cờ các quốc gia cho Figma.", en: "A set of country flags for Figma." },
  },
];

const figmaSkills: Item[] = [
  {
    name: "flatten-icon-frames",
    href: "https://www.figma.com/community/skill/89555/flatten-icon-frames",
    note: {
      vi: "Xử lý icon frame hàng loạt: outline stroke, union, fill đen, flatten thành một vector. Tối đa 400 icon mỗi lượt.",
      en: "Batch-cleans icon frames: outline stroke, union, black fill, flatten to one vector. Up to 400 icons per run.",
    },
  },
];

const apps: Item[] = [
  {
    name: "Kusabimaru",
    thumb: kusabimaru,
    href: "/products/kusabimaru/",
    local: true,
    price: "$20",
    kind: "Web + Figma plugin",
    note: {
      vi: "Web app và plugin Figma. Đặt ảnh chụp màn hình hoặc frame vào thiết bị 3D thật, xoay tới góc ưng ý, xuất PNG nền trong suốt. Web app dùng được ngay, plugin đang chờ Figma duyệt. 50 lượt đầu miễn phí.",
      en: "A web app and a Figma plugin. Put a screenshot or a frame on a real 3D device, turn it to any angle, export a transparent PNG. The web app is live; the plugin is in Figma review. The first 50 exports are free.",
    },
  },
  {
    name: "Blasphemous",
    href: "/products/blasphemous/",
    local: true,
    wip: true,
    note: {
      vi: "Trình chiếu prototype Figma cho khách bằng một link: không cần tài khoản Figma, chuyển phone, tablet, desktop ngay trên trang, iPhone 3D xoay được. Khách chỉ thấy sản phẩm, không thấy giao diện Figma.",
      en: "Show Figma prototypes to clients with one link: no Figma account, switch phone, tablet, desktop on the page, a rotatable 3D iPhone. Clients see the product, not the Figma interface.",
    },
  },
];

const uiKits: Item[] = [
  {
    name: "Zweihänder",
    href: "/zweihander/",
    note: {
      vi: "UI kit cho React: CSS Modules trên một lớp design token sinh tự động, tài liệu trên Storybook. Hiện đã có Button và Text Input.",
      en: "React UI kit: CSS Modules over a generated design-token layer, documented in Storybook. Button and Text Input are ready so far.",
    },
  },
];

export const groups = [
  { kind: "App", heading: { vi: "Apps", en: "Apps" }, items: apps },
  { kind: "Figma", heading: { vi: "Figma — Templates", en: "Figma — Templates" }, items: figmaTemplates },
  { kind: "Skill", heading: { vi: "Figma — AI Skills", en: "Figma — AI Skills" }, items: figmaSkills },
  { kind: "Kit", heading: { vi: "UI Kits", en: "UI Kits" }, items: uiKits },
];

export const all = groups.flatMap((g) => g.items.map((it) => ({ ...it, kind: it.kind ?? g.kind })));

export const isPublished = (it: Item) => Boolean(it.href && !it.wip);
export const totalPublished = all.filter(isPublished).length;
export const totalFree = all.filter((it) => isPublished(it) && !it.price).length;
export const totalPaid = all.filter((it) => isPublished(it) && it.price).length;
export const totalUses = all.reduce((n, it) => n + (it.uses ?? 0), 0);
export const topByUses = all.filter((it) => it.uses).sort((a, b) => b.uses! - a.uses!);

// 72600 -> "72.6k"
export const compact = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);
