---
title: "Design token: ba tầng và một định dạng chung"
date: 2025-12-02
summary: "Design token là một quyết định thiết kế có tên: ba tầng primitive, semantic, component, cách đặt tên, định dạng DTCG 2025.10, và pipeline từ JSON ra CSS và Figma."
---

Phần 3/15 của series *Design system từ nền móng*.

Token là **một quyết định thiết kế có tên**. Viết `--danger` thay cho `oklch(57.7% 0.245 27.325)`.

- Token chia ba tầng: **primitive** (giá trị thô), **semantic** (ý nghĩa), **component** (chỉ khi thật sự cần). Component đọc tầng semantic.
- Tên token nói **dùng để làm gì**, không nói **trông thế nào**: `danger`, không phải `red`.
- Từ tháng 10/2025 đã có định dạng chung: **Design Tokens Format Module 2025.10** của W3C Design Tokens Community Group. File JSON viết theo chuẩn này đọc được bằng nhiều công cụ.

## Token là gì, nói cho dễ hiểu

Nghĩ tới tủ thuốc trong nhà. Nếu chai nào cũng chỉ ghi công thức hóa học thì chẳng ai dám lấy. Cái nhãn "thuốc hạ sốt" mới là thứ người ta dùng. Hôm nay trong chai là hãng này, tháng sau đổi hãng khác, nhãn vẫn vậy, không ai phải học lại.

Token chính là cái nhãn đó.

- Giá trị (`oklch(57.7% 0.245 27.325)`) có thể đổi.
- Tên (`danger`) giữ nguyên.
- Chỗ nào dùng cũng gọi theo tên, nên đổi giá trị một lần là mọi chỗ đổi theo.

Material 3 tóm lại thế này: token là viên gạch của mọi thành phần UI, và **cùng một token được dùng trong thiết kế, công cụ và code**. Vế sau mới là phần quan trọng. Token chỉ có giá trị khi Figma và code gọi cùng một tên.

## Ba tầng token

| Tầng | Trả lời câu hỏi | Ví dụ |
|---|---|---|
| **Primitive** (Material gọi là *reference*) | "Có những giá trị nào?" | `gray-500`, `red-600`, `space-4` = 16px |
| **Semantic** (Material gọi là *system*) | "Giá trị này dùng để làm gì?" | `foreground`, `danger`, `border`, `muted-foreground` |
| **Component** | "Component này có gì khác thường?" | `button-primary-bg` |

Ai được đọc tầng nào: primitive chỉ được token semantic đọc, token semantic được component đọc, còn token component chỉ chính component đó đọc.

Material Web để lộ cả ba tầng ngay trong tên biến CSS: `--md-ref-*` cho reference, `--md-sys-*` cho system, và token theo component, ví dụ:

```css
--md-filled-button-container-shape
```

Một ví dụ, đọc từ dưới lên:

```
primitives.json   red.600  = oklch(57.7% 0.245 27.325)
                     ▲ alias
semantic.json     danger   = {red.600}
                     ▲ được đọc bởi
Alert.module.css  background: var(--danger);
```

Component `Alert` không biết đỏ là gì. Nó chỉ biết "danger". Nếu sau này quyết định danger dùng `red.700` cho đủ contrast, chỉ cần sửa một dòng trong file semantic.

### Vì sao không cho component đọc thẳng primitive

Vì primitive không mang ý nghĩa. Nếu Button lấy `gray-500` làm viền và Input cũng vậy, thì khi muốn viền Input đậm hơn (để đạt contrast 3:1 chẳng hạn) mà sửa `gray-500`, Button cũng đổi theo. Hai thứ trông giống nhau hôm nay **chưa chắc là cùng một quyết định**.

Luật này nên để máy chặn, không chỉ ghi trong docs. Cách thường dùng là một rule lint cho CSS (Stylelint), báo lỗi khi file style của component gọi `var(--gray-500)` hay bất kỳ primitive nào. [Phần 12](/vi/articles/ds-12-testing-and-quality/) nói kỹ hơn.

### Khi nào mới tạo token tầng component

Chỉ khi một component thật sự lệch khỏi tầng semantic và chỗ lệch đó cần chỉnh riêng, ví dụ một theme chỉ muốn đổi màu nền tooltip. Tạo sớm quá thì sẽ có hàng trăm token không ai đổi, và người đọc không biết token nào mới quan trọng. Một cách trung gian hữu ích là token theo **nhóm** thay vì theo từng component: `--control-md-height` dùng chung cho Button, Input và Select ([phần 6](/vi/articles/ds-06-spacing-sizing-layout/)).

## Đặt tên token

Quy tắc đầu tiên: **tên nói công dụng**. `color-text-danger` là đúng; `color-text-red` là sai. Hôm nay danger màu đỏ. Mai đổi sang cam thì tên cũ thành nói dối.

Cấu trúc tên thường gặp, đi từ chung tới riêng:

```
[loại]-[vai trò]-[biến thể]-[trạng thái]
color - border  - field     - hover
```

Một số hệ bỏ tiền tố `color-` cho màu. shadcn/ui là một ví dụ: `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--border`, `--ring`. Các loại khác vẫn giữ tiền tố: `--space-*`, `--radius-*`, `--text-*`, `--duration-*`.

Một quy ước đáng mượn từ shadcn/ui: màu luôn đi theo **cặp nền và chữ**. Có `--primary` thì có `--primary-foreground`. Cặp này được đo contrast cùng nhau, nên dùng đúng cặp là chắc chắn chữ đọc được.

### Bẫy khi mượn tên từ hệ khác

Tên dạng số giữa các hệ **không tương thích**. `space.100` của Atlassian là 8px; `space-100` của Polaris là 4px. Đọc docs của hệ nào thì quy đổi về thang của mình, đừng bê nguyên tên.

## Định dạng DTCG 2025.10

Trước năm 2025, mỗi công cụ (Style Dictionary, Tokens Studio, Figma) dùng một định dạng JSON riêng. W3C Design Tokens Community Group phát hành **Design Tokens Format Module 2025.10** ngày 28/10/2025, và tài liệu tự ghi là "considered stable". Đây là báo cáo của Community Group, chưa phải W3C Recommendation chính thức, nhưng đã đủ ổn định để các công cụ làm theo.

Những gì cần biết:

| Khái niệm | Cú pháp | Ý nghĩa |
|---|---|---|
| Token | object có `$value` | Một giá trị có tên |
| Kiểu | `$type` | `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `number`, và các kiểu ghép: `border`, `shadow`, `transition`, `typography`, `gradient`, `strokeStyle` |
| Group | object không có `$value` | Nhóm token, có thể đặt `$type` mặc định cho các token con |
| Alias | `"$value": "{gray.500}"` | Token trỏ sang token khác |
| Mô tả | `$description` | Ghi chú cho người đọc |
| Bỏ dùng | `$deprecated` | Đánh dấu token sắp bỏ |
| Mở rộng | `$extensions` | Dữ liệu riêng của công cụ, đặt khóa theo tên miền đảo ngược |

Một file semantic theo chuẩn này:

```json
{
  "color": {
    "$type": "color",
    "primary": { "$value": "{blue.600}", "$description": "Hành động chính" },
    "primary-foreground": { "$value": "{gray.50}" },
    "danger": { "$value": "{red.600}" }
  }
}
```

Dấu `$` ở đầu dùng để phân biệt thuộc tính của token với tên của token con. Không có `$` thì một token tên `value` sẽ đụng với thuộc tính `value`.

## Pipeline: từ JSON ra mọi nơi

```
tokens/*.json  (nguồn sự thật)
     │  build (Style Dictionary hoặc script riêng)
     ▼
tokens.css  (CSS custom properties)  ──► component đọc var(--...)
     │
     └──► đồng bộ sang Figma variables (plugin, API, hoặc làm tay)
```

Ba điều giúp pipeline đáng tin:

1. **Chỉ một nguồn.** Chọn JSON (hoặc Figma) làm nguồn, bên còn lại chỉ đọc. Không bao giờ sửa tay file CSS sinh ra.
2. **Có lệnh kiểm tra.** Một bước `tokens:check` trong CI báo lỗi khi file CSS lệch với JSON.
3. **Có lint ở chỗ dùng.** Lint chặn component đọc primitive hoặc đọc token không tồn tại. Gõ sai tên kiểu `var(--primay)` sẽ âm thầm rơi về giá trị mặc định của trình duyệt; chỉ lint mới bắt được.

**Style Dictionary**, do Amazon khởi xướng và nay là dự án mã nguồn mở, là công cụ phổ biến nhất để build token ra nhiều nền tảng: CSS, iOS, Android. Nếu chỉ nhắm tới web, một script ngắn là đủ.

## Token không chỉ là màu

| Loại | Ví dụ tên | Phần |
|---|---|---|
| Màu | `--background`, `--primary`, `--danger-subtle` | [4](/vi/articles/ds-04-color/) |
| Chữ | `--text-body`, `--leading-body`, `--font-sans` | [5](/vi/articles/ds-05-typography/) |
| Khoảng cách | `--space-1` đến `--space-12` | [6](/vi/articles/ds-06-spacing-sizing-layout/) |
| Kích thước | `--control-sm`, `--control-md`, `--icon-md` | [6](/vi/articles/ds-06-spacing-sizing-layout/) |
| Bo góc | `--radius-sm`, `--radius-md`, `--radius-control` | [6](/vi/articles/ds-06-spacing-sizing-layout/) |
| Chuyển động | `--duration-fast`, `--ease-standard` | [6](/vi/articles/ds-06-spacing-sizing-layout/) |
| Lớp | `--layer-overlay`, `--layer-toast` | [6](/vi/articles/ds-06-spacing-sizing-layout/) |
| Focus | `--focus-width`, `--focus-offset` | [8](/vi/articles/ds-08-accessibility/) |

## Lỗi hay gặp

- **Đặt tên token theo hình thức** (`blue`, `big`, `rounded`). Đổi thiết kế là tên sai.
- **Quá nhiều token semantic na ná nhau.** Mỗi token mới là một quyết định người dùng phải hiểu. Trước khi thêm, hỏi xem đã có token nào làm đúng việc này chưa.
- **Đổi tên token mà không coi là breaking change.** Với người dùng hệ, CSS đọc tên cũ sẽ hỏng âm thầm. Xem [phần 13](/vi/articles/ds-13-versioning-and-releases/).
- **Hai nguồn sự thật.** Sửa trong Figma, sửa riêng trong code, một tháng sau không ai biết bên nào đúng.

## Nguồn

- [W3C Design Tokens Community Group, *Design Tokens Format Module 2025.10* (28/10/2025)](https://www.designtokens.org/tr/2025.10/format/)
- [Material Design 3, Design tokens](https://m3.material.io/foundations/design-tokens/overview)
- [Material Web, Theming (biến `--md-ref-*`, `--md-sys-*` và component token)](https://material-web.dev/theming/material-theming/)
- [Style Dictionary](https://styledictionary.com/)
- [shadcn/ui, Theming (quy ước `background` và `foreground`)](https://ui.shadcn.com/docs/theming)
- [Stylelint](https://stylelint.io/)

← Bài trước: [Mô hình tư duy để chia tầng design system](/vi/articles/ds-02-mental-models/) · Bài sau: [Màu sắc trong design system](/vi/articles/ds-04-color/) →
