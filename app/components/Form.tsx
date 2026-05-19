"use client";

import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export type LeadData = {
  name: string;
  phone: string;
  email: string;
  consent: boolean;
};

export function Form({
  slotTime,
  selectedCities,
  onSubmit,
}: {
  slotTime: string;
  selectedCities: number;
  onSubmit: (d: LeadData) => void;
}) {
  const [data, setData] = useState<LeadData>({
    name: "",
    phone: "",
    email: "",
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>(
    {}
  );

  // depleting urgency bar — slowly drains from 100% to 8% over ~6 minutes
  const remaining = useMotionValue(1);
  const widthPct = useTransform(remaining, (v) => `${v * 100}%`);
  useEffect(() => {
    const controls = animate(remaining, 0.08, {
      duration: 360,
      ease: "linear",
    });
    return controls.stop;
  }, [remaining]);

  const validate = () => {
    const e: Partial<Record<keyof LeadData, string>> = {};
    if (!data.name.trim()) e.name = "חובה";
    const p = data.phone.replace(/\D/g, "");
    if (!p) e.phone = "חובה";
    else if (p.length < 9) e.phone = "לא תקין";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = "לא תקין";
    if (!data.consent) e.consent = "נדרשת הסכמה";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => onSubmit(data), 800);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="px-5 pb-20 pt-12"
    >
      <div className="mx-auto max-w-[440px]">
        {/* TIME SLOT ANCHOR — the FOMO centerpiece (Tesla "earliest delivery" pattern) */}
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/45">
            המקום שלך נשמר
          </p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-[clamp(4rem,18vw,5.6rem)] font-light leading-none tabular tracking-[-0.04em]"
          >
            {slotTime}
          </motion.p>
          <p className="mt-3 text-[12px] font-light text-white/55">
            הקצאה אישית · השלימו פרטים תוך הדקות הקרובות
          </p>

          {/* depleting urgency bar */}
          <div className="mx-auto mt-7 h-px w-full max-w-[260px] overflow-hidden bg-white/15">
            <motion.div
              className="h-full bg-white"
              style={{ width: widthPct }}
            />
          </div>
        </div>

        {/* summary chip */}
        {selectedCities > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mb-10 flex items-center justify-center gap-1.5 text-[11px] font-light text-white/55"
          >
            <span className="h-1 w-1 rounded-full bg-white/55" />
            <span>
              <span className="tabular text-white">{selectedCities}</span> ערים
              נשמרו בהעדפות
            </span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-1">
          <Field label="שם מלא" required error={errors.name}>
            <input
              type="text"
              autoComplete="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="—"
              className="input-line text-right"
              dir="rtl"
            />
          </Field>

          <Field label="טלפון" required error={errors.phone}>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              placeholder="050 000 0000"
              className="input-line text-right tabular"
              dir="ltr"
            />
          </Field>

          <Field label="מייל" optional error={errors.email}>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="—"
              className="input-line text-right"
              dir="ltr"
            />
          </Field>

          <label className="mt-10 flex items-start gap-3 text-right text-[12px] font-light leading-[1.6] text-white/65">
            <input
              type="checkbox"
              checked={data.consent}
              onChange={(e) =>
                setData({ ...data, consent: e.target.checked })
              }
              className="check-box"
            />
            <span>
              אני מסכימ/ה לקבלת תוכן שיווקי מ-ENAV ולתנאי השימוש ומדיניות הפרטיות.
              {errors.consent && (
                <span className="ms-2 text-white/45">— {errors.consent}</span>
              )}
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="group relative !mt-10 w-full overflow-hidden border border-white bg-white py-4 text-[15px] font-medium tracking-wide text-black transition active:bg-white/90 disabled:opacity-60"
          >
            <span className="relative">
              {submitting ? "מאשר..." : `אשרו את המקום · ${slotTime}`}
            </span>
          </button>

          <p className="mt-4 text-center text-[10px] font-light tracking-wide text-white/30">
            ביטול אפשרי עד שעה לפני מועד הצילום
          </p>
        </form>
      </div>
    </motion.section>
  );
}

function Field({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="!mt-6 first:!mt-0">
      <div className="mb-1 flex items-baseline justify-between text-[11px] font-light">
        <span className="text-white/55">
          {label}
          {required && <span className="ms-0.5">*</span>}
          {optional && <span className="ms-1 text-white/30">(רשות)</span>}
        </span>
        {error && <span className="text-white/45">{error}</span>}
      </div>
      {children}
    </div>
  );
}
