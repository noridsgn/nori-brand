# Reel · Wed 11 Nov 2026 · من كلود لفيجما (واجهة تطبيق بـ 3 خطوات)

NORI filmed this himself on his phone (7 clips of his monitor, his own words, no script from us) and asked for a simple edit, clean voice, cover and caption. Second video of the day.

- **Video:** `reel-claude-figma.mp4` · 1080×1920 · 30 fps · 43.4 s · −14 LUFS
- **Cover:** `cover.png` (designed separately in `src/cover.html`; safe inside the 3:4 profile crop)
- **Preview page:** https://claude.ai/artifact/My1JbcKfipo645LhrBb5nS
- **Status:** NORI posts it manually on Wed 11 Nov (dashboard note c907). He fixes the voice himself in Adobe Podcast; he got the raw voice cut to the reel timing as MP3. Never schedule it in Metricool. Not scored yet.

## What he says (on-screen text follows this, as recorded)

| Clip | Line |
|---|---|
| IMG_2322 | يلا خل نسوي تطبيق مشرف |
| IMG_2317 | أول شي نروح لكلود ونعطيه هذا البرومت. علّقوا كلمة «برومت» ويوصلك بالدايركت |
| IMG_2320 | للمعلومة، راح أستعمل Sonnet 5.5 في حال إنه ما كنت مشترك |
| IMG_2323 | طبعاً بعد ما يخلّص يعطيك النسخة SVG. هذي النسخة نسوي لها كوبي ونروح للخطوة اللي بعدها |
| IMG_2326 | وبعدها نروح لفيجما ونعطيه Ctrl + V. راح يلصق لنا الـ SVG اللي خذيناه من كلود |
| IMG_2327 | طبعاً من خلال فيجما تقدر تعدّل على أي تعديل انت تبي، سواء كان مثلاً هالمربع انت مو عاجبك لونه، أو الأيقونات هذي تبي تغيّرها، أو الاسم. وهذا فقط عرض مبدئي للتطبيق |
| IMG_2328 | علّقوا كلمة «برومت» ويوصلك البرومت مع الدليل كامل |

## Edit

- Dark NORI frame: the footage sits in a sharp-cornered card over a blurred, darkened copy of itself; slow push-in on the part of the screen he is talking about; hard cuts.
- Top: `CLAUDE → FIGMA`, step title (1 · البرومت / 2 · انسخ الـ SVG / 3 · الصقه بفيجما / وعدّل براحتك / تبي البرومت؟) and a 3-part progress bar.
- Bottom: one caption line at a time, words light up as he says them, the key word in gold. NORI mark bottom centre.
- Pauses over ~0.4 s trimmed (`src/timeline.py`), 51 s raw → 43.4 s.
- The Instagram comments beside the post in the first clip are cropped out.

## Sound

- iPhone HDR clips (HLG) tone-mapped to SDR.
- Voice: stereo track → DeepFilterNet 0.5.6 (`deep-filter`) → EQ/de-ess/compressor → each clip levelled to −16 LUFS → `src/voice-clean.wav`.
- **Adobe Podcast was asked for but not used:** it needs a signed-in browser and none was connected (NORI was on his phone).
- SFX from `sfx/` (whoosh_soft on step changes, pop_soft on «برومت», soft_chime at the end), about 14–16 dB under the voice (`src/mix.sh`). No music.

## Caption

يلا خل نسوي واجهة تطبيق… بدون ما نرسم ولا شي؟

3 خطوات:
1. عط كلود البرومت
2. انسخ نسخة الـ SVG اللي يطلعها لك
3. الصقها بفيجما (Ctrl + V) وعدّل براحتك: الألوان، الأيقونات، الأسماء

هذا عرض مبدئي للتطبيق، مو تطبيق شغّال… بس يختصر عليك وايد.

علّق بكلمة «برومت» ويوصلك البرومت مع الدليل كامل.

تطبيق «مشرف» مفهوم غير رسمي من تصميمي.

From Claude to Figma in 3 steps.

#تصميم #تصميم_واجهات #فيجما #ذكاء_اصطناعي #مصمم_جرافيك #figma #uidesign #claude

## Before posting

- ManyChat only answers «مشروع» today: add the keyword «برومت» and have the prompt + guide ready, or commenters get nothing.

## Rebuild

`src/`: `timeline.py` (cut list + voice) → `captions.py` (words from `asr.json` → `data.js`) → `shoot.py all <dir>` (transparent overlay frames from `reel.html`) → `mix.sh` → `base.py all | ffmpeg` (card + background, overlay, audio). The raw clips (IMG_2317…2328, 830 MB) are not in the repo; `base.py` reads tone-mapped copies from a local `mez/` folder.
