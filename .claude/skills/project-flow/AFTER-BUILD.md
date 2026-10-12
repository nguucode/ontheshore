# After the build step

Shared by `flow idea` (implement here, or one ticket), `flow fix` and `flow change`. Runs without stopping (see the two halves in [SKILL.md](SKILL.md)).

Review and QA cover every commit since the flow (or ticket branch) started, not only the uncommitted diff: `implement` commits as it goes.

| Step | Skill | Required | Does |
| --- | --- | --- | --- |
| artifact | Artifact tool | optional | Change touches UI: publish an Artifact showing each new or changed screen in its states (default, empty, loading, error) and link it in the thread. No UI: one checklist line, skip. |
| review-bugs | `code-review` (built-in) | yes | Hunt logic, security and performance bugs. `matt-code-review` (standards + spec) already ran inside `implement`. |
| review-lean | ponytail-review | yes | Hunt code that should not exist. |
| review-security | `security-review` (built-in) | optional | Security pass on the change. |
| qa-run | `run` (built-in) | yes | Run the real thing (the Astro site, `astro dev --background`) and check: each acceptance criterion (ticket or spec), the bug is gone (fix), or the change works. Report pass/fail only, fix nothing here. |
| qa-a11y | `a11y-enforcer:a11y-check` | optional | WCAG check when there is UI. |
| debt | ponytail-debt | yes | Ledger of `shortcut:` comments in the change. |
| ship | none | yes | See below. |
| retro | retro | yes | After merge, run on this thread's own session (it is the primary source). Suggestions only: lint rules, checks, CLAUDE.md, coding standards. Apply nothing; list them in the closing reply. |

## Loops

A review, QA or CI finding sends the work back to the build step to fix, then down the table again. Up to 3 loops; the 4th needs the user's yes (`ask_decision`).

## Ship

1. Work on the thread's branch, never the default branch; never force-push.
2. Before pushing, run `npm run build` (the only check this repo has; the deploy workflow runs the same build on `main`). Merging to `main` deploys ontheshore.biz to production, so a PR that fails the build must never reach the user as ready.
3. Open a draft PR (body per the `pr` skill) and watch it. Fix small CI failures in place; larger ones go back to the build step.
4. When the build and any CI are green, mark the PR ready and tell the user in one line it is ready to merge, and that merging deploys to production. The user merges it themselves; wait for the merge event. Ask when a conflict cannot be resolved cleanly.
5. After merge: update the vault (see [SKILL.md](SKILL.md#vault)), run retro, then the thread's closing step (ticket threads: [TICKET-THREAD.md](TICKET-THREAD.md)).

## A bug from an earlier PR

From the second ticket on, if the failure traces to an already-merged PR (`git log`, `git blame`):

- Small, and this ticket needs it: fix it in this PR as its own commit `fix: … from #<n>`, with a regression test, noted in the PR body.
- Large or separable: pause, get a `flow fix` thread started through the coordinator, ship that first, then merge main into this branch and continue.
- Ask the user before reverting a merged PR or when the fix changes a decision in the spec.
