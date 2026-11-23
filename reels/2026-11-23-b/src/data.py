# Captions follow NORI's words (times = speech onsets in voice.wav, checked against the loudness curve)
import json
dur = json.load(open("timeline.json"))["dur"]
G = "g"
chunks = [
 (0.20, 2.55, [("تبي",0.20),("تصمم",0.50),("كرت",0.90,G),("سريع،",1.10),("بطن",1.62,G),("وظهر؟",1.95,G)]),
 (2.62, 4.62, [("روح",2.70),("لكلود",3.05,G),("وعطه",3.50),("البرومت",3.95)]),
 (4.70, 7.20, [("علّق",4.80),("بكلمة",5.20),("«كرت»",5.62,G),("عشان",5.95),("يوصلك",6.25),("البرومت",6.55)]),
 (7.22, 9.50, [("كالعادة",7.30),("بعد",7.85),("ما",7.97),("يخلص",8.15),("يعطيك",8.55),("نسختين،",8.95,G)]),
 (9.55, 10.65, [("بطن",9.65,G),("وظهر",10.10,G)]),
 (10.65, 12.12, [("سوّ",10.70),("لهم",10.90),("كوبي",11.05,G),("ثنينهم",11.35)]),
 (12.12, 14.25, [("ومجرد",12.20),("ما",12.75),("تطق",12.90),("Ctrl + V",13.30,G)]),
 (14.25, 15.72, [("صار",14.30),("عندك",14.60),("تصميم",14.85),("الكرت",15.30,G)]),
 (15.72, dur, [("جاهز",15.80,"ok"),("إنك",16.60),("تطبعه",16.95)]),
]
labels = [  # pill on the card's bottom edge
 dict(t=2.80, e=4.62, k="claude"),
 dict(t=4.85, e=7.20, k="comment"),
 dict(t=8.95, e=10.65, k="sides"),
 dict(t=11.00, e=12.12, k="copy"),
 dict(t=13.25, e=14.25, k="keys"),
 dict(t=15.80, e=dur, k="print"),
]
D = dict(dur=dur, chunks=[dict(t=a, e=b, w=[dict(x=w[0], t=w[1], g=(w[2] if len(w) > 2 else "")) for w in ws]) for a, b, ws in chunks], labels=labels)
json.dump(D, open("data.json", "w"), ensure_ascii=False, indent=1)
open("data.js", "w").write("window.DATA=" + json.dumps(D, ensure_ascii=False) + ";")
