// Week 15–21 Nov 2026 — Carousel I (Fri 20 Nov) + Carousel J (Sat 21 Nov). 100% educational (rule B):
// last slide = save / follow / comment, never a DM offer. One gold element per slide.
// I: reel cover crop on the 3:4 profile grid · fictional bakery «تنّور»
// J: logo in the profile circle, 3 versions, one-colour test · fictional café «مِرسى»
const { t, render, fixLine, GOLD } = require('./lib2');
const path = require('path');
const AR = "'IBM Plex Sans Arabic'";
const IV = '#F2F0EB';

/* ───────────── I · «تنّور» ───────────── */
const TR = '#B9502B', SF = '#E8B04A', CRM = '#FFF4E2', OL = '#4F5D2F', BR = '#3A2418';

function loaf(w, c = '#C98A4B') {
  return `<svg width="${w}" height="${w * .7}" viewBox="0 0 200 140" style="flex:none;display:block">
   <ellipse cx="100" cy="128" rx="86" ry="9" fill="#000" opacity=".22"/>
   <path d="M14 108 C10 52 52 18 100 18 C148 18 190 52 186 108 C186 122 170 126 100 126 C30 126 14 122 14 108Z" fill="${c}"/>
   <path d="M30 70 C40 40 70 26 100 26 C130 26 160 40 170 70 C140 50 60 50 30 70Z" fill="#E7B26E" opacity=".75"/>
   <g stroke="#7E4A22" stroke-width="5" stroke-linecap="round" fill="none"><path d="M60 52 L76 88"/><path d="M92 46 L106 90"/><path d="M124 48 L136 86"/></g></svg>`;
}
function tmark(s, c = SF) {
  return `<svg width="${s}" height="${s}" viewBox="0 0 100 100" style="flex:none"><circle cx="50" cy="50" r="46" fill="none" stroke="${c}" stroke-width="7"/><path d="M28 62 C28 40 40 30 50 30 C60 30 72 40 72 62Z" fill="${c}"/><path d="M24 70 H76" stroke="${c}" stroke-width="7" stroke-linecap="round"/></svg>`;
}
function tlogo(s, c = CRM, m = SF) {
  return `<div style="display:flex;align-items:center;gap:${s * .25}px;direction:rtl;justify-content:center">${tmark(s, m)}<span style="font:700 ${s * .7}px/1 ${AR};color:${c}">تنّور</span></div>`;
}
// 9:16 reel cover. o = {bg, title, size, pos:'top'|'mid', sub, logo:'bottom'|'mid'|null, loafW, small}
function cover(w, o) {
  const h = w * 16 / 9, k = w / 300;
  const top = o.pos === 'top' ? 26 * k : h * .22;
  const ttl = `<div style="position:absolute;left:${18 * k}px;right:${18 * k}px;top:${top}px;text-align:center;font:700 ${o.size * k}px/1.22 ${AR};color:${o.tc || CRM}">${o.title}</div>`;
  const lf = `<div style="position:absolute;left:50%;top:${o.loafTop || 50}%;transform:translate(-50%,-50%)">${loaf((o.loafW || 190) * k, o.lc)}</div>`;
  const lg = o.logo === 'bottom' ? `<div style="position:absolute;left:0;right:0;bottom:${22 * k}px">${tlogo(24 * k)}</div>`
    : o.logo === 'mid' ? `<div style="position:absolute;left:0;right:0;top:${h * .73}px">${tlogo(22 * k)}</div>` : '';
  return `<div style="width:${w}px;height:${h}px;position:relative;overflow:hidden;background:${o.bg};flex:none">
    <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 55%,rgba(255,255,255,.14),transparent 62%)"></div>${lf}${ttl}${lg}${o.extra ? o.extra(k, h) : ''}</div>`;
}
// what the grid shows: the 3:4 middle of the cover
function tile(w, o) {
  const h = w * 4 / 3, ch = w * 16 / 9;
  return `<div style="width:${w}px;height:${h}px;overflow:hidden;position:relative;flex:none"><div style="position:absolute;left:0;top:${-(ch - h) / 2}px">${cover(w, o)}</div></div>`;
}
// cover with the cut parts shaded
function cropped(w, o, lab = false) {
  const h = w * 16 / 9, cut = (h - w * 4 / 3) / 2;
  const band = (pos) => `<div style="position:absolute;left:0;right:0;${pos}:0;height:${cut}px;background:rgba(14,14,14,.74);display:flex;align-items:center;justify-content:center;${pos === 'top' ? 'border-bottom' : 'border-top'}:2px dashed ${IV}">${lab ? `<span style="font:500 ${Math.max(22, w * .085)}px/1 ${AR};color:${IV}">ينقص</span>` : ''}</div>`;
  return `<div style="position:relative;flex:none;width:${w}px;height:${h}px">${cover(w, o)}${band('top')}${band('bottom')}</div>`;
}
const ARR = (s = 40, c = '#8A8A8A') => `<svg width="${s}" height="${s * .8}" viewBox="0 0 28 24" style="flex:none"><path d="M26 12H3M12 3L3 12l9 9" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const BAD = { bg: TR, title: 'خبز البيت', size: 50, pos: 'top', logo: 'bottom' };
const GOOD = { bg: TR, title: 'خبز البيت', size: 50, pos: 'mid', logo: 'mid', loafTop: 56 };

const I = [];
// 1 · hook
const gridTiles = [
  { bg: OL, title: 'عجينة<br>ما تفشل', size: 46, pos: 'mid', loafTop: 62, lc: '#D9A35E' },
  { ...BAD },
  { bg: BR, title: 'سر القشرة', size: 46, pos: 'mid', loafTop: 62 },
  { bg: '#8C3B1F', title: 'تمر وسمسم', size: 44, pos: 'mid', loafTop: 62, lc: '#B97A3E' },
  { bg: SF, title: 'خبز الصاج', size: 46, pos: 'mid', loafTop: 62, tc: BR },
  { bg: OL, title: 'خميرة طبيعية', size: 40, pos: 'top', logo: 'bottom' },
];
I.push(`
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="kick"><span class="ar">درس الريلز</span><span class="ln"></span><span class="en">Reel covers</span></div>
  <div class="big" style="margin-top:32px">غلافك حلو…<br>بس بالقريد <span class="gold">ينقص؟</span></div>
  <div class="sub" style="margin-top:24px">بروفايلك يقص غلاف الريل من فوق ومن تحت.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:700px;display:flex;align-items:center;justify-content:space-between;direction:rtl">
  <div style="text-align:center">${cropped(270, BAD)}<div style="font:500 30px/40px ${AR};color:#8A8A8A;margin-top:18px">الغلاف كامل · 9:16</div></div>
  ${ARR(48)}
  <div style="text-align:center"><div style="display:grid;grid-template-columns:repeat(3,166px);gap:5px;direction:ltr;background:#000;padding:5px">
    ${gridTiles.map((o, i) => `<div style="position:relative">${tile(166, o)}${i === 1 || i === 5 ? `<div style="position:absolute;inset:0;box-shadow:inset 0 0 0 4px ${IV}"></div>` : ''}</div>`).join('')}
  </div><div style="font:500 30px/40px ${AR};color:#8A8A8A;margin-top:18px">بالقريد · 3:4</div></div>
</div>`);

// 2 · point 01: keep words in the middle
const pair = (o) => `<div style="display:flex;align-items:flex-end;gap:16px;justify-content:center;direction:rtl;margin-top:28px">${cropped(240, o)}${ARR(28)}<div style="text-align:center"><div style="font:500 26px/34px ${AR};color:#8A8A8A;margin-bottom:12px">بالقريد</div>${tile(150, o)}</div></div>`;
I.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">01</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">المكان</div>
  <div class="t" style="margin-top:8px">الكلام بالنص</div>
  <div class="sub" style="font-size:34px;line-height:50px;margin-top:12px">اللي فوق واللي تحت يروح بالقريد.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:500px;display:flex;gap:40px;direction:rtl">
  <div style="flex:1"><div class="lab"><span class="ar">قبل · العنوان فوق</span><span class="en">BEFORE</span></div>${pair(BAD)}</div>
  <div style="flex:1"><div class="lab on"><span class="ar">بعد · كله بالنص</span><span class="en">AFTER</span></div>${pair(GOOD)}</div>
</div>
<div class="abs" style="right:80px;left:80px;top:1130px">${fixLine('خل الكلام والوجه بالنص، داخل مربع الـ 3:4.')}</div>`);

// 3 · point 02: 3–4 big words
const LONG = { bg: OL, title: 'أسهل طريقة تسوي فيها خبز البيت بدون ما تخرب العجينة معاك', size: 26, pos: 'mid', loafTop: 64, lc: '#D9A35E' };
const SHORT = { bg: OL, title: 'عجينة<br>ما تفشل', size: 58, pos: 'mid', loafTop: 64, lc: '#D9A35E' };
const col = (o, words) => `<div style="display:flex;align-items:flex-end;gap:28px;justify-content:center;direction:rtl;margin-top:28px">
  ${tile(310, o)}
  <div style="text-align:center"><div style="font:500 26px/34px ${AR};color:#8A8A8A;margin-bottom:12px">حجم القريد</div>${tile(96, o)}<div style="font:600 26px/34px Inter;color:#8A8A8A;margin-top:12px">${words}</div></div></div>`;
I.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">02</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">الكلام</div>
  <div class="t" style="margin-top:8px">4 كلمات بالكثير</div>
  <div class="sub" style="font-size:34px;line-height:50px;margin-top:12px">الغلاف عنوان، مو شرح. الشرح بالريل.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:500px;display:flex;gap:40px;direction:rtl">
  <div style="flex:1"><div class="lab"><span class="ar">قبل · جملة كاملة</span><span class="en">BEFORE</span></div>${col(LONG, '12 <span style="font-family:IBM Plex Sans Arabic">كلمة</span>')}</div>
  <div style="flex:1"><div class="lab on"><span class="ar">بعد · كلمتين كبار</span><span class="en">AFTER</span></div>${col(SHORT, '<span style="font-family:IBM Plex Sans Arabic">كلمتين</span>')}</div>
</div>
<div class="abs" style="right:80px;left:80px;top:1130px">${fixLine('إذا ما تنقرا بحجم القريد، قصّرها.')}</div>`);

// 4 · save: the profile grid fixed + 3 rules
const fixed = [
  { bg: OL, title: 'عجينة<br>ما تفشل', size: 46, pos: 'mid', loafTop: 62, lc: '#D9A35E' },
  { ...GOOD, size: 46 },
  { bg: BR, title: 'سر القشرة', size: 46, pos: 'mid', loafTop: 62 },
  { bg: '#8C3B1F', title: 'تمر وسمسم', size: 44, pos: 'mid', loafTop: 62, lc: '#B97A3E' },
  { bg: SF, title: 'خبز الصاج', size: 46, pos: 'mid', loafTop: 62, tc: BR },
  { bg: OL, title: 'خميرة<br>طبيعية', size: 46, pos: 'mid', loafTop: 64 },
];
I.push(`
<div class="abs" style="right:80px;left:80px;top:200px;display:flex;justify-content:space-between;align-items:flex-start">
  <div><div class="kick"><span class="ar">احفظها</span><span class="ln"></span><span class="en">Save this</span></div>
  <div class="t" style="margin-top:24px">قبل لا تنزل الريل</div></div>
  <svg width="56" height="72" viewBox="0 0 56 72" style="margin-top:8px;flex:none"><path d="M4 4h48v64L28 50 4 68z" fill="none" stroke="${GOLD}" stroke-width="5" stroke-linejoin="round"/></svg>
</div>
<div class="abs" style="right:80px;top:470px;width:430px">
  ${[['الوسط', 'الكلام والوجه داخل الـ 3:4'], ['4 كلمات', 'كبيرة، تنقرا بحجم القريد'], ['شي واحد', 'وجه أو منتج، وخلفية تبين']].map((x, i) => `
  <div style="padding:28px 0;border-top:1.5px solid ${i ? '#2C2C2C' : IV}">
    <div style="display:flex;align-items:baseline;gap:20px"><span style="font:600 28px/1 Inter;color:#8A8A8A">0${i + 1}</span><span style="font:700 46px/58px ${AR}">${t(x[0])}</span></div>
    <div style="font:400 34px/48px ${AR};color:#C9C6C0;margin-top:8px">${t(x[1])}</div></div>`).join('')}
  <div style="border-top:1.5px solid #2C2C2C"></div>
</div>
<div class="abs" style="left:80px;top:470px;width:420px">
  <div style="font:500 30px/40px ${AR};color:#8A8A8A;margin-bottom:18px">بروفايل «تنّور» بعد التعديل</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;direction:ltr;background:#000;padding:4px">
    ${fixed.map(o => tile(136, o)).join('')}
  </div>
</div>`);

// 5 · ask + save/follow
I.push(`
<div class="abs" style="right:80px;left:80px;top:220px;text-align:center">
  <div class="kick" style="justify-content:center"><span class="ar">جرّبه اليوم</span><span class="ln"></span><span class="en">Try it</span></div>
  <div class="t" style="margin-top:28px">افتح بروفايلك الحين…<br>كم غلاف ناقص؟</div>
  <div class="sub" style="margin-top:20px">قول لي الرقم بالكومنت.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:700px;display:flex;justify-content:center;gap:22px;direction:rtl">
  ${['الوسط', '4 كلمات', 'شي واحد'].map((x, i) => `<div style="width:276px;height:200px;background:#171717;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:10px">
    <span style="font:600 28px/1 Inter;color:#8A8A8A">0${i + 1}</span><span style="font:700 46px/58px ${AR}">${t(x)}</span></div>`).join('')}
</div>
<div class="abs" style="right:80px;left:80px;top:1010px;display:flex;justify-content:space-between;align-items:center">
  <div style="border:2px solid ${GOLD};padding:26px 44px;font:700 38px/48px ${AR}">احفظه ← وتابع</div>
  <div style="text-align:left"><div style="font:600 32px/40px Inter;direction:ltr">@nori.dsgn</div><div style="font:400 26px/36px ${AR};color:#8A8A8A">«تنّور» براند وهمي سويته للتوضيح</div></div>
</div>`);

/* ───────────── J · «مِرسى» ───────────── */
const NV = '#1F3A5F', CO = '#E8664A', SD = '#F3E3C3', TL = '#3E8E8A';
function mmark(s, bg = NV, fg = SD, sun = CO) {
  return `<svg width="${s}" height="${s}" viewBox="0 0 100 100" style="flex:none;display:block"><circle cx="50" cy="50" r="48" fill="${bg}"/>
  <circle cx="50" cy="42" r="15" fill="${sun}"/>
  <path d="M14 62 Q24 54 34 62 T54 62 T74 62 T94 62" fill="none" stroke="${fg}" stroke-width="7" stroke-linecap="round"/>
  <path d="M22 76 Q31 69 40 76 T58 76 T76 76" fill="none" stroke="${fg}" stroke-width="7" stroke-linecap="round"/></svg>`;
}
// stacked main logo with tagline
function mainLogo(s, c = NV, bg = NV, fg = SD, sun = CO) {
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:${s * .12}px;direction:rtl">${mmark(s, bg, fg, sun)}
  <div style="font:700 ${s * .62}px/1 ${AR};color:${c}">مِرسى</div>
  <div style="font:500 ${s * .2}px/1 ${AR};color:${c};opacity:.8">قهوة على البحر · ${'<span style="font-family:Inter">EST. 2026</span>'}</div></div>`;
}
function horizLogo(s, c = NV) {
  return `<div style="display:flex;align-items:center;gap:${s * .3}px;direction:rtl">${mmark(s)}<span style="font:700 ${s * .78}px/1 ${AR};color:${c}">مِرسى</span></div>`;
}
// IG profile header mock
function profile(w, inner) {
  const k = w / 420;
  return `<div style="width:${w}px;background:#FFFFFF;padding:${26 * k}px ${22 * k}px;direction:ltr;flex:none">
   <div style="font:600 ${20 * k}px/1 Inter;color:#111;margin-bottom:${20 * k}px">mersa.cafe</div>
   <div style="display:flex;align-items:center;gap:${26 * k}px">
     <div style="width:${110 * k}px;height:${110 * k}px;border-radius:50%;overflow:hidden;flex:none;background:${SD};position:relative;box-shadow:0 0 0 ${2 * k}px #DDD">${inner}</div>
     <div style="display:flex;gap:${22 * k}px;flex:1;justify-content:space-around">${[['128', 'posts'], ['4,210', 'followers'], ['96', 'following']].map(x => `<div style="text-align:center"><div style="font:700 ${19 * k}px/1.2 Inter;color:#111">${x[0]}</div><div style="font:400 ${15 * k}px/1.4 Inter;color:#444">${x[1]}</div></div>`).join('')}</div>
   </div>
   <div style="font:400 ${16 * k}px/1.5 ${AR};color:#222;direction:rtl;text-align:right;margin-top:${16 * k}px">قهوة مختصة على البحر ☕</div>
  </div>`;
}
const inCircle = (fn, scale) => `<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(${scale})">${fn}</div>`;

const J = [];
// 1 · hook
J.push(`
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="kick"><span class="ar">درس الهوية</span><span class="ln"></span><span class="en">Logo lesson</span></div>
  <div class="big" style="margin-top:32px">لوقوك حلو…<br>بس بالدائرة <span class="gold">يختفي؟</span></div>
  <div class="sub" style="margin-top:24px">صورة بروفايلك تطلع بالتلفون بحجم ظفرك.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:720px;height:460px;display:flex;align-items:center;justify-content:space-between;direction:rtl">
  <div style="width:460px;height:460px;background:${SD};display:flex;align-items:center;justify-content:center">${mainLogo(170)}</div>
  ${ARR(48)}
  <div style="display:flex;flex-direction:column;align-items:center;gap:26px">
    <div style="width:110px;height:110px;border-radius:50%;overflow:hidden;background:${SD};position:relative;box-shadow:0 0 0 2px #444">${inCircle(mainLogo(170), .22)}</div>
    <div style="font:600 28px/1 Inter;color:#8A8A8A">110px</div>
    <div style="font:500 30px/40px ${AR};color:#8A8A8A;text-align:center">نفس اللوقو<br>بالبروفايل</div>
  </div>
</div>`);

// 2 · point 01: the circle test
J.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">01</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">الدائرة</div>
  <div class="t" style="margin-top:8px">بالبروفايل… الرمز بس</div>
  <div class="sub" style="font-size:34px;line-height:50px;margin-top:12px">الاسم والجملة الصغيرة ما ينقرون بهالحجم.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:500px;display:flex;gap:40px;direction:rtl">
  <div style="flex:1"><div class="lab"><span class="ar">قبل · اللوقو كامل</span><span class="en">BEFORE</span></div>
    <div style="margin-top:28px">${profile(440, inCircle(mainLogo(170), .4))}</div>
    <div style="margin-top:22px;height:250px;background:#171717;display:flex;align-items:center;justify-content:center"><div style="width:200px;height:200px;border-radius:50%;overflow:hidden;background:${SD};position:relative">${inCircle(mainLogo(170), .4)}</div></div></div>
  <div style="flex:1"><div class="lab on"><span class="ar">بعد · الرمز بس</span><span class="en">AFTER</span></div>
    <div style="margin-top:28px">${profile(440, `<div style="position:absolute;inset:0">${mmark(115.2)}</div>`)}</div>
    <div style="margin-top:22px;height:250px;background:#171717;display:flex;align-items:center;justify-content:center"><div style="width:200px;height:200px;border-radius:50%;overflow:hidden">${mmark(200)}</div></div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1176px">${fixLine('إذا ما ينقرا بحجم 110px، حط الرمز بداله.')}</div>`);

// 3 · point 02: 3 versions, applied
const use = (n, h, where, vis, bg) => `<div style="flex:1;display:flex;flex-direction:column">
  <div style="height:400px;background:${bg};display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden">${vis}</div>
  <div style="display:flex;align-items:baseline;gap:14px;margin-top:26px"><span style="font:600 26px/1 Inter;color:#8A8A8A">${n}</span><span style="font:700 42px/52px ${AR}">${h}</span></div>
  <div style="font:400 34px/48px ${AR};color:#C9C6C0;margin-top:6px">${where}</div></div>`;
const sign = `<div style="width:230px;height:290px;background:${NV};display:flex;align-items:center;justify-content:center;box-shadow:0 20px 34px rgba(0,0,0,.35)">${mainLogo(96, SD, SD, NV, CO)}</div>`;
const web = `<div style="width:250px;background:#FFFFFF;box-shadow:0 20px 34px rgba(0,0,0,.35);direction:ltr">
  <div style="height:18px;background:#E8E8E8;display:flex;gap:5px;align-items:center;padding:0 8px">${'<span style="width:7px;height:7px;border-radius:50%;background:#BBB"></span>'.repeat(3)}</div>
  <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 14px;border-bottom:1px solid #EEE;direction:rtl">${horizLogo(30)}<div style="display:flex;gap:8px">${'<span style="width:26px;height:5px;background:#CCC"></span>'.repeat(3)}</div></div>
  <div style="height:150px;background:${TL};position:relative;overflow:hidden"><div style="position:absolute;left:-20px;right:-20px;bottom:0;height:60px;background:${NV}"></div><div style="position:absolute;right:30px;top:30px;width:50px;height:50px;border-radius:50%;background:${CO}"></div></div></div>`;
const cupJ = `<svg width="170" height="250" viewBox="0 0 170 250"><ellipse cx="85" cy="242" rx="62" ry="7" fill="#000" opacity=".25"/>
  <rect x="14" y="20" width="142" height="22" rx="7" fill="${NV}"/><path d="M22 42 H148 L134 238 H36 Z" fill="${SD}"/>
  <g transform="translate(55 105) scale(.6)">${mmark(100).replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
  <path d="M120 42 H148 L134 238 H112 Z" fill="#000" opacity=".07"/></svg>`;
J.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">02</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">النسخ</div>
  <div class="t" style="margin-top:8px">لوقو واحد، 3 نسخ</div>
  <div class="sub" style="font-size:34px;line-height:50px;margin-top:12px">نفس الهوية، بس كل مكان له مقاسه.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:500px;display:flex;gap:28px;direction:rtl">
  ${use('1', 'الرئيسي', 'اللافتة والمنيو', sign, '#26303A')}
  ${use('2', 'الأفقي', 'الموقع والفاتورة', web, '#1C1C1C')}
  ${use('3', 'الرمز', 'البروفايل والكوب', cupJ, '#26303A')}
</div>
<div class="abs" style="right:80px;left:80px;top:1110px">${fixLine('اطلب الثلاث نسخ من المصمم من أول يوم.')}</div>`);

// 4 · point 03: one-colour test
const oneC = (bg, c, lab, where, extra = '') => `<div style="flex:1"><div style="height:400px;background:${bg};display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden">${extra}<div style="position:relative">${mainLogo(110, c, c, bg, bg)}</div></div>
  <div style="font:700 36px/48px ${AR};margin-top:22px">${lab}</div><div style="font:400 34px/48px ${AR};color:#C9C6C0">${where}</div></div>`;
J.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">03</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">اللون</div>
  <div class="t" style="margin-top:8px">جرّبه بلون واحد</div>
  <div class="sub" style="font-size:34px;line-height:50px;margin-top:12px">الختم والتطريز والطباعة الرخيصة… كلها لون واحد.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:500px;display:flex;gap:24px;direction:rtl">
  ${oneC('#FFFFFF', '#111111', 'أسود على أبيض', 'فاتورة وختم')}
  ${oneC(TL, '#FFFFFF', 'أبيض على لون', 'تطريز ويونيفورم')}
  ${oneC('#A87B4F', '#5A3A1E', 'محفور على كرتون', 'كوب وكيس', '<div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(0,0,0,.05) 0 3px,transparent 3px 9px)"></div>')}
</div>
<div class="abs" style="right:80px;left:80px;top:1150px">${fixLine('إذا ما ينقرا بلون واحد، يبيله تعديل.')}</div>`);

// 5 · save checklist + ask
J.push(`
<div class="abs" style="right:80px;left:80px;top:210px">
  <div class="kick"><span class="ar">احفظها</span><span class="ln"></span><span class="en">Save this</span></div>
  <div class="t" style="margin-top:24px">3 اختبارات للوقوك</div>
  <div class="sub" style="margin-top:12px">لوقوك ينجح بكم واحد؟ قول لي بالكومنت.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:560px">
  ${[['الدائرة', 'ينقرا بحجم 110px؟'], ['النسخ', 'عندك رئيسي وأفقي ورمز؟'], ['اللون', 'ينقرا بلون واحد؟']].map((x, i) => `<div style="display:flex;align-items:center;gap:32px;padding:26px 0;border-top:1.5px solid ${i ? '#2C2C2C' : IV}">
    <div style="width:48px;height:48px;border:2.5px solid #8A8A8A;flex:none"></div>
    <div style="font:700 46px/60px ${AR};width:220px;flex:none">${x[0]}</div>
    <div style="font:500 36px/50px ${AR};color:#C9C6C0">${t(x[1])}</div></div>`).join('')}
  <div style="border-top:1.5px solid #2C2C2C"></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1060px;display:flex;justify-content:space-between;align-items:center">
  <div style="border:2px solid ${GOLD};padding:26px 44px;font:700 38px/48px ${AR}">احفظه ← وتابع</div>
  <div style="text-align:left"><div style="font:600 32px/40px Inter;direction:ltr">@nori.dsgn</div><div style="font:400 26px/36px ${AR};color:#8A8A8A">«مِرسى» براند وهمي سويته للتوضيح</div></div>
</div>`);

(async () => {
  const only = process.argv[2];
  if (!only || only === 'I') await render(I, path.join(__dirname, '../2026-11-20/I'), 'I');
  if (!only || only === 'J') await render(J, path.join(__dirname, '../2026-11-21/J'), 'J');
})();
