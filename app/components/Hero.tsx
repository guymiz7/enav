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
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-black">
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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black via-black/65 to-transparent" />

      {/* headline overlay — Assistant light, right-aligned */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[480px] text-right font-display text-[clamp(2.5rem,11.5vw,3.6rem)] font-extralight leading-[1.08] tracking-[-0.025em] text-balance"
        >
          אתם מרחק נגיעה
          <br />
          מהבית החדש שלכם
        </motion.h1>
      </div>
    </section>
  );
}
