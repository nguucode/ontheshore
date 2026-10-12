# Ticket thread

A thread started to implement one ticket from a `flow idea` map. One ticket, one branch, one PR, one fresh context. Runs without stopping: the user already approved the spec and the ticket split. The user merges the PR.

**Vault writes.** A ticket thread writes only its own ticket file, and only through the device folder. It never writes `ontheshore-kanban.md` or `_system/agent-log.md` and never opens a vault PR: the map thread owns those (see [Tickets become threads](SKILL.md#tickets-become-threads)). Without the folder, everything the vault needs goes in the closing note.

1. **Read**: first ask for the vault (`/Volumes/KAFKA/Vault`) through the device folder tools (`connect_device` if none are listed), so the user's Allow can arrive while you work. Do not wait on it: read the ticket and its spec from the copy under `/mnt/project-files/` named in the brief. Check every `Blocked by` ticket is done: its PR is merged (`list_project_prs`); its ticket file may lag, since the map thread records it. If one is not, tell the coordinator and stop. Once the vault connects, read the vault ticket; where it differs from the copy, the vault wins.
2. **Claim**: with the vault folder connected, append under `## Comments` in the vault ticket file: `<date>: claimed by thread "<thread title>"`. Without it, skip; never write into the copy.
3. **Branch** from the latest default branch.
4. **Build**: read `.claude/skills/implement/SKILL.md` and follow it for this ticket (it drives `tdd` and closes with `matt-code-review`).
5. **After build**: [AFTER-BUILD.md](AFTER-BUILD.md), artifact through ship. Acceptance criteria come from the ticket. If the ticket turns out too big for one session (well past the ~150k-token smart zone), stop and tell the map thread to split it rather than pushing on.
6. **Close** once the PR is merged:
   - Ticket file, only with the vault folder connected: set frontmatter `status: done`, append `<date>: merged in <PR link>` under `## Comments`, then the friction notes as `<date>: retro: <note>` (see [Retro batches](SKILL.md#retro-batches)). No retro run here; the map thread runs one per batch.
   - `send_message` to the map thread (its session is the `list_thread_sessions` row titled with the map thread name from the brief):

     ```
     project-flow: closing <NN> <title>
     PR: <link> (merged)
     Ticket file: written | not written
     Retro:
     - <note>
     ```

   - `send_message` to the coordinator (`get_channel_session_id`): `project-flow: ticket <NN> <title> merged (<PR link>). Start any ticket in the batch this unblocks.`
   - Reply once in the thread with the PR link, then resolve the thread.
