"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import LogoLoop from "@/components/LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiPython,
  SiTailwindcss,
  SiFastapi,
  SiGreensock,
} from "react-icons/si";
import { TbRobot } from "react-icons/tb"; // for Agents

const TECH_LOGOS = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiJavascript />,
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiGreensock />, title: "GSAP", href: "https://gsap.com" },
  { node: <TbRobot />, title: "AI Agents", href: "#" },
  { node: <SiFastapi />, title: "FastAPI", href: "https://fastapi.tiangolo.com" },
];

export default function TechStackSection() {
  return (
    <section className="relative w-full bg-[#EFF4FF] py-20 md:py-24 overflow-hidden">
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-40 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_65%)]" />

      {/* Centered heading + copy */}
      <div className="relative mx-auto max-w-6xl px-6 md:px-10 flex flex-col gap-10">
        <ScrollFloat
          animationDuration={4}
          ease="back.inOut(2)"
          scrollStart="top bottom"
          scrollEnd="bottom center"
          stagger={0.06}
          textClassName="text-slate-900 font-extrabold"
          containerClassName="text-center mx-auto max-w-4xl text-3xl md:text-4xl lg:text-5xl"
        >
          Built on a modern test stack
        </ScrollFloat>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center text-sm md:text-base text-slate-600"
        >
          SwasthiShield combines a React&nbsp;+&nbsp;Next.js frontend with
          JavaScript &amp; TypeScript, FastAPI &amp; Python on the backend,
          Tailwind for styling, GSAP for motion, and AI agents orchestrating
          real-time hospital intelligence.
        </motion.p>
      </div>

      {/* Full-width LogoLoop strip */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative mt-10
          left-1/2 -translate-x-1/2
          w-screen
          bg-gradient-to-b from-slate-900 via-slate-950 to-black
          border border-slate-800/70
          px-4 md:px-10 lg:px-16
          py-6 md:py-8
          shadow-[0_22px_60px_rgba(15,23,42,0.4)]
          
        "
      >
        <LogoLoop
          logos={TECH_LOGOS}
          speed={110}
          direction="left"
          width="100%"
          logoHeight={42}
          gap={56}
          pauseOnHover
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#EFF4FF"
          ariaLabel="Core technology stack"
          renderItem={(item) => (
            <div className="flex flex-col items-center gap-2 text-white/90">
              <span className="text-[40px] md:text-[46px]">{item.node}</span>
              <span className="text-[11px] md:text-xs tracking-[0.16em] uppercase text-slate-300">
                {item.title}
              </span>
            </div>
          )}
        />
      </motion.div>
    </section>
  );
}
