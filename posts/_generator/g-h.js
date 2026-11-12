// Thu 12 Nov 2026 — two educational carousels (c909): G «طحين» alignment, H «فقاعة» icons
// 100% educational (rule B): last slide = save / follow / comment, no DM.
const { t, render, fixLine, GOLD } = require('./lib2');
const AR = "'IBM Plex Sans Arabic'";
const GUIDE = '#FF4D8D'; // design-tool guide colour (not gold)

/* ================= G · «طحين» (fictional bakery) — alignment ================= */
const OR = '#E07A2E', CR = '#F6E9D6', BR = '#4A2E1B', GN = '#2F5D50';
function bread(sc) {
  return `<svg width="${180 * sc}" height="${110 * sc}" viewBox="0 0 180 110">
    <ellipse cx="90" cy="62" rx="84" ry="44" fill="#C9772F"/>
    <ellipse cx="90" cy="54" rx="80" ry="38" fill="#E3A25A"/>
    <path d="M40 40 q12 18 0 34 M75 30 q12 22 0 44 M110 30 q12 22 0 44 M143 40 q10 16 0 30" fill="none" stroke="#F6D7A8" stroke-width="7" stroke-linecap="round"/></svg>`;
}
// flyer: mode 'messy' | 'clean'; guides: draw start lines
function flyer(w, mode, guides) {
  const k = w / 400, h = w * 1.25;
  const g = (x) => `<div style="position:absolute;top:0;bottom:0;right:${x * k}px;width:${2.5 * k}px;background:${GUIDE}"></div>`;
  if (mode === 'messy') return `<div style="width:${w}px;height:${h}px;position:relative;overflow:hidden;border-radius:${10 * k}px;flex:none;background:${CR}">
    <div style="position:absolute;left:0;right:0;top:${34 * k}px;text-align:center;font:700 ${40 * k}px/${52 * k}px ${AR};color:${BR}">خبز الصبح</div>
    <div style="position:absolute;right:${70 * k}px;top:${96 * k}px;font:500 ${18 * k}px/${28 * k}px ${AR};color:${BR};opacity:.8">طازج كل يوم من الساعة 6</div>
    <div style="position:absolute;left:${60 * k}px;top:${150 * k}px">${bread(1.3 * k)}</div>
    <div style="position:absolute;right:${24 * k}px;top:${320 * k}px;font:600 ${20 * k}px/${30 * k}px ${AR};color:${GN}">صمون · خبز بر · كرواسون</div>
    <div style="position:absolute;right:${150 * k}px;bottom:${36 * k}px;background:${OR};color:#fff;font:700 ${19 * k}px/1 ${AR};padding:${13 * k}px ${20 * k}px;border-radius:${30 * k}px">اطلب الحين</div>
    <div style="position:absolute;left:${24 * k}px;bottom:${40 * k}px;font:700 ${20 * k}px/1 ${AR};color:${BR}">طحين</div>
    ${guides ? g(24) + g(70) + g(150) + g(200) : ''}</div>`;
  return `<div style="width:${w}px;height:${h}px;position:relative;overflow:hidden;border-radius:${10 * k}px;flex:none;background:${CR}">
    <div style="position:absolute;right:${36 * k}px;top:${36 * k}px;font:700 ${40 * k}px/${52 * k}px ${AR};color:${BR}">خبز الصبح</div>
    <div style="position:absolute;right:${36 * k}px;top:${94 * k}px;font:500 ${18 * k}px/${28 * k}px ${AR};color:${BR};opacity:.8">طازج كل يوم من الساعة 6</div>
    <div style="position:absolute;right:${36 * k}px;top:${160 * k}px">${bread(1.3 * k)}</div>
    <div style="position:absolute;right:${36 * k}px;top:${320 * k}px;font:600 ${20 * k}px/${30 * k}px ${AR};color:${GN}">صمون · خبز بر · كرواسون</div>
    <div style="position:absolute;right:${36 * k}px;bottom:${36 * k}px;background:${OR};color:#fff;font:700 ${19 * k}px/1 ${AR};padding:${13 * k}px ${20 * k}px;border-radius:${30 * k}px">اطلب الحين</div>
    <div style="position:absolute;left:${36 * k}px;bottom:${40 * k}px;font:700 ${20 * k}px/1 ${AR};color:${BR}">طحين</div>
    ${guides ? g(36) : ''}</div>`;
}
const G = [];
// G1 hook: one messy flyer with 4 guide lines + counter
G.push(`
<div class="abs" style="right:80px;left:80px;top:220px">
  <div class="kick"><span class="ar">درس التصميم</span><span class="ln"></span><span class="en">Design lesson</span></div>
  <div class="big" style="margin-top:32px">تصميمك مرتب…<br>بس يبين <span class="gold">مخربط؟</span></div>
  <div class="sub" style="margin-top:24px">المشكلة مو بالألوان. بالمحاذاة.</div>
</div>
<div class="abs" style="right:80px;top:720px">${flyer(400, 'messy', true)}</div>
<div class="abs" style="left:80px;top:760px;width:400px">
  <div style="font:600 200px/200px Inter;color:${GUIDE};direction:ltr;text-align:left">4</div>
  <div style="font:700 48px/64px ${AR};margin-top:16px">بدايات مختلفة</div>
  <div class="sub" style="font-size:34px;line-height:50px;margin-top:8px">كل عنصر يبدأ من مكان،<br>والعين تتعب وهي تلحقهم.</div>
</div>`);
// G2 one edge: before/after stacked on a wide banner
function banner(mode) {
  const W = 920, H = 260;
  const items = mode === 'messy'
    ? [['right:40px;top:30px', `font:700 52px/64px ${AR}`, 'كرواسون بالزبدة'], ['right:180px;top:110px', `font:500 26px/38px ${AR};opacity:.85`, 'ينخبز كل صبح'], ['right:90px;bottom:30px', `background:${OR};color:#fff;font:700 24px/1 ${AR};padding:16px 26px;border-radius:40px`, 'اطلب الحين']]
    : [['right:48px;top:30px', `font:700 52px/64px ${AR}`, 'كرواسون بالزبدة'], ['right:48px;top:110px', `font:500 26px/38px ${AR};opacity:.85`, 'ينخبز كل صبح'], ['right:48px;bottom:34px', `background:${OR};color:#fff;font:700 24px/1 ${AR};padding:16px 26px;border-radius:40px`, 'اطلب الحين']];
  const lines = mode === 'messy' ? [40, 90, 180] : [48];
  return `<div style="width:${W}px;height:${H}px;position:relative;overflow:hidden;border-radius:12px;background:${GN};color:${CR}">
    ${items.map(x => `<div style="position:absolute;${x[0]};${x[1]}">${x[2]}</div>`).join('')}
    <div style="position:absolute;left:60px;top:50px">${bread(1.45)}</div>
    ${lines.map(r => `<div style="position:absolute;top:0;bottom:0;right:${r}px;width:3px;background:${GUIDE}"></div>`).join('')}</div>`;
}
G.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">01</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">الحافة</div>
  <div class="t" style="margin-top:8px">اختار حافة وحدة</div>
</div>
<div class="abs" style="right:80px;left:80px;top:410px">
  <div class="lab"><span class="ar">قبل · 3 بدايات</span><span class="en">BEFORE</span></div>
  <div style="margin-top:16px">${banner('messy')}</div>
  <div class="lab on" style="margin-top:32px"><span class="ar">بعد · خط واحد</span><span class="en">AFTER</span></div>
  <div style="margin-top:16px">${banner('clean')}</div>
</div>
<div class="abs" style="right:80px;left:80px;top:1190px">${fixLine('بالعربي ابدأ كل شي من اليمين، على نفس الخط.')}</div>`);
// G3 centre only for short text: menu card
function card(mode) {
  const para = 'عجينة تتخمر 24 ساعة، وتنخبز على الحجر كل صبح بالفرن، وتطلع مقرمشة من برا وطرية من داخل، وتوصلك حارة لين باب البيت.';
  const center = mode === 'bad';
  return `<div style="width:430px;height:620px;position:relative;overflow:hidden;border-radius:12px;background:${CR};color:${BR};padding:44px 40px">
    <div style="display:flex;justify-content:${center ? 'center' : 'flex-start'}">${bread(1.2)}</div>
    <div style="text-align:${center ? 'center' : 'right'};font:700 44px/58px ${AR};margin-top:24px">خبز الحجر</div>
    <div style="text-align:${center ? 'center' : 'right'};font:500 26px/40px ${AR};margin-top:14px;opacity:.85">${t(para)}</div>
    <div style="position:absolute;left:40px;right:40px;bottom:40px;display:flex;justify-content:${center ? 'center' : 'flex-start'}"><span style="background:${OR};color:#fff;font:700 24px/1 ${AR};padding:16px 26px;border-radius:40px">اطلبه</span></div></div>`;
}
G.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">02</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">الوسط</div>
  <div class="t" style="margin-top:8px">الفقرة مو بالوسط</div>
</div>
<div class="abs" style="right:80px;left:80px;top:430px;display:flex;justify-content:space-between">
  <div style="width:430px"><div class="lab"><span class="ar">قبل</span><span class="en">BEFORE</span></div><div style="margin-top:24px">${card('bad')}</div></div>
  <div style="width:430px"><div class="lab on"><span class="ar">بعد</span><span class="en">AFTER</span></div><div style="margin-top:24px">${card('good')}</div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1190px">${fixLine('الفقرة تبدأ من اليمين، عشان العين تلقى أول السطر.')}</div>`);
// G4 save: the ruler test
G.push(`
<div class="abs" style="right:80px;left:80px;top:220px;display:flex;justify-content:space-between;align-items:flex-start">
  <div><div class="kick"><span class="ar">احفظه</span><span class="ln"></span><span class="en">Save this</span></div>
  <div class="big" style="margin-top:32px">اختبار المسطرة</div></div>
  <svg width="56" height="72" viewBox="0 0 56 72" style="margin-top:8px"><path d="M4 4h48v64L28 50 4 68z" fill="none" stroke="${GOLD}" stroke-width="5" stroke-linejoin="round"/></svg>
</div>
<div class="abs" style="right:80px;left:80px;top:520px">
  ${[['1', 'ارسم خط', 'على بداية كل عنصر بالتصميم'], ['2', 'عد الخطوط', 'أكثر من 2؟ التصميم بيبين مخربط'], ['3', 'حرّك العناصر', 'لين يصيرون على خط واحد أو خطين']].map(x => `
  <div style="display:flex;gap:36px;align-items:flex-start;padding:34px 0;border-top:1.5px solid #2C2C2C">
    <div style="width:64px;height:64px;flex:none;border:3px solid ${GUIDE};color:${GUIDE};font:600 34px/58px Inter;text-align:center">${x[0]}</div>
    <div><div style="font:700 54px/68px ${AR}">${x[1]}</div><div class="sub" style="font-size:36px;line-height:52px">${x[2]}</div></div></div>`).join('')}
  <div style="border-top:1.5px solid #2C2C2C"></div>
</div>`);
// shared last slide (different layout from E/F: stacked rows, not columns)
function lastSlide(q, rows, brand) {
  return `
<div class="abs" style="right:80px;left:80px;top:210px">
  <div class="kick"><span class="ar">جرّبه اليوم</span><span class="ln"></span><span class="en">Try it</span></div>
  <div class="t" style="margin-top:24px">${q}</div>
</div>
<div class="abs" style="right:80px;left:80px;top:580px">
  ${rows.map((x, i) => `<div style="display:flex;align-items:baseline;gap:32px;padding:26px 0;border-top:1.5px solid ${i ? '#2C2C2C' : '#F2F0EB'}">
    <div style="font:600 30px/40px Inter;color:#8A8A8A;width:48px;flex:none">0${i + 1}</div>
    <div style="font:700 46px/60px ${AR};width:260px;flex:none">${x[0]}</div>
    <div style="font:500 34px/50px ${AR};color:#C9C6C0">${t(x[1])}</div></div>`).join('')}
</div>
<div class="abs" style="right:80px;left:80px;top:1090px;display:flex;justify-content:space-between;align-items:center">
  <div style="border:2px solid ${GOLD};padding:26px 44px;font:700 38px/48px ${AR}">احفظه ← وتابع</div>
  <div style="text-align:left"><div style="font:600 32px/40px Inter;direction:ltr">@nori.dsgn</div><div style="font:400 24px/34px ${AR};color:#8A8A8A">«${brand}» براند وهمي للتوضيح</div></div>
</div>`;
}
G.push(lastSlide('كم بداية لقيت<br>بآخر بوست لك؟', [['الحافة', 'كل شي يبدأ من نفس الخط'], ['الوسط', 'للعنوان القصير بس'], ['المسطرة', 'خطين بالكثير']], 'طحين'));

/* ================= H · «فقاعة» (fictional laundry) — icon families ================= */
const TL = '#1B6F7A', MN = '#CDEDE6', YL = '#F4C542', NY = '#14304A', WT = '#F7FBFA';
const P = {
  truck: '<path d="M2 6h12v10H2z"/><path d="M14 9h4l3 3v4h-7z"/><circle cx="6" cy="17.5" r="1.9"/><circle cx="17" cy="17.5" r="1.9"/>',
  iron: '<path d="M3 17l3-7a2 2 0 0 1 2-1h8a5 5 0 0 1 5 5v3z"/><path d="M10 9V6h6"/>',
  drop: '<path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
};
function ic(name, size, o) {
  const fill = o.fill || 'none', join = o.join || 'round';
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" style="flex:none"><g fill="${fill}" stroke="${o.c}" stroke-width="${o.sw}" stroke-linecap="${join === 'round' ? 'round' : 'square'}" stroke-linejoin="${join}">${P[name]}</g></svg>`;
}
const MIXED = [['truck', { c: NY, sw: 1, fill: YL, join: 'miter' }], ['iron', { c: NY, sw: 0.8 }], ['drop', { c: NY, sw: 3.4, fill: '#6CC3D5' }], ['clock', { c: '#C0392B', sw: 2.2, join: 'miter' }]];
const CLEAN = ['truck', 'iron', 'drop', 'clock'].map(n => [n, { c: NY, sw: 1.8 }]);
const LBL = ['توصيل', 'كوي', 'تعطير', 'نفس اليوم'];
function servicesPost(w, set) {
  const k = w / 400, h = w * 1.25;
  return `<div style="width:${w}px;height:${h}px;position:relative;overflow:hidden;border-radius:${12 * k}px;flex:none;background:${MN}">
    <div style="position:absolute;right:${32 * k}px;top:${32 * k}px;font:700 ${38 * k}px/${50 * k}px ${AR};color:${NY}">ثيابك علينا</div>
    <div style="position:absolute;right:${32 * k}px;top:${86 * k}px;font:500 ${17 * k}px/${26 * k}px ${AR};color:${TL}">غسيل وكوي من بابك لبابك</div>
    <div style="position:absolute;right:${24 * k}px;left:${24 * k}px;top:${160 * k}px;display:grid;grid-template-columns:1fr 1fr;gap:${14 * k}px">
      ${set.map((x, i) => `<div style="background:${WT};border-radius:${12 * k}px;padding:${18 * k}px ${10 * k}px;display:flex;flex-direction:column;align-items:center;gap:${10 * k}px">${ic(x[0], 64 * k, x[1])}<div style="font:700 ${18 * k}px/${24 * k}px ${AR};color:${NY}">${LBL[i]}</div></div>`).join('')}
    </div>
    <div style="position:absolute;left:${32 * k}px;bottom:${30 * k}px;background:${TL};color:${WT};font:700 ${17 * k}px/1 ${AR};padding:${12 * k}px ${20 * k}px;border-radius:${30 * k}px">اطلب مندوب</div>
    <div style="position:absolute;right:${32 * k}px;bottom:${34 * k}px;font:700 ${20 * k}px/1 ${AR};color:${TL}">فقاعة</div></div>`;
}
const H = [];
// H1 hook: big tilted post on the left, 4 "family" tags on the right
H.push(`
<div class="abs" style="right:80px;left:80px;top:220px">
  <div class="kick"><span class="ar">درس التصميم</span><span class="ln"></span><span class="en">Design lesson</span></div>
  <div class="big" style="margin-top:32px">أيقوناتك<br>من كم <span class="gold">عائلة؟</span></div>
</div>
<div class="abs" style="left:110px;top:640px;transform:rotate(-3deg)">${servicesPost(470, MIXED)}</div>
<div class="abs" style="right:80px;top:720px;width:330px">
  ${['معبّاة بلون', 'خط رفيع', 'خط عريض', 'لون ثاني'].map((x, i) => `<div style="display:flex;align-items:center;gap:18px;padding:18px 0;border-top:1.5px solid #2C2C2C;font:500 34px/48px ${AR};color:#C9C6C0"><span style="font:600 26px/1 Inter;color:#8A8A8A">0${i + 1}</span>${x}</div>`).join('')}
  <div style="border-top:1.5px solid #2C2C2C"></div>
  <div class="sub" style="font-size:32px;line-height:48px;margin-top:28px">4 أيقونات… من 4 عوايل.<br>والبوست يبين رخيص.</div>
</div>`);
// H2 stroke weight: magnified circles
function lens(name, o, label) {
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:18px">
    <div style="width:190px;height:190px;border-radius:50%;background:${WT};display:flex;align-items:center;justify-content:center">${ic(name, 130, o)}</div>
    <div style="font:600 28px/36px Inter;color:#C9C6C0;direction:ltr">${label}</div></div>`;
}
H.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">01</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">سماكة الخط</div>
  <div class="t" style="margin-top:8px">سماكة وحدة لكلهم</div>
</div>
<div class="abs" style="right:80px;left:80px;top:430px">
  <div class="lab"><span class="ar">قبل · 3 سماكات</span><span class="en">BEFORE</span></div>
  <div style="display:flex;justify-content:space-between;margin-top:30px;direction:ltr">${lens('truck', { c: NY, sw: 0.8 }, '0.8px')}${lens('iron', { c: NY, sw: 3.4 }, '3.4px')}${lens('drop', { c: NY, sw: 1.8 }, '1.8px')}${lens('clock', { c: NY, sw: 0.8 }, '0.8px')}</div>
  <div class="lab on" style="margin-top:48px"><span class="ar">بعد · سماكة وحدة</span><span class="en">AFTER</span></div>
  <div style="display:flex;justify-content:space-between;margin-top:30px;direction:ltr">${['truck', 'iron', 'drop', 'clock'].map(n => lens(n, { c: NY, sw: 1.8 }, '1.8px')).join('')}</div>
</div>
<div class="abs" style="right:80px;left:80px;top:1190px">${fixLine('اختار سماكة وحدة، وطبقها على كل الأيقونات.')}</div>`);
// H3 one style: filled OR outline, same corners — shown inside the post
H.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">02</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">الستايل</div>
  <div class="t" style="margin-top:8px">اختار ستايل واحد</div>
</div>
<div class="abs" style="right:80px;left:80px;top:430px;display:flex;justify-content:space-between">
  <div style="width:430px"><div class="lab"><span class="ar">قبل</span><span class="en">BEFORE</span></div><div style="margin-top:24px">${servicesPost(430, MIXED)}</div></div>
  <div style="width:430px"><div class="lab on"><span class="ar">بعد</span><span class="en">AFTER</span></div><div style="margin-top:24px">${servicesPost(430, CLEAN)}</div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1190px">${fixLine('مفرّغة ولا معبّاة؟ وحدة بس، وبنفس الزوايا واللون.')}</div>`);
// H4 save: the 24 grid
H.push(`
<div class="abs" style="right:80px;left:80px;top:220px;display:flex;justify-content:space-between;align-items:flex-start">
  <div><div class="kick"><span class="ar">احفظه</span><span class="ln"></span><span class="en">Save this</span></div>
  <div class="big" style="margin-top:32px">مربع الـ <span class="n">24</span></div></div>
  <svg width="56" height="72" viewBox="0 0 56 72" style="margin-top:8px"><path d="M4 4h48v64L28 50 4 68z" fill="none" stroke="${GOLD}" stroke-width="5" stroke-linejoin="round"/></svg>
</div>
<div class="abs" style="left:80px;top:540px;width:380px;height:380px;background:${WT};border-radius:16px;overflow:hidden">
  <svg width="380" height="380" viewBox="0 0 24 24" style="position:absolute;inset:0">
    ${Array.from({ length: 23 }, (_, i) => `<path d="M${i + 1} 0V24M0 ${i + 1}H24" stroke="#D5E4E1" stroke-width=".06"/>`).join('')}
    <rect x="2" y="2" width="20" height="20" fill="none" stroke="${GUIDE}" stroke-width=".12" stroke-dasharray=".5 .4"/>
    <g fill="none" stroke="${NY}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${P.drop}</g></svg>
</div>
<div class="abs" style="right:80px;top:540px;width:440px">
  ${[['المربع', '24 × 24 لكل أيقونة'], ['الهامش', '2 من كل جهة'], ['الخط', '1.8 لكلهم'], ['الزوايا', 'كلها دائرية أو كلها حادة']].map(x => `
  <div style="padding:22px 0;border-top:1.5px solid #2C2C2C"><div style="font:700 44px/56px ${AR}">${x[0]}</div><div class="sub" style="font-size:34px;line-height:48px">${t(x[1])}</div></div>`).join('')}
  <div style="border-top:1.5px solid #2C2C2C"></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1130px" ><div class="sub" style="font-size:32px;line-height:48px">أو أسهل: خذ كل أيقوناتك من مكتبة وحدة، ولا تخلطها.</div></div>`);
H.push(lastSlide('عد أيقونات آخر بوست لك:<br>من كم عائلة؟', [['السماكة', 'وحدة لكل الأيقونات'], ['الستايل', 'مفرّغة أو معبّاة، مو خليط'], ['المربع', '24 × 24 بنفس الهامش']], 'فقاعة'));

(async () => {
  const which = process.argv[2] || 'GH';
  if (which.includes('G')) await render(G, require('path').join(__dirname, '../2026-11-12/G'), 'G');
  if (which.includes('H')) await render(H, require('path').join(__dirname, '../2026-11-12/H'), 'H');
})();
