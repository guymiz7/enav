"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

export function Intro({ onNext }: { onNext: () => void }) {
  return (
    <section id="intro" className="snap-section bg-black">
      {/* faded image — visible but subdued */}
      <img
        src={asset("/media/Cam_Up-1_FIX-1-scaled.jpg")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black/85" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[20ch] text-center font-display text-[clamp(1.7rem,7.2vw,2.3rem)] font-extralight leading-[1.4] tracking-[-0.01em] text-balance"
        >
          מלאו את הפרטים בדקה
          <br />
          והכנסו לתור
          <br />
          <span className="font-light text-white">לחוויה בלתי נשכחת</span>
        </motion.h2>

        <motion.button
          type="button"
          onClick={onNext}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          whileTap={{ scale: 0.97 }}
          className="mt-14 border border-white bg-white px-10 py-4 text-[15px] font-medium tracking-wide text-black transition active:bg-white/90"
        >
          קחו אותי לחוויה
        </motion.button>
      </div>
    </section>
  );
}
