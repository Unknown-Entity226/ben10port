import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, SkipForward } from "lucide-react";

export default function IntroSequence({ reducedMotion, onComplete }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, reducedMotion ? 80 : 2800);
    return () => window.clearTimeout(timer);
  }, [onComplete, reducedMotion]);

  return (
    <motion.main
      className="intro-screen"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.025 }}
      transition={{ duration: reducedMotion ? 0 : 0.5 }}
    >
      <div className="intro-stars" aria-hidden="true" />
      <div className="intro-meta">
        <span className="brand-mark">
          <span className="brand-mark__dot" /> OMNITRIX OS
        </span>
        <span>PERSONAL ARCHIVE · 001</span>
      </div>
      <button className="skip-button" type="button" onClick={onComplete}>
        Skip intro <SkipForward size={14} />
      </button>
      <div className="intro-center">
        <div className="cosmic-emblem" aria-hidden="true">
          <motion.i
            className="cosmic-orb cosmic-orb--one"
            animate={reducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.i
            className="cosmic-orb cosmic-orb--two"
            animate={reducedMotion ? {} : { rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
          <div className="cosmic-core">
            <span>×</span>
          </div>
          <i className="cosmic-star cosmic-star--a" />
          <i className="cosmic-star cosmic-star--b" />
          <i className="cosmic-star cosmic-star--c" />
        </div>
        <motion.p
          className="intro-overline"
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          AN INTERACTIVE PORTFOLIO
        </motion.p>
        <motion.h1
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          A universe of
          <br />
          <span>things made.</span>
        </motion.h1>
        <motion.p
          className="intro-copy"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Curiosity is the source code. Take a look around.
        </motion.p>
      </div>
      <div className="intro-bottom">
        <span>INITIALIZING PERSONAL ARCHIVE</span>
        <span>
          100<span className="muted">%</span>
        </span>
        <div className="intro-progress">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: reducedMotion ? 0 : 2.3,
              ease: "easeInOut",
            }}
          />
        </div>
        <button type="button" className="enter-link" onClick={onComplete}>
          Enter experience <ArrowUpRight size={15} />
        </button>
      </div>
    </motion.main>
  );
}
