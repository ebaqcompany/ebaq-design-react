# Writes public/content/blog/bank-logos.json (logo roster format, full-width annotated slides).
import json, sys
sys.path.insert(0,'tools/article-graphics/bank-logos'); import banks
P='public/content/blog/bank-logos.json'; old=json.load(open(P))
I='/images/blog/bank-logos'
B=banks.B
boards=[("bank-logos-01-big-us-banks","Big US bank logos, 01 to 09"),("bank-logos-02-european-banks","European bank logos, 10 to 18"),("bank-logos-03-banks-around-the-world","Bank logos from around the world, 19 to 27"),("bank-logos-04-investment-banks-and-wealth-managers","Investment bank and wealth manager logos, 28 to 36"),("bank-logos-05-digital-banks-and-neobanks","Digital bank and neobank logos, 37 to 45")]
title="45 Bank Logos Explained"
desc="45 bank logos with names and meanings, from Chase, Bank of America, and HSBC to Revolut and Monzo, each annotated by a brand designer."
hero_alt="Bank executives reviewing a wall of 45 bank logos in a boardroom"
post=dict(old); post.pop('body',None)
post.update({"title":title,"date":"Nov 21, 2026","readTime":"15 min read","description":desc,
 "image":{"src":f"{I}/bank-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/bank-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/bank-logos-hero-og.webp"},
 "intro":f'<p>Banks sell something you cannot see or touch, so their logos carry a lot of weight: they have to signal <strong>safety, stability, and trust</strong> on cards, apps, branches, and statements, often for decades.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/bank-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-bank-logo">What makes a good bank logo?</h2><p><strong>Color:</strong> blue dominates because it reads as calm and trustworthy, so the banks that stand out usually own a different color, like TD green, Santander red, Monzo coral, or Nubank purple.</p><p><strong>Typography:</strong> traditional and investment banks lean on serif or heavy uppercase type for authority, while digital banks use rounded, lowercase wordmarks to feel friendly.</p><p><strong>Symbols:</strong> the most memorable bank logos pair the name with one simple, ownable shape, such as the Chase octagon, the HSBC hexagon, or the Deutsche Bank slash.</p><p>Below are 45 bank logos in five groups. Each one has a slide with my handwritten notes on what the logo does, followed by a short explanation.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/bank-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"45 bank logos with names and meanings",
  "listIntro":["The boards below show all 45 bank logos in one consistent format, grouped into big US banks, European banks, banks around the world, investment banks, and digital banks.","Each logo is reviewed for its design decisions, not for the bank's size, products, or performance."],
  "sectionNames":["Big US banks","European banks","Banks around the world","Investment banks and wealth managers","Digital banks and neobanks"],
  "sectionIntroductions":["America's biggest banks have some of the most recognizable logos in the country, many of them decades old and built around a single strong symbol.","European banks often carry long histories, from the HSBC house flag to the ING lion, and their logos show how heritage can be modernized.","From Canada to Australia, Singapore, Japan, and Brazil, these banks show how color and symbols travel across cultures.","Investment banks and wealth managers sell judgment and discretion, so their logos tend to rely on restrained, typographic wordmarks.","Digital banks compete for attention in app stores and on social media, so their logos are bolder, brighter, and friendlier than traditional banks."],
  "sectionBridge":["This is a visual comparison of bank logos, not a ranking of banks.","Look at how each logo handles color, typography, and symbol, and how it works on a card or an app icon."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo holds up when reduced to an app icon."]],
  "findings":[{"heading":"Owning a color beats blending in","text":"Most banks use blue, so the ones people remember own a different color: TD green, Santander red, Monzo coral, Nubank purple, Fidelity green."},{"heading":"One simple symbol lasts for decades","text":"The Chase octagon (1961), the Deutsche Bank slash (1974), and the HSBC hexagon (1983) show that a simple geometric symbol can outlive several rebrands."},{"heading":"Heritage can be modernized","text":"Barclays' eagle, ING's lion, and UBS's keys keep their history while being redrawn for screens."},{"heading":"Digital banks trade authority for friendliness","text":"Chime, Monzo, Nubank, and Ally use rounded lowercase type and bright colors to feel approachable, the opposite of the serif capitals used by investment banks."}],
  "checklistHeading":"A practical checklist for a new bank or fintech logo",
  "checklistItems":["Can you own a color that is not another bank's blue?","Does the logo work as a tiny app icon and on a payment card?","Is there one simple, ownable shape or letterform?","Does the typography match your tone: authority or friendliness?","Will it still feel right in 10 years, not just this year?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Building a new bank or fintech brand?</h2><p>I design brand identities and websites for fintech and financial startups, from naming and logo to the full identity system and app-ready icon set.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>get in touch</strong></a> to discuss your project.</p>"},
 "tags":["bank logos","bank logos with names","bank symbols","fintech logos","logo design","brand identity"],
})
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
e=next(x for x in idx if x['slug']=='bank-logos')
e.update({"title":title,"description":desc,"date":"Nov 21, 2026","readTime":"15 min read","image":{"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
idx.remove(e); idx.insert(1,e)
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
