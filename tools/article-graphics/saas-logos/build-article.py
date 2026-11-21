# Writes public/content/blog/saas-logos.json (logo roster format, full-width annotated slides).
import json, sys
sys.path.insert(0,'tools/article-graphics/saas-logos'); import saas
P='public/content/blog/saas-logos.json'; old=json.load(open(P))
I='/images/blog/saas-logos'
B=saas.B
boards=[("saas-logos-01-productivity-and-collaboration","Productivity and collaboration SaaS logos, 01 to 09"),("saas-logos-02-developer-and-data-tools","Developer and data tool logos, 10 to 18"),("saas-logos-03-sales-marketing-and-support","Sales, marketing, and support SaaS logos, 19 to 27"),("saas-logos-04-finance-hr-and-operations","Finance, HR, and operations SaaS logos, 28 to 36"),("saas-logos-05-ai-saas","AI SaaS logos, 37 to 45")]
title="45 Best SaaS Logos Explained by a Brand Designer [2026]"
desc="45 SaaS company logos explained by a brand designer, from Asana, HubSpot, and GitHub to Ramp, Vanta, Cursor, and ElevenLabs."
hero_alt="SaaS product team at a table looking at a screen showing 45 SaaS company logos"
post=dict(old); post.pop('body',None)
post.update({"title":title,"date":"Nov 21, 2026","readTime":"15 min read","description":desc,
 "image":{"src":f"{I}/saas-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/saas-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/saas-logos-hero-og.webp"},
 "intro":f'<p>A SaaS logo spends most of its life as a favicon, an app icon, a login screen, and a Slack integration tile, so the best ones are <strong>simple enough to read at 16 pixels and distinctive enough to stand out in a crowded tool stack</strong>.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/saas-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-saas-logo">What makes a good SaaS logo?</h2><p><strong>A symbol that works as an icon:</strong> buyers meet your logo inside other tools (integrations, browser tabs, dock icons), so a compact mark like the Asana dots or the Zapier underscore does a lot of work.</p><p><strong>Color with a job:</strong> HubSpot orange, Twilio red, and Supabase green make the product recognizable in a sidebar full of other apps.</p><p><strong>Friendly but credible type:</strong> SaaS brands sell to teams and to finance departments at the same time, so most wordmarks balance a rounded, approachable feel with clean, trustworthy proportions.</p><p>Below are 45 SaaS logos in five groups, from productivity tools to AI SaaS. Each one has a slide with my handwritten notes, followed by a short explanation.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/saas-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"45 SaaS company logos",
  "listIntro":["The boards below show all 45 SaaS logos in one consistent format, grouped into productivity, developer tools, sales and marketing, finance and HR, and AI SaaS.","Each logo is reviewed for its design decisions, not for the product's features or pricing."],
  "sectionNames":["Productivity and collaboration","Developer and data tools","Sales, marketing, and support","Finance, HR, and operations","AI SaaS"],
  "sectionIntroductions":["Productivity tools live in browser tabs all day, so their logos tend to be colorful, friendly, and built around a small, memorable symbol.","Developer brands speak to engineers, so many of them use monochrome marks, technical shapes, and confident, no-nonsense type.","Sales and marketing platforms compete for attention, and their logos often use one bright, ownable color.","Finance and HR software has to feel trustworthy, so these logos lean on bold, stable wordmarks and restrained color.","AI SaaS brands are young and moving fast, and most of them choose minimal, black-and-white identities with one distinctive detail."],
  "sectionBridge":["This is a visual comparison of SaaS logos, not a ranking of software.","Look at how each logo works as a small icon in a tool stack and how much of it is symbol, color, or type."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo holds up when reduced to a favicon or integration tile."]],
  "findings":[{"heading":"A compact symbol is a SaaS superpower","text":"Asana, Airtable, and Webflow all have marks that work alone as favicons, app icons, and integration tiles."},{"heading":"One color can carry the brand","text":"HubSpot orange, Twilio red, and Supabase green are recognizable in a sidebar before you read the name."},{"heading":"Developer brands stay monochrome","text":"GitHub, Sentry, and Retool use black-and-white identities that feel at home in a code editor or dark mode dashboard."},{"heading":"AI SaaS is going minimal","text":"Cursor, Perplexity, and ElevenLabs use quiet, precise identities with one small detail instead of flashy gradients."}],
  "checklistHeading":"A practical checklist for a new SaaS logo",
  "checklistItems":["Does the symbol still read as a 16-pixel favicon and an integration tile?","Does it work in light and dark mode?","Can you own one color in your category?","Does the wordmark feel friendly to users and credible to buyers?","Will it still fit when the product grows past its first feature?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Building a SaaS brand?</h2><p>I design brand identities and websites for SaaS, AI, and tech startups, from logo and app icon to the full identity system and marketing site.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>get in touch</strong></a> to discuss your project.</p>"},
 "tags":["saas logos","saas logo design","software logos","logo design","brand identity"],
})
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
e=next(x for x in idx if x['slug']=='saas-logos')
e.update({"title":title,"description":desc,"date":"Nov 21, 2026","readTime":"15 min read","image":{"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
idx.remove(e); idx.insert(1,e)
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
