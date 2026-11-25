# Rebuilds public/content/blog/types-of-logos.json as "9 Types of Logos Explained" (pillar for the logo quick course series)
# and updates its index entry in place. 9 types, 3 annotated real-logo slides each. Run from the repo root.
import json, sys, os, html
sys.path.insert(0,'tools/article-graphics/types-of-logos'); import logotypes as data
P='public/content/blog/types-of-logos.json'
I='/images/blog/types-of-logos'
D='tools/article-graphics/types-of-logos'
T,B=data.T,data.B
title="9 Types of Logos Explained"
desc="The 9 types of logos explained by a brand designer, with 27 real examples: wordmarks, lettermarks, letterforms, pictorial and abstract marks, mascots, combination marks, emblems and dynamic logos."
hero_alt=open(f'{D}/hero_alt.txt').read().strip()
e=lambda s:html.escape(s,quote=False)
L=lambda h,t:f'<a href="{h}">{t}</a>'
fig=lambda src,alt,w=1920,h=1080:f'<figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img loading="lazy" alt="{html.escape(alt)}" src="{I}/{src}" width="{w}" height="{h}" decoding="async"/></div></figure>'
slide=lambda src,alt:f'<figure class="logo-slide"><img src="{I}/{src}" alt="{html.escape(alt)}" width="1920" height="1080" loading="lazy" decoding="async"></figure>'
series=(f'<p><strong>Logo design quick course:</strong> this is the overview of my series on logo types. Go deeper with {L("/blog/pictorial-mark-logos","pictorial marks")}, {L("/blog/combination-mark-logos","combination marks")}, {L("/blog/emblem-logos","emblem logos")}, {L("/blog/script-logos","script logos")}, '
 f'{L("/blog/brand-mascots","mascot logos")}, {L("/blog/wordmark-logo-design","wordmark logos")}, {L("/blog/lettermark-logo-design","lettermark logos")}, {L("/blog/monogram-logo-design","monogram logos")} and {L("/blog/abstract-logo-design","abstract logos")}.</p>')
ids=[t[0] for t in T]
TOC={"wordmark":"the full name in type, like Coca-Cola","lettermark":"initials, like IBM","letterform":"a single letter, like the McDonald's M","pictorial":"a picture of a real thing, like the Apple apple","abstract":"a shape with no literal meaning, like the Nike Swoosh","mascot":"a character, like KFC's Colonel","combination":"a symbol plus the name, like Puma","emblem":"the name inside a badge, like Harley-Davidson","dynamic":"a logo that changes, like Google Doodles"}
toc='<ol>'+''.join(f'<li>{L("#"+t[0], t[1])}: {e(TOC[t[0]])}</li>' for t in T)+'</ol>'
intro=(
 '<p>There are <strong>9 types of logos</strong>: wordmarks, lettermarks, letterforms, pictorial marks, abstract marks, mascots, combination marks, emblems and dynamic logos. '
 'Most lists stop at seven. I add letterforms and dynamic logos because more and more brands use them, especially in tech, where a logo has to work as a tiny app icon.</p>'
 + fig('types-of-logos-hero.webp',hero_alt) + series +
 '<p>I\'m a brand designer, and choosing the type of logo is one of the first decisions I make with every client. It decides how the brand reads on a sign, a shoebox and a phone screen. '
 'Below, each type has a plain definition, when to use it, what to watch out for and three famous examples, each on a slide with my handwritten notes.</p>'
 '<h2 id="the-9-types-of-logos">The 9 types of logos at a glance</h2>'
 + fig('types-of-logos-overview.webp','The 9 types of logos at a glance: FedEx wordmark, IBM lettermark, McDonald\'s letterform, Apple pictorial mark, Nike abstract mark, KFC mascot, Puma combination mark, Harley-Davidson emblem and City of Melbourne dynamic logo') +
 '<p>The nine types fall into three groups. <strong>Text logos</strong> (wordmarks, lettermarks and letterforms) are built from letters. <strong>Symbol logos</strong> (pictorial marks, abstract marks and mascots) are built from a picture. '
 '<strong>Combined logos</strong> (combination marks, emblems and dynamic logos) mix the two, or change over time.</p>'
 + toc
)
body=''
n=0
for k,t in enumerate(T):
    key,head,short,defn,best,watch,link=t
    body+=f'<h2 id="{key}">{k+1}. {e(head)}</h2><p>{e(defn)}</p><p><strong>Best for:</strong> {e(best)}</p><p><strong>Watch out for:</strong> {e(watch)}</p>'
    for b in B[k*3:k*3+3]:
        n+=1; slug,name,url,fact,obs,notes=b
        alt=f'{name} {short} with design notes: '+', '.join(x[0] for x in notes)
        lead=f'<a href="{url}" target="_blank" rel="noreferrer noopener"><strong>{e(name)}</strong></a>'
        i=fact.lower().find(name.lower())
        sentence=(e(fact[:i])+lead.replace(e(name),e(fact[i:i+len(name)]),1)+e(fact[i+len(name):])) if i>=0 else (lead+': '+e(fact))
        body+=f'<h3>{e(name)}</h3>'+slide(f'type-logo-{n:02d}-{slug}.webp',alt)+f'<p>{sentence}</p><p>{e(obs)}</p>'
    if link: body+=f'<p><strong>Go deeper:</strong> {L(link,"more "+short+" examples and how to design one")}.</p>'
choose=(
 '<h2 id="how-to-choose-a-type-of-logo">How to choose the right type of logo</h2>'
 + fig('how-to-choose-a-logo-type.webp','Which logo type fits? Short name: wordmark. Long name: lettermark. App first: letterform. Global: abstract mark. Not sure? Use both, a combination mark.') +
 '<p>Start with your name, not with a style you like. These four questions settle most projects:</p>'
 '<p><strong>1. How long is your name?</strong> A short, distinctive name like Visa or Google can carry a wordmark on its own. A long name like International Business Machines needs a lettermark or a symbol.</p>'
 '<p><strong>2. Where will people see it most?</strong> If your logo lives on an app icon or a social avatar, you need a square symbol or a single letter. If it lives on trucks, shopfronts and packaging, a wide wordmark works.</p>'
 '<p><strong>3. How well known are you?</strong> A symbol only works without a name once people already know it. Nike, Apple and Mastercard dropped their names only after decades of advertising. New brands should keep the name next to the symbol.</p>'
 '<p><strong>4. What is your budget for building recognition?</strong> Abstract marks and dynamic logos need time and money before they mean anything. A wordmark or a pictorial mark starts working on day one.</p>'
 '<p>If you are still unsure, choose a <strong>combination mark</strong>. It gives you a name that people can read today and a symbol that can work alone later. That is what I recommend to most of my clients.</p>'
 '<h2 id="most-brands-use-more-than-one">Most brands use more than one type</h2>'
 '<p>The types aren\'t boxes you choose once. A good identity is a <strong>logo system</strong>: a main logo plus simpler versions for small spaces. Chase uses its full combination mark on branches and just the octagon in its app. '
 'Netflix uses its wordmark on screens and the N as its app icon. KFC uses the Colonel with the name on buckets and the Colonel alone on cups. Plan the full system from the start, so every version looks like it belongs.</p>'
 '<h2 id="logo-types-vs-logo-styles">Logo types vs logo styles</h2>'
 f'<p>A logo type is about <em>what the logo is made of</em>: letters, a picture, a character or a mix. A logo style is about <em>how it looks</em>. Script, minimalist, vintage, geometric and gradient are styles. '
 f'A {L("/blog/script-logos","script logo")} like Coca-Cola is a wordmark in a handwritten style. A {L("/blog/circle-logos","circle logo")} can be an emblem or an abstract mark. '
 f'Techniques like {L("/blog/negative-space-logo-design","negative space")} and {L("/blog/symmetry-logo-design","symmetry")} work with any type: the FedEx arrow is negative space inside a wordmark.</p>'
)
conclusion=(
 '<h2 id="conclusion">Need help choosing the right type of logo?</h2>'
 '<p>Every type of logo can work. Wordmarks build the name, lettermarks shorten it, letterforms fit an app icon, pictures and abstract shapes cross languages, mascots add a personality, combination marks give you flexibility, emblems add heritage and dynamic logos keep a brand fresh. '
 'The right choice depends on your name, where people will see your logo and how much time you have to build recognition.</p>'
 '<p>I design logos and brand identities for startups and growing companies, and I help clients choose the right type before I draw anything. See my <a href="/work"><strong>past work</strong></a> and <a href="/start"><strong>schedule a call</strong></a> to discuss your project.</p>'
)
post=json.load(open(P))
post.pop('body',None)
faq=[
 {"question":"What are the main types of logos?","answer":"The nine types of logos are wordmarks, lettermarks, letterforms, pictorial marks, abstract marks, mascots, combination marks, emblems and dynamic logos. Many guides list seven, leaving out letterforms and dynamic logos."},
 {"question":"What are the 7 types of logos?","answer":"The classic seven are wordmarks, lettermarks, pictorial marks, abstract marks, mascots, combination marks and emblems. Letterforms, like the McDonald's M, and dynamic logos, like Google Doodles, are two newer types that are worth knowing."},
 {"question":"Which type of logo is best for a new business?","answer":"For most new businesses, a combination mark is the safest choice. The name builds recognition while the symbol earns its place, and the symbol can be used alone later, for example as an app icon."},
 {"question":"What is the difference between a combination mark and an emblem?","answer":"In a combination mark, the symbol and the name sit next to each other and can be separated, like Puma's cat and wordmark. In an emblem, the name sits inside the shape and can't be separated, like the Harley-Davidson bar and shield."},
 {"question":"What is the difference between a wordmark and a lettermark?","answer":"A wordmark spells out the full brand name, like Coca-Cola or Visa. A lettermark uses only the initials, like IBM, HBO or CNN."},
 {"question":"How much does a professional logo cost?","answer":"Prices vary a lot by designer. I design a complete brand identity, including the logo and its simpler versions, in one week for a flat $3,000."},
]
post.update({"slug":"types-of-logos","url":"/blog/types-of-logos","category":"Logo Design","categorySlug":"logo-design","author":"arek-dvornechuck-ebaqdesign",
 "title":title,"date":"Nov 24, 2026","readTime":"14 min read","description":desc,
 "image":{"src":f"{I}/types-of-logos-hero.webp","alt":hero_alt,"thumbnail":f"{I}/types-of-logos-hero-768w.webp"},
 "seo":{"title":"9 Types of Logos Explained With 27 Examples","description":desc,"image":f"{I}/types-of-logos-hero-og.webp"},
 "intro":intro,"body":body+choose+conclusion,"faq":faq,
 "tags":["types of logos","logo types","kinds of logos","wordmark","combination mark","logo design"]})
for k in ('logoRoster','logoPageImages','logoTileImages','logoResearch','logoRosterConfig'): post.pop(k,None)
if os.path.exists(f'public{I}/cover-collage.webp'):
    post['image']={**post['image'],"src":f"{I}/cover-collage.webp","thumbnail":f"{I}/cover-collage-768w.webp","alt":open(f'{D}/cover_alt.txt').read().strip()}; post['seo']['image']=f"{I}/cover-collage-og.webp"
credit=open(f'{D}/cover_credit.html').read().strip() if os.path.exists(f'{D}/cover_credit.html') else ''
if credit: post['body']+=credit
json.dump(post,open(P,'w'),ensure_ascii=False,indent=2)
idx=json.load(open('public/content/blog/index.json'))
entry={k:post[k] for k in ('slug','url','title','description','category','categorySlug','readTime','date','image')}
pos=next(i for i,x in enumerate(idx) if x['slug']=='types-of-logos')
idx[pos]={**idx[pos],**entry}
json.dump(idx,open('public/content/blog/index.json','w'),ensure_ascii=False,indent=2)
print('ok',n)
