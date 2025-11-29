"use client";

import { motion } from "framer-motion";
import TrueFocus from "@/components/TrueFocus";

const STATS = [
  {
    value: "92%",
    label: "Prediction Accuracy",
  },
  {
    value: "7 days",
    label: "Advance Forecasting",
  },
  {
    value: "50+ hospitals",
    label: "Currently using PHIS",
  },
  {
    value: "2.5M+",
    label: "Patients Tracked",
  },
];

export default function StatsSection() {
  return (
    <section className="w-full bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Animated Heading */}
        <TrueFocus
          sentence="PROVEN RESULTS"
          manualMode={false}
          blurAmount={5}
          borderColor="red"
          animationDuration={2}
          pauseBetweenAnimations={1}
        />

        {/* Underline accent */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 120, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          className="h-[3px] bg-black/80 mx-auto mt-4 rounded-full"
        />

        {/* Stats Grid */}
        <div
          className="
            grid grid-cols-2 md:grid-cols-4 gap-10 mt-16
            max-w-5xl mx-auto
          "
        >
          {STATS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.12,
                ease: "easeOut",
              }}
              whileHover={{
                y: -8,
                scale: 1.04,
                boxShadow: "0 22px 45px rgba(0,0,0,0.18)",
              }}
              className="
                relative group
                flex flex-col items-center justify-center gap-3
                px-7 py-8 md:px-8 md:py-9
                rounded-3xl
                bg-gradient-to-b from-[#FCFCFC] to-[#F1F1F1]
                border border-black/5
                shadow-[0_14px_30px_rgba(15,23,42,0.08)]
                cursor-default
                overflow-hidden
                transition-all
              "
            >
              {/* soft hover glow */}
              <div
                className="
                  pointer-events-none absolute inset-0
                  rounded-3xl
                  bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04),transparent_55%)]
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                "
              />

              {/* tiny status dot */}
              <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-medium text-black/50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
                <span className="uppercase tracking-[0.16em]">Live</span>
              </div>

              {/* Animated number */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: idx * 0.1,
                }}
                className="
                  text-4xl md:text-5xl font-extrabold text-black
                  drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]
                "
              >
                {item.value}
              </motion.div>

              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: 0.15 + idx * 0.1,
                }}
                className="
                  mt-1 text-sm md:text-base text-black/70 font-medium
                "
              >
                {item.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
