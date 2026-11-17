# Build notes · 17 Nov 2026 (made together: reels/2026-11-19-logo and reels/2026-11-19)

Same method as the 16 Nov reels (tools/reel-engine.js, full animation on NORI's voice, no footage): #0C0C0E + gold #E6B84C, IBM Plex Sans Arabic + Inter, captions follow what NORI actually said, cover designed separately inside the 3:4 crop.

Pipeline: `src/voice-nori.wav` (NORI's enhanced WAV) -> `python3 tools/voice-tight.py <reel dir>` (pauses capped at 0.32 s -> `voice-tight.wav`) -> `tools/asr.py` (`words.json`) -> `src/reel.html` -> `node tools/render.js reel.html <frames> <dur> 30 4 3` -> ffmpeg `tmix=frames=4,fps=30` + `mix.wav` (tools/reel-mix.py).

«لوقوك يختفي بالدائرة؟» · 31.0 s · dashboard day: Thu 19 Nov. Fictional brand «غيمة» (cloud + sun). NORI did not say «110 بكسل» in the recording, so the caption box skips it; 110 px stays as an on-screen label only. Scenes: logo shrinking -> sign / bag -> profile circle + loupe (tagline gone, name a dot) -> bigger text fails -> mark alone -> 3 versions -> one-colour toggle -> close. Script score 73 (plan.md).

Status: v1, waiting for NORI's review. Nothing scheduled in Metricool.
