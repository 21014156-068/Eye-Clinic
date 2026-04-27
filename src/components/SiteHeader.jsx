import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { brand, navigation } from "../data/siteContent";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header-wrap">
      <div className="site-header">
        <Link className="brand-lockup" to="/">
          <span className="brand-mark">EC</span>
          <span className="brand-copy">
            <strong>{brand.name}</strong>
            <span>{brand.signature}</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`}
              end={item.to === "/"}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="button button-secondary header-cta" to="/appointment">
            Book Appointment
          </Link>
          <button
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className="menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="mobile-nav-panel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.26 }}
          >
            {navigation.map((item) => (
              <NavLink
                className={({ isActive }) => `mobile-link${isActive ? " mobile-link-active" : ""}`}
                end={item.to === "/"}
                key={item.to}
                onClick={() => setMenuOpen(false)}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
