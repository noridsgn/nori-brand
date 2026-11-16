// NORI reel engine (16 Nov 2026): cursor-driven dark UI motion. Deterministic: frame(t) draws time t.
const cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const P=(t,a,d)=>cl((t-a)/d);
const eo=x=>1-Math.pow(1-x,3);
const eio=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const back=x=>{const c1=1.5,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
const lerp=(a,b,x)=>a+(b-a)*x;
const $=id=>document.getElementById(id);
function S(id,o){const e=typeof id==='string'?$(id):id;if(!e)return;const op=o.o===undefined?1:cl(o.o);
 e.style.opacity=op;e.style.visibility=op<=0.002?'hidden':'visible';
 e.style.transform=`translate(${o.x||0}px,${o.y||0}px) rotate(${o.r||0}deg) scale(${o.s===undefined?1:o.s})`;
 e.style.filter=(o.blur>0.2?`blur(${o.blur.toFixed(1)}px) `:'')+(o.f||'');}
// spring-in at a, soft-out at b
function pop(t,a,b,q={}){const d=q.d||.55,dy=q.dy===undefined?46:q.dy,dx=q.dx||0;const i=P(t,a,d),u=b===undefined?0:P(t,b,q.out||.32);
 return {o:cl(i*2.6)*(1-eo(u)),x:lerp(dx,0,back(i)),y:lerp(dy,0,back(i))-eo(u)*26,s:lerp(q.s0||.88,1,back(i))*(1-eo(u)*.06),blur:(1-cl(i*1.7))*12+eo(u)*10};}
function keys(t,K){if(t<=K[0][0])return K[0].slice(1);for(let i=1;i<K.length;i++){if(t<=K[i][0]){const a=K[i-1],b=K[i];const x=eio(P(t,a[0],b[0]-a[0]));return a.slice(1).map((v,j)=>lerp(v,b[j+1],x));}}return K[K.length-1].slice(1);}
function mixc(a,b,x){const h=c=>[1,3,5].map(i=>parseInt(c.substr(i,2),16));const A=h(a),B=h(b);return 'rgb('+A.map((v,i)=>Math.round(lerp(v,B[i],x))).join(',')+')';}
// cursor: CUR=[[t,x,y],...] CLICKS=[t,...]
function cursor(t,CUR,CLICKS){const [x,y]=keys(t,CUR);let s=1;const rings=document.querySelectorAll('.ring');
 CLICKS.forEach((c,i)=>{const d=t-c;if(d>-0.08&&d<0.18)s=Math.min(s,1-0.2*Math.sin(cl((d+0.08)/0.26)*Math.PI));
  const r=rings[i];if(!r)return;const p=P(t,c,.5);const [cx,cy]=keys(c,CUR);
  r.style.opacity=(p>0&&p<1)?(1-p)*.9:0;r.style.transform=`translate(${cx-60}px,${cy-60}px) scale(${lerp(.25,1.25,eo(p))})`;});
 const c=$('cur');c.style.transform=`translate(${x}px,${y}px) scale(${s})`;}
function mkRings(n){const st=$('stage');for(let i=0;i<n;i++){const d=document.createElement('div');d.className='ring';st.insertBefore(d,$('cur'));}}
// camera: CAM=[[t,scale,cx,cy]] focus point goes to (540,760)
function camera(t,CAM){const [s,cx,cy]=keys(t,CAM);$('stage').style.transform=`translate(${540-cx*s}px,${760-cy*s}px) scale(${s})`;}
// captions: CAP=[{a,b,w:[[text,time,gold]]}]
function mkCaps(CAP){const box=$('capbox');CAP.forEach((c,i)=>{const d=document.createElement('div');d.className='cap';d.id='cap'+i;
 d.innerHTML=c.w.map(w=>`<span class="${w[2]?'g':''}">${w[0]}</span>`).join(' ');box.appendChild(d);});}
function caps(t,CAP){CAP.forEach((c,i)=>{const d=$('cap'+i);const b=c.b!==undefined?c.b:(CAP[i+1]?CAP[i+1].a:1e9);
 const on=t>=c.a-.08&&t<b-.02;const i0=P(t,c.a-.08,.22),u=P(t,b-.14,.12);
 d.style.opacity=on?eo(i0)*(1-u):0;d.style.visibility=on?'visible':'hidden';d.style.transform=`translate(-50%,${lerp(18,0,eo(i0))}px) scale(${lerp(.96,1,eo(i0))})`;
 [...d.children].forEach((sp,j)=>{const p=eo(P(t,c.w[j][1]-.05,.2));sp.style.opacity=lerp(.28,1,p);sp.style.transform=`translateY(${lerp(6,0,p)}px)`;});});}
// --- After Effects style curves (16 Nov, NORI: whip pan, smear, warp, match cut, easy ease) ---
const ee=x=>x<.5?16*x*x*x*x*x:1-Math.pow(-2*x+2,5)/2;      // heavy easy-ease (graph editor S-curve)
const ein=x=>x*x*x*x;                                       // speed-ramp in
const eout=x=>1-Math.pow(1-x,4);                            // speed-ramp out
function keysE(t,K){if(t<=K[0][0])return K[0].slice(1);for(let i=1;i<K.length;i++){if(t<=K[i][0]){const a=K[i-1],b=K[i];const x=ee(P(t,a[0],b[0]-a[0]));return a.slice(1).map((v,j)=>lerp(v,b[j+1],x));}}return K[K.length-1].slice(1);}
// scene group transition. a=enter time, b=exit time. types: whipL whipR whipU whipD zoom pop cut
function G(id,t,a,b,tin='pop',tout='pop'){let x=0,y=0,s=1,o=1,r=0,blur=0,sk=0;const DI=.34,DO=.2;
 if(t<a){const p=P(t,a-DI,DI),q=1-eout(p);o=p>0?1:0;
  if(tin==='whipL')x=1500*q; else if(tin==='whipR')x=-1500*q; else if(tin==='whipU')y=2100*q; else if(tin==='whipD')y=-2100*q;
  else if(tin==='zoom'){s=lerp(.45,1,eout(p));o=cl(p*3);blur=q*14;} else if(tin==='pop'){s=lerp(.86,1,back(p));y=40*q;o=cl(p*2.5);blur=q*10;}
  else if(tin==='cut'){o=p>=1?1:0;}
  if(tin.startsWith('whip')){sk=(tin==='whipL'?-1:tin==='whipR'?1:0)*10*q;s=1+.12*q;blur=Math.sin(p*Math.PI)*20+q*8;}}
 else if(b!==undefined&&t>b-DO){const p=P(t,b-DO,DO),q=ein(p);o=p<1?1:0;
  if(tout==='whipL')x=-1500*q; else if(tout==='whipR')x=1500*q; else if(tout==='whipU')y=-2100*q; else if(tout==='whipD')y=2100*q;
  else if(tout==='zoom'){s=lerp(1,2.3,q);o=1-cl((p-.45)*2);blur=q*16;} else if(tout==='pop'){s=1-.08*q;o=1-eo(p);blur=q*10;y=-24*q;}
  else if(tout==='cut'){o=p>=1?0:1;}
  if(tout.startsWith('whip')){sk=(tout==='whipL'?-1:tout==='whipR'?1:0)*12*q;s=1+.14*q;blur=q*26;}}
 const e=$(id);e.style.opacity=o;e.style.visibility=o<=0.002?'hidden':'visible';
 e.style.transform=`translate(${x}px,${y}px) skewX(${sk}deg) scale(${s})`;e.style.filter=blur>0.3?`blur(${blur.toFixed(1)}px)`:'';}
// centre of an element in stage coords (call at init, before any transform)
function C(id,fx=.5,fy=.5){const r=$(id).getBoundingClientRect();return [r.left+r.width*fx,r.top+r.height*fy];}

// smear: blur an element by its own speed (px/s), like AE motion blur on a fast layer
function smear(t,K,max=16){const a=keysE(t-.012,K),b=keysE(t+.012,K);const v=Math.hypot(b[0]-a[0],b[1]-a[1])/.024;return Math.min(max,v/260);}
