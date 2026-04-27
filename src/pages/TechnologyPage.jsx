import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { technologyPage, doctors } from "../data/siteContent";
import { m } from "framer-motion";

const technologySignals = [
  { label: "Scan throughput", value: "High-speed intake" },
  { label: "Lens planning", value: "Premium decision support" },
  { label: "Retina review", value: "Early-warning workflow" },
  { label: "Aftercare visibility", value: "Clearer recovery mapping" },
];

const patientBenefits = [
  {
    title: "Less ambiguity during consults",
    copy: "Imaging and workflow visuals help patients understand what is happening without being overwhelmed by technical language.",
  },
  {
    title: "Higher confidence before surgery",
    copy: "Refractive and cataract journeys become easier to trust when preparation and measurement feel more structured.",
  },
  {
    title: "Better continuity for monitoring",
    copy: "Repeat retina and glaucoma care feels more stable when follow-up logic is easier to communicate.",
  },
];

export default function TechnologyPage() {
  // Update these quickly
  const WHATSAPP_NUMBER = "+0000000000"; // <-- change
  const PRIMARY_PHONE = "+0000000000"; // <-- change

  // ✅ HomePage-aligned theme (sky / navy / slate / light)
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

  // ✅ spacing enhancement
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

    // ✅ new enhanced hero (replaces PageHero)
    hero: {
      padding: "88px 0 56px",
      background:
        "linear-gradient(150deg, #e0f2fe 0%, #f0f9ff 40%, #ffffff 100%)",
      borderBottom: `1px solid ${theme.border}`,
      overflow: "hidden",
      position: "relative",
    },
    shell: {
      width: theme.container,
      margin: "0 auto",
      position: "relative",
    },

    sectionBand: { width: "100%", padding: `${SECTION_Y} 0` },
    sectionShell: {
      width: theme.container,
      margin: "0 auto",
      position: "relative",
    },
    sectionHead: { maxWidth: "820px" },

    eyebrow: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      margin: "0 0 16px",
      color: theme.sky,
      fontSize: "0.78rem",
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      padding: "6px 14px",
      borderRadius: "999px",
      background: theme.skyLight,
    },

    h1: {
      fontFamily: "'DM Serif Display', serif",
      fontSize: "clamp(2.8rem, 5vw, 5rem)",
      lineHeight: 1.05,
      letterSpacing: "-0.03em",
      margin: 0,
      color: theme.navy,
      maxWidth: "22ch",
    },

    h2: {
      fontFamily: "'DM Serif Display', serif",
      fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
      letterSpacing: "-0.02em",
      lineHeight: 1.1,
      margin: 0,
      color: theme.navy,
    },

    p: {
      color: theme.slate,
      lineHeight: 1.72,
      margin: "14px 0 0",
      maxWidth: "66ch",
      fontSize: "1.02rem",
    },

    // Grids
    grid4: {
      display: "grid",
      gap: "20px",
      marginTop: "32px",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    },
    grid3: {
      display: "grid",
      gap: "20px",
      marginTop: "32px",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    },
    grid2: {
      display: "grid",
      gap: "20px",
      marginTop: "32px",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },

    signalGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      gap: "16px",
      marginTop: "26px",
    },

    // Cards (light)
    card: {
      position: "relative",
      overflow: "hidden",
      border: `1px solid ${theme.border}`,
      background: theme.white,
      boxShadow: theme.shadow,
      padding: "28px",
      borderRadius: theme.radiusLG,
      transition:
        "transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease",
    },
    statCard: {
      padding: "18px",
      borderRadius: "22px",
      border: `1px solid ${theme.border}`,
      background: theme.white,
      boxShadow: theme.shadow,
      transition:
        "transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease",
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
    tag: {
      display: "inline-flex",
      alignItems: "center",
      padding: "7px 10px",
      borderRadius: "999px",
      fontSize: "0.78rem",
      fontWeight: 800,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      border: `1px solid ${theme.border}`,
      background: theme.borderLight,
      color: theme.navyMid,
      whiteSpace: "nowrap",
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
    ctaBanner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "24px",
      padding: "42px",
      borderRadius: theme.radiusXL,
      background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyMid} 100%)`,
      border: `1px solid rgba(255,255,255,0.12)`,
      boxShadow: "0 20px 60px rgba(0,0,0,0.14)",
    },
  };

  // -------------------------------------------------------
  // Data model for the NEW required sections
  // -------------------------------------------------------
  const TECH_CATEGORIES = [
    "Diagnostic Equipment",
    "Laser & Surgical Technology",
    "Imaging Systems",
    "Vision Testing Tools",
  ];

  const defaultTechnologies = [
    {
      id: "FEMTO",
      name: "Femto LASIK System",
      category: "Laser & Surgical Technology",
      description:
        "Laser-assisted flap creation for precision-led refractive surgery planning.",
      benefits: ["Accuracy", "Safety", "Speed"],
      usedFor: ["LASIK Surgery", "Vision Correction Planning"],
      overview:
        "A femtosecond laser is used for precise corneal flap creation, improving predictability and comfort for suitable candidates.",
      howItWorks:
        "The system uses ultra-fast laser pulses to separate tissue at a microscopic level—creating a controlled flap with high consistency.",
      vsTraditional: [
        {
          left: "Manual microkeratome blade",
          right: "Laser-assisted flap creation",
        },
        { left: "More variability", right: "Higher consistency and control" },
        {
          left: "Slower planning confidence",
          right: "Faster decision support from scans + mapping",
        },
      ],
      safety: [
        "Calibrated laser protocols",
        "Pre-op screening + candidacy checks",
        "Sterile procedure workflow",
      ],
      media: { image: "/assets/tech-femto.jpg" }, // optional
      featured: true,
      serviceMap: [{ tech: "Femto LASIK System", service: "LASIK Surgery" }],
      doctorRoles: ["Refractive Surgeon", "Ophthalmologist"],
    },
    {
      id: "OCT",
      name: "OCT Scan (Optical Coherence Tomography)",
      category: "Imaging Systems",
      description:
        "High-resolution retinal imaging for early detection and monitoring.",
      benefits: ["Accuracy", "Safety", "Speed"],
      usedFor: ["Retina Diagnosis", "Glaucoma Monitoring", "Diabetic Eye Care"],
      overview:
        "OCT produces cross-sectional images of the retina, helping clinicians detect subtle changes earlier and track progression over time.",
      howItWorks:
        "It uses light-based scanning to create layered images, allowing detailed analysis without invasive procedures.",
      vsTraditional: [
        { left: "Basic exam alone", right: "Layer-by-layer imaging detail" },
        {
          left: "Harder to track subtle change",
          right: "Clear monitoring over time",
        },
        { left: "More uncertainty", right: "More measurable decisions" },
      ],
      safety: [
        "Non-invasive scanning",
        "Standard imaging compliance",
        "Secure image handling",
      ],
      media: { image: "/assets/tech-oct.jpg" }, // optional
      featured: true,
      serviceMap: [{ tech: "OCT Scan", service: "Retina Diagnosis" }],
      doctorRoles: ["Retina Specialist", "Ophthalmologist"],
    },
    {
      id: "TOPO",
      name: "Corneal Topography",
      category: "Diagnostic Equipment",
      description:
        "Maps corneal shape to evaluate candidacy and plan refractive procedures.",
      benefits: ["Accuracy", "Safety"],
      usedFor: ["LASIK Candidacy", "Astigmatism Planning"],
      overview:
        "Creates a detailed map of corneal curvature to detect irregularities and refine procedure planning.",
      howItWorks:
        "A camera captures reflections from the cornea to compute curvature and detect patterns relevant to refractive safety checks.",
      vsTraditional: [
        { left: "Limited curvature assessment", right: "Full corneal mapping" },
        {
          left: "More guesswork in planning",
          right: "More personalized treatment planning",
        },
      ],
      safety: [
        "Non-contact imaging",
        "Standard calibration",
        "Cross-check with full diagnostics",
      ],
      media: { image: "/assets/tech-topography.jpg" }, // optional
      featured: false,
      serviceMap: [
        { tech: "Corneal Topography", service: "Vision Correction Planning" },
      ],
      doctorRoles: ["Refractive Surgeon", "Ophthalmologist"],
    },
    {
      id: "AUTOREF",
      name: "Auto Refractometer",
      category: "Vision Testing Tools",
      description:
        "Quick objective measurement to support refraction and baseline screening.",
      benefits: ["Speed"],
      usedFor: ["Eye Checkup", "Vision Testing"],
      overview:
        "A fast measurement tool used to estimate refractive error as part of a broader exam (not a replacement for full refraction).",
      howItWorks:
        "The device analyzes how light changes as it enters the eye to estimate prescription values.",
      vsTraditional: [
        {
          left: "Only subjective refraction",
          right: "Objective baseline + subjective refinement",
        },
      ],
      safety: [
        "Non-invasive",
        "Quick screening",
        "Used alongside clinician-led exam",
      ],
      media: { image: "/assets/tech-autoref.jpg" }, // optional
      featured: false,
      serviceMap: [
        { tech: "Auto Refractometer", service: "General Eye Checkup" },
      ],
      doctorRoles: ["Optometrist", "Ophthalmologist"],
    },
  ];

  const technologies = useMemo(() => defaultTechnologies, []);
  const featuredTechnologies = useMemo(
    () => technologies.filter((t) => t.featured).slice(0, 3),
    [technologies],
  );

  // -------------------------------------------------------
  // Sticky category navigation + smooth scroll
  // -------------------------------------------------------
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTech, setActiveTech] = useState(null);

  // ✅ NEW: when user selects a category (not "All"), show ONLY the inventory cards
  const isFilteringByCategory = useMemo(
    () => activeCategory !== "All",
    [activeCategory],
  );

  const refs = {
    featured: useRef(null),
    inventory: useRef(null),
    mapping: useRef(null),
    why: useRef(null),
    compare: useRef(null),
    integration: useRef(null),
    certifications: useRef(null),
    experience: useRef(null),
    media: useRef(null),
    faq: useRef(null),
    cta: useRef(null),
  };

  const scrollTo = (key) =>
    refs[key]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const filteredTechnologies = useMemo(() => {
    if (activeCategory === "All") return technologies;
    return technologies.filter((t) => t.category === activeCategory);
  }, [technologies, activeCategory]);

  // Lazy loading
  const [showHeavy, setShowHeavy] = useState(false);
  useEffect(() => {
    const el = document.getElementById("tech-sentinel");
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShowHeavy(true);
          io.disconnect();
        }
      },
      { rootMargin: "220px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Doctors mapping (best-effort)
  const doctorList = Array.isArray(doctors) ? doctors : [];
  const doctorsForTech = (tech) => {
    if (!tech) return [];
    const roles = tech.doctorRoles || [];
    const matched =
      doctorList.filter((d) => {
        const role = (d.role || "").toLowerCase();
        return roles.some((r) => role.includes(String(r).toLowerCase()));
      }) ?? [];
    return (matched.length ? matched : doctorList).slice(0, 3);
  };

  const whatsappHref = useMemo(() => {
    const cleaned = WHATSAPP_NUMBER.replace(/[^\d+]/g, "");
    const wa = cleaned.startsWith("+") ? cleaned.slice(1) : cleaned;
    return `https://wa.me/${wa}`;
  }, [WHATSAPP_NUMBER]);

  // FAQ (technology-focused)
  const techFaq = [
    {
      question: "Is laser surgery safe?",
      answer:
        "Safety depends on candidacy and screening. Advanced technology improves precision, but the key is proper evaluation and specialist-led planning.",
    },
    {
      question: "Does technology reduce pain?",
      answer:
        "Modern diagnostics are typically non-invasive. For procedures, technology can improve speed and predictability, which often improves comfort and recovery.",
    },
    {
      question: "How accurate are results?",
      answer:
        "Accuracy is improved by high-resolution imaging and measurement, but results vary by condition, eye anatomy, and adherence to follow-up care.",
    },
  ];

  return (
    <main style={s.main}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .hover-card:hover {
          transform: translateY(-6px);
          border-color: rgba(14,165,233,0.35) !important;
          box-shadow: ${theme.shadowHover} !important;
        }
        .hover-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(115deg, transparent 10%, rgba(14,165,233,0.10) 50%, transparent 90%);
          transform: translateX(-120%);
          transition: transform 780ms ease;
        }
        .hover-card:hover::before { transform: translateX(120%); }

        .button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          padding: 0 24px;
          border-radius: 999px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 220ms ease, border-color 220ms ease, background 220ms ease, box-shadow 220ms ease;
          border: 1px solid transparent;
          cursor: pointer;
          white-space: nowrap;
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

        .sticky-tech-nav {
          position: sticky;
          top: 12px;
          z-index: 50;
          border-radius: 22px;
          border: 1px solid ${theme.border};
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(18px);
          box-shadow: 0 16px 48px rgba(2, 8, 23, 0.10);
          padding: 12px;
        }

        .tabs {
          display: flex;
          gap: 10px;
          overflow: auto;
          padding-bottom: 6px;
          scrollbar-width: none;
        }
        .tabs::-webkit-scrollbar { display: none; }

        .tab {
          flex: 0 0 auto;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid ${theme.border};
          background: #fff;
          color: ${theme.navyMid};
          font-weight: 800;
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
        }
        .tab:hover { transform: translateY(-1px); border-color: rgba(14,165,233,0.35); background: ${theme.skyLight}; }
        .tab-active { border-color: rgba(14,165,233,0.45); background: ${theme.skyLight}; color: ${theme.skyHover}; }

        .grid-4 { display: grid; gap: 20px; grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .grid-3 { display: grid; gap: 20px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .grid-2 { display: grid; gap: 20px; grid-template-columns: repeat(2, minmax(0, 1fr)); }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(2, 8, 23, 0.60);
          display: grid;
          place-items: center;
          padding: 18px;
        }
        .modal {
          width: min(1020px, 100%);
          border-radius: 28px;
          border: 1px solid ${theme.border};
          background: #fff;
          box-shadow: 0 30px 100px rgba(2,8,23,0.25);
          overflow: hidden;
        }
        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          padding: 18px 18px 0;
        }
        .modal-body {
          padding: 18px;
          display: grid;
          gap: 14px;
        }
        .compare-table {
          width: 100%;
          border-collapse: collapse;
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid ${theme.border};
          background: ${theme.bg};
        }
        .compare-table th, .compare-table td {
          padding: 12px 12px;
          border-bottom: 1px solid ${theme.border};
          color: ${theme.navyMid};
          vertical-align: top;
        }
        .compare-table th {
          text-align: left;
          font-weight: 900;
          background: ${theme.borderLight};
          color: ${theme.navy};
        }

        @media (max-width: 1180px) {
          .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr !important; }
          .signal-grid { grid-template-columns: 1fr 1fr !important; }
          .cta-banner { flex-direction: column; align-items: flex-start !important; }
          .floating-cta { left: 16px; right: 16px; }
          .floating-cta .button { width: 100%; }
        }
        @media (max-width: 820px) {
          .signal-grid { grid-template-columns: 1fr !important; }
          .cta-actions { flex-direction: column; width: 100%; }
          .button { width: 100%; }
        }
      `}</style>

      {/* ✅ Enhanced hero section */}
      <section style={s.hero}>
        <div
          style={{
            position: "absolute",
            top: "-90px",
            right: "-90px",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "rgba(14,165,233,0.08)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-70px",
            left: "-70px",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(14,165,233,0.06)",
            pointerEvents: "none",
          }}
        />

        <div style={s.shell}>
          <div style={s.eyebrow}>Technology</div>
          <h1 style={s.h1}>
            Advanced{" "}
            <em style={{ color: theme.sky, fontStyle: "italic" }}>Equipment</em>
            .
          </h1>
          <p style={{ ...s.p, fontSize: "1.1rem", marginTop: 18 }}>
            We use modern diagnostic and surgical systems to reduce uncertainty,
            improve precision, and guide recovery with confidence.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "22px",
              justifyContent: "center",
            }}
            className="cta-actions"
          >
            <Link className="button button-primary" to="/appointment">
              Book Diagnostics
            </Link>
            <Link className="button button-secondary" to="/services">
              Explore Services
            </Link>
            <button
              className="button button-ghost"
              type="button"
              onClick={() => scrollTo("inventory")}
            >
              View Inventory
            </button>
          </div>

          {/* Signals */}
          <div className="signal-grid" style={s.signalGrid}>
            {technologySignals.map((x) => (
              <div key={x.label} className="hover-card" style={s.statCard}>
                <div
                  style={{
                    color: theme.slate,
                    fontWeight: 700,
                    fontSize: "0.88rem",
                  }}
                >
                  {x.label}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.6rem",
                    color: theme.skyHover,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {x.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Hide all other sections when a category is selected (not "All") */}
      {!isFilteringByCategory && (
        <>
          {/* Technology Overview */}
          <AnimatedSection style={s.sectionBand}>
            <div style={{ ...s.sectionShell, marginTop: "60px" }}>
              <div style={s.sectionHead}>
                <p style={s.eyebrow}>Technology Overview</p>
                <h2 style={s.h2}>World-class diagnostic technology.</h2>
                <p style={s.p}>
                  Advanced equipment matters when it reduces uncertainty,
                  improves precision, and helps patients recover with
                  confidence.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </>
      )}

      {/* Technology Categories (Navigation) - always visible */}
      <AnimatedSection style={{ ...s.sectionBand, paddingTop: 0 }}>
        <div style={{ ...s.sectionShell, marginTop: "40px" }}>
          <div className="sticky-tech-nav">
            <div style={{ display: "grid", gap: "10px" }}>
              <div
                className="tabs"
                style={{ justifyContent: "center" }}
                role="tablist"
                aria-label="Technology categories"
              >
                {["All", ...TECH_CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`tab ${activeCategory === cat ? "tab-active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ✅ Featured Technologies hidden when filtering */}
      {!isFilteringByCategory && (
        <AnimatedSection style={s.sectionBand}>
          <div
            style={{ ...s.sectionShell, marginTop: "70px" }}
            ref={refs.featured}
          >
            <div style={s.sectionHead}>
              <p style={s.eyebrow}>Featured Technologies</p>
              <h2 style={s.h2}>Premium tools that differentiate the clinic.</h2>
              <p style={s.p}>
                Clear benefits + used-for mapping + quick conversion CTA.
              </p>
            </div>

            <div style={{ display: "grid", gap: "20px", marginTop: "32px" }}>
              {featuredTechnologies.map((t, idx) => (
                <article
                  key={t.id}
                  className="hover-card"
                  style={{
                    ...s.card,
                    padding: "26px",
                    borderTop: `3px solid ${theme.sky}`,
                    background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                  }}
                >
                  <div className="grid-2" style={{ alignItems: "start" }}>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "10px",
                        }}
                      >
                        <span style={s.cardCode}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span style={s.tag}>Featured</span>
                      </div>

                      <h3
                        style={{
                          ...s.h2,
                          fontSize: "2.1rem",
                          marginTop: "14px",
                        }}
                      >
                        {t.name}
                      </h3>
                      <p style={{ ...s.p, marginTop: "10px" }}>
                        {t.description}
                      </p>

                      <div style={{ marginTop: "14px" }}>
                        <div style={{ fontWeight: 900, color: theme.navy }}>
                          Key benefits
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                            marginTop: "10px",
                          }}
                        >
                          {(t.benefits || []).map((b) => (
                            <span key={b} style={s.pill}>
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginTop: "14px" }}>
                        <div style={{ fontWeight: 900, color: theme.navy }}>
                          Used for
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                            marginTop: "10px",
                          }}
                        >
                          {(t.usedFor || []).map((u) => (
                            <span key={u} style={s.pill}>
                              {u}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                          marginTop: "18px",
                        }}
                      >
                        <button
                          className="button button-secondary"
                          type="button"
                          onClick={() => setActiveTech(t)}
                          style={{ minHeight: "46px" }}
                        >
                          Learn More
                        </button>
                        <Link
                          className="button button-primary"
                          to="/appointment"
                          style={{ minHeight: "46px" }}
                        >
                          Book Procedure
                        </Link>
                      </div>
                    </div>

                    <div style={{ display: "grid", gap: "12px" }}>
                      <div
                        style={{
                          borderRadius: theme.radiusLG,
                          border: `1px solid ${theme.border}`,
                          background: `radial-gradient(circle at 40% 20%, rgba(14,165,233,0.12), transparent 42%), ${theme.bg}`,
                          overflow: "hidden",
                          minHeight: "320px",
                        }}
                      >
                        {t.media?.image ? (
                          <img
                            src={t.media.image}
                            alt={t.name}
                            loading="lazy"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              height: "100%",
                              display: "grid",
                              placeItems: "center",
                              color: theme.slate,
                              padding: 18,
                            }}
                          >
                            Image / video placeholder
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span style={s.tag}>{t.category}</span>
                        <span style={s.tag}>Safety-first</span>
                        <span style={s.tag}>Clinician-led</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Inventory sentinel (only needed for heavy sections; hide during filtering) */}
      {!isFilteringByCategory && (
        <div id="tech-sentinel" style={{ height: 1 }} />
      )}

      {/* Full Inventory (always visible; becomes the "only cards" view during filtering) */}
      <AnimatedSection style={{ ...s.sectionBand, background: "#fff" }}>
        <div
          style={{ ...s.sectionShell, marginTop: "100px" }}
          ref={refs.inventory}
        >
          <div style={s.sectionHead}>
            <p style={s.eyebrow}>Full Inventory</p>
            <h2 style={s.h2}>Transparency builds trust.</h2>
            <p style={s.p}>Browse all equipment by category.</p>
          </div>

          <div className="grid-4" style={{ marginTop: "32px" }}>
            {filteredTechnologies.map((t) => (
              <article
                key={t.id}
                className="hover-card"
                style={{ ...s.card, padding: "20px" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <span style={s.cardCode}>{t.id}</span>
                  <span style={s.tag}>{t.category}</span>
                </div>
                <h3 style={{ ...s.h2, fontSize: "1.1rem", marginTop: "12px" }}>
                  {t.name}
                </h3>
                <p style={{ ...s.p, marginTop: "10px" }}>{t.description}</p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginTop: "14px",
                  }}
                >
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={() => setActiveTech(t)}
                    style={{ minHeight: "46px" }}
                  >
                    View Details
                  </button>
                  <Link
                    className="button button-primary"
                    to="/appointment"
                    style={{ minHeight: "46px" }}
                  >
                    Book
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Technology Detail Modal (keep working during filtering) */}
      {activeTech && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeTech.name} details`}
          onClick={() => setActiveTech(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div style={s.eyebrow}>{activeTech.category}</div>
                <h3 style={{ ...s.h2, fontSize: "2.2rem" }}>
                  {activeTech.name}
                </h3>
                <p style={{ ...s.p, marginTop: "10px" }}>
                  {activeTech.description}
                </p>
              </div>
              <button
                className="button button-ghost"
                type="button"
                onClick={() => setActiveTech(null)}
                style={{ minHeight: "44px" }}
              >
                Close
              </button>
            </div>

            <div className="modal-body">
              <div className="grid-2">
                <div style={{ ...s.card, padding: "18px", boxShadow: "none" }}>
                  <div style={{ color: theme.navy, fontWeight: 900 }}>
                    Overview
                  </div>
                  <p style={{ ...s.p, marginTop: "10px" }}>
                    {activeTech.overview}
                  </p>
                </div>
                <div style={{ ...s.card, padding: "18px", boxShadow: "none" }}>
                  <div style={{ color: theme.navy, fontWeight: 900 }}>
                    How it works
                  </div>
                  <p style={{ ...s.p, marginTop: "10px" }}>
                    {activeTech.howItWorks}
                  </p>
                </div>
              </div>

              <div style={{ ...s.card, padding: "18px", boxShadow: "none" }}>
                <div style={{ color: theme.navy, fontWeight: 900 }}>
                  Benefits vs traditional methods
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginTop: "12px",
                  }}
                >
                  {(activeTech.benefits || []).map((b) => (
                    <span key={b} style={s.pill}>
                      {b}
                    </span>
                  ))}
                </div>

                <div style={{ marginTop: "14px" }}>
                  <table className="compare-table">
                    <thead>
                      <tr>
                        <th>Traditional</th>
                        <th>Advanced technology</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(activeTech.vsTraditional || []).map((row, i) => (
                        <tr key={i}>
                          <td style={{ color: theme.slate }}>{row.left}</td>
                          <td style={{ color: theme.navyMid }}>{row.right}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid-2">
                <div style={{ ...s.card, padding: "18px", boxShadow: "none" }}>
                  <div style={{ color: theme.navy, fontWeight: 900 }}>
                    Safety standards
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gap: "10px",
                      marginTop: "12px",
                      color: theme.slate,
                    }}
                  >
                    {(activeTech.safety || []).map((x) => (
                      <div
                        key={x}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 16,
                          border: `1px solid ${theme.border}`,
                          background: theme.bg,
                        }}
                      >
                        {x}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ ...s.card, padding: "18px", boxShadow: "none" }}>
                  <div style={{ color: theme.navy, fontWeight: 900 }}>
                    Used in which procedures
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      marginTop: "12px",
                    }}
                  >
                    {(activeTech.usedFor || []).map((u) => (
                      <span key={u} style={s.pill}>
                        {u}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      marginTop: "16px",
                    }}
                  >
                    <Link
                      className="button button-primary"
                      to="/appointment"
                      style={{ minHeight: "46px" }}
                    >
                      Book Appointment
                    </Link>
                    <Link
                      className="button button-secondary"
                      to="/services"
                      style={{ minHeight: "46px" }}
                    >
                      Explore Services
                    </Link>
                  </div>
                </div>
              </div>

              <div style={{ ...s.card, padding: "18px", boxShadow: "none" }}>
                <div style={{ color: theme.navy, fontWeight: 900 }}>
                  Visuals (optional)
                </div>
                <p style={{ ...s.p, marginTop: "10px" }}>
                  Add diagrams / short videos here when available. For now, this
                  block keeps the layout ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Hide ALL below-inventory sections when filtering by category */}
      {!isFilteringByCategory && (
        <>
          {/* Procedure Mapping */}
          {showHeavy && (
            <AnimatedSection style={s.sectionBand}>
              <div
                style={{ ...s.sectionShell, marginTop: "100px" }}
                ref={refs.mapping}
              >
                <div style={s.sectionHead}>
                  <p style={s.eyebrow}>Technology → Procedure</p>
                  <h2 style={s.h2}>Connect machines to outcomes.</h2>
                  <p style={s.p}>
                    Helps non-technical users understand why a machine matters.
                  </p>
                </div>

                <div className="grid-2" style={{ marginTop: "32px" }}>
                  {technologies.slice(0, 4).map((t) => (
                    <article
                      key={t.id}
                      className="hover-card"
                      style={{ ...s.card, padding: "22px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "10px",
                        }}
                      >
                        <h3 style={{ ...s.h2, fontSize: "1.5rem" }}>
                          {t.name}
                        </h3>
                        <span style={s.tag}>{t.category}</span>
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gap: "10px",
                          marginTop: "12px",
                        }}
                      >
                        {(t.serviceMap || []).map((m, idx) => (
                          <div
                            key={`${m.tech}-${idx}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "12px",
                              padding: "12px",
                              borderRadius: 18,
                              border: `1px solid ${theme.border}`,
                              background: theme.bg,
                            }}
                          >
                            <span style={{ color: theme.slate }}>{m.tech}</span>
                            <span
                              style={{ color: theme.skyHover, fontWeight: 900 }}
                            >
                              →
                            </span>
                            <span
                              style={{ color: theme.navy, fontWeight: 900 }}
                            >
                              {m.service}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                          marginTop: "16px",
                        }}
                      >
                        <button
                          className="button button-secondary"
                          type="button"
                          onClick={() => setActiveTech(t)}
                          style={{ minHeight: "46px" }}
                        >
                          View Details
                        </button>
                        <Link
                          className="button button-primary"
                          to="/services"
                          style={{ minHeight: "46px" }}
                        >
                          Related Services
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Why Technology Matters */}
          {showHeavy && (
            <AnimatedSection style={{ ...s.sectionBand, background: "#fff" }}>
              <div
                style={{ ...s.sectionShell, marginTop: "100px" }}
                ref={refs.why}
              >
                <div style={s.sectionHead}>
                  <p style={s.eyebrow}>Why Technology Matters</p>
                  <h2 style={s.h2}>Simple explanation.</h2>
                  <p style={s.p}>
                    Advanced machines improve results, reduce risk, and speed up
                    recovery planning.
                  </p>
                </div>

                <div className="grid-3" style={{ marginTop: "32px" }}>
                  {patientBenefits.map((b) => (
                    <article
                      key={b.title}
                      className="hover-card"
                      style={{ ...s.card, padding: "22px" }}
                    >
                      <h3 style={{ ...s.h2, fontSize: "1.4rem" }}>{b.title}</h3>
                      <p style={s.p}>{b.copy}</p>
                    </article>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Comparison */}
          {showHeavy && (
            <AnimatedSection style={s.sectionBand}>
              <div
                style={{ ...s.sectionShell, marginTop: "100px" }}
                ref={refs.compare}
              >
                <div style={s.sectionHead}>
                  <p style={s.eyebrow}>Comparison</p>
                  <h2 style={s.h2}>
                    Why premium technology justifies premium care.
                  </h2>
                  <p style={s.p}>
                    A direct comparison helps users understand value (and
                    pricing).
                  </p>
                </div>

                <div
                  style={{ ...s.card, marginTop: "32px", padding: "18px" }}
                  className="hover-card"
                >
                  <table className="compare-table">
                    <thead>
                      <tr>
                        <th>Traditional method</th>
                        <th>Advanced technology</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ color: theme.slate }}>Manual surgery</td>
                        <td style={{ color: theme.navyMid }}>
                          Laser-assisted planning & precision systems
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: theme.slate }}>
                          Longer recovery uncertainty
                        </td>
                        <td style={{ color: theme.navyMid }}>
                          Faster healing guidance with structured aftercare
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: theme.slate }}>Less precision</td>
                        <td style={{ color: theme.navyMid }}>
                          High accuracy from imaging + measurement
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: theme.slate }}>More “guesswork”</td>
                        <td style={{ color: theme.navyMid }}>
                          More measurable decision-making
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Doctors + Technology */}
          {showHeavy && (
            <AnimatedSection style={{ ...s.sectionBand, background: "#fff" }}>
              <div
                style={{ ...s.sectionShell, marginTop: "100px" }}
                ref={refs.integration}
              >
                <div style={s.sectionHead}>
                  <p style={s.eyebrow}>Doctors + Technology</p>
                  <h2 style={s.h2}>Human expertise + machine precision.</h2>
                  <p style={s.p}>
                    Trust increases when users see who operates and interprets
                    the tools.
                  </p>
                </div>

                <div className="grid-2" style={{ marginTop: "32px" }}>
                  {featuredTechnologies.map((t) => (
                    <article
                      key={t.id}
                      className="hover-card"
                      style={{ ...s.card, padding: "22px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "10px",
                        }}
                      >
                        <h3 style={{ ...s.h2, fontSize: "1.5rem" }}>
                          {t.name}
                        </h3>
                        <button
                          className="button button-ghost"
                          type="button"
                          onClick={() => setActiveTech(t)}
                          style={{ minHeight: "46px" }}
                        >
                          Details
                        </button>
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gap: "12px",
                          marginTop: "16px",
                        }}
                      >
                        {doctorsForTech(t).map((d, idx) => (
                          <div
                            key={`${d.name}-${idx}`}
                            style={{
                              padding: "14px",
                              borderRadius: "18px",
                              border: `1px solid ${theme.border}`,
                              background: theme.bg,
                              display: "grid",
                              gridTemplateColumns: "auto 1fr auto",
                              gap: "12px",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: 54,
                                height: 54,
                                borderRadius: 18,
                                display: "grid",
                                placeItems: "center",
                                fontWeight: 900,
                                color: "#fff",
                                background: `linear-gradient(135deg, ${theme.sky}, ${theme.skyMid})`,
                                boxShadow: "0 10px 24px rgba(14,165,233,0.22)",
                              }}
                            >
                              {d.initials || "DR"}
                            </div>

                            <div>
                              <div
                                style={{ fontWeight: 900, color: theme.navy }}
                              >
                                {d.name || "Specialist Doctor"}
                              </div>
                              <div style={{ color: theme.slate, marginTop: 4 }}>
                                {d.role || "Ophthalmologist"}
                              </div>
                            </div>

                            <Link
                              to="/appointment"
                              className="button button-primary"
                              style={{ minHeight: "44px", padding: "0 14px" }}
                            >
                              Consult
                            </Link>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Certifications */}
          {showHeavy && (
            <AnimatedSection style={s.sectionBand}>
              <div
                style={{ ...s.sectionShell, marginTop: "100px" }}
                ref={refs.certifications}
              >
                <div style={s.sectionHead}>
                  <p style={s.eyebrow}>Certifications</p>
                  <h2 style={s.h2}>Standards that build authority.</h2>
                  <p style={s.p}>
                    Show compliance clearly to reduce hesitation.
                  </p>
                </div>

                <div className="grid-3" style={{ marginTop: "32px" }}>
                  {[
                    {
                      id: "01",
                      title: "ISO Certifications",
                      copy: "Quality management practices supporting consistent patient care.",
                    },
                    {
                      id: "02",
                      title: "Medical Compliance",
                      copy: "Protocols aligned to safety and privacy expectations for clinical workflows.",
                    },
                    {
                      id: "03",
                      title: "Equipment Approvals",
                      copy: "Use of approved systems with calibration and maintenance protocols.",
                    },
                  ].map((x) => (
                    <article
                      key={x.id}
                      className="hover-card"
                      style={{ ...s.card, padding: "22px" }}
                    >
                      <span style={s.cardCode}>{x.id}</span>
                      <h3
                        style={{
                          ...s.h2,
                          fontSize: "1.4rem",
                          marginTop: "12px",
                        }}
                      >
                        {x.title}
                      </h3>
                      <p style={s.p}>{x.copy}</p>
                    </article>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Patient Experience */}
          {showHeavy && (
            <AnimatedSection style={{ ...s.sectionBand, background: "#fff" }}>
              <div
                style={{ ...s.sectionShell, marginTop: "100px" }}
                ref={refs.experience}
              >
                <div style={s.sectionHead}>
                  <p style={s.eyebrow}>Patient Experience</p>
                  <h2 style={s.h2}>What to expect during treatment.</h2>
                  <p style={s.p}>
                    Diagnosis → Procedure → Recovery, explained in calm, simple
                    steps.
                  </p>
                </div>

                <div
                  style={{ display: "grid", gap: "14px", marginTop: "32px" }}
                >
                  {[
                    {
                      step: "01",
                      title: "Diagnosis",
                      copy: "High-quality scanning + clinician interpretation with clear explanation.",
                    },
                    {
                      step: "02",
                      title: "Procedure",
                      copy: "Technology-supported precision with safety-first protocols.",
                    },
                    {
                      step: "03",
                      title: "Recovery",
                      copy: "Aftercare mapping + follow-ups to keep progress visible and calm.",
                    },
                  ].map((x) => (
                    <article
                      key={x.step}
                      className="hover-card"
                      style={{
                        ...s.card,
                        padding: "20px 22px",
                        display: "grid",
                        gridTemplateColumns: "auto 1fr",
                        gap: "18px",
                      }}
                    >
                      <span style={s.cardCode}>{x.step}</span>
                      <div>
                        <h3
                          style={{
                            ...s.h2,
                            fontSize: "1.4rem",
                            marginBottom: 6,
                          }}
                        >
                          {x.title}
                        </h3>
                        <p style={{ ...s.p, margin: 0 }}>{x.copy}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Visual Media */}
          {showHeavy && (
            <AnimatedSection style={s.sectionBand}>
              <div
                style={{ ...s.sectionShell, marginTop: "100px" }}
                ref={refs.media}
              >
                <div style={s.sectionHead}>
                  <p style={s.eyebrow}>Visual Media</p>
                  <h2 style={s.h2}>Machines in action (video / diagrams).</h2>
                  <p style={s.p}>
                    Placeholders are included—replace with real clips when
                    available.
                  </p>
                </div>

                <div className="grid-3" style={{ marginTop: "32px" }}>
                  {[
                    {
                      id: "01",
                      title: "Machine in action",
                      copy: "Short clip showing scanning or calibration.",
                    },
                    {
                      id: "02",
                      title: "Procedure explanation",
                      copy: "Simple patient-friendly explainer video.",
                    },
                    {
                      id: "03",
                      title: "3D diagram / animation",
                      copy: "Shows anatomy and what changes with treatment.",
                    },
                  ].map((x) => (
                    <article
                      key={x.id}
                      className="hover-card"
                      style={{ ...s.card, padding: "22px" }}
                    >
                      <span style={s.cardCode}>{x.id}</span>
                      <h3
                        style={{
                          ...s.h2,
                          fontSize: "1.35rem",
                          marginTop: "12px",
                        }}
                      >
                        {x.title}
                      </h3>
                      <p style={s.p}>{x.copy}</p>
                      <div
                        style={{
                          marginTop: 14,
                          height: 180,
                          borderRadius: 18,
                          border: `1px solid ${theme.border}`,
                          background: theme.bg,
                          display: "grid",
                          placeItems: "center",
                          color: theme.slate,
                          fontWeight: 600,
                        }}
                      >
                        Video / Diagram placeholder
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* FAQ */}
          {showHeavy && (
            <AnimatedSection style={{ ...s.sectionBand, background: "#fff" }}>
              <div
                style={{ ...s.sectionShell, marginTop: "100px" }}
                ref={refs.faq}
              >
                <div style={s.sectionHead}>
                  <p style={s.eyebrow}>FAQ</p>
                  <h2 style={s.h2}>Questions before booking.</h2>
                  <p style={s.p}>
                    Short answers reduce hesitation and improve conversion.
                  </p>
                </div>

                <div className="grid-3" style={{ marginTop: "32px" }}>
                  {techFaq.map((x, idx) => (
                    <article
                      key={idx}
                      className="hover-card"
                      style={{ ...s.card, padding: "22px" }}
                    >
                      <h3 style={{ ...s.h2, fontSize: "1.3rem" }}>
                        {x.question}
                      </h3>
                      <p style={s.p}>{x.answer}</p>
                    </article>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Strong CTA */}
          <AnimatedSection style={{ ...s.sectionBand, marginBottom: "60px" }}>
            <div
              style={{ ...s.sectionShell, marginTop: "100px" }}
              ref={refs.cta}
            >
              <div style={s.ctaBanner} className="cta-banner">
                <div style={{ maxWidth: "720px" }}>
                  <p
                    style={{
                      ...s.eyebrow,
                      background: "rgba(14,165,233,0.18)",
                      color: theme.skyMid,
                    }}
                  >
                    Conversion
                  </p>
                  <h3 style={{ ...s.h2, color: "#fff" }}>
                    Experience advanced eye care
                  </h3>
                  <p style={{ ...s.p, color: "rgba(255,255,255,0.75)" }}>
                    Book an appointment or talk to a specialist to confirm the
                    best next step.
                  </p>
                </div>
                <div
                  style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
                  className="cta-actions"
                >
                  <Link className="button button-primary" to="/appointment">
                    Book Appointment
                  </Link>
                  <a
                    className="button button-ghost"
                    href={`tel:${PRIMARY_PHONE}`}
                    style={{
                      color: "#fff",
                      borderColor: "rgba(255,255,255,0.25)",
                      background: "rgba(255,255,255,0.10)",
                    }}
                  >
                    Talk to Specialist
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </>
      )}
    </main>
  );
}
