# Repository workflow

- Work from `/Users/ebaq/Documents/github-repos/ebaq-design-react` on the `main` branch. Treat this worktree and `main` as the source of truth for changes intended for GitHub.
- Before editing, inspect `git status`, the current branch, and `git worktree list`. Do not leave requested changes only in a detached or auxiliary worktree.
- Before starting work, reconcile local `main` with `origin/main` when they have diverged. Preserve both sides deliberately and resolve conflicts rather than overwriting changes.
- After completing a requested change, run the relevant verification, commit it on `main`, and push `main` to `origin` when the user requests a commit or deployment handoff.
- Before handing work back, verify `git status --short` is empty and confirm `HEAD` matches `origin/main`. Never report completion while requested changes remain uncommitted or unpushed.
