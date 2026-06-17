import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// Layout
import Header from "./components/Header";
import Footer from "./components/Footer";

// UI utilities
import BackgroundDecor    from "./components/ui/BackgroundDecor";
import FloatingTabBar     from "./components/ui/FloatingTabBar";
import ToastNotification  from "./components/ui/ToastNotification";

// Professional page sections
import HeroSection        from "./components/sections/HeroSection";
import StatsSection       from "./components/sections/StatsSection";
import EducationSection   from "./components/sections/EducationSection";
import BentoSection       from "./components/sections/BentoSection";
import ExperienceSection  from "./components/sections/ExperienceSection";
import JourneySection     from "./components/sections/JourneySection";
import ContactSection     from "./components/sections/ContactSection";

// Projects tab
import ProjectsPage       from "./components/projects/ProjectsPage";

import { PORTFOLIO_BIO } from "./data.js";

export default function App() {
  const [activeTab, setActiveTab]       = useState("professional");
  const [copied, setCopied]             = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Auto-clear toast after 4 s
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PORTFOLIO_BIO.email);
    setCopied(true);
    setToastMessage("Copied email address to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToContact = () =>
    document.getElementById("let-talk-section")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      className="min-h-screen flex flex-col bg-[#030508] text-slate-100 bg-grid-pattern relative overflow-x-hidden font-sans"
      id="app-root"
    >
      <BackgroundDecor />

      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main
        className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 py-10 md:py-16 z-10 relative flex flex-col gap-16 md:gap-24"
        id="main-content"
      >
        <AnimatePresence mode="wait">
          {activeTab === "professional" ? (
            <motion.div
              key="professional"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-16 md:gap-24"
            >
              <HeroSection       onScrollToContact={scrollToContact} />
              <StatsSection      />
              <EducationSection  />
              <BentoSection      onCopyEmail={copyEmailToClipboard} copied={copied} />
              <ExperienceSection />
              <JourneySection    />
              <ContactSection    setToastMessage={setToastMessage} />
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectsPage setActiveTab={setActiveTab} setToastMessage={setToastMessage} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer setActiveTab={setActiveTab} />

      <FloatingTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <ToastNotification message={toastMessage} />
    </div>
  );
}
