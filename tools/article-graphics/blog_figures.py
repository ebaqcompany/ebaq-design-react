# Adds extra images to recent text-led articles: after the first paragraph of the intro,
# or after the first paragraph under a given <h2 id>. Idempotent: skips images already present.
# Usage from the repo root: python3 tools/article-graphics/blog_figures.py [slug ...]
import json, sys
from PIL import Image

PLAN = {
 "brand-identity-cost": [
  ("intro", "/images/blog/brand-identity-cost/designer-presenting-brand-identity.webp", "Brand designer presenting a new brand identity to two founders, with logo sketches, colour swatches and a guidelines booklet on the table"),
  ("what-counts-as-a-complete-brand-identity", "/images/blog/branding-package/styleguide.webp", "Printed brand guidelines for Airport Executive showing the logo, colours and typography"),
  ("freelancer-cost", "/images/blog/how-long-does-branding-take/three-timelines.webp", "Three paths, three timelines: DIY and AI tools, a senior designer in one week, or an agency in three to nine months"),
  ("brand-sprint-cost", "/images/blog/branding-agencies-one-week/one-week-timeline.webp", "One-week brand sprint timeline showing strategy, discovery, concepts, direction, refinement and handover day by day"),
  ("agency-cost", "/images/blog/brand-sprint-vs-agency/who-you-work-with.webp", "Diagram comparing who you work with: a senior designer in a brand sprint, or an account manager, creative director and junior designers at an agency"),
  ("what-changes-the-timeline", "/images/blog/how-long-does-branding-take/what-slows-branding.webp", "What slows branding down: feedback, approvers, strategy and naming"),
 ],
 "design-subscription-services": [
  ("intro", "/images/blog/design-subscription-services/freelance-designer-request-queue.webp", "Freelance designer working at a desk with a design canvas on screen and a queue of sticky notes on the wall"),
  ("intro3", "/images/blog/design-subscription-services/design-studio-review-wall.webp", "Three designers in a small studio reviewing printed layouts and logo explorations pinned to a wall"),
  ("subscription-vs-brand-sprint", "/images/blog/how-long-does-branding-take/sprint-flow.webp", "How a brand sprint flows: book a call, kick off the week, review and refine, get your brand"),
  ("can-a-design-subscription-do-branding", "/images/blog/branding-package/styleguide.webp", "Printed brand guidelines for Airport Executive showing the logo, colours and typography"),
 ],
 "best-senior-freelance-brand-designers": [
  ("how-i-picked-these-designers", "/images/blog/best-senior-freelance-brand-designers/designer-sketching-logo-concepts.webp", "Brand designer sketching logo concepts in a sketchbook next to a colour swatch fan and a laptop"),
  ("what-to-check-before-you-hire", "/images/blog/logo-design-cost/deliverables.webp", "What's in the handoff: scalable SVG artwork, transparent PNG files and a usage guide with variations"),
  ("one-senior-freelancer-or-a-small-studio", "/images/blog/brand-sprint-vs-agency/who-you-work-with.webp", "Diagram comparing who you work with: a senior designer directly, or an account manager, creative director and junior designers at an agency"),
 ],
}

def fig(src, alt):
    w, h = Image.open("public" + src).size
    return f'<figure><img src="{src}" alt="{alt}" width="{w}" height="{h}" loading="lazy" decoding="async" /></figure>'

def nth_p_end(body, start, n=1):
    i = start
    for _ in range(n):
        i = body.index("</p>", i) + 4
    return i

def apply(slug):
    p = f"public/content/blog/{slug}.json"
    raw = open(p).read(); d = json.loads(raw); b = d["body"]; added = 0
    for where, src, alt in PLAN[slug]:
        if src in b: continue
        if where == "intro": at = nth_p_end(b, 0, 1)
        elif where == "intro3": at = nth_p_end(b, 0, 3)
        else:
            h = b.index(f'<h2 id="{where}">'); at = nth_p_end(b, h, 1)
        b = b[:at] + fig(src, alt) + b[at:]; added += 1
    d["body"] = b
    out = json.dumps(d, ensure_ascii=False, indent=2 if raw.lstrip().startswith("{\n") else None)
    open(p, "w").write(out + ("\n" if raw.endswith("\n") else ""))
    return added

if __name__ == "__main__":
    for s in (sys.argv[1:] or PLAN):
        print(s, apply(s))
