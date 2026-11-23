# Builds public/content/blog/consulting-logos.json (27 firms, slide format) and adds its index entry.
import json, sys, os
sys.path.insert(0,'tools/article-graphics/consulting-logos'); import consulting as data
P='public/content/blog/consulting-logos.json'
I='/images/blog/consulting-logos'
B=data.B
boards=[("consulting-logos-01-strategy-consulting-firms","Strategy consulting firm logos, 01 to 09: McKinsey & Company, BCG, Bain & Company, Oliver Wyman, Kearney, Roland Berger, L.E.K. Consulting, Strategy&, Simon-Kucher"),
 ("consulting-logos-02-big-four-and-large-consulting-firms","Big Four and large consulting firm logos, 10 to 18: Deloitte, PwC, EY, KPMG, Accenture, Capgemini, Booz Allen Hamilton, Alvarez & Marsal, FTI Consulting"),
 ("consulting-logos-03-specialist-and-boutique-consulting-firms","Specialist and boutique consulting firm logos, 19 to 27: Arthur D. Little, ZS, Huron, Guidehouse, West Monroe, Slalom, Mercer, Capco, Korn Ferry")]
title="27 Consulting Logos Explained"
desc="27 consulting firm logos explained by a brand designer: McKinsey, BCG and Bain, the Big Four, Accenture and other large firms, plus specialist consultancies like ZS, Slalom and Korn Ferry."
hero_alt=open('tools/article-graphics/consulting-logos/hero_alt.txt').read().strip()
post={"slug":"consulting-logos","url":"/blog/consulting-logos","category":"Logo Design","categorySlug":"logo-design","author":"arek-dvornechuck-ebaqdesign",
 "title":title,"date":"Nov 23, 2026","readTime":"12 min read","description":desc,
 "image":{"src":f"{I}/consulting-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/consulting-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/consulting-logos-hero-og.webp"},
 "intro":f'<p>The best consulting logos are <strong>clean wordmarks with one memorable detail</strong>. Most firms sell expertise, not a product, so their logos lead with the name and signal <strong>clarity, confidence and scale</strong>. The ones you remember add a single ownable element: BCG\'s green square, Deloitte\'s green dot, Accenture\'s purple arrow or EY\'s yellow beam.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/consulting-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-consulting-logo">What makes a good consulting logo?</h2><p><strong>The name comes first:</strong> clients hire a firm\'s reputation, so most consulting logos are wordmarks. Many firms shorten long names to initials, like BCG, EY, KPMG, PwC and ZS.</p><p><strong>One distinctive detail:</strong> a colour, a dot, a beam or a symbol does more for recognition than a complicated icon.</p><p><strong>A tone that fits the client:</strong> strategy firms look like private banks, technology consultancies look like software brands, and specialist firms often use a symbol that hints at their focus.</p><p>Below are 27 consulting logos in three groups: strategy consulting firms, the Big Four and large firms, and specialist and boutique consultancies. Each logo has a slide with my handwritten notes and a short explanation. If you run a consultancy, also read my guide to <a href="/blog/consultancy-branding">consultancy branding</a>, and see my <a href="/blog/law-firm-logos">law firm logos</a>, <a href="/blog/investment-firm-logos">investment firm logos</a> and <a href="/blog/bank-logos">bank logos</a>.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/consulting-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"27 consulting logos",
  "listIntro":["The boards below show all 27 consulting logos in one consistent format, grouped into strategy firms, the Big Four and large firms, and specialist consultancies.","Each logo is reviewed for its design decisions, not for the size, rankings or reputation of the firm."],
  "sectionNames":["Strategy consulting firms","Big Four and large consulting firms","Specialist and boutique consulting firms"],
  "sectionIntroductions":["The top strategy firms use quiet, confident wordmarks, and each one owns a single detail, like BCG's green square, Bain's red or the green inside L.E.K.'s K.","The Big Four and other large firms work in dozens of countries, so their logos are short, bold and built around one colour accent.","Specialist consultancies are freer with symbols, from ZS's striped mark to Guidehouse's arrow and Korn Ferry's KF monogram."],
  "sectionBridge":["This is a visual comparison of consulting logos, not a ranking of consulting firms.","Look at how each logo uses type, colour and one detail to signal expertise, scale or a specialism."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look on a report cover, a slide deck and a recruiting banner."]],
  "findings":[{"heading":"Initials win","text":"BCG, PwC, EY, KPMG, ZS and Capco shorten long names, and Kearney and Strategy& dropped older names entirely. Short names are easier to say, remember and fit on a slide."},{"heading":"One accent beats a symbol","text":"Deloitte's green dot, EY's yellow beam, Accenture's purple arrow and BCG's green square are more recognisable than any abstract icon."},{"heading":"Strategy firms stay quiet","text":"McKinsey, Bain, Roland Berger and Oliver Wyman use restrained type and little colour to signal discretion and authority."},{"heading":"Tech consultancies look like tech","text":"Slalom, West Monroe and Accenture use lowercase, rounded or bright wordmarks that feel closer to software brands."}],
  "checklistHeading":"A practical checklist for a consulting logo",
  "checklistItems":["Is the firm name easy to read on a report cover, a slide and a phone screen?","Is there one ownable detail, like a colour, dot, beam or monogram?","Does it avoid generic consulting clichés like arrows, bar charts and globes?","Does it fit your clients, from boardrooms to startups or the public sector?","Will it still work in one colour, small in a slide footer or on a recruiting banner?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Building or rebranding a consultancy?</h2><p>I design brand identities for consulting firms and professional services, from logos and slide templates to websites and brand guidelines. My guide to <a href=\"/blog/consultancy-branding\">consultancy branding</a> explains how to position a firm before you design the logo.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p><p><em>Cover photo: Boston Consulting Group office, Boston, by Ajay Suresh, <a href=\"https://commons.wikimedia.org/wiki/File:Boston_Consulting_Group_(BCG)_(54960644081).jpg\" target=\"_blank\" rel=\"noopener noreferrer\">Wikimedia Commons</a>, <a href=\"https://creativecommons.org/licenses/by/4.0/\" target=\"_blank\" rel=\"noopener noreferrer\">CC BY 4.0</a>, cropped.</em></p>"},
 "faq":[
  {"question":"What makes a good consulting logo?","answer":"A good consulting logo is easy to read, distinctive and flexible. Most strong examples lead with the firm's name or initials, use one or two restrained colours, and add one ownable detail, such as Deloitte's green dot or EY's yellow beam."},
  {"question":"Why do so many consulting firms use initials?","answer":"Long partnership and merger names are hard to say and fit on slides. Initials like BCG, PwC, EY, KPMG and ZS are shorter, easier to remember and work at small sizes."},
  {"question":"What colours do consulting firms use?","answer":"Navy, black and dark green are the most common because they signal trust and seriousness. Firms that want to stand out add one bright accent, like Deloitte's green, EY's yellow, Accenture's purple or Bain's red."},
  {"question":"Should a consulting logo have a symbol?","answer":"It is optional. Many leading firms use a wordmark only, and the ones with symbols keep them simple, like Capgemini's spade, Guidehouse's arrow or Mercer's ribbon. A simple symbol helps for app icons and social profiles."},
  {"question":"How much does a consulting logo cost?","answer":"Prices range from a few hundred dollars for a template to tens of thousands with a large agency. I design a complete brand identity in one week for a flat $3,000, including the logo, colours, typography and guidelines."}],
 "tags":["consulting logos","consulting firm logos","consultancy logo design","professional services branding","logo design"],
}
if os.path.exists('public/images/blog/consulting-logos/cover-collage.webp'):
    C=I; post['image']={**post['image'],"src":f"{C}/cover-collage.webp","thumbnail":f"{C}/cover-collage-768w.webp","alt":"Consulting Logos cover collage with the Boston Consulting Group office tower in Boston"}; post['seo']['image']=f"{C}/cover-collage-og.webp"
json.dump(post,open(P,'w'),ensure_ascii=False,indent=2)
idx=json.load(open('public/content/blog/index.json'))
entry={k:post[k] for k in ('slug','url','title','description','category','categorySlug','readTime','date','image')}
pos=next((i for i,x in enumerate(idx) if x['slug']=='consulting-logos'),None)
if pos is None: idx.insert(0,entry)
else: idx[pos]=entry
json.dump(idx,open('public/content/blog/index.json','w'),ensure_ascii=False,indent=2)
print('ok', len(B))
