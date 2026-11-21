// Week 22–28 Nov 2026 — Carousel K (Sat 28 Nov 18:30). 100% educational: last slide = save / follow / comment, no DM.
// «أرقامك تلخبط الإعلان؟» numbers in Arabic design · fictional delivery brand «بوصلة». One gold element per slide.
const { t, render, fixLine, GOLD } = require('./lib2');
const path = require('path');
const AR = "'IBM Plex Sans Arabic'";
const IV = '#F2F0EB';
const TE = '#0F5E63', YE = '#FFC94D', CO = '#F26B4F', PA = '#FFF8EC', INK = '#10292B';

// compass mark
const mark = (s, c = YE, n = CO) => `<svg width="${s}" height="${s}" viewBox="0 0 100 100" style="flex:none"><circle cx="50" cy="50" r="44" fill="none" stroke="${c}" stroke-width="8"/><path d="M50 16 L62 50 L50 84 L38 50Z" fill="${c}"/><path d="M50 16 L62 50 L38 50Z" fill="${n}"/></svg>`;
const logo = (s, c = PA) => `<div style="display:flex;align-items:center;gap:${s * .3}px;direction:rtl">${mark(s)}<span style="font:700 ${s * .78}px/1 ${AR};color:${c}">بوصلة</span></div>`;
const scooter = (w) => `<svg width="${w}" height="${w * .62}" viewBox="0 0 200 124" style="display:block">
  <ellipse cx="100" cy="118" rx="80" ry="6" fill="#000" opacity=".22"/>
  <circle cx="42" cy="98" r="20" fill="${INK}"/><circle cx="42" cy="98" r="8" fill="${PA}"/>
  <circle cx="160" cy="98" r="20" fill="${INK}"/><circle cx="160" cy="98" r="8" fill="${PA}"/>
  <path d="M30 86 C34 64 60 60 92 62 L132 62 L150 30 L166 30 L160 44 L176 86Z" fill="${CO}"/>
  <rect x="52" y="20" width="58" height="44" rx="6" fill="${YE}"/><g transform="translate(66 27) scale(.3)">${mark(100, INK, CO).replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
  <path d="M150 30 L142 14 L160 10" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`;

// a realistic delivery post. o = {w, h, num, unit, line, phone, mixed}
function post(o) {
  const w = o.w, k = w / 440;
  return `<div style="width:${w}px;height:${o.h}px;background:${TE};position:relative;overflow:hidden;flex:none;box-shadow:0 24px 40px rgba(0,0,0,.35)">
    <div style="position:absolute;right:${-60 * k}px;top:${-60 * k}px;width:${260 * k}px;height:${260 * k}px;border-radius:50%;background:rgba(255,255,255,.06)"></div>
    <div style="position:absolute;right:${26 * k}px;top:${26 * k}px">${logo(30 * k)}</div>
    ${o.body(k)}
    <div style="position:absolute;left:0;right:0;bottom:0;height:${70 * k}px;background:${YE};display:flex;align-items:center;justify-content:center;gap:${12 * k}px;direction:rtl;font:700 ${24 * k}px/1 ${AR};color:${INK}">${o.foot(k)}</div>
  </div>`;
}
const rg = (txt, f = '') => `<span style="position:relative;display:inline-block;${f}">${txt}<i style="position:absolute;left:-14px;right:-14px;top:-6px;bottom:-8px;border:4px solid ${CO};border-radius:50%;transform:rotate(-4deg)"></i></span>`;
const ring = (l, tp, w, h) => `<div style="position:absolute;left:${l}px;top:${tp}px;width:${w}px;height:${h}px;border:4px solid ${CO};border-radius:50%;transform:rotate(-4deg)"></div>`;

const K = [];

// 1 · hook: one real-looking post with the two mistakes circled
const hookPost = post({
  w: 470, h: 560,
  body: (k) => `<div style="position:absolute;right:${30 * k}px;left:${30 * k}px;top:${110 * k}px;text-align:right">
      <div style="font:700 ${46 * k}px/1.25 ${AR};color:${PA}">طلبك يوصلك<br>خلال ${rg('٣٠')} دقيقة</div>
      <div style="font:500 ${24 * k}px/1.5 ${AR};color:#BFE3E0;margin-top:${12 * k}px">أول ${rg('3', 'font-family:Inter')} طلبات توصيلها علينا</div></div>
    <div style="position:absolute;left:${20 * k}px;bottom:${90 * k}px">${scooter(250 * k)}</div>`,
  foot: (k) => `<span>اطلب على</span>${rg('2468 1800', 'font-family:Inter;direction:ltr;unicode-bidi:isolate')}`,
});
K.push(`
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="kick"><span class="ar">درس التصميم</span><span class="ln"></span><span class="en">Numbers</span></div>
  <div class="big" style="margin-top:32px">أرقامك تلخبط<br><span class="gold">إعلانك؟</span></div>
  <div class="sub" style="margin-top:20px">ثلاث غلطات بالأرقام… والزبون يحسها بدون ما يدري.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:668px;height:560px;display:flex;align-items:center;justify-content:space-between;direction:rtl">
  <div style="position:relative">${hookPost}
    </div>
  <div style="display:flex;flex-direction:column;gap:36px;width:360px">
    ${[['1', 'رقمين بنظامين'], ['2', 'رقم التلفون انقلب'], ['3', 'الرقم المهم ضايع']].map(x => `<div style="display:flex;gap:18px;align-items:baseline"><span style="font:600 30px/1 Inter;color:${CO}">${x[0]}</span><span style="font:500 36px/50px ${AR}">${x[1]}</span></div>`).join('')}
  </div>
</div>`);

// 2 · 01 one numeral system
const s2 = (mixed) => post({
  w: 440, h: 500,
  body: (k) => `<div style="position:absolute;right:${30 * k}px;left:${30 * k}px;top:${100 * k}px;text-align:right;color:${PA}">
      <div style="font:700 ${40 * k}px/1.3 ${AR}">عرض الويكند</div>
      ${(mixed ? [['خصم', '١٠٪', 0], ['عدد الطلبات', '3 طلبات', 1], ['توصيل بـ', '٢٥ دقيقة', 0]] : [['خصم', '10%', 1], ['عدد الطلبات', '3 طلبات', 1], ['توصيل بـ', '25 دقيقة', 1]])
        .map(r => `<div style="display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid rgba(255,255,255,.18);padding:${12 * k}px 0;margin-top:${r === 0 ? 18 * k : 0}px;font:500 ${24 * k}px/1.4 ${AR}"><span style="color:#BFE3E0">${r[0]}</span><span style="font:700 ${30 * k}px/1 ${r[2] ? 'Inter' : AR};color:${YE};direction:rtl;unicode-bidi:isolate">${r[1]}</span></div>`).join('')}
    </div>`,
  foot: () => `<span>اطلب من التطبيق</span>`,
});
K.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">01</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">النظام</div>
  <div class="t" style="margin-top:8px">نظام أرقام واحد</div>
  <div class="sub" style="font-size:34px;line-height:50px;margin-top:12px">عربي ولا إنجليزي… بس لا تخلطهم بنفس التصميم.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:500px;display:flex;gap:40px;direction:rtl">
  <div style="flex:1"><div class="lab"><span class="ar">قبل · مخلوط</span><span class="en">BEFORE</span></div><div style="margin-top:28px">${s2(true)}</div></div>
  <div style="flex:1"><div class="lab on"><span class="ar">بعد · نظام واحد</span><span class="en">AFTER</span></div><div style="margin-top:28px">${s2(false)}</div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1136px">${fixLine('اختار نظام واحد، وطبّقه على كل الأرقام.')}</div>`);

// 3 · 02 the number flips in RTL
const story = (bad) => `<div style="width:440px;height:480px;background:${PA};position:relative;overflow:hidden;box-shadow:0 24px 40px rgba(0,0,0,.35)">
   <div style="position:absolute;right:28px;top:26px">${logo(28, INK)}</div>
   <div style="position:absolute;left:-40px;bottom:-40px;width:220px;height:220px;border-radius:50%;background:${YE}"></div>
   <div style="position:absolute;right:28px;left:28px;top:110px;text-align:right;color:${INK}">
     <div style="font:700 36px/1.3 ${AR}">نوصل لين باب بيتك</div>
     <div style="font:500 22px/1.5 ${AR};color:#4C6466;margin-top:10px">اطلب الحين على:</div>
     <div style="margin-top:14px;background:${TE};color:${PA};padding:16px 20px;display:inline-block;font:700 40px/1 Inter;direction:ltr;letter-spacing:.02em">${bad ? '2468 1800' : '1800 2468'}</div>
     <div style="font:500 22px/1.5 ${AR};color:#4C6466;margin-top:24px">العرض لين</div>
     <div style="font:700 30px/1.2 Inter;color:${INK};direction:ltr;text-align:right;margin-top:4px">${bad ? '2026/11/28' : '28/11/2026'}</div>
   </div>
</div>`;
K.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">02</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">الاتجاه</div>
  <div class="t" style="margin-top:8px">الرقم ينقلب</div>
  <div class="sub" style="font-size:34px;line-height:50px;margin-top:12px">بالسطر العربي، التلفون والتاريخ يتقلبون إذا ما انتبهت.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:500px;display:flex;gap:40px;direction:rtl">
  <div style="flex:1"><div class="lab"><span class="ar">قبل · انقلب</span><span class="en">BEFORE</span></div><div style="margin-top:28px">${story(true)}</div></div>
  <div style="flex:1"><div class="lab on"><span class="ar">بعد · قطعة وحدة</span><span class="en">AFTER</span></div><div style="margin-top:28px">${story(false)}</div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1126px">${fixLine('حط الرقم كقطعة وحدة، وراجعه رقم رقم قبل النشر.')}</div>`);

// 4 · 03 the number is the hero
const hero = (good) => post({
  w: 440, h: 500,
  body: (k) => good
    ? `<div style="position:absolute;right:${30 * k}px;left:${30 * k}px;top:${92 * k}px;text-align:right;color:${PA}">
        <div style="font:500 ${26 * k}px/1.4 ${AR};color:#BFE3E0">طلبك يوصلك خلال</div>
        <div style="display:flex;align-items:baseline;gap:${14 * k}px;direction:rtl"><span style="font:700 ${170 * k}px/1 Inter;color:${YE}">25</span><span style="font:700 ${40 * k}px/1 ${AR}">دقيقة</span></div></div>
       <div style="position:absolute;left:${16 * k}px;bottom:${84 * k}px">${scooter(190 * k)}</div>`
    : `<div style="position:absolute;right:${30 * k}px;left:${30 * k}px;top:${100 * k}px;text-align:right;color:${PA}">
        <div style="font:700 ${34 * k}px/1.4 ${AR}">طلبك يوصلك خلال <span style="font-family:Inter">25</span> دقيقة، وأول طلب توصيله علينا</div></div>
       <div style="position:absolute;left:${16 * k}px;bottom:${84 * k}px">${scooter(190 * k)}</div>`,
  foot: () => `<span>اطلب من التطبيق</span>`,
});
K.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">03</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">الحجم</div>
  <div class="t" style="margin-top:8px">الرقم هو البطل</div>
  <div class="sub" style="font-size:34px;line-height:50px;margin-top:12px">إذا الرقم هو اللي يبيع، لا تخليه بحجم باقي الكلام.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:500px;display:flex;gap:40px;direction:rtl">
  <div style="flex:1"><div class="lab"><span class="ar">قبل · ضايع بالجملة</span><span class="en">BEFORE</span></div><div style="margin-top:28px">${hero(false)}</div></div>
  <div style="flex:1"><div class="lab on"><span class="ar">بعد · رقم كبير</span><span class="en">AFTER</span></div><div style="margin-top:28px">${hero(true)}</div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1136px">${fixLine('رقم كبير، والوحدة صغيرة جنبه.')}</div>`);

// 5 · save checklist + ask
K.push(`
<div class="abs" style="right:80px;left:80px;top:210px">
  <div class="kick"><span class="ar">احفظها</span><span class="ln"></span><span class="en">Save this</span></div>
  <div class="t" style="margin-top:24px">شيّك على أرقامك</div>
  <div class="sub" style="margin-top:12px">إعلانك الأخير طاح بكم وحدة؟ قول لي بالكومنت.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:520px">
  ${[['النظام', 'كل الأرقام بنظام واحد؟'], ['الاتجاه', 'التلفون والتاريخ ما انقلبوا؟'], ['الحجم', 'الرقم المهم أكبر من وحدته؟']].map((x, i) => `<div style="display:flex;align-items:center;gap:32px;padding:26px 0;border-top:1.5px solid ${i ? '#2C2C2C' : IV}">
    <div style="width:48px;height:48px;border:2.5px solid #8A8A8A;flex:none"></div>
    <div style="font:700 46px/60px ${AR};width:220px;flex:none">${x[0]}</div>
    <div style="font:500 36px/50px ${AR};color:#C9C6C0">${x[1]}</div></div>`).join('')}
  <div style="border-top:1.5px solid #2C2C2C"></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1010px;display:flex;justify-content:space-between;align-items:center">
  <div style="border:2px solid ${GOLD};padding:26px 44px;font:700 38px/48px ${AR}">احفظه ← وتابع</div>
  <div style="text-align:left"><div style="font:600 32px/40px Inter;direction:ltr">@nori.dsgn</div><div style="font:400 26px/36px ${AR};color:#8A8A8A">«بوصلة» براند وهمي سويته للتوضيح</div></div>
</div>`);

(async () => { await render(K, path.join(__dirname, '../2026-11-28/K'), 'K'); })();
