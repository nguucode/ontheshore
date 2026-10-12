---
title: "Theming and modes"
date: 2026-03-03
summary: "Theming changes token values without touching components. The difference between a mode and a theme, the CSS that makes it work, and the nested-theme trap."
---

Part 9 of 15 in *Design systems from the ground up*.

Theming means changing token values without changing components. It is the biggest payoff of a three-tier token structure. Two words get mixed up here: a **mode** is one axis with a few fixed values (light or dark, compact or comfortable), while a **theme** is a set of choices across several axes (a blue accent, large radii, slightly bigger text). On the web, theming runs on CSS custom properties, which inherit down the DOM. In Figma, the same idea is called variable modes.

## Mode versus theme

| | Mode | Theme |
|---|---|---|
| What it is | One axis, a few preset values | A combination of choices across axes |
| Example | Light or dark; compact or comfortable; high contrast | "Brand A": blue accent, cool greys, medium radius, 100% scaling |
| Who picks it | Usually the end user, through OS settings or a toggle | Usually the product that uses the system |

One theme usually supports several modes: brand A ships in both light and dark.

## Theming axes: the Radix Themes example

Radix Themes shows axis-based theming clearly. Its `<Theme>` component takes:

| Axis | Prop and values | What it changes |
|---|---|---|
| Appearance | `appearance`: `light`, `dark`, `inherit` | Light or dark |
| Accent | `accentColor`: one of its hues | The primary colour |
| Neutral | `grayColor`: warm, cool or neutral greys | Backgrounds, text, borders |
| Shape | `radius`: `none` to `full` | Corner radius |
| Density | `scaling`: `90%` to `110%` | Sizes and spacing |

```tsx
<Theme
  appearance="dark"
  accentColor="violet"
  radius="large"
  scaling="95%"
>
  <App />
</Theme>
```

Each axis is independent, the combinations are free, and each axis only needs to change one or a few root tokens:

- `scaling` changes one multiplier, and every spacing, font size and control height token is multiplied by it.
- `radius` changes one factor, and the whole radius scale is derived from it, as described in [Spacing, sizing and layout](/articles/ds-06-spacing-sizing-layout/).

The design lesson: **a system is easy to theme when its tokens are derived from a few root values.** If 40 size tokens are all hard-coded numbers, changing density means editing 40 places.

## CSS custom properties: the mechanism

A custom property (`--name: value`) has three properties that make theming possible:

1. **Inheritance.** Set `--primary` on a `<div>` and every descendant that reads `var(--primary)` gets that value.
2. **Cascade.** The nearest value wins. Set on `:root`, it is the page default; set on a region, it overrides that region.
3. **Resolved at runtime.** The browser substitutes the value when it renders. No CSS rebuild.

So a `Theme` component can be little more than a `<div>` that sets a few custom properties or a data attribute. No new CSS is generated.

The simplest light and dark setup:

```css
:root {
  --background: oklch(98% 0 0);
  --foreground: oklch(15% 0 0);
}
.dark {
  --background: oklch(15% 0 0);
  --foreground: oklch(98% 0 0);
}
```

### The hard case: nested themes

Say you want a light region inside a dark page, such as a preview panel. The naive approach writes component CSS like `.dark .card { ... }`. A descendant selector matches any `.dark` ancestor, so the light region inside still gets dark styles.

Three ways out, from simplest to most advanced:

1. **Keep every value at the token level, never in component selectors.** A `.light` region inside `.dark` only resets tokens, and components reading `var()` get the nearest value. This should be the default.
2. **The CSS `light-dark()` function.** `--background: light-dark(white, black);` combined with `color-scheme: light` or `dark` on each region. Compact, but it only works for colour values.
3. **The "space toggle".** A custom property acts as a switch. The value `initial` makes the variable invalid, so `var(--x, fallback)` returns the fallback; an empty value is valid and returns nothing. Set `--is-light: initial` on light regions and an empty value on dark ones, then write `var(--is-light, light-value)`, and that part only switches on inside light regions. Because the switch inherits, the nearest region wins at any depth. Powerful but hard to read; if you use it, put a comment next to the code explaining why.

The point to keep is not the technique but the requirement: themes must work when nested. Test that case on its own.

## Dark mode: respect the user

- Follow the operating system setting by default (`prefers-color-scheme`).
- Let people override it, and remember their choice.
- Set `color-scheme: light dark` (or the current mode) so scrollbars and native form controls switch too.
- Check contrast separately for dark. A pair that passes in light does not automatically pass in dark.

A sensible line for a library: the system owns the **values** (tokens for light and dark, a class or prop to switch), and the product owns the **policy** (when to switch, where to store the choice).

As [Color in a design system](/articles/ds-04-color/) explains, dark mode is not inverted colour. Backgrounds avoid pure black, saturated colours are toned down, shadows get stronger, and borders use transparency.

## Density

Density is how tightly packed an interface is. A data table for analysts wants it dense; an app for older users wants room to breathe. Material 3 uses a negative density scale (0, -1, -2, -3), each step reducing component height. Radix Themes uses a percentage `scaling` that grows or shrinks text, spacing and sizes together, keeping their proportions.

Watch out: lower density can push targets below 24px. Check the smallest size tier at the lowest density.

## Multi-brand

When one system serves several brands, for example a group with several products:

- **Primitive** tokens can differ completely between brands, one palette each.
- **Semantic** tokens keep the same names in every brand. That is the contract: a component only knows `--primary`, never the brand.
- **Component** tokens and components do not change.

In other words, multi-brand is one more mode, living at the step from primitive to semantic.

## Figma variable modes

Figma variables have **modes**: a collection holds several sets of values, one per mode. Apply variables to a design once, switch the mode, and the design updates without duplicating frames. Figma's own examples are light, dark and high contrast for colour, and mobile and desktop for spacing. The number of modes per collection depends on the Figma plan.

The rule: **Figma modes match the theming axes in code exactly.** If code has five radius levels, the Radius collection in Figma has exactly five modes with the same names. A designer picking the "large" mode sees what `radius="large"` produces in code.

## Common mistakes

- **Dark mode written as `.dark .button { ... }` for each component.** Theming belongs at the token level; components should not know which mode they are in.
- **Derived tokens that freeze.** If `--space-4: calc(1rem * var(--scaling))` is declared on `:root`, it is computed at `:root`. A region below that sets a different `--scaling` will not change `--space-4`. Declare derived tokens where the theme is set, or on every element.
- **Too many theming axes.** Every axis multiplies the combinations to test. Open an axis only when there is a real need.

## Sources

- [Radix Themes, Theme](https://www.radix-ui.com/themes/docs/components/theme)
- [MDN, Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [MDN, light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
- [MDN, prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [MDN, color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)
- [Figma Help, Modes for variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables)
- [Material Design 3, Density](https://m3.material.io/foundations/layout/grids-spacing/density)

← Previous: [Accessibility in a design system](/articles/ds-08-accessibility/) · Next: [Connecting design and code](/articles/ds-10-design-and-code/) →
