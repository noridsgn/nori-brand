# The chicken tray came as a flat photo (no PSD): the pack is cut out by colour, its sample print painted out,
# and the artwork multiplied onto the pack's own shading. argv[1] = the photo.
import sys,cv2,numpy as np
im=cv2.imread(sys.argv[1]);hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV).astype(int);H,Sa,V=hsv[...,0],hsv[...,1],hsv[...,2]
roi=np.zeros(im.shape[:2],bool);roi[560:1380,1245:1960]=True
yel=(H>=15)&(H<=27)&(Sa>150)&(V>150)&roi;grn=(H>=60)&(H<=95)&(Sa>60)&roi
m=cv2.morphologyEx(((yel|grn)*255).astype(np.uint8),cv2.MORPH_CLOSE,np.ones((15,15),np.uint8))
n,lab,st,_=cv2.connectedComponentsWithStats(m);m=((lab==1+np.argmax(st[1:,4]))*255).astype(np.uint8)
c,_=cv2.findContours(m,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE);pack=np.zeros_like(m);cv2.drawContours(pack,c,-1,255,-1)
# paint out the sample print, then keep only the pack's light and shadow
pr=cv2.dilate((grn*255).astype(np.uint8),np.ones((9,9),np.uint8))
cv2.circle(pr,(1425,881),74,255,-1)  # the sample stamp
chick=cv2.dilate((((H<15)&(Sa>110)&(hsv[...,2]>60))*255).astype(np.uint8),np.ones((5,5),np.uint8));chick[:,1320:]=0
pack[chick>0]=0
clean=cv2.inpaint(im,pr,7,cv2.INPAINT_TELEA)
shade=cv2.cvtColor(clean,cv2.COLOR_BGR2HSV)[...,2].astype(np.float32)/255
shade=cv2.GaussianBlur(shade,(0,0),1.2);ref=np.percentile(shade[pack>0],80);shade=np.clip(shade/ref,0,1.12)
d=cv2.imread('designs/fries.png');h,w=d.shape[:2]
quad=np.float32([[1244,605],[1931,611],[1881,1342],[1269,1330]])
P=cv2.getPerspectiveTransform(np.float32([[0,0],[w,0],[w,h],[0,h]]),quad)
art=cv2.warpPerspective(d,P,(im.shape[1],im.shape[0]),flags=cv2.INTER_CUBIC,borderMode=cv2.BORDER_REPLICATE)
out=im.astype(np.float32)
a=cv2.GaussianBlur(pack,(0,0),1.0).astype(np.float32)[...,None]/255
out=out*(1-a)+(art.astype(np.float32)*shade[...,None])*a
# orange table -> charcoal (only the part connected to the photo's edge, so the chicken is untouched)
org=((H<=14)&(Sa>120)).astype(np.uint8)
n,lab=cv2.connectedComponents(org);edge=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
bg=np.isin(lab,list(edge)).astype(np.uint8)*255
bg=cv2.morphologyEx(bg,cv2.MORPH_CLOSE,np.ones((7,7),np.uint8));ba=cv2.GaussianBlur(bg,(0,0),1.5).astype(np.float32)[...,None]/255
v=V.astype(np.float32)/255;v=v/np.percentile(v[bg>0],60)
char=np.array([0x26,0x2B,0x34],np.float32)  # BGR, a touch lifted so the tray shadow still reads
out=out*(1-ba)+(char*v[...,None]**1.6)*ba
cv2.imwrite('out/tray.png',np.clip(out,0,255).astype(np.uint8))
