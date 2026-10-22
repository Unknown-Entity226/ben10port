import { isSectionId, sectionMeta } from "../data/portfolioData.js";

const STORAGE_KEY = "omnitrix-selection";

function ringRotationFor(section) {
  const index = sectionMeta.findIndex((item) => item.id === section);
  return index < 0 ? 0 : -index * 60;
}

export function readOmnitrixState() {
  if (typeof window === "undefined") return null;

  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    if (!stored || !isSectionId(stored.sectionHologram)) return null;

    const ring = stored.hologramRing;
    return {
      sectionHologram: stored.sectionHologram,
      hologramRing: {
        section: isSectionId(ring?.section)
          ? ring.section
          : stored.sectionHologram,
        rotationAngle: Number.isFinite(ring?.rotationAngle)
          ? ring.rotationAngle
          : ringRotationFor(stored.sectionHologram),
      },
    };
  } catch {
    return null;
  }
}

export function saveOmnitrixSection(section) {
  if (typeof window === "undefined" || !isSectionId(section)) return;

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        sectionHologram: section,
        hologramRing: {
          section,
          rotationAngle: ringRotationFor(section),
        },
      }),
    );
  } catch {
    // Keep navigation usable when browser storage is unavailable.
  }
}

export function readRingRotation(section) {
  const stored = readOmnitrixState();
  if (stored?.hologramRing.section === section) {
    return stored.hologramRing.rotationAngle;
  }
  return ringRotationFor(section);
}
