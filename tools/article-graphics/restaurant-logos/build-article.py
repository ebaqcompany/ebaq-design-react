# Writes public/content/blog/restaurant-logos.json (logo roster format, full-width annotated slides).
import json, sys
sys.path.insert(0,'tools/article-graphics/restaurant-logos'); import restaurant
P='public/content/blog/restaurant-logos.json'; old=json.load(open('public/content/blog/gym-logos.json')); old={k:old[k] for k in ('category','author','categorySlug') if k in old}; old.update({'slug':'restaurant-logos','url':'/blog/restaurant-logos'})
I='/images/blog/restaurant-logos'
B=restaurant.B
boards=[("restaurant-logos-01-fast-food-icons","Fast food logos, 01 to 09: McDonald's, Burger King, KFC, Taco Bell, Wendy's, Subway, Pizza Hut, Domino's, Chick-fil-A"),
 ("restaurant-logos-02-fast-casual-restaurants","Fast casual restaurant logos, 10 to 18: Chipotle, Shake Shack, Sweetgreen, Panera Bread, Five Guys, In-N-Out Burger, Cava, Pret A Manger, Nando's"),
 ("restaurant-logos-03-coffee-shops-and-bakeries","Coffee shop and bakery logos, 19 to 27: Starbucks, Dunkin', Tim Hortons, Blue Bottle Coffee, Krispy Kreme, Costa Coffee, Peet's Coffee, Ladurée, Le Pain Quotidien"),
 ("restaurant-logos-04-casual-dining-chains","Casual dining restaurant logos, 28 to 36: Olive Garden, Applebee's, Chili's, The Cheesecake Factory, Texas Roadhouse, IHOP, Denny's, Hard Rock Cafe, Outback Steakhouse"),
 ("restaurant-logos-05-fine-dining-and-iconic-restaurants","Fine dining and iconic restaurant logos, 37 to 45: Nobu, Carbone, Eleven Madison Park, Noma, Le Bernardin, Balthazar, Hakkasan, Zuma, The Ivy")]
title="45 Restaurant Logos Explained"
desc="45 restaurant logos explained by a brand designer: fast food icons like McDonald's and KFC, fast casual and coffee brands, casual dining chains, and fine dining restaurants like Nobu and Noma."
hero_alt="Chef in a modern restaurant looking at a screen showing 45 restaurant logos"
post=dict(old); post.pop('body',None)
post.update({"title":title,"date":"Nov 22, 2026","readTime":"16 min read","description":desc,"categorySlug":"logo-design",
 "image":{"src":f"{I}/restaurant-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/restaurant-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/restaurant-logos-hero-og.webp"},
 "intro":f'<p>A restaurant logo has to work on a storefront sign, a menu, a coffee cup, a delivery bag, and a tiny app icon, and it has to make people hungry or curious in a second. The best restaurant logos are <strong>simple, warm, and full of personality</strong>, and they tell you what kind of experience to expect, from a quick burger to a tasting menu.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/restaurant-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-restaurant-logo">What makes a good restaurant logo?</h2><p><strong>The right price signal:</strong> fast food logos use bold colours and friendly shapes, while fine dining restaurants use thin type, lots of white space, and almost no colour.</p><p><strong>A symbol that works everywhere:</strong> the McDonald\'s arches, the Starbucks siren, and the Chipotle pepper work on cups, bags, signs, and app icons without the name.</p><p><strong>A story about the food or the founder:</strong> many restaurant logos use the founder\'s name or face, like KFC and Wendy\'s, or a simple visual pun, like the Domino\'s tile and the Applebee\'s apple.</p><p>Below are 45 restaurant logos in five groups: fast food icons, fast casual restaurants, coffee shops and bakeries, casual dining chains, and fine dining restaurants. Each logo has a slide with my handwritten notes and a short explanation. If you are opening a restaurant, see my <a href="/blog/branding-checklist">branding checklist</a> and my guides to <a href="/blog/brand-slogans">brand slogans</a> and <a href="/blog/logo-color">logo colours</a>.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/restaurant-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"45 restaurant logos",
  "listIntro":["The boards below show all 45 restaurant logos in one consistent format, grouped into fast food, fast casual, coffee and bakeries, casual dining, and fine dining.","Each logo is reviewed for its design decisions, not for the food, size, or popularity of the restaurant."],
  "sectionNames":["Fast food icons","Fast casual restaurants","Coffee shops and bakeries","Casual dining chains","Fine dining and iconic restaurants"],
  "sectionIntroductions":["The biggest fast food brands have some of the most recognised logos in the world, built on bold colour, simple symbols, and friendly type.","Fast casual restaurants look more modern and premium than fast food, with cleaner type, natural colours, and simple icons.","Coffee shops and bakeries live on cups, bags, and boxes, so their logos are compact, warm, and easy to stamp or print.","Casual dining chains want to feel like a neighbourhood restaurant, so they use scripts, illustrations, and badge shapes.","Fine dining restaurants use quiet, refined logos that feel more like fashion houses than food brands."],
  "sectionBridge":["This is a visual comparison of restaurant logos, not a ranking of restaurants.","Look at how each logo uses type, colour, and one symbol to signal its price point and personality."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look on a storefront, a cup, and a delivery app."]],
  "findings":[{"heading":"Red and yellow mean fast food","text":"McDonald's, Burger King, KFC, Wendy's, Pizza Hut, and In-N-Out all use red, yellow, or orange, colours that stand out on highways and feel energetic."},{"heading":"Founders and puns make logos memorable","text":"KFC shows Colonel Sanders, Wendy's is named after the founder's daughter, and Domino's, Applebee's, and Taco Bell use simple visual puns."},{"heading":"Coffee brands rely on one symbol","text":"Starbucks, Blue Bottle, and Peet's work as small icons on cups, which is why Starbucks dropped its name from the logo in 2011."},{"heading":"Fine dining whispers","text":"Noma, Le Bernardin, Eleven Madison Park, and The Ivy use thin or simple type with no colour, which signals quality and restraint."}],
  "checklistHeading":"A practical checklist for a restaurant logo",
  "checklistItems":["Does the logo signal the right price point, from quick service to fine dining?","Does it work on a storefront sign, a menu, a cup, and a delivery app icon?","Is there a simple symbol or monogram that can stand alone on packaging?","Does the colour fit the food and the experience?","Will it still work in one colour, printed on a napkin, bag, or stamp?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Opening or rebranding a restaurant?</h2><p>I design brand identities for restaurants, cafes, and hospitality brands, from logos and menus to signage, packaging, and websites.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What makes a good restaurant logo?","answer":"A good restaurant logo is simple, memorable, and matches the price point and personality of the restaurant. It works on signs, menus, cups, bags, and delivery apps, and it often has a symbol that can stand alone, like the McDonald's arches or the Starbucks siren."},
  {"question":"What colours are best for a restaurant logo?","answer":"Fast food brands use red, yellow, and orange because they are energetic and visible from far away. Healthy and fresh brands like Sweetgreen use green, coffee brands often use warm or dark tones, and fine dining restaurants usually stick to black and white."},
  {"question":"What are the most famous restaurant logos?","answer":"The most famous restaurant logos include McDonald's, Starbucks, KFC, Burger King, Subway, Domino's, Pizza Hut, Taco Bell, Wendy's, and Dunkin'. Most of them use a strong symbol, bold colour, or the founder's name."},
  {"question":"Should a restaurant logo include food?","answer":"Not always. A simple food symbol can work, like the Chipotle pepper or the Shake Shack burger, but many of the best restaurant logos use a name, a monogram, or an abstract symbol instead. Fine dining restaurants rarely show food in their logos."},
  {"question":"How much does a restaurant logo cost?","answer":"A professional restaurant logo and brand identity usually costs from a few thousand dollars for a small independent restaurant to much more for a chain with menus, signage, packaging, and a website. The cost depends on the scope and the number of applications."}],
 "tags":["restaurant logos","restaurant logo design","fast food logos","coffee shop logos","cafe logos","logo design"],
})
# Never override a custom collage cover saved from tools/cover-generator: keep its card/OG image, hero stays in the intro.
import os
if os.path.exists('public/images/blog/restaurant-logos/cover-collage.webp'):
    C='/images/blog/restaurant-logos'; post['image']={**post['image'],"src":f"{C}/cover-collage.webp","thumbnail":f"{C}/cover-collage-768w.webp"}; post['seo']['image']=f"{C}/cover-collage-og.webp"
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
idx=[x for x in idx if x['slug']!='restaurant-logos']
g=next(x for x in json.load(open('public/content/blog/index.json')) if x['slug']=='gym-logos')
e={k:g[k] for k in g if k in ('category','categorySlug')}
e.update({"slug":"restaurant-logos","url":"/blog/restaurant-logos","title":title,"description":desc,"date":"Nov 22, 2026","readTime":"16 min read","categorySlug":"logo-design","image":{"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
idx.insert(1,e)
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
