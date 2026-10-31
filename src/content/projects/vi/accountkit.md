---
title: "AccountKit v3.0"
role: "Senior Product Designer"
year: "2026"
summary: "Trong thời đại AI, hiện thực hoá ý tưởng và tăng tốc quá trình deliver là ước mơ của rất nhiều team phát triển sản phẩm. Trong vòng 6 tháng, tôi đã xây dựng design system, thiết kế sản phẩm và xây dựng quy trình làm việc với Claude Code, để không chỉ tôi mà cả CEO cũng có thể tự làm ra prototype để thể hiện ý tưởng cho mọi người."
facts:
  Năm: "2026"
  Thời gian: "6 tháng"
  Vai trò: "Senior Product Designer"
  Team: "7 người"
  Công cụ: "Claude Code, Storybook, Figma"
  Phương pháp: "Shape Up, Wayfinder"
order: 2
draft: false
---

AccountKit là công ty SaaS mảng kế toán ở Úc. CEO của AccountKit đặt cho team một kỳ vọng rõ ràng: dùng AI để đưa sản phẩm đến tay người dùng nhanh hơn. Khi nhìn lại quy trình cũ, tôi nhận ra chỗ chậm nhất không nằm ở developer mà nằm ở chính design process. CEO là người có ý tưởng nhưng chỉ truyền đạt bằng miệng, sau đó phải chờ rất lâu từ PO, BA và designer thì mới có một design prototype hoàn chỉnh để review. Vì vậy, đề xuất của tôi trong dự án là **trao khả năng thể hiện ý tưởng cho chính người nghĩ ra nó**, dưới dạng một prototype chạy được, thay vì một file Figma do tôi vẽ.

## Muốn code được thì phải chờ design xong

Trước đây, một tính năng bắt đầu từ buổi họp. CEO kể ý tưởng, BA ghi lại thành spec, rồi tôi dựa vào spec để vẽ trên Figma. Qua mỗi lần chuyển tay như vậy, ý của CEO lại bị hiểu lệch đi một chút, có khi BA và tôi mỗi người hiểu theo một kiểu khác nhau, và phải đến khi tôi vẽ xong thì mọi người mới biết mình có đang nói về cùng một thứ hay không.

CEO và PO không biết sử dụng Figma, nên họ không thể tự phác ra điều mình muốn. **Họ chỉ có thể chờ tôi vẽ xong rồi góp ý.** Mỗi tính năng đi qua rất nhiều vòng duyệt và feedback trước khi developer bắt đầu được. Điều này vô tình trở thành nút thắt cho cả team, và cũng là lý do mọi người muốn thử đưa AI vào chính giai đoạn này.

## Trao khả năng cho người có ý tưởng

Tôi muốn bỏ bớt những lần chuyển tay và hiểu nhầm đó, nên đề xuất **để CEO hoặc PO tự làm phiên bản đầu tiên**. Họ không vẽ, mà lắp prototype từ chính các component trong Storybook, cũng là những component developer dùng để ship. Nhờ vậy, prototype không phải là một bản vẽ để ai đó dựng lại từ đầu.

Dù vậy, tôi không bỏ Figma ngay. Khi bắt đầu dự án, tôi vẫn thiết kế trên Figma để CEO duyệt visual style của AccountKit, và AI cũng cần một tiêu chuẩn đã được chốt trước khi bắt đầu dựng bất cứ thứ gì.

## artifact-feature xuất hiện

Để CEO và PO tự dựng được prototype, họ cần một nền tảng có sẵn để lắp ráp. Tôi là product designer và kiêm luôn front-end, nên phần nền tảng đó là việc của tôi. CEO và PO quyết định làm tính năng nào, còn tech lead chịu trách nhiệm chất lượng code.

Việc của tôi là giữ cho mọi prototype được dựng lên từ một nền tảng đúng. Tôi duy trì design system của AccountKit trên Storybook, và component nào cũng có một file `guidelines.md` ghi rõ cách sử dụng. Trên nền tảng đó, tôi viết skill `artifact-feature` cho Claude Code. Skill này lấy component từ Storybook để dựng prototype cho một tính năng, rồi tự audit lại theo luật dùng component. Tôi cũng là người đặt ra quy trình từ lúc có ý tưởng đến lúc ship, và hướng dẫn team bằng các video demo và workshop.

Cũng có những việc không thuộc về tôi. CEO là người hiện thực hoá ý tưởng, còn code của prototype là do AI viết. Chất lượng code thuộc về tech lead, thông qua quy trình code review bằng AI mà tech lead tự dựng cho team.

Cái giá của cách làm này rơi vào chính công việc của tôi. **Tôi gần như không còn vẽ từng màn hình nữa, mà chuyển sang giữ cho hệ thống phía sau luôn đúng:** component, luật, skill và các buổi review.

## Kết hợp với chu kỳ Shape Up và Wayfinder

Team làm việc theo chu kỳ Shape Up. Ở khâu shaping, chúng tôi dùng kỹ thuật Wayfinder của Matt Pocock để breakdown một tính năng thành các ticket, tức những câu hỏi cần chốt trước khi bắt tay vào xây dựng.

Quy trình xây dựng tính năng bắt đầu khi CEO hoặc PO dùng Wayfinder để liệt kê những câu hỏi còn mở, sau đó chạy `artifact-feature` để dựng prototype dưới dạng Claude artifact. Sang khâu betting, cả team ngồi lại review prototype cùng nhau: tôi góp ý về UI và UX, developer nhìn từ phía dữ liệu và integration. Nếu được duyệt, developer nối back-end vào prototype rồi ship, và code đi qua quy trình review bằng AI của tech lead. Cuối cùng, tôi sync các màn hình đã duyệt từ Claude Code sang Figma để lưu trữ và đối chiếu về sau.

<figure class="shot">
  <img src="/projects/accountkit/before-after.vi.svg" alt="Hai luồng đặt cạnh nhau: trước đây ý tưởng đi từ CEO sang spec của BA rồi đến một designer trên Figma; sau đó CEO hoặc PO dựng prototype từ Storybook, team review và developer ship" loading="lazy" />
  <figcaption>Ý tưởng thôi đi bằng lời.</figcaption>
</figure>

## Thử nghiệm với những tính năng đầu tiên

Ở Úc, thông tin về một khách hàng của công ty kế toán nằm rải rác trong rất nhiều app. Sổ sách ở Xero hoặc MYOB. Workflow và tài liệu ở phần mềm quản lý văn phòng như FYI hay Xero Practice Manager. Hồ sơ nộp và thông báo thuế nằm trên cổng dịch vụ trực tuyến của ATO dành cho đại lý thuế, thư đã ký nằm trong app ký điện tử, ghi chú cuộc gọi nằm trong OneNote, còn giấy tờ làm việc thì ở Excel, Word và PDF. Muốn nắm được tình hình của một khách hàng, kế toán phải mở lần lượt nhiều app trong số đó.

Ý tưởng của CEO là khi mở một khách hàng trong AccountKit, kế toán thấy được mọi thứ về họ ở cùng một chỗ, lấy về từ chính những app công ty đang dùng. CEO tự dựng trang khách hàng này thành prototype bằng `artifact-feature` rồi chia sẻ với team. Sau vòng review, tính năng được build và ship.

<!-- Ảnh Claude Design của trang khách hàng đặt ở đây, bổ sung sau. -->

Quy trình thực tế chạy khá trơn tru. CEO và PO vốn đã quen với kỹ thuật và Claude Code, nên chỉ sau một thời gian ngắn họ đã tự làm được prototype. **Ý tưởng đến với team dưới dạng một thứ bấm thử được, không còn phải hình dung qua lời kể.** Prototype sau khi được duyệt cũng không bị bỏ đi: developer nối back-end vào chính phần front-end đó rồi đưa lên production. Qua sáu tháng, cả team học được cách làm việc cùng AI ở mọi khâu, từ ý tưởng sản phẩm, thiết kế cho đến code review.

## Figma không còn là nơi tôi truy cập thường xuyên

Sau giai đoạn pitching, Figma không còn là nơi tôi thiết kế. Tôi dùng nó để đặt các prototype đã duyệt cạnh style gốc mà CEO đã chốt, và chỉ cần nhìn vào là thấy output của AI lệch ở đâu. Khi phát hiện lệch, tôi sửa trực tiếp trên Claude Code chứ không sửa từng màn hình trên Figma. Sửa trên Claude Code rồi sync với Storybook thì những prototype sau sẽ ít bị lỗi hơn.

## AI không phải lúc nào cũng chính xác kể cả khi được hướng dẫn rõ ràng

Component nào trong Storybook cũng có `guidelines.md`, vậy mà AI vẫn dùng sai. Nó đọc được hướng dẫn, nhưng không có gì buộc nó phải làm theo.

Vì vậy, tôi đưa luật dùng component vào thành một bước audit bên trong `artifact-feature`. Prototype nào dựng xong cũng được kiểm tra lại theo các luật này. Diễn đạt lại cho gọn, skill làm việc theo ba nguyên tắc:

- **Chỉ dựng từ Storybook.** Dùng component và token có sẵn ở đó.
- **Làm theo guideline của từng component.** `guidelines.md` nói khi nào nên dùng và khi nào không.
- **Audit trước khi bàn giao.** Kiểm tra từng màn hình đã dựng theo các guideline đó và báo những chỗ vi phạm.

Nhưng audit cũng có giới hạn. Nó bắt được chỗ dùng sai component, chứ không nhận ra một flow sai. Vẫn cần một người hiểu UI và UX nhìn vào prototype, và đó là lý do tôi luôn giữ vai trò này trong mọi buổi review của team.

## Vẫn còn những vấn đề cần phải giải quyết

Nhìn lại, chỗ hổng lớn nhất của quy trình không nằm ở buổi review mà nằm trước đó, lúc CEO bắt đầu viết prompt. Một prototype trông như đã hoàn chỉnh khiến mọi người bỏ qua những câu hỏi mà một bản phác thảo thô sẽ tự đặt ra. Với trang khách hàng, phần lớn góp ý trong buổi review lại đến từ phía kỹ thuật: nếu hệ thống kéo về 10.000 khách hàng thì danh sách hiển thị ra sao, và mỗi integration có cách cấu hình riêng mà prototype không thể hiện hết. Những câu hỏi đó chỉ được nhắc tới khi prototype đã dựng xong, và lúc đó bị xem là vấn đề kỹ thuật. **Không ai góp ý cho CEO về sản phẩm hay UX trước khi prompt,** và quy trình cũng chưa nói rõ một prototype hoàn chỉnh cần có những gì.

<figure class="shot">
  <img src="/projects/accountkit/shape-up-gap.vi.svg" alt="Chu kỳ Shape Up gồm bốn bước: shaping do CEO hoặc PO, betting là buổi review của team, building do developer, Figma làm tham chiếu style; đánh dấu khoảng trống trước shaping và góp ý đến muộn ở review" loading="lazy" />
  <figcaption>Khoảng trống nằm trước lúc prompt, không nằm ở buổi review.</figcaption>
</figure>

## Bài học rút ra

Nếu làm lại, tôi sẽ không dừng ở việc dạy team cách dùng công cụ, vì workshop và video demo về skill là chưa đủ. Tôi sẽ đặt ra một definition of ready cho prototype: trước khi đem ra review, prototype cần thể hiện được happy flow, các edge case như dữ liệu trống, dữ liệu rất lớn hay integration bị lỗi, và các trường hợp validation. Song song đó, tôi sẽ thêm một bước tư vấn UX ngắn ngay trong khâu shaping, để những câu hỏi này được đặt ra trước khi CEO bắt đầu prompt.

Prototype giúp CEO cho cả team thấy ý tưởng thay vì phải kể lại nó, và đó là thay đổi lớn nhất mà quy trình này mang lại. **Nhưng để hoàn thiện một tính năng, cả về UX lẫn kỹ thuật, vẫn cần những người làm chuyên môn đó.**

## Hãy thử với quy trình này (Miễn phí)

Design system và prompt của AccountKit thuộc về công ty, nên tôi không thể đưa ra đây. Cùng quy trình này chạy được trên [Zweihänder](/vi/projects/zweihander/), design system mã nguồn mở của tôi. [Storybook](https://zweihander.ontheshore.biz/storybook/) của nó chính là nguồn component để một prototype được dựng lên.

## Về hình ảnh

Các sơ đồ trong bài là bản dựng lại đã được giản lược. Màn hình, dữ liệu và luật nội bộ của AccountKit không được đưa vào.
