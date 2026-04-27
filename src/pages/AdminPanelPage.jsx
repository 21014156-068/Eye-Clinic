import { startTransition, useEffect, useMemo, useState } from "react";
import { useAdminAuth } from "../admin/AdminAuthContext";
import { usePublicSite } from "../hooks/PublicSiteContext";

const sections = [
  { id: "dashboard", label: "Dashboard" },
  { id: "appointments", label: "Appointments" },
  { id: "messages", label: "Messages" },
  { id: "doctors", label: "Doctors" },
  { id: "services", label: "Services" },
  { id: "insights", label: "Insights" },
  { id: "settings", label: "Settings" },
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

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toCsv(value) {
  return Array.isArray(value) ? value.join(", ") : value || "";
}

function normalizeDoctor(doctor) {
  return {
    ...emptyDoctor,
    ...doctor,
    focus: toCsv(doctor.focus),
  };
}

function normalizeService(service) {
  return {
    ...emptyService,
    ...service,
    treatments: toCsv(service.treatments),
  };
}

function normalizeInsight(insight) {
  return {
    ...emptyInsight,
    ...insight,
  };
}

function DashboardCard({ label, value }) {
  return (
    <article className="admin-stat-card">
      <strong>{value}</strong>
      <p>{label}</p>
    </article>
  );
}

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
  const [insights, setInsights] = useState([]);
  const [settings, setSettings] = useState(null);
  const [doctorForm, setDoctorForm] = useState(emptyDoctor);
  const [serviceForm, setServiceForm] = useState(emptyService);
  const [insightForm, setInsightForm] = useState(emptyInsight);

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

  const loadAdminData = async () => {
    setLoading(true);

    try {
      const [dashboardPayload, appointmentsPayload, messagesPayload, doctorsPayload, servicesPayload, insightsPayload, settingsPayload] =
        await Promise.all([
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
      setDoctorForm((current) => (current._id ? current : normalizeDoctor(doctorsPayload.data[0] || emptyDoctor)));
      setServiceForm((current) => (current._id ? current : normalizeService(servicesPayload.data[0] || emptyService)));
      setInsightForm((current) => (current._id ? current : normalizeInsight(insightsPayload.data[0] || emptyInsight)));
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

  const saveAppointment = async (appointment) => {
    const payload = await apiFetch(`/api/admin/appointments/${appointment._id}`, {
      body: JSON.stringify({
        adminNotes: appointment.adminNotes,
        status: appointment.status,
      }),
      method: "PATCH",
    });

    setAppointments((current) => current.map((item) => (item._id === appointment._id ? payload.data : item)));
    setFeedback(payload.message);
    await loadAdminData();
  };

  const saveMessage = async (message) => {
    const payload = await apiFetch(`/api/admin/messages/${message._id}`, {
      body: JSON.stringify({
        status: message.status,
      }),
      method: "PATCH",
    });

    setMessages((current) => current.map((item) => (item._id === message._id ? payload.data : item)));
    setFeedback(payload.message);
    await loadAdminData();
  };

  const saveDoctor = async (event) => {
    event.preventDefault();

    const payload = await apiFetch(doctorForm._id ? `/api/admin/doctors/${doctorForm._id}` : "/api/admin/doctors", {
      body: JSON.stringify({
        ...doctorForm,
        slug: doctorForm.slug || slugify(doctorForm.name),
      }),
      method: doctorForm._id ? "PUT" : "POST",
    });

    startTransition(() => {
      setDoctorForm(emptyDoctor);
    });

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

  const saveService = async (event) => {
    event.preventDefault();

    const payload = await apiFetch(serviceForm._id ? `/api/admin/services/${serviceForm._id}` : "/api/admin/services", {
      body: JSON.stringify({
        ...serviceForm,
        slug: serviceForm.slug || slugify(serviceForm.title),
      }),
      method: serviceForm._id ? "PUT" : "POST",
    });

    startTransition(() => {
      setServiceForm(emptyService);
    });

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

  const saveInsight = async (event) => {
    event.preventDefault();

    const payload = await apiFetch(insightForm._id ? `/api/admin/insights/${insightForm._id}` : "/api/admin/insights", {
      body: JSON.stringify({
        ...insightForm,
        slug: insightForm.slug || slugify(insightForm.title),
      }),
      method: insightForm._id ? "PUT" : "POST",
    });

    startTransition(() => {
      setInsightForm(emptyInsight);
    });

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

  const renderDashboard = () => (
    <div className="admin-section-body">
      <div className="admin-stat-grid">
        <DashboardCard label="Appointments" value={dashboard?.stats.appointmentsCount || 0} />
        <DashboardCard label="Messages" value={dashboard?.stats.messagesCount || 0} />
        <DashboardCard label="Doctors" value={dashboard?.stats.doctorsCount || 0} />
        <DashboardCard label="Services" value={dashboard?.stats.servicesCount || 0} />
        <DashboardCard label="Insights" value={dashboard?.stats.insightsCount || 0} />
      </div>

      <div className="admin-two-column">
        <div className="admin-panel-card">
          <h3>Recent appointments</h3>
          {dashboard?.recentAppointments?.map((item) => (
            <article className="admin-list-row" key={item._id}>
              <div>
                <strong>{item.name}</strong>
                <p>{item.service}</p>
              </div>
              <span className={`status-pill status-${item.status}`}>{item.status}</span>
            </article>
          ))}
        </div>

        <div className="admin-panel-card">
          <h3>Recent messages</h3>
          {dashboard?.recentMessages?.map((item) => (
            <article className="admin-list-row" key={item._id}>
              <div>
                <strong>{item.name}</strong>
                <p>{item.contactMethod}</p>
              </div>
              <span className={`status-pill status-${item.status}`}>{item.status}</span>
            </article>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="admin-section-body">
      {appointments.map((appointment) => (
        <article className="admin-record-card" key={appointment._id}>
          <div className="admin-record-head">
            <div>
              <h3>{appointment.name}</h3>
              <p>
                {appointment.email} | {appointment.phone}
              </p>
              <p>{appointment.service}</p>
            </div>
            <select
              className="admin-select"
              onChange={(event) =>
                setAppointments((current) =>
                  current.map((item) =>
                    item._id === appointment._id ? { ...item, status: event.target.value } : item,
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
          <p>{appointment.message || "No message submitted."}</p>
          <textarea
            className="admin-textarea"
            onChange={(event) =>
              setAppointments((current) =>
                current.map((item) =>
                  item._id === appointment._id ? { ...item, adminNotes: event.target.value } : item,
                ),
              )
            }
            rows="3"
            value={appointment.adminNotes || ""}
          />
          <button className="button button-primary admin-action-button" onClick={() => saveAppointment(appointment)} type="button">
            Save appointment
          </button>
        </article>
      ))}
    </div>
  );

  const renderMessages = () => (
    <div className="admin-section-body">
      {messages.map((message) => (
        <article className="admin-record-card" key={message._id}>
          <div className="admin-record-head">
            <div>
              <h3>{message.name}</h3>
              <p>
                {message.email || "No email"} | {message.phone || "No phone"}
              </p>
              <p>{message.contactMethod}</p>
            </div>
            <select
              className="admin-select"
              onChange={(event) =>
                setMessages((current) =>
                  current.map((item) =>
                    item._id === message._id ? { ...item, status: event.target.value } : item,
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
          <p>{message.message}</p>
          <button className="button button-primary admin-action-button" onClick={() => saveMessage(message)} type="button">
            Save message
          </button>
        </article>
      ))}
    </div>
  );

  const renderDoctors = () => (
    <div className="admin-editor-layout">
      <form className="admin-form-card" onSubmit={saveDoctor}>
        <div className="admin-form-head">
          <h3>{doctorForm._id ? "Edit doctor" : "Create doctor"}</h3>
          <button className="button button-secondary admin-small-button" onClick={() => setDoctorForm(emptyDoctor)} type="button">
            New
          </button>
        </div>
        <label>
          Name
          <input onChange={(event) => setDoctorForm((current) => ({ ...current, name: event.target.value }))} value={doctorForm.name} />
        </label>
        <label>
          Initials
          <input onChange={(event) => setDoctorForm((current) => ({ ...current, initials: event.target.value }))} value={doctorForm.initials} />
        </label>
        <label>
          Role
          <input onChange={(event) => setDoctorForm((current) => ({ ...current, role: event.target.value }))} value={doctorForm.role} />
        </label>
        <label>
          Schedule
          <input onChange={(event) => setDoctorForm((current) => ({ ...current, schedule: event.target.value }))} value={doctorForm.schedule} />
        </label>
        <label>
          Focus areas
          <input
            onChange={(event) => setDoctorForm((current) => ({ ...current, focus: event.target.value }))}
            placeholder="LASIK, SMILE, Premium IOL"
            value={doctorForm.focus}
          />
        </label>
        <label>
          Experience
          <input onChange={(event) => setDoctorForm((current) => ({ ...current, experience: event.target.value }))} value={doctorForm.experience} />
        </label>
        <label>
          Education
          <input onChange={(event) => setDoctorForm((current) => ({ ...current, education: event.target.value }))} value={doctorForm.education} />
        </label>
        <label>
          Bio
          <textarea onChange={(event) => setDoctorForm((current) => ({ ...current, bio: event.target.value }))} rows="5" value={doctorForm.bio} />
        </label>
        <label>
          Display order
          <input
            onChange={(event) => setDoctorForm((current) => ({ ...current, displayOrder: Number(event.target.value) }))}
            type="number"
            value={doctorForm.displayOrder}
          />
        </label>
        <div className="admin-inline-checks">
          <label>
            <input
              checked={doctorForm.featured}
              onChange={(event) => setDoctorForm((current) => ({ ...current, featured: event.target.checked }))}
              type="checkbox"
            />
            Featured
          </label>
          <label>
            <input
              checked={doctorForm.active}
              onChange={(event) => setDoctorForm((current) => ({ ...current, active: event.target.checked }))}
              type="checkbox"
            />
            Active
          </label>
        </div>
        <button className="button button-primary" type="submit">
          {doctorForm._id ? "Update doctor" : "Create doctor"}
        </button>
      </form>

      <div className="admin-list-card">
        {doctors.map((doctor) => (
          <article className="admin-list-row admin-list-row-block" key={doctor._id}>
            <div>
              <strong>{doctor.name}</strong>
              <p>{doctor.role}</p>
            </div>
            <div className="admin-row-actions">
              <button className="button button-secondary admin-small-button" onClick={() => setDoctorForm(normalizeDoctor(doctor))} type="button">
                Edit
              </button>
              <button className="button button-secondary admin-small-button" onClick={() => deleteDoctor(doctor._id)} type="button">
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="admin-editor-layout">
      <form className="admin-form-card" onSubmit={saveService}>
        <div className="admin-form-head">
          <h3>{serviceForm._id ? "Edit service" : "Create service"}</h3>
          <button className="button button-secondary admin-small-button" onClick={() => setServiceForm(emptyService)} type="button">
            New
          </button>
        </div>
        <label>
          Title
          <input onChange={(event) => setServiceForm((current) => ({ ...current, title: event.target.value }))} value={serviceForm.title} />
        </label>
        <label>
          Subtitle
          <input onChange={(event) => setServiceForm((current) => ({ ...current, subtitle: event.target.value }))} value={serviceForm.subtitle} />
        </label>
        <label>
          Accent
          <input onChange={(event) => setServiceForm((current) => ({ ...current, accent: event.target.value }))} value={serviceForm.accent} />
        </label>
        <label>
          Treatments
          <input
            onChange={(event) => setServiceForm((current) => ({ ...current, treatments: event.target.value }))}
            placeholder="Comprehensive Exams, Risk Detection"
            value={serviceForm.treatments}
          />
        </label>
        <label>
          Description
          <textarea
            onChange={(event) => setServiceForm((current) => ({ ...current, description: event.target.value }))}
            rows="5"
            value={serviceForm.description}
          />
        </label>
        <label>
          Display order
          <input
            onChange={(event) => setServiceForm((current) => ({ ...current, displayOrder: Number(event.target.value) }))}
            type="number"
            value={serviceForm.displayOrder}
          />
        </label>
        <div className="admin-inline-checks">
          <label>
            <input
              checked={serviceForm.featured}
              onChange={(event) => setServiceForm((current) => ({ ...current, featured: event.target.checked }))}
              type="checkbox"
            />
            Featured
          </label>
          <label>
            <input
              checked={serviceForm.active}
              onChange={(event) => setServiceForm((current) => ({ ...current, active: event.target.checked }))}
              type="checkbox"
            />
            Active
          </label>
        </div>
        <button className="button button-primary" type="submit">
          {serviceForm._id ? "Update service" : "Create service"}
        </button>
      </form>

      <div className="admin-list-card">
        {services.map((service) => (
          <article className="admin-list-row admin-list-row-block" key={service._id}>
            <div>
              <strong>{service.title}</strong>
              <p>{service.subtitle}</p>
            </div>
            <div className="admin-row-actions">
              <button className="button button-secondary admin-small-button" onClick={() => setServiceForm(normalizeService(service))} type="button">
                Edit
              </button>
              <button className="button button-secondary admin-small-button" onClick={() => deleteService(service._id)} type="button">
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="admin-editor-layout">
      <form className="admin-form-card" onSubmit={saveInsight}>
        <div className="admin-form-head">
          <h3>{insightForm._id ? "Edit insight" : "Create insight"}</h3>
          <button className="button button-secondary admin-small-button" onClick={() => setInsightForm(emptyInsight)} type="button">
            New
          </button>
        </div>
        <label>
          Title
          <input onChange={(event) => setInsightForm((current) => ({ ...current, title: event.target.value }))} value={insightForm.title} />
        </label>
        <label>
          Category
          <input onChange={(event) => setInsightForm((current) => ({ ...current, category: event.target.value }))} value={insightForm.category} />
        </label>
        <label>
          Excerpt
          <textarea
            onChange={(event) => setInsightForm((current) => ({ ...current, excerpt: event.target.value }))}
            rows="4"
            value={insightForm.excerpt}
          />
        </label>
        <label>
          Content
          <textarea
            onChange={(event) => setInsightForm((current) => ({ ...current, content: event.target.value }))}
            rows="6"
            value={insightForm.content}
          />
        </label>
        <label>
          Display order
          <input
            onChange={(event) => setInsightForm((current) => ({ ...current, displayOrder: Number(event.target.value) }))}
            type="number"
            value={insightForm.displayOrder}
          />
        </label>
        <label>
          Status
          <select onChange={(event) => setInsightForm((current) => ({ ...current, status: event.target.value }))} value={insightForm.status}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </label>
        <div className="admin-inline-checks">
          <label>
            <input
              checked={insightForm.featured}
              onChange={(event) => setInsightForm((current) => ({ ...current, featured: event.target.checked }))}
              type="checkbox"
            />
            Featured
          </label>
        </div>
        <button className="button button-primary" type="submit">
          {insightForm._id ? "Update insight" : "Create insight"}
        </button>
      </form>

      <div className="admin-list-card">
        {insights.map((insight) => (
          <article className="admin-list-row admin-list-row-block" key={insight._id}>
            <div>
              <strong>{insight.title}</strong>
              <p>
                {insight.category} | {insight.status}
              </p>
            </div>
            <div className="admin-row-actions">
              <button className="button button-secondary admin-small-button" onClick={() => setInsightForm(normalizeInsight(insight))} type="button">
                Edit
              </button>
              <button className="button button-secondary admin-small-button" onClick={() => deleteInsight(insight._id)} type="button">
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <form className="admin-form-card admin-settings-form" onSubmit={saveSettings}>
      <label>
        Brand name
        <input onChange={(event) => setSettings((current) => ({ ...current, brandName: event.target.value }))} value={settingsForm.brandName || ""} />
      </label>
      <label>
        Signature
        <input onChange={(event) => setSettings((current) => ({ ...current, signature: event.target.value }))} value={settingsForm.signature || ""} />
      </label>
      <label>
        Tagline
        <input onChange={(event) => setSettings((current) => ({ ...current, tagline: event.target.value }))} value={settingsForm.tagline || ""} />
      </label>
      <label>
        Phone
        <input onChange={(event) => setSettings((current) => ({ ...current, phone: event.target.value }))} value={settingsForm.phone || ""} />
      </label>
      <label>
        WhatsApp
        <input onChange={(event) => setSettings((current) => ({ ...current, whatsapp: event.target.value }))} value={settingsForm.whatsapp || ""} />
      </label>
      <label>
        Email
        <input onChange={(event) => setSettings((current) => ({ ...current, email: event.target.value }))} value={settingsForm.email || ""} />
      </label>
      <label>
        Location
        <input onChange={(event) => setSettings((current) => ({ ...current, location: event.target.value }))} value={settingsForm.location || ""} />
      </label>
      <label>
        Hours
        <input onChange={(event) => setSettings((current) => ({ ...current, hours: event.target.value }))} value={settingsForm.hours || ""} />
      </label>
      <label>
        About headline
        <input
          onChange={(event) => setSettings((current) => ({ ...current, aboutHeadline: event.target.value }))}
          value={settingsForm.aboutHeadline || ""}
        />
      </label>
      <label>
        About summary
        <textarea
          onChange={(event) => setSettings((current) => ({ ...current, aboutSummary: event.target.value }))}
          rows="5"
          value={settingsForm.aboutSummary || ""}
        />
      </label>
      <button className="button button-primary" type="submit">
        Save site settings
      </button>
    </form>
  );

  const sectionTitle = sections.find((section) => section.id === activeSection)?.label || "Dashboard";

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <div>
          <p className="eyebrow">EyeCon Control</p>
          <h1>Admin Panel</h1>
          <p className="admin-sidebar-copy">
            Manage the clinic website, incoming patient requests, and the content shown across the public frontend.
          </p>
        </div>

        <nav className="admin-nav">
          {sections.map((section) => (
            <button
              className={`admin-nav-button${activeSection === section.id ? " admin-nav-button-active" : ""}`}
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              type="button"
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <p>
            Signed in as <strong>{admin?.name}</strong>
          </p>
          <button className="button button-secondary admin-logout-button" onClick={logout} type="button">
            Sign out
          </button>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="eyebrow">Workspace</p>
            <h2>{sectionTitle}</h2>
          </div>
          <button className="button button-secondary admin-small-button" onClick={loadAdminData} type="button">
            Refresh data
          </button>
        </header>

        <p className={`admin-feedback${feedback ? " admin-feedback-active" : ""}`}>
          {feedback || (loading ? "Loading admin data..." : "Admin panel is connected to the EyeCon backend.")}
        </p>

        {activeSection === "dashboard" && renderDashboard()}
        {activeSection === "appointments" && renderAppointments()}
        {activeSection === "messages" && renderMessages()}
        {activeSection === "doctors" && renderDoctors()}
        {activeSection === "services" && renderServices()}
        {activeSection === "insights" && renderInsights()}
        {activeSection === "settings" && renderSettings()}
      </section>
    </main>
  );
}
