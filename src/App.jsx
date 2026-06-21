import React, { useState, useEffect, useRef } from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
`;

const GLOBAL_CSS = `
* { box-sizing: border-box; }
.ja-root {
  background: #070a12;
  color: #eef1f8;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}
.ja-root::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,229,255,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,229,255,0.035) 1px, transparent 1px);
  background-size: 42px 42px;
  pointer-events: none;
  z-index: 0;
}
.ja-display { font-family: 'Rajdhani', sans-serif; }
.ja-mono { font-family: 'JetBrains Mono', monospace; }

.ja-glow-cyan { text-shadow: 0 0 6px rgba(0,229,255,0.85), 0 0 22px rgba(0,229,255,0.4); }
.ja-glow-magenta { text-shadow: 0 0 6px rgba(255,43,214,0.85), 0 0 22px rgba(255,43,214,0.4); }

@keyframes ja-flicker {
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.4; }
  94% { opacity: 1; }
  95% { opacity: 0.55; }
  96% { opacity: 1; }
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
  position: absolute;
  left: 0; right: 0; height: 40%;
  background: linear-gradient(180deg, transparent, rgba(0,229,255,0.06), transparent);
  animation: ja-scan 5s linear infinite;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .ja-flicker, .ja-pulse, .ja-scanline { animation: none !important; }
}

.ja-nav-link {
  position: relative;
  padding-bottom: 4px;
}
.ja-nav-link::after {
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  width: 0%; height: 2px;
  background: #00e5ff;
  box-shadow: 0 0 8px #00e5ff;
  transition: width 0.25s ease;
}
.ja-nav-link:hover::after, .ja-nav-link.active::after {
  width: 100%;
}
`;

const COURSES = [
  { id: 1, lang: "Ingliz tili", level: "Beginner · A1–A2", duration: "3 oy", price: "450 000", accent: "cyan" },
  { id: 2, lang: "Ingliz tili", level: "Intermediate · B1–B2", duration: "4 oy", price: "550 000", accent: "cyan" },
  { id: 3, lang: "Ingliz tili", level: "IELTS tayyorlov", duration: "5 oy", price: "650 000", accent: "cyan" },
  { id: 4, lang: "Rus tili", level: "Boshlang'ich", duration: "3 oy", price: "400 000", accent: "magenta" },
  { id: 5, lang: "Rus tili", level: "O'rta daraja", duration: "4 oy", price: "500 000", accent: "magenta" },
  { id: 6, lang: "Rus tili", level: "Suhbat klubi", duration: "2 oy", price: "350 000", accent: "magenta" },
];

const TEACHERS = [
  { name: "Jafar Toshmatov", role: "Asoschi · Ingliz tili", info: "8 yil tajriba · CELTA sertifikati", initials: "JT", accent: "cyan" },
  { name: "Madina Yusupova", role: "Rus tili o'qituvchisi", info: "6 yil tajriba · Filologiya magistri", initials: "MY", accent: "magenta" },
  { name: "Aziz Karimov", role: "IELTS instruktori", info: "IELTS 7.5 band · 5 yil tajriba", initials: "AK", accent: "cyan" },
  { name: "Nilufar Rashidova", role: "Ingliz tili (Boshlang'ich)", info: "4 yil tajriba · Bolalar guruhlari", initials: "NR", accent: "magenta" },
];

const TESTIMONIALS = [
  { name: "Sardor B.", text: "3 oyda IELTS 6.5 ball oldim. O'qituvchilar har bir xatoni tushuntirib berishadi.", course: "IELTS tayyorlov" },
  { name: "Dilnoza K.", text: "Rus tilidan qo'rqib yurardim, hozir ish joyimda erkin gaplasha olaman.", course: "Rus tili, O'rta daraja" },
  { name: "Jasur T.", text: "Guruhlar kichik, hamma e'tibordan chetda qolmaydi. Tavsiya qilaman.", course: "Ingliz tili, Intermediate" },
];

const BLOG = [
  { date: "12.06.2026", title: "IELTS imtihoniga qanday tayyorlanish kerak?", excerpt: "To'g'ri strategiya va vaqt taqsimoti bilan natijangizni 1 oyda oshiring." },
  { date: "03.06.2026", title: "Rus tilini tezroq o'rganishning 5 ta siri", excerpt: "Kundalik amaliyot va to'g'ri manbalar tanlash — muvaffaqiyat kaliti." },
  { date: "22.05.2026", title: "Til o'rganishda motivatsiyani qanday saqlash mumkin?", excerpt: "Uzoq muddatli maqsadlarni kichik qadamlarga bo'lish usuli." },
];

function NeonSign() {
  const words = ["JAFAR'S ACADEMY", "ДЖАФАР АКАДЕМИЯ", "JAFAR AKADEMIYASI"];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="ja-flicker ja-display ja-glow-cyan text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide text-center">
      {words[idx]}
    </div>
  );
}

function Badge({ children, accent = "cyan" }) {
  const color = accent === "cyan" ? "#00e5ff" : "#ff2bd6";
  return (
    <span
      className="ja-mono text-xs px-2 py-1 rounded"
      style={{ color, border: `1px solid ${color}55`, background: `${color}11` }}
    >
      {children}
    </span>
  );
}

function NavBar({ page, setPage, menuOpen, setMenuOpen }) {
  const links = [
    { id: "home", label: "Bosh sahifa" },
    { id: "courses", label: "Kurslar" },
    { id: "teachers", label: "O'qituvchilar" },
    { id: "testimonials", label: "Fikrlar" },
    { id: "blog", label: "Blog" },
  ];
  return (
    <header className="sticky top-0 z-20" style={{ background: "rgba(7,10,18,0.85)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(0,229,255,0.15)" }}>
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <button onClick={() => setPage("home")} className="flex items-center gap-2">
          <div className="ja-display ja-glow-magenta text-xl font-bold" style={{ color: "#ff2bd6" }}>JA</div>
          <span className="ja-display text-lg font-semibold tracking-wide">Jafar's Academy</span>
        </button>
        <nav className="hidden md:flex gap-7 ja-display text-sm tracking-wide">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className={`ja-nav-link ${page === l.id ? "active" : ""}`}
              style={{ color: page === l.id ? "#00e5ff" : "#cdd3e6" }}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => setPage("register")}
          className="hidden md:block ja-mono text-xs px-4 py-2 rounded ja-pulse"
          style={{ border: "1px solid #00e5ff", color: "#00e5ff", background: "rgba(0,229,255,0.06)" }}
        >
          Ro'yxatdan o'tish
        </button>
        <button className="md:hidden text-2xl" style={{ color: "#00e5ff" }} onClick={() => setMenuOpen((o) => !o)}>
          ☰
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-5 pb-4 flex flex-col gap-3 ja-display">
          {links.concat([{ id: "register", label: "Ro'yxatdan o'tish" }]).map((l) => (
            <button
              key={l.id}
              onClick={() => { setPage(l.id); setMenuOpen(false); }}
              className="text-left"
              style={{ color: page === l.id ? "#00e5ff" : "#cdd3e6" }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function Section({ children, className = "" }) {
  return <section className={`max-w-6xl mx-auto px-5 py-16 relative z-10 ${className}`}>{children}</section>;
}

function HomePage({ setPage }) {
  return (
    <>
      <div className="relative overflow-hidden border-b" style={{ borderColor: "rgba(0,229,255,0.12)" }}>
        <div className="ja-scanline" />
        <Section className="text-center py-24">
          <p className="ja-mono text-xs tracking-[0.3em] mb-5" style={{ color: "#8993b0" }}>TOSHKENT · TIL TA'LIM MARKAZI</p>
          <NeonSign />
          <p className="mt-7 text-base sm:text-lg max-w-xl mx-auto" style={{ color: "#b8bedb" }}>
            Ingliz va rus tillarini amaliyotga asoslangan, kichik guruhlarda va natijaga yo'naltirilgan dasturlar orqali o'rganing.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setPage("register")}
              className="ja-display font-semibold px-7 py-3 rounded"
              style={{ background: "#00e5ff", color: "#070a12" }}
            >
              Bepul sinov darsiga yozilish
            </button>
            <button
              onClick={() => setPage("courses")}
              className="ja-display font-semibold px-7 py-3 rounded border"
              style={{ borderColor: "#ff2bd6", color: "#ff2bd6" }}
            >
              Kurslarni ko'rish
            </button>
          </div>
        </Section>
      </div>

      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[["8+", "yillik tajriba"], ["600+", "bitiruvchi"], ["12", "kichik guruh"], ["4.9★", "o'rtacha baho"]].map(([n, l]) => (
            <div key={l}>
              <div className="ja-display ja-glow-cyan text-3xl font-bold">{n}</div>
              <div className="ja-mono text-xs mt-1" style={{ color: "#8993b0" }}>{l}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="ja-display text-2xl font-semibold mb-7">Mashhur kurslar</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {COURSES.slice(0, 3).map((c) => (
            <div key={c.id} className="rounded-lg p-5" style={{ background: "#0f1424", border: "1px solid rgba(0,229,255,0.15)" }}>
              <Badge accent={c.accent}>{c.lang}</Badge>
              <h3 className="ja-display text-lg font-semibold mt-3">{c.level}</h3>
              <p className="ja-mono text-sm mt-2" style={{ color: "#8993b0" }}>{c.duration} · {c.price} so'm/oy</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function CoursesPage() {
  return (
    <Section>
      <h1 className="ja-display ja-glow-cyan text-3xl font-bold mb-2">Kurslar</h1>
      <p style={{ color: "#8993b0" }} className="mb-9">Daraja va maqsadingizga mos dasturni tanlang.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {COURSES.map((c) => {
          const color = c.accent === "cyan" ? "#00e5ff" : "#ff2bd6";
          return (
            <div key={c.id} className="rounded-lg p-6 flex flex-col gap-3" style={{ background: "#0f1424", border: `1px solid ${color}33` }}>
              <Badge accent={c.accent}>{c.lang}</Badge>
              <h3 className="ja-display text-xl font-semibold">{c.level}</h3>
              <div className="ja-mono text-sm" style={{ color: "#8993b0" }}>Davomiyligi: {c.duration}</div>
              <div className="ja-display text-2xl font-bold mt-1" style={{ color }}>{c.price} <span className="text-sm font-normal" style={{ color: "#8993b0" }}>so'm/oy</span></div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function TeachersPage() {
  return (
    <Section>
      <h1 className="ja-display ja-glow-magenta text-3xl font-bold mb-2">O'qituvchilar</h1>
      <p style={{ color: "#8993b0" }} className="mb-9">Tajribali va sertifikatlangan ustozlar jamoasi.</p>
      <div className="grid sm:grid-cols-2 gap-6">
        {TEACHERS.map((t) => {
          const color = t.accent === "cyan" ? "#00e5ff" : "#ff2bd6";
          return (
            <div key={t.name} className="rounded-lg p-6 flex gap-4 items-center" style={{ background: "#0f1424", border: `1px solid ${color}33` }}>
              <div
                className="ja-display flex items-center justify-center rounded-full font-bold text-lg shrink-0"
                style={{ width: 56, height: 56, border: `2px solid ${color}`, color, boxShadow: `0 0 14px ${color}55` }}
              >
                {t.initials}
              </div>
              <div>
                <h3 className="ja-display text-lg font-semibold">{t.name}</h3>
                <p className="text-sm" style={{ color }}>{t.role}</p>
                <p className="ja-mono text-xs mt-1" style={{ color: "#8993b0" }}>{t.info}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function TestimonialsPage() {
  return (
    <Section>
      <h1 className="ja-display ja-glow-cyan text-3xl font-bold mb-2">Bitiruvchilar fikrlari</h1>
      <p style={{ color: "#8993b0" }} className="mb-9">O'quvchilarimiz tajribasi.</p>
      <div className="grid sm:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="rounded-lg p-6" style={{ background: "#0f1424", border: "1px solid rgba(255,43,214,0.2)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "#cdd3e6" }}>"{t.text}"</p>
            <div className="mt-4 ja-display font-semibold">{t.name}</div>
            <div className="ja-mono text-xs" style={{ color: "#8993b0" }}>{t.course}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function BlogPage() {
  return (
    <Section>
      <h1 className="ja-display ja-glow-magenta text-3xl font-bold mb-2">Blog</h1>
      <p style={{ color: "#8993b0" }} className="mb-9">Til o'rganish bo'yicha maslahat va yangiliklar.</p>
      <div className="flex flex-col gap-4">
        {BLOG.map((b) => (
          <div key={b.title} className="rounded-lg p-6" style={{ background: "#0f1424", border: "1px solid rgba(0,229,255,0.15)" }}>
            <div className="ja-mono text-xs" style={{ color: "#8993b0" }}>{b.date}</div>
            <h3 className="ja-display text-xl font-semibold mt-1">{b.title}</h3>
            <p className="text-sm mt-2" style={{ color: "#cdd3e6" }}>{b.excerpt}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function RegisterPage() {
  const [form, setForm] = useState({ name: "", phone: "", lang: "Ingliz tili", level: "Beginner" });
  const [sent, setSent] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  if (sent) {
    return (
      <Section className="text-center py-24">
        <div className="ja-display ja-glow-cyan text-3xl font-bold mb-3">Qabul qilindi ✓</div>
        <p style={{ color: "#b8bedb" }}>Rahmat, {form.name || "do'stim"}! Tez orada operatorimiz {form.phone} raqamiga bog'lanadi.</p>
      </Section>
    );
  }

  return (
    <Section className="max-w-xl">
      <h1 className="ja-display ja-glow-cyan text-3xl font-bold mb-2">Ro'yxatdan o'tish</h1>
      <p style={{ color: "#8993b0" }} className="mb-8">Bepul sinov darsiga joy band qiling.</p>
      <div className="rounded-lg p-7 flex flex-col gap-5" style={{ background: "#0f1424", border: "1px solid rgba(0,229,255,0.2)" }}>
        <label className="flex flex-col gap-2">
          <span className="ja-mono text-xs" style={{ color: "#8993b0" }}>ISM FAMILIYA</span>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Masalan: Ravshan Saydullayev"
            className="px-3 py-2 rounded outline-none"
            style={{ background: "#070a12", border: "1px solid rgba(0,229,255,0.3)", color: "#eef1f8" }}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="ja-mono text-xs" style={{ color: "#8993b0" }}>TELEFON RAQAM</span>
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+998 90 123 45 67"
            className="px-3 py-2 rounded outline-none"
            style={{ background: "#070a12", border: "1px solid rgba(0,229,255,0.3)", color: "#eef1f8" }}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="ja-mono text-xs" style={{ color: "#8993b0" }}>TIL</span>
          <select
            value={form.lang}
            onChange={(e) => update("lang", e.target.value)}
            className="px-3 py-2 rounded outline-none"
            style={{ background: "#070a12", border: "1px solid rgba(0,229,255,0.3)", color: "#eef1f8" }}
          >
            <option>Ingliz tili</option>
            <option>Rus tili</option>
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="ja-mono text-xs" style={{ color: "#8993b0" }}>DARAJA</span>
          <select
            value={form.level}
            onChange={(e) => update("level", e.target.value)}
            className="px-3 py-2 rounded outline-none"
            style={{ background: "#070a12", border: "1px solid rgba(0,229,255,0.3)", color: "#eef1f8" }}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>IELTS / Imtihonga tayyorlov</option>
          </select>
        </label>
        <button
          onClick={() => form.name && form.phone && setSent(true)}
          className="ja-display font-semibold px-6 py-3 rounded mt-2"
          style={{ background: "#00e5ff", color: "#070a12" }}
        >
          Yuborish
        </button>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-10" style={{ borderColor: "rgba(0,229,255,0.12)" }}>
      <Section className="py-10 flex flex-col sm:flex-row justify-between gap-4 text-sm">
        <div>
          <div className="ja-display font-semibold">Jafar's Academy</div>
          <div style={{ color: "#8993b0" }} className="ja-mono text-xs mt-1">Toshkent, Chilonzor tumani</div>
        </div>
        <div className="ja-mono text-xs" style={{ color: "#8993b0" }}>
          +998 90 123 45 67 · info@jafarsacademy.uz
        </div>
      </Section>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const pages = {
    home: <HomePage setPage={setPage} />,
    courses: <CoursesPage />,
    teachers: <TeachersPage />,
    testimonials: <TestimonialsPage />,
    blog: <BlogPage />,
    register: <RegisterPage />,
  };

  return (
    <div className="ja-root">
      <style>{FONTS + GLOBAL_CSS}</style>
      <NavBar page={page} setPage={setPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {pages[page]}
      <Footer />
    </div>
  );
}
