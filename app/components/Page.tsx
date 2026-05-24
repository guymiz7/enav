"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Hero } from "./Hero";
import { Intro } from "./Intro";
import { Questions, type Answers } from "./Questions";
import { Form, type LeadData } from "./Form";
import { Success } from "./Success";

const WEBHOOK_URL = "https://hook.eu1.make.com/jyro25pviif2hveod9oxim7rbr3okw86";

function generateSlot() {
  const minsFromNow = 14 + Math.floor(Math.random() * 9);
  const d = new Date(Date.now() + minsFromNow * 60_000);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function Page() {
  const [introDone, setIntroDone] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    intent: null,
    budget: null,
    cities: [],
  });
  const [quizDone, setQuizDone] = useState(false);
  const [slotTime, setSlotTime] = useState<string | null>(null);
  const [success, setSuccess] =
    useState<{ position: number; name: string } | null>(null);

  const scrollerRef = useRef<HTMLElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const onIntroNext = () => {
    setIntroDone(true);
  };

  /* once the user has clicked the Intro CTA, mount Quiz and snap to it */
  useEffect(() => {
    if (introDone) {
      const t = setTimeout(() => scrollTo("quiz"), 120);
      return () => clearTimeout(t);
    }
  }, [introDone]);

  const onQuizComplete = () => {
    setQuizDone(true);
    setSlotTime(generateSlot());
  };

  useEffect(() => {
    if (quizDone) {
      const t = setTimeout(() => scrollTo("form"), 180);
      return () => clearTimeout(t);
    }
  }, [quizDone]);

  const onSubmit = (d: LeadData) => {
    const position = 4 + Math.floor(Math.random() * 6);
    setSuccess({ position, name: d.name });

    const payload = {
      name: d.name,
      phone: d.phone,
      email: d.email,
      consent: d.consent,
      intent: answers.intent,
      budget: answers.budget,
      cities: answers.cities,
      slotTime,
      position,
      submittedAt: new Date().toISOString(),
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    };

    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      /* swallow — success screen already shown, retry handled out-of-band */
    });
  };

  return (
    <>
      <main ref={scrollerRef} className="snap-scroll">
        <Hero />
        <Intro onNext={onIntroNext} />
        {/* Quiz and Form are gated behind the Intro CTA so the user cannot
            scroll past Intro until they click — there's literally no next
            section in the DOM yet. */}
        {introDone && (
          <Questions
            step={step}
            setStep={setStep}
            answers={answers}
            setAnswers={setAnswers}
            onComplete={onQuizComplete}
          />
        )}
        <AnimatePresence>
          {quizDone && slotTime && (
            <Form
              key="form"
              slotTime={slotTime}
              selectedCities={answers.cities.length}
              onSubmit={onSubmit}
            />
          )}
        </AnimatePresence>
      </main>
      {success && slotTime && (
        <Success
          position={success.position}
          name={success.name}
          slotTime={slotTime}
          intent={answers.intent}
          budget={answers.budget}
          cities={answers.cities}
        />
      )}
    </>
  );
}
