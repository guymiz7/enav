"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

export function Intro({ onNext }: { onNext: () => void }) {
  return (
    <section id="intro" className="snap-section bg-black">
      <img
        src={asset("/media/AVIR_0099_1-scaled.jpg")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/90" />

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

          <h2 className="text-right font-display text-[clamp(2.1rem,9vw,2.9rem)] font-extralight leading-[1.18] tracking-[-0.028em] text-balance">
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
              מלאו את הפרטים בדקה
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
              className="block"
            >
              והכנסו לתור
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
              className="mt-1 block font-light text-white"
            >
              לחוויה בלתי נשכחת
            </motion.span>
          </h2>

          <motion.button
            type="button"
            onClick={onNext}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1.2, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.97 }}
            className="mt-12 w-full border border-white bg-white py-4 text-[15px] font-medium tracking-wide text-black transition active:bg-white/90"
          >
            קחו אותי לחוויה
          </motion.button>
        </div>
      </div>
    </section>
  );
}
