# Writes public/content/blog/fashion-logos.json (logo roster format, full-width annotated slides).
import json, sys
sys.path.insert(0,'tools/article-graphics/fashion-logos'); import fashion
P='public/content/blog/fashion-logos.json'; old=json.load(open(P))
I='/images/blog/fashion-logos'
B=fashion.B
boards=[("fashion-logos-01-luxury-fashion-houses","Luxury fashion house logos, 01 to 09: Gucci, Louis Vuitton, Chanel, Hermès, Prada, Dior, Fendi, Versace, Burberry"),
 ("fashion-logos-02-paris-and-milan-labels","Paris and Milan designer label logos, 10 to 18: Givenchy, Balenciaga, Saint Laurent, Celine, Valentino, Giorgio Armani, Dolce & Gabbana, Bottega Veneta, Loewe"),
 ("fashion-logos-03-designer-brands","Designer clothing brand logos, 19 to 27: Ralph Lauren, Calvin Klein, Tommy Hilfiger, Marc Jacobs, Alexander McQueen, Stella McCartney, Vivienne Westwood, Paul Smith, Hugo Boss"),
 ("fashion-logos-04-shoes-bags-and-accessories","Shoe, bag and accessory brand logos, 28 to 36: Jimmy Choo, Christian Louboutin, Coach, Michael Kors, Kate Spade, Tory Burch, Longchamp, Ferragamo, Miu Miu"),
 ("fashion-logos-05-streetwear-and-high-street","Streetwear and high-street clothing brand logos, 37 to 45: Off-White, Supreme, Stüssy, Moncler, Acne Studios, Zara, H&M, Uniqlo, Levi's")]
title="45 Best Fashion Brand Logos Explained by a Brand Designer [2026]"
desc="45 fashion and clothing brand logos with names, explained by a brand designer: luxury houses like Gucci, Chanel, and Hermès, designer labels, accessories, and streetwear."
hero_alt="Fashion designer in a Paris studio looking at a screen showing 45 fashion brand logos"
post=dict(old); post.pop('body',None)
post.update({"title":title,"date":"Nov 22, 2026","readTime":"16 min read","description":desc,"categorySlug":"logo-design",
 "image":{"src":f"{I}/fashion-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/fashion-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/fashion-logos-hero-og.webp"},
 "intro":f'<p>Fashion logos have to work on a shopping bag, a clothing label, a belt buckle, and a phone screen, and the best ones become so famous that people buy products just to wear them. Most of them are surprisingly simple: <strong>a founder\'s name in carefully chosen type, sometimes paired with a monogram or an emblem</strong>.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/fashion-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-fashion-logo">What makes a good fashion logo?</h2><p><strong>A name, set beautifully:</strong> most fashion brands are named after their founders, like Chanel, Dior, and Ralph Lauren, so the wordmark is the logo. The choice of typeface does all the work.</p><p><strong>A monogram that becomes a pattern:</strong> the Gucci GG, the Louis Vuitton LV, and the Fendi FF are printed on bags and fabrics, so the monogram becomes the product itself.</p><p><strong>Typography that signals the price point:</strong> high-contrast serifs feel like couture, wide sans serifs feel modern and minimal, and handwritten scripts feel personal.</p><p>Below are 45 fashion brand logos with names, in five groups: luxury fashion houses, Paris and Milan labels, designer brands, shoes, bags and accessories, and streetwear and high street. Each logo has a slide with my handwritten notes and a short explanation. If you are building a premium label, see how I approach <a href="/luxury-branding">luxury branding</a>, and read my guides to <a href="/blog/monogram-logo-design">monogram logos</a>, <a href="/blog/wordmark-logo-design">wordmark logos</a>, and <a href="/blog/logo-fonts">logo fonts</a>.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/fashion-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"45 fashion brand logos",
  "listIntro":["The boards below show all 45 fashion brand logos in one consistent format, grouped into luxury houses, Paris and Milan labels, designer brands, shoes and accessories, and streetwear and high street.","Each logo is reviewed for its design decisions, not for the brand's size or popularity."],
  "sectionNames":["Luxury fashion houses","Paris and Milan labels","Designer brands","Shoes, bags and accessories","Streetwear and high street"],
  "sectionIntroductions":["The oldest and most valuable fashion houses rely on heritage: founders' names, monograms, and emblems that have barely changed in decades.","The big Paris and Milan labels show how a typeface can define an era, from Hedi Slimane's minimal sans serifs to the quiet serifs of Bottega Veneta and Loewe.","Designer brands from New York, London, and Germany are mostly named after their founders, and their wordmarks range from preppy serifs to handwriting.","Shoe, bag, and accessory brands have to work on tiny surfaces like soles, clasps, and hardware, so many of them pair a wordmark with a compact symbol.","Streetwear and high-street brands are louder and more graphic, with red boxes, graffiti signatures, and bold colours made for shop fronts and social media."],
  "sectionBridge":["This is a visual comparison of fashion brand logos, not a ranking of brands.","Look at how each logo uses type, a monogram, or one detail to signal its price point and personality."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look on a label, a shopping bag, and a store front."]],
  "findings":[{"heading":"Fashion logos are mostly names","text":"Almost every brand on this list is named after its founder, from Chanel and Dior to Ralph Lauren and Paul Smith. The wordmark is the logo, so the typeface choice is the whole design."},{"heading":"Monograms turn logos into products","text":"Gucci, Louis Vuitton, Fendi, Givenchy, and Tory Burch use initials that also work as prints, clasps, and hardware. A monogram lets customers wear the brand."},{"heading":"Luxury is getting simpler","text":"Saint Laurent, Celine, Balenciaga, Burberry, and Ferragamo all simplified their wordmarks in the last decade, dropping first names, accents, or scripts."},{"heading":"Colour is rare, except in streetwear","text":"Luxury brands stick to black, while Supreme, H&M, Uniqlo, and Levi's use bold red to stand out on shop fronts and feeds."}],
  "checklistHeading":"A practical checklist for a fashion brand logo",
  "checklistItems":["Does the wordmark work on a woven label, a shopping bag, and a phone screen?","Does the typeface match your price point, from couture serif to streetwear sans?","Could a monogram or symbol work on hardware, prints, and small accessories?","Is it simple enough to embroider, emboss, or print in one colour?","Will it still look right in ten years, or does it follow a short-lived trend?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Starting or rebranding a fashion brand?</h2><p>I design brand identities for fashion, beauty, and luxury brands, from wordmarks and monograms to packaging and e-commerce websites.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What makes a good fashion brand logo?","answer":"A good fashion logo is simple, timeless, and built from carefully chosen type. It works on labels, shopping bags, hardware, and screens, and it signals the brand's price point, like the high-contrast serif of Dior or the bold sans serif of Balenciaga."},
  {"question":"Why are so many fashion logos just the founder's name?","answer":"Most fashion houses started as one designer's studio, like Chanel, Dior, or Ralph Lauren, so the founder's name became the brand. A well-set wordmark carries that personal heritage and is easy to protect as a trademark."},
  {"question":"What is the difference between a fashion logo and a monogram?","answer":"The logo is usually the full brand name, while a monogram combines initials into one mark, like the Gucci GG or the Louis Vuitton LV. Luxury brands use monograms as patterns on bags and fabrics, so the monogram becomes part of the product."},
  {"question":"What fonts do luxury fashion brands use?","answer":"Luxury fashion brands use either high-contrast serif fonts, like Dior, Valentino, and Zara, or clean geometric and grotesque sans serifs, like Chanel, Saint Laurent, and Celine. Most are custom-drawn or heavily adjusted, so they cannot be copied exactly with a free font."},
  {"question":"What colours do fashion logos use?","answer":"Most luxury fashion logos are black so they work on any product and photograph. Colour is more common in streetwear and high street, like the red of Supreme, H&M, Uniqlo, and Levi's."}],
 "tags":["fashion logos","fashion brand logos","clothing brand logos","luxury brand logos","designer logos","logo design"],
})
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
e=next(x for x in idx if x['slug']=='fashion-logos')
e.update({"title":title,"description":desc,"date":"Nov 22, 2026","readTime":"16 min read","categorySlug":"logo-design","image":{"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
idx.remove(e); idx.insert(1,e)
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
