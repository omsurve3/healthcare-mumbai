"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Moon,
  Sun,
  Activity,
  Heart,
  Thermometer,
  TrendingUp,
} from "lucide-react";
import { useTheme } from "next-themes";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Navbar from "../_components/Navbar";
/* ============================================================
   🌌 DASHBOARD LAYOUT (INLINE)
   ============================================================ */

function DashboardLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
     

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Navigation */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 backdrop-blur-sm bg-background/80 border-b border-border"
        >
        
        </motion.header>

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-6 max-w-7xl mx-auto"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

/* ============================================================
   📊 DATA
   ============================================================ */

const correlationData = [
  { aqi: 35, patients: 420 },
  { aqi: 42, patients: 480 },
  { aqi: 58, patients: 520 },
  { aqi: 72, patients: 610 },
  { aqi: 88, patients: 680 },
  { aqi: 95, patients: 720 },
  { aqi: 52, patients: 500 },
  { aqi: 65, patients: 580 },
];

const heatmapData = [
  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  [42, 48, 55, 62, 68, 72, 65],
  [45, 52, 60, 68, 75, 78, 70],
  [48, 55, 65, 72, 80, 82, 75],
];

const predictions = [
  {
    title: "Respiratory Cases",
    icon: Activity,
    predicted: 156,
    confidence: 94,
    trend: "+12%",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/15",
  },
  {
    title: "Cardiac Cases",
    icon: Heart,
    predicted: 84,
    confidence: 89,
    trend: "+8%",
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-500/15",
  },
  {
    title: "Fever Cases",
    icon: Thermometer,
    predicted: 123,
    confidence: 91,
    trend: "+15%",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/15",
  },
  {
    title: "Trauma Cases",
    icon: TrendingUp,
    predicted: 67,
    confidence: 87,
    trend: "+5%",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/15",
  },
];

/* ============================================================
   🧮 HELPERS
   ============================================================ */

function getHeatmapColor(value, max) {
  const percentage = value / max;
  if (percentage < 0.3) return "bg-emerald-500/15";
  if (percentage < 0.6) return "bg-yellow-500/15";
  if (percentage < 0.8) return "bg-orange-500/20";
  return "bg-red-500/25";
}

/* ============================================================
   🧩 INLINE BLOCKS (same file, not exported)
   ============================================================ */

function PollutionCorrelationChartBlock() {
  return (
    <motion.div whileHover={{ y: -5 }} className="h-full">
      <div
        className="
          relative h-full rounded-3xl
          border border-slate-800/70
          bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950
          shadow-[0_20px_60px_rgba(15,23,42,0.85)]
          p-6 md:p-7
          overflow-hidden
        "
      >
        {/* subtle corner glow */}
        <div className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base md:text-lg font-semibold text-white">
              Pollution–Patient Correlation
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              How AQI shifts drive admission rates
            </p>
          </div>
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-cyan-200">
            AQI vs Patients
          </span>
        </div>

        <div className="h-[260px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(100,116,139,0.25)"
              />
              <XAxis
                type="number"
                dataKey="aqi"
                stroke="rgba(148,163,184,0.7)"
                tick={{ fill: "rgba(148,163,184,0.9)", fontSize: 12 }}
                label={{
                  value: "Air Quality Index (AQI)",
                  position: "insideBottomRight",
                  offset: -5,
                  fill: "rgba(148,163,184,0.9)",
                  fontSize: 11,
                }}
              />
              <YAxis
                type="number"
                dataKey="patients"
                stroke="rgba(148,163,184,0.7)"
                tick={{ fill: "rgba(148,163,184,0.9)", fontSize: 12 }}
                label={{
                  value: "Admissions / day",
                  angle: -90,
                  position: "insideLeft",
                  fill: "rgba(148,163,184,0.9)",
                  fontSize: 11,
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(148,163,184,0.35)",
                  borderRadius: "10px",
                  padding: "8px 10px",
                }}
                labelStyle={{ color: "rgba(226,232,240,0.9)" }}
                itemStyle={{ color: "rgba(244,244,245,0.95)", fontSize: 12 }}
              />
              <Scatter
                name="AQI–Admissions"
                data={correlationData}
                fill="rgba(34,211,238,0.9)"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

function SurgeHeatmapBlock() {
  const maxValue = 85;

  return (
    <motion.div whileHover={{ y: -5 }} className="h-full">
      <div
        className="
          relative h-full rounded-3xl
          border border-slate-800/70
          bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950
          shadow-[0_20px_60px_rgba(15,23,42,0.85)]
          p-6 md:p-7
          overflow-hidden
        "
      >
        {/* Glow */}
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-fuchsia-500/15 blur-3xl" />

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base md:text-lg font-semibold text-white">
              City × Day Surge Heatmap
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              Expected surge intensity across zones and weekdays
            </p>
          </div>
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-purple-200">
            Risk Zones
          </span>
        </div>

        <div className="space-y-4">
          {heatmapData.map((row, rowIdx) => (
            <motion.div
              key={rowIdx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: rowIdx * 0.12 }}
              className="space-y-2"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {rowIdx === 0 ? "Weekdays" : `Zone ${String.fromCharCode(64 + rowIdx)}`}
              </p>

              <div className="grid grid-cols-7 gap-2">
                {row.map((value, colIdx) => {
                  const isHeader = rowIdx === 0;

                  return (
                    <motion.div
                      key={`${rowIdx}-${colIdx}`}
                      whileHover={{ scale: 1.07, y: -2 }}
                      className={`rounded-lg border text-center text-xs font-semibold px-2 py-2
                        transition-all duration-200
                        ${
                          isHeader
                            ? "bg-slate-800/60 text-slate-200 border-slate-700/70"
                            : `text-slate-50 border-slate-700/40 hover:border-cyan-400/50 ${getHeatmapColor(
                                value,
                                maxValue
                              )}`
                        }
                      `}
                    >
                      {value}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
          <span>Low surge</span>
          <div className="flex-1 mx-3 h-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-red-500" />
          <span>High surge</span>
        </div>
      </div>
    </motion.div>
  );
}

function SurgePredictionCardsBlock() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-lg md:text-xl font-semibold text-white">
          7-Day Predictions by Category
        </h2>
        <p className="text-xs md:text-sm text-slate-400 max-w-md">
          Category-wise surge forecast with model confidence to guide staffing,
          beds, and supply allocation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {predictions.map((pred, index) => {
          const Icon = pred.icon;

          return (
            <motion.div
              key={pred.title}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="h-full"
            >
              <div
                className="
                  relative h-full rounded-3xl overflow-hidden
                  border border-slate-800/70
                  bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950
                  shadow-[0_18px_55px_rgba(15,23,42,0.9)]
                  transition-transform transition-colors duration-300
                  group
                "
              >
                {/* top accent bar */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`h-1 bg-gradient-to-r ${pred.color} origin-left`}
                />

                <div className="p-5 md:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`p-2.5 rounded-xl ${pred.bgColor}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.2 }}
                      className="text-[11px] font-semibold px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                    >
                      {pred.confidence}% confidence
                    </motion.span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {pred.title}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-bold text-white">
                        {pred.predicted}
                      </span>
                      <span className="text-sm text-emerald-400 font-semibold">
                        {pred.trend}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Forecasted patient count for the coming week in this
                      category.
                    </p>
                  </div>

                  {/* progress bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="h-1.5 bg-slate-800/80 rounded-full overflow-hidden mt-2"
                  >
                    <div
                      className={`h-full bg-gradient-to-r ${pred.color}`}
                      style={{ width: `${pred.confidence}%` }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ============================================================
   🚀 FINAL PAGE
   ============================================================ */

export default function SurgePredictionPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
    <Navbar/>
    <DashboardLayout>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-medium text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
            AI Surge Prediction
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Surge Prediction Analysis
          </h1>

          <p className="text-sm md:text-base text-slate-400 max-w-xl">
            Multi-signal AI forecasts powered by pollution, festivals, temporal
            patterns and historical patient inflow across city zones.
          </p>
        </motion.div>

        {/* Charts Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <PollutionCorrelationChartBlock />
          <SurgeHeatmapBlock />
        </motion.div>

        {/* Prediction Cards */}
        <motion.div variants={itemVariants}>
          <SurgePredictionCardsBlock />
        </motion.div>
      </motion.div>
    </DashboardLayout>
    </>
    
  );
}
