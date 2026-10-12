---
title: "Color in a design system"
date: 2025-12-16
summary: "How to build a color system in three layers: ramps in OKLCH, semantic roles paired by background and text, and WCAG 2.2 contrast as the rule that holds it together."
---

Part 4 of 15 in *Design systems from the ground up*.

A color system has three layers. Ramps are the raw material: one hue in many steps. Semantic colors give those steps a job, such as background, text, border or danger. Contrast rules make sure every pairing can actually be read.

Two habits carry most of the weight. Build ramps in OKLCH, because its lightness number matches what the eye sees. And never let color be the only way a message gets across.

## Color spaces: why OKLCH

A color space is a way of numbering colors. Three are common on the web:

| Notation | Example | Problem |
|---|---|---|
| HEX / RGB | `#EF4444`, `rgb(239 68 68)` | The numbers say nothing about whether the color is light or dark |
| HSL | `hsl(0 84% 60%)` | Has a lightness value, but it does not match perception: yellow and blue at L 50% look nowhere near equally light |
| OKLCH | `oklch(63.7% 0.237 25.331)` | Lightness tracks perception far more closely |

OKLCH has three values:

- **L, lightness**: 0% is black, 100% is white.
- **C, chroma**: how vivid the color is. 0 is gray.
- **H, hue**: the angle on the color wheel. Around 25 is red, 145 is green, 260 is blue.

`oklch()` and `oklab()` are defined in the W3C's CSS Color Module Level 4 and work in every major browser. What that buys a system in practice:

- To make every step 600 look equally heavy across hues, give them roughly the same L. In HSL the same move does not work.
- To lighten a color, raise L and lower C while the hue stays put. The result is predictable.
- It can describe colors outside sRGB, such as the more saturated range of P3 displays. The cost is that browsers will pull out-of-gamut colors back in, so test on real screens.

Reading a value becomes possible without a lookup table. `oklch(54% 0.027 264)` is nearly gray (very low C), leaning slightly blue (H 264), at medium lightness.

## Ramps: one hue, many steps

A ramp runs from very light to very dark within a single hue. Two numbering schemes dominate.

**Tailwind style: 50, 100, 200 up to 900, 950.** Each Tailwind color has 11 steps, 50 the lightest and 950 the darkest, with values written in OKLCH. The numbers are order only. They carry no fixed meaning, so a semantic layer has to assign the jobs.

**Radix style: 1 to 12, each step with a fixed job.** From the Radix Colors documentation:

| Steps | Use |
|---|---|
| 1 to 2 | App background, subtle background (cards, sidebars) |
| 3 to 5 | Component backgrounds: normal, hover, pressed or selected |
| 6 to 8 | Borders: non-interactive, interactive, strong borders and focus rings |
| 9 to 10 | Solid backgrounds (the most vivid step), and their hover |
| 11 to 12 | Low-contrast text, high-contrast text |

The strength of the Radix approach is that the step number already is the job. `blue-7` means "border on something interactive" without a lookup. Both schemes work. What matters is picking one and documenting it.

## Semantic colors: assigning roles

Ramps are ingredients. Components read roles. Almost every system ends up with a minimum set like this:

| Group | Roles | Example token names |
|---|---|---|
| Background | page, card, popover, muted fill | `--background`, `--card`, `--popover`, `--muted` |
| Text | primary text, secondary text | `--foreground`, `--muted-foreground` |
| Border | decorative border, input border | `--border`, `--input` |
| Action | primary color and the text on it | `--primary`, `--primary-foreground` |
| Interaction | hover, selected, focus | `--accent`, `--ring` |
| Status | success, warning, error, info | `--success`, `--warning`, `--danger` |

Most of these names follow shadcn/ui, which calls the error color `--destructive`. Material 3 uses names like `primary`, `on-primary`, `surface`, `on-surface`, `outline` and `error`. The idea is identical: Material's `on-primary` is shadcn's `primary-foreground`.

### One status, several tokens

The red that works as a solid button fill is often unreadable as text on a pale background. Mature systems therefore split each status color into a few tokens by usage:

- `--danger`: solid fill, such as a delete button.
- `--danger-foreground`: text on that solid fill.
- `--danger-subtle`: pale fill, such as a soft alert.
- `--danger-text`: danger-colored text on a normal or pale background.

Each pair gets its own contrast check, so using the intended pair means the result is readable.

One detail catches many teams. Text on a solid yellow or amber fill usually has to be dark, while text on red or blue is light. Yellow is too bright for white text to reach 4.5:1. A blanket rule like "text on solid color is always white" does not survive every hue.

## Contrast: the non-negotiable rule

WCAG 2.2, a W3C Recommendation since December 2024, sets these minimums at level AA, the level most laws and contracts ask for:

| Criterion | Applies to | Minimum ratio |
|---|---|---|
| 1.4.3 Contrast (Minimum) | Normal text | 4.5:1 |
| 1.4.3 | Large text: 18pt, or 14pt bold (about 24px, or 18.66px bold) | 3:1 |
| 1.4.11 Non-text Contrast | Parts needed to identify UI and its state (input borders, meaningful icons, focus rings) and graphics needed to understand content | 3:1 against adjacent colors |

Exceptions: disabled components, pure decoration and logos.

The ratio comes from the relative luminance of the two colors and runs from 1:1 (same color) to 21:1 (black on white). Do not judge it by eye. Browser DevTools and Figma plugins measure it.

APCA is a newer contrast method that has been discussed as a candidate for WCAG 3. WCAG 3 is still a working draft, so the 4.5:1 and 3:1 thresholds of WCAG 2.x remain the standard for conformance. APCA can inform better design. It does not replace the rule.

### Exceptions are recorded decisions

At some point a brand will want a pairing that fails, such as white text on the brand's orange. An exception is allowed, but it has to be a recorded decision: which pairing, what ratio, who accepted it, and why. When someone asks later, there is an answer, and if the product ever needs strict conformance, the list of things to fix already exists. An unrecorded exception is just a bug nobody has found yet.

## Color is never the only channel

WCAG 1.4.1 Use of Color (level A) says color must not be the only way information is conveyed. Someone with red-green color blindness, or anyone on a grayscale screen, loses whatever only color carries. In practice:

- Input in error: a red border, plus an error message, plus ideally an icon.
- Charts: color plus labels or patterns.
- Links inside body text: color plus an underline, or 3:1 contrast against the surrounding text with a cue on hover and focus.

## Dark mode is not an inverted ramp

Flipping the ramp upside down does not make a dark theme. Three things matter:

1. **Dark backgrounds are not pure black.** Use a very dark gray step (for example 950) for the page and a slightly lighter one (900) for cards. Cards sit lighter than the page to show depth, because shadows barely register on dark surfaces.
2. **Vivid colors calm down.** In light mode `--primary` is often a deep step with L around 50 to 55%. In dark mode, use a lighter step around 70%. Fully saturated color on a dark background glares.
3. **Borders use transparency.** `oklch(100% 0 0 / 10%)` is white at 10% opacity, and it blends with whatever background sits underneath.

How light and dark switch at the token level is covered in [Theming and modes](/articles/ds-09-theming-and-modes/).

## Common mistakes

- **Choosing secondary text color by eye on a good monitor.** On a cheap screen or in sunlight, pale gray text disappears. Measure it.
- **One token for both fill and text.** `--danger` as text on white may pass. On `--danger-subtle` it may not.
- **Adding a new color** when another step of an existing one would do.
- **Dimming disabled controls with opacity on the whole group.** Text and background fade together, sometimes until the control looks absent. WCAG exempts disabled controls from contrast, but people still need to see that the control exists.

## Sources

- W3C, [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/), Recommendation, 12 December 2024. Criteria 1.4.1, 1.4.3, 1.4.11.
- W3C, [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/) (`oklab()`, `oklch()`).
- Radix Colors, [Understanding the scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale).
- Tailwind CSS, [Colors](https://tailwindcss.com/docs/colors).
- shadcn/ui, [Theming](https://ui.shadcn.com/docs/theming).
- W3C, [WCAG 3.0 Working Draft](https://www.w3.org/TR/wcag-3.0/).

← Previous: [Design tokens: three tiers and a shared format](/articles/ds-03-design-tokens/) · Next: [Typography: a type scale named by role](/articles/ds-05-typography/) →
