"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

export function Intro({ onNext }: { onNext: () => void }) {
  return (
    <section id="intro" className="snap-section bg-navy">
      <img
        src={asset("/media/AVIR_0099_1-scaled.jpg")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/65 to-navy/95" />

      <div className="relative z-10 flex h-full flex-col justify-center px-6">
        <div className="mx-auto w-full max-w-[460px]">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 text-right text-[15px] font-semibold uppercase tracking-[0.3em] text-white"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.5)" }}
          >
            הזמנה אישית
          </motion.p>

          <h2
            className="text-right font-display text-[clamp(1.6rem,6.7vw,2.15rem)] font-medium leading-[1.3] tracking-[-0.018em] text-balance text-white"
            style={{ textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}
          >
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
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block whitespace-nowrap"
            >
              למילוי הפרטים, והבטיחו את מקומכם
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                duration: 1.4,
                delay: 0.95,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-1 block font-black"
            >
              בחוויה בלתי נשכחת
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
