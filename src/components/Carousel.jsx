"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiActivity, FiCpu, FiBell, FiBarChart2, FiClock } from "react-icons/fi";

const ITEMS = [
  {
    title: "Real-time Surge Prediction",
    description:
      "AI agents analyse live data, festivals and pollution to forecast patient spikes before they happen.",
    icon: FiActivity
  },
  {
    title: "Automated Resource Planning",
    description:
      "Smart staffing and bed allocation suggestions so hospitals stay ready without burning out teams.",
    icon: FiCpu
  },
  {
    title: "AI-powered Emergency Alerts",
    description:
      "Instant alerts for ICU load, bed saturation and critical thresholds – sent to the right people.",
    icon: FiBell
  },
  {
    title: "Operational Dashboards",
    description:
      "Clear, action-first dashboards for admins to see capacity, risk and surge hotspots at a glance.",
    icon: FiBarChart2
  },
  {
    title: "Proactive Readiness",
    description:
      "Prepare hours in advance instead of reacting late: stock, staff and systems in sync.",
    icon: FiClock
  }
];

export default function FeatureCarousel() {
  const [current, setCurrent] = useState(0);

  // AUTOPLAY every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ITEMS.length); // loop
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const item = ITEMS[current];
  const Icon = item.icon;

  return (
    <div className="inline-flex flex-col gap-5 mt-4">
      {/* CARD */}
      <div
        className="
          inline-flex items-start gap-5
          rounded-3xl
          bg-white/80
          px-6 py-5
          border border-[#E1E5EB]
          shadow-[0_12px_30px_rgba(15,23,42,0.12)]
          backdrop-blur-md
          max-w-lg
          transition-all duration-300
        "
      >
        {/* left accent */}
        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-lime-300 shadow-[0_0_0_6px_rgba(190,242,100,0.35)]">
          <Icon className="h-5 w-5 text-slate-900" />
        </div>

        {/* animated text block */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-1 pr-2"
          >
            <h3 className="text-base font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              {item.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DOTS */}
      <div className="flex gap-2 pl-1">
        {ITEMS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className="group relative h-3 w-3 rounded-full"
          >
            <span
              className={`block h-3 w-3 rounded-full transition-colors duration-150 ${
                idx === current ? "bg-slate-900" : "bg-slate-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
