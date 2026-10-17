import { useCallback, useEffect, useRef, useState } from "react";
import { isSectionId, sectionMeta } from "../data/portfolioData.js";
import { playSound } from "../utils/soundEffects.js";

function initialState() {
  const hash =
    typeof window === "undefined" ? "" : window.location.hash.slice(1);
  return isSectionId(hash)
    ? { stage: "section", section: hash }
    : { stage: "intro", section: "about" };
}

function loadBoolean(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : value === "true";
  } catch {
    return fallback;
  }
}

function saveBoolean(key, value) {
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    /* Storage may be unavailable. */
  }
}

export function useOmnitrixState() {
  const initial = useRef(initialState());
  const [stage, setStage] = useState(initial.current.stage);
  const [activeSection, setActiveSection] = useState(initial.current.section);
  const [sfxEnabled, setSfxEnabled] = useState(() =>
    loadBoolean("omnitrix-sfx", false),
  );
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      loadBoolean("omnitrix-reduced-motion", null) ??
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const timer = useRef(null);
  const activeIndex = Math.max(
    0,
    sectionMeta.findIndex((item) => item.id === activeSection),
  );
  const isLocked = stage === "activating" || stage === "returning";

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    function syncRoute() {
      const hash = window.location.hash.slice(1);
      if (isSectionId(hash)) {
        setActiveSection(hash);
        setStage("section");
      } else if (stage === "section" || stage === "returning") {
        setStage("navigation");
      }
    }
    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, [stage]);

  const skipIntro = useCallback(
    () => setStage((current) => (current === "intro" ? "navigation" : current)),
    [],
  );

  const rotateDial = useCallback(
    (direction) => {
      if (stage !== "navigation" && stage !== "preview") return;
      const delta = direction === "next" ? 1 : -1;
      setActiveSection((current) => {
        const index = sectionMeta.findIndex((item) => item.id === current);
        return sectionMeta[
          (index + delta + sectionMeta.length) % sectionMeta.length
        ].id;
      });
      playSound("switch", sfxEnabled);
      window.clearTimeout(timer.current);
      setStage("preview");
      timer.current = window.setTimeout(() => setStage("navigation"), 420);
    },
    [sfxEnabled, stage],
  );

  const writeHash = (section) => {
    const next = section
      ? `#${section}`
      : `${window.location.pathname}${window.location.search}`;
    window.history.pushState(null, "", next);
  };

  const goToSection = useCallback(
    (section) => {
      if (isLocked) return;
      window.clearTimeout(timer.current);
      setActiveSection(section);
      setStage("section");
      writeHash(section);
      playSound("click", sfxEnabled);
    },
    [isLocked, sfxEnabled],
  );

  const activateSection = useCallback(() => {
    if (stage !== "navigation" && stage !== "preview") return;
    window.clearTimeout(timer.current);
    playSound("activate", sfxEnabled);
    if (reducedMotion) {
      setStage("section");
      writeHash(activeSection);
      return;
    }
    setStage("activating");
    timer.current = window.setTimeout(() => {
      setStage("section");
      writeHash(activeSection);
    }, 900);
  }, [activeSection, reducedMotion, sfxEnabled, stage]);

  const returnToDial = useCallback(() => {
    if (stage !== "section") return;
    window.clearTimeout(timer.current);
    playSound("return", sfxEnabled);
    writeHash();
    if (reducedMotion) {
      setStage("navigation");
      return;
    }
    setStage("returning");
    timer.current = window.setTimeout(() => setStage("navigation"), 360);
  }, [reducedMotion, sfxEnabled, stage]);

  const toggleSfx = useCallback(() => {
    setSfxEnabled((enabled) => {
      const next = !enabled;
      saveBoolean("omnitrix-sfx", next);
      if (next) playSound("click", true);
      return next;
    });
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setReducedMotion((enabled) => {
      const next = !enabled;
      saveBoolean("omnitrix-reduced-motion", next);
      return next;
    });
  }, []);

  return {
    stage,
    activeSection,
    activeIndex,
    isLocked,
    sfxEnabled,
    reducedMotion,
    skipIntro,
    rotateDial,
    goToSection,
    activateSection,
    returnToDial,
    toggleSfx,
    toggleReducedMotion,
  };
}
