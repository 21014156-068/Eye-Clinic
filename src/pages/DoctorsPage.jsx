import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";

import { doctors, doctorsPage } from "../data/siteContent";

const clinicBoard = [
  {
    title: "Consultation windows",
    copy: "Structured specialist scheduling for exams, diagnosis reviews, and second opinions.",
  },
  {
    title: "Procedure pathways",
    copy: "Refractive and cataract journeys aligned with counseling, imaging, and post-op support.",
  },
  {
    title: "Monitoring continuity",
    copy: "Long-term retina and glaucoma reviews delivered with more rhythm and predictability.",
  },
];

const DOCTOR_FAQ = [
  {
    question: "How do I choose the right doctor?",
    answer:
      "Start by selecting your issue (LASIK, cataract, retina, glaucoma, pediatric). Then check experience, availability, and book a consultation for candidacy screening.",
  },
  {
    question: "Can I switch doctors after booking?",
    answer:
      "Yes. If your case needs a different specialist, or you prefer another doctor, the clinic can re-route you to the best match.",
  },
  {
    question: "Are consultations online or in-person?",
    answer:
      "Both can be offered depending on the case. Some conditions require in-clinic diagnostics; others can start with an online consult.",
  },
];

export default function DoctorsPage() {
  // Update these quickly
  const WHATSAPP_NUMBER = "+0000000000"; // <-- change
  const PRIMARY_PHONE = "+0000000000"; // <-- change

  const allDoctors = Array.isArray(doctors) ? doctors : [];
  const featuredDoctor = allDoctors[0] || null;

  // ✅ UPDATED theme: light + sky/navy (typography + colors updated)
  // ✅ Layout + structure kept the same
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
    sectionBand: { width: "100%", padding: "28px 0" },
    sectionShell: {
      width: theme.containerWide,
      margin: "0 auto",
      padding: "36px 0",
      position: "relative",
    },

    // ✅ Replaces PageHero (simple header band; not changing rest of page layout)
    topHeader: {
      width: "100%",
      padding: "86px 0 42px",
      background:
        "linear-gradient(150deg, #e0f2fe 0%, #f0f9ff 40%, #ffffff 100%)",
      borderBottom: `1px solid ${theme.border}`,
    },

    // Featured Doctor Card (same layout; new colors)
    featuredDoctor: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr) auto",
      gap: "28px",
      padding: "32px",
      borderRadius: theme.radiusXL,
      background:
        "radial-gradient(circle at top left, rgba(14,165,233,0.16), transparent 26%), radial-gradient(circle at bottom right, rgba(56,189,248,0.12), transparent 30%), linear-gradient(135deg, #ffffff, #f8fafc)",
      border: `1px solid ${theme.border}`,
      boxShadow: theme.shadowStrong,
    },
    featuredMain: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: "20px",
      alignItems: "start",
    },
    featuredSide: {
      display: "grid",
      gap: "16px",
      alignContent: "start",
      maxWidth: "360px",
    },

    // Avatars (fallback if no images)
    avatar: {
      display: "grid",
      placeItems: "center",
      borderRadius: "24px",
      background: `linear-gradient(135deg, ${theme.sky}, ${theme.skyMid})`,
      color: "#ffffff",
      fontFamily: "'Inter', system-ui, sans-serif",
      fontWeight: 800,
      boxShadow: "0 10px 28px rgba(14,165,233,0.28)",
    },

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
      display: "block",
      fontFamily: "'Inter', system-ui, sans-serif",
    },

    // Grids
    doctorGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "20px",
      marginTop: "22px",
    },
    dualPanel: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 0.94fr) minmax(0, 1.06fr)",
      gap: "24px",
      alignItems: "start",
    },

    // Generic Card (kept layout; changed colors to light)
    glassCard: {
      padding: "28px",
      borderRadius: theme.radiusLG,
      border: `1px solid ${theme.border}`,
      background: theme.white,
      boxShadow: theme.shadow,
      position: "relative",
      overflow: "hidden",
    },
  };

  // -------------------------------------------------------
  // Smart Search & Filter System
  // -------------------------------------------------------
  const SPECIALIZATIONS = useMemo(() => {
    const set = new Set();
    allDoctors.forEach((d) => {
      (d.focus || []).forEach((x) => set.add(String(x)));
      if (d.role) set.add(String(d.role));
    });
    ["Cataract", "Retina", "LASIK", "Glaucoma", "Pediatric"].forEach((x) =>
      set.add(x),
    );
    return Array.from(set).slice(0, 18);
  }, [allDoctors]);

  const EXPERIENCE_OPTIONS = [
    { label: "Any", value: "any" },
    { label: "5+ years", value: "5" },
    { label: "10+ years", value: "10" },
    { label: "15+ years", value: "15" },
  ];

  const AVAILABILITY_OPTIONS = [
    { label: "Any", value: "any" },
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
  ];

  const SORT_OPTIONS = [
    { label: "Most experienced", value: "experience" },
    { label: "Highest rated", value: "rating" },
    { label: "Available now", value: "available" },
  ];

  const [query, setQuery] = useState("");
  const [specialization, setSpecialization] = useState("Any");
  const [experienceMin, setExperienceMin] = useState("any");
  const [gender, setGender] = useState("Any");
  const [availability, setAvailability] = useState("any");
  const [sort, setSort] = useState("experience");

  const enrichedDoctors = useMemo(() => {
    return allDoctors.map((d, i) => {
      const expYears =
        typeof d.experienceYears === "number"
          ? d.experienceYears
          : typeof d.years === "number"
            ? d.years
            : 6 + ((i * 3) % 14);

      const rating =
        typeof d.rating === "number"
          ? d.rating
          : Math.round((4.6 + (i % 4) * 0.1) * 10) / 10;

      const availabilityStatus =
        d.availabilityStatus ||
        (i % 3 === 0
          ? "Available today"
          : i % 3 === 1
            ? "This week"
            : "Next week");

      const spec =
        d.specialization ||
        (d.focus && d.focus.length ? d.focus[0] : d.role || "Ophthalmology");

      return {
        ...d,
        _id: d.id || `${d.name}-${i}`,
        experienceYears: expYears,
        rating,
        availabilityStatus,
        specialization: spec,
        gender: d.gender || (i % 2 === 0 ? "Male" : "Female"),
        photoUrl: d.photoUrl || d.photo || null,
      };
    });
  }, [allDoctors]);

  const filteredDoctors = useMemo(() => {
    const q = query.trim().toLowerCase();

    const matchAvailability = (status) => {
      const s = String(status || "").toLowerCase();
      if (availability === "any") return true;
      if (availability === "today") return s.includes("today");
      if (availability === "week")
        return s.includes("week") || s.includes("today");
      return true;
    };

    const list = enrichedDoctors
      .filter((d) => {
        if (!q) return true;
        const hay =
          `${d.name} ${d.role} ${d.specialization} ${(d.focus || []).join(" ")}`.toLowerCase();
        return hay.includes(q);
      })
      .filter((d) =>
        specialization === "Any"
          ? true
          : `${d.specialization} ${(d.focus || []).join(" ")}`
              .toLowerCase()
              .includes(specialization.toLowerCase()),
      )
      .filter((d) => {
        if (experienceMin === "any") return true;
        return (d.experienceYears || 0) >= Number(experienceMin);
      })
      .filter((d) =>
        gender === "Any"
          ? true
          : String(d.gender || "").toLowerCase() === gender.toLowerCase(),
      )
      .filter((d) => matchAvailability(d.availabilityStatus));

    const sorted = [...list].sort((a, b) => {
      if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sort === "available") {
        const score = (x) => {
          const s = String(x || "").toLowerCase();
          if (s.includes("today")) return 2;
          if (s.includes("week")) return 1;
          return 0;
        };
        return score(b.availabilityStatus) - score(a.availabilityStatus);
      }
      return (b.experienceYears || 0) - (a.experienceYears || 0);
    });

    return sorted;
  }, [
    enrichedDoctors,
    query,
    specialization,
    experienceMin,
    gender,
    availability,
    sort,
  ]);

  // -------------------------------------------------------
  // Doctor-to-Service Mapping (simple)
  // -------------------------------------------------------
  const serviceToDoctors = useMemo(() => {
    const buckets = {
      LASIK: [],
      Cataract: [],
      Retina: [],
      Glaucoma: [],
      Pediatric: [],
    };

    enrichedDoctors.forEach((d) => {
      const text =
        `${d.specialization} ${(d.focus || []).join(" ")} ${d.role}`.toLowerCase();
      if (text.includes("lasik") || text.includes("refr"))
        buckets.LASIK.push(d);
      if (text.includes("catar")) buckets.Cataract.push(d);
      if (text.includes("retina")) buckets.Retina.push(d);
      if (text.includes("glaucoma")) buckets.Glaucoma.push(d);
      if (text.includes("pediatric") || text.includes("child"))
        buckets.Pediatric.push(d);
    });

    Object.keys(buckets).forEach((k) => {
      if (buckets[k].length === 0) buckets[k] = enrichedDoctors.slice(0, 3);
      else buckets[k] = buckets[k].slice(0, 3);
    });

    return buckets;
  }, [enrichedDoctors]);

  // ✅ NEW: detect "filtering mode"
  // When user searches OR selects any filter (specialization/experience/gender/availability) -> show only the services mapping cards.
  const isFilteringMode = useMemo(() => {
    const hasSearch = query.trim().length > 0;
    const hasSpecialization = specialization !== "Any";
    const hasExperience = experienceMin !== "any";
    const hasGender = gender !== "Any";
    const hasAvailability = availability !== "any";
    return (
      hasSearch ||
      hasSpecialization ||
      hasExperience ||
      hasGender ||
      hasAvailability
    );
  }, [query, specialization, experienceMin, gender, availability]);

  // -------------------------------------------------------
  // "Find the Right Doctor" Wizard
  // -------------------------------------------------------
  const [wizardStep, setWizardStep] = useState(1);
  const [wizard, setWizard] = useState({ issue: "", location: "", time: "" });

  const wizardRecommendation = useMemo(() => {
    if (!wizard.issue) return null;
    const issue = wizard.issue.toLowerCase();
    const pool = enrichedDoctors.filter((d) => {
      const hay =
        `${d.specialization} ${(d.focus || []).join(" ")} ${d.role}`.toLowerCase();
      return (
        hay.includes(issue) || (issue === "checkup" && hay.includes("oph"))
      );
    });
    return (pool.length ? pool : enrichedDoctors).slice(0, 1)[0] || null;
  }, [wizard.issue, enrichedDoctors]);

  // -------------------------------------------------------
  // Smooth scroll anchors
  // -------------------------------------------------------
  const refs = {
    featured: useRef(null),
    roster: useRef(null),
    mapping: useRef(null),
    wizard: useRef(null),
    testimonials: useRef(null),
    options: useRef(null),
    philosophy: useRef(null),
    faq: useRef(null),
    cta: useRef(null),
  };

  const scrollTo = (key) =>
    refs[key]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const whatsappHref = useMemo(() => {
    const cleaned = WHATSAPP_NUMBER.replace(/[^\d+]/g, "");
    const wa = cleaned.startsWith("+") ? cleaned.slice(1) : cleaned;
    return `https://wa.me/${wa}`;
  }, [WHATSAPP_NUMBER]);

  return (
    <main
      className="page-shell page-shell-doctors"
      style={{
        background: theme.bg,
        color: theme.navy,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');

        .hover-card { transition: transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease; position: relative; overflow: hidden; }
        .hover-card:hover { transform: translateY(-8px); border-color: rgba(14, 165, 233, 0.35) !important; box-shadow: 0 18px 50px rgba(2,8,23,0.14) !important; }
        .hover-card::before { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(115deg, transparent 10%, rgba(14,165,233,0.10) 50%, transparent 90%); transform: translateX(-120%); transition: transform 780ms ease; }
        .hover-card:hover::before { transform: translateX(120%); }

        .pill-list, .pill-cloud { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
        .pill-list span, .pill-cloud span { padding: 10px 14px; border: 1px solid ${theme.border}; border-radius: 999px; background: ${theme.bg}; color: ${theme.navyMid}; font-size: 0.88rem; font-weight: 600; }
        .pill-cloud span { padding: 14px 18px; font-size: 0.94rem; }

        .button { display: inline-flex; align-items: center; justify-content: center; min-height: 50px; padding: 0 24px; border-radius: 999px; font-weight: 700; transition: transform 220ms ease, background 220ms ease, box-shadow 220ms ease; text-decoration: none; white-space: nowrap; border: 1px solid transparent; cursor: pointer; font-family: 'Inter', system-ui; }
        .button:hover { transform: translateY(-2px); }
        .button-primary { color: #fff; background: ${theme.sky}; box-shadow: 0 8px 24px rgba(14,165,233,0.32); }
        .button-primary:hover { background: ${theme.skyHover}; box-shadow: 0 12px 32px rgba(14,165,233,0.40); }
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
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.10);
        }

        .sticky-filter {
          position: sticky;
          top: 12px;
          z-index: 50;
          border-radius: 22px;
          border: 1px solid ${theme.border};
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(18px);
          box-shadow: 0 16px 48px rgba(2, 8, 23, 0.10);
          padding: 12px;
        }

        .tabs {
          display: flex;
          gap: 10px;
          overflow: auto;
          padding-bottom: 6px;
          scrollbar-width: none;
        }
        .tabs::-webkit-scrollbar { display: none; }
        .tab {
          flex: 0 0 auto;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid ${theme.border};
          background: #fff;
          color: ${theme.navyMid};
          font-weight: 800;
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
        }
        .tab:hover { transform: translateY(-1px); border-color: rgba(14,165,233,0.35); background: ${theme.skyLight}; }
        .tab-active { border-color: rgba(14,165,233,0.45); background: ${theme.skyLight}; color: ${theme.skyHover}; }

        .grid-4 { display: grid; gap: 20px; grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .grid-3 { display: grid; gap: 20px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .grid-2 { display: grid; gap: 20px; grid-template-columns: repeat(2, minmax(0, 1fr)); }

        .cta-banner { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 34px; border-radius: 36px; background: linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyMid} 100%); border: 1px solid rgba(255,255,255,0.12); box-shadow: ${theme.shadowStrong}; }

        .floating-cta {
          position: fixed;
          right: 16px;
          bottom: 16px;
          z-index: 60;
          display: grid;
          gap: 10px;
        }

        @media (max-width: 1180px) {
          .featured-doctor, .doctor-grid, .dual-panel, .featured-doctor-main, .cta-banner,
          .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr !important; }
          .featured-doctor-side { max-width: 100% !important; }
          .floating-cta { left: 16px; right: 16px; }
          .floating-cta .button { width: 100%; }
        }
        @media (max-width: 820px) {
          .cta-actions { flex-direction: column; width: 100%; }
          .button { width: 100%; }
        }
      `}</style>

      {/* 2. Smart Search & Filter System (Sticky) */}
      <AnimatedSection style={{ ...s.sectionBand, paddingTop: 0 }}>
        <div style={s.sectionShell}>
          <div className="sticky-filter">
            <div style={{ display: "grid", gap: "10px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "10px",
                }}
              >
                <input
                  className="input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name or specialization"
                  aria-label="Search doctors"
                />
              </div>

              {/* ✅ When filtering/searching, hide scroll tabs (since sections are hidden) */}
              {!isFilteringMode && (
                <div
                  className="tabs"
                  role="tablist"
                  aria-label="Quick scroll"
                  style={{ justifyContent: "center", flexWrap: "wrap" }}
                >
                  {[
                    { k: "featured", label: "Featured" },
                    { k: "roster", label: "All Doctors" },
                    { k: "wizard", label: "Find Doctor Wizard" },
                    { k: "mapping", label: "Doctor ↔ Service" },
                    { k: "faq", label: "FAQ" },
                  ].map((x) => (
                    <button
                      key={x.k}
                      type="button"
                      className="tab"
                      onClick={() => scrollTo(x.k)}
                    >
                      {x.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid-4">
                <select
                  className="input"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  aria-label="Filter specialization"
                >
                  <option value="Any">Specialization (Any)</option>
                  {SPECIALIZATIONS.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>

                <select
                  className="input"
                  value={experienceMin}
                  onChange={(e) => setExperienceMin(e.target.value)}
                  aria-label="Filter experience"
                >
                  {EXPERIENCE_OPTIONS.map((x) => (
                    <option key={x.value} value={x.value}>
                      Experience ({x.label})
                    </option>
                  ))}
                </select>

                <select
                  className="input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  aria-label="Filter gender"
                >
                  <option value="Any">Gender (Any)</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <select
                  className="input"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  aria-label="Filter availability"
                >
                  {AVAILABILITY_OPTIONS.map((x) => (
                    <option key={x.value} value={x.value}>
                      Availability ({x.label})
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "10px",
                }}
              >
                <select
                  className="input"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Sort doctors"
                >
                  {SORT_OPTIONS.map((x) => (
                    <option key={x.value} value={x.value}>
                      Sort: {x.label}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="button button-ghost"
                  style={{ minHeight: "50px", padding: "0 16px" }}
                  onClick={() => {
                    setQuery("");
                    setSpecialization("Any");
                    setExperienceMin("any");
                    setGender("Any");
                    setAvailability("any");
                    setSort("experience");
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ✅ When user searches/filters, show ONLY Doctor ↔ Service Mapping (services cards) */}
      {isFilteringMode ? (
        <AnimatedSection
          style={{
            ...s.sectionBand,
            backgroundColor: "#ffffff",
            paddingTop: 0,
          }}
        >
          <div style={s.sectionShell} ref={refs.mapping}>
            <div style={{ maxWidth: 760 }}>
              <span style={s.eyebrow}>Doctor ↔ Service Mapping</span>
              <h2 style={s.h2}>See who handles which treatment.</h2>
              <p style={s.p}>
                Filtered results are shown below based on your search and
                selected options.
              </p>
            </div>

            <div className="grid-2" style={{ marginTop: 22 }}>
              {Object.entries(serviceToDoctors).map(([service, list]) => {
                // ✅ Only show doctors that are currently in filteredDoctors
                const allowed = new Set(filteredDoctors.map((d) => d._id));
                const filteredList = list.filter((d) => allowed.has(d._id));

                // If nothing matches this service under the current filters -> hide that service card
                if (filteredList.length === 0) return null;

                return (
                  <article
                    key={service}
                    className="hover-card"
                    style={{ ...s.glassCard, padding: 22 }}
                  >
                    <h3 style={{ ...s.h3, marginTop: 0 }}>{service}</h3>
                    <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
                      {filteredList.map((d) => (
                        <div
                          key={d._id}
                          style={{
                            padding: 14,
                            borderRadius: 18,
                            border: `1px solid ${theme.border}`,
                            background: theme.bg,
                            display: "grid",
                            gridTemplateColumns: "auto 1fr auto",
                            gap: 12,
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              ...s.avatar,
                              width: 54,
                              height: 54,
                              fontSize: "0.95rem",
                              borderRadius: 18,
                            }}
                          >
                            {d.initials || "DR"}
                          </div>
                          <div>
                            <div style={{ color: theme.navy, fontWeight: 900 }}>
                              {d.name}
                            </div>
                            <div style={{ color: theme.slate, marginTop: 4 }}>
                              {d.specialization}
                            </div>
                          </div>
                          <Link
                            to="/appointment"
                            className="button button-primary"
                            style={{ minHeight: 44, padding: "0 14px" }}
                          >
                            Consult
                          </Link>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* If user filters to nothing, show a simple note (no design changes elsewhere) */}
            {filteredDoctors.length === 0 && (
              <div style={{ ...s.glassCard, marginTop: 22 }}>
                <h3 style={{ ...s.h3, margin: 0 }}>No matches found.</h3>
                <p style={s.p}>
                  Try clearing filters or searching by “LASIK”, “Retina”, or
                  “Cataract”.
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>
      ) : (
        <>
          {/* 4. Featured / Senior Specialists */}
          <AnimatedSection style={s.sectionBand}>
            <div style={s.sectionShell} ref={refs.featured}>
              {!featuredDoctor ? (
                <div style={s.glassCard}>
                  <h2 style={s.h2}>No doctors found</h2>
                  <p style={s.p}>
                    Add doctors to your siteContent data to populate this page.
                  </p>
                </div>
              ) : (
                <div
                  className="featured-doctor hover-card"
                  style={s.featuredDoctor}
                >
                  <div style={s.featuredMain} className="featured-doctor-main">
                    {featuredDoctor.photoUrl ? (
                      <img
                        src={featuredDoctor.photoUrl}
                        alt={featuredDoctor.name}
                        style={{
                          width: 112,
                          height: 112,
                          borderRadius: 24,
                          objectFit: "cover",
                          border: `1px solid ${theme.border}`,
                          background: "#fff",
                        }}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        style={{
                          ...s.avatar,
                          width: "112px",
                          height: "112px",
                          fontSize: "1.55rem",
                        }}
                      >
                        {featuredDoctor.initials || "DR"}
                      </div>
                    )}

                    <div>
                      <span style={s.miniLabel}>
                        {featuredDoctor.role || "Senior Specialist"}
                      </span>
                      <h2 style={{ ...s.h2, fontSize: "2.8rem" }}>
                        {featuredDoctor.name}
                      </h2>
                      <p style={s.p}>{featuredDoctor.bio}</p>

                      <div className="pill-list">
                        <span>
                          {featuredDoctor.specialization || "Senior Consultant"}
                        </span>
                        <span>
                          {featuredDoctor.experienceYears || 15}+ years
                        </span>
                        <span>Rating: {featuredDoctor.rating}/5</span>
                        <span>{featuredDoctor.availabilityStatus}</span>
                      </div>
                    </div>
                  </div>

                  <div style={s.featuredSide} className="featured-doctor-side">
                    <p
                      style={{ color: theme.navy, fontWeight: 700, margin: 0 }}
                    >
                      {featuredDoctor.schedule || "Appointments available"}
                    </p>

                    <div className="pill-list">
                      {(featuredDoctor.focus || []).slice(0, 6).map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      <Link className="button button-primary" to="/appointment">
                        Consult Now
                      </Link>
                      <Link
                        className="button button-secondary"
                        to="/appointment"
                      >
                        Book Appointment
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* 3. Doctor Listing Grid (Primary Content) */}
          <AnimatedSection
            style={{ ...s.sectionBand, backgroundColor: "#ffffff" }}
          >
            <div style={s.sectionShell} ref={refs.roster}>
              <div style={{ maxWidth: "760px" }}>
                <span style={s.eyebrow}>Doctors Listing</span>
                <h2 style={{ ...s.h2 }}>Find the specialist</h2>
                <p style={{ ...s.p }}>
                  Search, filter, and book in two clicks.
                </p>
              </div>

              <div style={s.doctorGrid} className="doctor-grid">
                {filteredDoctors.map((doctor) => (
                  <article
                    className="hover-card"
                    key={doctor._id}
                    style={{ ...s.glassCard, padding: 22 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      {doctor.photoUrl ? (
                        <img
                          src={doctor.photoUrl}
                          alt={doctor.name}
                          style={{
                            width: 74,
                            height: 74,
                            borderRadius: 22,
                            objectFit: "cover",
                            border: `1px solid ${theme.border}`,
                          }}
                          loading="lazy"
                        />
                      ) : (
                        <div
                          style={{
                            ...s.avatar,
                            width: "74px",
                            height: "74px",
                            fontSize: "1.1rem",
                          }}
                        >
                          {doctor.initials || "DR"}
                        </div>
                      )}

                      <div
                        style={{ display: "grid", gap: 8, justifyItems: "end" }}
                      >
                        <span
                          style={{
                            padding: "7px 10px",
                            borderRadius: 999,
                            border: `1px solid ${theme.border}`,
                            color: theme.navyMid,
                            background: theme.borderLight,
                            fontWeight: 900,
                          }}
                        >
                          {doctor.availabilityStatus}
                        </span>
                        <span
                          style={{
                            padding: "7px 10px",
                            borderRadius: 999,
                            border: `1px solid rgba(14,165,233,0.25)`,
                            color: theme.skyHover,
                            background: theme.skyLight,
                            fontWeight: 900,
                          }}
                        >
                          ★ {doctor.rating}
                        </span>
                      </div>
                    </div>

                    <span style={{ ...s.miniLabel, marginTop: 14 }}>
                      {doctor.role}
                    </span>
                    <h3 style={{ ...s.h3, marginTop: 6 }}>{doctor.name}</h3>

                    <div className="pill-list">
                      <span>{doctor.specialization}</span>
                      <span>{doctor.experienceYears}+ years</span>
                    </div>

                    <p style={{ ...s.p, marginTop: 12 }}>{doctor.bio}</p>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 10,
                        marginTop: 16,
                      }}
                    >
                      <Link className="button button-secondary" to="/doctors">
                        View Profile
                      </Link>
                      <Link className="button button-primary" to="/appointment">
                        Book Appointment
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {filteredDoctors.length === 0 && (
                <div style={{ ...s.glassCard, marginTop: 22 }}>
                  <h3 style={{ ...s.h3, margin: 0 }}>
                    No doctors match your filters.
                  </h3>
                  <p style={s.p}>
                    Try clearing filters or searching by “LASIK”, “Retina”, or
                    “Cataract”.
                  </p>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* 7. Find the Right Doctor Wizard */}
          <AnimatedSection style={s.sectionBand}>
            <div style={s.sectionShell} ref={refs.wizard}>
              <div style={{ maxWidth: 760 }}>
                <span style={s.eyebrow}>Doctor Wizard</span>
                <h2 style={s.h2}>Find Doctor in 3 steps.</h2>
                <p style={s.p}>
                  High conversion decision support (simple, fast, and clear).
                </p>
              </div>

              <div className="grid-2" style={{ marginTop: 22 }}>
                <div
                  className="hover-card"
                  style={{ ...s.glassCard, padding: 22 }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <span style={{ ...s.eyebrow, margin: 0 }}>
                      Step {wizardStep} / 3
                    </span>
                    <button
                      className="button button-ghost"
                      type="button"
                      onClick={() => {
                        setWizardStep(1);
                        setWizard({ issue: "", location: "", time: "" });
                      }}
                      style={{ minHeight: 44 }}
                    >
                      Clear
                    </button>
                  </div>

                  {wizardStep === 1 && (
                    <div style={{ marginTop: 14 }}>
                      <div style={{ color: theme.navy, fontWeight: 900 }}>
                        What issue are you facing?
                      </div>
                      <select
                        className="input"
                        style={{ marginTop: 10 }}
                        value={wizard.issue}
                        onChange={(e) =>
                          setWizard((p) => ({ ...p, issue: e.target.value }))
                        }
                      >
                        <option value="">Choose…</option>
                        <option value="LASIK">LASIK / Vision correction</option>
                        <option value="Cataract">Cataract / Lens</option>
                        <option value="Retina">Retina / Floaters</option>
                        <option value="Glaucoma">
                          Glaucoma / Eye pressure
                        </option>
                        <option value="Pediatric">
                          Pediatric / Child vision
                        </option>
                        <option value="Checkup">General checkup</option>
                      </select>
                    </div>
                  )}

                  {wizardStep === 2 && (
                    <div style={{ marginTop: 14 }}>
                      <div style={{ color: theme.navy, fontWeight: 900 }}>
                        Preferred location
                      </div>
                      <select
                        className="input"
                        style={{ marginTop: 10 }}
                        value={wizard.location}
                        onChange={(e) =>
                          setWizard((p) => ({ ...p, location: e.target.value }))
                        }
                      >
                        <option value="">Any location</option>
                        <option value="Main Clinic">Main Clinic</option>
                        <option value="Branch 2">Branch 2</option>
                      </select>
                    </div>
                  )}

                  {wizardStep === 3 && (
                    <div style={{ marginTop: 14 }}>
                      <div style={{ color: theme.navy, fontWeight: 900 }}>
                        Preferred time
                      </div>
                      <select
                        className="input"
                        style={{ marginTop: 10 }}
                        value={wizard.time}
                        onChange={(e) =>
                          setWizard((p) => ({ ...p, time: e.target.value }))
                        }
                      >
                        <option value="">Any time</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                      </select>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                      marginTop: 18,
                    }}
                  >
                    <button
                      className="button button-secondary"
                      type="button"
                      onClick={() => setWizardStep((x) => Math.max(1, x - 1))}
                    >
                      Back
                    </button>
                    <button
                      className="button button-primary"
                      type="button"
                      onClick={() => setWizardStep((x) => Math.min(3, x + 1))}
                      style={{ border: "none" }}
                    >
                      Next
                    </button>
                  </div>
                </div>

                <div
                  className="hover-card"
                  style={{ ...s.glassCard, padding: 22 }}
                >
                  <span style={s.eyebrow}>Recommendation</span>
                  <h3 style={{ ...s.h3, marginTop: 0 }}>
                    {wizardRecommendation
                      ? wizardRecommendation.name
                      : "Choose an issue to get a recommendation"}
                  </h3>
                  <p style={s.p}>
                    {wizardRecommendation
                      ? `Best match for: ${wizard.issue}. Experience: ${wizardRecommendation.experienceYears}+ years. Availability: ${wizardRecommendation.availabilityStatus}.`
                      : "This will recommend a doctor and give you a direct booking route."}
                  </p>

                  {wizardRecommendation && (
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        flexWrap: "wrap",
                        marginTop: 16,
                      }}
                    >
                      <Link className="button button-primary" to="/appointment">
                        Book Now
                      </Link>
                      <a
                        className="button button-secondary"
                        href={whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                      >
                        WhatsApp Chat
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* 6. Doctor-to-Service Mapping */}
          <AnimatedSection
            style={{ ...s.sectionBand, backgroundColor: "#ffffff" }}
          >
            <div style={s.sectionShell} ref={refs.mapping}>
              <div style={{ maxWidth: 760 }}>
                <span style={s.eyebrow}>Doctor ↔ Service Mapping</span>
                <h2 style={s.h2}>See who handles which treatment.</h2>
                <p style={s.p}>
                  Improves patient decision-making and reduces bounce.
                </p>
              </div>

              <div className="grid-2" style={{ marginTop: 22 }}>
                {Object.entries(serviceToDoctors).map(([service, list]) => (
                  <article
                    key={service}
                    className="hover-card"
                    style={{ ...s.glassCard, padding: 22 }}
                  >
                    <h3 style={{ ...s.h3, marginTop: 0 }}>{service}</h3>
                    <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
                      {list.map((d) => (
                        <div
                          key={d._id}
                          style={{
                            padding: 14,
                            borderRadius: 18,
                            border: `1px solid ${theme.border}`,
                            background: theme.bg,
                            display: "grid",
                            gridTemplateColumns: "auto 1fr auto",
                            gap: 12,
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              ...s.avatar,
                              width: 54,
                              height: 54,
                              fontSize: "0.95rem",
                              borderRadius: 18,
                            }}
                          >
                            {d.initials || "DR"}
                          </div>
                          <div>
                            <div style={{ color: theme.navy, fontWeight: 900 }}>
                              {d.name}
                            </div>
                            <div style={{ color: theme.slate, marginTop: 4 }}>
                              {d.specialization}
                            </div>
                          </div>
                          <Link
                            to="/appointment"
                            className="button button-primary"
                            style={{ minHeight: 44, padding: "0 14px" }}
                          >
                            Consult
                          </Link>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* 9. Consultation Options */}
          <AnimatedSection style={s.sectionBand}>
            <div style={s.sectionShell} ref={refs.options}>
              <div style={{ maxWidth: 760 }}>
                <span style={s.eyebrow}>Consultation Options</span>
                <h2 style={s.h2}>Get expert help.</h2>
              </div>

              <div className="grid-3" style={{ marginTop: 22 }}>
                {[
                  {
                    id: "01",
                    title: "In-clinic consultation",
                    copy: "Full diagnostics + specialist evaluation.",
                  },
                  {
                    id: "02",
                    title: "Online consultation (video)",
                    copy: "Start with questions, history, and guidance where appropriate.",
                  },
                  {
                    id: "03",
                    title: "Emergency consultation",
                    copy: "For urgent symptoms—call and we’ll guide next steps.",
                  },
                ].map((x) => (
                  <article
                    key={x.id}
                    className="hover-card"
                    style={{ ...s.glassCard, padding: 22 }}
                  >
                    <span style={s.miniLabel}>Option {x.id}</span>
                    <h3 style={{ ...s.h3, marginTop: 6 }}>{x.title}</h3>
                    <p style={{ ...s.p, marginTop: 10 }}>{x.copy}</p>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        flexWrap: "wrap",
                        marginTop: 16,
                      }}
                    >
                      <Link
                        to="/appointment"
                        className="button button-primary"
                        style={{ minHeight: 46 }}
                      >
                        Book
                      </Link>
                      <a
                        href={`tel:${PRIMARY_PHONE}`}
                        className="button button-secondary"
                        style={{ minHeight: 46 }}
                      >
                        Call
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* 11. FAQ Section */}
          <AnimatedSection style={s.sectionBand}>
            <div style={s.sectionShell} ref={refs.faq}>
              <span style={s.eyebrow}>FAQ</span>
              <h2 style={s.h2}>Doctor-related questions</h2>

              <div className="grid-3" style={{ marginTop: 22 }}>
                {DOCTOR_FAQ.map((x) => (
                  <article
                    key={x.question}
                    className="hover-card"
                    style={{ ...s.glassCard, padding: 22 }}
                  >
                    <h3 style={{ ...s.h3, marginTop: 0 }}>{x.question}</h3>
                    <p style={{ ...s.p, marginTop: 10 }}>{x.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* 13. Final CTA Section */}
          <AnimatedSection style={{ ...s.sectionBand, marginBottom: "60px" }}>
            <div style={s.sectionShell} ref={refs.cta}>
              <div className="cta-banner">
                <div style={{ maxWidth: "700px" }}>
                  <span style={s.eyebrow}>Final Step</span>
                  <h1 style={{ color: "#fff" }}>
                    Consult with experienced eye specialists today
                  </h1>
                  <p style={s.p}>
                    Book now, chat on WhatsApp, or call for urgent guidance.
                  </p>
                </div>
                <div
                  style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
                  className="cta-actions"
                >
                  <Link className="button button-primary" to="/appointment">
                    Book Now
                  </Link>
                  <Link className="button button-secondary" to="/contact">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </>
      )}
    </main>
  );
}
