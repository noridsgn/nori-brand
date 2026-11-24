# Reel «دلّة» · 24 Nov 2026

The analyst's suggestion (a short reel the same day as the concept, showing the logo on the cup). NORI chose it (tappable) on 24 Nov.
No voice, no footage: full animation, 12.4 s, light sfx only.
Scenes: 3 look-alike brown badges («كل قهوة عربية… نفس الدلّة») → dallah line drawing, the body fades and the saffron spout turns into the «د» tile → the cup whips in, the tile flies onto the sleeve and stamps → pull out to the line-up (bag, cups, thermos) «رمز واحد… بكل مكان» → end: profile circle, «دلّة», «براند وهمي», «الكونسبت كامل بالبوست», @nori.dsgn.
Build: `cd src && node build.js` → `node ../../../tools/render.js reel.html /tmp/dfr 12.4 30 2 4` → ffmpeg (tmix motion blur) + sfx mix `src/mix.wav`.
Shapes are reused from `posts/_generator/concept-dalla-v2.js`, so the reel matches the carousel.
Cover: `src/cover.html` → `cover.png`, designed separately (not a frame), content inside the 3:4 crop.
Status: waiting for NORI's approval. Not on Metricool.
