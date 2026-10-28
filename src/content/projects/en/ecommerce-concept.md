---
title: "One stock number, three channels"
role: "Lead Product Designer (concept)"
year: "Concept"
summary: "A concept case study: a seller admin and storefront for a D2C home goods brand selling on its own site, Shopee and TikTok Shop. Scenario and numbers are illustrative."
cover: "/projects/ecommerce-concept/cover.svg"
order: 99
draft: true
---

> **Concept case study.** The brand, team, timeline and every project number on this page are illustrative. They exist to test a case study structure. Industry benchmarks are real and cited.

| | |
|---|---|
| **Situation** | A mid-size home goods brand sold the same SKUs on its own site, Shopee and TikTok Shop, with stock tracked in spreadsheets. |
| **Role** | Lead Product Designer. Owned the seller admin end to end, co-owned the storefront checkout with the PM. 1 PM, 1 BA, 4 engineers, 7 months. |
| **Key decision** | Treat the SKU, not the order, as the unit that connects seller and buyer, and ship the admin to the ops team four weeks before the new storefront. |

<dl class="stats">
  <div><dt>Oversell incidents per month</dt><dd class="v">6<small>from 41</small></dd></div>
  <div><dt>Median order handling time</dt><dd class="v">9 min<small>from 26</small></dd></div>
  <div><dt>Own-site checkout completion</dt><dd class="v">44%<small>from 31%</small></dd></div>
</dl>

## Every oversell started as a spreadsheet lag

The ops team re-keyed stock into three channels twice a day. Between updates, the same last unit sold on two channels. Each oversell meant a cancelled order. On Shopee, cancellations count against the shop's performance score, and a low score can get listings restricted. Buyers saw the other side of it: a product marked in stock, then a cancellation SMS a day later.

The brand's own site had a second problem. Shipping fees only appeared at the last checkout step, and account creation was mandatory. Both match [Baymard's top abandonment causes](https://baymard.com/lists/cart-abandonment-rate): extra costs at 40%, forced accounts at 18% (2025).

## What changed, measured against eight weeks of pre-launch logs

Each number compares 12 weeks after launch with the 8 weeks before it.

<dl class="stats">
  <div><dt>Oversell incidents per month</dt><dd class="v">6<small>from 41</small></dd><dd class="src">Cancelled orders tagged "out of stock" in the admin, compared with the spreadsheet log</dd></div>
  <div><dt>Median order handling time</dt><dd class="v">9 min<small>from 26</small></dd><dd class="src">Order created to handed to carrier, from admin timestamps</dd></div>
  <div><dt>Own-site checkout completion</dt><dd class="v">44%<small>from 31%</small></dd><dd class="src">GA4 funnel, sessions reaching checkout to purchase</dd></div>
  <div><dt>COD failed-delivery rate</dt><dd class="v">11%<small>from 14%</small></dd><dd class="src">Carrier return reports, GHN and GHTK</dd></div>
</dl>

Checkout completion is not conversion rate. For reference, [Littledata's Shopify median conversion](https://www.littledata.io/average/ecommerce-conversion-rate-(all-devices)) is 1.4% (Oct 2026). The COD change is small and overlaps a seasonal dip, so I report it without claiming the design caused it.

## My part and the team's

I ran seller interviews and shadowed the ops team, defined the order and inventory model with the BA, and designed every admin screen. The PM and I split the storefront: I owned the product page and checkout, the PM owned merchandising and promotions. Engineering chose the sync architecture. I argued for the reconciliation screen to be in the first release, and lost that argument until week 10.

## How one order moves, and where it breaks

An order has three independent states: payment (prepaid, or COD pending until the carrier pays out), fulfillment, and returns. Stock has three numbers per location: available, committed to open orders, and incoming. Oversells happen when "available" on one channel ignores "committed" on another. Money arrives from two directions: marketplaces pay out minus fees, carriers pay out COD minus shipping. Both have to match back to individual orders.

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

Engineering proposed auto-matching marketplace listings to internal SKUs by product name, to launch sync faster. I prototyped it on the real catalog. Variant names differed across channels for 18% of listings, so auto-match would have produced silent stock errors, which are worse than visible ones. We built a mapping screen and an unmapped-listings queue instead. Sync for a product switches on only once all its variants are mapped. This added three weeks.

<figure class="shot">
  <img src="/projects/ecommerce-concept/sku-mapping.svg" alt="SKU mapping screen with a queue of unmapped listings and a warning that a name match is not applied automatically" loading="lazy" />
  <figcaption>A name match is only a suggestion. Sync stays off until the last variant is mapped.</figcaption>
</figure>

## Decision 3: ship the admin first, storefront second

A joint launch would have looked better in a deck. But the storefront's accuracy depended on admin data: a "2 left" badge is only true if stock is synced. The ops team got four weeks on the new admin while the old site stayed live. Those weeks surfaced 23 mapping and status bugs before any buyer saw a stock number.

Rollout went to 2 ops staff for one week, then the full team for three weeks, then the storefront at 20% of traffic for two weeks before 100%. The old spreadsheets stayed read-only for a month as a fallback. Nobody opened them after week two.

## The admin and the storefront, joined by the same stock number

In the admin, inventory shows available, committed and incoming per location, and alerts fire on available only. Each location carries a channel buffer, so a marketplace never lists the last unit. COD reconciliation matches each carrier payout session to its orders and deducted fees. It shipped in week 10.

On the storefront, the product page shows the shipping fee and a delivery date before add to cart. Checkout is guest by default, with one line explaining why the phone number is required: the courier calls before delivery. A COD confirmation goes out on Zalo before the order is packed. I framed that as a hypothesis to A/B test, not a proven fix.

## What I would do differently

- **Decision 1.** I underestimated the mapping table. It grew from 9 to 27 state combinations. Next time I would design the edge cases, such as a partial refund on a COD order, before the happy-path tabs.
- **Decision 2.** The three-week delay was right, but I should have shown engineering the 18% mismatch data before proposing the alternative, not after. It would have saved a week of debate.
- **Decision 3.** I would push the reconciliation screen into the first release. Ops spent the gap reconciling by hand, which was exactly the work we set out to remove.

## Screens

Scroll sideways for the full set. Each screen opens at full size.

<div class="gallery" tabindex="0" role="region" aria-label="Screens, scroll sideways">
  <figure class="shot">
    <a href="/projects/ecommerce-concept/order-list.svg"><img src="/projects/ecommerce-concept/order-list.svg" alt="Order list with task tabs and bulk actions" loading="lazy" /></a>
    <figcaption>1 / 5 · Orders: task tabs and bulk actions</figcaption>
  </figure>
  <figure class="shot">
    <a href="/projects/ecommerce-concept/inventory.svg"><img src="/projects/ecommerce-concept/inventory.svg" alt="Inventory by location with low and out-of-stock alerts and channel buffers" loading="lazy" /></a>
    <figcaption>2 / 5 · Inventory: available, committed, incoming per location</figcaption>
  </figure>
  <figure class="shot">
    <a href="/projects/ecommerce-concept/sku-mapping.svg"><img src="/projects/ecommerce-concept/sku-mapping.svg" alt="SKU mapping with unmapped listings queue" loading="lazy" /></a>
    <figcaption>3 / 5 · SKU mapping: the gate before sync</figcaption>
  </figure>
  <figure class="shot">
    <a href="/projects/ecommerce-concept/cod-reconciliation.svg"><img src="/projects/ecommerce-concept/cod-reconciliation.svg" alt="COD reconciliation matching carrier payout sessions to orders, with two unmatched orders" loading="lazy" /></a>
    <figcaption>4 / 5 · COD reconciliation: payout sessions matched to orders</figcaption>
  </figure>
  <figure class="shot">
    <a href="/projects/ecommerce-concept/storefront.svg"><img src="/projects/ecommerce-concept/storefront.svg" alt="Product page with shipping fee and delivery date, and a guest checkout with COD selected" loading="lazy" /></a>
    <figcaption>5 / 5 · Storefront: cost and delivery before the cart, guest checkout</figcaption>
  </figure>
</div>
