"use client";

import { motion } from "framer-motion";

/**
 * Building visualization shown above the stepped form.
 * step = 1..4 (current stage being filled)
 * - Foundation always visible
 * - Floor n is BUILT once step > n, CONSTRUCTING when step === n, hidden otherwise
 * - Step 4 = crown/antenna at the top
 */
export function FormBuilding({ step, complete }: { step: number; complete: boolean }) {
  return (
    <svg
      viewBox="0 0 140 240"
      preserveAspectRatio="xMidYEnd meet"
      className="h-44 w-auto"
      fill="none"
    >
      {/* foundation — always visible */}
      <rect
        x="14"
        y="216"
        width="112"
        height="20"
        fill="rgba(255,255,255,0.12)"
        stroke="rgba(255,255,255,0.32)"
        strokeWidth="1"
      />
      <line
        x1="0"
        y1="236"
        x2="140"
        y2="236"
        stroke="white"
        strokeOpacity="0.4"
      />

      {/* horizontal hairline floor breaks (faint, decorative) */}
      <line x1="0" y1="216" x2="140" y2="216" stroke="white" strokeOpacity="0.05" />

      {/* Floor 1 — base (built when step > 1, constructing on step 1) */}
      <Floor
        step={step}
        complete={complete}
        threshold={1}
        x={18}
        y={160}
        width={104}
        height={56}
        windowRows={3}
        delay={0}
      />

      {/* Floor 2 — middle */}
      <Floor
        step={step}
        complete={complete}
        threshold={2}
        x={24}
        y={104}
        width={92}
        height={56}
        windowRows={3}
        delay={0.05}
      />

      {/* Floor 3 — penthouse */}
      <Floor
        step={step}
        complete={complete}
        threshold={3}
        x={30}
        y={48}
        width={80}
        height={56}
        windowRows={2}
        delay={0.1}
      />

      {/* Crown / antenna — step 4 */}
      <Crown step={step} complete={complete} />
    </svg>
  );
}

function Floor({
  step,
  complete,
  threshold,
  x,
  y,
  width,
  height,
  windowRows,
  delay,
}: {
  step: number;
  complete: boolean;
  threshold: number;
  x: number;
  y: number;
  width: number;
  height: number;
  windowRows: number;
  delay: number;
}) {
  const built = complete || step > threshold;
  const constructing = !complete && step === threshold;
  const visible = built || constructing;

  const perim = (width + height) * 2;

  const windowYs = Array.from(
    { length: windowRows },
    (_, i) =>
      y + 12 + (i * (height - 22)) / Math.max(1, windowRows - 1)
  );

  return (
    <motion.g
      initial={false}
      animate={{
        opacity: built ? 1 : constructing ? 0.92 : 0.07,
        y: visible ? 0 : 22,
      }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <motion.rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="white"
        strokeWidth="1"
        strokeOpacity={built ? 0.95 : 0.7}
        strokeDasharray={perim}
        initial={false}
        animate={{ strokeDashoffset: visible ? 0 : perim }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />

      {windowYs.map((wy, i) => (
        <motion.line
          key={i}
          x1={x + 5}
          y1={wy}
          x2={x + width - 5}
          y2={wy}
          stroke="white"
          strokeOpacity={built ? 0.55 : 0.3}
          strokeWidth="0.6"
          initial={false}
          animate={{
            pathLength: built ? 1 : constructing ? 0.4 : 0,
          }}
          transition={{
            duration: 0.55,
            delay: built ? 0.45 + i * 0.1 : 0,
          }}
        />
      ))}

      {/* sweeping scaffold line while constructing */}
      {constructing && (
        <motion.line
          x1={x - 4}
          x2={x + width + 4}
          stroke="white"
          strokeOpacity="0.75"
          strokeWidth="0.7"
          animate={{ y1: [y + height - 2, y + 2], y2: [y + height - 2, y + 2] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
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
        opacity: built ? 1 : constructing ? 0.85 : 0.07,
        y: visible ? 0 : 14,
      }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* antenna */}
      <motion.line
        x1="70"
        y1="48"
        x2="70"
        y2="20"
        stroke="white"
        strokeOpacity="0.9"
        strokeWidth="1"
        initial={false}
        animate={{ pathLength: visible ? 1 : 0 }}
        transition={{ duration: 0.6, delay: visible ? 0.5 : 0 }}
      />
      <motion.rect
        x="65"
        y="16"
        width="10"
        height="4"
        fill="white"
        fillOpacity={built ? 1 : 0.5}
      />
      {constructing && (
        <motion.rect
          x="65"
          y="10"
          width="10"
          height="2"
          fill="white"
          animate={{ opacity: [1, 0.25, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        />
      )}
    </motion.g>
  );
}
