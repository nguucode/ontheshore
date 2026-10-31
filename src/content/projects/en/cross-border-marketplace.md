---
title: "One product, priced for every country it ships to"
role: "Product Owner, BA and Lead Product Designer"
year: "2023"
summary: "A multi-vendor marketplace, built by an outsourcing team with no e-commerce background, that turned cross-border halfway through: goods stocked in Vietnam, sold to buyers abroad."
facts:
  Platform: "Web app, Mobile app"
  Team: "Me and 2 designers, with the client's CEO, tech lead and PO"
  Role: "Product Owner, BA, Lead Product Designer"
  Duration: "3 years, shipped quarterly"
cover: "/projects/cross-border-marketplace/cover.svg"
order: 0
draft: false
---

The key decision was to hang every country-specific rule on the product rather than on the country, after sellers in the MVP test could not manage a catalogue organised the other way round.

## Cross-border arrived after the domestic marketplace was built

- **A new domain for the whole team.** The client wanted a Shopee-style marketplace. Nobody at the outsourcing company had built e-commerce before, so the product model had to be worked out, not copied from a past project.
- **A pivot mid-build.** With the domestic buyer app, seller tools and admin largely in place, the client decided to test cross-border selling first: stock stays in Vietnam, buyers order from other countries.
- **Rules the domestic model did not have.** Shipping fees, availability and costs now changed by destination. Every product, order and screen built so far assumed one country.

## What shipped

No figures here: the project is under NDA, and estimating them now would be guesswork.

- **Cross-border went live on the existing platform.** The domestic catalogue gained a country layer instead of a second system being built beside it.
- **The product structure was changed by testing, not by opinion.** The first structure was dropped after the MVP test, before it reached every surface.
- **Web app, mobile app and admin share one design system,** so the other designers could build new cross-border screens without me drawing each one.

## My part and the team's

I worked on the vendor side, across four roles. The client's CEO, tech lead and PO made the final calls; engineering owned the architecture.

- **Product direction.** I advised the client on what to build first, and re-planned the roadmap when cross-border came in.
- **Business analysis.** I turned client requirements into rules: product structure, order states and the fees attached to each country.
- **Design.** I designed the seller-side product flows myself and reviewed every screen the other designers produced.
- **Design system.** I set it up and ran the process for adding or changing components and patterns.

## How a cross-border order moves

- **Product.** One seller listing, with its variants.
- **Country.** Each destination a product ships to carries its own dropshipping fee, set per country.
- **Order.** Payment status and fulfilment status are tracked separately, the way Shopify does it.
- **Fulfilment.** Works like dropshipping: the seller in Vietnam packs and ships the item only once a buyer abroad has ordered it.
- **Outside this story.** Vouchers, campaigns, returns and payouts exist in the platform but are not covered here.

<figure class="shot">
  <img src="/projects/cross-border-marketplace/order-states.svg" alt="Diagram of one order tracked on two axes, payment and fulfilment, modelled on Shopify" loading="lazy" />
  <figcaption>Payment and fulfilment as two axes, modelled on Shopify.</figcaption>
</figure>

## Decision 1: test cross-border on the domestic core, then run both

The client asked to try cross-border before the domestic roadmap was finished. I planned it in three stages on one platform, not as a separate product.

- **Stage 1: domestic core.** Buyer app, seller tools and admin, enough to take and ship orders inside Vietnam.
- **Stage 2: cross-border test.** Countries and dropshipping fees added to the same products and orders.
- **Stage 3: one platform for both.** Domestic and cross-border selling side by side.
- **Cost.** Voucher and campaign features moved to later releases to make room for the test.

## Decision 2: borrow Shopify's order states instead of inventing ours

Without in-house e-commerce experience, an order model designed from scratch would have missed cases that mature platforms have already solved.

- **Problem.** A single status line breaks once payment and delivery move independently, and in cross-border they do: a paid order can still be waiting to ship from Vietnam.
- **Chosen.** Separate payment and fulfilment states, modelled on Shopify, with fulfilment run the dropshipping way.
- **Cost.** Sellers had more to learn than on a domestic marketplace. A small intermediary company was later set up to support them.

## Decision 3: Product → Country → Variants, after the opposite failed

- **First version.** Country → Product → Variants: the seller picks a market, then adds products and variants for it. It matched how fees are calculated.
- **Test.** In the MVP test, sellers found it too hard to manage products this way. The same product sat under several countries and had to be maintained in each.
- **Chosen.** Product → Country → Variants. The seller manages one product; countries are a section inside it, and each country brings its own dropshipping fee.

<figure class="shot">
  <img src="/projects/cross-border-marketplace/product-structure.svg" alt="Two product structures side by side: Country, Product, Variants dropped; Product, Country, Variants shipped" loading="lazy" />
  <figcaption>The dropped structure repeated each product under every country.</figcaption>
</figure>

## One product, from seller to buyer abroad

- **Seller app.** The product editor opens on the product, with a countries section that shows the fees for each destination.
- **Admin.** Orders show payment and fulfilment as two states, so the team can see what is paid and still waiting to ship.
- **Buyer app.** Buyers abroad see the product with the costs for their own country.

## Design system

- **Base.** Built on Untitled UI rather than from scratch, so the team started with a complete component set and spent its time on marketplace patterns.
- **Contribution.** New or changed components and patterns went through one add/enhance process, so the system grew without forking per surface.
- **What it unlocked.** The country section and the two order states became shared patterns, reused across web, mobile and admin.

## About the visuals

The diagrams are simplified reconstructions. Client screens, names and data are left out, and the project's figures are not published.

## What I would do differently

- **Documentation.** I would store project documents along the project timeline from the first month. The project grew too large for anyone to hold in memory, and handing work over meant rebuilding context each time.
- **Decision 3.** I would bring cross-border features in gradually while sellers were still selling domestically, guiding them one step at a time, and deliver the full cross-border flow after that.

