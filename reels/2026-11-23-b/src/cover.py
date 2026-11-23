# cover_bg.png (cover.html) + the «ن» looking up at the cards, happy -> ../cover.png
import sys, os, numpy as np
from PIL import Image
H = os.path.dirname(os.path.abspath(__file__)); os.chdir(H)
sys.path.insert(0, os.path.join(H, "../../../characters/nun/src")); sv = sys.argv; sys.argv = sys.argv[:1]
import nun, layer
from nun import K
sys.argv = sv
e = dict(cres=1, tipL=40, tipR=40, ly=-0.6, lx=0.1, dy=-40, ds=1.15)
nun.keys = [K(0, **e), K(5, **e)]
fr = np.asarray(Image.open("cover_bg.png").convert("RGB"), float)
layer.composite(fr, nun.params(1.0), 1.0, 1.0, 540, 1452, 0.46, glow_k=0.9)
Image.fromarray(np.clip(fr, 0, 255).astype(np.uint8)).save("../cover.png")
