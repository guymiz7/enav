"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FormBuilding } from "./FormBuilding";

export type LeadData = {
  name: string;
  phone: string;
  email: string;
  consent: boolean;
};

type Stage = {
  idx: number;
  stage: string;        // floor name (היסוד / קומה 01 / …)
  kicker: string;       // small uppercase intent
  prompt: string;       // big question
  field: keyof LeadData | "consent";
  required: boolean;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "tel" | "email" | "none";
  dir?: "rtl" | "ltr";
};

const STAGES: Stage[] = [
  {
    idx: 1,
    stage: "היסוד",
    kicker: "STAGE 01 · FOUNDATION",
    prompt: "מה השם שלך?",
    field: "name",
    required: true,
    placeholder: "לדוגמה: דנה כהן",
    type: "text",
    inputMode: "text",
    dir: "rtl",
  },
  {
    idx: 2,
    stage: "קומה 01",
    kicker: "STAGE 02 · FRAMEWORK",
    prompt: "מספר טלפון",
    field: "phone",
    required: true,
    placeholder: "050 000 0000",
    type: "tel",
    inputMode: "tel",
    dir: "ltr",
  },
  {
    idx: 3,
    stage: "קומה 02",
    kicker: "STAGE 03 · INTERIORS",
    prompt: "מייל לעדכונים",
    field: "email",
    required: false,
    placeholder: "name@domain.com",
    type: "email",
    inputMode: "email",
    dir: "ltr",
  },
  {
    idx: 4,
    stage: "הגג",
    kicker: "STAGE 04 · TOPPING OUT",
    prompt: "אישור ויציאה לתור",
    field: "consent",
    required: true,
  },
];

export function Form({
  slotTime,
  selectedCities,
  onSubmit,
}: {
  slotTime: string;
  selectedCities: number;
  onSubmit: (d: LeadData) => void;
}) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<LeadData>({
    name: "",
    phone: "",
    email: "",
    consent: false,
  });
  const [touched, setTouched] = useState<Partial<Record<keyof LeadData, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /* depleting urgency bar */
  const remaining = useMotionValue(1);
  const widthPct = useTransform(remaining, (v) => `${v * 100}%`);
  useEffect(() => {
    const controls = animate(remaining, 0.08, {
      duration: 360,
      ease: "linear",
    });
    return controls.stop;
  }, [remaining]);

  /* focus the input when step changes */
  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  const valid = (s: number) => {
    if (s === 1) return data.name.trim().length >= 2;
    if (s === 2) return data.phone.replace(/\D/g, "").length >= 9;
    if (s === 3)
      return !data.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    if (s === 4) return data.consent;
    return false;
  };

  const stageError = () => {
    if (step === 1 && touched.name && !valid(1))
      return data.name.trim() ? "שם קצר מדי" : "השדה חובה";
    if (step === 2 && touched.phone && !valid(2))
      return data.phone.trim() ? "מספר טלפון לא תקין" : "השדה חובה";
    if (step === 3 && touched.email && !valid(3)) return "כתובת מייל לא תקינה";
    if (step === 4 && touched.consent && !valid(4)) return "נדרש לאשר";
    return null;
  };

  const advance = () => {
    if (!valid(step)) {
      const key = STAGES[step - 1].field as keyof LeadData;
      setTouched((t) => ({ ...t, [key]: true }));
      return;
    }
    if (step < STAGES.length) {
      setStep(step + 1);
      return;
    }
    setSubmitting(true);
    setTimeout(() => onSubmit(data), 900);
  };

  const goBack = () => step > 1 && setStep(step - 1);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      advance();
    }
  };

  const stage = STAGES[step - 1];
  const error = stageError();
  const canSkip = step === 3 && !data.email; // email is optional

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="px-5 pb-20 pt-10"
    >
      <div className="mx-auto max-w-[460px]">
        {/* REWARD + SLOT — the FOMO header */}
        <div className="mb-10 text-center">
          <p className="text-[10px] font-light uppercase tracking-[0.34em] text-white/45">
            ENAV STUDIO · 14:00–18:00
          </p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-display text-[clamp(4.2rem,19vw,5.8rem)] font-extralight leading-none tabular tracking-[-0.045em]"
          >
            {slotTime}
          </motion.p>

          {/* reward statement — the value exchange */}
          <div className="mx-auto mt-5 max-w-[260px] border-y border-white/10 py-3">
            <p className="text-[10px] font-light uppercase tracking-[0.28em] text-white/40">
              REWARD
            </p>
            <p className="mt-1.5 text-[13px] font-light leading-[1.5] text-white/85">
              <span className="text-white">תמונה אישית</span>{" "}
              על הבטון בסטודיו של ENAV
            </p>
          </div>

          {/* depleting urgency bar */}
          <div className="mx-auto mt-6 h-px w-full max-w-[260px] overflow-hidden bg-white/15">
            <motion.div className="h-full bg-white" style={{ width: widthPct }} />
          </div>
          <p className="mt-3 text-[10px] font-light uppercase tracking-[0.28em] text-white/40">
            השלימו לפני שהקיר נסגר
          </p>
        </div>

        {/* BUILDING VISUALIZATION — grows per stage */}
        <div className="flex justify-center">
          <FormBuilding step={step} complete={false} />
        </div>

        {/* stage row */}
        <div className="mt-2 mb-7 flex items-end justify-between gap-3">
          <div className="text-right">
            <div className="text-[10px] font-light uppercase tracking-[0.32em] text-white/40">
              {stage.kicker}
            </div>
            <div className="mt-1 font-display text-[26px] font-extralight leading-tight tracking-[-0.01em] text-white">
              {stage.stage}
            </div>
          </div>
          <div className="text-left font-mono text-[11px] tabular text-white/40">
            {String(step).padStart(2, "0")} / 04
          </div>
        </div>

        {/* CURRENT STEP CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-[140px]"
          >
            <div className="mb-2 flex items-baseline justify-between">
              <p className="text-[20px] font-light text-white">
                {stage.prompt}
                {!stage.required && (
                  <span className="ms-2 text-[12px] text-white/35">(רשות)</span>
                )}
              </p>
              {error && (
                <span className="text-[11px] font-light text-white/55">
                  {error}
                </span>
              )}
            </div>

            {step < 4 ? (
              <input
                ref={inputRef}
                type={stage.type}
                inputMode={stage.inputMode}
                autoComplete={
                  stage.field === "name"
                    ? "name"
                    : stage.field === "phone"
                      ? "tel"
                      : stage.field === "email"
                        ? "email"
                        : undefined
                }
                value={data[stage.field as "name" | "phone" | "email"]}
                onChange={(e) =>
                  setData({ ...data, [stage.field]: e.target.value })
                }
                onBlur={() =>
                  setTouched((t) => ({ ...t, [stage.field as keyof LeadData]: true }))
                }
                onKeyDown={onKeyDown}
                placeholder={stage.placeholder}
                className="input-line text-right text-[22px] font-light"
                dir={stage.dir}
              />
            ) : (
              <ConsentBlock
                data={data}
                slotTime={slotTime}
                cities={selectedCities}
                onToggle={(v) => {
                  setData({ ...data, consent: v });
                  setTouched((t) => ({ ...t, consent: true }));
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* NAVIGATION */}
        <div className="mt-8 grid grid-cols-[44px_1fr] gap-2.5">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            aria-label="חזרה"
            className={cn(
              "border py-4 text-[14px] transition",
              step === 1
                ? "cursor-not-allowed border-white/5 text-white/15"
                : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
            )}
          >
            ←
          </button>
          <button
            type="button"
            onClick={advance}
            disabled={submitting}
            className={cn(
              "group relative overflow-hidden border py-4 text-[15px] font-medium tracking-wide transition",
              valid(step) && !submitting
                ? "border-white bg-white text-black"
                : "border-white/15 bg-transparent text-white/45"
            )}
          >
            {step < 4 ? (
              <span>
                {canSkip ? "דלגו ועלו לקומה 03" : "בנו את הקומה ועלו →"}
              </span>
            ) : submitting ? (
              <span>מאשר את התור...</span>
            ) : (
              <span>אשרו את המקום · {slotTime}</span>
            )}
          </button>
        </div>

        {/* STAGE INDICATOR DOTS */}
        <div className="mt-7 flex items-center justify-center gap-1.5">
          {STAGES.map((s) => (
            <div
              key={s.idx}
              className={cn(
                "h-px transition-all duration-500",
                s.idx === step
                  ? "w-10 bg-white"
                  : s.idx < step
                    ? "w-6 bg-white/70"
                    : "w-6 bg-white/12"
              )}
            />
          ))}
        </div>

        <p className="mt-6 text-center text-[10px] font-light tracking-[0.16em] text-white/30">
          ביטול אפשרי עד שעה לפני מועד הצילום
        </p>
      </div>
    </motion.section>
  );
}

function ConsentBlock({
  data,
  slotTime,
  cities,
  onToggle,
}: {
  data: LeadData;
  slotTime: string;
  cities: number;
  onToggle: (v: boolean) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="border-y border-white/10 py-4">
        <SummaryItem label="שם" value={data.name || "—"} />
        <SummaryItem label="טלפון" value={data.phone || "—"} mono />
        <SummaryItem
          label="מייל"
          value={data.email || "ללא"}
          hint={!data.email ? "(רשות)" : undefined}
        />
        <SummaryItem label="ערים נבחרות" value={`${cities}`} mono />
        <SummaryItem label="מועד הצילום" value={slotTime} mono last />
      </div>

      <label className="flex items-start gap-3 text-right text-[12px] font-light leading-[1.6] text-white/70">
        <input
          type="checkbox"
          checked={data.consent}
          onChange={(e) => onToggle(e.target.checked)}
          className="check-box"
        />
        <span>
          אני מסכימ/ה לקבלת תוכן שיווקי מ-ENAV ולתנאי השימוש ומדיניות הפרטיות.
        </span>
      </label>
    </div>
  );
}

function SummaryItem({
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
      className={cn(
        "flex items-baseline justify-between gap-3 py-2",
        !last && "border-b border-white/8"
      )}
    >
      <span className="text-[11px] font-light uppercase tracking-[0.18em] text-white/40">
        {label}
      </span>
      <span
        className={cn(
          "text-right",
          mono ? "tabular text-[14px] text-white" : "text-[13px] text-white/85"
        )}
      >
        {value}
        {hint && (
          <span className="ms-1 text-[10px] font-light text-white/30">
            {hint}
          </span>
        )}
      </span>
    </div>
  );
}
