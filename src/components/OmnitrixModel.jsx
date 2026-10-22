import { motion } from "framer-motion";
import watchDialer from "../assets/omnitrix-watch.svg";
import { sectionMeta } from "../data/portfolioData.js";
import HologramRing from "./HologramRing.jsx";

export default function OmnitrixModel({
  activeIndex,
  locked,
  isStandby = false,
  onActivate,
  onRotate,
  onGoToSection,
  onTriggerStandby,
}) {
  return (
    <motion.div
      className={`watch-wrap${locked ? " watch-wrap--locked" : ""}${isStandby ? " watch-wrap--standby" : ""}`}
      animate={{
        x: "-50%",
        top: isStandby ? "50%" : "100%",
        y: isStandby ? "-50%" : "-100%",
        scale: isStandby ? 1.05 : 1,
      }}
      transition={{
        duration: 0.85,
        ease: [0.65, 0, 0.35, 1], // easeInOut
      }}
    >
      <img
        className="watch-dialer-image"
        src={watchDialer}
        alt="Omnitrix Watch"
        aria-hidden="true"
      />
      <HologramRing
        activeIndex={activeIndex}
        locked={locked}
        isStandby={isStandby}
        onRotate={onRotate}
        onActivate={onActivate}
        onSelect={onGoToSection}
      />
      <button
        className={`watch-dialer-button${isStandby ? " home-core-btn" : ""}`}
        type="button"
        onClick={isStandby ? onTriggerStandby : onActivate}
        disabled={locked}
        aria-label={
          isStandby
            ? "Activate Omnitrix"
            : `Activate ${sectionMeta[activeIndex]?.name || "section"}`
        }
      >
        {isStandby && <span className="home-core-beacon" />}
        {isStandby && (
          <span className="home-core-icon" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="home-hourglass-svg">
              <polygon
                points="22,18 78,18 50,48"
                fill="#bef264"
                opacity="0.85"
              />
              <polygon
                points="22,82 78,82 50,52"
                fill="#bef264"
                opacity="0.85"
              />
              <circle cx="50" cy="50" r="8" fill="#ffffff" />
            </svg>
          </span>
        )}
      </button>
    </motion.div>
  );
}
