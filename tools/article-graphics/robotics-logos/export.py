# From the four Figma board PNGs in out/: saves boards + 36 named tiles as webp,
# builds the 36-logo screen wall, composites it onto the Flora hero (out/hero-a.png), and writes hero/OG/thumbnail sizes.
import glob, cv2, numpy as np
from PIL import Image, ImageDraw
IMG='/Users/ebaq/Documents/github-repos/ebaq-design-react/public/images/blog/robotics-logos'
POS=[(131,116),(701,116),(1271,116),(131,416),(701,416),(1271,416),(131,716),(701,716),(1271,716)]
BOARDS=["robotics-logos-01-humanoid-robot-companies","robotics-logos-02-next-generation-humanoids-and-robot-ai","robotics-logos-03-industrial-legged-and-inspection-robots","robotics-logos-04-logistics-service-and-field-robots"]
SLUGS=["figure","boston-dynamics","agility-robotics","apptronik","1x","unitree","ubtech","humanoid","sanctuary-ai","agibot","kepler","mentee-robotics","holiday-robotics","rainbow-robotics","skild-ai","field-ai","dyna-robotics","agile-robots","universal-robots","standard-bots","path-robotics","deep-robotics","anybotics","korial","gecko-robotics","dexterity","symbotic","locus-robotics","diligent-robotics","serve-robotics","starship-technologies","hyphen","verdant-robotics","carbon-robotics","irobot","cmr-surgical"]
crops=[]
for b,bn in enumerate(BOARDS):
    im=Image.open(f'out/{bn}.png').convert('RGB'); im.save(f'{IMG}/{bn}.webp',quality=88)
    for i,(x,y) in enumerate(POS):
        n=b*9+i; t=im.crop((x,y,x+519,y+249)).resize((520,250),Image.LANCZOS)
        t.save(f'{IMG}/robotics-logo-{n+1:02d}-{SLUGS[n]}.webp',quality=90); crops.append(t)
# screen wall in the screen's proportions; grid lines inside tiles whitened
W,H,cols=1500,1020,6; cw,ch=W//cols,H//6
wall=Image.new('RGB',(W,H),(250,250,250)); d=ImageDraw.Draw(wall)
for i,t in enumerate(crops):
    a=np.array(t.crop((40,40,480,185))); a[(a>205).all(-1)]=250
    lg=Image.fromarray(a); lg.thumbnail((cw-30,ch-50),Image.LANCZOS)
    wall.paste(lg,((i%cols)*cw+(cw-lg.width)//2,(i//cols)*ch+(ch-lg.height)//2))
for c in range(1,cols): d.line([(c*cw,0),(c*cw,H)],fill=(222,222,222),width=2)
for r in range(1,6): d.line([(0,r*ch),(W,r*ch)],fill=(222,222,222),width=2)
wall.save('out/robotics-logo-wall-36.png')
wall=cv2.cvtColor(np.array(wall),cv2.COLOR_RGB2BGR)
im=cv2.imread('out/hero-a.png'); Hh,Ww=im.shape[:2]
dst=np.float32([[1433,266],[2640,37],[2645,995],[1433,945]])   # screen corners in hero-a.png
M=cv2.getPerspectiveTransform(np.float32([[0,0],[W,0],[W,H],[0,H]]),dst)
warp=cv2.GaussianBlur(cv2.warpPerspective(wall,M,(Ww,Hh),flags=cv2.INTER_CUBIC),(0,0),0.6)
quad=np.zeros((Hh,Ww),np.uint8); cv2.fillConvexPoly(quad,dst.astype(np.int32),255)
g=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY); x0,y0,x1,y1=1860,500,2360,Hh
dark=(g[y0:y1,x0:x1]<205).astype(np.uint8); n,lab,st,_=cv2.connectedComponentsWithStats(dark,8)
person=np.zeros_like(dark)
for i in range(1,n):
    if np.where(lab==i)[0].max()>=dark.shape[0]-2 and st[i,cv2.CC_STAT_AREA]>5000: person[lab==i]=1
person=cv2.morphologyEx(person,cv2.MORPH_CLOSE,np.ones((9,9),np.uint8))
pm=np.zeros((Hh,Ww),np.uint8); pm[y0:y1,x0:x1]=person*255; pm=cv2.dilate(pm,np.ones((3,3),np.uint8))
alpha=cv2.GaussianBlur((quad/255.0)*(1-cv2.GaussianBlur(pm,(5,5),0)/255.0),(3,3),0)[...,None]
out=(warp*alpha+im*(1-alpha)).astype(np.uint8)
hero=Image.fromarray(cv2.cvtColor(out,cv2.COLOR_BGR2RGB)).resize((1920,1072),Image.LANCZOS)
hero=hero.crop((0,0,1920,1072)).resize((1920,1080),Image.LANCZOS)
hero.save(f'{IMG}/robotics-logos-hero.webp',quality=86)
hero.resize((768,432),Image.LANCZOS).save(f'{IMG}/robotics-logos-hero-768w.webp',quality=84)
hero.resize((1200,675),Image.LANCZOS).save(f'{IMG}/robotics-logos-hero-og.webp',quality=86)
print('done')
