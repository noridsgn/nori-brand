from comp import *
import traceback
def flat(m): return m.full(m.psd.topil().convert('RGB'),(0,0)+m.psd.size)
def one(a): return 1 if a is None else a
def obj(m,out,fill,color,parts,shadow,refl,smode=burn,sop=1.,rop=1.):
    """re-dress one object on top of `out`: fill mask+colour, designs, its own shadow/reflection clipped to it"""
    fa=m.shape(fill) if isinstance(fill,str) else fill
    c=np.broadcast_to(color,out.shape).copy()
    for design,so in parts:
        d,da=m.persp(design,m.tb(so));da=da*one(m.mask(so));c=over(c,d,da)
    if shadow: s,sa=m.px(shadow);c=smode(c,s,sa*sop)
    if refl: r,ra=m.px(refl);c=screen(c,r,ra*one(m.mask(refl))*rop)
    return over(out,c,fa)

def sign():
    m=M("MD1247_Signboard_Mockup_2/MD1247_Signboard_Mockup/Signboard_Mockup_1.psd",.7)
    out,_=m.px('Background/Background')
    out=burn(out,np.broadcast_to(hexc('#3a3f42'),out.shape),m.shape('Sign color'))
    for g,op in (('Mockup/Design#0',1),('Mockup/Design#1',156/255)):
        G=m.get(g);so=list(G)[0];sh=list(G)[1]
        d,da=m.persp('sign',m.tb(so));da=da*one(m.mask(G))
        s,sa=m.px(sh);d=mul(d,s,sa)
        out=over(out,d,da*op)
    h,ha=m.px('Mockup/Highlights/Highlights');out=screen(out,h,ha*one(m.mask('Mockup/Highlights'))*.8)
    save(out,'sign')
def bags():
    m=M("Free_2_Paper_Bag_Mockup_3/Free_2_Paper_Bag_Mockup/Files/Free_2_Paper_Bag_Mockup.psd",.45)
    out=flat(m)
    out=obj(m,out,'Paper Bag#1/Change Color',CREAM,[('bag_b','Paper Bag#1/Change This')],'Paper Bag#1/Shadow','Paper Bag#1/Reflection')
    out=obj(m,out,'Paper Bag#0/Change Color',SLATE,[('bag_a','Paper Bag#0/Change This')],'Paper Bag#0/Shadow','Paper Bag#0/Reflection',sop=.55)
    save(out,'bags')
def pouch():
    m=M("Free_Craft_Pouch_Mockup_3/Free_Craft_Pouch_Mockup/Files/Free_Craft_Pouch_Mockup.psd",.45)
    out=flat(m);L=list(m.psd)
    bg0=out[20,20].copy();out=np.clip(out/bg0,0,1)*CREAM
    fa=np.maximum(m.mask(L[2]),m.mask(L[3]))
    out=obj(m,out,fa,hexc('#C9AB85'),[('pouch_f',L[2]),('pouch_s',L[3])],L[4],L[5],sop=.5)
    save(out,'pouch')
def tote():
    m=M("Free_Fabric_Shopper_Bag_Mockup_2/Files/Free_Fabric_Shopper_Bag_Mockup.psd",.45)
    out=flat(m);L=list(m.psd)
    out=obj(m,out,m.mask(L[2]),hexc('#E6DCCB'),[('tote',L[2])],L[3],L[4],sop=.3)
    save(out,'tote')
def board():
    m=M("Free_Ad_Board_Mockup_3/Free_Ad_Board_Mockup/Files/Free_Ad_Board_Mockup.psd",.45)
    out=flat(m);bg0=out[20,m.W-20].copy()
    out=obj(m,out,'Screen/Change Color',SLATE,[('menu','Screen/Change This')],'Screen/Shadow','Screen/Reflection',smode=mul)
    save(out,'board')
def sticker():
    m=M("MD345_Free_Round_Sticker_Mockup_3/MD345_Free_Round_Sticker_Mockup/Free_Round_Sticker_Mockup_3.psd",.8)
    out=flat(m);bg0=out[20,20].copy();out=np.clip(out/bg0,0,1.05)*TAN
    st,sa=m.px('Mockup/Sticker/Sticker');so=m.get('Mockup/Sticker/Project')
    d,da=m.persp('sticker',m.tb(so));c=burn(st,d,da)
    out=over(out,c,sa)
    h,ha=m.px('Mockup/Highlights/Highlights');out=screen(out,h,ha*one(m.mask('Mockup/Highlights')))
    save(out,'sticker')
def apron():
    m=M("free-apron-mockup_3/Free Apron Mockup.psd",.6)
    out=np.broadcast_to(CREAM,(m.H,m.W,3)).copy()
    s,sa=m.px('Shadow');out=over(out,s,sa)
    e,ea=m.px('Elements');out=over(out,e,ea)
    for n,c in (('Tag',CREAM*.97),('Stitches Strap',TAN),('Stitches Apron',TAN),('Strap',BROWN),('Apron',SLATE)):
        out=over(out,np.broadcast_to(c,out.shape),m.shape('COLOR/'+n))
    for n,dsg in (('Tag','aprontag'),('Apron','apron')):
        so=m.get('DESIGN/'+n);d,da=m.persp(dsg,m.tb(so));out=over(out,d,da*one(m.mask(so)))
    s,sa=m.px('Shadows');out=mul(out,s,sa)
    h,ha=m.px('Highlights');out=screen(out,h,ha*.3)
    save(out,'apron')
def cupcream():
    m=M("MD356_Free_Paper_Coffee_Cup_Mockup_3/MD356_Free_Paper_Coffee_Cup_Mockup/Coffee_Cup_Mockup_1.psd",.7)
    out=np.broadcast_to(SLATE,(m.H,m.W,3)).copy()
    s,sa=m.px('Mockup/Shadows/Shadows');out=burn(out,s,sa*179/255*.8)
    cap,ca=m.px('Mockup/Cap/Cap');out=over(out,cap*BROWN*1.15,ca)
    cup,ua=m.px('Mockup/Cup/Cup')
    t=m.tb('Mockup/Cup/Design')
    d,da=m.cyl('cup_cream',ua,top=t[0][1]+60,keep=True)
    top,ta=m.px('Mockup/Cup/Top')
    body=over(mul(cup*1.15,d,da),top,ta);ba=np.maximum(ua,ta)
    cm=m.shape('Mockup/Cup color')
    # cup colour multiplies the whole cup except the art
    tint=np.broadcast_to(np.clip(CREAM*1.1,0,1),out.shape)
    body=over(body,cup*tint,ua*(1-da));body=over(body,top*tint,ta)
    out=over(out,body,ba)
    cf,fa=m.px('Mockup/Coffee/Coffee');out=over(out,cf,fa)
    h,ha=m.px('Mockup/Highlights/Highlights');out=screen(out,h,ha)
    save(out,'cupcream')
def espresso():
    m=M("coffee-cup-mockup_2/coffee-cup-mockup.psd",.45)
    out=flat(m);L=list(m.psd)
    ma=m.mask(L[1]);t=m.tb(L[1])
    d,da=m.cyl('cup_tan',ma,top=t[0][1],bottom=t[2][1]);c=over(np.broadcast_to(CREAM,out.shape).copy(),d,da)
    ra=m.shape(L[2]);c2=np.broadcast_to(CREAM,out.shape).copy()
    alla=np.maximum(ma,ra);c=over(c,c2,ra*(1-ma))
    s,sa=m.px(L[3]);c=mul(c,s,sa)
    r,ra2=m.px(L[4]);c=screen(c,r,ra2)
    out=over(out,c,alla)
    q,qa=m.px(L[5]);out=over(out,q,qa)
    save(out,'espresso')
import sys
for f in (sys.argv[1:] or ['sign','bags','pouch','tote','board','sticker','apron','cupcream','espresso']):
    try: globals()[f]()
    except Exception: print('FAIL',f);traceback.print_exc()
