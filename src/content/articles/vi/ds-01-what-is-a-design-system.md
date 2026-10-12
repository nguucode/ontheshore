---
title: "Design system là gì, và khi nào cần"
date: 2025-11-04
summary: "Design system là một bộ quyết định giao diện dùng chung, đóng gói để người khác dùng lại: gồm những phần nào, khác UI kit hay component library ở đâu, và một team thật sự cần đến mức nào."
---

Phần 1/15 của series *Design system từ nền móng*.

Design system là một bộ quyết định về giao diện được dùng chung và đóng gói để người khác dùng lại: token, component, pattern, tài liệu, và quy trình giữ cho tất cả còn đúng.

Một file Figma không phải design system. Một thư viện code cũng không. Cả hai chỉ là chỗ cất các quyết định. Giá trị nằm ở chỗ quyết định một lần, dùng ở mọi nơi, và khi cần đổi thì sửa ở một chỗ.

Team nhỏ, một sản phẩm, giao diện còn đang đổi thì chưa cần bản đầy đủ. Một bộ token và vài component là đủ để bắt đầu.

## So sánh với một chuỗi quán cà phê

Thử nghĩ tới một chuỗi cà phê có 30 chi nhánh.

- **Công thức pha** (bao nhiêu gram cà phê, bao nhiêu ml sữa) là **token**: giá trị gốc mà chi nhánh nào cũng theo.
- **Một món trong menu** là **component**: ghép từ công thức, thành phẩm hoàn chỉnh, khách gọi tên là có.
- **Combo buổi sáng** (cà phê kèm bánh) là **pattern**: nhiều món ghép lại cho một tình huống quen thuộc.
- **Sổ tay vận hành** (món nào phục vụ lúc nào, món nào không cho đá) là **documentation và guideline**.
- **Quy trình đổi công thức** (ai được đổi, chi nhánh được báo ra sao, có bao lâu để chuyển) là **governance và versioning**.

Có công thức mà không có quy trình đổi thì sau sáu tháng mỗi chi nhánh pha một kiểu. Design system thường chết theo đúng cách đó: không phải vì thiếu component, mà vì không ai giữ cho quyết định còn được làm theo.

## Mấy khái niệm hay bị lẫn

| Thuật ngữ | Là gì | Thiếu gì |
|---|---|---|
| **Style guide** | Tài liệu mô tả màu, chữ, logo, giọng văn | Không có component dùng được, không có code |
| **UI kit** | File thiết kế chứa sẵn thành phần giao diện, thường là Figma | Chỉ có phía thiết kế: không code, không luật dùng |
| **Component library** | Thư viện code các component (React, Vue...) | Thường thiếu lý do, guideline và mối nối với thiết kế |
| **Pattern library** | Tập hợp cách giải các bài toán UI lặp lại, như form đăng nhập hay bảng dữ liệu | Thường không có tầng token bên dưới |
| **Design system** | Tất cả những thứ trên, nối với nhau bằng token chung, có tài liệu, có quy trình thay đổi | |

Cách kiểm tra nhanh: nếu màu chính của thương hiệu đổi, phải sửa tay bao nhiêu chỗ? Nếu câu trả lời là "một chỗ, rồi Figma và code cùng đổi theo" thì đó là design system. Nếu là "phải đi tìm" thì đó mới là một bộ sưu tập.

## Sáu phần của một design system

Hầu hết các hệ công khai lớn (Material của Google, Carbon của IBM, Polaris của Shopify, GOV.UK Design System) đều có sáu phần giống nhau, chỉ khác tên gọi.

1. **Foundations.** Màu, chữ, khoảng cách, bo góc, đổ bóng, chuyển động, lưới, thể hiện bằng design token. Từ [phần 3](/vi/articles/ds-03-design-tokens/) đến [phần 6](/vi/articles/ds-06-spacing-sizing-layout/) của series nói về phần này.
2. **Components.** Button, Input, Modal, mỗi cái có anatomy, variant, state và API. Xem [phần 7](/vi/articles/ds-07-component-design/).
3. **Patterns.** Cách ghép component cho một tình huống: form, empty state, bảng dữ liệu có bộ lọc. Xem [phần 2](/vi/articles/ds-02-mental-models/).
4. **Documentation.** Khi nào dùng, khi nào không, ví dụ đúng và sai, lưu ý accessibility. Xem [phần 11](/vi/articles/ds-11-documentation/).
5. **Tooling.** Thư viện Figma, package npm, script build token, lint, test. Xem [phần 10](/vi/articles/ds-10-design-and-code/) và [phần 12](/vi/articles/ds-12-testing-and-quality/).
6. **Governance.** Ai quyết định, ai đóng góp, phát hành ra sao, bỏ một component thế nào. Xem [phần 13](/vi/articles/ds-13-versioning-and-releases/) và [phần 14](/vi/articles/ds-14-governance-and-adoption/).

Người mới hay bỏ qua phần 6 nhất. Đó cũng là phần quyết định hệ sống được bao lâu.

## Ví dụ: soi GOV.UK theo sáu phần

GOV.UK Design System của chính phủ Anh rất đáng học vì mọi thứ đều công khai, kể cả cách ra quyết định.

| Phần | GOV.UK có gì |
|---|---|
| Foundations | Mục **Styles**: màu, typography, spacing, layout, icon |
| Components | Mục **Components**: button, radios, date input, error summary... |
| Patterns | Mục **Patterns**, chia theo việc người dùng cần làm: "Ask users for…" (hỏi địa chỉ, ngày sinh), "Help users to…" (tạo tài khoản, kiểm tra lại câu trả lời), và "Pages" (trang lỗi, trang xác nhận) |
| Documentation | Phần lớn trang có "When to use", "When not to use", "How it works", nhiều trang dẫn tới nghiên cứu người dùng |
| Tooling | Package code GOV.UK Frontend, và Prototype Kit để dựng prototype bằng chính component thật |
| Governance | Mục **Community**: tiêu chí đóng góp công khai, quy trình đề xuất component mới ([phần 14](/vi/articles/ds-14-governance-and-adoption/)) |

Điều đáng học: GOV.UK viết phần governance ra công khai như mọi phần khác. Người ngoài đọc là biết một component mới phải chứng minh được gì thì mới được thêm vào.

## Design system giải quyết vấn đề gì

| Vấn đề khi chưa có hệ | Hệ xử lý thế nào |
|---|---|
| Mười màu xám gần giống nhau trong cùng một sản phẩm | Token giới hạn lựa chọn trong các bậc đã định |
| Mỗi màn hình một kiểu nút | Component dùng chung, variant có tên |
| Designer và dev cãi nhau 14px hay 16px | Hai bên cùng đọc một token, cùng một tên |
| Accessibility làm lại ở từng màn | Làm một lần trong component, chỗ nào dùng cũng được hưởng |
| Đổi brand mất hàng tuần | Đổi giá trị token ở một chỗ |
| Người mới không biết theo cái gì | Docs trả lời câu hỏi đó |

Hệ không tự làm sản phẩm đẹp hơn. Nó làm sản phẩm **nhất quán** và **rẻ hơn khi thay đổi**. Một hệ nhất quán nhưng xấu thì xấu ở mọi nơi.

## Khi nào cần, khi nào chưa

Nathan Curtis (EightShapes), người viết nhiều nhất về cách vận hành design system, chia cách tổ chức team làm hệ thành ba mô hình. **Solitary**: một team làm hệ cho sản phẩm của mình, team khác dùng theo. **Centralized**: một team riêng làm hệ cho nhiều team sản phẩm. **Federated**: designer từ nhiều team sản phẩm cùng quyết định. [Phần 14](/vi/articles/ds-14-governance-and-adoption/) đi sâu hơn. Ý chính ở đây: quy mô hệ phải khớp với quy mô tổ chức.

Gợi ý thực tế:

- **Một người, một sản phẩm, giao diện còn đang tìm hướng:** token cơ bản và vài component lõi. Chưa cần docs đầy đủ hay quy trình versioning.
- **Một sản phẩm đã ổn định, team 3 đến 10 người:** token đủ ba tầng, component có test, docs tối thiểu (khi nào dùng, props làm gì).
- **Nhiều sản phẩm, nhiều team:** đủ sáu phần, có người phụ trách hệ, có quy trình đóng góp và phát hành.

Dấu hiệu làm hệ quá sớm: viết docs cho component chưa ai dùng, dựng quy trình review cho team một người, thiết kế token cho năm brand khi mới có một.

## Lỗi hay gặp

- **Coi thư viện Figma là design system.** Figma chỉ là một chỗ chứa. Code không đọc cùng token thì vài tuần sau hai bên đã lệch nhau.
- **Bắt đầu từ component, bỏ qua token.** Component dựng trên giá trị cứng (`#3B82F6`, `16px`) sẽ phải làm lại ngay lần đầu thêm dark mode hay đổi brand.
- **Đo thành công bằng số component.** Hệ có 80 component không ai dùng thua hệ có 15 component mà màn hình nào cũng dùng.
- **Không có người chịu trách nhiệm.** Hệ không có chủ sẽ bị fork ngầm trong từng sản phẩm.

## Nguồn

- [Brad Frost, *Atomic Design*, chương 1 và 2](https://atomicdesign.bradfrost.com/)
- [Nathan Curtis, "Team Models for Scaling a Design System" (EightShapes, 2015)](https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0)
- [Material Design 3](https://m3.material.io/)
- [Carbon Design System (IBM)](https://carbondesignsystem.com/)
- [Shopify Polaris](https://shopify.dev/docs/api/polaris)
- [GOV.UK Design System](https://design-system.service.gov.uk/)
- [GOV.UK Design System, Patterns](https://design-system.service.gov.uk/patterns/)

Bài sau: [Mô hình tư duy để chia tầng design system](/vi/articles/ds-02-mental-models/) →
