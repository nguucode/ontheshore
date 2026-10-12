---
name: project-flow
description: Idea-to-ship workflow for ontheshore (ontheshore.biz) in a Claude Code Project (threads, not the desktop flow mod). Use when a thread is asked to run "flow idea", "flow fix", "flow change" or "flow tidy", to take an idea, bug, behaviour change or repo health check through to merged PRs, or when a thread was started to implement one ticket.
---

# Project flow

Matt Pocock's loop (grill, spec with seams, small tickets each in a fresh context, two-axis review, retro once per batch) as the `flow` mod runs it (`/Volumes/KAFKA/Vault/10-projects/claude-mods/flow.md`), carried into a Claude Code Project. The agent is the sergeant, the user the general: every decision is the user's, made before code. Same four flows and steps; the differences are **who drives** (a thread, not the mod) and **tickets**: after `to-tickets`, every ticket runs in its own thread and ships as its own PR.

A thread started for one ticket skips this file and follows [TICKET-THREAD.md](TICKET-THREAD.md).

## Running a step

- **User-invoked skills** (`disable-model-invocation: true`: setup-matt-pocock-skills, grill-with-docs, to-spec, to-tickets, implement, improve-codebase-architecture) cannot be reached through the Skill tool. Read `.claude/skills/<name>/SKILL.md` and follow it as if the user had typed the command.
- **Model-invoked skills** (research, prototype, tdd, diagnosing-bugs, matt-code-review, ponytail-*): call the Skill tool.
- **Built-ins** (`code-review`, `security-review`, `run`) and `a11y-enforcer:a11y-check`: call the Skill tool.
- Repo conventions sit on top of every step: `docs/agents/*.md` (tracker in the vault, `CONTEXT.md`, ADRs). This flow is the only implementation process. Changes to Zweihänder components belong in the zweihander repo (its own `project-flow` and `COMPONENTS.md`), not here.
- This repo has no test runner yet. When a step calls for a failing test first (`tdd`, `diagnosing-bugs`), say so in the checklist and prove the change with `npm run build` plus `run` instead, until a runner is added.
- The tracker lives in the vault on the user's Mac. Reach it with the device folder tools (`/Volumes/KAFKA/Vault`); if none are connected, call `connect_device` and wait. Write vault files in Vietnamese, following `/Volumes/KAFKA/Vault/CLAUDE.md`.

Steps 3 to 6 stay in one unbroken thread (no compaction before the tickets exist), so grill, spec and tickets share the same reasoning.

## Two halves

The **build step** splits every flow:

- **Before build: the user approves each step.** After a step, reply with a short summary, the risky spot, and the proposed next step (run it, or skip an optional one with the reason). Wait for the user's answer in the thread; their choice beats the proposal. A required step is skipped only on the user's word (for example a spec that already exists).
- **From build on: run without stopping.** Two-line status per step in the checklist, then go on. Stop and ask (`ask_decision`) only for a product or UX choice the spec leaves open, a trade-off with a real cost, or anything destructive.

Starting mid-way: if the user says early steps are done ("spec at …, tickets at …"), find those files and start at the first step not done; the skipped ones count as skipped.

## `flow idea`

| # | Step | Skill | Required | Does |
| --- | --- | --- | --- | --- |
| 1 | setup | setup-matt-pocock-skills | optional, once per repo | Already done for this repo (`docs/agents/`): skip. |
| 2 | research | research | optional | Primary-source research, saved to `10-projects/ontheshore/` in the vault per the vault's `CLAUDE.md`. |
| 3 | grill | grill-with-docs | yes | Interview until clear, writing `CONTEXT.md` and ADRs as terms and decisions land. |
| 4 | prototype | prototype | optional | Throwaway code for a question that needs something runnable. |
| 5 | spec | to-spec | yes | Spec into the tracker. Ask: **spec + tickets** (one thread and PR per ticket) or **implement here** (one PR, skip tickets). |
| 6 | tickets | to-tickets | when tickets chosen | One file per ticket under `10-projects/ontheshore/<feature>/issues/`, each with `Blocked by:` and `Batch:`, each small enough for one fresh session (well under ~150k tokens). Group them into batches of 5 to 10 tickets in dependency order (a feature with 10 or fewer tickets is one batch); a ticket's blockers sit in its own or an earlier batch. Then hand off, see [Tickets become threads](#tickets-become-threads). |
| 7 | **implement** | implement | yes | **Build step** ("implement here" only). Then [AFTER-BUILD.md](AFTER-BUILD.md). |

## `flow fix`

| # | Step | Skill | Required | Does |
| --- | --- | --- | --- | --- |
| 1 | **diagnose** | diagnosing-bugs | yes | **Build step.** Reproduce, regression test that goes red, root-cause fix. Then [AFTER-BUILD.md](AFTER-BUILD.md); QA checks the bug is gone and nothing nearby broke. |

## `flow change`

| # | Step | Skill | Required | Does |
| --- | --- | --- | --- | --- |
| 1 | grill | grill-with-docs | optional | Only when the change is still fuzzy. |
| 2 | **tdd** | tdd | yes | **Build step.** Red, green, then [AFTER-BUILD.md](AFTER-BUILD.md). |

## `flow tidy`

Approve every step; no code changes, so no artifact, review, QA or ship.

| # | Step | Skill | Required | Does |
| --- | --- | --- | --- | --- |
| 1 | audit | ponytail-audit | yes | Whole-repo report. |
| 2 | architecture | improve-codebase-architecture | optional | Deepening candidates. |
| 3 | debt | ponytail-debt | yes | `shortcut:` ledger. |

Each finding the user picks becomes a new `flow fix` or `flow change` thread (hand it to the coordinator the same way as tickets).

## Tickets become threads

After `to-tickets`, this thread becomes the **map thread**. It does not implement. It hands off one batch at a time.

**The map thread is the only writer of the feature's shared vault files**: `ontheshore-kanban.md` and `_system/agent-log.md`. Ticket threads send their closing note to the map thread instead of writing these files or opening a vault PR (see [TICKET-THREAD.md](TICKET-THREAD.md)); the map thread's agent-log lines cover their sessions. Parallel ticket threads each opening a vault PR on the same two files conflict with each other.

0. **Spec and tickets on vault `main` first** (once per feature, before the first batch). Written through the device folder, Obsidian Git commits them. Written through a vault PR (no folder connected), reply with the PR link and ask the user to merge it; hand off nothing until the PR shows merged. Otherwise ticket threads start from tickets that exist only on an unmerged branch.
1. List the current batch's tickets with title, vault path and `Blocked by`. The **frontier** is every ticket in the batch with no open blocker. Copy the spec to `/mnt/project-files/<feature>/` and each ticket to `/mnt/project-files/<feature>/issues/`, so a ticket thread can start reading before the user allows the vault. The copies are read-only snapshots; the vault stays the source of truth.
2. Get the coordinator with `get_channel_session_id`, then `send_message` to it:

   ```
   project-flow: start ticket threads for <feature>, batch <N> of <total>.
   Spec: <vault path> (copy: <project-files path>)
   Start now (frontier):
   - <NN> <title>: <vault path> (copy: <project-files path>)
   Waiting: <NN> blocked by <NN>, ...
   Brief for each: "Implement ticket <vault path> (copy: <project-files path>) following .claude/skills/project-flow/TICKET-THREAD.md. Map thread: <this thread's title>."
   ```

3. The coordinator posts one project-chat line per ticket and starts a thread on it with that brief (its rules are in project memory, `project-flow-tickets`). Frontier tickets run in parallel.
4. Each ticket thread messages the coordinator when its PR merges; the coordinator then starts every ticket in the batch that merge unblocked. The map thread keeps the checklist (one line per ticket: waiting, running, merged) from what it reads with `list_thread_sessions` / `fetch_thread`.
5. Each ticket thread also sends the map thread a closing note (`project-flow: closing <NN> …`). For each one, the map thread updates the kanban row, appends one `_system/agent-log.md` line, and, when the note says `Ticket file: not written`, makes the closing edits from [TICKET-THREAD.md](TICKET-THREAD.md) step 6 to the ticket file itself. Every vault edit follows the vault's write rules (`updated:` bumped). With the device folder connected it writes the vault directly; without it, it keeps every edit for the batch on one vault branch and one vault PR.
6. When every ticket in the batch is merged: run the [batch retro](#retro-batches) over the batch's closing notes and reply once with the batch's PR list, the vault PR from step 5 if there is one (to merge), and the ranked retro list, asking which to apply. Each one the user picks becomes a `flow change` thread. Once the user answers, hand off the next batch (step 1), so the next batch builds on what this one taught.
7. After the last batch: update the vault (`_context.md` line, `_system/agent-log.md`), on the last batch's vault PR when there is one, and resolve the thread.

## Retro batches

Retro runs once per batch of 5 to 10 finished tickets or threads, not once per thread: one short list the user can read in one sitting, instead of a stream of overlapping suggestions.

**Every build thread logs friction, it does not run retro.** At its closing step, a thread writes one to three raw notes on what cost it time or went wrong (a file it could not find, a check that would have caught a mistake, a wasted tool call, a missing instruction). Facts, not fixes. `none` is a valid note. Where they go:

- Ticket thread: in its closing note to the map thread, which records them under `## Comments` in the ticket file as `<date>: retro: <note>` (the ticket thread writes them there itself when it has the vault folder).
- Any other `flow fix` or `flow change` thread: a new file `10-projects/ontheshore/retro-inbox/<date>-<thread-slug>.md` with frontmatter `status: open` and the PR link, notes as bullets. One file per thread, so parallel threads never write the same file. No vault reachable from this thread: write the same file to `/mnt/project-files/ontheshore/retro-inbox/` instead.

**The batch retro** is run by the map thread when its batch is merged, or by the thread whose note makes 5 open files across both `retro-inbox/` folders:

1. Read `.claude/skills/retro/SKILL.md`. Its primary sources are the batch's notes; open a source thread with `fetch_thread` only when a note is too thin to act on.
2. Merge duplicates, drop one-offs that a check or doc would not prevent, rank by how often and how badly it hit.
3. Present at most 5 items, one line each: the change (lint rule, check, CLAUDE.md line, skill edit), the evidence (which tickets or threads), and the file it touches. Apply nothing.
4. For an inbox batch, set each processed file's frontmatter to `status: reviewed`.

## Vault

Specs, tickets and research live in the vault already; docs that ship with the code (README, ADRs, `docs/`) stay in this repo and are not copied. At the end of a flow, add a line to `10-projects/ontheshore/_context.md` and append to `_system/agent-log.md`. Ticket threads skip this: the map thread writes for them.
