# Reel «صورة الستوك تفضحك» · built Thu 26 Nov 2026 (slot wed_a, moved; plan.md kept)

NORI's voice (his own enhanced recording, `src/vo.wav`, 43.3 s), new script written with him in chat 26 Nov (hook «ابحث عن صورة بوستك بقوقل… ولا تنصدم» chosen by NORI from 3 options; the old hook «شفت هالبوست؟» was rejected as overused).
Full animation, no footage, no «ن» (the ن was already used twice this week). Realism note of 24 Nov applied: real photos (Pexels) + a concrete-texture background with warm light.

- **Video:** `reel-stock.mp4` · 1080×1920 · 30 fps · 38.08 s · −14 LUFS
- **Cover:** `cover.png` (designed separately: 3 stacked copies of the stock photo, a magnifier on the face, «منو مستخدم صورتك؟», 100% تطابق)
- **Caption:** `caption.md`
- **Status:** waiting for NORI's approval. Nothing scheduled. Not scored.
- **Review page:** https://claude.ai/artifact/WTsU7TZK1fC5TkhuMZ1UG9 (`reels/2026-11-25-a/page/index.html`, both reels)

## What he said (on-screen text follows this)
ابحث عن صورة بوستك بقوقل، ولا تنصدم لما تشوف منو مستخدمها · مطعم، وعيادة، ومكتب عقارات… كلهم حاطين نفس الريّال اللي يضحك · صورة الستوك تخلي الناس تحس إن البراند مو حقيقي · إذا لازم تستخدمها سوّ 3 أشياء · قصّها بزاوية غير عن الكل · لوّنها على ألوان البراند · حط عليها عنصر من هويتك · وأحسن من هذا كله صورة حقيقية لمحلك ومنتجك، حتى لو كان بتلفونك · انت تستخدم ستوك ولا صورة حقيقية؟ اكتب لي بالتعليقات
- Off-script vs the chat script: «وأحسن من هذا كله» (script: منها كلها), «حتى لو كان», «ولا صورة حقيقية», «اكتب لي». Captions and the button follow his words.

## Build
`src/cut.py` (pauses > 0.5 s → 0.42 s) → `voice-tight.wav` → `tools/asr.py` large-v3-turbo → `src/caps.json` (made by /home work script: phrase onsets re-anchored to silencedetect, ASR ran ~0.3 s early) → `python3 build.py` (reel.src.html + caps → reel.html) → `node tools/render.js reel.html <dir> 38.08 30 2 3` → ffmpeg tmix (2 sub-frames = motion blur) + `mix.wav` (`tools/reel-mix.py`, light sfx).
Scenes: IG post of fictional «فخّار» with the stock photo → right-click «ابحث بالصورة بقوقل» → image-search window, counter to 2,340 matches → three fictional brands (مطعم «ملح»، عيادة «لؤلؤة»، عقارات «مفتاح») with the same photo, red rings «نفس الصورة ×3» → STOCK watermark sweep + red stamp «مو حقيقي» → 3-step bar (قص / لون / هوية): crop tool, brand swatches tint, arch frame + «فخّار» bar + seal → real workshop photo next to the dimmed stock post (ستوك / حقيقية ✓) → phone camera, shutter → «ستوك ولا حقيقية؟» + button.
Cover: `src/cover.html` (rendered with Chrome, 1080×1920, content inside the 3:4 crop).
