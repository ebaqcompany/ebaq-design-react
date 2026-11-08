# Repository workflow

- Work from `/Users/ebaq/Documents/github-repos/ebaq-design-react` on the `main` branch. Treat this worktree and `main` as the source of truth for changes intended for GitHub.
- Before editing, inspect `git status`, the current branch, and `git worktree list`. Do not leave requested changes only in a detached or auxiliary worktree.
- Before starting work, reconcile local `main` with `origin/main` when they have diverged. Preserve both sides deliberately and resolve conflicts rather than overwriting changes.
- After completing a requested change, run the relevant verification and leave it local by default. Only create a commit when the user explicitly says `commit`, and only push when the user explicitly says `push`.
- Before handing work back, report the local Git state accurately. A dirty worktree is acceptable when changes are intentionally awaiting review; never commit or push implicitly, and never report a local change as present on GitHub unless an explicit `push` request was completed.

## Cloud sessions

- In a cloud session (Claude Code on the web, not the local worktree above), never skip GitHub as the middle step: after verifying a change, commit and push it to the session's branch so Vercel builds a preview from GitHub. Never leave finished cloud work only in the container.
- Push to `main` only when the user approves it.

## UI components and design

- Before designing or implementing UI, use the Relume MCP at `https://relume-library-mcp.relume.io/mcp` to find appropriate React components. Start with properly designed library components rather than inventing layouts.
- Adapt selected components to the site's existing typography, spacing, colors, buttons, and responsive conventions. Preserve user-selected images and their original aspect ratios when requested.
- If the Relume MCP is inaccessible, report the specific blocker and do not claim library use or substitute an invented layout without the user's direction.

- Reuse the existing site design system and Relume utility classes; do not invent one-off button, typography, color, or spacing styles when an established pattern exists.
- Use the shared button classes for their surface: black buttons turn blue on white, black buttons turn white on blue, and inverted buttons remain readable on black. Keep links styled as buttons free of text underlines.
- Verify foreground/background contrast after every light/dark adaptation, including secondary paragraphs, inactive tabs, and hover/focus states. Text on black sections must remain visibly light; white cards retain dark text.
- Keep segmented pricing tabs separate from global call-to-action button styling.

- Rounded cards with subtle borders are the default for interactive UI, including pricing, deliverables, and FAQs. Keep the vector selection motif archived in `LegacyVectorCard` for a future placement decision; do not reintroduce it without direction.
- FAQ layouts share `FaqAccordion` for arrow icons, click/keyboard behavior (no hover expansion), and retained answer HTML. Keep layout differences in the surrounding section, not separate accordion behavior.

- Surface pairing: shared homepage pricing uses `bg-surface-muted`; homepage FAQs retain `bg-brand-light` with primary-blue card borders at 30% opacity. Neutral surfaces use the existing black-at-20% card border.

- FAQ question typography uses normal letter spacing at all sizes. Do not apply negative headline tracking to accordion questions.

- Never add `!important`, Tailwind `!` modifiers, inline style overrides, or new custom classes to bypass the design system. Inspect existing classes first; reuse an appropriate class or deliberately update its owning shared definition. Do not patch individual instances with competing font-size, tracking, weight, or line-height utilities.
- Homepage and service FAQ questions must both use `heading-h7`. Set its letter spacing in the global definition, not with local tracking utilities. Check responsive layouts when changing shared typography.

- Booking buttons say only “Book a call,” vertically centered. Do not show numbered spots or availability counters in buttons, badges, or FAQ copy.

## Article editing standards

- Preserve the original article's substantive length and structure when updating an existing article. Use the prior published version as the completeness baseline; do not replace it with a shorter summary unless the user explicitly asks for a rewrite at a shorter length.
- Keep article paragraphs deliberately short: one sentence per paragraph wherever the source structure permits. Use images to break up long sections, placing each relevant image directly under its heading after one introductory sentence.
- Add selective `<strong>` emphasis to the ideas a reader should be able to scan: key concepts, conclusions, decisions, and action phrases. Do not bold whole paragraphs or make emphasis so frequent that it stops signaling meaning.
- Retain useful internal and authoritative external links, but remove empty, obsolete, or non-functional links. Do not use placeholder anchors in article navigation; plain list items are preferred unless the target section IDs actually exist.

- When making a substantive article update, set its publication date to today (America/New_York) in both the article JSON and `public/content/blog/index.json`, so the refreshed article appears in the latest blog grid. Do not change the date for spelling, grammar, or similarly minor corrections.
