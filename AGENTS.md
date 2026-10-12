## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Vault (memory)

Durable knowledge for this project lives in the Obsidian vault **ontheshore**, not in this repo and not in chat:
`/Volumes/KAFKA/Vault` (external drive KAFKA). Project index, imported below:
@/Volumes/KAFKA/Vault/10-projects/ontheshore/_context.md

- Before non-trivial work, read the vault's `CLAUDE.md` and follow its read order (starts with `_system/context/governance.md`; design or front-end work also reads `_system/context/design-system.md`).
- Product decisions, research, briefs, and non-code output go to `10-projects/ontheshore/` in the vault (start from its `_context.md`; it was named `cv-portfolio` before 2026-10-02). Follow the vault's write rules (frontmatter, agent-log).
- Docs that ship with the code (README, ADRs, CONTEXT.md, docs/) stay in this repo. Do not copy them into the vault.

## Workflow

- Every implementation (new work, fix, behaviour change) follows `.claude/skills/project-flow/` by default: `flow idea`, `flow fix` or `flow change` (`flow tidy` for a repo health check). After `to-tickets`, each ticket runs in its own thread. Skip it only when the user says so.
- Skills: when a skill in `.claude/skills/` overlaps a built-in or plugin skill, use the one in `.claude/skills/` (`matt-code-review` for standards + spec review). The flow's bug-hunt step still uses the built-in `/code-review` on purpose. Sources and licenses: `.claude/skills/THIRD_PARTY.md`.
- Before pushing, `npm run build` must pass. Merging to `main` deploys ontheshore.biz.

## Agent skills

### Issue tracker

Markdown files in the vault, `10-projects/ontheshore/<feature>/issues/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five roles, written as the issue's `Status:` line. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context; `CONTEXT.md` and ADRs live in the vault. See `docs/agents/domain.md`.
