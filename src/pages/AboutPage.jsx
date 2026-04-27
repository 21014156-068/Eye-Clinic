import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { doctors, sharedTestimonials } from "../data/siteContent";

const aboutMetrics = [
  { value: 12, label: "Years of trusted eye care experience" },
  { value: 25000, label: "Patients treated (lifetime)" },
  { value: 8000, label: "Procedures & surgeries performed" },
];

const expertiseAreas = [
  {
    id: "01",
    title: "Cataract",
    copy: "Modern lens options, calm surgical planning, structured aftercare.",
  },
  {
    id: "02",
    title: "LASIK",
    copy: "Candidacy-led refractive correction with precision diagnostics.",
  },
  {
    id: "03",
    title: "Retina",
    copy: "Early detection, monitoring programs, specialist-level continuity.",
  },
  {
    id: "04",
    title: "Glaucoma",
    copy: "Pressure management with long-term progression tracking.",
  },
];

const values = [
  {
    id: "01",
    title: "Patient-first approach",
    copy: "Clear explanations, calm pacing, and supportive follow-up.",
  },
  {
    id: "02",
    title: "Integrity",
    copy: "Transparent options, candidacy-based recommendations, trust-led care.",
  },
  {
    id: "03",
    title: "Innovation",
    copy: "Advanced diagnostics and modern procedures that improve outcomes.",
  },
  {
    id: "04",
    title: "Excellence",
    copy: "Specialist-led clinical standards and consistent quality.",
  },
];

const timeline = [
  {
    year: "2013",
    title: "Clinic founded",
    copy: "Built to deliver specialist-led eye care with a calmer patient experience.",
  },
  {
    year: "2017",
    title: "Expanded diagnostics",
    copy: "Introduced advanced imaging workflows to reduce uncertainty and improve planning.",
  },
  {
    year: "2021",
    title: "Premium surgical pathways",
    copy: "Standardized refractive and cataract journeys for clearer preparation and aftercare.",
  },
  {
    year: "2026",
    title: "Next-phase growth",
    copy: "Technology + patient experience upgrades designed to increase trust and conversion.",
  },
];

const careModel = [
  {
    step: "01",
    title: "Diagnosis",
    copy: "Modern scanning + specialist interpretation with clear explanations.",
  },
  {
    step: "02",
    title: "Planning",
    copy: "A calm, structured pathway that reduces uncertainty and improves confidence.",
  },
  {
    step: "03",
    title: "Procedure",
    copy: "Safety-first protocols supported by advanced technology.",
  },
  {
    step: "04",
    title: "Recovery",
    copy: "Aftercare continuity with follow-ups and guidance that feels reassuring.",
  },
];

export default function AboutPage() {
  // Update these quickly
  const WHATSAPP_NUMBER = "+0000000000"; // <-- change
  const PRIMARY_PHONE = "+0000000000"; // <-- change

  // ✅ HomePage-aligned theme tokens (light, sky/navy)
  const theme = {
    sky: "#0ea5e9",
    skyHover: "#0284c7",
    skyMid: "#38bdf8",
    skyLight: "#e0f2fe",
    bg: "#f8fafc",
    white: "#ffffff",
    navy: "#1a2e44",
    navyMid: "#2d4a6b",
    slate: "#64748b",
    border: "#e2e8f0",
    borderLight: "#f1f5f9",
    radius: "20px",
    radiusLG: "28px",
    radiusXL: "36px",
    shadow: "0 4px 24px rgba(14,165,233,0.08), 0 1px 4px rgba(0,0,0,0.06)",
    shadowHover:
      "0 12px 40px rgba(14,165,233,0.15), 0 2px 8px rgba(0,0,0,0.08)",
    container: "min(1440px, calc(100% - 32px))",
  };

  // ✅ spacing enhancement: slightly bigger & consistent section padding
  const SECTION_Y = "84px";

  const s = {
    main: {
      position: "relative",
      zIndex: 1,
      fontFamily: "'Inter', system-ui, sans-serif",
      background: theme.bg,
      color: theme.navy,
      paddingBottom: "140px",
    },

    // ✅ removed PageHero component; replaced with simple top header section
    topHeader: {
      padding: "86px 0 44px",
      width: "100%",
      background:
        "linear-gradient(150deg, #e0f2fe 0%, #f0f9ff 40%, #ffffff 100%)",
      borderBottom: `1px solid ${theme.border}`,
    },

    shell: {
      width: theme.container,
      margin: "0 auto",
      position: "relative",
    },

    eyebrow: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 14px",
      borderRadius: "999px",
      background: theme.skyLight,
      color: theme.sky,
      fontSize: "0.78rem",
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      marginBottom: "16px",
    },

    h1: {
      fontFamily: "'DM Serif Display', serif",
      fontSize: "clamp(2.8rem, 5vw, 4.8rem)",
      lineHeight: 1.05,
      letterSpacing: "-0.03em",
      margin: 0,
      maxWidth: "18ch",
      whiteSpace: "nowrap",
      color: theme.navy,
    },

    h2: {
      fontFamily: "'DM Serif Display', serif",
      fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
      letterSpacing: "-0.02em",
      lineHeight: 1.1,
      margin: 0,
      color: theme.navy,
    },

    desc: {
      color: theme.slate,
      lineHeight: 1.72,
      fontSize: "1.06rem",
      margin: "18px 0 0",
      maxWidth: "66ch",
    },

    card: {
      position: "relative",
      overflow: "hidden",
      border: `1px solid ${theme.border}`,
      background: theme.white,
      boxShadow: theme.shadow,
      padding: "28px",
      borderRadius: theme.radiusLG,
      transition:
        "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
    },

    cardCode: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "58px",
      height: "34px",
      padding: "0 12px",
      borderRadius: "999px",
      background: theme.skyLight,
      color: theme.sky,
      fontSize: "0.82rem",
      fontWeight: 800,
      letterSpacing: "0.08em",
    },

    pill: {
      display: "inline-flex",
      padding: "10px 14px",
      border: `1px solid ${theme.border}`,
      borderRadius: "999px",
      background: theme.bg,
      color: theme.navyMid,
      fontSize: "0.88rem",
      fontWeight: 600,
    },

    heroGrid: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
      gap: "28px",
      alignItems: "start",
      marginTop: "28px",
    },

    // ✅ Light visual panel (keeps orbits but swaps dark/glass to Home style)
    visualPanel: {
      minHeight: "560px",
      borderRadius: theme.radiusXL,
      position: "relative",
      overflow: "hidden",
      border: `1px solid ${theme.border}`,
      background:
        "radial-gradient(circle at 18% 22%, rgba(14,165,233,0.10), transparent 40%), linear-gradient(150deg, #f0f9ff 0%, #ffffff 60%, #f8fafc 100%)",
      boxShadow: theme.shadow,
    },

    metricStrip: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "16px",
      marginTop: "22px",
    },
    metricCard: {
      padding: "20px",
      borderRadius: "22px",
      border: `1px solid ${theme.border}`,
      background: theme.white,
      boxShadow: theme.shadow,
      position: "relative",
      overflow: "hidden",
      transition:
        "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
    },

    // ✅ more spacing between sections
    sectionBand: { width: "100%", padding: `${SECTION_Y} 0` },

    // ✅ optional gentle alternating bands (instead of rgba white overlay)
    bandAlt: { background: "#fff" },

    ctaBanner: {
      padding: "52px",
      borderRadius: theme.radiusXL,
      border: `1px solid ${theme.border}`,
      background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyMid} 100%)`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "26px",
      flexWrap: "wrap",
      boxShadow: "0 20px 60px rgba(0,0,0,0.14)",
    },
  };

  // Animated counters
  const [counterOn, setCounterOn] = useState(false);
  useEffect(() => {
    const el = document.getElementById("about-stats-sentinel");
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setCounterOn(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const whatsappHref = useMemo(() => {
    const cleaned = WHATSAPP_NUMBER.replace(/[^\d+]/g, "");
    const wa = cleaned.startsWith("+") ? cleaned.slice(1) : cleaned;
    return `https://wa.me/${wa}`;
  }, [WHATSAPP_NUMBER]);

  const teamPreview = (Array.isArray(doctors) ? doctors : []).slice(0, 3);

  const aboutFaq = [
    {
      q: "What makes your clinic different?",
      a: "We combine specialist-led care, advanced diagnostics, and a patient-first experience with clear next steps.",
    },
    {
      q: "Do you offer LASIK / cataract services?",
      a: "Yes. We offer refractive options (LASIK) and cataract evaluation with structured planning and aftercare.",
    },
    {
      q: "How do I book an appointment?",
      a: "Tap “Book Appointment” anywhere on the site to choose a service, doctor, and time.",
    },
  ];

  const heroTitle = "Our Eye Care Clinic";

  return (
    <main style={s.main}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes aboutSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes aboutSpinReverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes aboutPulse { 0%, 100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.06); opacity: 1; } }
        @keyframes floatChip { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        * { box-sizing: border-box; }

        .hover-card { transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease; }
        .hover-card:hover { transform: translateY(-6px); border-color: rgba(14,165,233,0.35) !important; box-shadow: ${theme.shadowHover} !important; }

        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          padding: 0 24px;
          border-radius: 999px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          white-space: nowrap;
          border: 1px solid transparent;
          cursor: pointer;
          font-family: 'Inter', system-ui;
        }
        .button:hover { transform: translateY(-2px); }

        .button-primary { background: ${theme.sky}; color: #fff; box-shadow: 0 8px 24px rgba(14,165,233,0.32); }
        .button-primary:hover { background: ${theme.skyHover}; box-shadow: 0 12px 32px rgba(14,165,233,0.40); }

        .button-secondary { background: #fff; color: ${theme.sky}; border: 1.5px solid ${theme.sky}; }
        .button-secondary:hover { background: ${theme.skyLight}; }

        .button-ghost { background: rgba(255,255,255,0.7); color: ${theme.navy}; border: 1.5px solid ${theme.border}; }
        .button-ghost:hover { background: #fff; }

        .button-danger { background: rgba(239,68,68,0.10); color: #b91c1c; border: 1.5px solid rgba(239,68,68,0.25); }
        .button-danger:hover { background: rgba(239,68,68,0.14); }

        .orbit { position: absolute; border: 1px solid rgba(14,165,233,0.18); borderRadius: 50%; }
        .orbit-a { width: 340px; height: 340px; top: 120px; left: 120px; animation: aboutSpin 18s linear infinite; }
        .orbit-b { width: 470px; height: 470px; top: 56px; left: 56px; border-color: rgba(14,165,233,0.10); animation: aboutSpinReverse 24s linear infinite; }
        .orbit-c { width: 220px; height: 220px; bottom: 72px; right: 72px; border-color: rgba(56,189,248,0.18); animation: aboutPulse 5.5s ease-in-out infinite; }

        .floating-card {
          position: absolute;
          border: 1px solid ${theme.border};
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(18px);
          padding: 16px 18px;
          border-radius: 22px;
          display: grid;
          gap: 6px;
          min-width: 182px;
          box-shadow: 0 14px 40px rgba(2, 8, 23, 0.10);
        }
        .card-a { top: 40px; right: 36px; animation: floatChip 8s ease-in-out infinite; }
        .card-b { left: 42px; bottom: 64px; animation: floatChip 9.2s ease-in-out infinite reverse; }
        .card-c { right: 52px; bottom: 120px; animation: floatChip 7.8s ease-in-out infinite; }

        .timeline { display: grid; gap: 14px; margin-top: 22px; }
        .timeline-item { display: grid; grid-template-columns: auto 1fr; gap: 16px; align-items: start; }
        .timeline-year { font-family: "DM Serif Display", serif; font-weight: 800; color: ${theme.skyHover}; letter-spacing: -0.02em; }

        @media (max-width: 1180px) {
          .hero-grid, .metric-strip, .grid-3, .grid-2 { grid-template-columns: 1fr !important; }
          .floating-cta { left: 16px; right: 16px; }
          .floating-cta .button { width: 100%; }
        }
        @media (max-width: 820px) {
          .cta-actions { flex-direction: column; width: 100%; }
          .button { width: 100%; }
        }
      `}</style>

      {/* ✅ Removed PageHero component: clean header section */}
      <section style={s.topHeader}>
        <div style={s.shell}>
          <div style={s.eyebrow}>About Us</div>
          <h1 style={s.h1}>
            {heroTitle.split("Clinic")[0]}
            <em style={{ color: theme.sky, fontStyle: "italic" }}>Clinic</em>
          </h1>
          <p style={{ ...s.desc, fontSize: "1.1rem", marginTop: 18 }}>
            A specialist-led clinic built around experience, innovation, and a
            patient-first journey—so every patient feels calm, informed, and
            confident.
          </p>

          <div
            style={{
              display: "flex",
              gap: "14px",
              marginTop: "28px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
            className="cta-actions"
          >
            <Link className="button button-primary" to="/appointment">
              Book Appointment
            </Link>
            <Link className="button button-secondary" to="/doctors">
              Meet Our Doctors
            </Link>
          </div>

          {/* ✅ Overview stays in header area (spacing tuned) */}
          <div style={{ marginTop: 28, ...s.card }} className="hover-card">
            <h2 style={{ ...s.h2, fontSize: "1.8rem" }}>Overview</h2>
            <p style={s.desc}>
              We specialize in cataract, refractive vision correction (LASIK),
              retina care, and glaucoma monitoring—supported by modern
              diagnostics and a calm patient-first experience. Our focus is to
              deliver safe outcomes with clearer explanations, structured
              planning, and consistent follow-up.
            </p>
          </div>

          {/* Stats
          <div id="about-stats-sentinel" style={{ height: 1 }} />
          <div style={s.metricStrip} className="metric-strip">
            {aboutMetrics.map((m, idx) => (
              <motion.article
                key={m.label}
                className="hover-card"
                style={s.metricCard}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
              >
                <strong
                  style={{
                    display: "block",
                    fontSize: "2.35rem",
                    fontFamily: "'DM Serif Display', serif",
                    letterSpacing: "-0.03em",
                    color: theme.skyHover,
                    lineHeight: 1,
                  }}
                >
                  {counterOn ? m.value.toLocaleString() + "+" : "—"}
                </strong>
                <p
                  style={{
                    color: theme.slate,
                    lineHeight: "1.6",
                    fontSize: "0.92rem",
                    margin: "10px 0 0",
                    fontWeight: 600,
                  }}
                >
                  {m.label}
                </p>
              </motion.article>
            ))}
          </div> */}

          {/* ✅ Visual panel moved just below header content (still inside header section) */}
          <div style={{ marginTop: 28 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              style={s.visualPanel}
              className="hover-card"
            >
              <div className="orbit orbit-a" />
              <div className="orbit orbit-b" />
              <div className="orbit orbit-c" />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  color: theme.slate,
                  padding: 22,
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Clinic / Doctors background image placeholder
                <div
                  style={{
                    marginTop: 10,
                    fontSize: "0.95rem",
                    fontWeight: 500,
                  }}
                >
                  Replace with an image later (e.g. <code>backgroundImage</code>{" "}
                  or an <code>&lt;img&gt;</code>).
                </div>
              </div>

              <motion.article className="floating-card card-a">
                <span
                  style={{
                    color: theme.skyHover,
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Innovation
                </span>
                <strong style={{ fontSize: "0.95rem", color: theme.navy }}>
                  Advanced diagnostics
                </strong>
              </motion.article>

              <motion.article className="floating-card card-b">
                <span
                  style={{
                    color: theme.skyHover,
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Care
                </span>
                <strong style={{ fontSize: "0.95rem", color: theme.navy }}>
                  Patient-first flow
                </strong>
              </motion.article>

              <motion.article className="floating-card card-c">
                <span
                  style={{
                    color: theme.skyHover,
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Trust
                </span>
                <strong style={{ fontSize: "0.95rem", color: theme.navy }}>
                  Specialist-led
                </strong>
              </motion.article>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <AnimatedSection style={s.sectionBand}>
        <div style={s.shell}>
          <p style={s.eyebrow}>Purpose</p>
          <h2 style={s.h2}>Mission, vision & values</h2>

          <div
            style={{
              display: "grid",
              gap: 20,
              marginTop: 28,
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            }}
            className="grid-3"
          >
            <article className="hover-card" style={s.card}>
              <span style={s.cardCode}>Mission</span>
              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.35rem",
                  margin: "14px 0 0",
                  color: theme.navy,
                }}
              >
                Patient-centered eye care
              </h3>
              <p style={s.desc}>
                Deliver high-quality, specialist-led eye care with clarity,
                comfort, and consistent follow-up.
              </p>
            </article>

            <article className="hover-card" style={s.card}>
              <span style={s.cardCode}>Vision</span>
              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.35rem",
                  margin: "14px 0 0",
                  color: theme.navy,
                }}
              >
                Regional leadership
              </h3>
              <p style={s.desc}>
                Become a leading eye care provider in the region through
                innovation, excellence, and measurable outcomes.
              </p>
            </article>

            <article className="hover-card" style={s.card}>
              <span style={s.cardCode}>Values</span>
              <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
                {values.map((v) => (
                  <div
                    key={v.id}
                    style={{
                      padding: 12,
                      borderRadius: 18,
                      border: `1px solid ${theme.border}`,
                      background: theme.bg,
                    }}
                  >
                    <div style={{ fontWeight: 900, color: theme.navy }}>
                      {v.title}
                    </div>
                    <div
                      style={{
                        color: theme.slate,
                        marginTop: 6,
                        lineHeight: 1.7,
                      }}
                    >
                      {v.copy}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </AnimatedSection>

      {/* Our Story + Leadership */}
      <AnimatedSection style={{ ...s.sectionBand, ...s.bandAlt }}>
        <div style={s.shell}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
              gap: 20,
              paddingTop: "60px",
            }}
            className="grid-2"
          >
            <article className="hover-card" style={s.card}>
              <p style={s.eyebrow}>Our Story</p>
              <h2 style={{ ...s.h2, fontSize: "2.6rem" }}>
                Why we started & where we’re going
              </h2>
              <p style={s.desc}>
                We started this clinic to deliver eye care that feels modern,
                clear, and calm—where patients understand their options and
                trust the next step.
              </p>

              <div className="timeline">
                {timeline.map((t) => (
                  <div key={t.year} className="timeline-item">
                    <div className="timeline-year">{t.year}</div>
                    <div>
                      <div style={{ fontWeight: 900, color: theme.navy }}>
                        {t.title}
                      </div>
                      <div
                        style={{
                          color: theme.slate,
                          marginTop: 6,
                          lineHeight: 1.7,
                        }}
                      >
                        {t.copy}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="hover-card" style={s.card}>
              <p style={s.eyebrow}>Leadership Message</p>
              <h2 style={{ ...s.h2, fontSize: "2.6rem" }}>
                A promise to patients
              </h2>
              <p style={s.desc}>
                “Our commitment is simple: deliver safe outcomes, explain
                clearly, and stay with you through recovery. Every
                recommendation is candidacy-based and guided by what’s best for
                long-term vision health.”
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 18,
                }}
              >
                <span style={s.pill}>Clinical excellence</span>
                <span style={s.pill}>Clear explanations</span>
                <span style={s.pill}>Aftercare continuity</span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 14,
                  flexWrap: "wrap",
                  marginTop: 22,
                }}
              >
                <Link className="button button-primary" to="/appointment">
                  Book Appointment
                </Link>
                <Link className="button button-secondary" to="/contact">
                  Contact Clinic
                </Link>
              </div>
            </article>
          </div>
        </div>
      </AnimatedSection>

      {/* Expertise */}
      <AnimatedSection style={s.sectionBand}>
        <div style={s.shell}>
          <p style={{ ...s.eyebrow, marginTop: "60px" }}>Expertise</p>
          <h2 style={s.h2}>Our expertise & specializations</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 20,
              marginTop: 28,
            }}
            className="grid-3"
          >
            {expertiseAreas.map((x) => (
              <article
                key={x.id}
                className="hover-card"
                style={{ ...s.card, padding: 22 }}
              >
                <span style={s.cardCode}>{x.id}</span>
                <h3
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.35rem",
                    margin: "14px 0 0",
                    color: theme.navy,
                  }}
                >
                  {x.title}
                </h3>
                <p style={s.desc}>{x.copy}</p>
                <div style={{ marginTop: 16 }}>
                  <Link className="button button-secondary" to="/services">
                    Explore Services
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Technology */}
      <AnimatedSection style={{ ...s.sectionBand, ...s.bandAlt }}>
        <div style={{ ...s.shell, marginTop: "60px" }}>
          <div className="hover-card" style={{ ...s.card, padding: 32 }}>
            <p style={s.eyebrow}>Technology</p>
            <h2 style={{ ...s.h2, fontSize: "2.8rem" }}>
              Technology & innovation that improves outcomes
            </h2>
            <p style={s.desc}>
              We use advanced diagnostic and surgical systems to improve
              accuracy, reduce risk, and speed up recovery planning.
            </p>

            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                marginTop: 18,
              }}
            >
              <Link className="button button-primary" to="/technology">
                Explore Technology
              </Link>
              <Link className="button button-secondary" to="/appointment">
                Book Diagnostics
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Team */}
      <AnimatedSection style={s.sectionBand}>
        <div style={{ ...s.shell, marginTop: "60px" }}>
          <p style={s.eyebrow}>Team</p>
          <h2 style={s.h2}>Meet our team</h2>
          <p style={s.desc}>
            A specialist team focused on clear planning, safe outcomes, and
            patient comfort.
          </p>

          <div
            style={{
              display: "grid",
              gap: 20,
              marginTop: 28,
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            }}
            className="grid-3"
          >
            {teamPreview.map((d, idx) => (
              <article
                key={`${d.name}-${idx}`}
                className="hover-card"
                style={{ ...s.card, padding: 22 }}
              >
                <div
                  style={{
                    width: 74,
                    height: 74,
                    borderRadius: 22,
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 900,
                    color: "#fff",
                    background: `linear-gradient(135deg, ${theme.sky}, ${theme.skyMid})`,
                    boxShadow: "0 10px 28px rgba(14,165,233,0.28)",
                  }}
                >
                  {d.initials || "DR"}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    color: theme.skyHover,
                    fontWeight: 900,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontSize: "0.78rem",
                  }}
                >
                  {d.role || "Specialist"}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.35rem",
                    color: theme.navy,
                    fontWeight: 800,
                  }}
                >
                  {d.name}
                </div>
                <p style={{ ...s.desc, marginTop: 10 }}>{d.bio}</p>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginTop: 14,
                  }}
                >
                  <Link className="button button-secondary" to="/doctors">
                    View Profile
                  </Link>
                  <Link className="button button-primary" to="/appointment">
                    Book
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div
            style={{ marginTop: 18, display: "flex", justifyContent: "center" }}
          >
            <Link className="button button-secondary" to="/doctors">
              View All Doctors
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Accreditations */}
      <AnimatedSection style={{ ...s.sectionBand, ...s.bandAlt }}>
        <div style={{ ...s.shell, marginTop: "60px" }}>
          <p style={s.eyebrow}>Accreditations</p>
          <h2 style={s.h2}>Certifications & compliance</h2>

          <div
            style={{
              display: "grid",
              gap: 20,
              marginTop: 28,
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            }}
            className="grid-3"
          >
            {[
              {
                id: "01",
                title: "Medical certifications",
                copy: "Standards supporting safe clinical practice and patient care workflows.",
              },
              {
                id: "02",
                title: "Awards & recognition",
                copy: "Professional recognition and continuous training efforts.",
              },
              {
                id: "03",
                title: "Affiliations",
                copy: "Partnerships and affiliations supporting better access and quality.",
              },
            ].map((x) => (
              <article
                key={x.id}
                className="hover-card"
                style={{ ...s.card, padding: 22 }}
              >
                <span style={s.cardCode}>{x.id}</span>
                <h3
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.35rem",
                    margin: "14px 0 0",
                    color: theme.navy,
                  }}
                >
                  {x.title}
                </h3>
                <p style={s.desc}>{x.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Patient-Centric Approach */}
      <AnimatedSection style={s.sectionBand}>
        <div style={{ ...s.shell, marginTop: "60px" }}>
          <p style={s.eyebrow}>Patient-Centric Care</p>
          <h2 style={s.h2}>Comfort, safety, and end-to-end support</h2>

          <div style={{ display: "grid", gap: 16, marginTop: 28 }}>
            {careModel.map((x) => (
              <article
                key={x.step}
                className="hover-card"
                style={{
                  ...s.card,
                  padding: "20px 22px",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 18,
                  alignItems: "center",
                }}
              >
                <span style={s.cardCode}>{x.step}</span>
                <div>
                  <div
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontWeight: 800,
                      fontSize: "1.35rem",
                      color: theme.navy,
                    }}
                  >
                    {x.title}
                  </div>
                  <div
                    style={{
                      color: theme.slate,
                      marginTop: 6,
                      lineHeight: 1.7,
                    }}
                  >
                    {x.copy}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Facilities */}
      <AnimatedSection style={{ ...s.sectionBand, ...s.bandAlt }}>
        <div style={{ ...s.shell, marginTop: "60px" }}>
          <p style={s.eyebrow}>Facilities</p>
          <h2 style={s.h2}>Infrastructure built for premium care</h2>

          <div
            style={{
              display: "grid",
              gap: 20,
              marginTop: 28,
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            }}
            className="grid-3"
          >
            {[
              {
                id: "01",
                title: "Operation theatres",
                copy: "Sterile, safety-led surgical environments designed for consistency.",
              },
              {
                id: "02",
                title: "Diagnostic rooms",
                copy: "Advanced imaging workflows that improve clarity and speed.",
              },
              {
                id: "03",
                title: "Patient waiting areas",
                copy: "Comfort-first design that reduces anxiety and improves experience.",
              },
            ].map((x) => (
              <article
                key={x.id}
                className="hover-card"
                style={{ ...s.card, padding: 22 }}
              >
                <span style={s.cardCode}>{x.id}</span>
                <h3
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.35rem",
                    margin: "14px 0 0",
                    color: theme.navy,
                  }}
                >
                  {x.title}
                </h3>
                <p style={s.desc}>{x.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Community */}
      <AnimatedSection style={s.sectionBand}>
        <div style={{ ...s.shell, marginTop: "60px" }}>
          <p style={s.eyebrow}>Community</p>
          <h2 style={s.h2}>Social responsibility</h2>

          <div
            style={{
              display: "grid",
              gap: 20,
              marginTop: 28,
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            }}
            className="grid-3"
          >
            {[
              {
                id: "01",
                title: "Free eye camps",
                copy: "Community screenings and early detection support.",
              },
              {
                id: "02",
                title: "Awareness programs",
                copy: "Education for families on vision health and prevention.",
              },
              {
                id: "03",
                title: "Charity initiatives",
                copy: "Support for patients needing additional assistance.",
              },
            ].map((x) => (
              <article
                key={x.id}
                className="hover-card"
                style={{ ...s.card, padding: 22 }}
              >
                <span style={s.cardCode}>{x.id}</span>
                <h3
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.35rem",
                    margin: "14px 0 0",
                    color: theme.navy,
                  }}
                >
                  {x.title}
                </h3>
                <p style={s.desc}>{x.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection style={{ ...s.sectionBand, ...s.bandAlt }}>
        <div style={{ ...s.shell, marginTop: "60px" }}>
          <p style={s.eyebrow}>Patient Feedback</p>
          <h2 style={s.h2}>Trusted by real patients</h2>

          <div
            style={{
              display: "grid",
              gap: 20,
              marginTop: 28,
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            }}
            className="grid-3"
          >
            {(Array.isArray(sharedTestimonials) ? sharedTestimonials : [])
              .slice(0, 3)
              .map((t, idx) => (
                <article
                  key={idx}
                  className="hover-card"
                  style={{ ...s.card, padding: 22 }}
                >
                  <div style={{ color: theme.skyHover, fontWeight: 900 }}>
                    ★★★★★ 5.0
                  </div>
                  <p
                    style={{
                      ...s.desc,
                      marginTop: 10,
                      fontStyle: "italic",
                      color: theme.navy,
                    }}
                  >
                    {t.quote}
                  </p>
                  <div
                    style={{
                      marginTop: 12,
                      fontWeight: 900,
                      color: theme.navy,
                    }}
                  >
                    {t.author}
                  </div>
                </article>
              ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection style={{ padding: "110px 0 70px" }}>
        <div style={{ ...s.shell, marginTop: "60px" }}>
          <div className="hover-card" style={s.ctaBanner}>
            <div style={{ maxWidth: "680px" }}>
              <p
                style={{
                  ...s.eyebrow,
                  background: "rgba(255,255,255,0.12)",
                  color: theme.skyMid,
                }}
              >
                Contact
              </p>
              <h2 style={{ ...s.h2, fontSize: "2.8rem", color: "#fff" }}>
                Trusted by thousands for advanced eye care
              </h2>
              <p style={{ ...s.desc, color: "rgba(255,255,255,0.75)" }}>
                Book an appointment or contact us for guidance on the best next
                step.
              </p>
            </div>
            <div
              style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
              className="cta-actions"
            >
              <Link className="button button-primary" to="/appointment">
                Book Appointment
              </Link>
              <Link
                className="button button-ghost"
                to="/contact"
                style={{
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.25)",
                  background: "rgba(255,255,255,0.10)",
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
