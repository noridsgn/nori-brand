import sys,subprocess,re,json
d=sys.argv[1];cap=float(sys.argv[2]) if len(sys.argv)>2 else .32
src=f'{d}/src/voice-nori.wav'
dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',src],capture_output=True,text=True).stdout)
o=subprocess.run(['ffmpeg','-hide_banner','-i',src,'-af','silencedetect=noise=-38dB:d=0.3','-f','null','-'],capture_output=True,text=True).stderr
st=[float(x) for x in re.findall(r'silence_start: ([0-9.]+)',o)];en=[float(x) for x in re.findall(r'silence_end: ([0-9.]+)',o)]
sil=[]
for a,b in zip(st,en):
    if sil and a-sil[-1][1]<.12: sil[-1][1]=b
    else: sil.append([a,b])
ch=[];pos=0
for a,b in sil:
    if a>pos+.05: ch.append((max(0,pos-.05),min(dur,a+.07)))
    pos=b
if pos<dur-.1: ch.append((pos-.05,dur))
lead=.15;tail=1.5;fl=f"anullsrc=r=48000:cl=mono,atrim=0:{lead}[l];";seq='[l]';n=1
for i,(a,b) in enumerate(ch):
    fl+=f"[0]atrim={a}:{b},asetpts=N/SR/TB,afade=t=in:d=0.02,afade=t=out:st={b-a-0.03}:d=0.03[c{i}];";seq+=f'[c{i}]';n+=1
    if i<len(ch)-1:
        g=min(cap,ch[i+1][0]-b);g=max(g,.1);fl+=f"anullsrc=r=48000:cl=mono,atrim=0:{g}[g{i}];";seq+=f'[g{i}]';n+=1
fl+=f"anullsrc=r=48000:cl=mono,atrim=0:{tail}[t];"+seq+f"[t]concat=n={n+1}:v=0:a=1,loudnorm=I=-15:TP=-1.5:LRA=11[o]"
subprocess.run(['ffmpeg','-loglevel','error','-y','-i',src,'-filter_complex',fl,'-map','[o]','-ar','48000',f'{d}/src/voice-tight.wav'],check=True)
print(d,len(ch),'chunks',subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'{d}/src/voice-tight.wav'],capture_output=True,text=True).stdout)
