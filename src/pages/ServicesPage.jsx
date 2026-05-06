import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { usePublicSite } from "../hooks/PublicSiteContext";
import { useModal } from "../hooks/ModalContext";

// Helper to extract unique categories from actual services
const getUniqueCategories = (services) => {
  const cats = new Set(services.map((s) => s.category).filter(Boolean));
  return ["All", ...Array.from(cats).sort()];
};

export default function ServicesPage() {
  const { services, doctors, loading } = usePublicSite();
  const { setIsModalOpen } = useModal();

  // Theme (unchanged)
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
      fontSize: "clamp(1.8rem, 3.1vw, 3.1rem)",
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
  };

  const WHATSAPP_NUMBER = "+92 347 7552842";
  const PRIMARY_PHONE = "+92 347 7552842";

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeService, setActiveService] = useState(null);
  const [wizardStep, setWizardStep] = useState(1);

  // Filter services based on search and category
  const filteredServices = useMemo(() => {
    let result = services;
    if (activeCategory !== "All") {
      result = result.filter((s) => s.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          (s.description && s.description.toLowerCase().includes(q)) ||
          (s.tags && s.tags.some((tag) => tag.toLowerCase().includes(q))) ||
          s.category.toLowerCase().includes(q),
      );
    }
    return result;
  }, [services, query, activeCategory]);

  const featuredServices = useMemo(() => {
    return services.filter((s) => s.featured === true).slice(0, 3);
  }, [services]);

  const isFiltering = query.trim().length > 0 || activeCategory !== "All";

  // Scroll refs (unchanged)
  const refs = {
    featured: useRef(null),
    allServices: useRef(null),
    wizard: useRef(null),
  };

  const scrollTo = (key) => {
    const el = refs[key]?.current;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Lazy load heavy sections (unchanged)
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

  // Update modal state when service detail modal opens/closes
  useEffect(() => {
    setIsModalOpen(activeService !== null);
  }, [activeService, setIsModalOpen]);

  const whatsappHref = useMemo(() => {
    const cleaned = WHATSAPP_NUMBER.replace(/[^\d+]/g, "");
    const wa = cleaned.startsWith("+") ? cleaned.slice(1) : cleaned;
    return `https://wa.me/${wa}`;
  }, [WHATSAPP_NUMBER]);

  if (loading) {
    return (
      <main style={s.main}>
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <p>Loading services...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={s.main} className="page-shell-services">
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

        /* ---------- MODAL RESPONSIVE OVERHAUL ---------- */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(2, 8, 23, 0.60);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .modal {
          width: min(980px, 100%);
          max-height: calc(100vh - 32px);
          overflow-y: auto;
          border-radius: 28px;
          border: 1px solid ${theme.border};
          background: #fff;
          box-shadow: 0 30px 100px rgba(2, 8, 23, 0.25);
          display: flex;
          flex-direction: column;
        }
        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          padding: 18px 18px 0;
          position: sticky;
          top: 0;
          background: white;
          border-radius: 28px 28px 0 0;
          z-index: 2;
        }
        .modal-body {
          padding: 18px;
          display: grid;
          gap: 14px;
        }

        /* For tablets and below: force single column grids everywhere */
        @media (max-width: 1180px) {
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .cta-banner { flex-direction: column; align-items: flex-start !important; }
          .floating-cta { left: 16px; right: 16px; grid-template-columns: 1fr; }
          .floating-cta .btn { width: 100%; }
        }

        /* Phone optimisations for modal header & scrolling */
        @media (max-width: 600px) {
          .modal-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding: 16px 16px 0;
          }
          .modal-header .btn-ghost {
            align-self: flex-end;
            margin-top: -8px;
            min-height: 40px;
            padding: 0 16px;
            font-size: 0.85rem;
          }
          .modal-body {
            padding: 16px;
          }
          .modal {
            border-radius: 24px;
          }
          .modal-header {
            border-radius: 24px 24px 0 0;
          }
        }

        @media (max-width: 820px) {
          .cta-actions { flex-direction: column; width: 100%; }
          .btn { width: 100%; }
        }
      `}</style>

      {/* Sticky Smart Service Navigation */}
      <AnimatedSection style={s.sectionBand}>
        <div style={s.sectionShell}>
          <div className="sticky-nav">
            <input
              className="input"
              style={{ marginTop: "20px" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search treatment (e.g., LASIK, Cataract)"
              aria-label="Search services"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Section (only when not filtering) */}
      {!isFiltering && featuredServices.length > 0 && (
        <AnimatedSection style={s.sectionBand}>
          <div style={s.sectionShell} ref={refs.featured}>
            <div style={s.sectionHead}>
              <div style={{ ...s.eyebrow, marginTop: "40px" }}>
                Our Services
              </div>
              <h2 style={s.h2}>High Demand Services</h2>
              <p style={s.p}>
                Benefits + quick actions, in a calm light theme.
              </p>
            </div>
            <div className="grid-3" style={{ marginTop: "28px" }}>
              {featuredServices.map((svc, idx) => (
                <article
                  className="hover-card"
                  key={svc._id}
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
                    style={{ display: "grid", gap: "10px", marginTop: "14px" }}
                  >
                    <div style={{ color: theme.navy, fontWeight: 800 }}>
                      Benefits
                    </div>
                    <div
                      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                    >
                      {(svc.benefits || []).slice(0, 3).map((b) => (
                        <span key={b} style={s.pill}>
                          {b}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                    >
                      <span style={s.pill}>
                        Success: {svc.successRate || "Varies"}
                      </span>
                      <span style={s.pill}>
                        Recovery: {svc.recovery || "Varies"}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "nowrap",
                      marginTop: "18px",
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-outline"
                      style={{ minHeight: "46px", flex: "1 1 0", minWidth: 0 }}
                      onClick={() => setActiveService(svc)}
                    >
                      Learn More
                    </button>
                    <Link
                      className="btn btn-primary"
                      style={{ minHeight: "46px", flex: "1 1 0", minWidth: 0 }}
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
      )}

      {/* All Services (always visible) */}
      <AnimatedSection style={{ ...s.sectionBand, background: "#fff" }}>
        <div style={s.sectionShell} ref={refs.allServices}>
          <div style={s.sectionHead}>
            <div style={{ ...s.eyebrow, marginTop: "100px" }}>
              {isFiltering ? "Search Results" : "All Services"}
            </div>
            <h2 style={s.h2}>
              {isFiltering ? "Matching treatments." : "Browse every treatment."}
            </h2>
            <p style={s.p}>
              {isFiltering
                ? "Showing only services that match your search and selected category."
                : "Same interactions, smoother light UI."}
            </p>
          </div>
          <div className="grid-3" style={{ marginTop: "28px" }}>
            {filteredServices.map((svc) => (
              <article key={svc._id} className="hover-card" style={s.card}>
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
                        fontSize: "1.2rem",
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
                    flexWrap: "nowrap",
                    marginTop: "16px",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-outline"
                    style={{ minHeight: "46px", flex: "1 1 0", minWidth: 0 }}
                    onClick={() => setActiveService(svc)}
                  >
                    Learn More
                  </button>
                  <Link
                    className="btn btn-primary"
                    style={{ minHeight: "46px", flex: "1 1 0", minWidth: 0 }}
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

      {/* Service Detail Modal */}
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
                <h3 style={{ ...s.h2, fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}>
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
                aria-label="Close modal"
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
                    {(activeService.symptoms && activeService.symptoms.length
                      ? activeService.symptoms
                      : [
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
                  {(activeService.faqs && activeService.faqs.length
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
