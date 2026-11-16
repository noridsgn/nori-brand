// node render.js <reel.html> <outdir> <duration> [fps=30] [sub=4] [workers=4]  -> frames with sub-samples for real motion blur
// node render.js <reel.html> test <t1> <t2> ...   -> single stills t_<t>.png next to the html
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
(async()=>{const html=path.resolve(process.argv[2]);const dir=path.dirname(html);
const b=await chromium.launch({executablePath:fs.existsSync('/usr/bin/google-chrome')?'/usr/bin/google-chrome':undefined,args:['--font-render-hinting=none']});
const open=async()=>{const p=await b.newPage({viewport:{width:1080,height:1920}});await p.goto('file://'+html);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);await p.evaluate(()=>window.init&&init());return p;};
if(process.argv[3]==='test'){const p=await open();for(const t of process.argv.slice(4).map(Number)){await p.evaluate(t=>frame(t),t);await p.screenshot({path:`${dir}/t_${t}.png`});}}
else{const out=path.resolve(process.argv[3]),dur=parseFloat(process.argv[4]),fps=+(process.argv[5]||30),sub=+(process.argv[6]||4),W=+(process.argv[7]||4);
 fs.mkdirSync(out,{recursive:true});const n=Math.ceil(dur*fps);const jobs=[];for(let i=0;i<n;i++)for(let k=0;k<sub;k++)jobs.push([i*sub+k,i/fps+k*(0.5/fps)/sub]);
 let idx=0;await Promise.all([...Array(W)].map(async()=>{const p=await open();while(idx<jobs.length){const [j,t]=jobs[idx++];await p.evaluate(t=>frame(t),t);
  await p.screenshot({path:`${out}/f${String(j).padStart(6,'0')}.jpg`,type:'jpeg',quality:92});}}));console.log('frames',jobs.length);}
await b.close();})();
