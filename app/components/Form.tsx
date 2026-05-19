"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type LeadData = {
  name: string;
  phone: string;
  email: string;
  consent: boolean;
};

export function Form({
  unlocked,
  seats,
  onSubmit,
}: {
  unlocked: boolean;
  seats: number;
  onSubmit: (d: LeadData) => void;
}) {
  const [data, setData] = useState<LeadData>({
    name: "",
    phone: "",
    email: "",
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});

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
    <section className="px-5 pb-16 pt-8">
      <div className="mx-auto max-w-[440px]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 text-center"
        >
          <p className="text-[12px] font-light text-white/75">
            <span className="tabular font-medium text-white">{seats}</span> מקומות אחרונים — השלמ/י פרטים
          </p>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className={cn(
            "relative space-y-1 transition-opacity",
            !unlocked && "pointer-events-none opacity-30"
          )}
        >
          {!unlocked && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <span className="text-[12px] font-light text-white/65">
                ↑ ענה/י על השאלות כדי לפתוח
              </span>
            </div>
          )}

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

          <label className="mt-8 flex items-start gap-3 text-right text-[12px] font-light leading-[1.6] text-white/65">
            <input
              type="checkbox"
              checked={data.consent}
              onChange={(e) => setData({ ...data, consent: e.target.checked })}
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
            className="!mt-10 w-full border border-white bg-white py-4 text-[15px] font-medium tracking-wide text-black transition active:bg-white/90 disabled:opacity-60"
          >
            {submitting ? "שולח..." : "הצטרפ/י לתור"}
          </button>
        </form>
      </div>
    </section>
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
