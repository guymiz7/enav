"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LegalSheet } from "./LegalSheet";

export type LeadData = {
  name: string;
  phone: string;
  email: string;
  consent: boolean;
};

export function Form({
  selectedCities: _selectedCities,
  onSubmit,
}: {
  slotTime?: string;
  selectedCities: number;
  onSubmit: (d: LeadData) => void;
}) {
  const [data, setData] = useState<LeadData>({
    name: "",
    phone: "",
    email: "",
    consent: true,
  });
  const [touched, setTouched] = useState<Partial<Record<keyof LeadData, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [legalOpen, setLegalOpen] = useState<"terms" | "privacy" | null>(null);

  const nameOk = data.name.trim().length >= 2;
  const phoneOk = data.phone.replace(/\D/g, "").length >= 9;
  const emailOk =
    !data.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);

  const formValid = nameOk && phoneOk && emailOk && data.consent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, email: true, consent: true });
    if (!formValid) return;
    setSubmitting(true);
    setTimeout(() => onSubmit(data), 900);
  };

  return (
    <section id="form" className="snap-section-grow bg-navy">
      <div className="flex min-h-[100svh] flex-col px-5 pb-6 pt-16">
        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-[460px] flex-1 flex-col"
        >
          <Field
            label="שם מלא"
            required
            error={touched.name && !nameOk ? "חובה" : undefined}
          >
            <input
              type="text"
              autoComplete="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              placeholder="—"
              className="input-line text-right"
              dir="rtl"
            />
          </Field>

          <Field
            label="טלפון"
            required
            error={
              touched.phone && !phoneOk
                ? data.phone
                  ? "לא תקין"
                  : "חובה"
                : undefined
            }
          >
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              placeholder="050 000 0000"
              className="input-line text-right tabular"
              dir="ltr"
            />
          </Field>

          <Field
            label="מייל"
            optional
            error={touched.email && !emailOk ? "לא תקין" : undefined}
          >
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="—"
              className="input-line text-right"
              dir="ltr"
            />
          </Field>

          <label className="mt-7 flex items-start gap-3 text-right text-[11px] font-light leading-[1.65] text-white/75">
            <input
              type="checkbox"
              checked={data.consent}
              onChange={(e) => {
                setData({ ...data, consent: e.target.checked });
                setTouched((t) => ({ ...t, consent: true }));
              }}
              className="check-box"
            />
            <span>
              {`מאשר/ת קבלת חומר פרסומי ומידע ענב יזום ניהול ש.ר ו/או מכל החברות הקשורות בה לרבות חברות בת ו/או שותפויות מטעמה ו/או כל חברה קשורה אחרת, בדוא"ל ו/או SMS ו/או שיחות שיווק טלפוני וכיוצ"ב גם אם אחד ממספרי הטלפון שלי רשום במאגר "אל תתקשרו אליי" ומסכים/ה ל`}
              <button
                type="button"
                onClick={() => setLegalOpen("terms")}
                className="underline underline-offset-2"
              >
                תקנון
              </button>
              {" ול"}
              <button
                type="button"
                onClick={() => setLegalOpen("privacy")}
                className="underline underline-offset-2"
              >
                מדיניות הפרטיות
              </button>
              {`. ניתן להסרה.`}
              {touched.consent && !data.consent && (
                <span className="ms-2 text-white/45">— נדרש אישור</span>
              )}
            </span>
          </label>

          <motion.button
            type="submit"
            disabled={submitting}
            whileTap={{ scale: 0.985 }}
            className={cn(
              "mt-auto w-full border py-4 text-[15px] font-medium tracking-wide transition",
              formValid && !submitting
                ? "border-white bg-white text-navy"
                : "border-white/15 bg-transparent text-white/45"
            )}
          >
            {submitting ? "כמעט שם..." : "קחו אותי לחוויה"}
          </motion.button>
        </form>
      </div>

      <LegalSheet kind={legalOpen} onClose={() => setLegalOpen(null)} />
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
    <div className="!mt-3 first:!mt-0">
      <div className="mb-1 flex items-baseline justify-between text-[11px] font-light">
        <span className="text-white/55">
          {label}
          {required && <span className="ms-0.5">*</span>}
          {optional && <span className="ms-1 text-white/30">(רשות)</span>}
        </span>
        {error && <span className="text-white/55">{error}</span>}
      </div>
      {children}
    </div>
  );
}
