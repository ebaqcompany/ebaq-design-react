# Upgrades /blog/branding-package into the fast-turnaround startup packages page (Nov 23, 2026).
# Keeps all existing content and adds a fast-turnaround section, an intro pointer, TOC entry and two FAQs.
# Idempotent: skips if the section already exists. Run from the repo root.
import json
P = 'public/content/blog/branding-package.json'
raw = open(P).read(); d = json.loads(raw); b = d['body']
SEC = 'fast-turnaround-branding-packages'
def ext(u, t): return f'<a href="{u}" target="_blank" rel="noopener noreferrer">{t}</a>'
def fig(src, alt, w=1920, h=1080): return f'<figure><img src="{src}" alt="{alt}" width="{w}" height="{h}" loading="lazy" decoding="async" /></figure>'
ROWS = [
 (ext('https://contra.com/s/UrZ3bl3B-branding-basics', 'Caro Visser, Branding Basics'), '$300', '2 weeks', 'Logo and variations, brand marks, colours, a brand sheet'),
 (ext('https://contra.com/s/LelE6LWF-bespoke-brand-architecture', 'Caro Visser, Bespoke Brand Architecture'), '$750', '3 weeks', 'Adds a strategy session and full guidelines'),
 ('<a href="/blog/branding-agencies-one-week">Aviso Studios</a>', '$1,700', '5 days', 'Brand in a Week'),
 ('<a href="/blog/branding-agencies-one-week">Ellie Brown Branding</a>', '$1,950', '1 week', 'Logos, colours and fonts in seven days'),
 ('<a href="/blog/branding-agencies-one-week">Lovendear Design</a>', '$2,900', '5 days', 'Brand Nurture Week, one part of the identity each day'),
 ('<a href="/blog/branding-agencies-one-week">Studio Madz</a>', '$2,950', '5 days', 'Design Sprint for a brand identity or a website'),
 ('<a href="/blog/branding-agencies-one-week">Brand Purist</a>', 'From $2,950', '10 days', 'Modular sprint: strategy, naming, verbal and visual identity'),
 ('<a href="/brand-sprint">Ebaq Design Brand Sprint</a> (mine)', '$3,000', '1 week', 'Logo concepts, logo animation, colours, typography, guidelines, launch assets'),
 ('<a href="/blog/branding-agencies-one-week">A+M Studio</a>', '£3,500', '1 week', 'One-week branding sprint for startups'),
 ('<a href="/blog/branding-agencies-one-week">Studio Seaside</a>', '$5,000', '5 working days', 'Logo suite, palette, typography and a style guide'),
 ('<a href="/blog/branding-agencies-one-week">Upspire Labs</a>', '$10,000', '10 working days', 'Workshop, three or four logo concepts, delivery on day ten'),
 ('<a href="/blog/branding-agencies-one-week">Foundation</a>', '£10,000', '10 days', 'Fixed-price ten-day brand sprint'),
 ('<a href="/blog/branding-agencies-one-week">idgram</a>', '€24,500', '2 to 3 weeks', 'A complete identity system'),
 (ext('https://www.primary.studio/pricing', 'Primary'), '$60,000', '2 weeks', 'A full brand from an agency team, flat fee'),
]
table = '<div style="overflow-x:auto"><table><thead><tr><th>Package</th><th>Price</th><th>Time</th><th>What you get</th></tr></thead><tbody>' + ''.join(
    f'<tr><td>{a}</td><td><strong>{p}</strong></td><td>{t}</td><td>{w}</td></tr>' for a, p, t, w in ROWS) + '</tbody></table></div>'
section = ''.join([
 f'<h2 id="{SEC}">Fast-turnaround branding packages for startups</h2>',
 '<p>A fast-turnaround branding package delivers a <strong>complete identity in one to three weeks</strong>, instead of the usual one to three months.</p>',
 fig('/images/blog/branding-agencies-one-week/one-week-timeline.webp', 'One-week brand sprint timeline showing strategy, discovery, concepts, direction, refinement and handover day by day'),
 '<p>Here are 14 published packages that deliver in three weeks or less, sorted by price.</p>',
 '<p>Studio prices come from my roundup of <a href="/blog/branding-agencies-one-week">branding agencies that deliver in a week</a>, and I re-checked Primary and Caro Visser on November 23, 2026.</p>',
 table,
 '<p><strong>Under $2,000:</strong> freelancers and small studios like Caro Visser, Aviso Studios and Ellie Brown Branding deliver a logo, colours, fonts and a short guide, which suits solo founders and small businesses.</p>',
 '<p><strong>$2,900 to $5,000:</strong> the one-week sprint sweet spot, with a complete identity and guidelines in five working days from Lovendear, Studio Madz, Brand Purist, A+M Studio, Studio Seaside and my own Brand Sprint.</p>',
 '<p><strong>$10,000 to $25,000:</strong> ten-day to three-week sprints for funded startups from Upspire Labs, Foundation and idgram, which add workshops, strategy and more concepts.</p>',
 '<p><strong>$60,000:</strong> Primary\'s two-week sprint, an agency team working on a sprint schedule.</p>',
 fig('/images/blog/how-long-does-branding-take/sprint-calendar.webp', 'Brand sprint calendar from Monday discovery to Friday handover, with launch and celebration at the weekend'),
 '<p><strong>What makes a fast package possible:</strong> a fixed scope, one decision-maker, a short brief prepared upfront and feedback within a day.</p>',
 '<p><strong>What a fast package usually leaves out:</strong> naming, deep research, many stakeholder rounds and a full website, which each add weeks.</p>',
 '<p>For more detail on timing and price, read <a href="/blog/how-long-does-branding-take">how long branding takes</a> and <a href="/blog/brand-identity-cost">how much a complete brand identity costs</a>.</p>',
])
if f'id="{SEC}"' not in b:
    anchor = '<h2 id="how-much-does-a-branding-package-cost">'
    assert anchor in b
    b = b.replace(anchor, section + anchor, 1)
    toc = '<li><a href="#how-much-does-a-branding-package-cost">'
    b = b.replace(toc, f'<li><a href="#{SEC}">Fast-turnaround packages</a></li>' + toc, 1)
    intro_end = b.index('</p>', b.index('My current identity package is')) + 4
    b = b[:intro_end] + f'<p>If you need it fast, the <a href="#{SEC}">comparison below</a> lists 14 branding packages that deliver in one to three weeks, with prices.</p>' + b[intro_end:]
    faq_anchor = '<h2 id="frequently-asked-questions">Frequently asked questions</h2>'
    extra = ('<h3>How fast can a startup get a brand identity?</h3><p>A focused brand identity can be delivered in one week when the scope is fixed and one person makes decisions.</p><p>The packages above take five days to three weeks; naming, research and a website add more time.</p>'
             '<h3>Is a one-week branding package enough for a startup?</h3><p>For most early-stage startups, yes: a logo system, colours, typography and guidelines are what you need to launch.</p><p>Add strategy, messaging or a website later, when you know more about your customers.</p>')
    b = b.replace(faq_anchor, faq_anchor + extra, 1)
d['body'] = b
d['title'] = 'Fast Branding Packages for Startups'
d['seo']['title'] = d['title']
desc = 'Fast-turnaround branding packages for startups: 14 packages delivered in one to three weeks, from $300 to $60,000, plus what a startup branding package includes.'
d['description'] = desc; d['seo']['description'] = desc
d['date'] = 'Nov 23, 2026'; d['readTime'] = '13 min read'
d['image']['alt'] = 'Three blue branding package boxes for logo, identity and website'
out = json.dumps(d, ensure_ascii=False, indent=2 if raw.lstrip().startswith('{\n') else None)
open(P, 'w').write(out + ('\n' if raw.endswith('\n') else ''))
idx = json.load(open('public/content/blog/index.json'))
for x in idx:
    if x['slug'] == 'branding-package':
        x.update({'title': d['title'], 'description': desc, 'date': d['date'], 'readTime': d['readTime']})
        if isinstance(x.get('image'), dict): x['image']['alt'] = d['image']['alt']
json.dump(idx, open('public/content/blog/index.json', 'w'), ensure_ascii=False, indent=2)
print('ok', len(b))
