// Tue 24 Nov — concept post «دلّة» (fictional gahwa delivery brand) as a design lesson: problem → idea → result.
// NORI approved the proposal (r31, 22 Nov). Fictional brand: not a real company. No DM, no price.
// Render: cd posts/_generator && node concept-dalla.js  → posts/2026-11-24/concept/K-1..5.png
const fs = require('fs');
const path = require('path');
const { t, render, fixLine, GOLD } = require('./lib2');
const AR = "'IBM Plex Sans Arabic'";
const f64 = n => fs.readFileSync(path.join(__dirname, 'fonts-dalla', n)).toString('base64');
const FONTS = `<style>
@font-face{font-family:Ruqaa;src:url(data:font/woff2;base64,${f64('aref-ruqaa-arabic-700-normal.woff2')}) format('woff2');font-weight:700}
@font-face{font-family:Kufi;src:url(data:font/woff2;base64,${f64('reem-kufi-arabic-700-normal.woff2')}) format('woff2');font-weight:700}
</style>`;

// brand palette (fictional «دلّة»): cardamom green, saffron, cream — no brown
const G = '#2F5A41', GD = '#1F3D2C', SAF = '#E3A33B', CR = '#F4EBD9';
// look-alike shelf palette
const BR = '#4A2E1E', BRL = '#6B4430', GO = '#C8A050';

// the mark: the dallah spout bends into «د»; the saffron drop = gahwa pouring from the beak
const MARK = (fg = CR, acc = SAF) => `
  <path d="M70 70 C88 70 106 80 120 98 C134 116 140 134 140 146 L140 150 Q140 160 130 160 L62 160" fill="none" stroke="${fg}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M86 57 Q50 50 18 66 Q50 74 84 87 Z" fill="${fg}"/>
  <path d="M20 84 Q11 100 14 108 Q20 116 26 108 Q29 100 20 84 Z" fill="${acc}"/>`;
const markSvg = (s, bg = G, fg = CR, acc = SAF, r = 0) => `<svg width="${s}" height="${s}" viewBox="0 0 200 200" style="display:block;flex:none">
  ${bg ? `<rect width="200" height="200" rx="${r}" fill="${bg}"/>` : ''}<g transform="translate(14 -6)">${MARK(fg, acc)}</g></svg>`;

// simple dallah line drawing, spout highlighted
const DALLAH = (s, line = '#F2F0EB', spout = SAF) => `<svg width="${s}" height="${s}" viewBox="0 0 200 200" style="display:block;flex:none">
 <g fill="none" stroke="${line}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" opacity=".9">
  <circle cx="104" cy="20" r="5"/><path d="M104 25 L104 32"/>
  <path d="M90 34 Q104 28 118 34 L114 54 Q104 58 94 54 Z"/>
  <path d="M96 56 L92 78 Q72 96 72 128 Q72 160 104 168 Q136 160 136 128 Q136 96 116 78 L112 56"/>
  <path d="M76 170 L132 170"/>
  <path d="M136 104 Q162 100 158 132 Q154 152 132 152"/>
 </g>
 <path d="M78 98 C64 78 46 64 16 58 Q40 70 72 118 Z" fill="${spout}"/>
</svg>`;

// look-alike logo: brown badge + gold ring + dallah + calligraphy name
const LOOK = (name, s = 200) => `<div style="width:${s}px;text-align:center;flex:none">
 <svg width="${s}" height="${s}" viewBox="0 0 200 200" style="display:block">
  <circle cx="100" cy="100" r="96" fill="${BR}"/><circle cx="100" cy="100" r="84" fill="none" stroke="${GO}" stroke-width="3"/>
  <g transform="translate(46 30) scale(.54)">${DALLAH_SIL()}</g>
  <text x="100" y="158" text-anchor="middle" font-family="Ruqaa" font-weight="700" font-size="30" fill="${GO}" direction="rtl">${name}</text>
 </svg></div>`;
function DALLAH_SIL() {
  return `<g fill="${GO}"><circle cx="104" cy="18" r="7"/><rect x="101" y="22" width="6" height="12"/>
   <path d="M88 34 Q104 26 120 34 L116 56 L92 56 Z"/><path d="M94 58 L114 58 L118 80 Q140 98 140 128 Q140 162 104 170 Q68 162 68 128 Q68 98 90 80 Z"/>
   <path d="M80 112 C70 86 52 70 26 62 L22 70 C46 78 62 94 70 120 Z"/><path d="M138 102 Q166 100 162 132 Q158 156 134 154 L134 146 Q152 146 154 130 Q156 110 138 112 Z"/></g>`;
}

// paper cup (front view)
const CUP = (w, body, sleeve, logo) => `<svg width="${w}" height="${w * 1.25}" viewBox="0 0 160 200" style="display:block;flex:none">
  <defs><linearGradient id="sh${body.slice(1)}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".18"/><stop offset=".35" stop-color="#fff" stop-opacity=".10"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient></defs>
  <rect x="14" y="14" width="132" height="14" rx="7" fill="#EDE6DA"/>
  <path d="M20 28 L140 28 L128 192 L32 192 Z" fill="${body}"/>
  <path d="M24 78 L136 78 L131 146 L29 146 Z" fill="${sleeve}"/>
  ${logo}
  <path d="M20 28 L140 28 L128 192 L32 192 Z" fill="url(#sh${body.slice(1)})"/>
</svg>`;

const S = [];
// 1 hook: a shelf of look-alike cups, one different
const brownCup = CUP(190, BR, BRL, `<g transform="translate(56 88) scale(.24)">${DALLAH_SIL()}</g>`);
const dallaCup = CUP(270, G, CR, `<g transform="translate(50 82) scale(.3)"><g transform="translate(14 -6)">${MARK(G, SAF)}</g></g>`);
S.push(`${FONTS}
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="kick"><span class="ar">درس هوية</span><span class="ln"></span><span class="en">Identity lesson</span></div>
  <div class="t" style="margin-top:28px;font-size:84px;line-height:108px">كل براندات القهوة<br>العربية شكلها <span class="gold">واحد</span>… ليش؟</div>
</div>
<div class="abs" style="right:80px;left:80px;top:560px;height:500px;display:flex;justify-content:space-between;align-items:flex-end;direction:ltr">
  ${brownCup}${brownCup}${dallaCup}${brownCup}
</div>
<div class="abs" style="right:80px;left:80px;top:1060px;height:2px;background:#2C2C2C"></div>
<div class="abs" style="right:80px;left:80px;top:1110px;display:flex;justify-content:space-between;align-items:center">
  <div class="sub" style="font-size:32px;line-height:48px">بني، وذهبي، وخط، ورسمة دلّة.<br>وحدة بس تبين من بعيد.</div>
  <div style="display:inline-block;border:1.5px solid #3A3A3A;border-radius:40px;padding:6px 18px;font:600 20px/28px Inter;letter-spacing:.14em;color:#8A8A8A;direction:ltr">FICTIONAL · <span style="font-family:${AR};letter-spacing:0">براند وهمي</span></div>
</div>`);

// 2 problem: 4 look-alike logos
const names = ['بن السدرة', 'قهوة النخوة', 'دلال الريم', 'هيل وزعفران'];
S.push(`${FONTS}
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">01</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">المشكلة</div>
  <div class="t" style="margin-top:8px;font-size:64px;line-height:84px">غطّ الاسم… وقول لي<br>منو منو؟</div>
</div>
<div class="abs" style="right:80px;left:80px;top:470px;display:grid;grid-template-columns:1fr 1fr;gap:40px 0;justify-items:center">
  ${names.map(n => `<div style="background:#161616;width:440px;height:300px;display:flex;align-items:center;justify-content:center">${LOOK(n, 240)}</div>`).join('')}
</div>
<div class="abs" style="right:80px;left:80px;top:1130px">${fixLine('لما الكل يمشي على نفس الرف، الزبون ما يتذكر أحد.')}</div>
<div class="abs mut" style="right:80px;top:1206px;font-size:22px" data-free="1">الأسماء والشعارات وهمية للتوضيح.</div>`);

// 3 idea: dallah spout → «د», plus palette
S.push(`${FONTS}
<div class="abs" style="left:80px;top:180px;font:600 150px/150px Inter;color:#2A2A2A">02</div>
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="sub" style="font-size:30px">الفكرة</div>
  <div class="t" style="margin-top:8px;font-size:68px;line-height:88px">بوز الدلّة… صار حرف «د»</div>
</div>
<div class="abs" style="right:80px;left:80px;top:430px;display:flex;justify-content:space-between;align-items:center;direction:rtl">
  <div style="width:400px;height:400px;background:#161616;display:flex;align-items:center;justify-content:center">${DALLAH(330)}</div>
  <svg width="80" height="40" viewBox="0 0 80 40"><path d="M76 20H8M22 6L8 20l14 14" fill="none" stroke="#8A8A8A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <div style="width:400px;height:400px">${markSvg(400)}</div>
</div>
<div class="abs" style="right:80px;left:80px;top:880px;display:flex;gap:24px;align-items:stretch">
  ${[[G, 'هيل أخضر', '#2F5A41', CR], [SAF, 'زعفران', '#E3A33B', GD], [CR, 'كريمي', '#F4EBD9', GD]].map(([c, n, h, tc]) => `
  <div style="flex:1;background:${c};height:150px;padding:22px 26px;display:flex;flex-direction:column;justify-content:space-between;color:${tc}">
    <div style="font:700 32px/40px ${AR}">${n}</div><div style="font:500 22px/28px Inter;direction:ltr;text-align:right;opacity:.8">${h}</div></div>`).join('')}
</div>
<div class="abs" style="right:80px;left:80px;top:1080px">
  <div class="sub" style="font-size:32px;line-height:48px">بدون خط مزخرف، والألوان من الهيل والزعفران بدل البني.</div>
</div>
<div class="abs" style="right:80px;left:80px;top:1186px">${fixLine('الرمز من الأداة اللي الكل يعرفها، بس مرسوم بطريقتك.')}</div>`);

// 4 result: applications
const thermos = `<svg width="170" height="300" viewBox="0 0 120 210" style="display:block">
  <rect x="34" y="4" width="52" height="30" rx="8" fill="${SAF}"/><rect x="26" y="32" width="68" height="10" rx="4" fill="${GD}"/>
  <rect x="20" y="40" width="80" height="166" rx="18" fill="${G}"/>
  <g transform="translate(28 88) scale(.32)"><g transform="translate(14 -6)">${MARK(CR, SAF)}</g></g>
  <text x="60" y="176" text-anchor="middle" font-family="IBM Plex Sans Arabic" font-weight="700" font-size="20" fill="${CR}">دلّة</text>
  <rect x="20" y="40" width="80" height="166" rx="18" fill="url(#thg)"/>
  <defs><linearGradient id="thg" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".3" stop-color="#fff" stop-opacity=".12"/><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>
</svg>`;
const bag = `<svg width="250" height="290" viewBox="0 0 170 200" style="display:block">
  <path d="M60 40 Q60 10 85 10 Q110 10 110 40" fill="none" stroke="${GD}" stroke-width="7"/>
  <path d="M18 40 L152 40 L160 196 L10 196 Z" fill="${CR}"/>
  <path d="M18 40 L152 40 L153 58 L17 58 Z" fill="${G}"/>
  <g transform="translate(46 70) scale(.4)"><g transform="translate(14 -6)">${MARK(G, SAF)}</g></g>
  <text x="85" y="180" text-anchor="middle" font-family="Kufi" font-weight="700" font-size="16" fill="${G}">قهوتك لين الباب</text>
  <path d="M10 196 L18 40 L30 40 L24 196 Z" fill="#000" opacity=".06"/>
</svg>`;
const profile = `<div style="display:flex;align-items:center;gap:22px;direction:rtl">
  <div style="width:150px;height:150px;border-radius:50%;padding:6px;background:${CR}"><div style="width:138px;height:138px;border-radius:50%;overflow:hidden;border:4px solid #161616">${markSvg(130, G)}</div></div>
  <div><div style="font:700 30px/40px ${AR}">dalla.coffee</div><div style="font:400 24px/34px ${AR};color:#8A8A8A">قهوة عربية لين بابك</div></div></div>`;
S.push(`${FONTS}
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="kick"><span class="ar">النتيجة</span><span class="ln"></span><span class="en">Result</span></div>
  <div class="t" style="margin-top:24px;font-size:72px;line-height:92px">رمز واحد… بكل مكان</div>
</div>
<div class="abs" style="right:80px;left:80px;top:440px;display:grid;grid-template-columns:1fr 1fr;gap:24px">
  <div style="background:#161616;height:340px;display:flex;align-items:flex-end;justify-content:center;gap:30px;padding-bottom:30px;direction:ltr">${CUP(160, G, CR, `<g transform="translate(50 82) scale(.3)"><g transform="translate(14 -6)">${MARK(G, SAF)}</g></g>`)}${CUP(130, CR, G, `<g transform="translate(50 82) scale(.3)"><g transform="translate(14 -6)">${MARK(CR, SAF)}</g></g>`)}</div>
  <div style="background:#161616;height:340px;display:flex;align-items:center;justify-content:center">${thermos}</div>
  <div style="background:#161616;height:340px;display:flex;align-items:center;justify-content:center">${bag}</div>
  <div style="background:#161616;height:340px;display:flex;align-items:center;justify-content:center">${profile}</div>
</div>
<div class="abs" style="right:80px;left:80px;top:1170px;display:flex;align-items:center;gap:24px">
  <div style="flex:1;height:3px;background:${GOLD}"></div>
  <div style="font:500 36px/48px ${AR}">يبين حتى بحجم دائرة البروفايل.</div>
</div>`);

// 5 lesson + CTA (no DM, no price)
S.push(`${FONTS}
<div class="abs" style="right:80px;left:80px;top:210px">
  <div class="kick"><span class="ar">الدرس</span><span class="ln"></span><span class="en">Takeaway</span></div>
  <div class="t" style="margin-top:24px;font-size:72px;line-height:92px">اختلف عن الرف:</div>
</div>
<div class="abs" style="right:80px;left:80px;top:430px">
  ${['شوف شنو كل المنافسين يسوون، وابعد عنه', 'شكل واحد بسيط بدل رسمة كاملة', 'لون محد ماخذه، من نفس عالمك'].map((x, i) => `
  <div style="display:flex;gap:36px;align-items:center;padding:30px 0;border-top:1.5px solid #2C2C2C">
    <div style="font:600 40px/56px Inter;color:#8A8A8A;width:56px;flex:none">0${i + 1}</div>
    <div style="font:700 44px/60px ${AR}">${x}</div></div>`).join('')}
  <div style="border-top:1.5px solid #2C2C2C"></div>
</div>
<div class="abs" style="right:80px;left:80px;top:900px">
  <div style="font:500 36px/52px ${AR}">أي براند تبي نسوي عليه الدرس الجاي؟ اكتبه بالكومنت 👇🏻</div>
</div>
<div class="abs" style="right:80px;left:80px;top:1090px;display:flex;justify-content:space-between;align-items:center">
  <div style="border:2px solid ${GOLD};padding:24px 44px;font:700 38px/48px ${AR}">احفظه ← وتابع</div>
  <div style="text-align:left"><div style="font:600 32px/40px Inter;direction:ltr">@nori.dsgn</div><div style="font:400 24px/34px ${AR};color:#8A8A8A">براند «دلّة» وهمي للعرض بس</div></div>
</div>`);

render(S, path.join(__dirname, '../2026-11-24/concept'), 'K');
