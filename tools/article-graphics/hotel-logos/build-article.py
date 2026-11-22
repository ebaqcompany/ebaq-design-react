# Writes public/content/blog/hotel-logos.json (logo roster format, full-width annotated slides).
import json, sys
sys.path.insert(0,'tools/article-graphics/hotel-logos'); import hotel
P='public/content/blog/hotel-logos.json'; old=json.load(open(P))
I='/images/blog/hotel-logos'
B=hotel.B
boards=[("hotel-logos-01-global-hotel-groups","Global hotel group logos, 01 to 09: Marriott, Hilton, Hyatt, IHG, Accor, Wyndham, Radisson, Best Western, Holiday Inn"),
 ("hotel-logos-02-luxury-hotel-brands","Luxury hotel brand logos, 10 to 18: The Ritz-Carlton, Four Seasons, St. Regis, Waldorf Astoria, Mandarin Oriental, The Peninsula, Rosewood, Aman, Belmond"),
 ("hotel-logos-03-upscale-hotel-brands","Upscale hotel brand logos, 19 to 27: Sheraton, Westin, InterContinental, Conrad, Fairmont, Kempinski, Shangri-La, Sofitel, Grand Hyatt"),
 ("hotel-logos-04-lifestyle-and-boutique-hotels","Lifestyle and boutique hotel logos, 28 to 36: W Hotels, Ace Hotel, Edition, 1 Hotels, Kimpton, Hotel Indigo, The Hoxton, citizenM, Moxy"),
 ("hotel-logos-05-resorts-and-iconic-hotels","Resort and iconic hotel logos, 37 to 45: Six Senses, One&Only, Banyan Tree, Club Med, Atlantis, Raffles, The Savoy, The Plaza, Jumeirah")]
title="45 Best Hotel Logos Explained by a Brand Designer [2026]"
desc="45 hotel logos explained by a brand designer: global chains like Marriott and Hilton, luxury and 5-star brands like Four Seasons and Aman, boutique hotels, and iconic resorts."
hero_alt="Hotel general manager in a luxury lobby looking at a screen showing 45 hotel brand logos"
post=dict(old); post.pop('body',None)
post.update({"title":title,"date":"Nov 22, 2026","readTime":"16 min read","description":desc,"categorySlug":"logo-design",
 "image":{"src":f"{I}/hotel-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/hotel-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/hotel-logos-hero-og.webp"},
 "intro":f'<p>A hotel logo appears on the building, the key card, the bathrobe, the booking app, and the bill, so it has to feel welcoming, trustworthy, and a little aspirational. The best hotel logos <strong>signal the price point in a split second</strong>, from a friendly chain to a 5-star luxury brand.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/hotel-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-hotel-logo">What makes a good hotel logo?</h2><p><strong>The right level of formality:</strong> budget and midscale chains use bold, friendly type that reads from the highway, while luxury hotels use thin serifs, crests, and lots of white space.</p><p><strong>A symbol that works small:</strong> a monogram, crest, or emblem has to work on a key card, a pillow, and an app icon, like the Hilton H, the Ritz-Carlton lion, or the Mandarin Oriental fan.</p><p><strong>A story of place or heritage:</strong> many hotel logos borrow from their origins, like the traveller\'s palm of Raffles in Singapore or the Four Seasons tree.</p><p>Below are 45 hotel logos in five groups: global hotel groups, luxury hotel brands, upscale brands, lifestyle and boutique hotels, and resorts and iconic hotels. Each logo has a slide with my handwritten notes and a short explanation. If you are building a premium hospitality brand, see how I approach <a href="/luxury-branding">luxury branding</a>, and read my guides to <a href="/blog/monogram-logo-design">monogram logos</a>, <a href="/blog/wordmark-logo-design">wordmark logos</a>, and <a href="/blog/branding-process">the branding process</a>.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/hotel-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"45 hotel logos",
  "listIntro":["The boards below show all 45 hotel logos in one consistent format, grouped into global groups, luxury brands, upscale brands, lifestyle and boutique hotels, and resorts and iconic hotels.","Each logo is reviewed for its design decisions, not for the hotels' size, service, or star rating."],
  "sectionNames":["Global hotel groups","Luxury hotel brands","Upscale hotel brands","Lifestyle and boutique hotels","Resorts and iconic hotels"],
  "sectionIntroductions":["The biggest hotel companies need logos that work on thousands of buildings, highway signs, and loyalty apps, so they favour bold type and strong colour.","Luxury and 5-star hotel brands rely on crests, monograms, and refined serifs that feel like a private club.","Upscale brands sit between the chains and the palaces, mixing classic serifs and scripts with a signature colour.","Lifestyle and boutique hotels behave more like fashion or music brands, with playful type, single letters, and bold colour.","Resorts and iconic hotels borrow from their place: palms, trees, tridents, crests, and the cities they made famous."],
  "sectionBridge":["This is a visual comparison of hotel logos, not a ranking of hotels.","Look at how each logo uses type, a symbol, or colour to signal its price point and personality."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look on a key card, a building sign, and a booking app."]],
  "findings":[{"heading":"Luxury hotels whisper, chains shout","text":"Four Seasons, Aman, Rosewood, and The Savoy use thin, spaced type and quiet colours, while Holiday Inn, Best Western, and Wyndham use bold, friendly letters that read from the road."},{"heading":"Crests and monograms signal heritage","text":"The Ritz-Carlton lion, the St. Regis monogram, the Waldorf Astoria WA, and the Plaza crest borrow from heraldry to suggest a long, aristocratic history."},{"heading":"Boutique hotels think like fashion brands","text":"W Hotels, Edition, Ace Hotel, and citizenM use single letters, magazine-style serifs, sign-like frames, and bold colour to attract a design-minded audience."},{"heading":"Place is a powerful idea","text":"Raffles' traveller's palm, the Banyan Tree illustration, the Club Med trident, and the Shangri-La mountain all tie the brand to a destination."}],
  "checklistHeading":"A practical checklist for a hotel logo",
  "checklistItems":["Does the logo signal the right price point, from friendly midscale to 5-star luxury?","Does it work on a building sign, a key card, a robe, and an app icon?","Is there a monogram or symbol that can stand alone on amenities and small items?","Does it reflect the place, heritage, or personality of the hotel?","Will it still look right when printed in one colour, embossed, or embroidered?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Branding a hotel or hospitality business?</h2><p>I design brand identities and websites for hotels, restaurants, and luxury hospitality brands, from logos and monograms to signage, amenities, and booking websites.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What makes a good hotel logo?","answer":"A good hotel logo signals the right price point, works on everything from building signs to key cards and apps, and has a memorable symbol or wordmark. Luxury hotels usually use refined serifs and crests, while midscale chains use bold, friendly type."},
  {"question":"What do 5-star hotel logos have in common?","answer":"Most 5-star and luxury hotel logos use thin serif or widely spaced capitals, lots of white space, and a crest, monogram, or emblem, like The Ritz-Carlton lion, the Four Seasons tree, or the Mandarin Oriental fan. Colour is usually limited to black, gold, or one muted tone."},
  {"question":"Should a hotel logo have a symbol?","answer":"A symbol helps when the logo needs to appear on small items like key cards, pillows, toiletries, and app icons. Many hotels pair a full wordmark with a monogram or emblem that can stand on its own, like Hilton, Sheraton, and St. Regis."},
  {"question":"What colours do hotel logos use?","answer":"Luxury hotels favour black, gold, and soft neutrals, while big chains use strong blues, greens, and reds that stand out on signs and in booking apps. Lifestyle brands like Moxy and citizenM use bolder colours to look young and energetic."},
  {"question":"How much does a hotel logo cost?","answer":"A professional hotel logo and brand identity from an experienced designer usually costs from a few thousand dollars for a small boutique hotel to much more for a full hospitality brand system with signage and amenities. The final cost depends on the scope, the number of applications, and the research involved."}],
 "tags":["hotel logos","hotel logo","luxury hotel logos","5 star hotel logos","hospitality branding","logo design"],
})
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
e=next(x for x in idx if x['slug']=='hotel-logos')
e.update({"title":title,"description":desc,"date":"Nov 22, 2026","readTime":"16 min read","categorySlug":"logo-design","image":{"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
idx.remove(e); idx.insert(1,e)
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
