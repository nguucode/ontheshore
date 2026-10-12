# Ticket thread

A thread started to implement one ticket from a `flow idea` map. One ticket, one branch, one PR, one fresh context. Runs without stopping: the user already approved the spec and the ticket split. The user merges the PR.

1. **Read** the ticket file (vault path in the brief) and the spec it belongs to, through the device folder tools (`/Volumes/KAFKA/Vault`). Check every `Blocked by` ticket is done; if one is not, tell the coordinator and stop.
2. **Claim**: append under `## Comments` in the ticket file: `<date>: claimed by thread "<thread title>"`.
3. **Branch** from the latest default branch.
4. **Build**: read `.claude/skills/implement/SKILL.md` and follow it for this ticket (it drives `tdd` and closes with `matt-code-review`).
5. **After build**: [AFTER-BUILD.md](AFTER-BUILD.md), artifact through retro. Acceptance criteria come from the ticket. If the ticket turns out too big for one session (well past the ~150k-token smart zone), stop and tell the map thread to split it rather than pushing on.
6. **Close** once the PR is merged:
   - Ticket file: set frontmatter `status: done`, append `<date>: merged in <PR link>` under `## Comments`.
   - `send_message` to the coordinator (`get_channel_session_id`): `project-flow: ticket <NN> <title> merged (<PR link>). Start any ticket this unblocks. Retro: <one line per suggestion, or none>.`
   - Reply once in the thread with the PR link and the retro suggestions, then resolve the thread.
