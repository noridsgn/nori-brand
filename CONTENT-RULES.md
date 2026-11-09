# @nori.dsgn — weekly content rules

Read this, `README.md` and `BRAND.md` before designing anything.

## NORI's rules (6 Nov 2026 meeting) — newest, override everything below where they conflict

A. **Educational shift (Kuwait Decree Law 10/2026 on digital commerce).** Until 31 Jan 2027 the account leans **educational** (about 70% teaching / 30% his work), not the old 70/30 marketing split. From **1 Feb 2027** it is **100% educational** until NORI has an official licence: no selling, no prices, no «أرسل لي … بالدايركت» offers, no service pitches. Showing his concept work as a lesson is fine. NORI still takes client work privately until February (his decision); never advertise it publicly.
B. **Friday and Saturday carousels are 100% educational**, even before February: the last slide asks to save/follow/comment, never a DM offer.
C. **Light weekly plan (start 8 Nov 2026):** Sun reel, Mon reel, Tue concept, Wed reel, Thu reel, Fri carousel, Sat carousel (see Schedule). Move to the full plan (Sun 1 reel, Mon 2 reels, Tue concept, Wed 2 reels, Thu 1 reel, Fri + Sat carousels) only after the scorer's reel scores are 70+ two weeks in a row, and only when NORI says go.
D. **Every reel is scored** with noridsgn/nori-dash scoring/rubric.md before recording (script) and before Metricool (video). Under 70 goes back to the writer/designer.
E. **Spontaneity is allowed.** At most one reel a week may be a «عفوي» reel: NORI films it on his phone, no edit, no on-screen text. The writer gives him only a hook line and 3 talking points.
F. **The Mishref concept post gets its own reel** (NORI agreed after the 6 Nov meeting; his earlier "it's old" was wrong).
G. **Tuesday concept:** a concept project of NORI's (nori-brand/concepts/ or the site). Never post a concept of a real brand that NORI hasn't approved for public posting; a concept still being pitched privately to that brand stays private. Concept posts carry no DM/price call.
H. **Week of 8 Nov 2026 (NORI's note, 6 Nov):** Sunday 8 Nov and Monday 9 Nov reels are both about the **Mishref Co-op concept** (concept post 3 Nov, reels/2026-11-03-mishref-coin): two different angles, no repeated points. Tuesday 10 Nov concept post = **Broasted Al Sham** (concepts/2026-11-05-broasted-alsham). The private call/pitch to the restaurant is **cancelled**, so NORI approved this concept for public posting (keep «مفهوم غير رسمي… مو تابع لبروستد الشام», no DM/price call).

## NORI's rules (31 Oct 2026, after week 1 of the automation) — these override anything below AND anything in the scheduled-task prompt (e.g. its "6–8 slides" and "don't reuse the first carousel's look")

1. **Not black-and-white only.** The 1 Nov drafts were judged "stone age": flat black/ivory/grey wireframes. Follow the first carousel (26 Oct): comfortable, the idea reaches the viewer directly, real designed visuals. Keep the dark frame, but the content inside must be alive (real ad/post designs, colour from the example brands), not grey boxes.
2. **No Black Friday / White Friday.** Not ours in the Gulf. Never use it as a topic, example or hook.
3. **Max 5 slides per carousel.** NORI is a designer: (70/30 split replaced by rule A above.)
4. **Arabic (Kuwaiti) only when talking to NORI** — every message and summary, never switch to English.
6. **The 26 Oct carousel (posts/2026-10-26) is the quality bar.** Keep its frame (watermark, counter, BEFORE/AFTER labels, gold check «الحل», swipe + dots, «النتيجة تتكلم»); change the composition inside each week.
7. **Never repeat an idea — check the points inside past posts, not just titles.** Already used: one clear message per ad, clear next step/CTA, consistent identity/feed, cluttered offers. Check content-log.md AND posts/.
9. **Reels follow the 27 Oct reel (reels/2026-10-27-reference.mp4), not flat kinetic type.** Blurred dark poster wall in perspective behind everything, small letter-spaced English label on top, centred headline with the key word in gold, words fade in with blur in time with the voice, 3D-tilted colourful mockups floating in the centre, gold sparks at key moments, NORI mark bottom centre. No jumping underlines, no text popping in random places. Gold sparks stay BEHIND the objects. When a scene lists points (e.g. «شنو تبيع؟ وين؟ شلون يطلب؟»), show them written and aligned (label + line), never as floating chips. Voice must be bright and clear, not muffled: use reels/2026-11-02/src/voice-process.sh. Reel A 2 Nov v1 was rejected for exactly that (reels/2026-11-02/rejected-v1).
12. **Sync reels to the words, not the pauses:** run tools/asr.py on the cleaned voice and time every gold word, transition and key animation to its word's start.
11. **Stay on our dark theme and keep improving it.** A light «UI-demo» style (Pause 1.0 Flash test, reels/2026-11-02/rejected-experiment-ui-style) was rejected: "مو جونا". Don't switch styles; evolve the dark cinematic one.
10. **No location.** NORI works with clients everywhere, not only Kuwait: never write «بالكويت»/Kuwait in bios, captions, CTAs or as a hashtag (#الكويت). Kuwaiti dialect stays; the market is open.
8. **Archive everything in GitHub as you go:** nori-brand/posts/<date>/ (PNGs + HTML), reels in nori-brand/reels/<date>/.
5. **The site is for concept projects only.** Weekly post media may sit on noridsgn.com/content/<date>/ only as a temporary, unlinked host for Metricool (NORI OK'd this until a better host is found). Never link it from any page.


## Schedule (Asia/Kuwait) — light plan from 8 Nov 2026

| Day | What |
| --- | --- |
| Saturday 16:42 | Prep run for the coming Sun–Sat: two carousel ideas + designs (Fri/Sat), four reel scripts, Tuesday concept post |
| Sunday | Reel 1 |
| Monday | Reel 2 |
| Tuesday | Concept post |
| Wednesday | Reel 3 |
| Thursday | Reel 4 · team meeting report at night (dashboard) |
| Friday | Carousel (100% educational) |
| Saturday | Carousel (100% educational) |

Reels can share an idea with a carousel, but never repeat its layout. Two ideas per week minimum; no idea or inner point repeats.

## Identity — fixed on every post

- Background `#0E0E0E`, text ivory `#F2F0EB`, secondary `#8A8A8A`.
- **One gold element per design** (`#C9A45C`).
- IBM Plex Sans Arabic for Arabic, Inter for English and numbers.
- Watermark top-left, 30px high. Safe margin 80px. Canvas **1080×1440**.
- Voice: Kuwaiti dialect, short, talks about results. Never use non-Kuwaiti words (e.g. «سوا» → «مع بعض»).

## Carousel structure — fixed (from the first carousel, 26 Oct 2026)

1. **Hook slide**: a problem the client feels (money, time, results).
2. **Body slides**: before/after or steps, one point per slide.
3. **Practical application slide**: show it applied for real. People liked this most.
4. **Last slide**: question for comments + DM call to action.

Total: **5 slides max** (see NORI's rules above).

Caption: hook line, «اسحب…», question for comments, DM line, one English line, hashtags.

## Creativity — changes every time

- New idea and topic every week; check `content-log.md` and never repeat a topic.
- New composition: where the gold element sits, how the comparison is shown, how text is laid out.
- Never copy a previous post or a reference. Take the idea, not the look.
- Add something save-worthy (a checklist, a rule, a number to remember): the first carousel got reach and follows but few saves.

## Reels

- Kinetic Arabic typography / motion, same identity rules.
- Prepare everything: script, voice-over text, storyboard, timings. NORI records the voice-over and sends it; then edit and finish.
- **Sound effects: use `sfx/` (Saoud SFX Pack, CC0).** Pick from `sfx/README.md` (ready picks per moment + full index). SFX sit 12–18 dB under the voice-over; only on key moves, not every animation.

## Approval

Nothing publishes without NORI's approval. Carousels go to Metricool as posts for review.

- Kuwaiti words only, no Saudi words: «تلفون» not «جوال».
