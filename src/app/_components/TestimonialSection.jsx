"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";

const TESTIMONIALS = [
  {
    quote:
      "SwasthiShield has completely changed how we plan for patient surges. What used to be guesswork is now a calm, data-driven process.",
    name: "Dr. Aditi Mehra",
    role: "Head of Operations",
    org: "CityCare Multispeciality Hospital",
  },
  {
    quote:
      "The AI agents quietly monitor dozens of signals in the background and only alert us when something truly matters. Our ICU preparedness has gone up dramatically.",
    name: "Rajesh Nair",
    role: "ICU Coordinator",
    org: "Swasthya Trust Hospital",
  },
  {
    quote:
      "Our team loves how simple the dashboards are. We get 7-day forecasts, staffing suggestions, and inventory flags in a single view.",
    name: "Dr. Kavya Sharma",
    role: "Medical Superintendent",
    org: "MetroCare Hospitals",
  },
];

const cardVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
    transition: { duration: 0.3, ease: "easeIn" },
  }),
};

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = (nextIndex) => {
    const total = TESTIMONIALS.length;
    const newIndex = (nextIndex + total) % total;
    setDirection(nextIndex > index ? 1 : -1);
    setIndex(newIndex);
  };

  const current = TESTIMONIALS[index];

  return (
    <section className="relative w-full bg-[#F7F4EE] py-24 md:py-28 overflow-hidden">
      {/* soft page glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10 flex flex-col items-center gap-10">
        {/* Heading */}
        <div className="text-center space-y-4">
          <ScrollFloat
            animationDuration={3.5}
            ease="back.inOut(1.5)"
            scrollStart="top bottom"
            scrollEnd="bottom center"
            stagger={0.05}
            textClassName="text-slate-900 font-extrabold"
            containerClassName="text-[clamp(2rem,4vw,2.8rem)]"
          >
            What Our Partners Are Saying
          </ScrollFloat>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-sm md:text-base text-slate-600"
          >
            Genuine testimonials from hospital leaders using SwasthiShield
            in live environments.
          </motion.p>
        </div>

        {/* Card stack */}
        <div className="relative w-full max-w-5xl mt-4">
          {/* back “pages” for stacked effect */}
          <div className="pointer-events-none">
            <div className="absolute inset-x-6 md:inset-x-10 top-6 h-[82%] rounded-3xl bg-[#F1EADF] shadow-[0_22px_45px_rgba(15,23,42,0.08)] rotate-[-2.2deg]" />
            <div className="absolute inset-x-10 md:inset-x-16 top-10 h-[80%] rounded-3xl bg-[#F3EEE5] shadow-[0_18px_40px_rgba(15,23,42,0.10)] rotate-[1.8deg]" />
          </div>

          {/* main card */}
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative rounded-3xl bg-[#FBF7F0] border border-[#E5D9C5] shadow-[0_26px_60px_rgba(15,23,42,0.16)] px-6 py-10 md:px-14 md:py-14"
            >
              <div className="space-y-8 md:space-y-10 max-w-3xl mx-auto">
                <p className="text-[15px] md:text-[17px] leading-relaxed text-slate-800">
                  {current.quote}
                </p>

                <div className="space-y-1 pt-2">
                  <p className="font-semibold text-slate-900 text-sm md:text-base">
                    {current.name}
                  </p>
                  <p className="text-xs md:text-sm text-slate-600">
                    {current.role}
                  </p>
                  <p className="text-xs md:text-sm text-slate-500">
                    {current.org}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center gap-6">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="h-11 w-11 md:h-12 md:w-12 rounded-full bg-slate-900 text-slate-50 flex items-center justify-center shadow-[0_12px_30px_rgba(15,23,42,0.35)] hover:bg-slate-800 transition-colors"
            aria-label="Previous testimonial"
          >
            <span className="text-lg md:text-xl">&#8592;</span>
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="h-11 w-11 md:h-12 md:w-12 rounded-full bg-slate-900 text-slate-50 flex items-center justify-center shadow-[0_12px_30px_rgba(15,23,42,0.35)] hover:bg-slate-800 transition-colors"
            aria-label="Next testimonial"
          >
            <span className="text-lg md:text-xl">&#8594;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
