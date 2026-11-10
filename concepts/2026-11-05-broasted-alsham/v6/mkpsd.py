# layered PSD per slide from layers/ (run layers.js first); checks the flattened PSD against out/
import json,os,numpy as np
from PIL import Image
from psd_tools import PSDImage
from psd_tools.constants import Tag
names=json.load(open('layers/names.json'));os.makedirs('psd',exist_ok=True)
for i,ns in names.items():
    psd=PSDImage.new('RGB',(1080,1440));comp=Image.new('RGBA',(1080,1440),(0,0,0,0))
    for k,nm in enumerate(ns):
        im=Image.open(f'layers/{i}/{k:02d}.png').convert('RGBA');bb=im.getbbox()
        if not bb: continue
        L=psd.create_pixel_layer(im.crop(bb),name=f'L{k:02d}',top=bb[1],left=bb[0])
        L._record.tagged_blocks.set_data(Tag.UNICODE_LAYER_NAME,f'{k:02d} {nm}')  # Arabic name (the legacy name field is Mac Roman only)
        comp=Image.alpha_composite(comp,im)
    f=f'psd/broasted-{int(i):02d}.psd';psd.save(f)
    ref=np.asarray(Image.open(f'out/broasted-{int(i):02d}.png').convert('RGB')).astype(int)
    d=np.abs(np.asarray(comp.convert('RGB')).astype(int)-ref)
    print(f,len(list(PSDImage.open(f))),'layers','maxdiff',d.max(),'mean',round(d.mean(),4))
