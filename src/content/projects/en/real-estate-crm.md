---
title: "One unit, one owner"
role: "Product Owner, BA and Lead Designer"
year: "TODO" # năm bắt đầu dự án
summary: "A sales platform that moved a property group's whole sales force off spreadsheet inventories, built around the state of each unit."
facts:
  Year: "TODO"
  Platform: "Web admin, Mobile app for brokers" # TODO xác nhận phạm vi sếp thiết kế
  Team: "TODO: N designers, PM, engineers, QA and me"
  Role: "Product Owner, BA and Lead Designer, vendor side"
  Duration: "TODO"
  Status: "In production for over 2 years"
order: 99
draft: true
---

<!-- Nháp từ vault 10-projects/ontheshore/real-estate-crm-khung.md. Mọi chỗ TODO là dữ kiện sếp phải xác nhận. Phương án và trade-off ở D1–D3 sếp đã xác nhận 2026-10-31. Không nêu tên khách, sản phẩm, dự án, công ty outsource. -->

The key decision was to build the platform around the unit for sale, not the lead, and to hang every other module off that unit's state.

A large Vietnamese property group, developing its own projects and distributing other developers' projects, ran its sales inventory in spreadsheets. It asked for one system to replace them. I worked on the vendor side, on a team where nobody had built for real estate before.

## A spreadsheet row cannot say who holds a unit

- **One file per project.** Each project's inventory lived in its own spreadsheet. Adding a project meant adding a file, and nobody had one view across projects.
- **Status typed by hand.** A unit's status was a cell anyone could edit. The sheet could not say who was holding a unit, or until when.
- **Two brokers, one unit.** Without an owner or an expiry on a hold, two brokers could promise the same unit to two customers. The conflict surfaced at the deposit, the most expensive moment to find it.
- **No scale.** More projects and more brokers meant more files and more manual checks, so the system that had to grow was the one least able to.

## What changed after the switch

Both numbers compare the spreadsheet period with the period after the switch. <!-- TODO: cửa sổ đo nếu có -->

<dl class="stats">
  <div><dt>Sales staff on the platform</dt><dd class="v">All</dd><dd class="src">Spreadsheet inventories retired. Client's internal rollout report</dd></div>
  <div><dt>Close rate, lead to deposit</dt><dd class="v">~20% higher</dd><dd class="src">Internal estimate, rounded. A close is a signed deposit</dd></div>
  <div><dt>Time from first contact to deposit</dt><dd class="v">~40% faster</dd><dd class="src">Internal estimate, rounded. Measured from first contact with a lead</dd></div>
</dl>

- **Close rate also follows the market.** Launch timing and pricing move it too, so I report the change without claiming design caused all of it.

## My part and the team's

I held three roles because the project needed them and nobody else on the vendor side had the domain. Engineering owned the architecture; the client's sales leadership owned commercial policy.

- **Product direction.** Turned "replace Excel with one system" into an order of build, and argued that order with the client.
- **Business analysis.** Modelled the unit lifecycle and wrote the rules for holds, expiry and conflicts.
- **Design and design system.** Designed the product end to end, built and owned the design system, and led the design team working on it. <!-- TODO: số designer -->

## How one unit moves from open to contract

- **Inventory tree.** Project, then block or tower, then floor, then unit. One inventory holds projects from several developers, each with its own sales policy.
- **Unit states.** Available, Locked (one broker, one expiry), Reserved, Deposited, Contracted. An expired or cancelled hold returns the unit to Available.
- **Around the unit.** Customers, loyalty points, events and e-signing attach to the unit or its buyer. They are outside this page.

<!-- TODO ảnh: sơ đồ vòng đời căn, dựng lại bằng dữ liệu giả. Caption ≤ 80 ký tự -->

## Decision 1: the unit is the spine, the lead hangs off it

The client wanted everything in one system: inventory, customers, holds and deposits, loyalty, events. Three ways to start:

- **Put the spreadsheet online.** Fastest to ship, but it keeps the problem: a row with a status cell nobody owns.
- **A standard CRM, lead to pipeline, with inventory bolted on.** Familiar for CRM teams, but in primary sales the scarce thing is the unit, not the lead. Two leads can chase one unit; a pipeline does not show that.
- **Chosen: the unit as the core object.** A lead attaches to a unit when a broker locks it, and every later module reads the unit's state.

The trade-off: lead-funnel reporting came later than the client first expected.

## Decision 2: a hold has one owner and one expiry

In the spreadsheet, a hold was a word in a cell. The rules made it an object:

- **One owner.** Only one broker can lock a unit at a time, and everyone else sees who holds it.
- **One expiry.** A lock lapses on its own unless a manager confirms it. <!-- TODO: hạn giữ thật và ai xác nhận -->
- **Conflicts are visible.** A second broker trying to lock a held unit gets a clear state instead of a silent overwrite. <!-- TODO: chặn cứng, hàng chờ hay báo quản lý -->
- **Edge cases written down.** Price changes mid-launch, reservations taken before a unit is assigned, and partner developers with their own rules.

## Decision 3: one status language across admin and app

I owned all design work on the project, so the design system was mine from the first screen. The decision was what to build it around: status, not components.

- **One set of status tokens** (colour, badge, unit cell on the inventory grid) used by the web admin and the broker app alike.
- **Contribution rules** so several designers could add screens without inventing new states.
- **Cost.** The first module took longer. Every module after it reused the states, and staff moving off spreadsheets learnt one visual language instead of two.

## Rollout

<!-- TODO: cả công ty chuyển cùng lúc hay theo dự án/phòng ban; có giữ Excel song song không. Bỏ section nếu không có gì đáng kể -->

## Following one unit through the product

- **Inventory grid.** Floors by units, coloured by state, filtered by project, block and type. The screen brokers open first.
- **Lock on the app.** A broker picks a unit, attaches a customer and sees the expiry countdown.
- **Manager confirmation.** Pending locks queue for confirmation; expired ones release without anyone touching them.
- **Reserve and deposit.** The unit moves to Reserved, then Deposited, with the payment recorded against it.
- **Contract.** The deposited unit carries its customer and history into the contract step.

<!-- TODO ảnh: bảng hàng, lock trên app, hàng chờ xác nhận. Dựng lại bằng dữ liệu giả -->

Screens are rebuilt with sample data. Client, project and developer names, brand colours and internal labels are removed.

## What I would do differently

- **Decision 1.** I would show the client a lead report built on unit data earlier, so the delay felt like a sequence, not a cut. <!-- TODO -->
- **Decision 2.** I would write the edge cases before the happy path. <!-- TODO -->
- **Decision 3.** I would document the status tokens for engineering from day one, not after the second module. <!-- TODO -->

## Design

<!-- TODO: gallery 7 ảnh khác ảnh trong bài, theo cấu trúc .gallery của ecommerce-concept -->
