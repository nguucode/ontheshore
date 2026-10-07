---
title: "3D trên website, ba mức công sức"
date: 2026-10-07
summary: "Ảnh render sẵn, cảnh tương tác, hay nguyên liệu để tự dựng cảnh: trang cần mức nào, và nguồn cho từng mức. Có ghi rõ giá."
---

Phần lớn trang dùng 3D chỉ cần một tấm ảnh của thứ gì đó 3D. Ít trang hơn cần một vật thể xoay được. Rất ít trang cần cả một cảnh dựng từ model, texture và ánh sáng. Mỗi bậc lên tốn thêm thời gian làm, dung lượng và hiệu năng.

Bắt đầu từ mức thấp nhất làm được việc.

Nhãn giá: <span class="price">Miễn phí</span> miễn phí hoàn toàn. <span class="price paid">Miễn phí + trả phí</span> dùng miễn phí được, có gói trả phí mở thêm. Giá tính đến tháng 10/2026.

## Mức 1: ảnh 3D render sẵn

Ảnh render xuất ra PNG hay WebP tải như mọi ảnh khác. Không runtime, không thêm JavaScript.

- ![Ảnh chia sẻ của Shapefest](../../../assets/articles/shapefest.jpg)
  **[Shapefest](https://shapefest.com/)** <span class="price paid">Miễn phí + trả phí</span>\
  100.000+ hình khối và vật thể render ray-tracing. Bản miễn phí 512×512 px; gói trả phí lên tới 3000×3000 px.\
  **Dùng khi:** cần chi tiết 3D trừu tượng.
- ![Trang minh họa của Icons8](../../../assets/articles/icons8.jpg)
  **[Icons8 illustrations](https://icons8.com/illustrations)** <span class="price paid">Miễn phí + trả phí</span>\
  Hàng trăm phong cách, nhiều bộ 3D, đóng gói đồng nhất. Dùng miễn phí phải để link ghi nguồn; trả phí bỏ yêu cầu đó và có độ phân giải cao.\
  **Dùng khi:** cả trang cần một phong cách thống nhất.
- ![Trang chủ 3dicons](../../../assets/articles/3dicons.jpg)
  **[3dicons](https://old.3dicons.co/)** <span class="price">Miễn phí</span>\
  120 icon, bốn phong cách màu, ba góc máy. CC0, không cần ghi nguồn. Bản mới hơn ở 3dicons.co.\
  **Dùng khi:** cần icon 3D cho tính năng hay trạng thái rỗng.

Đủ cho hình minh họa tính năng, ảnh hero và chi tiết trang trí. Nén trước khi đưa lên: bóng mềm và gradient nén sang WebP hay AVIF rất tốt.

## Mức 2: 3D tương tác

Khi người dùng cần xoay, phóng to hay kích hoạt gì đó, trang cần một runtime 3D.

- ![Ảnh chia sẻ của Spline](../../../assets/articles/spline.jpg)
  **[Spline](https://spline.design/)** <span class="price paid">Miễn phí + trả phí</span>\
  Công cụ thiết kế 3D trên trình duyệt, có trạng thái, sự kiện và animation. Xuất ra embed, component React hay code.\
  **Dùng khi:** thiết kế một vật thể tương tác từ đầu.
- ![Ảnh chia sẻ của model-viewer](../../../assets/articles/modelviewer.jpg)
  **[`<model-viewer>`](https://modelviewer.dev/)** <span class="price">Miễn phí</span>\
  Web component của Google cho model glTF/GLB, có điều khiển xoay và AR trên điện thoại hỗ trợ. Một thẻ HTML.\
  **Dùng khi:** model đã có sẵn.
- ![Ảnh chia sẻ của Vectary](../../../assets/articles/vectary.jpg)
  **[Vectary](https://www.vectary.com/)** <span class="price paid">Miễn phí + trả phí</span>\
  Công cụ 3D trên trình duyệt, tập trung vào hiển thị sản phẩm, configurator và AR.\
  **Dùng khi:** làm configurator cho sản phẩm.

3D tương tác có chi phí thật. Kiểm tra dung lượng tải trên điện thoại tầm trung, chuẩn bị ảnh tĩnh thay thế, và để cảnh nặng ra khỏi màn hình đầu.

## Mức 3: nguyên liệu để dựng cảnh

Khi cảnh dựng trong Blender, Three.js hay game engine, nó cần nguyên liệu thô. Cả ba nguồn dưới đây đều CC0, nên dùng thương mại không phải lo giấy phép.

- ![Ảnh chia sẻ của Poly Haven](../../../assets/articles/polyhaven.jpg)
  **[Poly Haven](https://polyhaven.com/)** <span class="price">Miễn phí</span>\
  HDRI, texture và model. Một HDRI tốt cho ánh sáng chân thực mà không phải đặt đèn bằng tay.\
  **Dùng khi:** ánh sáng trông phẳng.
- ![Ảnh chia sẻ của ambientCG](../../../assets/articles/ambientcg.jpg)
  **[ambientCG](https://ambientcg.com/)** <span class="price">Miễn phí</span>\
  Vật liệu PBR (gỗ, kim loại, vải, đá), mỗi vật liệu đủ bộ map.\
  **Dùng khi:** bề mặt cần vật liệu chân thực.
- ![Ảnh chia sẻ của Kenney](../../../assets/articles/kenney.jpg)
  **[Kenney](https://kenney.nl/assets)** <span class="price">Miễn phí</span>\
  Hàng nghìn asset game: model low-poly, sprite, UI và âm thanh.\
  **Dùng khi:** làm prototype hay cảnh cách điệu.

## Chọn mức

| Trang cần | Mức | Bắt đầu với | Giá |
|---|---|---|---|
| Vẻ ngoài 3D, không có gì chuyển động | 1 | Shapefest, 3dicons | Miễn phí |
| Vật thể người dùng xoay được | 2 | `<model-viewer>` | Miễn phí |
| Cảnh tương tác được thiết kế | 2 | Spline | Miễn phí + trả phí |
| Cảnh tự dựng trong Three.js hay Blender | 3 | Poly Haven, ambientCG | Miễn phí |
| Prototype hay game cách điệu | 3 | Kenney | Miễn phí |

Câu kiểm tra cho mỗi trang: tương tác với vật thể này cho người dùng điều gì mà ảnh tĩnh không cho được. Nếu không chỉ ra được điều gì cụ thể, mức 1 là mức đúng.
