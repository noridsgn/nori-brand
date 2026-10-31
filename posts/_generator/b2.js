const { t, render, fixLine, ARROW, GOLD } = require('./lib2');
const NV = '#1E2A3E', SD = '#EADFCB', TC = '#C2603F', WH = '#FFFFFF';

function bars(n, cur, c = 'rgba(255,255,255,.9)') {
  let h = '';
  for (let i = 0; i < n; i++) h += `<div style="flex:1;height:3px;border-radius:2px;background:${i <= cur ? c : 'rgba(255,255,255,.35)'}"></div>`;
  return `<div style="position:absolute;left:10px;right:10px;top:10px;display:flex;gap:3px;direction:ltr">${h}</div>`;
}
function story(w, bg, inner, n = 3, cur = 0, chip = true) {
  const h = Math.round(w * 16 / 9);
  return `<div style="width:${w}px;height:${h}px;border-radius:${w / 18}px;background:${bg};position:relative;overflow:hidden;flex:none;direction:rtl">
    ${bars(n, cur)}
    ${chip ? `<div style="position:absolute;right:${w * .05}px;top:${w * .07}px;display:flex;align-items:center;gap:${w * .025}px">
      <div style="width:${w * .1}px;height:${w * .1}px;border-radius:50%;background:${NV};border:2px solid ${SD};display:flex;align-items:center;justify-content:center;font:700 ${w * .05}px/1 'IBM Plex Sans Arabic';color:${SD}">س</div>
      <span style="font:600 ${w * .045}px/1 Inter;color:${WH};direction:ltr">sadeem.kw</span></div>` : ''}
    ${inner}</div>`;
}
function bottle(sc) {
  return `<div style="display:flex;flex-direction:column;align-items:center">
    <div style="width:${34 * sc}px;height:${26 * sc}px;background:${TC};border-radius:${4 * sc}px ${4 * sc}px 0 0"></div>
    <div style="width:${18 * sc}px;height:${10 * sc}px;background:#B9AE98"></div>
    <div style="width:${110 * sc}px;height:${130 * sc}px;background:${NV};border-radius:${10 * sc}px;display:flex;align-items:center;justify-content:center">
      <div style="width:${62 * sc}px;height:${40 * sc}px;border:${1.5 * sc}px solid ${SD};display:flex;align-items:center;justify-content:center;font:700 ${16 * sc}px/1 'IBM Plex Sans Arabic';color:${SD}">سَديم</div></div></div>`;
}

// the 3 good stories
function good(i, w) {
  const k = w / 288;
  if (i === 0) return story(w, NV, `
    <div style="position:absolute;right:${24 * k}px;left:${24 * k}px;top:${120 * k}px;font:700 ${34 * k}px/${48 * k}px 'IBM Plex Sans Arabic';color:${SD}">عطرك يختفي<br>بعد ساعتين؟</div>
    <div style="position:absolute;right:${24 * k}px;left:${24 * k}px;top:${270 * k}px;background:${WH};border-radius:${12 * k}px;padding:${14 * k}px;text-align:center">
      <div style="font:600 ${15 * k}px/${22 * k}px 'IBM Plex Sans Arabic';color:#555;margin-bottom:${10 * k}px">صوّت</div>
      <div style="display:flex;gap:${8 * k}px"><div style="flex:1;border:1.5px solid #DDD;border-radius:${8 * k}px;font:700 ${18 * k}px/${36 * k}px 'IBM Plex Sans Arabic';color:${NV}">إي والله</div><div style="flex:1;border:1.5px solid #DDD;border-radius:${8 * k}px;font:700 ${18 * k}px/${36 * k}px 'IBM Plex Sans Arabic';color:${NV}">لا</div></div></div>`, 3, 0);
  if (i === 1) return story(w, SD, `
    <div style="position:absolute;left:0;right:0;top:${80 * k}px;display:flex;justify-content:center">${bottle(1.3 * k)}</div>
    <div style="position:absolute;right:${24 * k}px;left:${24 * k}px;bottom:${44 * k}px">
      <div style="font:700 ${36 * k}px/${46 * k}px 'IBM Plex Sans Arabic';color:${NV}">${t('يثبت 12 ساعة')}</div>
      <div style="font:400 ${17 * k}px/${26 * k}px 'IBM Plex Sans Arabic';color:#6B6150">سَديم · عود وفانيلا</div></div>`, 3, 1).replace(/rgba\(255,255,255,/g, 'rgba(30,42,62,').replace(`color:${WH};direction:ltr">sadeem`, `color:${NV};direction:ltr">sadeem`);
  return story(w, TC, `
    <div style="position:absolute;right:${24 * k}px;left:${24 * k}px;top:${130 * k}px;font:700 ${38 * k}px/${50 * k}px 'IBM Plex Sans Arabic';color:${WH}">اطلبه<br>الحين</div>
    <div style="position:absolute;right:${24 * k}px;top:${260 * k}px;background:${WH};border-radius:${10 * k}px;padding:${10 * k}px ${16 * k}px;display:flex;align-items:center;gap:${8 * k}px;direction:ltr">
      <svg width="${18 * k}" height="${18 * k}" viewBox="0 0 24 24"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" fill="none" stroke="#2F6FED" stroke-width="2.5" stroke-linecap="round"/></svg>
      <span style="font:700 ${17 * k}px/1 Inter;color:#2F6FED">SADEEM.KW</span></div>
    <div style="position:absolute;right:${24 * k}px;left:${24 * k}px;bottom:${44 * k}px;font:400 ${17 * k}px/${26 * k}px 'IBM Plex Sans Arabic';color:${WH}">توصيل نفس اليوم</div>`, 3, 2);
}
// random stories
function bad(i, w) {
  const k = w / 168;
  const S = [
    ['linear-gradient(160deg,#FF9A8B,#FF6A88 55%,#FF99AC)', `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 ${24 * k}px/1.3 'IBM Plex Sans Arabic';color:#fff;text-align:center">صباح<br>الخير</div>`],
    ['#F4F4F4', `<div style="position:absolute;left:${14 * k}px;right:${14 * k}px;top:${80 * k}px;background:#fff;border-radius:${8 * k}px;padding:${8 * k}px;box-shadow:0 2px 8px rgba(0,0,0,.15);font:400 ${11 * k}px/1.5 'IBM Plex Sans Arabic';color:#333">شكراً على الهدية<br>وصلتني اليوم<br><span style="color:#999">@user_8812</span></div>`],
    ['#6C2BD9', `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 ${26 * k}px/1 'IBM Plex Sans Arabic';color:#FFE600">تابعونا</div>`],
    ['#9A9A9A', `<div style="position:absolute;left:0;right:0;top:${90 * k}px;display:flex;justify-content:center;filter:blur(${5 * k}px)">${bottle(.8 * k)}</div>`],
    ['#E3262E', `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 ${28 * k}px/1 'IBM Plex Sans Arabic';color:#fff;transform:rotate(-8deg)">عرض!!!</div>`],
  ];
  return story(w, S[i][0], S[i][1], 15, 3 + i * 2, false);
}

const slides = [];

// 1 HOOK
slides.push(`
<div class="abs" style="right:80px;left:80px;top:240px">
  <div class="kick"><span class="ar">دليل الستوري</span><span class="ln"></span><span class="en">Story guide</span></div>
  <div class="big" style="margin-top:32px">${t('15 ستوري')} باليوم…<br><span class="gold">ولا طلب</span> واحد؟</div>
  <div class="sub" style="margin-top:32px">المشكلة مو بالعدد. المشكلة بالترتيب.</div>
</div>
<div class="abs" style="left:80px;right:80px;top:850px;height:400px;overflow:hidden">
  ${[0, 1, 2, 3, 4].map(i => `<div style="position:absolute;top:${20 + (i % 2) * 30}px;left:${i * 182}px;transform:rotate(${[-6, 4, -3, 5, -4][i]}deg)">${bad(i, 168)}</div>`).join('')}
</div>`);

// 2 BEFORE / AFTER
slides.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">01</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">نفس البراند، نفس اليوم</div>
  <div class="t" style="margin-top:8px">${t('15 عشوائي ضد 3 مرتبة')}</div>
</div>
<div class="abs" style="right:80px;left:80px;top:380px">
  <div class="lab"><span class="ar">قبل</span><span class="en">BEFORE</span></div>
  <div style="margin-top:20px;display:flex;justify-content:space-between;direction:ltr">${[4, 3, 2, 1, 0].map(i => bad(i, 160)).join('')}</div>
</div>
<div class="abs" style="right:80px;left:80px;top:768px">
  <div class="lab on"><span class="ar">بعد</span><span class="en">AFTER</span></div>
  <div style="margin-top:20px;display:flex;justify-content:space-between;align-items:flex-start;direction:ltr">${[2, 1, 0].map(i => good(i, 160)).join('')}
    <div style="width:330px;direction:rtl;font:400 28px/42px 'IBM Plex Sans Arabic';color:#8A8A8A;padding-top:8px">ثلاث ستوريات وراء بعض:<br><span style="color:#F2F0EB">سؤال، منتج، رابط.</span><br>كل وحدة تسلم الزبون للي بعدها.</div>
  </div>
</div>
<div class="abs" style="right:80px;left:80px;top:1176px">${fixLine('الحل: ستوري مرتب يقود الزبون لين الطلب.')}</div>`);

// 3 APPLIED — the 3 stories big
const steps = [['1', 'شد', 'سؤال يحس فيه'], ['2', 'وريه', 'المنتج والفايدة برقم'], ['3', 'حرّكه', 'رابط أو تصويت']];
slides.push(`
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="kick"><span class="ar">طبقناها على «سَديم»</span><span class="ln"></span><span class="en">Applied</span></div>
  <div class="sub" style="font-size:26px;line-height:40px;margin-top:8px">«سَديم» براند وهمي سويته للتوضيح</div>
</div>
<div class="abs" style="right:80px;left:80px;top:330px;display:flex;justify-content:space-between">
  ${[0, 1, 2].map(i => `<div>${good(i, 288)}
    <div style="margin-top:28px;display:flex;align-items:baseline;gap:16px">
      <span style="font:600 40px/48px Inter;color:#8A8A8A">0${steps[i][0]}</span>
      <span style="font:700 44px/56px 'IBM Plex Sans Arabic'">${steps[i][1]}</span></div>
    <div style="font:400 26px/38px 'IBM Plex Sans Arabic';color:#8A8A8A;margin-top:4px">${steps[i][2]}</div></div>`).join('')}
</div>
<div class="abs" style="right:80px;left:80px;top:1080px;display:flex;align-items:center;gap:24px">
  <div style="flex:1;height:3px;background:${GOLD}"></div>
  <div style="font:500 36px/48px 'IBM Plex Sans Arabic'">${t('3 ستوريات… وطلب.')}</div>
</div>`);

// 4 SAVE
slides.push(`
<div class="abs" style="right:80px;left:80px;top:220px;display:flex;justify-content:space-between;align-items:flex-start">
  <div><div class="kick"><span class="ar">احفظها</span><span class="ln"></span><span class="en">Save this</span></div>
  <div class="big" style="margin-top:32px">${t('قاعدة الـ 3')}<br>ستوريات</div></div>
  <svg width="56" height="72" viewBox="0 0 56 72" style="margin-top:8px"><path d="M4 4h48v64L28 50 4 68z" fill="none" stroke="${GOLD}" stroke-width="5" stroke-linejoin="round"/></svg>
</div>
<div class="abs" style="right:80px;left:80px;top:600px">
  ${[['شد', 'سؤال أو مشكلة يحس فيها الزبون', '«عطرك يختفي بعد ساعتين؟»'], ['وريه', 'المنتج بوضوح، والفايدة برقم', '«يثبت 12 ساعة»'], ['حرّكه', 'ستيكر رابط أو تصويت، خطوة وحدة', '«اطلبه الحين»']].map((x, i) => `
  <div style="display:flex;gap:40px;align-items:baseline;padding:32px 0;border-top:1.5px solid #2C2C2C">
    <div style="font:600 40px/56px Inter;color:#8A8A8A;width:56px;flex:none">0${i + 1}</div>
    <div style="flex:1"><div style="font:700 52px/64px 'IBM Plex Sans Arabic'">${x[0]}</div>
    <div class="sub" style="margin-top:4px">${x[1]}</div></div>
    <div style="font:400 28px/40px 'IBM Plex Sans Arabic';color:#F2F0EB;width:300px;text-align:left">${t(x[2])}</div></div>`).join('')}
  <div style="border-top:1.5px solid #2C2C2C"></div>
</div>`);

// 5 CTA
slides.push(`
<div class="abs" style="right:80px;left:80px;top:300px">
  <div class="kick"><span class="ar">قوالب الستوري</span><span class="ln"></span><span class="en">Story templates</span></div>
  <div class="big" style="margin-top:32px">خل ستوريك<br>يبيع كل يوم.</div>
  <div style="font:500 40px/60px 'IBM Plex Sans Arabic';margin-top:40px">كم ستوري تنزل باليوم؟ قول لي بالكومنت.</div>
  <div class="sub" style="margin-top:24px;max-width:880px">أصمم لك قوالب ستوري ثابتة بهوية براندك، تعدلها وتنزلها بدقيقة.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:1060px;display:flex;justify-content:space-between;align-items:center">
  <div style="background:${GOLD};color:#0E0E0E;padding:28px 48px;display:flex;align-items:center;gap:24px;font:700 38px/48px 'IBM Plex Sans Arabic'">
    <span>أرسل «ستوري» بالدايركت</span>${ARROW('#0E0E0E')}</div>
  <div style="text-align:left;direction:ltr"><div style="font:600 32px/40px Inter">@nori.dsgn</div><div style="font:400 24px/34px Inter;color:#8A8A8A">noridsgn.com</div></div>
</div>`);

render(slides, __dirname + '/out2', 'B');
