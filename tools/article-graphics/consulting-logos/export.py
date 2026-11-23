# Consulting logos: saves the 3 Figma boards and the 27 annotated slides as named webps,
# and builds the 27-logo wall used as the reference for the hero scene.
import sys, numpy as np
from PIL import Image, ImageDraw
sys.path.insert(0,'.'); import consulting as data
IMG='/Users/ebaq/Documents/github-repos/ebaq-design-react/public/images/blog/consulting-logos'
import os; os.makedirs(IMG,exist_ok=True)
BOARDS=["consulting-logos-01-strategy-consulting-firms","consulting-logos-02-big-four-and-large-consulting-firms","consulting-logos-03-specialist-and-boutique-consulting-firms"]
POS=[(131,116),(701,116),(1271,116),(131,416),(701,416),(1271,416),(131,716),(701,716),(1271,716)]
slugs=[b[0] for b in data.B]; crops=[]
for g,bn in enumerate(BOARDS):
    im=Image.open(f'out/{bn}.png').convert('RGB'); im.save(f'{IMG}/{bn}.webp',quality=88)
    for i,(x,y) in enumerate(POS): crops.append(im.crop((x,y,x+519,y+249)))
for n,s in enumerate(slugs,1):
    Image.open(f'out/slides/{n:02d}.png').convert('RGB').save(f'{IMG}/consulting-logo-{n:02d}-{s}.webp',quality=84)
W,H,cols,rows=1800,900,9,3; cw,ch=W//cols,H//rows
wall=Image.new('RGB',(W,H),(250,250,250)); d=ImageDraw.Draw(wall)
for i,t in enumerate(crops):
    a=np.array(t.crop((0,14,519,190))); a[(a>205).all(-1)]=250
    ys,xs=np.where((a<240).any(-1)); a=a[ys.min():ys.max()+1,xs.min():xs.max()+1]
    lg=Image.fromarray(a); r=lg.width/lg.height
    w=min(cw-40,(5200*r)**.5); h=w/r
    if h>ch-110: h=ch-110; w=h*r
    lg=lg.resize((round(w),round(h)),Image.LANCZOS)
    wall.paste(lg,((i%cols)*cw+(cw-lg.width)//2,(i//cols)*ch+(ch-lg.height)//2))
for c in range(1,cols): d.line([(c*cw,0),(c*cw,H)],fill=(222,222,222),width=2)
for r in range(1,rows): d.line([(0,r*ch),(W,r*ch)],fill=(222,222,222),width=2)
wall.save('out/consulting-logo-wall-27.png'); print('ok')
