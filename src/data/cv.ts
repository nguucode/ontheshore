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
  cv?: string; // bản trung tính cho CV PDF; trang About dùng `what` (giọng Elden Ring)
};

export const experience: Job[] = [
  {
    when: "2023 — 2026",
    role: "Senior Product Designer",
    company: "TMA Solutions",
    kind: { vi: "outsourcing phần mềm enterprise", en: "enterprise software outsourcing" },
    what: {
      vi: "Dẫn dắt product design cho nhiều dự án enterprise chạy song song trong fintech, healthcare, logistics. Cách làm system-first giữ chất lượng đồng đều qua từng dự án. Không dự án nào phải dựng lại từ đầu.",
      en: "Led product design across concurrent enterprise projects in fintech, healthcare and logistics. A system-first approach kept quality even from one engagement to the next. None had to be rebuilt from nothing.",
    },
    cv: "Led product design across concurrent enterprise projects in fintech, healthcare and logistics. A system-first approach kept quality consistent from one engagement to the next instead of rebuilding each time.",
  },
  {
    when: "2023",
    role: "Product Designer",
    company: "CyberLogitec",
    kind: { vi: "phần mềm logistics enterprise", en: "enterprise logistics software" },
    what: {
      vi: "Định hướng design trong product team. Những workflow vận hành dày đặc được nắn lại thành giao diện riêng cho từng vai trò.",
      en: "Set design direction within the product team. Dense operational workflows, reshaped into an interface for each role.",
    },
    cv: "Led design direction in the product team, turning dense operational workflows into role-specific interfaces.",
  },
  {
    when: "2021 — 2023",
    role: "UI/UX Designer",
    company: "Aperia Solutions",
    kind: { vi: "CRM cho ngân hàng và fintech", en: "banking and fintech CRM" },
    what: {
      vi: "Phụ trách UX cho các trang sản phẩm và workflow chính. Gìn giữ design system trong Figma, đi cùng PO và BA suốt quá trình delivery.",
      en: "Owned the UX across product pages and core workflows. Kept the design system in Figma, and stood with POs and BAs through delivery.",
    },
    cv: "Owned the UX across product pages and core workflows, maintained the design system in Figma, and worked with POs and BAs through delivery.",
  },
  {
    when: "2020 — 2021",
    role: "Product Designer",
    company: "FireGroup Technology",
    kind: { vi: "TrueProfit, Shopify app về profit analytics", en: "TrueProfit, a Shopify profit analytics app" },
    href: "/projects/trueprofit/",
    what: {
      vi: "Thiết kế end-to-end, từ research, prototype tới handoff. Dựng nên design library lõi và giữ gìn nó, làm sát bên engineer cho tới khi code khớp với thiết kế.",
      en: "Led end-to-end design, from research and prototyping to handoff. Built the core design library and kept it, working beside engineers until the code matched the design.",
    },
    cv: "Led end-to-end design from research and prototyping to handoff. Built and owned the core design library, working directly with engineers on implementation accuracy.",
  },
  {
    when: "2019 — 2020",
    role: "UI/UX Designer",
    company: "Conceptual Studio",
    kind: { vi: "design studio", en: "design studio" },
    what: {
      vi: "E-commerce, mobile và web, từ UX flow tới visual. UI kit và WordPress theme ra đời ở đây, dùng nội bộ và được bán ra ngoài.",
      en: "E-commerce, mobile and web, from UX flows to visual production. UI kits and WordPress themes were made here, used in-house and sold beyond its walls.",
    },
    cv: "E-commerce, mobile and web projects, covering UX flows and visual production. Built UI kits and WordPress themes used in-house and sold on the market.",
  },
  {
    when: "2019",
    role: "UI/UX Design Intern",
    company: "Kyanon Digital",
    kind: { vi: "digital agency", en: "digital agency" },
  },
];

// Domains và Designed: sếp cung cấp 2026-10-02. Nhóm Design/Product lấy từ vault about-me và Top skills trên LinkedIn.
export const skills: { group: string; items: string[] }[] = [
  {
    group: "Domains",
    items: ["Fintech", "Banking", "Real estate", "ERP", "SaaS", "System", "Social", "E-commerce", "Healthcare", "Accounting", "IoT", "Logistics"],
  },
  { group: "Designed", items: ["Design resources", "Design systems", "Mobile apps", "Domain systems", "Landing pages"] },
  { group: "Design", items: ["Product design", "UX design", "Mobile and web UI", "Design systems and tokens"] },
  { group: "Product", items: ["Business analysis", "Product ownership", "Agile/Scrum", "Shape Up", "Wayfinder", "Lean principles"] },
  {
    group: "Engineering",
    items: ["Front-end engineering", "HTML/CSS", "React", "TypeScript", "TailwindCSS", "Git", "Accessibility", "AI-assisted workflows"],
  },
  { group: "Tools", items: ["Figma", "FigJam", "Storybook", "Miro", "Jira", "Confluence", "Notion", "Microsoft\u00a0365"] },
];
