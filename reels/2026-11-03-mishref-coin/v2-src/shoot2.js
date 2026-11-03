const { chromium } = require('playwright');
const fs = require('fs');
// usage: node shoot2.js test 0.5,1.8,...   |  node shoot2.js full DURATION [start] [end]
(async () => {
  const [,, mode, a, s0, s1] = process.argv;
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  page.on('pageerror', e => console.log('pageerror:', e.message));
  page.on('console', m => { if (m.type() === 'error') console.log('console:', m.text()); });
  await page.goto('http://localhost:8765/reel2.html');
  await page.waitForFunction('window.ready===true', null, { timeout: 120000 });
  await page.evaluate('document.fonts.ready');
  await page.waitForTimeout(500);
  const subFor = t => (t > 0.9 && t < 2.5) ? 4 : (t >= 2.5 && t < 4.5) ? 1 : ((t > 6.95 && t < 7.95) || (t > 4.55 && t < 5.7)) ? 3 : 2;
  if (mode === 'test') {
    for (const t of a.split(',').map(Number)) {
      await page.evaluate(([t, s]) => window.frame(t, s), [t, subFor(t)]);
      await page.screenshot({ path: `t2-${t}.jpg`, type: 'jpeg', quality: 88 });
    }
  } else {
    fs.mkdirSync('frames2', { recursive: true });
    const f = 30, n = Math.round(Number(a) * f), from = Number(s0 || 0), to = Number(s1 || n);
    const t0 = Date.now();
    for (let i = from; i < to; i++) {
      const t = i / f;
      await page.evaluate(([t, s]) => window.frame(t, s), [t, subFor(t)]);
      await page.screenshot({ path: `frames2/f${String(i).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 93, timeout: 180000 });
      if (i % 15 === 0) console.log(i, n, ((Date.now() - t0) / 1000).toFixed(0) + 's');
    }
  }
  await browser.close();
})();
