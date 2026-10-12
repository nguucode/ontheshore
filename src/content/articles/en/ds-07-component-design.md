---
title: "Designing components: anatomy, variants and API"
date: 2026-02-03
summary: "A component is defined by four things: its parts, its variants, its states and its API. How to get each one right, and why the API deserves the most care."
---

Part 7 of 15 in *Design systems from the ground up*.

A well-made component has four things written down: its **anatomy** (which parts it has), its **variants** (which forms it takes), its **states** (how it reacts) and its **API** (what the people using it control). The visual layer gets most of the attention, but the API is the part that is hardest to change later. And the hardest behaviour, keyboard handling, focus and ARIA, is best borrowed from a tested headless library rather than written from scratch.

## Anatomy: the parts of a component

An anatomy diagram takes the component apart and numbers each piece. Material 3, Carbon and Polaris all open their component pages with one.

A button, taken apart:

```
┌────────────────────────────┐
│ (1) (2)  Save changes  (3) │
└────────────────────────────┘
1. spinner (while loading)
2. leading icon
   label
3. trailing icon
+ container: fill, border,
  radius, padding
```

Writing this down pays off in three ways:

- Designers and developers use the same names. "Tighten the gap between the leading icon and the label" means one thing to everyone.
- It records which parts are optional (icons) and which are required (the label, unless the button is icon only).
- It is the base for measured specs and for the component's documentation page, covered in [Documenting a design system](/articles/ds-11-documentation/).

## Variants: split them into axes

The common mistake is to list every combination as one flat set of names:

```
primary, primary-outline, primary-ghost,
danger, danger-outline, ...
```

Each new colour multiplies the list by the number of styles, and each new style multiplies it by the number of colours. The fix is to split variants into independent axes:

| Axis | Example values | Question it answers |
|---|---|---|
| Intent (`variant`) | `primary`, `secondary`, `destructive` | How important or risky is this action? |
| Emphasis (`appearance`) | `filled`, `outlined`, `ghost` | How much should it stand out? |
| Size (`size`) | `sm`, `md`, `lg` | What density is the screen? |

Nine values cover 27 combinations. Adding a colour adds one value, not three. With five intents and three appearances, a flat list needs 15 names; split into axes, it needs 8 values.

In Figma, each axis becomes one variant property on the component. When the axis names and values match the code exactly, designers and developers describe the same button the same way, and mapping design to code later is straightforward. That mapping is the subject of [Connecting design and code](/articles/ds-10-design-and-code/).

### One word, two meanings

"Variant" is used for two things: any version of a component, and the name of one specific prop. Systems disagree on the second. MUI, for example, uses `color` for intent and `variant` for emphasis (`contained`, `outlined`, `text`). Neither choice is wrong. What matters is that one system uses the same names on every component.

## States: how a component reacts

The states to plan for on an interactive control:

| State | Triggered by | Note |
|---|---|---|
| Default | | |
| Hover | Pointer over it | Absent on touch screens, so never hide information behind hover |
| Focus-visible | Keyboard focus | Must be visible (WCAG 2.4.7) |
| Active / pressed | Being pressed | |
| Selected / checked | Toggles, tabs, checkboxes | |
| Disabled | Not available | Consider saying why |
| Loading | Work in progress | See below |
| Invalid / error | Bad input | Never shown by colour alone |
| Read-only | Viewable, not editable | Unlike disabled, still focusable and copyable |

Listing states carefully surfaces questions that are easy to get wrong. Take a button that is loading: should it be `disabled`? Usually not. A disabled element cannot hold focus, so a keyboard user who just pressed Enter loses their place; depending on the browser, focus drops back to the page itself. A better pattern keeps the button focusable, marks it `aria-disabled="true"`, ignores clicks until the work finishes, and says what is happening in text, for example by changing the label to "Saving" or announcing it through a polite live region. [Accessibility in a design system](/articles/ds-08-accessibility/) covers more patterns like this one.

Complex components also have **data states**: empty, loading, failed, one item, thousands of items, a label far longer than anyone expected. Many systems give these their own components, such as an empty state, an error state and a skeleton.

## Designing the API

The API is the part of the system people touch every day. A few principles, shown on a hypothetical button.

**Name things by one convention.** For example, every boolean starts with `is`: `isLoading`, `isFullWidth`, `isIconOnly`. The prefix tells the reader it is an on/off switch. The exception is standard HTML attributes such as `disabled` and `type`, which keep their native names because people already know them.

**Make the default the most common case, and the safest one.** `variant="primary"`, `size="md"` and, most importantly, `type="button"`. A native `<button>` defaults to `submit`, so a button placed inside a form submits it by accident. Changing the default removes a whole class of bugs.

**Let the type system block misuse.**

```ts
type ButtonProps =
  | (BaseProps & { isIconOnly?: false })
  | (BaseProps & {
      isIconOnly: true;
      'aria-label': string;
    });
```

If `isIconOnly` is set, TypeScript now requires an `aria-label`. An icon-only button without a name is announced as just "button", and a screen reader user cannot tell what it does. An accessibility rule becomes a compile error: nobody has to remember it, and no reviewer has to catch it.

**Respect semantics.** With an `href`, render an `<a>` (navigation). Without one, render a `<button>` (action). Links and buttons differ in keyboard behaviour (Enter versus Enter or Space), in how screen readers announce them, and in what a middle click does. Looking the same does not make them the same element.

**Leave an escape hatch.** Accept `className` and pass the remaining HTML attributes through. People will need things the system did not plan for. Without a way out, they fork the component.

## Composition: config or compound

Components with several parts can expose one of two API shapes.

**Config**, where data goes in as props:

```tsx
<Accordion
  items={[
    { title: 'A', content: '...' },
    { title: 'B', content: '...' },
  ]}
/>
```

Easy to use, hard to customise one part.

**Compound**, where the parts are assembled as children:

```tsx
<Accordion.Root>
  <Accordion.Item>
    <Accordion.Trigger>A</Accordion.Trigger>
    <Accordion.Panel>...</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>
```

Longer, but each part can hold anything and the order can change. Base UI, Radix and React Aria all use this shape for their primitives.

A sensible rule: config for the common case, compound when people need flexibility. Many systems ship both, with the compound version as the foundation and a config wrapper on top for convenience.

A related tool is the ability to swap the rendered element, for example to render a router's `<Link>` instead of a plain `<a>` while keeping the styles and behaviour. Radix calls this `asChild`; Base UI uses a `render` prop.

## Controlled and uncontrolled

- **Uncontrolled**: the component keeps its own state. `<Switch defaultChecked />`. Simple to use.
- **Controlled**: the parent owns the state and passes it in. `<Switch checked={on} onCheckedChange={setOn} />`. Needed when the value must stay in sync with something else.

A good component supports both, following the React convention: `defaultX` for uncontrolled, `x` plus `onXChange` for controlled.

## Headless primitives: do not write the hard part yourself

The visible part of a combobox is a small share of the work. Most of it is arrow-key navigation, Home and End, type-ahead, focus management, ARIA for screen readers, closing on an outside click, and keeping the popup on screen near the edges.

A **headless primitive** library ships all of that behaviour with no styles attached. Three common choices for React:

| Library | Note |
|---|---|
| Radix Primitives | The most widely used; the base of shadcn/ui |
| Base UI | From the MUI team with authors of Radix and Floating UI; uses a `render` prop |
| React Aria (Adobe) | Very strict on accessibility and internationalisation; hooks and components |

The benefit is behaviour already tested across screen readers and browsers. The cost is following the library's model, and following it through its breaking changes. Record the choice of primitive as a decision record, because switching later is expensive.

## Common mistakes

- **Boolean explosion.** `isPrimary`, `isDanger` and `isOutline` side by side, and nobody knows what `isPrimary && isDanger` renders. Merge them into one enum prop.
- **Props that describe context instead of intent.** `inHeader` instead of `size` or `appearance`. [Mental models for structuring a design system](/articles/ds-02-mental-models/) explains why.
- **Disabled with no explanation.** People cannot tell why the button does nothing. Consider keeping it enabled and showing the problem on click.
- **`<div onClick>` instead of `<button>`.** Keyboard support and semantics are lost.
- **Different prop names for the same idea.** `size` on Button, `scale` on Input.

## Sources

- [Base UI, Quick start](https://base-ui.com/react/overview/quick-start)
- [Radix Primitives](https://www.radix-ui.com/primitives)
- [React Aria](https://react-spectrum.adobe.com/react-aria/)
- [React, Sharing state between components](https://react.dev/learn/sharing-state-between-components)
- [W3C, ARIA Authoring Practices Guide, Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [Material Design 3, Buttons](https://m3.material.io/components/buttons/overview)
- [Figma Help, Explore component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)

← Previous: [Spacing, sizing and layout](/articles/ds-06-spacing-sizing-layout/) · Next: [Accessibility in a design system](/articles/ds-08-accessibility/) →
