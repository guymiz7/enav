"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

export function Hero() {
  return (
    <section id="hero" className="snap-section bg-navy">
      {/* full-bleed brand image — twilight cityscape with the tower */}
      <img
        src={asset("/media/AVIR_0123_-scaled.jpg")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* soft wash at the top so the logo reads cleanly over the sky */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36%] bg-gradient-to-b from-navy via-navy/65 to-transparent" />

      {/* large ENAV logo — centered both axes */}
      <motion.img
        src={asset("/media/logo.png")}
        alt="ENAV"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 z-10 h-20 w-auto -translate-x-1/2 -translate-y-1/2"
        style={{ filter: "brightness(0) invert(1)" }}
      />

      {/* dark wash at the bottom for the headline */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-navy via-navy/82 to-transparent" />

      {/* headline */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:pb-20">
        <h1 className="mx-auto max-w-[480px] text-right font-display text-[clamp(2.6rem,12vw,3.7rem)] font-extralight leading-[1.07] tracking-[-0.025em] text-balance">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="block"
          >
            אתם מרחק נגיעה
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              delay: 1.0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="block"
          >
            מהבית החדש שלכם
          </motion.span>
        </h1>
      </div>
    </section>
  );
}
