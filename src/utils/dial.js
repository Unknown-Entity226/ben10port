import { sectionMeta } from "../data/portfolioData.js";

/**
 * Returns the shortest circular offset between two dial indices.
 * Positive → clockwise (next), negative → counter-clockwise (prev).
 */
export function relativeOffset(index, activeIndex) {
  const count = sectionMeta.length;
  let offset = index - activeIndex;
  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;
  return offset;
}

