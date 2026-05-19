"use client";

import { motion } from "framer-motion";

/**
 * Architectural illustration of a residential tower.
 *  Foundation/lobby — always visible.
 *  3 stacked floor zones — each contains a 3×3 grid of windows that
 *    light up sequentially as that stage is completed.
 *  Penthouse / mechanical floor / antenna — appear at stage 4.
 *
 * step = 1..4 (current stage); complete = the user submitted.
 */

const COLS = 3;

const ZONES = [
  { threshold: 1, x: 22, y: 248, width: 76, height: 50, rows: 3 },
  { threshold: 2, x: 22, y: 198, width: 76, height: 50, rows: 3 },
  { threshold: 3, x: 22, y: 148, width: 76, height: 50, rows: 3 },
] as const;

export function FormBuilding({
  step,
  complete,
}: {
  step: number;
  complete: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 320"
      preserveAspectRatio="xMidYEnd meet"
      className="h-[24svh] min-h-[180px] max-h-[220px] w-auto"
      fill="none"
    >
      {/* sidewalk line */}
      <line
        x1="0"
        y1="316"
        x2="120"
        y2="316"
        stroke="white"
        strokeOpacity="0.45"
      />

      {/* foundation / lobby — always present */}
      <g>
        <rect
          x="14"
          y="298"
          width="92"
          height="18"
          stroke="white"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        {/* lobby door */}
        <rect
          x="56"
          y="301"
          width="8"
          height="15"
          fill="rgba(255,255,255,0.22)"
        />
        {/* canopy over the door */}
        <line
          x1="50"
          y1="301"
          x2="70"
          y2="301"
          stroke="white"
          strokeOpacity="0.55"
          strokeWidth="0.8"
        />
        {/* side lobby windows */}
        <rect
          x="22"
          y="304"
          width="28"
          height="9"
          fill="rgba(255,255,255,0.13)"
        />
        <rect
          x="70"
          y="304"
          width="28"
          height="9"
          fill="rgba(255,255,255,0.13)"
        />
      </g>

      {/* tower floor zones - stages 1-3 */}
      {ZONES.map((z) => (
        <FloorZone
          key={z.threshold}
          step={step}
          complete={complete}
          threshold={z.threshold}
          x={z.x}
          y={z.y}
          width={z.width}
          height={z.height}
          cols={COLS}
          rows={z.rows}
        />
      ))}

      {/* crown - penthouse + mechanical + antenna (stage 4) */}
      <Crown step={step} complete={complete} />
    </svg>
  );
}

function FloorZone({
  step,
  complete,
  threshold,
  x,
  y,
  width,
  height,
  cols,
  rows,
}: {
  step: number;
  complete: boolean;
  threshold: number;
  x: number;
  y: number;
  width: number;
  height: number;
  cols: number;
  rows: number;
}) {
  const built = complete || step > threshold;
  const constructing = !complete && step === threshold;
  const visible = built || constructing;

  const margin = 4;
  const gap = 2;
  const winW = (width - 2 * margin - (cols - 1) * gap) / cols;
  const winH = (height - 2 * margin - (rows - 1) * gap) / rows;

  /* index windows in cascade order: bottom-row first, left→right, then up */
  const windows: { x: number; y: number; idx: number }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const wx = x + margin + col * (winW + gap);
      const wy = y + margin + (rows - 1 - row) * (winH + gap);
      windows.push({ x: wx, y: wy, idx: row * cols + col });
    }
  }

  return (
    <motion.g
      initial={false}
      animate={{
        opacity: built ? 1 : constructing ? 0.95 : 0.08,
        y: visible ? 0 : 18,
      }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* zone outline (also serves as floor breaks between zones) */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="white"
        strokeOpacity={built ? 0.85 : 0.6}
        strokeWidth="1"
      />

      {/* horizontal floor lines inside the zone — slightly protrude as balcony hints */}
      {Array.from({ length: rows - 1 }).map((_, i) => {
        const sepY = y + margin + (i + 1) * winH + i * gap + gap / 2;
        return (
          <line
            key={`sep-${i}`}
            x1={x - 2}
            y1={sepY}
            x2={x + width + 2}
            y2={sepY}
            stroke="white"
            strokeOpacity={built ? 0.32 : 0.14}
            strokeWidth="0.6"
          />
        );
      })}

      {/* vertical structural columns between apartments */}
      {Array.from({ length: cols - 1 }).map((_, i) => {
        const colX = x + margin + (i + 1) * winW + i * gap + gap / 2;
        return (
          <line
            key={`col-${i}`}
            x1={colX}
            y1={y}
            x2={colX}
            y2={y + height}
            stroke="white"
            strokeOpacity={built ? 0.18 : 0.08}
            strokeWidth="0.5"
          />
        );
      })}

      {/* windows — light up sequentially */}
      {windows.map((w) => (
        <motion.rect
          key={w.idx}
          x={w.x}
          y={w.y}
          width={winW}
          height={winH}
          fill="white"
          initial={false}
          animate={{
            fillOpacity: built ? 0.5 : constructing ? 0.16 : 0,
          }}
          transition={{
            duration: 0.55,
            delay: built ? 0.4 + w.idx * 0.06 : 0,
          }}
        />
      ))}

      {/* scaffold sweep on the active floor */}
      {constructing && (
        <motion.line
          x1={x - 4}
          x2={x + width + 4}
          stroke="white"
          strokeOpacity="0.7"
          strokeWidth="0.7"
          animate={{ y1: [y + height - 2, y + 2], y2: [y + height - 2, y + 2] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.g>
  );
}

function Crown({ step, complete }: { step: number; complete: boolean }) {
  const built = complete;
  const constructing = !complete && step === 4;
  const visible = built || constructing;

  return (
    <motion.g
      initial={false}
      animate={{
        opacity: built ? 1 : constructing ? 0.88 : 0.08,
        y: visible ? 0 : 14,
      }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* penthouse — setback from main tower */}
      <rect
        x="28"
        y="120"
        width="64"
        height="28"
        stroke="white"
        strokeOpacity="0.85"
        strokeWidth="1"
      />
      {/* penthouse 3 large windows */}
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={32 + i * 19}
          y={126}
          width={15}
          height={16}
          fill="white"
          initial={false}
          animate={{
            fillOpacity: built ? 0.58 : constructing ? 0.22 : 0,
          }}
          transition={{ duration: 0.55, delay: built ? 0.45 + i * 0.08 : 0 }}
        />
      ))}

      {/* mechanical floor — narrower setback */}
      <rect
        x="38"
        y="100"
        width="44"
        height="20"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="1"
      />
      {/* mech floor louvers (thin horizontal lines) */}
      {[105, 110, 115].map((cy, i) => (
        <line
          key={i}
          x1={42}
          y1={cy}
          x2={78}
          y2={cy}
          stroke="white"
          strokeOpacity={built ? 0.35 : 0.18}
          strokeWidth="0.5"
        />
      ))}

      {/* antenna housing / elevator overrun */}
      <rect
        x="52"
        y="82"
        width="16"
        height="18"
        stroke="white"
        strokeOpacity="0.75"
        strokeWidth="0.9"
      />

      {/* antenna mast */}
      <motion.line
        x1="60"
        y1="82"
        x2="60"
        y2="50"
        stroke="white"
        strokeOpacity="0.9"
        strokeWidth="1"
        initial={false}
        animate={{ pathLength: visible ? 1 : 0 }}
        transition={{ duration: 0.7, delay: visible ? 0.65 : 0 }}
      />

      {/* aviation warning light at the top */}
      <circle cx="60" cy="50" r="1.6" fill="white" fillOpacity={built ? 1 : 0.5} />
      {constructing && (
        <motion.circle
          cx="60"
          cy="50"
          r="3"
          fill="white"
          animate={{ opacity: [0.9, 0.15, 0.9] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        />
      )}
    </motion.g>
  );
}
