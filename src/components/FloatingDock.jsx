import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function FloatingDock({ brand }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: [0, -6, 0] }}
      className="floating-dock"
      initial={{ opacity: 0, y: 24 }}
      transition={{
        opacity: { duration: 0.45 },
        y: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <Link className="floating-button floating-button-primary" to="/appointment">
        Book
      </Link>
      <a className="floating-button" href={`tel:${brand.phone.replace(/\s+/g, "")}`}>
        Call
      </a>
      <a className="floating-button" href={`mailto:${brand.email}`}>
        Email
      </a>
      <a className="floating-button" href={`https://wa.me/${brand.whatsapp}`}>
        WhatsApp
      </a>
    </motion.div>
  );
}
