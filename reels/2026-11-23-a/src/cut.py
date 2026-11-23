# tighten NORI's pauses: every silence longer than 0.5 s -> 0.42 s (speech kept untouched); also writes words mapped to tight times
import json,subprocess,re
log=subprocess.run(["ffmpeg","-hide_banner","-i","vo.wav","-af","silencedetect=n=-38dB:d=0.25","-f","null","-"],capture_output=True,text=True).stderr
ss=[float(x) for x in re.findall(r"silence_start: ([0-9.]+)",log)];se=[float(x) for x in re.findall(r"silence_end: ([0-9.]+)",log)]
sil=[(a,b) for a,b in zip(ss,se) if b-a>0.5]
total=42.20;P=0.07
speech=[];cur=0.0
for a,b in sil:
    if a>cur: speech.append((max(0,cur-P if cur>0 else 0),a+P))
    cur=b
ch=[(round(a,3),round(b,3)) for a,b in speech if b-a>0.15]
lead=0.25;tail=1.6;gap=0.42
pos=lead;out=[]
for i,(a,b) in enumerate(ch):
    out.append([a,b,round(pos,3)]);pos+=b-a+(gap if i<len(ch)-1 else 0)
dur=round(pos+tail,2)
fl=f"anullsrc=r=48000:cl=stereo,atrim=0:{lead}[l];"
for i,(a,b,p) in enumerate(out):
    fl+=f"[0]atrim={a}:{b},asetpts=N/SR/TB,aformat=channel_layouts=stereo,afade=t=in:d=0.02,afade=t=out:st={b-a-0.03}:d=0.03[c{i}];"
    if i<len(out)-1: fl+=f"anullsrc=r=48000:cl=stereo,atrim=0:{gap}[g{i}];"
fl+=f"anullsrc=r=48000:cl=stereo,atrim=0:{tail}[t];"
seq="[l]"+"".join(f"[c{i}]"+(f"[g{i}]" if i<len(out)-1 else "") for i in range(len(out)))+"[t]"
fl+=seq+f"concat=n={2+2*len(out)-1}:v=0:a=1,loudnorm=I=-15:TP=-1.5:LRA=11[o]"
subprocess.run(["ffmpeg","-loglevel","error","-y","-i","vo.wav","-filter_complex",fl,"-map","[o]","-ar","48000","voice-tight.wav"],check=True)
json.dump({"chunks":out,"dur":dur},open("map.json","w"),indent=1)
print(dur);[print(c) for c in out]
# map ASR word times (vo.wav) to the tight timeline
W=[w for s in json.load(open("vo.wav.words.json")) for w in s["words"]]
def m(t):
    for a,b,p in out:
        if a-0.1<=t<=b+0.1: return round(p+min(max(t-a,0),b-a),3)
    return None
json.dump([{"w":w["w"].strip(),"s":m(w["s"]),"e":m(w["e"])} for w in W],open("words.json","w"),ensure_ascii=False,indent=0)
