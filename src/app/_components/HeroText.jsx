"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import BlurText from "./BlurText";

import VariableProximity from './VariableProximity'
import ShinyText from '../../components/ShinyText';
import GradientText from "@/components/GradientText";
import HeroButton from "./HeroButton";
import Carousel from "@/components/Carousel";

export default function HeroText() {
  const textRef = useRef(null);

  const handleAnimationComplete = () => {
  console.log('Animation completed!');
};
const containerRef = useRef(null);

  return (
    <div ref={textRef} className="flex flex-col w-[45%]">
      
        <BlurText
  text="Agentic AI That Predicts Patient Surges Before They Happen  "
  delay={180}
  animateBy="words"
  direction="top"
  onAnimationComplete={handleAnimationComplete}
  className="text-2xl mb-8 hero-title text-5xl font-bold text-gray-900 leading-tight"
/>
 
 <GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class hero-subtitle mt-4 text-2xl"
>
 SwasthiShield uses autonomous AI agents to forecast patient load,
        optimize staffing, and automate emergency alerts.
</GradientText>

      

      <div className="flex ml-5  gap-4 mt-15 mb-10">
       
        <HeroButton/>
       
      </div>

      
      <div className="mt-8">
        <Carousel baseWidth={360} />
      </div>
    
    </div>
  );
}
