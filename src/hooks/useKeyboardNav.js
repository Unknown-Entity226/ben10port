import { useEffect } from "react";

export function useKeyboardNav({
  stage,
  rotateDial,
  activateSection,
  skipIntro,
  returnToDial,
  triggerOmnitrix,
  returnToHome,
}) {
  useEffect(() => {
    function onKeyDown(event) {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;

      if (event.key === "Escape") {
        if (stage === "intro") {
          event.preventDefault();
          skipIntro?.();
        } else if (stage === "section") {
          event.preventDefault();
          returnToDial?.();
        } else if (stage === "navigation" || stage === "preview") {
          event.preventDefault();
          returnToHome?.();
        }
        return;
      }

      const target = event.target;
      const typing =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(
            target.tagName,
          ));
      if (typing) return;
      if (stage === "home") {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          triggerOmnitrix?.();
        }
        return;
      }
      if (stage !== "navigation" && stage !== "preview") return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        rotateDial("prev");
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        rotateDial("next");
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateSection();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [stage, rotateDial, activateSection, skipIntro, returnToDial, triggerOmnitrix, returnToHome]);
}
