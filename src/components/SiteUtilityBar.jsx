import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export function SiteUtilityBar({
  emergencyPhone = "+923477552842",
  whatsappNumber = "+923477552842",
  hours = {
    days: "Mon–Sat",
    open: "09:00",
    close: "20:00",
    timezone: "Asia/Karachi",
  },

  announcement = null, // { message: string, href?: string }
  locations = [
    {
      id: "gujranwala",
      name: "Gujranwala Clinic",
      directionsUrl: "https://www.google.com/maps",
    },
  ],
  patientPortalUrl = null,
  social = { facebook: null, instagram: null },
}) {
  const [dismissed, setDismissed] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(
    locations?.[0]?.id || "default",
  );

  const selectedLocation = useMemo(() => {
    const list = Array.isArray(locations) ? locations : [];
    return list.find((l) => l.id === selectedLocationId) || list[0] || null;
  }, [locations, selectedLocationId]);

  const whatsappHref = useMemo(() => {
    const cleaned = String(whatsappNumber).replace(/[^\d+]/g, "");
    const wa = cleaned.startsWith("+") ? cleaned.slice(1) : cleaned;
    return `https://wa.me/${wa}`;
  }, [whatsappNumber]);

  // Live status indicator (client clock)
  const [nowTick, setNowTick] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNowTick(Date.now()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  function formatTime(hhmm) {
    const [hh, mm] = String(hhmm || "00:00")
      .split(":")
      .map((x) => Number(x));
    const d = new Date();
    d.setHours(hh || 0);
    d.setMinutes(mm || 0);
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  const status = useMemo(() => {
    const parseHHMM = (t) => {
      const [hh, mm] = String(t || "00:00")
        .split(":")
        .map((x) => Number(x));
      return (hh || 0) * 60 + (mm || 0);
    };

    const openM = parseHHMM(hours?.open);
    const closeM = parseHHMM(hours?.close);
    const d = new Date(nowTick);

    // Sunday closed by default (remove if your clinic opens Sunday)
    const day = d.getDay(); // 0=Sun
    const minutes = d.getHours() * 60 + d.getMinutes();

    const isOpenToday = day !== 0;
    const isOpenTime = minutes >= openM && minutes < closeM;

    return {
      isOpen: Boolean(isOpenToday && isOpenTime),
      label: isOpenToday && isOpenTime ? "Open Now" : "Closed",
      sub: `${hours?.days || "Mon–Sat"}: ${formatTime(hours?.open)} – ${formatTime(hours?.close)}`,
    };
  }, [hours, nowTick]);

  // ✅ Updated color system + small enhancements (smooth, premium)
  const ui = {
    bg: "rgba(255,255,255,0.78)",
    border: "rgba(226, 232, 240, 0.92)",
    borderStrong: "rgba(148, 163, 184, 0.30)",
    text: "rgba(15, 23, 42, 0.90)",
    textSoft: "rgba(51, 65, 85, 0.82)",
    sky: "#0ea5e9",
    skyHover: "#0284c7",
    skyLight: "rgba(14,165,233,0.10)",
    danger: "#ef4444",
    dangerBg: "rgba(239, 68, 68, 0.12)",
    shadow: "0 10px 28px rgba(2, 8, 23, 0.10)",
    shadowHover: "0 16px 38px rgba(2, 8, 23, 0.14)",
  };

  const styles = {
    wrap: {
      width: "100%",
      position: "relative", // NOT sticky
      zIndex: 120,
      background: ui.bg,
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      borderBottom: `1px solid ${ui.border}`,
      boxShadow: "0 6px 18px rgba(2, 8, 23, 0.06)",
    },
    utilityBar: {
      width: "min(1520px, calc(100% - 24px))",
      margin: "0 auto",
      padding: "12px 0",
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center",
      gap: 14,
    },
    left: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
    center: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    right: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      justifyContent: "flex-end",
      flexWrap: "wrap",
    },

    sectionCard: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "6px",
      borderRadius: 999,
      border: `1px solid ${ui.border}`,
      background: "rgba(255,255,255,0.92)",
      boxShadow: "0 8px 18px rgba(2,8,23,0.07)",
    },
    statusCard: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 14px",
      borderRadius: 999,
      border: `1px solid ${ui.border}`,
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.94), rgba(248,250,252,0.9))",
      boxShadow: "0 8px 20px rgba(2,8,23,0.08)",
      color: ui.text,
      whiteSpace: "nowrap",
    },
    sectionTag: {
      fontSize: "0.7rem",
      fontWeight: 900,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "rgba(15,23,42,0.56)",
      padding: "0 2px",
    },
    actionPrimary: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "9px 13px",
      borderRadius: 999,
      border: "1px solid rgba(239, 68, 68, 0.34)",
      background:
        "linear-gradient(180deg, rgba(254,242,242,0.98), rgba(254,226,226,0.95))",
      color: "rgba(127,29,29,0.98)",
      textDecoration: "none",
      fontSize: "0.8rem",
      fontWeight: 900,
      letterSpacing: "0.03em",
      boxShadow: "0 10px 22px rgba(239,68,68,0.12)",
      whiteSpace: "nowrap",
    },
    actionSecondary: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      padding: "9px 12px",
      borderRadius: 999,
      border: `1px solid ${ui.borderStrong}`,
      background: "rgba(255,255,255,0.96)",
      color: ui.text,
      textDecoration: "none",
      fontSize: "0.8rem",
      fontWeight: 800,
      letterSpacing: "0.02em",
      whiteSpace: "nowrap",
    },
    timeMeta: {
      fontSize: "0.8rem",
      fontWeight: 700,
      color: ui.textSoft,
      whiteSpace: "nowrap",
    },
    liveLabel: {
      fontSize: "0.8rem",
      fontWeight: 900,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      color: ui.textSoft,
    },

    pill: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 12px",
      border: `1px solid ${ui.borderStrong}`,
      borderRadius: "999px",
      background: "rgba(255,255,255,0.85)",
      color: ui.text,
      fontSize: "0.82rem",
      letterSpacing: "0.02em",
      whiteSpace: "nowrap",
      textDecoration: "none",
      boxShadow: "0 6px 16px rgba(2,8,23,0.06)",
    },
    pillDanger: {
      border: "1px solid rgba(239, 68, 68, 0.30)",
      background: ui.dangerBg,
      color: "rgba(127, 29, 29, 0.98)",
      fontWeight: 900,
      boxShadow: "0 10px 22px rgba(239,68,68,0.10)",
    },
    statusDot: (isOpen) => ({
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: isOpen
        ? "rgba(34, 197, 94, 0.95)"
        : "rgba(148, 163, 184, 0.85)",
      boxShadow: isOpen ? "0 0 0 6px rgba(34, 197, 94, 0.12)" : "none",
    }),

    select: {
      minHeight: 34,
      borderRadius: 999,
      border: `1px solid ${ui.borderStrong}`,
      background: "rgba(255,255,255,0.85)",
      color: ui.text,
      padding: "0 10px",
      outline: "none",
      fontWeight: 800,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      fontSize: "0.78rem",
    },

    // ✅ Banner improved: cleaner + more readable
    banner: {
      width: "100%",
      borderBottom: `1px solid ${ui.border}`,
      background: `linear-gradient(90deg, rgba(14,165,233,0.10), rgba(56,189,248,0.08), rgba(255,255,255,0.00))`,
    },
    bannerInner: {
      width: "min(1520px, calc(100% - 24px))",
      margin: "0 auto",
      padding: "8px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    bannerText: {
      color: ui.text,
      fontWeight: 900,
      fontSize: "0.92rem",
      lineHeight: 1.2,
    },
    bannerClose: {
      border: `1px solid ${ui.borderStrong}`,
      background: "rgba(255,255,255,0.85)",
      color: ui.text,
      borderRadius: 999,
      padding: "6px 10px",
      cursor: "pointer",
      fontWeight: 900,
    },
  };

  return (
    <div style={styles.wrap}>
      <style>{`
        .utility-hover {
          transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease, background 200ms ease;
        }
        .utility-hover:hover {
          transform: translateY(-1px);
          border-color: rgba(14,165,233,0.35) !important;
          box-shadow: ${ui.shadowHover} !important;
        }
        .utility-hover:focus-visible {
          outline: none;
          box-shadow: 0 0 0 4px rgba(14,165,233,0.16), ${ui.shadowHover} !important;
          border-color: rgba(14,165,233,0.35) !important;
        }

        /* Make select feel consistent */
        .utility-select:hover { border-color: rgba(14,165,233,0.35) !important; }

        /* Mobile: collapse to priorities (Call / WhatsApp) */
        @media (max-width: 920px) {
          .utility-grid { grid-template-columns: 1fr !important; }
          .utility-left, .utility-center, .utility-right { justify-content: center !important; }
          .utility-hide-mobile { display: none !important; }
        }
      `}</style>

      {/* Announcement / Alert Banner (dismissible) */}
      {announcement?.message && !dismissed && (
        <div style={styles.banner}>
          <div style={styles.bannerInner}>
            {announcement.href ? (
              <Link to={announcement.href} style={{ textDecoration: "none" }}>
                <span style={styles.bannerText}>{announcement.message}</span>
              </Link>
            ) : (
              <span style={styles.bannerText}>{announcement.message}</span>
            )}

            <button
              type="button"
              style={styles.bannerClose}
              onClick={() => setDismissed(true)}
              aria-label="Dismiss announcement"
              className="utility-hover"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div style={styles.utilityBar} className="utility-grid">
        {/* LEFT */}
        <div
          style={{ ...styles.left, ...styles.sectionCard }}
          className="utility-left"
        >
          <a
            href={`tel:${emergencyPhone}`}
            style={styles.actionPrimary}
            className="utility-hover"
            aria-label={`Emergency call ${emergencyPhone}`}
            title="Emergency call"
          >
            <span aria-hidden="true">🆘</span>
            <span className="utility-hide-mobile">For Emergency Call </span>
            <strong>{emergencyPhone}</strong>
          </a>

          {selectedLocation?.directionsUrl && (
            <a
              href={selectedLocation.directionsUrl}
              target="_blank"
              rel="noreferrer"
              style={styles.actionSecondary}
              className="utility-hover utility-hide-mobile"
              aria-label="Get directions"
            >
              <span aria-hidden="true">📍</span>
              Directions
            </a>
          )}
        </div>

        {/* CENTER */}
        <div
          style={{ ...styles.center, ...styles.sectionCard }}
          className="utility-center"
        >
          <span
            style={styles.statusCard}
            className="utility-hover"
            title="Clinic timings"
          >
            <span aria-hidden="true">⏰</span>
            <span style={styles.timeMeta} className="utility-hide-mobile">
              {status.sub}
            </span>
          </span>

          <span
            style={styles.statusCard}
            className="utility-hover"
            title="Live status"
          >
            <span style={styles.statusDot(status.isOpen)} />
            <span style={styles.liveLabel}>Status</span>
            <strong style={{ letterSpacing: "0.02em" }}>{status.label}</strong>
          </span>
        </div>

        {/* RIGHT */}
        <div style={styles.right} className="utility-right">
          {/* WhatsApp quick chat */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            style={{
              ...styles.pill,
              borderColor: "rgba(14,165,233,0.26)",
              background: ui.skyLight,
              color: ui.text,
            }}
            className="utility-hover"
            aria-label="Chat on WhatsApp"
          >
            💬{" "}
            <span className="utility-hide-mobile" style={{ color: "#16a34a" }}>
              Chat on WhatsApp
            </span>
          </a>

          {/* Patient portal */}
          {patientPortalUrl && (
            <Link
              to={patientPortalUrl}
              style={{
                ...styles.pill,
                borderColor: "rgba(14,165,233,0.22)",
              }}
              className="utility-hover utility-hide-mobile"
              aria-label="Patient portal"
            >
              Patient Portal
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
