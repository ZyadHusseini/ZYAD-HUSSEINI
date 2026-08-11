import { useState } from "react";
import { MotionConfig } from "framer-motion";
import IntroAnimation from "./components/IntroAnimation";
import CustomCursor from "./components/CustomCursor";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import CompaniesSlideshow from "./components/CompaniesSlideshow";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import ResearchSection from "./components/ResearchSection";
import VenturesSection from "./components/VenturesSection";
import CVHighlights from "./components/CVHighlights";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import { ToastProvider } from "./components/Toast";
import { hasIntroPlayed, prefersReducedMotion } from "./lib/introFlag";
import { useCleanAnchors } from "./lib/useCleanAnchors";

export default function App() {
  // Intro is skipped entirely if it already played this session or the
  // visitor prefers reduced motion.
  const [introDone, setIntroDone] = useState(
    () => hasIntroPlayed() || prefersReducedMotion()
  );

  useCleanAnchors();

  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        {!introDone && <IntroAnimation onComplete={() => setIntroDone(true)} />}
        <CustomCursor />
        <CommandPalette />
        <Navigation visible={introDone} />
        <main id="main">
          <HeroSection started={introDone} />
          <AboutSection />
          <CompaniesSlideshow />
          <ExperienceSection />
          <ProjectsSection />
          <ResearchSection />
          <VenturesSection />
          <CVHighlights />
          <ContactSection />
        </main>
        <Footer />
      </ToastProvider>
    </MotionConfig>
  );
}
