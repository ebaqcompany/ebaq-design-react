# Writes public/content/blog/fintech-logos.json (logo roster format, full-width annotated slides).
import json, sys
sys.path.insert(0,'tools/article-graphics/fintech-logos'); import fintech
P='public/content/blog/fintech-logos.json'; old=json.load(open(P))
I='/images/blog/fintech-logos'
B=fintech.B
boards=[("fintech-logos-01-payments","Payment company logos, 01 to 09"),("fintech-logos-02-money-transfer-and-global-payments","Money transfer and global payments logos, 10 to 18"),("fintech-logos-03-investing-and-trading","Investing and trading app logos, 19 to 27"),("fintech-logos-04-crypto-and-digital-assets","Crypto and digital asset company logos, 28 to 36"),("fintech-logos-05-neobanks-and-consumer-finance","Neobank and consumer finance logos, 37 to 45")]
title="45 Fintech Logos Explained"
desc="45 fintech logos explained by a brand designer, from Stripe, PayPal, and Wise to Robinhood, Coinbase, Klarna, and Chime."
hero_alt="Fintech founder looking at a screen showing 45 fintech company logos in a New York office"
post=dict(old); post.pop('body',None)
post.update({"title":title,"date":"Nov 21, 2026","readTime":"15 min read","description":desc,
 "image":{"src":f"{I}/fintech-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/fintech-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/fintech-logos-hero-og.webp"},
 "intro":f'<p>Fintech logos live inside app stores, on payment buttons, and on debit cards, so the best ones are <strong>trustworthy enough to hold your money and friendly enough to open every day</strong>.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/fintech-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-fintech-logo">What makes a good fintech logo?</h2><p><strong>Trust without stiffness:</strong> fintech brands compete with traditional banks, so most use friendly lowercase wordmarks and soft shapes, like Stripe, Chime, and Coinbase, instead of heavy serif crests.</p><p><strong>A shape that works as an app icon:</strong> the Cash App dollar, the PayPal double P, and the Square square are recognized on a phone screen without the name.</p><p><strong>Color as a signature:</strong> Venmo blue, Robinhood green, Klarna pink, and Binance yellow make each brand instantly recognizable in a crowded wallet.</p><p>Below are 45 fintech logos in five groups, from payments and money transfer to investing apps, crypto, and neobanks. Each one has a slide with my handwritten notes, followed by a short explanation. For traditional and digital banks, see my review of <a href="/blog/bank-logos">bank logos</a>.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/fintech-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"45 fintech logos",
  "listIntro":["The boards below show all 45 fintech logos in one consistent format, grouped into payments, money transfer, investing, crypto, and neobanks.","Each logo is reviewed for its design decisions, not for the product, fees, or financial performance."],
  "sectionNames":["Payments","Money transfer and global payments","Investing and trading","Crypto and digital assets","Neobanks and consumer finance"],
  "sectionIntroductions":["Payment brands appear on checkout buttons and terminals, so their logos are short, bold, and easy to recognize at a glance.","Money transfer companies sell speed and trust across borders, with forward-moving symbols and global color palettes.","Investing apps try to make the stock market feel approachable, with friendly type, bright colors, and growth symbols.","Crypto brands range from playful mascots to serious, institutional wordmarks, depending on who they want to reach.","Neobanks and consumer finance apps compete with big banks by looking friendlier, with rounded lowercase type and bright colors."],
  "sectionBridge":["This is a visual comparison of fintech logos, not a ranking of financial products.","Look at how each logo balances trust with friendliness, and how it would look as an app icon."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look as an app icon and on a payment card."]],
  "findings":[{"heading":"Lowercase is the fintech default","text":"Stripe, Chime, Coinbase, Affirm, and public all use lowercase wordmarks to feel more approachable than traditional banks."},{"heading":"The best marks work as app icons","text":"The Cash App dollar, the PayPal double P, Square's square, and the Binance diamond are recognized on a phone screen without the name."},{"heading":"Color is a signature","text":"Venmo blue, Robinhood and Chime green, Klarna pink, and Binance yellow each own a color in a crowded category."},{"heading":"Growth symbols are everywhere","text":"Acorns' acorn, Betterment's rising sun, Upstart's chevron, and Trading 212's caret all point to money growing over time."}],
  "checklistHeading":"A practical checklist for a new fintech logo",
  "checklistItems":["Does the logo feel trustworthy enough to hold someone's money?","Is the symbol recognizable as a small app icon without the name?","Can you own one color in your category?","Does it look good on a debit card, a payment button, and a phone notification?","Is it friendly without looking like a toy?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Building a fintech brand?</h2><p>I design brand identities and websites for fintech, SaaS, and AI startups, from logo and app icon to the full identity system and marketing website.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What makes a good fintech logo?","answer":"A good fintech logo balances trust with friendliness. The strongest examples, like Stripe, PayPal, and Cash App, use a simple shape or wordmark that works as an app icon, one signature color, and type that feels more approachable than a traditional bank."},
  {"question":"Why do so many fintech logos use lowercase letters?","answer":"Lowercase wordmarks feel friendlier and more modern than the serif capitals of traditional banks. Fintech brands like Stripe, Chime, Coinbase, and Affirm use them to signal that their product is simpler and easier to use."},
  {"question":"What colors do fintech brands use?","answer":"Fintech brands use a wider range of colors than banks. Blue still signals trust, but green suggests growth and money, while brighter colors like Klarna pink, Binance yellow, and Varo purple help apps stand out on a phone screen."}],
 "tags":["fintech logos","fintech logo design","finance logos","logo design","brand identity"],
})
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
e=next(x for x in idx if x['slug']=='fintech-logos')
e.update({"title":title,"description":desc,"date":"Nov 21, 2026","readTime":"15 min read","image":{"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
idx.remove(e); idx.insert(1,e)
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
