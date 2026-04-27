import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "../components/AnimatedSection";
import { contactPage, brand } from "../data/siteContent";

const supportFaq = [
  {
    question: "How do I book an appointment?",
    answer:
      "Tap Book Appointment and choose a service, doctor, and time. You can also call or WhatsApp for quick scheduling.",
  },
  {
    question: "What are clinic timings?",
    answer:
      "Timings vary by branch. See Business Hours below (and branch cards if you have multiple locations).",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "We support insurance based on plan and service. Share your provider and we’ll confirm coverage before your visit.",
  },
];

export default function ContactPage() {
  // Update these quickly
  const WHATSAPP_NUMBER = "+923477552842"; // <-- change
  const PRIMARY_PHONE = brand?.phone || "+923477552842"; // <-- change if needed
  const EMERGENCY_PHONE = brand?.emergencyPhone || PRIMARY_PHONE; // optional

  // For the embedded map (replace with your actual Google Maps embed URL or place id link)
  const GOOGLE_MAPS_EMBED_URL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sYour%20Clinic!5e0!3m2!1sen!2s!4v0000000000000"; // <-- change
  const DIRECTIONS_URL =
    "https://www.google.com/maps/dir/?api=1&destination=Your+Clinic+Address"; // <-- change

  // ✅ UPDATED THEME: light + sky/navy (smooth, premium)
  // ✅ Kept layout/structure the same; added small UI enhancements only
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
    radiusXL: "36px",
    radiusLG: "28px",
    shadow: "0 4px 24px rgba(14,165,233,0.08), 0 1px 4px rgba(0,0,0,0.06)",
    shadowStrong: "0 20px 60px rgba(2,8,23,0.14), 0 2px 10px rgba(2,8,23,0.08)",
    containerWide: "min(1520px, calc(100% - 24px))",
  };

  const s = {
    main: {
      position: "relative",
      zIndex: 1,
      background: theme.bg,
      color: theme.navy,
      fontFamily: "'Inter', system-ui, sans-serif",
    },
    sectionBand: { width: "100%", padding: "28px 0" },
    sectionShell: {
      width: theme.containerWide,
      margin: "0 auto",
      position: "relative",
      padding: "36px 0",
    },
    sectionHead: { maxWidth: "760px" },

    // Typography
    h2: {
      margin: 0,
      fontFamily: "'DM Serif Display', serif",
      fontSize: "clamp(2.2rem, 4vw, 4rem)",
      letterSpacing: "-0.03em",
      lineHeight: 1.05,
      color: theme.navy,
    },
    h3: {
      margin: "16px 0 10px",
      fontFamily: "'DM Serif Display', serif",
      fontSize: "1.42rem",
      letterSpacing: "-0.02em",
      color: theme.navy,
    },
    p: { color: theme.slate, lineHeight: "1.72", margin: "18px 0 0" },
    eyebrow: {
      display: "inline-flex",
      padding: "6px 14px",
      border: `1px solid rgba(14,165,233,0.20)`,
      borderRadius: "999px",
      background: theme.skyLight,
      color: theme.skyHover,
      fontSize: "0.78rem",
      fontWeight: 800,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      marginBottom: "16px",
      fontFamily: "'Inter', system-ui, sans-serif",
    },
    miniLabel: {
      color: theme.skyHover,
      fontSize: "0.76rem",
      fontWeight: 800,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      marginBottom: "8px",
      display: "inline-block",
      fontFamily: "'Inter', system-ui, sans-serif",
    },

    // Grids
    quickGrid: {
      display: "grid",
      gap: "20px",
      marginTop: "22px",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    },
    dualPanel: {
      display: "grid",
      gap: "24px",
      gridTemplateColumns: "minmax(0, 1.08fr) minmax(0, 0.92fr)",
      alignItems: "start",
    },
    infoGrid: { display: "grid", gap: "16px", marginTop: "22px" },
    formLayout: {
      display: "grid",
      gap: "28px",
      gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
      alignItems: "start",
    },
    socialRow: { display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 },

    // Cards (light)
    card: {
      position: "relative",
      overflow: "hidden",
      border: `1px solid ${theme.border}`,
      background: theme.white,
      boxShadow: theme.shadow,
      padding: "24px",
      borderRadius: theme.radiusLG,
    },
    // ✅ enhancement: a premium "hero-map" surface but still same section/component placement
    mapCard: {
      padding: "26px",
      borderRadius: theme.radiusXL,
      border: `1px solid ${theme.border}`,
      background: `radial-gradient(circle at top right, rgba(14,165,233,0.16), transparent 28%), linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyMid} 100%)`,
      boxShadow: theme.shadowStrong,
      position: "relative",
      overflow: "hidden",
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
  };

  // -------------------------------------------------------
  // Sticky conversion
  // -------------------------------------------------------
  const whatsappHref = useMemo(() => {
    const cleaned = String(WHATSAPP_NUMBER).replace(/[^\d+]/g, "");
    const wa = cleaned.startsWith("+") ? cleaned.slice(1) : cleaned;
    return `https://wa.me/${wa}`;
  }, [WHATSAPP_NUMBER]);

  // -------------------------------------------------------
  // Contact form (minimal friction + inline validation)
  // -------------------------------------------------------
  const SUBJECTS = [
    "General Inquiry",
    "Appointment Support",
    "Emergency",
    "Billing / Insurance",
  ];

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
  });
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0;

  const onSubmit = (ev) => {
    ev.preventDefault();
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      message: true,
      subject: true,
    });
    if (!canSubmit) return;

    // Future: POST to backend
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    setForm({
      fullName: "",
      phone: "",
      email: "",
      subject: SUBJECTS[0],
      message: "",
    });
    setTouched({});
  };

  return (
    <main style={s.main} className="page-shell-contact">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');

        .hover-card { transition: transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease; }
        .hover-card:hover { transform: translateY(-8px); border-color: rgba(14,165,233,0.35) !important; box-shadow: 0 18px 50px rgba(2,8,23,0.14) !important; }
        .hover-card::before { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(115deg, transparent 10%, rgba(14,165,233,0.10) 50%, transparent 90%); transform: translateX(-120%); transition: transform 780ms ease; }
        .hover-card:hover::before { transform: translateX(120%); }

        .button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          padding: 0 24px;
          border-radius: 999px;
          font-weight: 700;
          text-decoration: none;
          overflow: hidden;
          transition: transform 220ms ease, background 220ms ease, box-shadow 220ms ease;
          white-space: nowrap;
          border: 1px solid transparent;
          cursor: pointer;
          font-family: 'Inter', system-ui;
        }
        .button:hover { transform: translateY(-2px); }
        .button::after { content: ""; position: absolute; inset: 0; background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.18), transparent); transform: translateX(-120%); transition: transform 420ms ease; }
        .button:hover::after { transform: translateX(120%); }

        /* ✅ smoother, more premium button system (same structure) */
        .button-primary { color: #fff; background: ${theme.sky}; box-shadow: 0 10px 28px rgba(14,165,233,0.30); }
        .button-primary:hover { background: ${theme.skyHover}; box-shadow: 0 14px 34px rgba(14,165,233,0.38); }
        .button-secondary { color: ${theme.sky}; border: 1.5px solid ${theme.sky}; background: #fff; }
        .button-secondary:hover { background: ${theme.skyLight}; }
        .button-ghost { color: ${theme.navy}; border: 1.5px solid ${theme.border}; background: rgba(255,255,255,0.7); }
        .button-ghost:hover { background: #fff; }
        .button-danger { color: #b91c1c; border: 1.5px solid rgba(239,68,68,0.25); background: rgba(239,68,68,0.10); }
        .button-danger:hover { background: rgba(239,68,68,0.14); }

        .input {
          width: 100%;
          min-height: 50px;
          border-radius: 14px;
          border: 1.5px solid ${theme.border};
          background: #fff;
          color: ${theme.navy};
          padding: 0 14px;
          outline: none;
          font-family: 'Inter', system-ui;
        }
        .input:focus {
          border-color: ${theme.sky};
          box-shadow: 0 0 0 4px rgba(14,165,233,0.10);
        }

        /* ✅ small enhancement: clearer error styling on light bg */
        .error { margin-top: 8px; color: #b91c1c; font-size: 0.92rem; font-weight: 600; }
        .help { margin-top: 10px; color: ${theme.slate}; font-size: 0.95rem; line-height: 1.65; }

        /* ✅ enhancement: a nicer focus ring for card-links without changing layout */
        a.hover-card:focus-visible, button.hover-card:focus-visible {
          outline: none;
          box-shadow: 0 0 0 4px rgba(14,165,233,0.18), ${theme.shadowStrong};
          border-color: rgba(14,165,233,0.35) !important;
        }

        .floating-cta {
          position: fixed;
          right: 16px;
          bottom: 16px;
          z-index: 60;
          display: grid;
          gap: 10px;
        }

        @media (max-width: 1180px) {
          .quick-grid, .dual-panel, .form-layout { grid-template-columns: 1fr !important; }
          .floating-cta { left: 16px; right: 16px; }
          .floating-cta .button { width: 100%; }
        }
        @media (max-width: 820px) {
          h2 { font-size: clamp(2rem, 9vw, 3rem) !important; }
        }
      `}</style>

      {/* 2. Quick Contact Options */}
      <AnimatedSection style={s.sectionBand}>
        <div style={s.sectionShell}>
          <div style={s.sectionHead}>
            <p style={s.eyebrow}>Quick Contact</p>
          </div>

          <div style={s.quickGrid} className="quick-grid">
            <a
              className="button button-primary hover-card"
              style={{
                ...s.card,
                display: "grid",
                gap: 6,
                textAlign: "left",
                textDecoration: "none",
              }}
              href={`tel:${PRIMARY_PHONE}`}
            >
              <span style={s.miniLabel}>Call now</span>
              <span
                style={{
                  color: theme.navy,
                  fontWeight: 900,
                  fontSize: "1.1rem",
                }}
              >
                {PRIMARY_PHONE}
              </span>
              <span style={{ color: theme.slate }}>
                Click-to-call for immediate help
              </span>
            </a>

            <a
              className="button button-secondary hover-card"
              style={{
                ...s.card,
                display: "grid",
                gap: 6,
                textAlign: "left",
                textDecoration: "none",
              }}
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              <span style={s.miniLabel}>WhatsApp</span>
              <span
                style={{
                  color: theme.navy,
                  fontWeight: 900,
                  fontSize: "1.1rem",
                }}
              >
                Chat on WhatsApp
              </span>
              <span style={{ color: theme.slate }}>
                Fast questions, quick scheduling
              </span>
            </a>

            <Link
              className="button button-secondary hover-card"
              style={{
                ...s.card,
                display: "grid",
                gap: 6,
                textAlign: "left",
                textDecoration: "none",
              }}
              to="/appointment"
            >
              <span style={s.miniLabel}>Book appointment</span>
              <span
                style={{
                  color: theme.navy,
                  fontWeight: 900,
                  fontSize: "1.1rem",
                }}
              >
                Choose doctor & slot
              </span>
              <span style={{ color: theme.slate }}>
                Step-based booking flow
              </span>
            </Link>

            <a
              className="button button-ghost hover-card"
              style={{
                ...s.card,
                display: "grid",
                gap: 6,
                textAlign: "left",
                textDecoration: "none",
              }}
              href={`mailto:${brand?.email || ""}`}
            >
              <span style={s.miniLabel}>Email us</span>
              <span
                style={{
                  color: theme.navy,
                  fontWeight: 900,
                  fontSize: "1.1rem",
                }}
              >
                {brand?.email || "clinic@email.com"}
              </span>
              <span style={{ color: theme.slate }}>
                We reply within 24 hours
              </span>
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* Interactive Map */}
      <AnimatedSection style={{ ...s.sectionBand, background: theme.white }}>
        <div style={s.sectionShell}>
          <div
            style={{ ...s.dualPanel, gridTemplateColumns: "minmax(0, 1fr)" }}
            className="dual-panel"
          >
            <article
              className="hover-card"
              style={{ ...s.mapCard, width: "100%" }}
            >
              <p
                style={{
                  ...s.eyebrow,
                  background: "rgba(255,255,255,0.12)",
                  borderColor: "rgba(255,255,255,0.18)",
                  color: theme.skyLight,
                }}
              >
                Location
              </p>
              <h2 style={{ ...s.h2, fontSize: "2.6rem", color: "#fff" }}>
                Find the clinic easily
              </h2>
              <p style={{ ...s.p, color: "rgba(255,255,255,0.75)" }}>
                Use the embedded map or get directions with one click.
              </p>

              <div
                style={{
                  marginTop: 14,
                  borderRadius: 28,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <iframe
                  title="Clinic map"
                  src={GOOGLE_MAPS_EMBED_URL}
                  width="100%"
                  height="360"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  marginTop: 14,
                }}
              ></div>
            </article>
          </div>
        </div>
      </AnimatedSection>

      {/* 5. Contact Form (Lead capture) */}
      <AnimatedSection style={s.sectionBand}>
        <div style={s.sectionShell}>
          <div style={s.formLayout} className="form-layout">
            <div style={s.sectionHead}>
              <p style={s.eyebrow}>Contact Form</p>
              <h2 style={s.h2}>Send a message</h2>
              <p style={s.p}>
                Short, clean form with inline validation and a confirmation
                response.
              </p>

              {/* 11. Response assurance */}
              <div className="hover-card" style={{ ...s.card, marginTop: 18 }}>
                <p style={s.miniLabel}>Response assurance</p>
                <h3 style={{ ...s.h3, marginTop: 0 }}>
                  We respond within 24 hours
                </h3>
                <p style={{ ...s.p, marginTop: 10 }}>
                  For urgent symptoms, please call immediately.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginTop: 14,
                  }}
                >
                  <a
                    className="button button-secondary"
                    href={`tel:${PRIMARY_PHONE}`}
                  >
                    Call
                  </a>
                  <a
                    className="button button-ghost"
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* 10. Social links */}
              <div className="hover-card" style={{ ...s.card, marginTop: 18 }}>
                <p style={s.miniLabel}>Social</p>
                <h3 style={{ ...s.h3, marginTop: 0 }}>Follow us</h3>
                <div style={s.socialRow}>
                  <a
                    className="button button-ghost"
                    href={brand?.facebook || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                  <a
                    className="button button-ghost"
                    href={brand?.instagram || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                  <a
                    className="button button-ghost"
                    href={brand?.youtube || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </div>

            <article className="hover-card" style={s.card}>
              <form onSubmit={onSubmit}>
                <div style={{ display: "grid", gap: 12 }}>
                  <div>
                    <input
                      className="input"
                      placeholder="Full name"
                      value={form.fullName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, fullName: e.target.value }))
                      }
                      onBlur={() =>
                        setTouched((t) => ({ ...t, fullName: true }))
                      }
                    />
                    {touched.fullName && errors.fullName && (
                      <div className="error">{errors.fullName}</div>
                    )}
                  </div>

                  <div>
                    <input
                      className="input"
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                    />
                    {touched.phone && errors.phone && (
                      <div className="error">{errors.phone}</div>
                    )}
                  </div>

                  <div>
                    <input
                      className="input"
                      placeholder="Email (optional)"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    />
                    {touched.email && errors.email && (
                      <div className="error">{errors.email}</div>
                    )}
                  </div>

                  <div>
                    <select
                      className="input"
                      value={form.subject}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, subject: e.target.value }))
                      }
                      onBlur={() =>
                        setTouched((t) => ({ ...t, subject: true }))
                      }
                    >
                      {SUBJECTS.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <textarea
                      className="input"
                      style={{
                        paddingTop: 12,
                        minHeight: 140,
                        resize: "vertical",
                      }}
                      placeholder="Message"
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      onBlur={() =>
                        setTouched((t) => ({ ...t, message: true }))
                      }
                    />
                    {touched.message && errors.message && (
                      <div className="error">{errors.message}</div>
                    )}
                  </div>

                  <button
                    className="button button-primary"
                    type="submit"
                    style={{ border: "none", opacity: canSubmit ? 1 : 0.55 }}
                  >
                    {sent ? "Sent! We’ll respond soon." : "Send Message"}
                  </button>

                  <div className="help">
                    By submitting, you agree we may contact you by
                    phone/WhatsApp/email regarding your inquiry.
                  </div>
                </div>
              </form>
            </article>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
