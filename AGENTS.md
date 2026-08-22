# Repository workflow

- Work from `/Users/ebaq/Documents/github-repos/ebaq-design-react` on the `main` branch. Treat this worktree and `main` as the source of truth for changes intended for GitHub.
- Before editing, inspect `git status`, the current branch, and `git worktree list`. Do not leave requested changes only in a detached or auxiliary worktree.
- Before starting work, reconcile local `main` with `origin/main` when they have diverged. Preserve both sides deliberately and resolve conflicts rather than overwriting changes.
- After completing a requested change, run the relevant verification and leave it local by default. Only create a commit when the user explicitly says `commit`, and only push when the user explicitly says `push`.
- Before handing work back, report the local Git state accurately. A dirty worktree is acceptable when changes are intentionally awaiting review; never commit or push implicitly, and never report a local change as present on GitHub unless an explicit `push` request was completed.

## Article editing standards

- Preserve the original article's substantive length and structure when updating an existing article. Use the prior published version as the completeness baseline; do not replace it with a shorter summary unless the user explicitly asks for a rewrite at a shorter length.
- Keep article paragraphs deliberately short: one sentence per paragraph wherever the source structure permits. Use images to break up long sections, placing each relevant image directly under its heading after one introductory sentence.
- Add selective `<strong>` emphasis to the ideas a reader should be able to scan: key concepts, conclusions, decisions, and action phrases. Do not bold whole paragraphs or make emphasis so frequent that it stops signaling meaning.
- Retain useful internal and authoritative external links, but remove empty, obsolete, or non-functional links. Do not use placeholder anchors in article navigation; plain list items are preferred unless the target section IDs actually exist.
