# Writes public/content/blog/biotech-startup-branding.json (logo roster format, full-width annotated slides).
import json, sys
sys.path.insert(0,'tools/article-graphics/biotech-logos'); import biotech
P='public/content/blog/biotech-startup-branding.json'; old=json.load(open(P))
I='/images/blog/biotech-startup-branding'
B=biotech.B
boards=[("biotech-logos-01-big-biotech","Big biotech company logos, 01 to 09"),("biotech-logos-02-gene-editing-and-cell-therapy","Gene editing and cell therapy company logos, 10 to 18"),("biotech-logos-03-ai-and-techbio","AI drug discovery and techbio logos, 19 to 27"),("biotech-logos-04-tools-and-synthetic-biology","Biotech tools and synthetic biology logos, 28 to 36"),("biotech-logos-05-biotech-startups-and-longevity","Biotech startup and longevity company logos, 37 to 45")]
title="Biotech Logos: 45 Best Biotech Company Logos Explained [2026]"
desc="45 biotech logos explained by a brand designer, from Amgen, Vertex, and BioNTech to CRISPR, Recursion, Ginkgo Bioworks, and the newest biotech startups."
hero_alt="Scientist in a biotech lab looking at a screen showing 45 biotech company logos"
post=dict(old); post.pop('body',None)
post.update({"title":title,"date":"Nov 21, 2026","readTime":"15 min read","description":desc,
 "image":{"src":f"{I}/biotech-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/biotech-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/biotech-logos-hero-og.webp"},
 "intro":f'<p>A biotech logo has to earn trust from scientists, investors, regulators, and patients at the same time, so the best ones are <strong>credible enough for a clinical trial and distinctive enough to stand out in a crowded pipeline slide</strong>.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/biotech-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-biotech-logo">What makes a good biotech logo?</h2><p><strong>Science you can see:</strong> the strongest biotech marks borrow a real idea from biology, like Intellia&#39;s sequencing bars, Profluent&#39;s protein ribbon, or Ginkgo&#39;s leaf inside a gear, instead of a generic double helix.</p><p><strong>Credibility first:</strong> clinical-stage companies sell to regulators and investors, so most use calm, confident wordmarks and restrained color.</p><p><strong>A clear personality:</strong> newer techbio and longevity startups are breaking the mold with literal animals, bold black type, and colors you would expect from a consumer brand.</p><p>Below are 45 biotech logos in five groups, from big biotech and gene editing to AI drug discovery, research tools, and the newest biotech startups. Each one has a slide with my handwritten notes, followed by a short explanation.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/biotech-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"45 biotech company logos",
  "listIntro":["The boards below show all 45 biotech logos in one consistent format, grouped into big biotech, gene editing and cell therapy, AI and techbio, tools and synthetic biology, and biotech startups.","Each logo is reviewed for its design decisions, not for the company's science or pipeline."],
  "sectionNames":["Big biotech","Gene editing and cell therapy","AI and techbio","Tools and synthetic biology","Biotech startups and longevity"],
  "sectionIntroductions":["The largest biotech companies use bold, confident wordmarks that look stable on a pill bottle, a stock ticker, and a building.","Gene editing companies often borrow from the science itself, with sequence bars, edited letters, and lab-label layouts.","AI-driven biotech companies look more like software startups, with clean wordmarks and data-inspired symbols.","Tools and synthetic biology brands sell to scientists, so their logos mix precision with a playful, maker attitude.","Biotech startups and longevity companies are the most experimental, from crypto-style badges to literal mammoths and rising suns."],
  "sectionBridge":["This is a visual comparison of biotech logos, not a ranking of companies or science.","Look at how each logo balances scientific credibility with a distinctive personality."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look on a pipeline slide, a lab coat, and an investor deck."]],
  "findings":[{"heading":"The best biotech symbols come from the science","text":"Intellia's sequencing bars, Profluent's protein ribbon, and Ginkgo's leaf in a gear say what the company does without a generic DNA helix."},{"heading":"Literal animals are back","text":"Caribou and Mammoth use literal animal symbols that are far easier to remember than abstract molecules."},{"heading":"Techbio looks like software","text":"Recursion, Isomorphic Labs, Xaira, and Cradle look closer to AI startups than to traditional pharma."},{"heading":"Big biotech stays bold and simple","text":"Amgen, CSL, Regeneron, and Genentech rely on strong wordmarks that work on everything from vials to stock tickers."}],
  "checklistHeading":"A practical checklist for a new biotech logo",
  "checklistItems":["Does the symbol come from your actual science, not a generic helix or molecule?","Does it look credible on an investor deck and a regulatory filing?","Will it still work when your company grows from one program to a full pipeline?","Is your color different from the blues and greens of most competitors?","Does it work small, in one color, on a lab label or a vial?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Building a biotech brand?</h2><p>I design brand identities and websites for biotech, health tech, and AI startups, from logo and visual identity to investor-ready websites.</p><p>Explore my <a href=\"/ai-healthcare-branding\"><strong>AI and healthcare branding services</strong></a> or <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What makes a good biotech logo?","answer":"A good biotech logo builds trust with scientists, investors, and regulators while staying distinctive. The strongest examples take their symbol from the company's actual science, like sequencing bars or a protein ribbon, and pair it with a calm, confident wordmark that works small and in one color."},
  {"question":"Should a biotech logo use a DNA helix?","answer":"Usually not. The double helix is so common in biotech that it no longer sets a company apart. A symbol based on your specific technology, a literal metaphor like Caribou's caribou, or a strong wordmark like Amgen's is far more memorable."},
  {"question":"What colors do biotech logos use?","answer":"Most biotech logos use blue, green, and navy to signal trust and science. Brands that stand out often break that pattern, like CSL's bright red, PacBio's magenta, or the black type used by many new longevity startups."}],
 "tags":["biotech logos","biotech branding","biotech logo design","logo design","brand identity"],
})
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
e=next(x for x in idx if x['slug']=='biotech-startup-branding')
e.update({"title":title,"description":desc,"date":"Nov 21, 2026","readTime":"15 min read","image":{"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
idx.remove(e); idx.insert(1,e)
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
