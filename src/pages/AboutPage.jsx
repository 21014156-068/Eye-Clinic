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
      title: "Cataract Surgery",
      desc: "Modern lens replacement with precision and care.",
    },
    {
      title: "LASIK / Refractive",
      desc: "Freedom from glasses with advanced laser technology.",
    },
    {
      title: "Retina Care",
      desc: "Specialist management of diabetic eye disease and floaters.",
    },
    {
      title: "Glaucoma Management",
      desc: "Long-term pressure control and vision preservation.",
    },
    {
      title: "Pediatric Eye Care",
      desc: "Gentle exams and myopia management for children.",
    },
    {
      title: "General Eye Health",
      desc: "Comprehensive checkups for all ages.",
    },
  ];

  const whyUs = [
    {
      icon: "👁️",
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
        .hover-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .hover-lift:hover { transform: translateY(-8px); box-shadow: ${theme.shadowHover}; }
        .gradient-text { background: linear-gradient(135deg, ${theme.sky}, ${theme.skyMid}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 40px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }
        .btn-primary { background: ${theme.sky}; color: white; box-shadow: 0 8px 20px rgba(14,165,233,0.3); }
        .btn-primary:hover { background: ${theme.skyHover}; transform: translateY(-2px); }
        .btn-outline { background: transparent; border: 1.5px solid ${theme.sky}; color: ${theme.sky}; }
        .btn-outline:hover { background: ${theme.skyLight}; transform: translateY(-2px); }
        .grid-2 { display: grid; gap: 30px; grid-template-columns: repeat(2, 1fr); }
        .grid-3 { display: grid; gap: 30px; grid-template-columns: repeat(3, 1fr); }
        .grid-4 { display: grid; gap: 30px; grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 1024px) { .grid-2, .grid-3, .grid-4 { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; } }
      `}</style>

      {/* ========== OUR STORY (minimal, fresh) ========== */}
      <section style={{ padding: "100px 0", background: theme.white }}>
        <div style={{ width: theme.container, margin: "0 auto" }}>
          <div className="grid-2" style={{ alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span
                style={{
                  ...s.eyebrowBase,
                  background: theme.skyLight,
                  color: theme.sky,
                }}
              >
                About Us
              </span>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "2.8rem",
                  margin: "16px 0",
                  color: theme.navy,
                }}
              >
                More than a clinic
              </h2>
              <p
                style={{
                  color: theme.slate,
                  lineHeight: 1.7,
                  marginBottom: "20px",
                }}
              >
                Founded in 2013, we set out to change how eye care feels — no
                rushed appointments, no confusing jargon. Just expert doctors
                who listen, explain, and care.
              </p>
              <p style={{ color: theme.slate, lineHeight: 1.7 }}>
                Today, we're proud to be a trusted partner for thousands of
                families, offering advanced treatments like LASIK, cataract
                surgery, and retina care with a human touch.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                background: `linear-gradient(145deg, ${theme.skyLight}, white)`,
                borderRadius: "40px",
                padding: "40px",
                textAlign: "center",
                border: `1px solid ${theme.border}`,
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "16px" }}>👁️</div>
              <h3
                style={{
                  fontSize: "1.8rem",
                  fontFamily: "'DM Serif Display', serif",
                  margin: 0,
                  color: theme.navy,
                }}
              >
                EyeCon
              </h3>
              <p style={{ color: theme.slate }}>
                Years of dedicated eye care excellence
              </p>
              <hr
                style={{ margin: "20px 0", borderColor: theme.borderLight }}
              />
              {/* <div
                style={{ fontSize: "2rem", fontWeight: 800, color: theme.sky }}
              >
                25,000+
              </div>
              <p style={{ color: theme.slate }}>Patients treated</p> */}
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
            textAlign: "center",
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
              marginBottom: "20px",
            }}
          >
            What We Do
          </span>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "2.8rem",
              margin: "0 auto 16px",
              color: theme.navy,
              maxWidth: "700px",
            }}
          >
            Comprehensive eye care under one roof
          </h2>
          <p
            style={{
              color: theme.slate,
              maxWidth: "700px",
              margin: "0 auto 50px",
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
            {expertise.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="hover-lift"
                style={{
                  background: theme.white,
                  borderRadius: "28px",
                  padding: "32px 24px",
                  border: `1px solid ${theme.border}`,
                  boxShadow: theme.shadow,
                  textAlign: "left",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
                  🩺
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontFamily: "'DM Serif Display', serif",
                    margin: "0 0 12px",
                    color: theme.navy,
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: theme.slate, lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== MEET OUR TEAM - ADVANCED DOCTOR CARDS ========== */}
      <section style={{ padding: "100px 0", background: theme.white }}>
        <div
          style={{
            width: theme.container,
            margin: "0 auto",
            textAlign: "center",
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
              marginBottom: "20px",
            }}
          >
            Our Experts
          </span>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "2.8rem",
              margin: "0 auto 16px",
              color: theme.navy,
            }}
          >
            Meet the faces behind your care
          </h2>
          <p
            style={{
              color: theme.slate,
              maxWidth: "700px",
              margin: "0 auto 50px",
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
              {featuredDoctors.map((doc) => (
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
                      to="/appointment"
                      className="btn btn-primary"
                      style={{ padding: "8px 20px", fontSize: "0.8rem" }}
                    >
                      Book
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          <div style={{ marginTop: "40px" }}>
            <Link to="/doctors" className="btn btn-outline">
              View All Doctors →
            </Link>
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section style={{ padding: "100px 0", background: theme.bg }}>
        <div
          style={{
            width: theme.container,
            margin: "0 auto",
            textAlign: "center",
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
              marginBottom: "20px",
            }}
          >
            Why Patients Trust Us
          </span>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "2.8rem",
              margin: "0 auto 16px",
              color: theme.navy,
            }}
          >
            Care that puts you first
          </h2>
          <p
            style={{
              color: theme.slate,
              maxWidth: "700px",
              margin: "0 auto 50px",
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
            {whyUs.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="hover-lift"
                style={{
                  background: theme.white,
                  borderRadius: "28px",
                  padding: "32px 20px",
                  border: `1px solid ${theme.border}`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    margin: "0 0 12px",
                    color: theme.navy,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{ color: theme.slate, fontSize: "0.9rem", margin: 0 }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section style={{ padding: "80px 0", background: theme.white }}>
        <div style={{ width: theme.container, margin: "0 auto" }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyMid} 100%)`,
              borderRadius: "48px",
              padding: "60px 40px",
              textAlign: "center",
              color: "white",
            }}
          >
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "2.5rem",
                margin: "0 0 16px",
              }}
            >
              Ready to see clearly?
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "32px",
                opacity: 0.9,
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Schedule your appointment today and experience the difference.
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/appointment"
                className="btn btn-primary"
                style={{ background: theme.sky, color: "white" }}
              >
                Book Appointment
              </Link>
              <Link
                to="/contact"
                className="btn btn-outline"
                style={{ borderColor: "white", color: "white" }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper styles for eyebrow
const s = {
  eyebrowBase: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "40px",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
};
