import { startTransition, useState } from "react";
import { Link } from "react-router-dom";
import { footerGroups } from "../data/siteContent";

export function SiteFooter({ brand }) {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    startTransition(() => {
      setSubscribed(true);
    });
  };

  // Design tokens from your style.css
  const theme = {
    muted: "#9eb0c4",
    text: "#eff4fb",
    accent: "#83efe7",
    success: "#9df0c4",
    border: "rgba(255, 255, 255, 0.08)",
    containerWide: "min(1520px, calc(100% - 24px))",
  };

  const s = {
    footer: {
      width: "100%",
      padding: "30px 0 44px",
      position: "relative",
      zIndex: 1,
      marginTop: "60px",
    },
    shell: {
      width: theme.containerWide,
      margin: "0 auto",
      marginTop: "-55px",

      padding: "34px 0 0",
      borderTop: `1px solid ${theme.border}`,
    },
    top: {
      display: "grid",
      gap: "24px",
      gridTemplateColumns: "minmax(0, 0.72fr) minmax(0, 1.28fr)",
      alignItems: "center",
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      minWidth: "fit-content",
    },
    mark: {
      display: "grid",
      placeItems: "center",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.42), transparent 34%), linear-gradient(135deg, ${theme.accent}, rgba(21, 74, 98, 0.92))`,
      color: "#07101b",
      fontFamily: "'Syne', sans-serif",
      fontSize: "0.96rem",
      fontWeight: "700",
      letterSpacing: "0.1em",
      boxShadow: `0 14px 30px rgba(131, 239, 231, 0.22)`,
    },
    brandCopy: {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
    },
    form: {
      display: "flex",
      alignItems: "flex-end",
      gap: "14px",
      justifyContent: "flex-end",
    },
    input: {
      width: "100%",
      padding: "16px 18px",
      border: `1px solid ${theme.border}`,
      borderRadius: "18px",
      background: "rgba(3, 8, 15, 0.42)",
      color: theme.text,
      outline: "none",
      marginTop: "10px",
    },
    grid: {
      display: "grid",
      gap: "24px",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      marginTop: "34px",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    h3: {
      margin: "0 0 8px",
      fontFamily: "'Syne', sans-serif",
      fontSize: "1.1rem",
      color: theme.text,
    },
    link: {
      color: theme.muted,
      lineHeight: "1.72",
      fontSize: "0.92rem",
      textDecoration: "none",
      transition: "color 0.2s ease",
    },
    note: {
      margin: "24px 0 0",
      color: theme.muted,
      lineHeight: "1.72",
      fontSize: "0.85rem",
    },
  };

  return (
    <footer style={s.footer}>
      {/* Local style block for Hovers and Responsive behavior */}
      <style>{`
        .footer-link:hover { color: #eff4fb !important; }
        .footer-btn { 
          min-height: 54px; padding: 0 24px; border-radius: 999px; font-weight: 700; border: none; cursor: pointer;
          background: linear-gradient(135deg, #83efe7, #b3fbf6); color: #07101b;
          box-shadow: 0 18px 40px rgba(131, 239, 231, 0.22); transition: transform 0.2s ease;
        }
        .footer-btn:hover { transform: translateY(-2px); }

        @media (max-width: 1180px) {
          .footer-top-grid { grid-template-columns: 1fr !important; }
          .footer-newsletter-form { justify-content: flex-start !important; }
        }
        @media (max-width: 820px) {
          .footer-main-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-newsletter-form { flex-direction: column; align-items: stretch !important; }
        }
        @media (max-width: 560px) {
          .footer-main-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={s.shell}>
        <div style={s.top} className="footer-top-grid">
          <div style={s.brand}>
            <span style={s.mark}>EC</span>
            <div style={s.brandCopy}>
              <strong
                style={{
                  fontFamily: "'Syne', sans-serif",
                  letterSpacing: "0.04em",
                }}
              >
                {brand.name}
              </strong>
              <p style={{ margin: 0, color: theme.muted, fontSize: "0.84rem" }}>
                {brand.tagline}
              </p>
            </div>
          </div>

          <form
            style={s.form}
            className="footer-newsletter-form"
            onSubmit={handleSubmit}
          >
            <label
              style={{
                flex: 1,
                display: "grid",
                color: theme.muted,
                fontSize: "0.9rem",
              }}
            >
              <span>Join EyeCon updates</span>
              <input
                style={s.input}
                placeholder="Your email address"
                type="email"
              />
            </label>
            <button className="footer-btn" type="submit">
              Subscribe
            </button>
          </form>
        </div>

        <div style={s.grid} className="footer-main-grid">
          {footerGroups.map((group) => (
            <div style={s.column} key={group.title}>
              <h3 style={s.h3}>{group.title}</h3>
              {group.links.map((link) => (
                <Link
                  className="footer-link"
                  key={link.label}
                  to={link.to}
                  style={s.link}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          <div style={s.column}>
            <h3 style={s.h3}>Visit</h3>
            <span style={s.link}>{brand.location}</span>
            <a
              className="footer-link"
              href={`tel:${brand.phone.replace(/\s+/g, "")}`}
              style={s.link}
            >
              {brand.phone}
            </a>
            <a
              className="footer-link"
              href={`mailto:${brand.email}`}
              style={s.link}
            >
              {brand.email}
            </a>
            <span style={s.link}>{brand.hours}</span>
          </div>
        </div>

        <p
          style={{
            ...s.note,
            color: subscribed ? theme.success : theme.muted,
          }}
        >
          {subscribed
            ? "Subscription captured in frontend demo mode. Next step: connect this to your backend or email platform."
            : "This footer is frontend-ready for CRM, newsletter, or patient education updates."}
        </p>
      </div>
    </footer>
  );
}
