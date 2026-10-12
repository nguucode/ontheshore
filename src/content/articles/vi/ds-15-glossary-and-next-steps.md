---
title: "Glossary và đọc gì tiếp"
date: 2026-05-26
summary: "Lộ trình đọc ba giai đoạn kèm bài tập trên các design system công khai, những hệ đáng đọc, và glossary các thuật ngữ dùng trong cả series."
---

Phần 15/15 của series *Design system từ nền móng*.

Cách học design system nhanh nhất là đọc hệ thật, cả docs lẫn mã nguồn, và tự làm một hệ nhỏ.

Phần cuối này biến series thành một lộ trình ba giai đoạn: nền, xây, và vận hành. Mỗi giai đoạn có danh sách đọc thêm và vài bài tập làm trên hệ công khai, không cần dự án riêng. Cuối bài là glossary mọi thuật ngữ đã dùng trong series.

## Giai đoạn 1: Nền

Các phần: [1](/vi/articles/ds-01-what-is-a-design-system/), [2](/vi/articles/ds-02-mental-models/), [3](/vi/articles/ds-03-design-tokens/), [4](/vi/articles/ds-04-color/), [5](/vi/articles/ds-05-typography/), [6](/vi/articles/ds-06-spacing-sizing-layout/), [8](/vi/articles/ds-08-accessibility/).

Đọc thêm:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): đọc trang [Understanding](https://www.w3.org/WAI/WCAG22/Understanding/) của từng tiêu chí nhắc ở Phần 8, không cần đọc cả chuẩn.
- [Radix Colors](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale): phần palette composition.
- [Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/): mục types và aliases.

Bài tập:

1. Mở [trang Theming của shadcn/ui](https://ui.shadcn.com/docs/theming), chọn 5 biến màu. Viết một câu về công dụng của từng biến, rồi đoán nó ứng với bậc nào trong thang 12 bước của Radix.
2. Dùng một công cụ đo contrast, đo màu chữ phụ (`muted-foreground`) trên nền trang (`background`) và trên nền phụ (`muted`) của shadcn/ui, ở cả light và dark. Ghi lại tỉ lệ.
3. Viết tay một file token DTCG nhỏ: một ramp xám 5 bậc và 4 semantic token alias về ramp đó.

## Giai đoạn 2: Xây

Các phần: [7](/vi/articles/ds-07-component-design/), [9](/vi/articles/ds-09-theming-and-modes/), [10](/vi/articles/ds-10-design-and-code/), [11](/vi/articles/ds-11-documentation/), [12](/vi/articles/ds-12-testing-and-quality/).

Đọc thêm:

- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/): pattern Dialog, Combobox và Tabs.
- Mã nguồn một component của [Base UI](https://base-ui.com/) hoặc [Radix Primitives](https://www.radix-ui.com/primitives), ví dụ Dialog.
- [Docs Storybook về viết test](https://storybook.js.org/docs/writing-tests).

Bài tập:

1. Chọn một component trên [Material Design 3](https://m3.material.io/). Vẽ anatomy và bảng các trục variant của nó.
2. Chỉ dùng bàn phím, đi qua Select, Dialog và Tabs trên trang docs của Radix hoặc Base UI. Ghi lại phím nào làm gì, focus đi đâu, rồi so với APG.
3. Trong playground của [Radix Themes](https://www.radix-ui.com/themes), đặt `scaling` về 90% và `radius` về `full`. Kiểm xem vùng bấm nhỏ nhất còn đủ 24px không, và ô nhập có biến thành hình viên thuốc không.

## Giai đoạn 3: Vận hành

Các phần: [13](/vi/articles/ds-13-versioning-and-releases/), [14](/vi/articles/ds-14-governance-and-adoption/).

Đọc thêm:

- [Semantic Versioning](https://semver.org/), đọc hết. Nó ngắn.
- Mục Community của [GOV.UK Design System](https://design-system.service.gov.uk/community/): cách họ nhận đề xuất, tiêu chí, và lịch sử thảo luận trên GitHub.
- Bài của Nathan Curtis về [team model](https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0).

Bài tập:

1. Đọc changelog của một thư viện lớn (Radix, MUI, Base UI) ở một bản major. Với mỗi breaking change, tự hỏi người nâng cấp có biết chính xác phải làm gì không.
2. Đọc một đề xuất component trên GitHub của GOV.UK Design System. Nó đưa bằng chứng gì để đạt tiêu chí useful và unique?
3. Liệt kê 5 luật design system thường chỉ nằm trong docs. Với mỗi luật, đề xuất một cách để máy kiểm.

## Hệ nên đọc

| Hệ | Đọc để học |
|---|---|
| **[Material Design 3](https://m3.material.io/)** (Google) | Token ba tầng (reference, system, component), cấu trúc trang component, motion. Rất đầy đủ, có nhiều quy ước riêng của Android. |
| **[Carbon](https://carbondesignsystem.com/)** (IBM) | Sản phẩm enterprise dày dữ liệu và các pattern của nó. Gần nhu cầu B2B. |
| **[Polaris](https://polaris.shopify.com/)** (Shopify) | Guideline viết nội dung và UI cho trang admin. Đang chuyển sang web components. |
| **[GOV.UK Design System](https://design-system.service.gov.uk/)** | Nghiên cứu người dùng, accessibility và quy trình đóng góp. Hình ảnh đơn giản, phương pháp rất chặt. |
| **[Atlassian Design System](https://atlassian.design/)** | Token màu đặt tên theo mức nhấn, từ subtlest đến boldest. Số trong tên token spacing khác các hệ khác, đọc cẩn thận. |
| **[Radix](https://www.radix-ui.com/)** (Colors, Primitives, Themes) | Thang màu 12 bước và theming theo trục. |
| **[Base UI](https://base-ui.com/), [React Aria](https://react-spectrum.adobe.com/react-aria/)** | Hành vi accessible của headless primitive. Đọc mã nguồn và test. |
| **[shadcn/ui](https://ui.shadcn.com/)** | Mô hình copy-source, registry, quy ước đặt tên token. |

## Glossary

| Thuật ngữ | Nghĩa ngắn | Phần |
|---|---|---|
| **ADR** | Architecture Decision Record: ghi lại một quyết định lớn và lý do | [14](/vi/articles/ds-14-governance-and-adoption/) |
| **Alias** | Token trỏ sang token khác thay vì mang giá trị riêng | [3](/vi/articles/ds-03-design-tokens/) |
| **Anatomy** | Bản vẽ tháo rời component, đánh số từng phần | [7](/vi/articles/ds-07-component-design/) |
| **APCA** | Thuật toán contrast được đề xuất trong quá trình soạn WCAG 3; không phải chuẩn tuân thủ | [4](/vi/articles/ds-04-color/) |
| **APG** | ARIA Authoring Practices Guide: hành vi chuẩn cho từng loại widget | [8](/vi/articles/ds-08-accessibility/) |
| **ARIA** | Thuộc tính bổ sung ngữ nghĩa cho công nghệ hỗ trợ | [8](/vi/articles/ds-08-accessibility/) |
| **Atomic Design** | Mô hình 5 tầng: atoms, molecules, organisms, templates, pages | [2](/vi/articles/ds-02-mental-models/) |
| **Breaking change** | Thay đổi bắt người dùng phải sửa code của họ | [13](/vi/articles/ds-13-versioning-and-releases/) |
| **Breakpoint** | Mốc chiều rộng màn hình mà layout đổi | [6](/vi/articles/ds-06-spacing-sizing-layout/) |
| **Changeset** | File ghi một thay đổi và mức tăng version, được gom lại khi release | [13](/vi/articles/ds-13-versioning-and-releases/) |
| **Code Connect** | Tính năng Figma nối component Figma với code thật | [10](/vi/articles/ds-10-design-and-code/) |
| **Component** | Thành phần UI dùng lại được, có API | [7](/vi/articles/ds-07-component-design/) |
| **Composition** | Cách ghép component: config (truyền data) hoặc compound (lồng con) | [7](/vi/articles/ds-07-component-design/) |
| **Container query** | Layout đổi theo kích thước khung chứa, không theo màn hình | [6](/vi/articles/ds-06-spacing-sizing-layout/) |
| **Contrast ratio** | Tỉ lệ độ chói giữa hai màu, từ 1:1 đến 21:1 | [4](/vi/articles/ds-04-color/) |
| **Control tier** | Bậc kích thước khóa cùng lúc height, padding, icon và radius | [6](/vi/articles/ds-06-spacing-sizing-layout/) |
| **Controlled, uncontrolled** | State do người dùng component giữ, hoặc do component tự giữ | [7](/vi/articles/ds-07-component-design/) |
| **Density** | Mức dày đặc của giao diện | [9](/vi/articles/ds-09-theming-and-modes/) |
| **Deprecation** | Đánh dấu sắp bỏ, kèm đường thay thế | [13](/vi/articles/ds-13-versioning-and-releases/) |
| **Detach** | Tách instance Figma khỏi component gốc; từ đó không nhận cập nhật | [10](/vi/articles/ds-10-design-and-code/) |
| **DTCG** | Design Tokens Community Group của W3C, nhóm soạn chuẩn định dạng token | [3](/vi/articles/ds-03-design-tokens/) |
| **Elevation** | Độ cao thị giác, thường thể hiện bằng shadow | [6](/vi/articles/ds-06-spacing-sizing-layout/) |
| **Focus ring** | Viền cho biết phần tử nào đang nhận bàn phím | [8](/vi/articles/ds-08-accessibility/) |
| **Foundation** | Token và quy ước nền: màu, chữ, khoảng cách... | [1](/vi/articles/ds-01-what-is-a-design-system/), [2](/vi/articles/ds-02-mental-models/) |
| **Governance** | Cách hệ ra quyết định và nhận đóng góp | [14](/vi/articles/ds-14-governance-and-adoption/) |
| **Headless primitive** | Thư viện cho hành vi, không kèm style (Base UI, Radix, React Aria) | [7](/vi/articles/ds-07-component-design/) |
| **Mode** | Một bộ giá trị cố định trên một trục: light hoặc dark, compact hoặc comfortable | [9](/vi/articles/ds-09-theming-and-modes/) |
| **OKLCH** | Color space theo độ sáng, độ rực và góc màu, gần với cách mắt người cảm nhận | [4](/vi/articles/ds-04-color/) |
| **Pattern** | Cách ghép component cho một tình huống lặp lại | [2](/vi/articles/ds-02-mental-models/) |
| **Play function** | Kịch bản tương tác chạy trên story, dùng luôn làm test | [12](/vi/articles/ds-12-testing-and-quality/) |
| **POUR** | Bốn nguyên tắc WCAG: Perceivable, Operable, Understandable, Robust | [8](/vi/articles/ds-08-accessibility/) |
| **Primitive token** | Giá trị thô, không mang ý nghĩa, ví dụ `gray-500` | [3](/vi/articles/ds-03-design-tokens/) |
| **Ramp** | Dãy bậc từ nhạt đến đậm của một màu | [4](/vi/articles/ds-04-color/) |
| **Registry** | Kênh phát hành copy-source kiểu shadcn | [13](/vi/articles/ds-13-versioning-and-releases/) |
| **Scaling** | Hệ số phóng toàn bộ kích thước (Radix Themes: 90% đến 110%) | [9](/vi/articles/ds-09-theming-and-modes/) |
| **Semantic token** | Token mang vai trò, ví dụ `danger` hay `border`; tầng mà component được đọc | [3](/vi/articles/ds-03-design-tokens/) |
| **Semver** | Quy ước version MAJOR.MINOR.PATCH | [13](/vi/articles/ds-13-versioning-and-releases/) |
| **Solitary, centralized, federated** | Ba team model để vận hành design system | [14](/vi/articles/ds-14-governance-and-adoption/) |
| **Source of truth** | Nơi duy nhất được sửa một loại quyết định | [10](/vi/articles/ds-10-design-and-code/) |
| **Space toggle** | Kỹ thuật CSS dùng `initial` hoặc giá trị rỗng làm công tắc cho theme lồng nhau | [9](/vi/articles/ds-09-theming-and-modes/) |
| **Status** | Mức tin cậy của component: experimental, stable, deprecated | [11](/vi/articles/ds-11-documentation/) |
| **Story** | Một trạng thái của component trong Storybook | [11](/vi/articles/ds-11-documentation/) |
| **Target size** | Kích thước vùng bấm; WCAG 2.5.8 yêu cầu ít nhất 24 x 24 CSS pixel | [6](/vi/articles/ds-06-spacing-sizing-layout/), [8](/vi/articles/ds-08-accessibility/) |
| **Template** | Trang ghép từ pattern và component, chạy trên data giả | [2](/vi/articles/ds-02-mental-models/) |
| **Theme** | Tổ hợp lựa chọn trên nhiều trục theming | [9](/vi/articles/ds-09-theming-and-modes/) |
| **Token** | Một quyết định thiết kế có tên | [3](/vi/articles/ds-03-design-tokens/) |
| **Variable (Figma)** | Token phía thiết kế, có collection, mode và scope | [10](/vi/articles/ds-10-design-and-code/) |
| **Variant** | Biến thể của component; nên chia theo các trục độc lập | [7](/vi/articles/ds-07-component-design/) |
| **Visual regression test** | So ảnh chụp với ảnh gốc để bắt thay đổi hình ảnh ngoài ý muốn | [12](/vi/articles/ds-12-testing-and-quality/) |
| **WCAG** | Chuẩn accessibility của W3C; bản hiện hành là 2.2 | [4](/vi/articles/ds-04-color/), [8](/vi/articles/ds-08-accessibility/) |

## Nguồn

- [W3C, Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C WAI, Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/)
- [W3C WAI, ARIA Authoring Practices Guide, Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [W3C Design Tokens Community Group, Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/)
- [Radix Colors, Understanding the scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)
- [Radix Themes](https://www.radix-ui.com/themes)
- [shadcn/ui, Theming](https://ui.shadcn.com/docs/theming)
- [Storybook, Writing tests](https://storybook.js.org/docs/writing-tests)
- [Semantic Versioning 2.0.0](https://semver.org/)
- [GOV.UK Design System, Community](https://design-system.service.gov.uk/community/)
- [Nathan Curtis, *Team Models for Scaling a Design System* (EightShapes, 2015)](https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0)
- Các phần trước trong series đều có mục nguồn riêng ở cuối bài.

← Bài trước: [Governance và adoption](/vi/articles/ds-14-governance-and-adoption/)
