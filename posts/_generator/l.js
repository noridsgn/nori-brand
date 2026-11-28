// Week 29 Nov – 5 Dec 2026 — Carousel L (Sat 5 Dec 18:30). 100% educational: last slide = save / follow / comment, no DM.
// «سلّمت اللوقو… بس شنو سلّمت؟» the logo delivery package · fictional perfume shop «عنبر». One gold element per slide.
const { t, render, fixLine, GOLD } = require('./lib2');
const path = require('path');
const fs = require('fs');
const AR = "'IBM Plex Sans Arabic'";
const IV = '#F2F0EB';
const PL = '#2B1838', OR = '#F07A3A', CR = '#FBF1E4', RO = '#D9576B', MI = '#7FD1B9', INK = '#1E1026';

// amber drop mark
const drop = (s, c = OR, hl = CR) => `<svg width="${s}" height="${s * 1.25}" viewBox="0 0 80 100" style="flex:none;display:block"><path d="M40 4 C40 4 8 46 8 64 a32 32 0 0 0 64 0 C72 46 40 4 40 4Z" fill="${c}"/><path d="M26 62 a15 15 0 0 0 10 18" fill="none" stroke="${hl}" stroke-width="6" stroke-linecap="round" opacity=".85"/></svg>`;
const word = (s, c) => `<span style="font:700 ${s}px/1 ${AR};color:${c};letter-spacing:0">عنبر</span>`;
const horiz = (s, c = CR, m = OR) => `<div style="display:flex;align-items:center;gap:${s * .28}px;direction:rtl">${drop(s * .78, m, c === CR ? PL : CR)}${word(s, c)}</div>`;
const stack = (s, c = CR, m = OR) => `<div style="display:flex;flex-direction:column;align-items:center;gap:${s * .2}px">${drop(s * .9, m, c === CR ? PL : CR)}${word(s, c)}</div>`;

// pixelated logo (what the client got from a WhatsApp screenshot)
const PIX = fs.existsSync(path.join(__dirname, 'l-pix.png')) ? 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'l-pix.png')).toString('base64') : '';
const pixLogo = (w) => `<div style="width:${w}px;height:${w * .5}px;background:#FFFFFF;display:flex;align-items:center;justify-content:center"><img src="${PIX}" style="width:${w * .82}px;image-rendering:pixelated;display:block"></div>`;

// a perfume gift bag mockup (plum paper bag, rope handles)
const bag = (w, logo) => `<div style="position:relative;width:${w}px;height:${w * 1.12}px;flex:none">
  <svg width="${w}" height="${w * 1.12}" viewBox="0 0 200 224" style="position:absolute;inset:0">
    <ellipse cx="100" cy="218" rx="86" ry="6" fill="#000" opacity=".3"/>
    <path d="M70 60 C70 18 130 18 130 60" fill="none" stroke="${OR}" stroke-width="5"/>
    <path d="M24 56 L176 56 L184 214 L16 214Z" fill="${PL}"/>
    <path d="M24 56 L176 56 L178 72 L22 72Z" fill="#000" opacity=".18"/>
    <path d="M150 56 L176 56 L184 214 L156 214Z" fill="#000" opacity=".14"/>
  </svg>
  <div style="position:absolute;left:0;right:0;top:${w * .5}px;display:flex;justify-content:center">${logo}</div></div>`;

// file tile
const file = (ext, name, col, w = 180) => `<div style="width:${w}px;flex:none;text-align:center">
  <div style="position:relative;width:${w * .62}px;height:${w * .78}px;margin:0 auto;background:${CR};clip-path:polygon(0 0,72% 0,100% 22%,100% 100%,0 100%)">
    <div style="position:absolute;right:0;top:0;width:28%;height:22%;background:#E3D3BF"></div>
    <div style="position:absolute;left:0;right:0;bottom:${w * .1}px;text-align:center;font:700 ${w * .15}px/1 Inter;color:${col};letter-spacing:.04em">${ext}</div></div>
  <div style="font:500 ${w * .14}px/1.3 Inter;color:#C9C6C0;margin-top:12px;direction:ltr">${name}</div></div>`;

const head = (num, kick, title, sub) => `
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">${num}</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:34px">${kick}</div>
  <div class="t" style="margin-top:8px">${t(title)}</div>
  <div class="sub" style="font-size:36px;line-height:52px;margin-top:12px">${t(sub)}</div>
</div>`;

const L = [];

// 1 · hook: the client's message a month later + the pixelated logo on the shop bag
L.push(`
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="kick"><span class="ar">درس التصميم</span><span class="ln"></span><span class="en">Hand-off</span></div>
  <div class="big" style="margin-top:32px">سلّمت اللوقو…<br>بس <span class="gold">شنو سلّمت؟</span></div>
</div>
<div class="abs" style="right:80px;left:80px;top:640px;height:600px;display:flex;align-items:center;justify-content:space-between;direction:rtl">
  <div style="width:470px;background:#14201C;padding:34px 30px;border-radius:28px;box-shadow:0 24px 40px rgba(0,0,0,.35)">
    <div style="display:flex;align-items:center;gap:16px;padding-bottom:22px;border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="width:56px;height:56px;border-radius:50%;background:${PL};display:flex;align-items:center;justify-content:center">${drop(24)}</div>
      <div><div style="font:600 30px/1.2 ${AR}">عنبر للعطور</div><div style="font:400 24px/1.3 ${AR};color:#8FA39C">بعد شهر من التسليم</div></div></div>
    <div style="margin-top:24px;background:#24332E;border-radius:22px 22px 22px 6px;padding:18px 22px;font:500 32px/1.45 ${AR};width:fit-content;max-width:400px">ممكن اللوقو بدون خلفية؟ المطبعة تبيه</div>
    <div style="margin-top:14px;background:#24332E;border-radius:22px 22px 22px 6px;padding:14px;width:fit-content">${pixLogo(300)}
      <div style="font:500 30px/1.45 ${AR};margin-top:12px;padding:0 8px">وهذا اللي عندي بالواتساب 😅</div></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:36px;width:360px">
    <div class="sub" style="font-size:36px;line-height:52px;color:#C9C6C0">اللوقو مو صورة وحدة،<br>هو ملف كامل:</div>
    ${[['1', 'الصيغ'], ['2', 'النسخ'], ['3', 'الدليل']].map(x => `<div style="display:flex;gap:20px;align-items:baseline"><span style="font:600 32px/1 Inter;color:${OR}">${x[0]}</span><span style="font:700 44px/56px ${AR}">${x[1]}</span></div>`).join('')}
  </div>
</div>`);

// 2 · 01 formats
L.push(head('01', 'الصيغ', 'ثلاث صيغ، مو JPG', 'صورة JPG تحط خلفية بيضا، وتتكسّر إذا كبّرتها.') + `
<div class="abs" style="right:80px;left:80px;top:520px;display:flex;gap:40px;direction:rtl">
  <div style="flex:1"><div class="lab"><span class="ar">قبل · ملف واحد</span><span class="en">BEFORE</span></div>
    <div style="margin-top:28px;height:470px;background:#E9DCCB;display:flex;align-items:center;justify-content:center">${bag(300, pixLogo(170))}</div></div>
  <div style="flex:1"><div class="lab on"><span class="ar">بعد · الصيغة الصح</span><span class="en">AFTER</span></div>
    <div style="margin-top:28px;height:470px;background:#E9DCCB;display:flex;align-items:center;justify-content:center">${bag(300, stack(46))}</div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1096px;display:flex;justify-content:space-between;direction:rtl">
  ${[['SVG', 'للمواقع والطباعة', MI], ['PNG', 'شفاف للسوشال', OR], ['PDF', 'للمطبعة', RO]].map(x => `<div style="display:flex;align-items:center;gap:16px"><span style="font:700 34px/1 Inter;color:${x[2]}">${x[0]}</span><span style="font:500 34px/1.3 ${AR};color:#C9C6C0">${x[1]}</span></div>`).join('')}
</div>
<div class="abs" style="right:80px;left:80px;top:1176px">${fixLine('كل نسخة بثلاث صيغ: SVG و PNG و PDF.')}</div>`);

// 3 · 02 versions: 3 versions × dark / light
const tile = (bg, inner) => `<div style="height:250px;background:${bg};display:flex;align-items:center;justify-content:center">${inner}</div>`;
L.push(head('02', 'النسخ', 'ست نسخ، مو وحدة', 'كل مكان يبي شكل: لافتة، ختم، صورة بروفايل.') + `
<div class="abs" style="right:80px;left:80px;top:500px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;direction:rtl">
  <div style="font:600 34px/1.3 ${AR}">الأساسي</div><div style="font:600 34px/1.3 ${AR}">الأفقي</div><div style="font:600 34px/1.3 ${AR}">الرمز</div>
  ${tile(PL, stack(44))}${tile(PL, horiz(48))}${tile(PL, `<div style="width:150px;height:150px;border-radius:50%;background:${INK};display:flex;align-items:center;justify-content:center">${drop(64)}</div>`)}
  ${tile(CR, stack(44, PL))}${tile(CR, horiz(48, PL))}${tile(CR, `<div style="width:150px;height:150px;border-radius:50%;background:#F3E2CC;display:flex;align-items:center;justify-content:center">${drop(64)}</div>`)}
</div>
<div class="abs" style="right:80px;left:80px;top:1176px">${fixLine('3 نسخ × غامق وفاتح = 6 ملفات جاهزة.')}</div>`);

// 4 · 03 the one-page guide
const sw = (c, name, hex, cmyk, dark) => `<div style="flex:1"><div style="height:120px;background:${c};${dark ? '' : 'outline:1px solid #E3D3BF'}"></div>
  <div style="font:600 22px/1.3 ${AR};color:${INK};margin-top:10px">${name}</div>
  <div style="font:500 17px/1.4 Inter;color:#6B5A70;direction:ltr;text-align:right">${hex}<br>${cmyk}</div></div>`;
L.push(head('03', 'الدليل', 'صفحة وحدة تكفي', 'المطبعة والمصمم الجاي يعرفون كل شي بدون ما يسألونك.') + `
<div class="abs" style="right:150px;left:150px;top:520px;height:600px;background:${CR};box-shadow:0 30px 60px rgba(0,0,0,.45);padding:44px 48px;color:${INK};direction:rtl;transform:rotate(-1.5deg)">
  <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid ${INK};padding-bottom:18px">
    ${horiz(40, PL)}<span style="font:600 18px/1 Inter;letter-spacing:.16em;color:#6B5A70;direction:ltr">BRAND GUIDE · 01</span></div>
  <div style="display:flex;gap:16px;margin-top:28px;direction:rtl">
    ${sw(PL, 'بنفسجي', '#2B1838', 'C70 M90 Y40 K60', 1)}${sw(OR, 'عنبري', '#F07A3A', 'C0 M62 Y80 K0', 1)}${sw(CR, 'كريمي', '#FBF1E4', 'C0 M4 Y10 K2', 0)}${sw(MI, 'نعناعي', '#7FD1B9', 'C50 M0 Y35 K0', 1)}</div>
  <div style="display:flex;gap:28px;margin-top:30px;align-items:center;direction:rtl">
    <div style="flex:1.1;border-left:2px solid #E3D3BF;padding-left:24px">
      <div style="font:700 44px/1.2 ${AR}">أبجد هوز</div>
      <div style="font:500 20px/1.4 Inter;color:#6B5A70;direction:ltr;text-align:right;margin-top:6px">IBM Plex Arabic</div></div>
    <div style="flex:1;display:flex;justify-content:center">
      <div style="position:relative;padding:30px;border:2px dashed ${RO}">${horiz(34, PL)}
        <span style="position:absolute;top:2px;right:6px;font:600 16px/1 Inter;color:${RO}">x</span></div></div>
  </div>
</div>
<div class="abs" style="right:80px;left:80px;top:1176px">${fixLine('الألوان بالكود، الخطوط، والمسافة حول اللوقو.')}</div>`);

// 5 · save: the folder to hand over + ask
const row = (lvl, name, note, last) => `<div style="display:flex;align-items:center;gap:22px;padding:20px 0;border-top:1.5px solid ${lvl ? '#2C2C2C' : IV};${lvl ? 'padding-right:56px' : ''}">
  <svg width="38" height="32" viewBox="0 0 38 32" style="flex:none"><path d="M2 6 h12 l4 4 h18 v20 h-34Z" fill="none" stroke="${lvl ? '#8A8A8A' : IV}" stroke-width="2.5" stroke-linejoin="round"/></svg>
  <div style="font:600 36px/48px Inter;direction:ltr;flex:none;width:250px;text-align:right">${name}</div>
  <div style="font:500 34px/48px ${AR};color:#C9C6C0">${note}</div></div>`;
L.push(`
<div class="abs" style="right:80px;left:80px;top:210px">
  <div class="kick"><span class="ar">احفظها</span><span class="ln"></span><span class="en">Save this</span></div>
  <div class="t" style="margin-top:24px">الملف اللي تسلّمه</div>
  <div class="sub" style="margin-top:12px">انت شنو تسلّم عميلك؟ قول لي بالكومنت.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:540px">
  ${row(0, 'anbar_logo/', 'الملف الرئيسي')}
  ${row(1, 'SVG/', '6 نسخ للمواقع والطباعة')}
  ${row(1, 'PNG/', '6 نسخ شفافة للسوشال')}
  ${row(1, 'PDF/', 'للمطبعة')}
  ${row(1, 'guide.pdf', 'صفحة الدليل')}
  <div style="border-top:1.5px solid #2C2C2C"></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1100px;display:flex;justify-content:space-between;align-items:center">
  <div style="border:2px solid ${GOLD};padding:26px 44px;font:700 38px/48px ${AR}">احفظه ← وتابع</div>
  <div style="text-align:left"><div style="font:600 32px/40px Inter;direction:ltr">@nori.dsgn</div><div style="font:400 26px/36px ${AR};color:#8A8A8A">«عنبر» براند وهمي سويته للتوضيح</div></div>
</div>`);

(async () => {
  if (!PIX) { // step 1: make the low-res logo, then re-run
    const { chromium } = require('playwright');
    const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 44, height: 19 } });
    await p.setContent(`<html><body style="margin:0;background:#fff;display:flex;align-items:center;justify-content:center;width:44px;height:19px">${horiz(10, PL)}</body></html>`);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, 'l-pix.png'), type: 'png' }); await b.close();
    console.log('pix made, run again'); return;
  }
  await render(L, path.join(__dirname, '../2026-12-05/L'), 'L');
})();
