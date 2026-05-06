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

export default function HomePage() {
  const { services, doctors, loading, settings } = usePublicSite();
  const heroRef = useRef(null);
  const isHeroVisible = useInView(heroRef, { once: true, margin: "-100px" });

  const activeServices = (services || [])
    .filter((s) => s.active !== false)
    .slice(0, 6);

  // Changed from 4 to 6 so the scrollable area is utilized better
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
        
        /* SCROLLABLE CAROUSEL CLASSES */
        .scroll-container {
          display: flex;
          overflow-x: auto;
          gap: 30px;
          padding: 20px 10px 40px 10px; /* Padding accommodates hover shadow */
          margin: -20px -10px 0;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
        }
        .scroll-container::-webkit-scrollbar {
          height: 8px;
        }
        .scroll-container::-webkit-scrollbar-track {
          background: ${theme.borderLight};
          border-radius: 10px;
        }
        .scroll-container::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .scroll-container::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .scroll-item {
          flex: 0 0 calc(33.333% - 20px); /* 3 Items per row */
          scroll-snap-align: start;
          min-width: 320px;
        }
        @media (max-width: 1024px) {
          .scroll-item { flex: 0 0 calc(50% - 15px); }
        }
        @media (max-width: 768px) {
          .scroll-item { flex: 0 0 100%; min-width: unset; }
        }
      `}</style>

      {/* ===== HERO SECTION ===== */}
      <section
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
                    fontSize: "clamp(2.5rem, 4vw, 4rem)",
                    lineHeight: 1.05,
                    margin: "0 0 20px",
                    color: theme.navy,
                  }}
                >
                  Your Vision,
                  <em style={{ color: theme.sky, fontStyle: "italic" }}>
                    Our Promise
                  </em>
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
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    flexWrap: "wrap",
                    marginBottom: "32px",
                  }}
                >
                  <Link to="/appointment" className="btn btn-primary">
                    Book Appointment →
                  </Link>
                  <Link to="/services" className="btn btn-outline">
                    Explore Services
                  </Link>
                </div>
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
                <div
                  style={{
                    marginTop: "24px",
                    fontSize: "0.85rem",
                    color: theme.slate,
                  }}
                >
                  ⭐ 4.9 ★ from 2,400+ patients
                </div>
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

      {/* ===== SERVICES (Scrollable 3 per row) ===== */}
      <section style={{ padding: "80px 0", background: theme.bg }}>
        <div
          style={{
            width: theme.container,
            margin: "0 auto",
            textAlign: "center",
          }}
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
          <p
            style={{
              color: theme.slate,
              maxWidth: "700px",
              margin: "0 auto 50px",
            }}
          >
            From routine exams to complex surgeries – we cover every aspect of
            eye health.
          </p>

          {loading ? (
            <div>Loading services...</div>
          ) : activeServices.length === 0 ? (
            <div>No services found</div>
          ) : (
            <motion.div
              className="scroll-container"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {activeServices.map((svc, i) => (
                <div key={svc._id} className="scroll-item">
                  <motion.div
                    variants={fadeUp}
                    className="hover-lift"
                    style={{
                      background: "white",
                      borderRadius: "32px",
                      padding: "32px",
                      border: `1px solid ${theme.border}`,
                      boxShadow: theme.shadow,
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2.5rem",
                        marginBottom: "16px",
                        textAlign: "center",
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
                      to={`/services/${svc.slug || svc._id}`}
                      className="btn btn-outline"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      Learn More →
                    </Link>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          )}
          <div style={{ marginTop: "24px" }}>
            <Link to="/services" className="btn btn-primary">
              See All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== DOCTORS SECTION (Scrollable 3 per row + AboutPage Design) ===== */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div
          style={{
            width: theme.container,
            margin: "0 auto",
            textAlign: "center",
          }}
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
          <p
            style={{
              color: theme.slate,
              maxWidth: "700px",
              margin: "0 auto 50px",
            }}
          >
            Highly experienced, board‑certified ophthalmologists dedicated to
            your vision.
          </p>

          {loading ? (
            <div>Loading doctors...</div>
          ) : activeDoctors.length === 0 ? (
            <div>No doctors found</div>
          ) : (
            <motion.div
              className="scroll-container"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {activeDoctors.map((doc) => (
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
                    {/* Decorative top bar */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 20,
                        right: 20,
                        height: "4px",
                        background: `linear-gradient(90deg, ${theme.sky}, ${theme.skyMid})`,
                        borderRadius: "4px",
                      }}
                    />

                    {/* Avatar / Photo */}
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
                            boxShadow: "0 15px 30px rgba(14,165,233,0.2)",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "130px",
                            height: "130px",
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${theme.sky}, ${theme.skyMid})`,
                            display: "grid",
                            placeItems: "center",
                            color: "white",
                            fontSize: "2rem",
                            fontWeight: 800,
                            fontFamily: "'DM Serif Display', serif",
                            boxShadow: "0 15px 30px rgba(14,165,233,0.2)",
                          }}
                        >
                          {getInitials(doc.name)}
                        </div>
                      )}
                    </div>

                    {/* Role badge */}
                    <div style={{ textAlign: "center", marginBottom: 12 }}>
                      <span
                        style={{
                          background: theme.skyLight,
                          color: theme.skyHover,
                          padding: "4px 12px",
                          borderRadius: "40px",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                        }}
                      >
                        {doc.role || "Specialist"}
                      </span>
                    </div>

                    {/* Name */}
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

                    {/* Specialization */}
                    <div style={{ textAlign: "center", marginBottom: 12 }}>
                      <div style={{ color: theme.sky, fontWeight: 600 }}>
                        {doc.specialization ||
                          doc.focus?.[0] ||
                          "Ophthalmologist"}
                      </div>
                      {doc.focus && doc.focus.length > 1 && (
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 6,
                            justifyContent: "center",
                            marginTop: 8,
                          }}
                        >
                          {doc.focus.slice(1, 4).map((f) => (
                            <span
                              key={f}
                              style={{
                                fontSize: "0.7rem",
                                background: theme.borderLight,
                                padding: "2px 10px",
                                borderRadius: "20px",
                                color: theme.navyMid,
                              }}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bio */}
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

                    {/* Stats row */}
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
                            color: theme.skyHover,
                          }}
                        >
                          {doc.experienceYears || "10"}+
                        </div>
                        <div style={{ fontSize: "0.7rem", color: theme.slate }}>
                          Years
                        </div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div
                          style={{
                            fontWeight: 800,
                            fontSize: "1.2rem",
                            color: theme.skyHover,
                          }}
                        >
                          ⭐ {doc.rating || "4.5"}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: theme.slate }}>
                          Rating
                        </div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: "0.8rem",
                            color: theme.skyHover,
                          }}
                        >
                          {doc.availabilityStatus || "Available"}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: theme.slate }}>
                          Status
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        justifyContent: "center",
                      }}
                    >
                      <Link
                        to={`/doctors/${doc._id}`}
                        className="btn btn-outline"
                        style={{ padding: "8px 20px", fontSize: "0.8rem" }}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/appointment"
                        className="btn btn-primary"
                        style={{ padding: "8px 20px", fontSize: "0.8rem" }}
                      >
                        Book
                      </Link>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          )}
          <div style={{ marginTop: "24px" }}>
            <Link to="/doctors" className="btn btn-primary">
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
            Why Choose Us
          </span>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              margin: "0 0 16px",
              color: theme.navy,
            }}
          >
            Confidence in Every Step
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
            {values.map((v, i) => (
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
                <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
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
                  style={{ fontSize: "0.9rem", color: theme.slate, margin: 0 }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
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
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
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
