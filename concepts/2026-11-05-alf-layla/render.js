const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1440}});
await p.goto('file://'+process.cwd()+'/slides.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
for(let i=1;i<=10;i++){await p.locator('#s'+i).screenshot({path:`out/alf-${String(i).padStart(2,'0')}.png`});}
await b.close();})();
