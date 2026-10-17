import { Activity, Sparkles, Volume2, VolumeX } from "lucide-react";

export default function AccessibilityControls({
  sfxEnabled,
  reducedMotion,
  onToggleSfx,
  onToggleMotion,
  compact = false,
}) {
  return (
    <div
      className={`access-controls${compact ? " access-controls--compact" : ""}`}
      aria-label="Experience settings"
    >
      <button
        className="icon-control"
        type="button"
        onClick={onToggleSfx}
        aria-pressed={sfxEnabled}
        aria-label={sfxEnabled ? "Mute sound effects" : "Enable sound effects"}
        title={sfxEnabled ? "Sound on" : "Sound off"}
      >
        {sfxEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        {!compact && <span>Sound {sfxEnabled ? "on" : "off"}</span>}
      </button>
      <button
        className="icon-control"
        type="button"
        onClick={onToggleMotion}
        aria-pressed={reducedMotion}
        aria-label={reducedMotion ? "Turn animations on" : "Reduce animations"}
        title={reducedMotion ? "Reduced motion on" : "Reduce motion"}
      >
        {reducedMotion ? <Activity size={16} /> : <Sparkles size={16} />}
        {!compact && <span>Motion {reducedMotion ? "reduced" : "full"}</span>}
      </button>
    </div>
  );
}
