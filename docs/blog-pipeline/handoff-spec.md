# Blog pipeline handoff spec

Short brief that travels with each post. One YAML front-matter block at the top of a single markdown file per post, living at:

`docs/blog-pipeline/briefs/<slug>.md`

Agents append their section; they never delete upstream fields. Status moves forward only.

## Pipeline

Researcher → Writer → Figma Designer → Flora AI → (CEO / Founder review)

## Shared brief (every agent reads this)

```yaml
id: string              # stable, e.g. 2026-09-history-of-branding
slug: string            # URL slug, kebab-case
title: string
status: research | draft | graphics | images | review | published
owner: researcher | writer | figma | flora | ceo
priority: low | normal | high
created: YYYY-MM-DD
updated: YYYY-MM-DD
target_publish: YYYY-MM-DD | null
audience: string        # who this is for
angle: string           # one-sentence thesis
keywords: [string]      # primary first
cta: string             # desired reader action
repo:
  content_json: public/content/blog/<slug>.json
  images_dir: public/images/blog/<slug>/
  draft_md: docs/drafts/<slug>.md
figma:
  file_url: string | null
  blog_template_page: string | null   # e.g. BLOG TEMPLATE node link
github:
  branch: string | null
  pr_url: string | null
```

## What each agent receives and produces

### 1. Researcher → Writer

**Produces (append under `## Research`)**

```yaml
research:
  topic_rationale: string
  outline: [string]           # H2/H3 working outline
  sources:                    # must be real URLs
    - title: string
      url: string
      note: string
  facts_to_hit: [string]      # claims the draft must cover
  avoid: [string]             # claims/angles to skip
  image_needs:                # rough shot list for later stages
    - purpose: cover | inline
      description: string
      ref_hint: string        # search terms or existing asset path
```

Writer must not start until `status: draft` and `owner: writer`.

### 2. Writer → Figma Designer

**Produces (append under `## Draft`)**

```yaml
draft:
  md_path: docs/drafts/<slug>.md
  word_count: number
  sections:
    - heading: string
      summary: string
      graphic_intent: none | diagram | sticky | chart | photo | quote
  cover_concept: string       # one paragraph for cover art direction
  pull_quotes: [string]
  github:
    branch: string
    commit: string | null
    pr_url: string | null
```

Writer writes the MD locally, updates content JSON as needed, pushes/PR per AGENTS.md rules (commit/push only when Founder says so unless standing orders say otherwise). Sets `status: graphics`, `owner: figma`.

### 3. Figma Designer → Flora AI

**Produces (append under `## Graphics`)**

```yaml
graphics:
  template_page_url: string   # BLOG TEMPLATE or post-specific page
  frames:
    - name: string
      node_id: string
      purpose: cover | inline
      section_heading: string | null
      export_hint: png | svg
      notes: string           # copy-as-is from templates; no redesign unless brief says so
  brand_lock:
    logo_path: string         # e.g. shared eba logo path
    do_not_recolor: true
    do_not_resize_logo: true
```

Sets `status: images`, `owner: flora`.

### 4. Flora AI → CEO / Founder

**Produces (append under `## Images`)**

```yaml
images:
  cover:
    path: public/images/blog/<slug>/<file>
    prompt: string
    refs_used: [string]
    model: string
  inline:
    - path: string
      section_heading: string
      prompt: string
  rejected: [string]          # paths or prompts not used, one-line why
```

Sets `status: review`, `owner: ceo`. CEO opens local preview and reports to Founder.

## Handoff rules

1. One brief file per post. Update in place.
2. Never invent sources, metrics, or URLs.
3. Downstream agents read the whole brief before working.
4. If blocked, set `owner: ceo` and add a `## Blockers` note — do not ping the Founder with trivia; CEO decides.
5. Cover and inline art must match brand lock from Figma handoff (logo treatment, colors).
