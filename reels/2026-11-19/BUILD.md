# Build notes · 17 Nov 2026 (made together: reels/2026-11-19-logo and reels/2026-11-19)

Same method as the 16 Nov reels (tools/reel-engine.js, full animation on NORI's voice, no footage): #0C0C0E + gold #E6B84C, IBM Plex Sans Arabic + Inter, captions follow what NORI actually said, cover designed separately inside the 3:4 crop.

Pipeline: `src/voice-nori.wav` (NORI's enhanced WAV) -> `python3 tools/voice-tight.py <reel dir>` (pauses capped at 0.32 s -> `voice-tight.wav`) -> `tools/asr.py` (`words.json`) -> `src/reel.html` -> `node tools/render.js reel.html <frames> <dur> 30 4 3` -> ffmpeg `tmix=frames=4,fps=30` + `mix.wav` (tools/reel-mix.py).

«الفراغ يبيع» · 30.9 s · dashboard day: Fri 20 Nov (this folder keeps its old date name). The fictional brand is now «خلية» (honey), not the name in plan.md: NORI's rule (11 + 17 Nov) bans girls' names. One crowded flyer is cleaned in front of the viewer: margins (50) -> grouping -> product takes a third -> before/after. Script score with nori-dash/scoring/rubric.md: 73 (hook 20, watch 19, sends 14, value 13, CTA 7).

Status: v1, waiting for NORI's review. Nothing scheduled in Metricool.
