---
title: "Một sản phẩm, có giá riêng cho từng nước nhận hàng"
role: "Product Owner, BA và Lead Product Designer"
year: "2023"
summary: "Một marketplace nhiều người bán, do một team outsource chưa từng làm e-commerce xây dựng, chuyển sang bán xuyên biên giới giữa chừng: hàng nằm ở Việt Nam, bán cho người mua ở nước ngoài."
facts:
  Nền tảng: "Web app, Mobile app"
  Team: "Tôi và 2 designer, cùng CEO, tech lead và PO phía khách"
  Vai trò: "Product Owner, BA, Lead Product Designer"
  Thời gian: "3 năm, ship theo quý"
order: 0
draft: true
---

Quyết định then chốt là gắn mọi quy tắc theo quốc gia vào sản phẩm thay vì vào quốc gia, sau khi seller trong vòng MVP test không quản lý nổi danh mục được tổ chức theo chiều ngược lại.

## Cross-border đến khi marketplace nội địa đã dựng xong

- **Domain mới với cả team.** Khách muốn một marketplace kiểu Shopee. Ở công ty outsource chưa ai từng làm e-commerce, nên mô hình sản phẩm phải tự xây, không có dự án cũ để chép.
- **Đổi hướng giữa chừng.** Khi buyer app, công cụ cho seller và admin nội địa đã gần xong, khách quyết định thử bán xuyên biên giới trước: hàng vẫn ở Việt Nam, người mua đặt từ nước khác.
- **Quy tắc mà mô hình nội địa không có.** Phí ship, khả năng bán và chi phí giờ thay đổi theo nước nhận. Mọi sản phẩm, đơn hàng và màn hình đã làm đều mặc định chỉ có một quốc gia.

## Kết quả đã ship

Trang này không có số liệu: dự án thuộc NDA, và ước lượng lại bây giờ chỉ là đoán.

- **Cross-border chạy trên chính nền tảng đang có.** Danh mục nội địa được thêm một lớp quốc gia, không dựng hệ thống thứ hai bên cạnh.
- **Cấu trúc sản phẩm được quyết định bằng test, không bằng ý kiến.** Cấu trúc đầu tiên bị bỏ sau MVP test, trước khi lan ra mọi màn hình.
- **Web app, mobile app và admin dùng chung một design system,** nên các designer khác dựng được màn hình cross-border mới mà không cần tôi vẽ từng màn.

## Phần của tôi và của team

Tôi làm ở phía vendor, kiêm bốn vai. CEO, tech lead và PO phía khách quyết định cuối cùng; engineering chịu trách nhiệm kiến trúc.

- **Định hướng sản phẩm.** Tôi tư vấn cho khách nên làm gì trước, và lập lại roadmap khi cross-border xuất hiện.
- **Business analysis.** Tôi chuyển yêu cầu của khách thành quy tắc: cấu trúc sản phẩm, trạng thái đơn hàng và phí gắn với từng quốc gia.
- **Design.** Tôi tự thiết kế các flow sản phẩm phía seller và review mọi màn hình các designer khác làm.
- **Design system.** Tôi dựng nó và vận hành quy trình thêm hoặc sửa component và pattern.

## Một đơn cross-border đi qua những bước nào

- **Product.** Một listing của seller, kèm các biến thể.
- **Country.** Mỗi nước mà sản phẩm giao tới có phí dropship riêng, đặt theo từng quốc gia.
- **Order.** Trạng thái thanh toán và trạng thái giao hàng được theo dõi riêng, theo cách của Shopify.
- **Fulfilment.** Giống dropshipping: seller ở Việt Nam chỉ đóng gói và gửi hàng khi người mua ở nước ngoài đã đặt.
- **Ngoài phạm vi bài này.** Voucher, campaign, đổi trả và payout có trong nền tảng nhưng không được kể ở đây.

<!-- TODO hình: sơ đồ Product → Country → Variants và hai trục trạng thái của order (bản dựng lại) -->

## Quyết định 1: thử cross-border trên lõi nội địa, rồi chạy cả hai

Khách muốn thử cross-border khi roadmap nội địa chưa xong. Tôi chia việc thành ba giai đoạn trên cùng một nền tảng, không tách thành sản phẩm riêng.

- **Giai đoạn 1: lõi nội địa.** Buyer app, công cụ cho seller và admin, đủ để nhận và giao đơn trong Việt Nam.
- **Giai đoạn 2: thử cross-border.** Thêm quốc gia và phí dropship vào chính các sản phẩm và đơn hàng đó.
- **Giai đoạn 3: một nền tảng cho cả hai.** Bán nội địa và bán xuyên biên giới song song.
- **Cái giá.** Tính năng voucher và campaign lùi sang các bản phát hành sau để nhường chỗ cho đợt thử.

## Quyết định 2: mượn trạng thái order của Shopify thay vì tự nghĩ ra

Khi trong công ty chưa ai có kinh nghiệm e-commerce, một mô hình đơn hàng tự thiết kế từ đầu sẽ bỏ sót những trường hợp mà các nền tảng lâu năm đã giải xong.

- **Vấn đề.** Một dòng trạng thái duy nhất sẽ vỡ khi thanh toán và giao hàng đi độc lập, mà với cross-border thì đúng là vậy: đơn đã thanh toán vẫn có thể đang chờ gửi từ Việt Nam.
- **Lựa chọn.** Tách trạng thái thanh toán và trạng thái giao hàng theo mô hình Shopify, phần giao hàng chạy theo kiểu dropshipping.
- **Cái giá.** Seller phải học nhiều hơn so với một sàn nội địa. Về sau có một công ty trung gian nhỏ được lập ra để hỗ trợ họ.

## Quyết định 3: Product → Country → Variants, sau khi chiều ngược lại thất bại

- **Bản đầu.** Country → Product → Variants: seller chọn thị trường, rồi thêm sản phẩm và biến thể cho thị trường đó. Cấu trúc này khớp với cách tính phí.
- **Test.** Trong MVP test, seller thấy quản lý sản phẩm theo cách này quá khó. Cùng một sản phẩm nằm dưới nhiều quốc gia và phải cập nhật ở từng chỗ.
- **Lựa chọn.** Product → Country → Variants. Seller quản lý một sản phẩm; quốc gia là một phần bên trong nó, mỗi quốc gia mang phí dropship riêng.

<!-- TODO hình: hai cấu trúc đặt cạnh nhau, bản bị bỏ và bản được chọn -->

## Một sản phẩm, từ seller đến người mua ở nước ngoài

- **Seller app.** Trình sửa sản phẩm mở từ sản phẩm, có phần quốc gia hiện phí cho từng nước nhận.
- **Admin.** Đơn hàng hiện thanh toán và giao hàng thành hai trạng thái, để team thấy đơn nào đã trả tiền mà vẫn chờ gửi.
- **Buyer app.** Người mua ở nước ngoài thấy sản phẩm cùng chi phí cho đúng nước của họ.

<!-- TODO hình: product editor, order admin, buyer product page (bản dựng lại) -->

## Design system

- **Nền.** Dựng trên Untitled UI thay vì từ đầu, nên team có sẵn bộ component đầy đủ và dồn thời gian vào pattern riêng của marketplace.
- **Đóng góp.** Component và pattern mới hoặc sửa đổi đều đi qua một quy trình add/enhance, nên hệ thống lớn lên mà không bị tách nhánh theo từng nền tảng.
- **Mở ra được gì.** Phần quốc gia và hai trạng thái đơn hàng thành pattern dùng chung cho web, mobile và admin.

## Về hình ảnh

Các thiết kế trong bài là bản dựng lại. Tên khách, thuật ngữ và dữ liệu đã được thay đổi, số liệu của dự án không công bố.

## Nếu làm lại

- **Tài liệu.** Tôi sẽ lưu tài liệu dự án theo timeline ngay từ tháng đầu. Dự án lớn đến mức không ai nhớ hết, và mỗi lần chuyển giao là một lần dựng lại ngữ cảnh.
- **Quyết định 3.** Tôi sẽ lồng dần tính năng cross-border vào lúc seller còn đang bán nội địa, hướng dẫn họ từng bước, rồi mới giao bản cross-border hoàn chỉnh.

## Design

<!-- TODO: 7 ảnh bản dựng lại, khác các ảnh trong bài, theo mẫu gallery của trang project -->
