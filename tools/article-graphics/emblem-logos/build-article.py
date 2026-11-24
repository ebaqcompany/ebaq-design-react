# Builds public/content/blog/emblem-logos.json (27 emblem and badge logos, slide format, logo quick course series) and adds its index entry.
# Run from the repo root.
import json, sys, os
sys.path.insert(0,'tools/article-graphics/emblem-logos'); import emblems as data
P='public/content/blog/emblem-logos.json'
I='/images/blog/emblem-logos'
D='tools/article-graphics/emblem-logos'
B=data.B
boards=[("emblem-logos-01-round-emblems","Round emblem logos, 01 to 09: Ford, NASA, Burger King, Hard Rock Cafe, Gulf, BMW, Nissan, Nivea, Chupa Chups"),
 ("emblem-logos-02-shields-and-crests","Shield and crest logos, 10 to 18: Harley-Davidson, NFL, Warner Bros., UPS, Harvard, Porsche, Lamborghini, FC Barcelona, TAG Heuer"),
 ("emblem-logos-03-labels-and-badges","Label and badge logos, 19 to 27: Jack Daniel's, Converse, Levi's, Patagonia, Wells Fargo, Ray-Ban, Stella Artois, LEGO, IKEA")]
title="27 Emblem Logos Explained"
desc="27 famous emblem and badge logos explained by a brand designer: seals, shields, crests and labels from Harley-Davidson, NASA and Ford to Porsche, LEGO and IKEA."
hero_alt=open(f'{D}/hero_alt.txt').read().strip()
L=lambda h,t:f'<a href="{h}">{t}</a>'
fig=lambda src,alt:f'<figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{alt}" src="{I}/{src}" width="1920" height="1080" decoding="async"/></div></figure>'
series=(f'<p><strong>Logo design quick course:</strong> this guide is part of my series on logo types. Read the others on {L("/blog/monogram-logo-design","monogram logos")}, '
 f'{L("/blog/wordmark-logo-design","wordmark logos")}, {L("/blog/lettermark-logo-design","lettermark logos")}, {L("/blog/abstract-logo-design","abstract logos")}, '
 f'{L("/blog/symmetry-logo-design","symmetry")} and {L("/blog/negative-space-logo-design","negative space")}, or start with the overview of all {L("/blog/types-of-logos","types of logos")}.</p>')
intro=(
 '<p>An emblem logo puts the brand name <strong>inside a shape</strong>: a seal, a shield, a crest or a badge. The name and the symbol are locked together, so you always see them as one piece. Think of the Harley-Davidson bar and shield, the NASA meatball or the blue Ford oval.</p>'
 + fig('emblem-logos-hero.webp',hero_alt) + series +
 '<h2 id="what-is-an-emblem-logo">What is an emblem logo?</h2>'
 '<p>An emblem is a logo where the text sits <strong>inside</strong> a symbol or frame instead of next to it. That is the difference from a combination mark. Nike can use the swoosh with or without its name, but you can\'t pull the words out of the Harley-Davidson shield without breaking the logo.</p>'
 '<p>A <strong>badge logo</strong> is the same idea, used on products: patches, labels, bottle caps and stickers. Converse\'s ankle patch, the Levi\'s batwing and the Jack Daniel\'s label are all badges. In this guide I use both words, because the design rules are the same.</p>'
 '<h2 id="where-emblems-come-from">Where emblems come from</h2>'
 '<p>Emblems are the oldest kind of logo. Long before brands, kings, cities, guilds and churches used <strong>seals, coats of arms and crests</strong> to sign documents and mark property. A wax seal pressed into a letter was an emblem: a picture and a name in one small, official shape.</p>'
 + fig('great-seal-of-the-united-states.webp','The Great Seal of the United States, an eagle with a shield and the motto E pluribus unum, adopted in 1782') +
 '<p>The Great Seal of the United States, adopted by Congress in 1782, follows the same rules: a shield, a motto on a banner and stars, all inside one circle. Universities, sports clubs and car makers later borrowed this language. That is why Harvard, FC Barcelona and Porsche still look like coats of arms, and why emblems feel <strong>official, traditional and trustworthy</strong>.</p>'
 '<h2 id="types-of-emblem-logos">Three types of emblem logos</h2>'
 '<p><strong>Round emblems:</strong> seals, roundels and ovals, like Ford, NASA and BMW. A circle feels complete and works well on wheels, caps and app icons.</p>'
 '<p><strong>Shields and crests:</strong> Harley-Davidson, the NFL, Porsche and FC Barcelona. Shields come from armour and heraldry, so they suggest strength, protection and belonging.</p>'
 '<p><strong>Labels, patches and badges:</strong> Jack Daniel\'s, Levi\'s, LEGO and IKEA. These are rectangles and tags that look like product labels, because that is where they started.</p>'
 '<h2 id="the-problem-with-emblems">The problem with emblems: small sizes</h2>'
 '<p>An emblem packs a lot into a small space, so it is the first logo type to break when it shrinks. Fine lines, small type and decorative details fill in on a bottle cap and turn to mush on an app icon. Simple badges like LEGO\'s red square still read at any size.</p>'
 + fig('emblem-logo-shrink-test.webp','Shrink test: the detailed Stella Artois emblem loses its details at app icon size, while the simple LEGO badge still reads') +
 '<p>That is why many brands have <strong>simplified their emblems</strong>. Starbucks dropped the ring with its name in 2011 and kept only the siren. BMW flattened its roundel in 2020, Nissan switched to a thin outline badge the same year, and Warner Bros. redrew its shield in 2019. When I design an emblem, I always design a small version too: a simplified mark or monogram for favicons, social profiles and embroidery.</p>'
 + fig('when-to-choose-an-emblem-logo.webp','Choose an emblem when heritage is your story, you sell merch, the logo goes on products or you want a seal of trust. Plan a small mark.') +
 '<p>Below are 27 famous emblem and badge logos, American brands first and then the rest of the world, across cars, food, sport, fashion, finance and more. Each one has a slide with my handwritten notes and a short explanation.</p>'
)
process=(
 '<h2 id="how-to-design-an-emblem-logo">How to design an emblem logo</h2>'
 + fig('how-to-design-an-emblem-logo.webp','How to design an emblem logo in four steps: pick a shape, fit the name, add one symbol, make a small mark') +
 '<p><strong>1. Pick a shape.</strong> A circle feels friendly and complete, a shield feels strong and official, and a rectangle feels like a label. Choose the shape that fits your story and where the logo will live.</p>'
 '<p><strong>2. Fit the name.</strong> Set the name inside the shape first, before any decoration. Use a bold, simple typeface, and curve it along a ring only if it stays easy to read.</p>'
 '<p><strong>3. Add one symbol.</strong> One clear idea is enough: Porsche\'s horse, Lamborghini\'s bull or Converse\'s star. More details make the emblem harder to remember and to reproduce.</p>'
 '<p><strong>4. Make a small mark.</strong> Test the emblem at 24 pixels, in one colour and as embroidery. If it breaks, design a simplified version for small sizes, like Starbucks did with its siren.</p>'
)
post={"slug":"emblem-logos","url":"/blog/emblem-logos","category":"Logo Design","categorySlug":"logo-design","author":"arek-dvornechuck-ebaqdesign",
 "title":title,"date":"Nov 23, 2026","readTime":"12 min read","description":desc,
 "image":{"src":f"{I}/emblem-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/emblem-logos-hero-768w.webp"},
 "seo":{"title":"27 Emblem and Badge Logos Explained","description":desc,"image":f"{I}/emblem-logos-hero-og.webp"},
 "intro":intro,
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/emblem-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} emblem logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"27 famous emblem logos",
  "listIntro":["The boards below show all 27 emblem and badge logos in one consistent format, grouped into round emblems, shields and crests, and labels and badges.","Each logo is reviewed for its design decisions, not for the size or success of the company behind it."],
  "sectionNames":data.G,
  "sectionIntroductions":["Circles, ovals and roundels are the friendliest emblems. The name either wraps around a ring, like BMW, or runs straight through the middle, like Nissan, Nivea and Gulf.","Shields and crests borrow from heraldry and armour. They signal strength, tradition and belonging, which is why car makers, sports leagues and universities love them.","Labels, patches and boxes started on products: bottles, jeans, sneakers and toys. They work like a stamp, so the logo looks the same on the shelf and on a T-shirt."],
  "sectionBridge":["This is a visual study of emblem logos, not a ranking of companies.","Look at how each emblem fits the name inside one shape and how much detail it can carry before it stops reading."],
  "entryFallbacks":[["The emblem locks the name and the symbol into one shape.","Notice how the logo would look on a sign, a patch and an app icon."]],
  "findings":[{"heading":"The shape tells the story","text":"Circles feel friendly and complete, shields feel strong and official, and labels feel like products."},{"heading":"Heritage is the point","text":"Porsche, Harvard, Stella Artois and Jack Daniel's use emblems to show history and tradition."},{"heading":"Emblems sell merchandise","text":"Harley-Davidson, NASA, Hard Rock Cafe and the NFL earn money from patches, caps and T-shirts."},{"heading":"Simple badges survive","text":"LEGO, IKEA, Wells Fargo and Nivea use one bold shape and one name, so they read at any size."},{"heading":"Flat is the new standard","text":"BMW, Nissan, Burger King and Warner Bros. have simplified their emblems to work on screens."}],
  "checklistHeading":"A practical checklist for an emblem logo",
  "checklistItems":["Is the name easy to read inside the shape?","Does it still work at 24 pixels and in one colour?","Is there one clear symbol, not five?","Can it be embroidered, engraved or printed on a cap?","Do you have a simplified small version for icons and social media?"],
  "conclusionHtml":process+"<h2 id=\"conclusion\">Want an emblem that lasts?</h2><p>A great emblem logo feels like a badge people want to wear. It tells a story with one shape, one name and one symbol, and it has a simpler version for small sizes. Harley-Davidson, NASA and LEGO prove that the best emblems can last for decades.</p><p>I design logos and brand identities for startups and growing companies, including emblems, badges and the small marks that go with them. See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What is an emblem logo?","answer":"An emblem logo places the brand name inside a symbol or frame, like a seal, shield, crest or badge. The text and the shape are locked together, as in the Harley-Davidson bar and shield, the NASA meatball and the Ford oval."},
  {"question":"What is the difference between an emblem and a badge logo?","answer":"They are the same type of logo. Badge logo usually describes an emblem used on products, like a patch, label or bottle cap, such as Converse's ankle patch or the Levi's batwing."},
  {"question":"What is the difference between an emblem and a combination mark?","answer":"In a combination mark the symbol and the name sit side by side and can be used separately, like Nike's swoosh and wordmark. In an emblem the name sits inside the symbol, so they always appear together."},
  {"question":"Are emblem logos good for small businesses?","answer":"Yes, if heritage, trust or merchandise matter to you, like breweries, coffee shops, schools, sports clubs and outdoor brands. Keep the design simple and ask for a small simplified version for icons and social media."},
  {"question":"How much does an emblem logo cost?","answer":"Prices range from a few hundred dollars for a template to tens of thousands with a large agency. I design a complete brand identity, including the emblem and its small version, in one week for a flat $3,000."}],
 "tags":["emblem logos","badge logos","emblem logo design","famous emblem logos","logo design"],
}
if os.path.exists('public/images/blog/emblem-logos/cover-collage.webp'):
    C=I; post['image']={**post['image'],"src":f"{C}/cover-collage.webp","thumbnail":f"{C}/cover-collage-768w.webp","alt":open(f'{D}/cover_alt.txt').read().strip()}; post['seo']['image']=f"{C}/cover-collage-og.webp"
    credit=open(f'{D}/cover_credit.html').read().strip() if os.path.exists(f'{D}/cover_credit.html') else ''
    if credit: post['logoRosterConfig']['conclusionHtml']+=credit
json.dump(post,open(P,'w'),ensure_ascii=False,indent=2)
idx=json.load(open('public/content/blog/index.json'))
entry={k:post[k] for k in ('slug','url','title','description','category','categorySlug','readTime','date','image')}
pos=next((i for i,x in enumerate(idx) if x['slug']=='emblem-logos'),None)
if pos is None: idx.insert(0,entry)
else: idx[pos]=entry
json.dump(idx,open('public/content/blog/index.json','w'),ensure_ascii=False,indent=2)
print('ok', len(B))
