---
title: "Bố cục và chuyển động lấy từ đâu: prompt AI, thư viện tham khảo và công cụ animation"
date: 2026-10-07
summary: "Các nguồn để quyết định trang trông thế nào và chuyển động ra sao, từ thư viện prompt AI tới bộ sưu tập màn hình sản phẩm thật và các thư viện làm animation."
---

Component trả lời trang được làm từ gì. Bố cục và chuyển động trả lời câu khó hơn: cái gì nằm ở đâu, và cái gì thay đổi khi người dùng tương tác. Đây là những quyết định, và cách nhanh nhất để quyết tốt là xem người khác đã quyết thế nào.

Danh sách này gồm ba loại nguồn. Template và prompt AI cho một bản nháp đầu. Thư viện tham khảo cho thấy site và sản phẩm thật đang làm gì. Thư viện và ví dụ chuyển động lo phần animation.

## Template và prompt cho AI

Một loại nguồn mới bán prompt thay vì bán code. Prompt được dán vào công cụ AI coding, công cụ đó sinh trang bằng chính stack của dự án.

- [Layers](https://www.getlayers.ai/) chia prompt thành template, section, cảnh 3D, nền và gradient. Một phần miễn phí; dùng thương mại cần gói trả phí.
- [MotionSites](https://motionsites.ai/) tập trung vào landing page hoàn chỉnh có chuyển động, viết cho các công cụ như Lovable, Bolt, Cursor và Claude. Có gói miễn phí và trả phí.
- [Template của Aura](https://www.aura.build/templates) là các trang dựng trong Aura, một công cụ AI dựng website, mở ra và chỉnh tiếp bằng prompt được.

Kết quả là bản nháp, không phải trang hoàn chỉnh. Code sinh ra vẫn cần áp token, component và nội dung của dự án. Coi prompt là đường tắt tới layout đầu tiên, rồi thay những gì nó tự bịa ra bằng thứ sản phẩm thật sự cần.

## Thư viện tham khảo cho landing page

Thư viện tham khảo hữu ích nhất khi có sẵn một câu hỏi cụ thể ("các sản phẩm khác bày bảng giá ba gói thế nào"), và ít hữu ích nhất khi lướt không mục đích.

- [Land-book](https://land-book.com/) và [Lapa Ninja](https://www.lapa.ninja/) là kho landing page lớn, lọc được theo ngành, màu và loại section.
- [Curated](https://www.curated.design/) là bộ nhỏ hơn, chọn tay, gồm site đang chạy, xếp theo ngành và phong cách.
- [siteInspire](https://www.siteinspire.com/) nghiêng về site editorial và studio, lọc theo phong cách và chủ đề.
- [Dark Design](https://www.dark.design/) gom các site nền tối, hữu ích khi cần tham khảo tương phản và chiều sâu cho dark theme.
- [Hoverstat.es](https://www.hoverstat.es/) giới thiệu các site có tương tác lạ. Tốt để lấy ý tưởng, hiếm khi dùng lại trực tiếp.

## Tham khảo cho màn hình và luồng sản phẩm

Landing page và UI sản phẩm là hai bài toán khác nhau. Với bản thân sản phẩm, nguồn tham khảo nên là app thật, không phải site marketing.

[Mobbin](https://mobbin.com/) là thư viện màn hình và luồng thao tác hoàn chỉnh từ các app iOS, Android và web đã phát hành. Tìm theo luồng (onboarding, thanh toán, xóa tài khoản) sẽ thấy cả chuỗi màn hình qua nhiều sản phẩm, hữu ích hơn nhiều so với một màn hình lẻ.

Hai trang design system nên mở sẵn cho những trạng thái hay bị bỏ qua:

- [Empty state của PatternFly](https://www.patternfly.org/components/empty-state/) mô tả màn hình hiển thị gì khi chưa có dữ liệu, có biến thể cho lần dùng đầu, không có kết quả tìm kiếm và lỗi.
- [Error summary của GOV.UK](https://design-system.service.gov.uk/components/error-summary/) chỉ cách báo lỗi trong form: một khối tóm tắt ở đầu trang, mỗi lỗi link tới đúng ô, kèm thông báo ngay cạnh ô đó. Pattern này đứng sau là nghiên cứu trên một dịch vụ công quy mô lớn.

Trạng thái rỗng và trạng thái lỗi là một phần của bố cục, không phải phần làm sau. Một trang chỉ có thiết kế cho đường suôn sẻ mới là một phần ba thiết kế.

## Thư viện chuyển động

Ba thư viện phủ gần như mọi trường hợp. Mỗi dự án chọn một.

- [Motion](https://motion.dev/) (trước là Framer Motion) là lựa chọn tự nhiên cho React. Animation khai báo ngay trên component, có sẵn animation cho layout và lúc phần tử rời khỏi trang.
- [GSAP](https://gsap.com/) không phụ thuộc framework, mạnh nhất ở timeline và chuỗi chuyển động theo cuộn trang qua ScrollTrigger. Nay đã miễn phí, kể cả các plugin trước đây phải trả tiền.
- [Anime.js](https://animejs.com/) nhẹ hơn, dùng để animate thuộc tính DOM, CSS và SVG mà không cần framework.

Trước khi dùng cả ba, xem CSS có làm được không. Transition, keyframe và scroll-driven animation của CSS hiện đại xử lý được hover, fade và hiện dần đơn giản mà không cần JavaScript. Dù chọn cách nào cũng phải tôn trọng `prefers-reduced-motion`.

## Icon và hình động

- [lucide-animated](https://lucide-animated.com/) là bộ hơn 350 icon Lucide có chuyển động cho React, dựng trên Motion, cài qua shadcn CLI. Vừa khít vào dự án shadcn/ui.
- [Lordicon](https://lordicon.com/) có thư viện icon động lớn, nhiều kiểu kích hoạt (hover, click, lặp).
- [Rive marketplace](https://rive.app/marketplace/) có animation tương tác làm bằng Rive, chạy bằng một runtime nhỏ và phản ứng theo trạng thái chứ không chỉ chạy lặp.

Icon động hiệu quả nhất ở chỗ xác nhận một hành động (đã copy, đã lưu, đã gửi). Icon chuyển động không có lý do sẽ kéo sự chú ý khỏi nội dung bên cạnh.

## Ví dụ và hướng dẫn

[CodePen](https://codepen.io/) là nơi tìm một hiệu ứng cụ thể và đọc code chạy được. [Codrops](https://tympanus.net/codrops/) đăng hướng dẫn và demo chi tiết, thường về hiệu ứng cuộn, WebGL và chữ, kèm mã nguồn trên GitHub.

## Tóm lại

| Cần | Bắt đầu với |
|---|---|
| Bản nháp đầu cho landing page | Prompt AI từ Layers hoặc MotionSites |
| Tham khảo section | Land-book, Lapa Ninja |
| Tham khảo luồng sản phẩm | Mobbin |
| Trạng thái rỗng và lỗi | PatternFly, GOV.UK Design System |
| Chuyển động trong React | Motion |
| Chuỗi chuyển động theo cuộn | GSAP |
| Icon động | lucide-animated |

Tham khảo trước, rồi tới bản nháp, rồi chỉ thêm chuyển động ở chỗ nó giải thích được điều gì vừa thay đổi.
