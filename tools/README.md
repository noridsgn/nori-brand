# Tools

## asr.py — word-level timestamps for NORI's voice-overs
`pip install --break-system-packages faster-whisper` then `python3 tools/asr.py voice-clean.wav` → `voice-clean.wav.words.json` (every word with start/end seconds). Model: Whisper large-v3-turbo (int8, CPU, ~30 s for a 36 s reel). Needs NORI's allowed domains: pypi.org, files.pythonhosted.org, huggingface.co, *.hf.co.
Spelling of Kuwaiti words can be off (e.g. «ناكسة» for «ناقصة»), timings are what matter. Run it on the CLEANED, tightened audio so times match the video. Sync gold words / transitions to these times, not to silences.
