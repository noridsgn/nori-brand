const fs = require('fs');
const { chromium } = require('playwright');
const B = '/home/claude/nori-brand/logos/';
const d = f => 'data:image/svg+xml;base64,' + fs.readFileSync(B + f).toString('base64');
(async () => {
  const mode = process.argv[2] || 'test';
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + __dirname + '/reel.html');
  await page.evaluate(([w, l]) => { document.getElementById('wm').src = w; document.getElementById('logo').src = l; }, [d('nori-watermark-light.svg'), d('nori-logo-stacked-on-dark.svg')]);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  if (mode === 'test') {
    const ts = process.argv.slice(3).map(Number);
    for (const t of ts) { await page.evaluate(t => frame(t), t); await page.screenshot({ path: `${__dirname}/test_${t}.png` }); }
  } else {
    const fps = 30, dur = parseFloat(process.argv[3]);
    fs.mkdirSync(__dirname + '/frames', { recursive: true });
    const n = Math.ceil(dur * fps);
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => frame(t), i / fps);
      await page.screenshot({ path: `${__dirname}/frames/f${String(i).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 92 });
    }
    console.log('frames', n);
  }
  await browser.close();
})();
