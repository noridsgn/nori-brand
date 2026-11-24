// Tue 24 Nov — concept post «دلّة» (fictional gahwa delivery brand) as a design lesson: problem → idea → result.
// NORI approved the proposal (r31, 22 Nov). Fictional brand: not a real company. No DM, no price.
// v2 (24 Nov, NORI review): burned «تبين من بعيد» line removed, look-alike logos cleaned (no text crashing the ring),
// cups/thermos/bag rebuilt as lit 3D mockups. Render: node concept-dalla-v2.js → posts/2026-11-24/concept-v2/K-1..5.png
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
// v2: four believable look-alikes (each a slightly different badge, like real shops), name always sits inside its frame
const BADGES = [
  // round seal
  `<circle cx="100" cy="100" r="96" fill="${BR}"/><circle cx="100" cy="100" r="86" fill="none" stroke="${GO}" stroke-width="2.5"/><circle cx="100" cy="100" r="80" fill="none" stroke="${GO}" stroke-width="1" opacity=".6"/>`,
  // arch
  `<path d="M14 196 L14 92 Q14 6 100 6 Q186 6 186 92 L186 196 Z" fill="${BR}"/><path d="M26 186 L26 94 Q26 18 100 18 Q174 18 174 94 L174 186 Z" fill="none" stroke="${GO}" stroke-width="2.5"/>`,
  // rounded square
  `<rect x="6" y="6" width="188" height="188" rx="34" fill="${BR}"/><rect x="18" y="18" width="164" height="164" rx="24" fill="none" stroke="${GO}" stroke-width="2.5"/>`,
  // octagon
  `<path d="M60 4 L140 4 L196 60 L196 140 L140 196 L60 196 L4 140 L4 60 Z" fill="${BR}"/><path d="M65 16 L135 16 L184 65 L184 135 L135 184 L65 184 L16 135 L16 65 Z" fill="none" stroke="${GO}" stroke-width="2.5"/>`
];
const LOOK = (name, i, s = 200) => `<div style="width:${s}px;text-align:center;flex:none">
 <svg width="${s}" height="${s}" viewBox="0 0 200 200" style="display:block">
  ${BADGES[i]}
  <g transform="translate(57 30) scale(.45)">${DALLAH_SIL()}</g>
  <line x1="70" y1="117" x2="130" y2="117" stroke="${GO}" stroke-width="1.2" opacity=".7"/>
  <text x="100" y="150" text-anchor="middle" font-family="Ruqaa" font-weight="700" font-size="22" fill="${GO}" direction="rtl">${name}</text>
 </svg></div>`;
function DALLAH_SIL() {
  return `<g fill="${GO}"><circle cx="104" cy="18" r="7"/><rect x="101" y="22" width="6" height="12"/>
   <path d="M88 34 Q104 26 120 34 L116 56 L92 56 Z"/><path d="M94 58 L114 58 L118 80 Q140 98 140 128 Q140 162 104 170 Q68 162 68 128 Q68 98 90 80 Z"/>
   <path d="M80 112 C70 86 52 70 26 62 L22 70 C46 78 62 94 70 120 Z"/><path d="M138 102 Q166 100 162 132 Q158 156 134 154 L134 146 Q152 146 154 130 Q156 110 138 112 Z"/></g>`;
}

// v2 lit 3D mockups: cylinder shading, lid in perspective, paper grain, soft contact shadow
let UID = 0;
const CYL = id => `<linearGradient id="${id}" x1="0" x2="1">
  <stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset=".12" stop-color="#000" stop-opacity=".18"/>
  <stop offset=".3" stop-color="#fff" stop-opacity=".22"/><stop offset=".38" stop-color="#fff" stop-opacity=".08"/>
  <stop offset=".62" stop-color="#000" stop-opacity=".02"/><stop offset=".86" stop-color="#000" stop-opacity=".3"/>
  <stop offset="1" stop-color="#000" stop-opacity=".6"/></linearGradient>`;
const GRAIN = id => `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/>
  <feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .09 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>`;
const BLUR = (id, d) => `<filter id="${id}" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="${d}"/></filter>`;
// paper cup with plastic lid, 3/4 front view. w = rendered width
const CUP = (w, body, sleeve, logo, lid = '#EDE6DA') => {
  const u = 'c' + (UID++);
  return `<svg width="${w}" height="${w * 1.6}" viewBox="0 0 200 320" style="display:block;flex:none;overflow:visible">
  <defs>${CYL(u + 'g')}${GRAIN(u + 'n')}${BLUR(u + 'b', 7)}
   <linearGradient id="${u}l" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".3" stop-color="#fff" stop-opacity=".5"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></linearGradient>
   <clipPath id="${u}c"><path d="M26 62 L174 62 L156 300 Q100 310 44 300 Z"/></clipPath></defs>
  <ellipse cx="100" cy="306" rx="74" ry="9" fill="#000" opacity=".75" filter="url(#${u}b)"/>
  <g clip-path="url(#${u}c)">
   <rect x="0" y="40" width="200" height="280" fill="${body}"/>
   <path d="M0 128 Q100 140 200 128 L200 228 Q100 240 0 228 Z" fill="${sleeve}"/>
   <g transform="translate(0 4)">${logo}</g>
   <rect x="0" y="40" width="200" height="280" fill="url(#${u}g)"/>
   <rect x="0" y="40" width="200" height="280" filter="url(#${u}n)" fill="#fff"/>
   <path d="M0 128 Q100 140 200 128" stroke="#000" stroke-opacity=".12" stroke-width="2" fill="none"/>
   <path d="M0 228 Q100 240 200 228" stroke="#000" stroke-opacity=".12" stroke-width="2" fill="none"/>
  </g>
  <path d="M44 300 Q100 310 156 300" stroke="#000" stroke-opacity=".35" stroke-width="2" fill="none"/>
  <ellipse cx="100" cy="62" rx="76" ry="12" fill="#000" opacity=".25"/>
  <path d="M20 46 Q20 34 100 34 Q180 34 180 46 L180 56 Q180 68 100 68 Q20 68 20 56 Z" fill="${lid}"/>
  <path d="M20 46 Q20 34 100 34 Q180 34 180 46 L180 56 Q180 68 100 68 Q20 68 20 56 Z" fill="url(#${u}l)"/>
  <ellipse cx="100" cy="40" rx="70" ry="9" fill="${lid}"/><ellipse cx="100" cy="38" rx="56" ry="6" fill="#fff" opacity=".35"/>
  <ellipse cx="128" cy="38" rx="9" ry="2.6" fill="#000" opacity=".35"/>
</svg>`;
};

const ON = (fg, acc) => `<g transform="translate(45 120) scale(.55)"><g transform="translate(14 -6)">${MARK(fg, acc)}</g></g>`;
const SIL_ON = `<g transform="translate(53 133) scale(.5)">${DALLAH_SIL()}</g>`;
const S = [];
// 1 hook: a shelf of look-alike cups, one different
const brownCup = () => CUP(180, BR, BRL, SIL_ON);
const dallaCup = CUP(250, G, CR, ON(G, SAF));
S.push(`${FONTS}
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="kick"><span class="ar">درس هوية</span><span class="ln"></span><span class="en">Identity lesson</span></div>
  <div class="t" style="margin-top:28px;font-size:84px;line-height:108px">كل براندات القهوة<br>العربية شكلها <span class="gold">واحد</span>… ليش؟</div>
</div>
<div class="abs" style="right:80px;left:80px;top:560px;height:500px;display:flex;justify-content:space-between;align-items:flex-end;direction:ltr">
  ${brownCup()}${brownCup()}${dallaCup}${brownCup()}
</div>
<div class="abs" style="right:80px;left:80px;top:1060px;height:2px;background:#2C2C2C"></div>
<div class="abs" style="right:80px;left:80px;top:1110px;display:flex;justify-content:space-between;align-items:center">
  <div class="sub" style="font-size:32px;line-height:48px">بني، وذهبي، وخط، ورسمة دلّة.<br>نفس الوصفة عند الكل.</div>
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
  ${names.map((n, i) => `<div style="background:#161616;width:440px;height:300px;display:flex;align-items:center;justify-content:center">${LOOK(n, i, 240)}</div>`).join('')}
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

// 4 result (v2): one lit product scene instead of four flat tiles
const thermos = (() => { const u = 't' + (UID++); return `<svg width="150" height="330" viewBox="0 0 100 220" style="display:block;overflow:visible">
  <defs>${CYL(u + 'g')}${GRAIN(u + 'n')}${BLUR(u + 'b', 5)}</defs>
  <ellipse cx="50" cy="214" rx="40" ry="6" fill="#000" opacity=".8" filter="url(#${u}b)"/>
  <rect x="24" y="6" width="52" height="36" rx="9" fill="${SAF}"/><rect x="24" y="6" width="52" height="36" rx="9" fill="url(#${u}g)"/>
  <rect x="20" y="40" width="60" height="8" rx="3" fill="${GD}"/>
  <rect x="12" y="46" width="76" height="168" rx="20" fill="${G}"/>
  <g transform="translate(14 74) scale(.38)"><g transform="translate(14 -6)">${MARK(CR, SAF)}</g></g>
  <text x="50" y="176" text-anchor="middle" font-family="IBM Plex Sans Arabic" font-weight="700" font-size="17" fill="${CR}">دلّة</text>
  <rect x="12" y="46" width="76" height="168" rx="20" fill="url(#${u}g)"/>
  <rect x="12" y="46" width="76" height="168" rx="20" filter="url(#${u}n)" fill="#fff"/>
  <rect x="26" y="56" width="5" height="140" rx="2.5" fill="#fff" opacity=".18"/>
</svg>`; })();
const bag = (() => { const u = 'b' + (UID++); return `<svg width="330" height="390" viewBox="0 0 220 260" style="display:block;overflow:visible">
  <defs>${GRAIN(u + 'n')}${BLUR(u + 'b', 8)}
   <linearGradient id="${u}f" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".10"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>
   <linearGradient id="${u}v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".18"/><stop offset=".25" stop-color="#000" stop-opacity="0"/></linearGradient></defs>
  <ellipse cx="112" cy="254" rx="104" ry="9" fill="#000" opacity=".8" filter="url(#${u}b)"/>
  <path d="M62 62 Q62 16 100 16 Q138 16 138 62" fill="none" stroke="${GD}" stroke-width="7" stroke-linecap="round"/>
  <path d="M168 62 L208 50 L210 246 L172 254 Z" fill="#CFC5B1"/>
  <path d="M168 62 L208 50 L190 60 Z" fill="#B9AE98"/>
  <path d="M16 62 L172 62 L172 254 L16 254 Z" fill="${CR}"/>
  <path d="M16 62 L172 62 L172 84 L16 84 Z" fill="${G}"/>
  <path d="M16 84 L172 84" stroke="#000" stroke-opacity=".15" stroke-width="1.5"/>
  <g transform="translate(46 98) scale(.5)"><g transform="translate(14 -6)">${MARK(G, SAF)}</g></g>
  <text x="94" y="232" text-anchor="middle" font-family="Kufi" font-weight="700" font-size="17" fill="${G}">قهوتك لين الباب</text>
  <path d="M16 62 L172 62 L172 254 L16 254 Z" fill="url(#${u}f)"/><path d="M16 62 L172 62 L172 254 L16 254 Z" fill="url(#${u}v)"/>
  <path d="M16 62 L172 62 L172 254 L16 254 Z" filter="url(#${u}n)" fill="#fff"/>
  <path d="M172 62 L172 254" stroke="#000" stroke-opacity=".2" stroke-width="1.5"/>
</svg>`; })();
const profile = `<div style="display:flex;align-items:center;gap:26px;direction:rtl">
  <div style="width:132px;height:132px;border-radius:50%;padding:5px;background:linear-gradient(135deg,${SAF},${G})"><div style="width:122px;height:122px;border-radius:50%;overflow:hidden;border:4px solid #161616">${markSvg(114, G)}</div></div>
  <div><div style="font:700 30px/40px Inter;direction:ltr;text-align:right">dalla.coffee</div><div style="font:400 24px/34px ${AR};color:#8A8A8A">قهوة عربية لين بابك</div></div></div>`;
S.push(`${FONTS}
<div class="abs" style="right:80px;left:80px;top:200px">
  <div class="kick"><span class="ar">النتيجة</span><span class="ln"></span><span class="en">Result</span></div>
  <div class="t" style="margin-top:24px;font-size:72px;line-height:92px">رمز واحد… بكل مكان</div>
</div>
<div class="abs" style="right:80px;left:80px;top:420px;height:590px;overflow:hidden;background:radial-gradient(ellipse 70% 60% at 50% 32%,#2a2723 0%,#181716 55%,#121212 100%)">
  <div style="position:absolute;left:0;right:0;top:430px;bottom:0;background:linear-gradient(#1d1b19,#141414)"></div>
  <div style="position:absolute;left:0;right:0;top:430px;height:1px;background:#ffffff10"></div>
  <div style="position:absolute;left:-60px;top:-80px;width:520px;height:420px;background:radial-gradient(closest-side,#E3A33B22,transparent)"></div>
  <div style="position:absolute;left:70px;top:66px">${bag}</div>
  <div style="position:absolute;left:380px;top:110px">${CUP(210, G, CR, ON(G, SAF))}</div>
  <div style="position:absolute;left:575px;top:240px">${CUP(130, CR, G, ON(CR, SAF), '#F7F2E8')}</div>
  <div style="position:absolute;left:730px;top:130px">${thermos}</div>
</div>
<div class="abs" style="right:80px;left:80px;top:1034px;height:180px;background:#161616;display:flex;align-items:center;justify-content:space-between;padding:0 40px">
  ${profile}
  <div style="font:500 30px/42px ${AR};color:#F2F0EB;width:290px">يبين حتى بحجم<br>دائرة البروفايل.</div>
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

render(S, path.join(__dirname, '../2026-11-24/concept-v2'), 'K');
