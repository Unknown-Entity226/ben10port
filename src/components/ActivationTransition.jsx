import { motion } from "framer-motion";
import { sectionMeta } from "../data/portfolioData.js";

export default function ActivationTransition({ section, reducedMotion }) {
  const selected = sectionMeta.find((item) => item.id === section);
  return (
    <motion.div
      className="activation-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
      aria-live="assertive"
    >
      <motion.div
        className="activation-ring"
        initial={{ scale: 0, opacity: 0.95 }}
        animate={{ scale: reducedMotion ? 1 : 20, opacity: 0 }}
        transition={{ duration: reducedMotion ? 0.1 : 0.78, ease: "easeOut" }}
      />
      <div className="activation-label">
        <span className="live-dot" /> OPENING FILE{" "}
        <b>{selected.name.toUpperCase()}</b>
        <span className="activation-label__dots">···</span>
      </div>
    </motion.div>
  );
}
