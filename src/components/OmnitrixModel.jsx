import watchDialer from "../assets/omnitrix-watch.svg";
import { sectionMeta } from "../data/portfolioData.js";
import HologramRing from "./HologramRing.jsx";

export default function OmnitrixModel({
  activeIndex,
  locked,
  onActivate,
  onRotate,
  onGoToSection,
}) {
  return (
    <div className={`watch-wrap${locked ? " watch-wrap--locked" : ""}`}>
      <img
        className="watch-dialer-image"
        src={watchDialer}
        alt=""
        aria-hidden="true"
      />
      <HologramRing
        activeIndex={activeIndex}
        locked={locked}
        onRotate={onRotate}
        onActivate={onActivate}
        onSelect={onGoToSection}
      />
      <button
        className="watch-dialer-button"
        type="button"
        onClick={onActivate}
        disabled={locked}
        aria-label={`Activate ${sectionMeta[activeIndex]?.name || "section"}`}
      />
    </div>
  );
}
