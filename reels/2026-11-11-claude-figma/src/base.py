# python3 base.py test T...   -> /home/claude/work/b_T.png      python3 base.py all | ffmpeg ... (raw bgr24 1080x1920 30fps on stdout)
import sys,json,cv2,numpy as np
MEZ="/home/claude/work/mez/"
tl=json.load(open("timeline.json"));segs=tl["segs"];dur=tl["dur"]
CX,CY,CW,CH=40,290,1000,1090
# zoom per clip: (w0,cx0,cy0) -> (w1,cx1,cy1) in source px, over the clip's used span
Z={"2322":((900,490,930),(800,500,960)),
   "2317":((1080,540,800),(840,540,965)),
   "2320":((980,540,930),(740,590,1040)),
   "2323":((1080,540,895),(900,640,985)),
   "2326":((1080,540,870),(900,548,890)),
   "2327":((960,548,885),(868,548,888)),
   "2328":((868,548,888),(1010,545,880))}
span={}
for s in segs:
    a,b=span.get(s["clip"],(s["a"],s["b"]));span[s["clip"]]=(min(a,s["a"]),max(b,s["b"]))
first={};
for s in segs: first.setdefault(s["clip"],s["t0"])
ss=lambda x:x*x*(3-2*x)
grad=np.ones((1920,1,1),np.float32)
def render(t,caps):
    s=[x for x in segs if x["t0"]<=t+1e-6][-1]
    c=s["clip"];st=s["a"]+(t-s["t0"]);fi=int(round(st*30))
    cap,pos=caps.get(c,(None,-1))
    if cap is None: cap=cv2.VideoCapture(MEZ+c+".mp4");pos=-1
    if fi<=pos: cap.set(cv2.CAP_PROP_POS_FRAMES,fi);pos=fi-1
    fr=None
    while pos<fi:
        ok,f=cap.read();pos+=1
        if ok: fr=f
        else: break
    if fr is None: fr=caps["last"]
    caps[c]=(cap,pos);caps["last"]=fr
    a,b=span[c];u=ss(min(1,max(0,(st-a)/(b-a))))
    (w0,x0,y0),(w1,x1,y1)=Z[c]
    w=w0+(w1-w0)*u;cx=x0+(x1-x0)*u;cy=y0+(y1-y0)*u
    k=min(1,(t-first[c])/0.35);w*=1-0.045*(1-k)**3   # small settle on each new shot
    h=w*CH/CW;x=min(max(cx-w/2,0),1080-w);y=min(max(cy-h/2,0),1920-h);sc=CW/w
    M=np.float32([[sc,0,-x*sc],[0,sc,-y*sc]])
    card=cv2.warpAffine(fr,M,(CW,CH),flags=cv2.INTER_CUBIC if sc>1 else cv2.INTER_AREA)
    sm=cv2.resize(fr,(108,192),interpolation=cv2.INTER_AREA);sm=cv2.GaussianBlur(sm,(0,0),6)
    bg=cv2.resize(sm,(1080,1920),interpolation=cv2.INTER_CUBIC).astype(np.float32)*0.30+14*0.70
    out=bg.astype(np.uint8)
    out[CY:CY+CH,CX:CX+CW]=card
    return out
if sys.argv[1]=="test":
    for t in map(float,sys.argv[2:]):
        cv2.imwrite(f"/home/claude/work/b_{t}.png",render(t,{}))
else:
    caps={};n=int(round(dur*30))
    for i in range(n): sys.stdout.buffer.write(render(i/30,caps).tobytes())
