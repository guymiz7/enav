"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

export type Answers = {
  intent: string | null;
  budget: string | null;
  cities: string[];
};

type Q = {
  id: keyof Answers;
  multi?: boolean;
  kicker: string;
  prompt: string;
  options: { value: string; label: string; tag?: string; hint?: string }[];
  image: string;
  floorLabel: string;
};

const QUESTIONS: Q[] = [
  {
    id: "intent",
    kicker: "המטרה",
    prompt: "למה את/ה כאן?",
    image: "/media/AVIR_0099_1-scaled.jpg",
    floorLabel: "מבט · מהרחוב",
    options: [
      { value: "live", label: "למגורים", hint: "הבית הבא שלכם" },
      { value: "invest", label: "להשקעה", hint: "תשואה ועלייה בערך" },
    ],
  },
  {
    id: "budget",
    kicker: "התקציב",
    prompt: "באיזה טווח?",
    image: "/media/AVIR_0123_-scaled.jpg",
    floorLabel: "מבט · ביניים",
    options: [
      { value: "2", label: "₪2 מיליון" },
      { value: "3", label: "₪3 מיליון" },
      { value: "4", label: "₪4 מיליון" },
      { value: "5+", label: "₪5 מיליון ומעלה" },
    ],
  },
  {
    id: "cities",
    multi: true,
    kicker: "המיקום",
    prompt: "באיזו עיר?",
    image: "/media/tkuma-ks-ap-pool-c01_0-6-scaled.jpg",
    floorLabel: "מבט · פנטהאוז",
    options: [
      { value: "ramat-gan", label: "רמת גן" },
      { value: "tel-aviv", label: "תל אביב", tag: "פריסייל" },
      { value: "kfar-saba", label: "כפר סבא" },
      { value: "ein-hayam", label: "עין הים", tag: "פריסייל" },
      { value: "kiryat-ono", label: "קריית אונו" },
      { value: "yehud", label: "יהוד מונסון" },
      { value: "jerusalem", label: "ירושלים" },
      { value: "netanya", label: "נתניה" },
    ],
  },
];

export function Questions({
  step,
  setStep,
  answers,
  setAnswers,
  onComplete,
}: {
  step: number;
  setStep: (n: number) => void;
  answers: Answers;
  setAnswers: (a: Answers) => void;
  onComplete: () => void;
}) {
  const q = QUESTIONS[step - 1];
  const total = QUESTIONS.length;

  const handlePick = (val: string) => {
    if (q.multi) {
      const list = answers.cities;
      setAnswers({
        ...answers,
        cities: list.includes(val)
          ? list.filter((c) => c !== val)
          : [...list, val],
      });
      return;
    }
    setAnswers({ ...answers, [q.id]: val });
    setTimeout(() => {
      if (step < total) setStep(step + 1);
      else onComplete();
    }, 480);
  };

  const canAdvance = q.multi
    ? (answers[q.id] as string[]).length > 0
    : !!(answers[q.id] as string | null);

  return (
    <section className="bg-black">
      {/* IMAGE PREVIEW — the "configurator render" that changes per question */}
      <div className="relative h-[52svh] min-h-[300px] overflow-hidden bg-black">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={q.image}
            src={asset(q.image)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{
              opacity: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 6, ease: "linear" },
            }}
          />
        </AnimatePresence>

        {/* top + bottom gradients for legibility */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/65 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* floor label overlay */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`label-${q.id}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-20"
          >
            <span className="text-[10px] uppercase tracking-[0.32em] text-white/80">
              קומה {step}{" "}
              <span className="text-white/40">/ {total}</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.32em] text-white/80">
              {q.floorLabel}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* progress bars at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 flex items-end gap-1.5 px-5 pb-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-px flex-1 overflow-hidden bg-white/18">
              <motion.div
                className="h-full bg-white"
                initial={false}
                animate={{ width: step >= n ? "100%" : "0%" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* QUESTION AREA */}
      <div className="px-5 pb-16 pt-10">
        <div className="mx-auto max-w-[440px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-2 text-[10px] uppercase tracking-[0.32em] text-white/45">
                {q.kicker}
              </div>
              <h2 className="mb-8 text-[clamp(1.8rem,7.5vw,2.4rem)] font-light leading-[1.1] tracking-[-0.015em]">
                {q.prompt}
              </h2>

              {q.multi ? (
                <>
                  <div className="grid grid-cols-2 gap-2.5">
                    {q.options.map((opt) => (
                      <CityChip
                        key={opt.value}
                        label={opt.label}
                        tag={opt.tag}
                        active={answers.cities.includes(opt.value)}
                        onClick={() => handlePick(opt.value)}
                      />
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[11px] font-light text-white/45">
                    <span>
                      <span className="tabular text-white/80">
                        {answers.cities.length}
                      </span>{" "}
                      נבחרו · ניתן לבחור יותר מאחת
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onComplete}
                    disabled={!canAdvance}
                    className={cn(
                      "mt-7 w-full border py-4 text-[15px] font-medium tracking-wide transition",
                      canAdvance
                        ? "border-white bg-white text-black"
                        : "cursor-not-allowed border-white/15 bg-transparent text-white/30"
                    )}
                  >
                    שמרו לי את המקום
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <ChoiceRow
                      key={opt.value}
                      label={opt.label}
                      hint={opt.hint}
                      active={
                        (answers[q.id] as string | null) === opt.value
                      }
                      onClick={() => handlePick(opt.value)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ChoiceRow({
  label,
  hint,
  active,
  onClick,
}: {
  label: string;
  hint?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      className={cn(
        "group relative flex w-full items-center justify-between gap-3 border px-5 py-5 text-right transition-all duration-300",
        active
          ? "border-white bg-white/[0.05]"
          : "border-white/15 hover:border-white/40"
      )}
    >
      <div className="flex flex-col items-start">
        <span
          className={cn(
            "text-[17px] transition-colors",
            active ? "font-medium text-white" : "font-light text-white/85"
          )}
        >
          {label}
        </span>
        {hint && (
          <span className="mt-0.5 text-[11px] font-light text-white/40">
            {hint}
          </span>
        )}
      </div>

      {/* check indicator that fills on select */}
      <span
        className={cn(
          "relative flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300",
          active
            ? "border-white bg-white"
            : "border-white/30 bg-transparent"
        )}
      >
        <AnimatePresence>
          {active && (
            <motion.svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <path
                d="M2.5 6L5 8.5L9.5 3.5"
                stroke="#000"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}

function CityChip({
  label,
  tag,
  active,
  onClick,
}: {
  label: string;
  tag?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative flex flex-col items-end gap-1 border px-3.5 py-3 text-right transition-all duration-250",
        active
          ? "border-white bg-white/[0.05]"
          : "border-white/15 hover:border-white/40"
      )}
    >
      <span className="flex w-full items-center justify-between">
        <span
          className={cn(
            "h-2 w-2 rounded-full transition-all duration-300",
            active ? "bg-white" : "bg-white/15"
          )}
        />
        {tag && (
          <span
            className={cn(
              "text-[9px] uppercase tracking-[0.2em] transition",
              active ? "text-white/70" : "text-white/35"
            )}
          >
            {tag}
          </span>
        )}
      </span>
      <span
        className={cn(
          "text-[14.5px] leading-tight transition-colors",
          active ? "font-medium text-white" : "font-light text-white/82"
        )}
      >
        {label}
      </span>
    </motion.button>
  );
}
