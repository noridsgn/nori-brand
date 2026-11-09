import json
p=json.load(open('paths.json'))
sym=f'''<symbol id="logo" viewBox="250 180 410 540"><path d="{p['comb']}" style="fill:var(--comb,#3c3c3c)"/><path d="{p['body']}" style="fill:var(--body,#000)"/></symbol>
<symbol id="waw" viewBox="250 180 410 540"><path d="{p['body']}" style="fill:var(--body,#000)"/></symbol>'''
open('slides.html','w').write(open('slides.tpl.html').read().replace('{SYM}',sym))
