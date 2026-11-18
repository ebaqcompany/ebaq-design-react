#!/usr/bin/env python3
"""Wire hob-XX assets into history-of-branding.json. Cover untouched."""
import json, re, glob
from pathlib import Path

ROOT = Path('/Users/ebaq/Documents/github-repos/ebaq-design-react')
IMG = ROOT / 'public/images/blog/history-of-branding'
ARTICLE = ROOT / 'public/content/blog/history-of-branding.json'
MAP = ROOT / 'docs/blog-pipeline/briefs/hob-placement-map.json'

map_ = json.loads(MAP.read_text())
article = json.loads(ARTICLE.read_text())
body = article['body']
assert 'cover-cattle-logo-only' in article['image']['src'] or True  # cover field separate

figure = lambda src, alt: (
  f'<figure class="w-richtext-figure-type-image w-richtext-align-fullwidth" '
  f'style="max-width:1200px" data-rt-type="image" data-rt-align="fullwidth" data-rt-max-width="1200px">'
  f'<div><img loading="lazy" alt="{alt}" src="{src}" width="auto" height="auto"></div></figure>'
)

placed = []
missing = []
for hob, meta in sorted(map_.items()):
    files = sorted(IMG.glob(f'{hob}-*.webp')) + sorted(IMG.glob(f'{hob}.webp'))
    if not files:
        missing.append(hob)
        continue
    f = files[0]
    rel = f'/images/blog/history-of-branding/{f.name}'
    alt = meta['alt']
    if meta.get('replace'):
        old = meta['replace']
        # replace src in any img pointing at old filename
        new_body, n = re.subn(
            rf'(src=")[^"]*{re.escape(old)}(")',
            rf'\1{rel}\2', body, count=1)
        if n:
            # also refresh alt if present on same img roughly
            body = new_body
            body = re.sub(
                rf'(src="{re.escape(rel)}"[^>]*alt=")[^"]*(")',
                rf'\1{alt}\2', body, count=1)
            # if alt before src
            body = re.sub(
                rf'(alt=")[^"]*("[^>]*src="{re.escape(rel)}")',
                rf'\1{alt}\2', body, count=1)
            placed.append(f'{hob} replaced {old} -> {f.name}')
        else:
            # old gone; insert after section heading
            heading = re.escape(meta['section'])
            m = re.search(rf'(<h[23][^>]*>\s*(?:<[^>]+>)*{heading}(?:<[^>]+>)*\s*</h[23]>)', body, re.I)
            if m:
                insert_at = m.end()
                body = body[:insert_at] + '\n' + figure(rel, alt) + body[insert_at:]
                placed.append(f'{hob} inserted after heading (old missing)')
            else:
                missing.append(hob+':no-heading')
    else:
        # insert once after heading if not already present
        if rel in body or f'/{f.name}' in body:
            placed.append(f'{hob} already in article')
            continue
        heading = re.escape(meta['section'])
        m = re.search(rf'(<h[23][^>]*>\s*(?:<[^>]+>)*{heading}(?:<[^>]+>)*\s*</h[23]>)', body, re.I)
        if not m:
            # try without year parenthetical
            short = re.escape(meta['section'].split('(')[0].strip())
            m = re.search(rf'(<h[23][^>]*>[^<]*{short}[^<]*</h[23]>)', body, re.I)
        if m:
            insert_at = m.end()
            body = body[:insert_at] + '\n' + figure(rel, alt) + body[insert_at:]
            placed.append(f'{hob} inserted -> {f.name}')
        else:
            missing.append(hob+':no-heading')

# when hob-24 placed, drop branding-lessons.webp if still present
if any(x.startswith('hob-24') for x in placed):
    body2, n = re.subn(r'<figure[^>]*>\s*<div>\s*<img[^>]+branding-lessons\.webp[^>]*>\s*</div>\s*</figure>\s*', '', body, count=1)
    if n:
        body = body2
        placed.append('removed branding-lessons.webp duplicate')

article['body'] = body
# NEVER touch article['image'] cover
ARTICLE.write_text(json.dumps(article, ensure_ascii=False, indent=2)+'\n')
print('PLACED')
for p in placed: print(' ', p)
print('MISSING')
for m in missing: print(' ', m)
print('cover still', article['image']['src'])
