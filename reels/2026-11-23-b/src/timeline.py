# Cut list (source seconds per clip) -> timeline.json + voice-raw.wav (tight) + voice.wav (cleaned)
import json, subprocess
U = "/mnt/user-data/uploads/IMG_%s.mov"
CUTS = [("2527_3", 0.85, 3.40),
        ("2528_2", 0.40, 5.00),
        ("2529_3", 0.30, 2.70), ("2529_3", 3.00, 4.05), ("2529_3", 4.50, 5.95),
        ("2531_3", 0.85, 5.25), ("2531_3", 5.60, 7.00)]
segs = []; t = 0
for c, a, b in CUTS:
    segs.append(dict(clip=c, a=a, b=b, t0=round(t, 3))); t += b - a
dur = round(t, 3)
json.dump(dict(segs=segs, dur=dur), open("timeline.json", "w"), indent=1)
ins, fl = [], ""
for i, (c, a, b) in enumerate(CUTS):
    ins += ["-i", U % c]
    fl += f"[{i}:a:0]atrim={a}:{b},asetpts=PTS-STARTPTS,aformat=sample_rates=48000:channel_layouts=mono,afade=t=in:d=0.015,afade=t=out:st={b-a-0.02}:d=0.02[s{i}];"
fl += "".join(f"[s{i}]" for i in range(len(CUTS))) + f"concat=n={len(CUTS)}:v=0:a=1[o]"
subprocess.run(["ffmpeg", "-v", "error", "-y"] + ins + ["-filter_complex", fl, "-map", "[o]", "-c:a", "pcm_s16le", "voice-raw.wav"], check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "voice-raw.wav", "-af",
  "highpass=f=80,afftdn=nr=14:nf=-42:tn=1,equalizer=f=3200:t=q:w=1.2:g=2,acompressor=threshold=-22dB:ratio=3:attack=8:release=120,loudnorm=I=-15:TP=-1.5:LRA=9",
  "-ar", "48000", "-c:a", "pcm_s16le", "voice.wav"], check=True)
print("dur", dur)
