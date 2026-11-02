# Reel A build (2 Nov 2026)

- `voice-raw.m4a` – NORI's recording. `voice-clean.wav` – cleaned (high/low-pass, FFT denoise, EQ −2.5 dB @250 Hz / +3 dB @3.5 kHz, compressor, loudnorm −16 LUFS) and tightened (pauses between lines → 0.5 s, inside lines → ≤0.3 s).
- `speech.json` – speech intervals from silencedetect (−35 dB, 0.25 s) on the raw file; `segs.json` – their start/end in the tightened audio (animation cues).
- `reel.html` – the animation; `frame(t)` sets the state for time t. `node render.js full 36.05` renders frames, then:
  `ffmpeg -framerate 30 -i frames/f%05d.jpg -i voice-clean.wav -c:v libx264 -preset veryfast -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest reel-A.mp4`
- No speech-to-text in the sandbox: lines were matched to the 7 script lines by pause length (gaps > 1.5 s = new line).

## v2 (approved direction)
v1 (rejected-v1/) was rejected by NORI: flat black, gold underline that jumped around, text popping randomly. v2 follows the 27 Oct reel (`reels/2026-10-27-reference.mp4`): blurred dark poster wall in perspective, small letter-spaced English label on top, centered headline with the key word in gold, words fade in with blur, 3D-tilted mockups floating in the centre, gold sparks at key moments, NORI mark at the bottom centre.

## v3 (NORI's notes on v2)
- Gold sparks render BEHIND the objects (sparks layer sits under the stages).
- Bio scene: the messy bio blurs out and the right bio is written line by line, each line with its label aligned on the right: «شنو تبيع؟», «وين؟», «شلون يطلب؟» (no floating chips).
- Voice was muffled: new chain in `voice-process.sh` (high-pass 110 Hz, light denoise, −5 dB @220 Hz, +4 dB @2.8 kHz and 5 kHz, treble shelf +5 dB @7 kHz, exciter, de-esser, compressor, loudnorm −15 LUFS).
