import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════════
//  ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗
// ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝
// ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
// ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
// ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
//  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝
// ═══════════════════════════════════════════════════════════
//  REPLACE EVERYTHING IN THE CONFIG SECTION BELOW
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  // ── Company Info ─────────────────────────────────────────
  name: "YourCo",          // e.g. "Vedaiq"
  nameSuffix: "iq",        // coloured part  e.g. "iq"  → Your + Co + iq
  domain: "yourco.in",
  tagline: "Intelligence Engineered.",
  subTagline: "Results Delivered.",
  heroDesc:
    "We build intelligent websites, AI assistants, custom software, and automation systems — crafted for businesses that demand precision.",
  ownerEmail: "you@yourco.com",   // ← your email (receives notification)
  phone: "+91 99999 99999",
  stats: [
    { num: "50+",  label: "Projects Done" },
    { num: "100%", label: "Client Satisfaction" },
    { num: "4+",   label: "Years Experience" },
  ],

  // ── EmailJS ───────────────────────────────────────────────
  // 1. Go to https://www.emailjs.com/ → free account
  // 2. Add an Email Service (Gmail / Outlook etc.)
  // 3. Create TWO templates:
  //    • notifyTemplate  → sends YOU an alert; use {{from_email}} in body
  //    • replyTemplate   → sends auto-reply to user; use {{to_email}} in "To"
  // 4. Paste the IDs & Public Key below
  emailjs: {
    serviceId:        "YOUR_SERVICE_ID",
    notifyTemplateId: "YOUR_NOTIFY_TEMPLATE_ID",
    replyTemplateId:  "YOUR_REPLY_TEMPLATE_ID",
    publicKey:        "YOUR_PUBLIC_KEY",
  },
};

// ── Portfolio Projects ────────────────────────────────────
const PORTFOLIO = [
  {
    id: 1, cat: "Web",
    emoji: "🛒",
    title: "E-Commerce Platform",
    desc: "Full-stack shopping platform with AI product recommendations and real-time inventory management.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2, cat: "AI",
    emoji: "🤖",
    title: "AI Support Bot",
    desc: "Intelligent chatbot trained on company data for 24/7 automated customer support & lead capture.",
    tags: ["Python", "OpenAI", "React"],
  },
  {
    id: 3, cat: "Mobile",
    emoji: "💪",
    title: "Fitness Tracker App",
    desc: "Cross-platform mobile app with workout logging, nutrition tracking, and advanced analytics.",
    tags: ["Flutter", "Firebase"],
  },
  {
    id: 4, cat: "Automation",
    emoji: "⚡",
    title: "Invoice Automation",
    desc: "Automated invoice processing pipeline that reduced manual work by 90% for a finance firm.",
    tags: ["Python", "n8n", "PostgreSQL"],
  },
  {
    id: 5, cat: "Web",
    emoji: "🏠",
    title: "Real Estate Portal",
    desc: "Property listing platform with virtual tours and AI-powered price prediction engine.",
    tags: ["Next.js", "Python", "AWS"],
  },
  {
    id: 6, cat: "AI",
    emoji: "✍️",
    title: "AI Content Writer",
    desc: "Generates SEO-optimised blog posts, social media content, and product descriptions at scale.",
    tags: ["OpenAI", "React", "Node.js"],
  },
];

const SERVICES = [
  { icon: "🌐", num: "01", label: "WEBSITE",    title: "Website Development", desc: "Blazing-fast, visually stunning websites tailored to your brand. From landing pages to full-stack web applications built for impact.", tag: "→ SEO · CMS · E-commerce" },
  { icon: "🤖", num: "02", label: "AI",         title: "AI Assistants",       desc: "Smart, context-aware AI chatbots trained for your business. Automate support, sales, and workflows with intelligence.",               tag: "→ Chatbot · NLP · Custom AI" },
  { icon: "📱", num: "03", label: "SOFTWARE",   title: "App & Software Dev",  desc: "Cross-platform mobile apps and custom software that scale. Built clean, tested rigorously, delivered on time.",                        tag: "→ Android · iOS · Web App" },
  { icon: "⚡", num: "04", label: "AUTOMATION", title: "Process Automation",  desc: "Eliminate repetitive tasks and unlock efficiency. We automate workflows, data pipelines, and business operations with precision.",      tag: "→ n8n · Zapier · Custom" },
];

const PROCESS = [
  { num: "01", title: "Discover",        desc: "Deep dive into your goals, users, and challenges." },
  { num: "02", title: "Strategize",      desc: "Define scope, tech stack, timelines & roadmap." },
  { num: "03", title: "Design",          desc: "Craft intuitive UI/UX that users love instantly." },
  { num: "04", title: "Build",           desc: "Agile development with regular client check-ins." },
  { num: "05", title: "Launch & Support",desc: "Go live with confidence. We stay with you after." },
];

const TECH = [
  { name: "React",      emoji: "⚛️" },
  { name: "Next.js",    emoji: "🔺" },
  { name: "JavaScript", emoji: "🟨" },
  { name: "Python",     emoji: "🐍" },
  { name: "OpenAI",     emoji: "🤖" },
  { name: "Node.js",    emoji: "🗄️" },
  { name: "Flutter",    emoji: "📱" },
  { name: "AWS",        emoji: "☁️" },
  { name: "Firebase",   emoji: "🔥" },
  { name: "PostgreSQL", emoji: "🐘" },
  { name: "n8n",        emoji: "⚡" },
  { name: "Zapier",     emoji: "🧩" },
];

const MARQUEE = [
  "Web Development","AI Integration","Mobile Apps",
  "Workflow Automation","UI/UX Design","Custom Software",
  "API Development","Cloud Solutions",
];

const CATS = ["All", "Web", "AI", "Mobile", "Automation"];

// ════════════════════════════════════════════════════════════
//  STYLES
// ════════════════════════════════════════════════════════════
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; }

  @keyframes orb-float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-22px); }
  }
  @keyframes ring-spin {
    from { transform: translateY(-50%) rotate(0deg); }
    to   { transform: translateY(-50%) rotate(360deg); }
  }
  @keyframes ring-spin-rev {
    from { transform: rotate(360deg); }
    to   { transform: rotate(0deg); }
  }
  @keyframes dot-pulse {
    0%,100% { box-shadow: 0 0 12px #c8932a; transform: scale(1); }
    50%      { box-shadow: 0 0 28px #f0c060; transform: scale(1.5); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes card-shine {
    from { transform: translateX(-100%) skewX(-15deg); }
    to   { transform: translateX(300%) skewX(-15deg); }
  }

  .reveal {
    opacity: 0;
    transform: translateY(26px);
    transition: opacity 0.75s ease, transform 0.75s ease;
  }
  .reveal.vis { opacity: 1; transform: translateY(0); }

  /* NAV LINKS */
  .nl { color: #7a7670; text-decoration: none; font-size: .78rem; font-weight: 500;
        letter-spacing: .06em; text-transform: uppercase; transition: color .2s; cursor: pointer; }
  .nl:hover { color: #c8932a; }

  /* SERVICE CARDS — gold bar on hover */
  .sc { position: relative; overflow: hidden; transition: background .3s; }
  .sc::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, #c8932a, transparent);
    transform: scaleX(0); transition: transform .4s;
  }
  .sc:hover::before { transform: scaleX(1); }
  .sc:hover { background: rgba(26,31,58,0.95) !important; }
  .sc:hover .si { background: rgba(200,147,42,0.15) !important; border-color: #c8932a !important; }

  /* PORTFOLIO CARDS */
  .pc { transition: transform .3s, border-color .3s; cursor: default; }
  .pc:hover { transform: translateY(-5px); border-color: rgba(200,147,42,0.45) !important; }

  /* TECH ITEMS */
  .ti:hover { background: rgba(200,147,42,0.08) !important; }
  .ti:hover .tn { color: #c8932a !important; }

  /* PROCESS CIRCLES */
  .prc:hover {
    border-color: #c8932a !important;
    background: rgba(200,147,42,0.08) !important;
    box-shadow: 0 0 22px rgba(200,147,42,0.22) !important;
  }

  /* PILLAR ROWS */
  .pl:hover { border-color: rgba(200,147,42,0.2) !important; background: rgba(200,147,42,0.03) !important; }

  /* CTA INPUT FOCUS */
  .ei:focus { outline: none; border-color: rgba(200,147,42,0.5) !important; }

  /* HERO RING (hide on mobile) */
  @media (max-width: 900px) {
    .hero-ring { display: none !important; }
    .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
    .about-visual { height: 260px !important; }
    .svc-grid { grid-template-columns: 1fr !important; }
    .port-grid { grid-template-columns: 1fr 1fr !important; }
    .proc-grid { grid-template-columns: 1fr 1fr !important; }
    .proc-line { display: none !important; }
    .hero-h1  { font-size: 2.4rem !important; }
    .hero-actions { flex-direction: column; align-items: stretch !important; }
    .stats-row { gap: 1.5rem !important; }
    .dn { display: none !important; }
    .df { display: flex !important; }
    .hero-pad { padding: 5.5rem 6% 3.5rem !important; }
  }
  @media (max-width: 560px) {
    .port-grid { grid-template-columns: 1fr !important; }
  }
`;

// ════════════════════════════════════════════════════════════
//  EMAIL — EmailJS REST API (no npm needed)
// ════════════════════════════════════════════════════════════
async function sendEmails(userEmail) {
  const { emailjs, ownerEmail } = CONFIG;
  const BASE = "https://api.emailjs.com/api/v1.0/email/send";
  const H    = { "Content-Type": "application/json" };

  // 1️⃣ Notify owner
  await fetch(BASE, {
    method: "POST", headers: H,
    body: JSON.stringify({
      service_id:      emailjs.serviceId,
      template_id:     emailjs.notifyTemplateId,
      user_id:         emailjs.publicKey,
      template_params: {
        from_email: userEmail,
        to_email:   ownerEmail,
        reply_to:   userEmail,
        message:    `New inquiry from ${userEmail} via your website contact form.`,
      },
    }),
  });

  // 2️⃣ Auto-reply to user
  await fetch(BASE, {
    method: "POST", headers: H,
    body: JSON.stringify({
      service_id:      emailjs.serviceId,
      template_id:     emailjs.replyTemplateId,
      user_id:         emailjs.publicKey,
      template_params: {
        to_email:   userEmail,
        from_name:  CONFIG.name,
        reply_to:   ownerEmail,
        message:    `Thanks for reaching out! We've received your message and will reply within 24 hours. — ${CONFIG.name} Team`,
      },
    }),
  });
}

// ════════════════════════════════════════════════════════════
//  REVEAL HOOK
// ════════════════════════════════════════════════════════════
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("vis"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ════════════════════════════════════════════════════════════
//  COLOUR TOKENS
// ════════════════════════════════════════════════════════════
const C = {
  bg:     "#070910",
  bg2:    "#0c0f1a",
  gold:   "#c8932a",
  gold2:  "#f0c060",
  text:   "#e8e4d8",
  muted:  "#7a7670",
  card:   "rgba(20,24,44,0.85)",
  border: "rgba(200,147,42,0.18)",
};

// ════════════════════════════════════════════════════════════
//  SUB-COMPONENTS
// ════════════════════════════════════════════════════════════
function SLabel({ text, center }) {
  return (
    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".68rem", color: C.gold, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: ".8rem", display: "flex", alignItems: "center", justifyContent: center ? "center" : "flex-start", gap: ".6rem" }}>
      <span style={{ display: "block", width: 24, height: 1, background: C.gold }} />
      {text}
      {center && <span style={{ display: "block", width: 24, height: 1, background: C.gold }} />}
    </div>
  );
}

function GoldBtn({ children, onClick, style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: C.gold, color: C.bg, border: "none", padding: ".85rem 1.9rem", fontFamily: "'DM Sans',sans-serif", fontSize: ".88rem", fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", borderRadius: 2, cursor: "pointer", transition: "box-shadow .2s, transform .15s", boxShadow: hov ? `0 0 30px rgba(200,147,42,.45)` : "none", transform: hov ? "translateY(-1px)" : "none", ...style }}>
      {children}
    </button>
  );
}

function OutlineBtn({ children, onClick, style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "transparent", color: hov ? C.gold : C.text, border: `1px solid ${hov ? C.gold : C.border}`, padding: ".85rem 1.9rem", fontFamily: "'DM Sans',sans-serif", fontSize: ".88rem", fontWeight: 500, letterSpacing: ".05em", textTransform: "uppercase", borderRadius: 2, cursor: "pointer", transition: "all .2s", ...style }}>
      {children}
    </button>
  );
}

// ════════════════════════════════════════════════════════════
//  MAIN APP
// ════════════════════════════════════════════════════════════
export default function App() {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeCat, setActiveCat] = useState("All");
  const [email,     setEmail]     = useState("");
  const [status,    setStatus]    = useState("idle"); // idle|loading|success|error

  useReveal();

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const handleSubmit = async () => {
    if (!email.includes("@") || !email.includes(".")) return;
    setStatus("loading");
    try {
      await sendEmails(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const filtered = activeCat === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.cat === activeCat);

  // ── NAV ITEMS ──────────────────────────────────────────
  const NAV_ITEMS = ["services", "portfolio", "about", "process", "tech"];

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'DM Sans',sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{CSS}</style>

      {/* ══════ NAV ══════ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 5%", backdropFilter: "blur(20px)", background: "rgba(7,9,16,.9)", borderBottom: `1px solid ${C.border}` }}>
        {/* Logo */}
        <div onClick={() => scrollTo("home")} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.45rem", letterSpacing: "-.02em", cursor: "pointer" }}>
          {CONFIG.name.slice(0, -CONFIG.nameSuffix.length)}
          <span style={{ color: C.gold }}>{CONFIG.nameSuffix}</span>
        </div>

        {/* Desktop links */}
        <div className="dn" style={{ display: "flex", gap: "2.2rem", alignItems: "center" }}>
          {NAV_ITEMS.map((s) => (
            <span key={s} className="nl" onClick={() => scrollTo(s)}>{s}</span>
          ))}
          <button onClick={() => scrollTo("contact")}
            style={{ background: "transparent", border: `1px solid ${C.gold}`, color: C.gold, padding: ".45rem 1.1rem", borderRadius: 2, fontFamily: "'DM Sans',sans-serif", fontSize: ".78rem", fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", cursor: "pointer", transition: "background .2s, color .2s" }}
            onMouseOver={(e) => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.bg; }}
            onMouseOut={(e)  => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.gold; }}>
            Get Started
          </button>
        </div>

        {/* Hamburger */}
        <button className="df" onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4, zIndex: 400 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ display: "block", width: 24, height: 2, background: C.gold, borderRadius: 2, transition: "transform .3s, opacity .3s",
              transform: menuOpen ? (i === 0 ? "translateY(7px) rotate(45deg)" : i === 2 ? "translateY(-7px) rotate(-45deg)" : "none") : "none",
              opacity: menuOpen && i === 1 ? 0 : 1 }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: "fixed", top: 62, left: 0, right: 0, background: "rgba(7,9,16,.97)", borderBottom: `1px solid ${C.border}`, zIndex: 250, padding: "1.5rem 6%", display: "flex", flexDirection: "column" }}>
          {NAV_ITEMS.map((s) => (
            <span key={s} onClick={() => scrollTo(s)} style={{ color: C.muted, fontSize: ".95rem", fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", padding: "1rem 0", borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>{s}</span>
          ))}
          <button onClick={() => scrollTo("contact")} style={{ marginTop: "1rem", background: C.gold, color: C.bg, border: "none", padding: ".9rem", fontWeight: 700, borderRadius: 2, fontSize: ".9rem", letterSpacing: ".05em", textTransform: "uppercase", cursor: "pointer" }}>
            Get Started
          </button>
        </div>
      )}

      {/* ══════ HERO ══════ */}
      <section id="home" className="hero-pad" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "7rem 8% 5rem", position: "relative", overflow: "hidden" }}>
        {/* Grid background */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(200,147,42,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,147,42,.04) 1px, transparent 1px)`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)", pointerEvents: "none" }} />

        {/* Orbs */}
        <div style={{ position: "absolute", width: 520, height: 520, background: "rgba(200,147,42,.07)", borderRadius: "50%", filter: "blur(110px)", top: -100, right: -100, animation: "orb-float 8s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 380, height: 380, background: "rgba(26,31,58,.9)", borderRadius: "50%", filter: "blur(110px)", bottom: 0, left: -100, animation: "orb-float 8s ease-in-out 3s infinite", pointerEvents: "none" }} />

        {/* Animated Ring */}
        <div className="hero-ring" style={{ position: "absolute", right: "7%", top: "50%", transform: "translateY(-50%)", width: 380, height: 380, borderRadius: "50%", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", animation: "ring-spin 20s linear infinite", opacity: 0.55, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 30, borderRadius: "50%", border: "1px dashed rgba(200,147,42,.25)", animation: "ring-spin-rev 15s linear infinite" }} />
          <div style={{ position: "absolute", inset: 80, borderRadius: "50%", border: `1px solid rgba(200,147,42,.18)` }} />
          <div style={{ width: 8, height: 8, background: C.gold, borderRadius: "50%", animation: "dot-pulse 2s ease-in-out infinite", boxShadow: `0 0 14px ${C.gold}` }} />
        </div>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", background: "rgba(200,147,42,.08)", border: `1px solid ${C.border}`, padding: ".3rem .85rem", borderRadius: 2, fontFamily: "'Space Mono',monospace", fontSize: ".68rem", color: C.gold, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.5rem", animation: "fade-up .8s ease forwards .2s", opacity: 0 }}>
          <div style={{ width: 6, height: 6, background: C.gold, borderRadius: "50%", animation: "dot-pulse 2s infinite" }} />
          Available for new projects
        </div>

        {/* H1 */}
        <h1 className="hero-h1" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem,6vw,5.5rem)", lineHeight: 1.05, letterSpacing: "-.03em", maxWidth: 660, animation: "fade-up .9s ease forwards .4s", opacity: 0 }}>
          {CONFIG.tagline.split(" ").slice(0, -1).join(" ")}<br />
          <span style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.gold2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {CONFIG.tagline.split(" ").at(-1)}
          </span><br />
          {CONFIG.subTagline}
        </h1>

        {/* Sub */}
        <p style={{ marginTop: "1.4rem", fontSize: "clamp(.88rem,2vw,1rem)", color: C.muted, maxWidth: 460, lineHeight: 1.8, fontWeight: 300, animation: "fade-up .9s ease forwards .6s", opacity: 0 }}>
          {CONFIG.heroDesc}
        </p>

        {/* Buttons */}
        <div className="hero-actions" style={{ marginTop: "2rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", animation: "fade-up .9s ease forwards .8s", opacity: 0 }}>
          <GoldBtn onClick={() => scrollTo("services")}>Explore Services</GoldBtn>
          <button onClick={() => scrollTo("about")} style={{ background: "transparent", color: C.text, border: "none", padding: ".85rem 0", fontFamily: "'DM Sans',sans-serif", fontSize: ".88rem", fontWeight: 400, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: ".5rem", transition: "color .2s" }}
            onMouseOver={(e) => e.currentTarget.style.color = C.gold}
            onMouseOut={(e)  => e.currentTarget.style.color = C.text}>
            Our Story →
          </button>
        </div>

        {/* Stats */}
        <div className="stats-row" style={{ marginTop: "3rem", display: "flex", gap: "2.5rem", flexWrap: "wrap", animation: "fade-up .9s ease forwards 1s", opacity: 0 }}>
          {CONFIG.stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.8rem", fontWeight: 700, color: C.gold, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: ".7rem", color: C.muted, textTransform: "uppercase", letterSpacing: ".08em", marginTop: ".25rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ MARQUEE ══════ */}
      <div style={{ overflow: "hidden", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: "rgba(200,147,42,.025)", padding: ".85rem 0" }}>
        <div style={{ display: "flex", gap: "2.5rem", animation: "marquee 24s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} style={{ fontFamily: "'Space Mono',monospace", fontSize: ".72rem", color: C.muted, letterSpacing: ".1em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: ".8rem" }}>
              <span style={{ color: C.gold, fontSize: ".45rem" }}>◆</span> {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══════ SERVICES ══════ */}
      <section id="services" style={{ padding: "6rem 8%" }}>
        <SLabel text="What We Do" />
        <h2 className="reveal" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3.5vw,2.8rem)", lineHeight: 1.15, letterSpacing: "-.02em", maxWidth: 560 }}>
          Four pillars of <span style={{ color: C.gold }}>digital excellence</span>
        </h2>
        <div className="svc-grid reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, marginTop: "3rem", border: `1px solid ${C.border}` }}>
          {SERVICES.map((s) => (
            <div key={s.num} className="sc" style={{ background: C.card, padding: "2rem 1.6rem", border: `1px solid ${C.border}` }}>
              <div className="si" style={{ width: 44, height: 44, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.2rem", fontSize: "1.2rem", background: "rgba(200,147,42,.06)", transition: "background .3s, border-color .3s" }}>{s.icon}</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".62rem", color: C.gold, letterSpacing: ".12em", marginBottom: ".6rem", opacity: 0.6 }}>{s.num} / {s.label}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: ".65rem" }}>{s.title}</div>
              <div style={{ color: C.muted, fontSize: ".84rem", lineHeight: 1.75 }}>{s.desc}</div>
              <span style={{ display: "inline-block", marginTop: "1rem", fontFamily: "'Space Mono',monospace", fontSize: ".6rem", color: C.gold, letterSpacing: ".08em", textTransform: "uppercase", opacity: 0.6 }}>{s.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ PORTFOLIO ══════ */}
      <section id="portfolio" style={{ padding: "6rem 8%", background: C.bg2 }}>
        <SLabel text="Our Work" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2.5rem" }}>
          <h2 className="reveal" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3.5vw,2.8rem)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
            Work we&rsquo;re <span style={{ color: C.gold }}>proud of</span>
          </h2>
          {/* Filter tabs */}
          <div className="reveal" style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            {CATS.map((cat) => (
              <button key={cat} onClick={() => setActiveCat(cat)}
                style={{ background: activeCat === cat ? C.gold : "transparent", color: activeCat === cat ? C.bg : C.muted, border: `1px solid ${activeCat === cat ? C.gold : C.border}`, padding: ".4rem .95rem", borderRadius: 2, fontFamily: "'Space Mono',monospace", fontSize: ".65rem", letterSpacing: ".08em", textTransform: "uppercase", cursor: "pointer", transition: "all .2s", fontWeight: activeCat === cat ? 700 : 400 }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="port-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          {filtered.map((p, i) => (
            <div key={p.id} className="pc reveal" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 2, padding: "1.6rem", animationDelay: `${i * 0.08}s` }}>
              {/* Visual placeholder */}
              <div style={{ width: "100%", height: 110, background: "rgba(200,147,42,.06)", border: `1px solid ${C.border}`, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.8rem", marginBottom: "1.2rem" }}>
                {p.emoji}
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".6rem", color: C.gold, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".5rem", opacity: 0.75 }}>{p.cat}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: ".6rem" }}>{p.title}</div>
              <div style={{ color: C.muted, fontSize: ".82rem", lineHeight: 1.7, marginBottom: "1rem" }}>{p.desc}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
                {p.tags.map((t) => (
                  <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontSize: ".58rem", color: C.gold, background: "rgba(200,147,42,.08)", border: `1px solid rgba(200,147,42,.22)`, padding: ".2rem .6rem", borderRadius: 2, letterSpacing: ".04em" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ ABOUT ══════ */}
      <section id="about" style={{ padding: "6rem 8%", background: C.bg }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <SLabel text="About Us" />
            <h2 className="reveal" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3.5vw,2.8rem)", lineHeight: 1.15, letterSpacing: "-.02em", maxWidth: 480 }}>
              Intelligence rooted in <span style={{ color: C.gold }}>knowledge</span>
            </h2>
            <p className="reveal" style={{ marginTop: "1.5rem", fontSize: ".88rem", color: C.muted, lineHeight: 1.8 }}>
              We are a lean, high-performance tech studio building digital products that are both powerful and purposeful. Every project we take on is treated with deep craftsmanship and strategic thinking.
            </p>
            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: ".75rem" }}>
              {[
                { icon: "🧠", title: "Knowledge-First",  desc: "Deep understanding of your business before a single line of code is written." },
                { icon: "⚡", title: "Speed & Quality",  desc: "Fast delivery without cutting corners. Every pixel, every function matters." },
                { icon: "🔮", title: "Future-Ready",     desc: "Built with scalability in mind — your tech grows as your business grows." },
              ].map((p) => (
                <div key={p.title} className="pl reveal" style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1rem", border: "1px solid transparent", borderRadius: 2, transition: "border-color .3s, background .3s" }}>
                  <div style={{ width: 38, height: 38, flexShrink: 0, background: "rgba(200,147,42,.08)", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>{p.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: ".9rem", marginBottom: ".25rem" }}>{p.title}</div>
                    <div style={{ fontSize: ".82rem", color: C.muted, lineHeight: 1.65 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual block */}
          <div className="about-visual reveal" style={{ position: "relative", height: 400 }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 50, bottom: 50, border: `1px solid ${C.border}`, background: C.card, padding: "1.8rem", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -5, left: -5, fontFamily: "'Syne',sans-serif", fontSize: "6rem", fontWeight: 800, color: "rgba(200,147,42,.04)", whiteSpace: "nowrap", letterSpacing: "-.05em", pointerEvents: "none", textTransform: "uppercase" }}>
                {CONFIG.name}
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".7rem", color: C.muted, letterSpacing: ".1em", marginBottom: ".5rem" }}>{CONFIG.domain.toUpperCase()}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.4rem", fontWeight: 700, lineHeight: 1.3, maxWidth: 200 }}>Building the Digital Future</div>
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 175, border: `1px solid ${C.gold}`, background: "rgba(200,147,42,.08)", padding: "1.4rem", display: "flex", flexDirection: "column", gap: ".4rem" }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".65rem", color: C.muted, letterSpacing: ".1em" }}>CLIENT SATISFACTION</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "2.5rem", fontWeight: 800, color: C.gold, lineHeight: 1 }}>100%</div>
              <div style={{ fontSize: ".8rem", color: C.muted }}>On every delivered project</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ PROCESS ══════ */}
      <section id="process" style={{ padding: "6rem 8%", background: C.bg2 }}>
        <SLabel text="How We Work" />
        <h2 className="reveal" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3.5vw,2.8rem)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
          Our <span style={{ color: C.gold }}>5-step</span> process
        </h2>
        <div className="proc-grid reveal" style={{ marginTop: "3.5rem", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0, position: "relative" }}>
          <div className="proc-line" style={{ position: "absolute", top: 36, left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, ${C.gold}, ${C.border}, transparent)` }} />
          {PROCESS.map((step) => (
            <div key={step.num} style={{ padding: "0 .8rem", textAlign: "center" }}>
              <div className="prc" style={{ width: 72, height: 72, borderRadius: "50%", border: `1px solid ${C.border}`, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.2rem", fontFamily: "'Space Mono',monospace", fontSize: ".75rem", color: C.gold, fontWeight: 700, position: "relative", zIndex: 1, transition: "all .3s" }}>{step.num}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: ".88rem", fontWeight: 700, marginBottom: ".4rem" }}>{step.title}</div>
              <div style={{ fontSize: ".75rem", color: C.muted, lineHeight: 1.6 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ TECH STACK ══════ */}
      <section id="tech" style={{ padding: "6rem 8%" }}>
        <SLabel text="Our Stack" />
        <h2 className="reveal" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3.5vw,2.8rem)", lineHeight: 1.15, letterSpacing: "-.02em" }}>
          Technologies we <span style={{ color: C.gold }}>master</span>
        </h2>
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 1, marginTop: "2.5rem", border: `1px solid ${C.border}` }}>
          {TECH.map((t) => (
            <div key={t.name} className="ti" style={{ border: `1px solid ${C.border}`, padding: "1.2rem .8rem", textAlign: "center", transition: "background .2s", cursor: "default" }}>
              <span style={{ fontSize: "1.3rem", marginBottom: ".4rem", display: "block" }}>{t.emoji}</span>
              <div className="tn" style={{ fontFamily: "'Space Mono',monospace", fontSize: ".7rem", color: C.muted, transition: "color .2s" }}>{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ CONTACT / CTA ══════ */}
      <section id="contact" style={{ padding: "7rem 8%", background: C.bg2, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(200,147,42,.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <SLabel text="Get In Touch" center />
        <h2 className="reveal" style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.8rem,4.5vw,3.5rem)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-.02em", maxWidth: 640, margin: "0 auto" }}>
          Ready to build something <span style={{ color: C.gold }}>extraordinary?</span>
        </h2>
        <p className="reveal" style={{ color: C.muted, maxWidth: 440, margin: "1.3rem auto 2.5rem", lineHeight: 1.8, fontSize: ".93rem" }}>
          Drop your email — we'll reply within 24 hours and you'll get an instant confirmation in your inbox.
        </p>

        {/* Email form */}
        <div className="reveal" style={{ maxWidth: 500, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: ".6rem" }}>
            <input
              className="ei"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Enter your email address..."
              style={{ flex: 1, background: "rgba(255,255,255,.04)", border: `1px solid ${C.border}`, borderRadius: 2, padding: ".9rem 1rem", color: C.text, fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", outline: "none", transition: "border-color .2s" }}
            />
            <button onClick={handleSubmit} disabled={status === "loading"}
              style={{ background: status === "loading" ? "rgba(200,147,42,.5)" : C.gold, color: C.bg, border: "none", padding: ".9rem 1.6rem", borderRadius: 2, fontFamily: "'DM Sans',sans-serif", fontSize: ".88rem", fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", cursor: status === "loading" ? "wait" : "pointer", whiteSpace: "nowrap", minWidth: 110, transition: "background .2s" }}>
              {status === "loading" ? "Sending…" : "Done →"}
            </button>
          </div>

          {/* Status messages */}
          {status === "success" && (
            <div style={{ marginTop: "1rem", padding: ".8rem 1rem", background: "rgba(39,201,63,.08)", border: "1px solid rgba(39,201,63,.3)", borderRadius: 2, color: "#27c93f", fontSize: ".84rem", fontFamily: "'Space Mono',monospace", textAlign: "left" }}>
              ✓ Sent! Check your inbox — a confirmation is on its way.
            </div>
          )}
          {status === "error" && (
            <div style={{ marginTop: "1rem", padding: ".8rem 1rem", background: "rgba(255,95,86,.08)", border: "1px solid rgba(255,95,86,.3)", borderRadius: 2, color: "#ff5f56", fontSize: ".84rem", fontFamily: "'Space Mono',monospace", textAlign: "left" }}>
              ✗ Something went wrong. Email us directly: <a href={`mailto:${CONFIG.ownerEmail}`} style={{ color: "#ff5f56" }}>{CONFIG.ownerEmail}</a>
            </div>
          )}

          <p style={{ marginTop: "1rem", fontSize: ".7rem", color: C.muted, fontFamily: "'Space Mono',monospace", letterSpacing: ".05em" }}>
            No spam. No sharing. Just a reply from our team.
          </p>
        </div>

        {/* Alternate CTA */}
        <div className="cta-btns reveal" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "3rem", flexWrap: "wrap" }}>
          <a href={`mailto:${CONFIG.ownerEmail}`} style={{ fontFamily: "'Space Mono',monospace", fontSize: ".75rem", color: C.gold, letterSpacing: ".08em", textDecoration: "none", opacity: 0.8 }}>{CONFIG.ownerEmail}</a>
          <span style={{ color: C.border }}>·</span>
          <a href={`tel:${CONFIG.phone.replace(/\s/g,"")}`} style={{ fontFamily: "'Space Mono',monospace", fontSize: ".75rem", color: C.muted, letterSpacing: ".08em", textDecoration: "none" }}>{CONFIG.phone}</a>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer style={{ padding: "2.5rem 8%", borderTop: `1px solid ${C.border}` }}>
        <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.2rem" }}>
            {CONFIG.name.slice(0, -CONFIG.nameSuffix.length)}
            <span style={{ color: C.gold }}>{CONFIG.nameSuffix}</span>
          </div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".65rem", color: C.muted, letterSpacing: ".08em" }}>
            © {new Date().getFullYear()} {CONFIG.name}. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" style={{ fontSize: ".78rem", color: C.muted, textDecoration: "none", transition: "color .2s" }}
                onMouseOver={(e) => e.currentTarget.style.color = C.gold}
                onMouseOut={(e)  => e.currentTarget.style.color = C.muted}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
