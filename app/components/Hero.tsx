"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section id="hero" className="snap-section bg-navy">
      {/* full-bleed brand image — Tkuma towers at sunset */}
      <img
        src={asset("/media/tkuma-sunset.jpg")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* soft wash at the top so the logo reads cleanly */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36%] bg-gradient-to-b from-navy via-navy/65 to-transparent" />

      {/* large ENAV logo — top center */}
      <div className="absolute inset-x-0 top-12 z-10 flex justify-center">
        <motion.img
          src={asset("/media/logo.png")}
          alt="ENAV"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-20 w-auto"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>

      {/* dark wash at the bottom for the headline + project strip */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-navy via-navy/82 to-transparent" />

      {/* headline + project strip pinned to the bottom */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:pb-14">
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

        {/* 5 ENAV projects strip — matches the brand banner.
            Wrapped in an overflow-x-auto bleed so very narrow viewports
            (iPhone SE 320px) gracefully scroll instead of clipping. */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="-mx-6 mt-7 overflow-x-auto px-6"
          style={{ scrollbarWidth: "none" }}
        >
          <div
            dir="ltr"
            className="mx-auto flex w-max items-center gap-3 px-1"
          >
            <Project label="COMING SOON" city="עין הים" />
            <Sep />
            <Project label="360" city="כפר סבא" />
            <Sep />
            <Project label="VILLAGE" city="קריית אונו" />
            <Sep />
            <Project label="NEW" city="רמת גן" />
            <Sep />
            <Project label="שדרות האומנות" city="יהוד-מונסון" hebrew />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Project({
  label,
  city,
  hebrew = false,
}: {
  label: string;
  city: string;
  hebrew?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-0.5 text-center">
      <span
        className={cn(
          "whitespace-nowrap text-[8.5px] font-medium leading-tight text-white",
          !hebrew && "uppercase tracking-[0.12em]"
        )}
      >
        {label}
      </span>
      <span className="whitespace-nowrap text-[8.5px] font-light leading-tight text-white/75">
        {city}
      </span>
    </div>
  );
}

function Sep() {
  return (
    <span aria-hidden className="h-6 w-px shrink-0 bg-white/25" />
  );
}
