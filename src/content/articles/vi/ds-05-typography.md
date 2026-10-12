---
title: "Typography: type scale đặt tên theo vai"
date: 2026-01-06
summary: "Typography trong design system là một danh sách vai ngắn, mỗi vai chốt sẵn cỡ chữ, line-height và độ đậm, đặt tên theo việc nó làm chứ không theo kích thước."
---

Phần 5/15 của series *Design system từ nền móng*.

Typography trong design system là một danh sách vai có hạn: headline, body, label và vài vai nữa. Mỗi vai chốt trước cỡ chữ, line-height và độ đậm, nên không ai phải chọn số cho từng màn hình.

Ba luật gánh phần lớn công việc:

- Đặt tên token theo vai, không theo cỡ: `text-body`, không phải `text-14`.
- Viết line-height dạng tỉ lệ, ví dụ 1.5, để chữ to lên thì khoảng cách dòng cũng giãn theo.
- Đặt cỡ chữ bằng `rem`, để giao diện đi theo cài đặt cỡ chữ trong trình duyệt của người đọc.

## Type scale là gì

Type scale là tập cỡ chữ mà hệ cho phép dùng. Giống một tiệm áo chỉ bán size S, M, L, XL thay vì may đo từng milimet: ít lựa chọn hơn, nhưng nhất quán hơn nhiều.

Có hai cách dựng:

| Cách | Cách làm | Ưu | Nhược |
|---|---|---|---|
| Tỉ lệ toán học | Mỗi bậc nhân bậc trước với một hệ số cố định, ví dụ 1.25 ("major third") | Nhịp đều, có lý do rõ | Ra số lẻ như 15.63px, bậc lớn nhảy quá xa |
| Chọn tay theo lưới | Cỡ số tròn, thường là bội của 2 hoặc 4 | Số gọn, khớp lưới 4px | Bậc nào cũng cần lý do riêng |

Phần lớn hệ cho sản phẩm, gồm Material 3, Carbon, Polaris và Atlassian, chọn tay. Giao diện sản phẩm cần nhiều cỡ nhỏ đứng sát nhau (12, 14, 16) hơn là các cỡ tiêu đề cách xa nhau.

## Đặt theo vai: ví dụ Material 3

Material 3 chia typography thành năm vai, mỗi vai ba cỡ: large, medium, small. Type scale mặc định, ghi theo cỡ chữ / line-height, đơn vị px:

| Vai | Large | Medium | Small | Dùng cho |
|---|---|---|---|---|
| Display | 57 / 64 | 45 / 52 | 36 / 44 | Chữ hoặc số rất lớn, ngắn |
| Headline | 32 / 40 | 28 / 36 | 24 / 32 | Tiêu đề chính của trang hoặc một vùng |
| Title | 22 / 28 | 16 / 24 | 14 / 20 | Tiêu đề nhỏ: card, dialog, list |
| Body | 16 / 24 | 14 / 20 | 12 / 16 | Đoạn văn, nội dung chính |
| Label | 14 / 20 | 12 / 16 | 11 / 16 | Chữ trong component: nút, tab, chip |

Bảng này dạy ba điều:

1. **Mọi line-height đều là bội của 4.** Chữ nằm trên cùng lưới 4px với mọi thứ khác, xem bài [Spacing, sizing và layout](/vi/articles/ds-06-spacing-sizing-layout/).
2. **Body có ba cỡ.** Body medium 14px hợp với màn hình sản phẩm dày thông tin như bảng, form, dashboard. Body large 16px hợp với trang đọc dài.
3. **Label tách riêng khỏi Body,** kể cả khi cỡ trùng nhau. Hai vai khác nhau: label thường đậm hơn, và có thể đổi mà không đụng tới chữ trong đoạn văn.

Đặt theo vai có lợi ngay lần sửa đầu tiên. Nếu chữ body đổi từ 14px lên 15px, chỉ một token thay đổi: `text-body`. Với token tên `text-14`, ai đó phải tìm từng chỗ dùng rồi quyết định chỗ nào là body. Và một token tên `text-14` mà giá trị là 15px thì đang nói dối.

## Line-height: tỉ lệ, chặt cho tiêu đề, thoáng cho đoạn văn

Viết line-height dạng tỉ lệ thay vì px:

```css
--text-body: 0.875rem;          /* 14px */
--leading-body: calc(20 / 14);  /* "chữ 14, dòng 20", khoảng 1.43 */
```

Viết thành phép chia giữ lại ý định ("chữ 14, dòng 20"), còn kết quả vẫn là tỉ lệ nên dòng giãn theo chữ.

- **Tiêu đề**: line-height thấp, 1.1 tới 1.25. Chữ lớn, dòng ngắn, khoảng trống rộng trông rời rạc.
- **Đoạn văn**: line-height cao, 1.4 tới 1.6. Mắt cần chỗ để tìm đầu dòng tiếp theo.

Tiêu chí 1.4.12 Text Spacing (cấp AA) của WCAG 2.2 không bắt dùng line-height cụ thể nào. Nó yêu cầu giao diện không vỡ khi người đọc tự đặt line-height 1.5, khoảng cách đoạn bằng 2 lần cỡ chữ, letter-spacing 0.12 lần và word-spacing 0.16 lần. Với design system, điều đó có nghĩa là không đặt chiều cao cố định cho khối chứa chữ; để nó tự giãn.

## Font stack

Font stack là danh sách font dự phòng. Có hai hướng.

**System font**, dùng font sẵn có của hệ điều hành:

```css
--font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
```

Không cần tải gì, chữ hiện ngay, trông tự nhiên trên từng nền tảng. Đổi lại, mỗi máy hiển thị một font hơi khác, kích thước thực lệch vài pixel.

**Brand font**, như Inter, Roboto hay font riêng, trông giống nhau ở mọi nơi. Nhưng phải tải về, và hệ cần tính trước cách hiển thị trong lúc font chưa tới.

Dù chọn hướng nào, hãy tách token font theo vai, ví dụ `--font-heading` và `--font-body`, kể cả khi ban đầu cả hai trỏ về cùng một font. Chỗ tách đó là điểm cắm: theme nào muốn tiêu đề dùng serif thì chỉ đổi một token.

### Lưu ý cho tiếng Việt

- Chữ có dấu chồng (ẫ, ặ, ỗ) cao hơn chữ Latin thường. Line-height chặt, dưới khoảng 1.2, khiến dấu của dòng dưới chạm chân chữ dòng trên. Mỗi lần chỉnh scale, hãy thử tiêu đề tiếng Việt.
- Kiểm tra font có đủ glyph tiếng Việt, ví dụ subset `vietnamese` trên Google Fonts. Thiếu glyph thì trình duyệt mượn dấu từ font khác, và dấu sẽ lệch.

## rem, px và cỡ chữ của người đọc

- **px** cố định. Người đọc đặt cỡ chữ mặc định lớn hơn trong trình duyệt thì chữ px vẫn đứng yên.
- **rem** tính theo cỡ chữ gốc, mặc định 16px. Người đọc đặt 20px thì `1rem` thành 20px.

Cỡ chữ nên dùng rem vì rem tôn trọng cài đặt của người đọc. WCAG 1.4.4 Resize Text (cấp AA) yêu cầu chữ phóng tới 200% mà không mất nội dung hay chức năng.

## Độ đậm

Giữ ít bậc: thường là 400 (regular), 500 (medium), 600 (semibold), đôi khi thêm 700. Mỗi bậc thêm là một khác biệt nữa người đọc phải hiểu.

## Lỗi hay gặp

- **Quá nhiều cỡ chữ.** Audit một sản phẩm cũ thường lòi ra một đuôi dài các cỡ chữ chỉ hơi khác nhau. Material 3 phủ toàn bộ giao diện bằng 15 kiểu cơ bản, và vài kiểu trong đó chung cỡ.
- **Chỉ dùng cỡ chữ để tạo phân cấp.** Phân cấp đến từ cỡ, độ đậm, màu và khoảng trống cộng lại. Nhiều khi đổi độ đậm hoặc màu là đủ, không cần tăng cỡ.
- **Chữ quá nhỏ cho nội dung cần đọc.** WCAG không quy định cỡ tối thiểu, nhưng bậc nhỏ nhất trong scale của Material 3 là 11px, và chỉ dành cho label.
- **Line-height cố định bằng px** cho chữ sau đó bị phóng to, khiến các dòng chồng lên nhau.

## Nguồn

- Material Design 3, [Type scale tokens](https://m3.material.io/styles/typography/type-scale-tokens).
- W3C, [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/), tiêu chí 1.4.4 Resize Text và 1.4.12 Text Spacing.
- MDN, [CSS values and units](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units) (`rem`).
- Carbon Design System, [Typography](https://carbondesignsystem.com/elements/typography/overview/).

← Bài trước: [Màu sắc trong design system](/vi/articles/ds-04-color/) · Bài sau: [Spacing, sizing và layout](/vi/articles/ds-06-spacing-sizing-layout/) →
