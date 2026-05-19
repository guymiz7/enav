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

  const remaining = useMotionValue(1);
  const widthPct = useTransform(remaining, (v) => `${v * 100}%`);
  useEffect(() => {
    const controls = animate(remaining, 0.08, {
      duration: 360,
      ease: "linear",
    });
    return controls.stop;
  }, [remaining]);

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
  const canSkip = step === 3 && !data.email;

  return (
    <section id="form" className="snap-section bg-black">
      <div className="flex h-full flex-col">
        {/* SLOT ANCHOR — compact */}
        <div className="px-5 pt-20 text-center">
          <p className="text-[10px] font-light uppercase tracking-[0.34em] text-white/45">
            המקום שלך נשמר עד
          </p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 font-display text-[clamp(3.6rem,16vw,4.8rem)] font-extralight leading-none tabular tracking-[-0.045em]"
          >
            {slotTime}
          </motion.p>
          <div className="mx-auto mt-3 h-px w-full max-w-[240px] overflow-hidden bg-white/15">
            <motion.div className="h-full bg-white" style={{ width: widthPct }} />
          </div>
        </div>

        {/* BUILDING + FIELD GROUP — visually integrated as one form unit */}
        <div className="flex flex-1 flex-col px-5 pb-6 pt-4">
          <div className="mx-auto flex w-full max-w-[460px] flex-1 flex-col items-stretch">
            {/* the building — always visible, animates as stages complete */}
            <div className="flex justify-center">
              <FormBuilding step={step} complete={false} />
            </div>

            {/* connector tick — visually anchors the field to the active floor */}
            <div className="relative mx-auto -mt-1 h-3 w-px bg-white/30" />

            {/* stage label + step counter */}
            <div className="mb-2 mt-3 flex items-baseline justify-between">
              <div>
                <div className="text-[10px] font-light uppercase tracking-[0.32em] text-white/45">
                  שלב {String(step).padStart(2, "0")} / 04
                </div>
                <div className="mt-1 font-display text-[18px] font-light tracking-tight text-white">
                  {stage.stage}
                </div>
              </div>
              <AnimatePresence>
                {error && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[11px] font-light text-white/55"
                  >
                    {error}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* field area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                <p className="text-[16px] font-light text-white">
                  {stage.prompt}
                  {!stage.required && (
                    <span className="ms-2 text-[12px] text-white/35">(רשות)</span>
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
                    value={
                      data[stage.field as "name" | "phone" | "email"]
                    }
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
                    className="input-line text-right text-[20px] font-light"
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
            <div className="mt-auto grid grid-cols-[44px_1fr] gap-2.5 pt-4">
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
                    {canSkip ? "דלגו ובנו את הקומה" : "בנו את הקומה ועלו"}
                  </span>
                ) : submitting ? (
                  <span>מאשר את התור...</span>
                ) : (
                  <span>אשרו · {slotTime}</span>
                )}
              </button>
            </div>

            {/* dots */}
            <div className="mt-5 flex items-center justify-center gap-1.5">
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
      {/* mini summary */}
      <div className="border-y border-white/10 py-3 text-[12px] font-light">
        <Row label="שם" value={data.name || "—"} />
        <Row label="טלפון" value={data.phone || "—"} mono />
        <Row label="ערים" value={`${cities}`} mono />
        <Row label="מועד" value={slotTime} mono last />
      </div>

      <label className="flex items-start gap-3 text-right text-[12px] font-light leading-[1.5] text-white/75">
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
            className="underline-offset-2 hover:underline"
          >
            תנאי השימוש
          </button>{" "}
          ו
          <button
            type="button"
            onClick={() => onOpenLegal("privacy")}
            className="underline-offset-2 hover:underline"
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
  last,
}: {
  label: string;
  value: string;
  mono?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-3 py-1.5",
        !last && "border-b border-white/8"
      )}
    >
      <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
        {label}
      </span>
      <span
        className={cn(
          "text-right",
          mono ? "tabular text-[13px] text-white" : "text-[12px] text-white/85"
        )}
      >
        {value}
      </span>
    </div>
  );
}
