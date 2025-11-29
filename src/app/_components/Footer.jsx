"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#040516] text-slate-200 border-t border-white/5">
      {/* soft top glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-16 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.35),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10 pt-12 pb-6 space-y-10">
        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl bg-[radial-gradient(circle_at_top,_#1e293b,#020617)] border border-white/5 px-6 py-7 md:px-10 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-[0_22px_60px_rgba(15,23,42,0.8)]"
        >
          <div>
            <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-indigo-300/80">
              Ready to get ahead of the next surge?
            </p>
            <h3 className="mt-2 text-xl md:text-2xl font-semibold text-white">
              Let SwasthiShield forecast demand before it hits your ER.
            </h3>
          </div>

          <div className="flex gap-3 md:gap-4">
            <Link
              href="#contact"
              className="
                inline-flex items-center justify-center
                rounded-full px-5 py-2.5 md:px-6 md:py-3
                text-sm font-semibold
                bg-white text-slate-900
                hover:bg-slate-100
                transition-colors
              "
            >
              Talk to our team
            </Link>
            <Link
              href="#demo"
              className="
                inline-flex items-center justify-center
                rounded-full px-4 py-2.5
                text-xs md:text-sm font-medium
                border border-indigo-400/60
                text-indigo-200/90
                hover:bg-indigo-500/10
                transition-colors
              "
            >
              View live demo
            </Link>
          </div>
        </motion.div>

        {/* Main footer grid */}
        <div className="grid gap-10 md:grid-cols-4 text-sm">
          {/* Brand + blurb */}
          <div className="md:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-7 w-7 rounded-xl bg-gradient-to-br from-emerald-400 to-sky-400 shadow-[0_0_25px_rgba(52,211,153,0.7)]" />
              <span className="text-base font-semibold tracking-wide text-white">
                SwasthiShield
              </span>
            </div>
            <p className="text-slate-400 max-w-md">
              AI agents that watch every signal – beds, staff, pollution and
              events – so your hospital can prepare days before demand spikes.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400">
              Product
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <a href="#tech" className="hover:text-white transition-colors">
                  Tech stack
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400">
              Contact
            </h4>
            <div className="space-y-1 text-slate-300">
              <p>For pilots & partnerships:</p>
              <a
                href="mailto:hello@swasthishield.ai"
                className="hover:text-white transition-colors"
              >
                hello@swasthishield.ai
              </a>
            </div>
            <div className="pt-2 space-y-1 text-slate-400 text-xs">
              <p>Mumbai • Pune • Remote-first</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SwasthiShield. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
