---
title: "What a design system is, and when you need one"
date: 2025-11-04
summary: "A design system is a set of shared interface decisions packaged so others can reuse them: what it contains, how it differs from a UI kit or a component library, and how much of it a team actually needs."
---

Part 1 of 15 in *Design systems from the ground up*.

A design system is a set of shared interface decisions, packaged so that other people can reuse them: tokens, components, patterns, documentation, and the process that keeps all of it current.

A Figma file is not a design system. Neither is a code library. Both are places where the decisions are stored. The value comes from deciding once, using the decision everywhere, and changing it in one place.

A small team with one product and an interface that is still moving does not need the full thing. A set of tokens and a handful of components is enough to start.

## An everyday comparison

Picture a coffee chain with 30 branches.

- **The recipe** (grams of coffee, millilitres of milk) is a **token**: a base value everyone follows.
- **A drink on the menu** is a **component**: built from recipes, finished, ordered by name.
- **The breakfast combo** (coffee plus a pastry) is a **pattern**: several items combined for a familiar situation.
- **The operations manual** (which drink to serve when, which ones never get ice) is the **documentation and guidelines**.
- **The process for changing a recipe** (who can change it, how branches hear about it, how long they have to switch) is **governance and versioning**.

With recipes but no change process, every branch makes its coffee differently within six months. Design systems usually fail the same way. Not from a shortage of components, but because nobody keeps the decisions in force.

## Terms that get mixed up

| Term | What it is | What it lacks |
|---|---|---|
| **Style guide** | A document describing colour, type, logo and tone | No usable components, no code |
| **UI kit** | A design file of ready-made interface parts, usually in Figma | Design side only: no code, no usage rules |
| **Component library** | A code library of components (React, Vue and so on) | Often missing the reasoning, the guidelines and the link to design |
| **Pattern library** | A collection of solutions to recurring UI problems, such as a sign-in form or a data table | Usually no token layer underneath |
| **Design system** | All of the above, connected by shared tokens, documented, with a process for change | |

A quick test: if the primary brand colour changes, how many places need a manual edit? If the answer is "one, and Figma and code both follow", that is a design system. If the answer is "we'd have to go and find them", it is a collection.

## The six parts

Most large public systems (Google's Material, IBM's Carbon, Shopify's Polaris, the GOV.UK Design System) have the same six parts under different names.

1. **Foundations.** Colour, type, spacing, radius, elevation, motion, grid, expressed as design tokens. Parts [3](/articles/ds-03-design-tokens/) to [6](/articles/ds-06-spacing-sizing-layout/) of this series cover them.
2. **Components.** Button, Input, Modal, each with an anatomy, variants, states and an API. See [part 7](/articles/ds-07-component-design/).
3. **Patterns.** How components combine for a situation: a form, an empty state, a filterable table. See [part 2](/articles/ds-02-mental-models/).
4. **Documentation.** When to use something, when not to, correct and incorrect examples, accessibility notes. See [part 11](/articles/ds-11-documentation/).
5. **Tooling.** The Figma library, the npm package, token build scripts, lint, tests. See [part 10](/articles/ds-10-design-and-code/) and [part 12](/articles/ds-12-testing-and-quality/).
6. **Governance.** Who decides, who contributes, how releases work, how a component is retired. See [part 13](/articles/ds-13-versioning-and-releases/) and [part 14](/articles/ds-14-governance-and-adoption/).

Newcomers skip the sixth part more than any other. It is also the one that decides how long the system survives.

## Worked example: GOV.UK through the six parts

The UK government's GOV.UK Design System is a good one to study because everything is public, including how decisions get made.

| Part | What GOV.UK has |
|---|---|
| Foundations | **Styles**: colour, typography, spacing, layout, icons |
| Components | **Components**: button, radios, date input, error summary and more |
| Patterns | **Patterns**, grouped by what the user needs to do: "Ask users for…" (an address, a date of birth), "Help users to…" (create an account, check their answers), and "Pages" (error pages, confirmation pages) |
| Documentation | Most pages carry "When to use", "When not to use" and "How it works", and many link to user research |
| Tooling | The GOV.UK Frontend code package, and a Prototype Kit for building prototypes with the real components |
| Governance | **Community**: published contribution criteria and a process for proposing new components ([part 14](/articles/ds-14-governance-and-adoption/)) |

The lesson worth taking: GOV.UK writes its governance down in public, like every other part. An outsider can read exactly what a new component has to prove before it gets in.

## What a design system fixes

| Problem without a system | How a system handles it |
|---|---|
| Ten nearly identical greys in one product | Tokens limit the choices to defined steps |
| A different button on every screen | Shared components with named variants |
| Designers and developers arguing over 14px or 16px | Both read the same token by the same name |
| Accessibility redone on every screen | Built once into the component, inherited everywhere it is used |
| A rebrand that takes weeks | Change token values in one place |
| New joiners unsure what to follow | The docs answer the question |

A system does not make a product better looking on its own. It makes the product **consistent** and **cheaper to change**. A consistent system that looks bad looks bad everywhere.

## When you need one, and when you don't

Nathan Curtis of EightShapes, who has written more than anyone about running design systems, describes three ways to staff one. **Solitary**: one team builds a system for its own product and others follow along. **Centralized**: a dedicated team builds the system for many product teams. **Federated**: designers from several product teams decide together. [Part 14](/articles/ds-14-governance-and-adoption/) goes deeper. The point for now: the size of the system should match the size of the organisation.

A practical guide:

- **One person, one product, interface still finding its direction:** basic tokens and a few core components. No full documentation, no versioning process yet.
- **One stable product, a team of 3 to 10:** tokens in all three tiers, tested components, minimal docs (when to use it, what the props do).
- **Several products, several teams:** all six parts, a named owner for the system, and a defined process for contribution and release.

Signs you started too early: writing docs for components nobody uses yet, setting up a review process for a team of one, designing tokens for five brands when there is only one.

## Common mistakes

- **Treating the Figma library as the design system.** Figma is one container. If code does not read the same tokens, the two drift apart within weeks.
- **Starting with components and skipping tokens.** Components built on hard-coded values (`#3B82F6`, `16px`) have to be rebuilt the first time you add dark mode or change the brand.
- **Measuring success by component count.** A system with 80 components nobody uses loses to one with 15 that every screen uses.
- **No owner.** A system without an owner gets quietly forked inside each product.

## Sources

- [Brad Frost, *Atomic Design*, chapters 1 and 2](https://atomicdesign.bradfrost.com/)
- [Nathan Curtis, "Team Models for Scaling a Design System" (EightShapes, 2015)](https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0)
- [Material Design 3](https://m3.material.io/)
- [Carbon Design System (IBM)](https://carbondesignsystem.com/)
- [Shopify Polaris](https://shopify.dev/docs/api/polaris)
- [GOV.UK Design System](https://design-system.service.gov.uk/)
- [GOV.UK Design System, Patterns](https://design-system.service.gov.uk/patterns/)

Next: [Mental models for structuring a design system](/articles/ds-02-mental-models/) →
