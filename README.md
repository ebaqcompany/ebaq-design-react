# Ebaq Design website

React, TypeScript and Vite. Production is hosted on Vercel from GitHub.

## MacBook and ChatGPT cloud development

GitHub is the handoff between machines. Only committed, pushed work is available
on the other machine. Your MacBook can be closed after its push completes.

1. In ChatGPT's cloud environment settings, connect GitHub and select
   `ebaqcompany/ebaq-design-react`. Grant repository write access to save cloud work.
2. Use Node.js 22 (`nvm use` where nvm is installed) and run
   `bash scripts/cloud/setup.sh`. This installs the exact lockfile dependencies.
3. Start the site with `npm run dev -- --host 0.0.0.0` and open the environment's
   forwarded port 5173. `/services` needs no credentials or external APIs locally.
4. Before working on either machine, inspect `git status`, fetch origin, and
   pull the intended branch with `git pull --ff-only`. Preserve any uncommitted
   work before switching or pulling. Use a separate cloud branch for cloud edits.
5. Run `npm run build` and relevant checks. Commit and push your branch to GitHub
   to transfer work. A local cloud checkout alone is not a backup or handoff.
6. Review the GitHub branch and Vercel preview, then approve merging to `main`.
   When returning to your MacBook, fetch and check out that branch, or pull
   `main` after merge. Do not reset away work made on either machine.

A public GitHub repository provides read access only. ChatGPT still needs an
authenticated GitHub connection with write access to push. Repository setup files
cannot grant that permission. Vercel preview builds also depend on the connected
Vercel project's Git integration and branch deployment settings.

## Commands

- `npm run dev` — local Vite server
- `npm run build` — TypeScript, browser/server builds and route shells
- `npm run lint` — repository ESLint checks
- `node --test tests/*.test.mjs` — existing conversion tests

See [AGENTS.md](AGENTS.md) for repository workflow and design conventions.
See [service animation exports](scripts/service-animations/README.md) for the
reproducible baked animation pipeline.
