"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Topbar } from "./Topbar";
import { Hero } from "./Hero";
import { Intro } from "./Intro";
import { Questions, type Answers } from "./Questions";
import { Form, type LeadData } from "./Form";
import { Success } from "./Success";

function generateSlot() {
  const minsFromNow = 14 + Math.floor(Math.random() * 9);
  const d = new Date(Date.now() + minsFromNow * 60_000);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function Page() {
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

  const onQuizComplete = () => {
    setQuizDone(true);
    setSlotTime(generateSlot());
  };

  /* whenever the quiz finishes, snap to the form section */
  useEffect(() => {
    if (quizDone) {
      const t = setTimeout(() => {
        const formEl = document.getElementById("form");
        formEl?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 180);
      return () => clearTimeout(t);
    }
  }, [quizDone]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const onSubmit = (d: LeadData) => {
    const position = 4 + Math.floor(Math.random() * 6);
    setSuccess({ position, name: d.name });
  };

  return (
    <>
      <Topbar />
      <main ref={scrollerRef} className="snap-scroll">
        <Hero />
        <Intro onNext={() => scrollTo("quiz")} />
        <Questions
          step={step}
          setStep={setStep}
          answers={answers}
          setAnswers={setAnswers}
          onComplete={onQuizComplete}
        />
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
