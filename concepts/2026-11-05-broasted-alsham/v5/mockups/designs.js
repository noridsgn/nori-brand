const {chromium}=require('playwright');const fs=require('fs');(async()=>{fs.mkdirSync('designs',{recursive:true});
const fb='/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';const exe=process.env.CHROME||(fs.existsSync(fb)?fb:undefined);
const b=await chromium.launch(exe?{executablePath:exe}:{});const p=await b.newPage({viewport:{width:2800,height:2600}});
await p.goto('file://'+process.cwd()+'/designs.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
for(const id of await p.$$eval('section',s=>s.map(e=>e.id)))await p.locator('#'+id).screenshot({path:`designs/${id}.png`});
await b.close();})();
