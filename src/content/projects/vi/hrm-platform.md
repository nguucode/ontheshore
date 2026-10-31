---
title: "Ba designer, năm mươi developer, một HRM xây quanh cái ghế"
role: "Lead Product Designer"
year: "2024"
summary: "Sản phẩm HRM cho một khách hàng doanh nghiệp, do một đội IT outsourcing chưa từng làm HRM xây dựng. Đã ship và đang được dùng hằng ngày."
facts:
  Năm: "2024"
  Nền tảng: "TODO" # Web / Desktop / Mobile
  Team: "3 designer (tôi và 2 junior), 50 developer"
  Vai trò: "Lead Product Designer, product consultant"
  Thời gian: "TODO"
order: 99
draft: true
---

Hai quyết định chính: xây sản phẩm theo đúng thứ tự mà mô hình ghế đòi hỏi, và làm cho một lần điều chuyển trên hệ thống nhanh ngang với nhắn tin.

## Cả team chưa ai từng làm HRM

- **Domain mới.** Đây là dự án HRM đầu tiên của công ty. Designer, BA hay developer đều chưa từng làm với chuỗi duyệt, cơ cấu tổ chức hay luật nhân sự.
- **Khách đưa yêu cầu, không đưa vấn đề.** Khách mang đến một danh sách feature. Làm đúng từng dòng thì sẽ ra các module không dùng chung một mô hình tổ chức.
- **Tỉ lệ team.** Ba designer làm cùng năm mươi developer. Không thể review tay từng màn hình, nên hệ thống và luật nghiệp vụ phải gánh phần review đó.

## Kết quả

- **Đã ship.** Sản phẩm đang chạy thật, nhân viên của khách dùng hằng ngày.
- **Phạm vi.** TODO: tên các module.
- **Một hệ thống.** Một design system duy nhất, 2 designer junior và cả 50 developer cùng dùng.
- **Không có số liệu sử dụng.** Sản phẩm và dữ liệu thuộc về khách, nên trang này không đưa con số nào ngoài cỡ team.

## Phần của tôi và của team

| Vai | Tôi phụ trách |
|---|---|
| Product consultant | Định hướng sản phẩm và thứ tự các module (Quyết định 1). Tư vấn cho khách cách đưa quy trình nhân sự vào phần mềm, gồm cả mô hình duyệt điều chuyển (Quyết định 2) |
| Lead designer | Các luồng chính, trong đó có điều chuyển (Quyết định 2). Tạo và quản lý design system, dẫn hai designer junior (Quyết định 3) |

## Ghế có trước người

Sản phẩm xây theo mô hình vị trí. Mọi thay đổi trong tổ chức đều đi qua một cái ghế, không đi qua một con người.

- **Người.** Nhân viên, với hồ sơ của riêng họ.
- **Ghế (vị trí).** Một chỗ trong sơ đồ tổ chức, được tạo và duyệt trước khi tuyển ai vào. Ghế tồn tại dù có người ngồi hay đang trống. Phòng ban và quan hệ báo cáo nằm trên ghế.
- **Phân công.** Một người được xếp vào một ghế. Tuyển dụng, thăng chức và điều chuyển đều tạo mới hoặc thay đổi một phân công.

<!-- TODO: sơ đồ Người / Ghế / Phân công -->

## Quyết định 1: xây theo thứ tự mà mô hình ghế đòi hỏi

- **Ràng buộc.** Không ai trong team biết HRM, và danh sách feature của khách không có thứ tự nào. Module nào trong đó, từ tuyển dụng đến điều chuyển, cũng đọc dữ liệu từ ghế.
- **Lựa chọn.** Xây tuần tự theo mô hình ghế: cơ cấu tổ chức và các ghế trước, sau đó mới đến các luồng đưa người vào ghế và chuyển người giữa các ghế.
- **Lý do.** Nếu làm các module sau trước, mỗi module sẽ tự dựng một bức tranh tổ chức riêng, rồi phải ghép lại với nhau sau.
- **Cái giá.** Các sprint đầu ra màn hình thiết lập chứ chưa ra feature mà nhân viên sẽ dùng. Khách phải chờ lâu hơn mới thấy những phần họ yêu cầu nhiều nhất.

## Quyết định 2: điều chuyển trên hệ thống phải nhanh như một tin nhắn

- **Ràng buộc.** Cơ cấu của khách phức tạp, nhiều cấp cao phải duyệt. Điều chuyển diễn ra thường xuyên.
- **Thước đo thật.** Trước khi có sản phẩm, điều chuyển được thống nhất bằng miệng và xác nhận qua chat. Cách đó nhanh, và khách muốn hệ thống cũng nhanh như vậy.
- **Mâu thuẫn.** Hệ thống phải chính xác và lưu vết. Chat nhanh chính vì bỏ qua cả hai.
- **Ai được tạo.** Manager, lead hoặc HR.
- **Ai duyệt.** Việc duyệt đi từ cấp thấp lên cấp cao. Nếu người tạo đã ở cấp cao thì chỉ các cấp trên họ cần duyệt. Một lần điều chuyển cần tối đa năm cấp duyệt.
- **Khách đề xuất.** Duyệt lần lượt từng cấp. Với tối đa năm cấp, một yêu cầu phải chờ từng người duyệt xong mới đến người tiếp theo.
- **Lựa chọn.** Team thuyết phục khách gửi yêu cầu đến tất cả các cấp cần duyệt cùng một lúc. Điều chuyển được thông qua khi đủ duyệt của mọi cấp, theo bất kỳ thứ tự nào.
- **Duyệt ngay nơi mọi người đang nhắn tin.** Bot chat Điều chuyển gửi từng yêu cầu. Chỉ người liên quan đến yêu cầu đó mới thấy tin nhắn, và có thể duyệt ngay trên tin nhắn.
- **Độ chính xác.** Mỗi điều chuyển có ngày hiệu lực, và ghế đích bị khóa trong lúc yêu cầu còn mở, nên hai yêu cầu không thể cùng giành một ghế.
- **Cái giá.** Việc duyệt không còn đi theo thứ tự trên dưới. Một cấp trên có thể duyệt trước khi các cấp dưới kịp xem yêu cầu.

## Quyết định 3: một thư viện Figma, review trong sprint, QA cuối sprint

- **Ràng buộc.** Ba designer, năm mươi developer. Phần lớn màn hình sẽ được dựng mà không có designer ngồi cạnh.
- **Lựa chọn.** Tôi tạo và quản lý một design system trên Figma, review thiết kế của các bạn junior ngay trong sprint, và QA design phần đã dựng vào cuối mỗi sprint.
- **Cái giá.** Chỗ lệch giữa thiết kế và bản dựng chỉ lộ ra ở cuối sprint, nên việc sửa dồn sang sprint sau. Toàn bộ việc review thiết kế của junior cũng dồn qua một người.

## Một lần điều chuyển, từ ghế đến ngày hiệu lực

Sản phẩm đi theo một cái ghế qua các lần thay đổi của nó.

- **Cơ cấu và ghế.** HR dựng phòng ban và các ghế bên trong, mỗi ghế có quan hệ báo cáo riêng. Ghế có thể để trống.
- **Tuyển vào ghế.** Một người được xếp vào một ghế đã duyệt, không bao giờ xếp thẳng vào phòng ban.
- **Tạo yêu cầu điều chuyển.** Manager, lead hoặc HR chọn người và ghế đích, rồi đặt ngày hiệu lực. Ghế đích bị khóa ngay khi gửi yêu cầu.
- **Duyệt.** Mọi cấp cần duyệt nhận yêu cầu cùng lúc, trong sản phẩm và trong bot chat Điều chuyển. Mỗi người duyệt có thể duyệt ở chỗ nào cũng được.
- **Ngày hiệu lực.** Khi đủ duyệt, phân công đổi vào ngày hiệu lực và ghế được mở khóa.

<!-- TODO: màn hình cho từng bước, caption tối đa 80 ký tự, mỗi ảnh trỏ về một quyết định -->

## Nếu làm lại

- **Quyết định 1.** Xây ghế trước là điều giúp khóa ghế ở Quyết định 2 làm được. Tôi sẽ cho khách xem mô hình ghế dưới dạng sơ đồ ngay sprint đầu, để các màn hình thiết lập được hiểu đúng là phần móng, không phải sự chậm trễ.
- **Quyết định 2.** Thước đo là chat, không phải một hệ thống HR khác. Tôi sẽ tìm cách làm tạm của người dùng đằng sau mỗi feature được yêu cầu ngay từ ngày đầu, vì đó là tốc độ người dùng sẽ đem ra so.
- **Quyết định 3.** QA cuối sprint phát hiện chỗ lệch chậm một sprint. Tôi sẽ đưa một phần QA lên sớm hơn, bằng một bộ luật viết sẵn để developer tự kiểm trước khi màn hình đến bước review.
