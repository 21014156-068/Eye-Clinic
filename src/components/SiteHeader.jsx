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
      {/* Scoped CSS to make the CTA fully responsive without breaking your design */}
      <style>{`
        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        
        .header-cta {
          white-space: nowrap !important;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .cta-short-text {
          display: none;
        }

        /* Tablet adjustments */
        @media (max-width: 768px) {
          .header-cta {
            padding: 0 16px !important;
            font-size: 0.9rem !important;
            min-height: 40px !important;
          }
        }

        /* Small Mobile adjustments */
        @media (max-width: 480px) {
          .header-cta {
            padding: 0 14px !important;
            font-size: 0.85rem !important;
            min-height: 36px !important;
            letter-spacing: 0.02em;
          }
          /* Gracefully shorten the text on tiny screens to prevent layout breakage */
          .cta-full-text {
            display: none;
          }
          .cta-short-text {
            display: inline;
          }
        }
      `}</style>

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
              className={({ isActive }) =>
                `nav-link${isActive ? " nav-link-active" : ""}`
              }
              end={item.to === "/"}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link
            className="button button-secondary header-cta"
            to="/appointment"
          >
            <span className="cta-full-text">Book Appointment</span>
            <span className="cta-short-text">Book</span>
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
                className={({ isActive }) =>
                  `mobile-link${isActive ? " mobile-link-active" : ""}`
                }
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
