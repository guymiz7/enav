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
import { LegalSheet } from "./LegalSheet";

export type LeadData = {
  name: string;
  phone: string;
  email: string;
  consent: boolean;
};

type Stage = {
  idx: number;
  stage: string;
  prompt: string;
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
    prompt: "השם שלך",
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
  const [legalOpen, setLegalOpen] = useState<"terms" | "privacy" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* 30-second looping countdown. Smooth bar drains alongside an integer display. */
  const COUNTDOWN_SECS = 30;
  const secondsMV = useMotionValue(COUNTDOWN_SECS);
  const widthPct = useTransform(secondsMV, (v) =>
    `${Math.max(0, (v / COUNTDOWN_SECS) * 100)}%`
  );
  const [seconds, setSeconds] = useState(COUNTDOWN_SECS);

  useEffect(() => {
    let cancelled = false;
    let controls: ReturnType<typeof animate> | null = null;

    const tick = () => {
      if (cancelled) return;
      secondsMV.set(COUNTDOWN_SECS);
      controls = animate(secondsMV, 0, {
        duration: COUNTDOWN_SECS,
        ease: "linear",
        onUpdate: (v) => setSeconds(Math.max(0, Math.ceil(v))),
        onComplete: () => {
          setSeconds(0);
          /* brief pause at zero, then loop */
          setTimeout(tick, 400);
        },
      });
    };
    tick();

    return () => {
      cancelled = true;
      controls?.stop();
    };
  }, [secondsMV]);

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
      return data.name.trim() ? "שם קצר מדי" : "חובה";
    if (step === 2 && touched.phone && !valid(2))
      return data.phone.trim() ? "לא תקין" : "חובה";
    if (step === 3 && touched.email && !valid(3)) return "לא תקין";
    if (step === 4 && touched.consent && !valid(4)) return "נדרש אישור";
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

  const display = `00:${String(seconds).padStart(2, "0")}`;

  return (
    <section id="form" className="snap-section bg-black">
      <div className="flex h-full flex-col px-5 pb-5 pt-16">
        {/* 10-SECOND COUNTDOWN — replaces the HH:MM anchor */}
        <div className="shrink-0 text-center">
          <p className="text-[10px] font-light uppercase tracking-[0.34em] text-white/45">
            נשארו לכם
          </p>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 font-display text-[clamp(3rem,13vw,3.8rem)] font-extralight leading-none tabular tracking-[-0.045em]"
          >
            {display}
          </motion.p>
          <div className="mx-auto mt-2 h-px w-full max-w-[220px] overflow-hidden bg-white/15">
            <motion.div className="h-full bg-white" style={{ width: widthPct }} />
          </div>
        </div>

        {/* BUILDING + FIELD — visually one unit */}
        <div className="mx-auto flex w-full max-w-[460px] flex-1 flex-col items-stretch pt-3">
          <div className="flex justify-center">
            <FormBuilding step={step} complete={false} />
          </div>

          <div className="relative mx-auto -mt-1 h-3 w-px bg-white/30" />

          <div className="mb-1.5 mt-2 flex items-baseline justify-between">
            <div>
              <div className="text-[10px] font-light uppercase tracking-[0.32em] text-white/45">
                שלב {String(step).padStart(2, "0")} / 04
              </div>
              <div className="mt-0.5 font-display text-[17px] font-light tracking-tight text-white">
                {stage.stage}
              </div>
            </div>
            <AnimatePresence>
              {error && (
                <motion.span
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-[11px] font-light text-white/55"
                >
                  {error}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <p className="text-[15px] font-light text-white">
                {stage.prompt}
                {!stage.required && (
                  <span className="ms-2 text-[11px] text-white/35">(רשות)</span>
                )}
              </p>

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
                    setTouched((t) => ({
                      ...t,
                      [stage.field as keyof LeadData]: true,
                    }))
                  }
                  onKeyDown={onKeyDown}
                  placeholder={stage.placeholder}
                  className="input-line text-right text-[19px] font-light"
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
                  onOpenLegal={(k) => setLegalOpen(k)}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* nav */}
          <div className="mt-auto grid grid-cols-[40px_1fr] gap-2 pt-3">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 1}
              aria-label="חזרה"
              className={cn(
                "border py-3.5 text-[14px] transition",
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
                "border py-3.5 text-[14.5px] font-medium tracking-wide transition",
                valid(step) && !submitting
                  ? "border-white bg-white text-black"
                  : "border-white/15 bg-transparent text-white/45"
              )}
            >
              {step < 4 ? (
                <span>התקדם</span>
              ) : submitting ? (
                <span>כמעט שם...</span>
              ) : (
                <span>קחו אותי לחוויה</span>
              )}
            </button>
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5">
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
        </div>
      </div>

      <LegalSheet kind={legalOpen} onClose={() => setLegalOpen(null)} />
    </section>
  );
}

function ConsentBlock({
  data,
  slotTime,
  cities,
  onToggle,
  onOpenLegal,
}: {
  data: LeadData;
  slotTime: string;
  cities: number;
  onToggle: (v: boolean) => void;
  onOpenLegal: (k: "terms" | "privacy") => void;
}) {
  return (
    <div className="mt-2 space-y-3">
      <div className="space-y-1 border-y border-white/10 py-2.5 text-[11px] font-light leading-tight">
        <Row label="שם" value={data.name || "—"} />
        <Row label="טלפון" value={data.phone || "—"} mono />
        <Row label="ערים" value={`${cities}`} mono />
        <Row label="מועד" value={slotTime} mono />
      </div>

      <label className="flex items-start gap-3 text-right text-[11.5px] font-light leading-[1.5] text-white/72">
        <input
          type="checkbox"
          checked={data.consent}
          onChange={(e) => onToggle(e.target.checked)}
          className="check-box"
        />
        <span>
          אני מסכימ/ה לקבלת תוכן שיווקי מ-ENAV ול
          <button
            type="button"
            onClick={() => onOpenLegal("terms")}
            className="underline underline-offset-2"
          >
            תנאי השימוש
          </button>{" "}
          ו
          <button
            type="button"
            onClick={() => onOpenLegal("privacy")}
            className="underline underline-offset-2"
          >
            מדיניות הפרטיות
          </button>
          .
        </span>
      </label>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
        {label}
      </span>
      <span
        className={cn(
          "text-right",
          mono ? "tabular text-[12px] text-white" : "text-[11.5px] text-white/85"
        )}
      >
        {value}
      </span>
    </div>
  );
}
