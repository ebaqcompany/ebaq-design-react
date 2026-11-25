# Builds public/content/blog/combination-mark-logos.json, "27 Combination Mark Logos Explained" (slide format,
# logo quick course series), and adds or updates its index entry at the top. Run from the repo root.
import json, sys, os
sys.path.insert(0,'tools/article-graphics/combination-logos'); import combos as data
SLUG='combination-mark-logos'
P=f'public/content/blog/{SLUG}.json'
I=f'/images/blog/{SLUG}'
D='tools/article-graphics/combination-logos'
B=data.B
names=lambda a,b:", ".join(x[1] for x in B[a:b])
boards=[(f"combination-mark-logos-01-side-by-side",f"Combination marks with the symbol beside the name, 01 to 09: {names(0,9)}"),
 (f"combination-mark-logos-02-stacked",f"Combination marks with the symbol above the name, 10 to 18: {names(9,18)}"),
 (f"combination-mark-logos-03-built-into-the-name",f"Combination marks with the symbol built into the name, 19 to 27: {names(18,27)}")]
title="27 Combination Mark Logos Explained"
desc="27 famous combination mark logos explained by a brand designer: symbol and name side by side, stacked or built together, from Microsoft and Adidas to Amazon and Puma."
hero_alt=open(f'{D}/hero_alt.txt').read().strip() if os.path.exists(f'{D}/hero_alt.txt') else 'Combination mark logos on shop signs'
L=lambda h,t:f'<a href="{h}">{t}</a>'
fig=lambda src,alt,w=1920,h=1080:f'<figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{alt}" src="{I}/{src}" width="{w}" height="{h}" decoding="async"/></div></figure>'
series=(f'<p><strong>Logo design quick course:</strong> this guide is part of my series on logo types. Read the others on {L("/blog/pictorial-mark-logos","pictorial marks")}, {L("/blog/emblem-logos","emblem logos")}, {L("/blog/script-logos","script logos")}, '
 f'{L("/blog/brand-mascots","mascot logos")}, {L("/blog/wordmark-logo-design","wordmark logos")}, {L("/blog/lettermark-logo-design","lettermark logos")}, {L("/blog/monogram-logo-design","monogram logos")} and {L("/blog/abstract-logo-design","abstract logos")}, '
 f'or start with the overview of all {L("/blog/types-of-logos","types of logos")}.</p>')
intro=(
 '<p>A combination mark is a logo that puts a <strong>symbol and the brand name together</strong>. The Microsoft squares next to the word Microsoft, the adidas bars above the word adidas and the Amazon smile under the word amazon are all combination marks. '
 'It is the most common type of logo, because it gives a brand a name people can read today and a symbol that can work alone later.</p>'
 + fig('combination-mark-logos-hero.webp',hero_alt,1920,1072) + series +
 '<h2 id="what-is-a-combination-mark">What is a combination mark?</h2>'
 f'<p>A combination mark joins two parts: a {L("/blog/wordmark-logo-design","wordmark")} (the name set in type) and a symbol, which can be a picture, an {L("/blog/abstract-logo-design","abstract shape")} or a {L("/blog/brand-mascots","mascot")}. '
 'The two parts are designed to work together, but they are also designed to be used apart. That is the key difference from an emblem.</p>'
 f'<p>In an {L("/blog/emblem-logos","emblem")}, the name sits inside the shape and can\'t be separated, like the Harley-Davidson shield or the Starbucks badge before 2011. In a combination mark, you can lift the symbol out and use it alone as an app icon, a favicon or an embroidered patch, the way Lacoste uses its crocodile on shirts.</p>'
 '<h2 id="three-ways-to-combine">Three ways to combine a symbol and a name</h2>'
 '<p>Every combination mark in this article falls into one of three layouts.</p>'
 '<p><strong>Side by side:</strong> the symbol sits to the left (or right) of the name, as with Microsoft, Spotify, Slack and Chase. This horizontal lockup suits websites, app headers and shop signs, which are all wide spaces.</p>'
 '<p><strong>Stacked:</strong> the symbol sits above the name, as with adidas, Rolex, NBC and Mastercard. A stacked lockup fits square and tall spaces like packaging, watch dials and social media profile pictures.</p>'
 '<p><strong>Built into the name:</strong> the symbol touches or grows out of the letters, as with the Amazon smile, the Pizza Hut roof and the Puma cat leaping off the A. These are the hardest to design and the most memorable, because name and symbol read as one picture.</p>'
 '<h2 id="why-brands-choose-combination-marks">Why most brands choose a combination mark</h2>'
 '<p>A symbol alone means nothing on day one. Nobody knew what a swoosh or an octagon stood for until years of advertising taught them. A name alone works everywhere, but it is hard to fit into a small square. A combination mark solves both problems: <strong>the name builds recognition while the symbol earns its place</strong>.</p>'
 '<p>Once the symbol is famous, a brand can drop the name. Nike started using the Swoosh on its own in 1995, Starbucks removed the words from its siren in 2011 and Mastercard dropped its name from the circles in 2019. All three began as combination marks.</p>'
 + fig('when-to-choose-a-combination-mark.webp','When to combine a symbol and a name: your name is new, you need an app icon, you may drop the name later, signs and social both matter. Most brands need one.') +
 '<h2 id="lockups">Lockups: one logo, several versions</h2>'
 '<p>A combination mark is really a small system. Designers call each arrangement of symbol and name a <strong>lockup</strong>, and a good identity includes several: a horizontal lockup for websites, a stacked lockup for square spaces, the symbol alone for icons and the name alone for places where the symbol is too detailed. Toyota, for example, uses its ovals next to the name on dealerships and the ovals alone on the cars.</p>'
 '<p>Below are 27 famous combination marks in three groups of nine: symbol beside the name, symbol above the name and symbol built into the name. Each one has a slide with my handwritten notes and a short explanation.</p>'
)
process=(
 '<h2 id="how-to-design-a-combination-mark">How to design a combination mark</h2>'
 + fig('how-to-design-a-combination-mark.webp','How to design a combination mark in four steps: design the name, design the symbol, balance the two, plan the lockups') +
 '<p><strong>1. Design the name.</strong> Start with the wordmark, because the name does most of the work in the first years. Pick or draw letters that match the brand\'s personality, then adjust the spacing by eye.</p>'
 '<p><strong>2. Design the symbol.</strong> Make it simple enough to work alone at 16 pixels. The best symbols say one thing, like the Amazon smile or the Taco Bell bell.</p>'
 '<p><strong>3. Balance the two.</strong> The symbol and the name should feel like one family: matching stroke weights, corners and colours. Check that neither overpowers the other. A common rule is to make the symbol about as tall as the capital letters, or twice that when stacked.</p>'
 '<p><strong>4. Plan the lockups.</strong> Design the horizontal version, the stacked version, the symbol alone and the name alone, with fixed spacing between the parts. Put them all in your brand guidelines so nobody makes up a new arrangement later.</p>'
)
post=json.load(open(P)) if os.path.exists(P) else {}
post.update({"slug":SLUG,"url":f"/blog/{SLUG}","category":"Logo Design","categorySlug":"logo-design","author":"arek-dvornechuck-ebaqdesign",
 "title":title,"date":"Nov 25, 2026","readTime":"12 min read","description":desc,
 "image":{"src":f"{I}/combination-mark-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/combination-mark-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/combination-mark-logos-hero-og.webp"},
 "intro":intro,
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/combination-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} combination mark logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"27 famous combination mark logos",
  "listIntro":["The boards below show all 27 combination marks in one consistent format, grouped by how the symbol and the name are arranged.","Each logo is reviewed for its design decisions, not for the size or success of the company behind it."],
  "sectionNames":data.G,
  "sectionIntroductions":["The horizontal lockup: the symbol sits to the left or right of the name. It fits wide spaces like websites, app headers and shop signs.","The stacked lockup: the symbol sits above the name. It fits square and tall spaces like packaging, watch dials and profile pictures.","The symbol touches or grows out of the letters, so the name and the picture read as one. These are the hardest to design and the easiest to remember."],
  "sectionBridge":["This is a visual study of combination marks, not a ranking of companies.","Look at how each symbol relates to the name, and whether it could stand on its own as an icon."],
  "entryFallbacks":[["The symbol and the name work together and apart.","Notice how the logo would read on a sign, a pack and a phone screen."]],
  "findings":[{"heading":"The name carries the early years","text":"Microsoft, Spotify and Airbnb all spell out their names next to the symbol, so new customers learn both at once."},{"heading":"The symbol becomes the icon","text":"The Slack pinwheel, the Spotify circle and the Amazon smile are the app icons, with no name at all."},{"heading":"Stacked suits square spaces","text":"adidas, Rolex and NBC stack the symbol above the name, which fits packaging, dials and profile pictures."},{"heading":"Built-in symbols are the most memorable","text":"The Amazon smile, the Tostitos people and the Tour de France cyclist hide a picture inside the name."},{"heading":"Famous symbols drop the name","text":"Nike, Starbucks and Mastercard started as combination marks and later let the symbol stand alone."}],
  "checklistHeading":"A practical checklist for a combination mark",
  "checklistItems":["Does the symbol work alone at app-icon size?","Does the name read clearly without the symbol?","Do the two share the same weight, corners and colours?","Is there a horizontal and a stacked lockup?","Are the spacing and sizes fixed in your brand guidelines?"],
  "conclusionHtml":process+"<h2 id=\"conclusion\">Want a logo that works together and apart?</h2><p>A combination mark gives a brand a name people can read and a symbol people can remember. Designed well, it comes as a set of lockups, from a wide version for your website to a single symbol for your app icon. Microsoft, adidas and Amazon show how far that flexibility can take a brand.</p><p>I design logos and brand identities for startups and growing companies, including the full set of lockups a combination mark needs. See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What is a combination mark?","answer":"A combination mark is a logo that combines a symbol with the brand name. The two parts are designed to work together and apart. Famous examples include Microsoft, adidas, Lacoste, Amazon and Burger King."},
  {"question":"What is the difference between a combination mark and an emblem?","answer":"In a combination mark, the symbol and the name can be separated and used alone, like the Lacoste crocodile. In an emblem, the name sits inside a badge or shape and can't be separated, like the Harley-Davidson shield."},
  {"question":"Is a combination mark good for a new business?","answer":"Yes. For most new businesses it is the safest choice: the name builds recognition while the symbol becomes familiar, and the symbol can be used alone as an app icon or favicon."},
  {"question":"What is a logo lockup?","answer":"A lockup is a fixed arrangement of the symbol and the name, with set sizes and spacing. Most combination marks have a horizontal lockup, a stacked lockup, the symbol alone and the name alone."},
  {"question":"How much does a combination mark logo cost?","answer":"Prices vary a lot by designer. I design a complete brand identity, including the combination mark and all its lockups, in one week for a flat $3,000."}],
 "tags":["combination mark","combination mark logos","combination logo","logo types","logo design"],
})
for k in ('body',): post.pop(k,None)
if os.path.exists(f'public{I}/cover-collage.webp'):
    post['image']={**post['image'],"src":f"{I}/cover-collage.webp","thumbnail":f"{I}/cover-collage-768w.webp","alt":open(f'{D}/cover_alt.txt').read().strip()}; post['seo']['image']=f"{I}/cover-collage-og.webp"
credit=open(f'{D}/cover_credit.html').read().strip() if os.path.exists(f'{D}/cover_credit.html') else ''
if credit: post['logoRosterConfig']['conclusionHtml']+=credit
json.dump(post,open(P,'w'),ensure_ascii=False,indent=2)
idx=json.load(open('public/content/blog/index.json'))
entry={k:post[k] for k in ('slug','url','title','description','category','categorySlug','readTime','date','image')}
pos=next((i for i,x in enumerate(idx) if x['slug']==SLUG),None)
if pos is None: idx.insert(0,entry)
else: idx[pos]={**idx[pos],**entry}
json.dump(idx,open('public/content/blog/index.json','w'),ensure_ascii=False,indent=2)
print('ok', len(B))
