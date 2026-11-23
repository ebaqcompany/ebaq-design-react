# Writes public/content/blog/b2b-logos.json (logo roster format, full-width annotated slides).
import json, sys
sys.path.insert(0,'tools/article-graphics/b2b-logos'); import b2b
P='public/content/blog/b2b-logos.json'; old=json.load(open(P))
I='/images/blog/b2b-logos'
B=b2b.B
boards=[("b2b-logos-01-enterprise-software","Enterprise software company logos, 01 to 09"),("b2b-logos-02-consulting-and-professional-services","Consulting and professional services logos, 10 to 18"),("b2b-logos-03-logistics-and-supply-chain","Logistics and supply chain company logos, 19 to 27"),("b2b-logos-04-industrial-and-manufacturing","Industrial and manufacturing company logos, 28 to 36"),("b2b-logos-05-b2b-platforms-and-marketplaces","B2B platform and marketplace logos, 37 to 45")]
title="45 B2B Company Logos Explained"
desc="45 B2B company logos explained by a brand designer, from McKinsey, Accenture, and Deloitte to FedEx, Caterpillar, ServiceNow, and Deel."
hero_alt="Business executives in a boardroom looking at a screen showing 45 B2B company logos"
post=dict(old); post.pop('body',None)
post.update({"title":title,"date":"Nov 21, 2026","readTime":"15 min read","description":desc,
 "image":{"src":f"{I}/b2b-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/b2b-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/b2b-logos-hero-og.webp"},
 "intro":f'<p>B2B logos are judged by buyers who sign long contracts, so the best ones are <strong>credible enough for a procurement meeting and distinctive enough to be remembered after it</strong>.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/b2b-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-b2b-logo">What makes a good B2B logo?</h2><p><strong>Credibility:</strong> B2B brands sell to committees and procurement teams, so most use stable, confident wordmarks, like McKinsey, Deloitte, and Siemens.</p><p><strong>One memorable detail:</strong> the best B2B logos add a single idea on top, like the hidden arrow in FedEx, the green dot in Deloitte, or the accent in Accenture.</p><p><strong>Built to last:</strong> B2B logos live on trucks, machines, invoices, and contracts for decades, so they favor timeless shapes over trends.</p><p>Below are 45 B2B company logos in five groups, from enterprise software and consulting to logistics, industrial companies, and B2B platforms. Each one has a slide with my handwritten notes, followed by a short explanation. For software brands, see my reviews of <a href="/blog/saas-logos">SaaS logos</a> and <a href="/blog/tech-startup-logos">tech logos</a>.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/b2b-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"45 B2B company logos",
  "listIntro":["The boards below show all 45 B2B logos in one consistent format, grouped into enterprise software, consulting, logistics, industrial, and B2B platforms.","Each logo is reviewed for its design decisions, not for the company's size or services."],
  "sectionNames":["Enterprise software","Consulting and professional services","Logistics and supply chain","Industrial and manufacturing","B2B platforms and marketplaces"],
  "sectionIntroductions":["Enterprise software brands sell to IT and finance teams, so their logos balance friendly lowercase type with a clean, reliable feel.","Consulting firms sell expertise and trust, and their logos lean on bold, confident wordmarks with one signature detail.","Logistics brands live on trucks, planes, and boxes, so their logos are bold, colorful, and readable from far away.","Industrial companies have some of the oldest and most consistent logos in business, built to work on machines and products for decades.","Newer B2B platforms look more like consumer apps, with friendly marks and simple, modern type."],
  "sectionBridge":["This is a visual comparison of B2B company logos, not a ranking of companies.","Look at how each logo balances credibility with one memorable detail."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look on a contract, a truck, or a trade show booth."]],
  "findings":[{"heading":"One small detail makes a B2B logo memorable","text":"The FedEx arrow, the Deloitte dot, the Accenture accent, and the ServiceNow power button show how one small idea makes a plain wordmark unforgettable."},{"heading":"Industrial logos are built to last","text":"Siemens, Bosch, John Deere, and Dow have kept the same core logo for decades, proof that consistency builds recognition in B2B."},{"heading":"Consulting is going bold and simple","text":"BCG, PwC, and EY have moved to bolder, simpler logos with one accent color to stand out in a conservative category."},{"heading":"Modern B2B looks like consumer tech","text":"Deel, Toast, Flexport, and Zoho use friendly, rounded logos that would fit a consumer app."}],
  "checklistHeading":"A practical checklist for a new B2B logo",
  "checklistItems":["Does the logo look credible in a procurement meeting and on a contract?","Is there one memorable detail, not a pile of ideas?","Will it work on vehicles, products, invoices, and a website for decades?","Does it still read when printed small and in one color?","Is it distinctive from competitors in your industry, not just from other B2B brands?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Building a B2B brand?</h2><p>I design brand identities and websites for B2B, SaaS, and professional services companies, from logo and visual identity to marketing websites that win over buyers.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What makes a good B2B logo?","answer":"A good B2B logo looks credible to buyers, works across vehicles, products, documents, and screens, and adds one memorable detail. Examples like FedEx, Deloitte, and Accenture combine a stable wordmark with a single idea, like a hidden arrow, a green dot, or an accent mark."},
  {"question":"How are B2B logos different from B2C logos?","answer":"B2B logos usually aim for credibility and longevity rather than excitement, because they sell to committees and sign long contracts. They tend to use stable wordmarks and restrained color, while B2C logos are often more playful and trend-driven."},
  {"question":"What is the hidden arrow in the FedEx logo?","answer":"The FedEx logo hides an arrow in the negative space between the E and the x. It suggests speed and forward movement, and it is one of the most famous examples of negative space in logo design."}],
 "tags":["b2b logos","b2b company logos","b2b branding","logo design","brand identity"],
})
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
e=next(x for x in idx if x['slug']=='b2b-logos')
e.update({"title":title,"description":desc,"date":"Nov 21, 2026","readTime":"15 min read","image":{"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
idx.remove(e); idx.insert(1,e)
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
