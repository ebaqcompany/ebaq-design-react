# Writes public/content/blog/vodka-logos.json (logo roster format, full-width annotated slides) and its index entry.
import json, sys
sys.path.insert(0,'tools/article-graphics/vodka-logos'); import vodka
P='public/content/blog/vodka-logos.json'; old=json.load(open('public/content/blog/gym-logos.json')); old={k:old[k] for k in ('category','author','categorySlug') if k in old}; old.update({'slug':'vodka-logos','url':'/blog/vodka-logos'})
I='/images/blog/vodka-logos'
B=vodka.B
boards=[("vodka-logos-01-global-vodka-icons","Global vodka logos, 01 to 09: Smirnoff, Absolut, Grey Goose, Ketel One, Belvedere, Stolichnaya, Skyy, Cîroc, Finlandia"),
 ("vodka-logos-02-polish-ukrainian-and-russian-vodka","Polish, Ukrainian and Russian vodka logos, 10 to 18: Beluga, Żubrówka, Chopin, Wyborowa, Nemiroff, Sobieski, Khortytsa, Green Mark, Pravda"),
 ("vodka-logos-03-american-vodka-brands","American vodka logos, 19 to 27: Tito's, Svedka, Deep Eddy, Pinnacle, Hangar 1, Wheatley, Western Son, UV, Three Olives"),
 ("vodka-logos-04-luxury-and-design-led-vodka","Luxury and design-led vodka logos, 28 to 36: Crystal Head, Absolut Elyx, Van Gogh, Effen, Elit, Kauffman, Black Cow, St. George, Hanson of Sonoma"),
 ("vodka-logos-05-nordic-dutch-and-world-vodka","Nordic, Dutch and world vodka logos, 37 to 45: Reyka, Danzka, Koskenkorva, Eristoff, Explorer, Ursus, Iceberg, 42 Below, Blue Ice")]
title="45 Vodka Logos Explained"
desc="45 vodka logos explained by a brand designer: global icons like Absolut, Grey Goose and Smirnoff, Polish and Ukrainian classics, American vodkas like Tito's, luxury brands, and Nordic and world vodka."
hero_alt="Ice bar lined with frosted Absolut, Grey Goose, Smirnoff, Belvedere, Ketel One, Tito's and other vodka bottles"
post=dict(old); post.pop('body',None)
post.update({"title":title,"date":"Nov 22, 2026","readTime":"16 min read","description":desc,"categorySlug":"logo-design",
 "image":{"src":f"{I}/vodka-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/vodka-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/vodka-logos-hero-og.webp"},
 "intro":f'<p>Vodka is a clear spirit that tastes much the same from brand to brand, so the logo and the bottle do a lot of the selling. The best vodka logos are <strong>clean, confident and instantly recognisable on a frosted bottle</strong>, and they tell a story about where the vodka comes from or how pure it is.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/vodka-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-vodka-logo">What makes a good vodka logo?</h2><p><strong>A clear origin story:</strong> Absolut writes \"Country of Sweden\", Grey Goose points to France, and Polish brands like Belvedere, Chopin and Żubrówka put national symbols at the centre.</p><p><strong>A logo that works on clear glass:</strong> vodka bottles are often transparent or frosted, so the best logos use strong contrast, simple shapes and lots of white space.</p><p><strong>Purity and cold:</strong> blue colours, spaced capitals, ice, mountains and water show up again and again, because they suggest a clean, smooth spirit.</p><p>Below are 45 vodka logos in five groups: global vodka icons, Polish, Ukrainian and Russian vodka, American vodka brands, luxury and design-led vodka, and Nordic, Dutch and world vodka. Each logo has a slide with my handwritten notes and a short explanation. If you are launching a spirits brand, see my <a href="/blog/branding-checklist">branding checklist</a> and my guides to <a href="/blog/logo-color">logo colours</a> and <a href="/blog/logo-fonts">logo fonts</a>. For more drinks brands, see my <a href="/blog/whiskey-logos">whiskey logos</a> and <a href="/blog/beer-logos">beer logos</a>.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/vodka-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"45 vodka logos",
  "listIntro":["The boards below show all 45 vodka logos in one consistent format, grouped into global icons, Polish, Ukrainian and Russian vodka, American brands, luxury vodka, and Nordic, Dutch and world vodka.","Each logo is reviewed for its design decisions, not for the taste, price or popularity of the vodka."],
  "sectionNames":["Global vodka icons","Polish, Ukrainian and Russian vodka","American vodka brands","Luxury and design-led vodka","Nordic, Dutch and world vodka"],
  "sectionIntroductions":["The world's biggest vodka brands use simple, confident logos that work on every bar shelf, from Absolut's bold capitals to Grey Goose's goose in flight.","Vodka's home countries lean on crests, crowns, animals and composers, with type that feels traditional and national.","American vodka brands are more playful and local, with hand-drawn letters, mascots and badges that point to Texas, California and beyond.","Luxury vodkas use minimal type, unusual symbols and striking bottles to justify a higher price.","Nordic and world vodkas sell cold, clean water and nature, with spaced capitals, ice, ships and wolves."],
  "sectionBridge":["This is a visual comparison of vodka logos, not a ranking of vodkas.","Look at how each logo uses type, colour and one symbol to signal purity, origin or personality."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look on clear glass, a frosted bottle and a bar menu."]],
  "findings":[{"heading":"Origin is the main message","text":"Absolut says \"Country of Sweden\", Grey Goose is made in France, Belvedere and Chopin are proudly Polish, and Reyka, Koskenkorva and Finlandia lean on Nordic water."},{"heading":"Animals and symbols carry the brand","text":"The Grey Goose goose, the Żubrówka bison, the Beluga sturgeon, the Black Cow and the Eristoff wolf make clear spirits easy to remember."},{"heading":"Spaced capitals mean purity","text":"Stoli, Effen, Reyka, Belvedere and Cîroc use wide letter spacing to feel clean, light and premium."},{"heading":"The bottle is part of the logo","text":"Crystal Head's skull, Danzka's aluminium bottle and Absolut's famous bottle shape show that for vodka, packaging and logo work as one."}],
  "checklistHeading":"A practical checklist for a vodka logo",
  "checklistItems":["Is the logo readable on clear and frosted glass?","Does it signal a clear origin, from Poland to Texas?","Is there a symbol that can work alone on a cap, a glass or a cocktail menu?","Does the colour suggest cold, clean and pure?","Will it still work in one colour, etched, embossed or printed on a sleeve?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Launching or rebranding a vodka or spirits brand?</h2><p>I design brand identities for spirits, food and drink brands, from logos and labels to bottles, packaging and websites.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p><p><small>Cover photo: <a href=\"https://commons.wikimedia.org/wiki/File:Absolut_Vodka_(3_Bottles).jpg\" rel=\"nofollow\">Absolut Vodka (3 Bottles)</a> by Stefan-Xp, <a href=\"https://creativecommons.org/licenses/by-sa/3.0\" rel=\"nofollow\">CC BY-SA 3.0</a>, via Wikimedia Commons, used in a collage.</small></p>"},
 "faq":[
  {"question":"What makes a good vodka logo?","answer":"A good vodka logo is clean, simple and readable on clear or frosted glass. It usually signals purity and origin, and it often has a symbol that works alone, like the Grey Goose goose or the Żubrówka bison."},
  {"question":"What are the most famous vodka logos?","answer":"The most famous vodka logos include Smirnoff, Absolut, Grey Goose, Ketel One, Belvedere, Tito's, Stoli, Cîroc, Skyy and Finlandia."},
  {"question":"Why do so many vodka logos use blue?","answer":"Blue suggests cold, clean water and ice, which supports the idea of a pure, smooth spirit. Absolut, Skyy, Grey Goose, Belvedere and Sobieski all use blue in their branding."},
  {"question":"Why is the bottle so important for vodka brands?","answer":"Because vodka is clear and tastes similar across brands, the bottle and logo do most of the work on the shelf. Absolut, Crystal Head, Belvedere and Danzka are known as much for their bottles as for their logos."},
  {"question":"How much does a vodka logo cost?","answer":"A professional vodka logo and brand identity usually costs from a few thousand dollars for a small craft distillery to much more for a brand with a full bottle design, labels, packaging and a website."}],
 "tags":["vodka logos","vodka logo design","vodka brands","spirits logos","alcohol logos","logo design"],
})
# Never override a custom collage cover saved from tools/cover-generator: keep its card/OG image, hero stays in the intro.
import os
if os.path.exists('public/images/blog/vodka-logos/cover-collage.webp'):
    C='/images/blog/vodka-logos'; post['image']={**post['image'],"src":f"{C}/cover-collage.webp","thumbnail":f"{C}/cover-collage-768w.webp"}; post['seo']['image']=f"{C}/cover-collage-og.webp"
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
idx=[x for x in idx if x['slug']!='vodka-logos']
g=next(x for x in idx if x['slug']=='gym-logos')
e={k:g[k] for k in g if k in ('category','categorySlug')}
e.update({"slug":"vodka-logos","url":"/blog/vodka-logos","title":title,"description":desc,"date":"Nov 22, 2026","readTime":"16 min read","categorySlug":"logo-design","image":{"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
idx.insert(1,e)
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
