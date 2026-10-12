---
title: "Thiết kế component: anatomy, variant và API"
date: 2026-02-03
summary: "Một component được định nghĩa bởi bốn thứ: các phần, các variant, các state và API. Làm đúng từng thứ thế nào, và vì sao API cần cẩn thận nhất."
---

Phần 7/15 của series *Design system từ nền móng*.

Một component làm tốt có bốn thứ được ghi rõ: **anatomy** (gồm những phần nào), **variant** (có những dạng nào), **state** (phản ứng ra sao) và **API** (người dùng component điều khiển nó bằng gì). Phần nhìn thường được chú ý nhiều nhất, nhưng API mới là phần khó đổi nhất về sau. Còn phần hành vi khó nhất, gồm bàn phím, focus và ARIA, nên dựa vào một thư viện headless đã được kiểm chứng thay vì tự viết.

## Anatomy: component gồm những phần nào

Sơ đồ anatomy tháo rời component và đánh số từng phần. Material 3, Carbon và Polaris đều mở đầu trang component bằng sơ đồ này.

Một Button khi tháo ra:

```
┌────────────────────────────┐
│ (1) (2)  Lưu thay đổi  (3) │
└────────────────────────────┘
1. spinner (khi loading)
2. icon đầu
   label
3. icon cuối
+ container: nền, viền,
  bo góc, padding
```

Ghi anatomy ra có ba cái lợi:

- Designer và dev gọi tên giống nhau. "Giảm khoảng cách giữa icon đầu và label" chỉ có một nghĩa với mọi người.
- Ghi rõ phần nào tùy chọn (icon), phần nào bắt buộc (label, trừ nút chỉ có icon).
- Là nền cho spec đo đạc và cho trang documentation của component, nói ở bài [Viết documentation cho design system](/vi/articles/ds-11-documentation/).

## Variant: tách thành trục

Lỗi hay gặp là liệt kê mọi tổ hợp thành một danh sách phẳng:

```
primary, primary-outline, primary-ghost,
danger, danger-outline, ...
```

Mỗi màu mới nhân danh sách lên theo số kiểu, mỗi kiểu mới nhân lên theo số màu. Cách sửa là tách variant thành các trục độc lập:

| Trục | Giá trị ví dụ | Trả lời câu hỏi |
|---|---|---|
| Ý nghĩa (`variant`) | `primary`, `secondary`, `destructive` | Hành động này quan trọng hay rủi ro đến đâu? |
| Độ nổi (`appearance`) | `filled`, `outlined`, `ghost` | Cần nổi bật đến mức nào? |
| Cỡ (`size`) | `sm`, `md`, `lg` | Màn hình đang ở mật độ nào? |

Chín giá trị phủ được 27 tổ hợp. Thêm một màu chỉ thêm một giá trị, không phải ba. Với 5 ý nghĩa và 3 độ nổi, danh sách phẳng cần 15 tên; tách trục chỉ cần 8 giá trị.

Trong Figma, mỗi trục là một variant property của component. Khi tên trục và giá trị khớp đúng với code, designer và dev mô tả cùng một nút theo cùng một cách, và việc map design sang code về sau đơn giản hơn nhiều. Việc map đó là chủ đề của bài [Nối design và code](/vi/articles/ds-10-design-and-code/).

### Một chữ, hai nghĩa

Chữ "variant" bị dùng cho hai thứ: mọi phiên bản của một component, và tên của một prop cụ thể. Các hệ đặt tên prop khác nhau. MUI chẳng hạn dùng `color` cho ý nghĩa và `variant` cho độ nổi (`contained`, `outlined`, `text`). Không cách nào sai. Điều quan trọng là trong một hệ, mọi component dùng cùng một bộ tên.

## State: component phản ứng thế nào

Các state cần tính tới cho một control tương tác:

| State | Kích hoạt bởi | Ghi chú |
|---|---|---|
| Default | | |
| Hover | Con trỏ di qua | Không có trên màn hình cảm ứng, nên đừng giấu thông tin sau hover |
| Focus-visible | Focus bằng bàn phím | Phải nhìn thấy được (WCAG 2.4.7) |
| Active / pressed | Đang nhấn | |
| Selected / checked | Toggle, tab, checkbox | |
| Disabled | Không dùng được | Cân nhắc nói lý do |
| Loading | Đang xử lý | Xem bên dưới |
| Invalid / error | Dữ liệu sai | Không bao giờ chỉ báo bằng màu |
| Read-only | Xem được, không sửa được | Khác disabled: vẫn focus và copy được |

Liệt kê state kỹ sẽ lộ ra những câu hỏi dễ làm sai. Ví dụ một nút đang loading: có nên đặt `disabled` không? Thường là không. Phần tử disabled không giữ được focus, nên người dùng bàn phím vừa bấm Enter bị mất chỗ; tùy trình duyệt, focus rơi về chính trang. Cách tốt hơn là giữ nút focus được, đặt `aria-disabled="true"`, bỏ qua click cho tới khi xử lý xong, và nói ra bằng chữ điều đang diễn ra, ví dụ đổi label thành "Đang lưu" hoặc báo qua một live region dạng polite. Bài [Accessibility trong design system](/vi/articles/ds-08-accessibility/) có thêm các mẫu tương tự.

Component phức tạp còn có **state của dữ liệu**: rỗng, đang tải, lỗi, một phần tử, hàng nghìn phần tử, một label dài hơn mọi dự tính. Nhiều hệ có component riêng cho những trạng thái này, như empty state, error state và skeleton.

## Thiết kế API

API là phần người dùng hệ chạm vào mỗi ngày. Vài nguyên tắc, minh họa bằng một Button giả định.

**Đặt tên theo một quy ước.** Ví dụ mọi boolean bắt đầu bằng `is`: `isLoading`, `isFullWidth`, `isIconOnly`. Tiền tố cho người đọc biết đó là công tắc bật/tắt. Ngoại lệ là thuộc tính chuẩn của HTML như `disabled` và `type`, giữ nguyên tên gốc vì ai cũng đã quen.

**Mặc định là trường hợp phổ biến nhất, và an toàn nhất.** `variant="primary"`, `size="md"` và quan trọng nhất là `type="button"`. Thẻ `<button>` gốc mặc định là `submit`, nên nút đặt trong form sẽ vô tình submit form. Đổi mặc định là loại bỏ cả một nhóm bug.

**Để type system chặn cách dùng sai.**

```ts
type ButtonProps =
  | (BaseProps & { isIconOnly?: false })
  | (BaseProps & {
      isIconOnly: true;
      'aria-label': string;
    });
```

Khi có `isIconOnly`, TypeScript bắt buộc phải có `aria-label`. Nút chỉ có icon mà không có tên sẽ bị screen reader đọc là "button", và người dùng không biết nó làm gì. Một luật accessibility thành lỗi biên dịch: không ai phải nhớ, không reviewer nào phải bắt.

**Tôn trọng ngữ nghĩa.** Có `href` thì render `<a>` (điều hướng). Không có thì render `<button>` (hành động). Link và button khác nhau ở bàn phím (Enter so với Enter hoặc Space), ở cách screen reader đọc, và ở việc bấm chuột giữa. Trông giống nhau không có nghĩa là cùng một phần tử.

**Chừa lối thoát.** Nhận `className` và chuyển tiếp các thuộc tính HTML còn lại. Người dùng sẽ cần những thứ hệ không lường trước. Không có lối thoát thì họ fork component.

## Composition: config hay compound

Component nhiều phần có thể theo một trong hai kiểu API.

**Config**, dữ liệu truyền qua props:

```tsx
<Accordion
  items={[
    { title: 'A', content: '...' },
    { title: 'B', content: '...' },
  ]}
/>
```

Dễ dùng, khó tùy biến từng phần.

**Compound**, các phần được ghép lại thành con:

```tsx
<Accordion.Root>
  <Accordion.Item>
    <Accordion.Trigger>A</Accordion.Trigger>
    <Accordion.Panel>...</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>
```

Dài hơn, nhưng mỗi phần chứa được bất cứ thứ gì và đổi thứ tự được. Base UI, Radix và React Aria đều dùng kiểu này cho primitive.

Quy tắc hợp lý: config cho trường hợp phổ biến, compound khi cần linh hoạt. Nhiều hệ cung cấp cả hai, bản compound làm nền và một lớp config bọc ngoài cho tiện.

Một công cụ liên quan là đổi phần tử được render, ví dụ render `<Link>` của router thay cho `<a>` thường mà vẫn giữ style và hành vi. Radix gọi là `asChild`; Base UI dùng prop `render`.

## Controlled và uncontrolled

- **Uncontrolled**: component tự giữ state. `<Switch defaultChecked />`. Dùng đơn giản.
- **Controlled**: component cha giữ state và truyền xuống. `<Switch checked={on} onCheckedChange={setOn} />`. Cần khi giá trị phải đồng bộ với chỗ khác.

Component tốt hỗ trợ cả hai, theo quy ước của React: `defaultX` cho uncontrolled, `x` cùng `onXChange` cho controlled.

## Headless primitive: đừng tự viết phần khó

Phần nhìn thấy của một combobox chỉ là phần nhỏ công sức. Phần lớn nằm ở điều hướng bằng phím mũi tên, Home và End, gõ để tìm, quản lý focus, ARIA cho screen reader, đóng khi bấm ra ngoài, và giữ popup trong màn hình khi sát mép.

Thư viện **headless primitive** làm sẵn toàn bộ hành vi đó, không kèm style. Ba lựa chọn phổ biến cho React:

| Thư viện | Ghi chú |
|---|---|
| Radix Primitives | Dùng rộng rãi nhất; nền của shadcn/ui |
| Base UI | Do đội MUI làm cùng các tác giả của Radix và Floating UI; dùng prop `render` |
| React Aria (Adobe) | Rất chặt về accessibility và quốc tế hóa; có cả hook và component |

Lợi ích là hành vi đã được test trên nhiều screen reader và trình duyệt. Cái giá là phải theo mô hình của thư viện, và theo cả những breaking change của nó. Ghi lựa chọn primitive thành một bản ghi quyết định, vì đổi về sau rất tốn kém.

## Lỗi hay gặp

- **Boolean bùng nổ.** `isPrimary`, `isDanger`, `isOutline` đứng cạnh nhau, và không ai biết `isPrimary && isDanger` ra cái gì. Gom thành một prop enum.
- **Prop mô tả ngữ cảnh thay vì ý định.** `inHeader` thay vì `size` hay `appearance`. Bài [Mô hình tư duy để chia tầng design system](/vi/articles/ds-02-mental-models/) giải thích vì sao.
- **Disabled mà không giải thích.** Người dùng không hiểu vì sao bấm không được. Cân nhắc giữ nút bật và báo vấn đề khi bấm.
- **`<div onClick>` thay cho `<button>`.** Mất hỗ trợ bàn phím và mất ngữ nghĩa.
- **Cùng một khái niệm mà tên prop khác nhau.** `size` ở Button, `scale` ở Input.

## Nguồn

- [Base UI, Quick start](https://base-ui.com/react/overview/quick-start)
- [Radix Primitives](https://www.radix-ui.com/primitives)
- [React Aria](https://react-spectrum.adobe.com/react-aria/)
- [React, Sharing state between components](https://react.dev/learn/sharing-state-between-components)
- [W3C, ARIA Authoring Practices Guide, Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [Material Design 3, Buttons](https://m3.material.io/components/buttons/overview)
- [Figma Help, Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)

← Bài trước: [Spacing, sizing và layout](/vi/articles/ds-06-spacing-sizing-layout/) · Bài sau: [Accessibility trong design system](/vi/articles/ds-08-accessibility/) →
