"use client";

import { motion } from "framer-motion";

/**
 * Slim residential tower — modeled after the Cam_Up reference photo.
 * 12 floors with visible balcony lines, two-window-per-floor layout,
 * penthouse setback, mechanical floor, antenna with aviation light.
 *
 * As `step` advances (or `complete` is true), floors "light up" from
 * bottom to top — windows fill in, balcony lines and outlines brighten.
 */

const FLOORS = 12;
const TOWER_X = 26;
const TOWER_WIDTH = 48;
const TOWER_TOP = 82;
const TOWER_BOTTOM = 296;
const FLOOR_H = (TOWER_BOTTOM - TOWER_TOP) / FLOORS;

export function FormBuilding({
  step,
  complete,
}: {
  step: number;
  complete: boolean;
}) {
  const litFloors = complete
    ? FLOORS
    : Math.max(0, Math.floor(((step - 1) * FLOORS) / 3));

  return (
    <svg
      viewBox="0 0 100 340"
      preserveAspectRatio="xMidYEnd meet"
      className="h-[26svh] min-h-[210px] max-h-[260px] w-auto"
      fill="none"
    >
      {/* sidewalk */}
      <line
        x1="0"
        y1="320"
        x2="100"
        y2="320"
        stroke="white"
        strokeOpacity="0.42"
        strokeWidth="0.5"
      />

      {/* lobby (always present, dimly lit) */}
      <g>
        <rect
          x="18"
          y="296"
          width="64"
          height="24"
          stroke="white"
          strokeOpacity="0.65"
          strokeWidth="0.9"
        />
        {/* canopy */}
        <line
          x1="40"
          y1="299"
          x2="60"
          y2="299"
          stroke="white"
          strokeOpacity="0.55"
          strokeWidth="0.6"
        />
        {/* central door */}
        <rect
          x="46"
          y="299"
          width="8"
          height="21"
          fill="rgba(255,255,255,0.22)"
        />
        {/* side glass storefront */}
        <rect
          x="22"
          y="304"
          width="22"
          height="12"
          fill="rgba(255,255,255,0.14)"
        />
        <rect
          x="56"
          y="304"
          width="22"
          height="12"
          fill="rgba(255,255,255,0.14)"
        />
      </g>

      {/* podium / transition slab (between lobby and tower) */}
      <line
        x1="14"
        y1="296"
        x2="86"
        y2="296"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="0.7"
      />

      {/* tower floors */}
      {Array.from({ length: FLOORS }).map((_, i) => {
        const floorY = TOWER_BOTTOM - (i + 1) * FLOOR_H;
        const lit = i < litFloors;
        return <TowerFloor key={i} y={floorY} lit={lit} delay={lit ? i * 0.05 : 0} />;
      })}

      {/* penthouse + mechanical + antenna */}
      <Crown lit={complete || step >= 4} />
    </svg>
  );
}

function TowerFloor({
  y,
  lit,
  delay,
}: {
  y: number;
  lit: boolean;
  delay: number;
}) {
  const halfWin = (TOWER_WIDTH - 8) / 2;
  return (
    <g>
      {/* slab / balcony line below the floor — protrudes beyond tower edges */}
      <line
        x1={TOWER_X - 4}
        y1={y + FLOOR_H}
        x2={TOWER_X + TOWER_WIDTH + 4}
        y2={y + FLOOR_H}
        stroke="white"
        strokeOpacity={lit ? 0.55 : 0.16}
        strokeWidth="0.6"
      />

      {/* floor outline (skeleton always visible, brighter when lit) */}
      <rect
        x={TOWER_X}
        y={y}
        width={TOWER_WIDTH}
        height={FLOOR_H}
        stroke="white"
        strokeOpacity={lit ? 0.5 : 0.18}
        strokeWidth="0.45"
      />

      {/* central structural column */}
      <line
        x1={TOWER_X + TOWER_WIDTH / 2}
        y1={y}
        x2={TOWER_X + TOWER_WIDTH / 2}
        y2={y + FLOOR_H}
        stroke="white"
        strokeOpacity={lit ? 0.22 : 0.07}
        strokeWidth="0.4"
      />

      {/* left apartment window */}
      <motion.rect
        x={TOWER_X + 3}
        y={y + 2.2}
        width={halfWin}
        height={FLOOR_H - 4.4}
        fill="white"
        initial={false}
        animate={{ fillOpacity: lit ? 0.48 : 0.05 }}
        transition={{ duration: 0.55, delay }}
      />

      {/* right apartment window */}
      <motion.rect
        x={TOWER_X + TOWER_WIDTH / 2 + 1}
        y={y + 2.2}
        width={halfWin}
        height={FLOOR_H - 4.4}
        fill="white"
        initial={false}
        animate={{ fillOpacity: lit ? 0.48 : 0.05 }}
        transition={{ duration: 0.55, delay: delay + 0.06 }}
      />
    </g>
  );
}

function Crown({ lit }: { lit: boolean }) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity: lit ? 1 : 0.12, y: lit ? 0 : 10 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* penthouse — setback from main tower */}
      <rect
        x="32"
        y="60"
        width="36"
        height="22"
        stroke="white"
        strokeOpacity="0.85"
        strokeWidth="0.9"
      />
      {/* penthouse balcony slab */}
      <line
        x1="28"
        y1="82"
        x2="72"
        y2="82"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="0.6"
      />
      {/* penthouse single large glass */}
      <motion.rect
        x="35"
        y="63"
        width="30"
        height="15"
        fill="white"
        initial={false}
        animate={{ fillOpacity: lit ? 0.52 : 0.06 }}
        transition={{ duration: 0.55, delay: lit ? 0.35 : 0 }}
      />

      {/* mechanical floor / elevator overrun */}
      <rect
        x="42"
        y="42"
        width="16"
        height="18"
        stroke="white"
        strokeOpacity="0.75"
        strokeWidth="0.75"
      />
      {/* mech louvres */}
      {[46.5, 50, 53.5, 57].map((cy, i) => (
        <line
          key={i}
          x1="44"
          y1={cy}
          x2="56"
          y2={cy}
          stroke="white"
          strokeOpacity={lit ? 0.35 : 0.1}
          strokeWidth="0.35"
        />
      ))}

      {/* antenna mast */}
      <motion.line
        x1="50"
        y1="42"
        x2="50"
        y2="16"
        stroke="white"
        strokeOpacity="0.85"
        strokeWidth="0.7"
        initial={false}
        animate={{ pathLength: lit ? 1 : 0 }}
        transition={{ duration: 0.7, delay: lit ? 0.55 : 0 }}
      />

      {/* aviation warning light */}
      <circle cx="50" cy="16" r="1.4" fill="white" fillOpacity={lit ? 1 : 0.3} />
      {lit && (
        <motion.circle
          cx="50"
          cy="16"
          r="2.4"
          fill="white"
          animate={{ opacity: [0.6, 0.05, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      )}
    </motion.g>
  );
}
