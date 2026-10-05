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
  cv?: string; // ghi đè mô tả trên CV PDF; "" = bỏ mô tả để vừa một trang
};

export const experience: Job[] = [
  {
    when: "2023 — 2026",
    role: "Senior Product Designer",
    company: "TMA Solutions",
    kind: { vi: "outsourcing phần mềm enterprise", en: "enterprise software outsourcing" },
    what: {
      vi: "Dẫn dắt product design cho nhiều dự án enterprise chạy song song trong fintech, healthcare, logistics. Cách làm system-first giữ chất lượng đồng đều giữa các dự án, thay vì mỗi dự án lại dựng lại từ đầu.",
      en: "Led product design across concurrent enterprise projects in fintech, healthcare and logistics. A system-first approach kept quality consistent from one engagement to the next instead of rebuilding each time.",
    },
  },
  {
    when: "2023",
    role: "Product Designer",
    company: "CyberLogitec",
    kind: { vi: "phần mềm logistics enterprise", en: "enterprise logistics software" },
    what: {
      vi: "Định hướng design trong product team, biến các workflow vận hành phức tạp thành giao diện riêng cho từng vai trò.",
      en: "Led design direction in the product team, turning dense operational workflows into role-specific interfaces.",
    },
  },
  {
    when: "2021 — 2023",
    role: "UI/UX Designer",
    company: "Aperia Solutions",
    kind: { vi: "CRM cho ngân hàng và fintech", en: "banking and fintech CRM" },
    what: {
      vi: "Phụ trách UX cho các trang sản phẩm và workflow chính, duy trì design system trong Figma, làm việc cùng PO và BA suốt quá trình delivery.",
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
      vi: "Thiết kế end-to-end, từ research, prototype tới handoff. Xây dựng và phụ trách design library lõi, làm việc trực tiếp với engineer để code khớp với thiết kế.",
      en: "Led end-to-end design from research and prototyping to handoff. Built and owned the core design library, working directly with engineers on implementation accuracy.",
    },
  },
  {
    when: "2019 — 2020",
    role: "UI/UX Designer",
    company: "Conceptual Studio",
    kind: { vi: "design studio", en: "design studio" },
    what: {
      vi: "E-commerce, mobile và web, từ UX flow tới visual. Làm UI kit và WordPress theme, dùng nội bộ và bán ra ngoài.",
      en: "E-commerce, mobile and web, from UX flows to visual design. Built UI kits and WordPress themes, used in-house and sold commercially.",
    },
    cv: "", // CV PDF bỏ mô tả để lấy chỗ cho Community and Products (sếp, 2026-10-05)
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

// Community and Products: ba nơi xem hết sản phẩm (sếp chọn 2026-10-05). Dùng chung cho CV PDF và trang About.
export const community = (uses: string): { name: string; what: Text; href: string }[] => [
  {
    name: "Figma",
    what: { vi: `Template miễn phí và một AI skill, ${uses} lượt dùng`, en: `Free templates and an AI skill, ${uses} uses` },
    href: "https://www.figma.com/@nguunguyen73",
  },
  {
    name: "Gumroad",
    what: { vi: "Kusabimaru, mockup thiết bị 3D cho web và Figma", en: "Kusabimaru, 3D device mockups for web and Figma" },
    href: "https://kafkawaves.gumroad.com/",
  },
  {
    name: "Website",
    what: { vi: "Tất cả sản phẩm, case study và UI kit Zweihänder", en: "All products, case studies and the Zweihänder UI kit" },
    href: "https://ontheshore.biz/",
  },
];

// Tóm tắt đầu CV, trang About dùng làm lede.
export const summary: Text = {
  vi: "7 năm thiết kế sản phẩm B2B phức tạp trong fintech, CRM ngân hàng, logistics enterprise và healthcare. Problem space được vẽ rõ trước khi vẽ màn hình, design system được coi là một sản phẩm, và công việc bám sát engineer, PM, PO, BA cho tới ngày release. Ngoài ra còn viết code front-end và tự làm design tool.",
  en: "7 years designing complex B2B products in fintech, banking CRM, enterprise logistics and healthcare. I map the problem space before drawing screens, treat the design system as a product, and stay with engineers, PMs, POs and BAs until release. I also write front-end code and build design tools.",
};
