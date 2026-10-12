---
title: "Mental models for structuring a design system"
date: 2025-11-18
summary: "Every design system is built in layers, small parts composing into larger ones: Atomic Design, how large public systems split their layers, and the one rule that keeps layers reusable."
---

Part 2 of 15 in *Design systems from the ground up*.

Every design system is arranged in layers, with small parts composing into larger ones. The best-known model is Brad Frost's Atomic Design: atoms, molecules, organisms, templates, pages.

The rule that matters most in any layered model is that dependencies point one way. Upper layers use lower layers. Lower layers never know the upper ones exist.

What you call each layer matters less than whether the whole team means the same thing by each name.

## Atomic Design in one table

Frost borrows from chemistry: atoms combine into molecules, molecules into organisms. His definitions, paraphrased closely:

| Layer | Definition | Example |
|---|---|---|
| **Atoms** | UI elements that can't be broken down further; the basic building blocks | A label, a plain input, a plain button |
| **Molecules** | Groups of atoms forming relatively simple components | A search field: label, input and button |
| **Organisms** | Relatively complex components that form a distinct section of an interface | A header: logo, navigation and search |
| **Templates** | Components placed in a layout, showing the content structure | A product list page skeleton, no real data |
| **Pages** | Templates filled with real content, showing the variations | The same page with three real products, an empty state and an error state |

Frost is explicit that Atomic Design is **not a linear process**. You don't finish every atom before starting on molecules. It is a way of looking: at any point you can zoom in on one part or out to the whole page.

## Why layering pays off

Think of Lego. A 2×4 brick doesn't know whether it will end up in a castle or a spaceship. Because it doesn't know, it works for both.

A design system works the same way.

- **A Button must not know it sits inside a Modal.** Once Button contains logic like "inside a Modal, use a different margin", it stops being reusable, and Modal can't change without touching Button.
- **A token must not know about components.** A token called `danger` is fine. A token called `button-delete-red` is not. See [part 3](/articles/ds-03-design-tokens/).

This is the **one-way dependency rule**. Drawn out:

```
Foundations (tokens)
      ▲ used by
Components (Button, Input, Modal)
      ▲ used by
Patterns (sign-in form, filterable table)
      ▲ used by
Templates (a complete admin page)
      ▲ used by
The real product
```

Arrows only point up. Whenever you see one pointing down (a component reading a pattern's state, a token named after a component), something needs fixing.

## How large systems split their layers

None of the big public systems uses Atomic Design's names. The structure underneath is close to identical.

| Atomic Design | Material 3, Carbon (IBM), GOV.UK |
|---|---|
| (the layer below atoms) | Material: Foundations and Styles. Carbon: Elements (color, type, spacing…). GOV.UK: Styles |
| Atoms and molecules | Components, in all three |
| Organisms | Material: no separate layer. Carbon and GOV.UK: Patterns |
| Templates and pages | Material: none. Carbon: templates in some kits. GOV.UK: page-level patterns ("Pages") |

One detail worth noticing: GOV.UK splits its patterns into three kinds by scope. Asking users for one piece of information (an address), helping users complete a task (creating an account), and whole pages (an error page). Grouping patterns by **what the user needs to do** is a habit worth copying when you write your own.

## Is a Button an atom or a molecule?

This question gets more debate than it deserves. Two readings are both reasonable.

- **Frost's reading:** a plain button is an atom; a button with an icon and a label is a molecule.
- **The code reading:** in React, Button is already a complete unit with an API, states and accessibility built in. The thing that truly can't be split is a colour value or a spacing step, which is to say a **token**. Many systems therefore treat tokens as the atom layer, and every component (Badge and Divider included) as one layer above it.

The second reading has an advantage: each layer maps to a **unit of release**.

| Layer | Released as (example) |
|---|---|
| Foundation | Token files (CSS, JSON) |
| Component | An npm package |
| Pattern, template | Copied source code (a registry), because products tend to adapt them |

Either choice works, as long as you write the definition into your glossary along with a note on what it is *not*. If your system has a group called "Basics" holding Badge and Divider, say plainly that these are still components, not Atomic Design atoms.

## Categories: splitting within a layer

Layers split the system vertically, from small to large. Categories split it horizontally: same layer, different job. A common set: Buttons, Inputs, Controls (checkbox, switch, radio), Navigation, Data display, Feedback, Overlays (modal, popover, tooltip), Loaders.

Categories help people **find** things. They don't change the dependency rule: a component in Overlays can still use one from Buttons.

## Common mistakes

- **Arguing whether something is a molecule or an organism.** It costs time and helps nobody. Pick one, write it down, move on.
- **Components that know too much about where they're used.** The tell is props like `isInHeader` or `insideCard`. Replace them with props that describe appearance (`size`, `variant`), or let the layer above handle the wrapping.
- **Patterns packaged as rigidly as components.** Patterns vary between products more than components do. Lock them down and teams end up forking them.
- **Skipping the template and page layer.** Only real data (long names, empty lists, a thousand rows) shows whether a component holds up.

## Sources

- [Brad Frost, *Atomic Design*, chapter 2, "Atomic Design Methodology"](https://atomicdesign.bradfrost.com/chapter-2/)
- [GOV.UK Design System, Patterns](https://design-system.service.gov.uk/patterns/)
- [Carbon Design System, Patterns](https://carbondesignsystem.com/patterns/overview/)
- [Material Design 3, Components](https://m3.material.io/components)

← Previous: [What a design system is, and when you need one](/articles/ds-01-what-is-a-design-system/) · Next: [Design tokens: three tiers and a shared format](/articles/ds-03-design-tokens/) →
