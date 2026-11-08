// Tue 17 Nov — concept post as a design lesson (problem → idea → result). NOT approved for public posting yet («ينتظر موافقتك»).
const fs = require('fs');
const path = require('path');
const { t, render, fixLine, GOLD } = require('./lib2');
const AR = "'IBM Plex Sans Arabic'";
const SRC = path.join(__dirname, '../../concepts/2026-11-05-alf-layla');
const img = n => 'data:image/png;base64,' + fs.readFileSync(path.join(SRC, `alf-${String(n).padStart(2, '0')}.png`)).toString('base64');
// crop helper: show part of a 1080×1440 concept slide inside a box
const crop = (n, w, h, x, y, sc) => `<div style="width:${w}px;height:${h}px;overflow:hidden;position:relative;flex:none;border-radius:6px">
  <img src="${img(n)}" style="position:absolute;width:${1080 * sc}px;height:${1440 * sc}px;left:${-x * sc}px;top:${-y * sc}px"></div>`;
const label = `<div style="display:inline-block;border:1.5px solid #3A3A3A;border-radius:40px;padding:6px 18px;font:600 20px/28px Inter;letter-spacing:.14em;color:#8A8A8A">CONCEPT · <span style="font-family:${AR};letter-spacing:0">غير رسمي</span></div>`;
const S = [];
// 1 hook
S.push(`
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="kick"><span class="ar">درس هوية</span><span class="ln"></span><span class="en">Identity lesson</span></div>
  <div class="t" style="margin-top:28px;font-size:88px;line-height:110px">مطعم عمره ${t('55')} سنة…<br>من <span class="gold">وين</span> تبدأ هويته؟</div>
</div>
<div class="abs" style="right:80px;left:80px;top:600px;display:flex;justify-content:space-between;align-items:flex-end">
  ${crop(1, 520, 600, 120, 300, 0.75)}
  <div style="width:360px">${label}<div class="sub" style="margin-top:24px;font-size:34px;line-height:52px">مفهوم غير رسمي اشتغلت عليه، مو تابع لمطعم ألف ليلة وليلة.</div></div>
</div>`);
// 2 problem
S.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">01</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">المشكلة</div>
  <div class="t" style="margin-top:8px;font-size:64px">الناس تحبه… والبراند ساكت</div>
</div>
<div class="abs" style="right:80px;left:80px;top:430px;display:flex;justify-content:center">${crop(2, 920, 640, 0, 380, 0.852)}</div>
<div class="abs" style="right:80px;left:80px;top:1150px">${fixLine('قبل الشعار: دوّر شنو الناس يعرفون عنك أصلاً.')}</div>`);
// 3 idea
S.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">02</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">الفكرة</div>
  <div class="t" style="margin-top:8px">باب + نجمة + فجر</div>
</div>
<div class="abs" style="right:80px;left:80px;top:420px;display:flex;justify-content:center">${crop(3, 920, 470, 0, 400, 0.852)}</div>
<div class="abs" style="right:80px;left:80px;top:990px">
  <div class="sub" style="font-size:34px;line-height:52px">الباب من واجهة المطعم القديمة، والنجمة من اسمه «ليلة»، والشمس لأنه يفتح ${t('4')} الفجر.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:1160px">${fixLine('الرمز الحلو يجمع 3 حكايات الناس يعرفونها.')}</div>`);
// 4 result
S.push(`
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="kick"><span class="ar">النتيجة</span><span class="ln"></span><span class="en">Result</span></div>
  <div class="t" style="margin-top:24px">رمز واحد… بكل مكان</div>
</div>
<div class="abs" style="right:80px;left:80px;top:430px;display:flex;justify-content:space-between;direction:ltr">
  <div style="text-align:center">${crop(9, 440, 600, 80, 260, 0.75)}<div class="sub" style="margin-top:18px;font-size:30px">الواجهة</div></div>
  <div style="text-align:center">${crop(7, 440, 600, 300, 380, 0.85)}<div class="sub" style="margin-top:18px;font-size:30px">الكيس والكرت</div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1170px;display:flex;align-items:center;gap:24px">
  <div style="flex:1;height:3px;background:${GOLD}"></div>
  <div style="font:500 36px/48px ${AR}">الهوية تكمل الحكاية، ما تبدأ من الصفر.</div>
</div>`);
// 5 lesson + CTA (no DM, no price)
S.push(`
<div class="abs" style="right:80px;left:80px;top:210px">
  <div class="kick"><span class="ar">الدرس</span><span class="ln"></span><span class="en">Takeaway</span></div>
  <div class="t" style="margin-top:24px">قبل لا ترسم شعار، اسأل:</div>
</div>
<div class="abs" style="right:80px;left:80px;top:470px">
  ${['شنو الناس يعرفون عنك؟', 'شنو الشي اللي ما يتغير فيك؟', 'شلون يبين بحجم أيقونة؟'].map((x, i) => `
  <div style="display:flex;gap:36px;align-items:center;padding:30px 0;border-top:1.5px solid #2C2C2C">
    <div style="font:600 40px/56px Inter;color:#8A8A8A;width:56px;flex:none">0${i + 1}</div>
    <div style="font:700 48px/64px ${AR}">${x}</div></div>`).join('')}
  <div style="border-top:1.5px solid #2C2C2C"></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1060px;display:flex;justify-content:space-between;align-items:center">
  <div style="border:2px solid ${GOLD};padding:26px 44px;font:700 38px/48px ${AR}">احفظه ← وتابع</div>
  <div style="text-align:left"><div style="font:600 32px/40px Inter;direction:ltr">@nori.dsgn</div><div style="font:400 24px/34px ${AR};color:#8A8A8A">مفهوم غير رسمي للعرض فقط</div></div>
</div>`);
render(S, path.join(__dirname, '../2026-11-17/concept'), 'K');
