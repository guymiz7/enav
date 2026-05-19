"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

export function Hero() {
  const v = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    v.current?.play().catch(() => {});
  }, []);

  return (
    <section id="hero" className="snap-section bg-black">
      <video
        ref={v}
        className="absolute inset-0 h-full w-full object-cover"
        src={asset("/media/mp_.mp4")}
        poster={asset("/media/Cam_Up-1_FIX-1-scaled.jpg")}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* legibility gradient at the bottom for the headline */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* headline overlay — Assistant extralight, right-aligned, staggered entrance */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-16 sm:pb-24">
        <h1 className="mx-auto max-w-[480px] text-right font-display text-[clamp(2.9rem,13vw,4.1rem)] font-extralight leading-[1.06] tracking-[-0.028em] text-balance">
          <motion.span
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1.2,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="block"
          >
            אתם מרחק נגיעה
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1.2,
              delay: 0.85,
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
