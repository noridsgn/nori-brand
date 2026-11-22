# Reel «كبّر اللوقو» · 22 Nov 2026

Idea (NORI, replaced the marketing idea «لا تبدي الريل بلوقوك» in reels/2026-11-22-a, which he said is marketing, not design): the client asks "كبّر اللوقو", and why a big logo breaks the ad. Style (his choice, tappable): full animation + the «ن» mascot together (characters/nun), no footage.

- Voice: `src/vo.wav` (NORI, enhanced, 49.7 s, clean, no music) → `cut.py` (pauses > 0.5 s → 0.42 s) → `voice-tight.wav` (40.07 s) → `tools/asr.py` large-v3-turbo. ASR times ran ~0.1–0.5 s early, so caption times were re-anchored to the speech onsets from `silencedetect` per phrase.
- Fictional brand «حبّة COFFEE» (a coffee bean, neutral object name), labelled «براند وهمي» in the caption. Big-logo version is ~2.6× (realistic, not a cartoon).
- Scenes: client chat «كبّر اللوقو شوي 🙏» → free-transform drag, logo grows, everything shrinks → red marks on the offer and the product → an eye wandering with «؟» → logo dimmed, gold frame «الرسالة» → a paper whose signature turns into the logo stamp → clean poster with clear-space box, size bracket and 3 aligned ticks (مكان ثابت / مساحة نظيفة / حجم واضح) → client insists «لا… كبّره 😅» → A/B side by side, cursor picks B (green) → end question.
- `reel.html` → `node tools/render.js reel.html <dir> 40.07 30 2 2` → `src/comp.py` puts the ن on top (big, centre, body talks from the voice envelope; expressions timed per word) → `mix.wav` (`tools/reel-mix.py`, light sfx).
- Captions follow what NORI said. He ended on «وانت شرايك؟ تحس اللوقو لازم يتكبّر؟» without «اكتبها بالتعليقات», so the button is an icon only (same as the WOW reel).
- Words to confirm with NORI: «الإعلان عن الرسالة الموجودة», «بس مو مسيطر يعني».
- Cover: `src/cover.html` + ن (shocked, looking at the big-logo poster) → `cover.png`, designed separately, text inside the 3:4 crop.

Review page: https://claude.ai/artifact/7NWr9bWF22mFvHLd68qfPQ (`page/index.html`).

Status: approved by NORI (22 Nov 15:45). Scheduled on Metricool 437532063, Sun 22 Nov 18:30 Kuwait, auto-publish, custom cover. Not scored (rubric not reachable this run).
