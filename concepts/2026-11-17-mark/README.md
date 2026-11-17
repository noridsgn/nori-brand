# كونسبت MARK · علامة (الثلاثاء 17 نوفمبر 2026)

كافيه وهمي. الاسم «علامة» اقترحه واحد من المتابعين، ونوري اختار MARK وسوّى اللوقو («M شايل القهوة») بنفسه (`logo/`).

- `mark-01.jpg` لين `mark-10.jpg`: 10 صور 1080×1440 (الغلاف، الاسم، اللوقو، الألوان والخط، الكوب، التيك أواي، الواجهة، الأكياس، الفريق والزباين، الخلاصة).
- `caption.md`: الكابشن (دعوة وحدة: كومنت. بدون دايركت أو أسعار).
- `mockups/`: نتيجة تركيب الهوية على الموكابات (JPG بس).
- `logo/`: ملفات اللوقو من نوري (PNG) + `mark-icon.svg` (الرمز فيكتور، مرسوم من قياسات الـ PNG).
- الألوان: #EAE0D5 كريمة، #C6AC8F لاتيه، #5E503F بُن، #22333B ليل، #0A0908 إسبريسو. الخط: Montserrat + Tajawal للنصوص (الكوفي داخل اللوقو صورة من ملف نوري).

## الموكابات
ملفات PSD جابها نوري (mockups-design.com، Mr.Mockup، Pixpine، ls.graphics). **ما تنرفع هني**: رخصها تمنع نشر الـ PSD. `src/comp.py` و`src/m_all.py` و`src/m_window.py` يركبون التصاميم عليها (يقرون الطبقات والـ smart object box)، ويحتاجون مجلد الـ PSD محلي.

## الإعادة
`npm i @fontsource/montserrat @fontsource/reem-kufi @fontsource/tajawal playwright-core` · `python3 mklogo.py` · `node shot.js designs.html designs` · `python3 m_all.py` و`m_window.py` · `node shot.js slides.html out`.

## الحالة
ينتظر موافقة نوري. ما انجدول على Metricool.
