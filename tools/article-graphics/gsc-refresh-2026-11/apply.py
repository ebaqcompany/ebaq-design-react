# GSC 28-day refresh (Oct 26 - Nov 22, 2026): add content for position 10-30 keywords
# that the pages did not cover. Rebuilds each article from HEAD, so it is safe to re-run.
import json, math, re, subprocess, os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
BLOG = os.path.join(ROOT, 'public/content/blog')
DATE = 'Nov 25, 2026'


FMT = {}


def head(slug):
    raw = subprocess.check_output(['git', 'show', f'HEAD:public/content/blog/{slug}.json'], cwd=ROOT).decode()
    # keep each file's existing JSON layout so the diff only shows content changes
    if raw.startswith('{\n'):
        FMT[slug] = dict(indent=2, nl=raw.endswith('\n'))
    elif raw.startswith('{"slug":"'):
        FMT[slug] = dict(separators=(',', ':'), nl=raw.endswith('\n'))
    else:
        FMT[slug] = dict(nl=raw.endswith('\n'))
    return json.loads(raw)


def words(html):
    return len(re.sub(r'<[^>]+>', ' ', html).split())


def insert(body, anchor, html, before=True):
    assert body.count(anchor) == 1, (anchor, body.count(anchor))
    i = body.find(anchor)
    return body[:i] + html + body[i:] if before else body[:i + len(anchor)] + html + body[i + len(anchor):]


def replace(body, old, new):
    assert body.count(old) == 1, (old, body.count(old))
    return body.replace(old, new)


def faq(post, pairs):
    existing = post.get('faq') or []
    have = {f['question'] for f in existing}
    post['faq'] = existing + [{'question': q, 'answer': a.replace('&#x27;', "'")} for q, a in pairs if q not in have]


changed = {}  # slug -> (bump_date, added_words)


def save(slug, post, added, bump):
    if bump:
        post['date'] = DATE
        if added:
            m = int(re.match(r'(\d+)', post['readTime']).group(1))
            post['readTime'] = f'{m + math.ceil(added / 230)} min read'
    fmt = dict(FMT[slug])
    nl = fmt.pop('nl')
    with open(os.path.join(BLOG, slug + '.json'), 'w') as f:
        json.dump(post, f, ensure_ascii=False, **fmt)
        if nl:
            f.write('\n')
    changed[slug] = bump


# 1. top-branding-agencies: "branding agency" (21,660 imp, pos 18) and its variants
p = head('top-branding-agencies')
b = p['body']
b = replace(b, '<p>In 2024, the <strong>branding industry</strong> is witnessing remarkable work from various branding agencies. </p>',
            '<p>In 2024, the <strong>branding industry</strong> saw remarkable work from various branding agencies. </p>')
b = replace(b, 'The branding agency you provided is How&amp;How Ltd. They have offices in London, Lisbon, and Los Angeles. ',
            'How&amp;How has offices in London, Lisbon, and Los Angeles. ')
add = (
    '<h2 id="what-is-a-branding-agency">What is a branding agency?</h2>'
    '<p>A <strong>branding agency</strong> is a firm that defines how a company should be seen, then designs the name, logo, visual identity and messaging that express it.</p>'
    '<p>Branding agencies, also called <strong>branding firms</strong> or brand agencies, usually work in three stages:</p>'
    '<ul><li><strong>Strategy:</strong> research, positioning, audience, brand architecture and messaging.</li>'
    '<li><strong>Identity:</strong> naming, logo, colours, typography, imagery and brand guidelines.</li>'
    '<li><strong>Rollout:</strong> website, packaging, signage, pitch decks and launch assets.</li></ul>'
    '<p>The agencies on this list cover all three, but each one leads with a different strength, from Pentagram&#x27;s partner-led studios to Landor &amp; Fitch&#x27;s global network of offices.</p>'
    '<h2 id="branding-agency-vs-design-agency">Branding agency vs design agency vs marketing agency</h2>'
    '<p>The names overlap, but the work is different.</p>'
    '<ul><li><strong>Branding agency:</strong> decides what the brand stands for and designs the identity that carries it.</li>'
    '<li><strong>Brand design agency or design studio:</strong> focuses on the visual identity, often with a lighter strategy phase.</li>'
    '<li><strong>Creative agency:</strong> makes campaigns and content for a brand that already exists.</li>'
    '<li><strong>Brand marketing agency:</strong> runs ads, social and growth campaigns, usually from your existing guidelines.</li>'
    '<li><strong>Full-service branding agency:</strong> covers strategy, identity, website and marketing under one roof.</li></ul>'
    '<p>If you don&#x27;t have a clear positioning and identity yet, <strong>start with a branding agency or a senior brand designer</strong>, then hand the guidelines to a marketing agency.</p>'
    '<p>I compare the two routes in <a href="/compare/freelancer-vs-agency">freelancer vs agency</a>.</p>'
    '<h2 id="branding-agency-cost">How much does a branding agency cost?</h2>'
    '<p>Agencies rarely publish prices, but the ones that do start around <strong>$60,000</strong>.</p>'
    '<p>Primary sells a two-week brand sprint for a flat $60,000, and <a href="https://www.primary.studio/pricing" target="_blank">its pricing page</a> puts typical agency branding projects at <strong>$80,000 to $300,000 or more</strong>.</p>'
    '<p>Independent studios usually charge <strong>$10,000 to $25,000</strong> for a complete identity, and senior freelancers about <strong>$3,000 to $10,000</strong>.</p>'
    '<p>Treat the $ signs in the table above as relative positions on that scale, not as quotes.</p>'
    '<p>The published packages behind these numbers are in <a href="/blog/brand-identity-cost">how much a complete brand identity costs</a>, and the <a href="/tools/branding-cost-calculator">branding cost calculator</a> gives you a quick estimate.</p>'
    '<h2 id="how-to-choose-a-branding-agency">How to choose a branding agency</h2>'
    '<ol><li><strong>Start with the work:</strong> shortlist the agencies whose portfolios you would be proud to put your name on.</li>'
    '<li><strong>Look for your category:</strong> an agency that has branded companies like yours needs less time to ramp up.</li>'
    '<li><strong>Ask who does the work:</strong> at large firms, the people in the pitch are not always the people on your project.</li>'
    '<li><strong>Compare the scope:</strong> deliverables, revision rounds and support after launch matter as much as the fee.</li>'
    '<li><strong>Match the timeline:</strong> agency projects often run three to nine months, so plan around launches and fundraising.</li>'
    '<li><strong>Talk to past clients:</strong> ask how decisions were made and whether the brand still works a year later.</li></ol>'
    '<p>For seed and Series A budgets, see my list of <a href="/blog/startup-branding-agencies">branding agencies for startups</a>, and if you want someone local, the <a href="/blog/branding-agency-nyc">best branding agencies in NYC</a>.</p>'
)
b = insert(b, '<h2>Conclusion', add)
p['body'] = b
faq(p, [
    ('What does a branding agency do?', 'A branding agency defines a company&#x27;s strategy and positioning, then designs the name, logo, visual identity and brand guidelines that express it, and often the website and launch assets too.'),
    ('How much does a branding agency cost?', 'Agencies that publish prices start around $60,000, and Primary&#x27;s pricing page puts typical agency branding projects at $80,000 to $300,000 or more. Independent studios usually charge $10,000 to $25,000 for a complete identity.'),
    ('What is the difference between a branding agency and a marketing agency?', 'A branding agency decides what the brand stands for and designs its identity. A marketing agency promotes the brand through ads, social media and campaigns, usually working from guidelines that already exist.'),
    ('Should I hire a branding agency or a freelancer?', 'An agency&#x27;s larger team helps with research-heavy projects, naming and rollouts across many markets. For a startup or small business, a senior brand designer can usually deliver strategy, identity and guidelines faster and for a fraction of the price.'),
])
save('top-branding-agencies', p, words(add) + 120, True)

# 2. what-is-branding: "branding definition" (510 imp, pos 24.9), "branding meaning", "definition of branding"
p = head('what-is-branding')
add = (
    '<h2 id="branding-definition">Branding definition</h2>'
    '<p><strong>Branding</strong> is the process of shaping how people perceive a company, product or person, through its name, visual identity, messaging and every experience it delivers.</p>'
    '<p>In marketing, the <strong>meaning of branding</strong> is more specific: it is the work that makes an offer recognisable and different from its competitors, so people remember it and choose it.</p>'
    '<p>A <strong>brand</strong> is the result, the perception people hold, while <strong>branding</strong> is the work you do to shape it.</p>'
    '<p>I unpack that difference in <a href="/blog/branding-brand-identity">brand vs branding vs brand identity</a>.</p>'
    '<p>The ten experts below each define branding in their own words.</p>'
)
p['body'] = insert(p['body'], '<h2>Expert 1 - Alina Wheeler</h2>', add)
faq(p, [
    ('What is the definition of branding?', 'Branding is the process of shaping how people perceive a company, product or person, through its name, visual identity, messaging and every experience it delivers.'),
    ('What does branding mean in marketing?', 'In marketing, branding is the work that makes an offer recognisable and different from its competitors, so people remember it and choose it.'),
    ('What is the difference between a brand and branding?', 'A brand is the perception people hold about a company or product. Branding is the work a company does to shape that perception.'),
])
save('what-is-branding', p, words(add) + 90, True)

# 3. logo-design-process: "logo creation" (711 imp, pos 11.5), "how to design a logo", "steps to design a logo"
p = head('logo-design-process')
b = replace(p['body'], '<h3 id=""><strong id="">7-Step Logo Design Process</strong></h3>',
            '<h3 id=""><strong id="">How to design a logo in 7 steps</strong></h3>')
b = insert(b, '<h2 id="">Conclusions</h2>',
           '<p>Every step feeds the next, so <strong>logo creation</strong> starts with discovery and research, not with sketching.</p>')
p['body'] = b
save('logo-design-process', p, 0, False)

# 4. brand-strategy-framework-startups: "startup brand strategy" (pos 10.3), "brand strategy for startups" (pos 11.1)
p = head('brand-strategy-framework-startups')
add = (
    '<h2 id="when-startups-need-brand-strategy">When should a startup create a brand strategy?</h2>'
    '<p>A <strong>startup brand strategy</strong> is worth doing at a few clear moments, not once and forever.</p>'
    '<ul><li><strong>Before launch:</strong> define the audience and positioning before you name the company or design the logo.</li>'
    '<li><strong>Before you raise:</strong> investors read your deck and website before they meet you, so the story has to be clear.</li>'
    '<li><strong>After product-market fit:</strong> once you know who buys and why, sharpen the positioning around them.</li>'
    '<li><strong>After a pivot:</strong> a new market or product usually breaks the old positioning.</li>'
    '<li><strong>Before you scale the team:</strong> new hires and agencies need one shared strategy to work from.</li></ul>'
    '<p>A brand strategy for startups differs from a corporate one in three ways: <strong>less research, faster decisions</strong>, and a brand that can stretch as the product changes.</p>'
    '<p>See how six funded startups put their strategy to work in my <a href="/blog/startup-brand-teardowns">startup brand teardowns</a>.</p>'
)
p['body'] = insert(p['body'], '<h2>Common Brand Strategy Mistakes Startups Make</h2>', add)
faq(p, [
    ('What is a startup brand strategy?', 'A startup brand strategy defines who the company serves, why it matters and how it is different, so the name, identity, website and pitch all tell the same story.'),
    ('When should a startup invest in brand strategy?', 'Before launch, before raising money, after finding product-market fit, after a pivot and before scaling the team are the moments when a startup brand strategy pays off most.'),
    ('How long does it take to create a brand strategy for a startup?', 'You can work through all nine steps of this framework in a focused 3-hour workshop, then refine the results over the following weeks.'),
])
save('brand-strategy-framework-startups', p, words(add) + 100, True)

# 5. best-adobe-discounts: "adobe promo code" (pos 13.0), "adobe coupon" (pos 22.7), "adobe discount code", student discounts
p = head('best-adobe-discounts')
add = (
    '<h2 id="adobe-promo-codes">Do Adobe promo codes and coupon codes work?</h2>'
    '<p>The Black Friday prices above are listed on Adobe&#x27;s own offer pages, so <strong>start there rather than searching for an Adobe promo code</strong>.</p>'
    '<p>Many <strong>Adobe coupon code</strong> listings on coupon sites simply link to the same public offers.</p>'
    '<p>Whichever link you use, <strong>check that the discount appears in your checkout total</strong> before you pay.</p>'
    '<p>Adobe redemption codes are different: they come with prepaid memberships bought from retailers and are redeemed in your Adobe account.</p>'
    '<p>For a <strong>Photoshop or Illustrator student discount</strong>, the education offer above covers Creative Cloud Pro, which includes both apps.</p>'
)
p['body'] = insert(p['body'], '<h2>More Adobe offers beyond Black Friday</h2>', add)
faq(p, [
    ('Is there an Adobe promo code for Creative Cloud?', 'Adobe lists its Black Friday and introductory prices on its own offer pages, so start from those pages and check that the discount appears in your checkout total before you pay.'),
    ('Is there a Photoshop student discount?', 'Yes. Eligible students and teachers get Creative Cloud Pro, which includes Photoshop and Illustrator, at the education price listed above.'),
])
save('best-adobe-discounts', p, words(add) + 60, True)

# 6. brand-architecture: "brand architecture" (1,803 imp, pos 20.9), "brand architecture development"
p = head('brand-architecture')
add = (
    '<h2 id="how-to-develop-brand-architecture">How to develop a brand architecture</h2>'
    '<p><strong>Brand architecture development</strong> starts with an audit, not with logos.</p>'
    '<ol><li><strong>Audit every brand you own:</strong> list each product, service, sub-brand and business unit with the audience it serves.</li>'
    '<li><strong>Decide how much the master brand should lead:</strong> the more your offers share an audience and a promise, the closer you sit to a branded house.</li>'
    '<li><strong>Find the exceptions:</strong> offers with a different audience, price level or risk often need an endorsed brand or a separate brand.</li>'
    '<li><strong>Choose the model:</strong> branded house, endorsed brands, house of brands, or a hybrid of them.</li>'
    '<li><strong>Set naming and visual rules:</strong> define how sub-brand names, logos, colours and descriptors relate to the master brand.</li>'
    '<li><strong>Plan the rollout:</strong> introduce the changes in an order that doesn&#x27;t confuse existing customers.</li></ol>'
    '<p>Brand architecture is part of your brand strategy, which I cover step by step in the <a href="/blog/brand-strategy">9-step brand strategy framework</a>.</p>'
)
p['body'] = insert(p['body'], '<h2 id="">Conclusions</h2>', add)
faq(p, [
    ('What is brand architecture?', 'Brand architecture is the hierarchy of brands within one organization: how the master brand, sub-brands, products and business units relate to each other.'),
    ('What are the types of brand architecture?', 'The three basic models are the branded house, endorsed brands and the house of brands. Large organizations often combine them in a hybrid model.'),
    ('What is an example of a branded house?', 'FedEx is a classic branded house: FedEx Express, FedEx Ground and FedEx Office all carry the master brand. Apple, Samsung and GE follow the same model.'),
    ('How do you develop a brand architecture?', 'Audit every brand you own, decide how much the master brand should lead, find the exceptions, choose a model, set naming and visual rules, and plan the rollout.'),
])
save('brand-architecture', p, words(add) + 130, True)

# 7. branding-workshop: "branding workshop outline", "brand positioning workshop", "brand persona workshop"
p = head('branding-workshop')
b = replace(p['body'], '<p id="">Example agenda:</p>',
            '<p id="">Example branding workshop outline (3 hours 45 minutes, including two breaks):</p>')
add = (
    '<h2 id="positioning-and-persona-workshops">Brand positioning and brand persona workshops</h2>'
    '<p>You don&#x27;t have to run all nine exercises in one day.</p>'
    '<p>The outline above splits into three shorter workshops that each work on their own:</p>'
    '<ul><li><strong>Brand core workshop (about 1 hour):</strong> purpose, vision and values.</li>'
    '<li><strong>Brand positioning workshop (about 1 hour):</strong> target audience, market research and awareness goals.</li>'
    '<li><strong>Brand persona workshop (about 1 hour):</strong> personality, voice and tagline.</li></ul>'
    '<p>Run them <strong>in that order</strong>, because positioning builds on the core and the persona builds on the positioning.</p>'
)
b = insert(b, '<h2>Is a brand strategy workshop worth it?</h2>', add)
p['body'] = b
faq(p, [
    ('What is a branding workshop?', 'A branding workshop is a facilitated session where founders and key team members agree on the brand&#x27;s purpose, positioning and personality before any design work begins.'),
    ('How long should a branding workshop be?', 'The full outline in this guide takes 3 hours 45 minutes including two breaks. You can also split it into three workshops of about an hour each: brand core, positioning and persona.'),
    ('What exercises are in a branding workshop?', 'The nine exercises cover brand purpose, vision, values, target audience, market research, awareness goals, brand personality, brand voice and tagline.'),
])
save('branding-workshop', p, words(add) + 100, True)

# 8. brand-archetypes: "brand archetypes" (951 imp, pos 15.1), "branding with archetypes"
p = head('brand-archetypes')
add = (
    '<h2 id="how-to-choose-a-brand-archetype">How to choose a brand archetype</h2>'
    '<p>Knowing the 12 archetypes is the easy part; picking yours is harder.</p>'
    '<ol><li><strong>Start from your audience:</strong> choose the archetype your customers trust or aspire to, not only the one you like.</li>'
    '<li><strong>Check it against your values:</strong> the archetype has to match how the company actually behaves.</li>'
    '<li><strong>Look at your competitors:</strong> if every competitor is a Sage, a Jester or an Explorer can set you apart.</li>'
    '<li><strong>Commit to one core archetype:</strong> the strongest brands identify with one, as I explain at the top of this guide.</li>'
    '<li><strong>Turn it into rules:</strong> use the archetype to guide your voice, imagery, colours and tagline.</li></ol>'
    '<p>For a starting point, take my free <a href="/tools/brand-archetype-quiz">brand archetype quiz</a>.</p>'
)
p['body'] = insert(p['body'], '<h2 id="">Conclusions</h2>', add)
faq(p, [
    ('What are the 12 brand archetypes?', 'The 12 brand archetypes are the Innocent, Sage, Explorer, Outlaw, Magician, Hero, Lover, Jester, Everyman, Caregiver, Ruler and Creator.'),
    ('How do I choose a brand archetype?', 'Start from what your audience trusts or aspires to, check it against your values, look at which archetypes your competitors already own, commit to one core archetype and turn it into rules for voice and visuals.'),
])
save('brand-archetypes', p, words(add) + 70, True)

# 9. principles-of-design: "design principles" (839 imp, pos 10.6)
p = head('principles-of-design')
p['body'] = replace(p['body'], '<p>The principles of design are a set of',
                    '<p>The principles of design, often called design principles, are a set of')
save('principles-of-design', p, 0, False)

# 10. biotech-startup-branding: "biotech branding" (481 imp, pos 23.6)
p = head('biotech-startup-branding')
c = p['logoRosterConfig']
add = (
    '<h2 id="biotech-branding">Biotech branding beyond the logo</h2>'
    '<p><strong>Biotech branding</strong> is more than a logo, because the brand has to work for investors, partners, regulators, recruits and, later, patients.</p>'
    '<ul><li><strong>Name and story:</strong> explain the science in one sentence a generalist investor can repeat.</li>'
    '<li><strong>Investor materials:</strong> the pitch deck and website are often where the brand is judged first.</li>'
    '<li><strong>Scientific visuals:</strong> data charts, pathway diagrams and molecule renders need the same colour and type rules as the logo.</li>'
    '<li><strong>Room to grow:</strong> a platform company may later need names for programs or products, so plan a simple <a href="/blog/brand-architecture">brand architecture</a> early.</li></ul>'
    '<p>The patient-facing brand usually comes last, once a product reaches the clinic or the market.</p>'
)
c['conclusionHtml'] = insert(c['conclusionHtml'], '<h2 id="conclusion">', add)
faq(p, [('What does biotech branding include?', 'Biotech branding covers the name, scientific story, logo and visual identity, investor deck, website and the rules for scientific visuals like charts and diagrams, with a patient-facing brand added once a product nears the clinic or market.')])
save('biotech-startup-branding', p, words(add) + 40, True)

# 11. architecture-logos: "branding for architecture firms" (305 imp), "architecture firm branding" (290 imp)
p = head('architecture-logos')
c = p['logoRosterConfig']
add = (
    '<h2 id="architecture-firm-branding">Architecture firm branding beyond the logo</h2>'
    '<p><strong>Branding for architecture firms</strong> lives mostly in the work you show, so the identity has to frame projects rather than compete with them.</p>'
    '<ul><li><strong>Portfolio website:</strong> large photography, simple navigation and project pages that read like case studies.</li>'
    '<li><strong>Competition boards and proposals:</strong> templates with fixed type, grids and title blocks save hours on every bid.</li>'
    '<li><strong>Drawings:</strong> the logo appears on every sheet, so it has to work small and in one colour.</li>'
    '<li><strong>Site hoardings and signage:</strong> the brand is often seen first on a construction fence.</li>'
    '<li><strong>Positioning:</strong> say which kinds of buildings you do best, because &quot;design excellence&quot; describes every firm.</li></ul>'
)
c['conclusionHtml'] = insert(c['conclusionHtml'], '<h2 id="conclusion">', add)
faq(p, [('What does architecture firm branding include?', 'Architecture firm branding covers the logo and type system, the portfolio website, templates for proposals and competition boards, drawing title blocks, site hoardings and a clear positioning about the kind of work the firm does best.')])
save('architecture-logos', p, words(add) + 40, True)

# 12. brand-slogans: "advertising slogans" (320 imp, pos 10.0)
p = head('brand-slogans')
p['body'] = replace(p['body'], '<p>Below are <strong>150 famous brand slogans and taglines grouped by industry</strong>, followed by',
                    '<p>Below are <strong>150 famous brand slogans and taglines grouped by industry</strong>, many of them advertising slogans from long-running campaigns, followed by')
save('brand-slogans', p, 0, False)

# index.json: carry the new date and read time for date-bumped posts
ipath = os.path.join(BLOG, 'index.json')
idx = json.load(open(ipath))
posts = idx if isinstance(idx, list) else idx['posts']
for e in posts:
    if changed.get(e['slug']):
        post = json.load(open(os.path.join(BLOG, e['slug'] + '.json')))
        e['date'] = post['date']
        e['readTime'] = post['readTime']
with open(ipath, 'w') as f:
    json.dump(idx, f, ensure_ascii=False, indent=2)
print(json.dumps(changed, indent=1))
