# Reel 2 · Mon 16 Nov 2026 · عين الزبون تقرا من وين؟

> **Posts Tue 10 Nov 2026, about 18:00 Kuwait** (one hour after the Broasted concept post; NORI, 10 Nov). The folder keeps its old date.
>
> **Predicted score: 73 / 100** (scored 10 Nov with `nori-dash/scoring/rubric.md`): hook 20/25 · watch time 21/25 · sends 13/20 · saves 12/15 · call to action 7/10. Verdict: good, light edit before scheduling. The −5 "repeated idea" deduction is NOT applied, because CONTENT-RULES lets a reel share its carousel's idea when the layout differs; with it the score would be 68.
> What lifts it most: (1) the first frame must already move at second 0 (the jumping eye path), no title card; (2) keep every pause under half a second; (3) the 1.6 number on screen in shot 4, so there is something to save.

1080×1920, ~24 s, dark NORI reel style. Same idea as Carousel E (Fri 20 Nov) but its own layout: ONE flyer in the centre the whole time, an animated eye path draws over it, then the flyer rebuilds itself into 3 levels. No before/after cards, no size ladder slide. Fictional brand «سُفرة» (home-food kitchen), colours: saffron #E9A23B, deep red #8E2C1E, cream #FBF3E4.

## Hook (0–2 s)
First frame busy: the «سُفرة» flyer where headline, photo, price-free offer line, logo and button are all the same size, tilted in 3D; a dotted eye path jumps around it randomly. First word «أول» at ~0.2 s.

## Voice-over (Kuwaiti)

| # | Target | Line |
|---|---|---|
| 1 | 0.0–2.0 s | أول شي شفته بهالإعلان… مو اللي يبيه صاحبه. |
| 2 | 2.0–5.5 s | لأن كل شي بنفس الحجم، والعين ما تعرف من وين تبدأ. |
| 3 | 5.5–9.5 s | رتّبه 3 مستويات: العنوان أكبر شي. |
| 4 | 9.5–13.0 s | بعده المنتج، أصغر: اقسم حجم العنوان على 1.6. |
| 5 | 13.0–17.0 s | والزر آخر شي، تحت على اليسار… لأن العين بالعربي تنزل لهناك. |
| 6 | 17.0–21.0 s | كبّر الأهم، وصغّر الباقي، والعين تمشي بالترتيب. |
| 7 | 21.0–24.0 s | احفظ الريل، وطبقه على تصميمك الجاي. |

## Storyboard

| Shot | Time | On screen | Motion | Gold |
|---|---|---|---|---|
| 1 | 0–2 | flat flyer + random jumping eye path | path zig-zags in 4 jumps, freeze on «صاحبه» | — |
| 2 | 2–5.5 | headline «العين ضايعة» above the flyer | path fades out on «ما تعرف» | the word «ضايعة» |
| 3 | 5.5–9.5 | headline grows ×2 inside the flyer, number «1» appears beside it | scale on «أكبر» | — |
| 4 | 9.5–13 | food photo settles at headline ÷ 1.6, «2», small «÷ 1.6» label beside it | settle on «المنتج», label on «1.6» | — |
| 5 | 13–17 | button slides to bottom-left, «3»; one clean dotted path 1→2→3 draws top-right to bottom-left | path draw timed to «تنزل» | gold spark behind the button on «لهناك» |
| 6 | 17–21 | flyer turns to face camera, «1 · 2 · 3» written aligned under it | slow push-in | — |
| 7 | 21–24 | «احفظ الريل» + NORI mark | hold | — |

## Music & sound
Calm modern beat ~100 BPM, ducked ≈ −22 dB. A soft "pop" on each number 1-2-3 (sfx/), 12–18 dB under the voice.

## Caption (one call to action)
أول شي شفته بالإعلان… مو اللي يبيه صاحبه؟

رتّب التصميم 3 مستويات:
1. العنوان أكبر شي
2. المنتج أصغر: حجم العنوان ÷ 1.6
3. الزر آخر شي، تحت على اليسار

احفظ الريل وطبقه على تصميمك الجاي.

«سُفرة» براند وهمي سويته للتوضيح.

Make one thing big. Let the eye do the rest.

#تصميم #تصميم_جرافيك #سوشال_ميديا #تسويق #انستقرام #graphicdesign #visualhierarchy

## Build (10 Nov 2026)
- NORI's voice (`src/vo.wav`, 40 s) → pauses tightened to 0.32–0.45 s → `src/voice-tight.wav` (29.3 s), `src/cut.py` holds the cut map; word times from faster-whisper (`src/words.json`).
- He followed the script; differences kept on screen as he said them: «رتّبه 3 مستويات», «… على 1.6 تقريباً», «تصميمك الياي».
- `src/reel.html` + `node render.js full 29.34` → frames; SFX: pop_soft on 1/2/3, whoosh_soft on the reorder and the outro, sparkle on «لهناك».
- Cover `cover.png` designed separately (not a frame).
- Scorer on the video: **75/100** — hook 20 · watch 21 · sends 13 · saves 13 · CTA 8. Verdict: good, small edit. Lift: cut to ~25 s.
- v2 (NORI, 10 Nov 16:03): headline and logo right-aligned; line under the product aligned with the button (left); number 1 moved off the logo.
