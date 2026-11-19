# The «ن» as a transparent layer you can drop into any reel.
# char_layer(p, t, bl) -> (rgb premultiplied CROPxCROP float, alpha, glow, tint)
# p = a params dict like nun.params() returns (expression values), t = seconds (for bob/orbit), bl = blink 0..1
import math, numpy as np
from PIL import Image
import nun
from nun import eyes_mask, down, blur, CROP, W0, B0
from glass import path, tube_field, shade_glass

fy_, fx_ = np.mgrid[0:CROP, 0:CROP].astype(float)

def char_layer(p, t, bl=1.0):
    p = dict(p); tint = np.asarray(p["tint"], float)
    sq = 1 + 0.015 * math.sin(t * 4.6); p["a"] *= sq; p["b"] /= sq
    if p["bounce"] > 0:
        bb = abs(math.sin(t * 11)) * p["bounce"]; p["b"] *= 1 - 0.05 * bb; p["a"] *= 1 + 0.04 * bb
    glowacc = np.zeros((CROP, CROP))
    s, nx, ny = tube_field(path(p))
    a_t = np.clip((1 - s) * W0 * 0.5, 0, 1)
    layer = shade_glass(s, nx, ny, tint, 1.0, 0.16) * a_t[..., None]; alpha = a_t
    glowacc += np.exp(-np.clip(s, 0, 9) ** 2 / 0.05)
    E = down(eyes_mask(p, bl))
    eye_col = np.array([255, 246, 226]) * 0.88 + tint * 0.12
    layer = layer * (1 - E[..., None]) + eye_col * E[..., None]; alpha = np.maximum(alpha, E)
    glowacc += E * 1.2
    ds = p["ds"] * (1 + 0.18 * p["alarm"] * (0.5 + 0.5 * math.sin(t * 16)))
    ox = p["orbit"] * 55 * math.cos(t * 5.5); oyd = p["orbit"] * (-70 + 22 * math.sin(t * 5.5))
    bnc = -p["bounce"] * 70 * abs(math.sin(t * 11 + 0.6))
    dxp = CROP / 2 + p["dx"] + ox + p["lx"] * 10
    dyp = CROP / 2 - B0 * p["b"] * 0.42 + p["dy"] + oyd + bnc
    rr = W0 * 0.62 * ds
    ddx, ddy = (fx_ - dxp) / rr, (fy_ - dyp) / rr
    sd = np.sqrt(ddx ** 2 + ddy ** 2)
    a_d = np.clip((1 - sd) * rr, 0, 1)
    bead = shade_glass(sd, ddx, ddy, tint, 0.9 + 0.5 * p["alarm"], 0.32)
    layer = layer * (1 - a_d[..., None]) + bead * a_d[..., None]; alpha = np.maximum(alpha, a_d)
    glowacc += np.exp(-np.clip(sd, 0, 9) ** 2 / 0.08) * (1 + p["alarm"])
    glow = blur(np.clip(glowacc, 0, 1), 26) * 0.55 + blur(np.clip(glowacc, 0, 1), 70) * 0.35
    return layer, alpha, glow, tint

def composite(frame, p, t, bl, cx, cy, scale, glow_k=0.8, opacity=1.0):
    """frame: HxWx3 float (0..255), drawn in place. (cx, cy) = centre of the character on the frame."""
    layer, alpha, glow, tint = char_layer(p, t, bl)
    S = max(8, int(CROP * scale))
    rs = lambda a: np.asarray(Image.fromarray(a.astype(np.float32)).resize((S, S), Image.LANCZOS))
    L = np.stack([rs(layer[..., i]) for i in range(3)], -1); A = np.clip(rs(alpha), 0, 1); G = np.clip(rs(glow), 0, 1)
    A *= opacity; G *= opacity; L *= opacity
    H, W = frame.shape[:2]; x0, y0 = int(round(cx - S / 2)), int(round(cy - S / 2))
    xa, ya, xb, yb = max(0, x0), max(0, y0), min(W, x0 + S), min(H, y0 + S)
    if xa >= xb or ya >= yb: return
    sl = (slice(ya - y0, yb - y0), slice(xa - x0, xb - x0))
    reg = frame[ya:yb, xa:xb]
    reg = reg + tint * (G[sl] * glow_k)[..., None]
    reg = reg * (1 - A[sl][..., None]) + L[sl]
    frame[ya:yb, xa:xb] = reg
