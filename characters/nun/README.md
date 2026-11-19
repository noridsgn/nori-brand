# NORI character: «ن»

Approved by NORI on 19 Nov 2026. This is the talking mascot for faceless reels: it speaks over NORI's voice, its eyes change with what he says, and it moves and interacts with what's on screen.

## Look (approved: `nun-glass-approved.mp4`)
- The letter «ن» (from «نوري») drawn as a **smoked dark-glass tube** with a **glowing gold filament** inside (#E6B84C), a gold fresnel rim and a sharp top-left highlight.
- **Eyes:** two cream light orbs inside the bowl of the ن.
- **The dot:** a glass bead with a gold core. It has its own personality: it orbits when thinking, jumps when surprised, bounces when laughing, pulses like an alarm when warning, and pops when positive.
- Background: #0C0C0E, a glossy black floor with a soft reflection.
- Colour by meaning: gold = default, red = warning/negative, green = positive (same as the reel theme).

## Expressions
| Name | Eyes | Body / dot |
| --- | --- | --- |
| هادي | round | slow bob and breathing, blinks |
| تفكّر | look up at the dot, narrower | right tip rises (hand on chin), the dot orbits |
| تنصدم | big | stretches tall, tips flare, the dot jumps high |
| تضحك | crescents ^ ^ | squash bounce, the dot bounces |
| تحذّر | angry slant | red, shakes, tips drop, the dot pulses like an alarm |
| تمام | crescents | green, tips up like arms, the dot pops |

## Rejected (kept as a record)
- `rejected/glass-sphere-copy.mp4`: a glass sphere with tall eyes. **Too close to the reference reel** (account 077.f). Take the idea, not the look.
- `rejected/nun-flat-gold.mp4`: the right idea (ن), but flat gold isn't luxurious enough.

## Render
`src/glass.py` (imports `src/nun.py` for keyframes and eyes). Python 3 + numpy + Pillow (with raqm) + ffmpeg.
- `python3 glass.py` renders the 8 s test → `nori_nun_glass_test.mp4` (1080×1920, 30 fps)
- `python3 glass.py 0.3 2.0` saves stills at those seconds

Next step: the first real reel, where the character is timed to NORI's voice word by word and interacts with on-screen elements.
