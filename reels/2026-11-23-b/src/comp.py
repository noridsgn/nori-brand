# base (footage card) + overlay (captions/labels from reel.html) + the «ن» talking with NORI's voice
# python3 comp.py test T...  -> c_T.png      python3 comp.py all OVERLAY_DIR out.mp4
import sys, os, math, subprocess, wave, numpy as np, cv2
HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)
sys.path.insert(0, os.path.join(HERE, "../../../characters/nun/src"))
_sv = sys.argv; sys.argv = sys.argv[:1]
import nun, layer
from nun import K, GREEN
sys.argv = _sv
import base
FPS, DUR = 30, base.dur

THINK = dict(lx=0.5, ly=-0.9, eh=0.75, tipR=40, rot=-5, orbit=1)
WOW = dict(a=0.9, b=1.12, tipL=40, tipR=40, ew=1.45, eh=1.45, dy=-120, ds=1.15, oy=-30)
LAUGH = dict(a=1.08, b=0.92, cres=1, bounce=1, tipL=24, tipR=24)
OK = dict(tint=GREEN, cres=1, tipL=48, tipR=48, ds=1.3, dy=-30)
UP = lambda lx=0.0, **k: dict(lx=lx, ly=-0.95, **k)          # looks up at the card / the label on it
def hold(t0, t1, e): return [K(t0, **e), K(t1, **e)]
nun.keys = (
    hold(0.0, 1.35, THINK)                                   # تبي تصمم كرت سريع
    + hold(1.6, 2.45, WOW)                                   # بطن وظهر؟
    + hold(2.75, 4.55, UP(0.1, ew=1.1, eh=1.1))              # روح لكلود وعطه البرومت (looks at the pill)
    + hold(4.85, 7.1, LAUGH)                                 # علّق بكلمة كرت
    + hold(7.35, 8.85, UP(0.4, eh=0.9))                      # كالعادة بعد ما يخلص
    + hold(9.0, 10.55, dict(ew=1.2, eh=1.2, ly=-0.6, tipL=30, tipR=30))   # نسختين، بطن وظهر
    + hold(10.8, 12.0, UP(-0.2, tipR=44, rot=-6))            # سوّ لهم كوبي (tip raised)
    + hold(12.25, 13.2, THINK)                               # ومجرد ما تطق
    + hold(13.45, 14.2, WOW)                                 # Ctrl + V
    + hold(14.35, 15.6, UP(0.0, ew=1.15, eh=1.15))           # صار عندك تصميم الكرت
    + hold(15.85, DUR + 1, OK)                               # جاهز إنك تطبعه
)
def blink(t):
    for bt in (0.95, 4.2, 7.0, 12.0, 15.0):
        d = abs(t - bt)
        if d < 0.09: return 0.1 + 0.9 * (d / 0.09) ** 1.5
    return 1.0
NX, NY, NS = 540, 1352, 0.5
_w = wave.open("voice.wav"); _sr = _w.getframerate(); _ch = _w.getnchannels()
_a = np.frombuffer(_w.readframes(_w.getnframes()), np.int16).astype(float).reshape(-1, _ch).mean(1) / 32768
_hop = _sr // 100; _n = len(_a) // _hop
_db = 20 * np.log10(np.sqrt((_a[:_n * _hop].reshape(_n, _hop) ** 2).mean(1)) + 1e-6); _lv = np.clip((_db + 33) / 20, 0, 1)
ENV = np.zeros(_n); e = 0
for i, v in enumerate(_lv): e = e + (v - e) * (0.6 if v > e else 0.12); ENV[i] = e
def amp(t):
    i = int(t * 100); return float(ENV[i]) if 0 <= i < _n else 0.0
def draw(fr, t):
    p = dict(nun.params(min(t, DUR))); A = amp(t); A2 = amp(t - 0.05)
    p["b"] *= 1 - 0.10 * A; p["a"] *= 1 + 0.07 * A; p["rot"] += 6 * A * math.sin(t * 7.3)
    p["dy"] -= 55 * A2; p["eh"] *= 1 + 0.15 * A; p["lx"] *= 0.5
    pop = math.exp(-((t - 13.55) / 0.12) ** 2) * 40                         # little jump on Ctrl + V
    bob = 7 * math.sin(t * 2.3); intro = 1 - min(1, t / 0.25)
    layer.composite(fr, p, t, blink(t), NX, NY + bob - 22 * A - pop + p["oy"] * NS + 60 * intro ** 2, NS * (1 - 0.15 * intro ** 2),
                    glow_k=0.55 + 0.9 * A, opacity=1 - intro ** 2)
def frame(t, caps, ov):
    bgr = base.render(t, caps); fr = bgr[..., ::-1].copy()                 # RGB float
    o = cv2.imread(ov, cv2.IMREAD_UNCHANGED).astype(np.float32); oa = o[..., 3:] / 255
    draw(fr, t)
    fr = fr * (1 - oa) + o[..., 2::-1] * oa
    return np.clip(fr, 0, 255).astype(np.uint8)
if __name__ == "__main__":
    if sys.argv[1] == "test":
        for t in map(float, sys.argv[2:]):
            cv2.imwrite(f"c_{t}.png", frame(t, {}, f"o_{t}.png")[..., ::-1])
        sys.exit()
    od, out = sys.argv[2], sys.argv[3]; n = int(round(DUR * FPS)); caps = {}
    ff = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", "1080x1920", "-r", str(FPS), "-i", "-",
                           "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p", out], stdin=subprocess.PIPE)
    for i in range(n): ff.stdin.write(frame(i / FPS, caps, f"{od}/o{i:05d}.png").tobytes())
    ff.stdin.close(); sys.exit(ff.wait())
