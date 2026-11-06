// Fri 6 Nov (C) + Sat 7 Nov (D) — 100% educational carousels (rule B: no DM offer)
const { t, render, fixLine, ARROW, GOLD } = require('./lib2');
const AR = "'IBM Plex Sans Arabic'";

/* ---------- C · «تمرة» (fictional date shop) ---------- */
const BR = '#5B3A29', CR = '#F4E9D8', OR = '#E07A2E';
// cartoon dates (NORI r8: the old blurry circles weren't clear or attractive)
function dateSvg(x, y, r, sc, fill, nut) {
  return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${sc})">
    <ellipse cx="0" cy="0" rx="34" ry="54" fill="${fill}" stroke="#3B1E0E" stroke-width="5"/>
    <path d="M-14 -30 q-8 30 0 60 M10 -38 q8 34 -2 70" fill="none" stroke="#3B1E0E" stroke-width="3" stroke-linecap="round" opacity=".45"/>
    <ellipse cx="-13" cy="-22" rx="7" ry="15" fill="#FFF3DC" opacity=".8"/>
    ${nut ? `<ellipse cx="0" cy="-48" rx="16" ry="11" fill="#F3D39B" stroke="#3B1E0E" stroke-width="4"/><path d="M-7 -49 h12" stroke="#3B1E0E" stroke-width="2.5" stroke-linecap="round" opacity=".5"/>` : ''}
    <path d="M-4 52 q4 8 10 4" fill="none" stroke="#3B1E0E" stroke-width="4" stroke-linecap="round"/></g>`;
}
const photo = (w, h) => `<svg style="position:absolute;inset:0" width="${w}" height="${h}" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
  <rect width="400" height="500" fill="#F6E3C2"/>
  <circle cx="200" cy="250" r="190" fill="#EFCF9C"/>
  ${dateSvg(110, 120, -25, 1.05, '#8E4A22', true)}${dateSvg(250, 95, 20, .95, '#A85A2A', false)}
  ${dateSvg(330, 230, 35, 1, '#7A3D1C', true)}${dateSvg(180, 250, -8, 1.15, '#9B5226', true)}
  ${dateSvg(70, 330, 15, .95, '#A85A2A', false)}${dateSvg(270, 380, -30, 1.05, '#8E4A22', true)}
  ${dateSvg(140, 430, 60, .9, '#7A3D1C', false)}${dateSvg(370, 440, 10, .85, '#9B5226', false)}</svg>`;
function adBad(w) {
  const k = w / 400, h = w * 1.25;
  return `<div style="width:${w}px;height:${h}px;position:relative;overflow:hidden;border-radius:${10 * k}px;flex:none">${photo(w, h)}
    <div style="position:absolute;right:${20 * k}px;left:${20 * k}px;top:${24 * k}px;font:600 ${15 * k}px/${22 * k}px ${AR};color:#FFF8EE">
      تمرة… أجود أنواع التمور المحشية بالمكسرات والشوكولاتة الفاخرة، تشكيلة جديدة لكل المناسبات، اطلب الحين واستمتع بأطيب طعم</div>
    <div style="position:absolute;right:${20 * k}px;bottom:${22 * k}px;font:400 ${12 * k}px/${18 * k}px ${AR};color:#FFF8EE">توصيل لكل المناطق · تغليف هدايا · طلبات الشركات</div></div>`;
}
function adGood(w) {
  const k = w / 400, h = w * 1.25;
  return `<div style="width:${w}px;height:${h}px;position:relative;overflow:hidden;border-radius:${10 * k}px;flex:none;background:${CR}">
    <div style="position:absolute;left:0;right:0;top:0;height:${h * .58}px;overflow:hidden">${photo(w, h)}</div>
    <div style="position:absolute;right:${24 * k}px;left:${24 * k}px;top:${h * .62}px;font:700 ${42 * k}px/${52 * k}px ${AR};color:${BR}">تمر محشي<br>للعزايم</div>
    <div style="position:absolute;right:${24 * k}px;bottom:${22 * k}px;background:${OR};color:#fff;font:700 ${16 * k}px/1 ${AR};padding:${10 * k}px ${16 * k}px;border-radius:${6 * k}px">اطلب من الرابط</div>
    <div style="position:absolute;left:${20 * k}px;bottom:${24 * k}px;font:700 ${15 * k}px/1 ${AR};color:${BR}">تمرة</div></div>`;
}
function phone(inner, w = 300) {
  const h = w * 2.05;
  return `<div style="width:${w}px;height:${h}px;border-radius:${w * .13}px;background:#1A1A1A;padding:${w * .035}px;flex:none;box-shadow:0 20px 40px rgba(0,0,0,.35)">
    <div style="width:100%;height:100%;border-radius:${w * .1}px;background:#fff;overflow:hidden;position:relative">
      <div style="height:${w * .16}px;display:flex;align-items:center;gap:${w * .03}px;padding:0 ${w * .05}px;direction:rtl">
        <div style="width:${w * .09}px;height:${w * .09}px;border-radius:50%;background:${BR}"></div>
        <span style="font:600 ${w * .045}px/1 Inter;color:#111">tamra.store</span></div>
      <div style="display:flex;justify-content:center">${inner}</div>
      <div style="padding:${w * .04}px ${w * .05}px;display:flex;gap:${w * .05}px;direction:ltr">${(`<div style="width:${w * .07}px;height:${w * .07}px;border:2px solid #222;border-radius:50%"></div>`).repeat(3)}</div>
    </div></div>`;
}
const C = [];
// 1 hook (r8: less text)
C.push(`
<div class="abs" style="right:80px;left:80px;top:220px">
  <div class="kick"><span class="ar">درس التصميم</span><span class="ln"></span><span class="en">Design lesson</span></div>
  <div class="big" style="margin-top:32px">تصميمك حلو…<br>بس <span class="gold">بالتلفون</span><br>ما ينقرا؟</div>
</div>
<div class="abs" style="left:110px;top:690px;transform:rotate(-5deg)">${phone(adBad(212),230)}</div>
<div class="abs" style="right:80px;top:900px;width:420px">
  <div style="font:700 64px/80px ${AR}">قريت شي؟</div>
</div>`);
// 2 size
C.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">01</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">حجم الخط</div>
  <div class="t" style="margin-top:8px">${t('سطرين كبار، مو 5 صغار')}</div>
</div>
<div class="abs" style="right:80px;left:80px;top:420px;display:flex;justify-content:space-between">
  <div style="width:440px"><div class="lab"><span class="ar">قبل</span><span class="en">BEFORE</span></div><div style="margin-top:24px">${adBad(440)}</div></div>
  <div style="width:440px"><div class="lab on"><span class="ar">بعد</span><span class="en">AFTER</span></div><div style="margin-top:24px">${adGood(440)}</div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1150px">${fixLine('عنوان واحد كبير، والتفاصيل خلها بالكابشن.')}</div>`);
// 3 contrast
function band(w, mode) {
  const k = w / 440, h = w * 1.25;
  const txt = `<div style="font:700 ${44 * k}px/${56 * k}px ${AR};color:${mode === 'bad' ? '#FFF3E0' : CR}">تمر محشي<br>للعزايم</div>`;
  return `<div style="width:${w}px;height:${h}px;position:relative;overflow:hidden;border-radius:${10 * k}px;flex:none">${photo(w, h)}
    ${mode === 'bad'
      ? `<div style="position:absolute;right:${28 * k}px;top:${h * .38}px">${txt}</div>`
      : `<div style="position:absolute;left:0;right:0;bottom:0;height:${h * .42}px;background:${BR}"></div>
         <div style="position:absolute;right:${28 * k}px;bottom:${h * .14}px">${txt}</div>`}</div>`;
}
C.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">02</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">التباين</div>
  <div class="t" style="margin-top:8px;font-size:68px">النص ما يركب على الزحمة</div>
</div>
<div class="abs" style="right:80px;left:80px;top:420px;display:flex;justify-content:space-between">
  <div style="width:440px"><div class="lab"><span class="ar">قبل</span><span class="en">BEFORE</span></div><div style="margin-top:24px">${band(440, 'bad')}</div></div>
  <div style="width:440px"><div class="lab on"><span class="ar">بعد</span><span class="en">AFTER</span></div><div style="margin-top:24px">${band(440, 'good')}</div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1150px">${fixLine('حط النص على مساحة هادية: لون سادة أو طبقة غامقة.')}</div>`);
// 4 save: 3 tests
C.push(`
<div class="abs" style="right:80px;left:80px;top:220px;display:flex;justify-content:space-between;align-items:flex-start">
  <div><div class="kick"><span class="ar">احفظها</span><span class="ln"></span><span class="en">Save this</span></div>
  <div class="big" style="margin-top:32px">${t('3 اختبارات')}<br>قبل لا تنزل</div></div>
  <svg width="56" height="72" viewBox="0 0 56 72" style="margin-top:8px"><path d="M4 4h48v64L28 50 4 68z" fill="none" stroke="${GOLD}" stroke-width="5" stroke-linejoin="round"/></svg>
</div>
<div class="abs" style="right:80px;left:80px;top:600px">
  ${[['الإبهام', 'صغّر التصميم لحجم إبهامك. ما قريت العنوان؟ كبّره.'], ['التغميضة', 'غمّض عيونك نص تغميضة. إذا النص ذاب بالصورة، زيد التباين.'], ['الثانيتين', 'ورّه أحد ثانيتين بس. يقدر يقول لك شنو تبيع؟']].map((x, i) => `
  <div style="display:flex;gap:40px;align-items:baseline;padding:30px 0;border-top:1.5px solid #2C2C2C">
    <div style="font:600 40px/56px Inter;color:#8A8A8A;width:56px;flex:none">0${i + 1}</div>
    <div style="width:250px;flex:none;font:700 52px/64px ${AR}">${x[0]}</div>
    <div class="sub" style="flex:1;font-size:34px;line-height:52px">${x[1]}</div></div>`).join('')}
  <div style="border-top:1.5px solid #2C2C2C"></div>
</div>`);
// 5 summary + CTA (r8: summary at the end so people save it, less text)
function summary(rows, brand) {
  return `
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="kick"><span class="ar">الملخص</span><span class="ln"></span><span class="en">Summary</span></div>
  <div class="t" style="margin-top:24px">احفظها قبل تصميمك الجاي</div>
</div>
<div class="abs" style="right:80px;left:80px;top:470px">
  ${rows.map((x, i) => `
  <div style="display:flex;gap:36px;align-items:center;padding:34px 0;border-top:1.5px solid #2C2C2C">
    <div style="font:600 40px/56px Inter;color:#8A8A8A;width:56px;flex:none">0${i + 1}</div>
    ${x[2] ? `<div style="width:44px;height:44px;border-radius:50%;background:${x[2]};flex:none"></div>` : ''}
    <div style="width:${x[2] ? 340 : 260}px;flex:none;font:700 ${x[2] ? 46 : 52}px/64px ${AR};white-space:nowrap">${t(x[0])}</div>
    <div style="flex:1;font:500 36px/52px ${AR};color:#C9C6C0">${t(x[1])}</div></div>`).join('')}
  <div style="border-top:1.5px solid #2C2C2C"></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1080px;display:flex;justify-content:space-between;align-items:center">
  <div style="border:2px solid ${GOLD};color:#F2F0EB;padding:26px 44px;font:700 38px/48px ${AR}">احفظه ← وتابع</div>
  <div style="text-align:left;direction:ltr"><div style="font:600 32px/40px Inter">@nori.dsgn</div><div style="font:400 24px/34px ${AR};color:#8A8A8A">«${brand}» براند وهمي للتوضيح</div></div>
</div>`;
}
C.push(summary([['الخط', 'سطرين كبار، مو 5 صغار'], ['التباين', 'النص على مساحة هادية'], ['الاختبار', 'الإبهام · التغميضة · الثانيتين']], 'تمرة'));

/* ---------- D · «موج» (fictional juice bar) — 60-30-10 ---------- */
const TL = '#0F5C63', SN = '#EFE3CF', CO = '#FF6B4A';
function cup(sc, body, lid, band) {
  return `<div style="display:flex;flex-direction:column;align-items:center">
    <div style="width:${96 * sc}px;height:${14 * sc}px;background:${lid};border-radius:${6 * sc}px ${6 * sc}px 0 0"></div>
    <div style="width:${86 * sc}px;height:${120 * sc}px;background:${body};clip-path:polygon(0 0,100% 0,88% 100%,12% 100%);position:relative">
      <div style="position:absolute;left:0;right:0;top:${46 * sc}px;height:${24 * sc}px;background:${band};display:flex;align-items:center;justify-content:center;font:700 ${13 * sc}px/1 ${AR};color:${band === TL ? SN : TL}">موج</div></div></div>`;
}
function post(w, good) {
  const k = w / 400, h = w * 1.25;
  if (!good) return `<div style="width:${w}px;height:${h}px;position:relative;overflow:hidden;border-radius:${10 * k}px;flex:none;background:linear-gradient(160deg,#7B2FF7,#F107A3)">
    <div style="position:absolute;right:${22 * k}px;top:${26 * k}px;font:800 ${40 * k}px/${50 * k}px ${AR};color:#FFE600;text-shadow:0 ${3 * k}px 0 #00C2FF">عصير<br><span style="color:#39FF14">موج</span></div>
    <div style="position:absolute;left:${24 * k}px;top:${150 * k}px">${cup(1.4 * k, '#FF8C00', '#00C2FF', '#39FF14')}</div>
    <div style="position:absolute;right:${22 * k}px;bottom:${26 * k}px;background:#00C2FF;color:#FFE600;font:700 ${18 * k}px/1 ${AR};padding:${10 * k}px ${14 * k}px;border-radius:${20 * k}px">جربه اليوم</div>
    <div style="position:absolute;right:${22 * k}px;top:${160 * k}px;font:600 ${16 * k}px/${24 * k}px ${AR};color:#fff;background:#E3262E;padding:${6 * k}px ${10 * k}px">طبيعي ${t('100%')}</div></div>`;
  return `<div style="width:${w}px;height:${h}px;position:relative;overflow:hidden;border-radius:${10 * k}px;flex:none;background:${TL}">
    <div style="position:absolute;right:${26 * k}px;top:${30 * k}px;font:700 ${40 * k}px/${50 * k}px ${AR};color:${SN}">عصير<br>اليوم</div>
    <div style="position:absolute;left:${78 * k}px;top:${170 * k}px">${cup(2.05 * k, SN, SN, TL)}</div>
    <div style="position:absolute;right:${26 * k}px;bottom:${28 * k}px;background:${CO};color:#fff;font:700 ${18 * k}px/1 ${AR};padding:${12 * k}px ${18 * k}px;border-radius:${6 * k}px">جربه اليوم</div>
    <div style="position:absolute;right:${26 * k}px;top:${132 * k}px;font:400 ${17 * k}px/${26 * k}px ${AR};color:${SN};opacity:.85">طبيعي ${t('100%')}</div></div>`;
}
const D = [];
// 1 hook
D.push(`
<div class="abs" style="right:80px;left:80px;top:220px">
  <div class="kick"><span class="ar">درس الألوان</span><span class="ln"></span><span class="en">Colour lesson</span></div>
  <div class="big" style="margin-top:32px">${t('6 ألوان')} بالبوست…<br>والزبون ما <span class="gold">يتذكر</span><br>ولا واحد؟</div>
</div>
<div class="abs" style="right:80px;left:80px;top:800px;display:flex;gap:28px;align-items:flex-end;direction:ltr">
  ${post(360, false)}
  <div style="flex:1;display:flex;flex-wrap:wrap;gap:16px;direction:rtl">
    ${['#7B2FF7', '#F107A3', '#FFE600', '#39FF14', '#00C2FF', '#FF8C00'].map(c => `<div style="width:110px;height:110px;border-radius:50%;background:${c}"></div>`).join('')}
  </div>
</div>`);
// 2 the rule
D.push(`
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="kick"><span class="ar">القاعدة</span><span class="ln"></span><span class="en">The rule</span></div>
  <div class="big" style="margin-top:32px;direction:ltr;text-align:right;font-family:Inter">60 · 30 · <span class="gold">10</span></div>
  <div class="sub" style="margin-top:20px">ثلاث ألوان بس، وكل لون له نسبة وشغلة.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:640px;height:120px;display:flex;border-radius:8px;overflow:hidden">
  <div style="flex:60;background:${TL}"></div><div style="flex:30;background:${SN}"></div><div style="flex:10;background:${CO}"></div>
</div>
<div class="abs" style="right:80px;left:80px;top:800px">
  ${[['60%', 'الأساسي', 'الخلفيات والمساحات الكبيرة', TL], ['30%', 'الثانوي', 'النصوص والأشكال', SN], ['10%', 'المميز', 'اللي تبي العين تشوفه أول: الزر', CO]].map(x => `
  <div style="display:flex;gap:32px;align-items:center;padding:24px 0;border-top:1.5px solid #2C2C2C">
    <div style="width:44px;height:44px;border-radius:50%;background:${x[3]};flex:none"></div>
    <div style="width:140px;font:600 40px/52px Inter;flex:none;direction:ltr;text-align:right">${x[0]}</div>
    <div style="width:200px;font:700 40px/52px ${AR};flex:none">${x[1]}</div>
    <div class="sub" style="flex:1;font-size:32px;line-height:46px">${x[2]}</div></div>`).join('')}
</div>`);
// 3 before / after
D.push(`
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">نفس البوست، نفس الكلام</div>
  <div class="t" style="margin-top:8px">${t('6 ألوان ضد 3')}</div>
</div>
<div class="abs" style="right:80px;left:80px;top:420px;display:flex;justify-content:space-between">
  <div style="width:440px"><div class="lab"><span class="ar">قبل</span><span class="en">BEFORE</span></div><div style="margin-top:24px">${post(440, false)}</div></div>
  <div style="width:440px"><div class="lab on"><span class="ar">بعد</span><span class="en">AFTER</span></div><div style="margin-top:24px">${post(440, true)}</div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1150px">${fixLine('لون واحد بس يلفت النظر، وهو الزر.')}</div>`);
// 4 applied: one palette everywhere
function story(w) {
  const k = w / 200, h = w * 16 / 9;
  return `<div style="width:${w}px;height:${h}px;border-radius:${12 * k}px;background:${SN};position:relative;overflow:hidden;flex:none">
    <div style="position:absolute;left:0;right:0;top:0;height:${h * .62}px;background:${TL}"></div>
    <div style="position:absolute;right:${16 * k}px;top:${30 * k}px;font:700 ${22 * k}px/${30 * k}px ${AR};color:${SN}">جديد<br>موج مانجو</div>
    <div style="position:absolute;left:0;right:0;top:${h * .32}px;display:flex;justify-content:center">${cup(1.1 * k, SN, SN, TL)}</div>
    <div style="position:absolute;right:${16 * k}px;left:${16 * k}px;bottom:${24 * k}px;background:${CO};color:#fff;text-align:center;font:700 ${14 * k}px/${34 * k}px ${AR};border-radius:${6 * k}px">اطلب</div></div>`;
}
D.push(`
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="kick"><span class="ar">طبقناها على «موج»</span><span class="ln"></span><span class="en">Applied</span></div>
  <div class="t" style="margin-top:24px">نفس الثلاث ألوان بكل مكان</div>
</div>
<div class="abs" style="right:80px;left:80px;top:430px;display:flex;justify-content:space-between;align-items:flex-end;direction:ltr">
  <div style="text-align:center">${story(250)}<div class="sub" style="margin-top:20px;font-size:28px">الستوري</div></div>
  <div style="text-align:center">${post(330, true)}<div class="sub" style="margin-top:20px;font-size:28px">البوست</div></div>
  <div style="text-align:center"><div style="width:220px;height:300px;background:#1A1A1A;border-radius:16px;display:flex;align-items:center;justify-content:center">${cup(1.8, SN, TL, TL)}</div><div class="sub" style="margin-top:20px;font-size:28px">الكوب</div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1130px;display:flex;align-items:center;gap:24px">
  <div style="flex:1;height:3px;background:${GOLD}"></div>
  <div style="font:500 36px/48px ${AR}">الزبون يعرفك من اللون قبل الاسم.</div>
</div>`);
// 5 summary + CTA (r8)
D.push(summary([['60% الأساسي', 'الخلفية', TL], ['30% الثانوي', 'النص والأشكال', SN], ['10% المميز', 'الزر بس', CO]], 'موج'));

(async () => {
  await render(C, __dirname + '/../2026-11-06/C', 'C');
  await render(D, __dirname + '/../2026-11-07/D', 'D');
})();
