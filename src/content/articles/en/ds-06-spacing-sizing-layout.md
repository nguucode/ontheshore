---
title: "Spacing, sizing and layout"
date: 2026-01-20
summary: "The smaller scales that keep an interface consistent: a 4px spacing grid, control tiers, radius, shadow, z-index layers, breakpoints and motion, each as named tokens."
---

Part 6 of 15 in *Design systems from the ground up*.

Color and type get the attention, but most visual drift comes from the smaller scales: spacing, sizes, corners, shadows, layers and timing.

- **Spacing** runs on a 4px grid. Every gap is a multiple of 4: 4, 8, 12, 16, 24, 32.
- **Sizing** groups into tiers such as sm, md and lg. A tier locks height, padding, icon size and corner radius together, so choosing a tier replaces choosing numbers.
- **Radius, shadow, z-index and motion** are tokens too, each with a short scale named by role.

Anything that can take an arbitrary value (13px, `z-index: 9999`, a 0.37s transition) is where a system drifts unless tokens and linting hold the line.

## Spacing: why 4px

Think of squared paper. Draw on it and things line up without a ruler. A 4px grid is squared paper for interfaces.

Why 4 and not 5 or 10:

- Most screens render at 1x, 2x or 3x pixel density, and 1.5x is common on Android. 4 divides cleanly at those densities, so borders and gaps do not land on half pixels and blur.
- 4 is small enough for fine adjustment, such as the gap between an icon and its label, while its multiples (8, 16, 24, 32) give a larger rhythm.

Material, Carbon, Polaris and Atlassian all use a 4px base unit with an 8px main rhythm. The steps used in practice are usually 4, 8, 12, 16, 24, 32, 48 and 64. Steps widen as they grow, because the difference between 48 and 52 is barely visible.

### Example tokens

```css
--space-1: 0.25rem;  /* 4px  */
--space-2: 0.5rem;   /* 8px  */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
```

The name counts multiples of 4px, as Tailwind does: `space-4` is 16px. When a value outside the rhythm is genuinely needed, such as 10px of padding in an input, add a named token (`--space-2-5`) instead of writing `10px` in the CSS. The odd value stays documented and searchable, and the linter can still block every other arbitrary number.

A further step: multiply every value by a scaling variable, as in `calc(0.25rem * var(--scaling))`. A theme that changes `--scaling` resizes the whole system evenly. More on that in [Theming and modes](/articles/ds-09-theming-and-modes/).

### Two kinds of space

- **Inside a component** (padding, internal gap): the component decides, usually through its tier.
- **Between components** (margins, layout gaps): whoever composes the screen decides. Components should not ship with outer margins by default. If they do, every placement that does not need the margin ends up with extra space.

## Sizing and control tiers

Many systems stop halfway here. If a small Button is 32px tall and a small Input is 28px, they will not line up side by side in a toolbar.

The fix is a control tier: one set of sizes shared by every control, including buttons, inputs, selects and tabs. An illustrative example:

| Tier | Height | Side padding | Icon gap | Icon | Radius |
|---|---|---|---|---|---|
| `sm` | 24px | 8px | 6px | 14px | sm |
| `md` | 32px | 12px | 8px | 16px | md |
| `lg` | 40px | 16px | 8px | 20px | md |

The matching tokens look like `--control-md-height`, `--control-md-padding`, `--control-md-gap` and `--icon-md`. A component only needs to know it is at tier md, and every number follows. A new control added later lines up with the existing ones automatically.

### The smallest tier and target size

WCAG 2.2 criterion 2.5.8 Target Size (Minimum) asks for a pointer target of at least 24 by 24 CSS pixels, with some exceptions, such as enough spacing from neighboring targets or links inside a sentence. If a system has a tier below 24px for tags or badges, document that the tier is not for interactive controls such as buttons and inputs. Apple's Human Interface Guidelines recommend more, 44 by 44 points, for touch.

## Radius

Corner radius needs a scale and roles as well. The compact approach derives the whole scale from one base value. shadcn/ui works this way: its theme exposes a single `--radius` variable and computes the other radii from it. A scale built on the same idea:

```css
--radius: 0.625rem;                      /* 10px, the base */
--radius-sm: calc(var(--radius) * 0.6);
--radius-md: calc(var(--radius) * 0.8);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) * 1.4);
```

A theme changes `--radius` and the whole scale moves with it.

A role layer can sit on top of the scale:

- `--radius-control`: buttons and toggles. Some themes turn these into pills.
- `--radius-field`: text inputs. These usually should not become pills, because a pill-shaped field reads badly with multiple lines or an inset label.
- `--radius-panel`: cards and modals.

### The nested radius rule

When a rounded shape sits inside another rounded shape, the outer radius should equal the inner radius plus the padding between them. Otherwise the curves look uneven. This shows up often in menus, where rounded items sit inside a rounded panel, and in cards that hold images.

## Shadow and elevation

Shadow conveys height: what floats above what. A typical scale runs from none, to subtle (cards), to medium (dropdowns), to strong (modals). Material 3 calls these elevation levels 0 to 5.

Split them into two layers, in the same way primitive and semantic tokens split in [Design tokens: three tiers and a shared format](/articles/ds-03-design-tokens/):

- `--elevation-*` holds the actual shadow values, which differ between light and dark. Dark mode needs much stronger shadows, because faint ones vanish on dark surfaces.
- `--shadow-*` is what components read. It points to the elevation values of the current mode.

## Layering with z-index

Without tokens, a race starts: `z-index: 999`, then `9999`, then `99999`. The fix is a few named layers spaced well apart:

```css
--layer-sticky: 10;   /* sticky header */
--layer-overlay: 50;  /* modal, popover */
--layer-tooltip: 60;
--layer-toast: 70;    /* notifications stay on top */
```

The order is the rule: tooltips sit above modals, and toasts sit above everything.

## Breakpoints

Breakpoints are the widths at which a layout changes. Tailwind CSS ships with these defaults:

| Name | From |
|---|---|
| `sm` | 40rem (640px) |
| `md` | 48rem (768px) |
| `lg` | 64rem (1024px) |
| `xl` | 80rem (1280px) |
| `2xl` | 96rem (1536px) |

Two points worth keeping:

- **Mobile first.** `md:flex` means "flex from 768px and up". Write the small layout first, then add to it for larger screens.
- **Write breakpoints in rem.** When a reader raises the default font size, breakpoints trigger earlier, and the layout switches to its narrow form exactly when text needs more room.

Container queries go a step further: a component changes layout based on the width of its container rather than the screen. That suits design systems well, because a Card has no way of knowing whether it will sit in a narrow sidebar or a wide main column.

## Motion

Motion in an interface has three jobs: show what just changed, show where something came from, and make actions feel responsive. Decoration is not one of them.

A short scale covers most products. For example:

| Token | Value | Used for |
|---|---|---|
| `--duration-fast` | 100ms | hover, color changes |
| `--duration-base` | 150 to 200ms | small open and close (accordions, dropdowns) |
| `--duration-slow` | 250 to 300ms | overlays, modals, large regions |
| `--ease-standard` | one cubic-bezier curve | all ordinary motion |

Material 3 documents a fuller motion system, with more duration and easing steps by type of movement, and is worth reading when a product needs more.

### Reduced motion

When a reader turns on reduced motion in their operating system, the browser reports it through `prefers-reduced-motion: reduce`. If every transition reads a duration token, one rule handles it:

```css
@media (prefers-reduced-motion: reduce) {
  :root { --duration-fast: 0ms; --duration-base: 0ms; --duration-slow: 0ms; }
}
```

One exception to think through: spinners. A frozen spinner looks like a hung app, so slow it down rather than stopping it. WCAG 2.2 criterion 2.3.3 Animation from Interactions (level AAA) addresses this need directly.

## Common mistakes

- **Near-miss values** such as 13px, 15px and 18px scattered across the code. Each one is an undocumented decision.
- **Component sizes that do not match,** because every component defines its own sm and md.
- **z-index with no scale,** so fixing one overlay breaks another.
- **Long animations.** Anything above 300ms on a small interaction feels slow.
- **No reduced-motion handling.**

## Sources

- W3C, [Understanding SC 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), WCAG 2.2.
- W3C, [Understanding SC 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html), WCAG 2.2.
- Material Design 3, [Spacing](https://m3.material.io/foundations/layout/grids-spacing/spacing).
- Material Design 3, [Motion](https://m3.material.io/styles/motion/overview).
- Apple Human Interface Guidelines, [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility).
- shadcn/ui, [Theming](https://ui.shadcn.com/docs/theming).
- Tailwind CSS, [Responsive design](https://tailwindcss.com/docs/responsive-design).
- MDN, [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).
- MDN, [Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries).

← Previous: [Typography: a type scale named by role](/articles/ds-05-typography/) · Next: [Designing components: anatomy, variants and API](/articles/ds-07-component-design/) →
