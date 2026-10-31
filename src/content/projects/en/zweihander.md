---
title: "One token source, every change checked"
role: "Senior Product Designer"
year: "2026"
summary: "Zweihänder, a React design system I rebuilt in public in six weeks, because the systems I ran at previous companies are under NDA. Open source, MIT, early stage."
facts:
  Year: "2026"
  Duration: "6 weeks"
  Role: "Senior Product Designer"
  Team: "Me, with AI agents writing most of the code"
  Platform: "React, Figma"
  License: "MIT"
  GitHub: "https://github.com/nguucode/zweihander"
  npm: "https://www.npmjs.com/package/zweihander"
  Storybook: "https://zweihander.ontheshore.biz/storybook/"
order: 4
draft: false
---

At previous companies I built and ran the design system, led the design team that used it and advised clients who asked for changes. Those systems are under NDA, so I rebuilt one in public. The key decision was to make code the only source of tokens and let Figma follow, so design and code cannot drift apart again.

## Before the system, everyone designed in their own direction

On every team I joined, the design system did not exist yet, and the cost showed up in the work, not in a report.

- **Many versions of one component.** Each designer drew their own select box, date field and table. Engineers built whichever file they opened first.
- **Uneven output.** The same client got screens of different quality depending on who designed them.
- **Design and code drifted.** Nobody could say whether Figma or the shipped product was right.
- **Changes with no blast radius.** When a client asked for a change, nobody knew which screens it would touch.
- **Accessibility checked by hand,** when it was checked at all.

## What the public rebuild shows

At the companies I have no numbers I can publish. What changed was visible: the team designed in one direction, and output stayed even from one designer to the next. For Zweihänder everything is measured.

<dl class="stats">
  <div><dt>Components and patterns</dt><dd class="v">62</dd><dd class="src">Entry points in package.json on main, 28 Oct 2026</dd></div>
  <div><dt>Story tests passing</dt><dd class="v">1,956</dd><dd class="src">Chromium, Firefox and WebKit, CI run of 20 Oct 2026</dd></div>
  <div><dt>Figma component pages</dt><dd class="v">45</dd><dd class="src">Each with every variant and state, imported from code on 19 Oct 2026</dd></div>
  <div><dt>Primitive tokens</dt><dd class="v">288</dd><dd class="src">Generated from tokens JSON, aliased by 130 colour variables in Light and Dark</dd></div>
</dl>

- **Accessibility is tested, not certified.** Every component has automated axe checks set to fail the build, plus play tests for keyboard behaviour. That is not a WCAG audit.
- **No outside adoption yet.** Zweihänder has no known consumers, so I make no claim about usage or speed.

## I set the direction and the rules; AI wrote most of the code

My front-end skills are basic. AI agents wrote most of the code, under a spec, a definition of done and a workflow I set, and I reviewed and decided every change.

- **Product owner.** Scope, release order and what 1.0 means. See Decision 1.
- **Business analyst and design lead.** The spec every component follows and the checklist every contribution passes. At work, this is what my design team and clients worked through. See Decision 2.
- **Designer.** Every visual decision, from tokens to the Figma library. See Decision 3.
- **Maintainer.** Releases, CI and fixing what breaks. See Decision 4.

## How one component travels from spec to release

Combobox, a text field that filters a list as you type, appears in every decision below. Every component follows the same path:

- **Spec.** Anatomy and prop list from [uiguideline.com](https://uiguideline.com), the source spec for the whole kit.
- **Docs.** An MDX page in Storybook, written before the code.
- **Code.** Plain elements styled with CSS Modules, reading only tokens. Complex behaviour comes from Base UI.
- **Tests.** Stories with play tests and accessibility checks, run in three browser engines.
- **Release.** A changeset, a status tag (`experimental` until stable), then a matching component set in Figma.

Tokens sit in three tiers: primitives hold values (a blue at step 600), semantic tokens name a purpose (`--primary`), and components read only semantic tokens.

## Decision 1: ship 31 components first, not 45

- **At work.** Systems that tried to cover everything from day one never shipped a version anyone could rely on.
- **Options.** Build all 45 components in uiguideline's list, or cut by how often business apps need them.
- **Chosen.** 31 core components in six batches, each a 0.x release. Production-ready means the definition of done, semver, four browsers and full keyboard use. Brand stayed out of scope. Combobox made the first cut because it is the hardest input in a business form.
- **Cost.** Table, the component ERP screens need most, came in a later batch.

## Decision 2: a borrowed spec, and every deviation written down

- **At work.** Designers and clients argued about the same component again and again because there was no shared definition.
- **Options.** Write a spec for each component myself, or adopt an external one.
- **Chosen.** uiguideline's anatomy and prop list as the source spec. Any deviation needs a written reason. One API convention for all components, and a seven-point definition of done: spec, docs, stories, play tests, accessibility and dark mode, registry export, 44px touch targets.
- **Cost.** Some prop names feel unusual to React developers.

The checklist is also the contribution model. A fix for one component becomes a rule for the group. Combobox highlights the matched text with bold and an underline, not colour, because colour lost contrast on the selected row. Its four alignment and focus rules then moved into the shared input styles, so every other input follows them.

## Decision 3: code owns the tokens, Figma follows

- **At work.** Figma and code disagreed, and every disagreement cost a meeting.
- **Constraints.** One source of truth, a Figma Professional plan (at most 10 modes per collection), and no Code Connect on that plan.
- **Options.** Figma as the source, with a token plugin exporting to code, or code as the source, synced into Figma variables.
- **Chosen.** Tokens live in JSON in the repo and generate CSS custom properties. Figma variables are synced from them. Figma leads on how things look, never on values. For behaviour I chose Base UI over Radix, because Radix has no Combobox.
- **Cost.** Figma only approximates code: hover and pressed are overlays rather than colour mixes, the 17 accent hues cannot be modes, and radius does not follow scaling yet.

## Decision 4: a failing pull request can no longer merge

- **At work.** Systems decayed quietly whenever nobody was watching them.
- **What happened here.** The test workflow only ran after a push to main, so eight pull requests merged with failing story tests, and nine deploys failed in a row.
- **Options.** Stricter manual review, or a machine gate.
- **Chosen.** CI runs token, registry, type, story test and build checks on every pull request, and a branch ruleset blocks merging and direct pushes until they pass.
- **Cost.** Slower pull requests, and flaky WebKit tests had to be fixed at the root instead of retried.

When AI writes most of the code, the gate holds quality, not the reviewer's memory.

## How the system runs

- **Storybook** documents every component with usage, a props table and live stories.
- **A registry** lets a project copy a component's source, with its dependencies, instead of installing the whole package.
- **The Figma library** has variables for colour in Light and Dark, five radius presets, and scaling and density modes, all bound to the same names as the CSS.
- **Theme presets** change accent, radius and scaling from one wrapper, without touching component code.

## What I left out

The systems I built at previous companies: their names, clients, screens and the industries narrow enough to identify them. Every image and number on this page comes from Zweihänder.

## What I would do differently

- **Decision 4.** The gate should have existed from the first commit, here and at every company before.
- **Decision 3.** I underestimated what Figma cannot express. I would list those gaps before choosing the sync direction, not after.
- **Decision 1.** I would bring Table in earlier. It is the component that proves a system is ready for ERP work.
- **Working with AI.** The clearer the rules, the more often AI gets it right first time. My job moved from drawing components to writing the rules they follow.

<!-- TODO: add figures for the domain section (component lifecycle, three token tiers) and each decision, then a "## Design" gallery of 7 images (dark mode, Compact density, 5 radius presets, AppShell 3 surfaces, NavSidebar, Avatar and Tag 17 hues, docs home). Images go in public/projects/zweihander/. -->
