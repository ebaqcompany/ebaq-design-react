# Builds public/content/blog/interior-design-logos.json (36 interior design brands, slide format) and adds its index entry.
# Run from the repo root.
import json, sys, os
sys.path.insert(0,'tools/article-graphics/interior-logos'); import interior as data
P='public/content/blog/interior-design-logos.json'
I='/images/blog/interior-design-logos'
B=data.B
boards=[("interior-design-logos-01-interior-design-studios","Interior design studio logos, 01 to 09: Kelly Wearstler, Studio McGee, Yabu Pushelberg, Rockwell Group, Pierre Yovanovitch, India Mahdavi, Ken Fulk, Commune Design, Workstead"),
 ("interior-design-logos-02-furniture-brands","Furniture brand logos, 10 to 18: RH, West Elm, CB2, Article, HAY, Vitra, Knoll, Herman Miller, Design Within Reach"),
 ("interior-design-logos-03-design-marketplaces-and-services","Interior design marketplace and service logos, 19 to 27: Houzz, Havenly, Decorilla, 1stDibs, Chairish, Wayfair, Burrow, Floyd, Lulu and Georgia"),
 ("interior-design-logos-04-paint-materials-and-lighting","Paint, materials and lighting brand logos, 28 to 36: Tom Dixon, Benjamin Moore, Sherwin-Williams, Schumacher, Flos, Louis Poulsen, Artemide, Kvadrat, Fireclay Tile")]
title="36 Interior Design Logos Explained"
desc="36 interior design logos explained by a brand designer: studios like Kelly Wearstler and Studio McGee, furniture brands like Vitra and Knoll, design marketplaces and lighting brands."
hero_alt=open('tools/article-graphics/interior-logos/hero_alt.txt').read().strip()
L=lambda h,t:f'<a href="{h}">{t}</a>'
post={"slug":"interior-design-logos","url":"/blog/interior-design-logos","category":"Logo Design","categorySlug":"logo-design","author":"arek-dvornechuck-ebaqdesign",
 "title":title,"date":"Nov 23, 2026","readTime":"13 min read","description":desc,
 "image":{"src":f"{I}/interior-design-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/interior-design-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/interior-design-logos-hero-og.webp"},
 "intro":f'<p>The best interior design logos are <strong>quiet wordmarks that let the work speak</strong>. An interior designer sells taste, so most top studios use the founder\'s name in a refined typeface and almost no colour. The ones you remember add <strong>one confident detail</strong>: Kelly Wearstler\'s extra-wide capitals, Article\'s coral full stop or Commune\'s deep red.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/interior-design-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-interior-design-logo">What makes a good interior design logo?</h2><p><strong>Type that matches your style:</strong> a classic serif says traditional and luxurious, a light sans serif says modern and calm, and heavy condensed letters say bold and dramatic.</p><p><strong>Restraint:</strong> clients hire you for your eye, so a simple, well-spaced name builds more trust than a drawing of a sofa or a house.</p><p><strong>One ownable detail:</strong> a full stop, a monogram, a box or a single colour makes a plain name recognisable.</p><p><strong>Works on materials:</strong> the logo has to look right embossed on a folder, printed on fabric tags and tiny on Instagram.</p><p>Below are 36 logos in four groups: interior design studios, furniture brands, design marketplaces and services, and paint, materials and lighting brands. Each logo has a slide with my handwritten notes and a short explanation. For more ideas, see my {L("/blog/luxury-real-estate","luxury real estate branding")} guide, my {L("/blog/fashion-logos","fashion logos")} and my guide to {L("/blog/logo-fonts","choosing a logo font")}.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/interior-design-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"36 interior design logos",
  "listIntro":["The boards below show all 36 interior design logos in one consistent format, grouped into studios, furniture brands, marketplaces and services, and paint, materials and lighting.","Each logo is reviewed for its design decisions, not for the quality of the interiors or products behind it."],
  "sectionNames":["Interior design studio logos","Furniture brand logos","Design marketplace and service logos","Paint, materials and lighting logos"],
  "sectionIntroductions":["Top interior design studios use the founder's name and very little else. The personality comes from the typeface: extra-wide capitals for Kelly Wearstler, soft lowercase for Yabu Pushelberg and condensed capitals for Workstead.","Furniture brands range from luxury serifs like RH to bold, compact wordmarks like HAY, Vitra and Knoll that work on labels, tags and catalogues.","Online design services and marketplaces need to feel friendly and trustworthy on a screen, so they use rounded letters, a simple symbol or a personal script like Chairish.","Paint, fabric and lighting brands are some of the oldest names here, and their logos mix heritage serifs like Schumacher with bold, modern marks like Artemide and Kvadrat."],
  "sectionBridge":["This is a visual comparison of interior design logos, not a ranking of designers or products.","Look at how each logo uses type, spacing and one detail to signal luxury, warmth or modern simplicity."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look on a proposal, a fabric tag and an Instagram profile."]],
  "findings":[{"heading":"Names beat symbols","text":"Almost every studio uses the founder's name or initials. Clients hire a person's taste, so the name is the brand."},{"heading":"Typeface sets the style","text":"Serifs like RH, Schumacher and Havenly feel classic and luxurious. Light sans serifs like West Elm and Studio McGee feel calm and modern."},{"heading":"Colour is rare and powerful","text":"Commune's red, Knoll's orange-red, Herman Miller's red and Article's coral dot stand out because most interior brands are black or grey."},{"heading":"Short names win","text":"RH, HAY, CB2 and DWR shorten long names to a few letters that work on tags, boxes and storefronts."}],
  "checklistHeading":"A practical checklist for an interior design logo",
  "checklistItems":["Does the typeface match the style of your interiors?","Is it simple enough to emboss, foil or print on fabric tags?","Is there one detail you can own, like a monogram, a colour or a full stop?","Does it avoid clichés like houses, sofas and lamps?","Will it read small on Instagram and large on a showroom wall?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Branding an interior design studio?</h2><p>I design brand identities for interior designers, architects and home brands, from logos and stationery to websites and brand guidelines. See how I branded <a href=\"/work/wingnut\">Wingnut, a high-end interiors company</a>.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What makes a good interior design logo?","answer":"A good interior design logo is a refined wordmark with one memorable detail. The typeface should match the style of your interiors, and the logo should work embossed, printed on fabric and small on social media."},
  {"question":"What fonts are best for an interior design logo?","answer":"Classic serifs suit traditional and luxury interiors, light sans serifs suit modern and minimal work, and condensed capitals suit bold, dramatic styles. Keep it to one typeface and space it generously."},
  {"question":"Should an interior design logo include a symbol?","answer":"It is optional. Most leading studios use only a name or initials. If you add a symbol, keep it simple, like a monogram, and avoid houses, sofas and lamps."},
  {"question":"What colours work for an interior design logo?","answer":"Black, grey and deep neutrals are the most common because they sit well next to any interior. One signature colour, like Commune's red or Article's coral dot, can make a simple logo memorable."},
  {"question":"How much does an interior design logo cost?","answer":"Prices range from a few hundred dollars for a template to tens of thousands with a large agency. I design a complete brand identity in one week for a flat $3,000, including the logo, colours, typography and guidelines."}],
 "tags":["interior design logos","interior designer logos","furniture logos","home decor logos","logo design"],
}
if os.path.exists('public/images/blog/interior-design-logos/cover-collage.webp'):
    C=I; post['image']={**post['image'],"src":f"{C}/cover-collage.webp","thumbnail":f"{C}/cover-collage-768w.webp","alt":open('tools/article-graphics/interior-logos/cover_alt.txt').read().strip()}; post['seo']['image']=f"{C}/cover-collage-og.webp"
    credit=open('tools/article-graphics/interior-logos/cover_credit.html').read().strip() if os.path.exists('tools/article-graphics/interior-logos/cover_credit.html') else ''
    if credit: post['logoRosterConfig']['conclusionHtml']+=credit
json.dump(post,open(P,'w'),ensure_ascii=False,indent=2)
idx=json.load(open('public/content/blog/index.json'))
entry={k:post[k] for k in ('slug','url','title','description','category','categorySlug','readTime','date','image')}
pos=next((i for i,x in enumerate(idx) if x['slug']=='interior-design-logos'),None)
if pos is None: idx.insert(0,entry)
else: idx[pos]=entry
json.dump(idx,open('public/content/blog/index.json','w'),ensure_ascii=False,indent=2)
print('ok', len(B))
