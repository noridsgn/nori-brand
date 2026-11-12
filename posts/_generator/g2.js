// Thu 12 Nov 2026 — Carousel G v2 (NORI rejected v1 in r16: weak idea, weak design, pink off-brand)
// New topic: show the design on a real mockup, not flat. Fictional brand «ليمونة» (lemonade).
// 100% educational (rule B): last slide = save / follow / comment, no DM. No pink, one gold element per slide.
const { t, render, fixLine, GOLD } = require('./lib2');
const AR = "'IBM Plex Sans Arabic'";
const DG = '#1F4D3A', YL = '#F2CF4A', CR = '#FBF5E4', LG = '#A9C76A', IV = '#F2F0EB';

// lemon-slice mark
function mark(s, ring = YL) {
  let seg = '';
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4;
    seg += `<line x1="50" y1="50" x2="${50 + 30 * Math.cos(a)}" y2="${50 + 30 * Math.sin(a)}"/>`;
  }
  return `<svg width="${s}" height="${s}" viewBox="0 0 100 100" style="flex:none"><circle cx="50" cy="50" r="46" fill="${ring}"/><circle cx="50" cy="50" r="36" fill="#FFF3B8"/><g stroke="${ring}" stroke-width="5" stroke-linecap="round">${seg}</g><circle cx="50" cy="50" r="5" fill="${ring}"/></svg>`;
}
function logo(s, c = DG, ring = YL) {
  return `<div style="display:flex;align-items:center;gap:${s * .22}px;direction:rtl">${mark(s, ring)}<span style="font:700 ${s * .62}px/1 ${AR};color:${c}">ليمونة</span></div>`;
}
// cup mockup (w = width px)
function cup(w) {
  const h = w * 1.55;
  return `<svg width="${w}" height="${h}" viewBox="0 0 200 310" style="flex:none;overflow:visible">
    <ellipse cx="100" cy="300" rx="78" ry="9" fill="#000" opacity=".22"/>
    <path d="M118 6 L132 0 L126 60" stroke="#E8643C" stroke-width="9" fill="none" stroke-linecap="round"/>
    <rect x="22" y="48" width="156" height="26" rx="8" fill="${DG}"/>
    <rect x="30" y="40" width="140" height="14" rx="6" fill="#2B634C"/>
    <path d="M30 74 L170 74 L154 296 L46 296 Z" fill="${CR}"/>
    <path d="M30 74 L60 74 L66 296 L46 296 Z" fill="#000" opacity=".05"/>
    <path d="M39 140 L161 140 L156 214 L44 214 Z" fill="${DG}"/>
    <g transform="translate(100 177)"><g transform="translate(-20 -20) scale(.4)">${mark(100).replace(/<svg[^>]*>|<\/svg>/g, '')}</g></g>
    <path d="M150 74 L170 74 L154 296 L142 296 Z" fill="#000" opacity=".07"/>
  </svg>`;
}
// paper bag mockup
function bag(w) {
  return `<svg width="${w}" height="${w * 1.2}" viewBox="0 0 200 240" style="flex:none">
    <ellipse cx="100" cy="232" rx="80" ry="7" fill="#000" opacity=".2"/>
    <path d="M70 40 q30 -40 60 0" fill="none" stroke="${DG}" stroke-width="7"/>
    <path d="M24 40 H176 L170 228 H30 Z" fill="${YL}"/>
    <path d="M150 40 H176 L170 228 H146 Z" fill="#000" opacity=".08"/>
    <g transform="translate(70 95) scale(.6)">${mark(100, DG).replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
    <text x="100" y="196" text-anchor="middle" font-family="IBM Plex Sans Arabic" font-weight="700" font-size="26" fill="${DG}">ليمونة</text>
  </svg>`;
}
// phone with an Instagram-like post
function phone(w, inner, likes) {
  const k = w / 300;
  return `<div style="width:${w}px;height:${w * 2.02}px;flex:none;background:#151515;border-radius:${38 * k}px;padding:${12 * k}px;box-shadow:0 0 0 ${2 * k}px #333">
   <div style="width:100%;height:100%;background:#FFFFFF;border-radius:${28 * k}px;overflow:hidden;position:relative;direction:ltr">
    <div style="height:${46 * k}px"></div>
    <div style="display:flex;align-items:center;gap:${10 * k}px;padding:0 ${14 * k}px ${12 * k}px">
      <div style="width:${34 * k}px;height:${34 * k}px;border-radius:50%;background:${DG};display:flex;align-items:center;justify-content:center">${mark(24 * k)}</div>
      <div style="font:600 ${15 * k}px/1 Inter;color:#111">limona.drinks</div>
    </div>
    <div style="width:100%;height:${276 * k}px;position:relative;overflow:hidden">${inner}</div>
    <div style="display:flex;gap:${14 * k}px;padding:${14 * k}px">
      ${['M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z', 'M4 5h16v11H9l-5 4z', 'M3 12l18-8-6 18-3-8z'].map(d => `<svg width="${24 * k}" height="${24 * k}" viewBox="0 0 24 24"><path d="${d}" fill="none" stroke="#111" stroke-width="1.8" stroke-linejoin="round"/></svg>`).join('')}
    </div>
    <div style="padding:0 ${14 * k}px;font:600 ${14 * k}px/1.4 Inter;color:#111">${likes}</div>
    <div style="padding:${6 * k}px ${14 * k}px;font:400 ${14 * k}px/1.5 ${AR};color:#333;direction:rtl;text-align:right">شعارنا الجديد 🍋</div>
   </div></div>`;
}
const flat = (s) => `<div style="position:absolute;inset:0;background:#FFFFFF;display:flex;align-items:center;justify-content:center">${logo(s)}</div>`;
const scene = (cw) => `<div style="position:absolute;inset:0;background:${DG};overflow:hidden">
   <div style="position:absolute;left:-10%;right:-10%;bottom:0;height:34%;background:#173D2E"></div>
   <div style="position:absolute;left:50%;bottom:12%;transform:translateX(-50%)">${cup(cw)}</div>
   <div style="position:absolute;left:12%;bottom:13%">${mark(cw * .42)}</div>
   <div style="position:absolute;right:13%;bottom:12%;transform:rotate(-20deg)">${mark(cw * .3)}</div></div>`;

const G = [];
// 1 · hook: the flat logo posted as-is, 3 likes
G.push(`
<div class="abs" style="right:80px;left:80px;top:220px">
  <div class="kick"><span class="ar">درس التصميم</span><span class="ln"></span><span class="en">Design lesson</span></div>
  <div class="big" style="margin-top:32px">تصميمك حلو…<br>بس محد <span class="gold">حس فيه؟</span></div>
  <div class="sub" style="margin-top:24px">لأنك عارضه على ورقة بيضا.</div>
</div>
<div class="abs" style="left:110px;top:620px;transform:rotate(-4deg)">${phone(290, flat(56), '3 likes')}</div>
<div class="abs" style="right:80px;top:720px;width:470px">
  ${[['خلفية بيضا', 'ما تقول شي عن البراند'], ['بدون مكان', 'وين بيشوفه الزبون؟'], ['بدون حجم', 'كبير؟ صغير؟ محد يعرف'], ['الزبون يتخيل', 'وأغلبهم ما يتخيلون']].map((x, i) => `
  <div style="display:flex;align-items:baseline;gap:24px;padding:22px 0;border-top:1.5px solid #2C2C2C">
    <div style="font:600 26px/36px Inter;color:#8A8A8A;width:40px;flex:none">0${i + 1}</div>
    <div><div style="font:700 40px/52px ${AR}">${x[0]}</div><div style="font:400 28px/40px ${AR};color:#8A8A8A">${x[1]}</div></div></div>`).join('')}
  <div style="border-top:1.5px solid #2C2C2C"></div>
</div>`);

// 2 · put it where it lives: flat vs on the cup
G.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">01</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">المكان</div>
  <div class="t" style="margin-top:8px">حطه بمكانه الحقيقي</div>
  <div class="sub" style="font-size:32px;line-height:48px;margin-top:12px">الشعار مكانه على الكوب، مو على ورقة.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:500px;display:flex;gap:40px;direction:rtl">
  <div style="flex:1"><div class="lab"><span class="ar">قبل</span><span class="en">BEFORE</span></div>
    <div style="margin-top:20px;height:580px;position:relative;overflow:hidden">${flat(64)}</div></div>
  <div style="flex:1"><div class="lab on"><span class="ar">بعد</span><span class="en">AFTER</span></div>
    <div style="margin-top:20px;height:580px;position:relative;overflow:hidden">${scene(230)}</div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1176px">${fixLine('الزبون يشوفه بيده، ويقول: أبي واحد.')}</div>`);

// 3 · product is the hero: busy scene vs clean
function busy() {
  return `<div style="position:absolute;inset:0;background:repeating-linear-gradient(45deg,#E8D9B5 0 26px,#D9C79C 26px 52px);overflow:hidden">
    <div style="position:absolute;left:20px;top:30px;width:210px;height:130px;background:#3B3B3B;border-radius:10px;transform:rotate(-8deg)"><div style="margin:10px;height:100px;background:#7FA7C9;border-radius:4px"></div></div>
    <svg style="position:absolute;right:10px;top:10px" width="170" height="220" viewBox="0 0 170 220"><rect x="55" y="150" width="60" height="66" rx="6" fill="#B5582F"/><g fill="#3E8E4E"><ellipse cx="85" cy="70" rx="22" ry="62"/><ellipse cx="50" cy="95" rx="18" ry="50" transform="rotate(-30 50 95)"/><ellipse cx="120" cy="95" rx="18" ry="50" transform="rotate(30 120 95)"/></g></svg>
    <div style="position:absolute;left:40px;bottom:40px;width:150px;height:70px;background:#E3A25A;border-radius:70px 70px 20px 20px;transform:rotate(12deg)"></div>
    <div style="position:absolute;right:30px;bottom:150px;background:#E4572E;color:#fff;font:700 26px/1 ${AR};padding:12px 18px;transform:rotate(8deg)">جديد!!</div>
    <div style="position:absolute;left:150px;top:200px;width:110px;height:40px;border:8px solid #222;border-radius:30px;"></div>
    <div style="position:absolute;left:50%;top:52%;transform:translate(-50%,-50%)">${cup(95)}</div>
    <div style="position:absolute;right:20px;bottom:30px">${mark(56)}</div>
    <div style="position:absolute;left:60px;top:190px">${mark(40)}</div></div>`;
}
function hero() {
  return `<div style="position:absolute;inset:0;background:${LG};overflow:hidden">
    <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,#C4DC8C 0,${LG} 60%)"></div>
    <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)">${cup(250)}</div></div>`;
}
G.push(`
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">02</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">البطل</div>
  <div class="t" style="margin-top:8px">المنتج هو البطل</div>
  <div class="sub" style="font-size:32px;line-height:48px;margin-top:12px">كل غرض زيادة بالصورة ياخذ من عين الزبون.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:500px;display:flex;gap:40px;direction:rtl">
  <div style="flex:1"><div class="lab"><span class="ar">قبل · المنتج ضايع</span><span class="en">BEFORE</span></div>
    <div style="margin-top:20px;height:580px;position:relative;overflow:hidden">${busy()}</div></div>
  <div style="flex:1"><div class="lab on"><span class="ar">بعد · ثلثين الصورة</span><span class="en">AFTER</span></div>
    <div style="margin-top:20px;height:580px;position:relative;overflow:hidden">${hero()}</div></div>
</div>
<div class="abs" style="right:80px;left:80px;top:1176px">${fixLine('خلفية هادية، والمنتج ياخذ ثلثين الصورة.')}</div>`);

// 4 · save: the 3 mockups you need
const card = (n, h, sub, vis, bg) => `<div style="flex:1;display:flex;flex-direction:column">
  <div style="height:420px;background:${bg};position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center">${vis}</div>
  <div style="display:flex;align-items:baseline;gap:14px;margin-top:28px"><span style="font:600 26px/1 Inter;color:#8A8A8A">${n}</span><span style="font:700 42px/52px ${AR}">${h}</span></div>
  <div style="font:400 28px/40px ${AR};color:#8A8A8A;margin-top:8px">${sub}</div></div>`;
const story = `<div style="width:170px;height:340px;background:#151515;border-radius:24px;padding:7px;box-shadow:0 0 0 2px #333"><div style="width:100%;height:100%;border-radius:16px;background:${DG};position:relative;overflow:hidden">
  <div style="position:absolute;left:50%;top:44%;transform:translate(-50%,-50%)">${cup(92)}</div>
  <div style="position:absolute;left:0;right:0;bottom:22px;display:flex;justify-content:center">${logo(22, CR)}</div></div></div>`;
const menu = `<div style="width:190px;height:270px;background:${CR};transform:rotate(-6deg);box-shadow:0 18px 30px rgba(0,0,0,.25);padding:22px 18px;direction:rtl">
  ${logo(30)}<div style="height:2px;background:${DG};opacity:.25;margin:16px 0"></div>
  ${['ليمون نعناع', 'ليمون فراولة', 'ليمون زنجبيل', 'ليمون ورد'].map(x => `<div style="font:600 17px/34px ${AR};color:${DG}">${x}</div>`).join('')}</div>`;
G.push(`
<div class="abs" style="right:80px;left:80px;top:210px;display:flex;justify-content:space-between;align-items:flex-start">
  <div><div class="kick"><span class="ar">احفظها</span><span class="ln"></span><span class="en">Save this</span></div>
  <div class="big" style="margin-top:28px">3 موكابات تكفيك</div>
  <div class="sub" style="margin-top:12px;font-size:32px;line-height:48px">أي تصميم، اعرضه على هالثلاثة قبل لا تنشره.</div></div>
  <svg width="56" height="72" viewBox="0 0 56 72" style="margin-top:8px;flex:none"><path d="M4 4h48v64L28 50 4 68z" fill="none" stroke="${GOLD}" stroke-width="5" stroke-linejoin="round"/></svg>
</div>
<div class="abs" style="right:80px;left:80px;top:600px;display:flex;gap:28px;direction:rtl">
  ${card('1', 'تلفون', 'بوست أو ستوري', story, '#1C1C1C')}
  ${card('2', 'مطبوعة', 'منيو أو كرت', menu, '#26302B')}
  ${card('3', 'المنتج', 'كوب أو كيس أو علبة', `<div style="display:flex;align-items:flex-end;gap:6px">${bag(140)}${cup(104)}</div>`, '#1C1C1C')}
</div>`);

// 5 · try it
G.push(`
<div class="abs" style="right:80px;left:80px;top:210px">
  <div class="kick"><span class="ar">جرّبه اليوم</span><span class="ln"></span><span class="en">Try it</span></div>
  <div class="t" style="margin-top:24px">آخر تصميم سويته…<br>عرضته على شنو؟</div>
</div>
<div class="abs" style="right:80px;left:80px;top:580px">
  ${[['المكان', 'حطه على شي حقيقي'], ['البطل', 'المنتج ثلثين الصورة'], ['الثلاثة', 'تلفون، مطبوعة، منتج']].map((x, i) => `<div style="display:flex;align-items:baseline;gap:32px;padding:26px 0;border-top:1.5px solid ${i ? '#2C2C2C' : IV}">
    <div style="font:600 30px/40px Inter;color:#8A8A8A;width:48px;flex:none">0${i + 1}</div>
    <div style="font:700 46px/60px ${AR};width:260px;flex:none">${x[0]}</div>
    <div style="font:500 34px/50px ${AR};color:#C9C6C0">${t(x[1])}</div></div>`).join('')}
</div>
<div class="abs" style="right:80px;left:80px;top:1090px;display:flex;justify-content:space-between;align-items:center">
  <div style="border:2px solid ${GOLD};padding:26px 44px;font:700 38px/48px ${AR}">احفظه ← وتابع</div>
  <div style="text-align:left"><div style="font:600 32px/40px Inter;direction:ltr">@nori.dsgn</div><div style="font:400 24px/34px ${AR};color:#8A8A8A">«ليمونة» براند وهمي للتوضيح</div></div>
</div>`);

render(G, require('path').join(__dirname, '../2026-11-12/G-v2'), 'G');
