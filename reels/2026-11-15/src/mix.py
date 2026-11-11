import subprocess
S="/home/claude/nori-brand/sfx"
fx=[("04 واجهات ونقرات - UI & Clicks/pop_soft.wav",6.40,-17),("04 واجهات ونقرات - UI & Clicks/pop_soft.wav",6.60,-17),("04 واجهات ونقرات - UI & Clicks/pop_soft.wav",6.80,-17),
("04 واجهات ونقرات - UI & Clicks/ui_click.wav",11.04,-15),("05 نغمات - Chimes & Tones/soft_chime.wav",13.0,-17),
("01 انتقالات - Transitions/swipe_10.wav",17.67,-15),("01 انتقالات - Transitions/whoosh_soft_13.wav",23.45,-16),
("01 انتقالات - Transitions/whoosh_soft_17.wav",28.2,-16),("03 تصاعد - Risers/riser_soft.wav",30.33,-17),
("02 ضربات - Impacts/impact_impact_soft_heavy_000.wav",31.45,-14),("02 ضربات - Impacts/low_thud.wav",32.1,-16)]
args=["ffmpeg","-loglevel","error","-y","-i","voice-tight.wav"]
fl=""
for i,(f,t,db) in enumerate(fx):
    args+=["-i",S+"/"+f]; d=int(t*1000)
    fl+=f"[{i+1}]aformat=channel_layouts=mono,volume={db}dB,adelay={d}|{d}[f{i}];"
fl+="[0]"+"".join(f"[f{i}]" for i in range(len(fx)))+f"amix=inputs={len(fx)+1}:normalize=0,alimiter=limit=0.9[o]"
subprocess.run(args+["-filter_complex",fl,"-map","[o]","-ar","48000","-ac","2","mix.wav"],check=True)
