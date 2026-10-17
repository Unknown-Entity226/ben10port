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

export function useOmnitrixState() {
  const initial = useRef(initialState());
  const [stage, setStage] = useState(initial.current.stage);
  const [activeSection, setActiveSection] = useState(initial.current.section);
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
      playSound("switch");
      window.clearTimeout(timer.current);
      setStage("preview");
      timer.current = window.setTimeout(() => setStage("navigation"), 420);
    },
    [stage],
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
      playSound("click");
    },
    [isLocked],
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
  };
}
