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
};

const QUESTIONS: Q[] = [
  {
    id: "intent",
    kicker: "המטרה",
    prompt: "למה את/ה כאן?",
    image: "/media/AVIR_0099_1-scaled.jpg",
    options: [
      { value: "live", label: "למגורים" },
      { value: "invest", label: "להשקעה" },
    ],
  },
  {
    id: "budget",
    kicker: "התקציב",
    prompt: "מה טווח המחירים שלך?",
    image: "/media/AVIR_0123_-scaled.jpg",
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
    }, 460);
  };

  const canAdvance = q.multi
    ? (answers[q.id] as string[]).length > 0
    : !!(answers[q.id] as string | null);

  return (
    <section id="quiz" className="snap-section bg-navy">
      <div className="flex h-full flex-col">
        {/* IMAGE PREVIEW — top portion (~38% of viewport) */}
        <div className="relative h-[38svh] min-h-[220px] overflow-hidden bg-navy">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={q.image}
              src={asset(q.image)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 6, ease: "linear" },
              }}
            />
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy via-navy/65 to-transparent" />

          {/* progress bars at bottom of image */}
          <div className="absolute inset-x-0 bottom-0 flex items-end gap-1.5 px-5 pb-5">
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

        {/* QUESTION AREA — fills the rest */}
        <div className="flex flex-1 flex-col px-5 pb-8 pt-7">
          <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-1 flex-col"
              >
                <div className="mb-1.5 text-[10px] font-light uppercase tracking-[0.32em] text-white/45">
                  {q.kicker}
                </div>
                <h2 className="mb-6 font-display text-[clamp(1.7rem,7vw,2.2rem)] font-extralight leading-[1.15] tracking-[-0.015em]">
                  {q.prompt}
                </h2>

                {q.multi ? (
                  <>
                    <div className="grid grid-cols-2 gap-2">
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

                    <div className="mt-3 text-[11px] font-light text-white/45">
                      <span className="tabular text-white/80">
                        {answers.cities.length}
                      </span>{" "}
                      נבחרו · ניתן יותר מאחת
                    </div>

                    <button
                      type="button"
                      onClick={onComplete}
                      disabled={!canAdvance}
                      className={cn(
                        "mt-auto w-full border py-4 text-[15px] font-medium tracking-wide transition",
                        canAdvance
                          ? "border-white bg-white text-navy"
                          : "cursor-not-allowed border-white/15 bg-transparent text-white/30"
                      )}
                    >
                      התקדם
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
      whileTap={{ scale: 0.975 }}
      whileHover={{ x: -2 }}
      className={cn(
        "group relative block w-full overflow-hidden border px-5 py-5 text-right transition-colors duration-300",
        active
          ? "border-white bg-white/[0.08]"
          : "border-white/18 hover:border-white/55 hover:bg-white/[0.025]"
      )}
    >
      {/* RTL-start accent bar on the right edge */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{
          scaleY: active ? 1 : 0.18,
          opacity: active ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 right-0 w-[3px] origin-center bg-white"
      />

      {/* hover sweep — barely perceptible diagonal highlight from right to left on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-[-30%] w-[30%] -skew-x-12 bg-gradient-to-l from-white/0 via-white/[0.06] to-white/0 opacity-0 transition-all duration-700 group-hover:right-full group-hover:opacity-100"
      />

      <span
        className={cn(
          "block text-[17px] transition-colors duration-300",
          active ? "font-medium text-white" : "font-light text-white/88"
        )}
      >
        {label}
      </span>
      {hint && (
        <span
          className={cn(
            "mt-0.5 block text-[11px] font-light transition-colors duration-300",
            active ? "text-white/65" : "text-white/40"
          )}
        >
          {hint}
        </span>
      )}
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
      whileTap={{ scale: 0.96 }}
      whileHover={{ x: -2 }}
      className={cn(
        "group relative block overflow-hidden border px-3.5 py-3 text-right transition-colors duration-300",
        active
          ? "border-white bg-white/[0.08]"
          : "border-white/18 hover:border-white/55 hover:bg-white/[0.03]"
      )}
    >
      {/* RTL-start accent bar */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{
          scaleY: active ? 1 : 0.18,
          opacity: active ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 right-0 w-[2.5px] origin-center bg-white"
      />

      {tag && (
        <span
          className={cn(
            "block text-[9px] uppercase tracking-[0.2em] transition-colors duration-300",
            active ? "text-white/72" : "text-white/35"
          )}
        >
          {tag}
        </span>
      )}
      <span
        className={cn(
          "block text-[14.5px] leading-tight transition-colors duration-300",
          active ? "font-medium text-white" : "font-light text-white/85"
        )}
      >
        {label}
      </span>
    </motion.button>
  );
}
