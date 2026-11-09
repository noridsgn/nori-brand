const {chromium}=require('playwright');const fs=require('fs');(async()=>{fs.mkdirSync('out',{recursive:true});
const fb='/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';const exe=process.env.CHROME||(fs.existsSync(fb)?fb:undefined);const b=await chromium.launch(exe?{executablePath:exe}:{});const p=await b.newPage({viewport:{width:1080,height:1440}});
await p.goto('file://'+process.cwd()+'/slides.html');await p.evaluate(()=>document.fonts.ready);await p.waitForSelector('body[data-ready]');await p.waitForTimeout(500);
for(let i=2;i<=10;i++){await p.locator('#s'+i).screenshot({path:`out/broasted-${String(i).padStart(2,'0')}.png`});}
await b.close();})();
