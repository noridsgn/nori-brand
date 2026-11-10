# builds designs.html: the flat artwork that goes inside each mockup's smart object
import json
p=json.load(open('../paths.json'))
R,C,K,G='#C8261D','#F6EBDA','#1C1816','#E9B04A'
def logo(w,body,comb):
    return f'<svg width="{w}" height="{w*540/410:.0f}" viewBox="250 180 410 540"><path d="{p["comb"]}" fill="{comb}"/><path d="{p["body"]}" fill="{body}"/><rect x="451" y="452" width="67" height="63" fill="{G}"/></svg>'
def ablaq(h,a,b,n=2):
    s=h/n
    return f'<div style="position:absolute;left:0;right:0;bottom:0;height:{h}px;background:repeating-linear-gradient(180deg,{a} 0 {s/2}px,{b} {s/2}px {s}px)"></div>'
def front(i,w,h,bg,fg,comb,stripe,lw=.36,band=.17,ty=.44):
    L=w*lw
    return f'''<section id="{i}" style="width:{w}px;height:{h}px;background:{bg};color:{fg}">
<div style="position:absolute;left:0;right:0;top:{h*ty-L*1.317/2-h*.07:.0f}px;display:flex;flex-direction:column;align-items:center;gap:{w*.045:.0f}px">{logo(L,fg,comb)}
<div style="font:800 {w*.115:.0f}px/1.1 Kufam;white-space:nowrap">بروستد الشام</div>
<div style="font:500 {w*.03:.0f}px Inter;letter-spacing:.34em;direction:ltr;opacity:.8">BROASTED AL SHAM</div></div>{ablaq(h*band,stripe[0],stripe[1])}</section>'''
def side(i,w,h,bg,stripe,band_px):
    return f'<section id="{i}" style="width:{w}px;height:{h}px;background:{bg}">{ablaq(band_px,stripe[0],stripe[1])}</section>'
def plain(i,w,h,bg): return f'<section id="{i}" style="width:{w}px;height:{h}px;background:{bg}"></section>'
S=[]
# metal table bag (dark scene): red bag, cream logo
S+=[front('metal_front',1873,2465,R,C,K,(K,C)),side('metal_side',568,2298,R,(K,C),2465*.17*2298/2465),plain('metal_top',1885,382,R)]
# countertop bag: cream bag, charcoal logo with red comb
S+=[front('counter_front',998,1410,C,K,R,(K,C),lw=.4)]
# handle bag on tiles: cream bag
S+=[front('creatsy_front',1600,1600,C,K,R,(K,C),lw=.3,band=.15,ty=.43),side('creatsy_side',775,1600,C,(K,C),1600*.15)]
# sign
S.append(f'''<section id="sign" style="width:2700px;height:1255px;background:{R};color:{C};display:flex;align-items:center;justify-content:center;gap:90px">
{logo(400,C,K)}<div><div style="font:800 250px/1.15 Kufam;white-space:nowrap">بروستد الشام</div><div style="font:500 54px Inter;letter-spacing:.42em;direction:ltr;text-align:right;opacity:.85;margin-top:30px">BROASTED AL SHAM</div></div></section>''')
# fries pack (flat front)
S.append(f'''<section id="fries" style="width:1000px;height:1100px;background:{R};color:{C}">
<div style="position:absolute;left:0;right:0;top:330px;display:flex;flex-direction:column;align-items:center;gap:36px">{logo(280,C,K)}<div style="font:800 112px/1.1 Kufam;white-space:nowrap">بروستد الشام</div></div>{ablaq(150,K,C,2)}</section>''')
F='../node_modules/@fontsource'
open('designs.html','w').write(f'''<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><style>
@font-face{{font-family:Kufam;src:url({F}/kufam/files/kufam-arabic-800-normal.woff2);font-weight:800}}
@font-face{{font-family:Inter;src:url({F}/inter/files/inter-latin-500-normal.woff2);font-weight:500}}
*{{margin:0;padding:0;box-sizing:border-box}}section{{position:relative;overflow:hidden;margin-bottom:10px}}</style>'''+'\n'.join(S)+'</html>')
