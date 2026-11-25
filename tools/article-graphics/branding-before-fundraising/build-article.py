# Builds public/content/blog/branding-before-fundraising.json, "Why You Need Branding Before You Raise",
# and adds or updates its index entry at the top. Run from the repo root.
import json, os
SLUG='branding-before-fundraising'
P=f'public/content/blog/{SLUG}.json'
I=f'/images/blog/{SLUG}'
D='tools/article-graphics/branding-before-fundraising'
title="Why You Need Branding Before You Raise"
desc="Investors judge your brand before they read your numbers. Why startups need branding before fundraising, what each round needs, and what it costs, from a brand designer whose clients raised seed rounds."
hero_alt=open(f'{D}/hero_alt.txt').read().strip()
L=lambda h,t:f'<a href="{h}">{t}</a>'
X=lambda h,t:f'<a href="{h}" target="_blank" rel="noopener noreferrer">{t}</a>'
def fig(src,alt,w=1920,h=1080,cap=None):
    c=f'<figcaption>{cap}</figcaption>' if cap else ''
    return f'<figure><img src="{src}" alt="{alt}" width="{w}" height="{h}" loading="lazy" decoding="async" />{c}</figure>'
body=(
 '<p>Investors judge your brand before they read your numbers.</p>'
 + fig(f'{I}/branding-before-fundraising-hero.webp',hero_alt,1920,1072) +
 '<p>Your deck, your website and your LinkedIn page are the first things an investor sees, often before any meeting.</p>'
 '<p>If they look like a side project, you are asking someone to bet millions on a company that doesn\'t look like a company yet.</p>'
 '<p>I\'m a brand designer, and I work with startups at exactly this moment. Two of my recent clients, ' + L('/work/orbio','Orbio') + ' and ' + L('/work/next-dimension','NextDimension') + ', have secured seed rounds of $1.2 million and $2.5 million.</p>'
 '<p>Below is why branding matters before you raise, what you actually need at each stage and what it costs.</p>'
 '<h2 id="investors-decide-fast">Investors decide in under two minutes</h2>'
 '<p>A pitch deck gets less attention than most founders think.</p>'
 '<p>In 2015, DocSend found that investors spent ' + X('https://techcrunch.com/2015/06/08/lessons-from-a-study-of-perfect-pitch-decks-vcs-spend-an-average-of-3-minutes-44-seconds-on-them/','3 minutes and 44 seconds') + ' on an average seed deck.</p>'
 '<p>By 2023, according to DocSend\'s ' + X('https://www.docsend.com/startup-fundraising/','fundraising research') + ', average viewing time had dropped <strong>under two minutes</strong> for the first time.</p>'
 '<p>In two minutes, nobody reads every number. They skim, and they form an impression: is this team serious, is the idea clear and does this look like a company that will win?</p>'
 '<p>That impression is your brand.</p>'
 '<p>Amy Hanlon, whose agency Blue Meta Design designs pitch decks for venture-backed startups, put it bluntly when she was a guest on ' + L('/podcast/startup-get-funded','my podcast') + ': investors see hundreds of decks a week, so if yours isn\'t clear and consistent, they probably won\'t take the time to look through it.</p>'
 '<h2 id="what-branding-means">What branding means for a startup</h2>'
 '<p>Branding is not a logo.</p>'
 f'<p>For a startup raising money, {L("/blog/what-is-branding","branding")} is everything that shapes an investor\'s gut feeling before they talk to you:</p>'
 '<ul><li><strong>Positioning:</strong> one clear sentence on what you do, for whom and why you\'re different.</li>'
 '<li><strong>Name:</strong> easy to say, easy to spell and with a domain you own.</li>'
 '<li><strong>Visual identity:</strong> a logo, colours and type that look intentional and work everywhere.</li>'
 '<li><strong>Pitch deck:</strong> the story of the company, designed in the same brand.</li>'
 '<li><strong>Website:</strong> the place investors go right after the deck to check that you\'re real.</li></ul>'
 f'<p>The {L("/blog/brand-strategy","strategy")} comes first. A beautiful logo can\'t save a story nobody understands.</p>'
 '<h2 id="why-branding-before-you-raise">Five reasons to brand before you raise</h2>'
 '<h3>1. You look like a company, not a project</h3>'
 '<p>A strong brand makes a five-person team look ready for a much bigger market.</p>'
 '<p>Amy described it this way: strong branding "makes you seem bigger than what you even probably could be".</p>'
 '<p>Investors aren\'t fooled by polish, but they are put off by the lack of it. A homemade logo signals that the founders cut corners, and investors wonder where else they cut them.</p>'
 '<h3>2. A clear story gets read</h3>'
 '<p>The questions investors want answered are always the same.</p>'
 '<p>Who are you, what problem do you solve, how big is it, why are you the right team and how are you different from everyone else?</p>'
 '<p>Brand strategy answers exactly those questions. When the positioning is sharp, the deck almost writes itself, and an investor skimming for two minutes still gets it.</p>'
 '<h3>3. Consistency removes doubt</h3>'
 '<p>Investors check you in more than one place.</p>'
 '<p>They open the deck, then the website, then the founders\' LinkedIn profiles. If the deck says one thing, the website another and the logo is different on each, it creates a small doubt.</p>'
 '<p><strong>Consistency is a signal of competence.</strong> It says the team pays attention to detail.</p>'
 '<h3>4. You stand out in a crowded market</h3>'
 f'<p>Most startup categories are full of look-alikes. Scroll through {L("/blog/ai-startups-logos","AI startup logos")} and you will see the same purple gradients, the same sparkles and the same rounded sans serif type.</p>'
 '<p>An investor who has seen 50 AI pitches this month needs a reason to remember yours. A distinctive brand is the easiest way to be the one they remember. For real examples, see my '+L('/blog/startup-brand-teardowns','startup brand teardowns')+', from Ramp vs Brex to Linear vs Jira.</p>'
 '<h3>5. The same brand also wins customers</h3>'
 '<p>Branding for investors is not a separate cost. The brand that convinces an investor also convinces your first customers, hires and partners.</p>'
 '<p>After we redesigned NextDimension\'s identity and website, the company reported a <strong>30% increase in demo bookings</strong>, and it has since secured $2.5 million in seed funding.</p>'
 '<h2 id="client-examples">Two seed rounds from my own clients</h2>'
 '<p>Here is what this looked like for two AI startups I worked with in 2026.</p>'
 + fig('/case-study/orbio/01-logos.webp','Orbio logo lockups in 3D and flat versions on light and dark',2400,1350,'Orbio: a one-week brand evolution built around its marble orb.') +
 '<p><strong>' + L('/work/orbio','Orbio') + '</strong> tokenizes AI inference, a hard idea to explain in a deck.</p>'
 '<p>In a one-week brand sprint, we kept its 3D marble orb and built a full Greco-Roman identity around it, with one accent colour, three typefaces with one job each and a motion system for social media.</p>'
 '<p>Orbio has secured <strong>$1.2 million in seed funding</strong>.</p>'
 + fig('/portfolio/identities/nexdim-bento.webp','NextDim AI brand identity: logo, reeded glass visuals and website screens on a dark purple background',1667,1250,'NextDimension: a healthcare AI brand that avoids the usual clinical look.') +
 '<p><strong>' + L('/work/next-dimension','NextDimension') + '</strong> helps medical practices automate their operations with AI agents.</p>'
 '<p>Healthcare AI brands tend to look the same: white, blue and clinical. We gave it a subtle space theme, reeded glass visuals, motion and an interactive website.</p>'
 '<p>The company reported 30% more demo bookings and has secured <strong>$2.5 million in seed funding</strong>.</p>'
 '<p>To be clear, the founders raised the money, not the logo. A brand doesn\'t replace traction, a strong team or a big market. What it does is make sure investors see those things clearly in the two minutes they give you.</p>'
 '<h2 id="what-each-round-needs">What you need before each round</h2>'
 '<p>You don\'t need a $100,000 brand system to raise a pre-seed round.</p>'
 + fig(f'{I}/what-each-funding-round-needs.webp','What each funding round needs: pre-seed, a name and positioning; seed, an identity, website and deck; Series A, a full brand system') +
 '<p><strong>Pre-seed:</strong> a clear name, one-line positioning and a simple, clean logo. Investors are betting on the founders, so the deck should be clear rather than fancy.</p>'
 f'<p><strong>Seed:</strong> a real visual identity, a website that explains the product and a designed {L("/services/pitch-deck","pitch deck")} in the same brand. This is the round where a homemade look starts to cost you.</p>'
 f'<p><strong>Series A:</strong> a full brand system with {L("/blog/brand-guidelines","brand guidelines")}, because by now other people are making things in your brand: new hires, agencies and partners. Many startups rebrand here, once the product and market are clear.</p>'
 '<h2 id="checklist">A checklist before you send the deck</h2>'
 '<p>Run through these four checks before the first investor email.</p>'
 + fig(f'{I}/before-you-send-the-deck.webp','Before you send the deck: one-line positioning, name and domain secured, deck matches the website, logo works as a favicon. Look the part.') +
 '<ul><li><strong>One-line positioning:</strong> can you say what you do, for whom and why you\'re different in one sentence?</li>'
 '<li><strong>Name and domain secured:</strong> is the name easy to say, and do you own the domain and social handles?</li>'
 '<li><strong>Deck matches the website:</strong> same logo, colours, type and message in both places?</li>'
 '<li><strong>Logo works as a favicon:</strong> does it still read at 16 pixels, in a browser tab and on a LinkedIn avatar?</li></ul>'
 '<h2 id="cost-and-timing">What it costs and how long it takes</h2>'
 '<p>Agencies often plan two to three months for a full startup brand and three to four weeks for a pitch deck alone; Amy\'s agency quoted exactly those timelines on my podcast. That can push your raise back by a quarter.</p>'
 f'<p>I work in fixed-price weeks instead. A {L("/brand-sprint","one-week brand sprint")} gives you the strategy, logo and core identity for <strong>$3,000</strong>. If you\'re raising soon and need the full package, a {L("/design-monthly","month of design")} costs <strong>$10,000</strong>, with a fixed scope that can cover the brand, website and pitch deck.</p>'
 f'<p>For a full breakdown, see {L("/blog/brand-identity-cost","how much a complete brand identity costs")}.</p>'
 '<h2 id="when-not-to">When you shouldn\'t spend on branding yet</h2>'
 '<p>Branding is not always the priority.</p>'
 '<p>If you don\'t yet know who your customer is, a brand will only make a confused story look nicer. Talk to customers first.</p>'
 '<p>If you\'re raising a small friends-and-family round from people who already know you, a clean, simple deck is enough.</p>'
 '<p>And if anyone quotes you six figures for a pre-seed startup, walk away. You need a clear, professional brand, not a Fortune 500 brand book.</p>'
 '<h2 id="conclusion">Ready to raise?</h2>'
 '<p>Investors give your deck about two minutes. A clear story, a consistent brand and a website that backs it up make sure those minutes count.</p>'
 f'<p>I help startup founders get their brand, website and pitch deck ready before a raise. See my {L("/ai-startup-branding","AI startup branding")} and {L("/saas-branding","SaaS branding")} work, look through my <a href="/work"><strong>past work</strong></a> or <a href="/start"><strong>book a call</strong></a> to talk about your round.</p>'
)
credit=open(f'{D}/cover_credit.html').read().strip() if os.path.exists(f'{D}/cover_credit.html') else ''
post=json.load(open(P)) if os.path.exists(P) else {}
post.update({"slug":SLUG,"url":f"/blog/{SLUG}","title":title,"category":"Branding","categorySlug":"branding","author":"arek-dvornechuck-ebaqdesign",
 "date":"Nov 25, 2026","readTime":"8 min read","description":desc,
 "image":{"src":f"{I}/branding-before-fundraising-hero.webp","alt":hero_alt,"thumbnail":f"{I}/branding-before-fundraising-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/branding-before-fundraising-hero-og.webp"},
 "body":body+credit,
 "faq":[
  {"question":"Do I need branding before a seed round?","answer":"You need a clear name, one-line positioning, a professional logo and a deck and website that look like one company. A full brand system can wait until Series A, but a homemade look starts to cost you at seed."},
  {"question":"Does branding help startups raise money?","answer":"Branding doesn't replace traction, a strong team or a big market. It makes sure investors see those things clearly. Investors spend under two minutes on a typical seed deck, so a clear, consistent brand helps them understand and remember you."},
  {"question":"How much should a startup spend on branding before raising?","answer":"At pre-seed and seed, expect a few thousand dollars, not six figures. I design a startup's strategy, logo and core identity in one week for $3,000, or the brand, website and pitch deck in one month for $10,000."},
  {"question":"How long does startup branding take?","answer":"Agencies often plan two to three months for a full brand. I work in one-week sprints, so a startup can have a new identity in a week and a brand, website and deck in about a month."},
  {"question":"Should I rebrand after raising?","answer":"Many startups do, often around Series A, once the product and market are clear and more people are creating things in the brand. A good seed-stage brand should evolve, not be thrown away."}],
 "tags":["startup branding","branding before fundraising","pitch deck","seed round","brand strategy"],
 "selectedWorkSlugs":["orbio","next-dimension"],
})
for k in ('intro','logoRoster','logoPageImages','logoTileImages','logoResearch','logoRosterConfig'): post.pop(k,None)
if os.path.exists(f'public{I}/cover-collage.webp'):
    post['image']={**post['image'],"src":f"{I}/cover-collage.webp","thumbnail":f"{I}/cover-collage-768w.webp","alt":open(f'{D}/cover_alt.txt').read().strip()}; post['seo']['image']=f"{I}/cover-collage-og.webp"
json.dump(post,open(P,'w'),ensure_ascii=False,indent=2)
idx=json.load(open('public/content/blog/index.json'))
entry={k:post[k] for k in ('slug','url','title','description','category','categorySlug','readTime','date','image')}
pos=next((i for i,x in enumerate(idx) if x['slug']==SLUG),None)
if pos is None: idx.insert(0,entry)
else: idx[pos]={**idx[pos],**entry}
json.dump(idx,open('public/content/blog/index.json','w'),ensure_ascii=False,indent=2)
print('ok', len(body.split()))
