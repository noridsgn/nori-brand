import numpy as np, math, subprocess, sys
from PIL import Image, ImageFilter
import nun
from nun import params, blink, ease, W, H, FPS, N, CX, CY, A0, B0, W0, GOLD, TOP, text_mask, eyes_mask, down, blur, CROP

yy, xx = nun.yy, nun.xx
HALF = CROP // 2
hy, hx = np.mgrid[0:HALF, 0:HALF].astype(float) * 2 + 1
fy_, fx_ = np.mgrid[0:CROP, 0:CROP].astype(float)
FLOOR = CY + B0 + 140

def path(p):
    a, b = A0 * p["a"], B0 * p["b"]
    th0, th1 = -p["tipR"], 180 + p["tipL"]
    rot = math.radians(p["rot"]); n = 90
    pts = []
    for i in range(n + 1):
        th = th0 + (th1 - th0) * i / n; r = math.radians(th)
        x, y = a * math.cos(r), b * math.sin(r)
        if th < 0: x -= (abs(th) / 50) ** 2 * 0.10 * a
        if th > 180: x += ((th - 180) / 50) ** 2 * 0.10 * a
        xr = x * math.cos(rot) - y * math.sin(rot); yr = x * math.sin(rot) + y * math.cos(rot)
        prof = max(math.sin(math.radians(min(max(th, 0), 180))), 0)
        tipfade = min(1, (i / n) / 0.08, (1 - i / n) / 0.08)
        w = W0 * 1.45 * (0.36 + 0.64 * prof ** 0.8) * (0.6 + 0.4 * tipfade)
        pts.append((CROP / 2 + xr, CROP / 2 + yr, w / 2))
    return pts

def tube_field(pts):
    best = np.full(hx.shape, 9.0); nx = np.zeros_like(hx); ny = np.zeros_like(hx)
    for (ax, ay, ar), (bx, by, br) in zip(pts[:-1], pts[1:]):
        vx, vy = bx - ax, by - ay; L2 = vx * vx + vy * vy + 1e-9
        tt = np.clip(((hx - ax) * vx + (hy - ay) * vy) / L2, 0, 1)
        qx, qy = ax + tt * vx, ay + tt * vy; r = ar + (br - ar) * tt
        dx, dy = hx - qx, hy - qy
        d = np.sqrt(dx * dx + dy * dy) / r
        m = d < best
        best = np.where(m, d, best); nx = np.where(m, dx / r, nx); ny = np.where(m, dy / r, ny)
    k = np.exp(-np.arange(-4, 5) ** 2 / 4.5); k /= k.sum()
    sm = lambda a: np.apply_along_axis(lambda r: np.convolve(r, k, 'same'), 0, np.apply_along_axis(lambda r: np.convolve(r, k, 'same'), 1, a))
    nx, ny = sm(nx), sm(ny)
    up = lambda a: np.asarray(Image.fromarray(a.astype(np.float32)).resize((CROP, CROP), Image.BICUBIC))
    return up(best), up(nx), up(ny)

def shade_glass(s, nx, ny, tint, core_amt=1.0, core_w=0.2):
    """s: normalized distance from tube/sphere axis (0 centre, 1 edge)."""
    s = np.clip(s, 0, 1.0)
    z = np.sqrt(np.clip(1 - s * s, 0, 1))
    # body: smoked dark glass
    col = np.array([22, 21, 26], float) + np.array([16, 15, 19]) * z[..., None]
    # gold filament / core light
    core = np.exp(-(s / core_w) ** 2) * core_amt
    halo = np.exp(-(s / 0.6) ** 2) * 0.35 * core_amt
    col = col + tint * (halo)[..., None] + (tint * 0.6 + 255 * 0.4) * core[..., None]
    # fresnel rim (gold below, white above)
    fres = (1 - z) ** 2.6
    col = col + tint * (fres * 0.95 * np.clip(0.5 + ny * 0.8, 0.15, 1))[..., None]
    col = col + np.array([255, 250, 240]) * (fres * 0.35 * np.clip(-ny, 0, 1))[..., None]
    # sharp specular (light from top-left)
    L = np.array([-0.45, -0.7, 0.55]); L = L / np.linalg.norm(L)
    nd = np.clip(nx * L[0] + ny * L[1] + z * L[2], 0, 1)
    col = col + 255 * (nd ** 60 * 0.95 + nd ** 12 * 0.10)[..., None]
    return col

def render(fi):
    t = fi / FPS
    p = dict(params(t)); bl = blink(t); tint = p["tint"]
    sq = 1 + 0.015 * math.sin(t * 4.6); p["a"] *= sq; p["b"] /= sq
    if p["bounce"] > 0:
        bb = abs(math.sin(t * 11)) * p["bounce"]; p["b"] *= 1 - 0.05 * bb; p["a"] *= 1 + 0.04 * bb
    bob = 9 * math.sin(t * 2.3)
    shake = p["shake"] * 7 * math.sin(t * 70) if 4.95 < t < 5.9 else 0
    cx, cy = CX + shake, CY + bob + p["oy"]

    # ----- character layer in crop -----
    layer = np.zeros((CROP, CROP, 3)); alpha = np.zeros((CROP, CROP))
    glowacc = np.zeros((CROP, CROP))
    pts = path(p)
    s, nx, ny = tube_field(pts)
    a_t = np.clip((1 - s) * W0 * 0.5, 0, 1)
    tube = shade_glass(s, nx, ny, tint, 1.0, 0.16)
    layer = tube * a_t[..., None]; alpha = a_t
    glowacc += np.exp(-np.clip(s, 0, 9) ** 2 / 0.05)

    # eyes: light orbs floating in the bowl
    E = down(eyes_mask(p, bl))
    eye_col = np.array([255, 246, 226]) * 0.88 + tint * 0.12
    layer = layer * (1 - E[..., None]) + eye_col * E[..., None]; alpha = np.maximum(alpha, E)
    glowacc += E * 1.2

    # the dot: glass bead with a gold core
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

    # ----- background -----
    frame = nun.bg_base + nun.glow_shape[..., None] * tint[None, None, :] * 0.07
    # glossy black floor below FLOOR
    below = yy > FLOOR
    frame = np.where(below[..., None], frame * 0.55, frame)
    hor = np.exp(-((yy - FLOOR) / 2.5) ** 2) * np.exp(-((xx - CX) / 420) ** 2)
    frame = frame + tint * (hor * 0.08)[..., None]

    x0, y0 = int(cx - CROP / 2), int(cy - CROP / 2)
    reg = frame[y0:y0 + CROP, x0:x0 + CROP]
    reg = reg + tint * glow[..., None]
    reg = reg * (1 - alpha[..., None]) + layer
    frame[y0:y0 + CROP, x0:x0 + CROP] = reg

    # ----- reflection on floor -----
    char = np.zeros((H, W, 3)); ca = np.zeros((H, W))
    char[y0:y0 + CROP, x0:x0 + CROP] = layer + tint * glow[..., None] * 0.6
    ca[y0:y0 + CROP, x0:x0 + CROP] = np.clip(alpha + glow * 0.6, 0, 1)
    span = 520
    src = char[int(FLOOR - span):int(FLOOR)][::-1]  # mirror (rows above floor)
    srca = ca[int(FLOOR - span):int(FLOOR)][::-1]
    # mirror around FLOOR: row FLOOR+k <- row FLOOR-k
    k0 = int(FLOOR)
    refl = np.asarray(Image.fromarray(np.clip(src, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(5)), float)
    fade = np.exp(-np.arange(span) / 150.0)[:, None] * 0.28
    hgt = min(span, H - k0)
    frame[k0:k0 + hgt] = frame[k0:k0 + hgt] + refl[:hgt] * fade[:hgt, :, None] * 1.0

    # ----- text -----
    frame[140:260] = frame[140:260] * (1 - TOP[..., None] * 0.7) + GOLD * TOP[..., None] * 0.7
    x = p.get("label_x", 1); lab = p["label"]
    la = 1 if p.get("label_prev") == lab else (ease(min(1, abs(x - 0.3) / 0.3)) if x < 0.6 else 1)
    lift = int((1 - la) * 18) if x >= 0.3 else -int((1 - la) * 18)
    ty = 1470 + lift
    Lm = text_mask(lab) * la
    frame[ty:ty + 160] = frame[ty:ty + 160] * (1 - Lm[..., None]) + np.array([240, 236, 228]) * Lm[..., None]
    ul = 46 * la
    frame[ty + 135:ty + 140, int(W / 2 - ul):int(W / 2 + ul)] = tint
    return np.clip(frame, 0, 255).astype(np.uint8)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        for tt in map(float, sys.argv[1:]):
            Image.fromarray(render(int(tt * FPS))).save(f"g_{tt}.png")
        sys.exit()
    ff = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                           "-c:v", "libx264", "-preset", "veryfast", "-crf", "17", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "nori_nun_glass_test.mp4"], stdin=subprocess.PIPE)
    for i in range(N): ff.stdin.write(render(i).tobytes())
    ff.stdin.close(); ff.wait()
