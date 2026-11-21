# Writes public/content/blog/drone-logos.json (logo roster format, full-width annotated slides).
import json, sys
sys.path.insert(0,'tools/article-graphics/drone-logos'); import drones
P='public/content/blog/drone-logos.json'; old=json.load(open(P))
I='/images/blog/drone-logos'
B=drones.B
boards=[("drone-logos-01-consumer-and-camera-drones","Consumer and camera drone logos, 01 to 09"),("drone-logos-02-delivery-drones","Drone delivery company logos, 10 to 18"),("drone-logos-03-enterprise-and-public-safety","Enterprise and public safety drone logos, 19 to 27"),("drone-logos-04-defense-drones","Defense drone company logos, 28 to 36"),("drone-logos-05-drone-software-and-air-taxis","Drone software and air taxi logos, 37 to 45")]
title="45 Best Drone Company Logos Explained by a Brand Designer [2026]"
desc="45 drone company logos explained by a brand designer, from DJI, Skydio, and Parrot to Zipline, Wing, Anduril, and Joby Aviation."
hero_alt="Drone engineer holding a controller and looking at a screen showing 45 drone company logos in a hangar"
post=dict(old); post.pop('body',None)
post.update({"title":title,"date":"Nov 21, 2026","readTime":"15 min read","description":desc,
 "image":{"src":f"{I}/drone-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/drone-logos-hero-768w.webp"},
 "seo":{"title":title,"description":desc,"image":f"{I}/drone-logos-hero-og.webp"},
 "intro":f'<p>Drone logos have to work in the sky, on a remote controller, on an app icon, and on the side of a delivery box, so the best ones are <strong>simple, fast-looking, and easy to read from far away</strong>.</p><figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{hero_alt}" src="{I}/drone-logos-hero.webp" width="1920" height="1080" decoding="async"/></div></figure><h2 id="what-makes-good-drone-logo">What makes a good drone logo?</h2><p><strong>Motion:</strong> italic letters, swooshes, and arrows, like DJI, DroneUp, and Wing, tell you the product flies before you read the name.</p><p><strong>A symbol from flight:</strong> wings, rotors seen from above, and flight paths give drone brands an ownable mark, from Manna&#39;s four-lobed flower to Joby&#39;s looping line.</p><p><strong>Durability:</strong> drone logos are printed on small aircraft, controllers, and boxes, so bold shapes and one or two colors work best.</p><p>Below are 45 drone company logos in five groups, from consumer camera drones to delivery, public safety, defense, and air taxis. Each one has a slide with my handwritten notes, followed by a short explanation. For more machines that move on their own, see my review of <a href="/blog/robotics-logos">robotics logos</a>.</p>',
 "logoRoster":[b[1] for b in B],
 "logoPageImages":[[{"src":f"{I}/{b[0]}.webp","alt":b[1]}] for b in boards],
 "logoTileImages":[{"src":f"{I}/drone-logo-{i+1:02d}-{b[0]}.webp","alt":f"{b[1]} logo with design notes: "+", ".join(n[0] for n in b[6])} for i,b in enumerate(B)],
 "logoResearch":[{"number":f"{i+1:02d}","name":b[1],"officialUrl":b[2],"verifiedFact":b[3],"observations":[b[4],b[5]]} for i,b in enumerate(B)],
 "logoRosterConfig":{
  "tileStyle":"slide",
  "listHeading":"45 drone company logos",
  "listIntro":["The boards below show all 45 drone logos in one consistent format, grouped into consumer drones, delivery, enterprise and public safety, defense, and drone software and air taxis.","Each logo is reviewed for its design decisions, not for the quality of the aircraft."],
  "sectionNames":["Consumer and camera drones","Delivery drones","Enterprise and public safety","Defense drones","Drone software and air taxis"],
  "sectionIntroductions":["Consumer drone brands sell to hobbyists and creators, so their logos lean on bold, fast-looking wordmarks.","Delivery drone companies have to feel friendly over people's homes, so their logos are simple, light, and often playful.","Enterprise and public safety brands sell to police, utilities, and industry, and their logos favor clean, technical capitals.","Defense drone makers use stark, black, badge-like logos that feel serious and engineered.","Drone software and air taxi companies sell the future of flight, with logos that mix flight paths, rotors, and premium aerospace type."],
  "sectionBridge":["This is a visual comparison of drone company logos, not a ranking of drones.","Look at how each logo suggests flight and how it would look on the aircraft itself."],
  "entryFallbacks":[["The identity relies on a few clear decisions to stay recognizable.","Notice how the logo would look printed on a small aircraft or a controller."]],
  "findings":[{"heading":"Motion is the category's shortcut","text":"Italic letters, swooshes, and arrows in DJI, DroneUp, Wing, and Potensic tell you the product flies."},{"heading":"Flight inspires the best symbols","text":"Manna's four-lobed flower, Volocopter's rotor V, and Joby's looping line come straight from how drones and air taxis fly."},{"heading":"Defense brands go black and badge-like","text":"Anduril, Helsing, Neros, and Baykar use stark black marks that look like military insignia."},{"heading":"Delivery brands stay friendly","text":"Zipline, Wing, Manna, and Arrive AI use soft shapes and friendly type because their drones fly over people's homes."}],
  "checklistHeading":"A practical checklist for a new drone logo",
  "checklistItems":["Does the logo suggest flight or motion without a cliche propeller icon?","Is it readable from far away and when printed small on the aircraft?","Does it work in one color for stickers, controllers, and packaging?","Does it fit your audience: consumers, cities, industry, or defense?","Will the symbol still work as an app icon?"],
  "conclusionHtml":"<h2 id=\"conclusion\">Building a drone or aviation brand?</h2><p>I design brand identities and websites for drone, robotics, and deep tech startups, from logo and app icon to the full identity system and website.</p><p>See my <a href=\"/work\"><strong>past work</strong></a> and <a href=\"/start\"><strong>schedule a call</strong></a> to discuss your project.</p>"},
 "faq":[
  {"question":"What makes a good drone company logo?","answer":"A good drone logo suggests flight or motion, stays readable from far away and when printed small on the aircraft, and works in one color. The strongest examples, like DJI, Zipline, and Wing, pair a bold wordmark with a simple shape that hints at speed or a flight path."},
  {"question":"What does the DJI logo mean?","answer":"The DJI logo is a custom, heavy italic wordmark of the company's initials, from Da-Jiang Innovations. The forward lean and connected letters give the three letters the speed and compactness of a symbol."},
  {"question":"Which drone companies have the best logos?","answer":"Some of the most distinctive drone logos belong to DJI, Zipline, Wing, Manna, and Joby Aviation, which use motion and flight-inspired symbols, and to defense brands like Anduril and Helsing, which use stark, badge-like marks."}],
 "tags":["drone logos","drone company logos","drone brands","logo design","brand identity"],
})
json.dump(post,open(P,'w'),indent=2,ensure_ascii=False); open(P,'a').write('\n')
idx=json.load(open('public/content/blog/index.json'))
e=next(x for x in idx if x['slug']=='drone-logos')
e.update({"title":title,"description":desc,"date":"Nov 21, 2026","readTime":"15 min read","image":{"src":post["image"]["src"],"alt":hero_alt,"thumbnail":post["image"]["thumbnail"]}})
idx.remove(e); idx.insert(1,e)
json.dump(idx,open('public/content/blog/index.json','w'),indent=2,ensure_ascii=False); open('public/content/blog/index.json','a').write('\n')
print('ok', len(post['logoRoster']))
