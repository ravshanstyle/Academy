import React, { useState, useEffect, createContext, useContext } from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
`;

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const T = {
  uz: {
    city: "TOSHKENT · TIL TA'LIM MARKAZI",
    heroSub: "Ingliz va rus tillarini amaliyotga asoslangan, kichik guruhlarda va natijaga yo'naltirilgan dasturlar orqali o'rganing.",
    heroBtn1: "Bepul sinov darsiga yozilish",
    heroBtn2: "Kurslarni ko'rish",
    stat1: "yillik tajriba", stat2: "bitiruvchi", stat3: "kichik guruh", stat4: "o'rtacha baho",
    popularCourses: "Mashhur kurslar",
    nav: ["Bosh sahifa","Kurslar","O'qituvchilar","Fikrlar","Blog"],
    navRegister: "Ro'yxatdan o'tish",
    coursesTitle: "Kurslar",
    coursesSub: "Daraja va maqsadingizga mos dasturni tanlang.",
    month: "oy", perMonth: "so'm/oy", duration: "Davomiyligi",
    teachersTitle: "O'qituvchilar",
    teachersSub: "Tajribali va sertifikatlangan ustozlar jamoasi.",
    testimonialsTitle: "Bitiruvchilar fikrlari",
    testimonialsSub: "O'quvchilarimiz tajribasi.",
    blogTitle: "Blog",
    blogSub: "Til o'rganish bo'yicha maslahat va yangiliklar.",
    registerTitle: "Ro'yxatdan o'tish",
    registerSub: "Bepul sinov darsiga joy band qiling.",
    labelName: "ISM FAMILIYA",
    labelPhone: "TELEFON RAQAM",
    labelLang: "TIL",
    labelLevel: "DARAJA",
    submit: "Yuborish",
    successTitle: "Qabul qilindi ✓",
    successMsg: "Rahmat, {name}! Tez orada operatorimiz {phone} raqamiga bog'lanadi.",
    namePlaceholder: "Masalan: Ravshan Saydullayev",
    phonePlaceholder: "+998 90 123 45 67",
    english: "Ingliz tili", russian: "Rus tili",
    beginner: "Beginner", intermediate: "Intermediate", ielts: "IELTS / Imtihonga tayyorlov",
    footerCity: "Toshkent, Chilonzor tumani",
    courses: [
      { lang: "uz", name: "Ingliz tili", level: "Boshlang'ich · A1–A2", duration: "3", price: "450 000", accent: "cyan" },
      { lang: "uz", name: "Ingliz tili", level: "O'rta · B1–B2", duration: "4", price: "550 000", accent: "cyan" },
      { lang: "uz", name: "Ingliz tili", level: "IELTS tayyorlov", duration: "5", price: "650 000", accent: "cyan" },
      { lang: "uz", name: "Rus tili", level: "Boshlang'ich", duration: "3", price: "400 000", accent: "magenta" },
      { lang: "uz", name: "Rus tili", level: "O'rta daraja", duration: "4", price: "500 000", accent: "magenta" },
      { lang: "uz", name: "Rus tili", level: "Suhbat klubi", duration: "2", price: "350 000", accent: "magenta" },
    ],
    teachers: [
      { name: "Shohsanam Namozova", role: "Asoschi · Ingliz tili", info: "8 yil tajriba · CELTA sertifikati", initials: "SN", accent: "cyan" },
      { name: "Madina Yusupova", role: "Rus tili o'qituvchisi", info: "6 yil tajriba · Filologiya magistri", initials: "MY", accent: "magenta" },
      { name: "Aziz Karimov", role: "IELTS instruktori", info: "IELTS 7.5 ball · 5 yil tajriba", initials: "AK", accent: "cyan" },
      { name: "Nilufar Rashidova", role: "Ingliz tili (Boshlang'ich)", info: "4 yil tajriba · Bolalar guruhlari", initials: "NR", accent: "magenta" },
    ],
    testimonials: [
      { name: "Sardor B.", text: "3 oyda IELTS 6.5 ball oldim. O'qituvchilar har bir xatoni tushuntirib berishadi.", course: "IELTS tayyorlov" },
      { name: "Dilnoza K.", text: "Rus tilidan qo'rqib yurardim, hozir ish joyimda erkin gaplasha olaman.", course: "Rus tili, O'rta daraja" },
      { name: "Jasur T.", text: "Guruhlar kichik, hamma e'tibordan chetda qolmaydi. Tavsiya qilaman.", course: "Ingliz tili, Intermediate" },
    ],
    blog: [
      { date: "12.06.2026", title: "IELTS imtihoniga qanday tayyorlanish kerak?", excerpt: "To'g'ri strategiya va vaqt taqsimoti bilan natijangizni 1 oyda oshiring." },
      { date: "03.06.2026", title: "Rus tilini tezroq o'rganishning 5 ta siri", excerpt: "Kundalik amaliyot va to'g'ri manbalar tanlash — muvaffaqiyat kaliti." },
      { date: "22.05.2026", title: "Til o'rganishda motivatsiyani qanday saqlash mumkin?", excerpt: "Uzoq muddatli maqsadlarni kichik qadamlarga bo'lish usuli." },
    ],
  },
  ru: {
    city: "ТАШКЕНТ · ЦЕНТР ЯЗЫКОВЫХ КУРСОВ",
    heroSub: "Изучайте английский и русский языки в небольших группах по практико-ориентированным программам.",
    heroBtn1: "Записаться на пробный урок",
    heroBtn2: "Смотреть курсы",
    stat1: "лет опыта", stat2: "выпускников", stat3: "малых групп", stat4: "средний балл",
    popularCourses: "Популярные курсы",
    nav: ["Главная","Курсы","Преподаватели","Отзывы","Блог"],
    navRegister: "Регистрация",
    coursesTitle: "Курсы",
    coursesSub: "Выберите программу по вашему уровню и цели.",
    month: "мес", perMonth: "сум/мес", duration: "Длительность",
    teachersTitle: "Преподаватели",
    teachersSub: "Опытная и сертифицированная команда.",
    testimonialsTitle: "Отзывы выпускников",
    testimonialsSub: "Опыт наших учеников.",
    blogTitle: "Блог",
    blogSub: "Советы и новости по изучению языков.",
    registerTitle: "Регистрация",
    registerSub: "Запишитесь на бесплатный пробный урок.",
    labelName: "ИМЯ ФАМИЛИЯ",
    labelPhone: "НОМЕР ТЕЛЕФОНА",
    labelLang: "ЯЗЫК",
    labelLevel: "УРОВЕНЬ",
    submit: "Отправить",
    successTitle: "Принято ✓",
    successMsg: "Спасибо, {name}! Наш оператор свяжется с вами по номеру {phone}.",
    namePlaceholder: "Например: Иван Иванов",
    phonePlaceholder: "+998 90 123 45 67",
    english: "Английский язык", russian: "Русский язык",
    beginner: "Начальный", intermediate: "Средний", ielts: "IELTS / Подготовка к экзамену",
    footerCity: "Ташкент, Чиланзарский район",
    courses: [
      { name: "Английский", level: "Начальный · A1–A2", duration: "3", price: "450 000", accent: "cyan" },
      { name: "Английский", level: "Средний · B1–B2", duration: "4", price: "550 000", accent: "cyan" },
      { name: "Английский", level: "Подготовка IELTS", duration: "5", price: "650 000", accent: "cyan" },
      { name: "Русский", level: "Начальный", duration: "3", price: "400 000", accent: "magenta" },
      { name: "Русский", level: "Средний уровень", duration: "4", price: "500 000", accent: "magenta" },
      { name: "Русский", level: "Разговорный клуб", duration: "2", price: "350 000", accent: "magenta" },
    ],
    teachers: [
      { name: "Шохсанам Намозова", role: "Основатель · Английский", info: "8 лет опыта · Сертификат CELTA", initials: "SN", accent: "cyan" },
      { name: "Мадина Юсупова", role: "Преподаватель русского", info: "6 лет опыта · Магистр филологии", initials: "MY", accent: "magenta" },
      { name: "Азиз Каримов", role: "Инструктор IELTS", info: "IELTS 7.5 · 5 лет опыта", initials: "AK", accent: "cyan" },
      { name: "Нилуфар Рашидова", role: "Английский (начальный)", info: "4 года опыта · Детские группы", initials: "NR", accent: "magenta" },
    ],
    testimonials: [
      { name: "Сардор Б.", text: "За 3 месяца получил IELTS 6.5. Преподаватели объясняют каждую ошибку.", course: "Подготовка IELTS" },
      { name: "Дилноза К.", text: "Боялась русского, теперь свободно общаюсь на работе.", course: "Русский, средний уровень" },
      { name: "Жасур Т.", text: "Группы маленькие, никто не остаётся без внимания. Рекомендую.", course: "Английский, Intermediate" },
    ],
    blog: [
      { date: "12.06.2026", title: "Как подготовиться к экзамену IELTS?", excerpt: "Правильная стратегия и распределение времени помогут улучшить результат за 1 месяц." },
      { date: "03.06.2026", title: "5 секретов быстрого изучения русского языка", excerpt: "Ежедневная практика и выбор правильных ресурсов — ключ к успеху." },
      { date: "22.05.2026", title: "Как сохранить мотивацию при изучении языка?", excerpt: "Метод разбивки долгосрочных целей на небольшие шаги." },
    ],
  },
  en: {
    city: "TASHKENT · LANGUAGE LEARNING CENTER",
    heroSub: "Learn English and Russian in small groups with practice-focused, results-driven programs.",
    heroBtn1: "Book a Free Trial Lesson",
    heroBtn2: "View Courses",
    stat1: "years experience", stat2: "graduates", stat3: "small groups", stat4: "avg rating",
    popularCourses: "Popular Courses",
    nav: ["Home","Courses","Teachers","Reviews","Blog"],
    navRegister: "Sign Up",
    coursesTitle: "Courses",
    coursesSub: "Find the right program for your level and goals.",
    month: "mo", perMonth: "UZS/mo", duration: "Duration",
    teachersTitle: "Teachers",
    teachersSub: "Experienced and certified teaching team.",
    testimonialsTitle: "Student Reviews",
    testimonialsSub: "Real stories from our students.",
    blogTitle: "Blog",
    blogSub: "Tips and news on language learning.",
    registerTitle: "Sign Up",
    registerSub: "Reserve your spot for a free trial lesson.",
    labelName: "FULL NAME",
    labelPhone: "PHONE NUMBER",
    labelLang: "LANGUAGE",
    labelLevel: "LEVEL",
    submit: "Submit",
    successTitle: "Received ✓",
    successMsg: "Thank you, {name}! Our team will contact you at {phone} shortly.",
    namePlaceholder: "E.g. John Smith",
    phonePlaceholder: "+998 90 123 45 67",
    english: "English", russian: "Russian",
    beginner: "Beginner", intermediate: "Intermediate", ielts: "IELTS / Exam Prep",
    footerCity: "Tashkent, Chilonzor district",
    courses: [
      { name: "English", level: "Beginner · A1–A2", duration: "3", price: "450 000", accent: "cyan" },
      { name: "English", level: "Intermediate · B1–B2", duration: "4", price: "550 000", accent: "cyan" },
      { name: "English", level: "IELTS Preparation", duration: "5", price: "650 000", accent: "cyan" },
      { name: "Russian", level: "Beginner", duration: "3", price: "400 000", accent: "magenta" },
      { name: "Russian", level: "Intermediate", duration: "4", price: "500 000", accent: "magenta" },
      { name: "Russian", level: "Conversation Club", duration: "2", price: "350 000", accent: "magenta" },
    ],
    teachers: [
      { name: "Shohsanam Namozova", role: "Founder · English", info: "8 yrs experience · CELTA certified", initials: "SN", accent: "cyan" },
      { name: "Madina Yusupova", role: "Russian Teacher", info: "6 yrs experience · MA Philology", initials: "MY", accent: "magenta" },
      { name: "Aziz Karimov", role: "IELTS Instructor", info: "IELTS 7.5 · 5 yrs experience", initials: "AK", accent: "cyan" },
      { name: "Nilufar Rashidova", role: "English (Beginner)", info: "4 yrs experience · Children's groups", initials: "NR", accent: "magenta" },
    ],
    testimonials: [
      { name: "Sardor B.", text: "Got IELTS 6.5 in 3 months. Teachers explain every mistake clearly.", course: "IELTS Preparation" },
      { name: "Dilnoza K.", text: "I was afraid of Russian, now I speak freely at work.", course: "Russian, Intermediate" },
      { name: "Jasur T.", text: "Small groups mean everyone gets attention. Highly recommend.", course: "English, Intermediate" },
    ],
    blog: [
      { date: "12.06.2026", title: "How to Prepare for the IELTS Exam?", excerpt: "The right strategy and time management can boost your score in just one month." },
      { date: "03.06.2026", title: "5 Secrets to Learning Russian Faster", excerpt: "Daily practice and choosing the right resources are the keys to success." },
      { date: "22.05.2026", title: "How to Stay Motivated While Learning a Language?", excerpt: "Breaking long-term goals into small steps keeps you on track." },
    ],
  },
};

// ─── CONTEXTS ─────────────────────────────────────────────────────────────────
const LangCtx = createContext(null);
const ThemeCtx = createContext(null);
const useLang = () => useContext(LangCtx);
const useTheme = () => useContext(ThemeCtx);

// ─── THEMES ───────────────────────────────────────────────────────────────────
const DARK = {
  bg: "#070a12",
  card: "#0f1424",
  border: "rgba(0,229,255,0.15)",
  text: "#eef1f8",
  sub: "#8993b0",
  muted: "#b8bedb",
  navBg: "rgba(7,10,18,0.85)",
};
const LIGHT = {
  bg: "#f0f4ff",
  card: "#ffffff",
  border: "rgba(0,150,200,0.2)",
  text: "#0a0e1a",
  sub: "#4a5580",
  muted: "#2a3060",
  navBg: "rgba(240,244,255,0.92)",
};

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const makeCSS = (th) => `
* { box-sizing: border-box; }
.ja-root {
  background: ${th.bg};
  color: ${th.text};
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  transition: background 0.3s, color 0.3s;
}
.ja-root::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
  background-size: 42px 42px;
  pointer-events: none;
  z-index: 0;
}
.ja-display { font-family: 'Rajdhani', sans-serif; }
.ja-mono { font-family: 'JetBrains Mono', monospace; }
.ja-glow-cyan { text-shadow: 0 0 6px rgba(0,229,255,0.85), 0 0 22px rgba(0,229,255,0.4); }
.ja-glow-magenta { text-shadow: 0 0 6px rgba(255,43,214,0.85), 0 0 22px rgba(255,43,214,0.4); }
@keyframes ja-flicker {
  0%, 100% { opacity: 1; } 92% { opacity: 1; } 93% { opacity: 0.4; } 94% { opacity: 1; } 95% { opacity: 0.55; } 96% { opacity: 1; }
}
.ja-flicker { animation: ja-flicker 6s infinite; }
@keyframes ja-pulse-border {
  0%, 100% { box-shadow: 0 0 0px rgba(0,229,255,0); }
  50% { box-shadow: 0 0 18px rgba(0,229,255,0.25); }
}
.ja-pulse { animation: ja-pulse-border 3.5s ease-in-out infinite; }
@keyframes ja-scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
.ja-scanline {
  position: absolute; left: 0; right: 0; height: 40%;
  background: linear-gradient(180deg, transparent, rgba(0,229,255,0.05), transparent);
  animation: ja-scan 5s linear infinite;
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .ja-flicker, .ja-pulse, .ja-scanline { animation: none !important; }
}
.ja-nav-link { position: relative; padding-bottom: 4px; }
.ja-nav-link::after {
  content: ''; position: absolute; left: 0; bottom: 0;
  width: 0%; height: 2px; background: #00e5ff;
  box-shadow: 0 0 8px #00e5ff; transition: width 0.25s ease;
}
.ja-nav-link:hover::after, .ja-nav-link.active::after { width: 100%; }
input, select {
  transition: border-color 0.2s;
}
input:focus, select:focus {
  border-color: #00e5ff !important;
  outline: none;
}
`;

// ─── NEON SIGN ────────────────────────────────────────────────────────────────
function NeonSign() {
  const signs = [
    "SHOHSANAM NAMOZOVA ACADEMY",
    "ШОХСАНАМ НАМОЗОВА АКАДЕМИЯ",
    "SHOHSANAM NAMOZOVA AKADEMIYASI",
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % signs.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="ja-flicker ja-display ja-glow-cyan font-bold tracking-wide text-center"
      style={{ fontSize: "clamp(1.4rem, 5vw, 3.2rem)", lineHeight: 1.15 }}>
      {signs[idx]}
    </div>
  );
}

// ─── BADGE ────────────────────────────────────────────────────────────────────
function Badge({ children, accent = "cyan" }) {
  const color = accent === "cyan" ? "#00e5ff" : "#ff2bd6";
  return (
    <span className="ja-mono text-xs px-2 py-1 rounded"
      style={{ color, border: `1px solid ${color}55`, background: `${color}11` }}>
      {children}
    </span>
  );
}

// ─── LANG + THEME TOGGLES ─────────────────────────────────────────────────────
function Controls() {
  const { lang, setLang } = useLang();
  const { dark, setDark } = useTheme();
  const th = dark ? DARK : LIGHT;
  const langs = ["uz", "ru", "en"];
  return (
    <div className="flex items-center gap-2">
      <div className="flex rounded overflow-hidden" style={{ border: `1px solid rgba(0,229,255,0.3)` }}>
        {langs.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="ja-mono text-xs px-2 py-1 transition-colors"
            style={{
              background: lang === l ? "#00e5ff" : "transparent",
              color: lang === l ? "#070a12" : th.sub,
              fontWeight: lang === l ? 700 : 400,
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      <button
        onClick={() => setDark((d) => !d)}
        className="ja-mono text-xs px-2 py-1 rounded transition-all"
        style={{ border: `1px solid rgba(255,43,214,0.4)`, color: "#ff2bd6", background: "rgba(255,43,214,0.08)" }}
        title={dark ? "Light mode" : "Dark mode"}
      >
        {dark ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function NavBar({ page, setPage, menuOpen, setMenuOpen }) {
  const { t } = useLang();
  const { dark } = useTheme();
  const th = dark ? DARK : LIGHT;
  return (
    <header className="sticky top-0 z-20"
      style={{ background: th.navBg, backdropFilter: "blur(8px)", borderBottom: `1px solid ${th.border}` }}>
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
        <button onClick={() => setPage("home")} className="flex items-center gap-2 shrink-0">
          <div className="ja-display ja-glow-magenta text-xl font-bold" style={{ color: "#ff2bd6" }}>SH</div>
          <span className="ja-display text-lg font-semibold tracking-wide hidden sm:block">Shohsanam Namozova Academy</span>
          <span className="ja-display text-base font-semibold tracking-wide sm:hidden">SNA</span>
        </button>
        <nav className="hidden md:flex gap-6 ja-display text-sm tracking-wide">
          {t.nav.map((label, i) => {
            const ids = ["home","courses","teachers","testimonials","blog"];
            return (
              <button key={ids[i]} onClick={() => setPage(ids[i])}
                className={`ja-nav-link ${page === ids[i] ? "active" : ""}`}
                style={{ color: page === ids[i] ? "#00e5ff" : th.sub }}>
                {label}
              </button>
            );
          })}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Controls />
          <button onClick={() => setPage("register")}
            className="ja-mono text-xs px-4 py-2 rounded ja-pulse"
            style={{ border: "1px solid #00e5ff", color: "#00e5ff", background: "rgba(0,229,255,0.06)" }}>
            {t.navRegister}
          </button>
        </div>
        <button className="md:hidden text-2xl" style={{ color: "#00e5ff" }} onClick={() => setMenuOpen((o) => !o)}>☰</button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-5 pb-4 flex flex-col gap-3" style={{ background: th.navBg }}>
          <Controls />
          {t.nav.map((label, i) => {
            const ids = ["home","courses","teachers","testimonials","blog"];
            return (
              <button key={ids[i]} onClick={() => { setPage(ids[i]); setMenuOpen(false); }}
                className="ja-display text-left" style={{ color: th.sub }}>{label}</button>
            );
          })}
          <button onClick={() => { setPage("register"); setMenuOpen(false); }}
            className="ja-display text-left" style={{ color: "#00e5ff" }}>{t.navRegister}</button>
        </div>
      )}
    </header>
  );
}

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────
function Section({ children, className = "" }) {
  return <section className={`max-w-6xl mx-auto px-5 py-16 relative z-10 ${className}`}>{children}</section>;
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const { t } = useLang();
  const { dark } = useTheme();
  const th = dark ? DARK : LIGHT;
  return (
    <>
      <div className="relative overflow-hidden border-b" style={{ borderColor: th.border }}>
        <div className="ja-scanline" />
        <Section className="text-center py-24">
          <p className="ja-mono text-xs tracking-[0.3em] mb-5" style={{ color: th.sub }}>{t.city}</p>
          <NeonSign />
          <p className="mt-7 text-base sm:text-lg max-w-xl mx-auto" style={{ color: th.muted }}>{t.heroSub}</p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setPage("register")}
              className="ja-display font-semibold px-7 py-3 rounded"
              style={{ background: "#00e5ff", color: "#070a12" }}>{t.heroBtn1}</button>
            <button onClick={() => setPage("courses")}
              className="ja-display font-semibold px-7 py-3 rounded border"
              style={{ borderColor: "#ff2bd6", color: "#ff2bd6" }}>{t.heroBtn2}</button>
          </div>
        </Section>
      </div>
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[["8+", t.stat1],["600+", t.stat2],["12", t.stat3],["4.9★", t.stat4]].map(([n, l]) => (
            <div key={l}>
              <div className="ja-display ja-glow-cyan text-3xl font-bold">{n}</div>
              <div className="ja-mono text-xs mt-1" style={{ color: th.sub }}>{l}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <h2 className="ja-display text-2xl font-semibold mb-7">{t.popularCourses}</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {t.courses.slice(0, 3).map((c, i) => (
            <div key={i} className="rounded-lg p-5" style={{ background: th.card, border: `1px solid ${th.border}` }}>
              <Badge accent={c.accent}>{c.name}</Badge>
              <h3 className="ja-display text-lg font-semibold mt-3">{c.level}</h3>
              <p className="ja-mono text-sm mt-2" style={{ color: th.sub }}>{c.duration} {t.month} · {c.price} {t.perMonth}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

// ─── COURSES PAGE ─────────────────────────────────────────────────────────────
function CoursesPage() {
  const { t } = useLang();
  const { dark } = useTheme();
  const th = dark ? DARK : LIGHT;
  return (
    <Section>
      <h1 className="ja-display ja-glow-cyan text-3xl font-bold mb-2">{t.coursesTitle}</h1>
      <p className="mb-9" style={{ color: th.sub }}>{t.coursesSub}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {t.courses.map((c, i) => {
          const color = c.accent === "cyan" ? "#00e5ff" : "#ff2bd6";
          return (
            <div key={i} className="rounded-lg p-6 flex flex-col gap-3"
              style={{ background: th.card, border: `1px solid ${color}33` }}>
              <Badge accent={c.accent}>{c.name}</Badge>
              <h3 className="ja-display text-xl font-semibold">{c.level}</h3>
              <div className="ja-mono text-sm" style={{ color: th.sub }}>{t.duration}: {c.duration} {t.month}</div>
              <div className="ja-display text-2xl font-bold mt-1" style={{ color }}>
                {c.price} <span className="text-sm font-normal" style={{ color: th.sub }}>{t.perMonth}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── TEACHERS PAGE ────────────────────────────────────────────────────────────
function TeachersPage() {
  const { t } = useLang();
  const { dark } = useTheme();
  const th = dark ? DARK : LIGHT;
  return (
    <Section>
      <h1 className="ja-display ja-glow-magenta text-3xl font-bold mb-2">{t.teachersTitle}</h1>
      <p className="mb-9" style={{ color: th.sub }}>{t.teachersSub}</p>
      <div className="grid sm:grid-cols-2 gap-6">
        {t.teachers.map((teacher) => {
          const color = teacher.accent === "cyan" ? "#00e5ff" : "#ff2bd6";
          return (
            <div key={teacher.name} className="rounded-lg p-6 flex gap-4 items-center"
              style={{ background: th.card, border: `1px solid ${color}33` }}>
              <div className="ja-display flex items-center justify-center rounded-full font-bold text-lg shrink-0"
                style={{ width: 56, height: 56, border: `2px solid ${color}`, color, boxShadow: `0 0 14px ${color}55` }}>
                {teacher.initials}
              </div>
              <div>
                <h3 className="ja-display text-lg font-semibold">{teacher.name}</h3>
                <p className="text-sm" style={{ color }}>{teacher.role}</p>
                <p className="ja-mono text-xs mt-1" style={{ color: th.sub }}>{teacher.info}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── TESTIMONIALS PAGE ────────────────────────────────────────────────────────
function TestimonialsPage() {
  const { t } = useLang();
  const { dark } = useTheme();
  const th = dark ? DARK : LIGHT;
  return (
    <Section>
      <h1 className="ja-display ja-glow-cyan text-3xl font-bold mb-2">{t.testimonialsTitle}</h1>
      <p className="mb-9" style={{ color: th.sub }}>{t.testimonialsSub}</p>
      <div className="grid sm:grid-cols-3 gap-5">
        {t.testimonials.map((item) => (
          <div key={item.name} className="rounded-lg p-6"
            style={{ background: th.card, border: "1px solid rgba(255,43,214,0.2)" }}>
            <p className="text-sm leading-relaxed" style={{ color: th.muted }}>"{item.text}"</p>
            <div className="mt-4 ja-display font-semibold">{item.name}</div>
            <div className="ja-mono text-xs" style={{ color: th.sub }}>{item.course}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── BLOG PAGE ────────────────────────────────────────────────────────────────
function BlogPage() {
  const { t } = useLang();
  const { dark } = useTheme();
  const th = dark ? DARK : LIGHT;
  return (
    <Section>
      <h1 className="ja-display ja-glow-magenta text-3xl font-bold mb-2">{t.blogTitle}</h1>
      <p className="mb-9" style={{ color: th.sub }}>{t.blogSub}</p>
      <div className="flex flex-col gap-4">
        {t.blog.map((b) => (
          <div key={b.title} className="rounded-lg p-6"
            style={{ background: th.card, border: `1px solid ${th.border}` }}>
            <div className="ja-mono text-xs" style={{ color: th.sub }}>{b.date}</div>
            <h3 className="ja-display text-xl font-semibold mt-1">{b.title}</h3>
            <p className="text-sm mt-2" style={{ color: th.muted }}>{b.excerpt}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── REGISTER PAGE ────────────────────────────────────────────────────────────
function RegisterPage() {
  const { t, lang } = useLang();
  const { dark } = useTheme();
  const th = dark ? DARK : LIGHT;
  const [form, setForm] = useState({ name: "", phone: "", lang: "", level: "" });
  const [sent, setSent] = useState(false);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  if (sent) {
    return (
      <Section className="text-center py-24">
        <div className="ja-display ja-glow-cyan text-3xl font-bold mb-3">{t.successTitle}</div>
        <p style={{ color: th.muted }}>
          {t.successMsg.replace("{name}", form.name || "—").replace("{phone}", form.phone)}
        </p>
      </Section>
    );
  }

  const inputStyle = { background: dark ? "#070a12" : "#e8eeff", border: `1px solid ${th.border}`, color: th.text, borderRadius: 6, padding: "8px 12px", width: "100%" };

  return (
    <Section className="max-w-xl">
      <h1 className="ja-display ja-glow-cyan text-3xl font-bold mb-2">{t.registerTitle}</h1>
      <p className="mb-8" style={{ color: th.sub }}>{t.registerSub}</p>
      <div className="rounded-lg p-7 flex flex-col gap-5"
        style={{ background: th.card, border: `1px solid rgba(0,229,255,0.2)` }}>
        {[
          { key: "name", label: t.labelName, type: "input", placeholder: t.namePlaceholder },
          { key: "phone", label: t.labelPhone, type: "input", placeholder: t.phonePlaceholder },
        ].map(({ key, label, placeholder }) => (
          <label key={key} className="flex flex-col gap-2">
            <span className="ja-mono text-xs" style={{ color: th.sub }}>{label}</span>
            <input value={form[key]} onChange={(e) => update(key, e.target.value)}
              placeholder={placeholder} style={inputStyle} />
          </label>
        ))}
        <label className="flex flex-col gap-2">
          <span className="ja-mono text-xs" style={{ color: th.sub }}>{t.labelLang}</span>
          <select value={form.lang} onChange={(e) => update("lang", e.target.value)} style={inputStyle}>
            <option value="">{lang === "uz" ? "Tanlang" : lang === "ru" ? "Выберите" : "Select"}</option>
            <option>{t.english}</option>
            <option>{t.russian}</option>
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="ja-mono text-xs" style={{ color: th.sub }}>{t.labelLevel}</span>
          <select value={form.level} onChange={(e) => update("level", e.target.value)} style={inputStyle}>
            <option value="">{lang === "uz" ? "Tanlang" : lang === "ru" ? "Выберите" : "Select"}</option>
            <option>{t.beginner}</option>
            <option>{t.intermediate}</option>
            <option>{t.ielts}</option>
          </select>
        </label>
        <button onClick={() => form.name && form.phone && setSent(true)}
          className="ja-display font-semibold px-6 py-3 rounded mt-2"
          style={{ background: "#00e5ff", color: "#070a12", opacity: form.name && form.phone ? 1 : 0.5 }}>
          {t.submit}
        </button>
      </div>
    </Section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const { t } = useLang();
  const { dark } = useTheme();
  const th = dark ? DARK : LIGHT;
  return (
    <footer className="border-t mt-10" style={{ borderColor: th.border }}>
      <Section className="py-10 flex flex-col sm:flex-row justify-between gap-4 text-sm">
        <div>
          <div className="ja-display font-semibold">Shohsanam Namozova Academy</div>
          <div className="ja-mono text-xs mt-1" style={{ color: th.sub }}>{t.footerCity}</div>
        </div>
        <div className="ja-mono text-xs" style={{ color: th.sub }}>+998 90 123 45 67 · info@shohsanamacademy.uz</div>
      </Section>
    </footer>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState("uz");
  const [dark, setDark] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const t = T[lang];
  const th = dark ? DARK : LIGHT;

  const pages = {
    home: <HomePage setPage={setPage} />,
    courses: <CoursesPage />,
    teachers: <TeachersPage />,
    testimonials: <TestimonialsPage />,
    blog: <BlogPage />,
    register: <RegisterPage />,
  };

  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>
      <ThemeCtx.Provider value={{ dark, setDark }}>
        <div className="ja-root">
          <style>{FONTS + makeCSS(th)}</style>
          <NavBar page={page} setPage={setPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          {pages[page]}
          <Footer />
        </div>
      </ThemeCtx.Provider>
    </LangCtx.Provider>
  );
}
