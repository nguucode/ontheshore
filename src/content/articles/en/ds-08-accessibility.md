---
title: "Accessibility in a design system"
date: 2026-02-17
summary: "Why accessibility is a design system's job, which WCAG 2.2 criteria components own, and how to test them without trusting a green automated report."
---

Part 8 of 15 in *Design systems from the ground up*.

Accessibility means everyone can use the product: people on a keyboard, people using a screen reader, people with low vision, people with a tremor, people who are distracted. A design system is the biggest lever for it, because a fix made once in a component reaches every screen that uses it. The standard to meet is WCAG 2.2 at level AA. And the first rule of ARIA is to use the right HTML element before reaching for ARIA at all.

## Why this is the system's job

Think of a building. If the architect puts a ramp at the main entrance, everyone can get in from day one. If not, each tenant builds their own ramp, each one different, some too steep.

The design system is the architect. When the button has a focus ring, the modal keeps focus inside it and the input is labelled correctly, every team using the system gets those things without having to know about them. The reverse also holds: a broken component spreads its bug to every place it is used.

## WCAG 2.2 in five minutes

The Web Content Accessibility Guidelines are a W3C standard. Version 2.2 became a W3C Recommendation on 5 October 2023, and the current edition, with corrections, is dated 12 December 2024. It has three levels: A (the minimum), AA (what most laws require) and AAA (the highest, not expected across a whole site).

Every criterion sits under one of four principles, known as **POUR**:

| Principle | Meaning | Example |
|---|---|---|
| Perceivable | Information reaches people through at least one sense | Alt text, enough contrast, not colour alone |
| Operable | Every function works in more than one way | Keyboard support, large enough targets, no focus traps |
| Understandable | Content and behaviour are predictable | Clear labels, errors that say how to fix them |
| Robust | Assistive technology can read it | Semantic HTML, correct name, role and value |

## The criteria components own

These are the criteria a design system carries most of the weight for:

| Criterion | Requirement | What the component does |
|---|---|---|
| 1.4.3 Contrast (Minimum), AA | Text 4.5:1, large text 3:1 | Background and text token pairs are measured in advance |
| 1.4.11 Non-text Contrast, AA | Control borders, icons and focus rings 3:1 | Border and focus ring tokens reach 3:1 |
| 1.4.1 Use of Color, A | Colour is never the only signal | Errors carry text and an icon |
| 2.1.1 Keyboard, A | Everything works from the keyboard | The headless primitive handles keys |
| 2.1.2 No Keyboard Trap, A | Focus never gets stuck | A modal holds focus, and Escape gets out |
| 2.4.3 Focus Order, A | Focus moves in a sensible order | Closing a modal returns focus to its trigger |
| 2.4.7 Focus Visible, AA | You can see where focus is | Every control has a focus ring |
| 2.4.11 Focus Not Obscured (Minimum), AA, new in 2.2 | The focused element is not fully hidden | Sticky headers and toasts do not cover it |
| 2.5.8 Target Size (Minimum), AA, new in 2.2 | Targets at least 24 by 24 CSS pixels, with exceptions | The smallest interactive size tier starts at 24px |
| 3.3.1 Error Identification and 3.3.2 Labels or Instructions, A | Errors described in text, inputs labelled | Fields always have a label, errors are tied to the input |
| 4.1.2 Name, Role, Value, A | Controls expose a name, role and state | `aria-label` on icon-only buttons, `aria-expanded` on things that open |

Contrast pairs are covered in [Color in a design system](/articles/ds-04-color/), and size tiers in [Spacing, sizing and layout](/articles/ds-06-spacing-sizing-layout/). One more change in 2.2: W3C marked 4.1.1 Parsing as obsolete and removed it.

## Focus rings: a small detail with a large effect

A keyboard user reads the focus ring the way a mouse user reads the pointer. Removing the ring removes the pointer.

The rule: never set `outline: none` without putting another ring in its place. Use `:focus-visible`, which shows the ring for keyboard focus, rather than `:focus`, which also shows it on mouse click. The click case is what usually pushes teams to turn rings off.

Make the ring a set of tokens:

```css
--focus-width: 2px;
--focus-offset: 2px;        /* ring outside */
--focus-offset-inset: -2px; /* ring inside */

.button:focus-visible {
  outline: var(--focus-width) solid var(--ring);
  outline-offset: var(--focus-offset);
}
```

Two offsets exist because not every control has room around it. Menu items and tabs sit edge to edge, so an outside ring gets covered by the neighbouring item, which works against 2.4.11. Those controls use the inside ring.

## ARIA: use little, use it correctly

ARIA (Accessible Rich Internet Applications) is a set of attributes that add meaning to HTML: `role`, `aria-label`, `aria-expanded`, `aria-describedby` and more.

The first rule in W3C's *Using ARIA*: if a native HTML element already has the semantics and behaviour you need, use it instead of adding a role and ARIA to some other element.

```html
<!-- Right: focus, Enter/Space and role built in -->
<button type="button">Save</button>

<!-- Wrong: tabindex, keys and role all by hand -->
<div role="button" tabindex="0" onclick="...">Save</div>
```

Wrong ARIA is worse than none, because it lies to the screen reader. `aria-expanded="true"` on a closed menu is one example.

W3C's **ARIA Authoring Practices Guide (APG)** describes each widget type (accordion, combobox, dialog, tabs, menu and others): which roles it needs, what each key does, where focus goes. When you build a complex component yourself, the APG is your specification. When you use a headless primitive, the primitive already follows it, and the system's job is not to break it, for example by wrapping the trigger in a `<div>` with its own click handler.

## Accessibility patterns worth building in

- **Icon-only buttons must have a name**, ideally enforced by TypeScript, as shown in [Designing components](/articles/ds-07-component-design/).
- **Loading keeps focus.** Use `aria-disabled` rather than `disabled`, and say "loading" in text or through a live region.
- **Disabled links.** An `<a>` has no `disabled` attribute. The only way to stop it navigating is to remove `href`. Without `href` it is no longer exposed as a link, so add `role="link"` and `aria-disabled="true"` to tell assistive technology it is a link that is unavailable.
- **Form errors.** Tie the message to the input with `aria-describedby` and set `aria-invalid="true"`.
- **Dialogs.** Give the dialog a name with `aria-labelledby` pointing at its heading, keep focus inside, close on Escape, and return focus on close.

## What automated tests catch

You can run axe-core, Deque's open-source engine, against every story in Storybook through the accessibility addon, and configure violations to fail the test instead of only warning. That should be the floor.

But a clean axe run does not mean WCAG compliance. Automated tools catch only part of the problems: contrast, missing labels, missing alt text, invalid ARIA. They cannot tell:

- Whether the focus order makes sense.
- Whether a label is meaningful. "Button" is a technically valid label and a useless one.
- Whether the screen reader output is understandable.

A reasonable routine for each component:

1. Automated checks in the story (axe).
2. Interaction tests in code: Tab in, Enter, Escape, arrow keys. See [Testing and quality gates](/articles/ds-12-testing-and-quality/).
3. A manual pass with the keyboard only, no mouse.
4. A manual pass with a screen reader for complex components (VoiceOver on a Mac starts with Cmd + F5).

## Common mistakes

- **Placeholder instead of a label.** The placeholder disappears as you type, often has low contrast, and many screen readers do not treat it as a label.
- **Testing with a mouse only.**
- **A modal that does not return focus** to where it was opened.
- **Important information in a tooltip.** Hard to reach on touch, easy to miss.
- **Turning off the focus ring because it looks bad**, instead of designing a ring that looks good.

## Sources

- [W3C, Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C, What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- [W3C, Using ARIA](https://www.w3.org/TR/using-aria/)
- [W3C, ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [MDN, :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
- [Storybook, Accessibility testing](https://storybook.js.org/docs/writing-tests/accessibility-testing)
- [Deque, axe-core](https://github.com/dequelabs/axe-core)

← Previous: [Designing components: anatomy, variants and API](/articles/ds-07-component-design/) · Next: [Theming and modes](/articles/ds-09-theming-and-modes/) →
