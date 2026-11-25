# Builds public/content/blog/script-logos.json (27 script and cursive logos, slide format, logo quick course series) and adds its index entry.
# Run from the repo root.
import json, sys, os
sys.path.insert(0,'tools/article-graphics/script-logos'); import scripts as data
P='public/content/blog/script-logos.json'
I='/images/blog/script-logos'
D='tools/article-graphics/script-logos'
B=data.B
boards=[("script-logos-01-signature-scripts","Signature script logos, 01 to 09: Kellogg's, Disney, Campbell's, Johnson & Johnson, Stüssy, Tim Hortons, Cadbury, Virgin, Christian Louboutin"),
 ("script-logos-02-formal-scripts","Formal script logos, 10 to 18: Coca-Cola, Ford, Budweiser, Hallmark, Kleenex, Dodgers, Harrods, Cartier, Milka"),
 ("script-logos-03-casual-scripts","Casual script logos, 19 to 27: Instagram, Wendy's, Chick-fil-A, Krispy Kreme, Lay's, Barbie, Vimeo, Fender, Ray-Ban")]
title="27 Script Logos Explained"
desc="27 famous script and cursive logos explained by a brand designer: signatures, Spencerian scripts and casual lettering from Coca-Cola, Kellogg's and Disney to Cadbury and Barbie."
hero_alt=open(f'{D}/hero_alt.txt').read().strip()
L=lambda h,t:f'<a href="{h}">{t}</a>'
fig=lambda src,alt,w=1920,h=1080:f'<figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{alt}" src="{I}/{src}" width="{w}" height="{h}" decoding="async"/></div></figure>'
series=(f'<p><strong>Logo design quick course:</strong> this guide is part of my series on logo types. Read the others on {L("/blog/combination-mark-logos","combination marks")}, {L("/blog/emblem-logos","emblem logos")}, {L("/blog/brand-mascots","mascot logos")}, {L("/blog/wordmark-logo-design","wordmark logos")}, '
 f'{L("/blog/monogram-logo-design","monogram logos")}, {L("/blog/lettermark-logo-design","lettermark logos")}, {L("/blog/abstract-logo-design","abstract logos")}, '
 f'{L("/blog/symmetry-logo-design","symmetry")} and {L("/blog/negative-space-logo-design","negative space")}, or start with the overview of all {L("/blog/types-of-logos","types of logos")}.</p>')
intro=(
 '<p>A script logo writes the brand name in <strong>joined, handwritten letters</strong>, as if someone signed it with a pen. Coca-Cola, Kellogg\'s, Disney and Cadbury all use one. Script logos feel personal, warm and a little old-fashioned, which is exactly why some of the oldest brands in the world still use them.</p>'
 + fig('script-logos-hero.webp',hero_alt) + series +
 '<h2 id="what-is-a-script-logo">What is a script logo?</h2>'
 f'<p>A script logo is a type of {L("/blog/wordmark-logo-design","wordmark")}: the name is the whole logo, with no separate symbol. What makes it a script is the lettering. The letters lean, flow and usually connect, like cursive handwriting. People also call them <strong>cursive logos</strong> or <strong>signature logos</strong>.</p>'
 '<p>Most famous script logos are <strong>drawn by hand, not typed in a font</strong>. Coca-Cola, Kellogg\'s and Ford were lettered by a person, then cleaned up over the years. That is why each one looks unique, while a logo typed in a popular script font can look like a wedding invitation.</p>'
 '<h2 id="where-script-logos-come-from">Where script logos come from</h2>'
 '<p>Before typewriters, every business letter, invoice and receipt was written by hand. In 19th-century America, schools taught <strong>Spencerian script</strong>, an elegant slanted handwriting developed by Platt Rogers Spencer, and clear, beautiful penmanship was a sign of a serious business.</p>'
 + fig('spencerian-penmanship-letter-1884.webp','A letter written in Spencerian script by the Gem City Business College, a penmanship school in Quincy, Illinois, in 1884',836,1388) +
 '<p>So when Coca-Cola\'s bookkeeper Frank Mason Robinson wrote the drink\'s name in 1886, he wrote it in Spencerian script. Within twenty years, Campbell\'s, Ford and Kellogg\'s had script logos too. Some came from a founder\'s real signature, which worked like a personal guarantee on the package.</p>'
 + fig('coca-cola-coupon-19th-century.webp','A 19th-century Coca-Cola coupon for a free glass, already showing the Spencerian script logo',1295,646) +
 '<h2 id="types-of-script-logos">Three types of script logos</h2>'
 '<p><strong>Signature scripts:</strong> Kellogg\'s, Disney, Campbell\'s and Tim Hortons began as a real person\'s signature. They say: a real person stands behind this product.</p>'
 '<p><strong>Formal scripts:</strong> Coca-Cola, Ford, Cartier and Harrods use elegant, carefully drawn lettering with thick and thin strokes. They feel classic, established and premium.</p>'
 '<p><strong>Casual scripts:</strong> Instagram, Wendy\'s, Barbie and Krispy Kreme use bold, relaxed lettering. They feel friendly, fun and approachable.</p>'
 '<h2 id="the-problem-with-script-logos">The problem with script logos: readability</h2>'
 '<p>Scripts are the hardest logos to read. Joined letters, loops and thin strokes look beautiful on a shop sign and turn into a scribble on a favicon or a business card. Bold scripts like Kleenex survive at small sizes. Thin signatures like Christian Louboutin\'s do not.</p>'
 + fig('script-logo-shrink-test.webp','Shrink test: the thin Christian Louboutin signature turns to scribble at favicon size, while the bold Kleenex script still reads') +
 '<p>Readability is also why brands drop their scripts. Johnson &amp; Johnson retired its 130-year-old signature in 2023 for a plain wordmark. Pinterest replaced its script wordmark with a sans serif and kept only the script P in its icon. When Instagram redrew its script in 2026, many users read the new name as "Instagzam". If you choose a script, plan a simple backup mark, like a monogram, for small sizes.</p>'
 + fig('when-to-choose-a-script-logo.webp','Choose a script logo when a person is the brand, you want warmth, the name is short or it lives on packaging. Plan a backup mark.') +
 '<p>Below are 27 famous script logos, American brands first and then the rest of the world, across food, drinks, fashion, retail, sport, tech and entertainment. Each one has a slide with my handwritten notes and a short explanation.</p>'
)
process=(
 '<h2 id="how-to-design-a-script-logo">How to design a script logo</h2>'
 + fig('how-to-design-a-script-logo.webp','How to design a script logo in four steps: pick a style, draw the word, fix the joins, test it small') +
 '<p><strong>1. Pick a style.</strong> Decide between a signature, a formal script and a casual script. A law firm and a doughnut shop need very different handwriting.</p>'
 '<p><strong>2. Draw the word.</strong> Write the name by hand many times, with a pen, a brush or a marker. A script font is a good starting point for ideas, but the final logo should be drawn, so it belongs only to you.</p>'
 '<p><strong>3. Fix the joins.</strong> Clean up how the letters connect, balance the loops and make sure every letter is easy to recognise. Watch for letter pairs that can be misread, like r and z in the new Instagram wordmark.</p>'
 '<p><strong>4. Test it small.</strong> Check the logo at 24 pixels, in one colour and on a business card. If the loops fill in, make the strokes bolder or design a simple backup mark for small sizes.</p>'
)
post={"slug":"script-logos","url":"/blog/script-logos","category":"Logo Design","categorySlug":"logo-design","author":"arek-dvornechuck-ebaqdesign",
 "title":title,"date":"Nov 24, 2026","readTime":"12 min read","description":desc,
 "image":{"src":f"{I}/script-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/script-logos-hero-768w.webp"},
 "seo":{"title":"27 Script and Cursive Logos Explained","description":desc,"image":f"{I}/script-logos-hero-og.webp"},
 "intro":intro,
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/script-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} script logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"27 famous script logos",
  "listIntro":["The boards below show all 27 script logos in one consistent format, grouped into signatures, formal scripts and casual scripts.","Each logo is reviewed for its design decisions, not for the size or success of the company behind it."],
  "sectionNames":data.G,
  "sectionIntroductions":["These logos began as a real person's signature, or were drawn to look like one. They put a human name and a human hand on the product.","Formal scripts use elegant lettering with thick and thin strokes, often based on 19th-century penmanship. They feel classic, established and premium.","Casual scripts are bold, relaxed and friendly. They work for food, toys, social apps and lifestyle brands that want to feel approachable."],
  "sectionBridge":["This is a visual study of script logos, not a ranking of companies.","Look at how each script joins its letters, how bold the strokes are and how well the name reads at a glance."],
  "entryFallbacks":[["The script makes the name feel handwritten and personal.","Notice how the logo would read on a sign, a package and a phone screen."]],
  "findings":[{"heading":"A signature is a promise","text":"Kellogg's, Campbell's and Johnson & Johnson used a founder's signature as a personal guarantee of quality."},{"heading":"Custom beats a font","text":"Coca-Cola, Ford and Harrods are drawn by hand, so no one else can type the same logo."},{"heading":"Bold scripts survive","text":"Kleenex, Wendy's and Lay's use thick strokes, so they still read on small packs and screens."},{"heading":"Scripts love packaging","text":"Coca-Cola, Cadbury, Milka and Campbell's look best on cans, bars and wrappers, where the logo is large."},{"heading":"Readability wins in the end","text":"Johnson & Johnson and Pinterest dropped their scripts, and Instagram's 2026 redraw shows how easily a script can be misread."}],
  "checklistHeading":"A practical checklist for a script logo",
  "checklistItems":["Can someone read the name in one second?","Is it custom-drawn, not typed in a popular script font?","Do the letters connect without creating confusing shapes?","Does it still work at 24 pixels and in one colour?","Do you have a simple backup mark for icons and social media?"],
  "conclusionHtml":process+"<h2 id=\"conclusion\">Want a script logo that feels personal?</h2><p>A great script logo looks like it was written by a real person and still reads at a glance. It is custom-drawn, bold enough for small sizes and paired with a simple backup mark. Coca-Cola, Kellogg's and Disney prove that the right handwriting can last for more than a century.</p><p>I design logos and brand identities for startups and growing companies, including custom script lettering and the small marks that go with it. See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What is a script logo?","answer":"A script logo is a wordmark written in joined, handwritten-style letters, like cursive. The name is the whole logo, as in Coca-Cola, Kellogg's, Disney and Cadbury."},
  {"question":"What is the difference between a script logo and a cursive logo?","answer":"They are the same thing. Script is the design term and cursive is the everyday word. A signature logo is a script logo based on a real person's signature, like Kellogg's or Tim Hortons."},
  {"question":"Can I use a script font for my logo?","answer":"You can start with one, but check the font licence and make the logo your own. The most famous script logos are custom-drawn, so no one else can type the same name in the same way."},
  {"question":"Are script logos hard to read?","answer":"They can be. Thin, loopy scripts lose their shape at small sizes. Choose bold strokes, keep the name short and add a simple backup mark, like a monogram, for icons and social media."},
  {"question":"How much does a script logo cost?","answer":"Prices range from a few hundred dollars for a template to tens of thousands with a large agency. I design a complete brand identity, including custom script lettering and a backup mark, in one week for a flat $3,000."}],
 "tags":["script logos","cursive logos","signature logos","famous script logos","logo design"],
}
if os.path.exists('public/images/blog/script-logos/cover-collage.webp'):
    C=I; post['image']={**post['image'],"src":f"{C}/cover-collage.webp","thumbnail":f"{C}/cover-collage-768w.webp","alt":open(f'{D}/cover_alt.txt').read().strip()}; post['seo']['image']=f"{C}/cover-collage-og.webp"
    credit=open(f'{D}/cover_credit.html').read().strip() if os.path.exists(f'{D}/cover_credit.html') else ''
    if credit: post['logoRosterConfig']['conclusionHtml']+=credit
json.dump(post,open(P,'w'),ensure_ascii=False,indent=2)
idx=json.load(open('public/content/blog/index.json'))
entry={k:post[k] for k in ('slug','url','title','description','category','categorySlug','readTime','date','image')}
pos=next((i for i,x in enumerate(idx) if x['slug']=='script-logos'),None)
if pos is None: idx.insert(0,entry)
else: idx[pos]=entry
json.dump(idx,open('public/content/blog/index.json','w'),ensure_ascii=False,indent=2)
print('ok', len(B))
