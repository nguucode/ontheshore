# After the build step

Shared by `flow idea` (implement here, or one ticket), `flow fix` and `flow change`. Runs without stopping (see the two halves in [SKILL.md](SKILL.md)).

Review and QA cover every commit since the flow (or ticket branch) started, not only the uncommitted diff: `implement` commits as it goes. Every review gets an explicit target; called without one, a review can read an old or partial diff, or stop to ask. `matt-code-review` (here or at the end of `implement`) gets the fixed point `origin/main` plus the path of the ticket, spec or bug report. The other reviews get the PR number once a PR exists, else `origin/main...HEAD`.

**No-code change.** List the paths, do not judge the diff by eye: `{ git diff --name-only origin/main...HEAD; git status --porcelain | cut -c4-; } | sort -u`. No-code means every path ends in `.md` and sits under `.claude/` or `docs/`, or is a root `*.md` (`README.md`, `AGENTS.md`, `CLAUDE.md`). Anything else is code: `src/` (including `.md` content collections, which the site renders), `public/`, config, a `.sh` or `.py` inside a skill. A no-code change skips review-bugs and qa-run, recorded as one checklist line (`review-bugs, qa-run: skipped, no-code change`); every other step still runs. This is the rule, not the agent's call: a mixed diff never skips.

| Step | Skill | Required | Does |
| --- | --- | --- | --- |
| artifact | Artifact tool | optional | Change touches UI: publish an Artifact showing each new or changed screen in its states (default, empty, loading, error) and link it in the thread. No UI: one checklist line, skip. |
| review-spec | `matt-code-review` | yes, unless `implement` ran it | Standards + spec against the ticket, spec or bug report. For `flow idea` and ticket threads it already ran at the end of `implement`: skip with one checklist line. `flow fix` and `flow change` have no `implement`, so it runs here. |
| review-bugs | `code-review` (built-in) | yes, unless no-code | Hunt logic, security and performance bugs. |
| review-lean | ponytail-review | yes | Hunt code that should not exist. |
| review-security | `security-review` (built-in) | optional | Security pass on the change. |
| qa-run | `run` (built-in) | yes, unless no-code | Run the real thing (the Astro site, `astro dev --background`) and check: each acceptance criterion (ticket or spec), the bug is gone (fix), or the change works. Open each changed page in both locales (English at `/…`, Vietnamese at `/vi/…`) where it has both, reload it once, and check at desktop width and at 390px; attach the 390px screenshot in the thread. Report pass/fail per criterion only, fix nothing here. |
| qa-a11y | `a11y-enforcer:a11y-check` | optional | WCAG check when there is UI. |
| debt | ponytail-debt | yes | Ledger of `shortcut:` comments in the change. |
| ship | none | yes | See below. |
| retro notes | none | yes | After merge, write one to three raw friction notes from this thread (see [Retro batches](SKILL.md#retro-batches)). The retro itself runs once per batch, not here. |

## Loops

A review, QA or CI finding sends the work back to the build step to fix, then down the table again. Up to 3 loops; the 4th needs the user's yes (`ask_decision`).

## Ship

1. Work on the thread's branch, never the default branch; never force-push.
2. Before pushing, run `npm run build` (the only check this repo has; the deploy workflow runs the same build on `main`). Merging to `main` deploys ontheshore.biz to production, so a PR that fails the build must never reach the user as ready.
3. Open a draft PR (body per the `pr` skill) and watch it. Fix small CI failures in place; larger ones go back to the build step.
4. The PR stays draft until CI is green, every acceptance criterion is met (checked by qa-run, or by the review steps for a no-code change) and no follow-up commit is planned. Only then mark it ready and tell the user in one line it is ready to merge, and that merging deploys to production. If a commit becomes needed after that, convert the PR back to draft first and say so in the thread. The user merges it themselves; wait for the merge event. Ask when a conflict cannot be resolved cleanly.
5. After merge: update the vault (see [SKILL.md](SKILL.md#vault)), write the retro notes, then the thread's closing step (ticket threads: [TICKET-THREAD.md](TICKET-THREAD.md)).

## A bug from an earlier PR

From the second ticket on, if the failure traces to an already-merged PR (`git log`, `git blame`):

- Small, and this ticket needs it: fix it in this PR as its own commit `fix: … from #<n>`, with a regression test, noted in the PR body.
- Large or separable: pause, get a `flow fix` thread started through the coordinator, ship that first, then merge main into this branch and continue.
- Ask the user before reverting a merged PR or when the fix changes a decision in the spec.
