---
title: "Viết documentation cho design system"
date: 2026-03-31
summary: "Trang component cần trả lời những câu nào, viết guideline sao cho giúp người đọc chọn đúng, và phần docs nào nên để code tự sinh thay vì viết tay."
---

Phần 11/15 của series *Design system từ nền móng*.

Docs là giao diện người dùng của design system. Component tốt mà docs tệ thì người ta vẫn dùng sai, hoặc lặng lẽ làm lại một cái mới vì không biết đã có sẵn. Một trang component hữu ích trả lời ba câu: nó là gì, nó được làm thế nào, và khi nào nên dùng. Phần giá trị nhất thường là "khi nào không dùng" cùng các cặp Do và Don't, vì đó là nơi chứa phán đoán, thứ code không chứa được. Cái gì code đã biết, như props hay giá trị token, thì để code sinh ra thay vì gõ tay.

## Docs phục vụ ai

| Người đọc | Cần gì | Đọc phần nào |
|---|---|---|
| Designer | Chọn đúng component, biết variant nào cho tình huống nào | Overview, Guidelines |
| Developer | Props, ví dụ code, hành vi, accessibility | Specs (API), ví dụ |
| PM, QA | Hành vi mong đợi, các state | Guidelines, Specs (state) |
| Người đóng góp | Vì sao component như vậy, ngoại lệ nào đã chốt | Specs, lịch sử quyết định |
| AI agent | Luật rõ, tên chính xác | Tất cả, nhất là phần có cấu trúc |

Dòng cuối mới nhưng có thật: agent đọc docs để viết code bằng hệ. Nội dung có cấu trúc như bảng và tên chính xác giúp agent nhiều hơn văn xuôi dài.

## Cấu trúc trang component

### Material 3: chia tab theo người đọc

Material 3 chia mỗi trang component thành các tab **Overview**, **Specs**, **Guidelines** và **Accessibility**.

| Tab | Chứa |
|---|---|
| **Overview** | Component là gì, các variant, link tài nguyên (Figma, source) |
| **Specs** | Anatomy, kích thước, màu (token nào), state, API |
| **Guidelines** | Khi nào dùng, Do và Don't, cách dùng đúng |
| **Accessibility** | Bàn phím, screen reader, contrast |

Lý do chia tab: mỗi người đọc vào thẳng phần mình cần, bỏ qua phần còn lại.

### GOV.UK: chia mục theo câu hỏi

Trang component của GOV.UK Design System đi theo đúng các câu người ta hay hỏi: *When to use this component* (khi nào dùng), *When not to use this component* (khi nào không), *How it works* (hoạt động thế nào), và nhiều trang có *Research on this component* (nghiên cứu cho thấy gì). Có hai điểm mạnh: khẳng định nào cũng có bằng chứng, và mục "khi nào không dùng" luôn có mặt.

Không cần chọn một trong hai. Cách kết hợp tốt là tab của Material, nội dung bên trong theo câu hỏi kiểu GOV.UK.

## Viết guideline

### Khi nào dùng, khi nào không

Mục này phải giúp người đọc chọn giữa các component trông gần giống nhau. Ví dụ với switch:

- Dùng switch khi thay đổi có hiệu lực ngay, như bật thông báo.
- Không dùng switch trong form có nút Lưu. Dùng checkbox, vì checkbox nghĩa là "chọn bây giờ, gửi sau".

Câu "switch dùng để bật tắt" không giúp được ai, vì checkbox cũng bật tắt.

### Do và Don't

Một cặp Do và Don't tốt:

- Có hình ở cả hai phía, giống nhau mọi thứ trừ đúng điểm cần dạy.
- Có một dòng lý do. "Don't: đặt hai nút primary cạnh nhau. Người dùng không biết hành động nào là chính."
- Mỗi cặp chỉ dạy một điều.

Nếu docs viết bằng MDX, nên làm một block dùng chung (ví dụ `<DoDont>`) để trang nào cũng cùng định dạng.

### Viết cho dễ lướt

- Câu ngắn, thể chủ động.
- Điều quan trọng nhất đặt lên đầu.
- Dùng đúng thuật ngữ đã định nghĩa trong glossary của hệ.
- Ví dụ thật thay cho lorem ipsum.

## Status: cho người dùng biết nên tin tới đâu

Component nào cũng nên có status. Một thang hay gặp:

| Status | Nghĩa |
|---|---|
| Experimental | Đang thử, API có thể đổi, dùng thì chấp nhận rủi ro. |
| Beta hoặc candidate | Đã dùng thật ở vài nơi, đang chờ ổn định. |
| Stable | Có cam kết: đổi API phải qua quy trình breaking change. |
| Deprecated | Sắp bỏ, có hướng dẫn chuyển đổi. |

Thang status giúp hệ ra mắt sớm mà vẫn trung thực. Component experimental có đổi thì cũng không ai bất ngờ.

## Storybook

Storybook là môi trường phát triển và viết tài liệu cho component UI, được nhiều design system dùng. Các khái niệm chính:

| Khái niệm | Là gì |
|---|---|
| **Story** | Một trạng thái của component, viết theo Component Story Format (CSF): mỗi export là một story |
| **Args** | Giá trị prop của story, chỉnh trực tiếp trong panel Controls |
| **argTypes** | Mô tả từng prop: kiểu, lựa chọn, giải thích. Viết một lần ở đây là dùng lại được cho bảng props và công cụ khác. |
| **MDX** | Markdown kèm JSX, để viết trang docs có component chạy thật bên trong |
| **Autodocs** | Trang docs sinh tự động từ story và type của component |
| **Play function** | Kịch bản tương tác chạy trên story, dùng làm test được (xem [Testing và cổng chất lượng](/vi/articles/ds-12-testing-and-quality/)) |

Điểm hay nhất: một story làm ba việc. Nó là ví dụ trong docs, là môi trường phát triển, và là test case. Viết một lần.

## Docs sinh từ code

Cái gì code đã có thì đừng chép tay vào docs:

- **Bảng props** sinh từ type TypeScript và argTypes.
- **Bảng token** render thẳng từ file token, đổi token là docs đổi theo.
- **Ví dụ code** lấy từ story.

Rồi cho máy kiểm. Một script `docs:check` trong CI có thể chặn trang docs thiếu mục bắt buộc, ví dụ thiếu "When not to use". Cùng tư duy với lint token: luật đã viết ra thì để máy kiểm.

## Docs nằm ở đâu

Docs đi kèm code, như README và MDX của component, nên nằm cùng repo và cùng version với code: ai cài version nào thì đọc docs của version đó. Còn quyết định, research và lịch sử tranh luận có thể nằm ở nơi khác (wiki, ADR, app ghi chú), vì đó là lịch sử dự án, không cần đi theo package.

## Lỗi hay gặp

- **Docs chỉ có props.** Dev biết gọi thế nào nhưng không biết khi nào nên gọi.
- **Chỉ có ví dụ hoàn hảo.** Chữ ngắn, dữ liệu đẹp. Hãy thêm ví dụ chữ dài, tiếng Việt, rỗng, lỗi.
- **Docs viết tay lệch với code.** Prop đã đổi tên mà docs vẫn ghi tên cũ.
- **Không có mục "khi nào không dùng".**
- **Không có status**, người dùng không biết component nào đáng tin.

## Nguồn

- [Material Design 3, Buttons (tab Overview, Specs, Guidelines, Accessibility)](https://m3.material.io/components/buttons/overview)
- [GOV.UK Design System, Radios](https://design-system.service.gov.uk/components/radios/)
- [Storybook, How to document components](https://storybook.js.org/docs/writing-docs)
- [Storybook, Component Story Format](https://storybook.js.org/docs/api/csf)
- [Storybook, ArgTypes](https://storybook.js.org/docs/api/arg-types)

← Bài trước: [Nối design và code](/vi/articles/ds-10-design-and-code/) · Bài sau: [Testing và cổng chất lượng](/vi/articles/ds-12-testing-and-quality/) →
