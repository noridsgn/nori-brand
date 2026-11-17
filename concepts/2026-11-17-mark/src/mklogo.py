from PIL import Image
import numpy as np
Z='/home/claude/work/zip/'
def key(path,bg,cA,cB,name,scale):
    im=np.asarray(Image.open(Z+path).convert('RGB')).astype(np.float32)
    bg=np.array(bg,np.float32);out={}
    def alpha(c):
        d=np.array(c,np.float32)-bg
        a=((im-bg)@d)/(d@d)
        res=np.abs(im-(bg+a[...,None]*d)).sum(2)
        return np.clip(a,0,1),res
    aA,rA=alpha(cA);aB,rB=alpha(cB)
    isA=rA<=rB
    mA=np.where(isA,aA,0);mB=np.where(~isA,aB,0)
    tot=np.maximum(mA,mB);ys,xs=np.where(tot>0.02)
    x0,x1,y0,y1=xs.min()-4,xs.max()+5,ys.min()-4,ys.max()+5
    for k,m in (('A',mA),('B',mB)):
        L=Image.fromarray((m[y0:y1,x0:x1]*255).astype(np.uint8))
        L=L.resize((int(L.width*scale),int(L.height*scale)),Image.LANCZOS)
        rgba=Image.new('RGBA',L.size,(255,255,255,0));rgba.putalpha(L);rgba.save(f'assets/{name}-{k}.png')
    print(name,(x1-x0,y1-y0),L.size)
CREAM=(234,224,213);BLK=(10,9,8);BRN=(94,80,63);TAN=(198,172,143)
key('01_MARK-vertical.png',CREAM,BLK,BRN,'vert',0.5)
key('04_MARK-horizontal.png',CREAM,BLK,BRN,'horiz',0.5)
key('08_MARK-wordmark-on-dark.png',BLK,CREAM,TAN,'word',0.5)
