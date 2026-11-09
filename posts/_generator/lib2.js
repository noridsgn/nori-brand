// NORI carousel chrome v2 — matches the 26 Oct carousel system (watermark, counter, swipe + dots)
const fs = require('fs');
const path = require('path');
const WM = 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(__dirname, 'wm.svg')).toString('base64');
const GOLD = '#C9A45C';

function t(s) {
  return s.replace(/([A-Za-z0-9][A-Za-z0-9%\/:.,·+\-]*[A-Za-z0-9%]|[A-Za-z0-9%])/g, '<span class="n">$1</span>');
}

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1440px;background:#0E0E0E}
.s{width:1080px;height:1440px;position:relative;background:#0E0E0E;color:#F2F0EB;overflow:hidden;
   font-family:"IBM Plex Sans Arabic",sans-serif;direction:rtl;text-align:right;-webkit-font-smoothing:antialiased}
.n{font-family:"Inter",sans-serif;direction:ltr;unicode-bidi:isolate}
.wm{position:absolute;left:80px;top:96px;height:30px}
.pg{position:absolute;right:80px;top:97px;font:400 24px/28px "Inter";letter-spacing:.06em;color:#8A8A8A;direction:ltr}
.kick{display:flex;align-items:center;gap:24px;justify-content:flex-start}
.kick .ar{font:500 28px/40px "IBM Plex Sans Arabic";color:#8A8A8A}
.kick .ln{width:64px;height:1.5px;background:#3A3A3A}
.kick .en{font:600 24px/32px "Inter";letter-spacing:.14em;color:#8A8A8A;direction:ltr;text-transform:uppercase}
.big{font-weight:700;font-size:112px;line-height:136px}
.t{font-weight:700;font-size:80px;line-height:100px}
.sub{font-weight:400;font-size:36px;line-height:56px;color:#8A8A8A}
.mut{color:#8A8A8A}
.gold{color:${GOLD}}
.abs{position:absolute}
.lab{display:flex;justify-content:space-between;align-items:baseline;padding-bottom:20px;border-bottom:1.5px solid #2C2C2C}
.lab.on{border-bottom-color:#F2F0EB}
.lab .ar{font:500 30px/40px "IBM Plex Sans Arabic";color:#8A8A8A}
.lab.on .ar{color:#F2F0EB}
.lab .en{font:600 20px/24px "Inter";letter-spacing:.16em;color:#8A8A8A;direction:ltr}
.lab.on .en{color:#F2F0EB}
.fix{display:flex;align-items:center;gap:24px;font:500 40px/56px "IBM Plex Sans Arabic"}
`;

const CHECK = `<svg width="44" height="44" viewBox="0 0 44 44" style="flex:none"><circle cx="22" cy="22" r="19.5" fill="none" stroke="${GOLD}" stroke-width="3"/><path d="M13 22.5l6 6 12-12" fill="none" stroke="${GOLD}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ARROW = (c = '#F2F0EB') => `<svg width="28" height="24" viewBox="0 0 28 24"><path d="M26 12H3M12 3L3 12l9 9" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function fixLine(txt) { return `<div class="fix">${CHECK}<span>${t(txt)}</span></div>`; }

function chrome(idx, total, last) {
  let dots = '';
  // RTL: slide 1 is the rightmost dash
  for (let i = total; i >= 1; i--) dots += `<div style="width:40px;height:4px;background:${i === idx ? '#F2F0EB' : '#3A3A3A'}"></div>`;
  const leftSide = last
    ? `<div style="display:flex;align-items:baseline;gap:16px"><span style="font:600 22px/28px Inter;letter-spacing:.16em;color:#8A8A8A">RESULTS SPEAK</span><span style="font:500 30px/40px 'IBM Plex Sans Arabic'">النتيجة تتكلم</span></div>`
    : `<div style="display:flex;align-items:center;gap:20px;direction:ltr">${ARROW()}<span style="font:500 32px/40px 'IBM Plex Sans Arabic'">اسحب</span></div>`;
  return `<div class="abs" style="left:80px;right:80px;top:1268px;height:1.5px;background:#2C2C2C"></div>
  <div class="abs" style="left:80px;right:80px;top:1300px;height:48px;display:flex;justify-content:space-between;align-items:center;direction:ltr">
    ${leftSide}<div style="display:flex;gap:8px">${dots}</div></div>`;
}

function page(inner, idx, total) {
  return `<!doctype html><html lang="ar"><head><meta charset="utf-8"><style>${CSS}</style></head><body>
<div class="s"><img class="wm" src="${WM}">
<div class="pg">${String(idx).padStart(2, '0')} / ${String(total).padStart(2, '0')}</div>
${inner}${chrome(idx, total, idx === total)}</div></body></html>`;
}

async function render(slides, outDir, prefix) {
  const { chromium } = require('playwright');
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const pg = await browser.newPage({ viewport: { width: 1080, height: 1440 } });
  const rep = [];
  for (let i = 0; i < slides.length; i++) {
    const html = page(slides[i], i + 1, slides.length);
    fs.writeFileSync(path.join(outDir, `${prefix}-${i + 1}.html`), html);
    await pg.setContent(html, { waitUntil: 'load' });
    await pg.evaluate(() => document.fonts.ready);
    // brand font guard: never render with a fallback font (install /fonts first)
    const fontOk = await pg.evaluate(() => document.fonts.check('700 40px "IBM Plex Sans Arabic"', 'نوري') && document.fonts.check('600 40px "Inter"', 'NORI'));
    if (!fontOk) throw new Error('Brand fonts missing: install nori-brand/fonts (IBM Plex Sans Arabic + Inter) before rendering');
    const out = await pg.evaluate(() => {
      const o = [];
      document.querySelectorAll('.s > *:not(.wm)').forEach(el => {
        if (el.dataset.free) return;
        const r = el.getBoundingClientRect();
        if (r.width && (r.left < 79.5 || r.top < 79.5 || r.right > 1000.5 || r.bottom > 1360.5))
          o.push((el.textContent || '').trim().slice(0, 24) + ` [${Math.round(r.left)},${Math.round(r.top)},${Math.round(r.right)},${Math.round(r.bottom)}]`);
      });
      return o;
    });
    rep.push({ s: i + 1, outside: out });
    await pg.screenshot({ path: path.join(outDir, `${prefix}-${i + 1}.png`) });
  }
  await browser.close();
  console.log(JSON.stringify(rep));
}

module.exports = { t, render, fixLine, ARROW, GOLD };
