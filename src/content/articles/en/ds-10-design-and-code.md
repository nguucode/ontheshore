---
title: "Connecting design and code"
date: 2026-03-17
summary: "How to keep a Figma library and a component codebase in step: one source of truth per decision, variables that mirror tokens, and handoff that only describes what differs."
---

Part 10 of 15 in *Design systems from the ground up*.

The most common way a design system fails is quiet: the Figma library and the code drift apart, and nobody can say which one is right. Every technique in this article exists to stop that drift. The core idea is to give each kind of decision exactly one home, then make Figma variables speak the same language as your tokens. Automation helps, but how much of it you get depends on your Figma plan. Without it, a plugin and some discipline still work.

## One source of truth per kind of decision

Picture two people keeping the household budget, each in their own notebook. After a month the two notebooks disagree, and nobody knows which is correct. Writing more carefully does not fix this. Keeping one notebook, with the other person only reading it, does.

A design system makes several kinds of decisions, though, and they do not all belong in the same place. A split many teams use:

| Decision | Starts in | Flows to | Why |
|---|---|---|---|
| **Tokens** (colour, spacing, radius values) | Code (token JSON) | Figma variables | Code has linting, tests, contrast checks and pull request review. Figma has none of these. |
| **New shapes** (layout, anatomy, new variants) | Figma | Code | Exploring visually is faster on a canvas. |
| **Behaviour** (keyboard, focus, states) | Code and docs | Figma (as notes) | Figma cannot fully simulate it. |

Some teams flip the token row and treat Figma as the source, exporting JSON with a plugin. That works too. What matters is choosing one direction and writing it down. The rule that follows is strict: the two directions never mix. If code owns tokens and someone changes a colour in Figma, that change does not exist until it lands in the token file through a pull request.

## How a Figma library is usually organised

1. **Cover or getting started.** What the library is, how to enable it, which version it is.
2. **Foundations.** Pages that display colour, type, spacing, radius, shadow and icons. These are for looking at. The real values live in variables and styles.
3. **Component pages.** One page per component, with a component set that covers every variant property, plus usage examples.
4. **Variables.** Collections such as Primitives, Color (with light and dark modes), Spacing, Radius and Typography.
5. **Styles.** Text styles and effect styles for shadows, because some values still cannot be expressed as variables.

## Figma variables, mapped to code

| Concept | What it is | Matches in code |
|---|---|---|
| **Collection** | A group of variables | One token file or one token group (Color, Spacing) |
| **Mode** | A set of values within a collection | A theming axis: light and dark, or a radius preset (see [Theming and modes](/articles/ds-09-theming-and-modes/)) |
| **Alias** | A variable that points to another variable | An alias such as `{gray.500}` in the DTCG format |
| **Scope** | Which properties a variable may be applied to (fill, stroke, gap, radius) | Close to a lint rule: a text colour variable does not appear when picking a background |
| **Code syntax** | The name shown in Dev Mode for each platform | Set it to `var(--primary)` so developers copy the exact name |
| **Hide from publishing** | Keeps a variable out of the published library | Hide primitives and expose only semantic variables |

Two settings are worth the effort:

- **Hide primitives when publishing.** People using the library then see only semantic variables, the same way components read only semantic tokens in code (see [Design tokens](/articles/ds-03-design-tokens/)).
- **Set tight scopes.** A `border` variable applies only to strokes, `space-*` variables only to gap and padding. Fewer wrong choices are on offer.

## Syncing tokens

There are three ways, and which one you can use depends on your Figma plan.

| Method | Requires | Notes |
|---|---|---|
| **Variables REST API** | Per Figma's docs, a full seat in an Enterprise organisation; writing also needs edit access and the `file_variables:write` scope | Fully automated in CI |
| **Plugin** (Tokens Studio, a custom plugin, or an AI agent through the Figma MCP server) | Any plan | Manual or semi-automated |
| **By hand** | Nothing | Only reasonable when tokens rarely change |

Below Enterprise, a practical routine is to batch token changes and sync once per batch through a plugin. Keep a written list of tokens still waiting to be synced, so nobody assumes Figma is current when it is not.

## Code Connect

Code Connect links a component in code to its counterpart in Figma. When a developer selects an instance in Dev Mode, they see real code instead of generated CSS, which is rarely useful:

```tsx
<Button variant="primary" appearance="outlined" size="sm">Save</Button>
```

Figma's help centre describes Code Connect as the bridge between your codebase and Dev Mode, which also gives AI agents working through the Figma MCP server the correct implementation details. It is available on the Organization and Enterprise plans.

The principle applies even without Code Connect: **name Figma properties and values exactly like the props in code**. If the Figma component has `Variant = Primary`, `Appearance = Outlined` and `Size = sm`, a developer can read the props straight off the instance. If you move to a higher plan later, the Code Connect mapping is nearly mechanical.

## Handoff once a system exists

In a mature system, handoff stops being about measuring pixels. It covers:

1. Which components and variants the screen uses. The instances already say this.
2. Where the screen departs from the system, and why. Only these spots need a detailed spec.
3. States and edge data: empty, error, long text, loading.
4. Behaviour: page transitions, animation, where focus goes after a modal closes.

When a screen needs a thick spec, that usually means the system is missing a component or a pattern.

## Common mistakes

- **Detaching instances** in Figma for a quick tweak. A detached instance stops receiving updates, and that is where drift begins.
- **Different names in Figma and code**, such as `Type = Filled` in Figma and `appearance="contained"` in code.
- **Variants that exist on one side only.** Every Figma variant should have a matching prop, and the reverse.
- **Treating Figma as correct by default.** When code owns tokens, Figma is only correct as of the last sync.

## Sources

- [Figma Developers, Variables REST API](https://developers.figma.com/docs/rest-api/variables/)
- [Figma Help Center, Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect)
- [Figma Help Center, Modes for variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables)
- [Figma Help Center, Guide to variables in Figma](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
- [Tokens Studio](https://tokens.studio/)

← Previous: [Theming and modes](/articles/ds-09-theming-and-modes/) · Next: [Documenting a design system](/articles/ds-11-documentation/) →
