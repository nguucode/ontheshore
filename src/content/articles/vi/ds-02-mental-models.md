---
title: "Mô hình tư duy để chia tầng design system"
date: 2025-11-18
summary: "Design system nào cũng xếp thành tầng, thứ nhỏ ghép thành thứ lớn: Atomic Design, cách các hệ công khai lớn chia tầng, và luật duy nhất giữ cho từng tầng dùng lại được."
---

Phần 2/15 của series *Design system từ nền móng*.

Design system nào cũng được xếp thành tầng: thứ nhỏ ghép thành thứ lớn. Mô hình quen thuộc nhất là Atomic Design của Brad Frost, gồm atoms, molecules, organisms, templates, pages.

Luật quan trọng nhất của mọi mô hình tầng là phụ thuộc chỉ đi một chiều. Tầng trên dùng tầng dưới, tầng dưới không bao giờ biết tầng trên tồn tại.

Đặt tên tầng là gì không quan trọng bằng việc cả team hiểu mỗi tên theo cùng một nghĩa.

## Atomic Design trong một bảng

Frost mượn hình ảnh hóa học: nguyên tử ghép thành phân tử, phân tử ghép thành cơ thể. Định nghĩa của ông, diễn lại sát nghĩa:

| Tầng | Định nghĩa | Ví dụ |
|---|---|---|
| **Atoms** | Thành phần UI không chia nhỏ hơn được, viên gạch cơ bản | Một label, một ô input trơn, một nút trơn |
| **Molecules** | Nhóm atom tạo thành component tương đối đơn giản | Ô tìm kiếm gồm label, input và nút |
| **Organisms** | Component tương đối phức tạp, thành một phần riêng của giao diện | Header gồm logo, menu và ô tìm kiếm |
| **Templates** | Component đặt vào layout, cho thấy cấu trúc nội dung | Khung trang danh sách sản phẩm, chưa có data thật |
| **Pages** | Template đổ nội dung thật, cho thấy các biến thể | Cùng trang đó với 3 sản phẩm thật, trạng thái rỗng, trạng thái lỗi |

Frost nói rõ Atomic Design **không phải quy trình tuyến tính**: không cần làm xong hết atoms rồi mới sang molecules. Nó là một cách nhìn, lúc nào cũng có thể zoom vào một phần hoặc zoom ra cả trang.

## Vì sao chia tầng có lợi

Nghĩ tới Lego. Viên gạch 2×4 không biết nó sẽ thành lâu đài hay tàu vũ trụ. Chính vì không biết nên nó dùng được cho cả hai.

Design system cũng vậy.

- **Button không được biết nó nằm trong Modal.** Một khi Button có logic kiểu "ở trong Modal thì margin khác", Button không còn dùng lại được, và Modal không đổi được nếu không đụng tới Button.
- **Token không được biết component.** Token tên `danger` thì được. Token tên `button-delete-red` thì không. Xem [phần 3](/vi/articles/ds-03-design-tokens/).

Đây là **luật phụ thuộc một chiều**. Vẽ ra:

```
Foundations (token)
      ▲ được dùng bởi
Components (Button, Input, Modal)
      ▲ được dùng bởi
Patterns (form đăng nhập, bảng có bộ lọc)
      ▲ được dùng bởi
Templates (một trang quản trị hoàn chỉnh)
      ▲ được dùng bởi
Sản phẩm thật
```

Mũi tên chỉ đi lên. Thấy mũi tên nào đi xuống (component đọc trạng thái của pattern, token mang tên component) là có chỗ cần sửa.

## Các hệ lớn chia tầng thế nào

Không hệ công khai lớn nào dùng nguyên tên của Atomic Design. Nhưng cấu trúc bên dưới gần như giống nhau.

| Atomic Design | Material 3, Carbon (IBM), GOV.UK |
|---|---|
| (tầng nền dưới atoms) | Material: Foundations và Styles. Carbon: Elements (color, type, spacing…). GOV.UK: Styles |
| Atoms và molecules | Components, cả ba hệ |
| Organisms | Material: không có tầng riêng. Carbon và GOV.UK: Patterns |
| Templates và pages | Material: không có. Carbon: template trong một số kit. GOV.UK: pattern cấp trang ("Pages") |

Một chi tiết đáng để ý: GOV.UK chia pattern thành ba loại theo phạm vi. Hỏi người dùng một thông tin (địa chỉ), giúp người dùng làm xong một việc (tạo tài khoản), và cả một trang (trang lỗi). Chia pattern theo **việc người dùng cần làm** là thói quen đáng học khi viết pattern cho hệ của mình.

## Button là atom hay molecule?

Câu này bị tranh cãi nhiều hơn mức cần. Có hai cách hiểu, cách nào cũng hợp lý.

- **Theo Frost:** nút trơn là atom; nút có icon và label là molecule.
- **Theo góc nhìn code:** trong React, Button đã là một đơn vị hoàn chỉnh, có API, state và accessibility. Thứ thật sự không chia nhỏ được là một giá trị màu hay một bậc khoảng cách, tức là **token**. Vì vậy nhiều hệ coi token là tầng atoms, còn mọi component (kể cả Badge, Divider) nằm chung một tầng phía trên.

Cách thứ hai có một lợi thế: mỗi tầng ứng với một **đơn vị phát hành**.

| Tầng | Phát hành qua (ví dụ) |
|---|---|
| Foundation | File token (CSS, JSON) |
| Component | Package npm |
| Pattern, template | Copy mã nguồn (registry), vì sản phẩm hay phải sửa theo mình |

Chọn cách nào cũng được, miễn là viết định nghĩa vào glossary kèm một dòng nói rõ nó *không* phải là gì. Nếu hệ có một nhóm tên "Basics" chứa Badge và Divider, hãy ghi rõ đó vẫn là component, không phải atoms của Atomic Design.

## Category: chia ngang trong một tầng

Tầng chia hệ theo chiều dọc, từ nhỏ tới lớn. Category chia theo chiều ngang: cùng tầng, khác công dụng. Một cách chia phổ biến: Buttons, Inputs, Controls (checkbox, switch, radio), Navigation, Data display, Feedback, Overlays (modal, popover, tooltip), Loaders.

Category giúp người dùng **tìm** được thứ cần. Nó không đổi luật phụ thuộc: component trong Overlays vẫn dùng được component trong Buttons.

## Lỗi hay gặp

- **Cãi nhau một thứ là molecule hay organism.** Tốn thời gian, không giúp ai. Chọn một, ghi lại, đi tiếp.
- **Component biết quá nhiều về chỗ nó được dùng.** Dấu hiệu là prop kiểu `isInHeader`, `insideCard`. Thay bằng prop mô tả hình thức (`size`, `variant`), hoặc để tầng trên tự bọc.
- **Đóng gói pattern cứng như component.** Pattern khác nhau giữa các sản phẩm nhiều hơn component. Khóa cứng thì team nào cũng phải fork.
- **Bỏ qua tầng template và page.** Chỉ khi đổ data thật (tên dài, danh sách rỗng, một nghìn dòng) mới biết component có chịu nổi không.

## Nguồn

- [Brad Frost, *Atomic Design*, chương 2 "Atomic Design Methodology"](https://atomicdesign.bradfrost.com/chapter-2/)
- [GOV.UK Design System, Patterns](https://design-system.service.gov.uk/patterns/)
- [Carbon Design System, Patterns](https://carbondesignsystem.com/patterns/overview/)
- [Material Design 3, Components](https://m3.material.io/components)

← Bài trước: [Design system là gì, và khi nào cần](/vi/articles/ds-01-what-is-a-design-system/) · Bài sau: [Design token: ba tầng và một định dạng chung](/vi/articles/ds-03-design-tokens/) →
