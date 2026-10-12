---
title: "Versioning and releasing a design system"
date: 2026-04-28
summary: "What counts as a breaking change in a design system, how to write release notes people can act on, and how to retire things without breaking products."
---

Part 13 of 15 in *Design systems from the ground up*.

A version number is a promise. It tells the people who depend on your system whether an upgrade is safe to take without reading anything.

In a design system that promise covers more than the component API. Renaming a token, changing a component's DOM structure or shifting its size by a few pixels can all break a product, and none of them shows up as a type error.

## Semantic Versioning

Most JavaScript packages follow [Semantic Versioning](https://semver.org/). For a version written as MAJOR.MINOR.PATCH, you increment:

- **MAJOR** for changes that are not backward compatible.
- **MINOR** for new functionality that stays backward compatible.
- **PATCH** for backward compatible bug fixes.

The rule people forget is item 4 of the spec: version 0.y.z is for initial development. Anything may change at any time, and the public API should not be treated as stable.

That leaves 0.x users with no signal at all, so many libraries add their own convention on top: a breaking change bumps MINOR (0.7 to 0.8), and everything else bumps PATCH. Full semver applies from 1.0 onwards.

## What breaks in a design system

| Change | Breaking? |
|---|---|
| Rename or remove a prop | Yes. Product code stops compiling or silently loses the behaviour. |
| Change a prop's default value | Usually. Behaviour changes without the product touching anything. |
| Rename or remove a token | Yes, and quietly. CSS that reads a missing custom property falls back without any error. |
| Change a token's value | Depends. A slightly darker shade is not breaking. Moving a spacing step from 16px to 20px shifts every layout that uses it. |
| Change DOM structure or class names | Possibly. Products may have override CSS or tests that target the structure. |
| Fix an accessibility bug | Usually not, but call it out. A new accessible name can break a test that queries by the old one. |
| Add a prop, variant or token | No. |

The token row is the one teams underestimate. A renamed prop fails loudly in TypeScript. A renamed token fails silently in CSS, and the first person to notice is often a user looking at a broken screen.

## Changesets

[Changesets](https://github.com/changesets/changesets) is a common tool for versioning and changelogs in JavaScript repos. The workflow has two halves:

1. Every pull request with a user-facing change adds a small file to `.changeset/` (run `npx changeset`). It names the package, the bump type and a description.
2. At release time, Changesets collects those files, computes each package's new version from the highest bump, writes `CHANGELOG.md` and deletes the files it used.

The value is timing. The note is written inside the pull request, by the person who made the change, while the details are fresh. Nobody has to reconstruct a month of changes on release day.

### Write the changeset for the person upgrading

An illustrative changeset for a token rename in a 0.x library:

```md
---
"my-design-system": minor
---

Breaking: token `--surface-subtle` is renamed to `--surface-muted`.
The value is unchanged (gray-50 in light, gray-800 in dark), so
contrast for `--muted-foreground` on it is the same as before.
To upgrade: find and replace `--surface-subtle` with
`--surface-muted` in your CSS. The old name is no longer emitted.
```

It does four things: it says the change is breaking, says what changed, says what did not change, and says exactly what the reader has to do.

For visual changes with no API change, a separate section such as "Visual changes, no API changes" helps. List each affected component and what moved, so the person upgrading knows which screens to check.

## Deprecation: removing things politely

Do not delete a public API in one step. A workable sequence:

1. **Mark it deprecated.** Say so in the docs and in the code. A TSDoc [`@deprecated`](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) tag makes editors strike through the name. For tokens, the [Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/) defines a `$deprecated` property.
2. **Provide the replacement.** Name what to use instead and how to switch. Where the change is mechanical, ship a codemod, a script that rewrites product code.
3. **Keep it around.** At least one minor release before 1.0, or until the next major after 1.0.
4. **Remove it**, and record the removal as breaking.

Before 1.0, with few consumers, a direct rename plus clear upgrade notes is acceptable. After 1.0, skipping the deprecation window costs trust.

## Two distribution channels

| | npm package | Copy-source registry |
|---|---|---|
| How it's used | Install, then import components | A CLI copies component source into the product |
| Updates | Bump the version | Copy again and merge with local edits |
| Customisation | Props, tokens, className | Edit the source directly |
| Fits teams that want | Consistency, little customisation | To own the code and customise deeply |
| Versioning matters | A lot | Less: the product picks when to copy |

[shadcn/ui](https://ui.shadcn.com/docs/registry) made the copy-source model popular and lets anyone publish their own registry in the same format. One system can run both channels: components ship on npm, while patterns and templates, which products almost always adapt, ship only through the registry (see [Part 2](/articles/ds-02-mental-models/) on where patterns and templates sit).

If you run a registry, declare dependencies between items correctly and check them in CI. One missing dependency means a consumer copies a component and gets an import error.

## Common mistakes

- **Treating a token rename as a refactor.** For consumers it is a breaking change.
- **Writing the changelog for the system's own developers.** "Refactor useFoo hook" tells a consumer nothing. "Select no longer closes on scroll" does.
- **Releasing too rarely.** Changes pile up, the upgrade becomes a project, and nobody schedules it.
- **No path to 1.0.** A system that stays at 0.x forever never gives consumers a stability commitment.

## Sources

- [Semantic Versioning 2.0.0](https://semver.org/)
- [Changesets](https://github.com/changesets/changesets)
- [shadcn/ui, Registry](https://ui.shadcn.com/docs/registry)
- [TypeScript, JSDoc Reference (`@deprecated`)](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
- [W3C Design Tokens Community Group, Design Tokens Format Module 2025.10 (`$deprecated`)](https://www.designtokens.org/tr/2025.10/format/)

← Previous: [Testing and quality gates](/articles/ds-12-testing-and-quality/) · Next: [Governance and adoption](/articles/ds-14-governance-and-adoption/) →
