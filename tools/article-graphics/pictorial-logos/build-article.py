# Builds public/content/blog/pictorial-mark-logos.json, "27 Pictorial Mark Logos Explained" (slide format,
# logo quick course series), and adds or updates its index entry at the top. Run from the repo root.
import json, sys, os
sys.path.insert(0,'tools/article-graphics/pictorial-logos'); import pictorials as data
SLUG='pictorial-mark-logos'
P=f'public/content/blog/{SLUG}.json'
I=f'/images/blog/{SLUG}'
D='tools/article-graphics/pictorial-logos'
B=data.B
names=lambda a,b:", ".join(x[1] for x in B[a:b])
boards=[("pictorial-mark-logos-01-animals",f"Animal pictorial marks, 01 to 09: {names(0,9)}"),
 ("pictorial-mark-logos-02-objects",f"Object pictorial marks, 10 to 18: {names(9,18)}"),
 ("pictorial-mark-logos-03-nature-and-people",f"Nature and people pictorial marks, 19 to 27: {names(18,27)}")]
title="27 Pictorial Mark Logos Explained"
desc="27 famous pictorial mark logos explained by a brand designer: animals, objects, nature and people, from the Twitter bird and the Penguin to Apple, Shell and the Jordan Jumpman."
hero_alt=open(f'{D}/hero_alt.txt').read().strip()
L=lambda h,t:f'<a href="{h}">{t}</a>'
fig=lambda src,alt,w=1920,h=1080:f'<figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{alt}" src="{I}/{src}" width="{w}" height="{h}" decoding="async"/></div></figure>'
series=(f'<p><strong>Logo design quick course:</strong> this guide is part of my series on logo types. Read the others on {L("/blog/combination-mark-logos","combination marks")}, {L("/blog/emblem-logos","emblem logos")}, {L("/blog/script-logos","script logos")}, '
 f'{L("/blog/brand-mascots","mascot logos")}, {L("/blog/wordmark-logo-design","wordmark logos")}, {L("/blog/lettermark-logo-design","lettermark logos")}, {L("/blog/monogram-logo-design","monogram logos")} and {L("/blog/abstract-logo-design","abstract logos")}, '
 f'or start with the overview of all {L("/blog/types-of-logos","types of logos")}.</p>')
intro=(
 '<p>A pictorial mark is a logo that is a <strong>picture of a real, recognizable thing</strong>: an apple, a bird, a shell, a camera. Apple, Twitter, Shell and Target all use one. '
 'A good pictorial mark can drop the name entirely, because people know the picture on sight.</p>'
 + fig('pictorial-mark-logos-hero.webp',hero_alt,1920,1072) + series +
 '<h2 id="what-is-a-pictorial-mark">What is a pictorial mark?</h2>'
 '<p>A pictorial mark, also called a logo symbol or brand mark, is an icon drawn from the real world. You could name the object in one word: bird, penguin, apple, eye, flame. '
 'Some brands use the picture alone, like Apple and Target. Others pair it with the name in a ' + L("/blog/combination-mark-logos","combination mark") + ', like Nestlé or Allstate, and the picture still does most of the remembering.</p>'
 '<h2 id="pictorial-vs-abstract-vs-mascot">Pictorial mark vs abstract mark vs mascot</h2>'
 f'<p>These three symbol logos are easy to mix up. A <strong>pictorial mark</strong> shows a real thing, like the Apple apple. An {L("/blog/abstract-logo-design","abstract mark")} is a shape with no literal meaning, like the Nike Swoosh or the Mastercard circles. '
 f'A {L("/blog/brand-mascots","mascot")} is a character with a personality, like Colonel Sanders or the Duolingo owl. The Twitter bird is a pictorial mark because it is just a bird; Duo the owl is a mascot because he has a face, a name and a voice.</p>'
 '<h2 id="name-and-picture">When the name is the picture</h2>'
 '<p>The strongest pictorial marks show exactly what the name says. Apple is an apple, Shell is a shell, Target is a target, Penguin is a penguin and Dove is a dove. '
 'People hear the name and see the picture, or see the picture and remember the name. That loop is why these brands can drop the words.</p>'
 '<p>When the name is not a thing, the picture can tell a story instead: Evernote\'s elephant never forgets, Red Bull\'s charging bulls are a picture of energy and Allstate\'s cupped hands are its slogan, "You\'re in good hands".</p>'
 + fig('when-to-choose-a-pictorial-mark.webp','When to use a picture: the name is a thing, buyers speak many languages, you need an app icon, no rival uses it. Avoid the clichés.') +
 '<h2 id="the-risks">The two risks: clichés and growing out of the picture</h2>'
 '<p><strong>Clichés.</strong> Light bulbs for ideas, globes for global companies, leaves for anything green: these pictures are so common that they make a brand look like everyone else. A pictorial mark only works if your picture is yours, in your market.</p>'
 '<p><strong>Growing out of the picture.</strong> A literal picture can box a business in. Apple outgrew computers without trouble, because an apple says nothing about computers. A company called "Phone Shop" with a phone logo would struggle if it started selling laptops. And a picture can be thrown away by a new owner: Twitter\'s famous bird was replaced by the X in 2023.</p>'
 '<h2 id="pictures-get-simpler">Why pictorial marks keep getting simpler</h2>'
 '<p>Almost every pictorial mark in this list has lost detail over the years. Shell\'s scallop went from a realistic shell to Raymond Loewy\'s clean outline in 1971, Instagram swapped its retro camera for a flat outline in 2016, Mozilla simplified the Firefox fox in 2019 and Peugeot reduced its full lion to a head in a shield in 2021. '
 'The reason is screens: a picture now has to read as a 16-pixel favicon and an app icon, not only on a sign.</p>'
 '<p>Below are 27 famous pictorial marks in three groups of nine: animals, objects, and nature and people. Each one has a slide with my handwritten notes and a short explanation.</p>'
)
process=(
 '<h2 id="how-to-design-a-pictorial-mark">How to design a pictorial mark</h2>'
 + fig('how-to-design-a-pictorial-mark.webp','How to design a pictorial mark in four steps: pick one object, draw it simply, make it yours, test it small') +
 '<p><strong>1. Pick one object.</strong> Choose a single thing that says something true about the brand: its name, its origin or its promise. One object, not a scene.</p>'
 '<p><strong>2. Draw it simply.</strong> Reduce the object to a few bold shapes. Remove details until it starts to look like something else, then put the last one back.</p>'
 '<p><strong>3. Make it yours.</strong> Add one twist no one else has: the bite in the Apple apple, the folded ear on the Evernote elephant, the flame tail on the Firefox fox. Without a twist, it is clip art.</p>'
 '<p><strong>4. Test it small.</strong> Check the picture at 16 pixels, in one colour and next to competitors. If it turns into a blob or looks like a rival, simplify it again.</p>'
)
post=json.load(open(P)) if os.path.exists(P) else {}
post.update({"slug":SLUG,"url":f"/blog/{SLUG}","category":"Logo Design","categorySlug":"logo-design","author":"arek-dvornechuck-ebaqdesign",
 "title":title,"date":"Nov 25, 2026","readTime":"12 min read","description":desc,
 "image":{"src":f"{I}/pictorial-mark-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/pictorial-mark-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/pictorial-mark-logos-hero-og.webp"},
 "intro":intro,
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/pictorial-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} pictorial mark logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"27 famous pictorial mark logos",
  "listIntro":["The boards below show all 27 pictorial marks in one consistent format, grouped into animals, objects, and nature and people.","Each logo is reviewed for its design decisions, not for the size or success of the company behind it."],
  "sectionNames":data.G,
  "sectionIntroductions":["Animals are the most common pictures in logos, because each one carries a ready-made meaning: a lion is strong, a dove is gentle, an elephant never forgets.","Everyday objects make some of the clearest logos: a camera, a phone, a play button, a paper plane. Everyone knows what they do.","Fruit, shells, rocks, flames and people: pictures from nature and the human body that brands have made their own."],
  "sectionBridge":["This is a visual study of pictorial marks, not a ranking of companies.","Look at how much detail each picture keeps, and whether you would recognize it without the name."],
  "entryFallbacks":[["The picture is simple enough to recognize at a glance.","Notice how it would read as a small app icon."]],
  "findings":[{"heading":"The name and the picture match","text":"Apple, Shell, Target, Penguin and Dove show exactly what their names say, so the two remind people of each other."},{"heading":"One twist makes it yours","text":"The bite in the apple, the fox's flame tail and the elephant's page-corner ear turn a common picture into a unique one."},{"heading":"Pictures keep getting simpler","text":"Shell, Instagram, Firefox and Peugeot all removed detail so their symbols work as app icons."},{"heading":"A picture crosses languages","text":"A bird, an eye or a maple leaf needs no translation, which helps global brands like Lufthansa and Air Canada."},{"heading":"Owners can throw them away","text":"Twitter's bird, one of the best-known pictures online, was replaced by the X in 2023."}],
  "checklistHeading":"A practical checklist for a pictorial mark",
  "checklistItems":["Can you name the object in one word?","Does it say something true about the brand?","Does it have one twist no competitor has?","Does it read at 16 pixels and in one colour?","Will it still fit if the business grows into new products?"],
  "conclusionHtml":process+"<h2 id=\"conclusion\">Want a picture people remember?</h2><p>A great pictorial mark shows one real thing, drawn simply, with a twist that makes it yours. When the name and the picture match, the logo can eventually stand on its own, the way Apple, Shell and Target do.</p><p>I design logos and brand identities for startups and growing companies, including symbols that work as app icons from day one. See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What is a pictorial mark?","answer":"A pictorial mark is a logo that shows a picture of a real, recognizable thing, like the Apple apple, the Twitter bird, the Shell shell or the Target bullseye. It can be used alone or next to the brand name."},
  {"question":"What is the difference between a pictorial mark and an abstract mark?","answer":"A pictorial mark shows something real, like an apple or a bird. An abstract mark is a shape with no literal meaning, like the Nike Swoosh or the Mastercard circles."},
  {"question":"What is the difference between a pictorial mark and a mascot?","answer":"A pictorial mark is a picture of a thing. A mascot is a character with a personality, a face and often a name, like Colonel Sanders or the Duolingo owl."},
  {"question":"Is a pictorial mark good for a new business?","answer":"It can be, especially when the name is a real thing. Most new businesses should pair the picture with the name at first, in a combination mark, and let the picture stand alone once people know it."},
  {"question":"How much does a pictorial mark logo cost?","answer":"Prices vary a lot by designer. I design a complete brand identity, including the logo symbol and all its versions, in one week for a flat $3,000."}],
 "tags":["pictorial mark","pictorial mark logos","logo symbols","picture logos","logo types","logo design"],
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
