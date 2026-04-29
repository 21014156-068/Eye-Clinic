import { startTransition, useState, useEffect } from "react";
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

  // 3D Motion States
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  if (ready && isAuthenticated) {
    return <Navigate replace to="/admin" />;
  }

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await login(form);
      startTransition(() => setError(""));
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;

    // Enhanced 3D Tilt sensitivity
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotate({ x: rotateX, y: rotateY });
  };

  return (
    <main style={styles.container}>
      <style>
        {`
          @keyframes entrySpring {
            0% { transform: scale(0.9) translateY(30px); opacity: 0; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes bgPulse {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .input-3d {
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1) !important;
          }
          .input-3d:focus {
            transform: translateZ(40px) scale(1.02) !important;
            border-bottom: 2px solid #000 !important;
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
            outline: none;
          }
          .btn-3d {
            position: relative;
            overflow: hidden;
          }
          .btn-3d:hover {
            transform: translateZ(60px) translateY(-5px) !important;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3) !important;
          }
          .btn-3d:active {
            transform: translateZ(10px) scale(0.98) !important;
          }
          .bg-blob {
            position: absolute;
            filter: blur(80px);
            z-index: 0;
            animation: float 10s infinite ease-in-out;
            opacity: 0.4;
          }

          /* Responsive Breakpoint for Small Screens */
          @media (max-width: 600px) {
            .admin-card {
              width: 90% !important;
              padding: 30px 20px !important;
              margin: 20px;
            }
          }
        `}
      </style>

      {/* Decorative Background Elements */}
      <div
        className="bg-blob"
        style={{
          top: "10%",
          left: "10%",
          width: "300px",
          height: "300px",
          background: "#e0e0e0",
          borderRadius: "50%",
        }}
      />
      <div
        className="bg-blob"
        style={{
          bottom: "10%",
          right: "10%",
          width: "400px",
          height: "400px",
          background: "#f5f5f5",
          borderRadius: "50%",
          animationDelay: "-5s",
        }}
      />

      <div style={styles.perspectiveLayer}>
        <div
          className="admin-card"
          style={{
            ...styles.card,
            transform: isHovered
              ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
              : "rotateX(0deg) rotateY(0deg)",
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setRotate({ x: 0, y: 0 });
          }}
        >
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={{ ...styles.layer, transform: "translateZ(100px)" }}>
              <h1 style={styles.title}>EYECON</h1>
              <div style={styles.subtitle}>ADMINISTRATIVE GATEWAY</div>
            </div>

            <div
              style={{
                ...styles.layer,
                transform: "translateZ(50px)",
                gap: "30px",
              }}
            >
              <div style={styles.fieldWrapper}>
                <label style={styles.label}>Email Address</label>
                <input
                  className="input-3d"
                  style={styles.input}
                  onChange={handleChange("email")}
                  type="email"
                  value={form.email}
                  placeholder="Enter admin email"
                />
              </div>

              <div style={styles.fieldWrapper}>
                <label style={styles.label}>PASSWORD</label>
                <input
                  className="input-3d"
                  style={styles.input}
                  onChange={handleChange("password")}
                  type="password"
                  value={form.password}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div style={{ ...styles.layer, transform: "translateZ(80px)" }}>
              <button
                className="btn-3d"
                disabled={submitting}
                type="submit"
                style={styles.button}
              >
                {submitting ? "VERIFYING..." : "AUTHORIZE ACCESS"}
              </button>
            </div>

            <div style={{ ...styles.layer, transform: "translateZ(30px)" }}>
              <p style={{ ...styles.error, color: error ? "#ff4d4d" : "#999" }}>
                {error || "Encrypted Session"}
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(-45deg, #ffffff, #f9f9f9, #ffffff)",
    backgroundSize: "400% 400%",
    animation: "bgPulse 15s ease infinite",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    overflow: "hidden",
    position: "relative",
  },
  perspectiveLayer: {
    perspective: "2000px",
    zIndex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    // Increased size for Desktop
    width: "550px",
    padding: "70px 60px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(20px)",
    borderRadius: "40px",
    transformStyle: "preserve-3d",
    transition: "transform 0.15s ease-out",
    boxShadow: "0 40px 100px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.1)",
    border: "1px solid rgba(255,255,255,0.7)",
    animation: "entrySpring 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "45px",
    transformStyle: "preserve-3d",
  },
  layer: {
    display: "flex",
    flexDirection: "column",
    transformStyle: "preserve-3d",
  },
  title: {
    margin: 0,
    fontSize: "48px",
    fontWeight: "900",
    textAlign: "center",
    color: "#000",
    letterSpacing: "-2px",
    textShadow: "0 10px 20px rgba(0,0,0,0.05)",
  },
  subtitle: {
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "5px",
    textAlign: "center",
    color: "#bbb",
    marginTop: "8px",
    textTransform: "uppercase",
  },
  fieldWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    transformStyle: "preserve-3d",
  },
  label: {
    fontSize: "12px",
    fontWeight: "800",
    textTransform: "uppercase",
    color: "#555",
    marginLeft: "2px",
  },
  input: {
    width: "100%",
    padding: "15px 5px",
    fontSize: "18px",
    fontWeight: "500",
    border: "none",
    borderBottom: "1px solid #ddd",
    backgroundColor: "transparent",
    color: "#000",
    transform: "translateZ(0px)",
  },
  button: {
    padding: "22px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "16px",
    fontSize: "15px",
    fontWeight: "800",
    letterSpacing: "1px",
    cursor: "pointer",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
    transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
  },
  error: {
    fontSize: "12px",
    textAlign: "center",
    margin: 0,
    fontWeight: "600",
    letterSpacing: "0.5px",
  },
};
