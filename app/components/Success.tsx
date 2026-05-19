"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

const CITY_LABELS: Record<string, string> = {
  "ramat-gan": "רמת גן",
  "tel-aviv": "תל אביב",
  "kfar-saba": "כפר סבא",
  "ein-hayam": "עין הים",
  "kiryat-ono": "קריית אונו",
  "yehud": "יהוד מונסון",
  "jerusalem": "ירושלים",
  "netanya": "נתניה",
};

const INTENT_LABELS: Record<string, string> = {
  live: "מגורים",
  invest: "השקעה",
};

export function Success({
  position,
  name,
  slotTime,
  intent,
  budget,
  cities,
}: {
  position: number;
  name: string;
  slotTime: string;
  intent: string | null;
  budget: string | null;
  cities: string[];
}) {
  const first = name.trim().split(/\s+/)[0] || "";

  const cityList = cities
    .map((c) => CITY_LABELS[c] || c)
    .slice(0, 3)
    .join(" · ");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55 }}
      className="fixed inset-0 z-[60] overflow-y-auto bg-black"
    >
      {/* faint background image */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={asset("/media/tkuma-ks-ap-pool-c01_0-6-scaled.jpg")}
          alt=""
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-black" />
      </div>

      <div className="relative mx-auto flex min-h-full max-w-[440px] flex-col justify-center px-6 py-16">
        {/* check mark */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/30"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 9.5L7.5 13L14 6"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-center text-[10px] uppercase tracking-[0.32em] text-white/55"
        >
          המקום שלך אושר
        </motion.p>

        {/* slot time as anchor */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-center text-[clamp(4rem,18vw,5.6rem)] font-light leading-none tabular tracking-[-0.04em]"
        >
          {slotTime}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-6 text-center text-[1.6rem] font-light leading-tight"
        >
          {first ? `${first}, ` : ""}תורך מובטח.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mx-auto mt-4 max-w-[30ch] text-center text-[13px] font-light leading-[1.7] text-white/55"
        >
          נשלח אלייך SMS דקות לפני המועד. ניתן לבטל עד שעה לפני.
        </motion.p>

        {/* configuration summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="mx-auto mt-10 w-full max-w-[340px]"
        >
          <div className="mb-3 text-center text-[10px] uppercase tracking-[0.32em] text-white/40">
            סיכום ההעדפות
          </div>
          <dl className="space-y-3">
            <SummaryRow
              label="מטרה"
              value={intent ? INTENT_LABELS[intent] : "—"}
            />
            <SummaryRow
              label="תקציב"
              value={budget ? `₪${budget} מיליון${budget === "5+" ? " ומעלה" : ""}` : "—"}
            />
            <SummaryRow
              label="ערים"
              value={cityList || "—"}
              hint={
                cities.length > 3
                  ? `+ ${cities.length - 3} נוספות`
                  : undefined
              }
            />
            <SummaryRow
              label="מיקום בתור"
              value={`#${String(position).padStart(2, "0")}`}
              mono
            />
          </dl>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SummaryRow({
  label,
  value,
  hint,
  mono = false,
}: {
  label: string;
  value: string;
  hint?: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-3">
      <dt className="text-[11px] uppercase tracking-[0.2em] text-white/40">
        {label}
      </dt>
      <dd className="text-right">
        <span
          className={
            mono ? "text-[16px] font-light tabular" : "text-[14px] font-light"
          }
        >
          {value}
        </span>
        {hint && (
          <span className="ms-1.5 text-[10px] font-light text-white/35">
            {hint}
          </span>
        )}
      </dd>
    </div>
  );
}
