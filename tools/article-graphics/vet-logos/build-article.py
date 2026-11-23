# Builds public/content/blog/veterinary-logos.json (36 vet and pet brands, slide format) and adds its index entry.
# Run from the repo root.
import json, sys, os
sys.path.insert(0,'tools/article-graphics/vet-logos'); import vet as data
P='public/content/blog/veterinary-logos.json'
I='/images/blog/veterinary-logos'
B=data.B
boards=[("veterinary-logos-01-vet-clinics-and-hospitals","Vet clinic and animal hospital logos, 01 to 09: Banfield Pet Hospital, VCA Animal Hospitals, BluePearl, Thrive Pet Healthcare, Bond Vet, Small Door Veterinary, Modern Animal, Medivet, Vets4Pets"),
 ("veterinary-logos-02-animal-health-and-pet-insurance","Animal health and pet insurance logos, 10 to 18: Zoetis, Elanco, IDEXX, Covetrus, Merck Animal Health, Hill's Pet Nutrition, Royal Canin, ManyPets, Pumpkin"),
 ("veterinary-logos-03-dog-brands","Dog brand logos, 19 to 27: BarkBox, Rover, Wag!, The Farmer's Dog, Ollie, Pedigree, Milk-Bone, Fi, KONG"),
 ("veterinary-logos-04-cat-brands","Cat brand logos, 28 to 36: Whiskas, Meow Mix, Friskies, Sheba, 9Lives, Temptations, Felix, Smalls, Litter-Robot")]
title="36 Vet and Pet Logos Explained"
desc="36 veterinary and pet logos explained by a brand designer: vet clinics like Banfield and VCA, animal health brands like Zoetis and Royal Canin, plus the best dog and cat brand logos."
hero_alt=open('tools/article-graphics/vet-logos/hero_alt.txt').read().strip()
L=lambda h,t:f'<a href="{h}">{t}</a>'
post={"slug":"veterinary-logos","url":"/blog/veterinary-logos","category":"Logo Design","categorySlug":"logo-design","author":"arek-dvornechuck-ebaqdesign",
 "title":title,"date":"Nov 23, 2026","readTime":"13 min read","description":desc,
 "image":{"src":f"{I}/veterinary-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/veterinary-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/veterinary-logos-hero-og.webp"},
 "intro":f'<p>The best veterinary logos <strong>mix care with warmth</strong>. A vet has to look as trustworthy as a doctor, but the patients are dogs and cats, so the strongest logos add <strong>one friendly animal detail</strong> to a clean, medical-looking base: the pets inside Banfield\'s cross, the cat face hidden in Thrive\'s v, or the heart-shaped pet in Bond Vet\'s mark.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/veterinary-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-veterinary-logo">What makes a good veterinary logo?</h2><p><strong>Trust first:</strong> owners bring a family member to the vet, so clear type, calm colours and a simple layout matter more than a clever drawing.</p><p><strong>One animal detail:</strong> a paw, an ear or a pet face tells people what you do at a glance. Use one, not a whole zoo.</p><p><strong>A colour you can own:</strong> most clinics pick blue or green. Coral, orange, purple or brown, like Bond Vet, Banfield or Modern Animal, makes a practice easier to remember.</p><p><strong>Room to grow:</strong> the logo has to work on a clinic sign, scrubs, an app icon and a pet insurance card.</p><p>Below are 36 logos in four groups: vet clinics and animal hospitals, animal health and pet insurance companies, dog brands and cat brands. Each logo has a slide with my handwritten notes and a short explanation. For more ideas, see my guides to {L("/blog/animal-logos","animal symbolism in logo design")}, {L("/blog/brand-mascots","brand mascots")} and {L("/blog/healthcare-logos","healthcare logos")}.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/veterinary-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"36 vet and pet logos",
  "listIntro":["The boards below show all 36 logos in one consistent format, grouped into vet clinics, animal health and pet insurance, dog brands and cat brands.","Each logo is reviewed for its design decisions, not for the quality of the care, food or products behind it."],
  "sectionNames":["Vet clinics and animal hospitals","Animal health and pet insurance","Dog brands","Cat brands"],
  "sectionIntroductions":["Vet clinic logos balance medical trust with pet warmth. The big hospital groups use crosses and clear wordmarks, while newer clinics like Bond Vet, Small Door and Modern Animal look more like lifestyle brands.","Animal health companies sell to vets and farmers, so their logos look like pharmaceutical brands. Pet food and pet insurance brands talk to owners and use warmer colours and softer letters.","Dog brands are loud and playful. Heavy letters, bright colours and one doggy detail, like a paw, a bone or a bark, do most of the work.","Cat brands lean on cat ears, scripts and premium cues like gold and purple, while newer brands like Smalls and Litter-Robot use clean, modern wordmarks."],
  "sectionBridge":["This is a visual comparison of veterinary and pet logos, not a ranking of clinics, insurers or products.","Look at how each logo uses type, colour and one animal detail to signal care, fun or quality."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look on a clinic sign, a pet food pack and an app icon."]],
  "findings":[{"heading":"Hidden pets beat cartoon pets","text":"Banfield's cross, Thrive's v, Bond Vet's heart and Medivet's M hide an animal inside a simple shape. They feel friendly without looking childish."},{"heading":"New clinics look like lifestyle brands","text":"Small Door, Modern Animal and Bond Vet use serifs, brown, coral and lowercase letters, closer to a boutique hotel than a hospital."},{"heading":"Dog brands are loud","text":"BARK, Wag!, KONG, Ollie and Fi use very heavy letters and strong colours that read well on packs and small screens."},{"heading":"Cat brands go premium","text":"Sheba's gold shield, Whiskas' purple and Felix's brush script give cat food a softer, more indulgent feel."},{"heading":"Parents leave a mark","text":"Purina badges on Friskies and Felix, \"by whisker\" on Litter-Robot and \"& Partners\" on Medivet show who stands behind the brand."}],
  "checklistHeading":"A practical checklist for a vet clinic logo",
  "checklistItems":["Does it look trustworthy enough for a medical service?","Is there one simple animal detail, not a whole collection of pets?","Does it work for dogs, cats and other animals, not just one species?","Is the colour different from the clinics near you?","Will it still read on a clinic sign, scrubs, a reminder text and an app icon?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Branding a vet clinic or pet brand?</h2><p>I design brand identities for veterinary practices, pet startups and healthcare businesses, from logos and signage to websites and brand guidelines. See my <a href=\"/blog/healthcare-logos\">healthcare logos</a> for more ideas on medical branding.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What makes a good veterinary logo?","answer":"A good veterinary logo looks trustworthy, friendly and simple. Most strong examples use a clear wordmark, one or two calm colours and one animal detail, such as a paw, an ear or a pet face hidden inside a shape."},
  {"question":"What colours are best for a vet clinic logo?","answer":"Blue and green are the most common because they feel calm and medical. To stand out, many newer clinics use coral, orange, purple or warm brown, like Bond Vet, Banfield and Modern Animal."},
  {"question":"Should a vet logo show a dog or a cat?","answer":"It can, but keep it simple and include both if you treat both. Many clinics use a neutral detail, like a paw, a heart or a pet face that could be either animal, so no pet owner feels left out."},
  {"question":"How is a pet brand logo different from a vet logo?","answer":"A vet logo has to feel safe and professional. A pet food, toy or accessory brand can be louder and more playful, with heavy letters, bright colours and humour, as BARK, KONG and Meow Mix show."},
  {"question":"How much does a veterinary logo cost?","answer":"Prices range from a few hundred dollars for a template to tens of thousands with a large agency. I design a complete brand identity in one week for a flat $3,000, including the logo, colours, typography and guidelines."}],
 "tags":["veterinary logos","vet logos","pet logos","dog logos","cat logos","logo design"],
}
if os.path.exists('public/images/blog/veterinary-logos/cover-collage.webp'):
    C=I; post['image']={**post['image'],"src":f"{C}/cover-collage.webp","thumbnail":f"{C}/cover-collage-768w.webp","alt":open('tools/article-graphics/vet-logos/cover_alt.txt').read().strip()}; post['seo']['image']=f"{C}/cover-collage-og.webp"
    credit=open('tools/article-graphics/vet-logos/cover_credit.html').read().strip() if os.path.exists('tools/article-graphics/vet-logos/cover_credit.html') else ''
    if credit: post['logoRosterConfig']['conclusionHtml']+=credit
json.dump(post,open(P,'w'),ensure_ascii=False,indent=2)
idx=json.load(open('public/content/blog/index.json'))
entry={k:post[k] for k in ('slug','url','title','description','category','categorySlug','readTime','date','image')}
pos=next((i for i,x in enumerate(idx) if x['slug']=='veterinary-logos'),None)
if pos is None: idx.insert(0,entry)
else: idx[pos]=entry
json.dump(idx,open('public/content/blog/index.json','w'),ensure_ascii=False,indent=2)
print('ok', len(B))
