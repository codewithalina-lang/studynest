const ur = {
    nav_courses:"کورسز", nav_features:"خصوصیات", nav_pricing:"قیمتیں", nav_faq:"سوالات",
    cta_start:"شروع کریں", cta_demo:"ڈیمو دیکھیں",
    hero_title:"ہنر سیکھیں، مستقبل بنائیں",
    hero_text:"لائیو کلاسز، سرٹیفکیٹ اور 200 سے زیادہ کورسز تک لائف ٹائم رسائی۔",
    hero_card:"آپ کی پیش رفت", hero_badge:"سرٹیفکیٹ جلد",
    stat1:"طلبہ", stat2:"کورسز", stat3:"ریٹنگ",
    courses_title:"اپنی کیٹیگری چنیں",
    c1:"ویب ڈیولپمنٹ", c2:"گرافک ڈیزائن", c3:"مصنوعی ذہانت", c4:"ڈیجیٹل مارکیٹنگ", c5:"فری لانسنگ", c6:"انگلش سپیکنگ",
    features_title:"سیکھنے کی ہر چیز یہاں ہے",
    f1_t:"لائیو کلاسز", f1_d:"اساتذہ کے ساتھ سوال پوچھیں اور سیکھیں۔",
    f2_t:"سرٹیفکیٹ", f2_d:"کورس مکمل کریں اور سرٹیفکیٹ اپنی سی وی میں شامل کریں۔",
    f3_t:"لائف ٹائم رسائی", f3_d:"ایک بار ادائیگی کریں اور جب چاہیں دوبارہ سیکھیں۔",
    test_title:"طلبہ کیا کہتے ہیں",
    t1:"ویب کورس سے مجھے پہلا فری لانس کلائنٹ ملا۔", t2:"لائیو کلاسز نے مشکل موضوع آسان کر دیے۔", t3:"اردو سپورٹ کی وجہ سے میرا پورا خاندان سیکھ رہا ہے۔",
    price_title:"اپنا پلان چنیں", monthly:"ماہانہ", yearly:"سالانہ", popular:"سب سے مقبول",
    p1:"5 ابتدائی کورسز", p2:"تمام کورسز اور سرٹیفکیٹ", p3:"10 طلبہ تک",
    faq_title:"سوال و جواب",
    q1:"کیا میں اپنی رفتار سے سیکھ سکتا ہوں؟", a1:"جی ہاں۔ ریکارڈ شدہ لیکچرز آپ کے پلان کے دوران دستیاب رہتے ہیں۔",
    q2:"کیا سرٹیفکیٹ ملے گا؟", a2:"پرو اور ٹیم پلان میں ہر مکمل کورس پر سرٹیفکیٹ ملتا ہے۔",
    q3:"کیا میں کبھی بھی منسوخ کر سکتا ہوں؟", a3:"جی ہاں۔ اکاؤنٹ سے منسوخ کریں، دوبارہ چارج نہیں ہوگا۔",
    cta_title:"آج ہی سیکھنا شروع کریں", cta_btn:"اسٹڈی نیسٹ میں شامل ہوں"
  };
  const root = document.documentElement;
  const els = document.querySelectorAll('[data-i18n]');
  els.forEach(el => el.dataset.en = el.textContent);
  
  function setTheme(dark) {
    root.classList.toggle('dark', dark);
    document.getElementById('themeIcon').textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }
  function setLang(lang) {
    root.lang = lang;
    root.dir = lang === 'ur' ? 'rtl' : 'ltr';
    els.forEach(el => el.textContent = lang === 'ur' ? (ur[el.dataset.i18n] || el.dataset.en) : el.dataset.en);
    document.getElementById('langBtn').textContent = lang === 'ur' ? 'EN' : 'اردو';
    updatePrices();
    localStorage.setItem('lang', lang);
  }
  
  let yearly = false;
  function updatePrices() {
    const isUr = root.lang === 'ur';
    document.querySelectorAll('.price').forEach(p => p.textContent = yearly ? p.dataset.y : p.dataset.m);
    const unit = yearly ? (isUr ? ' /سال' : ' /yr') : (isUr ? ' /ماہ' : ' /mo');
    document.querySelectorAll('#per, .per2').forEach(s => s.textContent = unit);
    document.getElementById('btnMonthly').className = 'rounded-full px-5 py-1 ' + (yearly ? '' : 'bg-primary text-white');
    document.getElementById('btnYearly').className = 'rounded-full px-5 py-1 ' + (yearly ? 'bg-primary text-white' : '');
  }
  
  document.getElementById('themeBtn').onclick = () => setTheme(!root.classList.contains('dark'));
  document.getElementById('langBtn').onclick = () => setLang(root.lang === 'ur' ? 'en' : 'ur');
  document.getElementById('menuBtn').onclick = () => {
    const m = document.getElementById('mobileMenu');
    m.classList.toggle('hidden'); m.classList.toggle('flex');
  };
  document.getElementById('btnMonthly').onclick = () => { yearly = false; updatePrices(); };
  document.getElementById('btnYearly').onclick = () => { yearly = true; updatePrices(); };
  
  const counter = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, to = +el.dataset.to; let n = 0;
      const step = Math.max(1, Math.round(to / 60));
      const t = setInterval(() => {
        n = Math.min(to, n + step); el.textContent = n.toLocaleString('en');
        if (n === to) clearInterval(t);
      }, 20);
      counter.unobserve(el);
    });
  });
  document.querySelectorAll('.count').forEach(c => counter.observe(c));
  
  setTheme(localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && matchMedia('(prefers-color-scheme: dark)').matches));
  setLang(localStorage.getItem('lang') || 'en');