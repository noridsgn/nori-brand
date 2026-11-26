// NORI animated background (26 Nov 2026, NORI: "the background must move and look beautiful").
// Layers over the concrete photo: drifting light pools, slow god-rays, floating gold dust + soft bokeh, pulses on key words.
// Usage: put <div id="bgfx"></div> right after #bgimg; call bgfxInit(PULSES) in init() and bgfx(t) in frame(t).
(function(){
const css=`#bgfx{position:absolute;inset:0;overflow:hidden;pointer-events:none}
#bgfx .pool{position:absolute;border-radius:50%;mix-blend-mode:screen;will-change:transform}
#bgfx .ray{position:absolute;left:-300px;top:-500px;height:2600px;transform-origin:50% 0;mix-blend-mode:screen;filter:blur(18px)}
#bgfx .d{position:absolute;border-radius:50%;background:#F5D58A}
#bgfx .bk{position:absolute;border-radius:50%;border:1.5px solid rgba(245,213,138,.35);background:radial-gradient(circle,rgba(245,213,138,.18),rgba(245,213,138,.04) 70%)}
#bgfx .sweep{position:absolute;left:-1200px;top:-400px;width:900px;height:2800px;background:linear-gradient(90deg,transparent,rgba(255,226,160,.16),transparent);transform:rotate(18deg);mix-blend-mode:screen;opacity:0}
#bgfx .floor{position:absolute;left:0;right:0;bottom:0;height:760px;background:linear-gradient(180deg,transparent,rgba(8,8,10,.55) 45%,rgba(6,6,8,.9))}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
let R=12345;const rnd=()=>{R=(R*16807)%2147483647;return R/2147483647;};
const POOLS=[[1100,'rgba(230,184,76,.20)',540,560,260,180,.11,.07],[900,'rgba(255,150,80,.12)',200,1100,220,260,.08,.13],[800,'rgba(90,160,190,.07)',900,1300,240,200,.1,.06],[700,'rgba(230,184,76,.10)',820,300,200,160,.14,.09]];
let D=[],B=[],PUL=[];
window.bgfxInit=function(pulses){PUL=pulses||[];const h=document.getElementById('bgfx');let s='';
 POOLS.forEach((p,i)=>s+=`<div class="pool" id="bp${i}" style="width:${p[0]}px;height:${p[0]}px;background:radial-gradient(circle,${p[1]},transparent 65%)"></div>`);
 for(let i=0;i<3;i++)s+=`<div class="ray" id="br${i}" style="width:${[260,160,340][i]}px;background:linear-gradient(180deg,rgba(255,220,150,${[.16,.12,.08][i]}),rgba(255,220,150,0) 80%)"></div>`;
 for(let i=0;i<70;i++){const z=rnd();D.push({x:rnd()*1080,y:rnd()*1920,z,sp:12+z*40,ph:rnd()*6.28,fr:.6+rnd()*1.6,sz:1.2+z*3.2});s+=`<div class="d" id="bd${i}"></div>`;}
 for(let i=0;i<9;i++){B.push({x:rnd()*1080,y:rnd()*1920,r:18+rnd()*46,sp:6+rnd()*14,ph:rnd()*6.28});s+=`<div class="bk" id="bb${i}"></div>`;}
 s+=`<div class="sweep" id="bsw"></div><div class="floor"></div>`;h.innerHTML=s;};
window.bgfx=function(t){
 POOLS.forEach((p,i)=>{const e=document.getElementById('bp'+i);e.style.transform=`translate(${p[2]-p[0]/2+p[4]*Math.sin(t*p[6]+i)}px,${p[3]-p[0]/2+p[5]*Math.cos(t*p[7]+i*2)}px) scale(${1+.08*Math.sin(t*.5+i)})`;});
 for(let i=0;i<3;i++){const e=document.getElementById('br'+i);e.style.left=([120,330,560][i])+'px';e.style.transform=`rotate(${-28+[0,6,11][i]+5*Math.sin(t*.21+i*1.7)}deg)`;e.style.opacity=.55+.45*Math.sin(t*.37+i*2.1);}
 D.forEach((d,i)=>{const e=document.getElementById('bd'+i);let y=(d.y-t*d.sp)%1980;if(y<-30)y+=1980;const x=d.x+22*Math.sin(t*.4*d.fr+d.ph);
  const tw=.25+.75*Math.pow(.5+.5*Math.sin(t*d.fr*2+d.ph),2);e.style.transform=`translate(${x}px,${y}px)`;e.style.width=e.style.height=d.sz+'px';
  e.style.opacity=(.15+.55*d.z)*tw;e.style.filter=d.z<.3?'blur(1px)':'';e.style.boxShadow=d.z>.7?'0 0 8px rgba(245,213,138,.8)':'';});
 B.forEach((b,i)=>{const e=document.getElementById('bb'+i);let y=(b.y-t*b.sp)%2040;if(y<-120)y+=2040;e.style.width=e.style.height=b.r*2+'px';
  e.style.transform=`translate(${b.x+30*Math.sin(t*.25+b.ph)}px,${y}px)`;e.style.opacity=.35+.3*Math.sin(t*.6+b.ph);e.style.filter=`blur(${2+b.r/14}px)`;});
 // pulses: a warm light sweep across the wall on key words
 let sw=0,sx=0;PUL.forEach(a=>{const p=(t-a)/1.1;if(p>0&&p<1){sw=Math.sin(p*Math.PI);sx=p;}});
 const e=document.getElementById('bsw');e.style.opacity=sw;e.style.transform=`translateX(${sx*3200}px) rotate(18deg)`;
};
})();
