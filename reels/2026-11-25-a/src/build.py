import json;c=json.load(open('caps.json'))
open('reel.html','w').write(open('reel.src.html').read().replace('/*CAPS*/',json.dumps(c,ensure_ascii=False)))
