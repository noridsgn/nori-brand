# Footage card over the static dark background (no blurred copy of the screen: rule for fast Claude→Figma reels)
import json, cv2, numpy as np
MEZ = "/home/claude/w/mez/"
tl = json.load(open("timeline.json")); segs = tl["segs"]; dur = tl["dur"]
CX, CY, CW, CH = 130, 262, 820, 810
# zoom per clip: (w, cx, cy) at start -> end of the clip's used span (source px, 1080x1920 frame)
Z = {"2527_3": ((1010, 545, 935), (900, 520, 930)),
     "2528_2": ((1000, 555, 1020), (880, 560, 1060)),
     "2529_3": ((1080, 540, 930), (930, 610, 960)),
     "2531_3": ((980, 500, 930), (900, 480, 925))}
span, first = {}, {}
for s in segs:
    a, b = span.get(s["clip"], (s["a"], s["b"])); span[s["clip"]] = (min(a, s["a"]), max(b, s["b"])); first.setdefault(s["clip"], s["t0"])
ss = lambda x: x * x * (3 - 2 * x)
BG = cv2.imread("bg.png").astype(np.float32)
m = np.zeros((CH, CW), np.uint8); cv2.rectangle(m, (36, 0), (CW - 37, CH - 1), 255, -1); cv2.rectangle(m, (0, 36), (CW - 1, CH - 37), 255, -1)
for x, y in ((36, 36), (CW - 37, 36), (36, CH - 37), (CW - 37, CH - 37)): cv2.circle(m, (x, y), 36, 255, -1, cv2.LINE_AA)
MASK = cv2.GaussianBlur(m, (3, 3), 0).astype(np.float32)[..., None] / 255
def render(t, caps):
    s = [x for x in segs if x["t0"] <= t + 1e-6][-1]
    c = s["clip"]; st = s["a"] + (t - s["t0"]); fi = int(round(st * 29.97))
    cap, pos = caps.get(c, (None, -1))
    if cap is None: cap = cv2.VideoCapture(MEZ + c + ".mp4"); pos = -1
    if fi <= pos: cap.set(cv2.CAP_PROP_POS_FRAMES, fi); pos = fi - 1
    fr = None
    while pos < fi:
        ok, f = cap.read(); pos += 1
        if ok: fr = f
        else: break
    if fr is None: fr = caps["last"]
    caps[c] = (cap, pos); caps["last"] = fr
    a, b = span[c]; u = ss(min(1, max(0, (st - a) / (b - a))))
    (w0, x0, y0), (w1, x1, y1) = Z[c]
    w = w0 + (w1 - w0) * u; cx = x0 + (x1 - x0) * u; cy = y0 + (y1 - y0) * u
    k = min(1, (t - first[c]) / 0.35); w *= 1 - 0.05 * (1 - k) ** 3          # small settle on each new shot
    h = w * CH / CW; x = min(max(cx - w / 2, 0), 1080 - w); y = min(max(cy - h / 2, 0), 1920 - h); sc = CW / w
    M = np.float32([[sc, 0, -x * sc], [0, sc, -y * sc]])
    card = cv2.warpAffine(fr, M, (CW, CH), flags=cv2.INTER_CUBIC if sc > 1 else cv2.INTER_AREA).astype(np.float32)
    out = BG.copy(); r = out[CY:CY + CH, CX:CX + CW]
    out[CY:CY + CH, CX:CX + CW] = r * (1 - MASK) + card * MASK
    return out  # BGR float
