"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

export function Intro({ onNext }: { onNext: () => void }) {
  return (
    <section id="intro" className="snap-section bg-navy">
      <img
        src={asset("/media/AVIR_0099_1-scaled.jpg")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/75 to-navy/95" />

      <div className="relative z-10 flex h-full flex-col justify-center px-6">
        <div className="mx-auto w-full max-w-[460px]">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 text-right text-[15px] font-medium uppercase tracking-[0.32em] text-white"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.55)" }}
          >
            הזמנה אישית
          </motion.p>

          <h2
            className="text-right font-display text-[clamp(1.4rem,5.9vw,1.9rem)] font-normal leading-[1.35] tracking-[-0.018em] text-balance text-white"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}
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
              className="block whitespace-nowrap"
            >
              הקדישו דקה מזמנכם למילוי הפרטים,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                duration: 1.4,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-1 block whitespace-nowrap"
            >
              והבטיחו את מקומכם ב
              <strong className="font-bold">חוויה בלתי נשכחת</strong>
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
