---
title: "Testing and quality gates"
date: 2026-04-14
summary: "The layers of testing a design system needs, what each layer catches, and how to make CI an actual gate instead of decoration."
---

Part 12 of 15 in *Design systems from the ground up*.

A design system needs more testing than product code, because one bug in a component repeats everywhere the component is used. Testing works in layers, each catching a different kind of failure: types, lint, interaction, accessibility, visual and cross-browser. For UI components, the story is the test case, so you write it once and use it as both example and test. And a test only protects anything if it blocks the merge. A red test that still lets the pull request through is decoration.

## What each layer catches

Think of checking a car before it leaves the factory: paperwork, each part on its own, a test drive, a visual comparison against the reference model, then a drive on several kinds of road. Each step catches what the others miss.

| Layer | Catches | Misses | Common tools |
|---|---|---|---|
| **Type check** | Wrong or missing props, such as an icon-only button without `aria-label` | Behaviour | TypeScript |
| **Lint** | Hard-coded values, primitives used inside components, misspelled token names | Behaviour, visuals | Stylelint (CSS), ESLint or oxlint (JS) |
| **Build checks** | Generated token files out of sync with the source, missing package dependencies | | Custom scripts in CI |
| **Interaction tests** | Clicks, typing or shortcuts that do not produce the right result | Visuals off by a few pixels | Storybook play functions, Testing Library |
| **Accessibility tests** | Contrast, missing labels, invalid ARIA | Whether focus order makes sense, whether a label is meaningful | axe-core through the a11y addon |
| **Visual regression** | Unintended visual changes | Visuals that were wrong from the start | Chromatic, Playwright screenshots |
| **Cross-browser** | Bugs that only appear in Firefox or Safari | | Playwright (Chromium, Firefox, WebKit) |

## Linting tokens: stopping drift at the source

This layer is specific to design systems. The question it answers: how do you know nobody wrote `color: #333` or `padding: 13px` inside a component?

Two Stylelint rules are worth having, set to **error** rather than warning:

1. Properties that have tokens (colour, spacing, radius and so on) must use a token, not a literal value. Stylelint has built-in rules for this, such as `declaration-property-value-disallowed-list`, and plugins exist as well.
2. A custom rule checks every `var(--x)`: it must be a semantic token that actually exists. A primitive gets flagged as a primitive, and an unknown name gets flagged as a likely typo.

The second rule matters more than it looks. When CSS meets `var(--primay)`, a typo, it reports nothing. The declaration silently falls back to the browser default.

Exceptions are allowed, as long as the reason is written right there, in a `stylelint-disable-next-line` comment with an explanation. Exceptions with reasons are a sign of a healthy system. Exceptions without them are debt.

## Testing through stories

Storybook lets you write a **play function**: a script that runs against a story after it renders.

```tsx
import { expect } from 'storybook/test'

export const ClosesOnEscape: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }))
    await expect(canvas.getByRole('dialog')).toBeVisible()
    await userEvent.keyboard('{Escape}')
    await expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
  },
}
```

Notice that the test finds elements by **role and name**, the same way a screen reader sees the page. Testing Library recommends this kind of query first. A test written this way checks behaviour and, indirectly, accessibility: if the button does not have the right name, the test cannot find it.

Storybook's Vitest addon runs every story as a test in a real browser, powered by Playwright. Running on Chromium, Firefox and WebKit is the cheapest way to catch bugs that only show up in Safari.

A useful rule: every accessibility question in a component spec ("Does Escape close it?", "Does focus return?") gets a matching play function.

## Visual regression

Visual regression testing takes a screenshot of each story, compares it to an approved baseline, and reports differences. It catches what the other layers miss: a token change that shifts 30 components by one pixel, or a CSS fix in one place that breaks another.

The options are a hosted service (Chromatic, from the Storybook maintainers) or self-hosted Playwright screenshots. The tradeoff:

- A service is convenient, has a review interface for approving images, and charges by the number of snapshots.
- Self-hosting is free, but screenshots differ between machines (fonts, rendering), so they have to be taken in a fixed environment such as Docker or CI.

For a small system, be selective: one representative story per component, per mode, rather than every story.

## CI as a gate

A common scenario: CI only runs once code reaches the main branch, so several pull requests get merged while tests are red, deploys then fail in a row, and nobody can tell which pull request caused it. The fix:

1. Run CI on **every pull request**: types, lint, token checks, story tests, build.
2. Make those checks **required status checks** in GitHub branch protection or a ruleset. A red pull request cannot be merged, and direct pushes to the main branch are blocked.

A test that cannot block a merge will sooner or later be ignored.

## Flaky tests

A flaky test passes and fails without the code changing. A typical example is a test that checks a component's colour **while a transition is still running**, so the result depends on when the screenshot happens. The fix is to assert the final value, or turn animations off in the test environment, not to rerun until it passes.

Flakiness is never random. It always has a cause (timing, animation, ordering, network), and the cause is what needs fixing.

## Common mistakes

- **Relying on DOM snapshots alone.** The snapshot changes with every small edit, people press "update" out of habit, and the test stops meaning anything.
- **Finding elements by CSS class.** Rename a class and the test breaks, though the behaviour did not change. Query by role and name.
- **Testing only in Chrome.** Safari and Firefox have their own bugs, especially around focus, forms and newer CSS.
- **Treating automated accessibility tests as enough.** See [Accessibility in a design system](/articles/ds-08-accessibility/).

## Sources

- [Storybook, Interaction tests](https://storybook.js.org/docs/writing-tests/interaction-testing)
- [Storybook, Vitest addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon)
- [Storybook, Accessibility tests](https://storybook.js.org/docs/writing-tests/accessibility-testing)
- [Storybook, Visual tests](https://storybook.js.org/docs/writing-tests/visual-testing)
- [Testing Library, About Queries](https://testing-library.com/docs/queries/about)
- [Playwright, Visual comparisons](https://playwright.dev/docs/test-snapshots)
- [Stylelint](https://stylelint.io/)
- [GitHub Docs, About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)

← Previous: [Documenting a design system](/articles/ds-11-documentation/) · Next: [Versioning and releasing a design system](/articles/ds-13-versioning-and-releases/) →
