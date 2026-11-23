# Reel «الكلام فوق الصورة ما ينقرا» · Mon 23 Nov 2026 (voice reel, slot mon_a, plan-v2.md)

NORI's voice (Adobe Podcast enhanced, `src/vo.wav`, 42.2 s) → full animation, no footage, with the «ن» mascot talking from his voice (his request: «بـ ن التفاعلي و نفس طريقتنا المعتادة»).

- **Video:** `reel-text-photo.mp4` · 1080×1920 · 30 fps · 28.68 s · −14 LUFS
- **Cover:** `cover.png` (designed separately: the poster split in half, قبل lost / بعد fixed, «ما ينقرا؟», ن under it, all inside the 3:4 crop)
- **Caption:** `caption.md`
- **Status:** Metricool draft for Mon 23 Nov 18:00 Kuwait, waiting for NORI's approval. Not scored.

## What he said (on-screen text follows this)
شوف البوستر… الكلام موجود، بس محد قراه · الصورة زحمة، والكلام ضاع فيها · أول حل: دوّر مكان هادي بالصورة، وحط الكلام فيه · ثاني حل: تدرج غامق تحت الكلام، يطلع من تحت لفوق · ثالث حل: ضبّب الصورة ورا الكلام بس، مو كلها · وستروك حول الحروف؟ لا، يبين قديم · انت شنو تستخدم؟ اكتب لي بالتعليقات
- He said «اكتب لي بالتعليقات» (not «اكتبها»), so the button says that.
- ASR unsure: «شوف البوستر» (maybe «هالبوستر»); the third «حل» (ASR first heard «ثاني حل» twice; a clip check gave «ثالث»): shown as «ثالث حل».

## Build
- `cut.py`: pauses > 0.5 s → 0.42 s (the 6.9 s gap before «وستروك» removed) → `voice-tight.wav` → `tools/asr.py` large-v3-turbo → `voice-tight.wav.words.json`.
- Photo: `street.jpg` = «Market Street East» (Wikimedia Commons, CC0, see `src/CREDITS.txt`); fictional brand «فنار».
- `reel.html` (frame(t)) → `node tools/render.js reel.html <dir> 28.68 30 2 2` → `comp.py <dir> 2 out.mp4 k 2` (ن at 540,1290 scale .5; body from the voice envelope; expressions: تحذّر on «محد قراه» and «لا», تنصدم on «زحمة», تفكّر on each «حل», تمام on each fix, تضحك on «مو كلها», «يبين قديم» and the ending) → concat + `mix.wav`.
- Sound: `tools/reel-mix.py` (error on the red frame and «لا», pop on «زحمة», whoosh + tick on each «حل», chime on each fix, click on the button). No music.
- Cover: render `cover.html` → `cover_bg.png` → `python3 cover.py`.
