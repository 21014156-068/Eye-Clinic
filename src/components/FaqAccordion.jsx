import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-grid">
      {items.map((item, index) => {
        const isOpen = index === openIndex;

        return (
          <article className={`faq-item${isOpen ? " faq-item-open" : ""}`} key={item.question}>
            <button
              className="faq-question"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              type="button"
            >
              <span>{item.question}</span>
              <strong>{isOpen ? "-" : "+"}</strong>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  animate={{ height: "auto", opacity: 1 }}
                  className="faq-answer"
                  exit={{ height: 0, opacity: 0 }}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p>{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
