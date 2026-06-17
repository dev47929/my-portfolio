import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Github, Linkedin, Code2 } from "lucide-react";
import { PORTFOLIO_BIO } from "../data.js";

export default function Header({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "professional", label: "Professional" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
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
    <header className="sticky top-0 z-50 w-full bg-[#030508]/85 backdrop-blur-md border-b border-[#1e293b]/55 px-6 sm:px-12 py-4 flex items-center justify-between" id="navigation-header">
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
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Social icons — desktop only */}
        <div className="hidden md:flex items-center gap-1.5 pr-2 border-r border-[#1e293b]/60">
          <a href={PORTFOLIO_BIO.github} target="_blank" rel="noreferrer" title="GitHub"
            className="p-2 bg-[#0c1017] border border-[#1e293b] rounded-full text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-all">
            <Github className="w-4 h-4" />
          </a>
          <a href={PORTFOLIO_BIO.linkedin} target="_blank" rel="noreferrer" title="LinkedIn"
            className="p-2 bg-[#0c1017] border border-[#1e293b] rounded-full text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-all">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={PORTFOLIO_BIO.leetcode} target="_blank" rel="noreferrer" title="LeetCode"
            className="p-2 bg-[#0c1017] border border-[#1e293b] rounded-full text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-all">
            <Code2 className="w-4 h-4" />
          </a>
        </div>
        {/* Mobile menu toggle */}
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
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
