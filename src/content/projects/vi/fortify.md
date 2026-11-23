---
title: "Fortify - Insurance CRM"
role: "Senior UI/UX Designer"
year: "2026"
summary: "CRM cho một đại lý bảo hiểm ở Mỹ, tôi đi từ research nghiệp vụ tới một front-end chạy được trong ba ngày cùng Claude Code: viết đủ 201 user story trước, rồi dựng hết từng story một."
cover: "/projects/accountkit/fortify.png"
facts:
  Năm: "2026"
  Thời gian: "3 ngày"
  Vai trò: "Senior UI/UX Designer"
  Team: "Một mình, cùng Claude Code"
  Công cụ: "Claude Code, Impeccable, React"
  Demo: "https://crm.ontheshore.biz"
  Mã nguồn: "https://github.com/nguucode/fortify"
order: 3
draft: false
---

Phần lớn những gì tôi làm cho sản phẩm enterprise đều nằm dưới NDA, nên tôi kể được mà không bao giờ cho xem được. Fortify là cách tôi giải quyết chuyện đó. Tôi chọn một lĩnh vực chưa từng làm: một đại lý bảo hiểm độc lập ở Mỹ, bán bảo hiểm nhà, xe và doanh nghiệp qua khoảng mười hãng. Rồi tôi tự đặt một luật: **viết xong cả sản phẩm trước khi dựng bất kỳ màn hình nào, sau đó để Claude Code dựng từ chính những gì tôi đã viết.** Ba ngày sau, đại lý đó có một CRM chạy được trên dữ liệu giả lập, ai cũng mở ra xem được.

## Học một nghề mình chưa biết gì

Tôi bắt đầu đúng như khi nhận một dự án thật: tìm hiểu đại lý làm việc thế nào. Hai lượt research đi qua quy trình hằng ngày từ lead tới báo giá, ký hợp đồng, phục vụ khách và tái tục, cùng cách các CRM và hệ thống quản lý đại lý hiện có sắp xếp màn hình. Tôi dựa vào nguồn gốc như cơ quan quản lý bảo hiểm của từng bang, hiệp hội đại lý độc lập và tài liệu hướng dẫn của các hệ thống quản lý đại lý lớn, và đánh dấu rõ chỗ nào là tôi suy luận chứ không phải trích nguồn.

Research đổi hướng sản phẩm trước khi tôi vẽ gì. Đại lý vốn đã quản lý policy, kỳ hạn và hoa hồng trong một hệ thống quản lý đại lý, và không ai muốn giữ thêm một bản thứ hai cho khớp. Nên Fortify không tìm cách thay hệ thống đó. **Nó đứng cạnh, hiển thị policy ở dạng chỉ đọc kèm dấu đã đồng bộ, và lo phần việc xung quanh:** lead, cơ hội bán và báo giá, tái tục như một đầu việc, yêu cầu dịch vụ, chứng nhận bảo hiểm và bồi thường.

## Viết sản phẩm ra trước khi vẽ

Trước màn hình đầu tiên, tôi chốt object model, bốn role (Producer, Account Manager, Principal và Admin) cùng quyền của từng role, và sitemap. Từ đó backlog thành 16 epic và 201 user story, story nào cũng có acceptance criteria và đủ trạng thái trống, đang tải, lỗi, cộng thêm khoảng 45 luật nghiệp vụ có ghi nguồn. Texas và Florida có luật riêng cho những chuyện như khi nào đại lý được nhắn tin cho khách, và những luật đó cũng được viết thành luật, không để thành phỏng đoán nằm trong một màn hình nào đó.

Spec nằm ngay trong sản phẩm. Fortify có menu Product đọc chính các file đó, hiện sitemap, object model, role, glossary và từng story kèm trạng thái. Người review có thể đối chiếu bất kỳ màn hình nào với story sinh ra nó mà không phải rời app.

## Hai quyết định định hình các màn hình

- **Ngày hết hạn là trục của công việc.** Đại lý sống theo ngày mỗi policy kết thúc, nên mỗi dòng trong danh sách Accounts có một dải mười hai tháng cho thấy các kỳ hạn hết vào lúc nào. Producer lướt một trang khách là thấy ba tháng tái tục sắp tới, không cần mở gì.
- **Một màu xanh, chỉ dành cho hành động.** Giao diện mượn ngữ pháp của một dashboard cho developer: bề mặt yên tĩnh, bảng dày và một màu nhấn duy nhất. Xanh nghĩa là "bạn bấm được ở đây"; trạng thái, rủi ro và giai đoạn dùng cách thể hiện khác, nên một màn hình đầy dữ liệu vẫn có một bước tiếp theo rõ ràng.

## Dựng cùng Claude Code

Tôi chia story thành từng đợt build và cho mỗi đợt chạy qua Claude Code cùng Impeccable, một skill design review lại màn hình đã dựng theo một hướng thiết kế viết sẵn. Các luật nghiệp vụ như "chốt được cơ hội thì tạo kỳ hạn đã ký, chờ hệ thống của đại lý" được viết test trước, và dự án kết thúc với 168 test pass cùng lượt quét accessibility tự động (WCAG 2.2 AA) sạch trên mọi route đã quét, cả desktop lẫn mobile.

AI không làm đúng hết. Các vòng review và chính tôi bắt được thanh giai đoạn dùng sai màu xanh, cột bị cắt khi ghim sidebar, logo sai ở header; một số story cần những quyết định mà spec không nói tới, chẳng hạn ai được gộp hai account. Những quyết định đó là việc của tôi, và tôi ghi lại từng cái kèm lý do. **Tốc độ đến từ spec chứ không đến từ model:** story nào rõ thì Claude Code dựng đúng ngay lần đầu, story nào mơ hồ thì tôi trả giá ở vòng review.

## Điều một bản demo không chứng minh được

Fortify chưa từng gặp một đại lý thật. Dữ liệu là sinh ra, tích hợp là giả lập, và chưa ai dùng nó giữa mùa tái tục căng thẳng, nên tôi không thể nói nó giúp ai làm việc tốt hơn. Điều nó cho thấy là cách tôi làm một sản phẩm enterprise mà tôi được phép chia sẻ: research trước, một bản spec mà team có thể dựng theo, và AI dùng để dựng spec đó chứ không thay cho phần suy nghĩ đằng sau.

## Màn hình

<div class="gallery" tabindex="0" role="region" aria-label="Màn hình, cuộn ngang">
  <figure class="shot">
    <a href="/projects/accountkit/fortify-pipeline.png"><img src="/projects/accountkit/fortify-pipeline.png" alt="Bảng Pipeline năm giai đoạn và dải cảnh báo cần xử lý" loading="lazy" /></a>
    <figcaption>1 / 6 · Pipeline: Opportunity theo giai đoạn, đánh dấu deal bị đọng</figcaption>
  </figure>
  <figure class="shot">
    <a href="/projects/accountkit/fortify-accounts.png"><img src="/projects/accountkit/fortify-accounts.png" alt="Danh sách Accounts có dải kỳ hạn ở mỗi dòng" loading="lazy" /></a>
    <figcaption>2 / 6 · Accounts: toàn bộ khách, mỗi dòng có dải kỳ hạn 12 tháng</figcaption>
  </figure>
  <figure class="shot">
    <a href="/projects/accountkit/fortify-accounts-detail.png"><img src="/projects/accountkit/fortify-accounts-detail.png" alt="Trang Account của một hộ gia đình với các tab, task đang mở và liên hệ" loading="lazy" /></a>
    <figcaption>3 / 6 · Account: policy, renewal, service và activity ở một chỗ</figcaption>
  </figure>
  <figure class="shot">
    <a href="/projects/accountkit/fortify-renewals.png"><img src="/projects/accountkit/fortify-renewals.png" alt="Danh sách Renewals với hạn hết, mức đổi phí và rủi ro" loading="lazy" /></a>
    <figcaption>4 / 6 · Renewals: việc cần làm trước khi mỗi kỳ hạn hết</figcaption>
  </figure>
  <figure class="shot">
    <a href="/projects/accountkit/fortify-service.png"><img src="/projects/accountkit/fortify-service.png" alt="Bảng yêu cầu Service" loading="lazy" /></a>
    <figcaption>5 / 6 · Service: yêu cầu từ lúc nhận tới lúc xong</figcaption>
  </figure>
  <figure class="shot">
    <a href="/projects/accountkit/fortify-reports.png"><img src="/projects/accountkit/fortify-reports.png" alt="Báo cáo Pipeline với thanh theo giai đoạn và lý do mất deal" loading="lazy" /></a>
    <figcaption>6 / 6 · Reports: pipeline, retention và commission theo role</figcaption>
  </figure>
</div>
