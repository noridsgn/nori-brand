const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const [,, mode, a, b, fps] = process.argv; // mode: test t1,t2,... | full dur fps
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  page.on('console', m => console.log('console:', m.text()));
  page.on('pageerror', e => console.log('pageerror:', e.message));
  await page.goto('http://localhost:8765/reel.html');
  await page.waitForFunction('window.ready===true', null, { timeout: 60000 });
  await page.evaluate('document.fonts.ready');
  fs.mkdirSync('frames', { recursive: true });
  if (mode === 'test') {
    for (const t of a.split(',').map(Number)) {
      await page.evaluate(t => window.frame(t), t);
      await page.screenshot({ path: `test-${t}.jpg`, type: 'jpeg', quality: 85 });
    }
  } else {
    const dur = Number(a), f = Number(fps || 30), n = Math.round(dur * f);
    const t0 = Date.now();
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => window.frame(t), i / f);
      await page.screenshot({ path: `frames/f${String(i).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 93 });
      if (i % 30 === 0) console.log(i, n, ((Date.now() - t0) / 1000).toFixed(0) + 's');
    }
  }
  await browser.close();
})();
