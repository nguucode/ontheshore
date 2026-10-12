---
title: "Nối design và code"
date: 2026-03-17
summary: "Cách giữ Figma library và code component đi cùng nhau: mỗi loại quyết định một nguồn sự thật, variable khớp với token, và handoff chỉ mô tả chỗ khác hệ."
---

Phần 10/15 của series *Design system từ nền móng*.

Design system hỏng nhiều nhất theo cách rất lặng lẽ: Figma library và code lệch dần, đến lúc không ai nói được bên nào đúng. Mọi kỹ thuật trong bài này đều để chặn chuyện đó. Ý chính là cho mỗi loại quyết định đúng một nơi sinh ra, rồi để Figma variable nói cùng ngôn ngữ với token. Tự động hóa giúp được nhiều, nhưng làm được tới đâu còn tùy gói Figma. Không có nó thì plugin cộng chút kỷ luật vẫn đủ.

## Mỗi loại quyết định một nguồn sự thật

Hình dung hai người cùng giữ sổ chi tiêu gia đình, mỗi người một cuốn. Sau một tháng hai cuốn chắc chắn lệch, và không ai biết cuốn nào đúng. Cách sửa không phải là ghi cẩn thận hơn, mà là chỉ giữ một cuốn, người kia chỉ đọc.

Nhưng design system có nhiều loại quyết định, và không phải loại nào cũng nên sinh ra ở cùng một chỗ. Cách chia nhiều team dùng:

| Loại quyết định | Sinh ra ở | Chảy sang | Vì sao |
|---|---|---|---|
| **Token** (giá trị màu, khoảng cách, bo góc) | Code (file JSON token) | Figma variable | Code có lint, test, kiểm contrast, review qua pull request. Figma không có. |
| **Hình dạng mới** (layout, anatomy, variant mới) | Figma | Code | Khám phá bằng hình nhanh hơn trên canvas. |
| **Hành vi** (bàn phím, focus, state) | Code và docs | Figma (ghi chú) | Figma không mô phỏng đủ được. |

Có team làm ngược dòng token: Figma là nguồn, xuất JSON bằng plugin. Cách đó cũng ổn. Điều quan trọng là chọn một chiều và ghi ra. Luật đi kèm rất chặt: hai chiều không được trộn. Nếu code giữ token mà ai đó sửa màu trong Figma, thay đổi đó coi như chưa có cho tới khi nó vào file token qua một pull request.

## Figma library thường gồm gì

1. **Cover hoặc getting started.** Library là gì, bật thế nào, đang ở version nào.
2. **Foundations.** Các trang hiển thị màu, chữ, spacing, radius, shadow, icon. Chỉ để xem; giá trị thật nằm trong variable và style.
3. **Trang component.** Mỗi component một trang, có component set đủ mọi variant property, kèm ví dụ dùng.
4. **Variables.** Các collection như Primitives, Color (mode light và dark), Spacing, Radius, Typography.
5. **Styles.** Text style và effect style cho shadow, vì vẫn có giá trị chưa biểu diễn được bằng variable.

## Figma variable, đặt cạnh code

| Khái niệm | Là gì | Khớp với code |
|---|---|---|
| **Collection** | Một nhóm variable | Một file token hoặc một nhóm token (Color, Spacing) |
| **Mode** | Các bộ giá trị trong một collection | Một trục theming: light và dark, hoặc preset bo góc (xem [Theming và mode](/vi/articles/ds-09-theming-and-modes/)) |
| **Alias** | Variable trỏ sang variable khác | Alias kiểu `{gray.500}` trong định dạng DTCG |
| **Scope** | Variable được gán cho thuộc tính nào (fill, stroke, gap, radius) | Gần giống luật lint: variable màu chữ không hiện khi chọn màu nền |
| **Code syntax** | Tên hiện trong Dev Mode cho từng nền tảng | Đặt là `var(--primary)` để dev copy đúng tên |
| **Hide from publishing** | Giữ variable ngoài library khi publish | Ẩn primitive, chỉ để lộ semantic |

Hai thiết lập đáng làm:

- **Ẩn primitive khi publish.** Người dùng library chỉ thấy semantic, giống như component chỉ đọc semantic token trong code (xem [Design token](/vi/articles/ds-03-design-tokens/)).
- **Đặt scope chặt.** Variable `border` chỉ cho stroke, các variable `space-*` chỉ cho gap và padding. Ít lựa chọn sai hơn.

## Sync token

Có ba cách, dùng được cách nào tùy gói Figma.

| Cách | Cần gì | Ghi chú |
|---|---|---|
| **Variables REST API** | Theo docs của Figma: Full seat trong một Enterprise org; ghi thì cần thêm quyền edit và scope `file_variables:write` | Tự động hoàn toàn trong CI |
| **Plugin** (Tokens Studio, plugin tự viết, hoặc AI agent qua Figma MCP server) | Gói nào cũng được | Chạy tay hoặc bán tự động |
| **Làm tay** | Không cần gì | Chỉ ổn khi token ít đổi |

Dưới gói Enterprise, cách làm thực tế là gom thay đổi token thành đợt, mỗi đợt sync một lần qua plugin. Ghi lại danh sách token còn chờ sync, để không ai tưởng Figma đang đúng khi nó chưa đúng.

## Code Connect

Code Connect nối component trong code với component tương ứng trong Figma. Khi dev chọn một instance trong Dev Mode, họ thấy code thật thay vì CSS tự sinh, thứ hiếm khi dùng được:

```tsx
<Button variant="primary" appearance="outlined" size="sm">Lưu</Button>
```

Trang hỗ trợ của Figma mô tả Code Connect là cầu nối giữa codebase và Dev Mode, nhờ đó AI agent làm việc qua Figma MCP server cũng lấy được đúng chi tiết triển khai. Tính năng này có ở gói Organization và Enterprise.

Không có Code Connect thì nguyên tắc vẫn dùng được: **đặt tên property và giá trị trong Figma giống hệt prop trong code**. Component Figma có `Variant = Primary`, `Appearance = Outlined`, `Size = sm` thì dev đọc instance là biết prop. Sau này lên gói cao hơn, việc map Code Connect gần như chỉ là thao tác máy móc.

## Handoff khi đã có hệ

Trong một hệ trưởng thành, handoff không còn là đo từng pixel. Nó gồm:

1. Màn hình dùng component nào, variant nào. Instance đã nói sẵn điều này.
2. Chỗ nào lệch khỏi hệ và vì sao. Chỉ những chỗ này mới cần spec chi tiết.
3. State và dữ liệu biên: rỗng, lỗi, chữ dài, đang tải.
4. Hành vi: chuyển trang, animation, focus đi đâu sau khi đóng modal.

Màn hình nào cần spec dày thì thường là dấu hiệu hệ đang thiếu component hoặc pattern.

## Lỗi hay gặp

- **Detach instance** trong Figma để chỉnh cho nhanh. Instance đã detach không nhận cập nhật nữa, và lệch bắt đầu từ đó.
- **Tên khác nhau giữa Figma và code**, ví dụ `Type = Filled` trong Figma nhưng `appearance="contained"` trong code.
- **Variant chỉ có ở một phía.** Mỗi variant trong Figma nên có prop tương ứng, và ngược lại.
- **Mặc định coi Figma là đúng.** Khi code giữ token, Figma chỉ đúng tính tới lần sync gần nhất.

## Nguồn

- [Figma Developers, Variables REST API](https://developers.figma.com/docs/rest-api/variables/)
- [Figma Help Center, Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect)
- [Figma Help Center, Modes for variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables)
- [Figma Help Center, Guide to variables in Figma](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
- [Tokens Studio](https://tokens.studio/)

← Bài trước: [Theming và mode](/vi/articles/ds-09-theming-and-modes/) · Bài sau: [Viết documentation cho design system](/vi/articles/ds-11-documentation/) →
