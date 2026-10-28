---
title: "One stock number, three channels"
role: "Lead Product Designer (concept)"
year: "2022"
summary: "A concept case study: a seller admin and storefront for a D2C home goods brand selling on its own site, Shopee and TikTok Shop. Scenario and numbers are illustrative."
cover: "/projects/ecommerce-concept/cover.svg"
facts:
  Year: "2022"
  Platform: "Desktop, Tablet, Phone"
  Team: "11 people: 1 PM, 1 BA, 6 engineers, 2 QA and me"
  Role: "Lead Product Designer"
  Duration: "6 months"
  Website: "https://google.com" # tạm, thay bằng link thật
  Figma: "https://google.com" # tạm, thay bằng link thật
order: 99
draft: true
---

The key decision was to treat the SKU, not the order, as the unit that connects seller and buyer, and to ship the admin to the ops team four weeks before the new storefront.

## Every oversell started as a spreadsheet lag

- **Oversells.** The ops team re-keyed stock into three channels twice a day. Between updates, the same last unit sold on two channels and the order had to be cancelled.
- **Shop penalties.** On Shopee, cancellations count against the shop's performance score, and a low score can get listings restricted.
- **Buyer trust.** Buyers saw a product marked in stock, then a cancellation SMS a day later.
- **Checkout friction on the own site.** Shipping fees only appeared at the last step and account creation was mandatory. Both match [Baymard's top abandonment causes](https://baymard.com/lists/cart-abandonment-rate): extra costs at 40%, forced accounts at 18% (2025).

## What changed, measured against eight weeks of pre-launch logs

Each number compares 12 weeks after launch with the 8 weeks before it.

<dl class="stats">
  <div><dt>Oversell incidents per month</dt><dd class="v">6</dd><dd class="src">Baseline 41. Cancelled orders tagged "out of stock" in the admin, compared with the spreadsheet log</dd></div>
  <div><dt>Median order handling time</dt><dd class="v">9 min</dd><dd class="src">Baseline 26 min. Order created to handed to carrier, from admin timestamps</dd></div>
  <div><dt>Own-site checkout completion</dt><dd class="v">44%</dd><dd class="src">Baseline 31%. GA4 funnel, sessions reaching checkout to purchase</dd></div>
  <div><dt>COD failed-delivery rate</dt><dd class="v">11%</dd><dd class="src">Baseline 14%. Carrier return reports, GHN and GHTK</dd></div>
</dl>

- **Checkout completion is not conversion rate.** For reference, [Littledata's Shopify median conversion](https://www.littledata.io/average/ecommerce-conversion-rate-(all-devices)) is 1.4% (Oct 2026).
- **The COD change is small** and overlaps a seasonal dip, so I report it without claiming the design caused it.

## My part and the team's

My work covered three areas. The PM owned merchandising and promotions, and engineering owned the sync architecture.

- **Design direction.** Ran seller interviews and shadowed the ops team, then set the direction both the admin and the storefront followed.
- **Design system.** Set up and maintained one component library for both products: data tables, status tags, stat cards and form patterns, with token names agreed with engineering.
- **UI/UX delivery.** Defined the order and inventory model with the BA, designed every admin screen, and owned the storefront product page and checkout.

## How one order moves, and where it breaks

- **Order states.** Three independent axes: payment (prepaid, or COD pending until the carrier pays out), fulfillment, and returns.
- **Stock numbers.** Three per location: available, committed to open orders, and incoming. Oversells happen when "available" on one channel ignores "committed" on another.
- **Money flows.** Marketplaces pay out minus fees; carriers pay out COD minus shipping. Both have to match back to individual orders.

<figure class="shot">
  <img src="/projects/ecommerce-concept/order-lifecycle.svg" alt="Diagram of the payment, fulfillment and return states of one order, with the three stock numbers per location" loading="lazy" />
  <figcaption>Three states stored separately. Failed delivery branches off from in transit and puts the unit back in stock.</figcaption>
</figure>

## Decision 1: store three status axes, show one to-do list

The ops team already knew Shopee's tab model and had no time for retraining. Three options:

- **Copy Shopee's single linear status.** Familiar, but it cannot represent a COD order that is delivered and still unpaid.
- **Expose all three axes, Shopify style.** Accurate, but slow to scan for a team handling 300 orders a day.
- **Chosen: three axes in the data model, shown as task tabs** (To confirm, To pack, In transit, Failed delivery, Returned). Each tab is a saved filter over state combinations.

The trade-off: the BA had to own a state-to-tab mapping table, and every new edge case meant updating it.

<figure class="shot">
  <img src="/projects/ecommerce-concept/order-list.svg" alt="Order list with task tabs, three selected orders and a bulk action bar" loading="lazy" />
  <figcaption>Task tabs over the three axes. The bulk bar states its scope: this page, or all 42 matching orders.</figcaption>
</figure>

## Decision 2: no sync until every SKU is mapped

- **Proposal.** Engineering wanted to auto-match marketplace listings to internal SKUs by product name, to launch sync faster.
- **Test.** I prototyped it on the real catalog. Variant names differed across channels for 18% of listings, so auto-match would have produced silent stock errors, which are worse than visible ones.
- **Chosen.** A mapping screen and an unmapped-listings queue. Sync for a product switches on only once all its variants are mapped.
- **Cost.** Three extra weeks.

<figure class="shot">
  <img src="/projects/ecommerce-concept/sku-mapping.svg" alt="SKU mapping screen with a queue of unmapped listings and a warning that a name match is not applied automatically" loading="lazy" />
  <figcaption>A name match is only a suggestion. Sync stays off until the last variant is mapped.</figcaption>
</figure>

## Decision 3: ship the admin first, storefront second

A joint launch would have looked better in a deck. But the storefront's accuracy depended on admin data: a "2 left" badge is only true if stock is synced.

- **Weeks 1 to 4: admin only.** 2 ops staff for one week, then the full team for three, while the old site stayed live. This surfaced 23 mapping and status bugs before any buyer saw a stock number.
- **Weeks 5 and 6: storefront at 20% of traffic,** then 100%.
- **Fallback.** The old spreadsheets stayed read-only for a month. Nobody opened them after week two.

## The admin and the storefront, joined by the same stock number

In the admin:

- **Inventory alerts** fire on available stock only, and each location carries a channel buffer so a marketplace never lists the last unit.
- **COD reconciliation** matches each carrier payout session to its orders and deducted fees. It shipped in week 10.

On the storefront:

- **Product page** shows the shipping fee and a delivery date before add to cart.
- **Checkout** is guest by default, with one line explaining why the phone number is required: the courier calls before delivery.
- **COD confirmation** goes out on Zalo before the order is packed. I framed that as a hypothesis to A/B test, not a proven fix.

## What I would do differently

- **Decision 1.** I underestimated the mapping table. It grew from 9 to 27 state combinations. Next time I would design the edge cases, such as a partial refund on a COD order, before the happy-path tabs.
- **Decision 2.** The three-week delay was right, but I should have shown engineering the 18% mismatch data before proposing the alternative, not after. It would have saved a week of debate.
- **Decision 3.** I would push the reconciliation screen into the first release. Ops spent the gap reconciling by hand, which was exactly the work we set out to remove.

## Screens

Screens not shown above. Scroll sideways; each opens at full size.

<div class="gallery" tabindex="0" role="region" aria-label="Screens, scroll sideways">
  <figure class="shot">
    <a href="/projects/ecommerce-concept/inventory.svg"><img src="/projects/ecommerce-concept/inventory.svg" alt="Inventory by location with low and out-of-stock alerts and channel buffers" loading="lazy" /></a>
    <figcaption>1 / 3 · Inventory: low and out-of-stock alerts, channel buffers</figcaption>
  </figure>
  <figure class="shot">
    <a href="/projects/ecommerce-concept/cod-reconciliation.svg"><img src="/projects/ecommerce-concept/cod-reconciliation.svg" alt="COD reconciliation matching carrier payout sessions to orders, with two unmatched orders" loading="lazy" /></a>
    <figcaption>2 / 3 · COD reconciliation: payout sessions matched to orders</figcaption>
  </figure>
  <figure class="shot">
    <a href="/projects/ecommerce-concept/storefront.svg"><img src="/projects/ecommerce-concept/storefront.svg" alt="Product page with shipping fee and delivery date, and a guest checkout with COD selected" loading="lazy" /></a>
    <figcaption>3 / 3 · Storefront: cost and delivery before the cart, guest checkout</figcaption>
  </figure>
</div>
