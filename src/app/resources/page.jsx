"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Moon,
  Sun,
  AlertCircle,
  Users,
  Activity,
  Pill,
  Hospital,
} from "lucide-react";
import { useTheme } from "next-themes";
import Navbar from "../_components/Navbar";
import ScrollFloat from "@/components/ScrollFloat";
import ScrambledText from "@/components/ScrambledText";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ============================================================
   📌 DASHBOARD LAYOUT – upgraded background + top bar
   ============================================================ */
function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative min-h-screen bg-[#020617] text-white overflow-hidden">
      {/* Layered background glows & grid (landing-ish) */}
      <div className="pointer-events-none fixed inset-0 -z-20">
        {/* main radial gradients */}
        <div className="absolute inset-x-0 -top-40 h-72 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.2),transparent_70%)]" />
        <div className="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-emerald-500/18 blur-3xl" />
        <div className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-fuchsia-500/22 blur-3xl" />
        {/* subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30 mix-blend-soft-light" />
      </div>

      {/* Navbar reused from landing */}
      <Navbar />

      {/* Main section */}
      <div className="lg:ml-64 relative z-10">
        {/* Top Nav / Utility bar */}
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#020617]/80 backdrop-blur-xl"
        >
          <div className="px-4 lg:px-6 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-900/70 rounded-lg border border-slate-800/80 transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                <span className="rounded-full bg-slate-950/80 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200 border border-slate-700/70">
                  Dashboard
                </span>
                <span className="text-slate-500">/</span>
                <span className="text-slate-200">Resource Management</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden md:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                Live sync: ICU & stock
              </button>

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full border border-slate-700/80 bg-slate-900/80 hover:border-cyan-400/60 hover:text-cyan-300 transition-colors"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button className="hidden sm:flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-[11px] text-slate-200">
                <span className="text-slate-400">Range:</span>
                <span className="font-semibold text-cyan-300">Next 7 days</span>
              </button>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="p-4 lg:p-6 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}

/* ============================================================
   📊 ICU OCCUPANCY CHART
   ============================================================ */
const ICU_DATA = [
  { day: "Mon", icu: 45, available: 55 },
  { day: "Tue", icu: 52, available: 48 },
  { day: "Wed", icu: 58, available: 42 },
  { day: "Thu", icu: 65, available: 35 },
  { day: "Fri", icu: 72, available: 28 },
  { day: "Sat", icu: 68, available: 32 },
  { day: "Sun", icu: 60, available: 40 },
];

function ICUOccupancyChart() {
  return (
    <motion.div whileHover={{ y: -5, scale: 1.01 }} className="h-full">
      <div className="h-full rounded-3xl bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-slate-950/95 border border-slate-800/70 hover:border-cyan-400/60 transition-colors shadow-[0_22px_70px_rgba(15,23,42,0.9)] overflow-hidden">
        {/* header */}
        <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-white text-lg font-semibold flex items-center gap-2">
              ICU Occupancy Forecast
              <span className="text-[11px] rounded-full bg-rose-500/10 text-rose-200 border border-rose-500/40 px-2 py-0.5">
                High Risk
              </span>
            </h2>
            <p className="text-slate-400 text-sm">
              7-day prediction for ICU bed utilization and remaining buffer.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 text-xs">
            <span className="text-slate-400">Peak load (Fri)</span>
            <span className="font-semibold text-amber-300">72% occupancy</span>
          </div>
        </div>
        {/* chart */}
        <div className="px-3 pb-5">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ICU_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.25)" />
              <XAxis dataKey="day" stroke="rgba(148,163,184,0.7)" />
              <YAxis stroke="rgba(148,163,184,0.7)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15,23,42,0.96)",
                  border: "1px solid rgba(148,163,184,0.3)",
                  borderRadius: "12px",
                  padding: "8px 10px",
                }}
              />
              <Legend />
              <Bar dataKey="icu" stackId="a" fill="rgba(248,113,113,0.9)" name="ICU Occupied" />
              <Bar
                dataKey="available"
                stackId="a"
                fill="rgba(45,212,191,0.9)"
                name="ICU Available"
              />
            </BarChart>
          </ResponsiveContainer>

          {/* footer mini stats */}
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-2">
            <span>
              Avg occupancy:{" "}
              <span className="font-semibold text-slate-100">60–70%</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
              Consider enabling surge ICU beds Fri–Sat
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   🛏️ BED AVAILABILITY PIE CHART
   ============================================================ */
const BED_DATA = [
  { name: "Occupied", value: 420 },
  { name: "Available", value: 380 },
  { name: "Reserved", value: 100 },
];

const BED_COLORS = [
  "rgba(248,113,113,0.9)",
  "rgba(34,197,94,0.9)",
  "rgba(250,204,21,0.9)",
];

function BedAvailabilityChart() {
  const totalBeds = BED_DATA.reduce((sum, b) => sum + b.value, 0);
  const occupancyPercent = Math.round((BED_DATA[0].value / totalBeds) * 100);

  return (
    <motion.div whileHover={{ y: -5, scale: 1.01 }} className="h-full">
      <div className="h-full rounded-3xl bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-slate-950/95 border border-slate-800/70 hover:border-cyan-400/60 transition-colors shadow-[0_22px_70px_rgba(15,23,42,0.9)] overflow-hidden">
        <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-white text-lg font-semibold flex items-center gap-2">
              Total Bed Availability
              <span className="text-[11px] rounded-full bg-cyan-500/10 text-cyan-200 border border-cyan-500/40 px-2 py-0.5">
                {totalBeds} beds
              </span>
            </h2>
            <p className="text-slate-400 text-sm">
              Current occupancy, free capacity, and reserved beds snapshot.
            </p>
          </div>
          <div className="text-right text-xs space-y-1">
            <p className="text-slate-400">Overall occupancy</p>
            <p className="text-2xl font-semibold text-emerald-300">
              {occupancyPercent}%
            </p>
          </div>
        </div>
        <div className="px-3 pb-5">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={BED_DATA}
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={50}
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                dataKey="value"
              >
                {BED_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={BED_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15,23,42,0.96)",
                  border: "1px solid rgba(148,163,184,0.3)",
                  borderRadius: "12px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-2">
            <span>
              Reserved for emergencies:{" "}
              <span className="font-semibold text-slate-100">
                {BED_DATA[2].value} beds
              </span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Recommended safe threshold: &lt; 80% occupancy
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   🧪 MEDICINE INVENTORY TABLE
   ============================================================ */
const MEDICINES = [
  { name: "Aspirin", stock: 45, minRequired: 100, status: "critical" },
  { name: "Amoxicillin", stock: 230, minRequired: 200, status: "good" },
  { name: "Paracetamol", stock: 78, minRequired: 150, status: "warning" },
  { name: "Ibuprofen", stock: 320, minRequired: 250, status: "good" },
  { name: "Adrenaline", stock: 12, minRequired: 50, status: "critical" },
  { name: "Oxygen Tanks", stock: 89, minRequired: 100, status: "warning" },
];

function getStatusColor(status) {
  switch (status) {
    case "critical":
      return "bg-red-500/10 text-red-300 border-red-500/40";
    case "warning":
      return "bg-amber-500/10 text-amber-200 border-amber-500/40";
    case "good":
      return "bg-emerald-500/10 text-emerald-300 border-emerald-500/40";
    default:
      return "bg-slate-500/10 text-slate-300 border-slate-600/40";
  }
}

function MedicineInventoryTable() {
  const criticalCount = MEDICINES.filter((m) => m.status === "critical").length;
  const warningCount = MEDICINES.filter((m) => m.status === "warning").length;

  return (
    <motion.div whileHover={{ y: -5, scale: 1.01 }}>
      <div className="rounded-3xl bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-slate-950/95 border border-slate-800/70 hover:border-cyan-400/60 transition-colors shadow-[0_22px_70px_rgba(15,23,42,0.9)] overflow-hidden">
        <div className="px-5 pt-5 pb-3 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-white text-lg font-semibold flex items-center gap-2">
              Medicine Stock Low-Inventory Alerts
              <span className="text-[11px] rounded-full bg-slate-900/80 text-slate-200 border border-slate-700/80 px-2 py-0.5">
                Auto-monitoring
              </span>
            </h2>
            <p className="text-slate-400 text-sm">
              Real-time risk view for critical drugs and oxygen supplies.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/15 text-red-200 border border-red-500/50">
                <AlertCircle className="w-3 h-3" />
                {criticalCount} critical
              </span>
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/15 text-amber-100 border border-amber-500/40">
                {warningCount} warning
              </span>
            </div>
            <button className="mt-1 inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-200 hover:border-emerald-300">
              <Pill className="w-3 h-3" />
              Suggest reorder plan
            </button>
          </div>
        </div>

        <div className="px-5 pb-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/60 bg-slate-900/70">
                <th className="text-left py-3 px-4 font-semibold text-slate-200">
                  Medicine
                </th>
                <th className="text-left py-3 px-4 font-semibold text-slate-200">
                  Current Stock
                </th>
                <th className="text-left py-3 px-4 font-semibold text-slate-200">
                  Min Required
                </th>
                <th className="text-left py-3 px-4 font-semibold text-slate-200">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {MEDICINES.map((med, index) => (
                <motion.tr
                  key={med.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-800/40 hover:bg-slate-900/60 transition-colors"
                >
                  <td className="py-3 px-4 text-slate-100">{med.name}</td>
                  <td className="py-3 px-4 font-semibold text-white">
                    {med.stock}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {med.minRequired}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        med.status
                      )}`}
                    >
                      {med.status === "critical" && "⚠️ "}
                      {med.status.charAt(0).toUpperCase() + med.status.slice(1)}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* legend footer */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                Critical &lt; 50% of minimum
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-amber-300" />
                Warning 50–80%
              </span>
            </div>
            <span>Auto-reorder threshold: 70% of minimum stock</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   👥 STAFF REQUIREMENT CARD
   ============================================================ */
const STAFF_DATA = [
  { department: "Emergency", required: 15, current: 12, shortage: 3 },
  { department: "ICU", required: 20, current: 18, shortage: 2 },
  { department: "Surgery", required: 10, current: 10, shortage: 0 },
  { department: "Respiratory", required: 8, current: 6, shortage: 2 },
  { department: "Nursing", required: 35, current: 32, shortage: 3 },
];

function StaffRequirementCard() {
  const totalShortage = STAFF_DATA.reduce((s, d) => s + d.shortage, 0);

  return (
    <motion.div whileHover={{ y: -5, scale: 1.01 }}>
      <div className="rounded-3xl bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-slate-950/95 border border-slate-800/70 hover:border-cyan-400/60 transition-colors shadow-[0_22px_70px_rgba(15,23,42,0.9)] overflow-hidden">
        <div className="px-5 pt-5 pb-3 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-white text-lg font-semibold flex items-center gap-2">
              Staff Requirement Simulation
              <span className="text-[11px] rounded-full bg-indigo-500/10 text-indigo-200 border border-indigo-500/40 px-2 py-0.5">
                Shift planning
              </span>
            </h2>
            <p className="text-slate-400 text-sm">
              Department-wise staff gap analysis based on forecasted inflow.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 text-[11px]">
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/15 text-red-200 border border-red-500/40">
              <Users className="w-3 h-3" />
              Total shortage: {totalShortage}
            </span>
            <button className="mt-1 inline-flex items-center gap-1 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2 py-1 text-[10px] text-cyan-200 hover:border-cyan-300">
              Generate staffing plan
            </button>
          </div>
        </div>

        <div className="px-5 pb-6 space-y-4">
          {STAFF_DATA.map((staff, index) => (
            <motion.div
              key={staff.department}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800/70"
            >
              <div className="flex justify-between items-start mb-2 gap-3">
                <div>
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    {staff.department}
                    {staff.shortage > 0 ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-200 border border-red-500/40">
                        Understaffed
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-200 border border-emerald-500/40">
                        Optimal
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-slate-400">
                    Current: {staff.current}/{staff.required} staff
                  </p>
                </div>
                {staff.shortage > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 + 0.1 }}
                    className="px-2 py-1 text-xs font-semibold bg-red-500/15 text-red-300 rounded-full border border-red-500/40"
                  >
                    -{staff.shortage} staff
                  </motion.span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(staff.current / staff.required) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.08 + 0.15 }}
                  className={`h-full rounded-full ${
                    staff.shortage > 0
                      ? "bg-gradient-to-r from-red-500 via-orange-500 to-amber-400"
                      : "bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400"
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   📄 FINAL PAGE: RESOURCE MANAGEMENT
   ============================================================ */
export default function ResourcesPage() {
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
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Hero heading using ScrollFloat + ScrambledText, landing-page style */}
        <motion.div variants={itemVariants} className="space-y-4 pt-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.4)]">
            <Hospital className="w-3.5 h-3.5" />
            Intelligent Resource Orchestration
          </div>

          <ScrollFloat
            animationDuration={4}
            ease="back.inOut(2)"
            scrollStart="top bottom"
            scrollEnd="bottom center"
            stagger={0.05}
            textClassName="text-white font-extrabold"
            containerClassName="text-3xl md:text-4xl lg:text-[2.6rem] leading-tight"
          >
            Resource Management
          </ScrollFloat>

          <ScrambledText
            className="text-slate-400 text-sm md:text-base max-w-xl"
            radius={80}
            duration={1.1}
            speed={0.5}
            scrambleChars=".:/\\"
          >
            AI-guided planning for ICU beds, total capacity, staffing, and
            critical medicines – tuned for real-time surge and festival
            patterns.
          </ScrambledText>

          {/* mini KPI row (like landing metrics) */}
          <div className="mt-3 flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/35 bg-emerald-500/10 px-3 py-2 shadow-[0_0_25px_rgba(16,185,129,0.35)]">
              <Activity className="w-3.5 h-3.5 text-emerald-300" />
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-200/80">
                  Surge-ready capacity
                </p>
                <p className="text-sm font-semibold text-emerald-100">
                  82% compliant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-cyan-500/35 bg-cyan-500/10 px-3 py-2">
              <Users className="w-3.5 h-3.5 text-cyan-300" />
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-200/80">
                  Staff coverage
                </p>
                <p className="text-sm font-semibold text-cyan-100">
                  91% of required
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-amber-500/35 bg-amber-500/10 px-3 py-2">
              <Pill className="w-3.5 h-3.5 text-amber-300" />
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-amber-200/80">
                  Critical stock
                </p>
                <p className="text-sm font-semibold text-amber-100">
                  {MEDICINES.filter((m) => m.status !== "good").length} at risk
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        </motion.div>

        {/* Charts Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <ICUOccupancyChart />
          <BedAvailabilityChart />
        </motion.div>

        {/* Staff Requirements */}
        <motion.div variants={itemVariants}>
          <StaffRequirementCard />
        </motion.div>

        {/* Medicine Inventory */}
        <motion.div variants={itemVariants}>
          <MedicineInventoryTable />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
