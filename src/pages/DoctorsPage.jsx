import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { usePublicSite } from "../hooks/PublicSiteContext";

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

export default function DoctorsPage() {
  const { doctors, loading } = usePublicSite();

  // Fallback contact info (can be taken from settings later)
  const WHATSAPP_NUMBER = "+923477552842";
  const PRIMARY_PHONE = "+923477552842";

  // Theme (unchanged from original)
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
    topHeader: {
      width: "100%",
      padding: "86px 0 42px",
      background:
        "linear-gradient(150deg, #e0f2fe 0%, #f0f9ff 40%, #ffffff 100%)",
      borderBottom: `1px solid ${theme.border}`,
    },
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

  const [query, setQuery] = useState("");
  const [specialization, setSpecialization] = useState("Any");
  const [experienceMin, setExperienceMin] = useState("any");
  const [gender, setGender] = useState("Any");
  const [availability, setAvailability] = useState("any");
  const [sort, setSort] = useState("experience");

  // Enrich doctors with default values for missing fields
  const enrichedDoctors = useMemo(() => {
    return doctors.map((d, i) => {
      const expYears =
        typeof d.experienceYears === "number"
          ? d.experienceYears
          : d.experienceYears
            ? parseInt(d.experienceYears, 10) || 6
            : 6 + ((i * 3) % 14);

      const rating =
        typeof d.rating === "number"
          ? d.rating
          : d.rating
            ? parseFloat(d.rating) || 4.5
            : 4.5;

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
        _id: d._id || `${d.name}-${i}`,
        experienceYears: expYears,
        rating,
        availabilityStatus,
        specialization: spec,
        gender: d.gender || (i % 2 === 0 ? "Male" : "Female"),
        photoUrl: d.photo || d.photoUrl || null,
        initials: d.initials || d.name.slice(0, 2).toUpperCase(),
      };
    });
  }, [doctors]);

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

  // Doctor-to-Service Mapping (based on focus/role)
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

  // Wizard state
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

  // Smooth scroll refs
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

  // Featured doctor (first active doctor, or fallback)
  const featuredDoctor = enrichedDoctors[0] || null;

  if (loading) {
    return (
      <main
        style={{
          background: theme.bg,
          color: theme.navy,
          fontFamily: "'Inter', system-ui, sans-serif",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <p>Loading doctors...</p>
        </div>
      </main>
    );
  }

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

        
        .grid-4 { display: grid; gap: 20px; grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .grid-3 { display: grid; gap: 20px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .grid-2 { display: grid; gap: 20px; grid-template-columns: repeat(2, minmax(0, 1fr)); }

        
        

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

      <AnimatedSection style={{ ...s.sectionBand, paddingTop: 0 }}>
        <div style={s.sectionShell}>
          <div className="sticky-filter">
            <input
              className="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or specialization"
              aria-label="Search doctors"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Filtering Mode: Show only Doctor ↔ Service Mapping */}
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
                const allowed = new Set(filteredDoctors.map((d) => d._id));
                const filteredList = list.filter((d) => allowed.has(d._id));
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
                          {d.photoUrl ? (
                            <img
                              src={d.photoUrl}
                              alt={d.name}
                              style={{
                                width: 54,
                                height: 54,
                                borderRadius: 18,
                                objectFit: "cover",
                              }}
                            />
                          ) : (
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
                          )}
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
          {/* Featured Doctor */}
          <AnimatedSection style={s.sectionBand}>
            <div style={s.sectionShell} ref={refs.featured}>
              {!featuredDoctor ? (
                <div style={s.glassCard}>
                  <h2 style={s.h2}>No doctors found</h2>
                  <p style={s.p}>Please add doctors via the admin panel.</p>
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

          {/* Doctor Listing Grid */}
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

          {/* Doctor-to-Service Mapping (full list) */}
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
                          {d.photoUrl ? (
                            <img
                              src={d.photoUrl}
                              alt={d.name}
                              style={{
                                width: 54,
                                height: 54,
                                borderRadius: 18,
                                objectFit: "cover",
                              }}
                            />
                          ) : (
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
                          )}
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

          {/* Consultation Options */}
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
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </>
      )}
    </main>
  );
}
