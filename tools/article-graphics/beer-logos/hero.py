# Hero: composite the real logo wall onto the screen in the Flora photo (out/hero-a.png), keeping the pendant lamps in front.
import cv2, numpy as np
from PIL import Image
IMG='/Users/ebaq/Documents/github-repos/ebaq-design-react/public/images/blog/beer-logos'
im=cv2.imread('out/hero-a.png'); Hh,Ww=im.shape[:2]
wall=cv2.imread('out/beer-logo-wall-45.png'); H,W=wall.shape[:2]
dst=np.float32([[1777,250],[2441,163],[2450,608],[1787,636]])
M=cv2.getPerspectiveTransform(np.float32([[0,0],[W,0],[W,H],[0,H]]),dst)
warp=cv2.GaussianBlur(cv2.warpPerspective(wall,M,(Ww,Hh),flags=cv2.INTER_CUBIC),(0,0),0.6)
quad=np.zeros((Hh,Ww),np.uint8); cv2.fillConvexPoly(quad,dst.astype(np.int32),255)
# lamps/cords in front of the screen: dark metal or warm glow, connected to the screen's top or right edge
lum=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY).astype(int); b,g,r=[im[...,i].astype(int) for i in range(3)]
cand=((lum<120)|((r>170)&(b<140)&(r-b>60)))&(quad>0)
cand=cv2.morphologyEx(cand.astype(np.uint8),cv2.MORPH_CLOSE,np.ones((7,7),np.uint8))
n,lab,st,_=cv2.connectedComponentsWithStats(cand)
edge=cv2.dilate(quad,np.ones((9,9),np.uint8))-cv2.erode(quad,np.ones((9,9),np.uint8))
keep=np.zeros_like(cand)
for k in range(1,n):
    if st[k,4]>1500 and (edge[lab==k]>0).any(): keep[lab==k]=1
shade=cv2.morphologyEx(keep,cv2.MORPH_OPEN,np.ones((21,21),np.uint8)); cord=cv2.morphologyEx(keep,cv2.MORPH_OPEN,np.ones((45,1),np.uint8)); keep=cv2.dilate(shade|cord,np.ones((3,3),np.uint8))
# fill holes inside lamp shades (bright bulb glow)
cnts,_=cv2.findContours(keep,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE); cv2.drawContours(keep,cnts,-1,1,-1)
alpha=cv2.GaussianBlur((quad/255.0)*(1-keep),(3,3),0)[...,None]
out=(warp*alpha+im*(1-alpha)).astype(np.uint8)
cv2.imwrite('out/hero-check.png',out[100:720,1700:2560]); print('lamp px',int(keep.sum()))
hero=Image.fromarray(cv2.cvtColor(out,cv2.COLOR_BGR2RGB)).resize((1920,1072),Image.LANCZOS).resize((1920,1080),Image.LANCZOS)
hero.save(f'{IMG}/beer-logos-hero.webp',quality=86)
hero.resize((768,432),Image.LANCZOS).save(f'{IMG}/beer-logos-hero-768w.webp',quality=84)
hero.resize((1200,675),Image.LANCZOS).save(f'{IMG}/beer-logos-hero-og.webp',quality=86)
print('hero ok')
