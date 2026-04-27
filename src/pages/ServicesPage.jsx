import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";

import { servicesPage, doctors } from "../data/siteContent";

const patientNeeds = [
  {
    title: "First-time vision concern",
    copy: "Best matched to comprehensive exams, digital triage, and specialist referral when needed.",
  },
  {
    title: "Ready for refractive freedom",
    copy: "High-intent route for LASIK, SMILE, and premium correction planning with clearer candidacy support.",
  },
  {
    title: "Lens or cataract decision",
    copy: "A calmer explanation-led path for surgery preparation, family questions, and aftercare planning.",
  },
  {
    title: "Long-term chronic monitoring",
    copy: "Built for retina, glaucoma, and diabetic eye review with more continuity and repeat-visit clarity.",
  },
];

const servicePlans = [
  {
    title: "Precision Checkup",
    detail: "Screening focus",
    copy: "For annual exams, symptom review, digital eye strain, and early-stage concern mapping.",
  },
  {
    title: "Surgery Pathway",
    detail: "High-trust decision flow",
    copy: "For refractive or cataract patients who need candidacy, procedure planning, and recovery visibility.",
  },
  {
    title: "Monitoring Pathway",
    detail: "Repeat-care continuity",
    copy: "For glaucoma, retina, diabetic eye care, and structured follow-up over time.",
  },
];

export default function ServicesPage() {
  const WHATSAPP_NUMBER = "+92 347 7552842";
  const PRIMARY_PHONE = "+92 347 7552842";

  // ✅ HomePage-aligned theme (sky / navy / slate / light)
  const theme = {
    sky: "#0ea5e9",
    skyHover: "#0284c7",
    skyMid: "#38bdf8",
    skyLight: "#e0f2fe",
    bg: "#f8fafc",
    bgAlt: "#ffffff",
    navy: "#1a2e44",
    navyMid: "#2d4a6b",
    slate: "#64748b",
    border: "#e2e8f0",
    borderLight: "#f1f5f9",
    white: "#ffffff",
    radius: "20px",
    radiusLG: "28px",
    shadow: "0 4px 24px rgba(14,165,233,0.08), 0 1px 4px rgba(0,0,0,0.06)",
    shadowHover:
      "0 12px 40px rgba(14,165,233,0.15), 0 2px 8px rgba(0,0,0,0.08)",
    container: "min(1440px, calc(100% - 32px))",
  };

  const s = {
    main: {
      fontFamily: "'Inter', system-ui, sans-serif",
      background: theme.bg,
      color: theme.navy,
      position: "relative",
      zIndex: 1,
      paddingBottom: "120px",
    },

    sectionBand: { width: "100%", padding: "64px 0" },
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
      padding: "6px 14px",
      borderRadius: "999px",
      background: theme.skyLight,
      color: theme.sky,
      fontSize: "0.78rem",
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      margin: "0 0 16px",
    },

    h2: {
      fontFamily: "'DM Serif Display', serif",
      fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
      color: theme.navy,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
      margin: 0,
    },

    p: {
      color: theme.slate,
      lineHeight: 1.72,
      margin: "14px 0 0",
      maxWidth: "66ch",
      fontSize: "1.02rem",
    },

    // Cards (white + soft shadow like HomePage)
    card: {
      position: "relative",
      overflow: "hidden",
      border: `1px solid ${theme.border}`,
      background: theme.white,
      boxShadow: theme.shadow,
      padding: "24px",
      borderRadius: theme.radius,
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
      padding: "36px",
      borderRadius: theme.radiusLG,
      background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyMid} 100%)`,
      border: `1px solid rgba(255,255,255,0.12)`,
      boxShadow: "0 20px 60px rgba(0,0,0,0.14)",
    },
  };

  const SERVICE_CATEGORIES = [
    "Vision Correction",
    "Surgical Procedures",
    "Eye Diseases",
    "Pediatric Care",
    "General Eye Checkup",
  ];

  const defaultCatalog = [
    {
      id: "LASIK",
      title: "LASIK",
      description: "Laser vision correction to reduce dependence on glasses.",
      category: "Vision Correction",
      tags: ["Popular", "Advanced"],
      featured: true,
      benefits: [
        "Fast recovery",
        "High satisfaction",
        "Clearer day-to-day life",
      ],
      successRate: "95%+ satisfaction (typical candidates)",
      recovery: "1–7 days",
      cost: "Starting from —",
      faqs: [
        {
          q: "Is LASIK safe?",
          a: "For suitable candidates, LASIK is widely considered safe. A full screening is essential.",
        },
        {
          q: "How long is recovery?",
          a: "Most people return to normal activities within 1–2 days, with vision stabilizing over weeks.",
        },
      ],
      doctorRoles: ["Refractive Surgeon", "Ophthalmologist"],
    },
    {
      id: "CAT",
      title: "Cataract Surgery",
      description: "Lens replacement with clear vision planning and aftercare.",
      category: "Surgical Procedures",
      tags: ["Popular"],
      featured: true,
      benefits: [
        "Sharper vision",
        "Improved contrast",
        "Lens options for lifestyle",
      ],
      successRate: "Very high success in routine cases",
      recovery: "1–4 weeks",
      cost: "Starting from —",
      faqs: [
        {
          q: "How long does it take?",
          a: "Many cataract surgeries are completed within 15–30 minutes per eye.",
        },
        {
          q: "When can I see clearly?",
          a: "Many patients notice improvement within days; healing continues for weeks.",
        },
      ],
      doctorRoles: ["Cataract Surgeon", "Ophthalmologist"],
    },
    {
      id: "RET",
      title: "Retina Treatment",
      description:
        "Specialist retina evaluation, monitoring, and treatment support.",
      category: "Eye Diseases",
      tags: ["Advanced"],
      featured: true,
      benefits: [
        "Early detection",
        "Specialist monitoring",
        "Targeted treatment plans",
      ],
      successRate: "Varies by condition",
      recovery: "Varies",
      cost: "Starting from —",
      faqs: [
        {
          q: "Do I need ongoing visits?",
          a: "Retina conditions often require monitoring to protect long-term vision.",
        },
      ],
      doctorRoles: ["Retina Specialist", "Ophthalmologist"],
    },
    {
      id: "GLA",
      title: "Glaucoma Care",
      description:
        "Pressure management, optic nerve monitoring, and progression control.",
      category: "Eye Diseases",
      tags: ["Non-surgical"],
      featured: false,
      benefits: [
        "Structured monitoring",
        "Medication planning",
        "Long-term protection",
      ],
      successRate: "Strong control with consistent follow-up",
      recovery: "N/A",
      cost: "Starting from —",
      faqs: [
        {
          q: "Can glaucoma be cured?",
          a: "It’s typically managed, not cured—early detection matters.",
        },
      ],
      doctorRoles: ["Glaucoma Specialist", "Ophthalmologist"],
    },
    {
      id: "PED",
      title: "Pediatric Eye Care",
      description: "Gentle exams, myopia control, and family-focused care.",
      category: "Pediatric Care",
      tags: ["Non-surgical"],
      featured: false,
      benefits: [
        "Early detection",
        "Myopia management",
        "Child-friendly experience",
      ],
      successRate: "Strong outcomes with early support",
      recovery: "N/A",
      cost: "Starting from —",
      faqs: [
        {
          q: "When should kids get an eye exam?",
          a: "If you notice squinting or headaches—or as recommended by your clinician.",
        },
      ],
      doctorRoles: ["Pediatric Specialist", "Ophthalmologist"],
    },
    {
      id: "CHK",
      title: "Comprehensive Eye Checkup",
      description:
        "Full eye exam with modern diagnostics and clear next steps.",
      category: "General Eye Checkup",
      tags: ["Popular", "Non-surgical"],
      featured: false,
      benefits: [
        "Early detection",
        "Screening clarity",
        "Referral when needed",
      ],
      successRate: "N/A",
      recovery: "N/A",
      cost: "Starting from —",
      faqs: [
        {
          q: "How often should I get checked?",
          a: "Often annually, but frequency depends on age and risk factors.",
        },
      ],
      doctorRoles: ["Optometrist", "Ophthalmologist"],
    },
  ];

  const catalog = useMemo(() => {
    const fromLines =
      servicesPage?.serviceLines?.flatMap((line, idx) => {
        const treatments = Array.isArray(line.treatments)
          ? line.treatments
          : [];
        if (treatments.length === 0) return [];
        return treatments.slice(0, 6).map((t, i) => ({
          id: `${idx + 1}-${i + 1}-${String(t).replace(/\s+/g, "-").toLowerCase()}`,
          title: t,
          description:
            line.description?.slice(0, 120) ||
            "Specialist evaluation and treatment planning.",
          category: "General Eye Checkup",
          tags: ["Non-surgical"],
          featured: false,
          benefits: [
            "Clear evaluation",
            "Specialist guidance",
            "Next-step planning",
          ],
          successRate: "Varies",
          recovery: "Varies",
          cost: "Starting from —",
          faqs: [],
          doctorRoles: ["Ophthalmologist"],
        }));
      }) ?? [];

    const merged = [...defaultCatalog, ...fromLines];
    const seen = new Set();
    return merged.filter((x) => {
      const key = x.title.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeService, setActiveService] = useState(null);

  const [wizardStep, setWizardStep] = useState(1);
  const [wizard, setWizard] = useState({
    issue: "",
    duration: "",
    ageGroup: "",
  });

  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog
      .filter((s) =>
        activeCategory === "All" ? true : s.category === activeCategory,
      )
      .filter((s) => {
        if (!q) return true;
        const hay =
          `${s.title} ${s.description} ${(s.tags || []).join(" ")} ${s.category}`.toLowerCase();
        return hay.includes(q);
      });
  }, [catalog, query, activeCategory]);

  const featured = useMemo(
    () => catalog.filter((x) => x.featured).slice(0, 3),
    [catalog],
  );

  // ✅ NEW: detect when user is filtering (search OR category not All)
  const isFiltering = useMemo(() => {
    return query.trim().length > 0 || activeCategory !== "All";
  }, [query, activeCategory]);

  const refs = {
    featured: useRef(null),
    allServices: useRef(null),
    wizard: useRef(null),
    tech: useRef(null),
    mapping: useRef(null),
    stories: useRef(null),
    pricing: useRef(null),
    insurance: useRef(null),
    faq: useRef(null),
  };

  const scrollTo = (key) => {
    const el = refs[key]?.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [showHeavySections, setShowHeavySections] = useState(false);
  useEffect(() => {
    const sentinel = document.getElementById("services-sentinel");
    if (!sentinel) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShowHeavySections(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  const wizardSuggestion = useMemo(() => {
    const issue = wizard.issue;
    if (!issue) return null;

    const findBy = (needle) =>
      catalog.find((x) => x.title.toLowerCase().includes(needle)) || null;

    if (issue === "Blurred vision / glasses dependence") return findBy("lasik");
    if (issue === "Cloudy vision / cataract") return findBy("cataract");
    if (issue === "Flashes / floaters / retina concern")
      return findBy("retina");
    if (issue === "Pressure / glaucoma concern") return findBy("glaucoma");
    if (issue === "Child vision / myopia") return findBy("pediatric");

    return findBy("checkup");
  }, [wizard.issue, catalog]);

  const doctorList = Array.isArray(doctors) ? doctors : [];
  const doctorsForService = (service) => {
    if (!service) return [];
    const roles = service.doctorRoles || [];
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

  return (
    <main style={s.main}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .hover-card:hover {
          transform: translateY(-6px);
          box-shadow: ${theme.shadowHover};
          border-color: rgba(14,165,233,0.35) !important;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 50px;
          padding: 0 24px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.22s ease;
          white-space: nowrap;
          font-family: 'Inter', system-ui;
        }
        .btn:hover { transform: translateY(-2px); }

        .btn-primary { background: ${theme.sky}; color: #fff; box-shadow: 0 8px 24px rgba(14,165,233,0.32); }
        .btn-primary:hover { background: ${theme.skyHover}; box-shadow: 0 12px 32px rgba(14,165,233,0.40); }

        .btn-outline { background: #fff; color: ${theme.sky}; border: 1.5px solid ${theme.sky}; }
        .btn-outline:hover { background: ${theme.skyLight}; }

        .btn-ghost { background: rgba(255,255,255,0.7); color: ${theme.navy}; border: 1.5px solid ${theme.border}; }
        .btn-ghost:hover { background: #fff; }

        .btn-danger { background: rgba(239,68,68,0.10); color: #b91c1c; border: 1.5px solid rgba(239,68,68,0.25); }
        .btn-danger:hover { background: rgba(239,68,68,0.14); }

        .input {
          width: 100%;
          min-height: 48px;
          border-radius: 12px;
          border: 1.5px solid ${theme.border};
          background: ${theme.bg};
          color: ${theme.navy};
          padding: 0 14px;
          font-size: 0.95rem;
          outline: none;
          font-family: 'Inter', system-ui;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .input:focus {
          border-color: ${theme.sky};
          background: #fff;
          box-shadow: 0 0 0 4px rgba(14,165,233,0.10);
        }

        .sticky-nav {
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

        .tabs { display: flex; gap: 10px; overflow: auto; padding-bottom: 6px; scrollbar-width: none; }
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

        .grid-3 { display: grid; gap: 20px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .grid-2 { display: grid; gap: 20px; grid-template-columns: repeat(2, minmax(0, 1fr)); }

        .modal-backdrop {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(2, 8, 23, 0.60);
          display: grid; place-items: center;
          padding: 18px;
        }
        .modal {
          width: min(980px, 100%);
          border-radius: 28px;
          border: 1px solid ${theme.border};
          background: #fff;
          box-shadow: 0 30px 100px rgba(2, 8, 23, 0.25);
          overflow: hidden;
        }
        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          padding: 18px 18px 0;
        }
        .modal-body { padding: 18px; display: grid; gap: 14px; }

        .floating-cta {
          position: fixed;
          right: 16px;
          bottom: 16px;
          z-index: 60;
          display: grid;
          gap: 10px;
        }

        @media (max-width: 1180px) {
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .cta-banner { flex-direction: column; align-items: flex-start !important; }
          .floating-cta { left: 16px; right: 16px; grid-template-columns: 1fr; }
          .floating-cta .btn { width: 100%; }
        }
        @media (max-width: 820px) {
          .cta-actions { flex-direction: column; width: 100%; }
          .btn { width: 100%; }
        }
      `}</style>

      <section
        style={{
          padding: "80px 0 36px",
          background:
            "linear-gradient(150deg, #e0f2fe 0%, #f0f9ff 40%, #ffffff 100%)",
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <div style={{ width: theme.container, margin: "0 auto" }}>
          <div style={s.eyebrow}>Our Services</div>
          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(2.6rem, 4.2vw, 4.4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: 0,
              color: theme.navy,
            }}
          >
            Explore the{" "}
            <em style={{ color: theme.sky, fontStyle: "italic" }}>
              Treatments
            </em>
          </h1>
          <p style={{ ...s.p, fontSize: "1.1rem", marginTop: 18 }}>
            Search, filter and compare services — then book with confidence.
          </p>
        </div>
      </section>

      {/* Sticky Smart Service Navigation */}
      <AnimatedSection style={{ ...s.sectionBand, paddingTop: "28px" }}>
        <div style={s.sectionShell}>
          <div className="sticky-nav">
            <div style={{ display: "grid", gap: "10px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "10px",
                }}
              >
                <input
                  className="input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search treatment (e.g., LASIK, Cataract)"
                  aria-label="Search services"
                />
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setQuery("");
                    setActiveCategory("All");
                  }}
                  type="button"
                  style={{ minHeight: "48px", padding: "0 16px" }}
                >
                  Reset
                </button>
              </div>

              <div
                className="tabs"
                role="tablist"
                aria-label="Service categories"
                style={{ justifyContent: "center" }}
              >
                {["All", ...SERVICE_CATEGORIES].map((cat) => (
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

      {/* ✅ When filtering: show ONLY the related services cards (All Services grid) */}
      {!isFiltering && (
        <>
          {/* Featured */}
          <AnimatedSection style={s.sectionBand}>
            <div style={s.sectionShell} ref={refs.featured}>
              <div style={s.sectionHead}>
                <div style={{ ...s.eyebrow, marginTop: "40px" }}>
                  Featured Services
                </div>
                <h2 style={s.h2}>High Demand</h2>
                <p style={s.p}>
                  Benefits + quick actions, but in a calm light theme.
                </p>
              </div>

              <div className="grid-3" style={{ marginTop: "28px" }}>
                {featured.map((svc, idx) => (
                  <article
                    className="hover-card"
                    key={`${svc.id}-${idx}`}
                    style={{
                      ...s.card,
                      borderTop: `3px solid ${theme.sky}`,
                      background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                    }}
                  >
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
                      <span
                        style={{
                          ...s.tag,
                          background: theme.skyLight,
                          borderColor: "rgba(14,165,233,0.25)",
                          color: theme.skyHover,
                        }}
                      >
                        Featured
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "1.6rem",
                        margin: "14px 0 8px",
                        color: theme.navy,
                      }}
                    >
                      {svc.title}
                    </h3>
                    <p style={{ ...s.p, marginTop: 0, fontSize: "0.98rem" }}>
                      {svc.description}
                    </p>

                    <div
                      style={{
                        display: "grid",
                        gap: "10px",
                        marginTop: "14px",
                      }}
                    >
                      <div style={{ color: theme.navy, fontWeight: 800 }}>
                        Benefits
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                        }}
                      >
                        {(svc.benefits || []).slice(0, 3).map((b) => (
                          <span key={b} style={s.pill}>
                            {b}
                          </span>
                        ))}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span style={s.pill}>Success: {svc.successRate}</span>
                        <span style={s.pill}>Recovery: {svc.recovery}</span>
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
                        type="button"
                        className="btn btn-outline"
                        style={{ minHeight: "46px" }}
                        onClick={() => setActiveService(svc)}
                      >
                        Learn More
                      </button>
                      <Link
                        className="btn btn-primary"
                        style={{ minHeight: "46px" }}
                        to="/appointment"
                      >
                        Book Now
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </>
      )}

      {/* All Services (always visible) */}
      <AnimatedSection style={{ ...s.sectionBand, background: "#fff" }}>
        <div style={s.sectionShell} ref={refs.allServices}>
          <div style={s.sectionHead}>
            <div style={{ ...s.eyebrow, marginTop: "40px" }}>
              {isFiltering ? "Search Results" : "All Services"}
            </div>
            <h2 style={s.h2}>
              {isFiltering
                ? "Matching treatments."
                : "Browse every treatments."}
            </h2>
            <p style={s.p}>
              {isFiltering
                ? "Showing only services that match your search and selected category."
                : "Same interactions, smoother light UI."}
            </p>
          </div>

          <div className="grid-3" style={{ marginTop: "28px" }}>
            {filteredServices.map((svc) => (
              <article key={svc.id} className="hover-card" style={s.card}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "8px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        ...s.eyebrow,
                        margin: 0,
                        fontSize: "0.72rem",
                        padding: "6px 12px",
                      }}
                    >
                      {svc.category}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "1.35rem",
                        margin: "12px 0 6px",
                        color: theme.navy,
                      }}
                    >
                      {svc.title}
                    </h3>
                  </div>

                  <div
                    style={{ display: "grid", gap: "8px", justifyItems: "end" }}
                  >
                    {(svc.tags || []).slice(0, 2).map((t) => (
                      <span
                        key={t}
                        style={{
                          ...s.tag,
                          background:
                            t === "Popular"
                              ? theme.skyLight
                              : theme.borderLight,
                          borderColor:
                            t === "Popular"
                              ? "rgba(14,165,233,0.30)"
                              : theme.border,
                          color:
                            t === "Popular" ? theme.skyHover : theme.navyMid,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <p style={{ ...s.p, marginTop: "10px", fontSize: "0.98rem" }}>
                  {svc.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginTop: "16px",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-outline"
                    style={{ minHeight: "46px" }}
                    onClick={() => setActiveService(svc)}
                  >
                    Learn More
                  </button>
                  <Link
                    className="btn btn-primary"
                    style={{ minHeight: "46px" }}
                    to="/appointment"
                  >
                    Book Now
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div style={{ ...s.card, marginTop: "22px" }}>
              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.6rem",
                  margin: 0,
                  color: theme.navy,
                }}
              >
                No matches found.
              </h3>
              <p style={s.p}>
                Try a different search (example: “LASIK”, “Cataract”, “Retina”).
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Modal (kept - works during filtering too) */}
      {activeService && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeService.title} details`}
          onClick={() => setActiveService(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div style={s.eyebrow}>{activeService.category}</div>
                <h3 style={{ ...s.h2, fontSize: "2.2rem" }}>
                  {activeService.title}
                </h3>
                <p style={{ ...s.p, marginTop: 10 }}>
                  {activeService.description}
                </p>
              </div>
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => setActiveService(null)}
                style={{ minHeight: "44px" }}
              >
                Close
              </button>
            </div>

            <div className="modal-body">
              <div className="grid-2">
                <div style={{ ...s.card, padding: "18px", boxShadow: "none" }}>
                  <div style={{ color: theme.navy, fontWeight: 800 }}>
                    Overview
                  </div>
                  <p style={{ ...s.p, marginTop: 10 }}>
                    {activeService.overview ||
                      "This section can explain the condition/service in plain language, what it solves, and who it’s for."}
                  </p>
                </div>

                <div style={{ ...s.card, padding: "18px", boxShadow: "none" }}>
                  <div style={{ color: theme.navy, fontWeight: 800 }}>
                    Procedure & recovery
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      marginTop: "12px",
                    }}
                  >
                    <span style={s.pill}>
                      Success: {activeService.successRate || "Varies"}
                    </span>
                    <span style={s.pill}>
                      Recovery: {activeService.recovery || "Varies"}
                    </span>
                    <span style={s.pill}>
                      Cost: {activeService.cost || "—"}
                    </span>
                  </div>
                  <p style={{ ...s.p, marginTop: 12 }}>
                    {activeService.procedureSteps ||
                      "Add short steps here: screening → planning → procedure → aftercare. Keep it scannable to reduce drop-off."}
                  </p>
                </div>
              </div>

              <div className="grid-2">
                <div style={{ ...s.card, padding: "18px", boxShadow: "none" }}>
                  <div style={{ color: theme.navy, fontWeight: 800 }}>
                    Symptoms (example)
                  </div>
                  <ul
                    style={{
                      display: "grid",
                      gap: "10px",
                      margin: 0,
                      paddingLeft: 18,
                      color: theme.slate,
                    }}
                  >
                    {(
                      activeService.symptoms || [
                        "Blurred vision",
                        "Headaches / strain",
                        "Difficulty seeing at night",
                      ]
                    ).map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ ...s.card, padding: "18px", boxShadow: "none" }}>
                  <div style={{ color: theme.navy, fontWeight: 800 }}>
                    Risks & safety
                  </div>
                  <p style={{ ...s.p, marginTop: 10 }}>
                    {activeService.risks ||
                      "Every procedure has risks. This block should clearly explain screening, candidacy, and how risks are reduced."}
                  </p>
                </div>
              </div>

              <div style={{ ...s.card, padding: "18px", boxShadow: "none" }}>
                <div style={{ color: theme.navy, fontWeight: 800 }}>FAQs</div>
                <div
                  style={{ display: "grid", gap: "10px", marginTop: "12px" }}
                >
                  {(activeService.faqs?.length
                    ? activeService.faqs
                    : [
                        {
                          q: "How do I book?",
                          a: "Tap Book Appointment and choose a time.",
                        },
                      ]
                  ).map((x) => (
                    <div
                      key={x.q}
                      style={{
                        padding: "12px",
                        borderRadius: "16px",
                        border: `1px solid ${theme.border}`,
                        background: theme.bg,
                      }}
                    >
                      <div style={{ fontWeight: 800, color: theme.navy }}>
                        {x.q}
                      </div>
                      <div
                        style={{
                          color: theme.slate,
                          marginTop: "6px",
                          lineHeight: 1.7,
                        }}
                      >
                        {x.a}
                      </div>
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
                  <Link className="btn btn-primary" to="/appointment">
                    Book Appointment
                  </Link>
                  <button
                    className="btn btn-outline"
                    type="button"
                    onClick={() => scrollTo("mapping")}
                  >
                    See Specialists
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Hide everything below when filtering (Wizard + Sentinel + Final CTA) */}
      {!isFiltering && (
        <>
          {/* Wizard */}
          <AnimatedSection style={s.sectionBand}>
            <div style={s.sectionShell} ref={refs.wizard}>
              <div style={s.sectionHead}>
                <div style={{ ...s.eyebrow, marginTop: "40px" }}>
                  Treatment Wizard
                </div>
                <h2 style={s.h2}> Answer 3 quick steps.</h2>
                <p style={s.p}>Fast guidance, low friction booking.</p>
              </div>

              <div className="grid-2" style={{ marginTop: "28px" }}>
                <div className="hover-card" style={s.card}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <span style={s.cardCode}>
                      {String(wizardStep).padStart(2, "0")}
                    </span>
                    <span style={s.tag}>Step {wizardStep} of 3</span>
                  </div>

                  {wizardStep === 1 && (
                    <div style={{ marginTop: "14px" }}>
                      <div style={{ fontWeight: 800, color: theme.navy }}>
                        What issue are you facing?
                      </div>
                      <select
                        className="input"
                        style={{ marginTop: "10px" }}
                        value={wizard.issue}
                        onChange={(e) =>
                          setWizard((p) => ({ ...p, issue: e.target.value }))
                        }
                      >
                        <option value="">Choose…</option>
                        <option value="Blurred vision / glasses dependence">
                          Blurred vision / glasses dependence
                        </option>
                        <option value="Cloudy vision / cataract">
                          Cloudy vision / cataract
                        </option>
                        <option value="Flashes / floaters / retina concern">
                          Flashes / floaters / retina concern
                        </option>
                        <option value="Pressure / glaucoma concern">
                          Pressure / glaucoma concern
                        </option>
                        <option value="Child vision / myopia">
                          Child vision / myopia
                        </option>
                        <option value="General checkup">General checkup</option>
                      </select>
                    </div>
                  )}

                  {wizardStep === 2 && (
                    <div style={{ marginTop: "14px" }}>
                      <div style={{ fontWeight: 800, color: theme.navy }}>
                        How long has this been happening?
                      </div>
                      <select
                        className="input"
                        style={{ marginTop: "10px" }}
                        value={wizard.duration}
                        onChange={(e) =>
                          setWizard((p) => ({ ...p, duration: e.target.value }))
                        }
                      >
                        <option value="">Choose…</option>
                        <option value="Less than 1 week">
                          Less than 1 week
                        </option>
                        <option value="1–4 weeks">1–4 weeks</option>
                        <option value="1–6 months">1–6 months</option>
                        <option value="More than 6 months">
                          More than 6 months
                        </option>
                      </select>
                    </div>
                  )}

                  {wizardStep === 3 && (
                    <div style={{ marginTop: "14px" }}>
                      <div style={{ fontWeight: 800, color: theme.navy }}>
                        Age group
                      </div>
                      <select
                        className="input"
                        style={{ marginTop: "10px" }}
                        value={wizard.ageGroup}
                        onChange={(e) =>
                          setWizard((p) => ({ ...p, ageGroup: e.target.value }))
                        }
                      >
                        <option value="">Choose…</option>
                        <option value="Child (0–12)">Child (0–12)</option>
                        <option value="Teen (13–17)">Teen (13–17)</option>
                        <option value="Adult (18–45)">Adult (18–45)</option>
                        <option value="Adult (46–60)">Adult (46–60)</option>
                        <option value="Senior (60+)">Senior (60+)</option>
                      </select>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      marginTop: "18px",
                    }}
                  >
                    <button
                      className="btn btn-ghost"
                      type="button"
                      onClick={() => setWizardStep((x) => Math.max(1, x - 1))}
                      style={{ minHeight: "46px" }}
                    >
                      Back
                    </button>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => setWizardStep((x) => Math.min(3, x + 1))}
                      style={{ minHeight: "46px" }}
                    >
                      Next
                    </button>
                    <button
                      className="btn btn-outline"
                      type="button"
                      onClick={() => {
                        setWizardStep(1);
                        setWizard({ issue: "", duration: "", ageGroup: "" });
                      }}
                      style={{ minHeight: "46px" }}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="hover-card" style={s.card}>
                  <div style={s.eyebrow}>Suggestion</div>
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "1.7rem",
                      margin: 0,
                      color: theme.navy,
                    }}
                  >
                    {wizardSuggestion
                      ? wizardSuggestion.title
                      : "Answer Step 1 to see a match"}
                  </h3>
                  <p style={s.p}>
                    {wizardSuggestion
                      ? wizardSuggestion.description
                      : "This will recommend a service + show relevant doctors + provide a direct booking path."}
                  </p>

                  {wizardSuggestion && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                          marginTop: "12px",
                        }}
                      >
                        {(wizardSuggestion.tags || []).map((t) => (
                          <span key={t} style={s.tag}>
                            {t}
                          </span>
                        ))}
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
                          className="btn btn-outline"
                          type="button"
                          onClick={() => setActiveService(wizardSuggestion)}
                          style={{ minHeight: "46px" }}
                        >
                          View Details
                        </button>
                        <Link
                          className="btn btn-primary"
                          to="/appointment"
                          style={{ minHeight: "46px" }}
                        >
                          Book Now
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div id="services-sentinel" style={{ height: 1 }} />

          {/* Final CTA */}
          <AnimatedSection style={{ ...s.sectionBand, paddingBottom: "20px" }}>
            <div style={s.sectionShell}>
              <div
                style={{ ...s.ctaBanner, marginTop: "70px" }}
                className="cta-banner"
              >
                <div style={{ maxWidth: "760px" }}>
                  <div
                    style={{
                      ...s.eyebrow,
                      background: "rgba(14,165,233,0.18)",
                      color: theme.skyMid,
                    }}
                  >
                    Bottom Funnel
                  </div>
                  <h2 style={{ ...s.h2, color: "#fff" }}>
                    Let our experts guide you.
                  </h2>
                  <p style={{ ...s.p, color: "rgba(255,255,255,0.75)" }}>
                    Book a consultation and we’ll recommend the safest, most
                    effective next step.
                  </p>
                </div>
                <div
                  style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
                  className="cta-actions"
                >
                  <Link className="btn btn-primary" to="/appointment">
                    Book Consultation
                  </Link>
                  <a
                    className="btn btn-ghost"
                    href={`tel:${PRIMARY_PHONE}`}
                    style={{
                      background: "rgba(255,255,255,0.10)",
                      color: "#fff",
                      borderColor: "rgba(255,255,255,0.25)",
                    }}
                  >
                    Contact Specialist
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
