---
title: "Governance và adoption"
date: 2026-05-12
summary: "Các team model, ai quyết định cái gì, tiêu chí đóng góp lọc ý tưởng từ sớm, và những con số cho biết design system có thật sự được dùng."
---

Phần 14/15 của series *Design system từ nền móng*.

Governance là cách một hệ ra quyết định: ai được thêm, sửa, bỏ một thứ, và theo quy trình nào. Adoption là mức hệ thật sự được dùng.

Adoption mới là phép thử thật. Hệ không ai dùng là hệ thất bại, dù làm tốt đến đâu. Governance tốt tồn tại để giữ adoption cao: đủ rõ để người ta tin hệ, đủ nhẹ để người ta không tìm đường vòng.

## Ba team model

Nathan Curtis mô tả ba cách tổ chức người làm design system trong bài [Team Models for Scaling a Design System](https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0) (EightShapes, 2015).

| Mô hình | Cách vận hành | Đánh đổi |
|---|---|---|
| **Solitary** | Một team sản phẩm làm thư viện chủ yếu cho mình; team khác có thể dùng theo | Nhanh, sát nhu cầu thật, nhưng ưu tiên lệch về một sản phẩm và team khác thấy hệ không phải của mình |
| **Centralized** | Một team riêng làm design language và component cho nhiều team sản phẩm, không tự làm sản phẩm | Nhất quán, rõ người chịu trách nhiệm, nhưng dễ xa nhu cầu thật và thành nút thắt |
| **Federated** | Designer từ nhiều team sản phẩm, được chọn vì tầm ảnh hưởng và chuyên môn, cùng quyết định cho hệ mà vẫn ở team mình | Sát nhu cầu, nhiều người cùng sở hữu, nhưng quyết định chậm và cần người điều phối |

Nhiều tổ chức lớn rốt cuộc dùng mô hình lai: một team trung tâm nhỏ giữ nền tảng và quyết định cuối, cộng một mạng lưới người đóng góp từ các team sản phẩm.

Một freelancer hay một người tự làm hệ cho công việc của mình là solitary theo nghĩa đen. Luật vẫn cần viết ra. Người đóng góp tiếp theo có thể là đồng nghiệp mới, một coding agent, hoặc chính người đó sáu tháng sau, khi đã quên vì sao một quyết định được đưa ra.

## Ai quyết định cái gì

Một bảng quyền quyết định đơn giản tránh được rất nhiều tranh cãi.

| Thay đổi | Ai đề xuất | Ai quyết | Cần gì |
|---|---|---|---|
| Sửa lỗi | Bất kỳ ai | Người review | PR và test |
| Thêm variant hoặc semantic token | Bất kỳ ai | Chủ hệ | Lý do và một chỗ dùng thật |
| Component mới | Bất kỳ ai | Chủ hệ | Đạt tiêu chí đóng góp |
| Đổi hoặc bỏ token gốc, đổi brand | Chủ hệ | Chủ hệ và stakeholder | Kế hoạch migrate |
| Breaking change | Chủ hệ | Chủ hệ | Changeset và hướng dẫn nâng cấp |

Nguyên tắc phía sau: thêm thì dễ, đổi hoặc bỏ thì khó. Một semantic token mới trỏ về primitive có sẵn gần như không rủi ro. Đổi một giá trị gốc chạm tới mọi màn hình đang dùng nó.

## Tiêu chí đóng góp: học từ GOV.UK

[GOV.UK Design System](https://design-system.service.gov.uk/community/contribution-criteria/) công khai tiêu chí mà mọi đề xuất phải đạt. Đây là ví dụ công khai rõ ràng nhất để học.

**Khi đề xuất** một component hoặc pattern:

- **Useful (hữu ích).** Có bằng chứng nó giúp được nhiều team hoặc dịch vụ, ví dụ ảnh chụp hay link tới chỗ đang dùng thứ tương tự.
- **Unique (không trùng).** Không trùng thứ đã có. Nếu thay thế cái cũ, phải chứng minh nó tốt hơn.

**Trước khi phát hành:**

- **Usable (dùng được).** Nghiên cứu cho thấy nó hoạt động với nhiều kiểu người dùng, kể cả người khuyết tật.
- **Consistent (nhất quán).** Dùng lại style và component có sẵn, theo style guide và chuẩn code của hệ.
- **Versatile (linh hoạt).** Thích nghi được với nhu cầu khác nhau, đã được test trên nhiều trình duyệt, công nghệ hỗ trợ và thiết bị.

Hai tiêu chí đầu làm nhiều việc nhất. Chúng lọc ý tưởng trước khi ai tốn công làm, nên hệ không phình ra mỗi yêu cầu một component. GOV.UK cũng viết rõ cách [đề xuất một component hoặc pattern](https://design-system.service.gov.uk/community/propose-a-component-or-pattern/), đáng đọc như một mẫu cho quy trình của chính bạn.

## Khi sản phẩm cần thứ hệ chưa có

Chuyện này xảy ra liên tục. Các lựa chọn, từ nhẹ đến nặng:

1. **Dùng cái có sẵn theo cách khác.** Thường câu trả lời nằm ở đây.
2. **Ghép** từ component có sẵn ngay trong sản phẩm, thành một pattern cục bộ.
3. **Lệch có ghi lại.** Làm riêng, ghi lý do, báo cho team hệ.
4. **Đóng góp ngược** khi cùng một chỗ lệch xuất hiện ở nhiều nơi.

Lệch không phải vấn đề. Lệch âm thầm mới là vấn đề. Hệ cần biết sản phẩm đi đường riêng ở đâu để quyết định có nên mở rộng.

## Đo adoption

Không có số liệu thì không ai biết hệ còn sống không.

| Chỉ số | Đo thế nào | Nói lên điều gì |
|---|---|---|
| Tỉ lệ UI dựng từ component của hệ | Quét code sản phẩm, so import từ hệ với component tự viết | Hệ có thay được việc tự làm không |
| Số lần detach trong Figma | [Library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics) của Figma (gói Organization và Enterprise) | Component có đáp ứng nhu cầu thiết kế không |
| Giá trị cứng trong code sản phẩm | Rule lint phía sản phẩm | Token có đủ không |
| Phiên bản đang dùng | `package.json` của từng sản phẩm | Nâng cấp có đủ dễ không |
| Câu hỏi lặp lại | Kênh hỗ trợ | Docs thiếu ở đâu |

Một chỉ số nên tránh: số lượng component. Nó đo công sức của team hệ, không đo giá trị ai nhận được.

## Governance khi agent cùng đóng góp

Ngày càng nhiều code của design system do coding agent viết. Agent làm nhanh nhưng không có trí nhớ giữa các phiên và không tự biết luật ngầm. Governance phải được viết ra, và ở đâu có thể thì để máy kiểm.

| Luật | Viết ở đâu | Máy kiểm? |
|---|---|---|
| Component chỉ đọc semantic token | Hướng dẫn cho agent (`AGENTS.md`, `CLAUDE.md`) cộng rule Stylelint | Có, thành lỗi lint |
| Token sửa ở nguồn, không sửa file sinh ra | Hướng dẫn cho agent | Có, lệnh kiểm token trong CI |
| Các bước làm component mới (spec, code, test, changeset, status) | Checklist hoặc skill trong repo | Một phần, qua CI và review |
| Ai được merge | Branch protection hoặc ruleset | Có, GitHub chặn |
| Việc nào agent tự làm, việc nào cần người | File governance | Không, dựa vào agent đọc |

Bài học này đúng cả với team người: luật nào quan trọng thì chuyển từ trí nhớ sang một cái máy chặn vi phạm. Luật chỉ nằm trong docs sẽ bị quên. Luật nằm trong lint và CI thì không.

## Lỗi hay gặp

- **Hệ thành cảnh sát.** Chỉ biết nói không, và team sản phẩm bỏ đi tự làm.
- **Không có đường đóng góp.** Người muốn giúp không biết bắt đầu từ đâu.
- **Không đo adoption**, nên cứ tưởng hệ đang được dùng.
- **Quyết định không được ghi lại.** Sáu tháng sau cùng một câu hỏi lại được tranh luận từ đầu. Ghi quyết định lớn thành ADR (Architecture Decision Record).

## Nguồn

- Nathan Curtis, *Team Models for Scaling a Design System* (EightShapes, 2015): https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0
- GOV.UK Design System, Contribution criteria: https://design-system.service.gov.uk/community/contribution-criteria/
- GOV.UK Design System, Propose a component or pattern: https://design-system.service.gov.uk/community/propose-a-component-or-pattern/
- Figma Help Center, View and explore library analytics: https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics

← Bài trước: [Versioning và phát hành design system](/vi/articles/ds-13-versioning-and-releases/) · Bài sau: [Glossary và đọc gì tiếp](/vi/articles/ds-15-glossary-and-next-steps/) →
