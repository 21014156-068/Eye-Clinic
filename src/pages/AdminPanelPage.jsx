import { startTransition, useEffect, useMemo, useState } from "react";
import { useAdminAuth } from "../admin/AdminAuthContext";
import { usePublicSite } from "../hooks/PublicSiteContext";

// ----------------------------------------------------------------------
// Constants & helpers
// ----------------------------------------------------------------------
const sections = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "appointments", label: "Appointments", icon: "📅" },
  { id: "messages", label: "Messages", icon: "💬" },
  { id: "doctors", label: "Doctors", icon: "👨‍⚕️" },
  { id: "services", label: "Services", icon: "⚙️" },
  { id: "settings", label: "Settings", icon: "🔧" },
];

const emptyDoctor = {
  _id: "",
  name: "",
  role: "",
  specialization: "",
  focus: "", // CSV string in form
  bio: "",
  photo: "",
  experienceYears: 0,
  rating: 4.5,
  availabilityStatus: "",
  schedule: "",
  gender: "Male",
  initials: "",
  active: true,
  displayOrder: 0,
};

const emptyService = {
  _id: "",
  title: "",
  slug: "",
  description: "",
  category: "Vision Correction",
  featured: false,
  active: true,
  displayOrder: 0,
  tags: "",
  benefits: "",
  successRate: "Varies",
  recovery: "Varies",
  cost: "Starting from —",
  overview: "",
  procedureSteps: "",
  symptoms: "",
  risks: "",
  doctorRoles: "",
  treatments: "",
};

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const toCsv = (value) =>
  Array.isArray(value) ? value.join(", ") : value || "";
const fromCsv = (str) =>
  String(str || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const normalizeDoctor = (doctor) => ({
  ...emptyDoctor,
  ...doctor,
  focus: toCsv(doctor.focus),
});

const normalizeService = (service) => ({
  ...emptyService,
  ...service,
  tags: toCsv(service.tags),
  benefits: toCsv(service.benefits),
  symptoms: toCsv(service.symptoms),
  doctorRoles: toCsv(service.doctorRoles),
  treatments: toCsv(service.treatments),
});

// ----------------------------------------------------------------------
// Sub‑components
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

  const [activeSection, setActiveSection] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  const [dashboard, setDashboard] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [settings, setSettings] = useState(null);

  const [doctorForm, setDoctorForm] = useState(emptyDoctor);
  const [serviceForm, setServiceForm] = useState(emptyService);

  const [quickFilter, setQuickFilter] = useState("");
  const normalizedQuickFilter = quickFilter.trim().toLowerCase();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const settingsForm = useMemo(
    () =>
      settings || {
        _id: "",
        clinicName: "",
        tagline: "",
        phone: "",
        emergencyPhone: "",
        email: "",
        address: "",
        mapEmbedUrl: "",
        directionsUrl: "",
        facebook: "",
        instagram: "",
        youtube: "",
        linkedin: "",
        logoUrl: "",
        faviconUrl: "",
        footerCopyright: "",
      },
    [settings],
  );

  // --------------------------------------------------------------------
  // Data fetching & CRUD
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
        settingsPayload,
      ] = await Promise.all([
        apiFetch("/api/admin/dashboard"),
        apiFetch("/api/admin/appointments"),
        apiFetch("/api/admin/messages"),
        apiFetch("/api/admin/doctors"),
        apiFetch("/api/admin/services"),
        apiFetch("/api/admin/settings"),
      ]);

      setDashboard(dashboardPayload.data);
      setAppointments(appointmentsPayload.data);
      setMessages(messagesPayload.data);
      setDoctors(doctorsPayload.data);
      setServices(servicesPayload.data);
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

  // Make sure headers are passed correctly so the backend parses req.body!
  const saveAppointment = async (appointment) => {
    const payload = await apiFetch(
      `/api/admin/appointments/${appointment._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminNotes: appointment.adminNotes,
          status: appointment.status,
        }),
      },
    );
    setAppointments((current) =>
      current.map((item) =>
        item._id === appointment._id ? payload.data : item,
      ),
    );
    setFeedback(payload.message || "Appointment saved.");
    await loadAdminData();
  };

  const saveMessage = async (message) => {
    const payload = await apiFetch(`/api/admin/messages/${message._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: message.status }),
    });
    setMessages((current) =>
      current.map((item) => (item._id === message._id ? payload.data : item)),
    );
    setFeedback(payload.message || "Message saved.");
    await loadAdminData();
  };

  const saveDoctor = async (event) => {
    event.preventDefault();
    const { _id: doctorId, ...doctorData } = doctorForm;
    try {
      const payload = await apiFetch(
        doctorId ? `/api/admin/doctors/${doctorId}` : "/api/admin/doctors",
        {
          method: doctorId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...doctorData,
            focus: fromCsv(doctorData.focus),
          }),
        },
      );
      startTransition(() => setDoctorForm(emptyDoctor));
      setFeedback(payload.message || "Doctor saved.");
      await loadAdminData();
      await refreshPublicSite();
    } catch (error) {
      setFeedback(error.message || "Failed to save doctor.");
    }
  };

  const deleteDoctor = async (id) => {
    await apiFetch(`/api/admin/doctors/${id}`, { method: "DELETE" });
    setDoctorForm(emptyDoctor);
    setFeedback("Doctor deleted successfully.");
    await loadAdminData();
    await refreshPublicSite();
  };

  const saveService = async (event) => {
    event.preventDefault();
    const { _id: serviceId, ...serviceData } = serviceForm;
    try {
      const payload = await apiFetch(
        serviceId ? `/api/admin/services/${serviceId}` : "/api/admin/services",
        {
          method: serviceId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...serviceData,
            tags: fromCsv(serviceData.tags),
            benefits: fromCsv(serviceData.benefits),
            symptoms: fromCsv(serviceData.symptoms),
            doctorRoles: fromCsv(serviceData.doctorRoles),
            treatments: fromCsv(serviceData.treatments),
            slug: serviceData.slug || slugify(serviceData.title),
          }),
        },
      );
      startTransition(() => setServiceForm(emptyService));
      setFeedback(payload.message || "Service saved.");
      await loadAdminData();
      await refreshPublicSite();
    } catch (error) {
      setFeedback(error.message || "Failed to save service.");
    }
  };

  const saveSettings = async (event) => {
    event.preventDefault();
    // Guard clause in case _id is empty (no settings document created yet)
    if (!settingsForm._id) {
      setFeedback(
        "Error: Please manually seed the settings document in the database first.",
      );
      return;
    }
    const payload = await apiFetch(`/api/admin/settings/${settingsForm._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settingsForm),
    });
    setSettings(payload.data);
    setFeedback(payload.message || "Settings saved.");
    await refreshPublicSite();
  };

  // --------------------------------------------------------------------
  // Filters
  // --------------------------------------------------------------------
  const filteredAppointments = useMemo(() => {
    if (!normalizedQuickFilter) return appointments;
    return appointments.filter((a) =>
      `${a.fullName} ${a.email} ${a.phone} ${a.serviceLabel} ${a.status}`
        .toLowerCase()
        .includes(normalizedQuickFilter),
    );
  }, [appointments, normalizedQuickFilter]);

  const filteredMessages = useMemo(() => {
    if (!normalizedQuickFilter) return messages;
    return messages.filter((m) =>
      `${m.name} ${m.email || ""} ${m.phone || ""} ${m.subject} ${m.status}`
        .toLowerCase()
        .includes(normalizedQuickFilter),
    );
  }, [messages, normalizedQuickFilter]);

  const filteredDoctors = useMemo(() => {
    if (!normalizedQuickFilter) return doctors;
    return doctors.filter((d) =>
      `${d.name} ${d.role} ${d.specialization}`
        .toLowerCase()
        .includes(normalizedQuickFilter),
    );
  }, [doctors, normalizedQuickFilter]);

  const filteredServices = useMemo(() => {
    if (!normalizedQuickFilter) return services;
    return services.filter((s) =>
      `${s.title} ${s.category}`.toLowerCase().includes(normalizedQuickFilter),
    );
  }, [services, normalizedQuickFilter]);

  // --------------------------------------------------------------------
  // Renderers
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
                  <strong>{item.fullName}</strong>
                  <p>
                    {item.serviceLabel} • {item.date}
                  </p>
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
                  <p>{item.subject}</p>
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
                  {String(appointment.fullName || "P")
                    .trim()
                    .slice(0, 1)
                    .toUpperCase()}
                </div>
                <div>
                  <h3>{appointment.fullName}</h3>
                  <p className="admin-muted">
                    {appointment.email} · {appointment.phone}
                  </p>
                  <p className="admin-muted">
                    {appointment.serviceLabel} • Mode: {appointment.mode}
                  </p>
                  <p
                    className="admin-muted"
                    style={{ color: "#0ea5e9", fontWeight: 600 }}
                  >
                    {appointment.date} at {appointment.time}
                  </p>
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
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="admin-record-body">
              <div className="admin-note-block">
                <p className="admin-note-title">Patient Notes / Symptoms</p>
                <p className="admin-note-copy">
                  {appointment.notes || "No additional notes provided."}
                </p>
              </div>
              <div className="admin-note-block">
                <p className="admin-note-title">Internal Admin Notes</p>
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
                  <p className="admin-muted">Subject: {message.subject}</p>
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
                  <option value="read">Read</option>
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
                  Save status
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
              Manage doctor profiles and specialties.
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
              placeholder="Dr. Sarah Ahmed"
              required
            />
          </label>
          <label className="admin-field">
            <span>Initials (Fallback Avatar)</span>
            <input
              onChange={(e) =>
                setDoctorForm((c) => ({ ...c, initials: e.target.value }))
              }
              value={doctorForm.initials}
              placeholder="SA"
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
              required
            />
          </label>
          <label className="admin-field">
            <span>Specialization</span>
            <input
              onChange={(e) =>
                setDoctorForm((c) => ({ ...c, specialization: e.target.value }))
              }
              value={doctorForm.specialization}
              placeholder="LASIK"
            />
          </label>
          <label className="admin-field">
            <span>Gender</span>
            <select
              className="admin-select"
              value={doctorForm.gender}
              onChange={(e) =>
                setDoctorForm((c) => ({ ...c, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label className="admin-field">
            <span>Schedule String</span>
            <input
              onChange={(e) =>
                setDoctorForm((c) => ({ ...c, schedule: e.target.value }))
              }
              value={doctorForm.schedule}
              placeholder="Mon–Sat · 10am–6pm"
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Focus Areas (Comma Separated)</span>
            <input
              onChange={(e) =>
                setDoctorForm((c) => ({ ...c, focus: e.target.value }))
              }
              value={doctorForm.focus}
              placeholder="LASIK, SMILE, Cataract"
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Photo URL</span>
            <input
              onChange={(e) =>
                setDoctorForm((c) => ({ ...c, photo: e.target.value }))
              }
              value={doctorForm.photo}
              placeholder="https://..."
            />
          </label>
          <label className="admin-field">
            <span>Experience Years</span>
            <input
              type="number"
              onChange={(e) =>
                setDoctorForm((c) => ({
                  ...c,
                  experienceYears: Number(e.target.value),
                }))
              }
              value={doctorForm.experienceYears}
            />
          </label>
          <label className="admin-field">
            <span>Rating (0-5)</span>
            <input
              type="number"
              step="0.1"
              max="5"
              min="0"
              onChange={(e) =>
                setDoctorForm((c) => ({ ...c, rating: Number(e.target.value) }))
              }
              value={doctorForm.rating}
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Availability Status</span>
            <input
              onChange={(e) =>
                setDoctorForm((c) => ({
                  ...c,
                  availabilityStatus: e.target.value,
                }))
              }
              value={doctorForm.availabilityStatus}
              placeholder="Available today"
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
              placeholder="Short summary shown on the profile…"
            />
          </label>
          <label className="admin-field">
            <span>Display Order</span>
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
        </div>
        {!filteredDoctors.length ? (
          <EmptyState
            title="No matching doctors"
            copy="Try a different search keyword."
          />
        ) : (
          filteredDoctors.map((doctor) => (
            <article
              className="admin-list-row admin-list-row-block"
              key={doctor._id}
            >
              <div className="admin-list-left">
                <strong>{doctor.name}</strong>
                <p>
                  {doctor.role} • {doctor.specialization}
                </p>
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
              Service cards details and expanded overviews.
            </p>
          </div>
          <button
            className="admin-btn admin-btn-ghost admin-btn-sm"
            onClick={() => setServiceForm(emptyService)}
            type="button"
          >
            New
          </button>
        </div>
        <div className="admin-form-grid">
          <label className="admin-field">
            <span>Title</span>
            <input
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, title: e.target.value }))
              }
              value={serviceForm.title}
              placeholder="LASIK Surgery"
              required
            />
          </label>
          <label className="admin-field">
            <span>Category</span>
            <select
              className="admin-select"
              value={serviceForm.category}
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, category: e.target.value }))
              }
            >
              <option value="Vision Correction">Vision Correction</option>
              <option value="Surgical Procedures">Surgical Procedures</option>
              <option value="Eye Diseases">Eye Diseases</option>
              <option value="Pediatric Care">Pediatric Care</option>
              <option value="General Eye Checkup">General Eye Checkup</option>
            </select>
          </label>
          <label className="admin-field admin-field-span2">
            <span>Short Description</span>
            <textarea
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, description: e.target.value }))
              }
              rows="2"
              value={serviceForm.description}
              required
            />
          </label>
          <label className="admin-field">
            <span>Success Rate</span>
            <input
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, successRate: e.target.value }))
              }
              value={serviceForm.successRate}
            />
          </label>
          <label className="admin-field">
            <span>Recovery Time</span>
            <input
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, recovery: e.target.value }))
              }
              value={serviceForm.recovery}
            />
          </label>
          <label className="admin-field">
            <span>Cost Estimate</span>
            <input
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, cost: e.target.value }))
              }
              value={serviceForm.cost}
            />
          </label>
          <label className="admin-field">
            <span>Tags (CSV)</span>
            <input
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, tags: e.target.value }))
              }
              value={serviceForm.tags}
              placeholder="Popular, Advanced"
            />
          </label>

          <label className="admin-field admin-field-span2">
            <span>Benefits (CSV)</span>
            <input
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, benefits: e.target.value }))
              }
              value={serviceForm.benefits}
              placeholder="Painless, Quick recovery..."
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Symptoms Treated (CSV)</span>
            <input
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, symptoms: e.target.value }))
              }
              value={serviceForm.symptoms}
              placeholder="Blurry vision, Glare..."
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Related Doctor Roles (CSV)</span>
            <input
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, doctorRoles: e.target.value }))
              }
              value={serviceForm.doctorRoles}
              placeholder="Refractive Surgeon, Specialist"
            />
          </label>

          <label className="admin-field admin-field-span2">
            <span>Detailed Overview</span>
            <textarea
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, overview: e.target.value }))
              }
              rows="4"
              value={serviceForm.overview}
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Procedure Steps</span>
            <textarea
              onChange={(e) =>
                setServiceForm((c) => ({
                  ...c,
                  procedureSteps: e.target.value,
                }))
              }
              rows="3"
              value={serviceForm.procedureSteps}
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Potential Risks</span>
            <textarea
              onChange={(e) =>
                setServiceForm((c) => ({ ...c, risks: e.target.value }))
              }
              rows="3"
              value={serviceForm.risks}
            />
          </label>

          <label className="admin-field">
            <span>Display Order</span>
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
        </div>
        {!filteredServices.length ? (
          <EmptyState
            title="No matching services"
            copy="Try a different search keyword."
          />
        ) : (
          filteredServices.map((service) => (
            <article
              className="admin-list-row admin-list-row-block"
              key={service._id}
            >
              <div className="admin-list-left">
                <strong>{service.title}</strong>
                <p>{service.category}</p>
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
          <label className="admin-field">
            <span>Clinic Name</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, clinicName: e.target.value })
              }
              value={settingsForm.clinicName}
            />
          </label>
          <label className="admin-field">
            <span>Tagline</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, tagline: e.target.value })
              }
              value={settingsForm.tagline}
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
            <span>Emergency Phone</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, emergencyPhone: e.target.value })
              }
              value={settingsForm.emergencyPhone}
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Email</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, email: e.target.value })
              }
              value={settingsForm.email}
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Address</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, address: e.target.value })
              }
              value={settingsForm.address}
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Google Maps Embed URL (iframe src)</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, mapEmbedUrl: e.target.value })
              }
              value={settingsForm.mapEmbedUrl}
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Directions URL (Map Link)</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, directionsUrl: e.target.value })
              }
              value={settingsForm.directionsUrl}
            />
          </label>
          <label className="admin-field">
            <span>Facebook URL</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, facebook: e.target.value })
              }
              value={settingsForm.facebook}
            />
          </label>
          <label className="admin-field">
            <span>Instagram URL</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, instagram: e.target.value })
              }
              value={settingsForm.instagram}
            />
          </label>
          <label className="admin-field">
            <span>YouTube URL</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, youtube: e.target.value })
              }
              value={settingsForm.youtube}
            />
          </label>
          <label className="admin-field">
            <span>LinkedIn URL</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, linkedin: e.target.value })
              }
              value={settingsForm.linkedin}
            />
          </label>
          <label className="admin-field">
            <span>Logo URL</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, logoUrl: e.target.value })
              }
              value={settingsForm.logoUrl}
            />
          </label>
          <label className="admin-field">
            <span>Favicon URL</span>
            <input
              onChange={(e) =>
                setSettings({ ...settingsForm, faviconUrl: e.target.value })
              }
              value={settingsForm.faviconUrl}
            />
          </label>
          <label className="admin-field admin-field-span2">
            <span>Footer Copyright text</span>
            <input
              onChange={(e) =>
                setSettings({
                  ...settingsForm,
                  footerCopyright: e.target.value,
                })
              }
              value={settingsForm.footerCopyright}
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
  // Main return
  // --------------------------------------------------------------------
  return (
    <>
      <style>{adminPanelCSS}</style>

      <div className="admin-root">
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
            {/* <div className="admin-search-area">
              <input
                className="admin-search-input"
                type="text"
                placeholder="Quick search..."
                value={quickFilter}
                onChange={(e) => setQuickFilter(e.target.value)}
              />
            </div> */}
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
// CSS
// ----------------------------------------------------------------------
const adminPanelCSS = `
/* ===== BASE ===== */
.admin-root { display: flex; min-height: 100vh; background: #f8fafc; font-family: 'Inter', system-ui, -apple-system, sans-serif; color: #1e293b; }
.admin-sidebar { width: 260px; background: #ffffff; border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; transition: transform 0.3s ease; z-index: 20; box-shadow: 0 0 20px rgba(0,0,0,0.02); }
.admin-sidebar-header { padding: 24px 20px 16px; border-bottom: 1px solid #f1f5f9; }
.admin-logo { display: flex; align-items: center; gap: 10px; }
.admin-logo-icon { font-size: 28px; }
.admin-logo-text { font-size: 22px; font-weight: 700; background: linear-gradient(135deg, #0f172a 0%, #475569 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.admin-nav { flex: 1; padding: 12px 12px; overflow-y: auto; }
.admin-nav-btn { display: flex; align-items: center; gap: 12px; width: 100%; padding: 10px 16px; margin-bottom: 4px; border: none; background: transparent; border-radius: 12px; font-size: 14px; font-weight: 600; color: #475569; transition: all 0.2s; cursor: pointer; }
.admin-nav-btn:hover { background: #f1f5f9; color: #0f172a; }
.admin-nav-btn--active { background: #0f172a; color: #ffffff; }
.admin-nav-btn--active .admin-nav-icon { filter: brightness(0) invert(1); }
.admin-nav-icon { font-size: 18px; width: 24px; text-align: center; }
.admin-sidebar-footer { padding: 16px 20px; border-top: 1px solid #f1f5f9; }
.admin-user-info { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.admin-user-avatar { width: 36px; height: 36px; border-radius: 10px; background: #0f172a; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }
.admin-user-name { font-weight: 600; font-size: 13px; }
.admin-logout-btn { width: 100%; justify-content: center; border: 1px solid #e2e8f0; color: #ef4444; }

.admin-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 10; backdrop-filter: blur(2px); }
@media (max-width: 768px) {
  .admin-sidebar { position: fixed; top: 0; left: 0; height: 100%; transform: translateX(-100%); }
  .admin-sidebar--open { transform: translateX(0); }
  .admin-hamburger { display: flex !important; }
  .admin-search-area { margin-left: 0 !important; }
  .admin-stat-grid { grid-template-columns: 1fr !important; }
  .admin-two-column { grid-template-columns: 1fr !important; }
  .admin-editor-layout { grid-template-columns: 1fr !important; }
}

/* ===== MAIN AREA ===== */
.admin-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.admin-topbar { padding: 16px 24px; background: #ffffff; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.admin-hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
.admin-hamburger span { display: block; width: 22px; height: 2px; background: #1e293b; border-radius: 2px; transition: 0.2s; }
.admin-search-area { margin-left: auto; }
/* Force text to black inside search */
.admin-search-input { color: #000000; padding: 8px 16px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc; font-size: 13px; width: 220px; transition: 0.2s; }
.admin-search-input:focus { border-color: #94a3b8; background: white; outline: none; }
.admin-feedback { background: #f0f9ff; border: 1px solid #bae6fd; color: #0369a1; padding: 6px 12px; border-radius: 8px; font-size: 12px; cursor: pointer; }

.admin-content { flex: 1; padding: 32px; overflow-y: auto; }
.admin-section-fade { animation: fadeSlideIn 0.3s ease; }
@keyframes fadeSlideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.admin-section-header { margin-bottom: 24px; }
.admin-section-title { font-size: 26px; font-weight: 700; color: #0f172a; margin: 0; }

/* ===== CARDS & GRIDS ===== */
.admin-stat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px; }
.admin-stat-card { background: #ffffff; border-radius: 16px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06); transition: transform 0.2s, box-shadow 0.2s; }
.admin-stat-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.admin-stat-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.admin-stat-label { color: #64748b; font-size: 13px; font-weight: 600; margin: 0; }
.admin-stat-meta { font-size: 11px; color: #94a3b8; background: #f1f5f9; padding: 2px 8px; border-radius: 20px; }
.admin-stat-value { font-size: 32px; font-weight: 700; }
.admin-stat-spark { margin-top: 12px; height: 4px; background: linear-gradient(90deg, #0f172a20, #0f172a); border-radius: 2px; }

.admin-two-column { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.admin-panel-card { background: #ffffff; border-radius: 16px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
.admin-panel-head { margin-bottom: 16px; }
.admin-panel-head h3 { margin: 0 0 4px; font-size: 18px; }
.admin-panel-sub { font-size: 12px; color: #94a3b8; }

/* ===== RECORD CARDS ===== */
.admin-record-card { background: #ffffff; border-radius: 14px; padding: 20px; margin-bottom: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); transition: box-shadow 0.2s; }
.admin-record-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
.admin-record-head { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; }
.admin-record-ident { display: flex; gap: 14px; align-items: center; }
.admin-avatar { width: 44px; height: 44px; border-radius: 12px; background: #0f172a; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; }
.admin-avatar-soft { background: #e2e8f0; color: #1e293b; }
.admin-record-ident h3 { margin: 0; font-size: 16px; }
.admin-muted { color: #64748b; font-size: 13px; margin: 4px 0 0; }
.admin-select { color: #000000; padding: 6px 12px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; font-size:13px; }
.admin-record-body { margin-top: 16px; }
.admin-note-block { margin-bottom: 12px; }
.admin-note-title { font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin: 0 0 6px; }
.admin-note-copy { font-size: 14px; color: #000000; line-height: 1.5; }
.admin-textarea { color: #000000; width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 10px; resize: vertical; font-size: 14px; background: #f8fafc; transition: 0.2s; }
.admin-textarea:focus { background: white; border-color: #94a3b8; outline: none; }
.admin-textarea-lg { color: #000000; width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 10px; resize: vertical; font-size: 14px; background: #f8fafc; transition: 0.2s; }
.admin-textarea-lg:focus { background: white; border-color: #94a3b8; outline: none; }
.admin-row-cta { text-align: right; }

/* ===== FORMS & EDITOR ===== */
.admin-editor-layout { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
.admin-form-card { background: #ffffff; border-radius: 16px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
.admin-form-card--single { max-width: 700px; }
.admin-form-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.admin-form-head h3 { margin: 0; }
.admin-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
.admin-field { display: flex; flex-direction: column; gap: 4px; }
.admin-field span { font-size: 13px; font-weight: 600; color: #475569; }

/* Force input and textarea text color to pure black (#000000) */
.admin-field input, .admin-field textarea, .admin-field select { 
  color: #000000; 
  padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 10px; background: #f8fafc; font-size: 14px; transition: 0.2s; 
}
.admin-field input::placeholder, .admin-field textarea::placeholder { color: #94a3b8; }
.admin-field input:focus, .admin-field textarea:focus, .admin-field select:focus { background: white; border-color: #0f172a; outline: none; }
.admin-field-span2 { grid-column: span 2; }
.admin-inline-checks { display: flex; gap: 20px; align-items: center; }
.admin-inline-checks label { font-size: 13px; display: flex; align-items: center; gap: 6px; cursor: pointer; color: #000000; }

.admin-list-card { background: #ffffff; border-radius: 16px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); overflow-y: auto; max-height: calc(100vh - 140px); }
.admin-list-head { margin-bottom: 16px; }
.admin-list-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
.admin-list-row:last-child { border-bottom: none; }
.admin-list-left strong { font-size: 15px; color: #000000;}
.admin-list-left p { margin: 2px 0 0; font-size: 13px; color: #64748b; }
.admin-row-actions { display: flex; gap: 8px; }

/* ===== BUTTONS ===== */
.admin-btn { padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s; }
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
.admin-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
.admin-status-pending { background: #fef3c7; color: #b45309; }
.admin-status-confirmed { background: #dbeafe; color: #1e40af; }
.admin-status-completed { background: #dcfce7; color: #16a34a; }
.admin-status-cancelled { background: #fee2e2; color: #b91c1c; }
.admin-status-new { background: #e0f2fe; color: #0369a1; }
.admin-status-read { background: #f3e8ff; color: #7e22ce; }
.admin-status-resolved { background: #dcfce7; color: #16a34a; }
.admin-status-published { background: #dcfce7; color: #16a34a; }
.admin-status-draft { background: #f1f5f9; color: #64748b; }
.admin-status-archived { background: #fee2e2; color: #b91c1c; }

/* ===== UTILS ===== */
.admin-empty { text-align: center; padding: 40px 20px; color: #94a3b8; }
.admin-empty h3 { margin: 0 0 8px; font-size: 18px; color: #64748b; }
.mb-1 { margin-bottom: 8px; }
.admin-loader { display: flex; justify-content: center; padding: 80px 20px; font-size: 18px; color: #94a3b8; }
.admin-nav-btn { position: relative; overflow: hidden; }
.admin-nav-btn::after { content: ''; position: absolute; bottom: 0; left: 50%; width: 0; height: 2px; background: #0f172a; transition: all 0.3s; transform: translateX(-50%); }
.admin-nav-btn:hover::after { width: 80%; }
.admin-nav-btn--active::after { width: 80%; background: white; }
input[type="checkbox"] { accent-color: #0f172a; width: 16px; height: 16px; }
.admin-sidebar::-webkit-scrollbar { width: 6px; }
.admin-sidebar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
`;
