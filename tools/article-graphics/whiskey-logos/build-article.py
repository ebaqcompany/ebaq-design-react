# Writes public/content/blog/whiskey-logos.json (logo roster format, full-width annotated slides) and its index entry.
import json, sys
sys.path.insert(0,'tools/article-graphics/whiskey-logos'); import whiskey
P='public/content/blog/whiskey-logos.json'; old=json.load(open('public/content/blog/gym-logos.json')); old={k:old[k] for k in ('category','author','categorySlug') if k in old}; old.update({'slug':'whiskey-logos','url':'/blog/whiskey-logos'})
I='/images/blog/whiskey-logos'
B=whiskey.B
boards=[("whiskey-logos-01-scotch-whisky-icons","Scotch whisky logos, 01 to 09: Johnnie Walker, Chivas Regal, Glenfiddich, The Macallan, The Glenlivet, Glenmorangie, Laphroaig, J&B, Dewar's"),
 ("whiskey-logos-02-bourbon-and-american-whiskey","Bourbon and American whiskey logos, 10 to 18: Jack Daniel's, Jim Beam, Maker's Mark, Wild Turkey, Buffalo Trace, Woodford Reserve, Bulleit, Four Roses, Knob Creek"),
 ("whiskey-logos-03-irish-whiskey","Irish whiskey logos, 19 to 27: Jameson, Bushmills, Tullamore D.E.W., Redbreast, Teeling, Powers, Green Spot, Slane, Roe & Co"),
 ("whiskey-logos-04-japanese-and-world-whisky","Japanese and world whisky logos, 28 to 36: Suntory, Nikka, Mackmyra, Amrut, Paul John, Crown Royal, Canadian Club, Starward, Penderyn"),
 ("whiskey-logos-05-craft-and-design-led-distilleries","Craft distillery logos, 37 to 45: Westland, Bruichladdich, Kings County, WhistlePig, Uncle Nearest, High West, Compass Box, Waterford, Cotswolds")]
title="45 Best Whiskey Logos Explained by a Brand Designer [2026]"
desc="45 whiskey logos explained by a brand designer: Scotch icons like Johnnie Walker and The Macallan, bourbons like Jack Daniel's and Maker's Mark, Irish, Japanese and world whisky, and craft distilleries."
hero_alt="Whiskey bar back-bar lined with Johnnie Walker, Jack Daniel's, Jameson, Glenfiddich, The Macallan, Maker's Mark and other whiskey bottles"
post=dict(old); post.pop('body',None)
post.update({"title":title,"date":"Nov 22, 2026","readTime":"16 min read","description":desc,"categorySlug":"logo-design",
 "image":{"src":f"{I}/whiskey-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/whiskey-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/whiskey-logos-hero-og.webp"},
 "intro":f'<p>A whiskey logo has to look good on a bottle label, a bar shelf, a glass, a cask and a gift box, and it often has to promise decades or even centuries of tradition. The best whiskey logos are <strong>full of heritage, rich in detail, and instantly recognisable on a crowded back-bar</strong>.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/whiskey-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-whiskey-logo">What makes a good whiskey logo?</h2><p><strong>Heritage you can see:</strong> founding dates, crests, seals and founders\' names, like Johnnie Walker, Jameson, Dewar\'s and Powers, tell you the whiskey has a long history.</p><p><strong>A symbol that lives on the bottle:</strong> the Johnnie Walker Striding Man, the Maker\'s Mark wax seal, the Wild Turkey turkey and the Crown Royal crown work even when the name is too small to read.</p><p><strong>A clear sense of place:</strong> many whiskey brands are named after valleys, rivers, towns and islands, like Glenfiddich, Laphroaig, Buffalo Trace and Bruichladdich, and their logos lean on that story.</p><p>Below are 45 whiskey logos in five groups: Scotch whisky icons, bourbon and American whiskey, Irish whiskey, Japanese and world whisky, and craft distilleries. Each logo has a slide with my handwritten notes and a short explanation. If you are launching a spirits brand, see my <a href="/blog/branding-checklist">branding checklist</a> and my guides to <a href="/blog/logo-color">logo colours</a> and <a href="/blog/logo-fonts">logo fonts</a>. For more drinks brands, see my <a href="/blog/beer-logos">beer logos</a>.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/whiskey-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"45 whiskey logos",
  "listIntro":["The boards below show all 45 whiskey logos in one consistent format, grouped into Scotch, bourbon and American whiskey, Irish whiskey, Japanese and world whisky, and craft distilleries.","Each logo is reviewed for its design decisions, not for the taste, age or price of the whiskey."],
  "sectionNames":["Scotch whisky icons","Bourbon and American whiskey","Irish whiskey","Japanese and world whisky","Craft and design-led distilleries"],
  "sectionIntroductions":["Scotch logos are built on Gaelic place names, crests and founding dates, with serif type that feels centuries old.","American whiskey logos borrow from the frontier: animals, signatures, stamps and heavy type that feels rugged and honest.","Irish whiskey logos use family names, seals and green, often with dates that go back to the 1700s and 1800s.","Japanese and world whisky brands mix the heritage signals of Scotch with modern, clean type that reflects where they come from.","A new wave of craft distilleries uses simpler, more modern logos, while still borrowing badges, dates and emblems from tradition."],
  "sectionBridge":["This is a visual comparison of whiskey logos, not a ranking of whiskies.","Look at how each logo uses type, colour and one symbol to signal heritage, place or craft."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look on a label, a cask and a bar shelf."]],
  "findings":[{"heading":"Dates and crests sell age","text":"Dewar's, Powers, Cotswolds, Amrut and Bruichladdich put founding dates in the logo, and Chivas Regal, Nikka and The Glenlivet use crests, because heritage suggests quality."},{"heading":"Founders become brands","text":"Johnnie Walker, Jack Daniel's, Jim Beam, Jameson and Paul John turn a person's name, signature or figure into the logo."},{"heading":"Place names carry the story","text":"Glenfiddich, Laphroaig, Glenmorangie, Bruichladdich, Buffalo Trace and Knob Creek are named after valleys, islands and landmarks."},{"heading":"Craft brands keep it simpler","text":"Starward, Mackmyra, Waterford and Kings County use clean modern type, setting themselves apart from ornate traditional labels."}],
  "checklistHeading":"A practical checklist for a whiskey logo",
  "checklistItems":["Does the logo look premium on a bottle, a gift box and a cask?","Is it readable from across a bar, on a crowded back-bar shelf?","Is there a symbol, seal or monogram that can work alone on a cork, glass or wax seal?","Does it tell a clear story of heritage, place or founder?","Will it still work in one colour, embossed, engraved or printed on wood?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Launching or rebranding a whiskey or spirits brand?</h2><p>I design brand identities for spirits, food and drink brands, from logos and labels to packaging, gift boxes and websites.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p><p><small>Cover photo: <a href=\"https://commons.wikimedia.org/wiki/File:Johnnie_Walker_Blends_Lineup.jpg\" rel=\"nofollow\">Johnnie Walker Blends Lineup</a> by Aneil Lutchman, <a href=\"https://creativecommons.org/licenses/by-sa/2.0\" rel=\"nofollow\">CC BY-SA 2.0</a>, via Wikimedia Commons, used in a collage.</small></p>"},
 "faq":[
  {"question":"What makes a good whiskey logo?","answer":"A good whiskey logo signals heritage, quality and place. It works on a label, a cask, a cork and a glass, and it often has a symbol that can stand alone, like the Johnnie Walker Striding Man or the Maker's Mark seal."},
  {"question":"What are the most famous whiskey logos?","answer":"The most famous whiskey logos include Johnnie Walker, Jack Daniel's, Jameson, Jim Beam, Chivas Regal, Glenfiddich, The Macallan, Maker's Mark, Crown Royal and Wild Turkey."},
  {"question":"Why do whiskey logos use dates and crests?","answer":"Whiskey takes years to age, so buyers value tradition. Founding dates, crests, seals and signatures tell the buyer that a brand has a long history and a recipe worth trusting."},
  {"question":"What is the difference between whisky and whiskey?","answer":"Both spellings mean the same drink. Scotland, Japan and Canada usually write whisky, while Ireland and the United States usually write whiskey."},
  {"question":"How much does a whiskey logo cost?","answer":"A professional whiskey logo and brand identity usually costs from a few thousand dollars for a small craft distillery to much more for a brand with a full label system, packaging, gift boxes and a website."}],
 "tags":["whiskey logos","whisky logos","whiskey logo design","bourbon logos","scotch logos","alcohol logos","logo design"],
})
# Never override a custom collage cover saved from tools/cover-generator: keep its card/OG image, hero stays in the intro.
import os
if os.path.exists('public/images/blog/whiskey-logos/cover-collage.webp'):
    C='/images/blog/whiskey-logos'; post['image']={**post['image'],"src":f"{C}/cover-collage.webp","thumbnail":f"{C}/cover-collage-768w.webp"}; post['seo']['image']=f"{C}/cover-collage-og.webp"
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
idx=[x for x in idx if x['slug']!='whiskey-logos']
g=next(x for x in idx if x['slug']=='gym-logos')
e={k:g[k] for k in g if k in ('category','categorySlug')}
e.update({"slug":"whiskey-logos","url":"/blog/whiskey-logos","title":title,"description":desc,"date":"Nov 22, 2026","readTime":"16 min read","categorySlug":"logo-design","image":{"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
idx.insert(1,e)
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
