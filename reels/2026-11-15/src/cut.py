import json,subprocess
ch=[(0.40,4.75),(6.25,11.12),(12.70,18.50),(20.80,26.50),(28.70,34.15),(35.85,39.22),(40.88,43.45)]
gap=0.42;lead=0.12;tail=1.8
pos=lead;out=[]
for i,(a,b) in enumerate(ch):
    out.append([a,b,pos]);pos+=b-a
    if i<len(ch)-1:pos+=gap
dur=pos+tail
F="highpass=f=100,equalizer=f=220:t=q:w=1:g=-3,equalizer=f=3000:t=q:w=1:g=2.5,treble=g=3:f=7000,acompressor=threshold=-22dB:ratio=3:attack=4:release=110:makeup=2"
fl=f"[0]aformat=channel_layouts=mono,{F}[v];[v]asplit={len(out)}"+"".join(f"[s{i}]" for i in range(len(out)))+";"
fl+=f"anullsrc=r=48000:cl=mono,atrim=0:{lead}[l];"
for i,(a,b,p) in enumerate(out):
    fl+=f"[s{i}]atrim={a}:{b},asetpts=N/SR/TB,afade=t=in:d=0.02,afade=t=out:st={b-a-0.04}:d=0.04[c{i}];"
    if i<len(out)-1: fl+=f"anullsrc=r=48000:cl=mono,atrim=0:{gap}[g{i}];"
fl+=f"anullsrc=r=48000:cl=mono,atrim=0:{tail}[t];"
seq="[l]"+"".join(f"[c{i}]"+(f"[g{i}]" if i<len(out)-1 else "") for i in range(len(out)))+"[t]"
n=2+len(out)+len(out)-1
fl+=seq+f"concat=n={n}:v=0:a=1,loudnorm=I=-15:TP=-1.5:LRA=11[o]"
subprocess.run(["ffmpeg","-loglevel","error","-y","-i","vo-raw.wav","-filter_complex",fl,"-map","[o]","-ar","48000","voice-tight.wav"],check=True)
json.dump({"chunks":out,"dur":dur},open("map.json","w"))
print(dur)
