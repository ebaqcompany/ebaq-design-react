# Recolors logos that were published in white (for dark site headers) to near-black #0e0e0e,
# and converts rasters to transparent PNG. Output: logos-final/<slug>.svg|png
import os,re,sys
from PIL import Image
SRC,OUT='logos','logos-final'; os.makedirs(OUT,exist_ok=True)
WHITE_SVG={'mercury','lazard','rothschild-and-co'}
WHITE_PNG=set()
RECOLOR={'fidelity':'#368727'}  # Fidelity green; the site serves a white header version
def light(rgb):
    nums=[int(float(x)) for x in re.findall(r'[\d.]+',rgb)[:3]]
    return len(nums)==3 and min(nums)>=200
def fix_svg(s):
    s=re.sub(r'color\(srgb ([\d.]+) ([\d.]+) ([\d.]+)[^)]*\)',lambda m:'#0e0e0e' if min(float(x) for x in m.groups())>0.78 else '#%02x%02x%02x'%tuple(int(float(x)*255) for x in m.groups()),s)
    s=re.sub(r'#([0-9a-fA-F]{6})\b',lambda m:'#0e0e0e' if min(int(m.group(1)[i:i+2],16) for i in (0,2,4))>=200 else m.group(0),s)
    s=re.sub(r'(fill|stroke)="(rgb\([^)]*\))"',lambda m:f'{m.group(1)}="#0e0e0e"' if light(m.group(2)) else m.group(0),s)
    s=re.sub(r'(fill|stroke)(=|:\s*)"?(#fff(?:fff)?|white)\b"?',lambda m:f'{m.group(1)}{m.group(2)}{"\"" if m.group(2)=="=" else ""}#0e0e0e{"\"" if m.group(2)=="=" else ""}',s,flags=re.I)
    return s
for f in sorted(x for x in os.listdir(SRC) if '.' in x and not x.startswith('_')):
    slug,ext=f.rsplit('.',1)
    if ext=='svg':
        s=open(f'{SRC}/{f}',encoding='utf-8',errors='ignore').read()
        if slug in WHITE_SVG: s=fix_svg(s)
        if slug in RECOLOR: s=re.sub(r'rgb\(255, 255, 25[45]\)|#fff(?:fff)?\b|\bwhite\b',RECOLOR[slug],s)
        open(f'{OUT}/{slug}.svg','w').write(s)
    else:
        im=Image.open(f'{SRC}/{f}').convert('RGBA')
        if slug in WHITE_PNG:
            px=im.load()
            for y in range(im.height):
                for x in range(im.width):
                    r,g,b,a=px[x,y]
                    if a>0 and min(r,g,b)>=150 and max(r,g,b)-min(r,g,b)<40: px[x,y]=(14,14,14,a)
        bbox=im.getbbox()
        if bbox: im=im.crop(bbox)
        im.save(f'{OUT}/{slug}.png')
print(len(os.listdir(OUT)))
