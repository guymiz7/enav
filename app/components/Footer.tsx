"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const LEGAL = {
  terms: {
    title: "תנאי שימוש",
    body: `דף נחיתה זה מופעל על ידי ENAV (ענב) לצורך גיוס מתעניינים בכנס הנדל״ן. מילוי הטופס מהווה אישור לתנאים הבאים:
הפרטים שתמסור/י ישמשו ליצירת קשר ולשליחת עדכונים שיווקיים. ההצטרפות לתור אינה מבטיחה ביצוע צילום בפועל ותלויה בזמינות וסדר הגעה. החברה רשאית לעדכן תנאים אלה בכל עת.`,
  },
  privacy: {
    title: "מדיניות פרטיות",
    body: `המידע שנאסף (שם, טלפון, מייל, העדפות נדל״ן) נשמר במאגרי ENAV ומשמש לצורכי שיווק וקשר עם לקוחות. לא נעביר את פרטיך לצדדים שלישיים ללא רשותך. ניתן להסיר עצמך בכל רגע באמצעות פנייה לכתובת privacy@enav.example. מדיניות זו כפופה לדין הישראלי.`,
  },
};

export function Footer() {
  const [open, setOpen] = useState<keyof typeof LEGAL | null>(null);

  return (
    <footer className="px-5 pb-10 pt-10">
      <div className="mx-auto max-w-[440px]">
        {(Object.keys(LEGAL) as Array<keyof typeof LEGAL>).map((k) => {
          const isOpen = open === k;
          return (
            <div key={k} className="border-t border-white/10">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : k)}
                className="flex w-full items-center justify-between py-4 text-right"
              >
                <span className="text-[11px] font-light text-white/35">
                  {isOpen ? "−" : "+"}
                </span>
                <span className="text-[12px] font-light text-white/70">
                  {LEGAL[k].title}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-right text-[11px] font-light leading-[1.7] text-white/45 whitespace-pre-line">
                      {LEGAL[k].body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
        <div className="border-t border-white/10" />

        <p className="mt-8 text-center text-[10px] font-light text-white/25">
          © ENAV
        </p>
      </div>
    </footer>
  );
}
