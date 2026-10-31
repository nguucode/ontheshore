---
title: "Một nguồn token, mọi thay đổi đều được kiểm"
role: "Senior Product Designer"
year: "2026"
summary: "Zweihänder, design system cho React mà tôi dựng lại công khai trong sáu tuần, vì các hệ tôi vận hành ở những công ty trước thuộc NDA. Open source, MIT, đang ở giai đoạn đầu."
facts:
  Năm: "2026"
  Thời gian: "6 tuần"
  Vai trò: "Senior Product Designer"
  Team: "Tôi, cùng agent AI viết phần lớn code"
  Nền tảng: "React, Figma"
  License: "MIT"
  GitHub: "https://github.com/nguucode/zweihander"
  npm: "https://www.npmjs.com/package/zweihander"
  Storybook: "https://zweihander.ontheshore.biz/storybook/"
order: 4
draft: false
---

Ở các công ty trước, tôi là người dựng và vận hành design system, lead team design dùng nó và tư vấn cho khách khi họ muốn thay đổi. Các hệ đó thuộc NDA, nên tôi dựng lại một hệ công khai. Quyết định then chốt là để code làm nguồn token duy nhất và Figma đi theo, để design và code không lệch nhau thêm lần nào nữa.

## Trước khi có hệ thống, mỗi người thiết kế theo một hướng

Ở mọi team tôi vào, design system chưa tồn tại, và cái giá hiện ra ngay trong sản phẩm chứ không nằm trong báo cáo nào.

- **Một component, nhiều phiên bản.** Mỗi designer tự vẽ select, ô ngày, bảng của riêng mình. Engineer dựng theo file nào mở ra trước.
- **Output không đều.** Cùng một khách nhưng màn hình tốt xấu tùy người thiết kế.
- **Design và code lệch nhau.** Không ai trả lời được Figma đúng hay sản phẩm đang chạy đúng.
- **Sửa mà không biết lan đến đâu.** Khách yêu cầu đổi một chỗ, không ai biết màn hình nào bị ảnh hưởng.
- **Accessibility kiểm bằng tay,** nếu có kiểm.

## Bản dựng lại công khai cho thấy gì

Ở các công ty, tôi không có số nào được phép công bố. Thay đổi thì nhìn thấy được: cả team thiết kế theo một hướng, output đều nhau giữa các designer. Với Zweihänder thì mọi thứ đều đo được.

<dl class="stats">
  <div><dt>Component và pattern</dt><dd class="v">62</dd><dd class="src">Entry point trong package.json trên main, 28/10/2026</dd></div>
  <div><dt>Story test xanh</dt><dd class="v">1.956</dd><dd class="src">Chromium, Firefox và WebKit, lượt CI ngày 20/10/2026</dd></div>
  <div><dt>Trang component trong Figma</dt><dd class="v">45</dd><dd class="src">Đủ mọi variant và state, import từ code ngày 19/10/2026</dd></div>
  <div><dt>Token primitive</dt><dd class="v">288</dd><dd class="src">Sinh từ tokens JSON, 130 biến màu Light và Dark trỏ về</dd></div>
</dl>

- **Accessibility được test, không được chứng nhận.** Mọi component có kiểm tra axe tự động, lỗi là build hỏng, cùng play test cho thao tác bàn phím. Đó không phải một lần audit WCAG.
- **Chưa có ai dùng bên ngoài.** Zweihänder chưa có consumer nào được biết, nên tôi không nhận gì về mức sử dụng hay tốc độ.

## Tôi đặt hướng đi và luật chơi, AI viết phần lớn code

Kỹ năng front-end của tôi ở mức cơ bản. Agent AI viết phần lớn code, theo spec, definition of done và quy trình tôi đặt; tôi review và quyết mọi thay đổi.

- **Product owner.** Phạm vi, thứ tự phát hành và thế nào là 1.0. Xem Quyết định 1.
- **Business analyst và design lead.** Spec mà mọi component theo và checklist mà mọi đóng góp phải qua. Ở công ty, đây là quy trình team design và khách của tôi cùng đi qua. Xem Quyết định 2.
- **Designer.** Mọi quyết định về hình ảnh, từ token đến thư viện Figma. Xem Quyết định 3.
- **Maintainer.** Phát hành, CI và sửa thứ bị hỏng. Xem Quyết định 4.

## Một component đi từ spec đến lúc phát hành

Combobox, ô nhập lọc danh sách khi gõ, có mặt trong cả bốn quyết định dưới đây. Mọi component đi cùng một đường:

- **Spec.** Anatomy và danh sách prop từ [uiguideline.com](https://uiguideline.com), spec gốc của cả bộ kit.
- **Tài liệu.** Một trang MDX trong Storybook, viết trước code.
- **Code.** Element thuần, style bằng CSS Modules, chỉ đọc token. Hành vi phức tạp lấy từ Base UI.
- **Test.** Story có play test và kiểm tra accessibility, chạy trên ba engine trình duyệt.
- **Phát hành.** Một changeset, một status tag (`experimental` cho đến khi ổn định), rồi một component set tương ứng trong Figma.

Token chia ba tầng: primitive giữ giá trị (màu xanh ở bậc 600), semantic đặt tên theo mục đích (`--primary`), và component chỉ đọc token semantic.

## Quyết định 1: phát hành 31 component trước, không phải 45

- **Ở công ty.** Hệ nào muốn phủ hết từ ngày đầu thì không bao giờ ra được một bản đủ tin để dùng.
- **Phương án.** Làm đủ 45 component theo danh sách của uiguideline, hoặc cắt theo tần suất app nghiệp vụ cần đến.
- **Chọn.** 31 component lõi chia sáu đợt, mỗi đợt một bản 0.x. Production-ready nghĩa là đạt definition of done, có semver, chạy trên bốn trình duyệt và dùng được hoàn toàn bằng bàn phím. Brand nằm ngoài phạm vi. Combobox vào đợt đầu vì đó là ô nhập khó nhất trong form nghiệp vụ.
- **Cái giá.** Table, component màn hình ERP cần nhất, phải chờ đến đợt sau.

## Quyết định 2: mượn spec, và ghi lại mọi chỗ lệch

- **Ở công ty.** Designer và khách tranh luận đi tranh luận lại cùng một component vì không có định nghĩa chung.
- **Phương án.** Tự viết spec cho từng component, hoặc dùng một spec có sẵn bên ngoài.
- **Chọn.** Anatomy và danh sách prop của uiguideline làm spec gốc. Lệch chỗ nào phải ghi lý do. Một quy ước API chung cho mọi component, và definition of done bảy mục: spec, tài liệu, story, play test, accessibility và dark mode, export registry, vùng chạm 44px.
- **Cái giá.** Vài tên prop nghe lạ với developer React.

Checklist này cũng chính là mô hình đóng góp. Sửa một component thành luật cho cả nhóm. Combobox làm nổi phần chữ khớp bằng chữ đậm và gạch chân, không dùng màu, vì màu mất contrast trên dòng đang chọn. Bốn luật căn lề và focus của nó sau đó chuyển vào style dùng chung của nhóm input, nên mọi input khác theo cùng.

## Quyết định 3: code giữ token, Figma đi theo

- **Ở công ty.** Figma và code nói hai kiểu, và mỗi lần lệch là một cuộc họp.
- **Ràng buộc.** Một nguồn sự thật duy nhất, gói Figma Professional (tối đa 10 mode mỗi collection), và gói đó không có Code Connect.
- **Phương án.** Figma làm nguồn, dùng plugin token xuất sang code, hoặc code làm nguồn, đồng bộ sang Figma variables.
- **Chọn.** Token nằm trong JSON ở repo và sinh ra CSS custom properties. Figma variables đồng bộ từ đó. Figma dẫn trước về hình ảnh, không bao giờ về giá trị. Phần hành vi tôi chọn Base UI thay Radix, vì Radix không có Combobox.
- **Cái giá.** Figma chỉ mô phỏng gần đúng code: hover và pressed là lớp phủ chứ không trộn màu, 17 màu accent không làm được mode, radius chưa theo scaling.

## Quyết định 4: pull request lỗi không còn merge được

- **Ở công ty.** Hệ thống xuống cấp âm thầm mỗi khi không ai canh.
- **Chuyện đã xảy ra ở đây.** Workflow test chỉ chạy sau khi push lên main, nên tám pull request được merge khi story test đang đỏ, và chín lần deploy liên tiếp thất bại.
- **Phương án.** Review tay chặt hơn, hoặc để máy chặn.
- **Chọn.** CI kiểm token, registry, type, story test và build trên mọi pull request, và ruleset của nhánh chặn cả merge lẫn push thẳng cho đến khi xanh.
- **Cái giá.** Pull request chậm hơn, và test WebKit chập chờn phải sửa tận gốc thay vì chạy lại.

Khi AI viết phần lớn code, cổng kiểm mới là thứ giữ chất lượng, không phải trí nhớ của người review.

## Hệ thống vận hành ra sao

- **Storybook** ghi tài liệu cho mọi component: cách dùng, bảng prop và story chạy trực tiếp.
- **Registry** cho phép một dự án chép mã nguồn của một component kèm phụ thuộc, thay vì cài cả package.
- **Thư viện Figma** có biến màu cho Light và Dark, năm preset radius, mode scaling và density, đặt cùng tên với CSS.
- **Theme preset** đổi accent, radius và scaling từ một wrapper, không đụng vào code component.

## Những gì tôi lược bỏ

Các hệ tôi dựng ở công ty trước: tên, khách hàng, màn hình, và những ngành hẹp đến mức đoán ra được. Mọi hình và số trên trang này đều từ Zweihänder.

## Nếu làm lại

- **Quyết định 4.** Cổng kiểm lẽ ra phải có từ commit đầu tiên, ở đây và ở mọi công ty trước.
- **Quyết định 3.** Tôi đánh giá thấp những gì Figma không diễn tả được. Lần sau tôi sẽ liệt kê các khoảng hở đó trước khi chọn hướng đồng bộ, không phải sau.
- **Quyết định 1.** Tôi sẽ đưa Table vào sớm hơn. Đó là component chứng minh một hệ đã sẵn sàng cho việc ERP.
- **Làm việc với AI.** Luật càng rõ, AI càng làm đúng ngay lần đầu. Việc của tôi chuyển từ vẽ component sang viết luật cho chúng.

<!-- TODO: add figures for the domain section (component lifecycle, three token tiers) and each decision, then a "## Design" gallery of 7 images (dark mode, Compact density, 5 radius presets, AppShell 3 surfaces, NavSidebar, Avatar and Tag 17 hues, docs home). Images go in public/projects/zweihander/. -->
