"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Moon,
  Sun,
  Database,
  Cloud,
  FileText,
  Activity,
  AlertCircle,
  TrendingUp,
  Users,
  Package,
} from "lucide-react";
import { useTheme } from "next-themes";

import Navbar from "../_components/Navbar";
import ScrollFloat from "@/components/ScrollFloat";
import ScrambledText from "@/components/ScrambledText";

/* ============================================================
   🌌 DASHBOARD LAYOUT (INLINE, MATCHES OTHER DASHBOARD PAGES)
   ============================================================ */
function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#050616] text-white relative overflow-hidden">
      {/* soft global background glows */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),transparent_70%)]" />

      {/* global navbar used on landing page */}
      <Navbar />

      <div className="lg:ml-64">
        {/* top bar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 backdrop-blur-xl bg-[#050616]/80 border-b border-slate-800/80"
        >
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-900 rounded-lg transition"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex-1" />

            {/* theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-slate-900 rounded-lg transition"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </motion.header>

        {/* page content */}
        <main className="p-6 max-w-7xl mx-auto relative z-10">{children}</main>
      </div>
    </div>
  );
}

/* ============================================================
   🔹 STEP 1 — DATA COLLECTION AGENT
   ============================================================ */

const STEP1_TASKS = [
  { icon: Cloud, label: "Fetching AQI from sensors..." },
  { icon: FileText, label: "Scanning recent news & events..." },
  { icon: Database, label: "Importing hospital data..." },
  { icon: Activity, label: "Collecting festival data..." },
];

function Step1DataCollection({ isRunning, stepIndex }) {
  const isActive = isRunning && stepIndex === 0;
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);

  // cycle tasks while active
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setActiveTaskIndex((prev) => (prev + 1) % STEP1_TASKS.length);
    }, 750);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/90 border border-slate-800/70 hover:border-cyan-400/60 rounded-2xl p-5 transition-colors shadow-[0_22px_70px_rgba(15,23,42,0.85)]">
      <div className="flex flex-col gap-1 mb-4">
        <h2 className="text-white text-lg font-semibold">
          Step 1: Data Collection Agent
        </h2>
        <p className="text-slate-400 text-sm">
          Gathering real-time data from multiple sources
        </p>
      </div>

      <motion.div
        animate={isActive ? { opacity: 1 } : { opacity: 0.6 }}
        className="space-y-3"
      >
        {STEP1_TASKS.map((task, idx) => {
          const Icon = task.icon;
          const taskActive = isActive && idx === activeTaskIndex;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.5, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                isActive
                  ? "bg-cyan-500/10 border-cyan-500/30"
                  : "bg-slate-900/40 border-slate-800/60"
              }`}
            >
              <motion.div
                animate={
                  taskActive
                    ? { rotate: 360, scale: [1, 1.15, 1] }
                    : { rotate: 0, scale: 1 }
                }
                transition={
                  taskActive
                    ? {
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }
                    : {}
                }
                className={`flex-shrink-0 p-2 rounded-lg ${
                  isActive ? "bg-cyan-500/20" : "bg-slate-800/60"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-cyan-400" : "text-slate-400"
                  }`}
                />
              </motion.div>

              <span
                className={`text-sm ${
                  isActive ? "text-slate-100" : "text-slate-400"
                }`}
              >
                {task.label}
              </span>

              {taskActive && (
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.1,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]"
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {isActive && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="mt-4 h-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 rounded-full"
        />
      )}

      <motion.p
        animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
        className={`mt-2 text-xs ${
          isActive ? "text-cyan-300" : "text-slate-400"
        }`}
      >
        {isActive
          ? "⚡ Processing live data streams..."
          : "⏳ Waiting for execution..."}
      </motion.p>
    </div>
  );
}

/* ============================================================
   🔹 STEP 2 — DATA CLEANING & PROCESSING
   ============================================================ */

function Step2DataCleaning({ isRunning, stepIndex }) {
  const isActive = isRunning && stepIndex === 1;
  const steps = [
    "Removing Outliers",
    "Normalizing Values",
    "Filling Missing Data",
    "Validating Records",
  ];

  return (
    <div className="bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/90 border border-slate-800/70 hover:border-cyan-400/60 rounded-2xl p-5 transition-colors shadow-[0_22px_70px_rgba(15,23,42,0.85)]">
      <div className="flex flex-col gap-1 mb-4">
        <h2 className="text-white text-lg font-semibold">
          Step 2: Data Cleaning &amp; Processing
        </h2>
        <p className="text-slate-400 text-sm">
          Removing noise and normalizing multi-source data
        </p>
      </div>

      {/* pipeline box */}
      <div className="relative h-32 bg-slate-900/60 rounded-xl border border-slate-800/60 overflow-hidden px-4 py-3 mb-4">
        {/* raw data */}
        <motion.div
          animate={
            isActive
              ? { x: [0, 150], opacity: [1, 0] }
              : { x: 0, opacity: 0.7 }
          }
          transition={{
            duration: 1.6,
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 px-3 py-1 bg-red-500/20 border border-red-500/40 rounded text-xs text-red-300 shadow-[0_0_12px_rgba(248,113,113,0.6)] whitespace-nowrap"
        >
          Raw Data 🚨
        </motion.div>

        {/* processing node */}
        <motion.div
          animate={
            isActive
              ? { scale: [1, 1.08, 1], boxShadow: ["0 0 0", "0 0 25px rgba(34,211,238,0.7)", "0 0 0"] }
              : { scale: 1 }
          }
          transition={{
            duration: 1.3,
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-cyan-500/15 border border-cyan-500/40 rounded-lg text-xs text-cyan-300"
        >
          Processing ⚙️
        </motion.div>

        {/* clean data */}
        <motion.div
          animate={
            isActive
              ? { x: [260, 150], opacity: [0, 1] }
              : { x: 260, opacity: 0.7 }
          }
          transition={{
            duration: 1.6,
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
            delay: 0.3,
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-1 bg-emerald-500/15 border border-emerald-500/40 rounded text-xs text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.7)] whitespace-nowrap"
        >
          Clean Data ✓
        </motion.div>

        {/* arrows */}
        <motion.div
          animate={
            isActive ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.4 }
          }
          transition={{
            duration: 1.1,
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
          }}
          className="absolute left-1/4 top-1/2 -translate-y-1/2 text-cyan-400 text-xl"
        >
          →
        </motion.div>
        <motion.div
          animate={
            isActive ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.4 }
          }
          transition={{
            duration: 1.1,
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
            delay: 0.2,
          }}
          className="absolute right-1/4 top-1/2 -translate-y-1/2 text-cyan-400 text-xl"
        >
          →
        </motion.div>
      </div>

      {/* textual steps */}
      <div className="space-y-2 mb-2">
        {steps.map((step, idx) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -8 }}
            animate={
              isActive
                ? { opacity: 1, x: 0 }
                : { opacity: 0.5, x: 0 }
            }
            transition={{ delay: idx * 0.2 }}
            className="flex items-center gap-2 text-sm"
          >
            <motion.div
              animate={
                isActive
                  ? { scale: [0, 1, 0.9, 1] }
                  : { scale: 0.8 }
              }
              transition={{
                duration: 0.6,
                delay: idx * 0.2,
                repeat: isActive ? Number.POSITIVE_INFINITY : 0,
              }}
              className="w-2 h-2 rounded-full bg-cyan-400"
            />
            <span
              className={isActive ? "text-slate-100" : "text-slate-400"}
            >
              {step}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.p
        animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
        className={`text-xs ${
          isActive ? "text-cyan-300" : "text-slate-400"
        }`}
      >
        {isActive
          ? "🔄 Data normalization in progress..."
          : "⏳ Waiting for execution..."}
      </motion.p>
    </div>
  );
}

/* ============================================================
   🔹 STEP 3 — AI PREDICTION (NEURAL NETWORK)
   ============================================================ */

function Step3Prediction({ isRunning, stepIndex }) {
  const isActive = isRunning && stepIndex === 2;
  const confidence = isActive ? 92 : 0;

  return (
    <div className="bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/90 border border-slate-800/70 hover:border-cyan-400/60 rounded-2xl p-5 transition-colors shadow-[0_22px_70px_rgba(15,23,42,0.85)]">
      <div className="flex flex-col gap-1 mb-4">
        <h2 className="text-white text-lg font-semibold">
          Step 3: Prediction Agent (Neural Network)
        </h2>
        <p className="text-slate-400 text-sm">
          AI model generating surge predictions
        </p>
      </div>

      {/* neural network viz */}
      <div className="relative h-40 bg-slate-900/70 rounded-xl border border-slate-800/60 mb-5 overflow-hidden">
        <motion.div className="relative w-full h-full">
          {/* input nodes */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`input-${i}`}
              animate={
                isActive
                  ? { y: [-6, 6, -6], opacity: [0.4, 1, 0.4] }
                  : { y: 0, opacity: 0.4 }
              }
              transition={{
                duration: 2,
                repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                delay: i * 0.2,
              }}
              className="absolute w-3 h-3 rounded-full bg-cyan-400"
              style={{
                left: "10%",
                top: `${30 + i * 20}%`,
                boxShadow: "0 0 12px rgba(34,211,238,0.7)",
              }}
            />
          ))}

          {/* hidden nodes */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={`hidden-${i}`}
              animate={
                isActive
                  ? { scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }
                  : { scale: 1, opacity: 0.6 }
              }
              transition={{
                duration: 1.6,
                repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                delay: i * 0.18 + 0.4,
              }}
              className="absolute w-3 h-3 rounded-full bg-blue-400"
              style={{
                left: "50%",
                top: `${15 + i * 20}%`,
                boxShadow: "0 0 16px rgba(59,130,246,0.9)",
              }}
            />
          ))}

          {/* output nodes */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`output-${i}`}
              animate={
                isActive
                  ? { y: [6, -6, 6] }
                  : { y: 0 }
              }
              transition={{
                duration: 2,
                repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                delay: i * 0.2,
              }}
              className="absolute w-3 h-3 rounded-full bg-emerald-400"
              style={{
                right: "10%",
                top: `${30 + i * 20}%`,
                boxShadow: "0 0 12px rgba(74,222,128,0.8)",
              }}
            />
          ))}

          {/* some connecting lines when active */}
          {isActive && (
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="nn-line" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(34,211,238,0.6)" />
                  <stop offset="100%" stopColor="rgba(74,222,128,0.6)" />
                </linearGradient>
              </defs>
              <line
                x1="12%"
                y1="32%"
                x2="50%"
                y2="20%"
                stroke="url(#nn-line)"
                strokeWidth="1"
                opacity="0.6"
              />
              <line
                x1="12%"
                y1="50%"
                x2="50%"
                y2="35%"
                stroke="url(#nn-line)"
                strokeWidth="1"
                opacity="0.6"
              />
              <line
                x1="50%"
                y1="35%"
                x2="88%"
                y2="30%"
                stroke="url(#nn-line)"
                strokeWidth="1"
                opacity="0.6"
              />
              <line
                x1="50%"
                y1="55%"
                x2="88%"
                y2="50%"
                stroke="url(#nn-line)"
                strokeWidth="1"
                opacity="0.6"
              />
            </svg>
          )}
        </motion.div>
      </div>

      {/* bars building prediction */}
      <div className="space-y-3 mb-3">
        <p className="text-sm font-medium text-slate-300">
          Forming surge prediction curve:
        </p>
        <div className="flex gap-1 items-end h-20">
          {[30, 45, 55, 68, 75, 80, 82].map((height, idx) => (
            <motion.div
              key={idx}
              initial={{ height: 0 }}
              animate={
                isActive
                  ? { height: `${(height / 100) * 80}px` }
                  : { height: 0 }
              }
              transition={{
                duration: 0.5,
                delay: idx * 0.15 + 0.4,
              }}
              className="flex-1 bg-gradient-to-t from-cyan-500 via-sky-500 to-blue-400 rounded-t opacity-75 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>

      {/* confidence */}
      <div className="space-y-2 mb-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-300">
            Prediction Confidence
          </span>
          <motion.span
            animate={
              isActive
                ? { opacity: [0.5, 1, 0.5] }
                : { opacity: 0.7 }
            }
            className="text-sm font-bold text-cyan-300"
          >
            {confidence}%
          </motion.span>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={
            isActive ? { width: `${confidence}%` } : { width: 0 }
          }
          transition={{ duration: 2 }}
          className="h-2 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 rounded-full"
        />
      </div>

      <motion.p
        animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
        className={`text-xs ${
          isActive ? "text-cyan-300" : "text-slate-400"
        }`}
      >
        {isActive
          ? "🧠 Neural network running surge forecast..."
          : "⏳ Waiting for execution..."}
      </motion.p>
    </div>
  );
}

/* ============================================================
   🔹 STEP 4 — RECOMMENDATIONS AGENT
   ============================================================ */

const RECOMMENDATIONS = [
  { icon: Package, text: "Prepare 15 additional beds in Emergency Ward." },
  {
    icon: AlertCircle,
    text: "Possible AQI spike in 24–48 hours – alert respiratory team.",
  },
  {
    icon: Users,
    text: "Increase respiratory staff by 4 members on Monday.",
  },
  {
    icon: TrendingUp,
    text: "Stock up on O₂ cylinders – current supply at 78%.",
  },
];

function Step4Recommendation({ isRunning, stepIndex }) {
  const isActive = isRunning && stepIndex === 3;

  return (
    <div className="bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/90 border border-slate-800/70 hover:border-cyan-400/60 rounded-2xl p-5 transition-colors shadow-[0_22px_70px_rgba(15,23,42,0.85)]">
      <div className="flex flex-col gap-1 mb-4">
        <h2 className="text-white text-lg font-semibold">
          Step 4: Recommendation Agent
        </h2>
        <p className="text-slate-400 text-sm">
          AI-generated actionable insights & alerts
        </p>
      </div>

      <div className="space-y-3 mb-3">
        {RECOMMENDATIONS.map((rec, idx) => {
          const Icon = rec.icon;
          const delay = isActive ? idx * 0.2 + 1 : 0;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20, y: 8 }}
              animate={
                isActive
                  ? { opacity: 1, x: 0, y: 0 }
                  : { opacity: 0.4, x: 20, y: 8 }
              }
              transition={{ delay, duration: 0.45 }}
              whileHover={{ x: 6 }}
              className="p-4 bg-gradient-to-r from-slate-900/70 to-slate-800/60 border-l-2 border-cyan-500/60 rounded-xl hover:border-cyan-400 cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <motion.div
                  animate={
                    isActive
                      ? { rotate: [0, 8, -8, 0] }
                      : { rotate: 0 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: delay + 0.15,
                    repeat: isActive
                      ? Number.POSITIVE_INFINITY
                      : 0,
                  }}
                  className="p-2 bg-cyan-500/15 rounded-lg flex-shrink-0 group-hover:bg-cyan-500/25 transition-colors"
                >
                  <Icon className="w-4 h-4 text-cyan-300" />
                </motion.div>
                <p className="text-sm text-slate-100 flex-1">
                  {rec.text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6 }}
          className="p-4 bg-emerald-500/10 border border-emerald-500/40 rounded-xl"
        >
          <p className="text-sm text-emerald-300">
            ✅ <span className="font-semibold">Pipeline complete.</span>{" "}
            Recommendations are ready to be implemented by hospital ops.
          </p>
        </motion.div>
      )}

      <motion.p
        animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
        className={`mt-2 text-xs ${
          isActive ? "text-cyan-300" : "text-slate-400"
        }`}
      >
        {isActive
          ? "💡 Generating actionable recommendations..."
          : "⏳ Waiting for execution..."}
      </motion.p>
    </div>
  );
}

/* ============================================================
   🧬 PIPELINE WRAPPER
   ============================================================ */

function AIAgentPipeline({ isRunning }) {
  const steps = [
    { number: 1, title: "Data Collection", component: Step1DataCollection },
    { number: 2, title: "Data Cleaning & Processing", component: Step2DataCleaning },
    { number: 3, title: "AI Prediction", component: Step3Prediction },
    { number: 4, title: "Recommendations", component: Step4Recommendation },
  ];

  return (
    <div className="space-y-8 relative">
      {/* vertical glow line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isRunning ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: isRunning ? 7 : 0.3 }}
        className="absolute left-8 top-16 bottom-4 w-[2px] bg-gradient-to-b from-cyan-400 via-sky-500 to-transparent origin-top"
      />

      <div className="space-y-10">
        {steps.map((step, idx) => {
          const StepComponent = step.component;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="relative"
            >
              <div className="flex items-start gap-6">
                {/* step badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={
                    isRunning
                      ? { scale: 1 }
                      : { scale: 1 }
                  }
                  transition={{
                    delay: 0.3 + idx * 0.4,
                    duration: 0.4,
                  }}
                  className="relative flex-shrink-0"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/50 relative z-10">
                    {step.number}
                  </div>

                  {isRunning && (
                    <motion.div
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.7, 0, 0.7],
                      }}
                      transition={{
                        duration: 1.6,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className="absolute inset-0 rounded-full border border-cyan-400"
                    />
                  )}
                </motion.div>

                {/* card */}
                <div className="flex-1 pt-1">
                  <StepComponent isRunning={isRunning} stepIndex={idx} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   🚀 FINAL PAGE — AI AGENTS ACTIVITY
   ============================================================ */

export default function AIAgentsPage() {
  const [isRunning, setIsRunning] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleRunSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 8000);
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header with ScrollFloat + ScrambledText */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 max-w-xl">
            <ScrollFloat
              animationDuration={4}
              ease="back.inOut(2)"
              scrollStart="top bottom"
              scrollEnd="bottom center"
              stagger={0.06}
              textClassName="text-white font-extrabold"
              containerClassName="text-3xl md:text-4xl lg:text-[2.5rem] leading-tight"
            >
              AI Agents Activity
            </ScrollFloat>

            <ScrambledText
              className="text-slate-400 text-sm md:text-base"
              radius={80}
              duration={1.1}
              speed={0.5}
              scrambleChars=".:/\\"
            >
              Real-time agentic pipeline that collects data, cleans it, runs
              surge prediction models and outputs actionable hospital
              recommendations.
            </ScrambledText>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <button
              onClick={handleRunSimulation}
              disabled={isRunning}
              className={`px-5 py-3 rounded-xl text-sm font-semibold tracking-wide uppercase
                bg-gradient-to-r from-cyan-500 to-blue-600
                hover:from-cyan-400 hover:to-blue-500
                disabled:opacity-60 disabled:cursor-not-allowed
                shadow-[0_15px_40px_rgba(56,189,248,0.4)]
                transition-all duration-200
              `}
            >
              {isRunning ? "Running Forecast…" : "Run Forecast Simulation"}
            </button>

            <span className="text-xs text-slate-400">
              Status:{" "}
              <span
                className={
                  isRunning ? "text-cyan-300 font-medium" : "text-slate-300"
                }
              >
                {isRunning ? "Pipeline executing" : "Idle – ready to run"}
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pipeline */}
        <motion.div variants={itemVariants}>
          <AIAgentPipeline isRunning={isRunning} />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
