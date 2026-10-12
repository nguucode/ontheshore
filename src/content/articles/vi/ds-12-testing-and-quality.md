---
title: "Testing và cổng chất lượng"
date: 2026-04-14
summary: "Các lớp test một design system cần, mỗi lớp bắt loại lỗi gì, và làm sao để CI thật sự chặn được merge thay vì chỉ để trang trí."
---

Phần 12/15 của series *Design system từ nền móng*.

Design system cần test nhiều hơn code sản phẩm, vì một lỗi trong component lặp lại ở mọi nơi dùng nó. Test chia thành lớp, mỗi lớp bắt một loại lỗi: type, lint, interaction, accessibility, visual, cross-browser. Với component UI, story chính là test case, viết một lần vừa làm ví dụ vừa làm test. Và test chỉ bảo vệ được gì khi nó chặn được merge. Test đỏ mà pull request vẫn qua thì chỉ là trang trí.

## Mỗi lớp bắt loại lỗi gì

Hình dung kiểm một chiếc xe trước khi xuất xưởng: kiểm giấy tờ, kiểm từng bộ phận, chạy thử, so ngoại hình với xe mẫu, rồi chạy trên nhiều loại đường. Mỗi bước bắt thứ các bước khác bỏ sót.

| Lớp | Bắt được | Không bắt được | Công cụ hay dùng |
|---|---|---|---|
| **Type check** | Truyền sai prop, thiếu prop bắt buộc, ví dụ nút chỉ có icon mà thiếu `aria-label` | Hành vi | TypeScript |
| **Lint** | Giá trị cứng, primitive dùng trong component, tên token gõ sai | Hành vi, hình ảnh | Stylelint (CSS), ESLint hoặc oxlint (JS) |
| **Kiểm tra build** | File token sinh ra lệch với nguồn, package thiếu dependency | | Script riêng trong CI |
| **Interaction test** | Bấm, gõ, phím tắt không ra kết quả đúng | Hình ảnh lệch vài pixel | Play function trong Storybook, Testing Library |
| **Accessibility test** | Contrast, thiếu label, ARIA sai | Thứ tự focus có hợp lý không, label có nghĩa không | axe-core qua addon a11y |
| **Visual regression** | Hình ảnh đổi ngoài ý muốn | Hình ảnh sai ngay từ đầu | Chromatic, screenshot Playwright |
| **Cross-browser** | Lỗi chỉ có ở Firefox hoặc Safari | | Playwright (Chromium, Firefox, WebKit) |

## Lint token: chặn lệch hệ từ gốc

Đây là lớp đặc thù của design system. Câu hỏi nó trả lời: làm sao chắc không ai viết `color: #333` hay `padding: 13px` trong component?

Hai luật Stylelint đáng có, đặt ở mức **error**, không phải warning:

1. Thuộc tính đã có token (màu, spacing, radius...) phải dùng token, không dùng giá trị cứng. Stylelint có sẵn rule cho việc này, ví dụ `declaration-property-value-disallowed-list`, ngoài ra còn có plugin.
2. Một rule tự viết kiểm mọi `var(--x)`: phải là semantic token có thật. Gọi primitive thì bị báo là primitive; gọi tên không tồn tại thì bị báo là có thể gõ sai.

Luật thứ hai quan trọng hơn vẻ ngoài. CSS gặp `var(--primay)` (gõ sai) sẽ không báo gì, chỉ âm thầm rơi về giá trị mặc định của trình duyệt.

Ngoại lệ được phép, miễn lý do viết ngay tại chỗ, trong comment `stylelint-disable-next-line` kèm giải thích. Ngoại lệ có lý do là dấu hiệu hệ khỏe. Ngoại lệ không lý do là nợ.

## Test qua story

Storybook cho phép viết **play function**: một kịch bản chạy trên story sau khi render.

```tsx
import { expect } from 'storybook/test'

export const ClosesOnEscape: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Mở' }))
    await expect(canvas.getByRole('dialog')).toBeVisible()
    await userEvent.keyboard('{Escape}')
    await expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
  },
}
```

Để ý: test tìm phần tử bằng **role và tên**, giống cách screen reader thấy trang. Testing Library khuyên ưu tiên kiểu query này. Test viết như vậy vừa kiểm hành vi vừa gián tiếp kiểm accessibility: nút không có tên đúng thì test không tìm thấy nó.

Addon Vitest của Storybook chạy mọi story thành test trong trình duyệt thật, nhờ Playwright. Chạy trên cả Chromium, Firefox và WebKit là cách rẻ nhất để bắt lỗi chỉ có ở Safari.

Một luật hay: mỗi câu hỏi accessibility trong spec component ("Esc có đóng không?", "focus có quay về không?") phải có một play function tương ứng.

## Visual regression

Visual regression test chụp ảnh từng story, so với ảnh gốc đã duyệt, rồi báo khi có khác biệt. Nó bắt thứ các lớp khác bỏ sót: đổi một token làm 30 component lệch 1 pixel, hay sửa CSS chỗ này làm vỡ chỗ khác.

Có hai lựa chọn: dịch vụ (Chromatic, do đội làm Storybook phát triển) hoặc tự host bằng screenshot Playwright. Đánh đổi:

- Dịch vụ: tiện, có giao diện duyệt ảnh, tính phí theo số ảnh chụp.
- Tự host: miễn phí, nhưng ảnh khác nhau giữa các máy (font, cách render), nên phải chụp trong môi trường cố định như Docker hoặc CI.

Với hệ nhỏ, chụp có chọn lọc: mỗi component một story đại diện cho mỗi mode, không chụp mọi story.

## CI là cổng chặn

Một kịch bản rất hay gặp: CI chỉ chạy khi code đã vào nhánh chính, nên nhiều pull request được merge trong lúc test đỏ, deploy fail liên tiếp, và không ai biết lỗi từ pull request nào. Cách sửa:

1. Chạy CI trên **mọi pull request**: type, lint, kiểm token, story test, build.
2. Đặt các check đó là **required status check** trong branch protection hoặc ruleset của GitHub. Pull request đỏ không merge được, push thẳng vào nhánh chính cũng bị chặn.

Test không chặn được merge thì sớm muộn cũng bị bỏ qua.

## Flaky test

Flaky test là test lúc xanh lúc đỏ dù code không đổi. Ví dụ điển hình: test so màu của component **trong lúc transition còn đang chạy**, nên kết quả tùy vào thời điểm chụp. Cách sửa là kiểm giá trị cuối, hoặc tắt animation trong môi trường test, chứ không phải chạy lại cho tới khi qua.

Flaky không bao giờ ngẫu nhiên. Nó luôn có nguyên nhân (thời gian, animation, thứ tự, mạng), và thứ cần sửa là nguyên nhân.

## Lỗi hay gặp

- **Chỉ dựa vào snapshot DOM.** Snapshot đổi ở mọi thay đổi nhỏ, người ta bấm "update" theo thói quen, và test mất nghĩa.
- **Tìm phần tử bằng class CSS.** Đổi tên class là test vỡ, dù hành vi không đổi. Hãy query bằng role và tên.
- **Chỉ test trên Chrome.** Safari và Firefox có lỗi riêng, nhất là với focus, form và CSS mới.
- **Coi test accessibility tự động là đủ.** Xem [Accessibility trong design system](/vi/articles/ds-08-accessibility/).

## Nguồn

- [Storybook, Interaction tests](https://storybook.js.org/docs/writing-tests/interaction-testing)
- [Storybook, Vitest addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon)
- [Storybook, Accessibility tests](https://storybook.js.org/docs/writing-tests/accessibility-testing)
- [Storybook, Visual tests](https://storybook.js.org/docs/writing-tests/visual-testing)
- [Testing Library, About Queries](https://testing-library.com/docs/queries/about)
- [Playwright, Visual comparisons](https://playwright.dev/docs/test-snapshots)
- [Stylelint](https://stylelint.io/)
- [GitHub Docs, About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)

← Bài trước: [Viết documentation cho design system](/vi/articles/ds-11-documentation/) · Bài sau: [Versioning và phát hành design system](/vi/articles/ds-13-versioning-and-releases/) →
