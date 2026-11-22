# Writes public/content/blog/venture-capital-logos.json (logo roster format, full-width annotated slides) and its index entry.
import json, sys
sys.path.insert(0,'tools/article-graphics/vc-logos'); import vc
P='public/content/blog/venture-capital-logos.json'; old=json.load(open('public/content/blog/gym-logos.json')); old={k:old[k] for k in ('category','author','categorySlug') if k in old}; old.update({'slug':'venture-capital-logos','url':'/blog/venture-capital-logos'})
I='/images/blog/venture-capital-logos'
B=vc.B
boards=[("venture-capital-logos-01-silicon-valley-legends","Silicon Valley venture capital logos, 01 to 09: Sequoia Capital, Andreessen Horowitz, Accel, Benchmark, Kleiner Perkins, Greylock, Lightspeed, Index Ventures, General Catalyst"),
 ("venture-capital-logos-02-seed-funds-and-accelerators","Seed fund and accelerator logos, 10 to 18: Y Combinator, First Round Capital, Founders Fund, Union Square Ventures, Initialized Capital, Techstars, 500 Global, Pear VC, SV Angel"),
 ("venture-capital-logos-03-growth-and-multistage-investors","Growth and multistage investor logos, 19 to 27: Tiger Global, Coatue, IVP, Bessemer Venture Partners, Battery Ventures, Thrive Capital, Lux Capital, NEA, Ribbit Capital"),
 ("venture-capital-logos-04-european-and-global-venture-firms","European and global venture firm logos, 28 to 36: Atomico, Balderton Capital, Northzone, Creandum, Seedcamp, Point Nine, HongShan, SoftBank Vision Fund, Peak XV Partners"),
 ("venture-capital-logos-05-specialist-and-design-led-vcs","Specialist venture capital logos, 37 to 45: Khosla Ventures, Spark Capital, CRV, Felicis, Redpoint, GV, 8VC, Mayfield, Emergence Capital")]
title="45 Best Venture Capital Logos Explained by a Brand Designer [2026]"
desc="45 venture capital firm logos explained by a brand designer: Silicon Valley legends like Sequoia, a16z and Accel, seed funds like Y Combinator, growth investors, European VCs, and specialist firms."
hero_alt="Startup demo day stage with a backdrop of Sequoia, Andreessen Horowitz, Accel, Y Combinator and other venture capital logos"
post=dict(old); post.pop('body',None)
post.update({"title":title,"date":"Nov 22, 2026","readTime":"16 min read","description":desc,"categorySlug":"logo-design",
 "image":{"src":f"{I}/venture-capital-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/venture-capital-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/venture-capital-logos-hero-og.webp"},
 "intro":f'<p>A venture capital logo has a strange job. It has to win the trust of pension funds and university endowments that give the firm money, and at the same time feel exciting to young founders choosing who to take money from. It shows up on term sheets, demo day banners, podcasts, founder hoodies and the \"backed by\" section of every startup website. The best venture capital logos are <strong>simple, confident and founder-friendly</strong>.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/venture-capital-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-venture-capital-logo">What makes a good venture capital logo?</h2><p><strong>It looks like the startups it backs:</strong> many VC firms now look more like tech brands than banks, with modern sans serifs, bright colour and app-like icons, from Y Combinator\'s orange square to Union Square Ventures\' green tile.</p><p><strong>It works small:</strong> a VC logo often appears in a row of investor logos on a startup\'s website, so it has to stay readable at a tiny size next to its competitors.</p><p><strong>It tells a short story:</strong> trees, mountains, numbers and Latin words, like Sequoia, Greylock, First Round, Point Nine and Felicis, give a firm something to talk about.</p><p>Below are 45 venture capital logos in five groups: Silicon Valley legends, seed funds and accelerators, growth and multistage investors, European and global firms, and specialist VCs. Each logo has a slide with my handwritten notes and a short explanation. For more finance brands, see my <a href="/blog/private-equity-logos">private equity logos</a>, <a href="/blog/investment-firm-logos">investment firm logos</a> and <a href="/blog/fintech-logos">fintech logos</a>, and for founders, my <a href="/blog/tech-startup-logos">tech startup logos</a> and <a href="/blog/saas-logos">SaaS logos</a>.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/venture-capital-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"45 venture capital logos",
  "listIntro":["The boards below show all 45 venture capital logos in one consistent format, grouped into Silicon Valley legends, seed funds and accelerators, growth investors, European and global firms, and specialist VCs.","Each logo is reviewed for its design decisions, not for the returns, size or reputation of the firm."],
  "sectionNames":["Silicon Valley legends","Seed funds and accelerators","Growth and multistage investors","European and global venture firms","Specialist and design-led VCs"],
  "sectionIntroductions":["The firms that built Silicon Valley mostly use confident wordmarks, often with a small symbol tied to their name, like Sequoia's tree or Greylock's mountain.","Seed investors and accelerators speak directly to founders, so their logos are the most playful, with app icons, cursors, pears and halos.","Growth investors sit closer to Wall Street, mixing serif type and initials with a few bold, modern marks.","European and global firms often look calmer and more design-led, with lowercase type, careful spacing and small colour accents.","Specialist VCs use the simplest marks of all: single letters, numbers and short initials that work as icons."],
  "sectionBridge":["This is a visual comparison of venture capital logos, not a ranking of firms.","Look at how each logo uses type, colour and one symbol to speak to both investors and founders."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look in a row of investor logos on a startup website."]],
  "findings":[{"heading":"VCs look like tech brands","text":"Y Combinator, Union Square Ventures, Techstars, Initialized and Felicis use app-like icons, bright colour and modern type to feel like the startups they fund."},{"heading":"Names tell a story","text":"Sequoia, Greylock, Peak XV, Point Nine, Felicis and Lux turn trees, mountains, numbers and Latin words into memorable brands."},{"heading":"Initials and numbers work small","text":"NEA, CRV, GV, IVP, 8VC and 500 Global use short marks that stay readable in a tiny row of investor logos."},{"heading":"Old firms keep it quiet","text":"Benchmark, Kleiner Perkins, Coatue and Northzone rely on spaced capitals and almost no symbol, which signals experience and confidence."}],
  "checklistHeading":"A practical checklist for a venture capital logo",
  "checklistItems":["Does it appeal to founders as well as to the investors in your fund?","Is it readable in a row of investor logos on a startup website?","Is there a short mark or icon that works on social media and podcasts?","Does the name or symbol give you a story to tell?","Will it still work in one colour, on a hoodie, a sticker or a term sheet?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Launching or rebranding a venture capital fund?</h2><p>I design brand identities for investment firms and startups, from logos and websites to pitch decks and fund materials.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p><p><small>Cover photo: <a href=\"https://commons.wikimedia.org/wiki/File:Sand_hill_road_sign.jpg\" rel=\"nofollow\">Sand Hill Road sign</a> by Steven Damron, <a href=\"https://creativecommons.org/licenses/by/2.0\" rel=\"nofollow\">CC BY 2.0</a>, via Wikimedia Commons, cropped and used in a collage.</small></p>"},
 "faq":[
  {"question":"What makes a good venture capital logo?","answer":"A good venture capital logo is simple, confident and founder-friendly. It stays readable at small sizes in a row of investor logos, and it often has a short story behind it, like Sequoia's tree or Greylock's mountain."},
  {"question":"What are the most famous venture capital logos?","answer":"The most recognised venture capital logos include Sequoia Capital, Andreessen Horowitz, Accel, Benchmark, Kleiner Perkins, Greylock, Lightspeed, Index Ventures, Y Combinator and Founders Fund."},
  {"question":"How are VC logos different from private equity logos?","answer":"Private equity logos usually look like banks or law firms, with serif type and navy colour. Venture capital logos are more playful and modern, because VC firms compete to win founders as well as investors."},
  {"question":"Should a new VC fund use a symbol in its logo?","answer":"A simple symbol or short mark helps a new fund stand out on startup websites, social media and podcasts. Many successful newer firms, like Y Combinator, Felicis and Point Nine, rely on one clear icon."},
  {"question":"How much does a venture capital logo cost?","answer":"A professional VC brand identity usually costs from several thousand dollars for a new fund to much more for a firm that needs a full identity, website, portfolio pages and fund materials."}],
 "tags":["venture capital logos","vc logos","venture capital firm logos","investment firm logos","logo design"],
})
# Never override a custom collage cover saved from tools/cover-generator: keep its card/OG image, hero stays in the intro.
import os
if os.path.exists('public/images/blog/venture-capital-logos/cover-collage.webp'):
    C='/images/blog/venture-capital-logos'; post['image']={**post['image'],"src":f"{C}/cover-collage.webp","thumbnail":f"{C}/cover-collage-768w.webp"}; post['seo']['image']=f"{C}/cover-collage-og.webp"
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
idx=[x for x in idx if x['slug']!='venture-capital-logos']
g=next(x for x in idx if x['slug']=='gym-logos')
e={k:g[k] for k in g if k in ('category','categorySlug')}
e.update({"slug":"venture-capital-logos","url":"/blog/venture-capital-logos","title":title,"description":desc,"date":"Nov 22, 2026","readTime":"16 min read","categorySlug":"logo-design","image":{"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
idx.insert(1,e)
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
