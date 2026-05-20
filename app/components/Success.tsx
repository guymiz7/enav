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
  intent,
  budget,
  cities,
}: {
  position: number;
  name: string;
  slotTime?: string;
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
      <div className="pointer-events-none absolute inset-0">
        <img
          src={asset("/media/tkuma-ks-ap-pool-c01_0-6-scaled.jpg")}
          alt=""
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-black" />
      </div>

      <div className="relative mx-auto flex min-h-full max-w-[460px] flex-col justify-center px-6 py-16">
        {/* ENAV logo — centered, prominent */}
        <motion.img
          src={asset("/media/logo.png")}
          alt="ENAV"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto h-14 w-auto"
          style={{ filter: "brightness(0) invert(1)" }}
        />

        {/* completed building */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex justify-center"
        >
          <FormBuilding step={4} complete={true} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center text-[10px] font-light uppercase tracking-[0.34em] text-white/55"
        >
          המקום שלך אושר
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-center font-display text-[clamp(1.9rem,7.5vw,2.4rem)] font-extralight leading-tight tracking-[-0.018em]"
        >
          {first ? `${first}, ` : ""}תורך מובטח.
        </motion.h2>

        {/* what's going to happen — value statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mx-auto mt-5 max-w-[34ch] text-center text-[13.5px] font-light leading-[1.65] text-white/80 text-balance"
        >
          מקומך הובטח בעמדת הצילום של ENAV.
          <br />
          <span className="text-white">מזכרת ייחודית במינה</span> בדרך לבית החדש שלך.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mx-auto mt-4 max-w-[30ch] text-center text-[11.5px] font-light leading-[1.7] text-white/40"
        >
          נשלח אלייך SMS לפני המועד.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
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
