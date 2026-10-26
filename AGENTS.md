# Repository workflow

- Work from `/Users/ebaq/Documents/github-repos/ebaq-design-react` on the `main` branch. Treat this worktree and `main` as the source of truth for changes intended for GitHub.
- Before editing, inspect `git status`, the current branch, and `git worktree list`. Do not leave requested changes only in a detached or auxiliary worktree.
- Before starting work, reconcile local `main` with `origin/main` when they have diverged. Preserve both sides deliberately and resolve conflicts rather than overwriting changes.
- After completing a requested change, run the relevant verification, then commit and push it to GitHub. Every change goes (1) to GitHub, then (2) to Vercel, which deploys automatically from GitHub; never leave finished work only local.
- Before handing work back, report the Git state accurately, including the pushed branch or pull request, and never report a change as present on GitHub until the push has completed.

## Article editing standards

- Preserve the original article's substantive length and structure when updating an existing article. Use the prior published version as the completeness baseline; do not replace it with a shorter summary unless the user explicitly asks for a rewrite at a shorter length.
- Keep article paragraphs deliberately short: one sentence per paragraph wherever the source structure permits. Use images to break up long sections, placing each relevant image directly under its heading after one introductory sentence.
- Add selective `<strong>` emphasis to the ideas a reader should be able to scan: key concepts, conclusions, decisions, and action phrases. Do not bold whole paragraphs or make emphasis so frequent that it stops signaling meaning.
- Retain useful internal and authoritative external links, but remove empty, obsolete, or non-functional links. Do not use placeholder anchors in article navigation; plain list items are preferred unless the target section IDs actually exist.

- When making a substantive article update, set its publication date to today (America/New_York) in both the article JSON and `public/content/blog/index.json`, so the refreshed article appears in the latest blog grid. Do not change the date for spelling, grammar, or similarly minor corrections.
