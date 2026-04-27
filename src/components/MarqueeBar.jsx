import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

/**
 * MarqueeBar
 * Features implemented:
 * - Full-width horizontal strip (place below Utility Bar / above Header)
 * - Multiple messages (3–5 recommended), seamless loop via CSS animation
 * - Adjustable speed (prop)
 * - Pause on hover (desktop)
 * - Optional pause on tap (mobile)
 * - Optional dismiss (hide temporarily in sessionStorage)
 * - Clickable messages / CTA links (whole pill clickable)
 * - Minimal DOM + CSS animation (performance)
 *
 * Expected items shape (backwards compatible):
 * 1) string:
 *    "⚡ Limited LASIK Slots Available – Schedule Now"
 * 2) object:
 *    { id, icon, text, href, ctaText, ctaHref, tone }
 */
export function MarqueeBar({
  items = [],
  speedSeconds = 22, // lower = faster
  direction = "left", // "left" | "right"
  pauseOnHover = true,
  pauseOnTapMobile = true,
  dismissible = true,
  storageKey = "eyecon_marquee_dismissed_v1",
  background = "rgba(9, 16, 28, 0.92)",
}) {
  const [dismissed, setDismissed] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!dismissible) return;
    try {
      const v = sessionStorage.getItem(storageKey);
      if (v === "1") setDismissed(true);
    } catch {
      // ignore
    }
  }, [dismissible, storageKey]);

  const normalized = useMemo(() => {
    const list = Array.isArray(items) ? items : [];
    const out = list
      .filter(Boolean)
      .map((x, idx) => {
        if (typeof x === "string") {
          return {
            id: `msg-${idx}`,
            icon: "•",
            text: x,
            href: null,
            tone: "default", // default | promo | urgent | info
          };
        }
        return {
          id: x.id || `msg-${idx}`,
          icon: x.icon || "•",
          text: x.text || "",
          href: x.href || null,
          ctaText: x.ctaText || null,
          ctaHref: x.ctaHref || null,
          tone: x.tone || "default",
        };
      })
      .filter((m) => m.text.trim().length > 0);

    // keep it lightweight: 3–5 max visible is ideal
    return out.slice(0, 8);
  }, [items]);

  // If no items, don't render anything
  if (dismissed || normalized.length === 0) return null;

  // Repeat for seamless loop
  const repeated = useMemo(() => [...normalized, ...normalized], [normalized]);

  const s = {
    band: {
      width: "100%",
      overflow: "hidden",
      position: "relative",
      zIndex: 110,
      background,
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    },
    inner: {
      width: "min(1520px, calc(100% - 24px))",
      margin: "0 auto",
      padding: "8px 0",
      display: "grid",
      gridTemplateColumns: "1fr auto",
      alignItems: "center",
      gap: 12,
    },
    trackWrap: {
      overflow: "hidden",
      width: "100%",
    },
    track: {
      display: "flex",
      gap: "12px",
      width: "max-content",
      willChange: "transform",
      animation: `marqueeSlide ${speedSeconds}s linear infinite`,
      animationPlayState: paused ? "paused" : "running",
    },
    item: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      padding: "8px 14px",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "999px",
      background: "rgba(255, 255, 255, 0.03)",
      color: "rgba(239, 244, 251, 0.92)",
      whiteSpace: "nowrap",
      fontFamily: "'Manrope', sans-serif",
      fontSize: "0.95rem",
      textDecoration: "none",
      cursor: "default",
    },
    iconDot: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#83efe7",
      boxShadow: "0 0 16px rgba(131, 239, 231, 0.55)",
      flex: "0 0 auto",
    },
    cta: {
      marginLeft: 6,
      padding: "6px 10px",
      borderRadius: 999,
      border: "1px solid rgba(131,239,231,0.22)",
      background: "rgba(131,239,231,0.10)",
      color: "#eafffd",
      fontWeight: 900,
      fontSize: "0.82rem",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      textDecoration: "none",
    },
    close: {
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.02)",
      color: "rgba(239,244,251,0.90)",
      borderRadius: 999,
      padding: "6px 10px",
      cursor: "pointer",
      fontWeight: 900,
      minHeight: 32,
    },
  };

  const toneStyle = (tone) => {
    if (tone === "promo") {
      return {
        border: "1px solid rgba(255, 201, 143, 0.22)",
        background: "rgba(255, 201, 143, 0.08)",
      };
    }
    if (tone === "urgent") {
      return {
        border: "1px solid rgba(255, 107, 107, 0.26)",
        background: "rgba(255, 107, 107, 0.10)",
      };
    }
    if (tone === "info") {
      return {
        border: "1px solid rgba(142, 203, 255, 0.22)",
        background: "rgba(142, 203, 255, 0.08)",
      };
    }
    return null;
  };

  const onDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // ignore
    }
  };

  return (
    <div style={s.band} aria-label="Announcements marquee">
      <style>{`
        @keyframes marqueeSlide {
          from { transform: translateX(${direction === "right" ? "-50%" : "0"}); }
          to { transform: translateX(${direction === "right" ? "0" : "-50%"}); }
        }

        .marquee-hover-pause:hover .marquee-track {
          animation-play-state: paused;
        }

        @media (max-width: 820px) {
          .marquee-item {
            font-size: 1rem !important;
            padding: 10px 14px !important;
          }
        }
      `}</style>

      <div
        style={s.inner}
        className={pauseOnHover ? "marquee-hover-pause" : ""}
      >
        <div style={s.trackWrap}>
          <div
            style={s.track}
            className="marquee-track"
            onMouseEnter={() => pauseOnHover && setPaused(true)}
            onMouseLeave={() => pauseOnHover && setPaused(false)}
            onClick={() => {
              if (!pauseOnTapMobile) return;
              // Mobile tap toggles pause so users can read
              setPaused((p) => !p);
            }}
            role="marquee"
            aria-label="Scrolling announcements"
          >
            {repeated.map((m, idx) => {
              const clickable = Boolean(m.href);
              const Comp = clickable ? Link : "div";
              const compProps = clickable ? { to: m.href } : {};

              return (
                <Comp
                  key={`${m.id}-${idx}`}
                  {...compProps}
                  style={{
                    ...s.item,
                    ...(toneStyle(m.tone) || {}),
                    cursor: clickable ? "pointer" : "default",
                  }}
                  className="marquee-item"
                >
                  {/* separator icon / dot */}
                  <span style={s.iconDot} aria-hidden="true" />

                  <span style={{ fontWeight: 700 }}>{m.text}</span>

                  {/* Optional CTA inside the pill */}
                  {m.ctaText && m.ctaHref && (
                    <Link
                      to={m.ctaHref}
                      style={s.cta}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {m.ctaText}
                    </Link>
                  )}
                </Comp>
              );
            })}
          </div>
        </div>

        {dismissible && (
          <button
            type="button"
            style={s.close}
            onClick={onDismiss}
            aria-label="Dismiss announcements"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
