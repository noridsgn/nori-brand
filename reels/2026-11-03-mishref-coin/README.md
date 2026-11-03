# ريلز العملة — جمعية مشرف (3 Nov 2026)

تكمّل ستوري التحميس «concept one soon…»: العملة الغامقة تنط، سلو موشن مع بريق على الحافة، الظل يروح والرمز ياخذ ألوانه (درع ذهبي وصناديق بيضاء)، وبعدين «جمعية مشرف التعاونية» + concept 01 + «مفهوم غير رسمي».

- `src/reel.html`: مشهد three.js (عملة ثلاثية الأبعاد والرمز مبثوق من SVG)، و`frame(t)` يحدد كل لقطة.
- التصوير: `python3 -m http.server 8765` بعدين `node shoot.js full 8` (30fps).
- الصوت `src/sfx-mix.wav` من مكتبة `sfx/`: whoosh_fast_10 (0.48s)، air_swell (1.15s)، sparkle مع صدى (1.35s)، riser_soft (3.32s)، low_thud (4.43s)، soft_chime (4.48s)، sparkle (4.56s)، whoosh_soft_01 (4.95s).
- `ffmpeg -framerate 30 -i frames/f%05d.jpg -i sfx-mix.wav -c:v libx264 -preset veryfast -crf 17 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest mishref-reel.mp4`

## v2 (approved, 3 Nov 2026 — NORI posted it himself)
v1 rejected: coin looked cartoonish, and the ending reused the teaser's text. v2 follows his references (radial coin ring, real coin-flip close-up, realistic gold coin):
5 shots, 10 s: teaser → low-angle flip with motion blur → macro on the edge (brushed metal, gold shield, silver blocks) → top-down split into 8 coins rotating slowly while colours reveal → coins converge behind the main coin + new title text (Tajawal: «جمعية مشرف التعاونية», CONCEPT 01, «مفهوم غير رسمي»).
Tech: three.js with a softbox studio PMREM, procedural brushed/roughness maps, BokehPass DOF, UnrealBloom, film grain, motion blur via sub-frame accumulation. `v2-src/shoot2.js full 10 [from] [to]`; sound `v2-src/sfx-mix2.wav`.
Lessons: mirror metal facing the camera reflects darkness or blows out — keep roughness ≈0.25 and tilt the final coin a little; no point-light glint in the end shot.
