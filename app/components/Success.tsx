"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";
import { FormBuilding } from "./FormBuilding";

const CITY_LABELS: Record<string, string> = {
  "ramat-gan": "רמת גן",
  "tel-aviv": "תל אביב",
  "kfar-saba": "כפר סבא",
  "ein-hayam": "עין הים",
  "kiryat-ono": "קריית אונו",
  yehud: "יהוד מונסון",
  jerusalem: "ירושלים",
  netanya: "נתניה",
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

      <div className="relative mx-auto flex min-h-full max-w-[460px] flex-col justify-center px-6 py-16">
        {/* completed building */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex justify-center"
        >
          <FormBuilding step={4} complete={true} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-center text-[10px] font-light uppercase tracking-[0.34em] text-white/55"
        >
          BOOKING CONFIRMED · ENAV STUDIO
        </motion.p>

        {/* slot time anchor */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-center font-display text-[clamp(4.2rem,19vw,5.8rem)] font-extralight leading-none tabular tracking-[-0.045em]"
        >
          {slotTime}
        </motion.p>

        {/* reward statement, repeated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mx-auto mt-5 max-w-[260px] border-y border-white/15 py-3 text-center"
        >
          <p className="text-[10px] font-light uppercase tracking-[0.28em] text-white/45">
            YOUR REWARD
          </p>
          <p className="mt-1.5 text-[13px] font-light leading-[1.5] text-white">
            תמונה אישית על הבטון
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="mt-7 text-center font-display text-[1.5rem] font-extralight leading-tight"
        >
          {first ? `${first}, ` : ""}תורך מובטח.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mx-auto mt-3 max-w-[30ch] text-center text-[13px] font-light leading-[1.7] text-white/55"
        >
          נשלח אלייך SMS דקות לפני המועד.
        </motion.p>

        {/* configuration summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.25 }}
          className="mx-auto mt-10 w-full max-w-[340px]"
        >
          <div className="mb-3 text-center text-[10px] font-light uppercase tracking-[0.32em] text-white/40">
            ההעדפות שלך
          </div>
          <dl>
            <Row label="מטרה" value={intent ? INTENT_LABELS[intent] : "—"} />
            <Row
              label="תקציב"
              value={
                budget
                  ? `₪${budget} מיליון${budget === "5+" ? " ומעלה" : ""}`
                  : "—"
              }
            />
            <Row
              label="ערים"
              value={cityList || "—"}
              hint={
                cities.length > 3 ? `+ ${cities.length - 3} נוספות` : undefined
              }
            />
            <Row
              label="מיקום בתור"
              value={`#${String(position).padStart(2, "0")}`}
              mono
              last
            />
          </dl>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Row({
  label,
  value,
  hint,
  mono = false,
  last = false,
}: {
  label: string;
  value: string;
  hint?: string;
  mono?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-3 py-3 ${last ? "" : "border-b border-white/10"}`}
    >
      <dt className="text-[11px] font-light uppercase tracking-[0.2em] text-white/40">
        {label}
      </dt>
      <dd className="text-right">
        <span
          className={
            mono ? "tabular text-[16px] font-light" : "text-[14px] font-light"
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
