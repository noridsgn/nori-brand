# Build notes · 16 Nov 2026 (both reels of the day: this one and reels/2026-11-15-cover)

NORI asked for full animation (no phone footage) in the Adobe-AI reel method but stronger, "world-class, competing with After Effects", using a reference he liked (a SaaS motion reel: a cursor drives the story, menus and cards spring in, marquee selection, camera zooms like a pro screen recording). We took the motion, not the look: stays on #0C0C0E + gold #E6B84C, IBM Plex Sans Arabic + Inter, full 1080x1920.

Moves he asked for by name and where they are:
- Whip pan: scene changes (`G(...,'whipL'|'whipR'|'whipU')` in tools/reel-engine.js) with skew + stretch (warp).
- Smear / motion blur: real, from 4 sub-frames per frame blended (tools/render.js + ffmpeg tmix) plus a speed-based blur (`smear`).
- Match cut: one hero object lives across scenes (the card: stack -> file thumbnail -> Photoshop canvas -> send; the cover: big -> grid tile -> editor -> grid).
- Graph curves / easy ease: `ee` (quint S-curve), `ein`/`eout` speed ramps, `back` overshoot.

Pipeline: voice (NORI's Adobe-enhanced WAV, `voice-nori.wav`) -> pauses tightened (`voice-tight.wav`) -> tools/asr.py word times (`words.json`) -> `reel.html` (frame(t)) -> `node tools/render.js reel.html <frames> <dur> 30 4 3` -> ffmpeg tmix=4 -> mp4 with `mix.wav` (tools/reel-mix.py: voice + light sfx). Captions follow what NORI actually said (he added «فيه فرق بين الـ RGB والـ CMYK»).
Cover is designed separately (`src/cover.html` -> `cover.png`), text inside the 3:4 crop.
Not scored with the rubric yet (nori-dash not attached to this session). Status: v1, waiting for NORI's review. Nothing scheduled in Metricool.
