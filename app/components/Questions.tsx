"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Answers = {
  intent: string | null;
  budget: string | null;
  cities: string[];
};

type Q = {
  id: keyof Answers;
  multi?: boolean;
  prompt: string;
  options: { value: string; label: string; tag?: string }[];
};

const QUESTIONS: Q[] = [
  {
    id: "intent",
    prompt: "מחפש/ת דירה למגורים או השקעה?",
    options: [
      { value: "live", label: "למגורים" },
      { value: "invest", label: "להשקעה" },
    ],
  },
  {
    id: "budget",
    prompt: "מה התקציב?",
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
    prompt: "באילו ערים?",
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
  const progress = step / total;

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
    // auto-advance for single-select
    setTimeout(() => {
      if (step < total) setStep(step + 1);
      else onComplete();
    }, 320);
  };

  const canAdvance =
    q.multi
      ? (answers[q.id] as string[]).length > 0
      : !!(answers[q.id] as string | null);

  const handleNext = () => {
    if (step < total) setStep(step + 1);
    else onComplete();
  };

  return (
    <section className="px-5 pb-16 pt-8">
      <div className="mx-auto grid max-w-[440px] grid-cols-[1fr_28px] gap-4">
        {/* main content */}
        <div className="min-h-[420px]">
          <div className="mb-6 flex items-baseline justify-between text-[11px] font-light text-white/35 tabular">
            <span>
              <span className="text-white/85">{String(step).padStart(2, "0")}</span>
              <span className="mx-1">/</span>
              <span>{String(total).padStart(2, "0")}</span>
            </span>
            <span>שאלה {step} מתוך {total}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="mb-7 text-[clamp(1.6rem,6.5vw,1.9rem)] font-light leading-[1.2] tracking-[-0.01em] text-balance">
                {q.prompt}
              </h2>

              {q.multi ? (
                <div className="grid grid-cols-2 gap-2.5">
                  {q.options.map((opt) => (
                    <Option
                      key={opt.value}
                      label={opt.label}
                      tag={opt.tag}
                      active={answers.cities.includes(opt.value)}
                      onClick={() => handlePick(opt.value)}
                      compact
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <Option
                      key={opt.value}
                      label={opt.label}
                      active={(answers[q.id] as string | null) === opt.value}
                      onClick={() => handlePick(opt.value)}
                    />
                  ))}
                </div>
              )}

              {q.multi && (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canAdvance}
                  className={cn(
                    "mt-7 w-full border border-white py-4 text-sm font-medium tracking-wide transition",
                    canAdvance
                      ? "bg-white text-black"
                      : "cursor-not-allowed border-white/15 bg-transparent text-white/30"
                  )}
                >
                  המשך
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* the building — a single thin vertical line that fills as you rise */}
        <div className="relative flex flex-col items-center">
          <span className="mb-3 text-[10px] font-light text-white/30 [writing-mode:vertical-rl] [text-orientation:mixed]">
            עלייה
          </span>
          <div className="relative h-[320px] w-px bg-white/12">
            <motion.div
              className="absolute inset-x-0 bottom-0 w-px bg-white"
              initial={false}
              animate={{ height: `${progress * 100}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* the marker rising along the line */}
            <motion.div
              className="absolute -right-[3px] h-1.5 w-1.5 bg-white"
              initial={false}
              animate={{ bottom: `calc(${progress * 100}% - 3px)` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Option({
  label,
  tag,
  active,
  onClick,
  compact = false,
}: {
  label: string;
  tag?: string;
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full text-right transition-all duration-300",
        compact
          ? "border px-3.5 py-3"
          : "flex items-center justify-between gap-3 border px-4 py-4",
        active
          ? "border-white bg-white/[0.04]"
          : "border-white/15 hover:border-white/40"
      )}
    >
      {compact ? (
        <div className="flex flex-col items-end gap-0.5">
          <span
            className={cn(
              "text-[14px] font-light leading-tight transition-colors",
              active ? "text-white" : "text-white/75"
            )}
          >
            {label}
          </span>
          {tag && (
            <span className="text-[10px] font-light text-white/40">{tag}</span>
          )}
        </div>
      ) : (
        <>
          <span
            className={cn(
              "text-[16px] font-light transition-colors",
              active ? "text-white" : "text-white/80"
            )}
          >
            {label}
          </span>
          <span
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              active ? "bg-white" : "bg-white/15"
            )}
          />
        </>
      )}
    </button>
  );
}
