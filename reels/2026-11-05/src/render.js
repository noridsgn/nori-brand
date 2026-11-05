const fs=require('fs');const {chromium}=require('playwright');
(async()=>{const mode=process.argv[2];const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+__dirname+'/reel.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
if(mode==='test'){for(const t of process.argv.slice(3).map(Number)){await p.evaluate(t=>frame(t),t);await p.screenshot({path:`${__dirname}/t_${t}.png`});}}
else{const fps=30,dur=parseFloat(process.argv[3]);fs.mkdirSync(__dirname+'/frames',{recursive:true});const n=Math.ceil(dur*fps);
for(let i=0;i<n;i++){await p.evaluate(t=>frame(t),i/fps);await p.screenshot({path:`${__dirname}/frames/f${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:90});}console.log('frames',n);}
await b.close();})();
