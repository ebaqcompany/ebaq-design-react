# Writes public/content/blog/jewelry-logos.json (logo roster format, full-width annotated slides).
import json, sys
sys.path.insert(0,'tools/article-graphics/jewelry-logos'); import jewelry
P='public/content/blog/jewelry-logos.json'; old=json.load(open(P))
I='/images/blog/jewelry-logos'
B=jewelry.B
boards=[("jewelry-logos-01-iconic-jewelry-houses","Iconic jewelry house logos, 01 to 09: Cartier, Tiffany & Co., Bulgari, Van Cleef & Arpels, Harry Winston, Graff, Chopard, Boucheron, Chaumet"),
 ("jewelry-logos-02-heritage-fine-jewelers","Heritage fine jeweler logos, 10 to 18: Piaget, Buccellati, De Beers, Mikimoto, Damiani, Pomellato, Fred, Garrard, Asprey"),
 ("jewelry-logos-03-designer-fine-jewelry","Designer fine jewelry logos, 19 to 27: David Yurman, Messika, Repossi, Jessica McCormack, Sophie Buhai, Anita Ko, Suzanne Kalan, Spinelli Kilcollin, Jennifer Meyer"),
 ("jewelry-logos-04-accessible-and-demi-fine-jewelry","Accessible and demi-fine jewelry brand logos, 28 to 36: Pandora, Swarovski, Mejuri, Alex and Ani, Monica Vinader, Missoma, Thomas Sabo, Astrid & Miyu, Catbird"),
 ("jewelry-logos-05-jewelry-retailers","Jewelry retailer logos, 37 to 45: Chow Tai Fook, Tanishq, Blue Nile, Brilliant Earth, Zales, Kay Jewelers, Helzberg Diamonds, Mappin & Webb, Tous")]
title="45 Jewelry Logos Explained"
desc="45 jewelry brand logos with names, explained by a brand designer: luxury houses like Cartier, Tiffany & Co., and Bulgari, designer labels, accessible brands, and jewelry retailers."
hero_alt="Jewelry designer at a workbench looking at a screen showing 45 jewelry brand logos"
post=dict(old); post.pop('body',None)
post.update({"title":title,"date":"Nov 22, 2026","readTime":"16 min read","description":desc,"categorySlug":"logo-design",
 "image":{"src":f"{I}/jewelry-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/jewelry-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/jewelry-logos-hero-og.webp"},
 "intro":f'<p>A jewelry logo has to work on a tiny clasp, a ring box, a shopping bag, and a store front, and it has to feel as precious as the pieces it sells. The best jewelry logos are <strong>simple, refined, and built from carefully chosen type</strong>, often with a single detail that signals craft or heritage.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/jewelry-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-jewelry-logo">What makes a good jewelry logo?</h2><p><strong>Typography that feels precious:</strong> most jewelry brands use a wordmark, from the flowing script of Cartier to the Roman capitals of Bulgari. The letterforms carry the luxury.</p><p><strong>One detail of craft or heritage:</strong> the best logos add one small idea, like the Roman V in Bulgari, the crown on the Pandora O, or the diamond-cut A in Zales.</p><p><strong>Restraint in colour:</strong> jewelry logos are usually black, gold, or one signature tone, so the packaging and the stones do the talking, like Tiffany Blue or the Cartier red box.</p><p>Below are 45 jewelry brand logos with names, in five groups: iconic jewelry houses, heritage fine jewelers, designer fine jewelry, accessible and demi-fine brands, and jewelry retailers. Each logo has a slide with my handwritten notes and a short explanation. If you are building a premium jewelry brand, see how I approach <a href="/luxury-branding">luxury branding</a>, and read my guides to <a href="/blog/fashion-logos">fashion logos</a>, <a href="/blog/monogram-logo-design">monogram logos</a>, and <a href="/blog/logo-fonts">logo fonts</a>.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/jewelry-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"45 jewelry brand logos",
  "listIntro":["The boards below show all 45 jewelry logos in one consistent format, grouped into iconic houses, heritage fine jewelers, designer fine jewelry, accessible brands, and retailers.","Each logo is reviewed for its design decisions, not for the brand's size or the value of its jewelry."],
  "sectionNames":["Iconic jewelry houses","Heritage fine jewelers","Designer fine jewelry","Accessible and demi-fine jewelry","Jewelry retailers"],
  "sectionIntroductions":["The most famous jewelry houses, many of them on Place Vendôme or Fifth Avenue, rely on founders' names set in timeless serifs and scripts.","Heritage fine jewelers from Italy, Japan, Britain, and Switzerland often add a founding date, an emblem, or a city to their wordmark.","Independent designers use their own names in clean, modern type that feels personal and editorial.","Accessible and demi-fine brands sell online and in malls, so their logos are bolder, simpler, and built for social media.","Jewelry retailers need logos that read from across a shopping mall or on a phone screen, so they favour bold type and strong colour."],
  "sectionBridge":["This is a visual comparison of jewelry logos, not a ranking of jewelers.","Look at how each logo uses type, a symbol, or one detail to signal its price point and personality."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look on a ring box, a clasp, and a store front."]],
  "findings":[{"heading":"Jewelry logos are mostly names","text":"Cartier, Tiffany & Co., Harry Winston, Graff, and David Yurman all use the founder's name as the logo, so the typeface does the work."},{"heading":"Heritage is written into the logo","text":"Boucheron, Buccellati, Damiani, Garrard, and Helzberg add a founding year or city to their wordmark to prove their history."},{"heading":"Luxury uses serifs and scripts, mass market uses bold sans","text":"High jewelry favours fine serifs and calligraphy, while Pandora, Mejuri, Kay, and Tous use heavy, simple letters that read at a glance."},{"heading":"Colour lives in the packaging","text":"Most jewelry logos are black, while the brand colour appears on boxes and bags, like Tiffany Blue, the Cartier red, and Asprey purple."}],
  "checklistHeading":"A practical checklist for a jewelry logo",
  "checklistItems":["Does the logo work at tiny sizes, like on a clasp, tag, or engraving?","Does the typeface match your price point, from high jewelry to demi-fine?","Could one detail, like a monogram or a custom letter, make it more memorable?","Will it look right embossed in gold foil on a ring box and a shopping bag?","Is it simple enough to engrave, stamp, or print in one colour?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Need a logo for your jewelry brand?</h2><p>I design brand identities for jewelry, fashion, and luxury brands, from wordmarks and monograms to packaging and e-commerce websites.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What makes a good jewelry logo?","answer":"A good jewelry logo is simple, refined, and readable at very small sizes. It uses carefully chosen type, often a serif or a script, and sometimes one memorable detail, like the Roman V in Bulgari or the crown on the Pandora O."},
  {"question":"What are the most famous jewelry brand logos?","answer":"The most famous jewelry logos include Cartier, Tiffany & Co., Bulgari, Van Cleef & Arpels, Harry Winston, Graff, Chopard, Pandora, and Swarovski. Most of them are wordmarks based on the founder's name."},
  {"question":"What fonts do luxury jewelry brands use?","answer":"Luxury jewelry brands use classic serif capitals, like Tiffany & Co., Bulgari, and Graff, or calligraphic scripts, like Cartier and Chopard. Accessible brands, like Pandora and Mejuri, use bold sans serifs. Most of these logos are custom-drawn."},
  {"question":"What colours are best for a jewelry logo?","answer":"Black, gold, and one signature colour work best for jewelry logos. Many brands keep the logo black and put their colour on the packaging, like Tiffany Blue, the red Cartier box, and Asprey purple."},
  {"question":"Should a jewelry logo have a symbol?","answer":"A symbol or monogram helps when the logo needs to appear on clasps, charms, and engraving. Brands like Tanishq, Buccellati, and Chaumet pair a wordmark with an emblem, while many luxury houses rely on the wordmark alone."}],
 "tags":["jewelry logos","jewelry brand logos","jewellery logos","luxury jewelry logos","jewelry logo design","logo design"],
})
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
e=next(x for x in idx if x['slug']=='jewelry-logos')
e.update({"title":title,"description":desc,"date":"Nov 22, 2026","readTime":"16 min read","categorySlug":"logo-design","image":{"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
idx.remove(e); idx.insert(1,e)
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
