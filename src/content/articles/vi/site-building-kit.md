---
title: "Mỗi lớp một nguồn: component, chữ, màu và hình ảnh cho một site mới"
date: 2026-10-07
summary: "Các nguồn cho những phần site nào cũng cần, chia theo lớp, có ghi rõ giá và một lựa chọn mặc định cho mỗi lớp."
---

Trước khi dựng layout, một site mới cần đủ năm lớp: component, màu, chữ và khoảng cách, icon, hình ảnh. Rủi ro không nằm ở việc chọn phải nguồn dở. Rủi ro nằm ở việc trộn ba nguồn tốt vốn không được thiết kế để đi cùng nhau.

Quy tắc: mỗi lớp một nguồn. Chỉ thêm nguồn thứ hai khi nguồn đầu thật sự thiếu.

Nhãn giá: <span class="price">Miễn phí</span> miễn phí hoàn toàn. <span class="price paid">Miễn phí + trả phí</span> dùng miễn phí được, có gói trả phí mở thêm. Giá tính đến tháng 10/2026.

## Component

Chọn một thư viện nền. Hai bộ trong một codebase nghĩa là có hai định nghĩa cho cái nút.

- ![Trang chủ shadcn/ui](../../../assets/articles/shadcn.jpg)
  **[shadcn/ui](https://ui.shadcn.com/)** <span class="price">Miễn phí</span>\
  Chép mã nguồn component thẳng vào dự án. Dựng trên Radix và Tailwind.\
  **Dùng khi:** muốn sở hữu và sửa được từng component.
- ![Trang chủ daisyUI](../../../assets/articles/daisyui.jpg)
  **[daisyUI](https://daisyui.com/)** <span class="price">Miễn phí</span>\
  Plugin Tailwind, component dạng class. Thuần CSS, chạy với mọi framework.\
  **Dùng khi:** cần component mà không dùng React.
- ![Trang chủ Flowbite](../../../assets/articles/flowbite.jpg)
  **[Flowbite](https://flowbite.com/)** <span class="price paid">Miễn phí + trả phí</span>\
  600+ component Tailwind kèm bộ Figma tương ứng. Bản Pro thêm nhiều block.\
  **Dùng khi:** design và code cần chung một bộ.

**Chọn:** shadcn/ui cho dự án React.

## Block và hiệu ứng

Section dựng sẵn tiết kiệm nhiều thời gian nhất cho trang marketing. Hiệu ứng chỉ nên dùng cho một hai điểm nhấn mỗi trang, không làm lớp nền.

- ![Trang chủ shadcnblocks](../../../assets/articles/shadcnblocks.jpg)
  **[shadcnblocks](https://www.shadcnblocks.com/)** <span class="price paid">Miễn phí + trả phí</span>\
  Header, bảng giá, FAQ dựng trên shadcn/ui. Phần lớn thư viện là trả phí.\
  **Dùng khi:** cần nguyên một section thật nhanh.
- ![Thư viện component Originkit](../../../assets/articles/originkit.jpg)
  **[Originkit](https://www.originkit.dev/)** <span class="price paid">Miễn phí + trả phí</span>\
  Section và nền có animation. Gói miễn phí giới hạn số lần copy mỗi ngày.\
  **Dùng khi:** section cần có sẵn chuyển động.
- ![Trang chủ 21st.dev](../../../assets/articles/21st.jpg)
  **[21st.dev](https://21st.dev/)** <span class="price paid">Miễn phí + trả phí</span>\
  Component do cộng đồng làm, mỗi cái kèm prompt cho công cụ AI coding.\
  **Dùng khi:** đang code bằng Cursor, Claude hay công cụ tương tự.
- ![Trang chủ React Bits](../../../assets/articles/reactbits.jpg)
  **[React Bits](https://reactbits.dev/)** <span class="price paid">Miễn phí + trả phí</span>\
  Chữ, nền và component có chuyển động cho React.\
  **Dùng khi:** hero cần một hiệu ứng thật nổi.
- ![Trang chủ Aceternity UI](../../../assets/articles/aceternity.jpg)
  **[Aceternity UI](https://ui.aceternity.com/)** <span class="price paid">Miễn phí + trả phí</span>\
  Thẻ, nền và block landing page dùng Motion.\
  **Dùng khi:** cần landing page trau chuốt trong thời gian ngắn.
- ![Trang chủ Magic UI](../../../assets/articles/magicui.jpg)
  **[Magic UI](https://magicui.design/)** <span class="price paid">Miễn phí + trả phí</span>\
  150+ component có chuyển động, thiết kế để đi cùng shadcn/ui.\
  **Dùng khi:** đã dùng shadcn/ui.
- ![react-loading-skeleton trên GitHub](../../../assets/articles/skeleton.jpg)
  **[react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton)** <span class="price">Miễn phí</span>\
  Khung giữ chỗ khi dữ liệu đang tải, để trang không bị giật.\
  **Dùng khi:** không dùng shadcn/ui (shadcn/ui đã có sẵn Skeleton).

**Chọn:** shadcnblocks cho section, tối đa một thư viện hiệu ứng.

## Màu

Khám phá bằng công cụ sinh màu. Đưa lên production bằng một thang màu.

- **[Coolors](https://coolors.co/)** <span class="price paid">Miễn phí + trả phí</span>\
  Sinh và khóa bảng màu từng màu một.\
  **Dùng khi:** đang tìm màu brand.
- ![Trang chủ Realtime Colors](../../../assets/articles/realtimecolors.jpg)
  **[Realtime Colors](https://www.realtimecolors.com/)** <span class="price">Miễn phí</span>\
  Áp bảng màu và font lên một layout trang thật.\
  **Dùng khi:** kiểm tra tương phản và cân bằng trước khi chốt.
- ![Thang màu Radix Colors](../../../assets/articles/radix-colors.jpg)
  **[Radix Colors](https://www.radix-ui.com/colors)** <span class="price">Miễn phí</span>\
  Thang 12 bước, mỗi bước có vai trò rõ, kèm thang cho dark mode.\
  **Dùng khi:** dựng token cho production.

**Chọn:** Radix Colors. Semantic token trỏ về bước trong thang thay vì mã hex, nên đổi brand không phải làm lại.

## Font

- ![Ảnh chia sẻ của Google Fonts](../../../assets/articles/google-fonts.jpg)
  **[Google Fonts](https://fonts.google.com/)** <span class="price">Miễn phí</span>\
  Thư viện miễn phí lớn nhất, có hosting sẵn.\
  **Dùng khi:** cần độ phủ và độ ổn định.
- ![Danh sách font trên Fontshare](../../../assets/articles/fontshare.jpg)
  **[Fontshare](https://www.fontshare.com/)** <span class="price">Miễn phí</span>\
  Ít font hơn nhưng miễn phí và cá tính hơn.\
  **Dùng khi:** Google Fonts trông quá quen.
- **[Typewolf](https://www.typewolf.com/)** <span class="price">Miễn phí</span>\
  Site thật đang dùng font gì, cặp font nào đứng được với nhau.\
  **Dùng khi:** chọn cặp font.

## Thang cỡ chữ và khoảng cách

Sáu đến tám cỡ là đủ cho phần lớn site. Nhiều hơn thường là đang vá từng chỗ lẻ.

- ![Ảnh chia sẻ của Typescale](../../../assets/articles/typescale.jpg)
  **[Typescale](https://typescale.com/)** <span class="price">Miễn phí</span>\
  Thang cố định từ cỡ gốc và một tỉ lệ.\
  **Dùng khi:** thang cố định là đủ.
- ![Ảnh chia sẻ của Utopia](../../../assets/articles/utopia.jpg)
  **[Utopia](https://utopia.fyi/)** <span class="price">Miễn phí</span>\
  Cỡ chữ và khoảng cách co giãn bằng CSS `clamp()`. Không nhảy bậc ở breakpoint.\
  **Dùng khi:** site cần co giãn mượt qua mọi viewport.
- ![Ảnh chia sẻ của Modular Scale](../../../assets/articles/modularscale.jpg)
  **[Modular Scale](https://www.modularscale.com/)** <span class="price">Miễn phí</span>\
  Công cụ tính thang theo tỉ lệ đời đầu.\
  **Dùng khi:** muốn so các tỉ lệ cạnh nhau.

**Chọn:** Utopia.

## Theme cho shadcn/ui

shadcn/ui đọc theme từ CSS variable. Công cụ nào dưới đây cũng xuất ra khối đó, sửa tay sau được.

- ![Ảnh chia sẻ của tweakcn](../../../assets/articles/tweakcn.jpg)
  **[tweakcn](https://tweakcn.com/editor/theme)** <span class="price paid">Miễn phí + trả phí</span>\
  Trình chỉnh trực quan, xem trước ngay, có kiểm tra tương phản. Pro ($8/tháng) mở không giới hạn theme sinh bằng AI.\
  **Dùng khi:** muốn thấy mọi component trong lúc chỉnh.
- ![Trình tạo theme của ZippyStarter](../../../assets/articles/zippystarter.jpg)
  **[Trình tạo của ZippyStarter](https://zippystarter.com/tools/shadcn-ui-theme-generator)** <span class="price">Miễn phí</span>\
  Sinh nguyên bộ theme từ một màu khởi đầu.\
  **Dùng khi:** chỉ có một màu brand.
- ![Trình tạo theme của shadcn.io](../../../assets/articles/shadcnio.jpg)
  **[Trình tạo của shadcn.io](https://www.shadcn.io/theme-generator)** <span class="price">Miễn phí</span>\
  Trình tạo theme cộng đồng, có xem trước trên component.\
  **Dùng khi:** muốn bắt đầu từ theme của người khác.

**Chọn:** tweakcn, gói miễn phí.

## Icon

Một sản phẩm một bộ icon. Trộn bộ sẽ lộ ngay ở độ dày nét và độ bo góc.

- ![Ảnh chia sẻ của Lucide](../../../assets/articles/lucide.jpg)
  **[Lucide](https://lucide.dev/icons/)** <span class="price">Miễn phí</span>\
  Bộ icon mặc định của shadcn/ui.\
  **Dùng khi:** đang dùng shadcn/ui.
- **[Phosphor](https://phosphoricons.com/)** <span class="price">Miễn phí</span>\
  Sáu độ đậm cho mỗi icon, từ thin đến fill.\
  **Dùng khi:** một bộ phải phục vụ cả bảng dữ liệu dày lẫn header lớn.
- ![Ảnh chia sẻ của Heroicons](../../../assets/articles/heroicons.jpg)
  **[Heroicons](https://heroicons.com/)** <span class="price">Miễn phí</span>\
  Bộ nhỏ hơn, do đội Tailwind làm.\
  **Dùng khi:** chỉ cần những icon cơ bản.

**Chọn:** Lucide.

## Hình minh họa và nền

- ![Ảnh chia sẻ của unDraw](../../../assets/articles/undraw.jpg)
  **[unDraw](https://undraw.co/illustrations)** <span class="price">Miễn phí</span>\
  Chọn màu nhấn trước khi tải.\
  **Dùng khi:** hình minh họa phải khớp bảng màu.
- ![Trang chủ Storyset](../../../assets/articles/storyset.jpg)
  **[Storyset](https://storyset.com/)** <span class="price">Miễn phí</span>\
  Nhiều phong cách cho mỗi cảnh, làm animation được. Dùng miễn phí phải ghi nguồn.\
  **Dùng khi:** muốn hình minh họa có chuyển động.
- ![Ảnh chia sẻ của Humaaans](../../../assets/articles/humaaans.jpg)
  **[Humaaans](https://www.humaaans.com/)** <span class="price">Miễn phí</span>\
  Bộ người ghép được từng phần.\
  **Dùng khi:** cần người ở nhiều tư thế.
- ![Ảnh chia sẻ của Haikei](../../../assets/articles/haikei.jpg)
  **[Haikei](https://haikei.app/)** <span class="price">Miễn phí</span>\
  Sinh sóng, blob và các lớp hình dạng SVG.\
  **Dùng khi:** section cần một hình nền.
- **[SVGBackgrounds](https://www.svgbackgrounds.com/)** <span class="price paid">Miễn phí + trả phí</span>\
  Họa tiết SVG có sẵn.\
  **Dùng khi:** cần họa tiết mà không muốn tự sinh.
- ![Ảnh chia sẻ của fffuel](../../../assets/articles/fffuel.jpg)
  **[fffuel](https://www.fffuel.co/)** <span class="price">Miễn phí</span>\
  Các công cụ nhỏ sinh gradient, noise, grain và họa tiết.\
  **Dùng khi:** cần chất liệu bề mặt.

## Ảnh và video

Dùng miễn phí theo giấy phép riêng của từng nơi. Đọc giấy phép một lần cho mỗi nguồn, nhất là với ảnh có người hoặc thương hiệu nhận diện được.

- ![Trang chủ Unsplash](../../../assets/articles/unsplash.jpg)
  **[Unsplash](https://unsplash.com/)** <span class="price paid">Miễn phí + trả phí</span>\
  Ảnh chất lượng cao. Unsplash+ thêm thư viện premium.
- ![Trang chủ Pexels](../../../assets/articles/pexels.jpg)
  **[Pexels](https://www.pexels.com/)** <span class="price">Miễn phí</span>\
  Ảnh và thư viện video mạnh.
- ![Trang chủ Pixabay](../../../assets/articles/pixabay.jpg)
  **[Pixabay](https://pixabay.com/)** <span class="price">Miễn phí</span>\
  Ảnh, vector, video, nhạc và hiệu ứng âm thanh.

## Mockup thiết bị

- ![Ảnh chia sẻ của Shots](../../../assets/articles/shots.jpg)
  **[Shots](https://shots.so/)** <span class="price paid">Miễn phí + trả phí</span>\
  Khung thiết bị kèm nền và đổ bóng.\
  **Dùng khi:** ảnh chụp màn hình cần trông hoàn chỉnh.
- ![Ảnh chia sẻ của MockupBro](../../../assets/articles/mockupbro.jpg)
  **[MockupBro](https://mockupbro.com/)** <span class="price">Miễn phí</span>\
  Mockup sản phẩm ngoài thiết bị, không watermark.\
  **Dùng khi:** cần mockup in ấn hay bao bì.
- ![Trang chủ MockUPhone](../../../assets/articles/mockuphone.jpg)
  **[MockUPhone](https://mockuphone.com/)** <span class="price">Miễn phí</span>\
  Khung điện thoại, tablet, laptop đơn giản.\
  **Dùng khi:** chỉ cần một cái khung.

## Xử lý ảnh

Nén mọi ảnh trước khi đưa lên. Một ảnh hero lấy thẳng từ trang ảnh stock thường nặng vài MB.

- ![Ứng dụng Squoosh](../../../assets/articles/squoosh.jpg)
  **[Squoosh](https://squoosh.app/)** <span class="price">Miễn phí</span>\
  Nén và đổi định dạng ngay trên trình duyệt. Xuất AVIF và WebP.\
  **Dùng khi:** tối ưu từng ảnh.
- ![Ảnh chia sẻ của iLoveIMG](../../../assets/articles/iloveimg.jpg)
  **[iLoveIMG](https://www.iloveimg.com/)** <span class="price paid">Miễn phí + trả phí</span>\
  Đổi cỡ, cắt và nén hàng loạt.\
  **Dùng khi:** xử lý nhiều ảnh một lúc.
- ![Trang chủ Photopea](../../../assets/articles/photopea.jpg)
  **[Photopea](https://www.photopea.com/)** <span class="price paid">Miễn phí + trả phí</span>\
  Trình chỉnh ảnh trên trình duyệt, mở được PSD. Premium bỏ quảng cáo.\
  **Dùng khi:** nhận file PSD mà không có Photoshop.

## Tóm lại

| Lớp | Mặc định | Giá | Thêm khi |
|---|---|---|---|
| Component | shadcn/ui | Miễn phí | Cần section gấp: shadcnblocks |
| Màu | Radix Colors | Miễn phí | Đang tìm màu brand: Realtime Colors |
| Thang chữ | Utopia | Miễn phí | Thang cố định là đủ: Typescale |
| Theme | tweakcn | Gói miễn phí | |
| Icon | Lucide | Miễn phí | Cần nhiều độ đậm: Phosphor |
| Hình ảnh | Unsplash + Squoosh | Miễn phí | |

Năm lớp, năm quyết định, mỗi lớp một nguồn.
