# Domain Docs

Single-context. Domain docs live in the vault, not the repo.

## Before exploring, read these

- **`/Volumes/KAFKA/Vault/10-projects/ontheshore/_context.md`**: current state, decisions, file index.
- **`/Volumes/KAFKA/Vault/10-projects/ontheshore/brief.md`**: the full brief (audience, format, privacy rules, non-goals).
- **`/Volumes/KAFKA/Vault/10-projects/ontheshore/CONTEXT.md`**: glossary, once it exists.
- **`/Volumes/KAFKA/Vault/10-projects/ontheshore/adr/`**: ADRs touching the area you work in, once they exist.
- Public copy: `/Volumes/KAFKA/Vault/_system/context/voice.md`. Design or front-end work: `/Volumes/KAFKA/Vault/_system/context/design-system.md`.

If any of these don't exist, **proceed silently**. `/domain-modeling` creates them lazily, in Vietnamese, following `/Volumes/KAFKA/Vault/CLAUDE.md`.

## Use the glossary's vocabulary

When your output names a domain concept (issue title, refactor proposal, test name), use the term as defined in `CONTEXT.md`. Don't drift to synonyms it avoids. A missing concept is either invented language (reconsider) or a real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR or decision, surface it explicitly:

> _Contradicts ADR-0007 (…), but worth reopening because…_
