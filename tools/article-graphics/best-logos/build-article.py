# Builds public/content/blog/best-logos.json (54 best logos of all time, refresh of the original article, slide format) and adds its index entry.
# Run from the repo root.
import json, sys, os
sys.path.insert(0,'tools/article-graphics/best-logos'); import bestlogos as data
P='public/content/blog/best-logos.json'
I='/images/blog/best-logos'
B=data.B
boards=[("best-logos-01-wordmarks","Best wordmark logos, 01 to 09: Coca-Cola, Sony, Google, FedEx, Disney, Netflix, Supreme, Visa, Kellogg's"),
 ("best-logos-02-monograms","Best monogram logos, 10 to 18: IBM, Louis Vuitton, H&M, Chanel, HP, CNN, GE, Volkswagen, McDonald's"),
 ("best-logos-03-pictorial-marks","Best pictorial logos, 19 to 27: Apple, Twitter, Shell, Target, WWF, Lacoste, Puma, Penguin Books, Instagram"),
 ("best-logos-04-abstract-marks","Best abstract logos, 28 to 36: Nike, Chase, Mitsubishi, Pepsi, Mercedes-Benz, Adidas, Airbnb, Spotify, Mastercard"),
 ("best-logos-05-mascot-logos","Best mascot logos, 37 to 45: KFC, Michelin, Pringles, Mailchimp, Reddit, Duolingo, Wendy's, Planters, BIC"),
 ("best-logos-06-emblems","Best emblem logos, 46 to 54: Starbucks, Harley-Davidson, BMW, Porsche, Ford, Warner Bros., Burger King, Stella Artois, Lamborghini")]
title="54 Best Logos of All Time"
desc="The 54 best logos of all time explained by a brand designer: wordmarks, monograms, pictorial, abstract, mascot and emblem logos from Coca-Cola and Apple to Nike and Starbucks."
hero_alt=open('tools/article-graphics/best-logos/hero_alt.txt').read().strip()
L=lambda h,t:f'<a href="{h}">{t}</a>'
book='<figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="Arek Dvornechuck holding his logo design book" src="/images/blog/best-logos/arek-logo-book-960.webp" width="960" height="540" decoding="async"/></div></figure>'
post={"slug":"best-logos","url":"/blog/best-logos","category":"Logo Design","categorySlug":"logo-design","author":"arek-dvornechuck-ebaqdesign",
 "title":title,"date":"Nov 23, 2026","readTime":"16 min read","description":desc,
 "image":{"src":f"{I}/best-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/best-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/best-logos-hero-og.webp"},
 "intro":f'<p>The best logos of all time are <strong>simple, memorable and timeless</strong>. They are easy to draw from memory, they work at any size, and they have stayed recognisable for decades, often with only small updates.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/best-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><p>A powerful logo can become a timeless symbol of brand identity, instantly recognisable across generations. In this guide I explore 54 of the most iconic logos across six types, and explain why they have stood the test of time and what makes them so effective.</p>{book}<h2 id="what-makes-a-great-logo">What makes a great logo?</h2><p><strong>Simplicity:</strong> the Nike swoosh, the Apple apple and McDonald\'s arches can be drawn in a few seconds. Simple shapes are easier to remember.</p><p><strong>One big idea:</strong> FedEx\'s hidden arrow and Airbnb\'s Bélo each say one thing clearly.</p><p><strong>Versatility:</strong> a great logo works in one colour, on a phone icon, a shop sign and a sneaker.</p><p><strong>Consistency over time:</strong> Coca-Cola, Shell and Mercedes-Benz have refined their logos for decades instead of replacing them, so recognition keeps growing.</p><p>The logos below are grouped by type: wordmarks, monograms, pictorial marks, abstract marks, mascots and emblems. Each one has a slide with my handwritten notes and a short explanation. To learn more about each type, read my guide to the {L("/blog/types-of-logos","types of logos")}, and see my deep dives on {L("/blog/wordmark-logo-design","wordmark logos")}, {L("/blog/monogram-logo-design","monogram logos")}, {L("/blog/abstract-logo-design","abstract logos")} and {L("/blog/brand-mascots","mascot logos")}.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/best-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"54 best logos of all time",
  "listIntro":["The boards below show all 54 logos in one consistent format, grouped into the six main types of logos.","Each logo is reviewed for its design decisions, not for the size or success of the company behind it."],
  "sectionNames":["Best wordmark logos","Best monogram logos","Best pictorial logos","Best abstract logos","Best mascot logos","Best emblem logos"],
  "sectionIntroductions":["Wordmarks, or logotypes, are text-only logos that spell out a company's name in a distinctive typeface. They shine when the brand name is memorable and concise.","Monogram logos use two to four letters. They are perfect for companies with long names or those that want a compact visual identity.","Pictorial marks use a recognisable image or symbol that has been simplified and stylised.","Abstract marks use geometric or organic shapes to create unique, memorable symbols that can grow in meaning over time.","Mascot logos feature characters that embody the brand's personality and values.","Emblems combine text and symbols inside a single contained design, often like a badge or a seal."],
  "sectionBridge":["This is a visual study of iconic logos, not a ranking of companies.","Look at how each logo uses one clear idea, a limited palette and a shape you can draw from memory."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look on a phone icon, a shop sign and a product."]],
  "findings":[{"heading":"Simple shapes win","text":"The swoosh, the apple, the arches and the bullseye can be drawn in seconds. The simpler the shape, the easier it is to remember."},{"heading":"Great logos evolve slowly","text":"Coca-Cola, Shell, Mercedes-Benz and Starbucks have refined their logos for decades instead of replacing them."},{"heading":"The best symbols drop the name","text":"Apple, Nike, Starbucks, Target, McDonald's and Mastercard are recognised without any words."},{"heading":"Founders and mascots build warmth","text":"KFC's Colonel, Wendy's portrait and Disney's signature-style script make huge companies feel personal."},{"heading":"Flat is the new standard","text":"Volkswagen, BMW, Pepsi and Burger King all simplified their logos into flat designs that work better on screens."}],
  "checklistHeading":"What the best logos have in common",
  "checklistItems":["Can you draw it from memory in a few seconds?","Does it work in one colour and at a tiny size?","Is there one clear idea instead of several?","Will it still make sense in 20 years?","Does it fit the brand's personality, from playful to luxurious?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Want a logo that lasts?</h2><p>The best logos of all time share several key characteristics: they are simple enough to be memorable, versatile enough to work across many applications, and timeless enough to remain relevant for decades. Whether wordmark, monogram, pictorial, abstract, mascot or emblem, these logos prove that effective brand design transcends trends and becomes part of our visual language.</p><p>I design logos and brand identities for startups and growing companies. See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What are the best logos of all time?","answer":"Some of the most celebrated logos are the Nike swoosh, the Apple apple, Coca-Cola's script, McDonald's golden arches, the FedEx arrow, IBM's stripes and the Starbucks siren. They are simple, memorable and have stayed recognisable for decades."},
  {"question":"What makes a logo great?","answer":"A great logo is simple, memorable, versatile and timeless. It has one clear idea, works in one colour and at small sizes, and fits the brand's personality."},
  {"question":"What are the main types of logos?","answer":"The main types are wordmarks, monograms or lettermarks, pictorial marks, abstract marks, mascots and emblems. Many brands also use a combination of a symbol and a wordmark."},
  {"question":"Why are the best logos so simple?","answer":"Simple logos are easier to recognise, remember and reproduce. They work on everything from app icons to billboards, and they age better than detailed designs."},
  {"question":"How much does it cost to design a great logo?","answer":"Prices range from a few hundred dollars for a template to tens of thousands with a large agency. I design a complete brand identity, including the logo, in one week for a flat $3,000."}],
 "tags":["best logos","best logos of all time","famous logos","iconic logos","logo design"],
}
if os.path.exists('public/images/blog/best-logos/cover-collage.webp'):
    C=I; post['image']={**post['image'],"src":f"{C}/cover-collage.webp","thumbnail":f"{C}/cover-collage-768w.webp","alt":open('tools/article-graphics/best-logos/cover_alt.txt').read().strip()}; post['seo']['image']=f"{C}/cover-collage-og.webp"
    credit=open('tools/article-graphics/best-logos/cover_credit.html').read().strip() if os.path.exists('tools/article-graphics/best-logos/cover_credit.html') else ''
    if credit: post['logoRosterConfig']['conclusionHtml']+=credit
json.dump(post,open(P,'w'),ensure_ascii=False,indent=2)
idx=json.load(open('public/content/blog/index.json'))
entry={k:post[k] for k in ('slug','url','title','description','category','categorySlug','readTime','date','image')}
pos=next((i for i,x in enumerate(idx) if x['slug']=='best-logos'),None)
if pos is None: idx.insert(0,entry)
else: idx[pos]=entry
json.dump(idx,open('public/content/blog/index.json','w'),ensure_ascii=False,indent=2)
print('ok', len(B))
