import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
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
}) {
  const touchStart = useRef(null);
  const wheelAt = useRef(0);
  const selected = sectionMeta[activeIndex] || sectionMeta[0];
  const ActiveIcon =
    (activeSection && sectionIcons[activeSection]) ||
    sectionIcons[selected?.id] ||
    (() => null);
  function handleTouchStart(event) {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }
  function handleTouchEnd(event) {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy))
      onRotate(dx < 0 ? "next" : "prev");
    touchStart.current = null;
  }
  function handleWheel(event) {
    if (Math.abs(event.deltaY) < 18) return;
    const now = Date.now();
    if (now - wheelAt.current < 250) return;
    event.preventDefault();
    wheelAt.current = now;
    onRotate(event.deltaY > 0 ? "next" : "prev");
  }

  return (
    <main
      className={`omnitrix-page${stage === "preview" ? " omnitrix-page--preview" : ""}`}
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
            onReturnHome?.();
          }}
          title="Return to Standby Home"
        >
          <span className="brand-mark">
            <span className="brand-mark__dot" /> OMNITRIX
            <span className="brand__os">OS</span>
          </span>
          <span className="brand-sub">ACTIVE DIAL</span>
        </a>
        <div className="topbar-status">
          <span className="live-dot" />
          <span>DIAL ONLINE</span>
          <span className="topbar-status__divider">|</span>
          <button
            type="button"
            className="standby-toggle-btn"
            onClick={onReturnHome}
            title="Return to Standby Home"
          >
            STANDBY
          </button>
        </div>
      </header>
      <section
        className="nav-layout"
        aria-label="Omnitrix portfolio navigation"
      >
        <motion.aside
          className="desktop-rail"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <SidebarNav activeSection={activeSection} onSelect={onGoToSection} />
        </motion.aside>
        <div className="nav-main">
          <div className="selection-scene">
            <HologramPreview
              activeIndex={activeIndex}
              locked={locked}
              onRotate={onRotate}
              onActivate={onActivate}
            />
            <OmnitrixModel
              activeIndex={activeIndex}
              locked={locked}
              onActivate={onActivate}
              onRotate={onRotate}
              onGoToSection={onGoToSection}
            />
          </div>
          <div className="navigation-footer">
            <div className="dial-controls">
              <button
                type="button"
                onClick={() => onRotate("prev")}
                disabled={locked}
                aria-label="Previous section"
              >
                <ArrowLeft size={16} />
              </button>
              <span className="dial-control-label">ROTATE</span>
              <button
                type="button"
                onClick={() => onRotate("next")}
                disabled={locked}
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
          </div>
        </div>
        <motion.aside
          className="info-rail"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
    </main>
  );
}
