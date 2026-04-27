import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

// ─── Inline replacements for missing components ──────────────────────────────
function AnimatedSection({ children, style }) {
  return <section style={style}>{children}</section>;
}
function FaqAccordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            overflow: "hidden",
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%",
              padding: "20px 24px",
              textAlign: "left",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "'DM Serif Display', serif",
              fontSize: "1.05rem",
              color: "#1a2e44",
              fontWeight: 600,
            }}
          >
            {item.question}
            <span
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: open === i ? "#0ea5e9" : "#f0f7ff",
                color: open === i ? "#fff" : "#0ea5e9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                flexShrink: 0,
                transition: "all 0.25s",
              }}
            >
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div
              style={{
                padding: "0 24px 20px",
                color: "#64748b",
                lineHeight: 1.7,
                fontSize: "0.97rem",
              }}
            >
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Static data ──────────────────────────────────────────────────────────────
const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Cataract & Refractive Surgeon",
    initials: "SM",
    bio: "15+ years of expertise in premium lens implants and laser vision correction.",
  },
  {
    name: "Dr. James Okafor",
    role: "Retina Specialist",
    initials: "JO",
    bio: "Specialist in macular degeneration, diabetic retinopathy, and retinal surgery.",
  },
  {
    name: "Dr. Priya Nair",
    role: "Glaucoma & Cornea",
    initials: "PN",
    bio: "Expert in glaucoma management and corneal disease across all age groups.",
  },
  {
    name: "Dr. Tom Elliot",
    role: "Pediatric Ophthalmology",
    initials: "TE",
    bio: "Gentle, family-focused care for children's vision development and myopia.",
  },
];

const marqueeItems = [
  "LASIK & SMILE",
  "Cataract Surgery",
  "Retina Care",
  "Glaucoma",
  "Pediatric Eye Care",
  "Premium Lens Options",
  "Same-Day Diagnostics",
  "Advanced OCT Imaging",
];

const homeFaq = [
  {
    question: "Is LASIK safe?",
    answer:
      "LASIK is widely performed and considered safe for most patients. Safety depends on corneal thickness, prescription range, and candidacy determined by your eye specialist.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Use the booking widget on this page or tap. Choose a service, doctor, and preferred time — we'll confirm quickly.",
  },
  {
    question: "What is the cost of treatment?",
    answer:
      "Costs vary by service and individual clinical needs. Request a consultation and we'll share a transparent estimate with all available options.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const EMERGENCY_PHONE = "+0000000000";
  const PRIMARY_PHONE = "+0000000000";

  const theme = {
    sky: "#0ea5e9",
    skyLight: "#e0f2fe",
    skyMid: "#38bdf8",
    navy: "#1a2e44",
    navyMid: "#2d4a6b",
    slate: "#64748b",
    light: "#f8fafc",
    white: "#ffffff",
    border: "#e2e8f0",
    borderLight: "#f1f5f9",
    radius: "20px",
    radiusLG: "28px",
    shadow: "0 4px 24px rgba(14,165,233,0.08), 0 1px 4px rgba(0,0,0,0.06)",
    shadowHover:
      "0 12px 40px rgba(14,165,233,0.15), 0 2px 8px rgba(0,0,0,0.08)",
    container: "min(1440px, calc(100% - 32px))",
  };

  const services = [
    {
      id: "01",
      title: "Cataract Surgery",
      description:
        "Premium lens options with calm, guided surgical planning and expert aftercare.",
      icon: "👁",
    },
    {
      id: "02",
      title: "LASIK / SMILE",
      description:
        "Modern laser correction with candidacy-led safety checks and clear outcomes.",
      icon: "✦",
    },
    {
      id: "03",
      title: "Retina Care",
      description:
        "Monitoring, injections, and long-term retinal condition management.",
      icon: "◎",
    },
    {
      id: "04",
      title: "Glaucoma",
      description:
        "Pressure control, advanced diagnostics, and progression tracking.",
      icon: "◈",
    },
    {
      id: "05",
      title: "Pediatric Eye Care",
      description:
        "Gentle family care: screening, myopia control, and vision development.",
      icon: "✿",
    },
    {
      id: "06",
      title: "Dry Eye Clinic",
      description:
        "Personalised therapy plans for chronic dry eye and ocular surface health.",
      icon: "◉",
    },
  ];

  const whyChooseUs = [
    {
      id: "01",
      title: "Advanced Technology",
      copy: "Modern diagnostics and surgical systems for precision-led care with better outcomes.",
    },
    {
      id: "02",
      title: "Experienced Specialists",
      copy: "Board-certified ophthalmologists across cataract, retina, refractive, and family eye care.",
    },
    {
      id: "03",
      title: "High Success Rate",
      copy: "Outcome-focused planning, rigorous safety checks, and consistent follow-up at every step.",
    },
    {
      id: "04",
      title: "Transparent Pricing",
      copy: "Clear fee structures, insurance guidance, and flexible payment options explained upfront.",
    },
    {
      id: "05",
      title: "Concierge Experience",
      copy: "From first message to post-procedure support — a calm, patient-first journey.",
    },
    {
      id: "06",
      title: "Same-Day Diagnostics",
      copy: "Fast front door for urgent visual complaints, surgery enquiries, and retina reviews.",
    },
  ];

  const techShowcase = [
    {
      id: "01",
      title: "OCT & Advanced Imaging",
      copy: "High-resolution retinal imaging for earlier, clearer clinical decisions.",
    },
    {
      id: "02",
      title: "Modern Surgical Systems",
      copy: "Precision instruments and protocols built for safer, more predictable outcomes.",
    },
    {
      id: "03",
      title: "Laser Correction Planning",
      copy: "Candidacy-first evaluation and personalised refractive options for every patient.",
    },
  ];

  const blogPreview = [
    {
      id: "01",
      title: "Is LASIK right for you?",
      excerpt:
        "Key eligibility factors, safety checks, and what to expect during evaluation.",
      tag: "Refractive",
    },
    {
      id: "02",
      title: "Cataract surgery lens options",
      excerpt:
        "A clear breakdown of lens types and how we match them to your lifestyle.",
      tag: "Cataracts",
    },
    {
      id: "03",
      title: "When to see a retina specialist",
      excerpt:
        "Symptoms you shouldn't ignore and how monitoring helps prevent vision loss.",
      tag: "Retina",
    },
  ];

  const stats = [
    { value: "15,000+", label: "Procedures completed" },
    { value: "98%", label: "Patient satisfaction" },
    { value: "20+", label: "Years of experience" },
    { value: "8", label: "Specialist surgeons" },
  ];

  const insurancePartners = [
    "Aetna",
    "Cigna",
    "Bupa",
    "Medicare",
    "MetLife",
    "United",
  ];

  const [booking, setBooking] = useState({
    service: "",
    doctor: "",
    date: "",
    name: "",
    phone: "",
  });
  const onBookingChange = (key) => (e) =>
    setBooking((p) => ({ ...p, [key]: e.target.value }));
  const onBookingSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/appointment";
  };

  const eyebrow = {
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
  };

  const h2Style = {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
    color: theme.navy,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    margin: "0 0 16px",
  };

  const bodyText = {
    color: theme.slate,
    lineHeight: 1.72,
    fontSize: "1.02rem",
    margin: 0,
    maxWidth: "62ch",
  };

  const card = {
    background: theme.white,
    border: `1px solid ${theme.border}`,
    borderRadius: theme.radius,
    padding: "28px",
    boxShadow: theme.shadow,
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  };

  return (
    <main
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        background: "#f8fafc",
        color: theme.navy,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .hc:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(14,165,233,0.15), 0 2px 8px rgba(0,0,0,0.08) !important;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 50px;
          padding: 0 26px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.22s ease;
          white-space: nowrap;
          font-family: 'Inter', system-ui;
        }
        .btn:hover { transform: translateY(-2px); }
        .btn-primary {
          background: #0ea5e9;
          color: #fff;
          box-shadow: 0 8px 24px rgba(14,165,233,0.32);
        }
        .btn-primary:hover { background: #0284c7; box-shadow: 0 12px 32px rgba(14,165,233,0.40); }
        .btn-outline {
          background: #fff;
          color: #0ea5e9;
          border: 1.5px solid #0ea5e9;
        }
        .btn-outline:hover { background: #e0f2fe; }
        .btn-ghost {
          background: rgba(255,255,255,0.6);
          color: #1a2e44;
          border: 1.5px solid #e2e8f0;
        }
        .btn-ghost:hover { background: #fff; }

        .input-field {
          width: 100%;
          min-height: 48px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          color: #1a2e44;
          padding: 0 14px;
          font-size: 0.95rem;
          outline: none;
          font-family: 'Inter', system-ui;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-field:focus {
          border-color: #0ea5e9;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(14,165,233,0.10);
        }

        .marquee-wrap { overflow: hidden; background: #0ea5e9; padding: 14px 0; }
        .marquee-track {
          display: flex;
          gap: 0;
          animation: marquee 28s linear infinite;
          width: max-content;
        }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 0 32px;
          color: #fff;
          font-weight: 600;
          font-size: 0.88rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .marquee-item::after { content: "✦"; opacity: 0.5; }

        .hero-wave {
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 80px;
          background: #f8fafc;
          clip-path: ellipse(56% 100% at 50% 100%);
        }

        @media (max-width: 1100px) {
          .hero-split { grid-template-columns: 1fr !important; }
          .service-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .doc-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .book-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .service-grid, .why-grid, .doc-grid, .book-grid, .tech-grid, .blog-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .action-bar { flex-direction: column !important; }
          .hero-ctas { flex-direction: column !important; }
        }
      `}</style>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          background:
            "linear-gradient(150deg, #e0f2fe 0%, #f0f9ff 40%, #ffffff 100%)",
          padding: "80px 0 120px",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(14,165,233,0.07)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "-60px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "rgba(14,165,233,0.05)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            width: theme.container,
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div
            className="hero-split"
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: "60px",
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div>
              <div style={eyebrow}>✦ Advanced Eye Care Centre</div>
              <h1
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(2.8rem, 5vw, 5rem)",
                  color: theme.navy,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  margin: "0 0 20px",
                }}
              >
                See the World <br />
                <em style={{ color: theme.sky, fontStyle: "italic" }}>
                  More Clearly.
                </em>
              </h1>
              <p
                style={{
                  ...bodyText,
                  fontSize: "1.1rem",
                  marginBottom: "32px",
                }}
              >
                Specialist-led care with modern diagnostics, premium surgical
                pathways, and a calm patient experience — from first
                consultation to confident recovery.
              </p>

              <div
                className="hero-ctas"
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "40px",
                }}
              >
                <Link className="btn btn-primary" to="/appointment">
                  Book Appointment
                </Link>
                <Link className="btn btn-outline" to="/appointment">
                  Free Consultation
                </Link>
                <Link className="btn btn-ghost" to="/services">
                  View Services
                </Link>
              </div>

              {/* Trust pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {[
                  "Board-certified specialists",
                  "Advanced diagnostics",
                  "15,000+ procedures",
                ].map((x) => (
                  <span
                    key={x}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "999px",
                      background: "#fff",
                      border: `1px solid ${theme.border}`,
                      color: theme.navyMid,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                    }}
                  >
                    ✓ {x}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — trust cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              {[
                { label: "ISO Certified", sub: "Quality & safety", icon: "🏅" },
                { label: "5★ Reviews", sub: "2,400+ patients", icon: "⭐" },
                {
                  label: "Same-Day Care",
                  sub: "Urgent slots available",
                  icon: "🕐",
                },
                { label: "Advanced Tech", sub: "Latest equipment", icon: "🔬" },
              ].map((x) => (
                <div
                  key={x.label}
                  className="hc"
                  style={{
                    ...card,
                    padding: "22px",
                    textAlign: "center",
                    borderTop: `3px solid ${theme.sky}`,
                  }}
                >
                  <div style={{ fontSize: "1.8rem", marginBottom: "10px" }}>
                    {x.icon}
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: theme.navy,
                      fontSize: "1rem",
                    }}
                  >
                    {x.label}
                  </div>
                  <div
                    style={{
                      color: theme.slate,
                      fontSize: "0.85rem",
                      marginTop: "4px",
                    }}
                  >
                    {x.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick action bar */}
        <div
          style={{
            position: "absolute",
            bottom: "7%",
            left: "50%",
            transform: "translateX(-50%) translateY(50%)",
            width: theme.container,
            zIndex: 10,
          }}
        >
          <div
            className="action-bar"
            style={{
              display: "flex",
              gap: "10px",
              background: "#fff",
              border: `1px solid ${theme.border}`,
              borderRadius: "999px",
              padding: "10px",
              boxShadow: "0 8px 32px rgba(14,165,233,0.12)",
            }}
          >
            {[
              { label: "Book Appointment", to: "/appointment" },
              { label: "Find a Doctor", to: "/doctors" },
              { label: "View Services", to: "/services" },
              {
                label: `Emergency: ${EMERGENCY_PHONE}`,
                href: `tel:${EMERGENCY_PHONE}`,
              },
            ].map((a) =>
              a.to ? (
                <Link
                  key={a.label}
                  to={a.to}
                  className="btn btn-ghost"
                  style={{ flex: 1, minHeight: "46px" }}
                >
                  {a.label}
                </Link>
              ) : (
                <a
                  key={a.label}
                  href={a.href}
                  className="btn btn-primary"
                  style={{ flex: 1, minHeight: "46px" }}
                >
                  {a.label}
                </a>
              ),
            )}
          </div>
        </div>

        <div className="hero-wave" />
      </section>

      <div style={{ height: "64px" }} />

      {/* ── MARQUEE ────────────────────────────────────────────────────────── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "64px 0" }}>
        <div style={{ width: theme.container, margin: "0 auto" }}>
          <div
            className="stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  textAlign: "center",
                  padding: "32px 24px",
                  borderRadius: theme.radius,
                  background: theme.light,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "2.8rem",
                    color: theme.sky,
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    color: theme.slate,
                    fontSize: "0.92rem",
                    fontWeight: 600,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────────── */}
      <AnimatedSection style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div style={{ width: theme.container, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ ...eyebrow, margin: "0 auto 16px" }}>
              Our Services
            </div>
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Treatments We Offer
            </h2>
            <p style={{ ...bodyText, textAlign: "center", margin: "0 auto" }}>
              Expert care across the full spectrum of eye health — all under one
              roof.
            </p>
          </div>

          <div
            className="service-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "22px",
            }}
          >
            {services.map((svc) => (
              <article
                key={svc.id}
                className="hc"
                style={{
                  ...card,
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "linear-gradient(90deg, #0ea5e9, #38bdf8)",
                  }}
                />
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: theme.skyLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.4rem",
                  }}
                >
                  {svc.icon}
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: theme.sky,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {svc.id}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "1.3rem",
                      color: theme.navy,
                      margin: "4px 0 8px",
                    }}
                  >
                    {svc.title}
                  </h3>
                  <p style={{ ...bodyText, fontSize: "0.92rem" }}>
                    {svc.description}
                  </p>
                </div>
                <div
                  style={{ marginTop: "auto", display: "flex", gap: "10px" }}
                >
                  <Link
                    className="btn btn-outline"
                    to="/services"
                    style={{ minHeight: "42px", flex: 1, fontSize: "0.88rem" }}
                  >
                    Learn More
                  </Link>
                  <Link
                    className="btn btn-primary"
                    to="/appointment"
                    style={{ minHeight: "42px", flex: 1, fontSize: "0.88rem" }}
                  >
                    Book
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── WHY CHOOSE US ──────────────────────────────────────────────────── */}
      <AnimatedSection style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ width: theme.container, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "60px",
              alignItems: "start",
            }}
            className="hero-split"
          >
            <div>
              <div style={eyebrow}>Why Choose Us</div>
              <h2 style={h2Style}>
                Your Vision Is Our <br />
                <em style={{ color: theme.sky, fontStyle: "italic" }}>
                  Priority.
                </em>
              </h2>
              <p style={{ ...bodyText, marginBottom: "28px" }}>
                Every decision we make is built around patient safety, clear
                communication, and outcome-led care that inspires confidence.
              </p>
              <Link className="btn btn-primary" to="/appointment">
                Book a Consultation
              </Link>
            </div>
            <div
              className="why-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              {whyChooseUs.map((x) => (
                <div
                  key={x.id}
                  className="hc"
                  style={{
                    ...card,
                    padding: "22px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: theme.skyLight,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme.sky,
                      fontWeight: 800,
                      fontSize: "0.8rem",
                      marginBottom: "12px",
                    }}
                  >
                    {x.id}
                  </div>
                  <h4
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "1.1rem",
                      color: theme.navy,
                      margin: "0 0 8px",
                    }}
                  >
                    {x.title}
                  </h4>
                  <p style={{ ...bodyText, fontSize: "0.88rem" }}>{x.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── DOCTORS ────────────────────────────────────────────────────────── */}
      <AnimatedSection style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div style={{ width: theme.container, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ ...eyebrow, margin: "0 auto 16px" }}>
              Our Specialists
            </div>
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Meet Your Doctors
            </h2>
            <p style={{ ...bodyText, textAlign: "center", margin: "0 auto" }}>
              Real expertise, clearly presented — so you feel safe from the
              moment you book.
            </p>
          </div>

          <div
            className="doc-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {doctors.map((doc, i) => (
              <article
                key={doc.name}
                className="hc"
                style={{ ...card, textAlign: "center", padding: "30px 20px" }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, #0ea5e9, #38bdf8)`,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.4rem",
                    margin: "0 auto 16px",
                    boxShadow: "0 6px 20px rgba(14,165,233,0.28)",
                  }}
                >
                  {doc.initials}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: theme.sky,
                    letterSpacing: "0.08em",
                    marginBottom: "6px",
                  }}
                >
                  {doc.role}
                </div>
                <h3
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.15rem",
                    color: theme.navy,
                    margin: "0 0 10px",
                  }}
                >
                  {doc.name}
                </h3>
                <p
                  style={{
                    ...bodyText,
                    fontSize: "0.88rem",
                    textAlign: "center",
                    margin: "0 0 16px",
                  }}
                >
                  {doc.bio}
                </p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link
                    className="btn btn-outline"
                    to="/doctors"
                    style={{ flex: 1, minHeight: "40px", fontSize: "0.85rem" }}
                  >
                    Profile
                  </Link>
                  <Link
                    className="btn btn-primary"
                    to="/appointment"
                    style={{ flex: 1, minHeight: "40px", fontSize: "0.85rem" }}
                  >
                    Book
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── BOOKING WIDGET ─────────────────────────────────────────────────── */}
      <AnimatedSection
        style={{
          padding: "80px 0",
          background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            width: theme.container,
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div
              style={{
                ...eyebrow,
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                margin: "0 auto 16px",
              }}
            >
              Book an Appointment
            </div>
            <h2
              style={{
                ...h2Style,
                color: "#fff",
                textAlign: "center",
              }}
            >
              Let's Get You Seen
            </h2>
            <p
              style={{
                ...bodyText,
                color: "rgba(255,255,255,0.82)",
                textAlign: "center",
                margin: "0 auto",
              }}
            >
              Choose a service and time — we'll confirm your slot quickly.
            </p>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: theme.radiusLG,
              padding: "36px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            <form onSubmit={onBookingSubmit}>
              <div
                className="book-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                }}
              >
                {[
                  {
                    key: "service",
                    label: "Service",
                    type: "select",
                    options: services.map((s) => s.title),
                  },
                  {
                    key: "doctor",
                    label: "Doctor",
                    type: "select",
                    options: doctors.map((d) => d.name),
                    placeholder: "Any available",
                  },
                  { key: "date", label: "Preferred Date", type: "date" },
                  {
                    key: "name",
                    label: "Full Name",
                    type: "text",
                    placeholder: "Your full name",
                  },
                  {
                    key: "phone",
                    label: "Phone Number",
                    type: "tel",
                    placeholder: "+1 555 000 0000",
                  },
                ].map((field) => (
                  <div key={field.key}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: 600,
                        color: theme.navy,
                        fontSize: "0.9rem",
                      }}
                    >
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        className="input-field"
                        value={booking[field.key]}
                        onChange={onBookingChange(field.key)}
                      >
                        <option value="">
                          {field.placeholder ?? "Choose..."}
                        </option>
                        {field.options.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className="input-field"
                        type={field.type}
                        value={booking[field.key]}
                        onChange={onBookingChange(field.key)}
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "24px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1, minWidth: "180px" }}
                >
                  Request Appointment →
                </button>
                <Link
                  to="/appointment"
                  className="btn btn-outline"
                  style={{ flex: 1, minWidth: "180px" }}
                >
                  Full Booking Page
                </Link>
                <a
                  href={`tel:${PRIMARY_PHONE}`}
                  className="btn btn-ghost"
                  style={{ flex: 1, minWidth: "180px" }}
                >
                  📞 Call Now
                </a>
              </div>
            </form>
          </div>
        </div>
      </AnimatedSection>

      {/* ── TECHNOLOGY ─────────────────────────────────────────────────────── */}
      <AnimatedSection style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ width: theme.container, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ ...eyebrow, margin: "0 auto 16px" }}>Technology</div>
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              State-of-the-Art Equipment
            </h2>
            <p style={{ ...bodyText, textAlign: "center", margin: "0 auto" }}>
              A modern clinic experience begins with modern clinical tools.
            </p>
          </div>

          <div
            className="tech-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "22px",
            }}
          >
            {techShowcase.map((x) => (
              <div
                key={x.id}
                className="hc"
                style={{
                  ...card,
                  padding: "32px",
                  background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
                  border: "1px solid #bae6fd",
                }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    color: theme.sky,
                    fontSize: "2rem",
                    marginBottom: "12px",
                  }}
                >
                  {x.id}
                </div>
                <h3
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.3rem",
                    color: theme.navy,
                    margin: "0 0 10px",
                  }}
                >
                  {x.title}
                </h3>
                <p style={{ ...bodyText, fontSize: "0.93rem" }}>{x.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── BLOG ───────────────────────────────────────────────────────────── */}
      <AnimatedSection style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div style={{ width: theme.container, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "40px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <div style={eyebrow}>Insights</div>
              <h2 style={{ ...h2Style, margin: 0 }}>Latest Articles</h2>
            </div>
            <Link className="btn btn-outline" to="/blog">
              View All Articles
            </Link>
          </div>

          <div
            className="blog-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "22px",
            }}
          >
            {blogPreview.map((post) => (
              <article
                key={post.id}
                className="hc"
                style={{
                  ...card,
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    padding: "5px 12px",
                    borderRadius: "999px",
                    background: theme.skyLight,
                    color: theme.sky,
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    alignSelf: "flex-start",
                    marginBottom: "14px",
                  }}
                >
                  {post.tag}
                </span>
                <h3
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.25rem",
                    color: theme.navy,
                    margin: "0 0 10px",
                  }}
                >
                  {post.title}
                </h3>
                <p style={{ ...bodyText, fontSize: "0.91rem", flex: 1 }}>
                  {post.excerpt}
                </p>
                <Link
                  className="btn btn-outline"
                  to="/blog"
                  style={{
                    marginTop: "20px",
                    alignSelf: "flex-start",
                    minHeight: "42px",
                  }}
                >
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── CTA BANNER ─────────────────────────────────────────────────────── */}
      <AnimatedSection style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ width: theme.container, margin: "0 auto" }}>
          <div
            style={{
              borderRadius: theme.radiusLG,
              padding: "60px 52px",
              background: "linear-gradient(135deg, #1a2e44 0%, #2d4a6b 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "32px",
              flexWrap: "wrap",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-60px",
                right: "140px",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: "rgba(14,165,233,0.12)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative" }}>
              <div
                style={{
                  ...eyebrow,
                  background: "rgba(14,165,233,0.2)",
                  color: "#38bdf8",
                  marginBottom: "16px",
                }}
              >
                Eye Checkup Today
              </div>
              <h2 style={{ ...h2Style, color: "#fff", margin: "0 0 12px" }}>
                Your Vision Deserves
                <br />
                Expert Attention.
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  maxWidth: "48ch",
                  lineHeight: 1.6,
                }}
              >
                Start with a free consultation and we'll guide you clearly
                through every next step.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                position: "relative",
              }}
            >
              <Link
                className="btn btn-primary"
                to="/appointment"
                style={{ minWidth: "200px" }}
              >
                Book Appointment →
              </Link>
              <a
                className="btn"
                href={`tel:${PRIMARY_PHONE}`}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  minWidth: "140px",
                }}
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── INSURANCE ──────────────────────────────────────────────────────── */}
      <AnimatedSection style={{ padding: "60px 0", background: "#f8fafc" }}>
        <div style={{ width: theme.container, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ ...eyebrow, margin: "0 auto 0" }}>
              Insurance & Partners
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "14px",
            }}
            className="stats-grid"
          >
            {insurancePartners.map((x) => (
              <div
                key={x}
                className="hc"
                style={{
                  ...card,
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    color: theme.navy,
                    fontSize: "1.05rem",
                  }}
                >
                  {x}
                </div>
                <div
                  style={{
                    color: theme.slate,
                    fontSize: "0.8rem",
                    marginTop: "4px",
                  }}
                >
                  Partner
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <AnimatedSection style={{ padding: "80px 0", background: "#fff" }}>
        <div
          style={{
            width: theme.container,
            margin: "0 auto",
            maxWidth: "800px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ ...eyebrow, margin: "0 auto 16px" }}>FAQ</div>
            <h2 style={{ ...h2Style, textAlign: "center" }}>
              Common Questions
            </h2>
          </div>
          <FaqAccordion items={homeFaq} />
        </div>
      </AnimatedSection>
    </main>
  );
}
