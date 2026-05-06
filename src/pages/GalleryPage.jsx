import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { galleryPage } from "../data/siteContent";

const atmosphereNotes = [
  {
    title: "Quiet luxury reception",
    copy: "The brand should suggest calm, confidence, and hospitality before the first diagnostic touchpoint.",
  },
  {
    title: "Clinical theater without coldness",
    copy: "Advanced spaces can still feel warm when lighting, wording, and layout signal reassurance.",
  },
  {
    title: "Recovery and aftercare continuity",
    copy: "The environment should support not only treatment readiness, but also calm follow-up experiences.",
  },
];

export default function GalleryPage() {
  // Update these quickly
  const WHATSAPP_NUMBER = "+0000000000"; // <-- change
  const PRIMARY_PHONE = "+0000000000"; // <-- change

  // ✅ UPDATED THEME: light + sky/navy (smooth, premium)
  // ✅ Removed Smart Filter & Category System (no tabs, no search)
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
    shadow: "0 4px 24px rgba(14, 165, 233, 0.08), 0 1px 4px rgba(0, 0, 0, 0.06)",
    shadowStrong: "0 20px 60px rgba(2, 8, 23, 0.14), 0 2px 10px rgba(2, 8, 23, 0.08)",
    containerWide: "min(1520px, calc(100% - 24px))",
  };

  const s = {
    main: {
      position: "relative",
      zIndex: 1,
      background: theme.bg,
      color: theme.navy,
      fontFamily: "'Inter', system-ui, sans-serif",
      paddingBottom: "120px",
    },
    sectionBand: { width: "100%", padding: "28px 0" },
    sectionShell: {
      width: theme.containerWide,
      margin: "0 auto",
      position: "relative",
      padding: "36px 0",
    },
    sectionHead: { maxWidth: "760px" },

    // Typography (updated)
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
      fontFamily: "‘DM Serif Display’, serif",
      fontSize: "1.5rem",
      letterSpacing: "-0.02em",
      color: theme.navy,
    },
    p: { color: theme.slate, lineHeight: "1.72", margin: "18px 0 0" },
    eyebrow: {
      display: "inline-flex",
      padding: "6px 14px",
      border: "1px solid rgba(14,165,233,0.20)",
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

    // Mosaic Logic
    mosaic: {
      display: "grid",
      gap: "20px",
      gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
      marginTop: "24px",
    },

    // Cards (light)
    card: {
      position: "relative",
      overflow: "hidden",
      border: "1px solid " + theme.border,
      background: theme.white,
      boxShadow: theme.shadow,
      padding: "28px",
      borderRadius: theme.radiusLG,
    },
    galleryCard: {
      minHeight: "280px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
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
      color: theme.skyHover,
      fontSize: "0.82rem",
      fontWeight: 800,
      letterSpacing: "0.08em",
    },

    // ✅ Replaces the removed sticky filter nav with a clean top header band
    topHeader: {
      width: "100%",
      padding: "86px 0 42px",
      background:
        "linear-gradient(150deg, #e0f2fe 0%, #f0f9ff 40%, #ffffff 100%)",
      borderBottom: "1px solid " + theme.border,
    },
  };

  // -------------------------------------------------------
  // Gallery data model (add real images/videos here later)
  // -------------------------------------------------------
  const mediaItems = useMemo(() => {
    const items = [
      {
        id: "op-theatre",
        type: "image",
        category: "Clinic Infrastructure",
        title: "Operation Theatre",
        caption: "A sterile, premium surgical environment designed for precision.",
        description: "Designed for safety-first workflows, clinical control, and patient comfort.",
        src: "/assets/gallery/op-theatre.jpg",
        tags: ["operation room", "surgery", "sterile"],
        featured: true,
      },
      {
        id: "femto",
        type: "image",
        category: "Technology & Equipment",
        title: "Advanced Laser System",
        caption: "High-precision laser platform for refractive planning.",
        description: "Supports accuracy, safety checks, and predictable outcomes.",
        src: "/assets/gallery/laser.jpg",
        tags: ["LASIK", "laser", "technology"],
        featured: true,
      },
      {
        id: "doctor-work",
        type: "image",
        category: "Doctors & Staff",
        title: "Doctor at Work",
        caption: "Specialist-led care at every step.",
        description: "Every scan is interpreted by clinicians with structured decision support.",
        src: "/assets/gallery/doctor-work.jpg",
        tags: ["doctor", "consultation"],
        featured: true,
      },
      {
        id: "clinic-tour",
        type: "video",
        category: "Clinic Infrastructure",
        title: "Clinic Tour (Video)",
        caption: "Walk through the environment before your visit.",
        description: "A quick overview of reception, diagnostics, and treatment spaces.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        tags: ["tour", "clinic"],
      },
      {
        id: "event-1",
        type: "image",
        category: "Events / Achievements",
        title: "Conference & Achievements",
        caption: "Continuous learning and clinical excellence.",
        description: "Training, conferences, and professional recognition.",
        src: "/assets/gallery/event.jpg",
        tags: ["conference", "award"],
      },
    ];

    const spaces = (galleryPage?.spaces || []).map((space, idx) => ({
      id: `${space}-${idx}`,
      type: "image",
      category: "Clinic Infrastructure",
      title: space.title,
      caption: space.detail,
      description: space.description,
      src: space.image || null,
      tags: [space.detail].filter(Boolean),
      accent: space.accent,
    }));

    return [...items, ...spaces];
  }, []);

  // ✅ No filter system now: gallery uses all items
  const filteredMedia = mediaItems;

  // -------------------------------------------------------
  // Lightbox / Fullscreen Viewer
  // -------------------------------------------------------
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const lightboxItem =
    lightboxIndex === null ? null : filteredMedia[lightboxIndex] || null;

  const closeLightbox = () => setLightboxIndex(null);

  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (x) => (x - 1 + filteredMedia.length) % filteredMedia.length,
    );
  };

  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((x) => (x + 1) % filteredMedia.length);
  };

  // Keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, filteredMedia.length]);

  // Zoom (simple)
  const [zoom, setZoom] = useState(1);
  useEffect(() => setZoom(1), [lightboxIndex]);

  // Hide site header while lightbox is open
  useEffect(() => {
    if (lightboxItem) {
      document.body.classList.add("gallery-lightbox-open");
    } else {
      document.body.classList.remove("gallery-lightbox-open");
    }

    return () => {
      document.body.classList.remove("gallery-lightbox-open");
    };
  }, [lightboxItem]);

  // -------------------------------------------------------
  // Smooth scroll sections (refs kept for future internal jumps)
  // -------------------------------------------------------
  const refs = {
    featured: useRef(null),
    grid: useRef(null),
    beforeAfter: useRef(null),
    videos: useRef(null),
    behind: useRef(null),
    techAction: useRef(null),
    awards: useRef(null),
    social: useRef(null),
    cta: useRef(null),
  };

  // (kept for internal usage if you add jump buttons later)
  const scrollTo = (key) =>
    refs[key]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // -------------------------------------------------------
  // Before/After slider (simple)
  // -------------------------------------------------------
  const [compareValue, setCompareValue] = useState(50);

  const whatsappHref = useMemo(() => {
    const cleaned = WHATSAPP_NUMBER.replace(/[^\d+]/g, "");
    const wa = cleaned.startsWith("+") ? cleaned.slice(1) : cleaned;
    return `https://wa.me/${wa}`;
  }, [WHATSAPP_NUMBER]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');

        .hover-card {
          transition: transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease;
          position: relative;
        }
        .hover-card:hover {
          transform: translateY(-8px);
          border-color: rgba(14,165,233,0.35) !important;
          box-shadow: 0 18px 50px rgba(2,8,23,0.14) !important;
        }
        .hover-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(115deg, transparent 10%, rgba(14,165,233,0.10) 50%, transparent 90%);
          transform: translateX(-120%);
          transition: transform 780ms ease;
        }
        .hover-card:hover::before {
          transform: translateX(120%);
        }

        /* Mosaic Spans Logic */
        .mos-span-7 { grid-column: span 7; }
        .mos-span-5 { grid-column: span 5; }

        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          padding: 0 24px;
          border-radius: 999px;
          font-weight: 700;
          transition: transform 220ms ease, background 220ms ease, box-shadow 220ms ease;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          border: 1px solid transparent;
          cursor: pointer;
          font-family: 'Inter', system-ui;
        }
        .button:hover {
          transform: translateY(-2px);
        }
        .button::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.18), transparent);
          transform: translateX(-120%);
          transition: transform 420ms ease;
        }
        .button:hover::after {
          transform: translateX(120%);
        }
        .button-primary {
          color: #fff;
          background: ${theme.sky};
          box-shadow: 0 8px 24px rgba(14,165,233,0.32);
        }
        .button-primary:hover {
          background: ${theme.skyHover};
          box-shadow: 0 12px 32px rgba(14,165,233,0.40);
        }
        .button-secondary {
          color: ${theme.sky};
          border: 1.5px solid ${theme.sky};
          background: #fff;
        }
        .button-secondary:hover {
          background: ${theme.skyLight};
        }
        .button-ghost {
          color: ${theme.navy};
          border: 1.5px solid ${theme.border};
          background: rgba(255,255,255,0.7);
        }
        .button-ghost:hover {
          background: #fff;
        }
        .button-danger {
          color: #b91c1c;
          border: 1.5px solid rgba(239,68,68,0.25);
          background: rgba(239,68,68,0.10);
        }
        .button-danger:hover {
          background: rgba(239,68,68,0.14);
        }

        .cta-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 34px;
          border-radius: 36px;
          background: linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyMid} 100%);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: ${theme.shadowStrong};
        }

        /* Masonry-ish (CSS columns) for fast masonry without libs */
        .masonry {
          columns: 3;
          column-gap: 18px;
          margin-top: 24px;
        }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 18px;
        }

        .media-tile {
          border-radius: 28px;
          border: 1px solid ${theme.border};
          overflow: hidden;
          background: ${theme.white};
          box-shadow: ${theme.shadowStrong};
          cursor: pointer;
        }
        .media-thumb {
          height: 240px;
          background: radial-gradient(circle at 24% 18%, rgba(14,165,233,0.14), transparent 45%), ${theme.borderLight};
          display: grid;
          place-items: center;
          color: ${theme.slate};
          overflow: hidden;
        }
        .media-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1);
          transition: transform 320ms ease;
          display: block;
        }
        .media-tile:hover .media-thumb img { transform: scale(1.06); }

        .media-meta {
          padding: 14px 16px 16px;
        }
        .media-meta strong {
          display: block;
          color: ${theme.navy};
          font-weight: 900;
          margin-bottom: 6px;
        }
        .media-meta span {
          color: ${theme.slate};
          line-height: 1.55;
          font-size: 0.95rem;
        }

        /* ============================================ */
        /* UPDATED: Fully responsive lightbox / popup */
        /* ============================================ */
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(2,8,23,0.72);
          display: flex;
          align-items: safe center;
          justify-content: center;
          padding: 18px;
          overflow-y: auto;            /* scroll when content is taller than screen */
        }
        .lightbox {
          width: min(1100px, 100%);
          max-height: calc(100vh - 36px);  /* ensures it doesn’t force backdrop to scroll strangely */
          display: flex;
          flex-direction: column;
          border-radius: 28px;
          border: 1px solid ${theme.border};
          background: #fff;
          box-shadow: 0 30px 100px rgba(2,8,23,0.35);
        }
        .lightbox-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 14px 0;
          flex-shrink: 0;
        }
        .lightbox-body {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
          overflow-y: auto;            /* inner scrolling if needed */
        }
        .lightbox-stage {
          border-radius: 22px;
          border: 1px solid ${theme.border};
          overflow: hidden;
          background: ${theme.bg};
        }

        /* image inside stage */
        .lightbox-stage img {
          width: 100%;
          height: min(70vh, 640px);
          object-fit: contain;
          display: block;
          transform-origin: center center;
        }

        /* video wrapper for responsive embed */
        .video-responsive {
          position: relative;
          padding-top: 56.25%; /* 16:9 */
          width: 100%;
        }
        .video-responsive iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        /* hide site header while lightbox is visible */
        .gallery-lightbox-open header,
        .gallery-lightbox-open .site-header,
        .gallery-lightbox-open #site-header {
          display: none !important;
        }

        /* ----------------------- */
        /* mobile responsiveness */
        /* ----------------------- */
        @media (max-width: 640px) {
          .lightbox-backdrop {
            padding: 10px;
          }
          .lightbox {
            border-radius: 20px;
            max-height: calc(100vh - 20px);
          }
          .lightbox-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding: 10px 10px 0;
          }
          .lightbox-header h3 {
            font-size: 1.3rem !important;
          }
          .lightbox-actions {
            width: 100%;
            justify-content: flex-end;
            flex-wrap: wrap;
            gap: 6px;
          }
          .lightbox-body {
            padding: 10px;
          }
          .lightbox-stage img {
            height: min(50vh, 320px) !important;
          }
          .button {
            min-height: 40px;
            padding: 0 14px;
            font-size: 0.85rem;
          }
        }

        /* Adjust masonry and mosaic for smaller screens */
        @media (max-width: 1180px) {
          .gallery-mosaic { grid-template-columns: 1fr 1fr !important; }
          .mos-span-7, .mos-span-5 { grid-column: auto !important; }
          .masonry { columns: 2; }
          .cta-banner { flex-direction: column; align-items: flex-start !important; }
        }
        @media (max-width: 820px) {
          .gallery-mosaic { grid-template-columns: 1fr !important; }
          .masonry { columns: 1; }
          h2 { font-size: clamp(2rem, 9vw, 3rem) !important; }
          .cta-actions { flex-direction: column; width: 100%; }
          .button { width: 100%; }
        }
      `}</style>

      <main style={s.main}>
        {/* 4. Image & Video Gallery Grid (Masonry) */}
        <AnimatedSection style={{ ...s.sectionBand, background: theme.white }}>
          <div style={s.sectionShell}>
            <div style={s.sectionHead}>
              <span style={s.eyebrow}>Gallery</span>
              <h2 style={s.h2}>Images + videos</h2>
              <p style={s.p}>Hover zoom, captions, and full-screen viewing.</p>
            </div>

            <div className="masonry">
              {filteredMedia.map((item, idx) => (
                <div className="masonry-item" key={item.id}>
                  <div
                    className="media-tile hover-card"
                    onClick={() => setLightboxIndex(idx)}
                    role="button"
                    tabIndex={0}
                  >
                    <div
                      className="media-thumb"
                      style={{ height: item.type === "video" ? 200 : 260 }}
                    >
                      {item.type === "image" ? (
                        item.src ? (
                          <img src={item.src} alt={item.title} loading="lazy" />
                        ) : (
                          <div style={{ padding: 18, textAlign: "center" }}>
                            Image placeholder
                          </div>
                        )
                      ) : (
                        <div style={{ padding: 18, textAlign: "center" }}>
                          Video thumbnail placeholder
                          <div style={{ marginTop: 10, opacity: 0.9 }}>▶</div>
                        </div>
                      )}
                    </div>

                    <div className="media-meta">
                      <strong>{item.title}</strong>
                      <span>{item.caption}</span>
                      <div
                        style={{
                          marginTop: 10,
                          display: "flex",
                          gap: 10,
                          flexWrap: "wrap",
                        }}
                      >
                        <span style={{ ...s.miniLabel, margin: 0 }}>
                          {item.category}
                        </span>
                        {item.tags?.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            style={{ color: theme.slate, fontSize: "0.9rem" }}
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredMedia.length === 0 && (
              <div style={{ ...s.card, marginTop: 18 }}>
                <h3 style={{ ...s.h3, margin: 0 }}>No results found.</h3>
                <p style={s.p}>
                  Add images/videos to your gallery data and they will show here.
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* 5. Lightbox / Fullscreen Viewer (responsive) */}
        {lightboxItem && (
          <div
            className="lightbox-backdrop"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
          >
            <div className="lightbox" onClick={(e) => e.stopPropagation()}>
              {/* header */}
              <div className="lightbox-header">
                <div>
                  <span style={s.eyebrow}>{lightboxItem.category}</span>
                  <h3 style={{ ...s.h2, fontSize: "2rem", margin: 0 }}>
                    {lightboxItem.title}
                  </h3>
                  <p style={{ ...s.p, marginTop: 8 }}>
                    {lightboxItem.description}
                  </p>
                </div>
                {/* actions row (zoom, prev, next, close) */}
                <div className="lightbox-actions" style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  <button
                    className="button button-ghost"
                    type="button"
                    onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
                  >
                    Zoom -
                  </button>
                  <button
                    className="button button-ghost"
                    type="button"
                    onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}
                  >
                    Zoom +
                  </button>
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={prevLightbox}
                  >
                    Prev
                  </button>
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={nextLightbox}
                  >
                    Next
                  </button>
                  <button
                    className="button button-ghost"
                    type="button"
                    onClick={closeLightbox}
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* body */}
              <div className="lightbox-body">
                <div className="lightbox-stage">
                  {lightboxItem.type === "image" ? (
                    lightboxItem.src ? (
                      <img
                        src={lightboxItem.src}
                        alt={lightboxItem.title}
                        style={{ transform: `scale(${zoom})` }}
                      />
                    ) : (
                      <div
                        style={{
                          height: 420,
                          display: "grid",
                          placeItems: "center",
                          color: theme.slate,
                        }}
                      >
                        Image placeholder
                      </div>
                    )
                  ) : (
                    <div className="video-responsive">
                      <iframe
                        src={lightboxItem.videoUrl}
                        title={lightboxItem.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ ...s.cardCode, minWidth: "auto" }}>
                    {lightboxIndex + 1}/{filteredMedia.length}
                  </span>
                  {(lightboxItem.tags || []).slice(0, 6).map((t) => (
                    <span key={t} style={{ color: theme.slate }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. Before & After Section (slider comparison) */}
        <AnimatedSection style={s.sectionBand}>
          <div style={s.sectionShell}>
            <div style={s.sectionHead}>
              <span style={s.eyebrow}>Outcomes</span>
              <h2 style={s.h2}>Before & After Results</h2>
              <p style={s.p}>
                Drag the slider to compare. Add real patient outcomes only if you
                have consent and compliance approval.
              </p>
            </div>

            <div className="hover-card" style={{ ...s.card, marginTop: 22 }}>
              <div style={{ display: "grid", gap: 12 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <strong style={{ color: theme.navy }}>
                    Comparison slider (demo)
                  </strong>
                  <span style={{ color: theme.slate }}>
                    Drag: {compareValue}%
                  </span>
                </div>

                <div
                  style={{
                    position: "relative",
                    borderRadius: 22,
                    overflow: "hidden",
                    border: `1px solid ${theme.border}`,
                    background: theme.bg,
                    height: 360,
                  }}
                >
                  {/* BEFORE */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "grid",
                      placeItems: "center",
                      color: theme.slate,
                    }}
                  >
                    Before image placeholder
                  </div>

                  {/* AFTER overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: `${compareValue}%`,
                      overflow: "hidden",
                      background: "rgba(14,165,233,0.08)",
                      borderRight: "2px solid rgba(14,165,233,0.55)",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        display: "grid",
                        placeItems: "center",
                        color: theme.skyHover,
                        fontWeight: 900,
                      }}
                    >
                      After image placeholder
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={compareValue}
                    onChange={(e) => setCompareValue(Number(e.target.value))}
                    style={{
                      position: "absolute",
                      left: 10,
                      right: 10,
                      bottom: 14,
                    }}
                    aria-label="Before after slider"
                  />
                </div>

                <p style={{ ...s.p, marginTop: 0, fontSize: "0.95rem" }}>
                  Disclaimer: Results vary by patient. Visual outcomes depend on
                  candidacy, eye anatomy, and clinical follow-up.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 12. CTA Section */}
        <AnimatedSection style={{ ...s.sectionBand, marginBottom: "60px" }}>
          <div style={s.sectionShell}>
            <div className="cta-banner">
              <div style={{ maxWidth: "720px" }}>
                <span style={{ ...s.eyebrow, background: "rgba(255,255,255,0.10)", color: "#fff", borderColor: "rgba(255,255,255,0.18)" }}>
                  Conversion
                </span>
                <h1 style={{ color: "#fff" }}>
                  Experience our advanced eye care facility firsthand
                </h1>
                <p style={{ ...s.p, color: "rgba(255,255,255,0.75)" }}>
                  Book an appointment or schedule a visit—our team will guide your next step.
                </p>
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: 24 }} className="cta-actions">
                  <Link to="/book-appointment" className="button button-primary">
                    Book Appointment
                  </Link>
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="button button-secondary">
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>
    </>
  );
}