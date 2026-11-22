# Hero: composite the real logo wall onto the angled lobby screen in out/hero-a.png, keeping the manager's head in front.
import cv2
im=cv2.imread('out/hero-a.png'); Hh,Ww=im.shape[:2]
wallc=cv2.cvtColor(np.array(wall),cv2.COLOR_RGB2BGR)
dst=np.float32([[1706,349],[2294,221],[2292,781],[1720,756]])   # detected screen corners
M=cv2.getPerspectiveTransform(np.float32([[0,0],[W,0],[W,H],[0,H]]),dst)
warp=cv2.GaussianBlur(cv2.warpPerspective(wallc,M,(Ww,Hh),flags=cv2.INTER_CUBIC),(0,0),0.6)
quad=np.zeros((Hh,Ww),np.uint8); cv2.fillConvexPoly(quad,dst.astype(np.int32),255)
# person mask: dark/skin pixels in the right strip of the screen that are not the bright screen background
g=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY); hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV)
skin=(hsv[...,0]>=6)&(hsv[...,0]<25)&(hsv[...,1]>45)&(hsv[...,1]<150)&(hsv[...,2]>70)
hair=g<75
fg=(skin|hair)
person=np.zeros(g.shape,np.uint8)
for y in range(400,640):
    x=2300; gap=0; xf=None
    while x>2235:
        if fg[y,x]: xf=x; gap=0
        else:
            gap+=1
            if gap>4: break
        x-=1
    if xf is not None and xf<2296: person[y,xf:2320]=255
person=cv2.morphologyEx(person,cv2.MORPH_OPEN,np.ones((5,1),np.uint8))
person=cv2.dilate(person,np.ones((3,3),np.uint8))
area=cv2.bitwise_and(quad,cv2.bitwise_not(person))
alpha=cv2.GaussianBlur(area/255.0,(3,3),0)[...,None]
out=(warp*alpha+im*(1-alpha)).astype(np.uint8)
cv2.imwrite('out/hero-check.png',out[150:850,1600:2450])
hero=Image.fromarray(cv2.cvtColor(out,cv2.COLOR_BGR2RGB)).resize((1920,1072),Image.LANCZOS).resize((1920,1080),Image.LANCZOS)
hero.save(f'{IMG}/hotel-logos-hero.webp',quality=86)
hero.resize((768,432),Image.LANCZOS).save(f'{IMG}/hotel-logos-hero-768w.webp',quality=84)
hero.resize((1200,675),Image.LANCZOS).save(f'{IMG}/hotel-logos-hero-og.webp',quality=86)
print('hero ok')
