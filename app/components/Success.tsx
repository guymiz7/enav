"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

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
  name,
  intent,
  budget,
  cities,
}: {
  position?: number;
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
      className="fixed inset-0 z-[60] overflow-y-auto bg-navy"
    >
      <div className="relative mx-auto flex min-h-full max-w-[460px] flex-col px-6 pb-16 pt-14">
        {/* ENAV logo — large, centered */}
        <motion.img
          src={asset("/media/logo.png")}
          alt="ENAV"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto h-20 w-auto"
          style={{ filter: "brightness(0) invert(1)" }}
        />

        {/* Building image from PDF */}
        <motion.img
          src={asset("/media/pdf_building.png")}
          alt=""
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 h-[32svh] min-h-[230px] max-h-[300px] w-auto"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 text-center text-[10px] font-light uppercase tracking-[0.34em] text-white/55"
        >
          המקום שלך אושר
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-center font-display text-[clamp(1.9rem,7.5vw,2.4rem)] font-extralight leading-tight tracking-[-0.018em]"
        >
          {first ? `${first}, ` : ""}תורך מובטח.
        </motion.h2>

        {/* combined value statement + WhatsApp notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="mx-auto mt-5 max-w-[34ch] text-center text-[13.5px] font-light leading-[1.65] text-white/80 text-balance"
        >
          מקומך הובטח בעמדת הצילום של ENAV.
          <br />
          <span className="text-white">מזכרת ייחודית</span> בדרך לבית החדש שלך.
          <br />
          מיד נשלח אליך לוואטסאפ את מיקומך בתור.
        </motion.p>

        {/* preferences (no queue position row) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
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
              last
            />
          </dl>
        </motion.div>

        {/* phone footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.45 }}
          className="mx-auto mt-10 flex items-center justify-center gap-2 border-t border-white/12 pt-6 text-[13.5px] font-light text-white/70"
        >
          <span>לפרטים נוספים חייגו</span>
          <a
            href="tel:*3989"
            className="font-display text-[15px] font-medium tracking-[0.04em] tabular text-white hover:text-white/85"
          >
            *3989
          </a>
        </motion.p>
      </div>
    </motion.div>
  );
}

function Row({
  label,
  value,
  hint,
  last = false,
}: {
  label: string;
  value: string;
  hint?: string;
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
        <span className="text-[14px] font-light">{value}</span>
        {hint && (
          <span className="ms-1.5 text-[10px] font-light text-white/35">
            {hint}
          </span>
        )}
      </dd>
    </div>
  );
}
