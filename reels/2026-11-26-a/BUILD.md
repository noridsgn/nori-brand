# Reel «لا تلحق الترند بلوقوك» · built Thu 26 Nov 2026 (slot thu_a; plan.md kept)

Planned as «عفوي» (phone, no edit), but NORI could only record his voice today (26 Nov), so it became a full animation on his voice. New script written with him in chat 26 Nov (NORI kept its hook). No «ن» (used twice this week). Concrete-texture background with warm light (24 Nov realism note).

- **Video:** `reel-trend.mp4` · 1080×1920 · 30 fps · 28.89 s · −14 LUFS
- **Cover:** `cover.png` (designed separately: the flat «قارب» logo locked in gold, the gradient / 3D / glass versions behind it crossed out, «لا تلحق الترند بلوقوك»)
- **Caption:** `caption.md`
- **Status:** waiting for NORI's approval. Nothing scheduled. Not scored.
- **Review page:** https://claude.ai/artifact/WTsU7TZK1fC5TkhuMZ1UG9 (`reels/2026-11-25-a/page/index.html`, both reels)

## What he said (on-screen text follows this)
كل ما طلع ترند… قريدينت، ثري دي، زجاج… غيّر اللوقو · المشكلة إن الناس بعدها ما تعرفه · اللوقو شغلته إن الناس تحفظه · والحفظ يبيله وقت وتكرار · العب بالترند بالبوستات والإعلانات · بس اللوقو خلّه ثابت · وإذا لازم تطوّره، طوّره شوي شوي بحيث الناس تعرفه · انت غيّرت لوقوك من قبل؟ اكتب لي بالتعليقات
- ASR unsure: «بحيث» (heard «حيث»), «غيّرت لوقوك» (heard «ايرك لقود»): shown as written in the script.

## Build
Same pipeline as reels/2026-11-25-a (cut.py → asr → caps.json → build.py → render.js 28.89 s → tmix + mix.wav).
Fictional brand «قارب» (a dhow, neutral object name). Scenes: artboard window, the logo changes on each trend word (gradient, 3D, glass) and the file name grows (logo_FINAL_final.svg) → 4 versions 2021–2024 → «اللي ببالهم» vs «اللي يشوفونه» ≠, «منو هذا؟» → memory meter 0→100% + year counter + the logo on cup, bag, sign, profile → 3 trendy posts, same small logo ringed in gold → logo locked, gold glow on «ثابت» → small evolution 2021 → 2026 → 2031, green ticks «يعرفونه» → end question + button.

## v2 (26 Nov, 16:05 · NORI's notes)
- Background "doesn't move and isn't beautiful" → new animated background `tools/reel-bgfx.js`: drifting warm light pools, slow god-rays, floating gold dust + soft bokeh, a light sweep across the wall on key words, slow pan/zoom of the concrete. The whole stage is scaled to 0.8 (around 540,200) to make room for the ن.
- «ن» added: big in the centre under the content (540,1290, scale .5), body talks from his voice (`src/comp.py`, expressions timed per word, hop on «اكتب لي»). Visible from frame 0 (no fade-in).
