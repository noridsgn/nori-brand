# cover_bg.png (cover.html) + the «ن» between the two labels -> ../cover.png
import sys, os, numpy as np
from PIL import Image
H = os.path.dirname(os.path.abspath(__file__)); os.chdir(H)
sys.path.insert(0, os.path.join(H, "../../../characters/nun/src")); sv = sys.argv; sys.argv = sys.argv[:1]
import nun, layer
from nun import K
sys.argv = sv
e = dict(lx=0.0, ly=-0.9, ew=1.15, eh=1.15, tipR=36, rot=-5)
nun.keys = [K(0, **e), K(5, **e)]
fr = np.asarray(Image.open("cover_bg.png").convert("RGB"), float)
layer.composite(fr, nun.params(1.0), 1.0, 1.0, 540, 1470, 0.3, glow_k=0.9)
Image.fromarray(np.clip(fr, 0, 255).astype(np.uint8)).save("../cover.png")
