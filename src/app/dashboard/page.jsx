"use client"

import React from "react"
import { motion } from "framer-motion"
import Navbar from "../_components/Navbar"

const trainingCards = [
  {
    id: 1,
    title: "LLM",
    subtitle: "No of Requests per Agent",
    value: 40,
    percent: 65,
    color: "#22c55e",
  },
  {
    id: 2,
    title: "Feature Extraction",
    subtitle: "No of Requests per Agent",
    value: 35,
    percent: 60,
    color: "#3b82f6",
  },
  {
    id: 3,
    title: "Recommendation System",
    subtitle: "No of Requests per Agent",
    value: 20,
    percent: 65,
    color: "#facc15",
  },
  {
    id: 4,
    title: "Predictive Analysis",
    subtitle: "No of Requests per Agent",
    value: 28,
    percent: 65,
    color: "#4ade80",
  },
  {
    id: 5,
    title: "Speech to Text",
    subtitle: "No of Requests per Agent",
    value: 37,
    percent: 65,
    color: "#e879f9",
  },
  {
    id: 6,
    title: "Text to Speech",
    subtitle: "No of Requests per Agent",
    value: 16,
    percent: 65,
    color: "#facc15",
  },
  {
    id: 7,
    title: "Image to Text",
    subtitle: "No of Requests per Agent",
    value: 18,
    percent: 65,
    color: "#38bdf8",
  },
]

const createdStats = [
  { label: "Agent Created", value: 20, total: 60, color: "#3b82f6" },
  { label: "Widgets Created", value: 10, total: 40, color: "#22c55e" },
  { label: "Function Created", value: 11, total: 50, color: "#facc15" },
]

const barData = [
  { label: "Agent1", value: 1200, color: "#facc15" },
  { label: "Test", value: 400, color: "#22c55e" },
  { label: "Test", value: 3000, color: "#3b82f6" },
  { label: "Test", value: 800, color: "#e879f9" },
  { label: "Test", value: 1500, color: "#22c55e" },
]

const agentStatus = [
  { label: "Configured", value: 63, color: "#22c55e" },
  { label: "Deployed", value: 25, color: "#3b82f6" },
  { label: "Deploying", value: 25, color: "#facc15" },
  { label: "Ready", value: 25, color: "#38bdf8" },
]

const agentPatterns = [
  { label: "LLM", value: 20.23, color: "#f97316" },
  { label: "Feature Extraction", value: 11.89, color: "#3b82f6" },
  { label: "Recommendation System", value: 15.19, color: "#22c55e" },
  { label: "Predictive Analysis", value: 15.19, color: "#22c55e" },
  { label: "Speech to Text", value: 11.89, color: "#a855f7" },
  { label: "Text to Speech", value: 11.89, color: "#facc15" },
  { label: "Image to Text", value: 7.44, color: "#06b6d4" },
]

function CircularProgress({ value, total, color, label }) {
  const percent = Math.round((value / total) * 100)
  const angle = (percent / 100) * 360

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative h-24 w-24 rounded-full bg-slate-800/60 shadow-inner shadow-slate-900/70"
        style={{
          background: `conic-gradient(${color} ${angle}deg, #1e293b 0deg)`,
        }}
      >
        <div className="absolute inset-2 rounded-full bg-slate-950/90 flex items-center justify-center">
          <span className="text-xs text-slate-200 font-semibold">
            {value}/{total}
          </span>
        </div>
      </div>
      <p className="text-xs text-slate-300">{label}</p>
    </div>
  )
}

function GaugeCard({ title, used, total, color }) {
  const percent = Math.round((used / total) * 100)
  const angle = (percent / 100) * 180

  return (
    <motion.div
      className="rounded-2xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-xl p-5 shadow-xl shadow-cyan-500/5 flex flex-col gap-4"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
        <span className="text-xs text-slate-400">Usage</span>
      </div>

      <div className="relative flex items-center justify-center overflow-hidden pt-4 pb-2">
        <div
          className="relative h-28 w-28 rounded-full border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center"
          style={{
            backgroundImage: `conic-gradient(${color} ${angle}deg, #1e293b 0deg)`,
            clipPath: "inset(50% 0 0 0 round 999px)",
          }}
        >
          <div className="absolute inset-[18%] rounded-full bg-slate-950 flex flex-col items-center justify-center">
            <span className="text-lg font-semibold text-slate-50">
              {percent}%
            </span>
            <span className="text-[10px] text-slate-400">
              {title.toLowerCase()} used
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
        <div>
          <p className="text-slate-400">Total</p>
          <p className="font-semibold">
            {title === "Storage" ? `${total}MB` : total}
          </p>
        </div>
        <div className="h-8 w-px bg-slate-800/70" />
        <div className="text-right">
          <p className="text-slate-400">Remaining</p>
          <p className="font-semibold">
            {title === "Storage" ? `${total - used}MB` : total - used}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function PieChart({ data, centerLabel }) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  let currentAngle = 0
  const segments = data.map((d) => {
    const angle = (d.value / total) * 360
    const segment = `${d.color} ${currentAngle}deg ${currentAngle + angle}deg`
    currentAngle += angle
    return segment
  })

  return (
    <div className="relative h-40 w-40">
      <div
        className="h-full w-full rounded-full shadow-inner shadow-slate-900/70"
        style={{
          background: `conic-gradient(${segments.join(", ")})`,
        }}
      >
        <div className="absolute inset-5 rounded-full bg-slate-950/95 flex flex-col items-center justify-center">
          {centerLabel && (
            <>
              <span className="text-2xl font-semibold text-slate-50">
                {centerLabel}
              </span>
              <span className="text-[10px] text-slate-400">Total</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  // Animations
  const container = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  }

  const cardVariant = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-slate-950 text-slate-100">
        {/* Background effects similar to your auth/landing pages */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute top-1/4 -right-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1e293b_0,_#020617_55%)] opacity-80" />
        </div>

        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-10 pt-4 lg:px-8">
          {/* Topbar */}
          <header className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.7)]" />
                Live environment
              </div>
              <h1 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                AI Agent Control Center
              </h1>
              <p className="text-xs text-slate-400 sm:text-sm">
                Monitor training, storage, tokens, and agent performance in
                real-time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-300 shadow-sm hover:border-cyan-500/60 hover:text-cyan-300 transition-colors">
                Last sync: 2 min ago
              </button>
              <div className="flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/80 px-2 py-1 shadow-lg shadow-slate-900/80">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-semibold">
                  Z
                </div>
                <div className="flex flex-col text-xs leading-tight">
                  <span className="font-medium text-slate-100">Zain</span>
                  <span className="text-[10px] text-slate-400">
                    Admin · SwasthiShield
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Training & Inference */}
          <motion.section
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-1 space-y-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-100">
                  Training & Inference made
                </h2>
                <p className="text-xs text-slate-400">
                  7 of 26 active agents · Use navigation to inspect each
                  pipeline
                </p>
              </div>
              <button className="rounded-full border border-slate-700/70 bg-slate-900/80 px-3 py-1 text-xs text-slate-300 hover:border-cyan-500/70 hover:text-cyan-300 transition-colors">
                View all agents
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {trainingCards.map((card, idx) => {
                const percentWidth = `${card.percent}%`
                return (
                  <motion.div
                    key={card.id}
                    variants={cardVariant}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 120, damping: 16 }}
                    className="group rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/60 backdrop-blur-xl"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-slate-400">
                          {card.subtitle}
                        </p>
                        <h3 className="mt-1 text-sm font-semibold text-slate-100">
                          {card.title}
                        </h3>
                      </div>
                      <span className="rounded-full bg-slate-800/80 px-2 py-1 text-xs text-slate-200">
                        {card.value}
                      </span>
                    </div>

                    <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                        style={{ width: percentWidth }}
                      />
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{card.percent}% utilisation</span>
                      <span
                        className="flex items-center gap-1"
                        style={{ color: card.color }}
                      >
                        ● Active
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.section>

          {/* Middle row: Created + Storage + Token */}
          <motion.section
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-5 md:grid-cols-3"
          >
            {/* Created stats */}
            <motion.div
              variants={cardVariant}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/60 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">
                    No of Created
                  </h3>
                  <p className="text-xs text-slate-400">
                    Objects created in the last 30 days
                  </p>
                </div>
                <span className="rounded-full bg-slate-800/80 px-2 py-1 text-[11px] text-slate-300">
                  Overview
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                {createdStats.map((item) => (
                  <CircularProgress
                    key={item.label}
                    value={item.value}
                    total={item.total}
                    color={item.color}
                    label={item.label}
                  />
                ))}
              </div>
            </motion.div>

            <GaugeCard title="Storage" used={10} total={12} color="#3b82f6" />
            <GaugeCard title="Token" used={1000} total={1200} color="#f59e0b" />
          </motion.section>

          {/* Bottom row */}
          <motion.section
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-5 lg:grid-cols-3"
          >
            {/* Bar chart: Agent */}
            <motion.div
              variants={cardVariant}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/60 backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-100">
                    Agent
                  </h3>
                  <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[11px] text-cyan-300 border border-cyan-500/40">
                    Storage
                  </span>
                  <span className="rounded-full bg-slate-800/70 px-2 py-0.5 text-[11px] text-slate-300">
                    No of Request Per Day
                  </span>
                </div>
                <button className="rounded-full border border-slate-700/70 bg-slate-900/80 px-2.5 py-1 text-[11px] text-slate-300 hover:border-cyan-500/60 hover:text-cyan-300 transition-colors">
                  Weekly ▾
                </button>
              </div>

              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <div className="flex h-48 items-end justify-between gap-2">
                    {barData.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-1 flex-col items-center gap-2"
                      >
                        <div className="relative flex h-full w-7 items-end rounded-full bg-slate-900/90 shadow-inner shadow-slate-950/70">
                          <div
                            className="w-full rounded-full"
                            style={{
                              height: `${(item.value / 3200) * 100}%`,
                              background: `linear-gradient(to top, ${item.color}, #e5e7eb)`,
                              boxShadow:
                                "0 0 18px rgba(56,189,248,0.45)",
                            }}
                          >
                            {idx === 2 && (
                              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-200">
                                2GB
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-300">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-40">
                  <h4 className="text-xs font-semibold text-slate-200">
                    Details
                  </h4>
                  <ul className="mt-2 space-y-1.5 text-[11px] text-slate-400">
                    <li>Recommendation System Agent Test - 0</li>
                    <li>Test - 0</li>
                    <li>Test - 0</li>
                    <li>Test - 0</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Agent By Status */}
            <motion.div
              variants={cardVariant}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/60 backdrop-blur-xl"
            >
              <h3 className="text-sm font-semibold text-slate-100">
                Agent By Status
              </h3>
              <div className="mt-4 flex items-center gap-5">
                <PieChart data={agentStatus} centerLabel="" />
                <ul className="space-y-2 text-xs text-slate-300">
                  {agentStatus.map((s) => (
                    <li
                      key={s.label}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: s.color }}
                        />
                        <span>{s.label}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {s.value}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Agent By Patterns */}
            <motion.div
              variants={cardVariant}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/60 backdrop-blur-xl"
            >
              <h3 className="text-sm font-semibold text-slate-100">
                Agent By Patterns
              </h3>
              <div className="mt-4 flex items-center gap-5">
                <PieChart data={agentPatterns} centerLabel="60" />
                <div className="flex-1">
                  <h4 className="text-xs font-semibold text-slate-200">
                    Details
                  </h4>
                  <ul className="mt-2 space-y-1.5 text-[11px] text-slate-300">
                    {agentPatterns.map((s) => (
                      <li
                        key={s.label}
                        className="flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: s.color }}
                          />
                          <span>{s.label}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {s.value.toFixed(2)}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.section>
        </main>
      </div>
    </>
  )
}
