import { motion } from "framer-motion";
import { sectionIcons, sectionMeta } from "../data/portfolioData.js";
import { relativeOffset } from "../utils/dial.js";

export default function HologramPreview({
  activeIndex,
  locked,
  onRotate,
  onActivate,
}) {
  const active = sectionMeta[activeIndex] || sectionMeta[0];
  const ActiveIcon = sectionIcons[active.id] || (() => null);
  return (
    <section
      className="projection"
      aria-label="Portfolio section selector"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          onRotate("prev");
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          onRotate("next");
        }
      }}
    >
      <div className="carousel-stage" style={{ perspective: 1000 }}>
        <div className="carousel-track">
          {sectionMeta.map((section, index) => {
            const offset = relativeOffset(index, activeIndex);
            const Icon = sectionIcons[section.id];
            const isActive = offset === 0;
            const hidden = Math.abs(offset) > 2;
            const clickCard = () => {
              if (locked) return;
              if (isActive) onActivate();
              else onRotate(offset < 0 ? "prev" : "next");
            };
            return (
              <motion.button
                key={section.id}
                type="button"
                className={`holo-card${isActive ? " holo-card--active" : ""}`}
                style={{ "--card-accent": section.accent }}
                animate={{
                  x: offset * 212,
                  y: Math.abs(offset) * 9,
                  z: isActive ? 72 : -Math.abs(offset) * 55,
                  scale: isActive
                    ? 1
                    : 0.82 - Math.min(Math.abs(offset), 2) * 0.035,
                  rotateY: offset === 0 ? 0 : offset < 0 ? 23 : -23,
                  opacity: hidden
                    ? 0
                    : isActive
                      ? 1
                      : Math.abs(offset) === 1
                        ? 0.48
                        : 0.19,
                  zIndex: 10 - Math.abs(offset),
                }}
                transition={{
                  type: "spring",
                  stiffness: 95,
                  damping: 19,
                  mass: 0.8,
                }}
                onClick={clickCard}
                disabled={locked || hidden}
                aria-pressed={isActive}
                aria-hidden={hidden}
                tabIndex={hidden || !isActive ? -1 : 0}
              >
                <span className="holo-card__top">
                  <span>{section.label}</span>
                  <span>0{section.index + 1}</span>
                </span>
                <span className="holo-card__icon">
                  <Icon size={27} strokeWidth={1.55} />
                </span>
                <span className="holo-card__name">{section.name}</span>
                <span className="holo-card__bottom">
                  {isActive ? "SELECTED" : ""}
                </span>
                <span className="holo-card__scan" aria-hidden="true" />
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
