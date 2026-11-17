from PIL import Image
import glob,os
os.makedirs('final',exist_ok=True)
for i in range(1,11):
    im=Image.open(f'out/s{i}.png').convert('RGB').resize((1080,1440),Image.LANCZOS)
    im.save(f'final/mark-{i:02d}.jpg',quality=95,subsampling=0)
for k,(a,b) in enumerate(((1,5),(6,10))):
    c=Image.new('RGB',(540*5,720))
    for j,i in enumerate(range(a,b+1)): c.paste(Image.open(f'final/mark-{i:02d}.jpg').resize((540,720),Image.LANCZOS),(j*540,0))
    c.save(f'/tmp/sl{k}.jpg',quality=90)
