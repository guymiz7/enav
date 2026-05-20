"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

export function Intro({ onNext }: { onNext: () => void }) {
  return (
    <section id="intro" className="snap-section bg-navy">
      <img
        src={asset("/media/AVIR_0099_1-scaled.jpg")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/55 via-navy/35 to-navy/90" />

      <div className="relative z-10 flex h-full flex-col justify-center px-6">
        <div className="mx-auto w-full max-w-[460px]">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 text-right text-[10px] font-light uppercase tracking-[0.42em] text-white/65"
          >
            הזמנה אישית
          </motion.p>

          <h2 className="text-right font-display text-[clamp(1.7rem,7.2vw,2.3rem)] font-extralight leading-[1.22] tracking-[-0.025em] text-balance">
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                duration: 1.4,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block"
            >
              הקדישו דקה מזמנכם
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                duration: 1.4,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block"
            >
              למילוי הפרטים
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                duration: 1.4,
                delay: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block"
            >
              והבטיחו את מקומכם
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                duration: 1.4,
                delay: 1.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-1 block font-light text-white"
            >
              בחוייה בלתי נשכחת
            </motion.span>
          </h2>

          <motion.button
            type="button"
            onClick={onNext}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 w-full border border-white bg-white py-4 text-[15px] font-medium tracking-wide text-navy transition active:bg-white/90"
          >
            קחו אותי לחוויה
          </motion.button>
        </div>
      </div>
    </section>
  );
}
