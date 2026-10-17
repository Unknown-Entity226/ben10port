import { motion } from "framer-motion";
import { sectionMeta } from "../data/portfolioData.js";

export default function OmnitrixModel({
  activeIndex,
  locked,
  reducedMotion,
  onActivate,
}) {
  return (
    <div className={`watch-wrap${locked ? " watch-wrap--locked" : ""}`}>
      <div className="watch-strap watch-strap--top" aria-hidden="true" />
      <div className="watch-strap watch-strap--bottom" aria-hidden="true" />
      <div className="watch-case">
        <motion.div
          className="watch-bezel"
          animate={{ rotate: reducedMotion ? 0 : activeIndex * 60 }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
          aria-hidden="true"
        >
          {sectionMeta.map((section, index) => (
            <i
              key={section.id}
              className={`bezel-mark${index === activeIndex ? " bezel-mark--active" : ""}`}
              style={{
                transform: `rotate(${index * 60}deg) translateY(-111px)`,
              }}
            />
          ))}
        </motion.div>
        <div className="watch-inner-ring" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <button
          className="watch-core"
          type="button"
          onClick={onActivate}
          disabled={locked}
          aria-label={`Activate ${sectionMeta[activeIndex].name}`}
        >
          <svg
            viewBox="0 0 100 100"
            role="img"
            aria-label="Omnitrix hourglass symbol"
          >
            <path d="M23 18h54l-8 17-13 15 13 15 8 17H23l8-17 13-15-13-15z" />
            <path
              d="M34 29h32L50 46 34 29zm0 42h32L50 54 34 71z"
              className="watch-symbol-cutout"
            />
          </svg>
          <span className="watch-core-glint" aria-hidden="true" />
        </button>
        <span className="watch-screw watch-screw--one" />
        <span className="watch-screw watch-screw--two" />
        <span className="watch-screw watch-screw--three" />
        <span className="watch-screw watch-screw--four" />
      </div>
      <div className="watch-caption">
        <span>MK. X · PERSONAL ARCHIVE</span>
        <span>
          PRESS TO OPEN <b>↗</b>
        </span>
      </div>
    </div>
  );
}
