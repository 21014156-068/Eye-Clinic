import { startTransition, useEffect, useMemo, useState } from "react";
import { useAdminAuth } from "../admin/AdminAuthContext";
import { usePublicSite } from "../hooks/PublicSiteContext";

// ----------------------------------------------------------------------
// Constants & helpers (unchanged logic)
// ----------------------------------------------------------------------
const sections = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "appointments", label: "Appointments", icon: "📅" },
  { id: "messages", label: "Messages", icon: "💬" },
  { id: "doctors", label: "Doctors", icon: "👨‍⚕️" },
  { id: "services", label: "Services", icon: "⚙️" },
  { id: "insights", label: "Insights", icon: "📝" },
  { id: "settings", label: "Settings", icon: "🔧" },
];

const emptyDoctor = {
  _id: "",
  active: true,
  bio: "",
  displayOrder: 0,
  education: "",
  experience: "",
  featured: false,
  focus: "",
  initials: "",
  name: "",
  role: "",
  schedule: "",
  slug: "",
};

const emptyService = {
  _id: "",
  accent: "#83efe7",
  active: true,
  description: "",
  displayOrder: 0,
  featured: false,
  slug: "",
  subtitle: "",
  title: "",
  treatments: "",
};

const emptyInsight = {
  _id: "",
  category: "",
  content: "",
  displayOrder: 0,
  excerpt: "",
  featured: false,
  slug: "",
  status: "published",
  title: "",
};

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const toCsv = (value) =>
  Array.isArray(value) ? value.join(", ") : value || "";

const normalizeDoctor = (doctor) => ({
  ...emptyDoctor,
  ...doctor,
  focus: toCsv(doctor.focus),
});
const normalizeService = (service) => ({
  ...emptyService,
  ...service,
  treatments: toCsv(service.treatments),
});
const normalizeInsight = (insight) => ({
  ...emptyInsight,
  ...insight,
});

// ----------------------------------------------------------------------
// Sub‑components (unchanged logic, restyled via CSS classes)
// ----------------------------------------------------------------------
function StatusPill({ status }) {
  const label = String(status || "new");
  return <span className={`admin-status admin-status-${label}`}>{label}</span>;
}

function DashboardCard({ label, value, meta }) {
  return (
    <article className="admin-stat-card">
      <div className="admin-stat-top">
        <p className="admin-stat-label">{label}</p>
        {meta ? <span className="admin-stat-meta">{meta}</span> : null}
      </div>
      <strong className="admin-stat-value">{value}</strong>
      <div className="admin-stat-spark" aria-hidden="true" />
    </article>
  );
}

function EmptyState({ title, copy }) {
  return (
    <div className="admin-empty">
      <h3>{title}</h3>
      <p>{copy}</p>
    </div>
  );
}

// ----------------------------------------------------------------------
// Main Admin Panel
// ----------------------------------------------------------------------
export default function AdminPanelPage() {
  const { admin, apiFetch, logout } = useAdminAuth();
  const { refreshPublicSite } = usePublicSite();

  // State (identical to previous logic)
  const [activeSection, setActiveSection] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  const [dashboard, setDashboard] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [insights, setInsights] = useState([]);
  const [settings, setSettings] = useState(null);

  const [doctorForm, setDoctorForm] = useState(emptyDoctor);
  const [serviceForm, setServiceForm] = useState(emptyService);
  const [insightForm, setInsightForm] = useState(emptyInsight);

  const [quickFilter, setQuickFilter] = useState("");
  const normalizedQuickFilter = quickFilter.trim().toLowerCase();

  // Sidebar collapse for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const settingsForm = useMemo(
    () =>
      settings || {
        _id: "",
        aboutHeadline: "",
        aboutSummary: "",
        brandName: "",
        email: "",
        hours: "",
        location: "",
        phone: "",
        signature: "",
        tagline: "",
        whatsapp: "",
      },
    [settings],
  );

  // --------------------------------------------------------------------
  // Data fetching & CRUD (all functions remain exactly as before)
  // --------------------------------------------------------------------
  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [
        dashboardPayload,
        appointmentsPayload,
        messagesPayload,
        doctorsPayload,
        servicesPayload,
        insightsPayload,
        settingsPayload,
      ] = await Promise.all([
        apiFetch("/api/admin/dashboard"),
        apiFetch("/api/admin/appointments"),
        apiFetch("/api/admin/messages"),
        apiFetch("/api/admin/doctors"),
        apiFetch("/api/admin/services"),
        apiFetch("/api/admin/insights"),
        apiFetch("/api/admin/settings"),
      ]);

      setDashboard(dashboardPayload.data);
      setAppointments(appointmentsPayload.data);
      setMessages(messagesPayload.data);
      setDoctors(doctorsPayload.data);
      setServices(servicesPayload.data);
      setInsights(insightsPayload.data);
      setSettings(settingsPayload.data);

      setDoctorForm((current) =>
        current._id
          ? current
          : normalizeDoctor(doctorsPayload.data[0] || emptyDoctor),
      );
      setServiceForm((current) =>
        current._id
          ? current
          : normalizeService(servicesPayload.data[0] || emptyService),
      );
      setInsightForm((current) =>
        current._id
          ? current
          : normalizeInsight(insightsPayload.data[0] || emptyInsight),
      );

      setFeedback("");
    } catch (requestError) {
      setFeedback(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Appointment / Message save (unchanged)
  const saveAppointment = async (appointment) => {
    const payload = await apiFetch(
      `/api/admin/appointments/${appointment._id}`,
      {
        body: JSON.stringify({
          adminNotes: appointment.adminNotes,
          status: appointment.status,
        }),
        method: "PATCH",
      },
    );
    setAppointments((current) =>
      current.map((item) =>
        item._id === appointment._id ? payload.data : item,
      ),
    );
    setFeedback(payload.message);
    await loadAdminData();
  };

  const saveMessage = async (message) => {
    const payload = await apiFetch(`/api/admin/messages/${message._id}`, {
      body: JSON.stringify({ status: message.status }),
      method: "PATCH",
    });
    setMessages((current) =>
      current.map((item) => (item._id === message._id ? payload.data : item)),
    );
    setFeedback(payload.message);
    await loadAdminData();
  };

  // Doctor CRUD
  const saveDoctor = async (event) => {
    event.preventDefault();
    const payload = await apiFetch(
      doctorForm._id
        ? `/api/admin/doctors/${doctorForm._id}`
        : "/api/admin/doctors",
      {
        body: JSON.stringify({
          ...doctorForm,
          slug: doctorForm.slug || slugify(doctorForm.name),
        }),
        method: doctorForm._id ? "PUT" : "POST",
      },
    );
    startTransition(() => setDoctorForm(emptyDoctor));
    setFeedback(payload.message);
    await loadAdminData();
    await refreshPublicSite();
  };

  const deleteDoctor = async (id) => {
    await apiFetch(`/api/admin/doctors/${id}`, { method: "DELETE" });
    setDoctorForm(emptyDoctor);
    setFeedback("Doctor deleted successfully.");
    await loadAdminData();
    await refreshPublicSite();
  };

  // Service CRUD
  const saveService = async (event) => {
    event.preventDefault();
    const payload = await apiFetch(
      serviceForm._id
        ? `/api/admin/services/${serviceForm._id}`
        : "/api/admin/services",
      {
        body: JSON.stringify({
          ...serviceForm,
          slug: serviceForm.slug || slugify(serviceForm.title),
        }),
        method: serviceForm._id ? "PUT" : "POST",
      },
    );
    startTransition(() => setServiceForm(emptyService));
    setFeedback(payload.message);
    await loadAdminData();
    await refreshPublicSite();
  };

  const deleteService = async (id) => {
    await apiFetch(`/api/admin/services/${id}`, { method: "DELETE" });
    setServiceForm(emptyService);
    setFeedback("Service deleted successfully.");
    await loadAdminData();
    await refreshPublicSite();
  };

  // Insight CRUD
  const saveInsight = async (event) => {
    event.preventDefault();
    const payload = await apiFetch(
      insightForm._id
        ? `/api/admin/insights/${insightForm._id}`
        : "/api/admin/insights",
      {
        body: JSON.stringify({
          ...insightForm,
          slug: insightForm.slug || slugify(insightForm.title),
        }),
        method: insightForm._id ? "PUT" : "POST",
      },
    );
    startTransition(() => setInsightForm(emptyInsight));
    setFeedback(payload.message);
    await loadAdminData();
    await refreshPublicSite();
  };

  const deleteInsight = async (id) => {
    await apiFetch(`/api/admin/insights/${id}`, { method: "DELETE" });
    setInsightForm(emptyInsight);
    setFeedback("Insight deleted successfully.");
    await loadAdminData();
    await refreshPublicSite();
  };

  // Settings save
  const saveSettings = async (event) => {
    event.preventDefault();
    const payload = await apiFetch(`/api/admin/settings/${settingsForm._id}`, {
      body: JSON.stringify(settingsForm),
      method: "PUT",
    });
    setSettings(payload.data);
    setFeedback(payload.message);
    await refreshPublicSite();
  };

  // Filtered lists (preserves original functionality)
  const filteredAppointments = useMemo(() => {
    if (!normalizedQuickFilter) return appointments;
    return appointments.filter((a) =>
      `${a.name} ${a.email} ${a.phone} ${a.service} ${a.status}`
        .toLowerCase()
        .includes(normalizedQuickFilter),
    );
  }, [appointments, normalizedQuickFilter]);

  const filteredMessages = useMemo(() => {
    if (!normalizedQuickFilter) return messages;
    return messages.filter((m) =>
      `${m.name} ${m.email || ""} ${m.phone || ""} ${m.contactMethod} ${m.status}`
        .toLowerCase()
        .includes(normalizedQuickFilter),
    );
  }, [messages, normalizedQuickFilter]);

  const filteredDoctors = useMemo(() => {
    if (!normalizedQuickFilter) return doctors;
    return doctors.filter((d) =>
      `${d.name} ${d.role} ${Array.isArray(d.focus) ? d.focus.join(" ") : d.focus || ""}`
        .toLowerCase()
        .includes(normalizedQuickFilter),
    );
  }, [doctors, normalizedQuickFilter]);

  const filteredServices = useMemo(() => {
    if (!normalizedQuickFilter) return services;
    return services.filter((s) =>
      `${s.title} ${s.subtitle} ${Array.isArray(s.treatments) ? s.treatments.join(" ") : s.treatments || ""}`
        .toLowerCase()
        .includes(normalizedQuickFilter),
    );
  }, [services, normalizedQuickFilter]);

  const filteredInsights = useMemo(() => {
    if (!normalizedQuickFilter) return insights;
    return insights.filter((i) =>
      `${i.title} ${i.category} ${i.status}`
        .toLowerCase()
        .includes(normalizedQuickFilter),
    );
  }, [insights, normalizedQuickFilter]);

  // --------------------------------------------------------------------
  // Section renderers (logic unchanged, wrapped in cleaner layout)
  // --------------------------------------------------------------------
  const renderDashboard = () => (
    <div className="admin-section-body">
      <div className="admin-stat-grid">
        <DashboardCard
          label="Appointments"
          value={dashboard?.stats?.appointmentsCount || 0}
          meta="Intake"
        />
        <DashboardCard
          label="Messages"
          value={dashboard?.stats?.messagesCount || 0}
          meta="Inbox"
        />
        <DashboardCard
          label="Doctors"
          value={dashboard?.stats?.doctorsCount || 0}
          meta="Profiles"
        />
        <DashboardCard
          label="Services"
          value={dashboard?.stats?.servicesCount || 0}
          meta="Catalog"
        />
        <DashboardCard
          label="Insights"
          value={dashboard?.stats?.insightsCount || 0}
          meta="Content"
        />
      </div>

      <div className="admin-two-column">
        <div className="admin-panel-card">
          <div className="admin-panel-head">
            <h3>Recent appointments</h3>
            <span className="admin-panel-sub">Last activity snapshot</span>
          </div>
          {dashboard?.recentAppointments?.length ? (
            dashboard.recentAppointments.map((item) => (
              <article className="admin-list-row" key={item._id}>
                <div className="admin-list-left">
                  <strong>{item.name}</strong>
                  <p>{item.service}</p>
                </div>
                <StatusPill status={item.status} />
              </article>
            ))
          ) : (
            <EmptyState
              title="No appointments yet"
              copy="New bookings will appear here as soon as patients submit them."
            />
          )}
        </div>

        <div className="admin-panel-card">
          <div className="admin-panel-head">
            <h3>Recent messages</h3>
            <span className="admin-panel-sub">Inbound support requests</span>
          </div>
          {dashboard?.recentMessages?.length ? (
            dashboard.recentMessages.map((item) => (
              <article className="admin-list-row" key={item._id}>
                <div className="admin-list-left">
                  <strong>{item.name}</strong>
                  <p>{item.contactMethod}</p>
                </div>
                <StatusPill status={item.status} />
              </article>
            ))
          ) : (
            <EmptyState
              title="Inbox is quiet"
              copy="Patient messages will show up here with status and quick actions."
            />
          )}
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="admin-section-body">
      {!filteredAppointments.length ? (
        <EmptyState
          title="No matching appointments"
          copy="Try a different search keyword in the top bar."
        />
      ) : (
        filteredAppointments.map((appointment) => (
          <article className="admin-record-card" key={appointment._id}>
            <div className="admin-record-head">
              <div className="admin-record-ident">
                <div className="admin-avatar" aria-hidden="true">
                  {String(appointment.name || "P")
                    .trim()
                    .slice(0, 1)
                    .toUpperCase()}
                </div>
                <div>
                  <h3>{appointment.name}</h3>
                  <p className="admin-muted">
                    {appointment.email} · {appointment.phone}
                  </p>
                  <p className="admin-muted">{appointment.service}</p>
                </div>
              </div>
              <div className="admin-record-actions">
                <select
                  className="admin-select"
                  onChange={(e) =>
                    setAppointments((c) =>
                      c.map((item) =>
                        item._id === appointment._id
                          ? { ...item, status: e.target.value }
                          : item,
                      ),
                    )
                  }
                  value={appointment.status}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="admin-record-body">
              <div className="admin-note-block">
                <p className="admin-note-title">Patient message</p>
                <p className="admin-note-copy">
                  {appointment.message || "No message submitted."}
                </p>
              </div>
              <div className="admin-note-block">
                <p className="admin-note-title">Internal notes</p>
                <textarea
                  className="admin-textarea"
                  onChange={(e) =>
                    setAppointments((c) =>
                      c.map((item) =>
                        item._id === appointment._id
                          ? { ...item, adminNotes: e.target.value }
                          : item,
                      ),
                    )
                  }
                  rows="3"
                  value={appointment.adminNotes || ""}
                  placeholder="Add internal notes for your team…"
                />
              </div>
              <div className="admin-row-cta">
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => saveAppointment(appointment)}
                  type="button"
                >
                  Save appointment
                </button>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );

  const renderMessages = () => (
    <div className="admin-section-body">
      {!filteredMessages.length ? (
        <EmptyState
          title="No matching messages"
          copy="Try a different search keyword in the top bar."
        />
      ) : (
        filteredMessages.map((message) => (
          <article className="admin-record-card" key={message._id}>
            <div className="admin-record-head">
              <div className="admin-record-ident">
                <div
                  className="admin-avatar admin-avatar-soft"
                  aria-hidden="true"
                >
                  {String(message.name || "M")
                    .trim()
                    .slice(0, 1)
                    .toUpperCase()}
                </div>
                <div>
                  <h3>{message.name}</h3>
                  <p className="admin-muted">
                    {message.email || "No email"} ·{" "}
                    {message.phone || "No phone"}
                  </p>
                  <p className="admin-muted">{message.contactMethod}</p>
                </div>
              </div>
              <div className="admin-record-actions">
                <select
                  className="admin-select"
                  onChange={(e) =>
                    setMessages((c) =>
                      c.map((item) =>
                        item._id === message._id
                          ? { ...item, status: e.target.value }
                          : item,
                      ),
                    )
                  }
                  value={message.status}
                >
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
            <div className="admin-record-body">
              <div className="admin-note-block">
                <p className="admin-note-title">Message</p>
                <p className="admin-note-copy">{message.message}</p>
              </div>
              <div className="admin-row-cta">
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => saveMessage(message)}
                  type="button"
                >
                  Save message
                </button>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );

  const renderDoctors = () => (
    <div className="admin-editor-layout">
      <form className="admin-form-card" onSubmit={saveDoctor}>
        <div className="admin-form-head">
          <div>
            <h3>{doctorForm._id ? "Edit doctor" : "Create doctor"}</h3>
            <p className="admin-muted mb-1">
              Keep profiles concise and structured for best front-end rendering.
            </p>
          </div>
          <button
            className="admin-btn admin-btn-ghost admin-btn-sm"
            onClick={() => setDoctorForm(emptyDoctor)}
            type="button"
          >
            New
          </button>
        </div>
        <div className="admin-form-grid">
          <label className="admin-field">
            <span>Name</span>
            <input
              onChange={(e) =>
                setDoctorForm((c) => ({ ...c, name: e.target.value }))
              }
              value={doctorForm.name}
              placeholder="Dr. Ayesha Khan"
            />
          </label>
          <label className="admin-field">
            <span>Initials</span>
            <input
              onChange={(e) =>
                setDoctorForm((c) => ({ ...c, initials: e.target.value }))
              }
              value={doctorForm.initials}
              placeholder="AK"
            />
          </label>
          <label className="admin-field">
            <span>Role</span>
            <input
              onChange={(e) =>
                setDoctorForm((c) => ({ ...c, role: e.target.value }))
              }
              value={doctorForm.role}
              placeholder="Refractive Surgeon"
            />
          </label>
          <label className="admin-field">
            <span>Schedule</span>
            <input
              onChange={(e) =>
                setDoctorForm((c) => ({ ...c, schedule: e.target.value }))
              }
              value={doctorForm.schedule}
              placeholder="Mon–Sat · 10am–6pm"
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Focus areas</span>
            <input
              onChange={(e) =>
                setDoctorForm((c) => ({ ...c, focus: e.target.value }))
              }
              value={doctorForm.focus}
              placeholder="LASIK, SMILE, Premium IOL"
            />
          </label>
          <label className="admin-field">
            <span>Experience</span>
            <input
              onChange={(e) =>
                setDoctorForm((c) => ({ ...c, experience: e.target.value }))
              }
              value={doctorForm.experience}
              placeholder="12+ years"
            />
          </label>
          <label className="admin-field">
            <span>Education</span>
            <input
              onChange={(e) =>
                setDoctorForm((c) => ({ ...c, education: e.target.value }))
              }
              value={doctorForm.education}
              placeholder="FCPS, FRCS"
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Bio</span>
            <textarea
              onChange={(e) =>
                setDoctorForm((c) => ({ ...c, bio: e.target.value }))
              }
              rows="5"
              value={doctorForm.bio}
              placeholder="Short summary shown on the Doctors page…"
            />
          </label>
          <label className="admin-field">
            <span>Display order</span>
            <input
              type="number"
              onChange={(e) =>
                setDoctorForm((c) => ({
                  ...c,
                  displayOrder: Number(e.target.value),
                }))
              }
              value={doctorForm.displayOrder}
            />
          </label>
          <div className="admin-inline-checks">
            <label>
              <input
                type="checkbox"
                checked={doctorForm.featured}
                onChange={(e) =>
                  setDoctorForm((c) => ({ ...c, featured: e.target.checked }))
                }
              />{" "}
              Featured
            </label>
            <label>
              <input
                type="checkbox"
                checked={doctorForm.active}
                onChange={(e) =>
                  setDoctorForm((c) => ({ ...c, active: e.target.checked }))
                }
              />{" "}
              Active
            </label>
          </div>
        </div>
        <button className="admin-btn admin-btn-primary" type="submit">
          {doctorForm._id ? "Update doctor" : "Create doctor"}
        </button>
      </form>
      <div className="admin-list-card">
        <div className="admin-list-head">
          <h3>Doctors</h3>
          <p className="admin-muted mb-1">
            Click edit to load a profile into the editor.
          </p>
        </div>
        {!filteredDoctors.length ? (
          <EmptyState
            title="No matching doctors"
            copy="Try a different search keyword in the top bar."
          />
        ) : (
          filteredDoctors.map((doctor) => (
            <article
              className="admin-list-row admin-list-row-block"
              key={doctor._id}
            >
              <div className="admin-list-left">
                <strong>{doctor.name}</strong>
                <p>{doctor.role}</p>
              </div>
              <div className="admin-row-actions">
                <button
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  onClick={() => setDoctorForm(normalizeDoctor(doctor))}
                >
                  Edit
                </button>
                <button
                  className="admin-btn admin-btn-danger admin-btn-sm"
                  onClick={() => deleteDoctor(doctor._id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="admin-editor-layout">
      <form className="admin-form-card" onSubmit={saveService}>
        <div className="admin-form-head">
          <div>
            <h3>{serviceForm._id ? "Edit service" : "Create service"}</h3>
            <p className="admin-muted mb-1">
              Titles and subtitles appear in service cards across the public
              site.
            </p>
          </div>
          <button
            className="admin-btn admin-btn-ghost admin-btn-sm"
            onClick={() => setServiceForm(emptyService)}
          >
            New
          </button>
        </div>
        <div className="admin-form-grid">
          <label className="admin-field admin-field-span2">
            <span>Title</span>
            <input
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, title: e.target.value }))
              }
              value={serviceForm.title}
              placeholder="Cataract Surgery"
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Subtitle</span>
            <input
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, subtitle: e.target.value }))
              }
              value={serviceForm.subtitle}
              placeholder="Premium lenses, precision planning"
            />
          </label>
          <label className="admin-field">
            <span>Accent</span>
            <input
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, accent: e.target.value }))
              }
              value={serviceForm.accent}
              placeholder="#0ea5e9"
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Treatments</span>
            <input
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, treatments: e.target.value }))
              }
              value={serviceForm.treatments}
              placeholder="Comprehensive Exams, Risk Detection"
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Description</span>
            <textarea
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, description: e.target.value }))
              }
              rows="5"
              value={serviceForm.description}
              placeholder="Short, patient-friendly description…"
            />
          </label>
          <label className="admin-field">
            <span>Display order</span>
            <input
              type="number"
              onChange={(e) =>
                setServiceForm((c) => ({
                  ...c,
                  displayOrder: Number(e.target.value),
                }))
              }
              value={serviceForm.displayOrder}
            />
          </label>
          <div className="admin-inline-checks">
            <label>
              <input
                type="checkbox"
                checked={serviceForm.featured}
                onChange={(e) =>
                  setServiceForm((c) => ({ ...c, featured: e.target.checked }))
                }
              />{" "}
              Featured
            </label>
            <label>
              <input
                type="checkbox"
                checked={serviceForm.active}
                onChange={(e) =>
                  setServiceForm((c) => ({ ...c, active: e.target.checked }))
                }
              />{" "}
              Active
            </label>
          </div>
        </div>
        <button className="admin-btn admin-btn-primary" type="submit">
          {serviceForm._id ? "Update service" : "Create service"}
        </button>
      </form>
      <div className="admin-list-card">
        <div className="admin-list-head">
          <h3>Services</h3>
          <p className="admin-muted mb-1">
            Keep display order low for top placement on the homepage.
          </p>
        </div>
        {!filteredServices.length ? (
          <EmptyState
            title="No matching services"
            copy="Try a different search keyword in the top bar."
          />
        ) : (
          filteredServices.map((service) => (
            <article
              className="admin-list-row admin-list-row-block"
              key={service._id}
            >
              <div className="admin-list-left">
                <strong>{service.title}</strong>
                <p>{service.subtitle}</p>
              </div>
              <div className="admin-row-actions">
                <button
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  onClick={() => setServiceForm(normalizeService(service))}
                >
                  Edit
                </button>
                <button
                  className="admin-btn admin-btn-danger admin-btn-sm"
                  onClick={() => deleteService(service._id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="admin-editor-layout">
      <form className="admin-form-card" onSubmit={saveInsight}>
        <div className="admin-form-head">
          <div>
            <h3>{insightForm._id ? "Edit insight" : "Create insight"}</h3>
            <p className="admin-muted mb-1">
              Educational articles and blog posts for the public site.
            </p>
          </div>
          <button
            className="admin-btn admin-btn-ghost admin-btn-sm"
            onClick={() => setInsightForm(emptyInsight)}
          >
            New
          </button>
        </div>
        <div className="admin-form-grid">
          <label className="admin-field admin-field-span2">
            <span>Title</span>
            <input
              onChange={(e) =>
                setInsightForm((c) => ({ ...c, title: e.target.value }))
              }
              value={insightForm.title}
              placeholder="Understanding Cataracts"
            />
          </label>
          <label className="admin-field">
            <span>Category</span>
            <input
              onChange={(e) =>
                setInsightForm((c) => ({ ...c, category: e.target.value }))
              }
              value={insightForm.category}
              placeholder="Eye Health"
            />
          </label>
          <label className="admin-field">
            <span>Status</span>
            <select
              className="admin-select"
              value={insightForm.status}
              onChange={(e) =>
                setInsightForm((c) => ({ ...c, status: e.target.value }))
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
          <label className="admin-field admin-field-span2">
            <span>Excerpt</span>
            <textarea
              onChange={(e) =>
                setInsightForm((c) => ({ ...c, excerpt: e.target.value }))
              }
              rows="3"
              value={insightForm.excerpt}
              placeholder="Short summary for cards…"
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Content</span>
            <textarea
              className="admin-textarea-lg"
              onChange={(e) =>
                setInsightForm((c) => ({ ...c, content: e.target.value }))
              }
              rows="10"
              value={insightForm.content}
              placeholder="Full article content…"
            />
          </label>
          <label className="admin-field">
            <span>Display order</span>
            <input
              type="number"
              onChange={(e) =>
                setInsightForm((c) => ({
                  ...c,
                  displayOrder: Number(e.target.value),
                }))
              }
              value={insightForm.displayOrder}
            />
          </label>
          <div className="admin-inline-checks">
            <label>
              <input
                type="checkbox"
                checked={insightForm.featured}
                onChange={(e) =>
                  setInsightForm((c) => ({ ...c, featured: e.target.checked }))
                }
              />{" "}
              Featured
            </label>
          </div>
        </div>
        <button className="admin-btn admin-btn-primary" type="submit">
          {insightForm._id ? "Update insight" : "Create insight"}
        </button>
      </form>
      <div className="admin-list-card">
        <div className="admin-list-head">
          <h3>Insights</h3>
          <p className="admin-muted mb-1">
            Manage blog posts and news articles.
          </p>
        </div>
        {!filteredInsights.length ? (
          <EmptyState
            title="No matching insights"
            copy="Try a different search keyword."
          />
        ) : (
          filteredInsights.map((insight) => (
            <article
              className="admin-list-row admin-list-row-block"
              key={insight._id}
            >
              <div className="admin-list-left">
                <strong>{insight.title}</strong>
                <p>
                  {insight.category} · <StatusPill status={insight.status} />
                </p>
              </div>
              <div className="admin-row-actions">
                <button
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  onClick={() => setInsightForm(normalizeInsight(insight))}
                >
                  Edit
                </button>
                <button
                  className="admin-btn admin-btn-danger admin-btn-sm"
                  onClick={() => deleteInsight(insight._id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="admin-section-body">
      <form
        className="admin-form-card admin-form-card--single"
        onSubmit={saveSettings}
      >
        <div className="admin-form-head">
          <h3>Site Settings</h3>
          <p className="admin-muted mb-1">
            Global configuration visible across the public site.
          </p>
        </div>
        <div className="admin-form-grid">
          <label className="admin-field admin-field-span2">
            <span>Brand Name</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, brandName: e.target.value })
              }
              value={settingsForm.brandName}
            />
          </label>
          <label className="admin-field">
            <span>Phone</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, phone: e.target.value })
              }
              value={settingsForm.phone}
            />
          </label>
          <label className="admin-field">
            <span>Email</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, email: e.target.value })
              }
              value={settingsForm.email}
            />
          </label>
          <label className="admin-field">
            <span>WhatsApp</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, whatsapp: e.target.value })
              }
              value={settingsForm.whatsapp}
            />
          </label>
          <label className="admin-field">
            <span>Location</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, location: e.target.value })
              }
              value={settingsForm.location}
            />
          </label>
          <label className="admin-field">
            <span>Hours</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, hours: e.target.value })
              }
              value={settingsForm.hours}
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Tagline</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, tagline: e.target.value })
              }
              value={settingsForm.tagline}
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>About Headline</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, aboutHeadline: e.target.value })
              }
              value={settingsForm.aboutHeadline}
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>About Summary</span>
            <textarea
              rows="4"
              onChange={(e) =>
                setSettings({ ...settingsForm, aboutSummary: e.target.value })
              }
              value={settingsForm.aboutSummary}
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Signature</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, signature: e.target.value })
              }
              value={settingsForm.signature}
            />
          </label>
        </div>
        <button className="admin-btn admin-btn-primary" type="submit">
          Save settings
        </button>
      </form>
    </div>
  );

  // --------------------------------------------------------------------
  // Main return – white professional layout with animations
  // --------------------------------------------------------------------
  return (
    <>
      {/* Global styles for this admin panel */}
      <style>{adminPanelCSS}</style>

      <div className="admin-root">
        {/* Sidebar overlay for mobile */}
        {sidebarOpen && (
          <div
            className="admin-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`admin-sidebar ${sidebarOpen ? "admin-sidebar--open" : ""}`}
        >
          <div className="admin-sidebar-header">
            <div className="admin-logo">
              <span className="admin-logo-icon">👁️</span>
              <span className="admin-logo-text">EyeCon</span>
            </div>
          </div>
          <nav className="admin-nav">
            {sections.map((sec) => (
              <button
                key={sec.id}
                className={`admin-nav-btn ${activeSection === sec.id ? "admin-nav-btn--active" : ""}`}
                onClick={() => {
                  setActiveSection(sec.id);
                  setSidebarOpen(false);
                }}
              >
                <span className="admin-nav-icon">{sec.icon}</span>
                {sec.label}
              </button>
            ))}
          </nav>
          <div className="admin-sidebar-footer">
            <div className="admin-user-info">
              <div className="admin-user-avatar">A</div>
              <span className="admin-user-name">{admin?.name || "Admin"}</span>
            </div>
            <button
              className="admin-btn admin-btn-ghost admin-logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="admin-main">
          <header className="admin-topbar">
            <button
              className="admin-hamburger"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span />
              <span />
              <span />
            </button>
            <div className="admin-search-area">
              <input
                className="admin-search-input"
                type="text"
                placeholder="Quick search..."
                value={quickFilter}
                onChange={(e) => setQuickFilter(e.target.value)}
              />
            </div>
            {feedback && (
              <div className="admin-feedback" onClick={() => setFeedback("")}>
                {feedback} ✕
              </div>
            )}
          </header>

          <div className="admin-content">
            <div className="admin-section-header">
              <h2 className="admin-section-title">
                {sections.find((s) => s.id === activeSection)?.label}
              </h2>
            </div>

            {loading ? (
              <div className="admin-loader">Loading...</div>
            ) : (
              <div className="admin-section-fade" key={activeSection}>
                {activeSection === "dashboard" && renderDashboard()}
                {activeSection === "appointments" && renderAppointments()}
                {activeSection === "messages" && renderMessages()}
                {activeSection === "doctors" && renderDoctors()}
                {activeSection === "services" && renderServices()}
                {activeSection === "insights" && renderInsights()}
                {activeSection === "settings" && renderSettings()}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

// ----------------------------------------------------------------------
// CSS (white background, professional design, animations, responsiveness)
// ----------------------------------------------------------------------
const adminPanelCSS = `
/* ===== BASE ===== */
.admin-root {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #1e293b;
}

/* ===== SIDEBAR ===== */
.admin-sidebar {
  width: 260px;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  z-index: 20;
  box-shadow: 0 0 20px rgba(0,0,0,0.02);
}
.admin-sidebar-header {
  padding: 24px 20px 16px;
  border-bottom: 1px solid #f1f5f9;
}
.admin-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}
.admin-logo-icon { font-size: 28px; }
.admin-logo-text {
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(135deg, #0f172a 0%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.admin-nav {
  flex: 1;
  padding: 12px 12px;
  overflow-y: auto;
}
.admin-nav-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 16px;
  margin-bottom: 4px;
  border: none;
  background: transparent;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  transition: all 0.2s;
  cursor: pointer;
}
.admin-nav-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
}
.admin-nav-btn--active {
  background: #0f172a;
  color: #ffffff;
}
.admin-nav-btn--active .admin-nav-icon { filter: brightness(0) invert(1); }
.admin-nav-icon { font-size: 18px; width: 24px; text-align: center; }
.admin-sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid #f1f5f9;
}
.admin-user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.admin-user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #0f172a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}
.admin-user-name { font-weight: 600; font-size: 13px; }
.admin-logout-btn {
  width: 100%;
  justify-content: center;
  border: 1px solid #e2e8f0;
  color: #ef4444;
}

/* Mobile sidebar overlay & toggle */
.admin-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  z-index: 10;
  backdrop-filter: blur(2px);
}
@media (max-width: 768px) {
  .admin-sidebar {
    position: fixed;
    top: 0; left: 0;
    height: 100%;
    transform: translateX(-100%);
  }
  .admin-sidebar--open { transform: translateX(0); }
  .admin-hamburger { display: flex !important; }
  .admin-search-area { margin-left: 0 !important; }
  .admin-stat-grid { grid-template-columns: 1fr !important; }
  .admin-two-column { grid-template-columns: 1fr !important; }
  .admin-editor-layout { grid-template-columns: 1fr !important; }
}

/* ===== MAIN AREA ===== */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.admin-topbar {
  padding: 16px 24px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.admin-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.admin-hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: #1e293b;
  border-radius: 2px;
  transition: 0.2s;
}
.admin-search-area { margin-left: auto; }
.admin-search-input {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
  font-size: 13px;
  width: 220px;
  transition: 0.2s;
}
.admin-search-input:focus { border-color: #94a3b8; background: white; outline: none; }
.admin-feedback {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  color: #0369a1;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
}

/* Content transitions */
.admin-content { flex: 1; padding: 32px; overflow-y: auto; }
.admin-section-fade {
  animation: fadeSlideIn 0.3s ease;
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.admin-section-header { margin-bottom: 24px; }
.admin-section-title {
  font-size: 26px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

/* ===== CARDS & GRIDS ===== */
.admin-stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}
.admin-stat-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}
.admin-stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.admin-stat-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.admin-stat-label { color: #64748b; font-size: 13px; font-weight: 600; margin: 0; }
.admin-stat-meta { font-size: 11px; color: #94a3b8; background: #f1f5f9; padding: 2px 8px; border-radius: 20px; }
.admin-stat-value { font-size: 32px; font-weight: 700; }
.admin-stat-spark { margin-top: 12px; height: 4px; background: linear-gradient(90deg, #0f172a20, #0f172a); border-radius: 2px; }

.admin-two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.admin-panel-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.admin-panel-head { margin-bottom: 16px; }
.admin-panel-head h3 { margin: 0 0 4px; font-size: 18px; }
.admin-panel-sub { font-size: 12px; color: #94a3b8; }

/* ===== RECORD CARDS ===== */
.admin-record-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  transition: box-shadow 0.2s;
}
.admin-record-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
.admin-record-head { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; }
.admin-record-ident { display: flex; gap: 14px; align-items: center; }
.admin-avatar {
  width: 44px; height: 44px; border-radius: 12px; background: #0f172a; color: white;
  display: flex; align-items: center; justify-content: center; font-weight: 700;
}
.admin-avatar-soft { background: #e2e8f0; color: #1e293b; }
.admin-record-ident h3 { margin: 0; font-size: 16px; }
.admin-muted { color: #64748b; font-size: 13px; margin: 4px 0 0; }
.admin-record-actions select {
  padding: 6px 12px; border-radius: 8px; border: 1px solid #e2e8f0; background: white;
}
.admin-record-body { margin-top: 16px; }
.admin-note-block { margin-bottom: 12px; }
.admin-note-title { font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin: 0 0 6px; }
.admin-note-copy { font-size: 14px; color: #334155; line-height: 1.5; }
.admin-textarea {
  width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 10px; resize: vertical;
  font-size: 14px; background: #f8fafc; transition: 0.2s;
}
.admin-textarea:focus { background: white; border-color: #94a3b8; outline: none; }
.admin-row-cta { text-align: right; }

/* ===== FORMS & EDITOR ===== */
.admin-editor-layout { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
.admin-form-card {
  background: #ffffff; border-radius: 16px; padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.admin-form-card--single { max-width: 700px; }
.admin-form-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.admin-form-head h3 { margin: 0; }
.admin-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.admin-field { display: flex; flex-direction: column; gap: 4px; }
.admin-field span { font-size: 13px; font-weight: 600; color: #475569; }
.admin-field input, .admin-field textarea {
  padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 10px; background: #f8fafc;
  font-size: 14px; transition: 0.2s;
}
.admin-field input:focus, .admin-field textarea:focus { background: white; border-color: #0f172a; outline: none; }
.admin-field-span2 { grid-column: span 2; }
.admin-inline-checks { display: flex; gap: 20px; align-items: center; }
.admin-inline-checks label { font-size: 13px; display: flex; align-items: center; gap: 6px; cursor: pointer; }

.admin-list-card {
  background: #ffffff; border-radius: 16px; padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04); overflow-y: auto;
}
.admin-list-head { margin-bottom: 16px; }
.admin-list-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 0; border-bottom: 1px solid #f1f5f9;
}
.admin-list-row:last-child { border-bottom: none; }
.admin-list-left strong { font-size: 15px; }
.admin-list-left p { margin: 2px 0 0; font-size: 13px; color: #64748b; }
.admin-row-actions { display: flex; gap: 8px; }

/* ===== BUTTONS ===== */
.admin-btn {
  padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 600;
  border: none; cursor: pointer; transition: all 0.2s;
}
.admin-btn-primary { background: #0f172a; color: white; }
.admin-btn-primary:hover { background: #1e293b; box-shadow: 0 4px 12px rgba(15,23,42,0.2); }
.admin-btn-secondary { background: #f1f5f9; color: #1e293b; }
.admin-btn-secondary:hover { background: #e2e8f0; }
.admin-btn-danger { background: #fee2e2; color: #b91c1c; }
.admin-btn-danger:hover { background: #fecaca; }
.admin-btn-ghost { background: transparent; color: #475569; }
.admin-btn-ghost:hover { background: #f1f5f9; }
.admin-btn-sm { padding: 6px 14px; font-size: 12px; border-radius: 8px; }

/* ===== STATUS PILLS ===== */
.admin-status {
  display: inline-block; padding: 4px 12px; border-radius: 20px;
  font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
}
.admin-status-new { background: #e0f2fe; color: #0369a1; }
.admin-status-contacted { background: #fef3c7; color: #b45309; }
.admin-status-scheduled { background: #dbeafe; color: #1e40af; }
.admin-status-completed { background: #dcfce7; color: #16a34a; }
.admin-status-cancelled { background: #fee2e2; color: #b91c1c; }
.admin-status-reviewed { background: #f3e8ff; color: #7e22ce; }
.admin-status-resolved { background: #dcfce7; color: #16a34a; }
.admin-status-published { background: #dcfce7; color: #16a34a; }
.admin-status-draft { background: #f1f5f9; color: #64748b; }

/* ===== UTILS ===== */
.admin-empty { text-align: center; padding: 40px 20px; color: #94a3b8; }
.admin-empty h3 { margin: 0 0 8px; font-size: 18px; color: #64748b; }
.mb-1 { margin-bottom: 8px; }
.admin-loader { display: flex; justify-content: center; padding: 80px 20px; font-size: 18px; color: #94a3b8; }

/* ===== ANIMATIONS (additional) ===== */
.admin-nav-btn { position: relative; overflow: hidden; }
.admin-nav-btn::after {
  content: ''; position: absolute; bottom: 0; left: 50%; width: 0; height: 2px;
  background: #0f172a; transition: all 0.3s; transform: translateX(-50%);
}
.admin-nav-btn:hover::after { width: 80%; }
.admin-nav-btn--active::after { width: 80%; background: white; }

/* Smooth checkbox toggle */
input[type="checkbox"] { accent-color: #0f172a; width: 16px; height: 16px; }

/* Scrollbar */
.admin-sidebar::-webkit-scrollbar { width: 6px; }
.admin-sidebar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
`;
