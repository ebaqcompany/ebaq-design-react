# Types of logos: saves the overview board, the 27 annotated slides and the choose graphic as named webps,
# and builds a 27-logo wall used as the reference for the hero scene.
import sys, os, numpy as np
from PIL import Image, ImageDraw
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); import logotypes as data
IMG='/Users/ebaq/Documents/github-repos/ebaq-design-react/public/images/blog/types-of-logos'
os.makedirs(IMG,exist_ok=True)
Image.open('out/types-of-logos-overview.png').convert('RGB').save(f'{IMG}/types-of-logos-overview.webp',quality=88)
Image.open('out/how-to-choose-a-logo-type.png').convert('RGB').save(f'{IMG}/how-to-choose-a-logo-type.webp',quality=88)
slides=[]
for n,b in enumerate(data.B,1):
    im=Image.open(f'out/slides/{n:02d}.png').convert('RGB'); im.save(f'{IMG}/type-logo-{n:02d}-{b[0]}.webp',quality=84); slides.append(im)
W,H,cols,rows=1800,900,9,3; cw,ch=W//cols,H//rows
wall=Image.new('RGB',(W,H),(250,250,250)); d=ImageDraw.Draw(wall)
for i,im in enumerate(slides):
    a=np.array(im.crop((560,300,1360,780))); a[(a>205).all(-1)]=250
    m=(a<200).any(-1); ys,xs=np.where(m); a=a[ys.min():ys.max()+1,xs.min():xs.max()+1]
    lg=Image.fromarray(a); r=lg.width/lg.height
    w=min(cw-30,(6000*r)**.5); h=w/r
    if h>ch-50: h=ch-50; w=h*r
    lg=lg.resize((round(w),round(h)),Image.LANCZOS)
    wall.paste(lg,((i%cols)*cw+(cw-lg.width)//2,(i//cols)*ch+(ch-lg.height)//2))
wall.save('out/types-logo-wall-27.png'); print('ok')
