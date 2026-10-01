/* Dữ liệu dùng chung cho trang About và CV PDF (/cv-print/). Sửa ở đây, cả hai đổi theo.
   Nguồn: LinkedIn của sếp (đọc 2026-10-01). Nêu tên công ty; số liệu và màn hình nội bộ không đưa lên.
   Sau khi sửa: chạy `npm run cv` để in lại public/nguu-nguyen-cv.pdf. */
type Text = { vi: string; en: string };

export type Job = {
  when: string;
  role: string;
  company: string;
  kind: Text;
  href?: string; // case study trong site
  what?: Text;
};

export const experience: Job[] = [
  {
    when: "2023 — 2026",
    role: "Senior Product Designer",
    company: "TMA Solutions",
    kind: { vi: "outsourcing phần mềm enterprise", en: "enterprise software outsourcing" },
    what: {
      vi: "Dẫn dắt product design cho nhiều dự án enterprise chạy song song trong fintech, healthcare và logistics. Cách làm system-first giữ chất lượng đồng đều giữa các dự án thay vì mỗi dự án tự dựng lại từ đầu.",
      en: "Led product design across concurrent enterprise projects in fintech, healthcare and logistics. A system-first approach kept quality consistent from one engagement to the next instead of rebuilding each time.",
    },
  },
  {
    when: "2023",
    role: "Product Designer",
    company: "CyberLogitec",
    kind: { vi: "phần mềm logistics enterprise", en: "enterprise logistics software" },
    what: {
      vi: "Định hướng design trong product team, biến các workflow vận hành dày đặc thành giao diện theo từng vai trò.",
      en: "Led design direction in the product team, turning dense operational workflows into role-specific interfaces.",
    },
  },
  {
    when: "2021 — 2023",
    role: "UI/UX Designer",
    company: "Aperia Solutions",
    kind: { vi: "CRM cho ngân hàng và fintech", en: "banking and fintech CRM" },
    what: {
      vi: "Phụ trách UX cho các trang sản phẩm và workflow chính, duy trì design system trong Figma, làm cùng PO và BA suốt quá trình delivery.",
      en: "Owned the UX across product pages and core workflows, maintained the design system in Figma, and worked with POs and BAs through delivery.",
    },
  },
  {
    when: "2020 — 2021",
    role: "Product Designer",
    company: "FireGroup Technology",
    kind: { vi: "TrueProfit, Shopify app về profit analytics", en: "TrueProfit, a Shopify profit analytics app" },
    href: "/projects/trueprofit/",
    what: {
      vi: "Thiết kế end-to-end từ research, prototype tới handoff. Dựng và làm chủ design library lõi, làm trực tiếp với engineer để bản code khớp thiết kế.",
      en: "Led end-to-end design from research and prototyping to handoff. Built and owned the core design library, working directly with engineers on implementation accuracy.",
    },
  },
  {
    when: "2019 — 2020",
    role: "UI/UX Designer",
    company: "Conceptual Studio",
    kind: { vi: "design studio", en: "design studio" },
    what: {
      vi: "Dự án e-commerce, mobile và web, làm cả UX flow lẫn visual. Dựng UI kit và WordPress theme dùng nội bộ và bán ra thị trường.",
      en: "E-commerce, mobile and web projects, covering UX flows and visual production. Built UI kits and WordPress themes used in-house and sold on the market.",
    },
  },
  {
    when: "2019",
    role: "UI/UX Design Intern",
    company: "Kyanon Digital",
    kind: { vi: "digital agency", en: "digital agency" },
  },
];

// Nhóm Design/Product lấy từ vault about-me và Top skills trên LinkedIn.
export const skills: { group: string; items: string[] }[] = [
  { group: "Design", items: ["Product design", "UX design", "Mobile and web UI", "Design systems and tokens"] },
  { group: "Product", items: ["Business analysis", "Product ownership", "Shape Up and agile delivery", "Lean principles"] },
  {
    group: "Engineering",
    items: ["Front-end engineering", "HTML/CSS", "React", "TypeScript", "TailwindCSS", "Git", "Accessibility", "AI-assisted workflows"],
  },
  { group: "Tools", items: ["Figma", "FigJam", "Storybook", "Miro", "Jira", "Confluence", "Notion", "Microsoft\u00a0365"] },
];
