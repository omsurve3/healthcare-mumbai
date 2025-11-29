"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import ProfileCard from "@/components/ProfileCard";

const TEAM = [
  {
    name: "Biresh Kumar Singh",
    title: "AI Systems & Product Lead",
    handle: "bireshks",
    status: "Designing the future of care",
    contactText: "Connect",
    avatarUrl: "/team/demo.jpg",
    miniAvatarUrl: "/team/demo.jpg",
    innerGradient: "linear-gradient(145deg,#4f46e5aa 0%,#22d3ee88 100%)",
  },
  {
    name: "Om Surve",
    title: "Full-Stack & Experience Engineer",
    handle: "omsurve",
    status: "Shipping pixels & packets",
    contactText: "Say Hi",
    avatarUrl: "/team/demo.jpg",
    miniAvatarUrl: "/team/demo.jpg",
    innerGradient: "linear-gradient(145deg,#0ea5e9aa 0%,#a855f788 100%)",
  },
  {
    name: "Savita Srivastava",
    title: "Data & Hospital Ops Specialist",
    handle: "savita",
    status: "Grounded in real workflows",
    contactText: "Talk Ops",
    avatarUrl: "/team/demo.jpg",
    miniAvatarUrl: "/team/demo.jpg",
    innerGradient: "linear-gradient(145deg,#22c55eaa 0%,#a3e63588 100%)",
  },
  {
    name: "Harshit Singh",
    title: "Backend & Reliability Engineer",
    handle: "harshits",
    status: "Keeping agents always-on",
    contactText: "Chat Infra",
    avatarUrl: "/team/demo.jpg",
    miniAvatarUrl: "/team/demo.jpg",
    innerGradient: "linear-gradient(145deg,#f97316aa 0%,#6366f188 100%)",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function TeamSection() {
  return (
    <section
      className="
        relative w-full 
        bg-gradient-to-b from-[#0A0C1B] via-[#050616] to-[#02030A]
        py-24 md:py-32
      "
    >
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(80,120,255,0.12),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <ScrollFloat
          animationDuration={4}
          ease="back.inOut(2)"
          scrollStart="top bottom"
          scrollEnd="bottom center"
          stagger={0.06}
          textClassName="text-white font-extrabold"
          containerClassName="text-center mx-auto max-w-5xl mb-6 text-4xl md:text-5xl"
        >
          Meet the Team
        </ScrollFloat>

        <p className="text-center text-sm md:text-base text-slate-300/90 max-w-2xl mx-auto">
          Four builders combining AI, product, data and reliability engineering
          to make hospital surge management actually usable in the real world.
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-16 grid gap-10 md:grid-cols-2 xl:grid-cols-4"
        >
          {TEAM.map((m) => (
            <motion.div key={m.handle} variants={item} className="flex justify-center">
              <ProfileCard
                name={m.name}
                title={m.title}
                handle={m.handle}
                status={m.status}
                contactText={m.contactText}
                avatarUrl={m.avatarUrl}
                miniAvatarUrl={m.miniAvatarUrl}
                innerGradient={m.innerGradient}
                showUserInfo
                enableTilt
                enableMobileTilt={false}
                onContactClick={() => console.log(`Contact clicked: ${m.name}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
