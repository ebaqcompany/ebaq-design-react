# Repository workflow

- Work from `/Users/ebaq/Documents/github-repos/ebaq-design-react` on the `main` branch. Treat this worktree and `main` as the source of truth for changes intended for GitHub.
- Before editing, inspect `git status`, the current branch, and `git worktree list`. Do not leave requested changes only in a detached or auxiliary worktree.
- Before starting work, reconcile local `main` with `origin/main` when they have diverged. Preserve both sides deliberately and resolve conflicts rather than overwriting changes.
- After completing a requested change, run the relevant verification and leave it local by default. Only create a commit when the user explicitly says `commit`, and only push when the user explicitly says `push`.
- Before handing work back, report the local Git state accurately. A dirty worktree is acceptable when changes are intentionally awaiting review; never commit or push implicitly, and never report a local change as present on GitHub unless an explicit `push` request was completed.
