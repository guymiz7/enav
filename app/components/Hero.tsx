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
    <section className="px-5 pb-10 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-[440px] overflow-hidden bg-black"
        style={{ aspectRatio: "9 / 14" }}
      >
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
      </motion.div>
    </section>
  );
}
