import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import watchDialer from "../assets/omnitrix-watch.svg";
import { playSound } from "../utils/soundEffects.js";

export default function HomeSection({ onTrigger }) {
  const [isActivating, setIsActivating] = useState(false);

  const handleActivate = useCallback(() => {
    if (isActivating) return;
    setIsActivating(true);
    playSound("activate");
    window.setTimeout(() => {
      onTrigger?.();
    }, 240);
  }, [isActivating, onTrigger]);

  return (
    <motion.main
      className="omnitrix-page home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="site-grid" aria-hidden="true" />

      {/* Header */}
      <header className="topbar">
        <a
          className="brand"
          href="#top"
          onClick={(event) => event.preventDefault()}
        >
          <span className="brand-mark">
            <span className="brand-mark__dot" /> OMNITRIX
            <span className="brand__os">OS</span>
          </span>
          <span className="brand-sub">STANDBY MODE</span>
        </a>
        <div className="topbar-status">
          <span className="live-dot" />
          <span>STANDBY</span>
          <span className="topbar-status__divider">|</span>
          <span>PRESS CORE TO INITIALIZE</span>
        </div>
      </header>

      {/* Home Center Stage: Only the Watch + Ambient Glow + Core Button */}
      <div className="home-center-stage">
        <div className="home-ambient-glow" aria-hidden="true" />

        <div className={`home-watch-wrap${isActivating ? " home-watch-wrap--activating" : ""}`}>
          <img
            className="home-watch-img"
            src={watchDialer}
            alt="Omnitrix"
            draggable={false}
          />

          {/* Center Watch Dial Core Button */}
          <button
            type="button"
            className={`home-core-btn${isActivating ? " home-core-btn--activating" : ""}`}
            onClick={handleActivate}
            aria-label="Activate Omnitrix"
          >
            
          </button>
        </div>

        {/* Tactical HUD prompt below watch */}
        <div className="home-prompt" onClick={handleActivate} role="button" tabIndex={0}>
          <span className="home-prompt__brackets">[</span>
          <span className="home-prompt__text">CLICK CORE TO ACTIVATE</span>
          <span className="home-prompt__brackets">]</span>
        </div>
      </div>
    </motion.main>
  );
}

