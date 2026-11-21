# Writes public/content/blog/tech-startup-logos.json (logo roster format, full-width annotated slides).
import json, sys
sys.path.insert(0,'tools/article-graphics/tech-logos'); import techs
P='public/content/blog/tech-startup-logos.json'; old=json.load(open(P))
I='/images/blog/tech-startup-logos'
B=techs.B
boards=[("tech-logos-01-big-tech","Big Tech company logos, 01 to 09"),("tech-logos-02-software-and-cloud","Software and cloud company logos, 10 to 18"),("tech-logos-03-consumer-apps-and-social","Consumer app and social media logos, 19 to 27"),("tech-logos-04-hardware-and-chips","Hardware and chip company logos, 28 to 36"),("tech-logos-05-ai-and-tech-startups","AI and tech startup logos, 37 to 45")]
title="Best Tech Logos: 45 Famous Tech Company & Startup Logos Explained [2026]"
desc="45 tech company logos explained by a brand designer, from Apple, Google, and Microsoft to Spotify, Nvidia, OpenAI, and Stripe."
hero_alt="Founder looking at a wall of 45 tech company logos in a modern tech office"
post=dict(old); post.pop('body',None)
post.update({"title":title,"date":"Nov 21, 2026","readTime":"15 min read","description":desc,
 "image":{"src":f"{I}/tech-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/tech-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/tech-logos-hero-og.webp"},
 "intro":f'<p>Tech logos live on app icons, browser tabs, phones, and billboards, so the best ones are <strong>simple enough to read at 16 pixels and distinctive enough to own a color or a shape</strong>.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/tech-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-tech-logo">What makes a good tech logo?</h2><p><strong>Simplicity:</strong> the strongest tech logos, from the Apple apple to the Meta loop, work as a single shape on a tiny screen.</p><p><strong>Color:</strong> many tech brands own one color, like Spotify green, Netflix red, or Stripe purple, so they are recognizable even without the name.</p><p><strong>Typography:</strong> custom typefaces, like Google\'s geometric sans or Uber\'s own font, keep wordmarks consistent across products and languages.</p><p>Below are 45 tech company logos in five groups, from Big Tech to AI and startups. Each one has a slide with my handwritten notes, followed by a short explanation.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/tech-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"45 famous tech company logos",
  "listIntro":["The boards below show all 45 tech logos in one consistent format, grouped into Big Tech, software, consumer apps, hardware, and AI and startups.","Each logo is reviewed for its design decisions, not for the company's size or products."],
  "sectionNames":["Big Tech","Software and cloud","Consumer apps and social","Hardware and chips","AI and tech startups"],
  "sectionIntroductions":["The biggest tech companies have some of the most recognizable logos in the world, most of them built around one simple symbol or one strong color.","Software companies sell something invisible, so their logos often use simple metaphors like a cloud, a box, or a shopping bag.","Consumer apps live on home screens, so their logos are designed to work first as a small, colorful app icon.","Hardware and chip makers lean on bold wordmarks and engineering-inspired details.","AI companies and newer startups favor minimal, often black-and-white identities that feel calm and precise."],
  "sectionBridge":["This is a visual comparison of tech logos, not a ranking of companies.","Look at how each logo works as a tiny app icon and how much of it is symbol, color, or type."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo holds up when reduced to an app icon."]],
  "findings":[{"heading":"One shape beats a detailed illustration","text":"Apple, Vercel, and Meta prove that a single simple shape can carry a global brand on any screen."},{"heading":"Owning a color is a shortcut to recognition","text":"Spotify green, Netflix red, Stripe purple, and Snapchat yellow are recognizable even before you read the name."},{"heading":"Wordmarks keep getting simpler","text":"Uber, Intel, and Google have all simplified their wordmarks to work better on small, high-density screens."},{"heading":"AI brands are going quiet","text":"OpenAI, Anthropic, and Linear use black-and-white identities that feel calm and precise rather than flashy."}],
  "checklistHeading":"A practical checklist for a new tech logo",
  "checklistItems":["Does the logo still read as a 16-pixel favicon and an app icon?","Is there one simple, ownable shape?","Can you own a color in your category?","Does the wordmark work in light and dark mode?","Will it still feel right after your product changes?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Building a tech startup brand?</h2><p>I design brand identities and websites for SaaS, AI, and tech startups, from logo and app icon to the full identity system and website.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>get in touch</strong></a> to discuss your project.</p>"},
 "tags":["tech logos","tech company logos","startup logos","logo design","brand identity"],
})
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
e=next(x for x in idx if x['slug']=='tech-startup-logos')
e.update({"title":title,"description":desc,"date":"Nov 21, 2026","readTime":"15 min read","image":{"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
idx.remove(e); idx.insert(1,e)
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
