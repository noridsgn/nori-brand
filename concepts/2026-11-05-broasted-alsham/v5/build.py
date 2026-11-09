import json,re
p=json.load(open('paths.json'))
eye='<rect x="451" y="452" width="67" height="63" style="fill:var(--eye,#E9B04A)"/>'
sym=f'''<symbol id="logo" viewBox="250 180 410 540"><path d="{p['comb']}" style="fill:var(--comb,#3c3c3c)"/><path d="{p['body']}" style="fill:var(--body,#000)"/></symbol>
<symbol id="rooster" viewBox="250 180 410 540"><path d="{p['comb']}" style="fill:var(--comb,#3c3c3c)"/><path d="{p['body']}" style="fill:var(--body,#000)"/>{eye}</symbol>
<symbol id="waw" viewBox="250 180 410 540"><path d="{p['body']}" style="fill:var(--body,#000)"/></symbol>'''
# the 20 stones of the waw on its 5x6 grid (eye drawn separately in gold)
xs=[328,391,451,518,584,647];ys=[323,386,452,515,586,642,710]
rows=['11111','10011','10001','11001','00001','11111']
st=''.join(f'<rect x="{xs[c]}" y="{ys[r]}" width="{xs[c+1]-xs[c]}" height="{ys[r+1]-ys[r]}"/>' for r in range(6) for c in range(5) if rows[r][c]=='1')
t=open('slides.tpl.html').read().replace('{SYM}',sym).replace('{COMB}',p['comb']).replace('{STONES}',st)
open('slides.html','w').write(t)
