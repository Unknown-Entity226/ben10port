import { useCallback, useEffect, useRef, useState } from "react";
import { isSectionId, sectionMeta } from "../data/portfolioData.js";
import { playSound } from "../utils/soundEffects.js";
import {
  readOmnitrixState,
  saveOmnitrixSection,
} from "../utils/omnitrixStorage.js";

function initialState() {
  const hash =
    typeof window === "undefined" ? "" : window.location.hash.slice(1);
  const stored = readOmnitrixState();
  return {
    stage: isSectionId(hash) ? "section" : "home",
    section: isSectionId(hash)
      ? hash
      : stored?.sectionHologram || "about",
  };
}

export function useOmnitrixState() {
  const [initial] = useState(initialState);
  const [stage, setStage] = useState(initial.stage);
  const [activeSection, setActiveSection] = useState(initial.section);
  const timer = useRef(null);
  const activeIndex = Math.max(
    0,
    sectionMeta.findIndex((item) => item.id === activeSection),
  );
  const isLocked = stage === "activating" || stage === "returning";

  const selectSection = useCallback((section) => {
    if (!isSectionId(section)) return;
    setActiveSection(section);
    saveOmnitrixSection(section);
  }, []);

  useEffect(() => {
    saveOmnitrixSection(activeSection);
  }, [activeSection]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    function syncRoute() {
      window.clearTimeout(timer.current);
      timer.current = null;

      const hash = window.location.hash.slice(1);
      if (isSectionId(hash)) {
        selectSection(hash);
        setStage("section");
      } else if (hash === "home" || !hash) {
        setStage("home");
      } else {
        setStage("navigation");
      }
    }
    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, [selectSection]);

  const skipIntro = useCallback(
    () => setStage((current) => (current === "intro" ? "navigation" : current)),
    [],
  );

  const rotateDial = useCallback(
    (direction) => {
      if (stage !== "navigation" && stage !== "preview") return;
      const delta = direction === "next" ? 1 : -1;
      const index = sectionMeta.findIndex((item) => item.id === activeSection);
      const nextSection = sectionMeta[
        (index + delta + sectionMeta.length) % sectionMeta.length
      ].id;
      selectSection(nextSection);
      playSound("switch");
      window.clearTimeout(timer.current);
      setStage("preview");
      timer.current = window.setTimeout(() => setStage("navigation"), 420);
    },
    [activeSection, selectSection, stage],
  );

  const writeHash = (section) => {
    const next = section
      ? `#${section}`
      : `${window.location.pathname}${window.location.search}`;
    window.history.pushState(null, "", next);
  };

  const goToSection = useCallback(
    (section) => {
      if (
        stage !== "navigation" &&
        stage !== "preview" &&
        stage !== "section"
      ) {
        return;
      }
      window.clearTimeout(timer.current);
      timer.current = null;
      selectSection(section);
      setStage("section");
      writeHash(section);
      playSound("click");
    },
    [selectSection, stage],
  );

  const activateSection = useCallback(() => {
    if (stage !== "navigation" && stage !== "preview") return;
    window.clearTimeout(timer.current);
    playSound("activate");
    setStage("activating");
    timer.current = window.setTimeout(() => {
      setStage("section");
      writeHash(activeSection);
    }, 900);
  }, [activeSection, stage]);

  const returnToDial = useCallback(() => {
    if (stage !== "section") return;
    window.clearTimeout(timer.current);
    playSound("return");
    writeHash();
    setStage("returning");
    timer.current = window.setTimeout(() => setStage("navigation"), 360);
  }, [stage]);

  const triggerOmnitrix = useCallback(() => {
    window.clearTimeout(timer.current);
    playSound("activate");
    setStage("navigation");
  }, []);

  const returnToHome = useCallback(() => {
    window.clearTimeout(timer.current);
    playSound("return");
    writeHash("");
    setStage("home");
  }, []);

  return {
    stage,
    activeSection,
    activeIndex,
    isLocked,
    skipIntro,
    rotateDial,
    goToSection,
    activateSection,
    returnToDial,
    triggerOmnitrix,
    returnToHome,
  };
}
