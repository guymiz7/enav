"use client";

import { motion } from "framer-motion";

export function Fomo({ seats }: { seats: number }) {
  return (
    <section className="px-6 pb-16 pt-8">
      <div className="mx-auto max-w-[440px] text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.1rem,8.5vw,2.7rem)] font-light leading-[1.05] tracking-[-0.02em] text-balance"
        >
          המקום שלך
          <br />
          על הבטון
          <br />
          <span className="font-black">נסגר עכשיו.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-8 max-w-[26ch] text-[15px] font-light leading-[1.65] text-white/55"
        >
          תור הצילום הבלעדי של ENAV. רק מי שמשלים את הטופס — מצולם.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex items-center justify-center gap-2 text-[13px] font-light text-white/75"
        >
          <span className="h-1 w-1 rounded-full bg-white" />
          <span>
            נשארו <span className="tabular font-medium text-white">{seats}</span> מקומות
          </span>
        </motion.div>
      </div>
    </section>
  );
}
