# Hero: composite the real logo wall onto the screen in the Flora photo (out/hero-a.png)
import cv2
im=cv2.imread('out/hero-a.png'); Hh,Ww=im.shape[:2]
wallc=cv2.cvtColor(np.array(wall),cv2.COLOR_RGB2BGR)
dst=np.float32([[1079,381],[1670,381],[1666,704],[1080,709]])   # measured screen corners in hero-a.png (frontal)
M=cv2.getPerspectiveTransform(np.float32([[0,0],[W,0],[W,H],[0,H]]),dst)
warp=cv2.GaussianBlur(cv2.warpPerspective(wallc,M,(Ww,Hh),flags=cv2.INTER_CUBIC),(0,0),0.6)
quad=np.zeros((Hh,Ww),np.uint8); cv2.fillConvexPoly(quad,dst.astype(np.int32),255)
# keep the presenter's hand and sleeve in front of the screen
b,g,r=[im[...,i].astype(int) for i in range(3)]
keep=np.zeros(quad.shape,np.uint8)
skin=((r-b>25)&(r>90)); keep[660:722,1545:1630]=skin[660:722,1545:1630]
sleeve=(np.maximum(np.maximum(r,g),b)<95); keep[690:722,1600:1680]|=sleeve[690:722,1600:1680]
keep=cv2.dilate(cv2.morphologyEx(keep,cv2.MORPH_CLOSE,np.ones((5,5),np.uint8)),np.ones((3,3),np.uint8))
quad[keep>0]=0
alpha=cv2.GaussianBlur(quad/255.0,(3,3),0)[...,None]
out=(warp*alpha+im*(1-alpha)).astype(np.uint8)
hero=Image.fromarray(cv2.cvtColor(out,cv2.COLOR_BGR2RGB)).resize((1920,1072),Image.LANCZOS).resize((1920,1080),Image.LANCZOS)
hero.save(f'{IMG}/b2b-logos-hero.webp',quality=86)
hero.resize((768,432),Image.LANCZOS).save(f'{IMG}/b2b-logos-hero-768w.webp',quality=84)
hero.resize((1200,675),Image.LANCZOS).save(f'{IMG}/b2b-logos-hero-og.webp',quality=86)
print('hero ok')
