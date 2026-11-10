// one transparent PNG per direct child of each slide -> layers/<n>/<k>.png + names.json (for mkpsd.py)
const {chromium}=require('playwright');const fs=require('fs');(async()=>{
const fb='/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';const exe=process.env.CHROME||(fs.existsSync(fb)?fb:undefined);
const b=await chromium.launch(exe?{executablePath:exe}:{});const p=await b.newPage({viewport:{width:1080,height:1440}});
await p.goto('file://'+process.cwd()+'/slides.html');await p.evaluate(()=>document.fonts.ready);await p.waitForSelector('body[data-ready]');await p.waitForTimeout(500);
await p.addStyleTag({content:'body{background:transparent!important}.slide{background:transparent!important}'});
const names={};
for(let i=2;i<=10;i++){const d=`layers/${i}`;fs.mkdirSync(d,{recursive:true});
 const n=await p.evaluate(i=>document.querySelectorAll('#s'+i+'>*').length,i);names[i]=[];
 for(let k=0;k<n;k++){
  const nm=await p.evaluate(([i,k])=>{const c=[...document.querySelectorAll('#s'+i+'>*')];c.forEach((e,j)=>e.style.visibility=j===k?'visible':'hidden');
   const e=c[k];let t=(e.innerText||'').replace(/\s+/g,' ').trim().split(' ').slice(0,4).join(' ');
   if(e.classList.contains('bg'))t='الخلفية';if(!t)t=e.tagName==='svg'?'رسمة':'عنصر';return t;},[i,k]);
  names[i].push(nm);await p.locator('#s'+i).screenshot({path:`${d}/${String(k).padStart(2,'0')}.png`,omitBackground:true});}
 await p.evaluate(i=>document.querySelectorAll('#s'+i+'>*').forEach(e=>e.style.visibility=''),i);}
fs.writeFileSync('layers/names.json',JSON.stringify(names));await b.close();})();
