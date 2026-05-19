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

      {/* huge overlay headline */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-14 sm:pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[480px] text-center text-[clamp(2.6rem,13vw,4.2rem)] font-black leading-[0.94] tracking-[-0.028em] text-balance"
        >
          אתם מרחק נגיעה
          <br />
          מהבית החדש שלכם
        </motion.h1>
      </div>
    </section>
  );
}
