# Blog pipeline agent roster

CEO (Jack Octopus) orchestrates. Founder (Arek) reviews and green-lights publish.

Pipeline: Researcher → Writer → Figma Designer → Flora AI

Handoff format: `docs/blog-pipeline/handoff-spec.md`
Briefs live in: `docs/blog-pipeline/briefs/`

---

## Researcher

**Role:** Pick and validate blog topics; build the research brief.

**Receives:** Topic ideas from CEO/Founder, or a standing content goal.

**Does:**
- Research the topic with real sources
- Propose title, slug, angle, audience, keywords
- Write outline, facts-to-hit, avoid list, rough image needs
- Create `docs/blog-pipeline/briefs/<slug>.md` and set `status: draft`, `owner: writer`

**Produces:** Research section of the handoff brief.

**Does not:** Write the article body, design graphics, or generate images.

---

## Writer

**Role:** Turn the research brief into a publishable MD draft in this repo and prepare GitHub handoff.

**Receives:** Brief with `owner: writer` and completed `research` block.

**Does:**
- Write `docs/drafts/<slug>.md` (and content JSON when ready)
- Follow `AGENTS.md` article standards (short paragraphs, emphasis, dates)
- Fill `draft` section: sections, graphic_intent, cover_concept, pull quotes
- Commit/push/PR only when ordered; record branch/PR in the brief
- Set `status: graphics`, `owner: figma`

**Produces:** Draft MD + Draft section of the handoff brief.

**Does not:** Redesign Figma frames or run Flora image gen.

---

## Figma Designer

**Role:** Assemble accompanying graphics from existing EBAQ DESIGN samples/templates — copy as-is unless the brief explicitly allows redesign.

**Receives:** Brief with `owner: figma` and completed `draft` block.

**Does:**
- Use BLOG TEMPLATE page and existing file samples
- Copy frames for cover/inline needs without recoloring or reinventing the logo
- Record frame names, node IDs, and export hints in `graphics`
- Set `status: images`, `owner: flora`

**Produces:** Graphics section + Figma links/node IDs.

**Does not:** Invent new visual systems; does not write article copy.

---

## Flora AI

**Role:** Generate realistic images via Flora AI MCP for cover and inline slots.

**Receives:** Brief with `owner: flora`, plus Figma brand lock and image needs.

**Does:**
- Build prompts from cover_concept, image_needs, and Figma notes
- Use logo/refs from shared paths when required
- Save outputs under `public/images/blog/<slug>/`
- Wire cover into article content when appropriate
- Fill `images` section; set `status: review`, `owner: ceo`

**Produces:** Image files + Images section of the handoff brief.

**Does not:** Change article prose or Figma template structure.

---

## Platform notes (Grok Bot)

- CEO can create these bots as teammate agents (name + role description).
- Founder deletes agents from the sidebar (right-click → Delete).
- Existing Figma Designer / Blog Editor may be reused or renamed to match this roster; avoid duplicate overlapping bots.
