// Reel «دلّة» (24 Nov 2026): the dallah spout becomes «د», then lands on the cup. No voice, light sfx. Same day as the concept post.
// node build.js → reel.html + cover.html (shapes reused from posts/_generator/concept-dalla-v2.js)
const fs = require('fs'), path = require('path');
const gen = fs.readFileSync(path.join(__dirname, '../../../posts/_generator/concept-dalla-v2.js'), 'utf8');
const head = gen.slice(gen.indexOf("const AR ="), gen.indexOf('const S = [];'));
const objs = gen.slice(gen.indexOf('const thermos ='), gen.indexOf('const profile ='));
const F = new Function('fs', 'path', '__dirname', head + objs + 'return {FONTS,G,GD,SAF,CR,BR,BRL,GO,MARK,markSvg,DALLAH_SIL,BADGES,CUP,ON,thermos,bag};');
const K = F(fs, path, path.join(__dirname, '../../../posts/_generator'));
const { FONTS, G, SAF, CR, BR, GO, MARK, markSvg, DALLAH_SIL, BADGES, CUP, ON, thermos, bag } = K;

// badge without name text (the reel shows shapes only)
const badge = i => `<svg width="240" height="240" viewBox="0 0 200 200">${BADGES[i]}<g transform="translate(46 22) scale(.56)">${DALLAH_SIL()}</g></svg>`;
// dallah body (no spout) + spout alone, same 200 box as the carousel
const BODY = `<g fill="none" stroke="#F2F0EB" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" opacity=".9">
  <circle cx="104" cy="20" r="5"/><path d="M104 25 L104 32"/><path d="M90 34 Q104 28 118 34 L114 54 Q104 58 94 54 Z"/>
  <path d="M96 56 L92 78 Q72 96 72 128 Q72 160 104 168 Q136 160 136 128 Q136 96 116 78 L112 56"/><path d="M76 170 L132 170"/>
  <path d="M136 104 Q162 100 158 132 Q154 152 132 152"/></g>`;
const SPOUT = `<path d="M78 98 C64 78 46 64 16 58 Q40 70 72 118 Z" fill="${SAF}"/>`;
const svg = (s, inner) => `<svg width="${s}" height="${s}" viewBox="0 0 200 200" style="display:block">${inner}</svg>`;
const markOnly = (fg, acc) => svg(420, `<g transform="translate(14 -6)">${MARK(fg, acc)}</g>`);

const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../../tools/reel-base.css">${FONTS}
<style>
#amb{position:absolute;inset:0;background:radial-gradient(760px 620px at 50% 48%,rgba(47,90,65,.0),transparent 70%)}
.h{position:absolute;left:0;top:300px;width:1080px;text-align:center;direction:rtl;font-weight:700;font-size:84px;line-height:1.2;white-space:nowrap;opacity:0;z-index:30}
.h em{font-style:normal;color:var(--gold)}
.it{position:absolute;transform-origin:0 0}
#floor{position:absolute;left:0;top:1250px;width:1080px;height:300px;background:linear-gradient(rgba(255,255,255,.035),transparent);border-top:1px solid rgba(255,255,255,.06);-webkit-mask-image:linear-gradient(90deg,transparent,#000 20%,#000 80%,transparent);opacity:0}
#end{position:absolute;left:0;top:700px;width:1080px;text-align:center;opacity:0;direction:rtl}
#end .nm{font:700 72px Plex;margin-top:40px}
#end .sb{font:500 34px Plex;color:var(--grey);margin-top:14px}
#end .hd{font:600 34px Inter;margin-top:56px;letter-spacing:1px}
#end .bt{display:inline-block;margin-top:34px;border:2px solid var(--gold);padding:18px 40px;font:700 38px Plex}
</style></head><body>
<div id="bg"></div><div id="dots"></div><div id="amb"></div>
<div id="lab">NORI <b>·</b> CONCEPT</div>
<div class="h" id="h0">كل قهوة عربية… <em>نفس الدلّة</em></div>
<div class="h" id="h1">بوز الدلّة… صار <em>«د»</em></div>
<div class="h" id="h2">وعلى <em>الكوب</em></div>
<div class="h" id="h3">رمز واحد… <em>بكل مكان</em></div>
<div id="stage">
 ${[0, 1, 2].map(i => `<div class="it" id="b${i}" style="left:${70 + i * 330}px;top:780px">${badge([0, 3, 1][i])}</div>`).join('')}
 <div class="it" id="body" style="left:240px;top:620px">${svg(600, BODY)}</div>
 <div class="it" id="spout" style="left:240px;top:620px;transform-origin:300px 300px">${svg(600, SPOUT)}</div>
 <div class="it" id="tile" style="z-index:5;left:330px;top:710px;width:420px;height:420px;border-radius:64px;overflow:hidden;background:${G};box-shadow:0 40px 90px rgba(0,0,0,.6)">${markOnly(CR, SAF)}</div>
 <div id="floor"></div>
 <div class="it" id="bag" style="left:70px;top:860px">${bag}</div>
 <div class="it" id="sc" style="left:690px;top:1042px">${CUP(130, CR, G, ON(CR, SAF), '#F7F2E8')}</div>
 <div class="it" id="th" style="left:860px;top:920px">${thermos}</div>
 <div class="it" id="cup" style="left:310px;top:560px">${CUP(460, G, CR, '')}
   <div class="it" id="cm" style="left:0;top:0">${markOnly(G, SAF)}</div></div>
 <div id="end"><div style="display:inline-block;width:260px;height:260px;border-radius:50%;padding:8px;background:linear-gradient(135deg,${SAF},${G})"><div style="width:244px;height:244px;border-radius:50%;overflow:hidden;border:6px solid #0C0C0E">${markSvg(232, G)}</div></div>
  <div class="nm">دلّة</div><div class="sb">براند وهمي سويناه للتوضيح</div>
  <div class="bt">الكونسبت كامل بالبوست</div><div class="hd" style="direction:ltr">@nori.dsgn</div></div>
</div>
<div id="vig"></div>
<script>
const cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),P=(t,a,d)=>cl((t-a)/d),eo=x=>1-Math.pow(1-x,3),ee=x=>x<.5?16*x**5:1-Math.pow(-2*x+2,5)/2,
 back=x=>{const c1=1.7,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)},lerp=(a,b,x)=>a+(b-a)*x,$=id=>document.getElementById(id);
function S(id,o){const e=$(id);const op=o.o===undefined?1:cl(o.o);e.style.opacity=op;e.style.visibility=op<.003?'hidden':'visible';
 e.style.transform='translate('+(o.x||0)+'px,'+(o.y||0)+'px) rotate('+(o.r||0)+'deg) scale('+(o.s===undefined?1:o.s)+')';e.style.filter=(o.b>.2?'blur('+o.b.toFixed(1)+'px)':'');}
function title(id,a,b){const i=P(window.T,a,.4),u=P(window.T,b,.25);S(id,{o:eo(i)*(1-u),y:lerp(30,0,eo(i))-u*20,b:(1-i)*10+u*10});}
function frame(t){window.T=t;
 title('h0',.15,2.05);title('h1',2.45,4.45);title('h2',4.75,7.45);title('h3',7.9,10.05);
 // A: three look-alike badges
 [0,1,2].forEach(i=>{const a=.3+i*.18,p=P(t,a,.5),u=P(t,1.95+i*.05,.35);S('b'+i,{o:cl(p*2.5)*(1-u),y:lerp(70,0,back(p))+u*40,s:lerp(.85,1,back(p))*(1-u*.15),b:(1-cl(p*1.6))*12+u*14});});
 // B: dallah, body leaves, spout turns into the mark tile
 const bi=P(t,2.2,.5),bo=P(t,3.05,.4);S('body',{o:eo(bi)*(1-eo(bo)),s:lerp(.92,1,eo(bi))*lerp(1,1.08,eo(bo)),b:(1-bi)*10+bo*16});
 const si=P(t,2.2,.5),sm=ee(P(t,3.0,.7)),so=P(t,3.55,.25);S('spout',{o:eo(si)*(1-so),r:lerp(0,-14,sm),s:lerp(1,1.35,sm),x:lerp(0,40,sm),y:lerp(0,-20,sm),b:so*12});
 const ti=P(t,3.5,.55);
 // C: tile flies onto the cup sleeve
 const fl=ee(P(t,5.55,.75));
 const tileVis=t<6.3?1:0;S('tile',{o:eo(ti)*tileVis*(1-P(t,6.0,.3)),s:lerp(.7,1,back(ti))*lerp(1,.602,fl),x:lerp(0,83.5,fl),y:lerp(0,135,fl),b:(1-cl(ti*1.6))*12});
 $('tile').style.transformOrigin='0 0';
 // cup: whip in from the right, stamp, then go to its place in the line-up
 const ci=P(t,4.65,.6),st=P(t,6.25,.35),cd=ee(P(t,7.75,.9)),cx=lerp(900,0,eo(ci));
 const stamp=1-Math.sin(st*Math.PI)*.025;
 S('cup',{o:cl(ci*3),x:cx+lerp(0,130,cd),y:lerp(0,354,cd),s:stamp*lerp(1,.4565,cd),b:(1-cl(ci*1.4))*22});
 // cup mark: invisible until the tile lands (coords in cup box: 103.5,285 size 253)
 S('cm',{o:P(t,6.05,.25),x:103.5,y:285,s:.602*(1+Math.sin(st*Math.PI)*.04)});
 // D: line-up
 [['bag',8.05,-1],['sc',8.25,1],['th',8.4,1]].forEach(([id,a,d])=>{const p=P(t,a,.55);S(id,{o:cl(p*2.5)*(1-P(t,10.1,.3)),x:lerp(d*260,0,eo(p)),b:(1-cl(p*1.6))*16+P(t,10.1,.3)*14});});
 $('floor').style.opacity=eo(P(t,7.9,.6))*(1-P(t,10.1,.3));
 const co=P(t,10.1,.3);if(t>10.1){const e=$('cup');e.style.opacity=1-co;e.style.filter='blur('+(co*14).toFixed(1)+'px)';}
 // E: end card
 const en=P(t,10.35,.6);S('end',{o:eo(en),y:lerp(50,0,eo(en)),b:(1-en)*12});
 $('lab').style.opacity=1-P(t,10.1,.3);
}
frame(0);
</script></body></html>`;
fs.writeFileSync(path.join(__dirname, 'reel.html'), html);

// cover (designed separately, text + visual inside the 3:4 crop = y 240..1680)
const cover = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../../tools/reel-base.css">${FONTS}
<style>.t{position:absolute;left:0;width:1080px;text-align:center;direction:rtl;font-weight:700}</style></head><body>
<div id="bg"></div><div id="dots"></div>
<div id="lab" style="top:330px">NORI <b>·</b> CONCEPT</div>
<div class="t" style="top:400px;font-size:110px;line-height:1.15">بوز الدلّة<br>صار <span class="gold">«د»</span></div>
<div style="position:absolute;left:90px;top:790px;width:900px;display:flex;align-items:center;justify-content:space-between;direction:ltr">
  <div style="width:380px;height:380px;background:#17171B;border-radius:40px;display:flex;align-items:center;justify-content:center">${svg(320, BODY + SPOUT)}</div>
  <svg width="90" height="40" viewBox="0 0 90 40"><path d="M6 20H80M66 6l14 14-14 14" fill="none" stroke="#8D8D93" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <div style="width:380px;height:380px;border-radius:40px;overflow:hidden">${markSvg(380, G)}</div>
</div>
<div class="t" style="top:1260px;font-size:44px;font-weight:500;color:var(--grey)">براند وهمي · هوية كاملة</div>
<div id="vig"></div></body></html>`;
fs.writeFileSync(path.join(__dirname, 'cover.html'), cover);
console.log('ok');
