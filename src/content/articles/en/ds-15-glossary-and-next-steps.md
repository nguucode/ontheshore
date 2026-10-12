---
title: "Glossary and what to read next"
date: 2026-05-26
summary: "A three-stage reading path with exercises on public design systems, the systems worth studying, and a glossary of the terms used across the series."
---

Part 15 of 15 in *Design systems from the ground up*.

The fastest way to learn design systems is to read real ones, docs and source code both, and to build a small one yourself.

This last part turns the series into a path with three stages: foundations, building, and running a system. Each stage lists what to read and a few exercises you can do on public systems, with no project of your own required. A glossary of every term used in the series closes it out.

## Stage 1: Foundations

Parts: [1](/articles/ds-01-what-is-a-design-system/), [2](/articles/ds-02-mental-models/), [3](/articles/ds-03-design-tokens/), [4](/articles/ds-04-color/), [5](/articles/ds-05-typography/), [6](/articles/ds-06-spacing-sizing-layout/), [8](/articles/ds-08-accessibility/).

Read next:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): the [Understanding](https://www.w3.org/WAI/WCAG22/Understanding/) page for each criterion in Part 8, not the whole standard.
- [Radix Colors](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale): the palette composition docs.
- [Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/): the sections on types and aliases.

Exercises:

1. Open the [shadcn/ui theming page](https://ui.shadcn.com/docs/theming) and pick five colour variables. Write one sentence on what each is for, then guess which step of the Radix 12-step scale it maps to.
2. With any contrast checker, measure the secondary text colour (`muted-foreground`) on the page background (`background`) and on the muted surface (`muted`) in shadcn/ui, in both light and dark. Write down the ratios.
3. Write a small DTCG token file by hand: a five-step gray ramp and four semantic tokens that alias into it.

## Stage 2: Building

Parts: [7](/articles/ds-07-component-design/), [9](/articles/ds-09-theming-and-modes/), [10](/articles/ds-10-design-and-code/), [11](/articles/ds-11-documentation/), [12](/articles/ds-12-testing-and-quality/).

Read next:

- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/): the Dialog, Combobox and Tabs patterns.
- The source of one component in [Base UI](https://base-ui.com/) or [Radix Primitives](https://www.radix-ui.com/primitives), Dialog for example.
- [Storybook docs on writing tests](https://storybook.js.org/docs/writing-tests).

Exercises:

1. Pick a component from [Material Design 3](https://m3.material.io/). Draw its anatomy and a table of its variant axes.
2. Using only the keyboard, go through Select, Dialog and Tabs on the Radix or Base UI docs. Note which key does what and where focus goes, then compare with the APG.
3. In the [Radix Themes](https://www.radix-ui.com/themes) playground, set `scaling` to 90% and `radius` to `full`. Check whether the smallest hit area still reaches 24px, and whether text inputs turn into pills.

## Stage 3: Running a system

Parts: [13](/articles/ds-13-versioning-and-releases/), [14](/articles/ds-14-governance-and-adoption/).

Read next:

- [Semantic Versioning](https://semver.org/), all of it. It is short.
- The Community section of the [GOV.UK Design System](https://design-system.service.gov.uk/community/): how proposals come in, the criteria, and the discussion history on GitHub.
- Nathan Curtis on [team models](https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0).

Exercises:

1. Read the changelog of a large library (Radix, MUI, Base UI) for one major release. For each breaking change, ask whether someone upgrading would know exactly what to do.
2. Read one component proposal in the GOV.UK Design System's GitHub. What evidence does it give for being useful and unique?
3. List five design system rules that normally live only in docs. For each, propose a way for a machine to check it.

## Systems worth reading

| System | Read it for |
|---|---|
| **[Material Design 3](https://m3.material.io/)** (Google) | Three-tier tokens (reference, system, component), component page structure, motion. Very complete, with many Android-specific conventions. |
| **[Carbon](https://carbondesignsystem.com/)** (IBM) | Data-dense enterprise products and their patterns. Close to B2B needs. |
| **[Polaris](https://polaris.shopify.com/)** (Shopify) | Content guidelines and admin UI. Moving toward web components. |
| **[GOV.UK Design System](https://design-system.service.gov.uk/)** | User research, accessibility and the contribution process. Simple visuals, rigorous method. |
| **[Atlassian Design System](https://atlassian.design/)** | Colour tokens named by emphasis, from subtlest to boldest. Its spacing token numbers differ from other systems, so read carefully. |
| **[Radix](https://www.radix-ui.com/)** (Colors, Primitives, Themes) | The 12-step colour scale and theming by axis. |
| **[Base UI](https://base-ui.com/), [React Aria](https://react-spectrum.adobe.com/react-aria/)** | Accessible behaviour in headless primitives. Read the source and the tests. |
| **[shadcn/ui](https://ui.shadcn.com/)** | The copy-source model, registries, token naming conventions. |

## Glossary

| Term | Meaning | Part |
|---|---|---|
| **ADR** | Architecture Decision Record: a short record of a large decision and its reasons | [14](/articles/ds-14-governance-and-adoption/) |
| **Alias** | A token that points to another token instead of holding its own value | [3](/articles/ds-03-design-tokens/) |
| **Anatomy** | An exploded drawing of a component with each part numbered | [7](/articles/ds-07-component-design/) |
| **APCA** | A contrast algorithm proposed during WCAG 3 work; not a conformance standard | [4](/articles/ds-04-color/) |
| **APG** | ARIA Authoring Practices Guide: expected behaviour for each widget type | [8](/articles/ds-08-accessibility/) |
| **ARIA** | Attributes that add semantics for assistive technology | [8](/articles/ds-08-accessibility/) |
| **Atomic Design** | A five-level model: atoms, molecules, organisms, templates, pages | [2](/articles/ds-02-mental-models/) |
| **Breaking change** | A change that forces consumers to edit their code | [13](/articles/ds-13-versioning-and-releases/) |
| **Breakpoint** | A viewport width at which the layout changes | [6](/articles/ds-06-spacing-sizing-layout/) |
| **Changeset** | A file recording one change and its version bump, collected at release | [13](/articles/ds-13-versioning-and-releases/) |
| **Code Connect** | A Figma feature linking Figma components to real code | [10](/articles/ds-10-design-and-code/) |
| **Component** | A reusable piece of UI with an API | [7](/articles/ds-07-component-design/) |
| **Composition** | How components combine: by config (passing data) or compound (nesting children) | [7](/articles/ds-07-component-design/) |
| **Container query** | Layout that responds to the size of its container, not the viewport | [6](/articles/ds-06-spacing-sizing-layout/) |
| **Contrast ratio** | The luminance ratio between two colours, from 1:1 to 21:1 | [4](/articles/ds-04-color/) |
| **Control tier** | A size step that locks height, padding, icon size and radius together | [6](/articles/ds-06-spacing-sizing-layout/) |
| **Controlled, uncontrolled** | State held by the consumer, or by the component itself | [7](/articles/ds-07-component-design/) |
| **Density** | How tightly packed an interface is | [9](/articles/ds-09-theming-and-modes/) |
| **Deprecation** | Marking something for removal, with a replacement path | [13](/articles/ds-13-versioning-and-releases/) |
| **Detach** | Breaking a Figma instance from its main component; it stops receiving updates | [10](/articles/ds-10-design-and-code/) |
| **DTCG** | The W3C Design Tokens Community Group, authors of the token format standard | [3](/articles/ds-03-design-tokens/) |
| **Elevation** | Visual height, usually shown with shadow | [6](/articles/ds-06-spacing-sizing-layout/) |
| **Focus ring** | The outline showing which element has keyboard focus | [8](/articles/ds-08-accessibility/) |
| **Foundations** | Tokens and base conventions: colour, type, spacing and so on | [1](/articles/ds-01-what-is-a-design-system/), [2](/articles/ds-02-mental-models/) |
| **Governance** | How a system makes decisions and accepts contributions | [14](/articles/ds-14-governance-and-adoption/) |
| **Headless primitive** | A library that provides behaviour without styles (Base UI, Radix, React Aria) | [7](/articles/ds-07-component-design/) |
| **Mode** | One fixed set of values along an axis: light or dark, compact or comfortable | [9](/articles/ds-09-theming-and-modes/) |
| **OKLCH** | A colour space defined by lightness, chroma and hue, close to how eyes perceive colour | [4](/articles/ds-04-color/) |
| **Pattern** | A recurring way of combining components for one situation | [2](/articles/ds-02-mental-models/) |
| **Play function** | An interaction script that runs on a story and doubles as a test | [12](/articles/ds-12-testing-and-quality/) |
| **POUR** | The four WCAG principles: Perceivable, Operable, Understandable, Robust | [8](/articles/ds-08-accessibility/) |
| **Primitive token** | A raw value with no meaning attached, such as `gray-500` | [3](/articles/ds-03-design-tokens/) |
| **Ramp** | The light-to-dark steps of one colour | [4](/articles/ds-04-color/) |
| **Registry** | A copy-source distribution channel in the shadcn style | [13](/articles/ds-13-versioning-and-releases/) |
| **Scaling** | A factor that resizes everything at once (Radix Themes: 90% to 110%) | [9](/articles/ds-09-theming-and-modes/) |
| **Semantic token** | A token named for its role, such as `danger` or `border`; the tier components read | [3](/articles/ds-03-design-tokens/) |
| **Semver** | The MAJOR.MINOR.PATCH versioning convention | [13](/articles/ds-13-versioning-and-releases/) |
| **Solitary, centralized, federated** | Three team models for running a design system | [14](/articles/ds-14-governance-and-adoption/) |
| **Source of truth** | The one place a given kind of decision is edited | [10](/articles/ds-10-design-and-code/) |
| **Space toggle** | A CSS technique that uses `initial` or an empty value as a switch for nested themes | [9](/articles/ds-09-theming-and-modes/) |
| **Status** | How far a component can be trusted: experimental, stable, deprecated | [11](/articles/ds-11-documentation/) |
| **Story** | One state of a component in Storybook | [11](/articles/ds-11-documentation/) |
| **Target size** | The size of a hit area; WCAG 2.5.8 asks for at least 24 by 24 CSS pixels | [6](/articles/ds-06-spacing-sizing-layout/), [8](/articles/ds-08-accessibility/) |
| **Template** | A page assembled from patterns and components, running on placeholder data | [2](/articles/ds-02-mental-models/) |
| **Theme** | A combination of choices across several theming axes | [9](/articles/ds-09-theming-and-modes/) |
| **Token** | A named design decision | [3](/articles/ds-03-design-tokens/) |
| **Variable (Figma)** | The design-side token, with collections, modes and scopes | [10](/articles/ds-10-design-and-code/) |
| **Variant** | A version of a component; best split along independent axes | [7](/articles/ds-07-component-design/) |
| **Visual regression test** | Comparing screenshots with a baseline to catch unintended visual changes | [12](/articles/ds-12-testing-and-quality/) |
| **WCAG** | The W3C accessibility standard; the current version is 2.2 | [4](/articles/ds-04-color/), [8](/articles/ds-08-accessibility/) |

## Sources

- [W3C, Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C WAI, Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/)
- [W3C WAI, ARIA Authoring Practices Guide, Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [W3C Design Tokens Community Group, Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/)
- [Radix Colors, Understanding the scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)
- [Radix Themes](https://www.radix-ui.com/themes)
- [shadcn/ui, Theming](https://ui.shadcn.com/docs/theming)
- [Storybook, Writing tests](https://storybook.js.org/docs/writing-tests)
- [Semantic Versioning 2.0.0](https://semver.org/)
- [GOV.UK Design System, Community](https://design-system.service.gov.uk/community/)
- [Nathan Curtis, *Team Models for Scaling a Design System* (EightShapes, 2015)](https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0)
- Each earlier part in the series lists its own sources at the end.

← Previous: [Governance and adoption](/articles/ds-14-governance-and-adoption/)
