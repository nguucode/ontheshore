// Danh sách project xếp theo năm, mới nhất lên trên (sếp chốt 2026-11-23); cùng năm thì theo `order`, nhỏ lên trên.
// Năm lấy số 4 chữ số cuối trong `year` (vd "2020 — 2021" → 2021); không có số thì xuống cuối.
const lastYear = (y: string) => Number(y.match(/\d{4}/g)?.at(-1) ?? 0);
export const byYear = <E extends { data: { year: string; order: number } }>(a: E, b: E) =>
  lastYear(b.data.year) - lastYear(a.data.year) || a.data.order - b.data.order;
