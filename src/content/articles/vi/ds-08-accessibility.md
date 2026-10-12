---
title: "Accessibility trong design system"
date: 2026-02-17
summary: "Vì sao accessibility là việc của design system, component chịu trách nhiệm những tiêu chí WCAG 2.2 nào, và test thế nào mà không tin mù vào báo cáo tự động xanh."
---

Phần 8/15 của series *Design system từ nền móng*.

Accessibility là làm cho mọi người dùng được sản phẩm: người dùng bàn phím, người dùng screen reader, người nhìn kém, người run tay, người đang bị phân tâm. Design system là đòn bẩy lớn nhất cho việc này, vì sửa một lần trong component là mọi màn hình dùng component đó được sửa theo. Chuẩn cần đạt là WCAG 2.2 mức AA. Và luật đầu tiên của ARIA là dùng đúng phần tử HTML trước khi nghĩ tới ARIA.

## Vì sao đây là việc của hệ

Hình dung một tòa nhà. Nếu kiến trúc sư làm sẵn dốc xe lăn ở cửa chính, ai cũng vào được ngay từ ngày đầu. Nếu không, mỗi người thuê tự xây dốc riêng, mỗi cái một kiểu, có cái quá dốc.

Design system là kiến trúc sư. Khi Button có focus ring, Modal giữ focus bên trong, Input gắn label đúng cách, thì mọi team dùng hệ được hưởng mà không cần biết. Chiều ngược lại cũng đúng: một component lỗi mang lỗi đó tới mọi nơi dùng nó.

## WCAG 2.2 trong năm phút

WCAG (Web Content Accessibility Guidelines) là chuẩn của W3C. Bản 2.2 thành W3C Recommendation ngày 5/10/2023, và ấn bản hiện hành, có sửa lỗi, đề ngày 12/12/2024. Chuẩn có ba mức: A (tối thiểu), AA (mức đa số luật yêu cầu) và AAA (cao nhất, không đặt ra cho toàn bộ site).

Mọi tiêu chí nằm dưới một trong bốn nguyên tắc, viết tắt là **POUR**:

| Nguyên tắc | Nghĩa | Ví dụ |
|---|---|---|
| Perceivable (nhận biết được) | Thông tin đến được người dùng qua ít nhất một giác quan | Alt cho ảnh, đủ contrast, không chỉ dùng màu |
| Operable (thao tác được) | Mọi chức năng dùng được theo nhiều cách | Dùng được bằng bàn phím, vùng bấm đủ lớn, không bẫy focus |
| Understandable (hiểu được) | Nội dung và hành vi dễ đoán | Label rõ, lỗi kèm cách sửa |
| Robust (bền vững) | Công nghệ hỗ trợ đọc được | HTML đúng ngữ nghĩa, tên, vai trò, giá trị đúng |

## Những tiêu chí component gánh chính

Đây là các tiêu chí mà design system chịu phần lớn trách nhiệm:

| Tiêu chí | Yêu cầu | Component làm gì |
|---|---|---|
| 1.4.3 Contrast (Minimum), AA | Chữ 4.5:1, chữ lớn 3:1 | Cặp token nền và chữ được đo trước |
| 1.4.11 Non-text Contrast, AA | Viền control, icon, focus ring 3:1 | Token viền và focus ring đạt 3:1 |
| 1.4.1 Use of Color, A | Màu không bao giờ là tín hiệu duy nhất | Lỗi có chữ và icon |
| 2.1.1 Keyboard, A | Mọi thứ dùng được bằng bàn phím | Headless primitive xử lý phím |
| 2.1.2 No Keyboard Trap, A | Focus không bị kẹt | Modal giữ focus, và Esc thoát được |
| 2.4.3 Focus Order, A | Focus đi theo thứ tự hợp lý | Đóng modal thì focus về nút đã mở nó |
| 2.4.7 Focus Visible, AA | Thấy được focus đang ở đâu | Mọi control có focus ring |
| 2.4.11 Focus Not Obscured (Minimum), AA, mới ở 2.2 | Phần tử đang focus không bị che hoàn toàn | Header dính và toast không che nó |
| 2.5.8 Target Size (Minimum), AA, mới ở 2.2 | Vùng bấm tối thiểu 24×24 CSS px, có ngoại lệ | Tier nhỏ nhất của control bấm được bắt đầu từ 24px |
| 3.3.1 Error Identification và 3.3.2 Labels or Instructions, A | Lỗi mô tả bằng chữ, input có label | Field luôn có label, lỗi gắn với input |
| 4.1.2 Name, Role, Value, A | Control có tên, vai trò và trạng thái | `aria-label` cho nút chỉ có icon, `aria-expanded` cho thứ mở/đóng |

Cặp contrast được nói ở bài [Màu sắc trong design system](/vi/articles/ds-04-color/), còn tier kích thước ở bài [Spacing, sizing và layout](/vi/articles/ds-06-spacing-sizing-layout/). Thêm một thay đổi ở 2.2: W3C xếp 4.1.1 Parsing vào loại lỗi thời và bỏ nó đi.

## Focus ring: chi tiết nhỏ, tác động lớn

Người dùng bàn phím nhìn focus ring như người dùng chuột nhìn con trỏ. Bỏ focus ring là bỏ con trỏ.

Luật: không bao giờ đặt `outline: none` mà không thay bằng một ring khác. Dùng `:focus-visible`, chỉ hiện ring khi focus bằng bàn phím, thay vì `:focus`, hiện cả khi click chuột. Chính trường hợp click là lý do khiến nhiều team tắt ring đi.

Nên token hóa ring:

```css
--focus-width: 2px;
--focus-offset: 2px;        /* ring bên ngoài */
--focus-offset-inset: -2px; /* ring bên trong */

.button:focus-visible {
  outline: var(--focus-width) solid var(--ring);
  outline-offset: var(--focus-offset);
}
```

Có hai offset vì không phải control nào cũng có chỗ trống xung quanh. Item trong menu hay tab nằm sát nhau, ring ngoài sẽ bị item bên cạnh che, đi ngược tinh thần 2.4.11. Những control đó dùng ring trong.

## ARIA: dùng ít, dùng đúng

ARIA (Accessible Rich Internet Applications) là bộ thuộc tính thêm ngữ nghĩa cho HTML: `role`, `aria-label`, `aria-expanded`, `aria-describedby` và các thuộc tính khác.

Luật đầu tiên trong tài liệu *Using ARIA* của W3C: nếu đã có một phần tử HTML sẵn ngữ nghĩa và hành vi bạn cần, hãy dùng nó, thay vì gắn role và ARIA vào một phần tử khác.

```html
<!-- Đúng: có sẵn focus, Enter/Space, vai trò -->
<button type="button">Lưu</button>

<!-- Sai: tabindex, phím, role đều tự làm -->
<div role="button" tabindex="0" onclick="...">Lưu</div>
```

ARIA sai còn tệ hơn không có ARIA, vì nó nói dối screen reader. `aria-expanded="true"` trên một menu đang đóng là một ví dụ.

**ARIA Authoring Practices Guide (APG)** của W3C mô tả từng loại widget (accordion, combobox, dialog, tabs, menu và các loại khác): cần role gì, phím nào làm gì, focus đi đâu. Khi tự viết component phức tạp, APG là bản đặc tả. Khi dùng headless primitive, primitive đã theo APG, và việc của hệ là đừng phá nó, ví dụ đừng bọc trigger trong một `<div>` có click handler riêng.

## Những mẫu accessibility nên làm sẵn trong component

- **Nút chỉ có icon bắt buộc có tên**, tốt nhất ép bằng TypeScript như trong bài [Thiết kế component](/vi/articles/ds-07-component-design/).
- **Loading giữ focus.** Dùng `aria-disabled` thay vì `disabled`, và báo "đang tải" bằng chữ hoặc qua live region.
- **Link bị vô hiệu.** Thẻ `<a>` không có thuộc tính `disabled`. Cách duy nhất để nó không điều hướng là bỏ `href`. Mất `href` thì nó không còn được nhận là link, nên thêm `role="link"` và `aria-disabled="true"` để công nghệ hỗ trợ biết đây là link đang không dùng được.
- **Lỗi form.** Gắn thông báo với input bằng `aria-describedby` và đặt `aria-invalid="true"`.
- **Dialog.** Đặt tên cho dialog bằng `aria-labelledby` trỏ tới tiêu đề, giữ focus bên trong, Esc để đóng, trả focus khi đóng.

## Test tự động bắt được gì

Có thể chạy axe-core, engine mã nguồn mở của Deque, trên mọi story trong Storybook qua addon accessibility, và cấu hình để vi phạm làm test đỏ thay vì chỉ cảnh báo. Đó nên là mức sàn.

Nhưng axe sạch lỗi không có nghĩa là đạt WCAG. Công cụ tự động chỉ bắt được một phần vấn đề: contrast, thiếu label, thiếu alt, ARIA sai cú pháp. Chúng không biết:

- Thứ tự focus có hợp lý không.
- Label có nghĩa không. "Nút" là label hợp lệ về kỹ thuật nhưng vô dụng.
- Screen reader đọc ra có dễ hiểu không.

Một quy trình hợp lý cho mỗi component:

1. Kiểm tra tự động trong story (axe).
2. Test tương tác bằng code: Tab vào, Enter, Esc, phím mũi tên. Xem bài [Testing và cổng chất lượng](/vi/articles/ds-12-testing-and-quality/).
3. Thử tay chỉ bằng bàn phím, không dùng chuột.
4. Thử tay với screen reader cho component phức tạp (VoiceOver trên Mac bật bằng Cmd + F5).

## Lỗi hay gặp

- **Placeholder thay cho label.** Placeholder biến mất khi gõ, contrast thường thấp, và nhiều screen reader không coi nó là label.
- **Chỉ test bằng chuột.**
- **Modal không trả focus** về chỗ đã mở nó.
- **Thông tin quan trọng nằm trong tooltip.** Khó chạm tới trên cảm ứng, dễ bị bỏ qua.
- **Tắt focus ring vì "xấu"**, thay vì thiết kế một ring đẹp.

## Nguồn

- [W3C, Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C, What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- [W3C, Using ARIA](https://www.w3.org/TR/using-aria/)
- [W3C, ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [MDN, :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
- [Storybook, Accessibility testing](https://storybook.js.org/docs/writing-tests/accessibility-testing)
- [Deque, axe-core](https://github.com/dequelabs/axe-core)

← Bài trước: [Thiết kế component: anatomy, variant và API](/vi/articles/ds-07-component-design/) · Bài sau: [Theming và mode](/vi/articles/ds-09-theming-and-modes/) →
