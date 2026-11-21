# Tech logos: saves the 5 Figma boards and the 45 annotated slides (cropped from the 3x3 slide-group exports)
# as named webps, and builds the 45-logo wall used on the hero screen.
import sys, numpy as np
from PIL import Image, ImageDraw
sys.path.insert(0,'.'); import techs as banks
IMG='/Users/ebaq/Documents/github-repos/ebaq-design-react/public/images/blog/tech-startup-logos'
BOARDS=["tech-logos-01-big-tech","tech-logos-02-software-and-cloud","tech-logos-03-consumer-apps-and-social","tech-logos-04-hardware-and-chips","tech-logos-05-ai-and-tech-startups"]
POS=[(131,116),(701,116),(1271,116),(131,416),(701,416),(1271,416),(131,716),(701,716),(1271,716)]
slugs=[b[0] for b in banks.B]; crops=[]
for g,bn in enumerate(BOARDS):
    im=Image.open(f'out/{bn}.png').convert('RGB'); im.save(f'{IMG}/{bn}.webp',quality=88)
    for i,(x,y) in enumerate(POS): crops.append(im.crop((x,y,x+519,y+249)))
    sl=Image.open(f'out/slides-{g+1}.png').convert('RGB')
    for i in range(9):
        n=g*9+i; c=sl.crop(((i%3)*1920,(i//3)*1080,(i%3)*1920+1920,(i//3)*1080+1080))
        c.save(f'{IMG}/tech-logo-{n+1:02d}-{slugs[n]}.webp',quality=84)
# 45-logo wall (9 x 5) for the screen in the hero photo
W,H,cols,rows=1800,1000,9,5; cw,ch=W//cols,H//rows
wall=Image.new('RGB',(W,H),(250,250,250)); d=ImageDraw.Draw(wall)
for i,t in enumerate(crops):
    a=np.array(t.crop((30,40,490,190))); a[(a>205).all(-1)]=250
    lg=Image.fromarray(a); lg.thumbnail((cw-24,ch-50),Image.LANCZOS)
    wall.paste(lg,((i%cols)*cw+(cw-lg.width)//2,(i//cols)*ch+(ch-lg.height)//2))
for c in range(1,cols): d.line([(c*cw,0),(c*cw,H)],fill=(222,222,222),width=2)
for r in range(1,rows): d.line([(0,r*ch),(W,r*ch)],fill=(222,222,222),width=2)
wall.save('out/tech-logo-wall-45.png'); print('ok')


# Hero: composite the real logo wall onto the screen in the Flora photo (out/hero-a.png)
import cv2
im=cv2.imread('out/hero-a.png'); Hh,Ww=im.shape[:2]
wallc=cv2.cvtColor(np.array(wall),cv2.COLOR_RGB2BGR)
dst=np.float32([[699,146],[2159,138],[2159,903],[699,897]])   # measured screen corners in hero-a.png
M=cv2.getPerspectiveTransform(np.float32([[0,0],[W,0],[W,H],[0,H]]),dst)
warp=cv2.GaussianBlur(cv2.warpPerspective(wallc,M,(Ww,Hh),flags=cv2.INTER_CUBIC),(0,0),0.6)
quad=np.zeros((Hh,Ww),np.uint8); cv2.fillConvexPoly(quad,dst.astype(np.int32),255)
alpha=cv2.GaussianBlur(quad/255.0,(3,3),0)[...,None]
out=(warp*alpha+im*(1-alpha)).astype(np.uint8)
hero=Image.fromarray(cv2.cvtColor(out,cv2.COLOR_BGR2RGB)).resize((1920,1072),Image.LANCZOS).resize((1920,1080),Image.LANCZOS)
hero.save(f'{IMG}/tech-logos-hero.webp',quality=86)
hero.resize((768,432),Image.LANCZOS).save(f'{IMG}/tech-logos-hero-768w.webp',quality=84)
hero.resize((1200,675),Image.LANCZOS).save(f'{IMG}/tech-logos-hero-og.webp',quality=86)
print('hero ok')
