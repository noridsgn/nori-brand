import numpy as np, math, subprocess, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H, FPS = 1080, 1920, 30
DUR = 8.0
N = int(DUR * FPS)
import os
HERE = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(HERE, "../../../fonts/IBMPlexSansArabic-Bold.ttf")
FONT_M = os.path.join(HERE, "../../../fonts/IBMPlexSansArabic-Medium.ttf")

BG = np.array([12, 12, 14], float)
GOLD = np.array([230, 184, 76], float)
RED = np.array([232, 72, 62], float)
GREEN = np.array([84, 206, 132], float)

CX, CY = 540, 780
A0, B0, W0 = 265, 245, 80

base = dict(a=1, b=1, tipL=14, tipR=14, rot=0, ew=1, eh=1, cres=0, anger=0, lx=0, ly=0,
            dx=0, dy=0, ds=1, orbit=0, bounce=0, alarm=0, tint=GOLD, oy=0, shake=0, label="هادي")
def K(t, **kw):
    d = dict(base); d.update(kw); return (t, d)

keys = [
    K(0.0), K(1.1),
    # thinking: eyes look up at the dot, dot orbits, right tip rises like a hand on chin
    K(1.45, lx=0.5, ly=-0.9, eh=0.75, tipR=40, rot=-5, orbit=1, label="تفكّر"),
    K(2.4, lx=0.5, ly=-0.9, eh=0.75, tipR=40, rot=-5, orbit=1, label="تفكّر"),
    # surprised: stretch tall, tips flare, dot jumps high
    K(2.65, a=0.9, b=1.12, tipL=40, tipR=40, ew=1.45, eh=1.45, dy=-120, ds=1.15, oy=-30, label="تنصدم"),
    K(3.5, a=0.9, b=1.12, tipL=40, tipR=40, ew=1.45, eh=1.45, dy=-120, ds=1.15, oy=-30, label="تنصدم"),
    # laughing: squash, crescents, dot bounces
    K(3.75, a=1.08, b=0.92, cres=1, bounce=1, tipL=24, tipR=24, label="تضحك"),
    K(4.7, a=1.08, b=0.92, cres=1, bounce=1, tipL=24, tipR=24, label="تضحك"),
    # warning: red, angry, dot alarms, tips drop
    K(4.95, anger=1, tint=RED, tipL=2, tipR=2, ly=0.2, eh=0.9, alarm=1, label="تحذّر"),
    K(5.9, anger=1, tint=RED, tipL=2, tipR=2, ly=0.2, eh=0.9, alarm=1, shake=1, label="تحذّر"),
    # positive: green, happy, tips up like arms, dot pops
    K(6.15, tint=GREEN, cres=1, tipL=48, tipR=48, ds=1.3, dy=-30, label="تمام"),
    K(7.1, tint=GREEN, cres=1, tipL=48, tipR=48, ds=1.3, dy=-30, label="تمام"),
    K(7.45, label="هادي"), K(8.0, label="هادي"),
]

def ease(x):
    x = min(max(x, 0), 1); return x * x * (3 - 2 * x)
def back_ease(x, s=1.7):
    x = min(max(x, 0), 1) - 1; return x * x * ((s + 1) * x + s) + 1

def params(t):
    t = min(t, keys[-1][0] - 1e-6)
    for i in range(len(keys) - 1):
        t0, a = keys[i]; t1, b = keys[i + 1]
        if t0 <= t <= t1:
            x = (t - t0) / (t1 - t0)
            e = back_ease(x) if t1 - t0 < 0.4 else ease(x)
            out = {}
            for k in a:
                if k == "label":
                    out[k] = b[k] if x > 0.3 else a[k]; out["label_prev"] = a[k]; out["label_x"] = x
                elif k == "tint":
                    out[k] = a[k] + (b[k] - a[k]) * ease(x)
                else:
                    out[k] = a[k] + (b[k] - a[k]) * e
            return out

def blink(t):
    for bt in (0.65, 2.1, 6.7, 7.7):
        d = abs(t - bt)
        if d < 0.09: return 0.1 + 0.9 * (d / 0.09) ** 1.5
    return 1.0

yy, xx = np.mgrid[0:H, 0:W].astype(float)
vign = 1 - 1.2 * np.clip(((xx - W / 2) / W) ** 2 + ((yy - H * 0.45) / H) ** 2, 0, 1)
bg_base = BG[None, None, :] * np.clip(vign, 0.45, 1)[..., None]
glow_shape = np.exp(-(((xx - CX) / 560) ** 2 + ((yy - (CY + 60)) / 560) ** 2))

f_label = ImageFont.truetype(FONT, 66)
f_small = ImageFont.truetype(os.path.join(HERE, 'ibm-plex-sans-latin-500-normal.woff'), 26)
def text_mask(label, size=160):
    im = Image.new("L", (W, size), 0); d = ImageDraw.Draw(im)
    d.text((W / 2, size / 2), label, font=f_label, fill=255, anchor="mm", direction="rtl", language="ar")
    return np.asarray(im, float) / 255
def top_text():
    im = Image.new("L", (W, 120), 0); d = ImageDraw.Draw(im)
    d.text((W / 2, 60), "N O R I    ·    C H A R A C T E R   T E S T", font=f_small, fill=255, anchor="mm")
    return np.asarray(im, float) / 255
TOP = top_text()

SS = 2
CROP = 900  # crop size around character
def smooth(x): x = np.clip(x, 0, 1); return x * x * (3 - 2 * x)

def draw_bowl(p, cx, cy, width_mul=1.0, off=(0, 0)):
    """variable-width brush along the ن bowl; returns L mask at SS scale"""
    S = CROP * SS
    im = Image.new("L", (S, S), 0); d = ImageDraw.Draw(im)
    a, b = A0 * p["a"] * SS, B0 * p["b"] * SS
    w0 = W0 * SS * width_mul
    th0, th1 = -p["tipR"], 180 + p["tipL"]
    rot = math.radians(p["rot"])
    n = 260
    for i in range(n + 1):
        th = th0 + (th1 - th0) * i / n
        r = math.radians(th)
        x, y = a * math.cos(r), b * math.sin(r)
        # tips curl slightly inward as they rise
        if th < 0: x -= (abs(th) / 50) ** 2 * 0.10 * a
        if th > 180: x += ((th - 180) / 50) ** 2 * 0.10 * a
        xr = x * math.cos(rot) - y * math.sin(rot); yr = x * math.sin(rot) + y * math.cos(rot)
        prof = max(math.sin(math.radians(min(max(th, 0), 180))), 0)
        tipfade = min(1, (i / n) / 0.08, (1 - i / n) / 0.08)
        w = w0 * (0.32 + 0.68 * prof ** 0.8) * (0.55 + 0.45 * tipfade)
        px, py = S / 2 + xr + off[0] * SS, S / 2 + yr + off[1] * SS
        d.ellipse([px - w / 2, py - w / 2, px + w / 2, py + w / 2], fill=255)
    return im

def eyes_mask(p, bl):
    S = CROP * SS
    im = Image.new("L", (S, S), 0); d = ImageDraw.Draw(im)
    a, b = A0 * p["a"] * SS, B0 * p["b"] * SS
    rot = math.radians(p["rot"])
    for side in (-1, 1):
        x, y = side * 0.33 * a + p["lx"] * 0.12 * a, 0.36 * b + p["ly"] * 0.12 * b
        xr = x * math.cos(rot) - y * math.sin(rot); yr = x * math.sin(rot) + y * math.cos(rot)
        ex, ey = S / 2 + xr, S / 2 + yr
        r0 = 0.118 * a * p["ew"]
        rh = 0.118 * a * p["eh"] * bl
        cres = p["cres"]
        if cres < 1:
            m = Image.new("L", (S, S), 0); dm = ImageDraw.Draw(m)
            dm.ellipse([ex - r0, ey - rh, ex + r0, ey + rh], fill=int(255 * (1 - cres)))
            if p["anger"] > 0.01:
                k = p["anger"]; inner, outer = ex - side * r0, ex + side * r0; top = ey - rh
                dm.polygon([(inner - side * 30, top - 20), (outer + side * 30, top - 20),
                            (outer + side * 30, top - 20 + rh * 0.2 * k), (inner - side * 30, top + rh * 1.15 * k)], fill=0)
            im = Image.fromarray(np.maximum(np.asarray(im), np.asarray(m)))
        if cres > 0:
            m = Image.new("L", (S, S), 0); dm = ImageDraw.Draw(m)
            w = r0 * 2.3; th = r0 * 0.62
            box = [ex - w / 2, ey - w * 0.3, ex + w / 2, ey + w * 0.9]
            dm.arc(box, 205, 335, fill=int(255 * cres), width=int(th))
            for ang in (205, 335):
                aa = math.radians(ang)
                px = (box[0] + box[2]) / 2 + (w / 2 - th / 2) * math.cos(aa)
                py = (box[1] + box[3]) / 2 + ((box[3] - box[1]) / 2 - th / 2) * math.sin(aa)
                dm.ellipse([px - th / 2, py - th / 2, px + th / 2, py + th / 2], fill=int(255 * cres))
            im = Image.fromarray(np.maximum(np.asarray(im), np.asarray(m)))
    return im

def down(im): return np.asarray(im.resize((CROP, CROP), Image.LANCZOS), float) / 255
def blur(arr, r): return np.asarray(Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r)), float) / 255

def render(fi):
    t = fi / FPS
    p = params(t); bl = blink(t); tint = p["tint"]
    light = np.minimum(tint * 1.08 + 30, 255); dark = tint * 0.45
    bob = 9 * math.sin(t * 2.3)
    sq = 1 + 0.015 * math.sin(t * 4.6)
    p = dict(p); p["a"] *= sq; p["b"] /= sq
    if p["bounce"] > 0:
        bb = abs(math.sin(t * 11)) * p["bounce"]
        p["b"] *= 1 - 0.05 * bb; p["a"] *= 1 + 0.04 * bb
    shake = p["shake"] * 7 * math.sin(t * 70) if 4.95 < t < 5.9 else 0
    cx, cy = CX + shake, CY + bob + p["oy"]

    frame = bg_base + glow_shape[..., None] * tint[None, None, :] * 0.09
    # floor shadow + light pool
    fy = CY + B0 + 150
    pool = np.exp(-(((xx - cx) / 300) ** 2 + ((yy - fy) / 26) ** 2))
    frame = frame * (1 - 0.55 * pool[..., None]) + tint * (np.exp(-(((xx - cx) / 420) ** 2 + ((yy - fy) / 60) ** 2)) * 0.10)[..., None]

    x0, y0 = int(cx - CROP / 2), int(cy - CROP / 2)
    reg = frame[y0:y0 + CROP, x0:x0 + CROP]
    lyy = yy[y0:y0 + CROP, x0:x0 + CROP] - cy

    M = down(draw_bowl(p, cx, cy))
    HL = blur(down(draw_bowl(p, cx, cy, 0.32, (0, -W0 * 0.24))), 6)
    SH = blur(down(draw_bowl(p, cx, cy, 0.45, (0, W0 * 0.26))), 10)
    # gold ribbon shading
    g = np.clip((lyy + 60) / (B0 * 1.5), 0, 1)[..., None]
    col = tint * (0.98 - 0.3 * g) + 0 * g
    col = col * (1 - 0.45 * SH[..., None]) + dark * 0.0
    col = col + (light - tint) * HL[..., None] * 0.9 + np.array([255, 250, 235]) * (HL ** 3)[..., None] * 0.35
    glow = blur(M, 28)
    reg = reg + tint * glow[..., None] * 0.35
    reg = reg * (1 - M[..., None]) + col * M[..., None]

    # eyes (cream, glowing) sitting inside the bowl
    E = down(eyes_mask(p, bl))
    reg = reg + tint * (blur(E, 14) * 0.8 + blur(E, 40) * 0.4)[..., None]
    reg = reg * (1 - E[..., None]) + (np.array([255, 246, 225]) * 0.85 + tint * 0.15) * E[..., None]

    # the dot of ن — its own little personality
    ds = p["ds"] * (1 + 0.18 * p["alarm"] * (0.5 + 0.5 * math.sin(t * 16)))
    ox = p["orbit"] * 55 * math.cos(t * 5.5)
    oyd = p["orbit"] * (-70 + 22 * math.sin(t * 5.5))
    bnc = -p["bounce"] * 70 * abs(math.sin(t * 11 + 0.6))
    dxp = CROP / 2 + p["dx"] + ox + p["lx"] * 10
    dyp = CROP / 2 - B0 * p["b"] * 0.42 + p["dy"] + oyd + bnc
    rr = W0 * 0.56 * ds
    dyy, dxx = np.mgrid[0:CROP, 0:CROP].astype(float)
    dd = np.sqrt((dxx - dxp) ** 2 + (dyy - dyp) ** 2)
    D = np.clip(rr - dd + 0.5, 0, 1)
    hl = np.exp(-(((dxx - (dxp - rr * 0.3)) / (rr * 0.45)) ** 2 + ((dyy - (dyp - rr * 0.35)) / (rr * 0.3)) ** 2))
    dcol = tint * (1.0 - 0.3 * np.clip((dyy - dyp) / rr, 0, 1))[..., None] + (light - tint) * hl[..., None] + 255 * (hl ** 4)[..., None] * 0.25
    reg = reg + tint * blur(D, 22)[..., None] * (0.45 + 0.4 * p["alarm"])
    reg = reg * (1 - D[..., None]) + dcol * D[..., None]

    frame[y0:y0 + CROP, x0:x0 + CROP] = reg

    frame[140:260] = frame[140:260] * (1 - TOP[..., None] * 0.7) + GOLD * TOP[..., None] * 0.7
    x = p.get("label_x", 1); lab = p["label"]
    la = 1 if p.get("label_prev") == lab else (ease(min(1, abs(x - 0.3) / 0.3)) if x < 0.6 else 1)
    lift = int((1 - la) * 18) if x >= 0.3 else -int((1 - la) * 18)
    ty = 1400 + lift
    L = text_mask(lab) * la
    frame[ty:ty + 160] = frame[ty:ty + 160] * (1 - L[..., None]) + np.array([240, 236, 228]) * L[..., None]
    ul = 46 * la
    frame[ty + 135:ty + 140, int(W / 2 - ul):int(W / 2 + ul)] = tint
    return np.clip(frame, 0, 255).astype(np.uint8)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        for t in map(float, sys.argv[1:]):
            Image.fromarray(render(int(t * FPS))).save(f"n_{t}.png")
        sys.exit()
    ff = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                           "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "nori_nun_character_test.mp4"], stdin=subprocess.PIPE)
    for i in range(N): ff.stdin.write(render(i).tobytes())
    ff.stdin.close(); ff.wait()
