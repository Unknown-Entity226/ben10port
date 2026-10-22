import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { sectionIcons, sectionMeta } from "../data/portfolioData.js";
import HologramPreview from "./HologramPreview.jsx";
import OmnitrixModel from "./OmnitrixModel.jsx";
import SidebarNav from "./SidebarNav.jsx";

export default function OmnitrixInterface({
  stage,
  activeSection,
  activeIndex,
  locked,
  onRotate,
  onActivate,
  onGoToSection,
  onReturnHome,
  onTriggerStandby,
}) {
  const touchStart = useRef(null);
  const wheelAt = useRef(0);
  const isStandby = stage === "home";
  const selected = sectionMeta[activeIndex] || sectionMeta[0];
  const ActiveIcon =
    (activeSection && sectionIcons[activeSection]) ||
    sectionIcons[selected?.id] ||
    (() => null);

  function handleTouchStart(event) {
    if (isStandby) return;
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }
  function handleTouchEnd(event) {
    if (isStandby || !touchStart.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy))
      onRotate(dx < 0 ? "next" : "prev");
    touchStart.current = null;
  }
  function handleWheel(event) {
    if (isStandby || Math.abs(event.deltaY) < 18) return;
    const now = Date.now();
    if (now - wheelAt.current < 250) return;
    event.preventDefault();
    wheelAt.current = now;
    onRotate(event.deltaY > 0 ? "next" : "prev");
  }

  return (
    <main
      className={`omnitrix-page${stage === "preview" ? " omnitrix-page--preview" : ""}${isStandby ? " omnitrix-page--standby" : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <div className="site-grid" aria-hidden="true" />
      <header className="topbar">
        <a
          className="brand"
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            if (!isStandby) onReturnHome?.();
          }}
          title={isStandby ? "Omnitrix Standby Mode" : "Return to Standby Home"}
        >
          <span className="brand-mark">
            <span className="brand-mark__dot" /> OMNITRIX
            <span className="brand__os">OS</span>
          </span>
          <span className="brand-sub">
            {isStandby ? "STANDBY MODE" : "ACTIVE DIAL"}
          </span>
        </a>
        <div className="topbar-status">
          <span className={`live-dot${isStandby ? "" : " live-dot--active"}`} />
          <span>{isStandby ? "STANDBY" : "DIAL ONLINE"}</span>
          <span className="topbar-status__divider">|</span>
          {isStandby ? (
            <span>CLICK CORE TO INITIALIZE</span>
          ) : (
            <button
              type="button"
              className="standby-toggle-btn"
              onClick={onReturnHome}
              title="Return to Standby Home"
            >
              STANDBY
            </button>
          )}
        </div>
      </header>
      <section
        className="nav-layout"
        aria-label="Omnitrix portfolio navigation"
      >
        {/* Left Sidenav Bar: animates in from left */}
        <motion.aside
          className="desktop-rail"
          animate={{
            x: isStandby ? -140 : 0,
            opacity: isStandby ? 0 : 1,
          }}
          transition={{
            duration: 0.65,
            delay: isStandby ? 0 : 0.25,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          style={{ pointerEvents: isStandby ? "none" : "auto" }}
        >
          <SidebarNav activeSection={activeSection} onSelect={onGoToSection} />
        </motion.aside>

        <div className="nav-main">
          <div className="selection-scene">
            {/* Hologram Preview: floats down into view */}
            <motion.div
              style={{
                width: "100%",
                pointerEvents: isStandby ? "none" : "auto",
              }}
              aria-hidden={isStandby}
              inert={isStandby}
              animate={{
                opacity: isStandby ? 0 : 1,
                y: isStandby ? -30 : 0,
                scale: isStandby ? 0.94 : 1,
              }}
              transition={{
                duration: 0.6,
                delay: isStandby ? 0 : 0.35,
                ease: "easeOut",
              }}
            >
              <HologramPreview
                activeIndex={activeIndex}
                locked={locked || isStandby}
                onRotate={onRotate}
                onActivate={onActivate}
              />
            </motion.div>

            {/* Watch with ease-in-out glide from center to bottom */}
            <OmnitrixModel
              activeIndex={activeIndex}
              locked={locked}
              isStandby={isStandby}
              onActivate={onActivate}
              onRotate={onRotate}
              onGoToSection={onGoToSection}
              onTriggerStandby={onTriggerStandby}
            />

            {/* Tactical Standby Prompt beneath watch in center */}
            <motion.div
              className="home-prompt home-prompt--overlay"
              animate={{
                opacity: isStandby ? 1 : 0,
                y: isStandby ? 0 : 25,
              }}
              transition={{ duration: 0.4, delay: isStandby ? 0.2 : 0 }}
              style={{ pointerEvents: isStandby ? "auto" : "none" }}
              onClick={onTriggerStandby}
              role="button"
              tabIndex={0}
            >
              <span className="home-prompt__brackets">[</span>
              <span className="home-prompt__text">CLICK CORE TO ACTIVATE</span>
              <span className="home-prompt__brackets">]</span>
            </motion.div>
          </div>

          {/* Navigation Footer: slides up from bottom */}
          <motion.div
            className="navigation-footer"
            animate={{
              opacity: isStandby ? 0 : 1,
              y: isStandby ? 30 : 0,
            }}
            transition={{
              duration: 0.55,
              delay: isStandby ? 0 : 0.28,
              ease: "easeOut",
            }}
            style={{ pointerEvents: isStandby ? "none" : "auto" }}
          >
            <div className="dial-controls">
              <button
                type="button"
                onClick={() => onRotate("prev")}
                disabled={locked || isStandby}
                aria-label="Previous section"
              >
                <ArrowLeft size={16} />
              </button>
              <span className="dial-control-label">ROTATE</span>
              <button
                type="button"
                onClick={() => onRotate("next")}
                disabled={locked || isStandby}
                aria-label="Next section"
              >
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="selection-count">
              <span>0{activeIndex + 1}</span>
              <i />
              <span>06</span>
              <b>{selected.name.toUpperCase()}</b>
            </div>
            <div className="key-hints">
              <span>
                <kbd>←</kbd>
                <kbd>→</kbd> NAVIGATE
              </span>
              <span>
                <kbd>↵</kbd> SELECT
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Info Area: animates in from right */}
        <motion.aside
          className="info-rail"
          animate={{
            x: isStandby ? 140 : 0,
            opacity: isStandby ? 0 : 1,
          }}
          transition={{
            duration: 0.65,
            delay: isStandby ? 0 : 0.25,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          style={{ pointerEvents: isStandby ? "none" : "auto" }}
        >
          <div className="active-file-icon">
            <span className="active-file-orbit" />
            <span className="active-file-orbit active-file-orbit--inner" />
            <ActiveIcon size={22} strokeWidth={1.5} />
          </div>
          <h2>
            {selected.name}
            <span>.</span>
          </h2>
          <p className="info-rail__copy">{selected.summary}</p>
          <div className="info-rail__metric">
            <span>{selected.metric}</span>
            <small>{selected.metricLabel}</small>
          </div>
          <div className="info-rail__rule" />
        </motion.aside>
      </section>
      {!isStandby && (
        <div className="mobile-dock">
          <button
            className="mobile-dock__arrow"
            type="button"
            aria-label="Previous section"
            onClick={() => onRotate("prev")}
            disabled={locked}
          >
            <ArrowLeft size={16} />
          </button>
          <div className="mobile-dock__center">
            <strong>{selected.name}</strong>
            <div className="mobile-dock__dots" aria-label="Jump to section">
              {sectionMeta.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  aria-label={`Open ${section.name}`}
                  aria-pressed={section.id === activeSection}
                  onClick={() => onGoToSection(section.id)}
                  disabled={locked}
                />
              ))}
            </div>
          </div>
          <button
            className="mobile-dock__arrow"
            type="button"
            aria-label="Next section"
            onClick={() => onRotate("next")}
            disabled={locked}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </main>
  );
}
