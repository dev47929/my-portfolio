import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap,
  Star,
  Copy,
  Check,
  CheckCircle,
  Code,
  Laptop,
  Server,
  TrendingUp,
  Send,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Link2,
  Terminal,
  Sliders,
  Eye,
  BookOpen,
  Briefcase,
  Calendar,
  Flame,
  ShieldCheck,
  Cpu,
  Layers,
  Globe,
  ExternalLink,
  Sparkles,
  Award
} from "lucide-react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import {
  PORTFOLIO_BIO,
  CORE_STATS,
  EDUCATION_DATA,
  BENTO_PROFILE,
  PROJECTS_DATA,
  EXPERIENCE_CARDS,
  TIMELINE_JOURNEY
} from "./data.js";

export default function App() {
  const [activeTab, setActiveTab] = useState("professional");
  const [language, setLanguage] = useState("EN");
  const [projectFilter, setProjectFilter] = useState("all");
  const [expandedProject, setExpandedProject] = useState(null);
  const [activeTimelineYear, setActiveTimelineYear] = useState("2025");
  
  // Custom states for interactive elements
  const [copied, setCopied] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [toastMessage, setToastMessage] = useState(null);

  // Auto-clear toast helper
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PORTFOLIO_BIO.email);
    setCopied(true);
    setToastMessage(language === "EN" ? "Copied email address to clipboard!" : "Имэйл хаяг хуулагдлаа!");
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactEmail || !contactMsg) return;
    setSubmitStatus("loading");
    setTimeout(() => {
      setSubmitStatus("success");
      setToastMessage(language === "EN" ? "Message sent successfully!" : "Зурвас амжилттай илгээгдлээ!");
      // Reset
      setContactName("");
      setContactEmail("");
      setContactMsg("");
      setTimeout(() => setSubmitStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030508] text-slate-100 bg-grid-pattern relative overflow-x-hidden font-sans" id="app-root">
      
      {/* Decorative architectural vertical spacing grid lines mirroring high-end design */}
      <div className="absolute inset-0 pointer-events-none flex justify-between px-6 sm:px-12 md:px-24 z-0 opacity-15">
        <div className="w-px h-full bg-slate-800" />
        <div className="w-px h-full bg-slate-800" />
        <div className="w-px h-full bg-slate-800 hidden md:block" />
        <div className="w-px h-full bg-slate-800 hidden lg:block" />
      </div>

      {/* Mesmerizing diagonal green atmospheric neon aura glow */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-sky-500/10 to-transparent rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-100px] w-[500px] h-[500px] bg-gradient-to-bl from-purple-500/5 to-transparent rounded-full blur-[110px] pointer-events-none z-0" />

      {/* Top Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 py-10 md:py-16 z-10 relative flex flex-col gap-16 md:gap-24" id="main-content">
        
        <AnimatePresence mode="wait">
          {activeTab === "professional" ? (
            <motion.div
              key="professional-portfolio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-16 md:gap-24"
            >
              {/* BRAND HERO SECTION */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-2 md:pt-6" id="hero-sec">
                {/* Left column contents */}
                <div className="lg:col-span-7 flex flex-col gap-5">
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-widest bg-sky-500/5 border border-sky-500/15 px-3 py-1.5 rounded-full w-fit">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse text-sky-400" />
                    <span>{PORTFOLIO_BIO.title}</span>
                  </div>

                  <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05] tracking-tight">
                    {language === "EN" ? "Hello I'm" : "Сайн уу, би"}{" "}
                    <span className="block mt-1 font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-200">
                      Dev
                    </span>
                    <span className="block mt-1 text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                      Sharma
                    </span>
                  </h1>

                  <p className="text-sm md:text-base text-slate-400 font-sans leading-relaxed max-w-xl">
                    {language === "EN" ? PORTFOLIO_BIO.subTitle.EN : PORTFOLIO_BIO.subTitle.MN}
                  </p>

                  {/* Primary & Secondary Call-to-actions plus socials */}
                  <div className="flex flex-wrap items-center gap-4 mt-2" id="hero-actions">
                    <button
                      onClick={() => document.getElementById("let-talk-section")?.scrollIntoView({ behavior: "smooth" })}
                      className="px-6 py-3 bg-sky-500 hover:bg-sky-600 rounded-full text-xs font-mono font-bold text-black flex items-center gap-1.5 shadow-lg shadow-sky-500/15 transition-transform hover:scale-[1.02] active:scale-95"
                    >
                      <span>{language === "EN" ? "VIEW CV >" : "CV ҮЗЭХ >"}</span>
                    </button>

                    {/* Circle outline social triggers */}
                    <div className="flex items-center gap-2">
                      <a
                        href="https://www.instagram.com/devsharma/"
                        target="_blank"
                        rel="noreferrer"
                        title="Instagram profile Link"
                        className="p-2.5 bg-[#0c1017] border border-[#1e293b] hover:border-sky-500 hover:text-sky-400 rounded-full text-slate-400 transition-colors"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                      <a
                        href="https://youtube.com/"
                        target="_blank"
                        rel="noreferrer"
                        title="Youtube channel Link"
                        className="p-2.5 bg-[#0c1017] border border-[#1e293b] hover:border-sky-500 hover:text-sky-400 rounded-full text-slate-400 transition-colors"
                      >
                        <Youtube className="w-4 h-4" />
                      </a>
                      <a
                        href={PORTFOLIO_BIO.github}
                        target="_blank"
                        rel="noreferrer"
                        title="GitHub Profile Link"
                        className="p-2.5 bg-[#0c1017] border border-[#1e293b] hover:border-sky-500 hover:text-sky-400 rounded-full text-slate-400 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={PORTFOLIO_BIO.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        title="LinkedIn Profile Link"
                        className="p-2.5 bg-[#0c1017] border border-[#1e293b] hover:border-sky-500 hover:text-sky-400 rounded-full text-slate-400 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right column: High-fidelity astronomical animated SVG orbits around cute cosmic avatar */}
                <div className="lg:col-span-5 flex justify-center items-center py-6 relative" id="hero-right-celestial">
                  {/* Glowing planetary aura */}
                  <div className="absolute w-80 h-80 rounded-full bg-sky-500/10 blur-3xl" />

                  {/* Concentric rotating systems */}
                  <div className="relative w-80 h-80 flex items-center justify-center">
                    
                    {/* Orbit 1: Outermost with slow counter rotation */}
                    <div className="absolute w-full h-full border border-dashed border-[#1e293b] rounded-full animate-spin" style={{ animationDuration: "60s" }}>
                      <div className="absolute top-1/4 right-[2%] w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]" />
                    </div>

                    {/* Orbit 2: Middle with standard clockwise speed */}
                    <div className="absolute w-[82%] h-[82%] border border-dashed border-[#1e293b]/70 rounded-full animate-spin" style={{ animationDuration: "40s" }}>
                      <div className="absolute bottom-[10%] left-[10%] w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                    </div>

                    {/* Orbit 3: Innermost spinning fast */}
                    <div className="absolute w-[64%] h-[64%] border border-dashed border-[#1e293b]/50 rounded-full animate-spin" style={{ animationDuration: "25s" }}>
                      <div className="absolute top-[8%] left-1/2 w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_8px_#f43f5e]" />
                    </div>

                    {/* Center Core: Sleeping Cosmic Anime Chibi Card */}
                    <div className="absolute w-[48%] h-[48%] rounded-full p-[3px] bg-gradient-to-tr from-sky-500 via-[#1e293b] to-purple-500 shadow-[0_0_40px_rgba(56,189,248,0.3)] animate-pulse" style={{ animationDuration: "4s" }}>
                      <div className="w-full h-full rounded-full bg-[#030508] overflow-hidden relative border border-black group">
                        <img
                          src="/src/assets/images/chibi_sleeping_cosmic_1781457508948.jpg"
                          alt="sleeping cosmic chibi"
                          className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-sky-500/25 to-transparent mix-blend-overlay" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* CORE METRICS / STATS ROW */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6" id="stats-sec">
                {CORE_STATS.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-[#0c1017]/80 hover:bg-[#0c1017] border border-[#1e293b]/60 hover:border-sky-500/30 p-6 rounded-2xl flex flex-col justify-center transition-all duration-300 relative overflow-hidden group"
                  >
                    {/* Tiny decorative border light */}
                    <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-sky-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-black text-4xl text-white tracking-tight group-hover:text-sky-400 transition-colors">
                        {stat.value}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 mt-2 uppercase tracking-wider">
                      {language === "EN" ? stat.label.EN : stat.label.MN}
                    </span>
                  </div>
                ))}
              </section>

              {/* EDUCATION ACCREDITATION PANEL */}
              <section className="flex flex-col gap-6" id="edu-sec">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
                  <GraduationCap className="w-5 h-5 text-sky-400" />
                  <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                    {language === "EN" ? "Education Credentials" : "Боловсрол"}
                  </h2>
                </div>

                <div className="bg-[#0c1017]/90 border border-[#1e293b]/70 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-sky-500/40 transition-colors group">
                  {/* Ambient green highlight */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-sky-500/5 border border-sky-500/20 rounded-xl text-sky-400 group-hover:bg-sky-500/10 group-hover:text-sky-300 transition-all">
                      <Award className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-slate-100">
                        {language === "EN" ? EDUCATION_DATA.title.EN : EDUCATION_DATA.title.MN}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {EDUCATION_DATA.period}
                        </span>
                        <span>|</span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <BookOpen className="w-3.5 h-3.5" />
                          {language === "EN" ? "Rajiv Gandhi Proudyogiki Vishwavidyalaya" : "Ражив Гандийн Проудьёогики Вишвавидялаяа"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 font-sans italic">
                        {language === "EN" ? EDUCATION_DATA.institution.EN : EDUCATION_DATA.institution.MN}
                      </p>
                    </div>
                  </div>

                  {/* GPA bubble */}
                  <div className="bg-sky-500/10 border border-sky-500/30 px-3.5 py-2 rounded-xl flex items-center gap-1.5 self-end md:self-auto">
                    <Star className="w-4 h-4 fill-sky-400 text-sky-400" />
                    <span className="font-mono text-sm font-bold text-white">GPA {EDUCATION_DATA.gpa}</span>
                  </div>
                </div>
              </section>

              {/* BENTO GRID SHORT PROFILE CHRONICLE */}
              <section className="flex flex-col gap-6" id="bento-sec">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
                  <Terminal className="w-5 h-5 text-sky-400" />
                  <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                    {language === "EN" ? "Short Profile" : "Товч Танилцуулга"}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Left-top Card (Span 6): Developer + Live Chart */}
                  <div className="md:col-span-6 bg-[#0c1017]/85 border border-[#1e293b]/75 hover:border-sky-500/30 p-6 rounded-2xl flex flex-col justify-between min-h-[220px] transition-colors group relative overflow-hidden">
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[9px] font-mono text-sky-400 bg-sky-500/5 px-2 py-1 rounded">
                      <Server className="w-3 h-3 text-sky-400 animate-pulse" />
                      <span>LIVE LEDGER FEED</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                        // PROFILE_SUMMARY_A
                      </span>
                      <h3 className="font-display font-bold text-base text-slate-100 max-w-sm">
                        {language === "EN" ? BENTO_PROFILE.column1.EN : BENTO_PROFILE.column1.MN}
                      </h3>
                    </div>

                    {/* Cute responsive CSS graph simulating dynamic banking updates */}
                    <div className="h-20 w-full mt-4 flex items-end gap-[3px] border-b border-slate-800/60 pb-1 px-1 relative">
                      {[30, 45, 25, 60, 50, 85, 40, 70, 95, 65, 80, 55, 90, 75, 45].map((val, idx) => (
                        <div
                          key={idx}
                          className="flex-1 bg-sky-500/40 rounded-t-sm group-hover:bg-sky-400/80 transition-all duration-300 relative"
                          style={{ height: `${val}%` }}
                        >
                          {/* Pulsing overlay for the active terminal transaction element */}
                          {idx === 12 && (
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right-top Card (Span 6): Languages + Custom Primary Stack capsule */}
                  <div className="md:col-span-6 bg-[#0c1017]/85 border border-[#1e293b]/75 hover:border-sky-500/30 p-6 rounded-2xl flex flex-col justify-between min-h-[220px] transition-colors group relative overflow-hidden">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                        // COMM_SKILLSET_B
                      </span>
                      <h3 className="font-display font-bold text-base text-slate-100">
                        {language === "EN" ? BENTO_PROFILE.column2.EN : BENTO_PROFILE.column2.MN}
                      </h3>
                    </div>

                    <div className="mt-4 flex flex-col gap-2.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        My primary tech stack:
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Huge glow stack capsule exactly matching the video */}
                        <div className="px-4 py-2 bg-sky-500/10 border border-sky-500/40 rounded-full font-mono text-xs font-bold text-sky-400 flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
                          <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
                          <span>React, Node.js</span>
                        </div>
                        <span className="px-3 py-1.5 bg-slate-800/40 border border-slate-700/50 rounded-full font-mono text-[10px] text-slate-300">
                          Express
                        </span>
                        <span className="px-3 py-1.5 bg-slate-800/40 border border-slate-700/50 rounded-full font-mono text-[10px] text-slate-300">
                          SQL
                        </span>
                        <span className="px-3 py-1.5 bg-slate-800/40 border border-slate-700/50 rounded-full font-mono text-[10px] text-sky-400 border-sky-400/20">
                          JavaScript (.jsx)
                        </span>
                        <span className="px-3 py-1.5 bg-slate-800/40 border border-slate-700/50 rounded-full font-mono text-[10px] text-slate-300">
                          Data Structures
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Left-bottom Card (Span 5): Architect + Email copy */}
                  <div className="md:col-span-5 bg-[#0c1017]/85 border border-[#1e293b]/75 hover:border-sky-500/30 p-6 rounded-2xl flex flex-col justify-between min-h-[190px] transition-colors group relative overflow-hidden">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                        // DESIGN_PRINCIPLES
                      </span>
                      <h3 className="font-display font-bold text-base text-slate-100">
                        {language === "EN" ? BENTO_PROFILE.column3.EN : BENTO_PROFILE.column3.MN}
                      </h3>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                      <span className="text-[10px] font-mono text-slate-400">
                        Do you want to ask a question?
                      </span>
                      
                      <button
                        onClick={copyEmailToClipboard}
                        className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold text-white bg-slate-800/50 hover:bg-sky-500/10 border border-slate-700 hover:border-sky-500/40 flex items-center justify-between transition-all active:scale-[0.98]"
                      >
                        <span className="truncate">{PORTFOLIO_BIO.email}</span>
                        {copied ? (
                          <Check className="w-4 h-4 text-sky-400 shrink-0" />
                        ) : (
                          <Copy className="w-4 h-4 text-slate-400 shrink-0 hover:text-white" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Right-bottom Card (Span 7): The Inside Scoop + Import snippet */}
                  <div className="md:col-span-7 bg-[#0c1017]/85 border border-[#1e293b]/75 hover:border-sky-500/30 p-6 rounded-2xl flex flex-col justify-between min-h-[190px] transition-colors group relative overflow-hidden">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                        // GENERAL_TRAJECTORY
                      </span>
                      <h3 className="font-display font-bold text-base text-slate-100">
                        {language === "EN" ? BENTO_PROFILE.column4.title.EN : BENTO_PROFILE.column4.title.MN}
                      </h3>
                      <p className="text-xs text-slate-400 font-sans mt-1">
                        {language === "EN" ? BENTO_PROFILE.column4.text.EN : BENTO_PROFILE.column4.text.MN}
                      </p>
                    </div>

                    {/* Miniature IDE code import block matching standard video */}
                    <div className="mt-4 p-3 bg-[#030508] border border-[#1e293b]/70 rounded-xl font-mono text-[9px] sm:text-[10px] text-slate-400 leading-relaxed select-none">
                      <div className="text-slate-500">// Importing a single module</div>
                      <div>
                        <span className="text-yellow-500">import</span> moduleName <span className="text-yellow-500">from</span> <span className="text-sky-400">'modulePath'</span>
                      </div>
                      <div className="text-slate-500 mt-2">// Importing multiple modules</div>
                      <div>
                        <span className="text-yellow-500">import</span> &#123; module1, module2 &#125; <span className="text-yellow-500">from</span> <span className="text-sky-400">'modulePath'</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* MY EXPERIENCE ROLES */}
              <section className="flex flex-col gap-6" id="xp-sec">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
                  <Briefcase className="w-5 h-5 text-sky-400" />
                  <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                    {language === "EN" ? "My Experience" : "Миний Туршлага"}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {EXPERIENCE_CARDS.map((xp, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-[#0c1017]/85 border border-[#1e293b]/70 hover:border-sky-500/30 rounded-2xl p-6 transition-all duration-300 flex items-start gap-4 hover:-translate-y-1 relative overflow-hidden group"
                      >
                        {/* Custom visual side circle represent 3D shape highlights exactly matching standard video */}
                        <div className="shrink-0">
                          {xp.accent === "purple" && (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 shadow-[0_0_15px_#a855f7] flex items-center justify-center text-white text-xs font-bold font-display animate-pulse">
                              Φ
                            </div>
                          )}
                          {xp.accent === "gold" && (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-600 shadow-[0_0_15px_#f59e0b] flex items-center justify-center text-black text-xs font-bold font-display animate-pulse">
                              Θ
                            </div>
                          )}
                          {xp.accent === "cyan" && (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-[0_0_15px_#22d3ee] flex items-center justify-center text-black text-xs font-bold font-display animate-pulse">
                              Ω
                            </div>
                          )}
                          {xp.accent === "rose" && (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-red-700 shadow-[0_0_15px_#f43f5e] flex items-center justify-center text-white text-xs font-bold font-display animate-pulse">
                              Δ
                            </div>
                          )}
                        </div>

                        <div>
                          <h3 className="font-display font-bold text-base text-slate-100 group-hover:text-sky-400 transition-colors">
                            {language === "EN" ? xp.role.EN : xp.role.MN}
                          </h3>
                          <p className="text-xs text-slate-400 font-sans mt-2 leading-relaxed">
                            {language === "EN" ? xp.desc.EN : xp.desc.MN}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* TIMELINE INTERACTIVE JOURNEY REPORT */}
              <section className="flex flex-col gap-6" id="journey-sec">
                <div className="flex flex-col gap-2 pb-2 border-b border-slate-800/60">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-sky-400" />
                    <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                      {language === "EN" ? "My journey report" : "Миний Аялал"}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-3xl mt-1">
                    {language === "EN"
                      ? "I've had the opportunity to develop software across a variety of settings - from small side-jobs to large corporation, mostly building financial systems. Here's my timeline of my journey"
                      : "Би жижиг ажлуудаас авахуулаад уул уурхайн томоохон бирж, финтек брокерийн арав гаруй системүүдийг амжилттай хөгжүүлж ирсэн. Ингээд миний түүхийн интерактив цагийн хугацаатай танилцана уу."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-2">
                  
                  {/* Left Column (Span 4): Interactive Year Selection */}
                  <div className="md:col-span-4 flex flex-col gap-2.5" id="timeline-years">
                    {TIMELINE_JOURNEY.map((item) => {
                      const isActive = activeTimelineYear === item.year;
                      return (
                        <button
                          key={item.year}
                          onClick={() => setActiveTimelineYear(item.year)}
                          className={`w-full p-4 text-left rounded-xl border flex items-center justify-between transition-all duration-200 ${
                            isActive
                              ? "bg-[#0c1017] border-sky-500 text-white shadow-xl shadow-sky-500/5"
                              : "bg-transparent border-slate-800/60 text-slate-400 hover:bg-slate-800/10 hover:border-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-2 h-2 rounded-full ${isActive ? "bg-sky-400 animate-pulse" : "bg-slate-700"}`} />
                            <span className="font-display font-bold text-sm">{item.year}</span>
                          </div>
                          
                          {isActive && <CheckCircle className="w-4 h-4 text-sky-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Column (Span 8): Rich Details Milestone Card with slide in effect */}
                  <div className="md:col-span-8 min-h-[200px]" id="timeline-detail-viewport">
                    <AnimatePresence mode="wait">
                      {(() => {
                        const milestone = TIMELINE_JOURNEY.find((m) => m.year === activeTimelineYear);
                        if (!milestone) return null;
                        return (
                          <motion.div
                            key={milestone.year}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                            className="bg-[#0c1017]/95 border border-[#1e293b]/70 rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col gap-4"
                          >
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500" />
                            
                            <div>
                              <span className="font-mono text-xs font-bold text-sky-400 block mb-1">
                                YEAR {milestone.year} ARCHIVE
                              </span>
                              <h3 className="font-display font-bold text-xl text-white">
                                {language === "EN" ? milestone.title.EN : milestone.title.MN}
                              </h3>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                              {language === "EN" ? milestone.desc.EN : milestone.desc.MN}
                            </p>

                            {/* Additional custom diagrams for 2024 to mimic video details */}
                            {milestone.year === "25" || milestone.year === "2024" && (
                              <div className="mt-2 p-3 bg-[#030508] border border-slate-800 rounded-xl font-mono text-[9px] text-slate-500 space-y-1 select-none">
                                <div className="text-sky-400 font-bold">DATABASE SPECIFICATIONS ACCREDITED</div>
                                <div>ISO Compliance: Secure ledger logging architecture</div>
                                <div>Volume Capacity: $140M transactions executed</div>
                                <div>Database Nodes: Dual cluster replicas (Failover &lt;2s)</div>
                              </div>
                            )}

                            {/* Additional custom details for 2025 */}
                            {milestone.year === "2025" && (
                              <div className="mt-2 flex gap-3 text-[10px] font-mono">
                                <span className="px-3 py-1 bg-sky-500/5 text-sky-400 border border-sky-500/10 rounded">
                                  BEST_STUDENT_25
                                </span>
                                <span className="px-3 py-1 bg-purple-500/5 text-purple-400 border border-purple-500/10 rounded">
                                  THESIS: MULTI_AGENT
                                </span>
                              </div>
                            )}
                          </motion.div>
                        );
                      })()}
                    </AnimatePresence>
                  </div>

                </div>
              </section>

              {/* LET'S TALK / GET IN TOUCH CONTACT FORM */}
              <section className="bg-[#0c1017]/90 border border-[#1e293b]/70 hover:border-sky-500/30 rounded-2xl p-6 md:p-8 relative overflow-hidden" id="let-talk-section">
                {/* Decorative neon glow */}
                <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-widest block">
                      // GET_IN_TOUCH
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                      {language === "EN" ? "Let's Talk" : "Холбоо Барих"}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                      {language === "EN"
                        ? "What led you here? What are you looking for? I would love to hear from you over a virtual coffee chat!"
                        : "Төслийн санал болон хамтын ажиллагааны талаар virtual цайгаар ярилцах боломжтой. Холбоо барих зурвасаа үлдээнэ үү."}
                    </p>

                    <div className="flex flex-col gap-2 mt-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                        Quick Connection
                      </span>
                      <a href={`mailto:${PORTFOLIO_BIO.email}`} className="text-xs font-mono text-sky-400 hover:underline">
                        {PORTFOLIO_BIO.email}
                      </a>
                    </div>
                  </div>

                  {/* Direct Contact Form */}
                  <form onSubmit={handleContactSubmit} className="lg:col-span-7 flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                          {language === "EN" ? "Your Name" : "Нэр"}
                        </label>
                        <input
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Dev Sharma"
                          className="px-4 py-3 bg-[#030508] border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/35 transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                          {language === "EN" ? "Email Address *" : "Имэйл Хаяг *"}
                        </label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="visitor@domain.com"
                          className="px-4 py-3 bg-[#030508] border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/35 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        {language === "EN" ? "Your Message *" : "Зурвасын агуулга *"}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                        placeholder={language === "EN" ? "Let's build something fantastic..." : "Төслийн санал..."}
                        className="px-4 py-3 bg-[#030508] border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/35 resize-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitStatus === "loading" || !contactEmail || !contactMsg}
                      className="mt-2 py-3 px-6 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed font-mono text-xs font-bold text-black rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-sky-500/10 active:scale-98 transition-all"
                    >
                      {submitStatus === "loading" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>SENDING...</span>
                        </>
                      ) : submitStatus === "success" ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>SENT!</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{language === "EN" ? "Let's get in touch ↗" : "Хоблоо Барих ↗"}</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </section>
            </motion.div>
          ) : (
            // PROJECTS COMPACT GRID VIEW
            <motion.div
              key="projects-page-section"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8"
            >
              {/* Projects Title heading */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#1e293b]/70 pb-6 mb-2">
                <div>
                  <span className="font-mono text-xs text-sky-400 uppercase tracking-widest block mb-1">
                    // SELECTED_DEVELOPMENT_COMPENDIUM
                  </span>
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                    {language === "EN" ? "Selected Work" : "Сонгосон Төслүүд"}
                  </h2>
                </div>
                <p className="max-w-md text-xs text-slate-400 font-sans leading-relaxed">
                  {language === "EN"
                    ? "A curated showcase of secure transaction ledgers, hybrid cloud platforms, and cooperative multi-agent thesis nodes."
                    : "Үүлэн технологи, санхүүгийн арилжааны систем, дэд бүтэц болон хиймэл оюуны чиглэлээр амжилттай гүйцэтгэсэн голлох төслүүд."}
                </p>
              </div>

              {/* Filtering mechanism pills */}
              <div className="flex flex-wrap gap-2" id="project-filter-bar">
                {[
                  { id: "all", labelEN: "ALL SYSTEMS", labelMN: "БҮХ ТӨСӨЛ" },
                  { id: "engineering", labelEN: "FINTECH & SYSTEM", labelMN: "ФИНТЕК БА СИСТЕМ" },
                  { id: "visual", labelEN: "CLOUD & DEVOPS", labelMN: "ҮҮЛЭН ТЕХНОЛОГИ" },
                  { id: "audio", labelEN: "AI & MULTI-AGENT", labelMN: "ХИЙМЭЛ ОЮУН УХААН" }
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => {
                      setProjectFilter(filter.id);
                      setExpandedProject(null); // Reset expanded details on filter switch
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-medium font-display tracking-wide border transition-all ${
                      projectFilter === filter.id
                        ? "bg-slate-800 border-sky-500 text-sky-400"
                        : "bg-transparent border-[#1e293b]/65 hover:bg-[#0c1017]/70 text-slate-400 hover:text-slate-300"
                    }`}
                  >
                    {language === "EN" ? filter.labelEN : filter.labelMN}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                {PROJECTS_DATA.filter(p => projectFilter === "all" || p.type === projectFilter).map((project) => {
                  const isExpanded = expandedProject === project.id;
                  return (
                    <div
                      key={project.id}
                      className="bg-[#0c1017]/90 border border-[#1e293b]/70 hover:border-sky-500/40 rounded-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 group"
                    >
                      {/* Project Dashboard Vector Preview (High fidelity, pure CSS/HTML mockup) */}
                      <div className="h-44 w-full bg-[#040608] border-b border-[#1e293b]/70 relative overflow-hidden flex items-center justify-center">
                        {/* Background structural guidelines */}
                        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

                        {project.id === "mining-auction" && (
                          <div className="w-[85%] h-[80%] bg-[#0c1017] border border-slate-800/80 rounded-lg p-2.5 font-mono text-[8px] text-slate-400 space-y-1.5 select-none relative">
                            <div className="flex justify-between pb-1 border-b border-slate-800 text-sky-400 font-bold">
                              <span>LIVE BID EXCHANGE</span>
                              <span className="animate-pulse">● FEED ACTIVE</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#172554]/10 p-1 rounded">
                              <span className="text-blue-400">#489 BID ADVISORY: Accepted</span>
                              <span className="text-yellow-400 font-bold">$140,240,000</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#070a0f] p-1 rounded">
                              <span>#488 TRANSACTION: Complete</span>
                              <span>$139,100,000</span>
                            </div>
                            {/* Glowing central indicator */}
                            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-400 font-bold">
                              AGG REG: $140M+
                            </div>
                          </div>
                        )}

                        {project.id === "fibo-stack" && (
                          <div className="w-[85%] h-[80%] flex justify-between gap-2">
                            {/* Server blades representation */}
                            <div className="w-1/3 bg-[#0c1017] border border-slate-800 rounded-lg p-2 flex flex-col gap-1.5 select-none font-mono text-[7px] text-slate-500">
                              <div className="text-cyan-400 font-bold flex items-center gap-1">
                                <Server className="w-2.5 h-2.5 text-cyan-400" /> CLUSTER-A
                              </div>
                              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full w-[85%] bg-cyan-400" />
                              </div>
                              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full w-[40%] bg-cyan-400" />
                              </div>
                              <div className="text-[6px]">VMs: 32 Active</div>
                            </div>

                            {/* Node flow diagram */}
                            <div className="flex-1 bg-[#0c1017] border border-slate-800 rounded-lg p-2.5 select-none relative flex flex-col justify-between">
                              <div className="text-[8px] font-mono font-bold text-slate-300">CLOUD GATEWAY MAP</div>
                              <div className="flex justify-around items-center h-12">
                                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                                <div className="w-8 h-[1px] bg-cyan-500/40 relative">
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
                                </div>
                                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                              </div>
                              <span className="text-[7px] font-mono text-slate-500">SUBNET_PACKETS: OK</span>
                            </div>
                          </div>
                        )}

                        {project.id === "brokerage-app" && (
                          <div className="w-[85%] h-[80%] flex gap-3 select-none">
                            {/* Smartphone mockup */}
                            <div className="w-24 bg-[#0c1017] border-2 border-slate-800 rounded-xl p-1.5 relative flex flex-col gap-1 text-[7px]">
                              {/* Top camera speaker notch */}
                              <div className="w-6 h-1 bg-slate-800 rounded-full mx-auto mb-1" />
                              <div className="text-[#a855f7] font-bold font-mono">NOBIC TECH</div>
                              <div className="p-1 bg-slate-900 rounded font-mono text-[6px]">
                                <div>MSE INDEX BALANCE</div>
                                <div className="text-sky-400 font-bold mt-0.5">+4.25% ↑</div>
                              </div>
                              <div className="flex-1 border-b border-slate-850 relative flex items-end gap-[1px]">
                                <div className="h-1/3 flex-1 bg-purple-500/20" />
                                <div className="h-2/3 flex-1 bg-purple-500/20" />
                                <div className="h-[90%] flex-1 bg-purple-500" />
                              </div>
                            </div>

                            {/* Trading Statistics details */}
                            <div className="flex-1 bg-[#0c1017] border border-slate-800 rounded-lg p-2.5 font-mono text-[8px] flex flex-col justify-between">
                              <div>
                                <span className="text-slate-500">FINTECH METADATA</span>
                                <h4 className="text-white font-bold mt-1">STOCK LEDGER</h4>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between border-b border-slate-800 pb-0.5">
                                  <span>Active Client:</span>
                                  <span className="text-sky-400">1.2M+</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Audit Clear:</span>
                                  <span className="text-purple-400">12 / 12</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {project.id === "multi-agent" && (
                          <div className="w-[85%] h-[80%] bg-[#0c1017] border border-slate-800/80 rounded-lg p-3 font-mono text-[8.5px] text-slate-300 space-y-1 select-none">
                            <div className="text-[#a855f7] font-bold">// AGENT_COLLABORATION_LOGS</div>
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <span className="text-purple-400 font-bold">[15:42:01] agent_lexer:</span> Lexing telemetry code...
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <span className="text-sky-400 font-bold">[15:42:03] rabbitmq_broker:</span> re-routed packet successfully
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content details */}
                      <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-display font-bold text-base text-slate-100 group-hover:text-sky-400 transition-colors">
                              {project.title}
                            </h3>
                            <span className="text-[10px] font-mono text-slate-500">{project.date}</span>
                          </div>

                          <p className="text-xs text-slate-400 font-sans mt-2 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Technical specification tags */}
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {project.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-0.5 bg-slate-800/40 border border-slate-700/50 rounded-md font-mono text-[9px] text-slate-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Expanded section for features & metrics */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden mt-4 pt-4 border-t border-slate-800/60"
                              >
                                <span className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider block mb-2">
                                  // CORE METRICS & MILESTONES
                                </span>
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                  {project.metrics.map((metric, idx) => (
                                    <div key={idx} className="p-2 bg-[#030508]/60 border border-slate-800/80 rounded-lg">
                                      <div className="text-[9px] font-mono text-slate-500 uppercase">{metric.label}</div>
                                      <div className="text-xs font-display font-medium text-slate-200 mt-0.5">{metric.value}</div>
                                    </div>
                                  ))}
                                </div>

                                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-2">
                                  // KEY ARCHITECTURAL FEATURES
                                </span>
                                <ul className="space-y-1.5 text-[11px] font-mono text-slate-400">
                                  {project.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                                      <span className="text-sky-400 shrink-0 select-none">►</span>
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>

                        </div>

                        {/* Interactive trigger link */}
                        <div className="pt-4 border-t border-slate-800/50 flex justify-between items-center">
                          <button
                            onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                            className="text-[10.5px] font-mono text-slate-400 hover:text-sky-400 focus:outline-none transition-colors border-b border-dotted border-slate-600/60 hover:border-sky-400"
                          >
                            {isExpanded 
                              ? (language === "EN" ? "[-] Collapse Details" : "[-] Хураах") 
                              : (language === "EN" ? "[+] Expand Specs & Metrics" : "[+] Дэлгэрэнгүй үзэх")}
                          </button>

                          <a
                            href={project.id === "multi-agent" ? PORTFOLIO_BIO.github : "#"}
                            onClick={(e) => {
                              if (project.id !== "multi-agent") {
                                e.preventDefault();
                                setToastMessage(`Check Site link clicked to open ${project.title}`);
                              }
                            }}
                            className="font-mono text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 group/btn"
                          >
                            <span>{project.id === "multi-agent" ? "Github ↗" : "Check Site ↗"}</span>
                          </a>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Keep it short & simple - bottom resume switch */}
              <div className="bg-[#0c1017]/85 border border-[#1e293b]/70 p-5 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                <p className="text-xs text-slate-400 font-sans">
                  {language === "EN" 
                    ? "Need a comprehensive overview of experience, timeline, and professional bio?"
                    : "Инженерийн дэлгэрэнгүй танилцуулга, ажлын түүх, болон намтар хуудсыг үзэх үү?"}
                </p>
                <button
                  onClick={() => {
                    setActiveTab("professional");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-mono text-white transition-all text-center whitespace-nowrap"
                >
                  {language === "EN" ? "Career Resume Profile" : "Ажлын намтар хуудас"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Standard App Footer */}
      <Footer
        setActiveTab={setActiveTab}
        language={language}
      />

      {/* FLOATING GLASSMORPHISM TAB SELECTOR AT THE BOTTOM CENTER (Mirroring exact video detail) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0c1017]/80 backdrop-blur-md border border-slate-700/60 p-1.5 rounded-full flex gap-1 shadow-2xl" id="floating-tabs-outer">
        <button
          onClick={() => {
            setActiveTab("professional");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`px-5 py-2 rounded-full font-display text-[11px] font-bold tracking-wider transition-all uppercase ${
            activeTab === "professional"
              ? "bg-sky-500 text-black shadow-lg shadow-sky-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {language === "EN" ? "Professional" : "Мэргэжлийн"}
        </button>
        
        <button
          onClick={() => {
            setActiveTab("projects");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`px-5 py-2 rounded-full font-display text-[11px] font-bold tracking-wider transition-all uppercase ${
            activeTab === "projects"
              ? "bg-slate-800 text-white border border-slate-700/60"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {language === "EN" ? "Projects" : "Төслүүд"}
        </button>
      </div>

      {/* CUSTOM FLOATING TOAST NOTIFICATION CORNER */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed top-20 right-6 sm:right-12 z-50 bg-[#0c1017] border border-sky-500/40 p-3.5 rounded-xl shadow-2xl flex items-center gap-2.5 max-w-sm"
            id="toast-notification"
          >
            <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-xs font-mono font-medium text-slate-200">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
