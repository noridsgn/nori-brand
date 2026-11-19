# Reel «بوث ولا قطعة من لندن؟» · 19 Nov 2026

Idea (NORI): the WOW cookies booth is built as a red London telephone box. Lesson: brand honesty, every detail (shape, words, logo) tells the same story. First reel with the «ن» character (characters/nun) timed to NORI's voice.

- Voice: `src/vo.wav` (NORI, Adobe-enhanced, 62 s) → `cut.py` (pauses > 0.5 s → 0.42 s) → `voice-tight.wav` (43.07 s) → `tools/asr.py` large-v3-turbo → `voice-tight.wav.words.json`.
- Photos: NORI's own (`booth-wide.jpg`, `booth-close.jpg`). No logo was redrawn; WOW appears as text only.
- `reel.html` (frame(t), tools/reel-engine.js) → `node tools/render.js reel.html <dir> 43.07 30 2 2` → `comp.py` puts the ن on top (characters/nun/src/layer.py) in 2 parts → concat + `mix.wav` (tools/reel-mix.py, light sfx).
- Captions follow what NORI said (he said «أول شي / ثنين / ثلاثة», «صج البراند», ended on «وبراندك؟ عنده قصة؟» without «اكتبها بالتعليقات», so the button is an icon only).
- Unsure words (check with NORI): «قاعدين يقولون لك إياها», «لما يقول لك القصة وتفهم كل شي».
- Cover: `src/cover.html` + ن → `cover.png` (designed separately, text inside the 3:4 crop).
Status: v1 waiting for NORI's review. Not scored, nothing scheduled.

## v2 (19 Nov, NORI's note: "the ن doesn't feel like it's the one talking")
Reference he sent: a character big in the middle with the content above it, its body moving with every syllable. Choice (tappable): body only, no mouth, and the ن big in the centre.
- Layout: photo card scaled to 0.65 at the top, the ن centred (540, 1250, scale 0.58) the whole reel, captions moved under it (top 1462), sticker/tags moved inside the card, NORI mark top-left.
- Talking: `comp.py` reads `voice-tight.wav` as a 100 Hz loudness envelope (fast attack, soft release) and drives squash/stretch, tilt, a hop, eye size, the dot (a beat later) and the glow from NORI's voice. Expressions from v1 stay on top.
- Output: `reel-wow-v2.mp4` (v1 kept as `reel-wow.mp4`).
