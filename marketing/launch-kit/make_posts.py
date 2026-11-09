"""يولّد ملفات HTML لأول 9 منشورات في designs/. عدّل النصوص هنا ثم شغّل render.py.

الاستخدام (من جذر المشروع):
    python marketing/launch-kit/make_posts.py
    python marketing/launch-kit/render.py
"""
from pathlib import Path

DESIGNS = Path(__file__).resolve().parent / 'designs'

WA = ('<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.4 '
      '14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 '
      '0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l2 '
      '1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>')


def page(name: str, theme: str, css: str, body: str) -> None:
    logo = '../assets/logo-dark.png' if theme == 'bg-light' else '../assets/logo-white.png'
    html = f'''<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="render-size" content="1080x1350">
<link rel="stylesheet" href="brand.css">
<style>
  body {{ width: 1080px; height: 1350px; }}
  .wrap {{ position: absolute; top: 80px; bottom: 150px; left: 72px; right: 72px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }}
  .wrap > * {{ max-width: 100%; }}
  .wrap > .cards, .wrap > .steps, .wrap > ol, .wrap > .cols, .wrap > .grid, .wrap > .topics, .wrap > .box, .wrap > ul {{ align-self: stretch; }}
{css}
</style></head>
<body class="{theme}">
{body}
  <div class="post-footer"><img src="{logo}" alt=""><div class="wa">{WA}<span>+963 964 667 678</span></div></div>
</body></html>
'''
    (DESIGNS / f'{name}.html').write_text(html, encoding='utf-8')


page('c1-intro', 'bg-dark', '''
  .glow { position:absolute; top:-160px; left:-120px; width:620px; height:620px; border-radius:50%; background:var(--cyan); filter:blur(170px); opacity:.35; }
  .mark { position:absolute; left:50px; bottom:150px; width:300px; opacity:.10; }
  h1.title { font-size:108px; }
  .pills { display:flex; flex-wrap:wrap; gap:16px; margin-top:56px; }
  .pills div { font-size:32px; font-weight:800; padding:10px 30px; border-radius:16px; background:rgba(60,197,211,.14); border:1px solid rgba(60,197,211,.45); }
''', '''  <div class="glow"></div><img class="mark" src="../assets/mark-white.png" alt="">
  <div class="wrap">
    <div class="kicker">أهلاً بكم في Ai Creative</div>
    <h1 class="title">نُكبّر مشروعك<br><span class="hl">ونكبر معك</span></h1>
    <p class="lead">وكالة تسويق رقمي في حلب، نحوّل إعلانك إلى رسائل وطلبات حقيقية، لا مجرد إعجابات.</p>
    <div class="pills"><div>إعلانات ممولة</div><div>إدارة محتوى</div><div>تدريب</div></div>
  </div>''')

page('c2-services', 'bg-light', '''
  .cards { margin-top:46px; display:flex; flex-direction:column; gap:24px; }
  .card { background:#fff; border-radius:28px; padding:30px 34px; display:flex; gap:28px; align-items:center; box-shadow:0 10px 30px rgba(22,121,137,.10); }
  .num { flex:none; width:96px; height:96px; border-radius:24px; background:linear-gradient(135deg,var(--teal),var(--cyan)); color:#fff; font-size:48px; font-weight:900; display:flex; align-items:center; justify-content:center; }
  .card h3 { font-size:42px; font-weight:900; }
  .card p { font-size:28px; font-weight:600; color:#3d5a66; margin-top:4px; }
''', '''  <div class="wrap">
    <div class="kicker">ماذا نقدّم؟</div>
    <h1 class="title">3 خدمات<br><span class="hl">هدفها البيع</span></h1>
    <div class="cards">
      <div class="card"><div class="num">1</div><div><h3>الإعلانات الممولة</h3><p>حملات فيسبوك وإنستغرام بهدف رسائل وطلبات، مع تقرير أسبوعي</p></div></div>
      <div class="card"><div class="num">2</div><div><h3>إدارة المحتوى</h3><p>خطة شهرية وتصاميم وريلز ومنشورات تعبّر عن مشروعك</p></div></div>
      <div class="card"><div class="num">3</div><div><h3>التدريب</h3><p>تعلّم إدارة إعلاناتك بنفسك من الصفر حتى أول مبيعة</p></div></div>
    </div>
  </div>''')

page('c3-process', 'bg-dark', '''
  .steps { margin-top:54px; display:flex; flex-direction:column; gap:24px; }
  .step { display:flex; gap:26px; align-items:flex-start; }
  .step b { flex:none; width:84px; height:84px; border-radius:50%; border:3px solid var(--aqua); color:var(--aqua); font-size:38px; font-weight:900; display:flex; align-items:center; justify-content:center; }
  .step h3 { font-size:40px; font-weight:900; }
  .step p { font-size:28px; font-weight:600; color:#bfe3e9; }
''', '''  <div class="wrap">
    <div class="kicker">كيف نعمل معك؟</div>
    <h1 class="title">4 خطوات <span class="hl">واضحة</span></h1>
    <div class="steps">
      <div class="step"><b>1</b><div><h3>نفهم مشروعك</h3><p>ماذا تبيع، ومن هو زبونك، وماذا يفعل منافسك</p></div></div>
      <div class="step"><b>2</b><div><h3>نضع خطة</h3><p>هدف واضح، وجمهور، وميزانية، ومحتوى</p></div></div>
      <div class="step"><b>3</b><div><h3>نطلق ونجرّب</h3><p>أكثر من إعلان، ونستمر بالأفضل أداءً</p></div></div>
      <div class="step"><b>4</b><div><h3>نقيس كل أسبوع</h3><p>تقرير بالأرقام: عدد الرسائل وتكلفة كل رسالة</p></div></div>
    </div>
  </div>''')

page('c4-mistakes', 'bg-light', '''
  ol { list-style:none; margin-top:44px; display:flex; flex-direction:column; gap:18px; counter-reset:m; }
  li { counter-increment:m; background:#fff; border-radius:24px; padding:22px 30px; font-size:32px; font-weight:800; display:flex; gap:22px; align-items:center; box-shadow:0 8px 24px rgba(22,121,137,.08); }
  li::before { content:counter(m); flex:none; width:62px; height:62px; border-radius:18px; background:#fde4e4; color:#c0392b; font-size:32px; font-weight:900; display:flex; align-items:center; justify-content:center; }
  li small { display:block; font-size:24px; font-weight:600; color:#4b6672; }
''', '''  <div class="wrap">
    <div class="kicker">نصيحة اليوم</div>
    <h1 class="title">5 أخطاء <span class="hl">تحرق</span><br>ميزانية إعلانك</h1>
    <ol>
      <li><div>الاكتفاء بزر "ترويج"<small>بدل مدير الإعلانات وأهدافه</small></div></li>
      <li><div>استهداف سوريا كلها<small>وزبونك في مدينتك أو حيّك فقط</small></div></li>
      <li><div>اختيار هدف "التفاعل"<small>وأنت تريد رسائل وطلبات</small></div></li>
      <li><div>إعلان واحد فقط<small>دون تجربة صورة وفيديو ونص مختلف</small></div></li>
      <li><div>التأخر في الرد على الرسائل<small>الزبون الذي لا يجد رداً يذهب لغيرك</small></div></li>
    </ol>
  </div>''')

page('c5-boost-vs-ads', 'bg-dark', '''
  .cols { display:flex; gap:24px; margin-top:54px; }
  .col { flex:1; border-radius:30px; padding:32px 30px; }
  .col.bad { background:rgba(255,255,255,.06); border:2px solid rgba(255,255,255,.15); }
  .col.good { background:linear-gradient(160deg,var(--teal),var(--cyan)); }
  .col h3 { font-size:40px; font-weight:900; margin-bottom:18px; }
  .col p { font-size:28px; font-weight:700; margin-bottom:14px; display:flex; gap:12px; }
  .bad p::before { content:'✕'; color:#ff8a80; }
  .good p::before { content:'✓'; color:#fff; }
  .verdict { margin-top:40px; font-size:34px; font-weight:800; text-align:center; color:#cfeff3; }
''', '''  <div class="wrap">
    <div class="kicker">سؤال يتكرر كثيراً</div>
    <h1 class="title">زر "ترويج"<br>أم <span class="hl">مدير الإعلانات</span>؟</h1>
    <div class="cols">
      <div class="col bad"><h3>زر ترويج</h3><p>أهداف محدودة</p><p>استهداف عام</p><p>صعوبة المقارنة بين الإعلانات</p><p>النتيجة غالباً إعجابات</p></div>
      <div class="col good"><h3>مدير الإعلانات</h3><p>هدف رسائل أو مبيعات</p><p>استهداف دقيق</p><p>تجربة أكثر من إعلان</p><p>أرقام واضحة لكل دولار</p></div>
    </div>
    <div class="verdict">تريد زبائن؟ ابدأ من مدير الإعلانات</div>
  </div>''')

page('c6-promises', 'bg-light', '''
  .grid { display:grid; grid-template-columns:1fr 1fr; gap:22px; margin-top:46px; }
  .item { background:#fff; border-radius:28px; padding:34px 28px; box-shadow:0 10px 28px rgba(22,121,137,.10); }
  .item b { display:block; font-size:58px; font-weight:900; color:var(--teal); line-height:1.1; }
  .item span { font-size:29px; font-weight:700; color:#33515d; }
''', '''  <div class="wrap">
    <div class="kicker">دون وعود خيالية</div>
    <h1 class="title">التزاماتنا <span class="hl">معك</span></h1>
    <p class="lead">لا نعدك بـ"مبيعات خارقة". نعدك بعمل واضح ومكتوب في العقد:</p>
    <div class="grid">
      <div class="item"><b>أسبوعياً</b><span>تقرير بنتائج حملتك</span></div>
      <div class="item"><b>2</b><span>تعديلات مجانية لكل تصميم</span></div>
      <div class="item"><b>15 يوم</b><span>إشعار مسبق فقط لإلغاء العقد</span></div>
      <div class="item"><b>سرية</b><span>بياناتك وحساباتك محمية</span></div>
    </div>
  </div>''')

page('c7-ads-package', 'bg-brand', '''
  .price { margin-top:24px; display:flex; align-items:baseline; gap:16px; }
  .price b { font-size:150px; font-weight:900; line-height:1; direction:ltr; }
  .price span { font-size:38px; font-weight:800; }
  ul { list-style:none; margin-top:36px; display:flex; flex-direction:column; gap:14px; }
  li { font-size:31px; font-weight:800; display:flex; gap:16px; align-items:center; }
  li::before { content:'✓'; flex:none; width:46px; height:46px; border-radius:50%; background:rgba(255,255,255,.22); display:flex; align-items:center; justify-content:center; font-size:26px; }
  .note { margin-top:30px; font-size:25px; font-weight:700; background:rgba(15,37,48,.25); padding:14px 22px; border-radius:16px; display:inline-block; }
  .kicker { background:rgba(255,255,255,.2); color:#fff; }
''', '''  <div class="wrap">
    <div class="kicker">الأنسب للبداية</div>
    <h1 class="title">باقة الإعلانات</h1>
    <div class="price"><b>$200</b><span>شهرياً</span></div>
    <ul>
      <li>إعداد وإدارة حملة فيسبوك وإنستغرام</li>
      <li>دراسة جمهورك وضبط الاستهداف</li>
      <li>6 تصاميم إعلانية + 2 ريلز</li>
      <li>كتابة نصوص الإعلانات</li>
      <li>تقرير أسبوعي بتكلفة كل رسالة</li>
    </ul>
    <div class="note">ميزانية الإعلان منفصلة وتُدفع للمنصة مباشرة</div>
  </div>''')

page('c8-workshop', 'bg-light', '''
  .badge { display:inline-block; margin-top:30px; font-size:34px; font-weight:900; color:#fff; background:linear-gradient(90deg,var(--teal),var(--cyan)); padding:10px 30px; border-radius:16px; }
  .topics { margin-top:36px; display:grid; grid-template-columns:1fr 1fr; gap:18px; }
  .topics div { background:#fff; border-radius:22px; padding:22px 24px; font-size:29px; font-weight:800; box-shadow:0 8px 24px rgba(22,121,137,.08); }
  .topics small { display:block; font-size:22px; font-weight:700; color:var(--teal); }
  h1.title { font-size:72px; }
''', '''  <div class="wrap">
    <div class="kicker">قريباً في حلب</div>
    <h1 class="title">ورشة إعلانات فيسبوك<br><span class="hl">من الصفر حتى أول مبيعة</span></h1>
    <div class="badge">تطبيق عملي على حسابك</div>
    <div class="topics">
      <div><small>الجلسة 1</small>مدير الإعلانات من الداخل</div>
      <div><small>الجلسة 2</small>الجمهور والاستهداف</div>
      <div><small>الجلسة 3</small>إعلان يجلب رسائل</div>
      <div><small>الجلسة 4</small>قراءة الأرقام والتحسين</div>
    </div>
    <p class="lead" style="margin-top:34px;font-weight:800">المقاعد محدودة. أرسل "ورشة" على واتساب لنحجز لك مكاناً.</p>
  </div>''')

page('c9-free-review', 'bg-dark', '''
  .glow { position:absolute; bottom:-200px; right:-160px; width:700px; height:700px; border-radius:50%; background:var(--cyan); filter:blur(180px); opacity:.3; }
  .box { margin-top:44px; border:2px dashed rgba(60,197,211,.6); border-radius:30px; padding:34px; }
  .box p { font-size:32px; font-weight:800; margin-bottom:14px; display:flex; gap:16px; }
  .box p::before { content:'←'; color:var(--aqua); }
  .cta { margin-top:40px; display:inline-flex; align-items:center; gap:14px; background:#25d366; color:#fff; font-size:38px; font-weight:900; padding:16px 40px; border-radius:999px; }
  .cta svg { width:44px; height:44px; }
''', '''  <div class="glow"></div>
  <div class="wrap">
    <div class="kicker">عرض الإطلاق</div>
    <h1 class="title">إعلاناتك لا تجلب<br><span class="hl">نتائج</span>؟</h1>
    <p class="lead">أرسل لنا رابط صفحتك، ونرسل لك 3 ملاحظات عملية مجاناً:</p>
    <div class="box"><p>ما الذي يهدر ميزانيتك</p><p>من يجب أن تستهدف</p><p>ماذا تغيّر في إعلانك القادم</p></div>
    <div class="cta">''' + WA + '''أرسل "تحليل" على واتساب</div>
  </div>''')

print('posts generated')
