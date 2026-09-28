// Tiếng Anh ở gốc (/) là bản chính, tiếng Việt ở /vi/. Nội dung markdown nằm trong content/<collection>/<lang>/.

export type Lang = "vi" | "en";

// getStaticPaths của mọi trang: lang undefined = gốc (en).
// Phải trả mảng mới mỗi lần: Astro gắn map tra cứu thẳng vào mảng trả về, dùng chung một mảng thì các route ghi đè nhau.
export const langPaths = () => [{ params: { lang: undefined } }, { params: { lang: "vi" } }];

export const getLang = (param?: string): Lang => (param === "vi" ? "vi" : "en");

export const url = (lang: Lang, path: string) => (lang === "vi" ? `/vi${path}` : path);

// Chọn chuỗi theo ngôn ngữ: T(lang)("Tiếng Việt", "English").
export const T = (lang: Lang) => (vi: string, en: string) => (lang === "en" ? en : vi);

// Lọc entry theo thư mục ngôn ngữ, trả slug không kèm tiền tố "en/".
export const byLang = <E extends { id: string }>(entries: E[], lang: Lang) =>
  entries
    .filter((e) => e.id.startsWith(`${lang}/`))
    .map((e) => ({ ...e, slug: e.id.slice(lang.length + 1) }));
