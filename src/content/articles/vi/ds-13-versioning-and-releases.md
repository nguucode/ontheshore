---
title: "Versioning và phát hành design system"
date: 2026-04-28
summary: "Thế nào là breaking change trong design system, viết release note sao cho người nâng cấp làm theo được, và bỏ một thứ đi mà không làm vỡ sản phẩm."
---

Phần 13/15 của series *Design system từ nền móng*.

Số version là một lời hứa. Nó cho người dùng hệ biết có nâng cấp an toàn được không mà không cần đọc gì thêm.

Với design system, lời hứa đó không chỉ bao API của component. Đổi tên token, đổi cấu trúc DOM hay đổi kích thước component vài pixel đều có thể làm vỡ sản phẩm, và không cái nào hiện thành lỗi type.

## Semantic Versioning

Phần lớn package JavaScript theo [Semantic Versioning](https://semver.org/). Với version dạng MAJOR.MINOR.PATCH, tăng:

- **MAJOR** khi thay đổi không tương thích ngược.
- **MINOR** khi thêm chức năng mà vẫn tương thích ngược.
- **PATCH** khi sửa lỗi mà vẫn tương thích ngược.

Luật hay bị quên là mục 4 của đặc tả: version 0.y.z là giai đoạn phát triển ban đầu. Mọi thứ có thể đổi bất cứ lúc nào, và API công khai không nên được coi là ổn định.

Như vậy người dùng bản 0.x không có tín hiệu nào cả, nên nhiều thư viện tự thêm quy ước: breaking thì tăng MINOR (0.7 lên 0.8), còn lại tăng PATCH. Từ 1.0 trở đi mới áp dụng semver đầy đủ.

## Cái gì là breaking trong design system

| Thay đổi | Breaking? |
|---|---|
| Đổi tên hoặc bỏ prop | Có. Code sản phẩm không biên dịch, hoặc mất tác dụng mà không báo. |
| Đổi giá trị mặc định của prop | Thường có. Hành vi đổi dù sản phẩm không sửa gì. |
| Đổi tên hoặc bỏ token | Có, và im lặng. CSS đọc một custom property không tồn tại sẽ rơi về giá trị dự phòng, không báo lỗi. |
| Đổi giá trị token | Tùy. Màu đậm hơn một chút thì không. Đổi một bậc spacing từ 16px sang 20px thì mọi layout dùng nó đều xê dịch. |
| Đổi cấu trúc DOM hoặc class | Có thể. Sản phẩm có thể có CSS ghi đè hoặc test dựa vào cấu trúc đó. |
| Sửa lỗi accessibility | Thường không, nhưng nên ghi rõ. Tên accessible mới có thể làm hỏng test đang tìm theo tên cũ. |
| Thêm prop, variant hoặc token | Không. |

Dòng token là dòng hay bị xem nhẹ nhất. Đổi tên prop thì TypeScript báo lỗi ngay. Đổi tên token thì CSS im lặng, và người phát hiện đầu tiên thường là người dùng cuối đang nhìn một màn hình vỡ.

## Changesets

[Changesets](https://github.com/changesets/changesets) là công cụ quen thuộc để quản lý version và changelog trong repo JavaScript. Quy trình có hai nửa:

1. Mỗi pull request có thay đổi đến tay người dùng thêm một file nhỏ vào `.changeset/` (chạy `npx changeset`), ghi package nào, tăng loại gì, mô tả.
2. Khi phát hành, Changesets gom các file đó, tính version mới cho từng package theo mức tăng cao nhất, viết `CHANGELOG.md` và xóa các file đã dùng.

Giá trị nằm ở thời điểm. Ghi chú được viết ngay trong pull request, bởi người làm thay đổi, lúc chi tiết còn nhớ rõ. Không ai phải ngồi nhớ lại cả tháng thay đổi vào ngày release.

### Viết changeset cho người nâng cấp

Một changeset minh họa cho việc đổi tên token ở thư viện 0.x:

```md
---
"my-design-system": minor
---

Breaking: token `--surface-subtle` đổi tên thành `--surface-muted`.
Giá trị giữ nguyên (gray-50 ở light, gray-800 ở dark), nên contrast
của `--muted-foreground` trên nó không đổi.
Cách nâng cấp: tìm và thay `--surface-subtle` bằng `--surface-muted`
trong CSS. Tên cũ không còn được xuất ra.
```

Nó làm đủ bốn việc: nói rõ là breaking, nói cái gì đổi, nói cái gì không đổi, và nói chính xác người đọc phải làm gì.

Với thay đổi hình ảnh không đổi API, nên có một mục riêng kiểu "Visual changes, no API changes", liệt kê component nào đổi và đổi gì, để người nâng cấp biết phải kiểm màn hình nào.

## Deprecation: bỏ một thứ cho tử tế

Đừng xóa một API công khai trong một bước. Trình tự hợp lý:

1. **Đánh dấu deprecated.** Ghi trong docs và trong code. Tag TSDoc [`@deprecated`](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) làm editor gạch ngang tên. Với token, [Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/) có thuộc tính `$deprecated`.
2. **Đưa đường thay thế.** Nói rõ dùng gì thay và đổi thế nào. Nếu việc đổi là cơ học, kèm một codemod, tức script tự sửa code sản phẩm.
3. **Giữ thêm một thời gian.** Ít nhất một bản minor trước 1.0, hoặc tới bản major kế tiếp sau 1.0.
4. **Xóa**, và ghi việc xóa là breaking.

Trước 1.0, khi ít người dùng, đổi thẳng kèm hướng dẫn nâng cấp rõ ràng là chấp nhận được. Sau 1.0, bỏ qua giai đoạn deprecated là đánh mất lòng tin.

## Hai kênh phân phối

| | npm package | Copy-source registry |
|---|---|---|
| Cách dùng | Cài package, import component | CLI chép mã nguồn component vào sản phẩm |
| Cập nhật | Nâng version | Chép lại, tự merge với chỗ đã sửa |
| Tùy biến | Qua prop, token, className | Sửa thẳng mã nguồn |
| Hợp với đội muốn | Nhất quán, ít tùy biến | Sở hữu code, tùy biến sâu |
| Versioning quan trọng | Rất quan trọng | Ít hơn: sản phẩm tự chọn lúc chép |

[shadcn/ui](https://ui.shadcn.com/docs/registry) làm mô hình copy-source phổ biến và cho phép ai cũng dựng registry riêng theo cùng định dạng. Một hệ có thể chạy cả hai kênh: component phát hành qua npm, còn pattern và template, thứ sản phẩm gần như luôn phải sửa lại, chỉ đi qua registry (xem [Phần 2](/vi/articles/ds-02-mental-models/) về chỗ đứng của pattern và template).

Khi làm registry, khai báo đúng dependency giữa các item và kiểm chúng trong CI. Thiếu một dependency là người dùng chép component về và gặp lỗi import.

## Lỗi hay gặp

- **Coi đổi tên token là refactor.** Với người dùng, đó là breaking change.
- **Changelog viết cho dev của hệ.** "Refactor useFoo hook" không nói gì với người dùng. "Select không còn đóng khi cuộn" thì có.
- **Release quá thưa.** Thay đổi dồn lại, nâng cấp thành cả một dự án, không ai muốn xếp lịch làm.
- **Không có lộ trình lên 1.0.** Hệ ở 0.x mãi thì người dùng không bao giờ có cam kết ổn định.

## Nguồn

- Semantic Versioning 2.0.0: https://semver.org/
- Changesets: https://github.com/changesets/changesets
- shadcn/ui, Registry: https://ui.shadcn.com/docs/registry
- TypeScript, JSDoc Reference (`@deprecated`): https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
- W3C Design Tokens Community Group, Design Tokens Format Module 2025.10 (`$deprecated`): https://www.designtokens.org/tr/2025.10/format/

← Bài trước: [Testing và cổng chất lượng](/vi/articles/ds-12-testing-and-quality/) · Bài sau: [Governance và adoption](/vi/articles/ds-14-governance-and-adoption/) →
