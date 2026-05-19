"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Topbar } from "./Topbar";
import { Hero } from "./Hero";
import { Questions, type Answers } from "./Questions";
import { Form, type LeadData } from "./Form";
import { Success } from "./Success";
import { Footer } from "./Footer";

export function Page() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    intent: null,
    budget: null,
    cities: [],
  });
  const [quizDone, setQuizDone] = useState(false);
  const [success, setSuccess] = useState<{ position: number; name: string } | null>(
    null
  );
  const formRef = useRef<HTMLDivElement>(null);

  const onQuizComplete = () => {
    setQuizDone(true);
  };

  useEffect(() => {
    if (quizDone) {
      const t = setTimeout(
        () =>
          formRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        120
      );
      return () => clearTimeout(t);
    }
  }, [quizDone]);

  const onSubmit = (d: LeadData) => {
    const position = 4 + Math.floor(Math.random() * 6);
    setSuccess({ position, name: d.name });
  };

  return (
    <>
      <Topbar />
      <main>
        <Hero />
        <Questions
          step={step}
          setStep={setStep}
          answers={answers}
          setAnswers={setAnswers}
          complete={quizDone}
          onComplete={onQuizComplete}
        />
        <div ref={formRef}>
          <AnimatePresence>
            {quizDone && <Form onSubmit={onSubmit} />}
          </AnimatePresence>
        </div>
        <Footer />
      </main>
      {success && <Success position={success.position} name={success.name} />}
    </>
  );
}
