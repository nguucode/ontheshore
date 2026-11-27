/* Kiểm kê thật từ Figma Community @nguunguyen73, 23/11/2026.
   Số liệu đọc trực tiếp từ trang profile.
   Thêm mục mới: thêm object vào đúng mảng, không cần sửa gì khác.
   Mục chưa dùng được (chưa có href) hiện nhãn "Đang phát triển", không bấm được, không tính vào số đã publish.
   wip: có trang giới thiệu nhưng chưa dùng được: vẫn bấm được, vẫn hiện nhãn, không tính vào số đã publish.
   local: href là trang trong site này, cần gắn tiền tố /vi/ khi xem bản tiếng Việt.
   price: sản phẩm trả phí, hiện thay số lượt dùng, không tính vào số miễn phí.
   kind: nhãn riêng cho mục chạy trên nhiều nền tảng (vd. Kusabimaru: web + plugin Figma).
   thumb: ảnh ở khung Featured trên trang chủ và ảnh preview khi hover dòng ở trang Products; không có thì hiện placeholder. */
import type { ImageMetadata } from "astro";
import circleCharts from "../assets/products/circle-charts.png";
import basicCharts from "../assets/products/basic-charts.png";
import polarisChart from "../assets/products/polaris-chart.png";
import kusabimaru from "../assets/products/kusabimaru/macbook.png";
import shoreshot from "../assets/products/shoreshot.jpg";

export type Item = {
  name: string;
  thumb?: ImageMetadata; // ảnh cover tải từ trang Figma Community (og:image)
  href?: string;
  local?: boolean;
  uses?: number;
  wip?: boolean;
  price?: string;
  free?: boolean; // hiện nhãn "Free" thay cho "—"
  kind?: string; // ghi đè nhãn nhóm trên từng dòng
  note: { vi: string; en: string };
};

const figmaTemplates: Item[] = [
  {
    name: "Circle Charts",
    href: "https://www.figma.com/community/file/1227645405724568768/circle-charts",
   thumb: circleCharts,
    uses: 73900,
    note: {
      vi: "Circle chart dựng sẵn cho dashboard. Mỗi chart giữ đúng tỉ lệ tròn 1:1 khi frame Auto Layout co giãn, nên đặt thẳng vào layout responsive mà không phải chỉnh lại.",
      en: "Ready-made circle charts for dashboards. Each chart stays a true 1:1 circle while its Auto Layout frame resizes, so it drops into a responsive layout as is.",
    },
  },
  {
    name: "Basic Charts",
    href: "https://www.figma.com/community/file/1295304364849245693/basic-charts",
   thumb: basicCharts,
    uses: 19000,
    note: {
      vi: "Bar, column, stacked, line và circle chart cho dashboard thông dụng: hơn 150 variant, tất cả dựng bằng Auto Layout, có đủ light và dark theme.",
      en: "Bar, column, stacked, line and circle charts for everyday dashboards: more than 150 variants, all built on Auto Layout, in light and dark themes.",
    },
  },
  {
    name: "Polaris Chart",
    href: "https://www.figma.com/community/file/1235877373897536001/polaris-chart",
   thumb: polarisChart,
    uses: 12700,
    note: {
      vi: "Các chart component của Shopify Admin, dựng lại cho Figma theo design system Polaris. Variant bám theo các cấu hình của Polaris Viz, thư viện chart React của Shopify.",
      en: "The chart components of the Shopify Admin, rebuilt for Figma on the Polaris design system. Variants mirror the options of Polaris Viz, Shopify's React chart library.",
    },
  },
  {
    name: "Country Flags",
    href: "https://www.figma.com/community/file/1360105018474702873/country-flags",
    uses: 105,
    note: {
      vi: "Hơn 250 lá cờ quốc gia vẽ giản lược cho Figma, mỗi lá gắn tên và mã theo ISO 3166, sẵn sàng publish thành team library hoặc dùng làm local component.",
      en: "More than 250 simplified country flags for Figma, each labelled with its ISO 3166 name and code, ready to publish as a team library or use as local components.",
    },
  },
  {
    name: "Marram Design System",
    href: "https://www.figma.com/community/file/1703248516247985173/marram-design-system",
    uses: 3,
    note: {
      vi: "Phần Figma của design system Marram: 70 component và 11 foundation trên một lớp token lấy code làm gốc, mỗi trang component đều có specs và guidelines.",
      en: "The Figma side of the Marram design system: 70 components and 11 foundations on one layer of code-first tokens, with specs and guidelines on every component page.",
    },
  },
];

const apps: Item[] = [
  {
    name: "Marram",
    href: "https://marram.ontheshore.biz",
    kind: "React UI kit",
    note: {
      vi: "UI kit React cho SaaS doanh nghiệp: CSS Modules trên một lớp design token sinh tự động từ code, tài liệu trên Storybook. Hiện đã có Button và Text Input.",
      en: "A React UI kit for enterprise SaaS: CSS Modules over a design-token layer generated from code, documented in Storybook. Button and Text Input are ready so far.",
    },
  },
  {
    name: "Kusabimaru",
    thumb: kusabimaru,
    href: "https://kusabimaru.ontheshore.biz",
    price: "$20",
    kind: "Web + Figma plugin",
    note: {
      vi: "Web app và plugin Figma: đặt ảnh chụp màn hình hoặc frame vào thiết bị 3D thật, xoay tới góc ưng ý rồi xuất PNG nền trong suốt. 50 lượt xuất đầu miễn phí.",
      en: "A web app and a Figma plugin: put a screenshot or a frame on a real 3D device, turn it to any angle and export a transparent PNG. The first 50 exports are free.",
    },
  },
  {
    name: "ShoreShot",
    thumb: shoreshot,
    href: "https://shoreshot.ontheshore.biz",
    kind: "macOS + Windows",
    free: true,
    note: {
      vi: "App chụp màn hình và chú thích, mã nguồn mở: chụp một vùng, một cửa sổ hoặc cả màn hình, vẽ khung, chữ, bút, rồi copy hoặc dán thẳng vào app đang dùng.",
      en: "An open-source screenshot and annotation app: capture an area, a window or the full screen, mark it up, then copy it or paste it straight into the app you were using.",
    },
  },
  // VietHoaGameXua luôn nằm cuối Apps: thêm app mới phía trên mục này.
  {
    name: "VietHoaGameXua",
    href: "https://game.ontheshore.biz",
    kind: "Windows",
    free: true,
    note: {
      vi: "Bản Việt hóa game Steam dịch bằng AI theo văn phong và bảng thuật ngữ riêng của từng game. Mỗi game có bộ cài Windows riêng, sao lưu file gốc, gỡ ra là khôi phục.",
      en: "Vietnamese translations of Steam games, made with AI from a style guide and a glossary for each game. Each game has its own Windows installer that backs up the originals.",
    },
  },
];

export const groups = [
  { kind: "App", heading: { vi: "Apps", en: "Apps" }, items: apps },
  { kind: "Figma", heading: { vi: "Figma — Templates", en: "Figma — Templates" }, items: figmaTemplates },
];

export const all = groups.flatMap((g) => g.items.map((it) => ({ ...it, kind: it.kind ?? g.kind })));

// note 140–170 ký tự để dòng trong danh sách luôn đủ 3 dòng chữ ở desktop; lệch thì build hỏng.
for (const it of all)
  for (const [lang, s] of Object.entries(it.note)) {
    const n = [...s].length;
    if (n < 140 || n > 170) throw new Error(`Product "${it.name}" (${lang}): note ${n} ký tự, cần 140–170.`);
  }

export const isPublished = (it: Item) => Boolean(it.href && !it.wip);
export const totalPublished = all.filter(isPublished).length;
export const totalFree = all.filter((it) => isPublished(it) && !it.price).length;
export const totalPaid = all.filter((it) => isPublished(it) && it.price).length;
export const totalUses = all.reduce((n, it) => n + (it.uses ?? 0), 0);
export const topByUses = all.filter((it) => it.uses).sort((a, b) => b.uses! - a.uses!);

// 72600 -> "72.6k"
export const compact = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);
