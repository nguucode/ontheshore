---
title: "Màu sắc trong design system"
date: 2025-12-16
summary: "Cách dựng hệ màu theo ba lớp: ramp viết bằng OKLCH, semantic color đi theo cặp nền và chữ, và contrast WCAG 2.2 làm luật giữ cho cả hệ đọc được."
---

Phần 4/15 của series *Design system từ nền móng*.

Một hệ màu gồm ba lớp. Ramp là nguyên liệu: một hue chia thành nhiều bậc. Semantic color gán việc cho từng bậc, như nền, chữ, viền hay báo lỗi. Luật contrast bảo đảm mọi cặp màu đặt cạnh nhau đều đọc được.

Hai thói quen gánh phần lớn kết quả. Dựng ramp bằng OKLCH, vì con số độ sáng của nó khớp với cảm nhận của mắt. Và không bao giờ để màu là cách duy nhất truyền tải một thông tin.

## Color space: vì sao chọn OKLCH

Color space là cách đánh số cho màu. Trên web có ba cách hay gặp:

| Cách viết | Ví dụ | Vấn đề |
|---|---|---|
| HEX / RGB | `#EF4444`, `rgb(239 68 68)` | Nhìn con số không biết màu sáng hay tối |
| HSL | `hsl(0 84% 60%)` | Có giá trị độ sáng, nhưng không khớp mắt người: vàng và xanh dương cùng L 50% mà vàng trông sáng hơn hẳn |
| OKLCH | `oklch(63.7% 0.237 25.331)` | Độ sáng bám sát cảm nhận hơn nhiều |

OKLCH có ba giá trị:

- **L (lightness)**: độ sáng, 0% là đen, 100% là trắng.
- **C (chroma)**: độ rực của màu, 0 là xám.
- **H (hue)**: góc trên vòng màu. Quanh 25 là đỏ, 145 là xanh lá, 260 là xanh dương.

`oklch()` và `oklab()` được định nghĩa trong CSS Color Module Level 4 của W3C và chạy trên mọi trình duyệt lớn. Với người dựng hệ, lợi ích cụ thể là:

- Muốn bậc 600 của mọi hue trông đậm như nhau, chỉ cần đặt L xấp xỉ bằng nhau. Làm vậy với HSL thì không ra kết quả.
- Muốn màu nhạt đi, tăng L và giảm C, giữ nguyên hue. Kết quả đoán trước được.
- Biểu diễn được màu nằm ngoài sRGB, ví dụ dải màu rực hơn của màn hình P3. Đổi lại, trình duyệt sẽ kéo màu ngoài gamut về vùng hỗ trợ, nên cần thử trên màn hình thật.

Đọc giá trị không cần bảng tra. `oklch(54% 0.027 264)` gần như xám (C rất thấp), hơi ngả xanh (H 264), độ sáng trung bình.

## Ramp: một hue, nhiều bậc

Ramp là dãy bậc từ rất nhạt tới rất đậm của cùng một hue. Có hai cách đánh số phổ biến.

**Kiểu Tailwind: 50, 100, 200 cho tới 900, 950.** Mỗi màu của Tailwind có 11 bậc, 50 sáng nhất, 950 tối nhất, giá trị viết bằng OKLCH. Con số chỉ thể hiện thứ tự, không gắn công dụng cố định, nên cần thêm tầng semantic để giao việc.

**Kiểu Radix: 1 tới 12, mỗi bậc một công dụng cố định.** Theo tài liệu của Radix Colors:

| Bậc | Công dụng |
|---|---|
| 1 tới 2 | Nền app, nền phụ (card, sidebar) |
| 3 tới 5 | Nền component: bình thường, hover, đang nhấn hoặc đang chọn |
| 6 tới 8 | Viền: không tương tác, có tương tác, viền đậm và focus ring |
| 9 tới 10 | Nền đặc (bậc rực nhất) và hover của nó |
| 11 tới 12 | Chữ contrast thấp, chữ contrast cao |

Điểm mạnh của Radix là số bậc chính là công dụng. Thấy `blue-7` là hiểu "viền của thứ bấm được", không cần tra. Cách nào cũng dùng được; quan trọng là chọn một cách và có tài liệu đi kèm.

## Semantic color: giao vai trò

Ramp là nguyên liệu, còn component đọc vai trò. Gần như hệ nào cuối cùng cũng có một bộ tối thiểu như sau:

| Nhóm | Vai trò | Ví dụ tên token |
|---|---|---|
| Nền | nền trang, card, popover, nền tô nhạt | `--background`, `--card`, `--popover`, `--muted` |
| Chữ | chữ chính, chữ phụ | `--foreground`, `--muted-foreground` |
| Viền | viền trang trí, viền ô nhập | `--border`, `--input` |
| Hành động | màu chính và chữ đặt trên nó | `--primary`, `--primary-foreground` |
| Tương tác | hover, đang chọn, focus | `--accent`, `--ring` |
| Trạng thái | thành công, cảnh báo, lỗi, thông tin | `--success`, `--warning`, `--danger` |

Phần lớn tên ở đây theo quy ước của shadcn/ui; riêng màu lỗi thì shadcn gọi là `--destructive`. Material 3 dùng `primary`, `on-primary`, `surface`, `on-surface`, `outline`, `error`. Ý tưởng không khác: `on-primary` của Material chính là `primary-foreground` của shadcn.

### Một trạng thái, nhiều token

Bậc đỏ dùng tốt làm nền nút thường lại không đọc được khi làm chữ trên nền nhạt. Vì thế các hệ trưởng thành tách mỗi màu trạng thái thành vài token theo cách dùng:

- `--danger`: nền đặc, ví dụ nút xóa.
- `--danger-foreground`: chữ trên nền đặc đó.
- `--danger-subtle`: nền nhạt, ví dụ alert nhẹ.
- `--danger-text`: chữ màu danger trên nền thường hoặc nền nhạt.

Mỗi cặp được đo contrast riêng, nên cứ dùng đúng cặp là đọc được.

Có một chi tiết nhiều team vấp phải. Chữ trên nền vàng hoặc amber thường phải là chữ tối, trong khi chữ trên nền đỏ hay xanh dương là chữ sáng. Vàng sáng tới mức chữ trắng không đạt nổi 4.5:1. Luật chung kiểu "chữ trên nền đặc luôn màu trắng" không đúng với mọi hue.

## Contrast: luật không thương lượng

WCAG 2.2, Recommendation của W3C từ tháng 10/2023, đặt mức tối thiểu sau ở cấp AA, cấp mà phần lớn luật và hợp đồng yêu cầu:

| Tiêu chí | Áp dụng cho | Tỉ lệ tối thiểu |
|---|---|---|
| 1.4.3 Contrast (Minimum) | Chữ thường | 4.5:1 |
| 1.4.3 | Chữ lớn: từ 18pt, hoặc 14pt đậm (khoảng 24px, hoặc 18.66px đậm) | 3:1 |
| 1.4.11 Non-text Contrast | Phần cần để nhận ra UI và trạng thái của nó (viền ô nhập, icon mang nghĩa, focus ring) và đồ họa cần để hiểu nội dung | 3:1 so với màu kề bên |

Ngoại lệ: component đang disabled, phần trang trí thuần túy, logo.

Tỉ lệ được tính từ relative luminance của hai màu, đi từ 1:1 (cùng một màu) tới 21:1 (đen trên trắng). Đừng ước bằng mắt; DevTools của trình duyệt và plugin Figma đo được.

APCA là một phương pháp tính contrast mới từng được bàn tới như ứng viên cho WCAG 3. WCAG 3 vẫn là bản nháp, nên ngưỡng 4.5:1 và 3:1 của WCAG 2.x vẫn là chuẩn để tuân thủ. APCA giúp thiết kế tốt hơn, nhưng không thay được luật.

### Ngoại lệ phải là quyết định được ghi lại

Sẽ có lúc brand muốn một cặp màu không đạt, ví dụ chữ trắng trên màu cam thương hiệu. Ngoại lệ được phép, với điều kiện nó là một quyết định có ghi lại: cặp nào, tỉ lệ bao nhiêu, ai chấp nhận, vì sao. Sau này có người hỏi thì có câu trả lời, và nếu sản phẩm phải tuân thủ chặt thì danh sách chỗ cần sửa đã sẵn. Ngoại lệ không ghi lại chỉ là lỗi chưa ai phát hiện.

## Màu không bao giờ là kênh duy nhất

WCAG 1.4.1 Use of Color (cấp A) yêu cầu màu không được là cách duy nhất để truyền thông tin. Người mù màu đỏ và xanh lá, hay bất kỳ ai xem trên màn hình đen trắng, sẽ mất phần thông tin chỉ nằm trong màu. Khi áp dụng:

- Ô nhập bị lỗi: viền đỏ, kèm dòng báo lỗi, tốt nhất có thêm icon.
- Biểu đồ: màu kèm nhãn hoặc hoa văn.
- Link trong đoạn văn: màu kèm gạch chân, hoặc contrast 3:1 so với chữ xung quanh và có dấu hiệu khi hover, focus.

## Dark mode không phải lật ngược ramp

Đảo ngược ramp không tạo ra dark mode. Cần để ý ba điều:

1. **Nền tối không phải đen tuyền.** Dùng một bậc xám rất tối (ví dụ 950) cho nền trang và một bậc sáng hơn chút (900) cho card. Card sáng hơn nền để tạo chiều sâu, vì trên nền tối bóng đổ gần như không thấy.
2. **Màu rực phải dịu lại.** Ở light mode, `--primary` thường là bậc đậm với L khoảng 50 tới 55%. Ở dark mode, dùng bậc sáng hơn, L khoảng 70%. Màu rực hết cỡ trên nền tối gây chói.
3. **Viền dùng độ trong suốt.** `oklch(100% 0 0 / 10%)` là màu trắng với độ mờ 10%, tự hòa vào bất kỳ nền nào bên dưới.

Cách chuyển light và dark ở tầng token nằm trong bài [Theming và mode](/vi/articles/ds-09-theming-and-modes/).

## Lỗi hay gặp

- **Chọn màu chữ phụ bằng mắt trên màn hình tốt.** Sang màn hình rẻ hoặc ra ngoài nắng, chữ xám nhạt biến mất. Hãy đo.
- **Một token cho cả nền đặc lẫn chữ.** `--danger` làm chữ trên nền trắng có thể đạt, nhưng đặt trên `--danger-subtle` thì có thể không.
- **Thêm một màu mới** trong khi chỉ cần một bậc khác của màu đã có.
- **Làm mờ control disabled bằng opacity cho cả khối.** Chữ và nền cùng nhạt đi, có khi tới mức trông như không có control nào ở đó. WCAG miễn contrast cho trạng thái disabled, nhưng người dùng vẫn cần thấy control tồn tại.

## Nguồn

- W3C, [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/), Recommendation ngày 5/10/2023, cập nhật ngày 12/12/2024. Tiêu chí 1.4.1, 1.4.3, 1.4.11.
- W3C, [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/) (`oklab()`, `oklch()`).
- Radix Colors, [Understanding the scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale).
- Tailwind CSS, [Colors](https://tailwindcss.com/docs/colors).
- shadcn/ui, [Theming](https://ui.shadcn.com/docs/theming).
- W3C, [WCAG 3.0 Working Draft](https://www.w3.org/TR/wcag-3.0/).

← Bài trước: [Design token: ba tầng và một định dạng chung](/vi/articles/ds-03-design-tokens/) · Bài sau: [Typography: type scale đặt tên theo vai](/vi/articles/ds-05-typography/) →
