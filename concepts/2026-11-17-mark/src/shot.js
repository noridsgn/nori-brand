// node shot.js file.html outdir [scale]  -> screenshots every element with [data-shot]
const {chromium}=require('playwright-core');const fs=require('fs');(async()=>{
const [,, file,out,scale]=process.argv;fs.mkdirSync(out,{recursive:true});
const fb='/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b=await chromium.launch({executablePath:fs.existsSync(fb)?fb:'/usr/bin/google-chrome',args:['--allow-file-access-from-files']});
const p=await b.newPage({viewport:{width:1400,height:1000},deviceScaleFactor:+(scale||1)});
await p.goto('file://'+require('path').resolve(file));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
const ids=await p.$$eval('[data-shot]',e=>e.map(x=>x.id));
for(const id of ids){await p.locator('#'+id).screenshot({path:`${out}/${id}.png`,omitBackground:true});}
console.log(ids.join(' '));await b.close();})();
