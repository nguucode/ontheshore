---
title: "Theming và mode"
date: 2026-03-03
summary: "Theming là đổi giá trị token mà không đụng tới component. Mode khác theme thế nào, CSS nào làm việc này chạy được, và cái bẫy của theme lồng nhau."
---

Phần 9/15 của series *Design system từ nền móng*.

Theming là đổi giá trị token mà không đổi component. Đây là phần thưởng lớn nhất của cấu trúc token ba tầng. Hai chữ hay bị lẫn ở đây: **mode** là một trục với vài giá trị cố định (light hoặc dark, compact hoặc comfortable), còn **theme** là một bộ lựa chọn trên nhiều trục (màu nhấn xanh, bo góc lớn, chữ to hơn một chút). Trên web, theming chạy bằng CSS custom properties, vốn kế thừa theo cây DOM. Trong Figma, cùng ý tưởng đó gọi là variable modes.

## Mode và theme

| | Mode | Theme |
|---|---|---|
| Là gì | Một trục, vài giá trị định sẵn | Tổ hợp lựa chọn trên nhiều trục |
| Ví dụ | Light hoặc dark; compact hoặc comfortable; high contrast | "Brand A": màu nhấn xanh, xám lạnh, bo góc vừa, scaling 100% |
| Ai chọn | Thường là người dùng cuối, qua cài đặt hệ điều hành hoặc nút bật/tắt | Thường là sản phẩm dùng hệ |

Một theme thường hỗ trợ nhiều mode: brand A có cả light và dark.

## Các trục theming: ví dụ Radix Themes

Radix Themes thể hiện rõ cách theming theo trục. Component `<Theme>` của nó nhận:

| Trục | Prop và giá trị | Đổi gì |
|---|---|---|
| Appearance | `appearance`: `light`, `dark`, `inherit` | Light hoặc dark |
| Accent | `accentColor`: một trong các hue | Màu chính |
| Neutral | `grayColor`: xám ấm, lạnh hoặc trung tính | Nền, chữ, viền |
| Shape | `radius`: từ `none` tới `full` | Bo góc |
| Density | `scaling`: từ `90%` tới `110%` | Kích thước và khoảng cách |

```tsx
<Theme
  appearance="dark"
  accentColor="violet"
  radius="large"
  scaling="95%"
>
  <App />
</Theme>
```

Mỗi trục độc lập, tổ hợp tự do, và mỗi trục chỉ cần đổi một hoặc vài token gốc:

- `scaling` đổi một hệ số, và mọi token spacing, cỡ chữ, chiều cao control đều nhân với nó.
- `radius` đổi một hệ số, cả thang radius suy ra từ đó, như bài [Spacing, sizing và layout](/vi/articles/ds-06-spacing-sizing-layout/) mô tả.

Bài học thiết kế: **hệ dễ theme khi token được suy ra từ ít giá trị gốc.** Nếu 40 token kích thước đều là số cứng, đổi density là sửa 40 chỗ.

## CSS custom properties: cơ chế bên dưới

Custom property (`--ten: giatri`) có ba tính chất giúp theming khả thi:

1. **Kế thừa.** Đặt `--primary` trên một `<div>` thì mọi phần tử con đọc `var(--primary)` nhận giá trị đó.
2. **Cascade.** Giá trị gần nhất thắng. Đặt ở `:root` là mặc định cho cả trang; đặt ở một vùng là ghi đè cho vùng đó.
3. **Tính lúc chạy.** Trình duyệt thay giá trị khi render. Không cần build lại CSS.

Vì vậy một component `Theme` có thể chỉ là một `<div>` đặt vài custom property hoặc một data attribute. Không sinh thêm CSS mới.

Cách đơn giản nhất cho light và dark:

```css
:root {
  --background: oklch(98% 0 0);
  --foreground: oklch(15% 0 0);
}
.dark {
  --background: oklch(15% 0 0);
  --foreground: oklch(98% 0 0);
}
```

### Trường hợp khó: theme lồng nhau

Giả sử cần một vùng sáng nằm trong trang tối, ví dụ khung xem trước. Cách ngây thơ là viết CSS component kiểu `.dark .card { ... }`. Selector con cháu khớp với bất kỳ tổ tiên `.dark` nào, nên vùng sáng bên trong vẫn nhận style tối.

Ba cách giải, từ đơn giản tới nâng cao:

1. **Mọi giá trị nằm ở tầng token, không bao giờ trong selector của component.** Vùng `.light` nằm trong `.dark` chỉ cần đặt lại token, và component đọc `var()` sẽ lấy giá trị gần nhất. Đây nên là cách mặc định.
2. **Hàm `light-dark()` của CSS.** `--background: light-dark(white, black);` kết hợp với `color-scheme: light` hoặc `dark` trên từng vùng. Gọn, nhưng chỉ dùng được cho giá trị màu.
3. **"Space toggle".** Một custom property đóng vai công tắc. Giá trị `initial` làm biến không hợp lệ, nên `var(--x, fallback)` trả về fallback; giá trị rỗng thì hợp lệ và trả về rỗng. Đặt `--is-light: initial` ở vùng sáng và giá trị rỗng ở vùng tối, rồi viết `var(--is-light, giá-trị-sáng)` thì vế đó chỉ bật trong vùng sáng. Vì công tắc kế thừa, vùng gần nhất thắng ở mọi độ sâu. Mạnh nhưng khó đọc; nếu dùng, ghi chú lý do ngay cạnh code.

Điều cần giữ lại không phải kỹ thuật mà là yêu cầu: theme phải chạy đúng khi lồng nhau. Test riêng trường hợp này.

## Dark mode: tôn trọng người dùng

- Mặc định theo cài đặt hệ điều hành (`prefers-color-scheme`).
- Cho người dùng ghi đè, và nhớ lựa chọn của họ.
- Đặt `color-scheme: light dark` (hoặc theo mode hiện tại) để thanh cuộn và control mặc định của trình duyệt cũng đổi theo.
- Kiểm tra contrast riêng cho dark. Cặp màu đạt ở light không tự động đạt ở dark.

Một ranh giới hợp lý cho thư viện: hệ lo **giá trị** (token cho light và dark, class hoặc prop để bật), sản phẩm lo **chính sách** (khi nào bật, lưu lựa chọn ở đâu).

Như bài [Màu sắc trong design system](/vi/articles/ds-04-color/) đã nói, dark mode không phải đảo màu. Nền tránh đen tuyền, màu rực được làm dịu, bóng đổ đậm hơn, viền dùng độ trong suốt.

## Density

Density là độ dày đặc của giao diện. Bảng dữ liệu cho chuyên viên phân tích cần dày; app cho người lớn tuổi cần thoáng. Material 3 dùng thang density âm (0, -1, -2, -3), mỗi bậc giảm chiều cao component. Radix Themes dùng `scaling` theo phần trăm, phóng to hay thu nhỏ chữ, khoảng cách và kích thước cùng lúc, giữ nguyên tỉ lệ.

Cẩn thận: density thấp có thể kéo vùng bấm xuống dưới 24px. Kiểm tra tier nhỏ nhất ở mức density thấp nhất.

## Multi-brand

Khi một hệ phục vụ nhiều brand, ví dụ một tập đoàn có nhiều sản phẩm:

- Token **primitive** có thể khác hẳn giữa các brand, mỗi brand một bảng màu.
- Token **semantic** giữ cùng tên ở mọi brand. Đó là hợp đồng: component chỉ biết `--primary`, không biết brand.
- Token **component** và bản thân component không đổi.

Nói cách khác, multi-brand là thêm một mode nữa, nằm ở bước từ primitive sang semantic.

## Figma variable modes

Figma variables có **mode**: một collection chứa nhiều bộ giá trị, mỗi mode một bộ. Gắn variable vào thiết kế một lần, đổi mode là thiết kế đổi theo, không phải nhân đôi frame. Ví dụ chính Figma đưa ra là light, dark và high contrast cho màu, mobile và desktop cho khoảng cách. Số mode tối đa mỗi collection tùy gói Figma.

Nguyên tắc: **mode trong Figma khớp đúng trục theming trong code.** Nếu code có năm mức radius, collection Radius trong Figma có đúng năm mode cùng tên. Designer chọn mode "large" là thấy đúng thứ `radius="large"` tạo ra trong code.

## Lỗi hay gặp

- **Viết dark mode bằng `.dark .button { ... }` cho từng component.** Theming thuộc tầng token; component không nên biết mình đang ở mode nào.
- **Token suy ra bị đóng băng.** Nếu `--space-4: calc(1rem * var(--scaling))` khai báo trên `:root`, nó được tính tại `:root`. Một vùng bên dưới đặt `--scaling` khác sẽ không làm `--space-4` đổi theo. Khai báo token suy ra ở chỗ đặt theme, hoặc trên mọi phần tử.
- **Quá nhiều trục theming.** Mỗi trục nhân số tổ hợp phải test. Chỉ mở trục khi có nhu cầu thật.

## Nguồn

- [Radix Themes, Theme](https://www.radix-ui.com/themes/docs/components/theme)
- [MDN, Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [MDN, light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
- [MDN, prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [MDN, color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)
- [Figma Help, Modes for variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables)
- [Material Design 3, Density](https://m3.material.io/foundations/layout/grids-spacing/density)

← Bài trước: [Accessibility trong design system](/vi/articles/ds-08-accessibility/) · Bài sau: [Nối design và code](/vi/articles/ds-10-design-and-code/) →
