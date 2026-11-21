# Hero: composite the real logo wall onto the screen in the Flora photo (out/hero-a.png)
import cv2
im=cv2.imread('out/hero-a.png'); Hh,Ww=im.shape[:2]
wallc=cv2.cvtColor(np.array(wall),cv2.COLOR_RGB2BGR)
dst=np.float32([[1561,242],[2541,146],[2539,771],[1561,739]])   # measured screen corners in hero-a.png (screen faces left)
M=cv2.getPerspectiveTransform(np.float32([[0,0],[W,0],[W,H],[0,H]]),dst)
warp=cv2.GaussianBlur(cv2.warpPerspective(wallc,M,(Ww,Hh),flags=cv2.INTER_CUBIC),(0,0),0.6)
quad=np.zeros((Hh,Ww),np.uint8); cv2.fillConvexPoly(quad,dst.astype(np.int32),255)
# keep the pointing hand in front of the screen (skin pixels near the lower-left corner)
b,g,r=[im[...,i].astype(int) for i in range(3)]
skin=((r-b>35)&(r>110)&(r>=g)).astype(np.uint8); reg=np.zeros_like(skin); reg[600:800,1540:1760]=1
skin=cv2.dilate(cv2.morphologyEx(skin*reg,cv2.MORPH_CLOSE,np.ones((7,7),np.uint8)),np.ones((5,5),np.uint8))
quad[skin>0]=0
alpha=cv2.GaussianBlur(quad/255.0,(3,3),0)[...,None]
out=(warp*alpha+im*(1-alpha)).astype(np.uint8)
hero=Image.fromarray(cv2.cvtColor(out,cv2.COLOR_BGR2RGB)).resize((1920,1072),Image.LANCZOS).resize((1920,1080),Image.LANCZOS)
hero.save(f'{IMG}/saas-logos-hero.webp',quality=86)
hero.resize((768,432),Image.LANCZOS).save(f'{IMG}/saas-logos-hero-768w.webp',quality=84)
hero.resize((1200,675),Image.LANCZOS).save(f'{IMG}/saas-logos-hero-og.webp',quality=86)
print('hero ok')
