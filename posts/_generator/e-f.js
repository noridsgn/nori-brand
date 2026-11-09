// Fri 20 Nov (E) + Sat 21 Nov (F) — 100% educational carousels (rule B: no DM offer)
const { t, render, fixLine, GOLD } = require('./lib2');
const AR = "'IBM Plex Sans Arabic'";

/* ---------- E · «رَف» (fictional coffee roastery) — visual hierarchy ---------- */
const GR = '#1F4D3A', CM = '#F3E7D3', TC = '#C8553D', BN = '#6B3F26';
function bag(sc) {
  return `<svg width="${160 * sc}" height="${210 * sc}" viewBox="0 0 160 210">
    <path d="M20 30 L140 30 L150 200 L10 200 Z" fill="${BN}"/>
    <path d="M20 30 L140 30 L134 10 L26 10 Z" fill="#4E2C1A"/>
    <rect x="38" y="80" width="84" height="74" rx="6" fill="${CM}"/>
    <text x="80" y="128" text-anchor="middle" font-family="IBM Plex Sans Arabic" font-weight="700" font-size="30" fill="${GR}">رَف</text>
    <ellipse cx="54" cy="186" rx="9" ry="6" fill="#3B2314"/><ellipse cx="80" cy="190" rx="9" ry="6" fill="#3B2314"/><ellipse cx="106" cy="186" rx="9" ry="6" fill="#3B2314"/></svg>`;
}
// poster: mode 'flat' (everything same size) | 'good'
function poster(w, mode, marks) {
  const k = w / 400, h = w * 1.25;
  const mk = (n, x, y) => marks ? `<div style="position:absolute;left:${x * k}px;top:${y * k}px;width:${46 * k}px;height:${46 * k}px;border-radius:50%;background:#0E0E0E;color:#F2F0EB;font:600 ${24 * k}px/${46 * k}px Inter;text-align:center;box-shadow:0 0 0 ${3 * k}px #F2F0EB">${n}</div>` : '';
  if (mode === 'flat') return `<div style="width:${w}px;height:${h}px;position:relative;overflow:hidden;border-radius:${10 * k}px;flex:none;background:${CM}">
    <div style="position:absolute;right:${24 * k}px;top:${26 * k}px;font:700 ${26 * k}px/${36 * k}px ${AR};color:${GR}">محمصة رَف</div>
    <div style="position:absolute;left:${24 * k}px;top:${26 * k}px;font:700 ${26 * k}px/${36 * k}px ${AR};color:${TC}">خصم على الكيس</div>
    <div style="position:absolute;right:${24 * k}px;top:${90 * k}px;font:700 ${26 * k}px/${36 * k}px ${AR};color:${GR}">بن إثيوبي جديد</div>
    <div style="position:absolute;left:${130 * k}px;top:${150 * k}px">${bag(.9 * k)}</div>
    <div style="position:absolute;right:${24 * k}px;bottom:${70 * k}px;font:700 ${26 * k}px/${36 * k}px ${AR};color:${GR}">محمص اليوم</div>
    <div style="position:absolute;left:${24 * k}px;bottom:${70 * k}px;font:700 ${26 * k}px/${36 * k}px ${AR};color:${BN}">توصيل مجاني</div>
    <div style="position:absolute;right:${24 * k}px;left:${24 * k}px;bottom:${20 * k}px;display:flex;justify-content:space-between;font:700 ${22 * k}px/${36 * k}px ${AR};color:${GR}"><span>اطلب الحين</span><span>@raf.roast</span></div></div>`;
  return `<div style="width:${w}px;height:${h}px;position:relative;overflow:hidden;border-radius:${10 * k}px;flex:none;background:${GR}">
    <div style="position:absolute;right:${28 * k}px;top:${30 * k}px;font:700 ${54 * k}px/${66 * k}px ${AR};color:${CM}">بن إثيوبي<br>جديد</div>
    <div style="position:absolute;left:${30 * k}px;top:${170 * k}px">${bag(1.15 * k)}</div>
    <div style="position:absolute;right:${28 * k}px;top:${178 * k}px;font:400 ${20 * k}px/${30 * k}px ${AR};color:${CM};opacity:.8">محمص اليوم<br>نكهة توت وشوكولاتة</div>
    <div style="position:absolute;left:${28 * k}px;bottom:${28 * k}px;background:${TC};color:#fff;font:700 ${20 * k}px/1 ${AR};padding:${14 * k}px ${22 * k}px;border-radius:${6 * k}px">اطلب كيسك</div>
    <div style="position:absolute;right:${28 * k}px;bottom:${34 * k}px;font:700 ${20 * k}px/1 ${AR};color:${CM}">رَف</div>
    ${mk(1, 120, 40)}${mk(2, 230, 250)}${mk(3, 170, 432)}</div>`;
}
const E = [];
// 1 hook
E.push(`
<div class="abs" style="right:80px;left:80px;top:220px">
  <div class="kick"><span class="ar">درس التصميم</span><span class="ln"></span><span class="en">Design lesson</span></div>
  <div class="big" style="margin-top:32px">عين الزبون<br>تقرا من <span class="gold">وين؟</span></div>
  <div class="sub" style="margin-top:24px">إذا كل شي بنفس الحجم… ولا شي ينقرا.</div>
</div>
<div class="abs" style="left:104px;top:730px;transform:rotate(-4deg)">${poster(400, 'flat')}</div>
<div class="abs" style="right:80px;top:830px;width:400px">
  ${['محمصة رَف', 'خصم على الكيس', 'بن إثيوبي جديد', 'توصيل مجاني'].map(x => `<div style="display:flex;align-items:center;gap:20px;padding:14px 0;font:500 34px/48px ${AR};color:#8A8A8A"><span style="font:600 34px/1 Inter;color:#4A4A4A">?</span>${x}</div>`).join('')}
</div>`);
// 2 size ranking (one poster + numbered order)
E.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">01</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">الحجم</div>
  <div class="t" style="margin-top:8px">أكبر شي = أهم شي</div>
</div>
<div class="abs" style="left:80px;top:430px">${poster(480, 'good', true)}</div>
<div class="abs" style="right:80px;top:470px;width:380px">
  ${[['1', 'العنوان', 'يوقف السكرول'], ['2', 'المنتج', 'يوري شنو تبيع'], ['3', 'الزر', 'يقول له شنو يسوي']].map(x => `
  <div style="padding:30px 0;border-top:1.5px solid #2C2C2C;display:flex;gap:28px;align-items:flex-start">
    <div style="font:600 44px/60px Inter;color:#8A8A8A;width:36px;flex:none">${x[0]}</div>
    <div><div style="font:700 48px/60px ${AR}">${x[1]}</div><div class="sub" style="font-size:34px;line-height:48px">${x[2]}</div></div></div>`).join('')}
  <div style="border-top:1.5px solid #2C2C2C"></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1150px">${fixLine('رتّب الأحجام قبل الألوان: ثلاث مستويات بس.')}</div>`);
// 3 reading path
function pathPoster(w, good) {
  const k = w / 400, h = w * 1.25;
  const btn = good ? `left:${28 * k}px;bottom:${28 * k}px` : `left:${28 * k}px;top:${30 * k}px`;
  const path = good
    ? `<path d="M360 60 C 330 200, 120 200, 160 320 S 200 430, 168 452" fill="none" stroke="#F2F0EB" stroke-width="5" stroke-dasharray="2 14" stroke-linecap="round"/>`
    : `<path d="M360 60 C 330 200, 120 200, 160 320 S 260 460, 330 470" fill="none" stroke="#F2F0EB" stroke-width="5" stroke-dasharray="2 14" stroke-linecap="round"/>`;
  return `<div style="width:${w}px;height:${h}px;position:relative;overflow:hidden;border-radius:${10 * k}px;flex:none;background:${GR}">
    <div style="position:absolute;right:${28 * k}px;top:${30 * k}px;font:700 ${44 * k}px/${56 * k}px ${AR};color:${CM}">بن إثيوبي<br>جديد</div>
    <div style="position:absolute;left:${120 * k}px;top:${180 * k}px">${bag(1 * k)}</div>
    <div style="position:absolute;${btn};background:${TC};color:#fff;font:700 ${20 * k}px/1 ${AR};padding:${14 * k}px ${22 * k}px;border-radius:${6 * k}px">اطلب كيسك</div>
    <svg style="position:absolute;inset:0" width="${w}" height="${h}" viewBox="0 0 400 500">${path}
      <circle cx="${good ? 168 : 330}" cy="${good ? 452 : 470}" r="9" fill="#F2F0EB"/></svg></div>`;
}
E.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">02</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">مسار العين</div>
  <div class="t" style="margin-top:8px;font-size:72px">بالعربي العين تنزل لليسار</div>
</div>
<div class="abs" style="right:80px;left:80px;top:420px;display:flex;justify-content:space-between">
  <div style="width:440px"><div class="lab"><span class="ar">قبل</span><span class="en">BEFORE</span></div><div style="margin-top:24px">${pathPoster(440, false)}</div></div>
  <div style="width:440px"><div class="lab on"><span class="ar">بعد</span><span class="en">AFTER</span></div><div style="margin-top:24px">${pathPoster(440, true)}</div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1150px">${fixLine('خل الزر بآخر المسار: تحت على اليسار.')}</div>`);
// 4 save: golden ratio 1.618 type scale
E.push(`
<div class="abs" style="right:80px;left:80px;top:220px;display:flex;justify-content:space-between;align-items:flex-start">
  <div><div class="kick"><span class="ar">احفظها</span><span class="ln"></span><span class="en">Save this</span></div>
  <div class="big" style="margin-top:32px">القاعدة الذهبية</div></div>
  <svg width="56" height="72" viewBox="0 0 56 72" style="margin-top:8px"><path d="M4 4h48v64L28 50 4 68z" fill="none" stroke="${GOLD}" stroke-width="5" stroke-linejoin="round"/></svg>
</div>
<div class="abs" style="right:80px;left:80px;top:500px">
  ${[['× 1.618', 'العنوان', '26px', 110, '#F2F0EB'], ['الأساس', 'نص الفقرة', '16px', 68, '#D8D5CF'], ['÷ 1.618', 'التسميات والهوامش', '10px', 42, '#B5B2AC']].map(x => `
  <div style="display:flex;justify-content:space-between;align-items:center;padding:28px 0;border-top:1.5px solid #2C2C2C">
    <div style="font:700 ${x[3]}px/${Math.round(x[3] * 1.3)}px ${AR};color:${x[4]}">${x[1]}</div>
    <div style="text-align:left;direction:ltr"><div style="font:600 40px/52px Inter;color:#F2F0EB">${x[2]}</div><div style="font:500 26px/34px Inter;color:#8A8A8A">${x[0]}</div></div></div>`).join('')}
  <div style="border-top:1.5px solid #2C2C2C"></div>
  <div class="sub" style="margin-top:36px;font-size:34px;line-height:52px">النص الأساسي <span class="n">16px</span>؟ العنوان <span class="n">16 × 1.618 ≈ 26px</span><br>والأصغر منه: اقسم على <span class="n">1.618</span></div>
</div>`);
// 5 CTA: recap in three columns + comment question
function finalSlide(q, cols, brand) {
  return `
<div class="abs" style="right:80px;left:80px;top:210px">
  <div class="kick"><span class="ar">جرّبها اليوم</span><span class="ln"></span><span class="en">Try it</span></div>
  <div class="t" style="margin-top:24px">${q}</div>
</div>
<div class="abs" style="right:80px;left:80px;top:560px;display:flex;gap:24px">
  ${cols.map((x, i) => `<div style="flex:1;border-top:1.5px solid #F2F0EB;padding-top:28px">
    <div style="font:600 32px/40px Inter;color:#8A8A8A">0${i + 1}</div>
    <div style="font:700 46px/60px ${AR};margin-top:16px">${x[0]}</div>
    <div style="font:500 34px/50px ${AR};color:#C9C6C0;margin-top:8px;text-wrap:balance">${x[2] ? `<span class="n">${x[1]}</span>` : t(x[1])}</div></div>`).join('')}
</div>
<div class="abs" style="right:80px;left:80px;top:1060px;display:flex;justify-content:space-between;align-items:center">
  <div style="border:2px solid ${GOLD};padding:26px 44px;font:700 38px/48px ${AR}">احفظه ← وتابع</div>
  <div style="text-align:left"><div style="font:600 32px/40px Inter;direction:ltr">@nori.dsgn</div><div style="font:400 24px/34px ${AR};color:#8A8A8A">«${brand}» براند وهمي للتوضيح</div></div>
</div>`;
}
E.push(finalSlide('شنو أول شي شفته<br>بآخر بوست لك؟', [['الحجم', 'أهم شي أكبر شي'], ['المسار', 'من فوق يمين لتحت يسار'], ['الذهبية', '× 1.618', 1]], 'رَف'));

/* ---------- F · «لُجين» (fictional silver jewellery) — white space ---------- */
const NV = '#1E2A44', SV = '#D9DCE1', BL = '#E8B4A8', IV = '#F7F3EE';
function ring(sc, c = SV) {
  return `<svg width="${120 * sc}" height="${120 * sc}" viewBox="0 0 120 120">
    <circle cx="60" cy="68" r="38" fill="none" stroke="${c}" stroke-width="10"/>
    <circle cx="60" cy="68" r="38" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="20 220" opacity=".7"/>
    <path d="M60 10 l14 16 -14 14 -14 -14z" fill="${BL}" stroke="#fff" stroke-width="2"/></svg>`;
}
function jewelPost(w, mode) {
  const k = w / 400, h = w * 1.25;
  if (mode === 'crowded') return `<div style="width:${w}px;height:${h}px;position:relative;overflow:hidden;flex:none;background:${NV}">
    <div style="position:absolute;right:${10 * k}px;top:${10 * k}px;font:700 ${30 * k}px/${38 * k}px ${AR};color:${SV}">لُجين للفضة</div>
    <div style="position:absolute;left:${8 * k}px;top:${12 * k}px;font:700 ${18 * k}px/${26 * k}px ${AR};color:${BL}">مجموعة الشتاء</div>
    <div style="position:absolute;left:${4 * k}px;top:${50 * k}px;display:flex;flex-wrap:wrap;width:${392 * k}px;gap:${4 * k}px">${ring(.95 * k).repeat(9)}</div>
    <div style="position:absolute;right:${8 * k}px;bottom:${44 * k}px;font:600 ${18 * k}px/${26 * k}px ${AR};color:${SV}">فضة عيار 925 · تغليف هدايا · نقش أسماء</div>
    <div style="position:absolute;right:${8 * k}px;left:${8 * k}px;bottom:${8 * k}px;display:flex;justify-content:space-between;font:700 ${18 * k}px/${30 * k}px ${AR};color:${BL}"><span>اطلبي الحين</span><span style="font-family:Inter">@lujain.silver</span></div></div>`;
  return `<div style="width:${w}px;height:${h}px;position:relative;overflow:hidden;flex:none;background:${NV}">
    <div style="position:absolute;right:${36 * k}px;top:${40 * k}px;font:700 ${34 * k}px/${44 * k}px ${AR};color:${IV}">مجموعة الشتاء</div>
    <div style="position:absolute;right:${36 * k}px;top:${86 * k}px;font:400 ${17 * k}px/${26 * k}px ${AR};color:${SV};opacity:.8">فضة عيار 925</div>
    <div style="position:absolute;left:0;right:0;top:${170 * k}px;display:flex;justify-content:center">${ring(1.6 * k)}</div>
    <div style="position:absolute;left:${36 * k}px;bottom:${40 * k}px;background:${BL};color:${NV};font:700 ${17 * k}px/1 ${AR};padding:${12 * k}px ${18 * k}px;border-radius:${20 * k}px">اطلبيه</div>
    <div style="position:absolute;right:${36 * k}px;bottom:${46 * k}px;font:700 ${18 * k}px/1 ${AR};color:${IV}">لُجين</div></div>`;
}
const F = [];
// 1 hook
F.push(`
<div class="abs" style="right:80px;left:80px;top:220px">
  <div class="kick"><span class="ar">درس التصميم</span><span class="ln"></span><span class="en">Design lesson</span></div>
  <div class="big" style="margin-top:32px">الفراغ مو ضياع…<br>الفراغ <span class="gold">يبيع</span></div>
</div>
<div class="abs" style="right:80px;left:80px;top:640px;display:flex;justify-content:space-between;align-items:flex-end">
  <div style="text-align:center"><div style="opacity:.92">${jewelPost(400, 'crowded')}</div><div class="sub" style="margin-top:20px;font-size:30px">9 خواتم… ولا واحد يبين</div></div>
  <div style="text-align:center">${jewelPost(400, 'good')}<div style="margin-top:20px;font:500 30px/56px ${AR}">خاتم واحد… وتبينه</div></div>
</div>`);
// 2 margins: one split card
F.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">01</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">الهامش</div>
  <div class="t" style="margin-top:8px">لا تلصق شي بالحافة</div>
</div>
<div class="abs" style="right:80px;left:80px;top:420px;display:flex;justify-content:space-between">
  <div class="lab" style="width:440px"><span class="ar">قبل</span><span class="en">BEFORE</span></div>
  <div class="lab on" style="width:440px"><span class="ar">بعد</span><span class="en">AFTER</span></div>
</div>
<div class="abs" style="right:80px;left:80px;top:500px;height:600px;display:flex;justify-content:space-between;direction:ltr">
  <div style="position:relative;width:440px;height:550px;overflow:hidden;border-radius:10px">${jewelPost(440, 'good')}
    <div style="position:absolute;inset:40px;border:2px dashed rgba(247,243,238,.55)"></div>
    <div style="position:absolute;left:40px;top:8px;font:600 22px/28px Inter;color:${IV};opacity:.8">40</div></div>
  <div style="position:relative;width:440px;height:550px;overflow:hidden;border-radius:10px;background:${NV}">
    <div style="position:absolute;right:6px;top:4px;font:700 46px/56px ${AR};color:${IV}">مجموعة الشتاء</div>
    <div style="position:absolute;left:-30px;top:150px">${ring(2.6)}</div>
    <div style="position:absolute;left:0;bottom:0;background:${BL};color:${NV};font:700 24px/1 ${AR};padding:16px 22px">اطلبيه</div>
    <div style="position:absolute;right:4px;bottom:6px;font:700 26px/1 ${AR};color:${IV}">لُجين</div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1150px">${fixLine('خل حول الحواف مسافة ثابتة، تقريباً 8% من العرض.')}</div>`);
// 3 grouping: scattered chips vs 2 groups
const chips = ['فضة 925', 'نقش أسماء', 'تغليف هدايا', 'توصيل', 'ضمان سنة', 'مقاسات'];
const chip = (x) => `<span style="display:inline-block;padding:12px 22px;border-radius:40px;background:${SV};color:${NV};font:600 34px/44px ${AR}">${t(x)}</span>`;
F.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">02</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">التجميع</div>
  <div class="t" style="margin-top:8px">قرّب اللي يخص بعض</div>
</div>
<div class="abs" style="right:80px;left:80px;top:440px;height:300px;background:#161616;border-radius:10px">
  <div class="abs" style="right:28px;top:24px;font:600 20px/24px Inter;letter-spacing:.16em;color:#8A8A8A">BEFORE</div>
  ${chips.map((c, i) => `<div class="abs" data-free="1" style="right:${[40, 520, 250, 610, 90, 380][i]}px;top:${[90, 70, 150, 200, 210, 230][i]}px">${chip(c)}</div>`).join('')}
</div>
<div class="abs" style="right:80px;left:80px;top:780px;height:300px;background:#161616;border-radius:10px;display:flex;gap:48px;align-items:center;padding:0 40px">
  <div class="abs" style="right:28px;top:24px;font:600 20px/24px Inter;letter-spacing:.16em;color:#F2F0EB">AFTER</div>
  <div style="flex:1;margin-top:30px"><div style="font:500 28px/40px ${AR};color:#8A8A8A;margin-bottom:14px">المنتج</div><div style="display:flex;flex-wrap:wrap;gap:12px">${chip(chips[0])}${chip(chips[5])}${chip(chips[4])}</div></div>
  <div style="width:1.5px;height:160px;background:#3A3A3A;margin-top:30px"></div>
  <div style="flex:1;margin-top:30px"><div style="font:500 28px/40px ${AR};color:#8A8A8A;margin-bottom:14px">الخدمة</div><div style="display:flex;flex-wrap:wrap;gap:12px">${chip(chips[1])}${chip(chips[2])}${chip(chips[3])}</div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1150px">${fixLine('مسافة صغيرة داخل المجموعة، وكبيرة بين المجموعات.')}</div>`);
// 4 save: the product third
F.push(`
<div class="abs" style="right:80px;left:80px;top:220px;display:flex;justify-content:space-between;align-items:flex-start">
  <div><div class="kick"><span class="ar">احفظها</span><span class="ln"></span><span class="en">Save this</span></div>
  <div class="t" style="margin-top:32px">المنتج ثلث<br>والفراغ ثلثين</div></div>
  <svg width="56" height="72" viewBox="0 0 56 72" style="margin-top:8px"><path d="M4 4h48v64L28 50 4 68z" fill="none" stroke="${GOLD}" stroke-width="5" stroke-linejoin="round"/></svg>
</div>
<div class="abs" style="left:80px;top:540px;width:480px;height:600px;overflow:hidden;border-radius:10px">${jewelPost(480, 'good')}
  <svg style="position:absolute;inset:0" width="480" height="600"><g stroke="rgba(247,243,238,.45)" stroke-width="2" stroke-dasharray="8 8"><line x1="160" y1="0" x2="160" y2="600"/><line x1="320" y1="0" x2="320" y2="600"/><line x1="0" y1="200" x2="480" y2="200"/><line x1="0" y1="400" x2="480" y2="400"/></g></svg></div>
<div class="abs" style="right:80px;top:560px;width:400px">
  ${[['قسّم البوست', '3 × 3 بخطوط وهمية.'], ['المنتج بالنص', 'ياخذ مربع أو مربعين بس.'], ['الباقي فاضي', 'هالفراغ هو اللي يخلي العين تروح للمنتج.']].map(x => `
  <div style="padding:26px 0;border-top:1.5px solid #2C2C2C"><div style="font:700 44px/58px ${AR}">${x[0]}</div><div class="sub" style="font-size:34px;line-height:50px">${t(x[1])}</div></div>`).join('')}
</div>`);
F.push(finalSlide('افتح آخر بوست لك:<br>وين الفراغ؟', [['الهامش', 'مسافة ثابتة عن الحافة'], ['التجميع', 'اللي يخص بعض قريب'], ['الثلث', 'المنتج ثلث، والباقي فاضي']], 'لُجين'));

(async () => {
  await render(E, __dirname + '/../2026-11-20/E', 'E');
  await render(F, __dirname + '/../2026-11-21/F', 'F');
})();
