---
title: "Spacing, sizing và layout"
date: 2026-01-20
summary: "Những thang nhỏ giữ cho giao diện nhất quán: lưới spacing 4px, control tier, radius, shadow, lớp z-index, breakpoint và motion, tất cả thành token có tên."
---

Phần 6/15 của series *Design system từ nền móng*.

Màu và chữ được chú ý nhiều nhất, nhưng phần lớn sự lệch lạc về thị giác lại đến từ các thang nhỏ hơn: khoảng cách, kích thước, bo góc, bóng đổ, lớp chồng và thời gian chuyển động.

- **Spacing** chạy trên lưới 4px. Mọi khoảng cách là bội của 4: 4, 8, 12, 16, 24, 32.
- **Sizing** gom thành tier như sm, md, lg. Một tier khóa cùng lúc chiều cao, padding, cỡ icon và bo góc, nên chọn tier thay cho việc chọn từng con số.
- **Radius, shadow, z-index và motion** cũng là token, mỗi thứ một thang ngắn đặt tên theo vai.

Chỗ nào nhận được giá trị tùy ý (13px, `z-index: 9999`, transition 0.37s) là chỗ hệ sẽ lệch, trừ khi có token và lint giữ lại.

## Spacing: vì sao là 4px

Hình dung tờ giấy kẻ ô. Vẽ trên đó thì mọi thứ tự thẳng hàng, không cần thước. Lưới 4px là giấy kẻ ô của giao diện.

Vì sao 4 mà không phải 5 hay 10:

- Phần lớn màn hình hiển thị ở mật độ điểm ảnh 1x, 2x hoặc 3x, còn Android hay có 1.5x. Số 4 chia gọn ở các mật độ đó, nên viền và khoảng cách không rơi vào nửa pixel rồi bị nhòe.
- 4 đủ nhỏ để chỉnh tinh, như khoảng giữa icon và chữ, còn các bội số (8, 16, 24, 32) tạo ra nhịp lớn.

Material, Carbon, Polaris và Atlassian đều dùng đơn vị nền 4px với nhịp chính 8px. Các bậc dùng thật thường là 4, 8, 12, 16, 24, 32, 48, 64. Càng lên cao bước càng giãn, vì mắt gần như không phân biệt được 48 với 52.

### Ví dụ token

```css
--space-1: 0.25rem;  /* 4px  */
--space-2: 0.5rem;   /* 8px  */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
```

Tên đếm số lần 4px, giống cách Tailwind làm: `space-4` là 16px. Khi thật sự cần một giá trị ngoài nhịp, như padding 10px cho ô nhập, hãy thêm một token có tên (`--space-2-5`) thay vì viết thẳng `10px` vào CSS. Giá trị lạ vẫn được ghi lại, tìm được, và lint vẫn chặn mọi con số tùy ý khác.

Một bước xa hơn: nhân mọi giá trị với một biến hệ số, như `calc(0.25rem * var(--scaling))`. Theme đổi `--scaling` là cả hệ co giãn đều. Chi tiết trong bài [Theming và mode](/vi/articles/ds-09-theming-and-modes/).

### Hai loại khoảng cách

- **Bên trong component** (padding, gap nội bộ): component tự quyết, thường thông qua tier.
- **Giữa các component** (margin, gap của layout): người ghép màn hình quyết. Component không nên mang sẵn margin ngoài. Nếu có, mọi chỗ đặt nó mà không cần margin đó sẽ bị thừa khoảng.

## Sizing và control tier

Nhiều hệ dừng giữa chừng ở phần này. Nếu Button nhỏ cao 32px còn Input nhỏ cao 28px, đặt cạnh nhau trên một thanh công cụ sẽ lệch.

Cách sửa là control tier: một bộ kích thước dùng chung cho mọi control, gồm button, input, select và tab. Ví dụ minh họa:

| Tier | Cao | Padding ngang | Gap icon | Icon | Bo góc |
|---|---|---|---|---|---|
| `sm` | 24px | 8px | 6px | 14px | sm |
| `md` | 32px | 12px | 8px | 16px | md |
| `lg` | 40px | 16px | 8px | 20px | md |

Token tương ứng có dạng `--control-md-height`, `--control-md-padding`, `--control-md-gap`, `--icon-md`. Component chỉ cần biết mình ở tier md, mọi con số tự đi theo. Control thêm về sau cũng tự khớp với các control đã có.

### Tier nhỏ nhất và target size

Tiêu chí 2.5.8 Target Size (Minimum) của WCAG 2.2 yêu cầu vùng bấm tối thiểu 24 x 24 CSS pixel, có vài ngoại lệ, như đủ khoảng cách với vùng bấm bên cạnh hoặc link nằm trong câu văn. Nếu hệ có tier dưới 24px cho tag hay badge, hãy ghi rõ tier đó không dành cho control tương tác như button và input. Human Interface Guidelines của Apple khuyến nghị cao hơn, 44 x 44 point, cho màn hình cảm ứng.

## Radius

Bo góc cũng cần thang và vai. Cách gọn là suy cả thang từ một giá trị gốc. shadcn/ui làm theo hướng này: theme của nó có một biến `--radius` duy nhất và tính các bán kính khác từ đó. Một thang dựng theo cùng ý tưởng:

```css
--radius: 0.625rem;                      /* 10px, giá trị gốc */
--radius-sm: calc(var(--radius) * 0.6);
--radius-md: calc(var(--radius) * 0.8);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) * 1.4);
```

Theme đổi `--radius` là cả thang dịch theo.

Phía trên thang có thể thêm một lớp vai:

- `--radius-control`: nút, toggle. Có theme biến chúng thành hình viên thuốc (pill).
- `--radius-field`: ô nhập. Thường không nên thành pill, vì ô nhập dạng pill khó đọc khi có nhiều dòng hoặc label nằm bên trong.
- `--radius-panel`: card, modal.

### Luật bo góc lồng nhau

Khi một hình bo góc nằm trong một hình bo góc khác, bán kính ngoài nên bằng bán kính trong cộng với padding giữa hai lớp. Nếu không, đường cong trông không đều. Lỗi này hay gặp ở menu, nơi item bo góc nằm trong khung bo góc, và ở card chứa ảnh.

## Shadow và elevation

Bóng đổ thể hiện độ cao: thứ gì nổi trên thứ gì. Thang thường gặp đi từ không bóng, nhẹ (card), vừa (dropdown), tới mạnh (modal). Material 3 gọi là elevation level 0 tới 5.

Tách thành hai lớp, giống cách primitive và semantic token tách nhau trong bài [Design token: ba tầng và một định dạng chung](/vi/articles/ds-03-design-tokens/):

- `--elevation-*` giữ giá trị bóng thật, khác nhau giữa light và dark. Dark mode cần bóng đậm hơn nhiều, vì bóng nhạt biến mất trên nền tối.
- `--shadow-*` là lớp component đọc. Nó trỏ về giá trị elevation của mode hiện tại.

## Lớp chồng với z-index

Không có token thì sẽ có cuộc đua: `z-index: 999`, rồi `9999`, rồi `99999`. Cách sửa là vài lớp có tên, đặt cách xa nhau:

```css
--layer-sticky: 10;   /* header dính */
--layer-overlay: 50;  /* modal, popover */
--layer-tooltip: 60;
--layer-toast: 70;    /* thông báo luôn nằm trên cùng */
```

Thứ tự chính là luật: tooltip nằm trên modal, toast nằm trên tất cả.

## Breakpoint

Breakpoint là các mốc chiều rộng mà tại đó layout đổi dạng. Tailwind CSS có bộ mặc định:

| Tên | Từ |
|---|---|
| `sm` | 40rem (640px) |
| `md` | 48rem (768px) |
| `lg` | 64rem (1024px) |
| `xl` | 80rem (1280px) |
| `2xl` | 96rem (1536px) |

Hai điểm nên nhớ:

- **Mobile first.** `md:flex` nghĩa là "flex từ 768px trở lên". Viết layout nhỏ trước, rồi bổ sung cho màn hình lớn.
- **Viết breakpoint bằng rem.** Khi người đọc tăng cỡ chữ mặc định, breakpoint kích hoạt sớm hơn, và layout chuyển sang dạng hẹp đúng lúc chữ cần thêm chỗ.

Container query đi thêm một bước: component đổi layout theo chiều rộng của khung chứa nó, không theo màn hình. Cách này rất hợp với design system, vì một Card không thể biết trước mình sẽ nằm trong sidebar hẹp hay cột chính rộng.

## Motion

Chuyển động trong giao diện có ba việc: cho biết cái gì vừa thay đổi, cho biết thứ gì đến từ đâu, và làm thao tác có phản hồi. Trang trí không nằm trong số đó.

Một thang ngắn đủ cho phần lớn sản phẩm. Ví dụ:

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--duration-fast` | 100ms | hover, đổi màu |
| `--duration-base` | 150 tới 200ms | mở và đóng nhỏ (accordion, dropdown) |
| `--duration-slow` | 250 tới 300ms | overlay, modal, vùng lớn |
| `--ease-standard` | một đường cong cubic-bezier | mọi chuyển động thông thường |

Material 3 có tài liệu về một hệ motion đầy đủ hơn, với nhiều bậc duration và easing theo loại chuyển động, đáng đọc khi sản phẩm cần nhiều hơn.

### Reduced motion

Khi người đọc bật giảm chuyển động trong hệ điều hành, trình duyệt báo qua `prefers-reduced-motion: reduce`. Nếu mọi transition đều đọc token duration, chỉ cần một luật:

```css
@media (prefers-reduced-motion: reduce) {
  :root { --duration-fast: 0ms; --duration-base: 0ms; --duration-slow: 0ms; }
}
```

Một ngoại lệ cần cân nhắc: spinner. Spinner đứng yên trông như ứng dụng bị treo, nên làm chậm lại thay vì dừng hẳn. Tiêu chí 2.3.3 Animation from Interactions (cấp AAA) của WCAG 2.2 nói đúng về nhu cầu này.

## Lỗi hay gặp

- **Giá trị gần đúng** như 13px, 15px, 18px rải khắp code. Mỗi cái là một quyết định không ai ghi lại.
- **Kích thước giữa các component không khớp,** vì mỗi component tự định nghĩa sm và md của riêng nó.
- **z-index không có thang,** sửa overlay này thì vỡ overlay kia.
- **Animation dài.** Trên 300ms cho một tương tác nhỏ là thấy chậm.
- **Quên xử lý reduced motion.**

## Nguồn

- W3C, [Understanding SC 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), WCAG 2.2.
- W3C, [Understanding SC 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html), WCAG 2.2.
- Material Design 3, [Spacing](https://m3.material.io/foundations/layout/grids-spacing/spacing).
- Material Design 3, [Motion](https://m3.material.io/styles/motion/overview).
- Apple Human Interface Guidelines, [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility).
- shadcn/ui, [Theming](https://ui.shadcn.com/docs/theming).
- Tailwind CSS, [Responsive design](https://tailwindcss.com/docs/responsive-design).
- MDN, [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).
- MDN, [Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries).

← Bài trước: [Typography: type scale đặt tên theo vai](/vi/articles/ds-05-typography/) · Bài sau: [Thiết kế component: anatomy, variant và API](/vi/articles/ds-07-component-design/) →
