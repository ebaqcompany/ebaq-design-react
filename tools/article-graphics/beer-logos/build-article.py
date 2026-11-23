# Writes public/content/blog/beer-logos.json (logo roster format, full-width annotated slides) and its index entry.
import json, sys
sys.path.insert(0,'tools/article-graphics/beer-logos'); import beer
P='public/content/blog/beer-logos.json'; old=json.load(open('public/content/blog/gym-logos.json')); old={k:old[k] for k in ('category','author','categorySlug') if k in old}; old.update({'slug':'beer-logos','url':'/blog/beer-logos'})
I='/images/blog/beer-logos'
B=beer.B
boards=[("beer-logos-01-global-beer-icons","Global beer logos, 01 to 09: Budweiser, Heineken, Corona, Stella Artois, Guinness, Carlsberg, Coors Light, Miller Lite, Michelob Ultra"),
 ("beer-logos-02-european-brewing-classics","European beer logos, 10 to 18: Pilsner Urquell, Beck's, Peroni, Amstel, Hoegaarden, Paulaner, Grolsch, Duvel, Chimay"),
 ("beer-logos-03-asian-and-latin-american-beers","Asian and Latin American beer logos, 19 to 27: Asahi, Kirin, Sapporo, Tsingtao, Tiger, Singha, Modelo, Dos Equis, Tecate"),
 ("beer-logos-04-american-craft-breweries","American craft brewery logos, 28 to 36: Sierra Nevada, Samuel Adams, Lagunitas, Dogfish Head, Stone Brewing, New Belgium, Goose Island, Brooklyn Brewery, Founders"),
 ("beer-logos-05-design-led-independent-breweries","Independent brewery logos, 37 to 45: BrewDog, Mikkeller, Omnipollo, Athletic Brewing, Beavertown, Cloudwater, Other Half, Garage Project, To Øl")]
title="45 Beer Logos Explained"
desc="45 beer logos explained by a brand designer: global icons like Heineken, Guinness and Corona, European and Asian classics, American craft breweries, and design-led independents like Mikkeller and BrewDog."
hero_alt="Open supermarket beer fridge stocked with Heineken, Corona, Stella Artois, Guinness, Carlsberg, Modelo, Dos Equis, Samuel Adams and BrewDog six-packs"
post=dict(old); post.pop('body',None)
post.update({"title":title,"date":"Nov 22, 2026","readTime":"16 min read","description":desc,"categorySlug":"logo-design",
 "image":{"src":f"{I}/beer-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/beer-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/beer-logos-hero-og.webp"},
 "intro":f'<p>A beer logo has to work on a bottle label, a can, a bottle cap, a tap handle, a glass, and a sign above a bar, and it has to stand out on a crowded shelf in a second. The best beer logos are <strong>bold, full of heritage or personality, and easy to spot from across a room</strong>.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/beer-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-beer-logo">What makes a good beer logo?</h2><p><strong>A clear story of origin:</strong> many of the biggest beer brands use crests, seals, founding dates, and city names, like Stella Artois, Pilsner Urquell, Paulaner, and Beck\'s, because heritage builds trust.</p><p><strong>A symbol that works on a tap handle:</strong> the Heineken star, the Guinness harp, the Corona crown, and the Dos Equis XX can be recognised even when the name is too small to read.</p><p><strong>Personality for craft beer:</strong> independent breweries use playful mascots, hand-drawn type, and simple wordmarks that let colourful can art do the talking.</p><p>Below are 45 beer logos in five groups: global beer icons, European brewing classics, Asian and Latin American beers, American craft breweries, and design-led independent breweries. Each logo has a slide with my handwritten notes and a short explanation. If you are launching a drinks brand, see my <a href="/blog/branding-checklist">branding checklist</a> and my guides to <a href="/blog/logo-color">logo colours</a> and <a href="/blog/logo-fonts">logo fonts</a>. For hospitality brands, see my <a href="/blog/restaurant-logos">restaurant logos</a> and <a href="/blog/hotel-logos">hotel logos</a>.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/beer-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"45 beer logos",
  "listIntro":["The boards below show all 45 beer logos in one consistent format, grouped into global icons, European classics, Asian and Latin American beers, American craft breweries, and independent breweries.","Each logo is reviewed for its design decisions, not for the taste, size, or popularity of the beer."],
  "sectionNames":["Global beer icons","European brewing classics","Asian and Latin American beers","American craft breweries","Design-led independent breweries"],
  "sectionIntroductions":["The world's biggest beer brands have logos that work in every bar on the planet, built on strong symbols like stars, crowns, harps, and bowties.","European breweries lean on centuries of history, with crests, seals, monks, and founding dates that make the beer feel authentic.","Asian and Latin American beer logos use national symbols, mythical animals, and bold type to stand for their home country around the world.","The American craft beer movement brought illustrated mascots, landscapes, and badges that feel independent and local.","A new wave of independent breweries treats beer like a design brand, with simple wordmarks and bold can art that changes with every release."],
  "sectionBridge":["This is a visual comparison of beer logos, not a ranking of beers.","Look at how each logo uses type, colour, and one symbol to signal heritage, fun, or craft."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look on a label, a can, and a tap handle."]],
  "findings":[{"heading":"Heritage sells beer","text":"Stella Artois shows 1366, Pilsner Urquell, Paulaner, Chimay, and Beck's use seals and crests, and Guinness has used its harp since the 1860s, because age suggests quality."},{"heading":"One symbol does the heavy lifting","text":"The Heineken star, the Corona crown, the Sapporo star, and the Dos Equis XX all work alone on bottle caps, tap handles, and glasses."},{"heading":"Craft beer loves mascots","text":"Lagunitas has a dog, Stone a gargoyle, Dogfish Head a shark, Goose Island a goose, and BrewDog a dog badge, which makes small breweries feel personal."},{"heading":"Design-led breweries keep the logo quiet","text":"Mikkeller, Omnipollo, Cloudwater, and Other Half use simple marks because their labels change with every beer, so the logo has to stay calm and constant."}],
  "checklistHeading":"A practical checklist for a beer logo",
  "checklistItems":["Is the logo readable on a small can, a bottle cap, and a tap handle?","Does it stand out on a crowded shelf next to dozens of other beers?","Is there a symbol that can work alone on glasses, caps, and merchandise?","Does it signal the right story, from centuries of heritage to modern craft?","Will it still work in one colour, printed on a keg, a coaster, or a stamp?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Launching or rebranding a beer or drinks brand?</h2><p>I design brand identities for food, drink, and hospitality brands, from logos and labels to packaging, signage, and websites.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What makes a good beer logo?","answer":"A good beer logo is bold, readable at small sizes, and tells a clear story, whether that is centuries of heritage or a playful craft personality. It works on labels, cans, caps, tap handles, and glasses, and it often has a symbol that can stand alone, like the Heineken star or the Guinness harp."},
  {"question":"What are the most famous beer logos?","answer":"The most famous beer logos include Budweiser, Heineken, Corona, Stella Artois, Guinness, Carlsberg, Coors Light, Miller Lite, Asahi, and Modelo. Most of them use a strong symbol, like a star, crown, harp, or bowtie, together with a distinctive wordmark."},
  {"question":"Why do so many beer logos use crests and dates?","answer":"Crests, seals, and founding dates suggest tradition and quality. Brands like Stella Artois, Pilsner Urquell, Paulaner, and Chimay use them to show that their recipes and breweries have a long history."},
  {"question":"How are craft beer logos different from big beer brands?","answer":"Craft beer logos are usually more playful and personal, with hand-drawn type, mascots, and local landmarks. Many design-led breweries keep the logo simple and put most of the creativity into colourful can art that changes with each beer."},
  {"question":"How much does a beer logo cost?","answer":"A professional beer logo and brand identity usually costs from a few thousand dollars for a small brewery to much more for a brand with a full label system, packaging, merchandise, and a website. The cost depends on the scope and the number of products."}],
 "tags":["beer logos","beer logo design","brewery logos","craft beer logos","alcohol logos","logo design"],
})
# Never override a custom collage cover saved from tools/cover-generator: keep its card/OG image, hero stays in the intro.
import os
if os.path.exists('public/images/blog/beer-logos/cover-collage.webp'):
    C='/images/blog/beer-logos'; post['image']={**post['image'],"src":f"{C}/cover-collage.webp","thumbnail":f"{C}/cover-collage-768w.webp"}; post['seo']['image']=f"{C}/cover-collage-og.webp"
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
idx=[x for x in idx if x['slug']!='beer-logos']
g=next(x for x in idx if x['slug']=='gym-logos')
e={k:g[k] for k in g if k in ('category','categorySlug')}
e.update({"slug":"beer-logos","url":"/blog/beer-logos","title":title,"description":desc,"date":"Nov 22, 2026","readTime":"16 min read","categorySlug":"logo-design","image":{"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
idx.insert(1,e)
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
