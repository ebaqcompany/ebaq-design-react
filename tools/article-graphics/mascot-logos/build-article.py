# Rebuilds public/content/blog/brand-mascots.json as "27 Mascot Logos Explained" (slide format, logo quick course series)
# and updates its index entry in place. Keeps Arek's own mascot story from the original article. Run from the repo root.
import json, sys, os
sys.path.insert(0,'tools/article-graphics/mascot-logos'); import mascots as data
P='public/content/blog/brand-mascots.json'
I='/images/blog/brand-mascots'
D='tools/article-graphics/mascot-logos'
B=data.B
boards=[("mascot-logos-01-people","People mascot logos, 01 to 09: KFC, Quaker, Pringles, Big Boy, Morton Salt, Gerber, Little Caesars, Sun-Maid, Bic"),
 ("mascot-logos-02-animals","Animal mascot logos, 10 to 18: Mailchimp, Duolingo, Aflac, Docker, Chuck E. Cheese, Hush Puppies, Tripadvisor, WWF, Jollibee"),
 ("mascot-logos-03-made-up-characters","Made-up character mascot logos, 19 to 27: Planters, Mr. Clean, Chiquita, Starbucks, Reddit, GitHub, Android, Waze, Michelin")]
title="27 Mascot Logos Explained"
desc="27 famous mascot logos explained by a brand designer: people, animals and made-up characters from KFC, Quaker and Pringles to Mailchimp, Duolingo and the Michelin Man."
hero_alt=open(f'{D}/hero_alt.txt').read().strip()
L=lambda h,t:f'<a href="{h}">{t}</a>'
fig=lambda src,alt,w=1920,h=1080:f'<figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{alt}" src="{I}/{src}" width="{w}" height="{h}" decoding="async"/></div></figure>'
series=(f'<p><strong>Logo design quick course:</strong> this guide is part of my series on logo types. Read the others on {L("/blog/pictorial-mark-logos","pictorial marks")}, {L("/blog/combination-mark-logos","combination marks")}, {L("/blog/emblem-logos","emblem logos")}, {L("/blog/script-logos","script logos")}, '
 f'{L("/blog/wordmark-logo-design","wordmark logos")}, {L("/blog/monogram-logo-design","monogram logos")}, {L("/blog/lettermark-logo-design","lettermark logos")}, {L("/blog/abstract-logo-design","abstract logos")}, '
 f'{L("/blog/symmetry-logo-design","symmetry")} and {L("/blog/negative-space-logo-design","negative space")}, or start with the overview of all {L("/blog/types-of-logos","types of logos")}.</p>')
own=(
 '<h2 id="how-i-made-my-own-mascot">How I made my own mascot</h2>'
 '<p>In graphic design school, I designed my own brand mascot as a personal project. It went all the way to a physical product: a plush character in a clear box, with packaging and a little brochure inside.</p>'
 '<figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="Arek Dvornechuck\'s student mascot project: the brochure, a close-up of the blue plush character, the Ebaq Design booklet and the plush in its clear box" src="/images/blog/brand-mascots/coverimagefonts-96d0fc1b3765b0e9dc839b0cea26169e-800.webp" width="800" height="533" decoding="async"/></div></figure>'
 '<p>From the first sketches to the final illustrations, I wanted a character that was unique and memorable, with a personality people would get straight away. Ebaq is a blue letter e with big eyes and a tongue sticking out.</p>'
 '<figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="Ebaq, a blue plush mascot shaped like a letter e, sitting next to its clear box and the Ebaq Design brochure" src="/images/blog/brand-mascots/15bestbrandmascotdesignsofalltime4-a68b455b3f8af3a72005b-459a68.webp" width="800" height="533" decoding="async"/></div></figure>'
 '<p>As you may notice, Ebaq borrows parts from Mickey Mouse. Yes! I took a plush toy, removed the hands and feet, and used them to build my own mascot. He stands for the playful, adventurous side of my brand, and the project taught me the most important rule of mascots: give the character one clear personality.</p>'
)
intro=(
 '<p>A mascot logo puts a <strong>character</strong> at the heart of the logo: a person, an animal or a made-up creature with a face and a personality. Colonel Sanders on KFC, the Michelin Man and the Duolingo owl are all mascot logos. A mascot gives a brand someone to recognise, remember and like, which is why these characters often outlive the people who drew them.</p>'
 + fig('mascot-logos-hero.webp',hero_alt) + series +
 '<h2 id="what-is-a-mascot-logo">What is a mascot logo?</h2>'
 f'<p>A mascot logo is a logo built around a character. It is usually a {L("/blog/types-of-logos","combination mark")}: the character sits next to, above or inside the brand name. KFC, Quaker and Mailchimp work this way. Some mascots are so famous that they work alone, like the Starbucks siren or the GitHub Octocat.</p>'
 '<p>Not every brand mascot is a mascot logo. The Geico gecko, the Energizer Bunny and Tony the Tiger are famous characters, but they live in ads and on packs, not in the logo itself. This article only covers mascots that are part of the logo.</p>'
 '<h2 id="where-mascot-logos-come-from">Where mascot logos come from</h2>'
 '<p>Mascot logos grew up with packaged food. In the late 1800s, shoppers stopped scooping oats, salt and crackers out of barrels and started buying sealed, branded packs. A friendly face on the box helped people pick the same product again. Quaker registered its man in Quaker clothes in 1877, the first trademark for a breakfast cereal.</p>'
 + fig('michelin-bibendum-poster-1898.webp','The 1898 Michelin poster by O\'Galop, "Nunc est bibendum", showing Bibendum, the Michelin Man made of tyres, raising a glass of nails and broken glass',900,1209) +
 '<p>Posters made the next generation of mascots famous. The French artist O\'Galop drew Bibendum, the Michelin Man, in 1898, raising a glass full of nails and broken glass: a tyre that "drinks up obstacles". In 1916, a schoolboy named Antonio Gentile sent Planters a sketch of a peanut with arms and legs, and Mr. Peanut was born.</p>'
 + fig('planters-mr-peanut-ad-1921.webp','A 1921 Planters advert from The Saturday Evening Post, with Mr. Peanut in his top hat on the bag of Planters Pennant salted peanuts',900,1174) +
 '<h2 id="types-of-mascot-logos">Three types of mascot logos</h2>'
 '<p><strong>People:</strong> KFC, Quaker, Gerber and Sun-Maid put a human face on the brand. Some are real people, like Colonel Sanders. Others were invented to stand for an idea, like honesty for Quaker or home cooking for Big Boy.</p>'
 '<p><strong>Animals:</strong> Mailchimp, Duolingo, Aflac and WWF use an animal with a clear personality. Animals are easy to draw, easy to like and work in any country.</p>'
 '<p><strong>Made-up characters:</strong> Mr. Peanut, the Michelin Man, Reddit\'s alien and GitHub\'s Octocat don\'t exist in nature. Made-up characters are the easiest to own, because no one else can use the same creature.</p>'
 '<h2 id="mascots-in-tech">Why tech startups love mascots</h2>'
 '<p>Mascots aren\'t only for cereal boxes. Mailchimp, Duolingo, GitHub, Reddit, Docker, Android and Waze all use characters. In a crowded software market, where many logos are blue shapes and clean sans serif type, a character is the fastest way to look different. It also gives the product a voice: Duo the owl\'s pushy reminders turned Duolingo into a meme.</p>'
 '<h2 id="the-problem-with-mascot-logos">The problem with mascot logos: detail and age</h2>'
 '<p>Mascots are harder to shrink than most logos. A detailed portrait like the Quaker man looks great on a canister and turns to mush on a favicon. A mascot drawn from a few bold shapes, like the WWF panda, still reads at 16 pixels.</p>'
 + fig('mascot-logo-shrink-test.webp','Shrink test: the detailed Quaker portrait turns to mush at favicon size, while the simple WWF panda still reads') +
 '<p>That is why so many mascots get simpler over time. Quaker slimmed its man down in 2012, Mailchimp turned Freddie into a one-colour silhouette in 2018 and Pringles removed Mr. P\'s hair in 2020. Some mascots don\'t survive at all. Land O\'Lakes removed Mia from its packaging in 2020, and the Aunt Jemima and Uncle Ben\'s characters were dropped in 2020 and 2021 after years of criticism that they were based on racial stereotypes. A mascot is a person in your brand, so it has to age well.</p>'
 + fig('when-to-choose-a-mascot-logo.webp','Choose a mascot logo when families are buyers, shelves are crowded, you will animate it or your ads need a voice. Plan a simple icon.') +
 own +
 '<p>Below are 27 famous mascot logos, American brands first and then the rest of the world, across fast food, packaged food, tech, insurance, retail and charity. Each one has a slide with my handwritten notes and a short explanation.</p>'
)
process=(
 '<h2 id="how-to-design-a-mascot-logo">How to design a mascot logo</h2>'
 + fig('how-to-design-a-mascot-logo.webp','How to design a mascot logo in four steps: pick a character, sketch a personality, simplify the shapes, test it small') +
 '<p><strong>1. Pick a character.</strong> Choose a person, an animal or a made-up creature that says something true about the brand. A duck that shouts the name works for Aflac. A chimp in a postman\'s hat works for an email tool.</p>'
 '<p><strong>2. Sketch a personality.</strong> Decide who the character is before you draw details. Is it cheeky, wise, strong or kind? One clear trait, like Freddie\'s wink or Mr. Clean\'s folded arms, is easier to remember than a list.</p>'
 '<p><strong>3. Simplify the shapes.</strong> Build the character from a few bold shapes and a limited palette. Remove lines until it starts to lose its personality, then put the last one back.</p>'
 '<p><strong>4. Test it small.</strong> Check the mascot at 24 pixels, in one colour and next to the name. If the face disappears, design a simplified head or icon version, the way Reddit and Duolingo use just the head of their character.</p>'
)
post=json.load(open(P))
for k in ('body',): post.pop(k,None)
post.update({"slug":"brand-mascots","url":"/blog/brand-mascots","category":"Logo Design","categorySlug":"logo-design","author":"arek-dvornechuck-ebaqdesign",
 "title":title,"date":"Nov 24, 2026","readTime":"13 min read","description":desc,
 "image":{"src":f"{I}/mascot-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/mascot-logos-hero-768w.webp"},
 "seo":{"title":"27 Famous Mascot Logos Explained","description":desc,"image":f"{I}/mascot-logos-hero-og.webp"},
 "intro":intro,
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/mascot-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} mascot logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"27 famous mascot logos",
  "listIntro":["The boards below show all 27 mascot logos in one consistent format, grouped into people, animals and made-up characters.","Each logo is reviewed for its design decisions, not for the size or success of the company behind it."],
  "sectionNames":data.G,
  "sectionIntroductions":["These logos put a human face on the brand. Some show a real founder or model, others a character invented to stand for an idea.","Animal mascots are easy to like and work in any language. The best ones have one clear personality trait, like a wink or a quack.","Made-up characters don't exist in nature, so no one else can own them. They range from a peanut in a top hat to an alien and a robot."],
  "sectionBridge":["This is a visual study of mascot logos, not a ranking of companies.","Look at how much detail each character has, how it sits with the name and how well it would read as a small icon."],
  "entryFallbacks":[["The character gives the brand a face people remember.","Notice how the mascot would read on a pack, a sign and a phone screen."]],
  "findings":[{"heading":"A face is easy to remember","text":"KFC, Quaker and Gerber put a face on the pack, and people recognise faces faster than words."},{"heading":"Simple mascots last","text":"WWF, GitHub and Reddit use a few bold shapes, so they still read at icon size."},{"heading":"Mascots get simpler with age","text":"Quaker, Mailchimp and Pringles all removed detail to keep their characters working on screens."},{"heading":"Tech uses mascots to stand out","text":"Mailchimp, Duolingo, Docker and Waze use characters to look different in a market full of blue shapes."},{"heading":"A mascot has to age well","text":"Land O'Lakes, Aunt Jemima and Uncle Ben's show that a character can become a liability when attitudes change."}],
  "checklistHeading":"A practical checklist for a mascot logo",
  "checklistItems":["Does the character say something true about the brand?","Does it have one clear personality trait?","Is it built from a few bold shapes, not fine detail?","Does the head alone work as an app icon or favicon?","Will the character still feel right in 20 years?"],
  "conclusionHtml":process+"<h2 id=\"conclusion\">Want a mascot that people remember?</h2><p>A great mascot logo gives a brand a face, a personality and a voice. It is built from simple shapes, has one clear trait and comes with a small icon version for screens. KFC, Michelin and Duolingo prove that the right character can carry a brand for decades.</p><p>I design logos and brand identities for startups and growing companies, including mascot characters and the simple icons that go with them. See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What is a mascot logo?","answer":"A mascot logo is a logo built around a character, such as a person, an animal or a made-up creature. Famous examples include KFC's Colonel Sanders, the Michelin Man, Mr. Peanut and the Duolingo owl."},
  {"question":"What is the difference between a mascot and a mascot logo?","answer":"A brand mascot can appear anywhere, in ads, on packs or as a costume. A mascot logo puts the character inside the logo itself. The Geico gecko is a mascot; the Aflac duck is part of the Aflac logo."},
  {"question":"Are mascot logos good for startups?","answer":"They can be. A character helps a new brand stand out, especially in crowded markets like software, food and kids' products. Keep the design simple and plan an icon version for apps and social media."},
  {"question":"How do you make a mascot logo work at small sizes?","answer":"Build the character from a few bold shapes, limit the colours and design a simplified head or icon version. Test it at 24 pixels and in one colour before you finalise it."},
  {"question":"How much does a mascot logo cost?","answer":"It depends on how much illustration you need. I design a complete brand identity, including a simple mascot mark, in one week for a flat $3,000. A full character with many poses and animations is quoted separately."}],
 "tags":["mascot logos","brand mascots","character logos","famous mascot logos","logo design"],
})
if os.path.exists('public/images/blog/brand-mascots/cover-collage.webp'):
    C=I; post['image']={**post['image'],"src":f"{C}/cover-collage.webp","thumbnail":f"{C}/cover-collage-768w.webp","alt":open(f'{D}/cover_alt.txt').read().strip()}; post['seo']['image']=f"{C}/cover-collage-og.webp"
credit=open(f'{D}/cover_credit.html').read().strip() if os.path.exists(f'{D}/cover_credit.html') else ''
if credit: post['logoRosterConfig']['conclusionHtml']+=credit
json.dump(post,open(P,'w'),ensure_ascii=False,indent=2)
idx=json.load(open('public/content/blog/index.json'))
entry={k:post[k] for k in ('slug','url','title','description','category','categorySlug','readTime','date','image')}
pos=next(i for i,x in enumerate(idx) if x['slug']=='brand-mascots')
idx[pos]={**idx[pos],**entry}
json.dump(idx,open('public/content/blog/index.json','w'),ensure_ascii=False,indent=2)
print('ok', len(B))
