"use client";

import ScrollFloat from "@/components/ScrollFloat";
import ScrambledText from "@/components/ScrambledText";
import FlowingMenu from "@/components/FlowingMenu";

const FEATURES = [
  { title: "AI-Powered Predictions" },
  { title: "Real-Time Analytics" },
  { title: "Emergency Preparedness" },
  { title: "Staff Optimization" },
  { title: "Instant Insights" },
  { title: "Resource Forecasting" },
];

const FLOW_ITEMS = [
  {
    text: "AI-Powered Predictions",
    link: "#",
    image: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "Real-Time Analytics",
    link: "#",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "Emergency Preparedness",
    link: "#",
    image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "Staff Optimization",
    link: "#",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=900&q=80",
  },
  {
    text: "Instant Insights",
    link: "#",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "Resource Forecasting",
    link: "#",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
  },
];


export default function FeatureSection() {
  return (
    <section
      id="feature-section"
      className="relative w-full bg-[#D3D3D3] pt-24 pb-24"
    >
      {/* Title */}
      <ScrollFloat
        animationDuration={4}
        ease="back.inOut(2)"
        scrollStart="top bottom"
        scrollEnd="bottom center"
        stagger={0.06}
        textClassName="text-black font-extrabold"
        containerClassName="text-center mx-auto max-w-6xl mb-14 
                            text-5xl md:text-6xl lg:text-7xl leading-tight"
      >
        Intelligent Hospital Management
      </ScrollFloat>

      {/* Subheading */}
      <div className="mx-auto max-w-6xl px-6 md:px-10 mb-10 ">
        <ScrambledText
          className="scrambled-text-demo text-black/80 font-medium 
                     text-base md:text-lg leading-relaxed max-w-3xl"
          radius={100}
          duration={1.2}
          speed={0.5}
          scrambleChars={".:"}
        >
          Harness the power of autonomous AI agents to stay ahead of patient
          demand across beds, staff and critical resources.
        </ScrambledText>
      </div>

      {/* FULL WIDTH FLOWING MENU */}
      <div className="w-full">
        <div
          className="
            w-full                 /* FULL WIDTH */
          
            bg-[#050616]
            text-white
            border border-[#222]
            overflow-hidden
            shadow-[0_25px_60px_rgba(0,0,0,0.35)]
            h-[460px] md:h-[520px]
          "
        >
          <FlowingMenu items={FLOW_ITEMS} />
        </div>
      </div>
    </section>
  );
}
