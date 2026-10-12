# Third-party skills

Skill folders in `.claude/skills/` copied from upstream, by way of the zweihander repo (`nguucode/zweihander`, `.claude/skills/`), where they were vendored first. `project-flow` is ours, adapted from zweihander's copy for this repo (tracker path, ship checks). zweihander's `zw-build` is not copied: it builds design-system components, which live in that repo.

Local edits: mattpocock `code-review` renamed to `matt-code-review` (folder and `name:`) because Claude Code's built-in `/code-review` shadows it; references in `ask-matt`, `implement`, `implement-spec` and `tdd` updated to match. Everything else is verbatim.

| Source | Commit | License | Folders |
| --- | --- | --- | --- |
| https://github.com/mattpocock/skills (`skills/engineering`, `skills/productivity`) | `49dd158d1076134a641b33efb035946536778336` | MIT | ask-matt, matt-code-review, codebase-design, diagnosing-bugs, domain-modeling, grill-me, grill-with-docs, grilling, handoff, implement, implement-spec, improve-codebase-architecture, pr, prototype, research, retro, setup-matt-pocock-skills, tdd, teach, to-questionnaire, to-spec, to-tickets, triage, wait-what, wayfinder, wizard, writing-for-agents |
| https://github.com/DietrichGebert/ponytail (`skills/`) | `9b58c1ffb790c075ca32e70a89cf1d80588f4abf` | MIT | ponytail, ponytail-audit, ponytail-debt, ponytail-gain, ponytail-help, ponytail-review |

Not copied: mattpocock `misc/`, `in-progress/`, `deprecated/` and repo tooling; ponytail hooks, plugin manifests, benchmarks, assets.

To update: re-clone at a newer commit, replace the folders above, bump the commit here, and re-apply the local edits above.

## mattpocock/skills license

```
MIT License

Copyright (c) 2026 Matt Pocock

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## ponytail license

```
MIT License

Copyright (c) 2026 DietrichGebert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
