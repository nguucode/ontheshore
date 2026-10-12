---
title: "Design tokens: three tiers and a shared format"
date: 2025-12-02
summary: "A design token is a named design decision: the three tiers of primitive, semantic and component tokens, how to name them, the DTCG 2025.10 format, and a pipeline from JSON to CSS and Figma."
---

Part 3 of 15 in *Design systems from the ground up*.

A token is a **named design decision**. `--danger` instead of `oklch(57.7% 0.245 27.325)`.

- Tokens come in three tiers: **primitive** (raw values), **semantic** (meaning), and **component** (only when you really need it). Components read the semantic tier.
- A token's name says what it is **for**, not what it **looks like**: `danger`, not `red`.
- Since October 2025 there is a shared format: the W3C Design Tokens Community Group's **Design Tokens Format Module 2025.10**. JSON written to it can be read by many tools.

## What a token is, in plain terms

Think of a medicine cabinet. If every bottle only showed its chemical formula, nobody would dare take anything. The label "fever reducer" is what people actually use. Today the bottle holds one brand; next month it holds another. The label stays the same, and nobody has to relearn anything.

A token is that label.

- The value (`oklch(57.7% 0.245 27.325)`) can change.
- The name (`danger`) stays.
- Everything that uses it calls it by name, so one change to the value updates every use.

Material 3 puts it this way: tokens are the building blocks of every UI element, and **the same tokens are used in design, tooling and code**. The second half is the part that matters. A token is only worth something when Figma and code call it by the same name.

## Three tiers

| Tier | Question it answers | Examples |
|---|---|---|
| **Primitive** (Material: *reference*) | "Which values exist?" | `gray-500`, `red-600`, `space-4` = 16px |
| **Semantic** (Material: *system*) | "What is this value for?" | `foreground`, `danger`, `border`, `muted-foreground` |
| **Component** | "What is unusual about this component?" | `button-primary-bg` |

Who reads what: primitives are read only by semantic tokens, semantic tokens are read by components, and a component token is read only by its own component.

Material Web shows all three tiers directly in its CSS variable names: `--md-ref-*` for reference tokens, `--md-sys-*` for system tokens, and component tokens such as:

```css
--md-filled-button-container-shape
```

One example, read from the bottom up:

```
primitives.json   red.600  = oklch(57.7% 0.245 27.325)
                     ▲ alias
semantic.json     danger   = {red.600}
                     ▲ read by
Alert.module.css  background: var(--danger);
```

The `Alert` component has no idea what red is. It only knows "danger". If you later decide danger should use `red.700` for better contrast, you edit one line in the semantic file.

### Why components shouldn't read primitives directly

Because primitives carry no meaning. If Button uses `gray-500` for its border and Input does too, then darkening the Input border (to reach 3:1 contrast, say) by editing `gray-500` changes Button as well. Two things that look the same today **are not necessarily the same decision**.

Enforce this rule with tooling, not only documentation. The usual approach is a CSS lint rule (Stylelint) that fails when a component's stylesheet calls `var(--gray-500)` or any other primitive. [Part 12](/articles/ds-12-testing-and-quality/) covers this.

### When to create component tokens

Only when a component genuinely departs from the semantic tier and that departure needs its own knob, for example a theme that changes only the tooltip background. Create them too early and you end up with hundreds of tokens nobody changes, and readers can't tell which ones matter. A useful middle ground is a token per **group** rather than per component: `--control-md-height` shared by Button, Input and Select ([part 6](/articles/ds-06-spacing-sizing-layout/)).

## Naming tokens

Rule one: **the name states the purpose**. `color-text-danger` is right; `color-text-red` is wrong. Danger is red today. If it turns orange tomorrow, the old name is a lie.

A common structure, from general to specific:

```
[category]-[role]-[variant]-[state]
color    - border - field   - hover
```

Some systems drop the `color-` prefix for colours. shadcn/ui is one: `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--border`, `--ring`. Other categories keep a prefix: `--space-*`, `--radius-*`, `--text-*`, `--duration-*`.

A convention worth borrowing from shadcn/ui: colours come in **background and foreground pairs**. If there is `--primary`, there is `--primary-foreground`. The pair is checked for contrast together, so using the matching pair makes readable text the default.

### The trap in borrowing names from other systems

Numeric names don't translate between systems. Atlassian's `space.100` is 8px; Polaris's `space-100` is 4px. When you read another system's docs, convert to your own scale. Don't copy the names.

## The DTCG 2025.10 format

Until 2025, each tool (Style Dictionary, Tokens Studio, Figma) had its own JSON format. The W3C Design Tokens Community Group published the **Design Tokens Format Module 2025.10** on 28 October 2025, and the document describes itself as "considered stable". It is a Community Group report, not a formal W3C Recommendation, but it is stable enough for tools to build on.

What you need to know:

| Concept | Syntax | Meaning |
|---|---|---|
| Token | an object with `$value` | A named value |
| Type | `$type` | `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `number`, plus composite types: `border`, `shadow`, `transition`, `typography`, `gradient`, `strokeStyle` |
| Group | an object without `$value` | A set of tokens; can set a default `$type` for its children |
| Alias | `"$value": "{gray.500}"` | A token that points to another token |
| Description | `$description` | A note for human readers |
| Deprecation | `$deprecated` | Marks a token for removal |
| Extensions | `$extensions` | Tool-specific data, keyed by reverse domain name |

A semantic file in this format:

```json
{
  "color": {
    "$type": "color",
    "primary": { "$value": "{blue.600}", "$description": "Primary action" },
    "primary-foreground": { "$value": "{gray.50}" },
    "danger": { "$value": "{red.600}" }
  }
}
```

The leading `$` separates a token's own properties from the names of child tokens. Without it, a token named `value` would collide with the `value` property.

## The pipeline: from JSON to everywhere

```
tokens/*.json  (source of truth)
     │  build (Style Dictionary or a small script)
     ▼
tokens.css  (CSS custom properties)  ──► components read var(--...)
     │
     └──► synced to Figma variables (plugin, API, or by hand)
```

Three things make the pipeline trustworthy:

1. **One source.** Pick JSON (or Figma) as the source; the other side only reads. Never hand-edit the generated CSS.
2. **A check command.** A `tokens:check` step in CI fails when the CSS drifts from the JSON.
3. **Lint where tokens are used.** Lint stops components from reading primitives or tokens that don't exist. A typo like `var(--primay)` silently makes the property invalid, so it falls back to the inherited or initial value; only lint catches it.

**Style Dictionary**, started at Amazon and now an open-source project, is the most widely used tool for building tokens out to several platforms: CSS, iOS, Android. If you only target the web, a short script is enough.

## Tokens are not only colour

| Category | Example names | Part |
|---|---|---|
| Colour | `--background`, `--primary`, `--danger-subtle` | [4](/articles/ds-04-color/) |
| Type | `--text-body`, `--leading-body`, `--font-sans` | [5](/articles/ds-05-typography/) |
| Spacing | `--space-1` to `--space-12` | [6](/articles/ds-06-spacing-sizing-layout/) |
| Sizing | `--control-sm`, `--control-md`, `--icon-md` | [6](/articles/ds-06-spacing-sizing-layout/) |
| Radius | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-control` | [6](/articles/ds-06-spacing-sizing-layout/) |
| Motion | `--duration-fast`, `--duration-base`, `--duration-slow`, `--ease-standard` | [6](/articles/ds-06-spacing-sizing-layout/) |
| Layers | `--layer-overlay`, `--layer-toast` | [6](/articles/ds-06-spacing-sizing-layout/) |
| Focus | `--focus-width`, `--focus-offset` | [8](/articles/ds-08-accessibility/) |

## Common mistakes

- **Tokens named for appearance** (`blue`, `big`, `rounded`). Change the design and the name is wrong.
- **Too many near-identical semantic tokens.** Every new token is a decision users have to understand. Before adding one, ask whether an existing token already does the job.
- **Renaming a token without treating it as a breaking change.** For anyone using the system, CSS that reads the old name breaks silently. See [part 13](/articles/ds-13-versioning-and-releases/).
- **Two sources of truth.** Edit in Figma, edit in code separately, and a month later nobody knows which is right.

## Sources

- [W3C Design Tokens Community Group, *Design Tokens Format Module 2025.10* (28 October 2025)](https://www.designtokens.org/tr/2025.10/format/)
- [Material Design 3, Design tokens](https://m3.material.io/foundations/design-tokens/overview)
- [Material Web, Theming (`--md-ref-*`, `--md-sys-*` and component tokens)](https://material-web.dev/theming/material-theming/)
- [Style Dictionary](https://styledictionary.com/)
- [shadcn/ui, Theming (the `background` and `foreground` convention)](https://ui.shadcn.com/docs/theming)
- [Stylelint](https://stylelint.io/)

← Previous: [Mental models for structuring a design system](/articles/ds-02-mental-models/) · Next: [Color in a design system](/articles/ds-04-color/) →
