---
title: "Governance and adoption"
date: 2026-05-12
summary: "Team models, who decides what, contribution criteria that filter ideas early, and the numbers that show whether a design system is actually used."
---

Part 14 of 15 in *Design systems from the ground up*.

Governance is how a system makes decisions: who can add, change or remove something, and through which process. Adoption is how much the system is actually used.

The second one is the real test. A system nobody uses has failed, however well it is built. Good governance exists to keep adoption high: clear enough that people trust the system, light enough that they don't route around it.

## Three team models

Nathan Curtis described three ways to staff a design system in [Team Models for Scaling a Design System](https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0) (EightShapes, 2015).

| Model | How it works | Trade-off |
|---|---|---|
| **Solitary** | One product team builds a library mostly for itself; others may adopt it | Fast and grounded in real needs, but priorities tilt toward one product and other teams feel it isn't theirs |
| **Centralized** | A dedicated team builds the design language and components for many product teams, and ships no product itself | Consistent with clear ownership, but can drift from real needs and become a bottleneck |
| **Federated** | Designers from several product teams, chosen for reach and expertise, decide for the system while staying on their teams | Close to real needs with shared ownership, but slower decisions and someone has to coordinate |

Many large organisations end up with a hybrid: a small central team owns the foundations and the final call, and a network of contributors from product teams feeds it.

A freelancer or a single person building a system for their own work is solitary in the literal sense. The rules still need writing down. The next contributor might be a new colleague, a coding agent, or the same person six months later who no longer remembers why a decision was made.

## Who decides what

A simple decision-rights table prevents a lot of argument.

| Change | Proposed by | Decided by | Needs |
|---|---|---|---|
| Bug fix | Anyone | Reviewer | PR and test |
| New variant or semantic token | Anyone | System owner | A reason and a real place it's used |
| New component | Anyone | System owner | Meets the contribution criteria |
| Change or remove a base token, change the brand | System owner | Owner and stakeholders | A migration plan |
| Breaking change | System owner | System owner | Changeset and upgrade guide |

The pattern behind it: adding is easy, changing or removing is hard. A new semantic token that points at an existing primitive carries little risk. Changing a base value touches every screen that uses it.

## Contribution criteria: borrow from GOV.UK

The [GOV.UK Design System](https://design-system.service.gov.uk/community/contribution-criteria/) publishes the criteria every proposal has to meet. It is the clearest public example to learn from.

**When a component or pattern is proposed:**

- **Useful.** There is evidence it would help many teams or services, such as screenshots or links to where something similar is already in use.
- **Unique.** It doesn't duplicate something that already exists. If it replaces something, it has to show it is better.

**Before it is published:**

- **Usable.** Research shows it works for a range of users, including disabled people.
- **Consistent.** It reuses existing styles and components and follows the system's style guide and coding standards.
- **Versatile.** It adapts to different needs and has been tested across browsers, assistive technologies and devices.

The first two criteria do the most work. They filter ideas before anyone spends time building, so the system doesn't grow one component per request. GOV.UK also documents how to [propose a component or pattern](https://design-system.service.gov.uk/community/propose-a-component-or-pattern/), which is worth reading as a template for your own process.

## When a product needs something the system doesn't have

This happens constantly. The options, from lightest to heaviest:

1. **Use what exists in a different way.** Often this is the answer.
2. **Compose it** from existing components inside the product, as a local pattern.
3. **Diverge on the record.** Build it separately, write down why, and tell the system team.
4. **Contribute it back** once the same divergence shows up in several places.

Divergence is not the problem. Silent divergence is. The system needs to know where products go their own way so it can decide whether to grow.

## Measuring adoption

Without numbers, nobody knows whether the system is alive.

| Metric | How to measure | What it tells you |
|---|---|---|
| Share of UI built from system components | Scan product code, compare imports from the system with locally written components | Whether the system replaces local work |
| Detaches in Figma | Figma [library analytics](https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics) (Organization and Enterprise plans) | Whether components fit what designers need |
| Hard-coded values in product code | Lint rules on the product side | Whether the tokens cover enough |
| Versions in use | Each product's `package.json` | Whether upgrades are easy enough to take |
| Repeated questions | The support channel | Where the docs fall short |

One metric to avoid: the number of components. It measures the system team's effort, not the value anyone gets from it.

## Governance when agents contribute too

A growing share of design system code is written by coding agents. They work fast, but they carry no memory between sessions and don't pick up unwritten rules. Governance has to be written down, and wherever possible, checked by a machine.

| Rule | Where it lives | Machine-checked? |
|---|---|---|
| Components read only semantic tokens | Agent instructions (`AGENTS.md`, `CLAUDE.md`) plus a Stylelint rule | Yes, as a lint error |
| Tokens are edited at the source, never in generated files | Agent instructions | Yes, a token check in CI |
| The steps for a new component (spec, code, test, changeset, status) | A checklist or skill in the repo | Partly, through CI and review |
| Who can merge | Branch protection or rulesets | Yes, GitHub blocks it |
| What an agent may do alone and what needs a person | A governance file | No, it depends on the agent reading it |

The lesson holds for human teams too: when a rule matters, move it from memory to a machine that blocks the violation. A rule that only lives in docs gets forgotten. A rule in lint and CI does not.

## Common mistakes

- **The system becomes the police.** It only ever says no, and product teams leave to build their own.
- **No path to contribute.** People who want to help don't know where to start.
- **No adoption numbers**, so the team assumes the system is used.
- **Decisions aren't recorded.** Six months later the same question is argued again. Record large decisions as ADRs (Architecture Decision Records).

## Sources

- Nathan Curtis, *Team Models for Scaling a Design System* (EightShapes, 2015): https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0
- GOV.UK Design System, Contribution criteria: https://design-system.service.gov.uk/community/contribution-criteria/
- GOV.UK Design System, Propose a component or pattern: https://design-system.service.gov.uk/community/propose-a-component-or-pattern/
- Figma Help Center, View and explore library analytics: https://help.figma.com/hc/en-us/articles/360039238353-View-and-explore-library-analytics

← Previous: [Versioning and releasing a design system](/articles/ds-13-versioning-and-releases/) · Next: [Glossary and what to read next](/articles/ds-15-glossary-and-next-steps/) →
