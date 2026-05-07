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

// The Memorized Vibrant Color Palette
const accentColors = [
  { primary: "#8b5cf6", light: "#ede9fe", hover: "#7c3aed" }, // Violet
  { primary: "#10b981", light: "#d1fae5", hover: "#059669" }, // Emerald
  { primary: "#f43f5e", light: "#ffe4e6", hover: "#e11d48" }, // Rose
  { primary: "#f59e0b", light: "#fef3c7", hover: "#d97706" }, // Amber
  { primary: "#0ea5e9", light: "#e0f2fe", hover: "#0284c7" }, // Sky Blue
  { primary: "#ec4899", light: "#fce7f3", hover: "#db2777" }, // Pink
];

export default function ServicesPage() {
  const { services, doctors, loading } = usePublicSite();
  const { setIsModalOpen } = useModal();

  // Theme
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

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeService, setActiveService] = useState(null);

  const categories = useMemo(
    () => getUniqueCategories(services || []),
    [services],
  );

  // Filter services based on search and category
  const filteredServices = useMemo(() => {
    let result = services || [];
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
          (s.category && s.category.toLowerCase().includes(q)),
      );
    }
    return result;
  }, [services, query, activeCategory]);

  const featuredServices = useMemo(() => {
    return (services || []).filter((s) => s.featured === true).slice(0, 3);
  }, [services]);

  const isFiltering = query.trim().length > 0 || activeCategory !== "All";

  // Update modal state when service detail modal opens/closes
  useEffect(() => {
    setIsModalOpen(activeService !== null);
  }, [activeService, setIsModalOpen]);

  if (loading) {
    return (
      <main
        style={{
          background: theme.bg,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <p style={{ color: theme.navy, fontWeight: 600 }}>
          Loading services...
        </p>
      </main>
    );
  }

  return (
    <main
      style={{
        background: theme.bg,
        color: theme.navy,
        fontFamily: "'Inter', system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');
        
        .hover-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; height: 100%; display: flex; flex-direction: column; }
        .hover-lift:hover { transform: translateY(-8px); box-shadow: ${theme.shadowHover}; z-index: 2; position: relative; }
        
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 40px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
          font-family: 'Inter', system-ui;
        }
        .btn-primary { background: ${theme.sky}; color: white; box-shadow: 0 8px 20px rgba(14,165,233,0.3); }
        .btn-primary:hover { background: ${theme.skyHover}; transform: translateY(-2px); }
        .btn-outline { background: transparent; border: 1.5px solid ${theme.sky}; color: ${theme.sky}; }
        .btn-outline:hover { background: ${theme.skyLight}; transform: translateY(-2px); }
        .btn-ghost { background: transparent; color: ${theme.slate}; }
        .btn-ghost:hover { background: ${theme.borderLight}; color: ${theme.navy}; }

        .input {
          width: 100%;
          min-height: 54px;
          border-radius: 40px;
          border: 1.5px solid ${theme.border};
          background: #fff;
          color: ${theme.navy};
          padding: 0 24px;
          font-size: 1rem;
          outline: none;
          font-family: 'Inter', system-ui;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .input:focus {
          border-color: ${theme.sky};
          box-shadow: 0 0 0 4px rgba(14,165,233,0.15);
        }
        
        .tabs { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 10px; scrollbar-width: none; }
        .tabs::-webkit-scrollbar { display: none; }
        .tab {
          flex: 0 0 auto;
          padding: 10px 20px;
          border-radius: 40px;
          border: 1px solid ${theme.border};
          background: #fff;
          color: ${theme.slate};
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tab:hover { border-color: ${theme.sky}; color: ${theme.sky}; }
        .tab-active { background: ${theme.navy}; color: #fff; border-color: ${theme.navy}; }
        
        .grid-2 { display: grid; gap: 30px; grid-template-columns: repeat(2, 1fr); }
        .grid-3 { display: grid; gap: 30px; grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 1024px) { .grid-2, .grid-3 { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .grid-2, .grid-3 { grid-template-columns: 1fr; } }

        /* Modal Overhaul */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(26, 46, 68, 0.4);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow-y: auto;
        }
        .modal {
          width: min(900px, 100%);
          max-height: calc(100vh - 40px);
          background: #fff;
          border-radius: 32px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .modal-header {
          padding: 30px;
          background: ${theme.bg};
          border-bottom: 1px solid ${theme.borderLight};
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .modal-body {
          padding: 30px;
          overflow-y: auto;
          display: grid;
          gap: 20px;
        }

        .ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          opacity: 0.5;
          animation: float 8s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
          100% { transform: translateY(0px) scale(1); }
        }
      `}</style>

      {/* ========== HERO SECTION & SEARCH ========== */}
      <section
        style={{
          position: "relative",
          padding: "120px 0 60px",
          background: `linear-gradient(145deg, #e0f2fe 0%, #ffffff 100%)`,
          overflow: "hidden",
        }}
      >
        <div
          className="ambient-glow"
          style={{
            width: "400px",
            height: "400px",
            background: accentColors[4].light,
            top: "-100px",
            right: "-100px",
          }}
        />
        <div
          className="ambient-glow"
          style={{
            width: "300px",
            height: "300px",
            background: accentColors[0].light,
            bottom: "-50px",
            left: "-50px",
            animationDelay: "2s",
          }}
        />

        <div
          style={{
            width: theme.container,
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: "1000px",
              margin: "0 auto 40px",
            }}
          >
            <h1
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(1.6rem, 6vw, 3.5rem)",
                lineHeight: 1.1,
                margin: "0 0 20px",
                color: theme.navy,
              }}
            >
              Advanced Care.{" "}
              <em style={{ color: theme.sky }}>Exceptional Outcomes.</em>
            </h1>
            <p
              style={{
                color: theme.slate,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              Explore our comprehensive range of eye care services, from routine
              checkups to state-of-the-art surgical procedures.
            </p>
          </div>

          {/* Search and Tabs Container */}
          <div
            style={{
              maxWidth: "100%",
              margin: "0 auto",
              background: "rgba(255,255,255,0.6)",
              padding: "10px",
              borderRadius: "32px",
              backdropFilter: "blur(12px)",
              border: `1px solid ${theme.borderLight}`,
              boxShadow: theme.shadow,
            }}
          >
            <input
              className="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="🔍 Search for a treatment (e.g., LASIK, Cataract)"
              aria-label="Search services"
            />
          </div>
        </div>
      </section>

      {/* ========== HIGH DEMAND SERVICES (FEATURED) ========== */}
      {!isFiltering && featuredServices.length > 0 && (
        <section style={{ padding: "80px 0", background: theme.bg }}>
          <div style={{ width: theme.container, margin: "0 auto" }}>
            <div style={{ marginBottom: "40px" }}>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                  margin: "0 0 10px",
                  color: theme.navy,
                }}
              >
                High Demand Services
              </h2>
              <p style={{ color: theme.slate, margin: 0 }}>
                The most requested procedures by our patients.
              </p>
            </div>

            <div className="grid-3">
              {featuredServices.map((svc, idx) => {
                const accent = accentColors[idx % accentColors.length];
                return (
                  <article
                    key={svc._id}
                    className="hover-lift"
                    style={{
                      background: theme.white,
                      borderRadius: "32px",
                      padding: "32px",
                      border: `1px solid ${theme.border}`,
                      borderBottom: `4px solid ${accent.primary}`,
                      boxShadow: theme.shadow,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "20px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "2rem",
                          background: accent.light,
                          width: "60px",
                          height: "60px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "16px",
                          color: accent.primary,
                        }}
                      >
                        🩺
                      </div>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          padding: "6px 12px",
                          background: theme.skyLight,
                          color: theme.sky,
                          borderRadius: "20px",
                        }}
                      >
                        Featured
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "1.6rem",
                        margin: "0 0 12px",
                        color: theme.navy,
                      }}
                    >
                      {svc.title}
                    </h3>
                    <p
                      style={{
                        color: theme.slate,
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                        margin: "0 0 20px",
                      }}
                    >
                      {svc.description}
                    </p>

                    <div style={{ flexGrow: 1, marginBottom: "24px" }}>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: theme.navy,
                          marginBottom: "8px",
                        }}
                      >
                        Top Benefits:
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        {(svc.benefits || ["Clearer vision", "Quick recovery"])
                          .slice(0, 3)
                          .map((b) => (
                            <span
                              key={b}
                              style={{
                                fontSize: "0.75rem",
                                padding: "6px 12px",
                                background: theme.borderLight,
                                color: theme.navyMid,
                                borderRadius: "20px",
                                fontWeight: 600,
                              }}
                            >
                              {b}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        className="btn btn-outline"
                        style={{
                          flex: 1,
                          borderColor: accent.primary,
                          color: accent.primary,
                          fontSize: "clamp(0.75rem, 2vw, 1rem)",
                        }}
                        onClick={() => setActiveService(svc)}
                      >
                        Details
                      </button>
                      <Link
                        to="/appointment"
                        className="btn btn-primary"
                        style={{
                          flex: 1,
                          background: accent.primary,
                          boxShadow: `0 8px 20px ${accent.light}`,
                          fontSize: "clamp(0.75rem, 2vw, 1rem)",
                        }}
                      >
                        Book Now
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ========== ALL SERVICES ========== */}
      <section
        style={{
          padding: "80px 0",
          background: theme.white,
          borderTop: `1px solid ${theme.borderLight}`,
        }}
      >
        <div style={{ width: theme.container, margin: "0 auto" }}>
          <div style={{ marginBottom: "40px" }}>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "2.2rem",
                margin: "0 0 10px",
                color: theme.navy,
              }}
            >
              {isFiltering ? "Search Results" : "All Treatments"}
            </h2>
            <p style={{ color: theme.slate, margin: 0 }}>
              {isFiltering
                ? `Showing matches for "${query}" in ${activeCategory}`
                : "Browse our complete catalog of eye care solutions."}
            </p>
          </div>

          <div className="grid-3">
            {filteredServices.map((svc, idx) => {
              // Shift the accent index to provide variety from the featured block
              const accent = accentColors[(idx + 3) % accentColors.length];
              return (
                <article
                  key={svc._id}
                  className="hover-lift"
                  style={{
                    background: theme.bg,
                    borderRadius: "28px",
                    padding: "28px",
                    border: `1px solid ${theme.border}`,
                    borderBottom: `4px solid ${accent.primary}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "4px 10px",
                      background: theme.borderLight,
                      color: theme.slate,
                      borderRadius: "20px",
                      display: "inline-block",
                      marginBottom: "16px",
                    }}
                  >
                    {svc.category}
                  </div>

                  <h3
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "1.4rem",
                      margin: "0 0 12px",
                      color: theme.navy,
                    }}
                  >
                    {svc.title}
                  </h3>

                  <p
                    style={{
                      color: theme.slate,
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      margin: "0 0 20px",
                      flexGrow: 1,
                    }}
                  >
                    {svc.description}
                  </p>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      className="btn btn-outline"
                      style={{
                        flex: 1,
                        borderColor: accent.primary,
                        color: accent.primary,
                        fontSize: "clamp(0.82rem, 2.8vw, 0.95rem)",
                      }}
                      onClick={() => setActiveService(svc)}
                    >
                      Learn More
                    </button>
                    <Link
                      to="/appointment"
                      className="btn btn-primary"
                      style={{
                        flex: 1,
                        background: accent.primary,
                        fontSize: "clamp(0.82rem, 2.8vw, 0.95rem)",
                      }}
                    >
                      Book Now
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: theme.bg,
                borderRadius: "32px",
                border: `1px dashed ${theme.border}`,
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🧐</div>
              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.8rem",
                  margin: "0 0 10px",
                  color: theme.navy,
                }}
              >
                No matches found.
              </h3>
              <p style={{ color: theme.slate }}>
                We couldn't find any services matching your current filters. Try
                adjusting your search or category.
              </p>
              <button
                className="btn btn-outline"
                style={{ marginTop: "20px" }}
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========== SERVICE DETAIL MODAL ========== */}
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
                <span
                  style={{
                    fontSize: "clamp(0.7rem, 2.4vw, 0.75rem)",
                    fontWeight: 700,
                    padding: "2px 8px",
                    background: theme.skyLight,
                    color: theme.sky,
                    borderRadius: "20px",
                    display: "inline-block",
                    marginBottom: "12px",
                  }}
                >
                  {activeService.category}
                </span>
                <h3
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "clamp(1.1rem, 5vw, 2.4rem)",
                    margin: 0,
                    color: theme.navy,
                  }}
                >
                  {activeService.title}
                </h3>
              </div>
              <button
                className="btn btn-ghost"
                style={{ padding: "8px 16px" }}
                onClick={() => setActiveService(null)}
              >
                Close ✕
              </button>
            </div>

            <div className="modal-body">
              <p
                style={{
                  color: theme.slate,
                  fontSize: "clamp(0.95rem, 3.6vw, 1.1rem)",
                  lineHeight: 1.6,
                  margin: "0 0 10px",
                }}
              >
                {activeService.description}
              </p>

              <div className="grid-2">
                <div
                  style={{
                    background: theme.bg,
                    padding: "2px",
                    borderRadius: "24px",
                    border: `1px solid ${theme.borderLight}`,
                  }}
                >
                  <div
                    style={{
                      color: theme.navy,
                      fontWeight: 800,
                      marginBottom: "12px",
                      fontSize: "clamp(0.95rem, 3.2vw, 1.1rem)",
                    }}
                  >
                    Overview
                  </div>
                  <p style={{ color: theme.slate, margin: 0, lineHeight: 1.6 }}>
                    {activeService.overview ||
                      "This comprehensive treatment is designed to restore and protect your vision using the latest medical advancements. Our specialists will guide you through every step of the process."}
                  </p>
                </div>

                <div
                  style={{
                    background: theme.bg,
                    padding: "2px",
                    borderRadius: "24px",
                    border: `1px solid ${theme.borderLight}`,
                  }}
                >
                  <div
                    style={{
                      color: theme.navy,
                      fontWeight: 800,
                      marginBottom: "12px",
                      fontSize: "clamp(0.95rem, 3.2vw, 1.1rem)",
                    }}
                  >
                    Procedure & Recovery
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      marginBottom: "16px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(0.78rem, 2.8vw, 0.85rem)",
                        padding: "6px 14px",
                        background: "white",
                        border: `1px solid ${theme.border}`,
                        borderRadius: "20px",
                        fontWeight: 600,
                      }}
                    >
                      Success Rate: {activeService.successRate || "High"}
                    </span>
                    <span
                      style={{
                        fontSize: "clamp(0.78rem, 2.8vw, 0.85rem)",
                        padding: "6px 14px",
                        background: "white",
                        border: `1px solid ${theme.border}`,
                        borderRadius: "20px",
                        fontWeight: 600,
                      }}
                    >
                      Recovery: {activeService.recovery || "Varies"}
                    </span>
                  </div>
                  <p
                    style={{
                      color: theme.slate,
                      margin: 0,
                      lineHeight: 1.6,
                      fontSize: "clamp(0.85rem, 3vw, 0.95rem)",
                    }}
                  >
                    {activeService.procedureSteps ||
                      "Consultation → Personalized Planning → Procedure → Post-op Care"}
                  </p>
                </div>
              </div>

              <div className="grid-2">
                <div
                  style={{
                    background: theme.bg,
                    padding: "2px",
                    borderRadius: "24px",
                    border: `1px solid ${theme.borderLight}`,
                  }}
                >
                  <div
                    style={{
                      color: theme.navy,
                      fontWeight: 800,
                      marginBottom: "12px",
                      fontSize: "clamp(0.95rem, 3.2vw, 1.1rem)",
                    }}
                  >
                    Common Symptoms Addressed
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "20px",
                      color: theme.slate,
                      lineHeight: 1.8,
                      fontSize: "clamp(0.88rem, 3vw, 1rem)",
                    }}
                  >
                    {(activeService.symptoms && activeService.symptoms.length
                      ? activeService.symptoms
                      : [
                          "Blurry or distorted vision",
                          "Eye strain or fatigue",
                          "Difficulty focusing",
                        ]
                    ).map((sym) => (
                      <li key={sym}>{sym}</li>
                    ))}
                  </ul>
                </div>
                <div
                  style={{
                    background: theme.bg,
                    padding: "2px",
                    borderRadius: "24px",
                    border: `1px solid ${theme.borderLight}`,
                  }}
                >
                  <div
                    style={{
                      color: theme.navy,
                      fontWeight: 800,
                      marginBottom: "12px",
                      fontSize: "clamp(0.95rem, 3.2vw, 1.1rem)",
                    }}
                  >
                    Safety & Risks
                  </div>
                  <p style={{ color: theme.slate, margin: 0, lineHeight: 1.6 }}>
                    {activeService.risks ||
                      "Patient safety is our highest priority. During your consultation, your doctor will discuss your specific candidacy and how we minimize any potential risks associated with this treatment."}
                  </p>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div
                style={{
                  borderRadius: "24px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px",
                  marginTop: "10px",
                }}
              >
                <Link
                  className="btn btn-primary"
                  to="/appointment"
                  onClick={() => setActiveService(null)}
                >
                  Book This Treatment
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
