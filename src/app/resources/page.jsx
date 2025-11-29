"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun, AlertCircle, Users } from "lucide-react";
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
   📌 DASHBOARD LAYOUT (INLINE, SAME VIBE AS ALERTS)
   ============================================================ */
function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#050616] text-white relative overflow-hidden">
      {/* soft global background glows */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),transparent_70%)]" />

      {/* Navbar from landing page */}
      <Navbar />

      {/* Main section */}
      <div className="lg:ml-64">
        {/* Top Nav */}
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

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-slate-900 rounded-lg transition"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="p-6 max-w-7xl mx-auto relative z-10">{children}</main>
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
    <motion.div whileHover={{ y: -4, scale: 1.01 }} className="h-full">
      <div className="h-full rounded-2xl bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/90 border border-slate-800/70 hover:border-cyan-400/50 transition-colors shadow-[0_22px_70px_rgba(15,23,42,0.85)]">
        <div className="px-5 pt-5 pb-3 flex flex-col gap-1">
          <h2 className="text-white text-lg font-semibold">
            ICU Occupancy Forecast
          </h2>
          <p className="text-slate-400 text-sm">
            7-day ICU bed utilization prediction
          </p>
        </div>
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
                }}
              />
              <Legend />
              <Bar dataKey="icu" stackId="a" fill="rgba(248,113,113,0.85)" name="Occupied" />
              <Bar dataKey="available" stackId="a" fill="rgba(45,212,191,0.85)" name="Available" />
            </BarChart>
          </ResponsiveContainer>
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
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} className="h-full">
      <div className="h-full rounded-2xl bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/90 border border-slate-800/70 hover:border-cyan-400/50 transition-colors shadow-[0_22px_70px_rgba(15,23,42,0.85)]">
        <div className="px-5 pt-5 pb-3 flex flex-col gap-1">
          <h2 className="text-white text-lg font-semibold">
            Total Bed Availability
          </h2>
          <p className="text-slate-400 text-sm">
            Current hospital bed distribution
          </p>
        </div>
        <div className="px-3 pb-5">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={BED_DATA}
                cx="50%"
                cy="50%"
                outerRadius={90}
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
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
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
      return "bg-red-500/10 text-red-400 border-red-500/30";
    case "warning":
      return "bg-amber-500/10 text-amber-300 border-amber-500/30";
    case "good":
      return "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";
    default:
      return "bg-slate-500/10 text-slate-300 border-slate-600/40";
  }
}

function MedicineInventoryTable() {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }}>
      <div className="rounded-2xl bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/90 border border-slate-800/70 hover:border-cyan-400/50 transition-colors shadow-[0_22px_70px_rgba(15,23,42,0.85)]">
        <div className="px-5 pt-5 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-white text-lg font-semibold">
              Medicine Stock Low-Inventory Alerts
            </h2>
            <p className="text-slate-400 text-sm">
              Critical supply monitoring
            </p>
          </div>
          <div className="p-3 bg-red-500/20 rounded-xl border border-red-500/40">
            <AlertCircle className="w-6 h-6 text-red-300" />
          </div>
        </div>

        <div className="px-5 pb-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/60">
                <th className="text-left py-3 px-4 font-semibold text-slate-300">
                  Medicine Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-slate-300">
                  Current Stock
                </th>
                <th className="text-left py-3 px-4 font-semibold text-slate-300">
                  Min Required
                </th>
                <th className="text-left py-3 px-4 font-semibold text-slate-300">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {MEDICINES.map((med, index) => (
                <motion.tr
                  key={med.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
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
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }}>
      <div className="rounded-2xl bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/90 border border-slate-800/70 hover:border-cyan-400/50 transition-colors shadow-[0_22px_70px_rgba(15,23,42,0.85)]">
        <div className="px-5 pt-5 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-white text-lg font-semibold">
              Staff Requirement Simulation
            </h2>
            <p className="text-slate-400 text-sm">
              Department-wise staff allocation
            </p>
          </div>
          <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/40">
            <Users className="w-6 h-6 text-purple-300" />
          </div>
        </div>

        <div className="px-5 pb-6 space-y-4">
          {STAFF_DATA.map((staff, index) => (
            <motion.div
              key={staff.department}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/60"
            >
              <div className="flex justify-between items-start mb-2 gap-3">
                <div>
                  <h3 className="font-semibold text-white">
                    {staff.department}
                  </h3>
                  <p className="text-sm text-slate-400">
                    Current: {staff.current}/{staff.required}
                  </p>
                </div>
                {staff.shortage > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.08 + 0.15 }}
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
                  animate={{ width: `${(staff.current / staff.required) * 100}%` }}
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
        {/* Heading with ScrollFloat + ScrambledText */}
        <motion.div variants={itemVariants} className="space-y-3">
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
            Hospital resources &amp; supply forecasting across ICU beds, total
            capacity, staff requirements, and critical medicines.
          </ScrambledText>
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
