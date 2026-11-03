# ريلز العملة — جمعية مشرف (3 Nov 2026)

تكمّل ستوري التحميس «concept one soon…»: العملة الغامقة تنط، سلو موشن مع بريق على الحافة، الظل يروح والرمز ياخذ ألوانه (درع ذهبي وصناديق بيضاء)، وبعدين «جمعية مشرف التعاونية» + concept 01 + «مفهوم غير رسمي».

- `src/reel.html`: مشهد three.js (عملة ثلاثية الأبعاد والرمز مبثوق من SVG)، و`frame(t)` يحدد كل لقطة.
- التصوير: `python3 -m http.server 8765` بعدين `node shoot.js full 8` (30fps).
- الصوت `src/sfx-mix.wav` من مكتبة `sfx/`: whoosh_fast_10 (0.48s)، air_swell (1.15s)، sparkle مع صدى (1.35s)، riser_soft (3.32s)، low_thud (4.43s)، soft_chime (4.48s)، sparkle (4.56s)، whoosh_soft_01 (4.95s).
- `ffmpeg -framerate 30 -i frames/f%05d.jpg -i sfx-mix.wav -c:v libx264 -preset veryfast -crf 17 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest mishref-reel.mp4`
