// Thứ tự project: năm mới nhất lên trên (lấy năm cuối trong chuỗi, vd "2020 — 2021" → 2021),
// không có năm ("—") xuống cuối; cùng năm thì theo `order`.
const lastYear = (year: string) => Math.max(-1, ...(year.match(/\d{4}/g) ?? []).map(Number));

export const byYear = <E extends { data: { year: string; order: number } }>(a: E, b: E) =>
  lastYear(b.data.year) - lastYear(a.data.year) || a.data.order - b.data.order;
