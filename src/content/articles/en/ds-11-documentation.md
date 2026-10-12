---
title: "Documenting a design system"
date: 2026-03-31
summary: "What a component page should answer, how to write guidelines that help people choose, and which parts of the docs code should generate instead of people."
---

Part 11 of 15 in *Design systems from the ground up*.

Documentation is the user interface of a design system. A good component with poor docs still gets misused, or quietly rebuilt by someone who could not tell it already existed. A useful component page answers three questions: what is it, how is it built, and when should it be used. The most valuable part is usually "when not to use it", along with Do and Don't pairs, because that is where judgement lives and code cannot hold judgement. Anything the code already knows, such as props and token values, should be generated from the code rather than typed by hand.

## Who reads the docs

| Reader | Needs | Reads |
|---|---|---|
| Designer | The right component, and which variant fits which situation | Overview, Guidelines |
| Developer | Props, code examples, behaviour, accessibility | Specs (API), examples |
| PM, QA | Expected behaviour and states | Guidelines, Specs (states) |
| Contributor | Why the component is the way it is, and which exceptions were agreed | Specs, decision history |
| AI agent | Clear rules and exact names | All of it, especially the structured parts |

The last row is new but real: agents read docs to write code with the system. Structured content, such as tables and exact names, helps an agent more than long prose does.

## Structuring a component page

### Material 3: tabs by reader

Material 3 splits each component page into tabs: **Overview**, **Specs**, **Guidelines** and **Accessibility**.

| Tab | Contains |
|---|---|
| **Overview** | What the component is, its variants, links to resources (Figma, source) |
| **Specs** | Anatomy, sizes, colours (which tokens), states, API |
| **Guidelines** | When to use it, Do and Don't, correct usage |
| **Accessibility** | Keyboard, screen reader, contrast |

The point of tabs is that each reader goes straight to the part they need and skips the rest.

### GOV.UK: sections by question

Component pages in the GOV.UK Design System follow the questions people actually ask: *When to use this component*, *When not to use this component*, *How it works*, and on many pages *Research on this component*. Two strengths stand out. Claims are backed by evidence, and the "when not to use" section is always there.

You do not have to pick one. A strong combination is Material's tabs with GOV.UK's question-led content inside them.

## Writing guidelines

### When to use it, and when not to

This section has to help people choose between components that look alike. For a switch:

- Use a switch when the change takes effect immediately, such as turning on notifications.
- Do not use a switch inside a form with a Save button. Use a checkbox, because a checkbox means "select now, submit later".

"A switch turns something on or off" helps nobody. A checkbox does that too.

### Do and Don't

A good Do and Don't pair:

- Shows an image on both sides, identical except for the one thing being taught.
- Gives a one-line reason. "Don't place two primary buttons side by side. People cannot tell which action matters most."
- Teaches one thing per pair.

If the docs are written in MDX, build one shared block (for example `<DoDont>`) so every page uses the same format.

### Writing for scanning

- Short, active sentences.
- The most important point first.
- The exact terms defined in the system's glossary.
- Real examples instead of lorem ipsum.

## Status: telling people how much to trust a component

Every component should carry a status. A common ladder:

| Status | Meaning |
|---|---|
| Experimental | Being tried out. The API may change, so use it at your own risk. |
| Beta or candidate | Used for real in a few places, waiting to settle. |
| Stable | Comes with a commitment: API changes go through a breaking change process. |
| Deprecated | Will be removed, with a migration guide. |

A status ladder lets a system ship early and stay honest. Nobody is surprised when an experimental component changes.

## Storybook

Storybook is a workshop and documentation environment for UI components, used by many design systems. Its core ideas:

| Concept | What it is |
|---|---|
| **Story** | One state of a component, written in Component Story Format (CSF), where each export is a story |
| **Args** | The prop values of a story, editable live in the Controls panel |
| **argTypes** | A description of each prop: type, options, explanation. Written once here, it feeds the props table and other tools. |
| **MDX** | Markdown with JSX, for docs pages with live components inside |
| **Autodocs** | A docs page generated from a component's stories and types |
| **Play function** | An interaction script that runs against a story, usable as a test (see [Testing and quality gates](/articles/ds-12-testing-and-quality/)) |

The best part is that one story does three jobs. It is an example in the docs, a development environment, and a test case. You write it once.

## Docs generated from code

Do not copy into the docs what the code already contains:

- **Props tables** come from TypeScript types and argTypes.
- **Token tables** render straight from the token files, so changing a token updates the docs.
- **Code examples** come from stories.

Then check it automatically. A `docs:check` script in CI can block a docs page that is missing a required section, such as "When not to use". This is the same thinking as linting tokens: once a rule is written down, a machine can enforce it.

## Where the docs live

Docs that ship with code, such as READMEs and component MDX, belong in the same repository and the same version as the code. Whoever installs a version reads the docs for that version. Decisions, research and the history of debates can live elsewhere (a wiki, ADRs, a notes app), because that is the project's history and does not need to travel with the package.

## Common mistakes

- **Docs that only list props.** Developers know how to call a component but not when to.
- **Perfect examples only.** Short text and tidy data everywhere. Add examples with long text, other languages, empty states and errors.
- **Handwritten docs that drift from the code.** A prop was renamed and the docs still use the old name.
- **No "when not to use" section.**
- **No status**, so nobody knows which components to trust.

## Sources

- [Material Design 3, Buttons (Overview, Specs, Guidelines and Accessibility tabs)](https://m3.material.io/components/buttons/overview)
- [GOV.UK Design System, Radios](https://design-system.service.gov.uk/components/radios/)
- [Storybook, How to document components](https://storybook.js.org/docs/writing-docs)
- [Storybook, Component Story Format](https://storybook.js.org/docs/api/csf)
- [Storybook, ArgTypes](https://storybook.js.org/docs/api/arg-types)

← Previous: [Connecting design and code](/articles/ds-10-design-and-code/) · Next: [Testing and quality gates](/articles/ds-12-testing-and-quality/) →
