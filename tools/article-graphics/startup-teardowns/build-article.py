# Builds public/content/blog/startup-brand-teardowns.json, "6 Startup Brand Teardowns", and adds or updates
# its index entry at the top. Run from the repo root.
import json, os, sys
sys.path.insert(0,'tools/article-graphics/startup-teardowns'); import teardowns as t
SLUG='startup-brand-teardowns'
P=f'public/content/blog/{SLUG}.json'
I=f'/images/blog/{SLUG}'
D='tools/article-graphics/startup-teardowns'
title="6 Startup Brand Teardowns"
desc="A brand designer tears down six startup rivalries, from Ramp vs Brex to Linear vs Jira and Stripe vs Adyen: what each homepage, logo and message does, who stands out and what founders can steal."
hero_alt=open(f'{D}/hero_alt.txt').read().strip() if os.path.exists(f'{D}/hero_alt.txt') else 'Startup brand teardowns'
L=lambda h,x:f'<a href="{h}">{x}</a>'
X=lambda h,x:f'<a href="{h}" target="_blank" rel="noopener noreferrer">{x}</a>'
def fig(src,alt,w=1920,h=1080,cap=None):
    c=f'<figcaption>{cap}</figcaption>' if cap else ''
    return f'<figure><img src="{src}" alt="{alt}" width="{w}" height="{h}" loading="lazy" decoding="async" />{c}</figure>'
def slide(i):
    a,an,b,bn,na,nb=t.P[i]
    notes=', '.join(n[0] for n in na+nb)
    return fig(f'{I}/startup-teardown-0{i+1}-{a}-vs-{b}.webp',f'{an} vs {bn} homepages side by side with handwritten design notes: {notes}')
TOC=['<ol>']+[f'<li>{L("#"+p[0]+"-vs-"+p[2],p[1]+" vs "+p[3])}</li>' for p in t.P]+['</ol>']
body=(
 '<p>The fastest way to see what branding does for a startup is to put two rivals side by side.</p>'
 + fig(f'{I}/startup-brand-teardowns-hero.webp',hero_alt,1920,1072) +
 '<p>Same market, similar products, often the same investors on both cap tables, and yet one brand feels like the obvious choice and the other feels like an alternative.</p>'
 '<p>I\'m a brand designer who works with funded startups, and below I tear down six rivalries the way I would in a client workshop: the homepage, the logo, the colour, the message and the proof.</p>'
 + ''.join(TOC) +
 '<p>Every screenshot shows the homepage above the fold, captured on November 25, 2026. Websites change often, so treat these as a snapshot. The verdicts are my opinion as a designer, not a ranking of the businesses.</p>'
 # 1 Ramp vs Brex
 '<h2 id="ramp-vs-brex">1. Ramp vs Brex</h2>'
 '<p>Two corporate card and spend management companies, both selling to the same finance teams.</p>'
 + slide(0) +
 '<p><strong>Brex</strong>, founded in 2017 by Henrique Dubugras and Pedro Franceschi, leads with "Finance built for speed and control" and a large product photo of a card and a phone. Its own write-up of the ' + X('https://www.brex.com/journal/rebranding-brex','Brex rebrand') + ' explains that the logo grew from the idea of helping businesses "plant their flag".</p>'
 '<p><strong>Ramp</strong>, founded in 2019 by Eric Glyman and Karim Atiyeh, leads with "Time is money. Save both." Under it sits one solar yellow button and a strip of live counters showing work done on Ramp today.</p>'
 '<p><strong>My verdict: Ramp.</strong> "Speed and control" could describe almost any finance tool. "Save both" is one idea, said in four words, and the yellow button is the only bright colour on the page, so your eye goes straight to it. The live numbers turn a claim into proof.</p>'
 '<p><strong>Lesson for founders:</strong> own one idea and one colour. If your headline could sit on a competitor\'s website, it isn\'t doing its job.</p>'
 # 2 Linear vs Jira
 '<h2 id="linear-vs-jira">2. Linear vs Jira</h2>'
 '<p>The challenger and the incumbent of software project management.</p>'
 + slide(1) +
 '<p><strong>Jira</strong>, launched by Atlassian in 2002, is used by a huge share of software teams. Its homepage leads with "Turn plans into agent-ready tasks", a blue sign-up form and a banner about being named a leader by Gartner.</p>'
 '<p><strong>Linear</strong>, founded in 2019 by Karri Saarinen, Tuomas Artman and Jori Lallo, leads with "The product development system for teams and agents" on a dark background, with a large screenshot of the app filling the rest of the screen.</p>'
 '<p><strong>My verdict: Linear.</strong> Jira sells reassurance to the people who buy software: analysts approve, it\'s safe. Linear sells taste to the people who use it: dark, quiet and fast, with the product as the hero. Linear looks like the opposite of Jira, and that\'s the point.</p>'
 f'<p><strong>Lesson for founders:</strong> a challenger brand should look unlike the leader. If you copy the category leader\'s colours and layout, you {L("/blog/logos-look-alike-brands-sound-same","look like a cheaper version")} of it.</p>'
 # 3 Stripe vs Adyen
 '<h2 id="stripe-vs-adyen">3. Stripe vs Adyen</h2>'
 '<p>Two payment giants, both founded by engineers, with very different brand personalities.</p>'
 + slide(2) +
 '<p><strong>Stripe</strong>, founded in 2010 by Patrick and John Collison, leads with "Financial infrastructure to grow your revenue", a live counter of global GDP running on Stripe and its famous flowing colour gradient.</p>'
 '<p><strong>Adyen</strong>, founded in 2006 in Amsterdam, leads with "Fintech built for the long run" over a dark, muted photo. Its ' + X('https://brandguidelines.adyen.com/design/logo','brand guidelines') + ' keep the wordmark in one flat green, with no recolouring or effects.</p>'
 '<p><strong>My verdict: a draw, for different reasons.</strong> Stripe\'s gradient is one of the most recognizable assets in software, the kind of thing designers copy for years. Adyen chose restraint, which suits enterprise buyers who want stability over excitement. Both brands are consistent, and both know exactly who they\'re talking to.</p>'
 '<p><strong>Lesson for founders:</strong> there is no single "good" startup look. Decide whether you\'re selling excitement or stability, and commit to it everywhere.</p>'
 # 4 Vercel vs Netlify
 '<h2 id="vercel-vs-netlify">4. Vercel vs Netlify</h2>'
 '<p>Two platforms for deploying websites and apps, both loved by developers.</p>'
 + slide(3) +
 '<p><strong>Vercel</strong> started life as ZEIT and ' + X('https://vercel.com/blog/zeit-is-now-vercel','renamed itself Vercel in April 2020') + ', but kept its black triangle. Today the homepage is almost entirely black and white: a short headline, "Agentic Infrastructure", and a big triangle in the middle of the screen.</p>'
 '<p><strong>Netlify</strong>, founded in 2014, leads with "Where apps come to life" next to a large, colourful illustration of people building a world of shapes.</p>'
 '<p><strong>My verdict: Vercel.</strong> Netlify\'s illustration is well made, but it could illustrate almost any tech product. Vercel\'s triangle survived a complete name change because the company treated it as an asset, and the strict black and white makes it impossible to confuse with anyone else.</p>'
 '<p><strong>Lesson for founders:</strong> distinctive assets are worth protecting. When you rename or refresh, keep the things people already recognize.</p>'
 # 5 Attio vs HubSpot
 '<h2 id="attio-vs-hubspot">5. Attio vs HubSpot</h2>'
 '<p>A well-funded CRM challenger against one of the biggest names in the category.</p>'
 + slide(4) +
 '<p><strong>HubSpot</strong>, founded in 2006, leads with "Build demand, win deals, and delight customers — all on one platform", a bright orange button and photos of real people.</p>'
 '<p><strong>Attio</strong>, which ' + X('https://attio.com/blog/attio-raises-52m-series-b','raised a $52 million Series B in 2025') + ', leads with "Welcome to agentic revenue." on a calm white page, with a preview of the product underneath.</p>'
 '<p><strong>My verdict: both, for their own buyers.</strong> HubSpot\'s warm orange and smiling people speak to small businesses that want something friendly and complete. Attio\'s quiet, minimal design speaks to startup teams who already use tools like Linear and expect the same craft from their CRM.</p>'
 '<p><strong>Lesson for founders:</strong> design for the buyer you want, not the market as a whole. Attio didn\'t try to out-HubSpot HubSpot; it looked like the tools its customers already love.</p>'
 # 6 Cal.com vs Calendly
 '<h2 id="cal-vs-calendly">6. Cal.com vs Calendly</h2>'
 '<p>An open-source challenger against the default scheduling tool.</p>'
 + slide(5) +
 '<p><strong>Calendly</strong>, founded in 2013 by Tope Awotona, leads with "All the work around meetings, handled." on a blue gradient, with the product shown underneath.</p>'
 '<p><strong>Cal.com</strong> started as Calendso and ' + X('https://cal.com/blog/calendso-rebrands-to-cal-com','renamed itself Cal.com') + '. Its homepage headline, "Where people find the time to meet", has small photos and a clock set right into the words, on a mostly black and white page.</p>'
 '<p><strong>My verdict: Cal.com.</strong> Calendly\'s blue gradient is pleasant but looks like many SaaS homepages. Cal.com\'s headline is the most memorable on this list, and the name is the domain: short, easy to say and impossible to misspell.</p>'
 f'<p><strong>Lesson for founders:</strong> your {L("/blog/brand-name","name")} is part of your brand. A short name that matches your domain does marketing work every day.</p>'
 # Patterns
 '<h2 id="what-the-winners-share">What the winning brands have in common</h2>'
 '<p>Across six very different markets, the brands that stand out share four habits.</p>'
 + fig(f'{I}/what-the-winning-startup-brands-share.webp','What the winning startup brands share: one idea said simply, one colour they own, the product as proof, assets kept for years. Look unlike the leader.') +
 '<ul><li><strong>One idea, said simply:</strong> Ramp\'s "Save both" and Cal.com\'s "find the time to meet" are short enough to remember after one visit.</li>'
 '<li><strong>One colour they own:</strong> Ramp\'s yellow, Adyen\'s green and Vercel\'s black and white are used with discipline, not decoration.</li>'
 '<li><strong>The product as proof:</strong> Linear and Attio show the product instead of describing it, and Ramp and Stripe show live numbers instead of adjectives.</li>'
 '<li><strong>Assets kept for years:</strong> Vercel kept its triangle through a rename. Stripe has built on its gradient for years. Recognition compounds.</li></ul>'
 '<p>And above all: <strong>look unlike the leader</strong>. Every challenger on this list that stands out does so by refusing to look like the incumbent.</p>'
 f'<p>If you\'re raising soon, these are exactly the things investors notice in the two minutes they spend on your deck. I cover that in {L("/blog/branding-before-fundraising","why you need branding before you raise")}.</p>'
 '<h2 id="conclusion">Want your startup to be the one that stands out?</h2>'
 '<p>In every one of these rivalries, the products are close. The brands are not. A clear idea, a disciplined colour, real proof and assets you keep are what make one company feel like the obvious choice.</p>'
 f'<p>I help funded startups build brands like these in fixed-price weeks, from a {L("/brand-sprint","one-week brand sprint")} to a {L("/design-monthly","month of brand, website and pitch deck design")}. See my {L("/saas-branding","SaaS branding")} and {L("/ai-startup-branding","AI startup branding")} work, or <a href="/start"><strong>book a call</strong></a> and I\'ll tear down your brand against your biggest competitor.</p>'
)
credit=open(f'{D}/cover_credit.html').read().strip() if os.path.exists(f'{D}/cover_credit.html') else ''
post=json.load(open(P)) if os.path.exists(P) else {}
post.update({"slug":SLUG,"url":f"/blog/{SLUG}","title":title,"category":"Branding","categorySlug":"branding","author":"arek-dvornechuck-ebaqdesign",
 "date":"Nov 25, 2026","readTime":"9 min read","description":desc,
 "image":{"src":f"{I}/startup-brand-teardowns-hero.webp","alt":hero_alt,"thumbnail":f"{I}/startup-brand-teardowns-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/startup-brand-teardowns-hero-og.webp"},
 "body":body+credit,
 "faq":[
  {"question":"What is a brand teardown?","answer":"A brand teardown is a close look at how a company presents itself: its homepage, logo, colours, type, message and proof. Comparing two rivals side by side shows which choices make one brand stand out."},
  {"question":"Which startup has the best brand?","answer":"There's no single answer, but brands like Ramp, Linear, Stripe and Vercel are often cited by designers because each owns a clear idea, a distinctive visual asset and a consistent style."},
  {"question":"How can a startup brand stand out from a bigger competitor?","answer":"Look unlike the leader. Pick one idea and one colour you can own, show your product as proof and keep your distinctive assets for years instead of redesigning them every round."},
  {"question":"Can I get a teardown of my own startup's brand?","answer":"Yes. On a call I compare your brand with your closest competitor and show what to keep, what to change and what to build first. Book a call from the contact page."},
  {"question":"How much does startup branding cost?","answer":"I design a startup's strategy, logo and core identity in one week for $3,000, or a brand, website and pitch deck in one month for $10,000 with a fixed scope."}],
 "tags":["startup branding","brand teardown","SaaS branding","fintech branding","brand strategy"],
 "selectedWorkSlugs":["orbio","next-dimension","elevate"],
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
