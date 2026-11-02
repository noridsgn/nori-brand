const fs=require('fs');const {chromium}=require('playwright');
const B='/home/claude/nori-brand/logos/';const d=f=>'data:image/svg+xml;base64,'+fs.readFileSync(B+f).toString('base64');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+__dirname+'/reel3.html');
await p.evaluate(([w,l,a])=>{document.getElementById('mark').src=w;document.getElementById('logo').src=l;document.getElementById('dmav').src=a},[d('nori-mark-on-dark.svg'),d('nori-logo-stacked-on-dark.svg'),d('nori-avatar-1080.svg')]);
await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
await p.evaluate(()=>{frame(1.95);
 const h=document.getElementById('h1');h.style.top='390px';h.style.fontSize='138px';h.style.lineHeight='170px';
 h.innerHTML='<span class="w" style="opacity:1">بروفايلك</span><br><span class="w" style="opacity:1">يقرر بـ </span><span class="w g" style="opacity:1"><span class="n">5</span> ثواني</span>';
 document.getElementById('label').textContent='THE 5-SECOND TEST';document.getElementById('label').style.top='320px';
 const st=document.getElementById('st1');st.style.top='800px';
 document.getElementById('p1').style.transform='rotateY(-16deg) rotateX(6deg) scale(1.0)';
 // sparks fully on
 document.querySelectorAll('.sp').forEach((e,i)=>{e.style.opacity=.35+.6*((i*37)%10)/10});
});
await p.screenshot({path:__dirname+'/cover-A.png'});
await b.close();})();
