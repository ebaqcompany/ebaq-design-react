# Builds public/content/blog/beauty-logos.json (36 beauty brands, slide format) and adds its index entry.
# Run from the repo root.
import json, sys, os
sys.path.insert(0,'tools/article-graphics/beauty-logos'); import beauty as data
P='public/content/blog/beauty-logos.json'
I='/images/blog/beauty-logos'
B=data.B
boards=[("beauty-logos-01-skincare","Skincare brand logos, 01 to 09: Estée Lauder, La Mer, La Roche-Posay, CeraVe, The Ordinary, Drunk Elephant, Glow Recipe, Tatcha, Aesop"),
 ("beauty-logos-02-makeup","Makeup and cosmetics brand logos, 10 to 18: Fenty Beauty, Rare Beauty, Glossier, MAC, NARS, Charlotte Tilbury, Benefit, Maybelline, Huda Beauty"),
 ("beauty-logos-03-fragrance","Fragrance and perfume brand logos, 19 to 27: Chanel, Dior, Yves Saint Laurent, Tom Ford, Jo Malone London, Diptyque, Le Labo, Byredo, Guerlain"),
 ("beauty-logos-04-hair-and-body","Hair and body care brand logos, 28 to 36: Olaplex, K18, Kérastase, Aveda, Briogeo, Sol de Janeiro, Dove, Bath & Body Works, Nécessaire")]
title="36 Beauty Logos Explained"
desc="36 beauty brand logos explained by a brand designer: skincare, makeup and cosmetics, fragrance and hair care, from Chanel and Dior to Glossier, Fenty Beauty and The Ordinary."
hero_alt=open('tools/article-graphics/beauty-logos/hero_alt.txt').read().strip()
L=lambda h,t:f'<a href="{h}">{t}</a>'
post={"slug":"beauty-logos","url":"/blog/beauty-logos","category":"Logo Design","categorySlug":"logo-design","author":"arek-dvornechuck-ebaqdesign",
 "title":title,"date":"Nov 23, 2026","readTime":"13 min read","description":desc,
 "image":{"src":f"{I}/beauty-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/beauty-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/beauty-logos-hero-og.webp"},
 "intro":f'<p>The best beauty logos are <strong>simple wordmarks with one memorable detail</strong>. Beauty is sold on shelves, packs and phone screens, so almost every big brand uses its name, set in a typeface that signals the price and the promise: <strong>thin serifs for luxury, heavy sans serifs for bold modern brands and clinical type for skincare</strong>.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/beauty-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-beauty-logo">What makes a good beauty logo?</h2><p><strong>The name is the logo:</strong> nearly all 36 brands below use a wordmark. Customers ask for the brand by name, so it has to be easy to read on a tiny lipstick and a huge store sign.</p><p><strong>Type sets the price:</strong> thin serifs and wide spacing say luxury, like La Mer or Diptyque. Heavy, rounded letters say young and fun, like Glow Recipe or Olaplex.</p><p><strong>One small twist:</strong> a flipped N (Fenty Beauty), a full stop (Glossier), a bar over a letter (Aesop) or a blue square (La Roche-Posay) makes a simple name ownable.</p><p><strong>Colour mostly lives on the pack:</strong> most beauty logos are black, so the packaging can change colour every season.</p><p>Below are 36 logos in four groups: skincare, makeup and cosmetics, fragrance and perfume, and hair and body care. Each logo has a slide with my handwritten notes and a short explanation. For more ideas, see my {L("/blog/fashion-logos","fashion logos")}, {L("/blog/jewelry-logos","jewelry logos")} and {L("/blog/wellness-branding","wellness branding examples")}, and my guide to {L("/blog/logo-fonts","choosing a logo font")}.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/beauty-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"36 beauty logos",
  "listIntro":["The boards below show all 36 beauty logos in one consistent format, grouped into skincare, makeup, fragrance, and hair and body care.","Each logo is reviewed for its design decisions, not for the quality of the products behind it."],
  "sectionNames":["Skincare logos","Makeup and cosmetics logos","Fragrance and perfume logos","Hair and body care logos"],
  "sectionIntroductions":["Skincare logos split into two camps. Clinical brands like La Roche-Posay, CeraVe and The Ordinary look like pharmacy labels, while luxury brands like La Mer, Tatcha and Aesop use thin serifs and wide spacing.","Makeup logos are bolder and more playful. Founder-led brands like Fenty Beauty, Rare Beauty and Huda Beauty use type with personality, while MAC and NARS turn short names into graphic marks.","Fragrance houses use the most classic type in beauty. Chanel, Dior, Guerlain and YSL rely on heritage lettering, while newer houses like Le Labo and Byredo look like design studios.","Hair and body brands lean on science or fun. Olaplex and K18 look technical, Kérastase and Aveda look like salon brands, and Sol de Janeiro, Dove and Bath & Body Works feel warm and friendly."],
  "sectionBridge":["This is a visual comparison of beauty logos, not a ranking of beauty brands or products.","Look at how each logo uses type, spacing and one small detail to signal luxury, science or fun."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look on a lipstick, a store sign and an Instagram profile."]],
  "findings":[{"heading":"Almost all are wordmarks","text":"Only a handful of the 36 brands add a symbol, like Dove's bird or K18's molecule. In beauty, the name and the typeface carry the brand."},{"heading":"Type tells you the price","text":"Thin serifs and wide spacing (La Mer, Diptyque, Jo Malone London) feel expensive. Heavy rounded letters (Glow Recipe, Olaplex, Briogeo) feel young and accessible."},{"heading":"Clinical skincare looks like medicine","text":"La Roche-Posay, CeraVe and The Ordinary use blue, plain sans serifs and lines like \"Developed with dermatologists\" to look trustworthy."},{"heading":"One twist makes a name ownable","text":"Fenty's flipped N, Glossier's full stop, Aesop's bar over the e and MAC's stretched letters turn simple names into recognisable marks."},{"heading":"Black logos, colourful packs","text":"Most beauty logos are black or near-black, so the packaging, not the logo, carries each season's colours."}],
  "checklistHeading":"A practical checklist for a beauty logo",
  "checklistItems":["Is the name readable on a lipstick, a sample sachet and a phone screen?","Does the typeface match your price point and promise?","Is there one small detail you can own, like an accent, a dot or a custom letter?","Does it work in black, white and foil on different packaging?","Will it still look right next to the big brands on a store shelf or a retailer's website?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Launching a beauty brand?</h2><p>I design brand identities for beauty, skincare and wellness startups, from logos and packaging systems to websites and brand guidelines. See my <a href=\"/blog/wellness-branding\">wellness branding examples</a> for more ideas.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What makes a good beauty logo?","answer":"A good beauty logo is a clear wordmark with one memorable detail. The typeface should match the price point and the promise, and the logo has to work on tiny packaging, store signs and social media."},
  {"question":"What fonts do beauty brands use?","answer":"Luxury and fragrance brands use thin, high-contrast serifs and wide spacing. Clinical skincare brands use plain sans serifs. Young, playful brands use heavy, rounded sans serifs or custom lettering."},
  {"question":"What colours are best for a beauty logo?","answer":"Most beauty logos are black or very dark, so they work on any pack. Clinical skincare brands often add blue for trust, and some brands use one signature colour, like Rare Beauty's plum or Dove's gold."},
  {"question":"What is the difference between a skincare logo and a makeup logo?","answer":"Skincare logos usually look calm and scientific or quietly luxurious. Makeup logos can be bolder and more expressive, with heavy type, flipped letters or stretched marks, because makeup is about colour and self-expression."},
  {"question":"How much does a beauty logo cost?","answer":"Prices range from a few hundred dollars for a template to tens of thousands with a large agency. I design a complete brand identity in one week for a flat $3,000, including the logo, colours, typography and guidelines."}],
 "tags":["beauty logos","skincare logos","cosmetic logos","makeup brand logos","perfume logos","logo design"],
}
if os.path.exists('public/images/blog/beauty-logos/cover-collage.webp'):
    C=I; post['image']={**post['image'],"src":f"{C}/cover-collage.webp","thumbnail":f"{C}/cover-collage-768w.webp","alt":open('tools/article-graphics/beauty-logos/cover_alt.txt').read().strip()}; post['seo']['image']=f"{C}/cover-collage-og.webp"
    credit=open('tools/article-graphics/beauty-logos/cover_credit.html').read().strip() if os.path.exists('tools/article-graphics/beauty-logos/cover_credit.html') else ''
    if credit: post['logoRosterConfig']['conclusionHtml']+=credit
json.dump(post,open(P,'w'),ensure_ascii=False,indent=2)
idx=json.load(open('public/content/blog/index.json'))
entry={k:post[k] for k in ('slug','url','title','description','category','categorySlug','readTime','date','image')}
pos=next((i for i,x in enumerate(idx) if x['slug']=='beauty-logos'),None)
if pos is None: idx.insert(0,entry)
else: idx[pos]=entry
json.dump(idx,open('public/content/blog/index.json','w'),ensure_ascii=False,indent=2)
print('ok', len(B))
