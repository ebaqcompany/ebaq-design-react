# Builds public/content/blog/brand-identity-cost.json and its index entry. Run from the repo root.
import json, os
SLUG = 'brand-identity-cost'; I = f'/images/blog/{SLUG}'
D = 'Nov 23, 2026'; CHK = 'November 23, 2026'
TITLE = 'How Much a Complete Brand Identity Costs'
DESC = 'A complete brand identity costs about $2,500 to $10,000 with a senior freelancer, $10,000 to $25,000 with a studio and $60,000+ with an agency. 11 published packages with prices and timelines.'
def ext(u, t): return f'<a href="{u}" target="_blank" rel="noopener noreferrer">{t}</a>'
P = lambda s: f'<p>{s}</p>'
# (provider, type, package, price, weeks label, url, includes)
ROWS = [
 ("Gabriela Yanez", "Freelancer", "Brand identity design", "$2,560", "6 weeks", "https://contra.com/s/BWFPoYrX-brand-identity-design", "Logo versions, palette, graphic elements, pictograms, photo style, guidelines"),
 ("Dalibor Pajic", "Freelancer", "Visual Identity for Startups", "$2,900", "4 weeks", "https://contra.com/s/gOoWOrmM-visual-identity-for-startups", "Logo and variations, core typography, lightweight guidelines"),
 ("Ebaq Design (me)", "Solo senior designer", "Brand Sprint", "$3,000", "1 week", "/brand-sprint", "Logo concepts, logo animation, colours, typography, guidelines, cards, launch assets"),
 ("Dalibor Pajic", "Freelancer", "Brand Identity System", "$4,150", "6 weeks", "https://contra.com/s/qUvW3YOQ-brand-identity-system-design", "Logo system, typography hierarchy, colour palette and usage rules"),
 ("Humberto Carrero", "Freelancer", "Brand design", "$5,000", "4 weeks", "https://contra.com/s/72bFOk2q-brand-design", "Brand guidelines and a library of ready-to-use assets"),
 ("Sophie O'Connor", "Freelancer", "Visual Identity Package", "$8,000", "4 weeks", "https://contra.com/s/UPeY277R-visual-identity-package", "Logo, wordmark, icons, fonts and a brand style guide"),
 ("Humberto Carrero", "Freelancer", "Brand + Packaging", "$8,000", "6 weeks", "https://contra.com/s/FAL6lg6N-brand-packaging", "Brand design plus packaging design"),
 ("Sophie O'Connor", "Freelancer", "Brand Identity Package", "$10,000", "6 weeks", "https://contra.com/s/26rBFZLv-brand-identity-package", "Full identity toolkit and brand guidelines"),
 ("Glyn", "Studio", "Launchpad", "$10,000", "5 weeks", "https://www.glyn.studio/", "Positioning, identity, marketing visuals, landing page, 3 to 6 months of advisory"),
 ("Glyn", "Studio", "Anchor", "$25,000", "3 to 4 months", "https://www.glyn.studio/", "Strategy, full identity, website and launch video, up to 12 months of advisory"),
 ("Primary", "Agency", "Brand Sprint", "$60,000", "2 weeks", "https://www.primary.studio/pricing", "A full brand in a two-week sprint for a flat fee"),
]
def link(u, t): return f'<a href="{u}">{t}</a>' if u.startswith('/') else ext(u, t)
table = '<div style="overflow-x:auto"><table><thead><tr><th>Provider</th><th>Package</th><th>Price</th><th>Time</th><th>What you get</th></tr></thead><tbody>' + ''.join(
    f'<tr><td>{r[0]}<br><small>{r[1]}</small></td><td>{link(r[5], r[2])}</td><td><strong>{r[3]}</strong></td><td>{r[4]}</td><td>{r[6]}</td></tr>' for r in ROWS) + '</tbody></table></div>'
chart = f'<figure><img src="{I}/brand-identity-cost-vs-delivery-time.webp" alt="Chart of brand identity price against delivery time for 11 published packages, from $2,560 in 6 weeks to $60,000 in 2 weeks, with the $3,000 one-week Ebaq Brand Sprint highlighted" width="1920" height="1080" loading="lazy" decoding="async" /><figcaption>13 published brand identity packages, prices and timelines checked {CHK}.</figcaption></figure>'
b = []
b.append(P('A complete brand identity costs <strong>about $2,500 to $10,000 with a senior freelancer</strong>, <strong>$10,000 to $25,000 with an independent studio</strong> and <strong>$60,000 or more with an agency</strong>.'))
b.append(P('It usually takes <strong>4 to 6 weeks</strong> with a senior freelancer, <strong>5 weeks to 4 months</strong> with a studio and anywhere from a two-week sprint to many months with an agency.'))
b.append(P('Those ranges come from <strong>11 published packages</strong> that list both a price and a delivery time, which I checked on each provider\'s own page on ' + CHK + '.'))
b.append(P('Disclosure: one of them is my own one-week Brand Sprint, and I list it in the same table as the others.'))
b.append(chart)
b.append('<h2 id="what-counts-as-a-complete-brand-identity">What counts as a complete brand identity?</h2>')
for s in ['A complete brand identity is more than a logo: it is the <strong>system</strong> that makes every touchpoint look like the same company.',
          'At minimum it includes a logo with variations, a colour palette, typography and <strong>brand guidelines</strong> that explain how to use them.',
          'Most packages also add graphic elements such as patterns, icons or illustrations, and mockups that show the brand on real items.',
          'Strategy, naming, copywriting, packaging and a website are extras that change the price and timeline the most.',
          'If you only need a logo, read my guide to <a href="/blog/logo-design-cost">logo design cost</a> instead.']: b.append(P(s))
b.append('<h2 id="cost-and-timeline-compared">Brand identity cost and timeline compared</h2>')
b.append(P('Sorted from lowest to highest price. Every row links to the published package.'))
b.append(table)
b.append('<h2 id="freelancer-cost">How much does a freelancer charge for a brand identity?</h2>')
for s in ['Senior freelance packages in this list range from <strong>$2,560 to $10,000</strong> and take <strong>4 to 6 weeks</strong>.',
          'Beginners on Upwork or Fiverr will quote you a few hundred dollars, but that is not a full identity from someone who knows what they are doing.',
          'At the low end, Gabriela Yanez in Mexico City lists brand identity design at $2,560 in six weeks, with logo versions, a palette, graphic elements and guidelines.',
          'In the middle, Dalibor Pajic in Auckland lists a Visual Identity for Startups at $2,900 in four weeks and a fuller Brand Identity System at $4,150 in six weeks.',
          'At the top, Sophie O\'Connor in London lists a Visual Identity Package at $8,000 in four weeks and a Brand Identity Package at $10,000 in six weeks.',
          'The price rises with <strong>experience and scope</strong>, not with the number of weeks: Sophie has 20 years of experience, and her packages include more of the system.',
          'For more independent designers and their rates, see my list of <a href="/blog/best-senior-freelance-brand-designers">senior freelance brand designers</a>.']: b.append(P(s))
b.append('<h2 id="brand-sprint-cost">How much does a one-week brand sprint cost?</h2>')
for s in ['A brand sprint compresses the whole identity into one or two weeks of focused work.',
          'My <a href="/brand-sprint">Brand Sprint</a> costs <strong>$3,000 and takes one week</strong>, including several logo concepts, a logo animation, colours, typography, guidelines, business cards and launch assets.',
          'Primary, an agency, sells a two-week brand sprint for a flat <strong>$60,000</strong>, and its pricing page compares that with typical agency projects at $80,000 to $300,000 or more.',
          'The two prices show that speed is not what you pay for: the same two weeks can cost $3,000 or $60,000 depending on the team size and overhead behind the work.',
          'For more fast options, see my list of <a href="/blog/branding-agencies-one-week">branding agencies that deliver in one week</a>.']: b.append(P(s))
b.append('<h2 id="studio-cost">How much does a branding studio charge?</h2>')
for s in ['Independent studios usually sit between <strong>$10,000 and $25,000</strong> for a complete identity.',
          'Glyn, a studio for cybersecurity and tech companies, lists Launchpad from $10,000 in about <strong>five weeks</strong> and Anchor from $25,000 in <strong>three to four months</strong>.',
          'The bigger studio packages add positioning, messaging, a website, launch assets and months of advisory after launch.',
          'You pay for a small team, a structured process and support after delivery, not only for the visual identity.']: b.append(P(s))
b.append('<h2 id="agency-cost">How much does a branding agency charge?</h2>')
for s in ['Agencies rarely publish prices, but the ones that do start around <strong>$60,000</strong>.',
          'Primary\'s pricing page puts typical agency branding projects at <strong>$80,000 to $300,000 or more</strong>.',
          'Agency timelines are often <strong>three to nine months</strong>, because research, stakeholder rounds and approvals take longer than the design itself.',
          'For large companies with many decision-makers, that extra time and cost buys alignment as much as design.']: b.append(P(s))
b.append('<h2 id="what-changes-the-price">What makes a brand identity cost more?</h2>')
for s in ['<strong>Strategy and research:</strong> workshops, competitor audits and positioning add days or weeks before any design starts.',
          '<strong>Naming:</strong> a new name with trademark checks is a project of its own.',
          '<strong>The number of concepts and revision rounds:</strong> more directions mean more design time.',
          '<strong>Applications:</strong> packaging, signage, a website or a pitch deck each add their own scope, as Humberto Carrero\'s $8,000 Brand + Packaging shows.',
          '<strong>Stakeholders:</strong> every extra decision-maker adds review time and rounds.',
          '<strong>Seniority:</strong> a designer with 20 years of experience charges more per project, but usually needs fewer rounds.']: b.append(P(s))
b.append('<h2 id="what-changes-the-timeline">What makes a brand identity take longer?</h2>')
for s in ['Most delays come from the client side: slow feedback, missing content and new decision-makers joining late.',
          'A fixed scope, one decision-maker and fast feedback are why a one-week sprint is possible.',
          'For a day-by-day breakdown and real timelines from 10 projects, read <a href="/blog/how-long-does-branding-take">how long branding takes</a>.']: b.append(P(s))
b.append('<h2 id="how-to-budget">How to budget for a complete brand identity</h2>')
for s in ['<strong>Under $1,000:</strong> a basic logo and colour set from an entry-level freelancer, good for testing an idea.',
          '<strong>$2,500 to $5,000:</strong> a complete identity with guidelines from a senior freelancer or a one-week sprint, the right range for most startups and small businesses.',
          '<strong>$8,000 to $25,000:</strong> a fuller system with strategy, packaging or a website from an experienced freelancer or a studio.',
          '<strong>$60,000 and up:</strong> an agency, when you need research, many stakeholders and a large rollout.',
          'If you need ongoing design after launch, compare <a href="/blog/design-subscription-services">design subscription services</a>, which start around $1,800 a month.']: b.append(P(s))
faq = [
 {"question": "How much does a complete brand identity cost?", "answer": "In the 11 published packages I checked, a complete brand identity costs about $2,500 to $10,000 with a senior freelancer, $10,000 to $25,000 with an independent studio and $60,000 or more with an agency. Most startups spend $2,500 to $10,000."},
 {"question": "How long does it take to create a brand identity?", "answer": "Senior freelance packages take 4 to 6 weeks, studio packages 5 weeks to 4 months and agencies anywhere from a two-week sprint to many months. A one-week brand sprint is possible when the scope is fixed and one person makes decisions."},
 {"question": "What is included in a brand identity package?", "answer": "A logo with variations, a colour palette, typography and brand guidelines are the core. Many packages add graphic elements, icons, mockups and stationery. Strategy, naming, packaging and a website usually cost extra."},
 {"question": "Is a cheaper brand identity worth it?", "answer": "Rarely. A few-hundred-dollar package from a beginner covers a logo and colours, not a full system. Check what the guidelines include and how many concepts and revisions you get before comparing prices."},
 {"question": "How much does your Brand Sprint cost?", "answer": "My Brand Sprint costs $3,000 and delivers a complete brand identity or rebrand in one week, including logo concepts, a logo animation, colours, typography, guidelines and launch assets."},
]
post = {"slug": SLUG, "url": f"/blog/{SLUG}", "title": TITLE, "category": "Branding", "categorySlug": "branding", "author": "arek-dvornechuck-ebaqdesign",
        "date": D, "readTime": "11 min read", "description": DESC,
        "image": {"src": f"{I}/brand-identity-cost-vs-delivery-time.webp", "alt": "Brand identity price vs delivery time chart", "thumbnail": f"{I}/brand-identity-cost-vs-delivery-time.webp"},
        "seo": {"title": TITLE, "description": DESC, "image": f"{I}/brand-identity-cost-vs-delivery-time.webp"},
        "body": ''.join(b), "faq": faq,
        "tags": ["brand identity cost", "brand identity design cost", "branding cost", "how long does branding take", "brand sprint"]}
if os.path.exists(f'public{I}/cover-collage.webp'):
    post['image'] = {"src": f"{I}/cover-collage.webp", "alt": "Brand identity cost and timeline cover collage", "thumbnail": f"{I}/cover-collage-768w.webp"}
    post['seo']['image'] = f"{I}/cover-collage-og.webp"
json.dump(post, open(f'public/content/blog/{SLUG}.json', 'w'), ensure_ascii=False, indent=2)
idx = json.load(open('public/content/blog/index.json'))
entry = {k: post[k] for k in ('slug', 'url', 'title', 'description', 'category', 'categorySlug', 'readTime', 'date', 'image')}
pos = next((i for i, x in enumerate(idx) if x['slug'] == SLUG), None)
if pos is None: idx.insert(0, entry)
else: idx[pos] = entry
json.dump(idx, open('public/content/blog/index.json', 'w'), ensure_ascii=False, indent=2)
print('ok', len(ROWS))

# Extra images (photos and reused graphics) after the intro and key sections.
import importlib.util as _u
_s=_u.spec_from_file_location("blog_figures","tools/article-graphics/blog_figures.py"); _m=_u.module_from_spec(_s); _s.loader.exec_module(_m); print("figures", _m.apply(SLUG))
