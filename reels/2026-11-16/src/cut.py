import json,subprocess
ch=[(0.70,3.84),(5.63,9.19),(10.55,13.50),(14.27,15.85),(17.20,20.18),(23.55,27.76),(30.13,33.49),(34.76,37.60)]
gap=[0.45,0.45,0.40,0.32,0.45,0.45,0.45]
lead=0.15;tail=1.6
pos=lead;out=[];f=[]
for i,(a,b) in enumerate(ch):
    out.append([a,b,pos]);pos+=b-a
    if i<len(gap):pos+=gap[i]
dur=pos+tail
parts=[];fl=""
fl+=f"anullsrc=r=48000:cl=stereo,atrim=0:{lead}[l];"
for i,(a,b,p) in enumerate(out):
    fl+=f"[0]atrim={a}:{b},asetpts=N/SR/TB,afade=t=in:d=0.02,afade=t=out:st={b-a-0.03}:d=0.03[c{i}];"
    if i<len(gap): fl+=f"anullsrc=r=48000:cl=stereo,atrim=0:{gap[i]}[g{i}];"
fl+=f"anullsrc=r=48000:cl=stereo,atrim=0:{tail}[t];"
seq="[l]"+"".join(f"[c{i}]"+(f"[g{i}]" if i<len(gap) else "") for i in range(len(out)))+"[t]"
fl+=seq+f"concat=n={2+len(out)+len(gap)}:v=0:a=1,loudnorm=I=-15:TP=-1.5:LRA=11[o]"
subprocess.run(["ffmpeg","-loglevel","error","-y","-i","vo.wav","-filter_complex",fl,"-map","[o]","-ar","48000","voice-tight.wav"],check=True)
def m(t):
    for a,b,p in out:
        if t<a: return p
        if t<=b: return p+t-a
    return out[-1][2]+out[-1][1]-out[-1][0]
json.dump({"chunks":out,"dur":dur},open("map.json","w"))
words="أول@0.80 شي@1.62 شفته@1.82 بهالإعلان@2.10 مو@2.74 اللي@2.90 يبيه@3.14 صاحبه@3.34 لأن@5.70 كل@5.84 شي@6.06 بنفس@6.30 الحجم@6.64 والعين@7.14 ما@7.72 تعرف@7.90 من_وين@8.22 تبدأ@8.72 رتّبه@10.60 3@10.80 مستويات@11.34 العنوان@11.96 أكبر@12.72 شي@13.12 بعده@14.30 المنتج@14.46 أصغر@15.22 اقسم@17.20 حجم@17.56 العنوان@17.90 على@18.38 1.6@18.60 تقريباً@19.48 والزر@23.60 آخر@24.00 شي@24.42 تحت@24.68 على_اليسار@25.00 لأن@25.70 العين@26.08 بالعربي@26.40 تنزل@26.74 لهناك@27.24 كبّر@30.15 الأهم@30.54 وصغّر@30.92 الباقي@31.52 والعين@31.98 تمشي@32.50 بالترتيب@32.84 احفظ@34.94 الريل@35.40 وطبقه@35.84 على@36.40 تصميمك@36.60 الياي@37.04"
W=[(w.split("@")[0].replace("_"," "),round(m(float(w.split("@")[1])),2)) for w in words.split()]
json.dump(W,open("words.json","w"),ensure_ascii=False)
print(dur);print(W)
