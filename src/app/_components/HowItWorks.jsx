"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    step: "01",
    title: "Data Collection",
    desc: "Autonomous agents gather real-time data from hospital systems, weather APIs, pollution sensors, and news sources.",
  },
  {
    step: "02",
    title: "Analysis & Processing",
    desc: "Raw data is cleaned, normalized, and analyzed for patterns across multiple data streams and historical trends.",
  },
  {
    step: "03",
    title: "Predictive Modeling",
    desc: "Machine learning models generate surge forecasts for patient types, identify pollution risks, and predict peak hours.",
  },
  {
    step: "04",
    title: "Recommendations",
    desc: "AI agents provide actionable recommendations for staffing, resources, and emergency preparedness.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HowItWorksSection() {
  return (
    <section className="relative w-full bg-[#EFF4FF] py-24 md:py-28 overflow-hidden">
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,_rgba(132,204,22,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* LEFT — pseudo-3D “agent” panel */}
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="
              relative w-full max-w-md
              aspect-[4/5]
              rounded-3xl
              bg-gradient-to-b from-slate-900 via-slate-950 to-black
              border border-slate-800
              shadow-[0_30px_80px_rgba(15,23,42,0.7)]
              overflow-hidden
            "
          >
            {/* grid background */}
            <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,#334155_1px,transparent_0)] [background-size:18px_18px]" />

            {/* glowing center node */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="h-28 w-28 rounded-full bg-lime-400/20 blur-2xl" />
              <div className="absolute inset-3 rounded-full bg-lime-300/30 blur-xl" />
              <div className="absolute inset-6 flex items-center justify-center rounded-full bg-slate-900 border border-lime-300/60">
                <span className="text-[10px] text-center font-semibold tracking-[0.18em] text-lime-100 uppercase">
                  Agent Hub
                </span>
              </div>
            </motion.div>

            {/* orbiting nodes */}
            {[
              "Hospital EMR",
              "Weather & Pollution",
              "News & Events",
              "Beds & ICU",
            ].map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.3 + i * 0.12,
                }}
                className={`
                  absolute px-3 py-1.5 rounded-full
                  bg-white/5 border border-slate-600/60
                  backdrop-blur-sm text-[11px] text-slate-100
                  ${
                    i === 0
                      ? "top-10 left-6"
                      : i === 1
                      ? "top-16 right-4"
                      : i === 2
                      ? "bottom-20 left-4"
                      : "bottom-10 right-8"
                  }
                `}
              >
                {label}
              </motion.div>
            ))}

            {/* bottom label with tiny internal animation */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center">
              <div className="
                inline-flex items-center gap-3
                rounded-full border border-slate-700/80
                bg-slate-900/80 px-4 py-1.5
                backdrop-blur-sm
              ">
                {/* mini equalizer representing multiple live streams */}
                <div className="flex items-end gap-[2px] h-3">
                  <span className="stream-bar stream-bar-1" />
                  <span className="stream-bar stream-bar-2" />
                  <span className="stream-bar stream-bar-3" />
                </div>

                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-100">
                  Live multi-stream monitoring
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Text + Steps */}
        <div className="flex flex-col justify-center">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase text-lime-700/80">
              How SwasthiShield Works
            </p>

            <h2 className="mt-3 text-[clamp(1.9rem,3vw,2.6rem)] font-semibold text-slate-900">
              Four autonomous agents working together{" "}
              <span className="text-lime-700">to predict and prepare</span>
            </h2>
          </motion.div>

          {/* Steps */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-6 mt-10"
          >
            {STEPS.map((item, idx) => (
              <motion.div
                key={idx}
                variants={card}
                whileHover={{
                  y: -4,
                  scale: 1.01,
                  boxShadow: "0 18px 40px rgba(15,23,42,0.18)",
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative flex flex-col gap-2 rounded-xl border border-slate-200 bg-white px-6 py-5"
              >
                <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500">
                  <span className="h-[1px] w-6 bg-lime-500" />
                  {item.step}
                </span>

                <h3 className="text-[16px] font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
