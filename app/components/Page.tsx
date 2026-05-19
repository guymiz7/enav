"use client";

import { useEffect, useRef, useState } from "react";
import { Topbar } from "./Topbar";
import { Hero } from "./Hero";
import { Fomo } from "./Fomo";
import { Questions, type Answers } from "./Questions";
import { Form, type LeadData } from "./Form";
import { Success } from "./Success";
import { Footer } from "./Footer";

export function Page() {
  const [seats, setSeats] = useState(12);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    intent: null,
    budget: null,
    cities: [],
  });
  const [quizDone, setQuizDone] = useState(false);
  const [success, setSuccess] = useState<{ position: number; name: string } | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setSeats((s) => (s > 3 && Math.random() < 0.45 ? s - 1 : s));
    }, 11000);
    return () => clearInterval(t);
  }, []);

  const onQuizComplete = () => {
    setQuizDone(true);
    setTimeout(
      () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      80
    );
  };

  const onSubmit = (d: LeadData) => {
    const position = Math.max(3, Math.min(seats, 4 + Math.floor(Math.random() * 6)));
    setSuccess({ position, name: d.name });
  };

  return (
    <>
      <Topbar />
      <main>
        <Hero />
        <Fomo seats={seats} />
        <Questions
          step={step}
          setStep={setStep}
          answers={answers}
          setAnswers={setAnswers}
          onComplete={onQuizComplete}
        />
        <div ref={formRef}>
          <Form unlocked={quizDone} seats={seats} onSubmit={onSubmit} />
        </div>
        <Footer />
      </main>
      {success && <Success position={success.position} name={success.name} />}
    </>
  );
}
