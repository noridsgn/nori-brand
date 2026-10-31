const { t, render, fixLine, ARROW, GOLD } = require('./lib2');
const GR = '#1F4A2C', LI = '#A9C94A', CR = '#F5F0DC', INK = '#16261B';

// «لومي» lime-slice mark
function mark(sz, bg = GR) {
  let seg = '';
  for (let i = 0; i < 8; i++) {
    const a = i * 45 * Math.PI / 180;
    seg += `<line x1="50" y1="50" x2="${50 + 30 * Math.cos(a)}" y2="${50 + 30 * Math.sin(a)}" stroke="${CR}" stroke-width="3"/>`;
  }
  return `<svg width="${sz}" height="${sz}" viewBox="0 0 100 100" style="flex:none"><circle cx="50" cy="50" r="50" fill="${bg}"/>
    <circle cx="50" cy="50" r="34" fill="${LI}"/><circle cx="50" cy="50" r="31" fill="none" stroke="${CR}" stroke-width="2"/>${seg}
    <circle cx="50" cy="50" r="5" fill="${CR}"/></svg>`;
}
function messyAvatar(sz) {
  return `<div style="width:${sz}px;height:${sz}px;border-radius:50%;background:#FFE14D;display:flex;align-items:center;justify-content:center;flex:none;overflow:hidden;border:3px solid #E8327C">
    <div style="font:700 ${sz / 9}px/1.15 'IBM Plex Sans Arabic';color:#E8327C;text-align:center">مؤسسة لومي<br>للعصائر الطبيعية<br><span style="font-size:${sz / 13}px;color:#1B6DD1">ذ.م.م</span></div></div>`;
}

// profile header block (avatar + handle + stats + name + bio)
function header(on, w = 920) {
  const ink = on ? INK : '#111';
  const stats = [['48', 'منشور'], ['1,204', 'متابع'], ['86', 'يتابع']].map(s =>
    `<div style="text-align:center"><div style="font:600 30px/36px Inter;color:${ink}">${s[0]}</div><div style="font:400 22px/30px 'IBM Plex Sans Arabic';color:${on ? '#5B6B5F' : '#666'}">${s[1]}</div></div>`).join('');
  const bio = on
    ? [`<b style="font-weight:700">لومي · Loomi</b>`, 'عصير فريش ينعصر قدامك، بدون سكر مضاف', t('الشويخ · كل يوم من 8 الصبح'), t('اطلب واتساب وتوصلك خلال 30 دقيقة ↓')]
    : [`<b style="font-weight:700">مؤسسة لومي للعصائر الطبيعية والمشروبات</b>`, 'أهلاً وسهلاً بكم في حسابنا الرسمي', 'نتمنى لكم يوم سعيد', 'للتواصل الخاص'];
  return `<div style="width:${w}px;background:${on ? CR : '#FFFFFF'};padding:40px 44px">
    <div style="display:flex;align-items:center;gap:40px">
      ${on ? mark(128) : messyAvatar(128)}
      <div style="flex:1;display:flex;justify-content:space-around">${stats}</div>
    </div>
    <div style="font:400 28px/44px 'IBM Plex Sans Arabic';color:${ink};margin-top:24px">${bio.join('<br>')}</div>
    ${on ? `<div style="display:inline-flex;align-items:center;gap:14px;margin-top:24px;background:${GR};color:${CR};padding:12px 28px;font:600 26px/36px 'IBM Plex Sans Arabic'">اطلب الحين من الواتساب</div>` : `<div style="margin-top:24px;font:400 24px/32px Inter;color:#1B6DD1;direction:ltr;text-align:right">linktr.ee/loomi.kw.official.page</div>`}
  </div>`;
}

function bioCard(on) {
  const ink = on ? INK : '#111';
  const bio = on
    ? ['<b style="font-weight:700">لومي · Loomi</b>', 'عصير فريش ينعصر قدامك، بدون سكر مضاف', t('الشويخ · كل يوم من 8 الصبح'), t('اطلب واتساب وتوصلك خلال 30 دقيقة ↓')]
    : ['<b style="font-weight:700">مؤسسة لومي للعصائر الطبيعية والمشروبات</b>', 'أهلاً وسهلاً بكم في حسابنا الرسمي', 'نتمنى لكم يوم سعيد', 'للتواصل الخاص'];
  return `<div style="background:${on ? CR : '#FFF'};padding:28px 36px;display:flex;gap:32px;align-items:flex-start">
    ${on ? mark(120) : messyAvatar(120)}
    <div style="font:400 26px/38px 'IBM Plex Sans Arabic';color:${ink}">${bio.join('<br>')}
    ${on ? `<div style="margin-top:14px;display:inline-block;background:${GR};color:${CR};padding:6px 24px;font:600 24px/36px 'IBM Plex Sans Arabic'">اطلب الحين من الواتساب</div>` : `<div style="margin-top:14px;font:400 22px/36px Inter;color:#1B6DD1;direction:ltr;text-align:right">linktr.ee/loomi.kw.official.page</div>`}
    </div></div>`;
}

const ICON = {
  menu: c => `<rect x="34" y="36" width="32" height="4" fill="${c}"/><rect x="34" y="48" width="32" height="4" fill="${c}"/><rect x="34" y="60" width="22" height="4" fill="${c}"/>`,
  price: c => `<path d="M30 50 L50 30 H70 V50 L50 70 Z" fill="none" stroke="${c}" stroke-width="4" stroke-linejoin="round"/><circle cx="61" cy="39" r="4" fill="${c}"/>`,
  bike: c => `<circle cx="36" cy="60" r="9" fill="none" stroke="${c}" stroke-width="4"/><circle cx="66" cy="60" r="9" fill="none" stroke="${c}" stroke-width="4"/><path d="M36 60 L48 40 H60 L66 60 M48 40 L54 60" fill="none" stroke="${c}" stroke-width="4" stroke-linejoin="round"/>`,
  star: c => `<path d="M50 30 L56 44 L71 45 L59 55 L63 70 L50 62 L37 70 L41 55 L29 45 L44 44 Z" fill="${c}"/>`,
};
function hlRow(on, sz = 150) {
  const items = on
    ? [['menu', 'المنيو'], ['price', 'الأسعار'], ['bike', 'التوصيل'], ['star', 'آراءكم']]
    : [['#FF6B6B', 'متفرقات'], ['#4D96FF', '2024'], ['#FFD93D', 'New'], ['#6BCB77', 'صور']];
  return `<div style="display:flex;justify-content:space-between">` + items.map(([k, l]) => `
    <div style="text-align:center;width:${sz + 30}px">
      <div style="width:${sz}px;height:${sz}px;border-radius:50%;margin:0 auto 16px;padding:6px;border:3px solid ${on ? GR : '#DDD'}">
        ${on ? `<svg width="100%" height="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="${GR}"/>${ICON[k](LI)}</svg>`
             : `<div style="width:100%;height:100%;border-radius:50%;background:${k};position:relative;overflow:hidden"><div style="position:absolute;left:10%;top:52%;width:80%;height:60%;border-radius:50%;background:rgba(255,255,255,.45)"></div><div style="position:absolute;left:30%;top:18%;width:30%;height:30%;border-radius:50%;background:rgba(0,0,0,.18)"></div></div>`}
      </div>
      <div style="font:400 26px/34px 'IBM Plex Sans Arabic';color:${on ? INK : '#222'}">${t(l)}</div></div>`).join('') + `</div>`;
}

function phone(w) {
  // full "after" profile on a phone, scaled
  let grid = '';
  const tiles = [
    `<div style="background:${GR};display:flex;align-items:center;justify-content:center">${mark(70, GR)}</div>`,
    `<div style="background:${LI};display:flex;align-items:flex-end;padding:12px;font:700 22px/26px 'IBM Plex Sans Arabic';color:${INK}">لومي<br>نعناع</div>`,
    `<div style="background:${CR};border:1px solid #E2DAC0;display:flex;align-items:center;justify-content:center;font:700 26px/1 'IBM Plex Sans Arabic';color:${GR}">جديدنا</div>`,
    `<div style="background:${CR};border:1px solid #E2DAC0;display:flex;align-items:center;justify-content:center"><div style="width:44px;height:74px;border-radius:10px 10px 6px 6px;background:${LI};border:4px solid ${GR}"></div></div>`,
    `<div style="background:${GR};display:flex;align-items:flex-end;padding:12px;font:700 22px/26px 'IBM Plex Sans Arabic';color:${CR}">صباح<br>الفريش</div>`,
    `<div style="background:${LI};display:flex;align-items:center;justify-content:center">${mark(60, LI)}</div>`];
  tiles.concat(tiles.slice(0,3).reverse()).forEach(x => grid += x);
  return `<div style="width:${w}px;border-radius:44px;background:#000;padding:14px;flex:none">
    <div style="border-radius:32px;overflow:hidden;background:${CR}">
      <div style="height:44px;display:flex;justify-content:space-between;align-items:center;padding:0 28px;font:600 16px/1 Inter;color:${INK};direction:ltr"><span>9:41</span><span>loomi.kw</span><span>•••</span></div>
      <div style="height:${Math.round(1700 * (w - 28) / 920)}px;overflow:hidden;position:relative"><div style="position:absolute;right:0;top:0;transform-origin:top right;transform:scale(${(w - 28) / 920});width:920px;height:1900px">
        ${header(1)}
        <div style="background:${CR};padding:8px 44px 32px">${hlRow(1, 120)}</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:300px;gap:4px;background:${CR}">${grid}</div>
      </div></div>
    </div></div>`;
}

const slides = [];

// 1 HOOK
slides.push(`
<div class="abs" style="right:80px;left:80px;top:240px">
  <div class="kick"><span class="ar">فحص البروفايل</span><span class="ln"></span><span class="en">Profile check</span></div>
  <div class="big" style="margin-top:32px">زبونك <span class="gold">يقرر</span><br>من بروفايلك</div>
  <div class="sub" style="margin-top:32px;max-width:900px">${t('قبل لا يشوف منتجك، يشوف بروفايلك. وعنده 5 ثواني بس.')}</div>
</div>
<div class="abs" style="left:80px;top:770px;width:920px;height:440px;overflow:hidden">
  <div style="position:absolute;left:0;top:0;transform:rotate(-5deg);transform-origin:top left;margin-top:60px">${header(0, 560)}</div>
  <div style="position:absolute;right:0;top:20px;transform:rotate(4deg);transform-origin:top right">${header(1, 560)}</div>
</div>`);

// 2 BIO + PICTURE
slides.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">01</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">أول شي يقراه</div>
  <div class="t" style="margin-top:8px">البايو والصورة</div>
</div>
<div class="abs" style="right:80px;left:80px;top:400px">
  <div class="lab"><span class="ar">قبل</span><span class="en">BEFORE</span></div>
  <div style="margin-top:16px">${bioCard(0)}</div>
  <div class="lab on" style="margin-top:28px"><span class="ar">بعد</span><span class="en">AFTER</span></div>
  <div style="margin-top:16px">${bioCard(1)}</div>
</div>
<div class="abs" style="right:80px;left:80px;top:1176px">${fixLine('الحل: بايو يقول شنو تبيع، وين، وكيف تطلب.').replace('font:500 40px', 'font:500 36px')}</div>`.replace('class="fix"', 'class="fix" style="font-size:34px;line-height:48px"'));

// 3 HIGHLIGHTS
slides.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">02</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">ثاني شي يضغط عليه</div>
  <div class="t" style="margin-top:8px">الهايلايتس</div>
  <div class="sub" style="margin-top:8px">مو ألبوم ذكريات… هذي قائمة الطلب.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:470px">
  <div class="lab"><span class="ar">قبل</span><span class="en">BEFORE</span></div>
  <div style="margin-top:16px;background:#FFFFFF;padding:28px 44px">${hlRow(0, 128)}</div>
  <div class="lab on" style="margin-top:28px"><span class="ar">بعد</span><span class="en">AFTER</span></div>
  <div style="margin-top:16px;background:${CR};padding:28px 44px">${hlRow(1, 128)}</div>
</div>
<div class="abs" style="right:80px;left:80px;top:1176px">${fixLine('الحل: كل هايلايت يجاوب سؤال ينسأل كل يوم.')}</div>`);

// 4 APPLIED + SAVE
slides.push(`
<div class="abs" style="left:80px;top:200px">${phone(440)}</div>
<div class="abs" style="right:80px;top:200px;width:460px">
  <div class="kick"><span class="ar">طبقناها</span><span class="ln" style="width:40px"></span><span class="en">Applied</span></div>
  <div class="t" style="font-size:64px;line-height:80px;margin-top:24px">«لومي» بعد التعديل</div>
  <div class="sub" style="font-size:26px;line-height:40px;margin-top:8px">براند وهمي سويته للتوضيح</div>
  <div style="margin-top:56px;display:flex;align-items:center;gap:16px">
    <svg width="34" height="44" viewBox="0 0 34 44"><path d="M3 3h28v38L17 31 3 41z" fill="none" stroke="${GOLD}" stroke-width="3.5" stroke-linejoin="round"/></svg>
    <span style="font:700 40px/56px 'IBM Plex Sans Arabic'">احفظها وافحص بروفايلك</span></div>
  ${[['الصورة', 'رمز واحد ينقرا وهو صغير'], ['البايو', 'شنو تبيع + وين + كيف تطلب'], ['الهايلايتس', 'المنيو، الأسعار، التوصيل، الآراء']].map((x, i) => `
  <div style="display:flex;gap:24px;padding:28px 0;border-bottom:1.5px solid #2C2C2C">
    <div style="font:600 32px/48px Inter;color:#8A8A8A;width:40px;flex:none">0${i + 1}</div>
    <div><div style="font:700 36px/48px 'IBM Plex Sans Arabic'">${x[0]}</div><div style="font:400 28px/40px 'IBM Plex Sans Arabic';color:#8A8A8A">${x[1]}</div></div></div>`).join('')}
</div>`);

// 5 CTA
slides.push(`
<div class="abs" style="right:80px;left:80px;top:300px">
  <div class="kick"><span class="ar">بروفايلك الجاي</span><span class="ln"></span><span class="en">Profile makeover</span></div>
  <div class="big" style="margin-top:32px">خل بروفايلك<br>يبيع عنك.</div>
  <div style="font:500 40px/60px 'IBM Plex Sans Arabic';margin-top:40px">أي وحدة من الثلاث ناقصة عندك؟ قول لي بالكومنت.</div>
  <div class="sub" style="margin-top:24px;max-width:880px">أصمم لك البروفايل كامل: الصورة، البايو، الهايلايتس، وأول بوستاتك… بهوية وحدة تبيع.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:1060px;display:flex;justify-content:space-between;align-items:center">
  <div style="background:${GOLD};color:#0E0E0E;padding:28px 48px;display:flex;align-items:center;gap:24px;font:700 38px/48px 'IBM Plex Sans Arabic'">
    <span>أرسل «بروفايل» بالدايركت</span>${ARROW('#0E0E0E')}</div>
  <div style="text-align:left;direction:ltr"><div style="font:600 32px/40px Inter">@nori.dsgn</div><div style="font:400 24px/34px Inter;color:#8A8A8A">noridsgn.com</div></div>
</div>`);

render(slides, __dirname + '/out2', 'A');
