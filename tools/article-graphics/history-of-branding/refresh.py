# Refreshes public/content/blog/history-of-branding.json (Nov 2026): adds ten real historical images
# (public domain or openly licensed, each credited in its caption), the collage cover and today's date.
# Starts from the committed HEAD version each run, so it is safe to re-run. Run from the repo root.
import json, os, re, subprocess, html
P = 'public/content/blog/history-of-branding.json'
I = '/images/blog/history-of-branding'
D = 'tools/article-graphics/history-of-branding'
DATE = 'Nov 25, 2026'
post = json.loads(subprocess.check_output(['git', 'show', f'HEAD:{P}']))
body = post['body']

SOURCES = {'nebamun-cattle-branding': 'Nebamun Supervising Estate Activities, Tomb of Nebamun MET DT11772.jpg', 'indus-valley-unicorn-seal': 'Stamp seal and modern impression- unicorn and incense burner (?) MET DP23101.jpg', 'fortis-roman-lamp-stamp': 'Fragment of Roman ceramic oil lamp AD.43-410. (FindID 766397).jpg', 'white-rabbit-needle-shop-plate': "Trademark of Jinan Liu's Kung-Fu Needles Shop.jpg", 'london-hallmarks-1638': 'Silver chalice-cup, London 1638, hallmarks. (FindID 105934).jpg', 'josiah-wedgwood-stubbs-portrait': 'Josiah Wedgwood by George Stubbs, 1780, enamel on a Wedgwood ceramic tablet - Wedgwood Museum - Barlaston, Stoke-on-Trent, England - DSC09537.jpg', 'pears-soap-bubbles-ad': 'Bubbles by Sir John E Millais.png', 'coca-cola-contour-bottle-patent-1915': 'Coke bottle patent.png', 'manet-bar-folies-bergere-bass': 'Edouard Manet, A Bar at the Folies-Bergère.jpg', 'behrens-aeg-poster-1907': '1907 Peter Behrens Plakat AEG-Metallfadenlampe.jpg'}

def fig(src, alt, cap):
    from urllib.parse import quote
    url = 'https://commons.wikimedia.org/wiki/File:' + quote(SOURCES[src].replace(' ', '_'), safe="_(),'-.")
    cap += f' <a href="{url}" target="_blank" rel="noreferrer noopener">Source</a>.'
    return (f'<figure><img src="{I}/{src}.webp" alt="{html.escape(alt)}" width="1920" height="1080" loading="lazy" decoding="async" />'
            f'<figcaption>{cap}</figcaption></figure>')

# (heading text to find, image, alt, caption). Each image goes after the first paragraph under its heading,
# or after the paragraph that contains `after` when that is closer to the subject.
IMAGES = [
 ('Livestock branding in ancient Egypt', None, 'nebamun-cattle-branding',
  'Ancient Egyptian tomb painting of herdsmen throwing cattle to the ground, a kneeling man heating a branding iron over a brazier and a scribe recording the herd',
  'Herdsmen brand cattle while a scribe (bottom right) records the count, in the tomb of Nebamun, Thebes, about 1400–1352 BCE. Facsimile by Charles K. Wilkinson, The Metropolitan Museum of Art (CC0).'),
 ('Seals in the Indus Valley and Mesopotamia', None, 'indus-valley-unicorn-seal',
  'Indus Valley stone stamp seal carved with a unicorn and a short inscription, next to a modern clay impression of it',
  'An Indus Valley stamp seal with a unicorn, and a modern impression of it, about 2600–1900 BCE. The Metropolitan Museum of Art (CC0).'),
 ('Makers’ marks in Greece and Rome', 'FORTIS lamps sold', 'fortis-roman-lamp-stamp',
  'Fragment of a Roman clay oil lamp base with the stamped name FORT, from the FORTIS lamp brand',
  'Part of a Roman lamp base stamped FORT[IS], found in England. Photo: Museum of London / Portable Antiquities Scheme (CC BY 2.0).'),
 ('The White Rabbit of Song-dynasty China', None, 'white-rabbit-needle-shop-plate',
  'Print from the bronze plate of Jinan Liu’s Fine Needle Shop, with a white rabbit pounding medicine in the center surrounded by Chinese characters',
  'A print from the bronze advertising plate of Jinan Liu’s Fine Needle Shop, with its white rabbit, Northern Song dynasty (960–1127). Public domain.'),
 ('Medieval branding: guilds and hallmarks', None, 'london-hallmarks-1638',
  'Close-up of four hallmarks punched into a silver cup: a maker’s mark, the crowned leopard’s head of London, the lion passant and a date letter',
  'Hallmarks on a silver cup made in London in 1638: the maker’s mark, London’s crowned leopard’s head, the lion passant and the date letter. Photo: Derby Museums Trust / Portable Antiquities Scheme (CC BY-SA 4.0).'),
 ('Josiah Wedgwood, the first modern brand builder', None, 'josiah-wedgwood-stubbs-portrait',
  'Oval portrait of Josiah Wedgwood in a powdered wig, painted in enamel on a Wedgwood ceramic tablet',
  'Josiah Wedgwood, painted by George Stubbs in 1780 in enamel on one of Wedgwood’s own ceramic tablets. Wedgwood Museum, Barlaston. Photo: Daderot (public domain).'),
 ('Soap, oats and soda', None, 'pears-soap-bubbles-ad',
  'Pears’ soap advertisement showing Millais’s painting Bubbles, a curly-haired boy in a velvet suit watching a soap bubble',
  'Pears put its name on Millais’s painting <em>Bubbles</em> and turned it into a soap advertisement. This engraving was printed in 1912. Public domain.'),
 ('How trademark law made brands property', 'trade mark number 1', 'manet-bar-folies-bergere-bass',
  'Édouard Manet’s painting A Bar at the Folies-Bergère, with Bass pale ale bottles bearing the red triangle label on the marble bar',
  'Look for the red triangle labels on the beer bottles: that is Bass pale ale, in Édouard Manet’s <em>A Bar at the Folies-Bergère</em> (1882). Courtauld Gallery, London. Public domain.'),
 ('Soap, oats and soda', 'contour bottle</a>, patented', 'coca-cola-contour-bottle-patent-1915',
  'US design patent drawing of the Coca-Cola contour bottle, with a side view and a top view, dated November 16, 1915',
  'The Coca-Cola contour bottle in US design patent 48,160, granted on November 16, 1915. Public domain.'),
 ('The corporate identity era', None, 'behrens-aeg-poster-1907',
  'Peter Behrens’s 1907 AEG poster: a glowing light bulb radiating dots of light in a geometric gold frame on black, with the AEG name in capitals',
  'Peter Behrens’s 1907 poster for AEG’s metal-filament lamp, from the first corporate identity program. Public domain.'),
]

for head, after, src, alt, cap in IMAGES:
    h = re.search(r'<h[23][^>]*>' + re.escape(head), body)
    assert h, head
    start = h.end()
    if after:
        k = body.find(after, start); assert k > 0, after
        start = k
    end = body.find('</p>', start) + 4
    nxt = re.search(r'<h[23][^>]*>', body[h.end():])
    assert end > 3 and (not nxt or end < h.end() + nxt.start()), f'{head}: paragraph not inside its section'
    body = body[:end] + '\n' + fig(src, alt, cap) + body[end:]

credit = open(f'{D}/cover_credit.html').read().strip() if os.path.exists(f'{D}/cover_credit.html') else ''
if credit: body += '\n' + credit
post['body'] = body
post['date'] = DATE
post['readTime'] = '27 min read'
cover = f'public{I}/cover-collage.webp'
if os.path.exists(cover):
    alt = open(f'{D}/cover_alt.txt').read().strip()
    post['image'] = {'src': f'{I}/cover-collage.webp', 'alt': alt, 'thumbnail': f'{I}/cover-collage-768w.webp'}
    post['seo']['image'] = f'{I}/cover-collage-og.webp'
json.dump(post, open(P, 'w'), ensure_ascii=False, indent=2)
idx = json.load(open('public/content/blog/index.json'))
pos = next(i for i, x in enumerate(idx) if x['slug'] == 'history-of-branding')
idx[pos] = {**idx[pos], 'date': DATE, 'readTime': post['readTime'], 'image': post['image']}
json.dump(idx, open('public/content/blog/index.json', 'w'), ensure_ascii=False, indent=2)
print('ok', len(re.findall('<img', body)), 'images')
