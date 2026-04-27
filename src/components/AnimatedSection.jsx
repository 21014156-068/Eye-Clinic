import { motion } from "framer-motion";

export function AnimatedSection({
  as = "section",
  className = "",
  children,
  id,
  delay = 0,
  amount = 0.24,
}) {
  const MotionTag = as === "div" ? motion.div : motion.section;

  return (
    <MotionTag
      id={id}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
