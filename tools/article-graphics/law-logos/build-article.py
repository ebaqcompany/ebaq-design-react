# Rebuilds public/content/blog/law-firm-logos.json in the slide format (54 firms) and updates its index entry in place.
import json, sys, os
sys.path.insert(0,'tools/article-graphics/law-logos'); import law
P='public/content/blog/law-firm-logos.json'; prev=json.load(open(P))
old={k:prev[k] for k in ('slug','url','category','author','categorySlug','selectedWorkSlugs') if k in prev}
I='/images/blog/law-firm-logos'
B=law.B
boards=[("law-firm-logos-01-new-york-elite-firms","New York law firm logos, 01 to 09: Cravath, Paul Weiss, Sullivan & Cromwell, Davis Polk, Skadden, Wachtell Lipton, Simpson Thacher, Cleary Gottlieb, Milbank"),
 ("law-firm-logos-02-global-law-firm-giants","Global law firm logos, 10 to 18: Kirkland & Ellis, Latham & Watkins, DLA Piper, Baker McKenzie, Dentons, White & Case, Gibson Dunn, Sidley, Jones Day"),
 ("law-firm-logos-03-london-magic-circle-and-uk-firms","London and UK law firm logos, 19 to 27: Clifford Chance, Freshfields, Linklaters, A&O Shearman, Slaughter and May, Herbert Smith Freehills Kramer, Hogan Lovells, Norton Rose Fulbright, Withers"),
 ("law-firm-logos-04-tech-startup-and-ip-law-firms","Tech, startup and IP law firm logos, 28 to 36: Cooley, Wilson Sonsini, Gunderson Dettmer, Fenwick, Orrick, Goodwin, Fish & Richardson, Quinn Emanuel, Morrison Foerster"),
 ("law-firm-logos-05-litigation-boutiques-and-design-led-firms","Litigation boutique and design-led law firm logos, 37 to 45: Susman Godfrey, Keker Van Nest & Peters, Boies Schiller Flexner, Selendy Gay, Wilkinson Stekloff, Bartlit Beck, MoloLamken, Axinn, Fox Berman"),
 ("law-firm-logos-06-international-law-firms","International law firm logos, 46 to 54: Mori Hamada & Matsumoto, Nishimura & Asahi, Garrigues, Uría Menéndez, Galicia Abogados, Brigard Urrutia, Rajah & Tann, Torys, Bell Gully")]
title="54 Best Law Firm Logos Explained by a Brand Designer [2026]"
desc="54 law firm logos explained by a brand designer: New York's elite firms, global giants, the London Magic Circle, tech and IP firms, litigation boutiques like Fox Berman, and international firms."
hero_alt="Brass directory plates in a Manhattan office lobby showing Cravath, Skadden, Kirkland & Ellis, Latham & Watkins and other law firm logos"
post=dict(old)
post.update({"title":title,"date":"Nov 22, 2026","readTime":"18 min read","description":desc,"categorySlug":"logo-design",
 "image":{"src":f"{I}/law-firm-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/law-firm-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/law-firm-logos-hero-og.webp"},
 "intro":f'<p>The best law firm logos are <strong>simple, typographic and built for trust</strong>. Most leading firms use a wordmark of the firm\'s name in navy or black, with no scales, gavels or columns. The ones you remember add <strong>one ownable detail</strong>: a coloured box, a monogram, an underline or a single accent colour.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/law-firm-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-law-firm-logo">What makes a good law firm logo?</h2><p><strong>Clarity first:</strong> a client should recognise the firm before they have to decode a symbol. That is why so many firms shorten long partnership names, like Skadden, Sidley, Milbank and Fenwick.</p><p><strong>One distinctive detail:</strong> Skadden\'s red box, Dentons\' purple arrow, Hogan Lovells\' lime square and Fish & Richardson\'s teal dot make otherwise simple wordmarks memorable.</p><p><strong>A tone that fits the practice:</strong> Wall Street firms look like private banks, tech law firms like Cooley and Fenwick look like the startups they advise, and litigation boutiques often choose bolder, more personal type.</p><p>Below are 54 law firm logos in six groups: New York\'s elite firms, global giants, the London Magic Circle and UK firms, tech, startup and IP firms, litigation boutiques and design-led firms (including Fox Berman, a firm I branded), and international firms. Each logo has a slide with my handwritten notes and a short explanation. For more professional services brands, see my <a href="/blog/investment-firm-logos">investment firm logos</a>, <a href="/blog/private-equity-logos">private equity logos</a> and <a href="/blog/bank-logos">bank logos</a>, and my guide to <a href="/blog/logo-color">logo colours</a>.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/law-firm-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} law firm logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"54 law firm logos",
  "listIntro":["The boards below show all 54 law firm logos in one consistent format, grouped into New York's elite firms, global giants, London and UK firms, tech and IP firms, litigation boutiques, and international firms.","Each logo is reviewed for its design decisions, not for the size, rankings or reputation of the firm."],
  "sectionNames":["New York elite firms","Global law firm giants","London Magic Circle and UK firms","Tech, startup and IP law firms","Litigation boutiques and design-led firms","International law firms"],
  "sectionIntroductions":["Wall Street's oldest firms use classic serif and small-capital wordmarks, with one or two bold exceptions like Skadden's red box.","The largest global firms are more willing to use colour, shapes and monograms, because their logos have to work in dozens of countries.","London's Magic Circle mixes tradition and boldness, from Slaughter and May's quiet purple to Linklaters' magenta and Freshfields' heavy capitals.","Firms that advise startups and technology companies look like tech brands, with bold sans serifs, icons and bright accents.","Trial boutiques use more personal, distinctive type, because their partners are the brand.","International firms combine local languages and scripts with simple, global-friendly wordmarks."],
  "sectionBridge":["This is a visual comparison of law firm logos, not a ranking of law firms.","Look at how each logo uses type, colour and one detail to signal trust, scale or specialism."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look on a letterhead, a court filing and a website."]],
  "findings":[{"heading":"Shorter names win","text":"Skadden, Sidley, Milbank, Fenwick, Freshfields and Cleary Gottlieb shorten long partnership names, which makes the logo easier to say, remember and use."},{"heading":"One accent beats a symbol","text":"Skadden's red box, Hogan Lovells' lime square, Dentons' purple, Linklaters' magenta and Fish & Richardson's teal dot do more than any scales of justice."},{"heading":"Navy and serif still dominate","text":"Cravath, Davis Polk, Kirkland & Ellis, Simpson Thacher and Garrigues use the classic language of serif type and dark colour to signal stability."},{"heading":"Tech law firms look like tech","text":"Cooley, Fenwick, Goodwin, Orrick and Wilson Sonsini use modern sans serifs and icons that feel familiar to startup founders."}],
  "checklistHeading":"A practical checklist for a law firm logo",
  "checklistItems":["Is the firm name easy to read on a letterhead, a court filing and a phone screen?","Is there one ownable detail, like a colour, box, monogram or underline?","Does it avoid generic legal clichés like scales, gavels and columns?","Does it fit your practice, from Wall Street finance to startups or family law?","Will it still work in one colour, embossed on stationery or engraved on a door plate?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Building or rebranding a law firm?</h2><p>I design brand identities for law firms, from logos and stationery to websites and brand guidelines. See how I branded <a href=\"/work/fox-berman\">Fox Berman</a>, a boutique business law firm in Sint Maarten.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[f for f in prev["faq"]],
 "tags":["law firm logos","law firm logo design","attorney logos","legal branding","logo design"],
})
for f in post["faq"]:
    f["answer"]=f["answer"].replace("None of the 99 logos in this article","None of the 54 logos in this article")
# Never override a custom collage cover saved from tools/cover-generator: keep its card/OG image, hero stays in the intro.
import os
if os.path.exists('public/images/blog/law-firm-logos/cover-collage.webp'):
    C='/images/blog/law-firm-logos'; post['image']={**post['image'],"src":f"{C}/cover-collage.webp","thumbnail":f"{C}/cover-collage-768w.webp"}; post['seo']['image']=f"{C}/cover-collage-og.webp"
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
for e in idx:
    if e['slug']=='law-firm-logos':
        e.update({"title":title,"description":desc,"date":"Nov 22, 2026","readTime":"18 min read","image":{**e.get("image",{}),"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
