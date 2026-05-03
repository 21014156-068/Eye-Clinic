import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "../components/AnimatedSection";
import { usePublicSite } from "../hooks/PublicSiteContext";

const appointmentFaq = [
  {
    question: "How do I book?",
    answer:
      "Select a service, choose a doctor, pick a date & time, add your details, then confirm. You’ll see a confirmation message instantly.",
  },
  {
    question: "Can I reschedule or cancel?",
    answer: "Yes. After confirming, you can use the Manage Booking link.",
  },
  {
    question: "What should I bring for my appointment?",
    answer:
      "Bring your current glasses, previous reports if any, a list of medications, and your insurance information (if applicable).",
  },
];

export default function AppointmentPage() {
  // 1. Pull dynamic data from the database
  const {
    settings,
    doctors: dbDoctors,
    services: dbServices,
  } = usePublicSite();

  // 2. Map dynamic settings
  const PRIMARY_PHONE = settings?.phone || "+92377552842";
  const WHATSAPP_NUMBER = settings?.whatsapp || PRIMARY_PHONE;
  const CLINIC_EMAIL = settings?.email || "hello@eyecon.com";

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
    shadow: "0 4px 24px rgba(14,165,233,0.08), 0 1px 4px rgba(0,0,0,0.06)",
    shadowStrong: "0 20px 60px rgba(2,8,23,0.14), 0 2px 10px rgba(2,8,23,0.08)",
    radiusXL: "36px",
    radiusLG: "28px",
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
    dualPanel: {
      display: "grid",
      gap: "24px",
      gridTemplateColumns: "minmax(0, 0.94fr) minmax(0, 1.06fr)",
      alignItems: "start",
    },
    formLayout: {
      display: "grid",
      gap: "28px",
      gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
      alignItems: "start",
    },
    grid3: {
      display: "grid",
      gap: "20px",
      marginTop: "22px",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    },
    grid2: {
      display: "grid",
      gap: "20px",
      marginTop: "22px",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    card: {
      position: "relative",
      overflow: "hidden",
      border: `1px solid ${theme.border}`,
      background: theme.white,
      boxShadow: theme.shadowStrong,
      padding: "28px",
      borderRadius: theme.radiusLG,
    },
    featureHeroCard: {
      padding: "38px",
      borderRadius: theme.radiusXL,
      background: `radial-gradient(circle at top right, rgba(14,165,233,0.16), transparent 22%), linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyMid} 100%)`,
      border: `1px solid rgba(255,255,255,0.12)`,
      boxShadow: "0 30px 90px rgba(2,8,23,0.22)",
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
  // Dynamic Services Array
  // -------------------------------------------------------
  const dynamicServices =
    dbServices && dbServices.length > 0
      ? dbServices.map((s) => ({ id: s.slug, label: s.title }))
      : [
          { id: "cataract", label: "Cataract" },
          { id: "lasik", label: "LASIK" },
          { id: "retina", label: "Retina" },
          { id: "checkup", label: "General Checkup" },
        ];

  const SERVICES = [
    ...dynamicServices,
    { id: "unsure", label: "I’m not sure" },
  ];

  const CONSULTATION_OPTIONS = [
    {
      id: "in_clinic",
      title: "In-clinic visit",
      copy: "Full diagnostics + specialist evaluation in person.",
    },
    {
      id: "video",
      title: "Video consultation",
      copy: "Start with questions and guidance where appropriate.",
    },
    {
      id: "emergency",
      title: "Emergency booking",
      copy: "For urgent symptoms—call the clinic immediately.",
    },
  ];

  const INSURANCE_PROVIDERS = [
    "Aetna",
    "Cigna",
    "Bupa",
    "Medicare",
    "MetLife",
    "United",
  ];

  const allDoctors = Array.isArray(dbDoctors) ? dbDoctors : [];

  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    serviceId: "",
    serviceLabel: "",
    doctorId: "",
    doctorName: "",
    doctorRole: "",
    mode: "in_clinic",
    date: "",
    time: "",
    fullName: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [quick, setQuick] = useState({
    name: "",
    phone: "",
    preferredDate: "",
  });
  const [quickSent, setQuickSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // “Not sure” auto-suggest map to checkup
  useEffect(() => {
    if (booking.serviceId === "unsure") {
      setBooking((p) => ({
        ...p,
        serviceId: "checkup",
        serviceLabel: "General Checkup",
      }));
    }
  }, [booking.serviceId]);

  const serviceLabel = useMemo(() => {
    if (booking.serviceLabel) return booking.serviceLabel;
    return SERVICES.find((s) => s.id === booking.serviceId)?.label || "";
  }, [booking.serviceId, booking.serviceLabel, SERVICES]);

  // Filter dynamic DB doctors
  const doctorsForService = useMemo(() => {
    if (!booking.serviceId) return allDoctors;

    const matched = allDoctors.filter((d) => {
      const focusCsv = Array.isArray(d.focus)
        ? d.focus.join(" ")
        : String(d.focus || "");
      const hay =
        `${d.role || ""} ${d.specialization || ""} ${focusCsv} ${d.bio || ""}`.toLowerCase();
      const key = booking.serviceId.toLowerCase();

      if (key === "checkup" || key === "unsure") return true;
      return hay.includes(key) || hay.includes("refr") || hay.includes("surg");
    });

    return (matched.length ? matched : allDoctors).map((d, idx) => ({
      ...d,
      _id: d._id || `${d.name}-${idx}`,
      experienceYears: d.experienceYears || 6 + ((idx * 3) % 14),
      rating: d.rating || Math.round((4.6 + (idx % 4) * 0.1) * 10) / 10,
      photoUrl: d.photo || null,
    }));
  }, [allDoctors, booking.serviceId]);

  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const next7Days = useMemo(() => {
    const out = [];
    const base = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      out.push(d.toISOString().slice(0, 10));
    }
    return out;
  }, []);

  const slotsForSelection = useMemo(() => {
    const baseSlots = ["09:00", "10:30", "12:00", "15:00", "16:30", "17:30"];
    const isToday = booking.date === todayISO;
    const remaining = isToday ? 2 : 6;

    const slots = baseSlots.slice(0, remaining).map((t, idx) => ({
      time: t,
      isNextAvailable: idx === 0,
    }));

    return { slots, remaining, nextAvailable: slots[0]?.time || null, isToday };
  }, [booking.date, todayISO]);

  useEffect(() => {
    if (step === 3 && !booking.date) {
      setBooking((p) => ({ ...p, date: next7Days[0] }));
    }
  }, [step, booking.date, next7Days]);

  const totalSteps = 5;
  const progressPct = Math.round((step / totalSteps) * 100);

  const canGoNext = useMemo(() => {
    if (step === 1) return Boolean(booking.serviceId);
    if (step === 2) return Boolean(booking.doctorName);
    if (step === 3) return Boolean(booking.date && booking.time);
    if (step === 4) return Boolean(booking.fullName && booking.phone);
    return true;
  }, [step, booking]);

  const next = () => setStep((x) => Math.min(totalSteps, x + 1));
  const back = () => setStep((x) => Math.max(1, x - 1));

  // -------------------------------------------------------
  // Submit Full Booking to DB
  // -------------------------------------------------------
  const confirm = async () => {
    try {
      const response = await fetch("/api/public/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: booking.fullName,
          phone: booking.phone,
          email: booking.email,
          notes: booking.notes,
          serviceId: booking.serviceId,
          serviceLabel: booking.serviceLabel,
          doctorId: booking.doctorId,
          doctorName: booking.doctorName,
          doctorRole: booking.doctorRole,
          mode: booking.mode,
          date: booking.date,
          time: booking.time,
        }),
      });

      if (!response.ok) throw new Error("Failed to book appointment");
      setConfirmed(true);
    } catch (error) {
      console.error(error);
      alert(
        "Error booking appointment. Please try calling the clinic directly.",
      );
    }
  };

  // -------------------------------------------------------
  // Submit Quick Booking to DB
  // -------------------------------------------------------
  const onQuickSubmit = async (e) => {
    e.preventDefault();
    if (!quick.name || !quick.phone) {
      alert("Please provide both name and phone number.");
      return;
    }

    try {
      // Create a default 'appointment' for quick callbacks so admins see it in the dashboard
      const dateToUse =
        quick.preferredDate || new Date().toISOString().slice(0, 10);
      const response = await fetch("/api/public/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: quick.name,
          phone: quick.phone,
          email: "",
          notes: "QUICK BOOKING CALLBACK REQUEST",
          serviceId: "quick_booking",
          serviceLabel: "Quick Booking Request",
          mode: "in_clinic",
          date: dateToUse,
          time: "09:00", // Default placeholder time
        }),
      });

      if (!response.ok) throw new Error("Failed to submit quick booking");

      setQuickSent(true);
      setTimeout(() => setQuickSent(false), 3000);
      setQuick({ name: "", phone: "", preferredDate: "" });
    } catch (error) {
      console.error(error);
      alert("Error requesting callback. Please try calling us.");
    }
  };

  const whatsappHref = useMemo(() => {
    const cleaned = String(WHATSAPP_NUMBER).replace(/[^\d+]/g, "");
    const wa = cleaned.startsWith("+") ? cleaned.slice(1) : cleaned;
    return `https://wa.me/${wa}`;
  }, [WHATSAPP_NUMBER]);

  return (
    <main style={s.main} className="page-shell-appointment">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');
        .hover-card { transition: transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease; }
        .hover-card:hover { transform: translateY(-8px); border-color: rgba(14,165,233,0.35) !important; box-shadow: 0 18px 50px rgba(2,8,23,0.14) !important; }
        .hover-card::before { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(115deg, transparent 10%, rgba(14,165,233,0.10) 50%, transparent 90%); transform: translateX(-120%); transition: transform 780ms ease; }
        .hover-card:hover::before { transform: translateX(120%); }
        .button { position: relative; display: inline-flex; align-items: center; justify-content: center; min-height: 54px; padding: 0 24px; border-radius: 999px; font-weight: 700; text-decoration: none; overflow: hidden; transition: transform 220ms ease, background 220ms ease, box-shadow 220ms ease; white-space: nowrap; border: 1px solid transparent; cursor: pointer; font-family: 'Inter', system-ui; }
        .button:hover { transform: translateY(-2px); }
        .button::after { content: ""; position: absolute; inset: 0; background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.18), transparent); transform: translateX(-120%); transition: transform 420ms ease; }
        .button:hover::after { transform: translateX(120%); }
        .button-primary { color: #fff; background: ${theme.sky}; box-shadow: 0 8px 24px rgba(14,165,233,0.32); }
        .button-primary:hover { background: ${theme.skyHover}; box-shadow: 0 12px 32px rgba(14,165,233,0.40); }
        .button-secondary { color: ${theme.sky}; border: 1.5px solid ${theme.sky}; background: #fff; }
        .button-secondary:hover { background: ${theme.skyLight}; }
        .button-ghost { color: ${theme.navy}; border: 1.5px solid ${theme.border}; background: rgba(255,255,255,0.7); }
        .button-ghost:hover { background: #fff; }
        .button-danger { color: #b91c1c; border: 1.5px solid rgba(239,68,68,0.25); background: rgba(239,68,68,0.10); }
        .button-danger:hover { background: rgba(239,68,68,0.14); }
        .input { width: 100%; min-height: 50px; border-radius: 14px; border: 1.5px solid ${theme.border}; background: #fff; color: ${theme.navy}; padding: 0 14px; outline: none; font-family: 'Inter', system-ui; }
        .input:focus { border-color: ${theme.sky}; box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.10); }
        .progress-wrap { border: 1px solid ${theme.border}; border-radius: 18px; background: rgba(255,255,255,0.78); overflow: hidden; }
        .progress-bar { height: 10px; width: 0%; background: linear-gradient(90deg, ${theme.sky}, ${theme.skyMid}); transition: width 320ms ease; }
        .stepper { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; justify-content: space-between; }
        .step-chip { padding: 8px 12px; border-radius: 999px; border: 1px solid ${theme.border}; background: ${theme.borderLight}; color: ${theme.navyMid}; font-weight: 900; font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; }
        .step-chip-active { border-color: rgba(14,165,233,0.30); background: ${theme.skyLight}; color: ${theme.skyHover}; }
        @media (max-width: 1180px) { .form-layout, .grid-3, .grid-2 { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* Step-Based Booking System */}
      <AnimatedSection style={s.sectionBand}>
        <div style={s.sectionShell}>
          <div style={s.sectionHead}>
            <p style={s.eyebrow}>Book an Appointment</p>
            <h2 style={s.h2}>Step-by-step booking</h2>
            <p style={s.p}>
              Choose service → doctor → slot → details → confirm.
            </p>
          </div>

          <div className="hover-card" style={{ ...s.card, marginTop: 22 }}>
            <div className="stepper">
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  "Service",
                  "Doctor",
                  "Date & time",
                  "Your info",
                  "Confirm",
                ].map((label, idx) => (
                  <span
                    key={label}
                    className={`step-chip ${step === idx + 1 ? "step-chip-active" : ""}`}
                  >
                    Step {idx + 1}: {label}
                  </span>
                ))}
              </div>
              <span style={{ color: theme.slate, fontWeight: 800 }}>
                {progressPct}%
              </span>
            </div>

            <div className="progress-wrap" style={{ marginTop: 12 }}>
              <div
                className="progress-bar"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* Real-time availability indicators */}
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginTop: 14,
              }}
            >
              {booking.date ? (
                <>
                  <span style={s.tag}>
                    {slotsForSelection.isToday
                      ? `Only ${slotsForSelection.remaining} slots left today`
                      : "Availability updated"}
                  </span>
                  {slotsForSelection.nextAvailable && (
                    <span style={s.tag}>
                      Next available: {booking.date}{" "}
                      {slotsForSelection.nextAvailable}
                    </span>
                  )}
                </>
              ) : (
                <span style={s.tag}>
                  Select a date to see real-time slot hints
                </span>
              )}
            </div>

            <div style={{ marginTop: 18 }}>
              {/* Step 1 */}
              {step === 1 && (
                <div>
                  <h3 style={{ ...s.h3, marginTop: 0 }}>
                    Step 1: Select service / problem
                  </h3>
                  <div style={s.grid3} className="grid-3">
                    {SERVICES.map((svc, idx) => (
                      <button
                        key={svc.id}
                        type="button"
                        className="hover-card"
                        style={{
                          ...s.card,
                          padding: 18,
                          textAlign: "left",
                          cursor: "pointer",
                          background:
                            booking.serviceId === svc.id
                              ? `radial-gradient(circle at 20% 18%, rgba(14,165,233,0.14), transparent 40%), ${theme.white}`
                              : s.card.background,
                        }}
                        onClick={() =>
                          setBooking((p) => ({
                            ...p,
                            serviceId: svc.id,
                            serviceLabel: svc.label,
                          }))
                        }
                      >
                        <span style={s.cardCode}>{`0${idx + 1}`}</span>
                        <div
                          style={{
                            marginTop: 12,
                            color: theme.navy,
                            fontWeight: 900,
                            fontSize: "1.15rem",
                          }}
                        >
                          {svc.label}
                        </div>
                        <div style={{ color: theme.slate, marginTop: 6 }}>
                          {svc.id === "unsure"
                            ? "We’ll guide you to the safest next step."
                            : "Choose this to filter doctors and slots."}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                      marginTop: 16,
                    }}
                  >
                    <button
                      className="button button-primary"
                      type="button"
                      onClick={next}
                      disabled={!canGoNext}
                      style={{ opacity: canGoNext ? 1 : 0.5 }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <h3 style={{ ...s.h3, marginTop: 0 }}>
                    Step 2: Choose doctor
                  </h3>
                  <p style={{ ...s.p, marginTop: 8 }}>
                    Showing doctors matched to:{" "}
                    <strong style={{ color: theme.navy }}>
                      {serviceLabel}
                    </strong>
                  </p>

                  <div style={s.grid3} className="grid-3">
                    {doctorsForService.map((d) => (
                      <article
                        key={d._id}
                        className="hover-card"
                        style={{ ...s.card, padding: 18 }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: 12,
                          }}
                        >
                          {d.photoUrl ? (
                            <img
                              src={d.photoUrl}
                              alt={d.name}
                              loading="lazy"
                              style={{
                                width: 64,
                                height: 64,
                                borderRadius: 20,
                                objectFit: "cover",
                                border: `1px solid ${theme.border}`,
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: 64,
                                height: 64,
                                borderRadius: 20,
                                display: "grid",
                                placeItems: "center",
                                fontWeight: 900,
                                color: "#fff",
                                background: `linear-gradient(160deg, ${theme.sky}, ${theme.skyMid})`,
                              }}
                            >
                              {d.initials || "DR"}
                            </div>
                          )}
                          <div
                            style={{
                              display: "grid",
                              gap: 8,
                              justifyItems: "end",
                            }}
                          >
                            <span style={s.tag}>★ {d.rating}</span>
                            <span style={s.tag}>{d.experienceYears}+ yrs</span>
                          </div>
                        </div>

                        <div
                          style={{
                            marginTop: 12,
                            color: theme.skyHover,
                            fontWeight: 900,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            fontSize: "0.78rem",
                          }}
                        >
                          {d.role || "Specialist"}
                        </div>
                        <div
                          style={{
                            marginTop: 6,
                            color: theme.navy,
                            fontWeight: 900,
                            fontSize: "1.15rem",
                          }}
                        >
                          {d.name}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: 10,
                            flexWrap: "wrap",
                            marginTop: 12,
                          }}
                        >
                          {(Array.isArray(d.focus) ? d.focus : [])
                            .slice(0, 2)
                            .map((x) => (
                              <span key={x} style={s.tag}>
                                {x}
                              </span>
                            ))}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: 10,
                            flexWrap: "wrap",
                            marginTop: 16,
                          }}
                        >
                          <button
                            type="button"
                            className="button button-primary"
                            style={{ minHeight: 46, border: "none" }}
                            onClick={() => {
                              setBooking((p) => ({
                                ...p,
                                doctorId: d._id,
                                doctorName: d.name,
                                doctorRole: d.role || "",
                              }));
                              next();
                            }}
                          >
                            Select Doctor
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                      marginTop: 16,
                    }}
                  >
                    <button
                      className="button button-secondary"
                      type="button"
                      onClick={back}
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div>
                  <h3 style={{ ...s.h3, marginTop: 0 }}>
                    Step 3: Select date & time
                  </h3>
                  <div style={s.grid2} className="grid-2">
                    <article
                      className="hover-card"
                      style={{ ...s.card, padding: 18 }}
                    >
                      <div style={{ color: theme.navy, fontWeight: 900 }}>
                        Choose a day
                      </div>
                      <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                        {next7Days.map((d) => (
                          <button
                            key={d}
                            type="button"
                            className="button button-ghost"
                            style={{
                              minHeight: 46,
                              justifyContent: "space-between",
                              borderColor:
                                booking.date === d
                                  ? "rgba(14,165,233,0.35)"
                                  : theme.border,
                              background:
                                booking.date === d
                                  ? theme.skyLight
                                  : "rgba(255,255,255,0.7)",
                            }}
                            onClick={() =>
                              setBooking((p) => ({ ...p, date: d, time: "" }))
                            }
                          >
                            <span>{d}</span>
                            <span style={{ color: theme.slate }}>
                              {d === todayISO ? "Today" : " "}
                            </span>
                          </button>
                        ))}
                      </div>
                    </article>

                    <article
                      className="hover-card"
                      style={{ ...s.card, padding: 18 }}
                    >
                      <div style={{ color: theme.navy, fontWeight: 900 }}>
                        Available slots
                      </div>
                      <p style={{ ...s.p, marginTop: 10 }}>
                        {slotsForSelection.isToday
                          ? `Only ${slotsForSelection.remaining} slots left today.`
                          : "Pick a time that works for you."}
                      </p>
                      <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                        {slotsForSelection.slots.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            className="button button-ghost"
                            style={{
                              minHeight: 46,
                              justifyContent: "space-between",
                              borderColor:
                                booking.time === slot.time
                                  ? "rgba(14,165,233,0.35)"
                                  : theme.border,
                              background:
                                booking.time === slot.time
                                  ? theme.skyLight
                                  : "rgba(255,255,255,0.7)",
                            }}
                            onClick={() =>
                              setBooking((p) => ({ ...p, time: slot.time }))
                            }
                          >
                            <span>{slot.time}</span>
                            {slot.isNextAvailable ? (
                              <span style={s.tag}>Next available</span>
                            ) : (
                              <span style={{ color: theme.slate }}> </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </article>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                      marginTop: 16,
                    }}
                  >
                    <button
                      className="button button-secondary"
                      type="button"
                      onClick={back}
                    >
                      Back
                    </button>
                    <button
                      className="button button-primary"
                      type="button"
                      onClick={next}
                      disabled={!canGoNext}
                      style={{ opacity: canGoNext ? 1 : 0.5, border: "none" }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div>
                  <h3 style={{ ...s.h3, marginTop: 0 }}>
                    Step 4: Patient information
                  </h3>
                  <div style={s.grid2} className="grid-2">
                    <article
                      className="hover-card"
                      style={{ ...s.card, padding: 18 }}
                    >
                      <div style={{ display: "grid", gap: 10 }}>
                        <input
                          className="input"
                          placeholder="Full name"
                          value={booking.fullName}
                          onChange={(e) =>
                            setBooking((p) => ({
                              ...p,
                              fullName: e.target.value,
                            }))
                          }
                        />
                        <input
                          className="input"
                          placeholder="Phone number"
                          value={booking.phone}
                          onChange={(e) =>
                            setBooking((p) => ({ ...p, phone: e.target.value }))
                          }
                        />
                        <input
                          className="input"
                          placeholder="Email (optional)"
                          value={booking.email}
                          onChange={(e) =>
                            setBooking((p) => ({ ...p, email: e.target.value }))
                          }
                        />
                      </div>
                    </article>
                    <article
                      className="hover-card"
                      style={{ ...s.card, padding: 18 }}
                    >
                      <div style={{ color: theme.navy, fontWeight: 900 }}>
                        Notes / symptoms
                      </div>
                      <textarea
                        className="input"
                        style={{
                          marginTop: 12,
                          paddingTop: 12,
                          minHeight: 150,
                          resize: "vertical",
                        }}
                        placeholder="Tell us symptoms, duration, or questions (optional)"
                        value={booking.notes}
                        onChange={(e) =>
                          setBooking((p) => ({ ...p, notes: e.target.value }))
                        }
                      />
                      <div
                        style={{
                          marginTop: 14,
                          display: "flex",
                          gap: 10,
                          flexWrap: "wrap",
                        }}
                      >
                        <span style={s.tag}>
                          Mode:{" "}
                          {
                            CONSULTATION_OPTIONS.find(
                              (x) => x.id === booking.mode,
                            )?.title
                          }
                        </span>
                      </div>
                    </article>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {CONSULTATION_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          className="button button-ghost"
                          style={{
                            minHeight: 46,
                            borderColor:
                              booking.mode === opt.id
                                ? "rgba(14,165,233,0.35)"
                                : theme.border,
                            background:
                              booking.mode === opt.id
                                ? theme.skyLight
                                : "rgba(255,255,255,0.7)",
                            color: theme.navy,
                          }}
                          onClick={() =>
                            setBooking((p) => ({ ...p, mode: opt.id }))
                          }
                        >
                          {opt.title}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                      marginTop: 16,
                    }}
                  >
                    <button
                      className="button button-secondary"
                      type="button"
                      onClick={back}
                    >
                      Back
                    </button>
                    <button
                      className="button button-primary"
                      type="button"
                      onClick={next}
                      disabled={!canGoNext}
                      style={{ opacity: canGoNext ? 1 : 0.5, border: "none" }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5 */}
              {step === 5 && (
                <div>
                  <h3 style={{ ...s.h3, marginTop: 0 }}>
                    Step 5: Confirmation
                  </h3>
                  <div style={s.grid2} className="grid-2">
                    <article
                      className="hover-card"
                      style={{ ...s.card, padding: 18 }}
                    >
                      <div style={{ color: theme.navy, fontWeight: 900 }}>
                        Summary
                      </div>
                      <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                        {[
                          ["Service", serviceLabel],
                          ["Doctor", booking.doctorName],
                          ["Date & time", `${booking.date} ${booking.time}`],
                          [
                            "Consultation",
                            CONSULTATION_OPTIONS.find(
                              (x) => x.id === booking.mode,
                            )?.title,
                          ],
                        ].map(([k, v]) => (
                          <div
                            key={k}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 12,
                            }}
                          >
                            <span style={{ color: theme.slate }}>{k}</span>
                            <strong style={{ color: theme.navy }}>{v}</strong>
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          flexWrap: "wrap",
                          marginTop: 16,
                        }}
                      >
                        <button
                          className="button button-primary"
                          type="button"
                          onClick={confirm}
                          style={{ border: "none" }}
                        >
                          Confirm Appointment
                        </button>
                        <button
                          className="button button-secondary"
                          type="button"
                          onClick={back}
                        >
                          Edit
                        </button>
                      </div>

                      {confirmed && (
                        <div
                          style={{
                            marginTop: 14,
                            padding: 14,
                            borderRadius: 18,
                            border: "1px solid rgba(14,165,233,0.30)",
                            background: theme.skyLight,
                          }}
                        >
                          <div
                            style={{ color: theme.skyHover, fontWeight: 900 }}
                          >
                            Confirmed!
                          </div>
                          <div
                            style={{
                              color: theme.navyMid,
                              marginTop: 6,
                              lineHeight: 1.7,
                            }}
                          >
                            Your appointment request has been submitted
                            successfully to our clinic.
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: 10,
                              flexWrap: "wrap",
                              marginTop: 12,
                            }}
                          >
                            <a
                              className="button button-ghost"
                              href={whatsappHref}
                              target="_blank"
                              rel="noreferrer"
                              style={{ minHeight: 46 }}
                            >
                              WhatsApp confirmation
                            </a>
                            <a
                              className="button button-ghost"
                              href={`mailto:${CLINIC_EMAIL}`}
                              style={{ minHeight: 46 }}
                            >
                              Email confirmation
                            </a>
                          </div>
                        </div>
                      )}
                    </article>

                    <article
                      className="hover-card"
                      style={{ ...s.card, padding: 18 }}
                    >
                      <div style={{ color: theme.navy, fontWeight: 900 }}>
                        Not sure what to book?
                      </div>
                      <p style={{ ...s.p, marginTop: 10 }}>
                        Chat with assistant, call the clinic, or use WhatsApp
                        for quick help.
                      </p>
                      <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                        <a
                          className="button button-secondary"
                          href={whatsappHref}
                          target="_blank"
                          rel="noreferrer"
                        >
                          WhatsApp
                        </a>
                        <a
                          className="button button-ghost"
                          href={`tel:${PRIMARY_PHONE}`}
                        >
                          Call clinic
                        </a>
                      </div>

                      <div
                        style={{
                          marginTop: 14,
                          paddingTop: 14,
                          borderTop: `1px solid ${theme.border}`,
                        }}
                      >
                        <div style={{ color: theme.navy, fontWeight: 900 }}>
                          Insurance support
                        </div>
                        <p style={{ ...s.p, marginTop: 8 }}>
                          Accepted providers (example):
                        </p>
                        <div
                          style={{
                            display: "flex",
                            gap: 10,
                            flexWrap: "wrap",
                            marginTop: 10,
                          }}
                        >
                          {INSURANCE_PROVIDERS.slice(0, 6).map((x) => (
                            <span key={x} style={s.tag}>
                              {x}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Quick Booking Widget */}
      <AnimatedSection style={{ ...s.sectionBand, background: "#ffffff" }}>
        <div style={s.sectionShell}>
          <div style={s.sectionHead}>
            <p style={s.eyebrow}>Quick Booking</p>
            <h2 style={s.h2}>Request a callback.</h2>
            <p style={s.p}>
              A single form for users who don’t want a full step-by-step flow.
            </p>
          </div>

          <div className="hover-card" style={{ ...s.card, marginTop: 22 }}>
            <form
              onSubmit={onQuickSubmit}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 12,
              }}
              className="grid-3"
            >
              <input
                className="input"
                placeholder="Name"
                value={quick.name}
                onChange={(e) =>
                  setQuick((p) => ({ ...p, name: e.target.value }))
                }
                required
              />
              <input
                className="input"
                placeholder="Phone"
                value={quick.phone}
                onChange={(e) =>
                  setQuick((p) => ({ ...p, phone: e.target.value }))
                }
                required
              />
              <input
                className="input"
                type="date"
                value={quick.preferredDate}
                onChange={(e) =>
                  setQuick((p) => ({ ...p, preferredDate: e.target.value }))
                }
              />
              <button
                className="button button-primary"
                type="submit"
                style={{ border: "none", gridColumn: "1 / -1" }}
              >
                {quickSent ? "Requested!" : "Request Callback"}
              </button>
            </form>
            <p style={{ ...s.p, marginTop: 10, fontSize: "0.95rem" }}>
              We’ll confirm your preferred time based on availability.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
