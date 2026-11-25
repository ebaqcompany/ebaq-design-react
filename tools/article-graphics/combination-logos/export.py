# Combination mark logos: saves the boards, the 27 annotated slides and the two graphics as named webps,
# and builds a 27-logo wall used as the reference for the hero scene.
import sys, os, numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); import combos as data
IMG='/Users/ebaq/Documents/github-repos/ebaq-design-react/public/images/blog/combination-mark-logos'
os.makedirs(IMG,exist_ok=True)
for i,g in enumerate(['side-by-side','stacked','built-into-the-name']):
    Image.open(f'out/board{i+1}.png').convert('RGB').save(f'{IMG}/combination-mark-logos-0{i+1}-{g}.webp',quality=88)
for n in ('how-to-design-a-combination-mark','when-to-choose-a-combination-mark'):
    Image.open(f'out/{n}.png').convert('RGB').save(f'{IMG}/{n}.webp',quality=88)
slides=[]
for n,b in enumerate(data.B,1):
    im=Image.open(f'out/slides/{n:02d}.png').convert('RGB'); im.save(f'{IMG}/combination-logo-{n:02d}-{b[0]}.webp',quality=84); slides.append(im)
print("slides ok")
