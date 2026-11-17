import sys, os, numpy as np, cv2, warnings
warnings.filterwarnings('ignore')
from psd_tools import PSDImage
from PIL import Image
Image.MAX_IMAGE_PIXELS=None
MK='/home/claude/work/mk/'
hexc=lambda h:np.array([int(h[i:i+2],16) for i in (1,3,5)],np.float32)/255
CREAM,TAN,BROWN,SLATE,INK=map(hexc,('#EAE0D5','#C6AC8F','#5E503F','#22333B','#0A0908'))
class M:
    def __init__(s,path,scale):
        s.psd=PSDImage.open(MK+path);s.k=scale;W,H=s.psd.size;s.W,s.H=int(W*scale),int(H*scale)
    def get(s,path):
        cur=s.psd
        for p in path.split('/'):
            if p.isdigit(): cur=list(cur)[int(p)]
            else:
                name,_,n=p.partition('#');c=[l for l in cur if l.name.strip()==name];cur=c[int(n or 0)]
        return cur
    def full(s,im,bbox,bg=0):
        """PIL L/RGBA at bbox -> float array on scaled canvas"""
        ch=len(im.getbands());a=np.asarray(im).astype(np.float32)/255
        if a.ndim==2:a=a[...,None]
        W,H=s.psd.size;out=np.full((H,W,a.shape[2]),bg,np.float32)
        x0,y0,x1,y1=bbox;cx0,cy0,cx1,cy1=max(x0,0),max(y0,0),min(x1,W),min(y1,H)
        if cx1>cx0 and cy1>cy0: out[cy0:cy1,cx0:cx1]=a[cy0-y0:cy1-y0,cx0-x0:cx1-x0]
        return cv2.resize(out,(s.W,s.H),interpolation=cv2.INTER_AREA).reshape(s.H,s.W,-1)
    def px(s,path):
        l=s.get(path) if isinstance(path,str) else path;im=l.topil().convert('RGBA');a=s.full(im,l.bbox);return a[...,:3],a[...,3:]
    def mask(s,path):
        l=s.get(path) if isinstance(path,str) else path;m=l.mask
        if m is None or m.size==(0,0) or m.topil() is None: return None
        return s.full(m.topil().convert('L'),m.bbox,bg=m.background_color/255)
    def shape(s,path):
        """alpha of a fill layer (raster or vector mask) via psd-tools composite"""
        l=s.get(path) if isinstance(path,str) else path
        m=s.mask(l)
        if m is not None: return m
        im=l.composite(viewport=(0,0)+s.psd.size);return s.full(im.convert('RGBA'),(0,0)+s.psd.size)[...,3:]
    def tb(s,path):
        l=s.get(path) if isinstance(path,str) else path;t=l.smart_object.transform_box;return [(t[i]*s.k,t[i+1]*s.k) for i in range(0,8,2)]
    def persp(s,design,quad):
        d=np.asarray(Image.open(f'designs/{design}.png').convert('RGBA')).astype(np.float32)/255;h,w=d.shape[:2]
        Mx=cv2.getPerspectiveTransform(np.float32([(0,0),(w,0),(w,h),(0,h)]),np.float32(quad))
        o=cv2.warpPerspective(d,Mx,(s.W,s.H),flags=cv2.INTER_AREA if w>s.W else cv2.INTER_LINEAR,borderValue=0)
        return o[...,:3],o[...,3:]
    def cyl(s,design,alpha,top=None,bottom=None,span=1.0,kscale=1.0,k=None,keep=False):
        """wrap a flat design (the visible half) round an upright cup whose silhouette is alpha"""
        d=np.asarray(Image.open(f'designs/{design}.png').convert('RGBA')).astype(np.float32)/255;h,w=d.shape[:2]
        a=alpha[...,0]>.5;rows=np.where(a.any(1))[0];y0,y1=rows.min(),rows.max()
        xl=np.zeros(s.H,np.float32);xr=np.ones(s.H,np.float32)
        for y in range(y0,y1+1):
            xs=np.where(a[y])[0];xl[y],xr[y]=xs.min(),xs.max()+1
        # fit straight edges through the middle of the body (ignore curved top/bottom)
        ym=np.arange(int(y0+.25*(y1-y0)),int(y0+.7*(y1-y0)))
        pl=np.polyfit(ym,xl[ym],1);pr=np.polyfit(ym,xr[ym],1)
        yy,xx=np.mgrid[0:s.H,0:s.W].astype(np.float32)
        cx=(np.polyval(pl,y1)+np.polyval(pr,y1))/2
        if k is None:
            cols=np.where(a[:, int(cx)])[0];yc=cols.max();ye=np.where(a[:,int(np.polyval(pl,y1)+ .12*(np.polyval(pr,y1)-np.polyval(pl,y1)))])[0].max()
            k=(yc-ye)/(1-np.sqrt(1-.76**2))   # ellipse minor radius at the bottom
        wb=np.polyval(pr,y1)-np.polyval(pl,y1)
        L=np.polyval(pl,yy);R=np.polyval(pr,yy)
        sx=np.clip((xx-L)/(R-L)*2-1,-1,1);th=np.arcsin(sx)
        kk=k*kscale*(R-L)/wb
        ycen=yy+kk*(1-np.cos(th))
        T=(y0 if top is None else top);B=((y1) if bottom is None else bottom)
        if keep: B=T+(np.pi*wb/2*span)/w*h
        v=(ycen-T)/(B-T);u=.5+th/np.pi/span
        o=cv2.remap(d,(u*w).astype(np.float32),(v*h).astype(np.float32),cv2.INTER_LINEAR,borderValue=0)
        return o[...,:3],o[...,3:]
# blend helpers
def over(b,rgb,a): return b*(1-a)+rgb*a
def mul(b,rgb,a): return b*(1-a)+b*rgb*a
def burn(b,rgb,a): return b*(1-a)+np.clip(b+rgb-1,0,1)*a
def screen(b,rgb,a): return b*(1-a)+(1-(1-b)*(1-rgb))*a
def save(a,name,maxw=2400):
    im=Image.fromarray((np.clip(a,0,1)*255+.5).astype(np.uint8))
    if im.width>maxw: im=im.resize((maxw,int(im.height*maxw/im.width)),Image.LANCZOS)
    im.save(f'mock/{name}.jpg',quality=93);print(name,im.size,flush=True)
