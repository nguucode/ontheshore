/* Kiểm kê thật từ Figma Community @nguunguyen73, 19/09/2026.
   Số liệu đọc trực tiếp từ trang profile.
   Thêm mục mới: thêm object vào đúng mảng, không cần sửa gì khác.
   Mục chưa dùng được (chưa có href) hiện nhãn "Đang phát triển", không bấm được, không tính vào số đã publish.
   wip: có trang giới thiệu nhưng chưa dùng được: vẫn bấm được, vẫn hiện nhãn, không tính vào số đã publish.
   local: href là trang trong site này, cần gắn tiền tố /vi/ khi xem bản tiếng Việt. */
export type Item = {
  name: string;
  href?: string;
  local?: boolean;
  uses?: number;
  wip?: boolean;
  note: { vi: string; en: string };
};

const figmaTemplates: Item[] = [
  {
    name: "Circle Charts",
    href: "https://www.figma.com/community/file/1227645405724568768/circle-charts",
    uses: 72600,
    note: { vi: "Bộ circle chart dựng sẵn cho dashboard.", en: "Ready-made circle charts for dashboards." },
  },
  {
    name: "Basic Charts",
    href: "https://www.figma.com/community/file/1295304364849245693/basic-charts",
    uses: 18700,
    note: { vi: "Chart cơ bản: bar, line, area.", en: "The basics: bar, line, area." },
  },
  {
    name: "Polaris Chart",
    href: "https://www.figma.com/community/file/1235877373897536001/polaris-chart",
    uses: 12600,
    note: { vi: "Chart theo design system Polaris.", en: "Charts built on the Polaris design system." },
  },
  {
    name: "Country Flags",
    href: "https://www.figma.com/community/file/1360105018474702873/country-flags",
    uses: 104,
    note: { vi: "Bộ cờ quốc gia.", en: "Country flag set." },
  },
];

const figmaPlugins: Item[] = [];

const figmaSkills: Item[] = [
  {
    name: "flatten-icon-frames",
    href: "https://www.figma.com/community/skill/89555/flatten-icon-frames",
    note: {
      vi: "Xử lý icon frame hàng loạt: outline stroke, union, fill đen, flatten thành một vector. Chạy được batch 400.",
      en: "Batch-cleans icon frames: outline stroke, union, black fill, flatten to one vector. Handles 400 at a time.",
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
      vi: "Trình chiếu prototype Figma cho khách bằng một link: không cần tài khoản Figma, chuyển phone, tablet, desktop ngay trên trang, iPhone 3D xoay được.",
      en: "Show Figma prototypes to clients with one link: no Figma account, switch phone, tablet, desktop on the page, a rotatable 3D iPhone.",
    },
  },
  {
    name: "Moonveil Icons",
    href: "https://nguucode.github.io/moonveilicons/",
    wip: true,
    note: {
      vi: "Icon library SVG open source, hai style outline và solid. Dùng qua npm, React, Vue, Web Component, webfont, CDN và CLI. Đang phát triển.",
      en: "Open-source SVG icon library, outline and solid. Ships via npm, React, Vue, Web Component, webfont, CDN and CLI. In development.",
    },
  },
  {
    name: "Zweihänder",
    href: "/zweihander/",
    note: {
      vi: "UI kit cho React: CSS Modules trên một lớp design token sinh tự động, tài liệu trên Storybook. Giai đoạn đầu, mới có Button và Text Input.",
      en: "React UI kit: CSS Modules over a generated design-token layer, documented in Storybook. Early: Button and Text Input so far.",
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
export const totalUses = all.reduce((n, it) => n + (it.uses ?? 0), 0);
export const topByUses = all.filter((it) => it.uses).sort((a, b) => b.uses! - a.uses!);

// 72600 -> "72.6k"
export const compact = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);
