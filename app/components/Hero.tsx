"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section id="hero" className="snap-section bg-navy">
      {/* Background fill: blurred zoom of the same image, so the
          section fills edge-to-edge with no navy letterbox. */}
      <img
        src={asset("/media/tkuma-sunset.jpg")}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
      />
      {/* Foreground: the full Tkuma sunset image, uncropped */}
      <img
        src={asset("/media/tkuma-sunset.jpg")}
        alt=""
        className="absolute inset-0 h-full w-full object-contain object-center"
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

      {/* headline + project strip + scroll cue pinned to the bottom */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-6 sm:pb-10">
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
            קחו את עצמכם הביתה
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

        {/* scroll-down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="mt-5 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 5, 0], opacity: [0.5, 0.95, 0.5] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-[10px] font-light uppercase tracking-[0.32em] text-white/70">
              גלילה
            </span>
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              aria-hidden
            >
              <path
                d="M2 2 L10 9 L18 2"
                stroke="white"
                strokeOpacity="0.85"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
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
