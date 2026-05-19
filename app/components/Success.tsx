"use client";

import { motion } from "framer-motion";

export function Success({
  position,
  name,
}: {
  position: number;
  name: string;
}) {
  const first = name.trim().split(/\s+/)[0] || "";
  const eta = Math.max(3, position * 2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black px-6"
    >
      <div className="w-full max-w-[440px] text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[12px] font-light text-white/55"
        >
          המקום שלך נשמר
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="my-6 font-light tabular"
        >
          <span className="text-[14px] text-white/50">#</span>
          <span className="text-[6.5rem] leading-none">{String(position).padStart(2, "0")}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-[1.6rem] font-light leading-tight"
        >
          {first ? `${first}, ` : ""}תורך בדרך.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mx-auto mt-4 max-w-[28ch] text-[13px] font-light leading-[1.65] text-white/55"
        >
          נשלח אלייך SMS דקות לפני שמגיע תורך באזור הצילום של ENAV. הישאר/י בטווח קרוב.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-10 text-[11px] font-light text-white/35"
        >
          זמן משוער · ~{eta} דקות
        </motion.p>
      </div>
    </motion.div>
  );
}
