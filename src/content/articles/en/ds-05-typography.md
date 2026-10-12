---
title: "Typography: a type scale named by role"
date: 2026-01-06
summary: "Typography in a design system as a short list of roles, each with a fixed size, line height and weight, named for what it does rather than how big it is."
---

Part 5 of 15 in *Design systems from the ground up*.

Typography in a design system is a short list of roles: headline, body, label and a few more. Each role locks its font size, line height and weight in advance, so nobody picks numbers per screen.

Three rules do most of the work:

- Name tokens by role, not size: `text-body`, not `text-14`.
- Write line height as a ratio, such as 1.5, so spacing between lines grows when text grows.
- Set font sizes in `rem`, so the interface follows the reader's browser font setting.

## What a type scale is

A type scale is the set of font sizes the system allows. Think of a shop that sells shirts in S, M, L and XL instead of tailoring each one to the millimetre. Fewer choices, far more consistency.

There are two ways to build one:

| Approach | How it works | Strength | Weakness |
|---|---|---|---|
| Mathematical ratio | Each step multiplies the last by a fixed factor, such as 1.25 (a "major third") | Even rhythm, a clear rationale | Odd values like 15.63px, and large steps jump too far |
| Hand-picked on a grid | Round sizes, usually multiples of 2 or 4 | Clean numbers that sit on a 4px grid | Every step needs its own reason |

Most product systems, including Material 3, Carbon, Polaris and Atlassian, pick sizes by hand. Product interfaces need several small sizes close together (12, 14, 16) more than they need widely spaced headings.

## Naming by role: the Material 3 example

Material 3 splits typography into five roles, each in three sizes: large, medium and small. Its default type scale, as font size / line height in px:

| Role | Large | Medium | Small | Used for |
|---|---|---|---|---|
| Display | 57 / 64 | 45 / 52 | 36 / 44 | Very large, short text or numbers |
| Headline | 32 / 40 | 28 / 36 | 24 / 32 | Main headings of a page or region |
| Title | 22 / 28 | 16 / 24 | 14 / 20 | Smaller headings: cards, dialogs, lists |
| Body | 16 / 24 | 14 / 20 | 12 / 16 | Paragraphs and main content |
| Label | 14 / 20 | 12 / 16 | 11 / 16 | Text inside components: buttons, tabs, chips |

Three lessons from this table:

1. **Every line height is a multiple of 4.** Text sits on the same 4px grid as everything else, covered in [Spacing, sizing and layout](/articles/ds-06-spacing-sizing-layout/).
2. **Body comes in three sizes.** Body medium at 14px suits dense product screens such as tables, forms and dashboards. Body large at 16px suits long reading.
3. **Label is separate from Body,** even where the sizes match. The roles differ: labels are usually heavier, and they can change without touching paragraph text.

Naming by role pays off on the first change. If body text moves from 14px to 15px, one token changes: `text-body`. With a token named `text-14`, someone has to find every use and decide case by case whether it was body text. And a token called `text-14` that holds 15px is lying.

## Line height: a ratio, tight for headings, loose for paragraphs

Write line height as a ratio rather than in px:

```css
--text-body: 0.875rem;          /* 14px */
--leading-body: calc(20 / 14);  /* "14 on 20", about 1.43 */
```

Writing it as a division keeps the intent readable ("14 on 20"), and the result is a ratio, so lines grow with the text.

- **Headings**: low line height, 1.1 to 1.25. Large text with short lines looks scattered when the gaps are wide.
- **Paragraphs**: high line height, 1.4 to 1.6. The eye needs room to find the start of the next line.

WCAG 2.2 criterion 1.4.12 Text Spacing (level AA) does not require any particular line height. It requires that nothing breaks when a reader overrides spacing to a line height of 1.5, paragraph spacing of 2 times the font size, letter spacing of 0.12 times and word spacing of 0.16 times. For a design system, that means no fixed heights on boxes that hold text. Let them grow.

## Font stacks

A font stack is the list of fallback fonts. There are two directions.

**System fonts**, using whatever the operating system provides:

```css
--font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
```

Nothing to download, text renders immediately, and it looks native on each platform. The trade-off: each device shows a slightly different font, and real sizes drift by a few pixels.

**A brand font**, such as Inter, Roboto or a custom face, looks the same everywhere. It has to be downloaded, and the system needs a plan for the moment before it arrives.

Either way, split font tokens by role, such as `--font-heading` and `--font-body`, even if both point to the same font at first. That split is a plug point: a theme that wants serif headings changes one token.

### Notes for Vietnamese and other stacked diacritics

- Letters with stacked marks (ẫ, ặ, ỗ) are taller than plain Latin letters. Tight line heights, below about 1.2, let the marks on one line touch the descenders of the line above. Test headings in Vietnamese whenever the scale changes.
- Check that the font includes the needed glyphs, for example the `vietnamese` subset on Google Fonts. When glyphs are missing, the browser borrows marks from another font and they sit out of line.

## rem, px and the reader's font size

- **px** is fixed. If the reader sets a larger default font size in the browser, px text does not follow.
- **rem** is relative to the root font size, 16px by default. If the reader sets 20px, `1rem` becomes 20px.

Font sizes belong in rem because rem respects the reader's setting. WCAG 1.4.4 Resize Text (level AA) requires text to scale to 200% without losing content or function.

## Font weight

Keep the number of weights small: usually 400 (regular), 500 (medium) and 600 (semibold), sometimes 700. Every extra weight is one more distinction the reader has to learn.

## Common mistakes

- **Too many sizes.** An audit of an older product often turns up a long tail of slightly different font sizes. Material 3 covers its whole interface with 15 baseline styles, and several of those share a size.
- **Size as the only tool for hierarchy.** Hierarchy comes from size, weight, color and space together. Often a change of weight or color does the job without a bigger size.
- **Text too small for reading.** WCAG sets no minimum font size, but the smallest step in Material 3's scale is 11px, and it is reserved for labels.
- **Fixed px line heights** on text that later scales up, so the lines collide.

## Sources

- Material Design 3, [Type scale tokens](https://m3.material.io/styles/typography/type-scale-tokens).
- W3C, [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/), criteria 1.4.4 Resize Text and 1.4.12 Text Spacing.
- MDN, [CSS values and units](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units) (`rem`).
- Carbon Design System, [Typography](https://carbondesignsystem.com/elements/typography/overview/).

← Previous: [Color in a design system](/articles/ds-04-color/) · Next: [Spacing, sizing and layout](/articles/ds-06-spacing-sizing-layout/) →
