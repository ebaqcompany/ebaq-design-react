# Writes public/content/blog/private-equity-logos.json (logo roster format, full-width annotated slides) and its index entry.
import json, sys
sys.path.insert(0,'tools/article-graphics/pe-logos'); import pe
P='public/content/blog/private-equity-logos.json'; old=json.load(open('public/content/blog/gym-logos.json')); old={k:old[k] for k in ('category','author','categorySlug') if k in old}; old.update({'slug':'private-equity-logos','url':'/blog/private-equity-logos'})
I='/images/blog/private-equity-logos'
B=pe.B
boards=[("private-equity-logos-01-global-private-equity-giants","Private equity giants logos, 01 to 09: Blackstone, KKR, The Carlyle Group, Apollo, TPG, Bain Capital, Warburg Pincus, Brookfield, Ares Management"),
 ("private-equity-logos-02-european-and-global-buyout-firms","European and global buyout firm logos, 10 to 18: EQT, CVC, Permira, Advent International, Cinven, Apax Partners, BC Partners, Partners Group, Hg"),
 ("private-equity-logos-03-technology-and-growth-equity","Technology and growth equity firm logos, 19 to 27: Thoma Bravo, Vista Equity Partners, Silver Lake, General Atlantic, Insight Partners, Francisco Partners, Summit Partners, TA Associates, Accel-KKR"),
 ("private-equity-logos-04-classic-american-buyout-firms","Classic American buyout firm logos, 28 to 36: Hellman & Friedman, Clayton, Dubilier & Rice, Leonard Green & Partners, Genstar Capital, Thomas H. Lee Partners, Welsh, Carson, Anderson & Stowe, Stone Point Capital, Platinum Equity, American Securities"),
 ("private-equity-logos-05-credit-specialist-and-newer-firms","Credit and specialist private equity logos, 37 to 45: Blue Owl, Sixth Street, Oaktree, Cerberus, Clearlake Capital, L Catterton, Centerbridge, H.I.G. Capital, Veritas Capital")]
title="45 Private Equity Logos Explained"
desc="45 private equity firm logos explained by a brand designer: giants like Blackstone, KKR and Carlyle, European buyout firms, tech investors like Thoma Bravo and Silver Lake, and classic and newer firms."
hero_alt="Boardroom credenza lined with acrylic deal tombstones showing Blackstone, KKR, Carlyle, Apollo, TPG and other private equity logos"
post=dict(old); post.pop('body',None)
post.update({"title":title,"date":"Nov 22, 2026","readTime":"16 min read","description":desc,"categorySlug":"logo-design",
 "image":{"src":f"{I}/private-equity-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/private-equity-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/private-equity-logos-hero-og.webp"},
 "intro":f'<p>A private equity logo rarely appears on a shelf or a billboard. It lives on pitch books, fund documents, conference badges, deal announcements and the acrylic deal tombstones that sit in every partner\'s office. The best private equity logos are <strong>quiet, confident and trustworthy</strong>, because their real audience is investors, founders and management teams deciding who to trust with billions.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/private-equity-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-private-equity-logo">What makes a good private equity logo?</h2><p><strong>Trust before personality:</strong> most firms use serif type, navy and small capitals, borrowing the visual language of private banks and law firms.</p><p><strong>Names that carry weight:</strong> founders\' surnames (KKR, Hellman & Friedman, Warburg Pincus) and classical references (Apollo, Ares, Veritas, Cerberus) do most of the work, so symbols are often small or missing.</p><p><strong>A clear specialism:</strong> technology investors like Thoma Bravo, Vista and Insight Partners look more like tech brands, while credit and infrastructure firms like Brookfield and Oaktree choose heavier, more solid shapes.</p><p>Below are 45 private equity logos in five groups: global giants, European and global buyout firms, technology and growth equity, classic American buyout firms, and credit, specialist and newer firms. Each logo has a slide with my handwritten notes and a short explanation. If you are building a financial brand, see my <a href="/blog/investment-firm-logos">investment firm logos</a>, <a href="/blog/bank-logos">bank logos</a> and <a href="/blog/fintech-logos">fintech logos</a>, and my guide to <a href="/blog/logo-color">logo colours</a>.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/private-equity-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"45 private equity logos",
  "listIntro":["The boards below show all 45 private equity logos in one consistent format, grouped into global giants, European buyout firms, technology and growth investors, classic American buyout firms, and credit and specialist firms.","Each logo is reviewed for its design decisions, not for the size, returns or reputation of the firm."],
  "sectionNames":["Global private equity giants","European and global buyout firms","Technology and growth equity","Classic American buyout firms","Credit, specialist and newer firms"],
  "sectionIntroductions":["The largest alternative asset managers use calm, confident wordmarks, often with no symbol at all, because their names already carry the weight.","European buyout firms are more willing to use colour and graphic marks, from Cinven's teal block to Permira's orange flames.","Technology investors look more like the software companies they back, with clean sans serifs, bold colour and modern monograms.","America's classic buyout firms keep the look of a private bank or law partnership, with serif type, initials and navy blue.","Credit, specialist and newer firms mix the two worlds, adding icons like owls, trees and cubes to otherwise quiet wordmarks."],
  "sectionBridge":["This is a visual comparison of private equity logos, not a ranking of firms.","Look at how each logo uses type, colour and one symbol to signal trust, scale or specialism."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look on a pitch book, a deal tombstone and a conference badge."]],
  "findings":[{"heading":"Serif type means trust","text":"Blackstone, Carlyle, Apollo, Warburg Pincus, Hellman & Friedman, WCAS and Stone Point all use serif or small-capital type that feels like a private bank."},{"heading":"Names do the heavy lifting","text":"KKR, CD&R, TPG, THL and H.I.G. shorten long partnership names into initials, while Apollo, Ares, Veritas and Cerberus borrow from myth and Latin."},{"heading":"Tech investors look like tech brands","text":"Thoma Bravo, Vista, Insight Partners and General Atlantic use modern sans serifs, bold colour and graphic marks."},{"heading":"Colour is a differentiator","text":"KKR's purple, Apollo's green, Insight's orange and Cinven's teal stand out in a sector where almost everyone uses navy."}],
  "checklistHeading":"A practical checklist for a private equity logo",
  "checklistItems":["Does it feel trustworthy and serious on a fund document or pitch book?","Does it work small, on a deal tombstone, a press release or a conference badge?","Does it signal your focus, from software to infrastructure?","Does it stand out from the navy-and-serif look of competitors?","Will it still work in one colour, engraved in acrylic or printed in black?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Launching or rebranding a private equity or investment firm?</h2><p>I design brand identities for investment firms, from logos and pitch decks to websites and fund materials.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p><p><small>Cover photo: <a href=\"https://commons.wikimedia.org/wiki/File:Blackstone_(55283755213).jpg\" rel=\"nofollow\">Blackstone</a> by Ajay Suresh, <a href=\"https://creativecommons.org/licenses/by/4.0\" rel=\"nofollow\">CC BY 4.0</a>, via Wikimedia Commons, cropped and used in a collage.</small></p>"},
 "faq":[
  {"question":"What makes a good private equity logo?","answer":"A good private equity logo is calm, confident and trustworthy. It works on fund documents, pitch books, deal tombstones and websites, and it usually relies on strong typography rather than a complicated symbol."},
  {"question":"What are the most famous private equity logos?","answer":"The most recognised private equity logos include Blackstone, KKR, The Carlyle Group, Apollo, TPG, Bain Capital, Warburg Pincus, EQT, Thoma Bravo and Silver Lake."},
  {"question":"Why do so many private equity logos look like banks or law firms?","answer":"Private equity firms manage money for pension funds, endowments and wealthy families, so they borrow the serif type, navy colour and initials of banks and law firms to signal stability and trust."},
  {"question":"Should a private equity firm use a symbol in its logo?","answer":"Many top firms use only a wordmark, but a simple symbol can help a newer or smaller firm stand out, as Blue Owl, Oaktree and Sixth Street show."},
  {"question":"How much does a private equity logo cost?","answer":"A professional private equity brand identity usually costs from several thousand dollars for a new fund to much more for a firm that needs a full identity, website, pitch deck and fund materials."}],
 "tags":["private equity logos","private equity firm logos","investment firm logos","finance logos","logo design"],
})
# Never override a custom collage cover saved from tools/cover-generator: keep its card/OG image, hero stays in the intro.
import os
if os.path.exists('public/images/blog/private-equity-logos/cover-collage.webp'):
    C='/images/blog/private-equity-logos'; post['image']={**post['image'],"src":f"{C}/cover-collage.webp","thumbnail":f"{C}/cover-collage-768w.webp"}; post['seo']['image']=f"{C}/cover-collage-og.webp"
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
idx=[x for x in idx if x['slug']!='private-equity-logos']
g=next(x for x in idx if x['slug']=='gym-logos')
e={k:g[k] for k in g if k in ('category','categorySlug')}
e.update({"slug":"private-equity-logos","url":"/blog/private-equity-logos","title":title,"description":desc,"date":"Nov 22, 2026","readTime":"16 min read","categorySlug":"logo-design","image":{"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
idx.insert(1,e)
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
