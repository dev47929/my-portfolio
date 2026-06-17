import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Globe, Menu, X, Check } from "lucide-react";

export default function Header({ activeTab, setActiveTab, language, setLanguage }) {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "professional", labelEN: "Professional", labelMN: "Мэргэжлийн" },
    { id: "projects", labelEN: "Projects", labelMN: "Төслүүд" },
    { id: "contact", labelEN: "Contact", labelMN: "Холбоо барих" },
  ];

  const handleNavClick = (id) => {
    if (id === "contact") {
      // Smoothly scroll to contact section
      const contactSec = document.getElementById("let-talk-section");
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: "smooth" });
      } else {
        setActiveTab("professional");
        setTimeout(() => {
          document.getElementById("let-talk-section")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      setActiveTab(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#030508]/85 backdrop-blur-md border-b border-[#1e293b]/50 px-6 sm:px-12 py-4 flex items-center justify-between" id="navigation-header">
      {/* Brand logo label */}
      <div 
        onClick={() => handleNavClick("professional")}
        className="flex items-center gap-2 select-none cursor-pointer group"
      >
        <span className="font-display font-bold text-lg tracking-wider text-white transition-colors group-hover:text-sky-400">
          Dev Sharma
        </span>
      </div>

      {/* Desktop navigation tabs centered */}
      <nav className="hidden md:flex items-center gap-1.5 bg-[#0c1017]/80 border border-[#1e293b]/70 p-1 rounded-full relative" id="desktop-nav-menu">
        {navItems.map((item) => {
          // If activeTab is contact, highlight Contact. Else match works/professional, etc.
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="relative px-5 py-2 font-display text-xs tracking-wide transition-colors rounded-full font-medium"
              style={{
                color: isActive ? "#ffffff" : "#94a3b8",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 bg-[#1e293b]/90 border border-[#334155]/60 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {language === "EN" ? item.labelEN : item.labelMN}
            </button>
          );
        })}
      </nav>

      {/* Language Toggle switch and mobile drawer buttons */}
      <div className="flex items-center gap-3">
        {/* Functional Dropdown Custom Button exactly matching the video's green button! */}
        <div className="relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-black font-semibold rounded-full text-xs transition-all shadow-lg shadow-sky-500/20"
          >
            {/* Round sphere globe or orbit */}
            <Globe className="w-3.5 h-3.5 shrink-0" />
            <span>{language === "EN" ? "English" : "Монгол"}</span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {langDropdownOpen && (
              <>
                {/* Backdrop clear overlay to close */}
                <div className="fixed inset-0 z-10" onClick={() => setLangDropdownOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-32 bg-[#0c1017] border border-[#1e293b] rounded-xl overflow-hidden shadow-2xl z-20"
                >
                  <button
                    onClick={() => {
                      setLanguage("EN");
                      setLangDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white flex items-center justify-between"
                  >
                    <span>English</span>
                    {language === "EN" && <Check className="w-3.5 h-3.5 text-sky-400" />}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("MN");
                      setLangDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white flex items-center justify-between"
                  >
                    <span>Монгол</span>
                    {language === "MN" && <Check className="w-3.5 h-3.5 text-sky-400" />}
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile menu grid toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 bg-[#0c1017] border border-[#1e293b] rounded-full text-slate-400 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-[#030508] border-b border-[#1e293b] md:hidden overflow-hidden flex flex-col gap-1 pr-6 pb-6 pl-6 pt-3 z-50 shadow-2xl"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-3 text-left font-display font-medium text-sm border-b border-[#1e293b]/30 ${
                  activeTab === item.id ? "text-sky-400" : "text-slate-400"
                }`}
              >
                {language === "EN" ? item.labelEN : item.labelMN}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
