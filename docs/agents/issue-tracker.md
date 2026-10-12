# Issue tracker: Obsidian vault (markdown)

Issues and specs for this repo live as markdown files in the vault, not in the repo: `/Volumes/KAFKA/Vault/10-projects/ontheshore/`.

Before writing there, read `/Volumes/KAFKA/Vault/CLAUDE.md` (frontmatter, `_context.md`, `_system/agent-log.md`). Vault content is written in Vietnamese.

## Conventions

- One feature per directory: `/Volumes/KAFKA/Vault/10-projects/ontheshore/<feature-slug>/` (none yet)
- The spec is `/Volumes/KAFKA/Vault/10-projects/ontheshore/<feature-slug>/<feature-slug>.md`
- Implementation issues are one file per ticket at `/Volumes/KAFKA/Vault/10-projects/ontheshore/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`, never a single combined tickets file
- Each issue file starts with vault frontmatter (`description`, `type: issue`, `status`, `updated`, `access`, `tags: [ontheshore]`), then `Type:`, `Status:`, `Blocked by:`, `Mode:` lines (format: `10-projects/zweihander/v1-plan/issues/01-*.md`)
- Triage state is the `Status:` line (role strings in `triage-labels.md`)
- Comments and conversation history append to the bottom of the file under a `## Comments` heading
- Board view: `/Volumes/KAFKA/Vault/10-projects/ontheshore/ontheshore-kanban.md` (create it with the first feature)

## When a skill says "publish to the issue tracker"

Create a new file under `/Volumes/KAFKA/Vault/10-projects/ontheshore/<feature-slug>/` (creating the directory if needed), then add a line to `_system/agent-log.md`.

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. The user will normally pass the path or the issue number directly.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a file with one **child** file per ticket.

- **Map**: `/Volumes/KAFKA/Vault/10-projects/ontheshore/<effort>/<effort>-wayfinder-map.md` (Notes / Decisions-so-far / Fog body).
- **Child ticket**: `/Volumes/KAFKA/Vault/10-projects/ontheshore/<effort>/issues/NN-<slug>.md`, numbered from `01`. `Type:` is `research`/`prototype`/`grilling`/`task`; `Status:` is `claimed`/`resolved`.
- **Blocking**: a `Blocked by: NN, NN` line near the top. A ticket is unblocked when every file it lists is `resolved`.
- **Frontier**: scan `issues/` for files that are open, unblocked, and unclaimed; first by number wins.
- **Claim**: set `Status: claimed` and save before any work.
- **Resolve**: append the answer under `## Answer`, set `Status: resolved` (and frontmatter `status: done`), then append a gist + link to the map's Decisions-so-far.
