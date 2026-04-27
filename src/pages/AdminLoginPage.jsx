import { startTransition, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../admin/AdminAuthContext";

export default function AdminLoginPage() {
  const { isAuthenticated, login, ready } = useAdminAuth();
  const [form, setForm] = useState({
    email: "admin@eyeconclinic.com",
    password: "EyeConAdmin@123",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (ready && isAuthenticated) {
    return <Navigate replace to="/admin" />;
  }

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await login(form);
      startTransition(() => {
        setError("");
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-shell">
        <section className="admin-login-panel">
          <p className="eyebrow">EyeCon Admin</p>
          <h1>Control the clinic website, appointments, and content from one workspace.</h1>
          <p>
            This admin area manages doctors, services, insights, messages, appointments, and site settings through the
            new backend.
          </p>
        </section>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <h2>Admin login</h2>
          <label>
            Email
            <input onChange={handleChange("email")} type="email" value={form.email} />
          </label>
          <label>
            Password
            <input onChange={handleChange("password")} type="password" value={form.password} />
          </label>
          <button className="button button-primary" disabled={submitting} type="submit">
            {submitting ? "Signing in..." : "Sign in to admin"}
          </button>
          <p className={`admin-feedback${error ? " admin-feedback-error" : ""}`}>
            {error || "Default admin credentials are loaded from the local server environment."}
          </p>
        </form>
      </div>
    </main>
  );
}

