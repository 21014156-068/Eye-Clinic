import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { usePublicSite } from "../hooks/PublicSiteContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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

export default function AboutPage() {
  const { doctors, loading } = usePublicSite();
  const activeDoctors = doctors.filter((d) => d.active !== false);
  const featuredDoctors = activeDoctors.slice(0, 6);

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

  const heroRef = useRef(null);
  const isHeroVisible = useInView(heroRef, { once: true, margin: "-100px" });

  // Helper
  const getInitials = (name) => {
    if (!name) return "DR";
    const parts = name.split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const expertise = [
    {
      icon: "👁️",
      title: "Cataract Surgery",
      desc: "Modern lens replacement with precision and care.",
    },
    {
      icon: "⚡",
      title: "LASIK / Refractive",
      desc: "Freedom from glasses with advanced laser technology.",
    },
    {
      icon: "🔍",
      title: "Retina Care",
      desc: "Specialist management of diabetic eye disease and floaters.",
    },
    {
      icon: "🛡️",
      title: "Glaucoma Management",
      desc: "Long-term pressure control and vision preservation.",
    },
    {
      icon: "👶",
      title: "Pediatric Eye Care",
      desc: "Gentle exams and myopia management for children.",
    },
    {
      icon: "🩺",
      title: "General Eye Health",
      desc: "Comprehensive checkups for all ages.",
    },
  ];

  const whyUs = [
    {
      icon: "👨‍⚕️",
      title: "Expert Specialists",
      desc: "Led by experienced ophthalmologists and surgeons.",
    },
    {
      icon: "🔬",
      title: "Advanced Technology",
      desc: "Latest diagnostic and surgical equipment.",
    },
    {
      icon: "❤️",
      title: "Patient First",
      desc: "Clear communication and personalized care.",
    },
    {
      icon: "⭐",
      title: "Proven Results",
      desc: "Thousands of satisfied patients and successful procedures.",
    },
  ];

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
        
        .grid-2 { display: grid; gap: 40px; grid-template-columns: repeat(2, 1fr); }
        .grid-3 { display: grid; gap: 30px; grid-template-columns: repeat(3, 1fr); }
        .grid-4 { display: grid; gap: 30px; grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 1024px) { .grid-2, .grid-3, .grid-4 { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; } }
        
        /* Floating Glow Animation */
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

      {/* ========== HERO / OUR STORY ========== */}
      <section
        ref={heroRef}
        style={{
          padding: "140px 0 100px",
          background: `linear-gradient(145deg, #e0f2fe 0%, #ffffff 100%)`,
          position: "relative",
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
        ></div>
        <div
          className="ambient-glow"
          style={{
            width: "300px",
            height: "300px",
            background: accentColors[3].light,
            bottom: "-50px",
            left: "-50px",
            animationDelay: "2s",
          }}
        ></div>

        <div
          style={{
            width: theme.container,
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div className="grid-2" style={{ alignItems: "center", gap: "60px" }}>
            <motion.div
              initial="hidden"
              animate={isHeroVisible ? "visible" : "hidden"}
              variants={fadeUp}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  borderRadius: "40px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: theme.white,
                  color: theme.sky,
                  boxShadow: theme.shadow,
                  marginBottom: "20px",
                }}
              >
                Our Story
              </span>
              <h1
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(2rem, 4vw, 4rem)",
                  lineHeight: 1.1,
                  margin: "0 0 24px",
                  color: theme.navy,
                }}
              >
                A commitment {}
                <em style={{ color: theme.sky }}>to care.</em>
              </h1>
              <p
                style={{
                  color: theme.slate,
                  lineHeight: 1.7,
                  fontSize: "1.1rem",
                  marginBottom: "20px",
                  maxWidth: "500px",
                }}
              >
                Founded in 2013, we set out to change how eye care feels — no
                rushed appointments, no confusing jargon. Just expert doctors
                who listen, explain, and care.
              </p>
              <p
                style={{
                  color: theme.slate,
                  lineHeight: 1.7,
                  fontSize: "1.1rem",
                  marginBottom: "32px",
                  maxWidth: "500px",
                }}
              >
                Today, we're proud to be a trusted partner for thousands of
                families, offering advanced treatments like LASIK, cataract
                surgery, and retina care with a human touch.
              </p>
            </motion.div>

            {/* Premium Aesthetic Stat Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isHeroVisible
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ position: "relative" }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "40px",
                  padding: "50px 40px",
                  textAlign: "center",
                  border: `1px solid ${theme.border}`,
                  boxShadow: theme.shadowHover,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "24px",
                    background: accentColors[4].light,
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "24px",
                    margin: "0 auto 24px",
                    color: accentColors[4].primary,
                  }}
                >
                  👁️
                </div>
                <h3
                  style={{
                    fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                    fontFamily: "'DM Serif Display', serif",
                    margin: 0,
                    color: theme.navy,
                  }}
                >
                  Excellence in Vision
                </h3>
                <p
                  style={{
                    color: theme.slate,
                    fontSize: "1.1rem",
                    marginTop: "12px",
                  }}
                >
                  Years of dedicated eye care
                </p>
                <hr
                  style={{ margin: "30px 0", borderColor: theme.borderLight }}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: 800,
                        color: accentColors[1].primary,
                      }}
                    >
                      10+
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: theme.slate,
                        fontWeight: 600,
                      }}
                    >
                      Specialists
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: 800,
                        color: accentColors[3].primary,
                      }}
                    >
                      100%
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: theme.slate,
                        fontWeight: 600,
                      }}
                    >
                      Satisfaction
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative background element behind card */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "-20px",
                  bottom: "-20px",
                  left: "20px",
                  background: `linear-gradient(135deg, ${accentColors[0].light}, ${accentColors[4].light})`,
                  borderRadius: "40px",
                  zIndex: 1,
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== EXPERTISE CARDS ========== */}
      <section style={{ padding: "100px 0", background: theme.bg }}>
        <div
          style={{
            width: theme.container,
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: theme.skyLight,
              color: theme.sky,
              padding: "6px 14px",
              borderRadius: "40px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            What We Do
          </span>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(1.5rem, 6vw, 3rem)",
              margin: "0 auto 16px",
              color: theme.navy,
              maxWidth: "1000px",
            }}
          >
            Comprehensive eye care under one roof
          </h2>
          <p
            style={{
              color: theme.slate,
              maxWidth: "700px",
              margin: "0 auto 50px",
              fontSize: "1.1rem",
            }}
          >
            From routine checkups to advanced surgeries — we've got you covered.
          </p>

          <motion.div
            className="grid-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {expertise.map((item, idx) => {
              const accent = accentColors[idx % accentColors.length];
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="hover-lift"
                  style={{
                    background: theme.white,
                    borderRadius: "32px",
                    padding: "32px",
                    border: `1px solid ${theme.border}`,
                    borderBottom: `4px solid ${accent.primary}`,
                    boxShadow: theme.shadow,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      margin: "0 auto 20px",
                      background: accent.light,
                      width: "60px",
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "16px",
                      color: accent.primary,
                      lineHeight: 1,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      fontFamily: "'DM Serif Display', serif",
                      margin: "0 0 12px",
                      color: theme.navy,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: theme.slate,
                      lineHeight: 1.6,
                      margin: 0,
                      flexGrow: 1,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== MEET OUR TEAM - ADVANCED DOCTOR CARDS ========== */}
      <section style={{ padding: "100px 0", background: theme.white }}>
        <div
          style={{
            width: theme.container,
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: theme.skyLight,
              color: theme.sky,
              padding: "6px 14px",
              borderRadius: "40px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Our Experts
          </span>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
              margin: "0 auto 16px",
              color: theme.navy,
              textAlign: "center",
            }}
          >
            Meet the faces behind your care
          </h2>
          <p
            style={{
              color: theme.slate,
              maxWidth: "700px",
              margin: "0 auto 50px",
              fontSize: "1.1rem",
              textAlign: "center",
            }}
          >
            Highly skilled, compassionate, and dedicated to your vision.
          </p>

          {loading ? (
            <div>Loading doctors...</div>
          ) : featuredDoctors.length === 0 ? (
            <div>No doctors found in database.</div>
          ) : (
            <motion.div
              className="grid-3"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredDoctors.map((doc, i) => {
                const docAccent = accentColors[(i + 2) % accentColors.length]; // Offset color index for variety
                return (
                  <motion.div
                    key={doc._id}
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
                        background: `linear-gradient(90deg, ${docAccent.primary}, ${docAccent.hover})`,
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

                    {/* Role badge */}
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

                    {/* Name */}
                    <h3
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "1.6rem",
                        margin: "0 0 6px",
                        color: theme.navy,
                      }}
                    >
                      {doc.name}
                    </h3>

                    {/* Bio */}
                    <p
                      style={{
                        color: theme.slate,
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
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
                            color: docAccent.primary,
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
                            color: docAccent.primary,
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
                            color: docAccent.primary,
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
                        to="/appointment"
                        className="btn btn-primary"
                        style={{
                          padding: "8px 20px",
                          fontSize: "0.8rem",
                          background: docAccent.primary,
                        }}
                      >
                        Book
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link to="/doctors" className="btn btn-outline">
              View All Doctors →
            </Link>
          </div>
        </div>
      </section>

      {/* ========== CLEAN EMOTIONAL IMPACT SECTION ========== */}
      <section
        style={{ padding: "100px 0", background: theme.bg, overflow: "hidden" }}
      >
        <div style={{ width: theme.container, margin: "0 auto" }}>
          <div className="grid-2" style={{ alignItems: "center", gap: "60px" }}>
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
                Our Philosophy
              </span>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  /* smaller minimum for better mobile readability */
                  fontSize: "clamp(1.5rem, 5vw, 3rem)",
                  lineHeight: 1.1,
                  margin: "0 0 24px",
                  color: theme.navy,
                }}
              >
                We measure our success by {}
                <span style={{ color: theme.sky, fontStyle: "italic" }}>
                  the moments we restore.
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
                Behind every chart and every diagnosis is a person whose life is
                shaped by how well they can see the world. We never lose sight
                of that.
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  color: theme.slate,
                  lineHeight: 1.7,
                  marginBottom: "32px",
                }}
              >
                Our approach merges elite clinical precision with a deeply human
                touch, ensuring that when you walk out of our doors, you’re
                stepping into a brighter, clearer future.
              </p>
              <Link
                to="/services"
                className="btn btn-primary"
                style={{
                  display: "block",
                  width: "fit-content",
                  margin: "0 auto",
                }}
              >
                Explore Our Treatments
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{ position: "relative" }}
            >
              <div
                style={{
                  aspectRatio: "4/3",
                  borderRadius: "40px",
                  background: `linear-gradient(135deg, ${accentColors[3].light}, #fffbeb)`, // Warm Amber light
                  border: `1px solid ${theme.borderLight}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: theme.shadow,
                }}
              >
                {/* Book graphic representing returning to hobbies/reading */}
                <div style={{ fontSize: "6rem" }}>📖</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section style={{ padding: "100px 0", background: theme.white }}>
        <div
          style={{
            width: theme.container,
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: theme.skyLight,
              color: theme.sky,
              padding: "6px 14px",
              borderRadius: "40px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Why Patients Trust Us
          </span>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              margin: "0 auto 16px",
              color: theme.navy,
              textAlign: "center",
            }}
          >
            Care that puts you first
          </h2>
          <p
            style={{
              color: theme.slate,
              maxWidth: "700px",
              margin: "0 auto 50px",
              fontSize: "1.1rem",
              textAlign: "center",
            }}
          >
            We believe in transparency, empathy, and results.
          </p>

          <motion.div
            className="grid-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {whyUs.map((item, idx) => {
              const valAccent = accentColors[idx % accentColors.length];
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="hover-lift"
                  style={{
                    background: theme.bg, // using bg color here to offset the white section background
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
                    {item.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      margin: "0 0 12px",
                      color: theme.navy,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: theme.slate,
                      fontSize: "0.9rem",
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
