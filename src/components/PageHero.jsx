import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ImmersiveScene = lazy(() => import("./ImmersiveScene"));

function ActionButton({ action }) {
  const className = `button ${action.kind === "secondary" ? "button-secondary" : "button-primary"}`;

  if (action.href.startsWith("/")) {
    return (
      <Link className={className} to={action.href}>
        {action.label}
      </Link>
    );
  }

  
  return (
    <a className={className} href={action.href}>
      {action.label}
    </a>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  metrics,
  actions,
  chips,
  sceneVariant = "home",
}) {
  return (
    <section className={`hero-band hero-band-${sceneVariant}`}>
      <div className="hero-shell">
        <div className="hero-grid">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.52,
              delay: 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
            <p className="hero-description">{description}</p>

            <div className="hero-actions">
              {actions.map((action) => (
                <ActionButton action={action} key={action.label} />
              ))}
            </div>

            <div className="hero-metrics">
              {metrics.map((metric) => (
                <article className="metric-card" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <p>{metric.label}</p>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.97, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.62,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className={`scene-card scene-card-${sceneVariant}`}>
              <div className="scene-chip chip-top">
                <span>{chips[0].label}</span>
                <strong>{chips[0].value}</strong>
              </div>
              <div className="scene-chip chip-bottom">
                <span>{chips[1].label}</span>
                <strong>{chips[1].value}</strong>
              </div>
              <Suspense
                fallback={
                  <div className="scene-loading">Loading 3D field...</div>
                }
              >
                <ImmersiveScene variant={sceneVariant} />
              </Suspense>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
