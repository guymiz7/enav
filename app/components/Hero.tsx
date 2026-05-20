"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

export function Hero() {
  const v = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = v.current;
    if (!video) return;

    /* belt-and-suspenders: ensure the element is autoplay-eligible */
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");

    const attemptPlay = () => {
      const p = video.play();
      if (p !== undefined) p.catch(() => {});
    };

    attemptPlay();

    /* retry if the tab regains visibility */
    const onVisibility = () => {
      if (!document.hidden && video.paused) attemptPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* fallback: first user interaction kicks autoplay if the browser blocked it */
    const onFirstInteract = () => {
      if (video.paused) attemptPlay();
    };
    document.addEventListener("touchstart", onFirstInteract, {
      once: true,
      passive: true,
    });
    document.addEventListener("pointerdown", onFirstInteract, { once: true });

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("touchstart", onFirstInteract);
      document.removeEventListener("pointerdown", onFirstInteract);
    };
  }, []);

  return (
    <section id="hero" className="snap-section bg-navy">
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

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-navy via-navy/70 to-transparent" />

      {/* headline overlay — softer staggered fade, no blur */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-16 sm:pb-24">
        <h1 className="mx-auto max-w-[480px] text-right font-display text-[clamp(2.9rem,13vw,4.1rem)] font-extralight leading-[1.06] tracking-[-0.028em] text-balance">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              delay: 0.5,
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
