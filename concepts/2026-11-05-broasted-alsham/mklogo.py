import json
S=json.load(open('shaped.json'))
waw=[i for i in S['بروستد']['items'] if i['name']=='uni0648'][0]
def mark(fill,beak,pupil):
    # rooster built on the waw glyph (glyph units, y up)
    return (f'<path d="{waw["d"]}" fill="{fill}"/>'
      f'<ellipse cx="192" cy="352" rx="112" ry="44" fill="{fill}"/><circle cx="105" cy="352" r="50" fill="{fill}"/><circle cx="190" cy="418" r="58" fill="{fill}"/><circle cx="280" cy="388" r="46" fill="{fill}"/>'
      f'<path d="M48 248 L-78 196 L38 150 Z" fill="{beak}"/>'
      f'<circle cx="168" cy="208" r="15" fill="{pupil}"/>')
def word(t,fill,skip_waw=False,dx=0,dy=0):
    s=''
    for i in S[t]['items']:
        if skip_waw and i['name']=='uni0648': continue
        s+=f'<path d="{i["d"]}" transform="translate({i["x"]+dx},{dy})" fill="{fill}"/>'
    return s
def lockup1(fill,beak,pupil):
    # one line: الشام (left) + space + بروستد (right) ; visual LTR
    w2=S['الشام']['w']; gap=260
    s=word('الشام',fill,dx=-80)
    for i in S['بروستد']['items']:
        if i['name']=='uni0648': continue
        sh=-80 if i['x']<waw['x'] else 0
        s+=f'<path d="{i["d"]}" transform="translate({i["x"]+w2+gap+sh},0)" fill="{fill}"/>'
    s+=f'<g transform="translate({w2+gap+waw["x"]},0)">{mark(fill,beak,pupil)}</g>'
    W=w2+gap+S['بروستد']['w']
    return f'<g transform="scale(1,-1)">{s}</g>',W
def symbol(fill,beak,pupil):
    return f'<g transform="scale(1,-1)">{mark(fill,beak,pupil)}</g>'
if __name__=='__main__':
    R='#D7261E';C='#FFF4E2';K='#1E1A17';G='#F2B53A'
    l1,W=lockup1(R,G,K); l2,_=lockup1(C,G,K)
    sym=symbol(R,G,K); symc=symbol(C,G,R)
    html=f'''<!doctype html><html><meta charset="utf-8"><body style="margin:0;background:#ddd;width:1600px;font-family:sans-serif">
<div style="display:flex;flex-wrap:wrap">
<div style="width:533px;height:560px;background:{C};display:grid;place-items:center"><svg viewBox="-110 -500 500 780" width="300" height="468">{sym}</svg></div>
<div style="width:534px;height:560px;background:{R};display:grid;place-items:center"><svg viewBox="-110 -500 500 780" width="300" height="468">{symc}</svg></div>
<div style="width:533px;height:560px;background:{C};display:grid;place-items:center"><div style="width:300px;height:300px;border-radius:70px;background:{R};display:grid;place-items:center"><svg viewBox="-110 -500 500 780" width="170" height="265">{symc}</svg></div></div>
<div style="width:1600px;height:400px;background:{C};display:grid;place-items:center"><svg viewBox="-100 -560 {W+200} 900" width="1300" height="{int(1300*900/(W+200))}">{l1}</svg></div>
<div style="width:1600px;height:400px;background:{R};display:grid;place-items:center"><svg viewBox="-100 -560 {W+200} 900" width="1300" height="{int(1300*900/(W+200))}">{l2}</svg></div>
</div></body></html>'''
    open('logosheet.html','w').write(html)
    json.dump({'lock_red':l1,'lock_cream':l2,'W':W,'sym_red':sym,'sym_cream':symc},open('logo.json','w'),ensure_ascii=False)
