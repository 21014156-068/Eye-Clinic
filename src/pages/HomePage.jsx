import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { usePublicSite } from "../hooks/PublicSiteContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// Expanded vibrant color palette for dynamic styling
const accentColors = [
  { primary: "#8b5cf6", light: "#ede9fe", hover: "#7c3aed" }, // Violet
  { primary: "#10b981", light: "#d1fae5", hover: "#059669" }, // Emerald
  { primary: "#f43f5e", light: "#ffe4e6", hover: "#e11d48" }, // Rose
  { primary: "#f59e0b", light: "#fef3c7", hover: "#d97706" }, // Amber
  { primary: "#0ea5e9", light: "#e0f2fe", hover: "#0284c7" }, // Sky Blue
  { primary: "#ec4899", light: "#fce7f3", hover: "#db2777" }, // Pink
];

export default function HomePage() {
  const { services, doctors, loading, settings } = usePublicSite();
  const heroRef = useRef(null);
  const servicesScrollRef = useRef(null);
  const doctorsScrollRef = useRef(null);

  const isHeroVisible = useInView(heroRef, { once: true, margin: "-100px" });

  const activeServices = (services || [])
    .filter((s) => s.active !== false)
    .slice(0, 6);

  const activeDoctors = (doctors || [])
    .filter((d) => d.active !== false)
    .slice(0, 6);

  const primaryPhone = settings?.phone || "+0000000000";

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

  const values = [
    {
      icon: "🔬",
      title: "Advanced Technology",
      desc: "Modern diagnostics and surgical precision.",
    },
    {
      icon: "👨‍⚕️",
      title: "Expert Specialists",
      desc: "Board‑certified, fellowship‑trained doctors.",
    },
    {
      icon: "❤️",
      title: "Compassionate Care",
      desc: "Clear communication and patient‑first approach.",
    },
    {
      icon: "⭐",
      title: "Proven Outcomes",
      desc: "Consistently high success rates and safety.",
    },
  ];

  const faq = [
    {
      q: "How do I book an appointment?",
      a: "Use the booking widget or call us. We’ll confirm your slot within hours.",
    },
    {
      q: "Is LASIK painful?",
      a: "Most patients experience minimal discomfort. Modern techniques ensure a smooth procedure.",
    },
    {
      q: "Do you accept insurance?",
      a: "Yes, we work with major insurers. Our team will help verify coverage.",
    },
  ];

  const getInitials = (name) => {
    if (!name) return "DR";
    const parts = name.split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const [openFaq, setOpenFaq] = useState(null);

  // Scroll function for the custom arrows
  const handleScroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction * (window.innerWidth > 768 ? 420 : 300);
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700;800&display=swap');
        .hover-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; height: 100%; display: flex; flex-direction: column; }
        .hover-lift:hover { transform: translateY(-8px); box-shadow: ${theme.shadowHover}; }
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
        .btn-ghost { background: rgba(255,255,255,0.7); border: 1.5px solid ${theme.border}; color: ${theme.navy}; }
        .btn-ghost:hover { background: white; }
        .grid-2 { display: grid; gap: 30px; grid-template-columns: repeat(2, 1fr); }
        .grid-4 { display: grid; gap: 30px; grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 1024px) { .grid-2, .grid-4 { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .grid-2, .grid-4 { grid-template-columns: 1fr; } }
        
        /* Layout Utilities */
        .desktop-only { display: inline-flex; }
        .mobile-only { display: none; }
        .section-header-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 50px; }
        
        @media (max-width: 768px) { 
          .section-header-row { flex-direction: column; align-items: flex-start; margin-bottom: 30px; } 
          .desktop-only { display: none !important; }
          .mobile-only { display: flex; justify-content: center; margin-top: 24px; }
        }
        
        /* SCROLLABLE CAROUSEL CLASSES */
        .scroll-wrapper {
          position: relative;
        }
        .scroll-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: white;
          border: 1px solid ${theme.border};
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: ${theme.navy};
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .scroll-arrow:hover {
          background: ${theme.sky};
          color: white;
          border-color: ${theme.sky};
          transform: translateY(-50%) scale(1.05);
        }
        .scroll-arrow.left { left: -25px; }
        .scroll-arrow.right { right: -25px; }

        @media (max-width: 768px) {
          .scroll-arrow { width: 40px; height: 40px; font-size: 1rem; }
          .scroll-arrow.left { left: -10px; }
          .scroll-arrow.right { right: -10px; }
        }

        .scroll-container {
          display: flex;
          overflow-x: auto;
          gap: 30px;
          padding: 20px 10px 40px 10px;
          margin: -20px -10px 0;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          /* Hide scrollbars */
          -ms-overflow-style: none;
          scrollbar-width: none; 
        }
        .scroll-container::-webkit-scrollbar {
          display: none; 
        }
        
        .scroll-item {
          flex: 0 0 calc(33.333% - 20px);
          scroll-snap-align: start;
          min-width: 320px;
        }
        @media (max-width: 1024px) {
          .scroll-item { flex: 0 0 calc(50% - 15px); }
        }
        @media (max-width: 768px) {
          .scroll-item { flex: 0 0 100%; min-width: unset; }
          .hero-section {
            padding-top: 50px !important;
            padding-bottom: 20px !important;
          }
          .secondary-hero-section {
            padding-top: 80px !important;
          }
          .hero-image-frame {
            aspect-ratio: 3/4 !important;
            min-height: 420px;
          }
        }
      `}</style>

      {/* ===== HERO SECTION ===== */}
      <section
        className="hero-section"
        style={{
          padding: "120px 0",
          background: "white",
          overflow: "hidden",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ width: theme.container, margin: "0 auto" }}>
          <div className="grid-2" style={{ alignItems: "center", gap: "60px" }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{ position: "relative" }}
            >
              <div
                className="hero-image-frame"
                style={{
                  aspectRatio: "4/3",
                  borderRadius: "40px",
                  background: `linear-gradient(135deg, ${theme.skyLight}, #f0f9ff)`,
                  border: `1px solid ${theme.borderLight}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: theme.shadow,
                }}
              >
                {/* Abstract graphic or image representing clear vision */}
                <img
                  src="/assets/doctor.png"
                  alt="Clear vision"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span
                style={{
                  background: theme.skyLight,
                  padding: "6px 14px",
                  borderRadius: "40px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: theme.sky,
                  display: "inline-block",
                  marginBottom: "16px",
                }}
              >
                Life-Changing Care
              </span>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  /* smaller minimum for better mobile readability */
                  fontSize: "clamp(1.6rem, 4.5vw, 3rem)",
                  lineHeight: 1.1,
                  margin: "0 0 24px",
                  color: theme.navy,
                }}
              >
                We Don't Just Treat Eyes. <br />
                <span style={{ color: theme.sky, fontStyle: "italic" }}>
                  We Restore Your World.
                </span>
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: theme.slate,
                  lineHeight: 1.7,
                  marginBottom: "20px",
                }}
              >
                Vision is more than reading letters on a screen. It’s about
                seeing the people you love, watching a sunset without squinting,
                and experiencing life with complete freedom.
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  color: theme.slate,
                  lineHeight: 1.7,
                  marginBottom: "32px",
                }}
              >
                Every day, our dedicated team comes to work with one simple
                mission: to give you back the moments that matter most. Because
                your vision is your independence.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "nowrap",
                  marginBottom: "32px",
                }}
              >
                <Link
                  to="/appointment"
                  className="btn btn-primary"
                  style={{ fontSize: "clamp(0.77rem, 2.4vw, 1rem)" }}
                >
                  Book Appointment
                </Link>
                <Link
                  to="/services"
                  className="btn btn-outline"
                  style={{ fontSize: "clamp(0.82rem, 2.4vw, 1rem)" }}
                >
                  Explore Services
                </Link>
              </div>
              {/* <Link to="/about" className="btn btn-outline">
                Read Our Patient Stories
              </Link> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== HERO SECTION ===== */}

      {/* ===== SERVICES (Scrollable 3 per row) ===== */}
      <section style={{ padding: "80px 0", background: theme.bg }}>
        <div
          style={{
            width: theme.container,
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <div className="section-header-row">
            <div>
              <span
                style={{
                  background: theme.skyLight,
                  padding: "6px 14px",
                  borderRadius: "40px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: theme.sky,
                  display: "inline-block",
                  marginBottom: "16px",
                }}
              >
                Specialties
              </span>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  margin: "0 0 16px",
                  color: theme.navy,
                }}
              >
                Advanced Treatments
              </h2>
              <p style={{ color: theme.slate, maxWidth: "700px", margin: 0 }}>
                From routine exams to complex surgeries – we cover every aspect
                of eye health.
              </p>
            </div>
            <Link to="/services" className="btn btn-primary desktop-only">
              See All Services →
            </Link>
          </div>

          {loading ? (
            <div>Loading services...</div>
          ) : activeServices.length === 0 ? (
            <div>No services found</div>
          ) : (
            <div className="scroll-wrapper">
              <button
                className="scroll-arrow left"
                onClick={() => handleScroll(servicesScrollRef, -1)}
              >
                &#10094;
              </button>

              <motion.div
                ref={servicesScrollRef}
                className="scroll-container"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {activeServices.map((svc, i) => {
                  const accent = accentColors[i % accentColors.length];
                  return (
                    <div key={svc._id} className="scroll-item">
                      <motion.div
                        variants={fadeUp}
                        className="hover-lift"
                        style={{
                          background: "white",
                          borderRadius: "32px",
                          padding: "32px",
                          border: `1px solid ${theme.border}`,
                          borderBottom: `4px solid ${accent.primary}`,
                          boxShadow: theme.shadow,
                          textAlign: "left",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "2rem",
                            marginBottom: "20px",
                            textAlign: "center",
                            background: accent.light,
                            width: "60px",
                            height: "60px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            margin: "0 auto 16px",
                            color: accent.primary,
                          }}
                        >
                          🩺
                        </div>
                        <h3
                          style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: "1.4rem",
                            margin: "0 0 12px",
                            color: theme.navy,
                            textAlign: "center",
                          }}
                        >
                          {svc.title}
                        </h3>
                        <p
                          style={{
                            color: theme.slate,
                            lineHeight: 1.6,
                            marginBottom: "24px",
                            flexGrow: 1,
                            textAlign: "center",
                          }}
                        >
                          {svc.description?.slice(0, 90)}…
                        </p>
                        <Link
                          to="/appointment"
                          className="btn btn-primary"
                          style={{
                            width: "100%",
                            justifyContent: "center",
                            background: accent.primary,
                            boxShadow: `0 8px 20px ${accent.light}`,
                          }}
                        >
                          Book Now
                        </Link>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>

              <button
                className="scroll-arrow right"
                onClick={() => handleScroll(servicesScrollRef, 1)}
              >
                &#10095;
              </button>
            </div>
          )}

          <div className="mobile-only">
            <Link
              to="/services"
              className="btn btn-outline"
              style={{ width: "100%" }}
            >
              See All Services →
            </Link>
          </div>
        </div>
      </section>

      <section
        className="secondary-hero-section"
        ref={heroRef}
        style={{
          position: "relative",
          padding: "120px 0 100px",
          background:
            "linear-gradient(145deg, #e0f2fe 0%, #f0f9ff 50%, #ffffff 100%)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: theme.container,
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          <motion.div
            initial="hidden"
            animate={isHeroVisible ? "visible" : "hidden"}
            variants={fadeUp}
          >
            <div
              className="grid-2"
              style={{ alignItems: "center", gap: "40px" }}
            >
              <div>
                <span
                  style={{
                    background: theme.skyLight,
                    padding: "6px 14px",
                    borderRadius: "40px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: theme.sky,
                    display: "inline-block",
                    marginBottom: "20px",
                  }}
                >
                  ✦ World‑Class Eye Care
                </span>
                <h1
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "clamp(1.85rem, 4.5vw, 3.5rem)",
                    lineHeight: 1.05,
                    margin: "0 0 20px",
                    color: theme.navy,
                  }}
                >
                  Your Vision,
                  <em style={{ color: theme.sky }}>Our Promise</em>
                </h1>
                <p
                  style={{
                    fontSize: "1.1rem",
                    color: theme.slate,
                    lineHeight: 1.6,
                    marginBottom: "32px",
                    maxWidth: "500px",
                  }}
                >
                  Expert ophthalmologists, advanced technology, and a smooth
                  journey from consultation to recovery.
                </p>
              </div>
              <div
                style={{
                  background: "white",
                  borderRadius: "48px",
                  padding: "32px",
                  boxShadow: theme.shadow,
                  border: `1px solid ${theme.border}`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>👁️</div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontFamily: "'DM Serif Display', serif",
                    margin: 0,
                    color: theme.navy,
                  }}
                >
                  Same‑Day
                </h3>
                <p style={{ color: theme.slate, margin: "8px 0 20px" }}>
                  Emergency consultations available
                </p>
                <a
                  href={`tel:${primaryPhone}`}
                  className="btn btn-primary"
                  style={{ background: theme.sky }}
                >
                  Call Now
                </a>
                {/* <div
                  style={{
                    marginTop: "24px",
                    fontSize: "0.85rem",
                    color: theme.slate,
                  }}
                >
                  ⭐ 4.9 ★ from 2,400+ patients
                </div> */}
              </div>
            </div>
          </motion.div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: theme.bg,
            clipPath: "ellipse(60% 100% at 50% 100%)",
          }}
        />
      </section>

      {/* ===== DOCTORS SECTION ===== */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div
          style={{
            width: theme.container,
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <div className="section-header-row">
            <div>
              <span
                style={{
                  background: theme.skyLight,
                  padding: "6px 14px",
                  borderRadius: "40px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: theme.sky,
                  display: "inline-block",
                  marginBottom: "16px",
                }}
              >
                Our Doctors
              </span>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  margin: "0 0 16px",
                  color: theme.navy,
                }}
              >
                Meet Your Specialists
              </h2>
              <p style={{ color: theme.slate, maxWidth: "700px", margin: 0 }}>
                Highly experienced, board‑certified ophthalmologists dedicated
                to your vision.
              </p>
            </div>
            <Link to="/doctors" className="btn btn-primary desktop-only">
              See All Doctors →
            </Link>
          </div>

          {loading ? (
            <div>Loading doctors...</div>
          ) : activeDoctors.length === 0 ? (
            <div>No doctors found</div>
          ) : (
            <div className="scroll-wrapper">
              <button
                className="scroll-arrow left"
                onClick={() => handleScroll(doctorsScrollRef, -1)}
              >
                &#10094;
              </button>

              <motion.div
                ref={doctorsScrollRef}
                className="scroll-container"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {activeDoctors.map((doc, i) => {
                  const docAccent = accentColors[(i + 2) % accentColors.length]; // Offset color index
                  return (
                    <div key={doc._id} className="scroll-item">
                      <motion.div
                        variants={fadeUp}
                        className="hover-lift"
                        style={{
                          background: `linear-gradient(145deg, ${theme.white}, ${theme.bg})`,
                          borderRadius: "32px",
                          padding: "28px",
                          border: `1px solid ${theme.border}`,
                          position: "relative",
                          transition: "all 0.3s ease",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 20,
                            right: 20,
                            height: "4px",
                            background: `linear-gradient(90deg, ${docAccent.primary}, ${docAccent.hover})`,
                            borderRadius: "4px",
                          }}
                        />

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 20,
                          }}
                        >
                          {doc.photo ? (
                            <img
                              src={doc.photo}
                              alt={doc.name}
                              style={{
                                width: "130px",
                                height: "130px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: `4px solid ${theme.white}`,
                                boxShadow: `0 15px 30px ${docAccent.light}`,
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "130px",
                                height: "130px",
                                borderRadius: "50%",
                                background: `linear-gradient(135deg, ${docAccent.primary}, ${docAccent.hover})`,
                                display: "grid",
                                placeItems: "center",
                                color: "white",
                                fontSize: "2rem",
                                fontWeight: 800,
                                fontFamily: "'DM Serif Display', serif",
                                boxShadow: `0 15px 30px ${docAccent.light}`,
                              }}
                            >
                              {getInitials(doc.name)}
                            </div>
                          )}
                        </div>

                        <div style={{ textAlign: "center", marginBottom: 12 }}>
                          <span
                            style={{
                              background: docAccent.light,
                              color: docAccent.primary,
                              padding: "4px 12px",
                              borderRadius: "40px",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                            }}
                          >
                            {doc.role || "Specialist"}
                          </span>
                        </div>

                        <h3
                          style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: "1.6rem",
                            margin: "0 0 6px",
                            textAlign: "center",
                            color: theme.navy,
                          }}
                        >
                          {doc.name}
                        </h3>

                        <p
                          style={{
                            color: theme.slate,
                            fontSize: "0.9rem",
                            lineHeight: 1.6,
                            textAlign: "center",
                            margin: "12px 0 16px",
                            flexGrow: 1,
                          }}
                        >
                          {doc.bio?.length > 100
                            ? `${doc.bio.slice(0, 100)}...`
                            : doc.bio ||
                              "Experienced eye care specialist committed to excellence."}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            margin: "20px 0 16px",
                            padding: "12px 0",
                            borderTop: `1px solid ${theme.borderLight}`,
                            borderBottom: `1px solid ${theme.borderLight}`,
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <div
                              style={{
                                fontWeight: 800,
                                fontSize: "1.2rem",
                                color: docAccent.primary,
                              }}
                            >
                              {doc.experienceYears || "10"}+
                            </div>
                            <div
                              style={{ fontSize: "0.7rem", color: theme.slate }}
                            >
                              Years
                            </div>
                          </div>
                          <div style={{ textAlign: "center" }}>
                            <div
                              style={{
                                fontWeight: 800,
                                fontSize: "1.2rem",
                                color: docAccent.primary,
                              }}
                            >
                              ⭐ {doc.rating || "4.5"}
                            </div>
                            <div
                              style={{ fontSize: "0.7rem", color: theme.slate }}
                            >
                              Rating
                            </div>
                          </div>
                          <div style={{ textAlign: "center" }}>
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: "0.8rem",
                                color: docAccent.primary,
                              }}
                            >
                              {doc.availabilityStatus || "Available"}
                            </div>
                            <div
                              style={{ fontSize: "0.7rem", color: theme.slate }}
                            >
                              Status
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            gap: 12,
                            justifyContent: "center",
                          }}
                        >
                          <Link
                            to="/appointment"
                            className="btn btn-primary"
                            style={{
                              padding: "8px 20px",
                              fontSize: "0.8rem",
                              background: docAccent.primary,
                              width: "100%",
                            }}
                          >
                            Book
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>

              <button
                className="scroll-arrow right"
                onClick={() => handleScroll(doctorsScrollRef, 1)}
              >
                &#10095;
              </button>
            </div>
          )}

          <div className="mobile-only">
            <Link
              to="/doctors"
              className="btn btn-outline"
              style={{ width: "100%" }}
            >
              See All Doctors →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US (value grid) ===== */}
      <section style={{ padding: "80px 0", background: theme.bg }}>
        <div
          style={{
            width: theme.container,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              margin: "0 0 16px",
              color: theme.navy,
            }}
          >
            Why Choose Us
          </h2>
          <p
            style={{
              color: theme.slate,
              maxWidth: "700px",
              margin: "0 auto 50px",
            }}
          >
            We combine clinical excellence with genuine compassion.
          </p>
          <div className="grid-4">
            {values.map((v, i) => {
              const valAccent = accentColors[i % accentColors.length];
              return (
                <div
                  key={i}
                  className="hover-lift"
                  style={{
                    background: "white",
                    borderRadius: "28px",
                    padding: "32px 24px",
                    border: `1px solid ${theme.border}`,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      marginBottom: "16px",
                      background: valAccent.light,
                      width: "60px",
                      height: "60px",
                      margin: "0 auto 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "16px",
                      color: valAccent.primary,
                    }}
                  >
                    {v.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.2rem",
                      margin: "0 0 12px",
                      color: theme.navy,
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: theme.slate,
                      margin: 0,
                    }}
                  >
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA + FAQ (combined) ===== */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div style={{ width: theme.container, margin: "0 auto" }}>
          <div className="grid-2" style={{ alignItems: "center", gap: "50px" }}>
            <div>
              <span
                style={{
                  background: theme.skyLight,
                  padding: "6px 14px",
                  borderRadius: "40px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: theme.sky,
                  display: "inline-block",
                  marginBottom: "16px",
                }}
              >
                Ready to Start?
              </span>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  margin: "0 0 20px",
                  color: theme.navy,
                }}
              >
                Book Your Consultation Today
              </h2>
              <p style={{ color: theme.slate, marginBottom: "32px" }}>
                Take the first step toward clearer vision. Our team is here to
                answer your questions and schedule your visit.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "nowrap" }}>
                <Link to="/appointment" className="btn btn-primary">
                  Book Appointment →
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Contact Us
                </Link>
              </div>
            </div>
            <div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontFamily: "'DM Serif Display', serif",
                  marginBottom: "24px",
                  color: theme.navy,
                }}
              >
                Frequently Asked Questions
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {faq.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: `1px solid ${theme.border}`,
                      borderRadius: "24px",
                      overflow: "hidden",
                      background: theme.bg,
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "18px 24px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontFamily: "inherit",
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: theme.navy,
                      }}
                    >
                      {item.q}
                      <span style={{ fontSize: "1.2rem", color: theme.sky }}>
                        {openFaq === idx ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === idx && (
                      <div
                        style={{
                          padding: "0 24px 24px",
                          color: theme.slate,
                          lineHeight: 1.6,
                        }}
                      >
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
