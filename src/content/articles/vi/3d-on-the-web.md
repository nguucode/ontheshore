---
title: "3D trên website, ba mức công sức"
date: 2026-10-07
summary: "Ảnh render sẵn, cảnh tương tác, hay nguyên liệu để tự dựng cảnh: trang cần mức nào, và nguồn cho từng mức."
---

Phần lớn trang dùng 3D chỉ cần một tấm ảnh của thứ gì đó 3D. Ít trang hơn cần một vật thể xoay được. Rất ít trang cần cả một cảnh dựng từ model, texture và ánh sáng. Mỗi bậc lên tốn thêm thời gian làm, dung lượng và hiệu năng.

Các nguồn bên dưới chia theo ba mức đó. Bắt đầu từ mức thấp nhất làm được việc.

## Mức 1: ảnh 3D render sẵn

Ảnh render 3D xuất ra PNG hay WebP tải như mọi ảnh khác. Không runtime, không thêm JavaScript, không tốn hiệu năng ngoài dung lượng file.

- [Shapefest](https://shapefest.com/) là kho lớn các hình khối và vật thể trừu tượng render ray-tracing. Bản tải miễn phí cỡ 512×512 px; gói trả phí có độ phân giải cao.
- [Icons8 illustrations](https://icons8.com/illustrations) có nhiều phong cách 3D bên cạnh phong cách phẳng, với các bộ đồng nhất để dựng cả trang theo một phong cách.
- [3dicons](https://old.3dicons.co/) là bộ 120 icon mã nguồn mở, mỗi icon render ở bốn phong cách màu và ba góc máy. Phát hành theo CC0, không cần ghi nguồn.

Mức này đủ cho hình minh họa tính năng, ảnh hero và chi tiết trang trí. Nén file trước khi đưa lên: ảnh 3D có bóng mềm và gradient nén sang WebP hay AVIF rất tốt.

## Mức 2: 3D tương tác

Khi người dùng cần xoay, phóng to hay kích hoạt gì đó, trang cần một runtime 3D.

- [Spline](https://spline.design/) là công cụ thiết kế 3D chạy trên trình duyệt. Cảnh có thể có trạng thái, sự kiện và animation, xuất ra dạng embed, component React hay đoạn code. Đây là đường ngắn nhất từ ý tưởng thiết kế tới một vật thể tương tác trên trang.
- [`<model-viewer>`](https://modelviewer.dev/) là web component của Google, hiển thị model glTF hoặc GLB với điều khiển xoay, ánh sáng và AR trên điện thoại hỗ trợ. Một thẻ HTML và một file model là đủ. Hợp với trang xem sản phẩm khi model đã có sẵn.
- [Vectary](https://www.vectary.com/) là một công cụ 3D trên trình duyệt khác, tập trung vào hiển thị sản phẩm, configurator và AR.

3D tương tác có chi phí thật. Kiểm tra dung lượng tải trên một điện thoại tầm trung, chuẩn bị ảnh tĩnh thay thế, và tránh đặt cảnh nặng ở màn hình đầu, nơi nó làm chậm lần hiển thị nội dung đầu tiên.

## Mức 3: nguyên liệu để dựng cảnh

Khi cảnh được dựng trong Blender, Three.js hay game engine, nó cần nguyên liệu thô.

- [Poly Haven](https://polyhaven.com/) có HDRI, texture và model, tất cả CC0. Chỉ riêng HDRI đã giải quyết phần lớn vấn đề ánh sáng: một environment map tốt cho phản chiếu chân thực mà không phải đặt đèn bằng tay.
- [ambientCG](https://ambientcg.com/) là kho lớn vật liệu PBR theo CC0 (gỗ, kim loại, vải, đá), mỗi vật liệu đủ bộ map.
- [Kenney](https://kenney.nl/assets) phát hành hàng nghìn asset game theo CC0: model low-poly, sprite, thành phần UI và âm thanh. Hữu ích cho prototype và cảnh cách điệu.

Cả ba đều dùng CC0, nên không còn câu hỏi giấy phép khi làm việc thương mại.

## Chọn mức

| Trang cần | Mức | Bắt đầu với |
|---|---|---|
| Vẻ ngoài 3D, không có gì chuyển động | 1 | Shapefest, 3dicons |
| Vật thể người dùng xoay được | 2 | `<model-viewer>` với model có sẵn |
| Cảnh tương tác được thiết kế | 2 | Spline |
| Cảnh tự dựng trong Three.js hay Blender | 3 | Poly Haven, ambientCG |
| Prototype hay game cách điệu | 3 | Kenney |

Với mỗi trang, câu cần trả lời là như nhau: tương tác với vật thể này cho người dùng điều gì mà một ảnh tĩnh không cho được. Nếu không chỉ ra được điều gì cụ thể, mức 1 là mức đúng.
