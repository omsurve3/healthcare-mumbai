import Spline from "@splinetool/react-spline/next";
import Navbar from "./_components/Navbar";
import HeroText from "./_components/HeroText";
import CustomCursor from "./_components/CustomCursor";
import FeaturesSection from "./_components/FeatureSection";
import HowItWorksSection from "./_components/HowItWorks";
import StatsSection from "./_components/StatsSection";
import TeamSection from "./_components/TeamSection";
import TechStackSection from "./_components/TechStackSection";
import TestimonialsSection from "./_components/TestimonialSection";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#e6e6e6] overflow-x-hidden">
      <div className="relative z-50">
        <Navbar />
      </div>

      <CustomCursor />

      {/* HERO GRID */}
      <section className="relative z-20 flex items-center h-screen px-24 gap-20">
        {/* LEFT SIDE TEXT */}
        <HeroText />

        {/* RIGHT SIDE ROBOT */}
        <div className="w-[55%] h-full flex justify-center items-center relative">
          <Spline
            scene="https://prod.spline.design/95pwIJ-rLADPQUYW/scene.splinecode"
            className="w-full h-full max-w-[780px]"
          />
        </div>
      </section>

      {/* FEATURES SECTION BELOW HERO */}
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <TechStackSection />
      <TestimonialsSection />
      <TeamSection />
      <Footer />
      
    </main>
  );
}
