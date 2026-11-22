# Put the «ن» on top of the rendered HTML frames, timed to NORI's voice (tight audio times).
# python3 comp.py <frames dir> <sub> <out.mp4> [part k of n]   |   python3 comp.py test t1 t2 ...
import sys, os, math, subprocess, numpy as np
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "../../../characters/nun/src"))
sys.argv_saved = sys.argv; sys.argv = sys.argv[:1]
import nun, layer
from nun import K, GOLD, RED, GREEN
sys.argv = sys.argv_saved
FPS, DUR = 30, 40.07

H0 = dict()                                  # هادي
THINK = dict(lx=0.5, ly=-0.9, eh=0.75, tipR=40, rot=-5, orbit=1, label="تفكّر")
WOW = dict(a=0.9, b=1.12, tipL=40, tipR=40, ew=1.45, eh=1.45, dy=-120, ds=1.15, oy=-30, label="تنصدم")
LAUGH = dict(a=1.08, b=0.92, cres=1, bounce=1, tipL=24, tipR=24, label="تضحك")
WARN = dict(anger=1, tint=RED, tipL=2, tipR=2, ly=0.2, eh=0.9, alarm=1, shake=1, label="تحذّر")
OK = dict(tint=GREEN, cres=1, tipL=48, tipR=48, ds=1.3, dy=-30, label="تمام")
def hold(t0, t1, e): return [K(t0, **e), K(t1, **e)]
look = lambda lx, ly, **k: dict(lx=lx, ly=ly, **k)
nun.keys = (
    hold(0.0, 1.7, look(0.7, -0.6))                                   # looks up at the client typing
    + hold(1.95, 2.85, THINK)                                         # «كبّر اللوقو»… here we go
    + hold(3.05, 3.9, look(-0.2, -0.9))                               # watches the logo grow
    + hold(4.2, 5.55, WOW)                                            # «يصغر»
    + hold(5.85, 8.25, WARN)                                          # العرض يضيع / المنتج يصغر
    + [K(8.5, lx=-0.1, ly=-0.95), K(8.95, lx=0.3, ly=-0.5), K(9.4, lx=0.6, ly=-0.9), K(9.85, lx=-0.8, ly=-0.6), K(10.3, lx=-0.1, ly=-0.95), K(10.8, lx=0.3, ly=-0.5)]
    + hold(11.1, 12.7, THINK)
    + hold(13.0, 14.85, OK)                                           # «الرسالة»
    + hold(15.2, 16.4, look(0.0, -0.95))
    + hold(16.6, 18.6, dict(lx=0.3, ly=-0.9, eh=0.85, tipR=44, rot=-6))  # reads the signature
    + hold(18.85, 20.9, OK)                                           # «هذا منّي»
    + hold(21.15, 27.8, dict(OK, lx=0.2, ly=-0.6))                    # the three ticks
    + hold(28.05, 29.4, THINK)                                        # «العميل أصر»
    + [K(29.75, lx=-0.7, ly=-0.7), K(30.6, lx=-0.7, ly=-0.7), K(31.0, lx=0.7, ly=-0.7), K(31.9, lx=0.7, ly=-0.7), K(32.3, lx=-0.6, ly=-0.7), K(32.9, lx=0.6, ly=-0.7)]
    + hold(33.2, 34.9, LAUGH)                                         # «يختار الأنظف»
    + hold(35.4, 36.5, look(0, -0.4))
    + hold(36.7, DUR + 1, THINK)                                      # «تحس اللوقو لازم يتكبّر؟»
)
def blink(t):
    for bt in (1.0, 6.9, 11.0, 15.0, 20.95, 24.4, 29.5, 35.2, 38.6):
        d = abs(t - bt)
        if d < 0.09: return 0.1 + 0.9 * (d / 0.09) ** 1.5
    return 1.0
# position: [t, cx, cy, scale]
POS = [[0, -300, 1250, .58], [0.25, -300, 1250, .58], [1.1, 540, 1250, .58], [35.2, 540, 1250, .58], [35.8, 540, 1230, .64], [DUR + 1, 540, 1230, .64]]
def ee(x): x = min(max(x, 0), 1); return 16 * x ** 5 if x < .5 else 1 - (-2 * x + 2) ** 5 / 2
def pos(t):
    for a, b in zip(POS[:-1], POS[1:]):
        if a[0] <= t <= b[0]:
            x = ee((t - a[0]) / (b[0] - a[0])); return [a[i] + (b[i] - a[i]) * x for i in (1, 2, 3)]
    return POS[-1][1:]
# NORI's voice drives the body (he talks through the ن): 100 Hz envelope, fast attack / soft release
import wave
_w = wave.open(os.path.join(HERE, "voice-tight.wav")); _sr = _w.getframerate(); _ch = _w.getnchannels()
_a = np.frombuffer(_w.readframes(_w.getnframes()), np.int16).astype(float).reshape(-1, _ch).mean(1) / 32768
_hop = _sr // 100; _n = len(_a) // _hop
_rms = np.sqrt((_a[:_n * _hop].reshape(_n, _hop) ** 2).mean(1))
_db = 20 * np.log10(_rms + 1e-6); _lv = np.clip((_db + 31) / 19, 0, 1)
ENV = np.zeros(_n); e = 0
for i, v in enumerate(_lv):
    e = e + (v - e) * (0.6 if v > e else 0.12); ENV[i] = e
def amp(t):
    i = int(t * 100); return float(ENV[i]) if 0 <= i < _n else 0.0
def draw(fr, t):
    p = dict(nun.params(min(t, DUR))); cx, cy, sc = pos(t)
    A = amp(t); A2 = amp(t - 0.05)                       # A2: the dot follows a beat later
    p["b"] *= 1 - 0.10 * A; p["a"] *= 1 + 0.07 * A
    p["rot"] += 6 * A * math.sin(t * 7.3)
    p["dy"] -= 55 * A2; p["eh"] *= 1 + 0.15 * A; p["lx"] *= 0.4
    cy -= 22 * A
    hop = abs(math.sin(t * 9)) * 26 if 0.25 < t < 1.05 else 0                     # little hops while walking in
    hop += abs(math.sin((t - 35.2) * 7)) * 30 if 35.2 < t < 35.8 else 0
    bob = 7 * math.sin(t * 2.3)
    shake = 6 * math.sin(t * 70) if 5.9 < t < 6.5 or 7.1 < t < 7.6 else 0
    layer.composite(fr, p, t, blink(t), cx + shake, cy + bob - hop + p["oy"] * sc, sc, glow_k=0.55 + 0.9 * A,
                    opacity=1 - min(1, max(0, (t - (DUR - .45)) / .45)))
def load(d, i, sub):
    a = [np.asarray(Image.open(f"{d}/f{i * sub + k:06d}.jpg"), float) for k in range(sub)]
    return sum(a) / sub
if __name__ == "__main__":
    if sys.argv[1] == "test":
        for t in map(float, sys.argv[2:]):
            fr = np.asarray(Image.open(os.path.join(HERE, f"t_{t}.png")).convert("RGB"), float); draw(fr, t)
            Image.fromarray(np.clip(fr, 0, 255).astype(np.uint8)).save(os.path.join(HERE, f"c_{t}.png"))
        sys.exit()
    d, sub, out = sys.argv[1], int(sys.argv[2]), sys.argv[3]
    k, n = (int(sys.argv[4]), int(sys.argv[5])) if len(sys.argv) > 5 else (0, 1)
    N = int(math.ceil(DUR * FPS)); lo, hi = N * k // n, N * (k + 1) // n
    ff = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", "1080x1920", "-r", str(FPS), "-i", "-",
                           "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p", out], stdin=subprocess.PIPE)
    for i in range(lo, hi):
        fr = load(d, i, sub); t = i / FPS
        if t > 0.2: draw(fr, t)
        ff.stdin.write(np.clip(fr, 0, 255).astype(np.uint8).tobytes())
    ff.stdin.close(); sys.exit(ff.wait())
