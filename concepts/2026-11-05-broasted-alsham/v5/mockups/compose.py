# Mounts the artwork in designs/ onto the stock mockups (not in the repo: licensed files, pass their folder as argv[1]).
import sys,json,os,numpy as np
from PIL import Image,ImageFilter
Image.MAX_IMAGE_PIXELS=None
M=sys.argv[1];info=json.load(open(f'{M}/info.json'));os.makedirs('out',exist_ok=True)
def f(im): return np.asarray(im.convert('RGB')).astype(np.float32)/255
def coeffs(dst,src):  # maps output (dst quad) -> source rect
    A=[];B=[]
    for (x,y),(u,v) in zip(dst,src):
        A+=[[x,y,1,0,0,0,-u*x,-u*y],[0,0,0,x,y,1,-v*x,-v*y]];B+=[u,v]
    return np.linalg.solve(np.array(A,float),np.array(B,float))
def warp(design,tbox,size):
    d=Image.open(f'designs/{design}.png').convert('RGBA');w,h=d.size
    q=[(tbox[i],tbox[i+1]) for i in range(0,8,2)]
    return d.transform(size,Image.PERSPECTIVE,coeffs(q,[(0,0),(w,0),(w,h),(0,h)]),Image.BICUBIC)
def mask(key,L,size):
    if 'mask_file' not in L: return None
    m=Image.open(f'{M}/{key}/{L["mask_file"]}').convert('L');bg=L.get('mask_bg',0)
    full=Image.new('L',size,bg if isinstance(bg,int) else 0)
    b=L['mask_bbox'];
    if m.size==(b[2]-b[0],b[3]-b[1]): full.paste(m,(b[0],b[1]))
    else: full=m.resize(size)
    return np.asarray(full).astype(np.float32)/255
def layer(key,i): return info[key]['layers'][i]
def place(key,i,design,size):  # -> rgb, alpha of a warped design clipped by its layer mask
    L=layer(key,i);w=warp(design,L['tbox'],size);a=np.asarray(w)[...,3].astype(np.float32)/255
    m=mask(key,L,size)
    if m is not None: a=a*m
    return f(w),a[...,None]
def px(key,i,size):
    L=layer(key,i);im=Image.open(f'{M}/{key}/{L["px_file"]}').convert('RGBA');full=Image.new('RGBA',size,(0,0,0,0));full.paste(im,(L['bbox'][0],L['bbox'][1]))
    a=np.asarray(full).astype(np.float32)/255;return a[...,:3],a[...,3:]
def save(a,name): Image.fromarray((np.clip(a,0,1)*255+.5).astype(np.uint8)).save(f'out/{name}.png');print(name,a.shape,flush=True)
hexc=lambda h:np.array([int(h[i:i+2],16) for i in (1,3,5)],np.float32)/255
RED,CREAM,CHAR=hexc('#C8261D'),hexc('#F6EBDA'),hexc('#1C1816')

def photo_bag(key,blank,bagcolor,parts,bagmask_i):
    """white-bag photo x artwork (multiply): keeps the photo's own folds, light and shadow"""
    b=Image.open(f'{M}/{key}/{blank}');size=b.size;base=f(b)
    tint=np.ones_like(base);cov=np.zeros(base.shape[:2]+(1,),np.float32)
    bm=mask(key,layer(key,bagmask_i),size)[...,None]
    tint=tint*(1-bm)+bagcolor*bm
    for i,design,op in parts:
        rgb,a=place(key,i,design,size);a=a*op
        tint=tint*(1-a)+rgb*a
    return base*tint

# 1 · bag on the metal table (dark scene) — red bag
r=photo_bag('metal','11663999.jpg',RED,[(7,'metal_front',1),(6,'metal_side',1),(9,'metal_top',1),(10,'metal_side',1),(11,'metal_front',1)],8)
save(r,'bag-metal')
# 2 · bag on the countertop — cream bag
r=photo_bag('counter','11766494.jpg',CREAM,[(6,'counter_front',1),(7,'counter_front',1)],5)
save(r,'bag-counter')

# green tiles of the countertop scene -> brand red (hue swap only, light and shadow kept)
def recolor_green(a,target=RED):
    import colorsys
    hsv=np.asarray(Image.fromarray((np.clip(a,0,1)*255).astype(np.uint8)).convert('HSV')).astype(np.float32)
    h,s=hsv[...,0]*360/255,hsv[...,1]/255
    w=np.clip((s-.18)/.2,0,1)*np.clip(1-np.abs(h-150)/55,0,1);w=np.clip(w*2.2,0,1)
    th=colorsys.rgb_to_hsv(*target)[0]*255
    hsv2=hsv.copy();hsv2[...,0]=th;hsv2[...,1]=np.clip(hsv[...,1]*1.05,0,255)
    b=np.asarray(Image.fromarray(hsv2.astype(np.uint8),'HSV').convert('RGB')).astype(np.float32)/255
    return a*(1-w[...,None])+b*w[...,None]
save(recolor_green(f(Image.open('out/bag-counter.png'))),'bag-counter')

# 3 · handle bag on tiles (built from the PSD's own overlay layers: soft light, multiply, screen)
def softlight(b,s): return np.where(s<=.5,b-(1-2*s)*b*(1-b),b+(2*s-1)*(np.where(b<=.25,((16*b-12)*b+4)*b,np.sqrt(b))-b))
def over(b,rgb,a,fn,op=1.0):
    return b*(1-a*op)+fn(b,rgb)*a*op
key='creatsy';size=tuple(info[key]['size'])
base=np.ones((size[1],size[0],3),np.float32)*CHAR*1.9      # tiles colour (lifted: the multiply layer darkens it)
bm=mask(key,layer(key,1),size)[...,None];base=base*(1-bm)+CREAM*bm
for i,d in [(2,'creatsy_side'),(3,'creatsy_side'),(4,'creatsy_front')]:
    rgb,a=place(key,i,d,size);base=base*(1-a)+rgb*a
for i,fn in [(7,softlight),(8,lambda b,s:b*s),(9,lambda b,s:1-(1-b)*(1-s))]:
    rgb,a=px(key,i,size);base=over(base,rgb,a,fn)
for i,fn in [(19,softlight),(20,lambda b,s:1-(1-b)*(1-s))]:
    rgb,a=px(key,i,size);base=over(base,rgb,a,fn,.5)
save(base,'bag-tiles')

# 4 · sign: artwork multiplied onto the panel, the PSD's highlights screened back on top
key='sign';size=tuple(info[key]['size'])
bg,_=px(key,2,size);L=layer(key,4);w=warp('sign',L['tbox'],size)
a=(np.asarray(w)[...,3:].astype(np.float32)/255)*mask(key,layer(key,3),size)[...,None]
day=bg*(1-a)+(bg*f(w))*a
hl,ha=px(key,6,size);day=over(day,hl,ha,lambda b,s:1-(1-b)*(1-s))
save(day,'sign-day')
# night grade for slide 09 ("بالليل… يناديك"): scene pushed to a cool dusk, the panel left lit, with a red glow
lum=day.mean(-1,keepdims=True)
night=(day*.55+lum*.45)*np.array([.20,.24,.36],np.float32)
panel=bg*(1-a)+f(w)*a
glowm=Image.fromarray((a[...,0]*255).astype(np.uint8))
g1=np.asarray(glowm.filter(ImageFilter.GaussianBlur(140))).astype(np.float32)[...,None]/255
g2=np.asarray(glowm.filter(ImageFilter.GaussianBlur(40))).astype(np.float32)[...,None]/255
night=night+RED*g1*.55*(1-a)+RED*g2*.35*(1-a)
lit=f(w)*(.92+.08*lum*2)
night=night*(1-a)+lit*a
save(night,'sign-night')
