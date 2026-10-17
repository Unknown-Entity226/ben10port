import { motion } from "framer-motion";
import { sectionMeta } from "../data/portfolioData.js";

export default function ActivationTransition({ section }) {
  const selected = sectionMeta.find((item) => item.id === section) || sectionMeta[0];
  return (
    <motion.div
      className="activation-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      aria-live="assertive"
    >
      <motion.div
        className="activation-ring"
        initial={{ scale: 0, opacity: 0.95 }}
        animate={{ scale: 20, opacity: 0 }}
        transition={{ duration: 0.78, ease: "easeOut" }}
      />
      <div className="activation-label">
        <span className="live-dot" /> OPENING FILE{" "}
        <b>{selected.name.toUpperCase()}</b>
        <span className="activation-label__dots">···</span>
      </div>
    </motion.div>
  );
}
