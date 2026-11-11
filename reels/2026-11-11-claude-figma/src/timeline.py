import json,subprocess
W="/home/claude/work"
SEGS=[("2322",0.0,1.72),
("2317",0.0,5.55),
("2320",0.0,2.95),("2320",3.40,5.55),
("2323",0.20,3.0),("2323",3.25,5.05),("2323",5.50,6.85),
("2326",0.0,1.42),("2326",1.70,3.42),("2326",3.75,6.95),
("2327",0.0,3.68),("2327",4.15,10.98),("2327",11.30,12.33),("2327",12.60,14.40),
("2328",0.0,5.40)]
pos=0;tl=[]
for c,a,b in SEGS:
    tl.append({"clip":c,"a":a,"b":b,"t0":round(pos,4)});pos+=b-a
json.dump({"segs":tl,"dur":round(pos,4)},open("timeline.json","w"),indent=1)
print(pos)
ins=[];fl=""
for i,s in enumerate(tl):
    ins+=["-i",f"{W}/clean/{s['clip']}.wav"]
    d=s['b']-s['a']
    fl+=f"[{i}]atrim={s['a']}:{s['b']},asetpts=N/SR/TB,afade=t=in:d=0.015,afade=t=out:st={d-0.02}:d=0.02[c{i}];"
fl+="".join(f"[c{i}]" for i in range(len(tl)))+f"concat=n={len(tl)}:v=0:a=1[o]"
subprocess.run(["ffmpeg","-loglevel","error","-y"]+ins+["-filter_complex",fl,"-map","[o]","-ar","48000","voice.wav"],check=True)
