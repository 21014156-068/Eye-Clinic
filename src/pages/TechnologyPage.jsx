import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { useModal } from "../hooks/ModalContext";

export default function TechnologyPage() {
  const { setIsModalOpen } = useModal();

  const WHATSAPP_NUMBER = "+0000000000";
  const PRIMARY_PHONE = "+0000000000";

  // 🎨 Enhanced multi‑color theme
  const theme = {
    // Primary (still sky blue, but now just one part of a richer palette)
    sky: "#0ea5e9",
    skyHover: "#0284c7",
    skyMid: "#38bdf8",
    skyLight: "#e0f2fe",

    // Secondary (coral / warm accent)
    coral: "#f97316",
    coralLight: "#fff7ed",
    coralDark: "#ea580c",

    // Accent (emerald / green)
    emerald: "#10b981",
    emeraldLight: "#ecfdf5",

    // Additional vibrant colors
    purple: "#8b5cf6",
    purpleLight: "#f5f3ff",
    amber: "#f59e0b",
    amberLight: "#fffbeb",

    // Neutrals
    bg: "#f0f4f9",
    white: "#ffffff",
    navy: "#0f172a",
    navyMid: "#334155",
    slate: "#64748b",
    border: "#e2e8f0",
    borderLight: "#f1f5f9",

    // Dynamic shadows with color tint
    shadow: "0 6px 24px rgba(14,165,233,0.06), 0 2px 6px rgba(0,0,0,0.04)",
    shadowHover:
      "0 14px 36px rgba(14,165,233,0.12), 0 4px 10px rgba(0,0,0,0.06)",
    shadowCoral: "0 8px 24px rgba(249,115,22,0.12)",
    shadowEmerald: "0 8px 24px rgba(16,185,129,0.12)",

    radius: "20px",
    radiusLG: "28px",
    radiusXL: "36px",
    container: "min(1440px, calc(100% - 32px))",
  };

  const SECTION_Y = "84px";

  // Helper to pick a color per category
  const getCategoryColor = (category) => {
    if (/laser|surgery/i.test(category)) return theme.sky;
    if (/imaging/i.test(category)) return theme.purple;
    if (/diagnostic/i.test(category)) return theme.emerald;
    if (/vision testing/i.test(category)) return theme.amber;
    return theme.coral;
  };

  const getCategoryBg = (category) => {
    if (/laser|surgery/i.test(category)) return theme.skyLight;
    if (/imaging/i.test(category)) return theme.purpleLight;
    if (/diagnostic/i.test(category)) return theme.emeraldLight;
    if (/vision testing/i.test(category)) return theme.amberLight;
    return theme.coralLight;
  };

  const s = {
    main: {
      position: "relative",
      zIndex: 1,
      fontFamily: "'Inter', system-ui, sans-serif",
      background: `linear-gradient(180deg, ${theme.bg} 0%, #ffffff 100%)`,
      color: theme.navy,
      paddingBottom: "140px",
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
      // slightly reduced minimum for better mobile legibility
      fontSize: "clamp(1.2rem, 5vw, 2.6rem)",
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
    tag: (category) => ({
      display: "inline-flex",
      alignItems: "center",
      padding: "7px 12px",
      borderRadius: "999px",
      fontSize: "0.78rem",
      fontWeight: 800,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      background: getCategoryBg(category),
      color: getCategoryColor(category),
      whiteSpace: "nowrap",
    }),
    pill: {
      display: "inline-flex",
      padding: "8px 14px",
      border: `1px solid ${theme.border}`,
      borderRadius: "999px",
      background: theme.bg,
      color: theme.navyMid,
      fontSize: "0.85rem",
      fontWeight: 600,
    },
    ctaBanner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "24px",
      padding: "42px",
      borderRadius: theme.radiusXL,
      background: `linear-gradient(135deg, ${theme.navy} 0%, #1e3a5f 50%, ${theme.sky} 100%)`,
      border: `1px solid rgba(255,255,255,0.12)`,
      boxShadow: "0 20px 60px rgba(14,165,233,0.25)",
    },
  };

  // simple mobile detection for inline responsive tweaks
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 480;

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
      media: { image: "/assets/tech-femto.jpg" },
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
      media: { image: "/assets/tech-oct.jpg" },
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
      media: { image: "/assets/tech-topography.jpg" },
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
      media: { image: "/assets/tech-autoref.jpg" },
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

  const refs = {
    featured: useRef(null),
    compare: useRef(null),
    experience: useRef(null),
    media: useRef(null),
    cta: useRef(null),
  };

  const [activeTech, setActiveTech] = useState(null);

  useEffect(() => {
    setIsModalOpen(activeTech !== null);
  }, [activeTech, setIsModalOpen]);

  useEffect(() => {
    if (activeTech) {
      document.body.style.overflow = "hidden";
      const styleEl = document.createElement("style");
      styleEl.id = "hide-layout-elements";
      styleEl.innerHTML = `
        header, footer, 
        .site-header, .site-footer, 
        .siteHeader, .siteFooter, 
        #siteHeader, #siteFooter, 
        [data-testid="header"], [data-testid="footer"] {
          display: none !important;
        }
      `;
      document.head.appendChild(styleEl);

      return () => {
        document.body.style.overflow = "";
        const injectedStyle = document.getElementById("hide-layout-elements");
        if (injectedStyle) injectedStyle.remove();
      };
    }
  }, [activeTech]);

  return (
    <main style={s.main}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .hover-card {
          transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
        }
        .hover-card:hover {
          transform: translateY(-6px);
          border-color: rgba(14,165,233,0.25);
          box-shadow: ${theme.shadowHover};
        }
        /* Colored hover accents per category */
        .hover-card[data-category] {
          transition: border-color 220ms ease;
        }
        .hover-card[data-category]:hover {
          border-color: var(--cat-color);
        }

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
        .button-primary { 
          background: ${theme.sky}; 
          color: #fff; 
          box-shadow: 0 8px 24px rgba(14,165,233,0.32); 
        }
        .button-primary:hover { 
          background: ${theme.skyHover}; 
          box-shadow: 0 12px 32px rgba(14,165,233,0.40); 
        }
        .button-secondary { 
          background: #fff; 
          color: ${theme.sky}; 
          border: 1.5px solid ${theme.sky}; 
        }
        .button-secondary:hover { 
          background: ${theme.skyLight}; 
        }
        .button-coral {
          background: ${theme.coral};
          color: #fff;
          box-shadow: 0 8px 24px rgba(249,115,22,0.32);
        }
        .button-coral:hover {
          background: ${theme.coralDark};
          box-shadow: 0 12px 32px rgba(249,115,22,0.4);
        }
        .button-ghost { 
          background: rgba(255,255,255,0.7); 
          color: ${theme.navy}; 
          border: 1.5px solid ${theme.border}; 
        }
        .button-ghost:hover { background: #fff; }

        .grid-4 { display: grid; gap: 20px; grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .grid-3 { display: grid; gap: 20px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .grid-2 { display: grid; gap: 20px; grid-template-columns: repeat(2, minmax(0, 1fr)); }

        /* Modal styles */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(2, 8, 23, 0.75);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .modal {
          width: min(1020px, 100%);
          max-height: 90vh;
          border-radius: 28px;
          border: 1px solid ${theme.border};
          background: #fff;
          box-shadow: 0 30px 100px rgba(2,8,23,0.35);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          padding: 26px 26px 0;
          flex-shrink: 0;
          border-bottom: 1px solid ${theme.borderLight};
          background: linear-gradient(135deg, #f0f4f9 0%, #ffffff 100%);
        }
        .modal-body {
          padding: 26px;
          display: grid;
          gap: 16px;
          overflow-y: auto;
        }
        .table-responsive {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .compare-table {
          width: 100%;
          border-collapse: collapse;
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid ${theme.border};
          background: ${theme.bg};
          min-width: 500px;
        }
        .compare-table th, .compare-table td {
          padding: 14px;
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
        /* Alternate row colors */
        .compare-table tbody tr:nth-child(odd) {
          background: rgba(14,165,233,0.02);
        }
        .compare-table tbody tr:hover {
          background: rgba(14,165,233,0.05);
        }

        /* Safety icons (simple emoji) */
        .safety-icon {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: ${theme.emerald};
          font-weight: 600;
          margin-right: 12px;
        }

        @media (max-width: 1180px) {
          .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr !important; }
          .cta-banner { flex-direction: column; align-items: flex-start !important; }
        }
        @media (max-width: 820px) {
          .cta-actions { flex-direction: column; width: 100%; }
          .button { width: 100%; }
        }
        @media (max-width: 768px) {
          h2 { font-size: 2rem !important; }
          .modal-backdrop { padding: 0; }
          .modal {
            max-height: 100vh; height: 100vh; border-radius: 0; border: none;
          }
          .modal-header { padding: 20px 20px 0; flex-direction: column; }
          .close-btn { width: 100%; margin-top: 10px; }
          .modal-body { padding: 20px; }
        }
      `}</style>

      {/* Featured Technologies Section */}
      <AnimatedSection style={s.sectionBand}>
        <div
          style={{ ...s.sectionShell, marginTop: "10px" }}
          ref={refs.featured}
        >
          <div style={s.sectionHead}>
            <p style={{ ...s.eyebrow, marginTop: "20px" }}>
              <span style={{ fontSize: "1.1rem" }}>✨</span> Technologies
            </p>
            <h2 style={{ ...s.h2, marginTop: "15px" }}>
              Premium tools that differentiate the clinic.
            </h2>
            <p style={s.p}>
              Clear benefits + used‑for mapping + quick conversion CTA.
            </p>
          </div>

          <div style={{ display: "grid", gap: "20px", marginTop: "32px" }}>
            {featuredTechnologies.map((t, idx) => {
              const catColor = getCategoryColor(t.category);
              return (
                <article
                  key={t.id}
                  className="hover-card"
                  data-category={t.category}
                  style={{
                    ...s.card,
                    padding: "26px",
                    borderTop: `4px solid ${catColor}`,
                    background: `linear-gradient(135deg, #ffffff, ${getCategoryBg(t.category)})`,
                    boxShadow: idx === 0 ? theme.shadow : undefined,
                    "--cat-color": catColor,
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
                        <span style={s.tag(t.category)}>Featured</span>
                      </div>

                      <h3
                        style={{
                          ...s.h2,
                          fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
                          marginTop: "14px",
                          color: catColor,
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
                            <span
                              key={b}
                              style={{
                                ...s.pill,
                                background: getCategoryBg(t.category),
                                borderColor: `${catColor}40`,
                                color: catColor,
                              }}
                            >
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
                          flexWrap: isMobile ? "nowrap" : "wrap",
                          marginTop: "18px",
                          alignItems: "center",
                        }}
                      >
                        <button
                          className="button button-secondary"
                          type="button"
                          onClick={() => setActiveTech(t)}
                          style={{
                            minHeight: "46px",
                            fontSize: isMobile ? "14px" : undefined,
                          }}
                        >
                          Learn More
                        </button>
                        <Link
                          className="button button-primary"
                          to="/appointment"
                          style={{
                            minHeight: "46px",
                            fontSize: isMobile ? "14px" : undefined,
                          }}
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
                          background: `radial-gradient(circle at 40% 20%, ${catColor}20, transparent 42%), ${theme.bg}`,
                          overflow: "hidden",
                          minHeight: "320px",
                          boxShadow: `inset 0 0 0 1px ${catColor}20`,
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
                        <span style={s.tag(t.category)}>{t.category}</span>
                        <span style={s.tag("Safety-first")}>Safety-first</span>
                        <span style={s.tag("Clinician-led")}>
                          Clinician-led
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Modal */}
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
                <div
                  style={{
                    ...s.eyebrow,
                    background: getCategoryBg(activeTech.category),
                    color: getCategoryColor(activeTech.category),
                  }}
                >
                  {activeTech.category}
                </div>
                <h3
                  style={{
                    ...s.h2,
                    fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                    color: getCategoryColor(activeTech.category),
                  }}
                >
                  {activeTech.name}
                </h3>
                <p style={{ ...s.p, marginTop: "10px" }}>
                  {activeTech.description}
                </p>
              </div>
              <button
                className="button button-ghost close-btn"
                type="button"
                onClick={() => setActiveTech(null)}
                style={{ minHeight: "44px" }}
              >
                Close
              </button>
            </div>

            <div className="modal-body">
              <div className="grid-2">
                <div
                  style={{
                    ...s.card,
                    padding: "18px",
                    boxShadow: "none",
                    background: theme.bg,
                  }}
                >
                  <div style={{ color: theme.navy, fontWeight: 900 }}>
                    Overview
                  </div>
                  <p style={{ ...s.p, marginTop: "10px" }}>
                    {activeTech.overview}
                  </p>
                </div>
                <div
                  style={{
                    ...s.card,
                    padding: "18px",
                    boxShadow: "none",
                    background: theme.bg,
                  }}
                >
                  <div style={{ color: theme.navy, fontWeight: 900 }}>
                    How it works
                  </div>
                  <p style={{ ...s.p, marginTop: "10px" }}>
                    {activeTech.howItWorks}
                  </p>
                </div>
              </div>

              <div
                style={{
                  ...s.card,
                  padding: "18px",
                  boxShadow: "none",
                  background: theme.bg,
                }}
              >
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
                    <span
                      key={b}
                      style={{
                        ...s.pill,
                        background: getCategoryBg(activeTech.category),
                        borderColor: `${getCategoryColor(activeTech.category)}40`,
                        color: getCategoryColor(activeTech.category),
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <div style={{ marginTop: "14px" }} className="table-responsive">
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
                          <td style={{ color: theme.navyMid, fontWeight: 500 }}>
                            {row.right}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid-2">
                <div
                  style={{
                    ...s.card,
                    padding: "18px",
                    boxShadow: "none",
                    background: theme.bg,
                  }}
                >
                  <div style={{ color: theme.navy, fontWeight: 900 }}>
                    Safety standards
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gap: "10px",
                      marginTop: "12px",
                    }}
                  >
                    {(activeTech.safety || []).map((x) => (
                      <div
                        key={x}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 16,
                          border: `1px solid ${theme.border}`,
                          background: theme.white,
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span
                          style={{ color: theme.emerald, fontSize: "1.1rem" }}
                        >
                          ✅
                        </span>
                        <span style={{ color: theme.navyMid }}>{x}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    ...s.card,
                    padding: "18px",
                    boxShadow: "none",
                    background: theme.bg,
                  }}
                >
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
                      className="button button-coral"
                      to="/services"
                      style={{ minHeight: "46px" }}
                    >
                      Explore Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Section */}
      <AnimatedSection style={s.sectionBand}>
        <div
          style={{ ...s.sectionShell, marginTop: "100px" }}
          ref={refs.compare}
        >
          <div style={s.sectionHead}>
            <p style={s.eyebrow}>Comparison</p>
            <h2 style={s.h2}>Why premium technology justifies premium care.</h2>
            <p style={s.p}>
              A direct comparison helps users understand value (and pricing).
            </p>
          </div>

          <div
            style={{
              ...s.card,
              marginTop: "32px",
              padding: "18px",
              background: `linear-gradient(135deg, #ffffff, ${theme.skyLight}50)`,
            }}
            className="hover-card"
          >
            <div className="table-responsive">
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
                    <td style={{ color: theme.navyMid, fontWeight: 500 }}>
                      Laser-assisted planning & precision systems
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: theme.slate }}>
                      Longer recovery uncertainty
                    </td>
                    <td style={{ color: theme.navyMid, fontWeight: 500 }}>
                      Faster healing guidance with structured aftercare
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: theme.slate }}>Less precision</td>
                    <td style={{ color: theme.navyMid, fontWeight: 500 }}>
                      High accuracy from imaging + measurement
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: theme.slate }}>More “guesswork”</td>
                    <td style={{ color: theme.navyMid, fontWeight: 500 }}>
                      More measurable decision-making
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Patient Experience Section */}
      <AnimatedSection
        style={{
          ...s.sectionBand,
          background: "#ffffff",
          borderRadius: "40px 40px 0 0",
          marginTop: "40px",
        }}
      >
        <div
          style={{ ...s.sectionShell, marginTop: "100px" }}
          ref={refs.experience}
        >
          <div style={s.sectionHead}>
            <p style={s.eyebrow}>Patient Experience</p>
            <h2 style={s.h2}>What to expect during treatment.</h2>
            <p style={s.p}>
              Diagnosis → Procedure → Recovery, explained in calm, simple steps.
            </p>
          </div>

          <div style={{ display: "grid", gap: "14px", marginTop: "32px" }}>
            {[
              {
                step: "01",
                title: "Diagnosis",
                copy: "High-quality scanning + clinician interpretation with clear explanation.",
                color: theme.sky,
                bg: theme.skyLight,
              },
              {
                step: "02",
                title: "Procedure",
                copy: "Technology-supported precision with safety-first protocols.",
                color: theme.emerald,
                bg: theme.emeraldLight,
              },
              {
                step: "03",
                title: "Recovery",
                copy: "Aftercare mapping + follow-ups to keep progress visible and calm.",
                color: theme.coral,
                bg: theme.coralLight,
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
                  borderLeft: `4px solid ${x.color}`,
                  background: `linear-gradient(135deg, #ffffff, ${x.bg}80)`,
                }}
              >
                <span
                  style={{ ...s.cardCode, background: x.bg, color: x.color }}
                >
                  {x.step}
                </span>
                <div>
                  <h3
                    style={{
                      ...s.h2,
                      fontSize: "1.4rem",
                      marginBottom: 6,
                      color: x.color,
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

      {/* Visual Media Section */}
      <AnimatedSection style={s.sectionBand}>
        <div style={{ ...s.sectionShell, marginTop: "100px" }} ref={refs.media}>
          <div style={s.sectionHead}>
            <p style={s.eyebrow}>Visual Media</p>
            <h2 style={s.h2}>Machines in action (video / diagrams).</h2>
            <p style={s.p}>
              Placeholders are included—replace with real clips when available.
            </p>
          </div>

          <div className="grid-3" style={{ marginTop: "32px" }}>
            {[
              {
                id: "01",
                title: "Machine in action",
                copy: "Short clip showing scanning or calibration.",
                color: theme.sky,
                gradient: `linear-gradient(135deg, ${theme.skyLight}, #ffffff)`,
              },
              {
                id: "02",
                title: "Procedure explanation",
                copy: "Simple patient-friendly explainer video.",
                color: theme.purple,
                gradient: `linear-gradient(135deg, ${theme.purpleLight}, #ffffff)`,
              },
              {
                id: "03",
                title: "3D diagram / animation",
                copy: "Shows anatomy and what changes with treatment.",
                color: theme.emerald,
                gradient: `linear-gradient(135deg, ${theme.emeraldLight}, #ffffff)`,
              },
            ].map((x) => (
              <article
                key={x.id}
                className="hover-card"
                style={{
                  ...s.card,
                  padding: "22px",
                  background: x.gradient,
                  borderTop: `4px solid ${x.color}`,
                }}
              >
                <span
                  style={{
                    ...s.cardCode,
                    background: `${x.color}20`,
                    color: x.color,
                  }}
                >
                  {x.id}
                </span>
                <h3
                  style={{
                    ...s.h2,
                    fontSize: "1.35rem",
                    marginTop: "12px",
                    color: x.color,
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
                    border: `2px dashed ${x.color}50`,
                    background: `${x.color}10`,
                    display: "grid",
                    placeItems: "center",
                    color: x.color,
                    fontWeight: 600,
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>🎬</span> Video / Diagram
                  placeholder
                </div>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
