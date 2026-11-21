# Architecture logos: saves the 5 Figma boards and the 45 annotated slides (cropped from the 3x3 slide-group exports)
# as named webps, and builds the 45-logo wall used on the hero screen.
import sys, numpy as np
from PIL import Image, ImageDraw
sys.path.insert(0,'.'); import arch as banks
IMG='/Users/ebaq/Documents/github-repos/ebaq-design-react/public/images/blog/architecture-logos'
BOARDS=["architecture-logos-01-global-architecture-firms","architecture-logos-02-signature-studios","architecture-logos-03-international-firms","architecture-logos-04-design-led-practices","architecture-logos-05-interiors-and-landscape"]
POS=[(131,116),(701,116),(1271,116),(131,416),(701,416),(1271,416),(131,716),(701,716),(1271,716)]
slugs=[b[0] for b in banks.B]; crops=[]
for g,bn in enumerate(BOARDS):
    im=Image.open(f'out/{bn}.png').convert('RGB'); im.save(f'{IMG}/{bn}.webp',quality=88)
    for i,(x,y) in enumerate(POS): crops.append(im.crop((x,y,x+519,y+249)))
    sl=Image.open(f'out/slides-{g+1}.png').convert('RGB')
    for i in range(9):
        n=g*9+i; c=sl.crop(((i%3)*1920,(i//3)*1080,(i%3)*1920+1920,(i//3)*1080+1080))
        c.save(f'{IMG}/architecture-logo-{n+1:02d}-{slugs[n]}.webp',quality=84)
# 45-logo wall (9 x 5) for the screen in the hero photo
W,H,cols,rows=1800,1000,9,5; cw,ch=W//cols,H//rows
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
wall.save('out/architecture-logo-wall-45.png'); print('ok')


if len(sys.argv)>1 and sys.argv[1]=='hero':
  exec(open('hero.py').read())
