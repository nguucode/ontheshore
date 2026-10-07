---
title: "Mỗi lớp một nguồn: component, chữ, màu và hình ảnh cho một site mới"
date: 2026-10-07
summary: "Danh sách ngắn các nguồn cho những phần site nào cũng cần, chia theo lớp, kèm một quy tắc để chọn nhanh rồi làm tiếp."
---

Trước khi dựng layout, một site mới cần đủ năm lớp: component, màu, chữ và khoảng cách, icon, hình ảnh. Lớp nào cũng có hàng chục nguồn tốt. Cái giá không nằm ở việc chọn phải nguồn dở. Cái giá nằm ở việc trộn ba nguồn tốt vốn không được thiết kế để đi cùng nhau.

Quy tắc dùng ở đây: mỗi lớp chọn một nguồn, chỉ thêm nguồn thứ hai khi nguồn đầu thật sự thiếu. Các nguồn bên dưới được nhóm sẵn để việc chọn diễn ra nhanh.

## Component

**Lớp nền.** [shadcn/ui](https://ui.shadcn.com/) chép mã nguồn component thẳng vào dự án thay vì cài một package, nên code thuộc về mình và sửa được. Nó dựng trên Radix primitive và Tailwind. Với dự án Tailwind muốn component dạng class mà không cần React, [daisyUI](https://daisyui.com/) và [Flowbite](https://flowbite.com/) làm cùng việc đó với một đánh đổi khác: ít code phải giữ hơn, nhưng cũng ít quyền kiểm soát hơn.

Chọn một trong ba. Chúng giải cùng một bài toán, và hai bộ trong một codebase nghĩa là có hai định nghĩa cho cái nút.

**Block và section.** Khi đã có lớp nền, section dựng sẵn tiết kiệm nhiều thời gian nhất cho trang marketing. [shadcnblocks](https://www.shadcnblocks.com/) có header, bảng giá, FAQ dựng trên shadcn/ui. [Originkit](https://www.originkit.dev/) là bộ section có animation, miễn phí. [21st.dev](https://21st.dev/) gom component do cộng đồng làm (nút, thẻ, menu), mỗi cái kèm sẵn prompt để công cụ AI coding chèn vào dự án.

**Hiệu ứng.** [React Bits](https://reactbits.dev/), [Aceternity UI](https://ui.aceternity.com/) và [Magic UI](https://magicui.design/) chuyên về chữ chuyển động, nền và thẻ có hiệu ứng. Dùng cho một hai điểm nhấn trên trang, không dùng làm lớp nền. Hiệu ứng chạy trên mọi thẻ thì không còn là điểm nhấn nữa.

**Trạng thái đang tải.** [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton) vẽ khung giữ chỗ trong lúc dữ liệu đang tải. Skeleton khớp với layout thật giúp trang không bị giật khi nội dung đổ về. Nếu dự án đã dùng shadcn/ui thì component Skeleton có sẵn của nó làm được việc này mà không cần thêm dependency.

## Màu

[Coolors](https://coolors.co/) tạo và khóa bảng màu rất nhanh, hợp cho giai đoạn khám phá. [Realtime Colors](https://www.realtimecolors.com/) áp bảng màu lên một layout trang thật, nên lộ ra các vấn đề tương phản và cân bằng mà một hàng ô màu không cho thấy.

Cho production, [Radix Colors](https://www.radix-ui.com/colors) là nền an toàn hơn. Mỗi sắc có một thang 12 bước, mỗi bước có vai trò rõ (nền, viền, màu đặc, chữ), kèm thang tương ứng cho dark mode. Semantic token khi đó trỏ về bước trong thang thay vì mã hex, và đó là thứ giữ cho bảng màu còn bảo trì được sau lần đổi brand đầu tiên.

## Chữ, cỡ chữ và khoảng cách

**Font.** [Google Fonts](https://fonts.google.com/) là mặc định nhờ độ phủ và hosting sẵn. [Fontshare](https://www.fontshare.com/) có ít font hơn nhưng miễn phí và cá tính hơn. [Typewolf](https://www.typewolf.com/) không phải nơi tải font mà là nơi tham khảo: site thật đang dùng font gì, và cặp font nào đứng được với nhau.

**Thang cỡ chữ.** [Typescale](https://typescale.com/) và [Modular Scale](https://www.modularscale.com/) sinh ra một bộ cỡ chữ từ cỡ gốc và một tỉ lệ. [Utopia](https://utopia.fyi/) đi thêm một bước: sinh cỡ chữ và khoảng cách co giãn bằng CSS `clamp()`, để chúng đổi mượt giữa viewport nhỏ nhất và lớn nhất thay vì nhảy bậc ở breakpoint.

Sáu đến tám cỡ là đủ cho phần lớn site. Nhiều hơn thường có nghĩa là thang đang bị dùng để vá từng chỗ lẻ.

## Theme cho shadcn/ui

shadcn/ui đọc theme từ CSS variable, nên trình tạo theme là cách nhanh nhất để đặt màu, bo góc và font trong một lượt. [tweakcn](https://tweakcn.com/editor/theme) là trình chỉnh trực quan, xem trước ngay trên component. [Trình tạo của ZippyStarter](https://zippystarter.com/tools/shadcn-ui-theme-generator) và [trình tạo của shadcn.io](https://www.shadcn.io/theme-generator) đều xuất ra cùng một khối CSS variable. Một trong ba là đủ; kết quả chỉ vài chục dòng, sửa tay sau đó được.

## Icon

[Lucide](https://lucide.dev/icons/) là bộ icon mặc định của shadcn/ui, nên ở đó không cần quyết thêm. [Phosphor](https://phosphoricons.com/) có sáu độ đậm cho mỗi icon, từ thin đến fill, hữu ích khi một bộ phải phục vụ cả bảng dữ liệu dày đặc lẫn header marketing cỡ lớn. [Heroicons](https://heroicons.com/) là bộ nhỏ hơn, do đội Tailwind làm.

Một sản phẩm một bộ icon. Trộn bộ sẽ lộ ngay ở độ dày nét và độ bo góc.

## Hình minh họa và nền

**Hình minh họa.** [unDraw](https://undraw.co/illustrations) cho chọn một màu nhấn trước khi tải, để hình khớp bảng màu. [Storyset](https://storyset.com/) có nhiều phong cách cho mỗi cảnh và làm animation được. [Humaaans](https://www.humaaans.com/) là bộ người ghép được từng phần.

**Nền SVG.** [Haikei](https://haikei.app/) sinh sóng, blob và các lớp hình. [SVGBackgrounds](https://www.svgbackgrounds.com/) có sẵn họa tiết. [fffuel](https://www.fffuel.co/) là tập hợp các công cụ nhỏ sinh gradient, noise, grain và họa tiết. SVG giữ dung lượng nhỏ và phóng to không vỡ.

## Ảnh, mockup và xử lý ảnh

**Ảnh và video.** [Unsplash](https://unsplash.com/), [Pexels](https://www.pexels.com/) và [Pixabay](https://pixabay.com/) dùng miễn phí theo giấy phép riêng của từng nơi. Đọc giấy phép một lần cho mỗi nguồn, nhất là với ảnh có người hoặc thương hiệu nhận diện được.

**Mockup thiết bị.** [Shots](https://shots.so/) đặt ảnh chụp màn hình vào khung thiết bị, kèm nền và đổ bóng. [MockupBro](https://mockupbro.com/) có cả mockup sản phẩm ngoài thiết bị. [MockUPhone](https://mockuphone.com/) là đường nhanh nhất tới một khung điện thoại hay laptop đơn giản.

**Xử lý.** [Squoosh](https://squoosh.app/) nén và đổi định dạng ảnh ngay trong trình duyệt, có xem so sánh hai bên, xuất được AVIF và WebP. [iLoveIMG](https://www.iloveimg.com/) đổi cỡ và cắt hàng loạt. [Photopea](https://www.photopea.com/) là trình chỉnh ảnh trên trình duyệt, mở được file PSD.

Nén mọi ảnh trước khi đưa lên. Một ảnh hero lấy thẳng từ trang ảnh stock thường nặng vài MB, và phần lớn trong đó bỏ được mà mắt không thấy khác.

## Tóm lại

| Lớp | Mặc định | Thêm khi |
|---|---|---|
| Component | shadcn/ui | Cần section gấp: shadcnblocks |
| Màu | Radix Colors | Đang khám phá màu brand: Coolors, Realtime Colors |
| Thang chữ | Utopia | Thang cố định là đủ: Typescale |
| Theme | tweakcn | |
| Icon | Lucide | Cần nhiều độ đậm: Phosphor |
| Hình ảnh | Unsplash + Squoosh | |

Năm lớp, năm quyết định, mỗi lớp một nguồn.
