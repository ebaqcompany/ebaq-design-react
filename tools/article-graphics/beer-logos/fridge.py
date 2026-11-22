# Hero: put the 45 real beer logos onto the blank labels of the Flora supermarket fridge (out/fridge-a.png).
# Labels are detected, snapped to the fridge's column/shelf grid, and each logo is curved onto its label and
# multiplied into the label's own shading, so glass reflections and lighting stay intact.
import cv2, json, sys, numpy as np, random
sys.path.insert(0, '.'); import beer
IMG = '/Users/ebaq/Documents/github-repos/ebaq-design-react/public/images/blog/beer-logos'
im = cv2.imread('out/fridge-a.png'); H, W = im.shape[:2]
boxes = [b for b in json.load(open('out/fridge-boxes.json'))]
med_w = np.median([b[2] for b in boxes])
boxes = [b for b in boxes if b[2] < 1.45 * med_w and b[3] < 260]          # drop merged blobs
def clusters(vals, gap):
    vals = sorted(vals); out = [[vals[0]]]
    for v in vals[1:]:
        (out[-1].append(v) if v - out[-1][-1] < gap else out.append([v]))
    return [float(np.median(c)) for c in out]
cols = clusters([b[0] + b[2] / 2 for b in boxes], 28)
rows = clusters([b[1] + b[3] / 2 for b in boxes], 120)
near = lambda arr, v: int(np.argmin([abs(a - v) for a in arr]))
cell = {}
for b in boxes:
    c, r = near(cols, b[0] + b[2] / 2), near(rows, b[1] + b[3] / 2)
    cell.setdefault((c, r), []).append(b)
# per column: label width + kind (tall can label vs bottle label); per row+kind: label top/bottom
colw = {c: np.median([b[2] for k, v in cell.items() if k[0] == c for b in v]) for c in range(len(cols))}
colh = {c: np.median([b[3] for k, v in cell.items() if k[0] == c for b in v]) for c in range(len(cols))}
kind = {c: 'can' if colh[c] > 130 else 'bottle' for c in range(len(cols))}
band = {}
for (c, r), v in cell.items():
    band.setdefault((r, kind[c]), []).append((v[0][1], v[0][1] + v[0][3]))
band = {k: (np.median([a for a, _ in v]), np.median([b for _, b in v])) for k, v in band.items()}
hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV)
slots = []
for c in range(len(cols)):
    for r in range(len(rows)):
        if (r, kind[c]) not in band: continue
        y0, y1 = band[(r, kind[c])]; w = colw[c]; x0 = cols[c] - w / 2
        if (c, r) in cell:  # prefer the detected box when we have it
            b = cell[(c, r)][0]; x0, w, y0, y1 = b[0], b[2], b[1], b[1] + b[3]
        X0, Y0, X1, Y1 = int(x0), int(y0), int(x0 + w), int(y1)
        roi = hsv[Y0:Y1, X0:X1]
        if roi.size == 0 or (roi[..., 2] > 125).mean() < 0.55 or (roi[..., 1] < 90).mean() < 0.55: continue
        slots.append((X0, Y0, X1, Y1))
# glass-covered door areas: only exact detected labels of normal size, never grid-filled; drop slots cut by door frames
GLASS=[(440,790),(1985,2300)]; FRAME=[(418,450),(1960,1990),(2290,2330)]
ing=lambda s,z:z[0]<(s[0]+s[2])/2<z[1]
det={(b[0],b[1],b[0]+b[2],b[1]+b[3]) for b in boxes}
def ok(s):
    if any(s[0]<b and s[2]>a for a,b in FRAME): return False
    if any(ing(s,z) for z in GLASS):
        return s in det and 0.8*med_w<s[2]-s[0]<1.25*med_w
    return True
slots=[s for s in slots if ok(s)]
for z in GLASS:   # zone-local grid from that zone's clean detections
    good=[s for s in slots if ing(s,z)]
    if not good: continue
    xs=clusters([(s[0]+s[2])/2 for s in good],20)
    ws={near(xs,(s[0]+s[2])/2):[] for s in good}
    for s in good: ws[near(xs,(s[0]+s[2])/2)].append(s)
    ys=clusters([(s[1]+s[3])/2 for s in good],120)
    for ci,xc in enumerate(xs):
        w=np.median([s[2]-s[0] for s in ws[ci]]); hh=np.median([s[3]-s[1] for s in ws[ci]])
        for yc in ys:
            band_y=[s for s in good if abs((s[1]+s[3])/2-yc)<60 and abs((s[3]-s[1])-hh)<25]
            if not band_y: continue
            y0=np.median([s[1] for s in band_y]); y1=np.median([s[3] for s in band_y])
            c=(int(xc-w/2),int(y0),int(xc+w/2),int(y1)); roi=hsv[c[1]:c[3],c[0]:c[2]]
            if roi.size and (roi[...,2]>125).mean()>0.55 and (roi[...,1]<90).mean()>0.55: slots.append(c)
keep=[]
for s in sorted(slots,key=lambda s:-(s[2]-s[0])*(s[3]-s[1])):
    if all(min(s[2],k[2])-max(s[0],k[0])<=4 or min(s[3],k[3])-max(s[1],k[1])<=4 for k in keep): keep.append(s)
slots=keep
# brands: every logo once in the clean centre section first, then repeats elsewhere (stores stock several of each)
slugs = [b[0] for b in beer.B]
cx0, cx1 = 0.29 * W, 0.71 * W
centre = sorted([s for s in slots if cx0 < (s[0] + s[2]) / 2 < cx1], key=lambda s: (s[1] // 200, s[0]))
other = sorted([s for s in slots if not (cx0 < (s[0] + s[2]) / 2 < cx1)], key=lambda s: (s[1] // 200, s[0]))
rnd = random.Random(7); order = slugs[:]; rnd.shuffle(order)
assign = {}
for i, s in enumerate(centre): assign[s] = order[i % len(order)]
pool = slugs[:]; rnd.shuffle(pool)
for i, s in enumerate(other): assign[s] = pool[i % len(pool)]
print('slots', len(slots), 'centre', len(centre), 'other', len(other), 'cols', len(cols), 'rows', len(rows))
out = im.astype(np.float32)
for (X0, Y0, X1, Y1), slug in assign.items():
    lg = cv2.imread(f'logos-png/{slug}.png', cv2.IMREAD_UNCHANGED)
    if lg.shape[2] == 3: lg = np.dstack([lg, np.full(lg.shape[:2], 255, np.uint8)])
    lw, lh = X1 - X0, Y1 - Y0
    r = lg.shape[1] / lg.shape[0]
    tw = lw * 0.84; th = tw / r
    if th > lh * 0.62: th = lh * 0.62; tw = th * r
    tw, th = max(4, int(tw)), max(4, int(th))
    small = cv2.resize(lg, (tw, th), interpolation=cv2.INTER_AREA)
    # cylindrical wrap: sample the flat logo so its edges compress like print on a round bottle
    th_ang = 1.1; u = (np.arange(tw) + 0.5) / tw * 2 - 1
    src = (np.sin(u * th_ang) / np.sin(th_ang) + 1) / 2 * tw - 0.5
    mx = np.tile(src.astype(np.float32), (th, 1)); my = np.repeat(np.arange(th, dtype=np.float32)[:, None], tw, 1)
    wrap = cv2.remap(small, mx, my, cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0))
    px, py = X0 + (lw - tw) // 2, Y0 + int((lh - th) * 0.5)
    reg = out[py:py + th, px:px + tw]
    a = (wrap[..., 3:4] / 255.0) * 0.96
    lum = reg.mean(-1, keepdims=True); shade = np.clip(lum / max(1, np.percentile(lum, 90)), 0.55, 1.05)
    ink = wrap[..., :3].astype(np.float32) * shade                      # logo colours lit like the label
    out[py:py + th, px:px + tw] = reg * (1 - a) + ink * a
out = np.clip(out, 0, 255).astype(np.uint8)
cv2.imwrite('out/fridge-hero.png', out)
from PIL import Image
hero = Image.fromarray(cv2.cvtColor(out, cv2.COLOR_BGR2RGB)).resize((1920, 1072), Image.LANCZOS)
hero = hero.resize((1920, 1080), Image.LANCZOS)
hero.save(f'{IMG}/beer-logos-hero.webp', quality=88)
hero.resize((768, 432), Image.LANCZOS).save(f'{IMG}/beer-logos-hero-768w.webp', quality=84)
hero.resize((1200, 675), Image.LANCZOS).save(f'{IMG}/beer-logos-hero-og.webp', quality=86)
print('hero ok')
