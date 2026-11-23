# Reel «كرت بزنس: من كلود لفيجما» · Mon 23 Nov 2026 (Figma reel, slot mon_b)

NORI filmed 4 clips of his monitor with his own voice (no script): the finished card in Figma (hook) → the prompt pasted in Claude → Claude's front/back SVG result → Ctrl + V in Figma. Claude wrote the build prompt (23 Nov rule). Edit: "our way" for fast Claude→Figma reels (word-synced caption + small labels, no motion graphics, no blurred screen) **plus the «ن» mascot** big under the card, its body talking from NORI's voice (first Figma reel with the ن, his request).

- **Video:** `reel-kart.mp4` · 1080×1920 · 30 fps · 17.85 s · −14 LUFS
- **Cover:** `cover.png` (designed separately: the two card faces drawn in `src/cover.html`, not a frame from the reel; text inside the 3:4 crop; ن happy, looking up at the cards)
- **Caption:** `caption.md`
- **Review page:** https://claude.ai/artifact/WRwiuF9zV2sKBms1CwhgYB (`page/index.html`)
- **Status:** **posted manually by NORI on Mon 23 Nov 2026** (his words: «انا بنشره يدوي»). Never schedule it in Metricool. Link + numbers on the next pull. Not scored.

## What he says (on-screen text follows this)
| Clip | Line |
|---|---|
| IMG_2527 | تبي تصمم كرت سريع، بطن وظهر؟ |
| IMG_2528 | روح لكلود وعطه البرومت. علّق بكلمة «كرت» عشان يوصلك البرومت |
| IMG_2529 | كالعادة بعد ما يخلص يعطيك نسختين، بطن وظهر. سوّ لهم كوبي ثنينهم |
| IMG_2531 | ومجرد ما تطق Ctrl + V، صار عندك تصميم الكرت جاهز إنك تطبعه |

Words to confirm with NORI (ASR unsure): «تطق» (could be «تضغط»), «ثنينهم».

## Edit
- Clips are iPhone HLG ProRes; converted without tone-mapping (`/home/claude/w/mez`, naive BT.709 + light eq): proper HLG→SDR tone-mapping made the wood red/washed. Mezzanines not in the repo (raw clips 760 MB).
- `src/timeline.py`: cut list (pauses > ~0.45 s trimmed, 28 s raw → 17.85 s) → `voice-raw.wav` → `voice.wav` (highpass, afftdn, light EQ/compression, loudnorm).
- `tools/asr.py` large-v3-turbo → `voice.wav.words.json`; caption times re-anchored to the speech onsets (`src/data.py`).
- Layout: footage card 820×810 at the top (slow push-in per clip, sharp, no blurred copy), pill on the card's bottom edge (Claude + البرومت / علّق: كرت / بطن + ظهر / Copy SVG ×2 / Ctrl + V keycaps / 85 × 55 mm ✓ جاهز للطباعة), ن centred (540, 1352, scale 0.5), caption box under it (top 1530), NORI mark top-left, «CLAUDE → FIGMA» label.
- ن (`src/comp.py`): body/eyes/dot from the voice envelope; expressions per phrase: thinks on the question, shocked on «بطن وظهر», looks up at the pills, laughs on «علّق», jumps on Ctrl + V, green «تمام» on «جاهز».
- Sound: `src/mix.wav` via `tools/reel-mix.py` (pop on pills, soft whoosh on cuts, key clicks on Ctrl + V, soft chime on «جاهز»). No music.
- Rebuild: `python3 timeline.py && python3 data.py` → `python3 shoot.py all <ov>` → `python3 comp.py all <ov> v.mp4` → mux with `mix.wav`. Cover: render `cover.html` → `cover_bg.png` → `python3 cover.py`.

## Before / after posting
- ManyChat must answer the keyword «كرت» with the prompt (+ guide), or commenters get nothing.
