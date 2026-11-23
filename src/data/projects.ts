// Thứ tự project do sếp xếp tay: theo `order` trong frontmatter, nhỏ lên trên.
export const byOrder = <E extends { data: { order: number } }>(a: E, b: E) => a.data.order - b.data.order;
