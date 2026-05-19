"use client";

import { motion } from "framer-motion";

const FLOORS = [
  { n: 1, x: 12, y: 232, width: 56, height: 118, windows: 5 },
  { n: 2, x: 18, y: 132, width: 44, height: 100, windows: 4 },
  { n: 3, x: 24, y: 42, width: 32, height: 90, windows: 3, crown: true },
] as const;

export function Building({
  step,
  complete,
}: {
  step: number;
  complete: boolean;
}) {
  return (
    <div className="relative flex h-full w-full flex-col items-stretch">
      <svg
        viewBox="0 0 80 380"
        preserveAspectRatio="xMidYEnd meet"
        className="h-full w-full"
        fill="none"
      >
        {/* foundation — always visible, very faint */}
        <rect
          x="6"
          y="350"
          width="68"
          height="28"
          fill="rgba(255,255,255,0.12)"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="378"
          x2="80"
          y2="378"
          stroke="white"
          strokeOpacity="0.4"
        />

        {FLOORS.map((f) => (
          <Floor
            key={f.n}
            n={f.n}
            x={f.x}
            y={f.y}
            width={f.width}
            height={f.height}
            windowRows={f.windows}
            crown={"crown" in f ? f.crown : false}
            built={complete ? true : step > f.n}
            constructing={!complete && step === f.n}
          />
        ))}
      </svg>
    </div>
  );
}

function Floor({
  n,
  x,
  y,
  width,
  height,
  windowRows,
  crown,
  built,
  constructing,
}: {
  n: number;
  x: number;
  y: number;
  width: number;
  height: number;
  windowRows: number;
  crown: boolean;
  built: boolean;
  constructing: boolean;
}) {
  const visible = built || constructing;
  const winYs = Array.from({ length: windowRows }, (_, i) =>
    y + 18 + (i * (height - 32)) / Math.max(1, windowRows - 1)
  );

  // perimeter for the "draw" animation on the outline
  const perim = (width + height) * 2;

  return (
    <motion.g
      initial={{ opacity: 0, y: 28 }}
      animate={{
        opacity: visible ? 1 : 0.08,
        y: visible ? 0 : 28,
      }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* outline drawn as if scaffolded */}
      <motion.rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="white"
        strokeWidth="1"
        strokeOpacity="0.85"
        strokeDasharray={perim}
        initial={{ strokeDashoffset: perim }}
        animate={{ strokeDashoffset: visible ? 0 : perim }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* windows fade in row by row */}
      {winYs.map((wy, i) => (
        <motion.line
          key={i}
          x1={x + 4}
          y1={wy}
          x2={x + width - 4}
          y2={wy}
          stroke="white"
          strokeOpacity="0.55"
          strokeWidth="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: visible ? 1 : 0,
            opacity: visible ? 0.55 : 0,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            delay: visible ? 0.5 + i * 0.09 : 0,
          }}
        />
      ))}

      {/* crown / antenna only on top floor */}
      {crown && (
        <>
          <motion.line
            x1={x + width / 2}
            y1={y}
            x2={x + width / 2}
            y2={y - 26}
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.85"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: visible ? 1 : 0 }}
            transition={{ duration: 0.6, delay: visible ? 1.1 : 0 }}
          />
          {/* the construction marker — a small pulsating square at the top while building */}
          {constructing && (
            <motion.rect
              x={x + width / 2 - 2}
              y={y - 30}
              width="4"
              height="4"
              fill="white"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            />
          )}
        </>
      )}

      {/* construction marker for non-crown floors: a thin horizontal "scaffold" sweeping up */}
      {constructing && !crown && (
        <motion.line
          x1={x - 4}
          x2={x + width + 4}
          stroke="white"
          strokeWidth="0.8"
          strokeOpacity="0.6"
          animate={{ y1: [y + height, y], y2: [y + height, y] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.g>
  );
}
