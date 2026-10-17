import { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Command,
  Orbit,
  Radio,
  ShieldCheck,
} from "lucide-react";
import { sectionIcons, sectionMeta } from "../data/portfolioData.js";
import AccessibilityControls from "./AccessibilityControls.jsx";
import HologramPreview from "./HologramPreview.jsx";
import OmnitrixModel from "./OmnitrixModel.jsx";
import SidebarNav from "./SidebarNav.jsx";

export default function OmnitrixInterface({
  stage,
  activeSection,
  activeIndex,
  sfxEnabled,
  reducedMotion,
  locked,
  onRotate,
  onActivate,
  onGoToSection,
  onToggleSfx,
  onToggleMotion,
}) {
  const touchStart = useRef(null);
  const wheelAt = useRef(0);
  const selected = sectionMeta[activeIndex];
  const ActiveIcon = sectionIcons[activeSection];
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
          href="#top"
          onClick={(event) => event.preventDefault()}
        >
          <span className="brand-mark">
            <span className="brand-mark__dot" /> OMNITRIX
            <span className="brand__os">OS</span>
          </span>
          <span className="brand-sub">A PERSONAL ARCHIVE</span>
        </a>
        <div className="topbar-status">
          <span className="live-dot" /> SYSTEM ONLINE{" "}
          <span className="topbar-status__divider">/</span> DIMENSION 001
        </div>
        <AccessibilityControls
          sfxEnabled={sfxEnabled}
          reducedMotion={reducedMotion}
          onToggleSfx={onToggleSfx}
          onToggleMotion={onToggleMotion}
          compact
        />
      </header>
      <section
        className="nav-layout"
        aria-label="Omnitrix portfolio navigation"
      >
        <aside className="desktop-rail">
          <div className="rail-heading">
            <span>INDEX</span>
            <span>06</span>
          </div>
          <SidebarNav activeSection={activeSection} onSelect={onGoToSection} />
          <div className="rail-bottom">
            <span className="rail-crosshair">+</span>
            <span>
              ARCHIVE
              <br />
              ACCESS
            </span>
            <span className="rail-bottom__code">OS / 001</span>
          </div>
        </aside>
        <div className="nav-main">
          <div className="selector-heading">
            <div>
              <span className="eyebrow">
                <span className="eyebrow-index">01</span> CHOOSE YOUR
                DESTINATION
              </span>
              <h1>
                Explore the <span>archive.</span>
              </h1>
              <p>Six coordinates. One curious mind. Pick a thread.</p>
            </div>
            <div className="heading-stamp">
              <Orbit size={17} />
              <span>
                PERSONAL
                <br />
                DATABASE
              </span>
            </div>
          </div>
          <div className="selection-scene">
            <HologramPreview
              activeIndex={activeIndex}
              reducedMotion={reducedMotion}
              locked={locked}
              onRotate={onRotate}
              onActivate={onActivate}
            />
            <OmnitrixModel
              activeIndex={activeIndex}
              locked={locked}
              reducedMotion={reducedMotion}
              onActivate={onActivate}
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
        <aside className="info-rail">
          <div className="info-rail__top">
            <span className="eyebrow">ACTIVE FILE</span>
            <span className="info-rail__serial">FILE_0{activeIndex + 1}</span>
          </div>
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
          <div className="signal-row">
            <Radio size={14} />
            <span>DATA SIGNAL</span>
            <b>STRONG</b>
          </div>
          <div className="signal-row">
            <ShieldCheck size={14} />
            <span>ACCESS</span>
            <b>OPEN</b>
          </div>
          <div className="info-rail__tip">
            <Command size={14} />
            <p>Tap the dial, press enter, or browse directly from the index.</p>
          </div>
        </aside>
      </section>
      <footer className="page-footer">
        <span>
          BUILT FROM CURIOSITY <span className="footer-star">✳</span>
        </span>
        <span>BEST VIEWED WITH YOUR IMAGINATION</span>
        <span>EARTH / SOL SYSTEM</span>
      </footer>
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
          <span>FILE 0{activeIndex + 1} / 06</span>
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
