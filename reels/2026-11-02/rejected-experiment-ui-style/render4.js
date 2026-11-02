const fs=require('fs');const {chromium}=require('playwright');
const B='/home/claude/nori-brand/logos/';const d=f=>'data:image/svg+xml;base64,'+fs.readFileSync(B+f).toString('base64');
(async()=>{const mode=process.argv[2];const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+__dirname+'/reel4.html');
await p.evaluate(([w,l])=>{document.getElementById('wm').src=w;document.getElementById('logo').src=l},[d('nori-watermark-dark.svg'),d('nori-logo-stacked-on-light.svg')]);
await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
if(mode==='test'){for(const t of process.argv.slice(3).map(Number)){await p.evaluate(t=>frame(t),t);await p.screenshot({path:`${__dirname}/t4_${t}.png`})}}
else{const dur=parseFloat(process.argv[3]);fs.mkdirSync(__dirname+'/frames4',{recursive:true});const n=Math.ceil(dur*30);
for(let i=0;i<n;i++){await p.evaluate(t=>frame(t),i/30);await p.screenshot({path:`${__dirname}/frames4/f${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:92})}console.log('frames',n)}
await b.close()})();
