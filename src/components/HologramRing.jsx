import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sectionMeta } from "../data/portfolioData.js";

function relativeOffset(index, activeIndex) {
  const count = sectionMeta.length;
  let offset = index - activeIndex;
  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;
  return offset;
}

// Polar coordinate helper (0 deg is 12 o'clock, clockwise; in math polar: 90 deg is top)
const cx = 250;
const cy = 250;
const rIn = 130;
const rOut = 205;
const rMid = 168;
const rAct = 236;
const rActIn = 126;

function pt(r, clockDeg) {
  const rad = (clockDeg * Math.PI) / 180;
  return [cx + r * Math.sin(rad), cy - r * Math.cos(rad)];
}

function sectorPath(rin, rout, a1, a2) {
  const p1 = pt(rout, a1);
  const p2 = pt(rout, a2);
  const p3 = pt(rin, a2);
  const p4 = pt(rin, a1);
  const largeArc = a2 - a1 > 180 ? 1 : 0;
  return `M ${p1[0].toFixed(2)} ${p1[1].toFixed(2)} A ${rout} ${rout} 0 ${largeArc} 1 ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} L ${p3[0].toFixed(2)} ${p3[1].toFixed(2)} A ${rin} ${rin} 0 ${largeArc} 0 ${p4[0].toFixed(2)} ${p4[1].toFixed(2)} Z`;
}

// Pre-calculate geometry
const sectorPaths = Array.from({ length: 6 }, (_, i) => {
  const centerDeg = i * 60;
  return {
    index: i,
    centerDeg,
    d: sectorPath(rIn, rOut, centerDeg - 28.5, centerDeg + 28.5),
    pos: pt(rMid, centerDeg),
  };
});

const dividers = Array.from({ length: 6 }, (_, i) => {
  const deg = 30 + i * 60;
  return {
    pIn: pt(rIn - 1, deg),
    pOut: pt(rOut + 1, deg),
  };
});

// Bottom visor arc (90 to 270 deg)
const pV1 = pt(rOut, 90);
const pV2 = pt(rOut, 270);
const pV3 = pt(rIn, 270);
const pV4 = pt(rIn, 90);
const visorPath = `M ${pV1[0].toFixed(2)} ${pV1[1].toFixed(2)} A ${rOut} ${rOut} 0 0 1 ${pV2[0].toFixed(2)} ${pV2[1].toFixed(2)} L ${pV3[0].toFixed(2)} ${pV3[1].toFixed(2)} A ${rIn} ${rIn} 0 0 0 ${pV4[0].toFixed(2)} ${pV4[1].toFixed(2)} Z`;
const visorOuterArc = `M ${pV1[0].toFixed(2)} ${pV1[1].toFixed(2)} A ${rOut} ${rOut} 0 0 1 ${pV2[0].toFixed(2)} ${pV2[1].toFixed(2)}`;
const visorInnerArc = `M ${pV4[0].toFixed(2)} ${pV4[1].toFixed(2)} A ${rIn} ${rIn} 0 0 1 ${pV3[0].toFixed(2)} ${pV3[1].toFixed(2)}`;

const visorFacets = [120, 150, 180, 210, 240].map((vdeg) => ({
  inPt: pt(rIn + 2, vdeg),
  outPt: pt(rOut - 2, vdeg),
}));

// Top active wedge (-25 to 25 deg, 12 o'clock = 90 deg polar)
const pAct1 = pt(rAct, -25);
const pAct2 = pt(rAct, 25);
const pAct3 = pt(rActIn, 25);
const pAct4 = pt(rActIn, -25);
const activeWedgePath = `M ${pAct1[0].toFixed(2)} ${pAct1[1].toFixed(2)} A ${rAct} ${rAct} 0 0 1 ${pAct2[0].toFixed(2)} ${pAct2[1].toFixed(2)} L ${pAct3[0].toFixed(2)} ${pAct3[1].toFixed(2)} A ${rActIn} ${rActIn} 0 0 0 ${pAct4[0].toFixed(2)} ${pAct4[1].toFixed(2)} Z`;
const activeTopArc = `M ${pAct1[0].toFixed(2)} ${pAct1[1].toFixed(2)} A ${rAct} ${rAct} 0 0 1 ${pAct2[0].toFixed(2)} ${pAct2[1].toFixed(2)}`;
const activeBottomArc = `M ${pAct3[0].toFixed(2)} ${pAct3[1].toFixed(2)} A ${rActIn} ${rActIn} 0 0 0 ${pAct4[0].toFixed(2)} ${pAct4[1].toFixed(2)}`;

const pActDec1 = pt(rAct - 7, -22);
const pActDec2 = pt(rAct - 7, 22);
const pActDec3 = pt(rActIn + 8, 22);
const pActDec4 = pt(rActIn + 8, -22);
const activeInnerDecPath = `M ${pActDec1[0].toFixed(2)} ${pActDec1[1].toFixed(2)} A ${rAct - 7} ${rAct - 7} 0 0 1 ${pActDec2[0].toFixed(2)} ${pActDec2[1].toFixed(2)} L ${pActDec3[0].toFixed(2)} ${pActDec3[1].toFixed(2)} A ${rActIn + 8} ${rActIn + 8} 0 0 0 ${pActDec4[0].toFixed(2)} ${pActDec4[1].toFixed(2)} Z`;

// Inner Pointer Arrow (328 deg)
const pPtBase1 = pt(rIn + 1, 319);
const pPtTip = pt(94, 328);
const pPtBase2 = pt(rIn + 1, 337);
const pointerPath = `M ${pPtBase1[0].toFixed(2)} ${pPtBase1[1].toFixed(2)} L ${pPtTip[0].toFixed(2)} ${pPtTip[1].toFixed(2)} L ${pPtBase2[0].toFixed(2)} ${pPtBase2[1].toFixed(2)} Z`;
const pointerPolygon = `${pPtBase1[0].toFixed(2)},${pPtBase1[1].toFixed(2)} ${pPtTip[0].toFixed(2)},${pPtTip[1].toFixed(2)} ${pPtBase2[0].toFixed(2)},${pPtBase2[1].toFixed(2)}`;

const symbolIds = [
  "sym-about",
  "sym-skills",
  "sym-projects",
  "sym-experience",
  "sym-education",
  "sym-contact",
];

export default function HologramRing({
  activeIndex,
  locked,
  onRotate,
  onActivate,
  onSelect,
}) {
  const prevIndexRef = useRef(activeIndex);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Maintain continuous smooth rotation angle
  useEffect(() => {
    if (prevIndexRef.current !== activeIndex) {
      const diff = relativeOffset(activeIndex, prevIndexRef.current);
      setRotationAngle((prev) => prev - diff * 60);
      prevIndexRef.current = activeIndex;
    }
  }, [activeIndex]);

  const handleSectorClick = (index) => {
    if (locked) return;
    if (index === activeIndex) {
      onActivate?.();
    } else if (onSelect && sectionMeta[index]?.id) {
      onSelect(sectionMeta[index].id);
    } else if (onRotate) {
      const offset = relativeOffset(index, activeIndex);
      onRotate(offset < 0 ? "prev" : "next");
    }
  };

  const handleActivePanelClick = () => {
    if (locked) return;
    onActivate?.();
  };

  return (
    <div
      className="holo-ring-container"
      role="region"
      aria-label="Omnitrix Hologram Ring"
    >
      <svg
        className="holo-ring-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        fill="none"
      >
        <defs>
          <filter
            id="ringHoloGlow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feGaussianBlur stdDeviation="6" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="ringActiveGlow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="9" result="blur2" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.55  0 0 0 0 0.96  0 0 0 0 0.4  0 0 0 1 0"
              in="blur2"
              result="coloredBlur"
            />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="iconDarkOutline" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#020804" floodOpacity="0.95" />
          </filter>

          <linearGradient
            id="ringActiveWedgeGrad"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#4d7c0f" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#1f3d05" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="ringVisorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#bef264" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#84cc16" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#65a30d" stopOpacity="0.5" />
          </linearGradient>

          <radialGradient id="ringDiscBackdrop" cx="50%" cy="50%" r="50%">
            <stop offset="40%" stopColor="#84cc16" stopOpacity="0.05" />
            <stop offset="70%" stopColor="#65a30d" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#4d7c0f" stopOpacity="0.08" />
          </radialGradient>

          {/* 6 Portfolio Section Symbols from Lucide (clean paths for dual stroke) */}
          <g id="sym-about" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 0 0-16 0" />
          </g>
          <g id="sym-skills" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 16 4-4-4-4" />
            <path d="m6 8-4 4 4 4" />
            <path d="m14.5 4-5 16" />
          </g>
          <g id="sym-projects" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
            <path d="M8 10v4" />
            <path d="M12 10v2" />
            <path d="M16 10v6" />
          </g>
          <g id="sym-experience" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 12h.01" />
            <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            <path d="M22 13a18.15 18.15 0 0 1-20 0" />
            <rect width="20" height="14" x="2" y="6" rx="2" />
          </g>
          <g id="sym-education" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 7v14" />
            <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
          </g>
          <g id="sym-contact" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </g>
        </defs>

        {/* 1. Ambient Halo Glows */}
        <circle
          cx="250"
          cy="250"
          r="208"
          stroke="#a3e635"
          strokeWidth="4"
          opacity="0.2"
          filter="url(#ringHoloGlow)"
        />
        <circle
          cx="250"
          cy="250"
          r="128"
          stroke="#a3e635"
          strokeWidth="3"
          opacity="0.2"
          filter="url(#ringHoloGlow)"
        />
        <circle cx="250" cy="250" r="205" fill="url(#ringDiscBackdrop)" />

        {/* 2. Top Active Selector Panel Bed/Background (rendered behind wheel) */}
        <g
          className="holo-active-panel-bg"
          onClick={handleActivePanelClick}
          style={{ cursor: locked ? "wait" : "pointer", pointerEvents: "auto" }}
        >
          {/* Active wedge background gradient */}
          <path
            d={activeWedgePath}
            fill="url(#ringActiveWedgeGrad)"
            stroke="#4d7c0f"
            strokeWidth="2"
          />
          {/* Inner dark green bezel line */}
          <path
            d={activeInnerDecPath}
            fill="none"
            stroke="#1a3d07"
            strokeWidth="3"
            opacity="0.9"
          />
        </g>

        {/* 3. Lower Visor Arc (Bottom Shield Bezel) */}
        <g className="holo-visor">
          <path d={visorPath} fill="url(#ringVisorGrad)" />
          <path
            d={visorOuterArc}
            stroke="#d9f99d"
            strokeWidth="4.5"
            strokeLinecap="round"
            filter="url(#ringHoloGlow)"
          />
          <path
            d={visorInnerArc}
            stroke="#d9f99d"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#ringHoloGlow)"
          />
          {visorFacets.map((facet, i) => (
            <line
              key={i}
              x1={facet.inPt[0].toFixed(2)}
              y1={facet.inPt[1].toFixed(2)}
              x2={facet.outPt[0].toFixed(2)}
              y2={facet.outPt[1].toFixed(2)}
              stroke="rgba(217, 249, 157, 0.4)"
              strokeWidth="1.5"
            />
          ))}
        </g>

        {/* 4. Inner Pointer Arrow (328 deg) */}
        <g className="holo-pointer">
          <path
            d={pointerPath}
            fill="#15803d"
            stroke="#a3e635"
            strokeWidth="2"
            filter="url(#ringHoloGlow)"
          />
          <polygon
            points={pointerPolygon}
            fill="#22c55e"
            opacity="0.85"
          />
        </g>

        {/* 5. Dynamic Rotating Wheel (Sectors + Dividers + Clean High-Contrast Symbols) */}
        <motion.g
          className="holo-rotating-wheel"
          animate={{ rotate: rotationAngle }}
          transition={{
            type: "spring",
            stiffness: 95,
            damping: 19,
            mass: 0.8,
          }}
          style={{ transformOrigin: "250px 250px" }}
        >
          {/* 6 Sectors (dashed center rings removed!) */}
          {sectorPaths.map((sec) => {
            const isSelected = sec.index === activeIndex;
            return (
              <path
                key={sec.index}
                d={sec.d}
                fill={
                  isSelected
                    ? "rgba(163, 230, 53, 0.28)"
                    : "rgba(132, 204, 22, 0.16)"
                }
                stroke={
                  isSelected
                    ? "rgba(190, 242, 100, 0.55)"
                    : "rgba(163, 230, 53, 0.28)"
                }
                strokeWidth={isSelected ? "1.5" : "1"}
                className={`holo-sector holo-sector-${sec.index}`}
                onClick={() => handleSectorClick(sec.index)}
                style={{ cursor: locked ? "wait" : "pointer", pointerEvents: "auto" }}
              />
            );
          })}

          {/* Radial Divider facet lines */}
          {dividers.map((div, i) => (
            <g key={i}>
              <line
                x1={div.pIn[0].toFixed(2)}
                y1={div.pIn[1].toFixed(2)}
                x2={div.pOut[0].toFixed(2)}
                y2={div.pOut[1].toFixed(2)}
                stroke="#122604"
                strokeWidth="3.5"
              />
              <line
                x1={div.pIn[0].toFixed(2)}
                y1={div.pIn[1].toFixed(2)}
                x2={div.pOut[0].toFixed(2)}
                y2={div.pOut[1].toFixed(2)}
                stroke="#a3e635"
                strokeWidth="1.2"
                opacity="0.9"
              />
            </g>
          ))}

          {/* High-Contrast Symbols on the Wheel (Dark outline backing + vivid neon foreground) */}
          {[...sectorPaths]
            .sort((a, b) => (a.index === activeIndex ? 1 : b.index === activeIndex ? -1 : 0))
            .map((sec) => {
              const symId = symbolIds[sec.index];
              const isSelected = sec.index === activeIndex;
              return (
                <g
                  key={sec.index}
                  transform={`translate(${sec.pos[0].toFixed(2)}, ${sec.pos[1].toFixed(2)}) rotate(${sec.centerDeg})`}
                  className={`holo-symbol holo-symbol-${sec.index} ${isSelected ? "holo-symbol-active" : ""}`}
                  style={{
                    cursor: locked ? "wait" : "pointer",
                    pointerEvents: "auto",
                  }}
                  onClick={() => handleSectorClick(sec.index)}
                >
                  <g
                    transform={`scale(${isSelected ? 1.68 : 1.28}) translate(-12, -12)`}
                    style={{
                      transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      transformOrigin: "0px 0px",
                    }}
                  >
                    {/* 1. Dark high-contrast backing outline */}
                    <use
                      href={`#${symId}`}
                      stroke={isSelected ? "#010603" : "#020804"}
                      strokeWidth={isSelected ? 5.5 : 4.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* 2. Vivid foreground: luminescent white for active, neon lime for inactive */}
                    <use
                      href={`#${symId}`}
                      stroke={isSelected ? "#ffffff" : "#bef264"}
                      strokeWidth={isSelected ? 2.6 : 2.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter={isSelected ? "url(#ringActiveGlow)" : "url(#ringHoloGlow)"}
                      style={{
                        transition: "stroke 0.25s ease, filter 0.25s ease",
                      }}
                    />
                  </g>
                </g>
              );
            })}
        </motion.g>

        {/* 6. Active Selector Raised Bezel Frame (Framing 90 deg polar / 12 o'clock slot) */}
        <g
          className="holo-active-panel-frame"
          filter="url(#ringActiveGlow)"
          onClick={handleActivePanelClick}
          style={{ cursor: locked ? "wait" : "pointer", pointerEvents: "auto" }}
          aria-label={`Selected section: ${sectionMeta[activeIndex]?.name || ""}`}
        >
          {/* Outer glowing lime border (fill=none so it NEVER obscures the icon inside!) */}
          <path
            d={activeWedgePath}
            fill="none"
            stroke="#a3e635"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Top bright neon highlight arc */}
          <path
            d={activeTopArc}
            stroke="#d9f99d"
            strokeWidth="3.5"
            fill="none"
          />
          {/* Bottom inner neon highlight arc */}
          <path
            d={activeBottomArc}
            stroke="#bef264"
            strokeWidth="3"
            fill="none"
          />
        </g>

        {/* 8. Base Ring Outlines */}
        <circle
          cx="250"
          cy="250"
          r={rOut}
          stroke="#84cc16"
          strokeWidth="2.5"
          fill="none"
          opacity="0.85"
        />
        <circle
          cx="250"
          cy="250"
          r={rIn}
          stroke="#a3e635"
          strokeWidth="2.5"
          fill="none"
          opacity="0.85"
        />
      </svg>
    </div>
  );
}
