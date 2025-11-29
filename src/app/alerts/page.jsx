"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun, Download, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { useTheme } from "next-themes";
import Navbar from "../_components/Navbar";

// ✨ Landing-page components you used earlier
import ScrollFloat from "@/components/ScrollFloat";
import ScrambledText from "@/components/ScrambledText";

/* ============================================================
   📌 DASHBOARD LAYOUT (INLINE)
   ============================================================ */
function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#050616] text-white relative overflow-hidden">
      {/* soft global background glow like landing page */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),transparent_70%)]" />

      {/* Navbar from landing */}
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
          
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="p-6 max-w-7xl mx-auto relative z-10">{children}</main>
      </div>
    </div>
  );
}

/* ============================================================
   📌 ALERTS TABLE (INLINE)
   ============================================================ */
function AlertsTable({ filter }) {
  const alerts = [
    {
      id: 1,
      title: "High ICU Occupancy Alert",
      description: "ICU occupancy has reached 95% - Critical intervention needed",
      severity: "critical",
      date: "2024-12-15",
    },
    {
      id: 2,
      title: "Festival Impact Prediction",
      description: "Music festival expected to increase admissions by 40% on Dec 17",
      severity: "warning",
      date: "2024-12-14",
    },
    {
      id: 3,
      title: "AQI Spike Warning",
      description: "Air Quality Index projected to reach 120+ in next 24 hours",
      severity: "warning",
      date: "2024-12-14",
    },
    {
      id: 4,
      title: "Aspirin Stock Low",
      description: "Medicine inventory alert: Aspirin stock at 45 units (Critical: 100)",
      severity: "critical",
      date: "2024-12-13",
    },
    {
      id: 5,
      title: "Staff Shortage Alert",
      description: "Respiratory department short by 2 staff members for weekend shift",
      severity: "warning",
      date: "2024-12-13",
    },
    {
      id: 6,
      title: "System Update Complete",
      description: "AI prediction models updated successfully with latest data",
      severity: "info",
      date: "2024-12-12",
    },
  ];

  const filtered = alerts.filter(
    (a) => filter === "all" || a.severity === filter
  );

  const severityColor = (s) =>
    ({
      critical: "bg-red-500/10 text-red-300 border-red-500/30",
      warning: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      info: "bg-sky-500/10 text-sky-300 border-sky-500/30",
    }[s] || "bg-slate-500/10 text-slate-300");

  const severityPill = (s) =>
    ({
      critical: "border-red-400/40 text-red-300",
      warning: "border-amber-400/40 text-amber-200",
      info: "border-sky-400/40 text-sky-200",
    }[s] || "border-slate-500/40 text-slate-200");

  const severityLabel = (s) =>
    ({
      critical: "Critical",
      warning: "Warning",
      info: "Info",
    }[s] || "Info");

  const severityIcon = (s) =>
    ({
      critical: AlertTriangle,
      warning: AlertCircle,
      info: Info,
    }[s] || AlertCircle);

  return (
    <div className="bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/90 border border-slate-800/70 rounded-2xl p-6 md:p-7 backdrop-blur-2xl shadow-[0_24px_80px_rgba(15,23,42,0.85)]">
      <div className="flex justify-between items-start mb-5 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            Recent Alerts ({filtered.length})
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            System notifications from ICU, pollution, staffing & inventory agents.
          </p>
        </div>

        <button className="flex gap-2 items-center px-3 py-2 rounded-lg border border-slate-700 hover:bg-slate-900/60 transition text-sm">
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-slate-400 text-center py-8 text-sm">
            No alerts in this category right now. Agents are still monitoring in real time.
          </p>
        ) : (
          filtered.map((a, idx) => {
            const Icon = severityIcon(a.severity);
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: "easeOut" }}
                whileHover={{
                  x: 4,
                  scale: 1.01,
                  boxShadow: "0 18px 45px rgba(8,47,73,0.65)",
                }}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${severityColor(
                  a.severity
                )}`}
              >
                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/60 border border-slate-700/80">
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold text-[15px] md:text-[16px]">
                        {a.title}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${severityPill(
                          a.severity
                        )}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {severityLabel(a.severity)}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {a.description}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {a.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* ============================================================
   📌 FINAL PAGE COMPONENT
   ============================================================ */
export default function AlertsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Heading using ScrollFloat + ScrambledText like landing page */}
        <div className="text-center md:text-left space-y-3">
          <ScrollFloat
            animationDuration={4}
            ease="back.inOut(2)"
            scrollStart="top bottom"
            scrollEnd="bottom center"
            stagger={0.05}
            textClassName="text-white font-extrabold"
            containerClassName="text-3xl md:text-4xl lg:text-[2.6rem] leading-tight"
          >
            Alerts & Reports
          </ScrollFloat>

          <ScrambledText
            className="text-slate-400 text-sm md:text-base max-w-xl"
            radius={80}
            duration={1.1}
            speed={0.5}
            scrambleChars=".:"
          >
            Live AI-generated alerts from SwasthiShield&apos;s agents so hospital leaders
            can respond before surges become crises.
          </ScrambledText>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {["all", "critical", "warning", "info"].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-4 py-2 rounded-full text-sm md:text-[13px] font-medium transition-all ${
                selectedFilter === f
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_25px_rgba(34,211,238,0.35)]"
                  : "bg-slate-900/60 text-slate-300 border border-slate-700/70 hover:bg-slate-900"
              }`}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Alerts Table */}
        <AlertsTable filter={selectedFilter} />
      </div>
    </DashboardLayout>
  );
}
