import React from "react";
import { Github, Instagram, Linkedin, Youtube, Sparkles } from "lucide-react";
import { PORTFOLIO_BIO } from "../../data.js";

/**
 * HeroSection
 * The top brand hero: greeting, name, subtitle, CTA, socials, and orbital avatar.
 * @param {Function} onScrollToContact - Scrolls to the contact section.
 */
export default function HeroSection({ onScrollToContact }) {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-2 md:pt-6"
      id="hero-sec"
    >
      {/* ── Left column ── */}
      <div className="lg:col-span-7 flex flex-col gap-5">
        {/* Role badge */}
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-widest bg-sky-500/5 border border-sky-500/15 px-3 py-1.5 rounded-full w-fit">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-sky-400" />
          <span>{PORTFOLIO_BIO.title}</span>
        </div>

        {/* Name headline */}
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05] tracking-tight">
          Hello I'm{" "}
          <span className="block mt-1 font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-200">
            Dev
          </span>
          <span className="block mt-1 text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.25)]">
            Sharma
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-slate-400 font-sans leading-relaxed max-w-xl">
          {PORTFOLIO_BIO.subTitle}
        </p>

        {/* CTA + Socials */}
        <div className="flex flex-wrap items-center gap-4 mt-2" id="hero-actions">
          <button
            onClick={onScrollToContact}
            className="px-6 py-3 bg-sky-500 hover:bg-sky-600 rounded-full text-xs font-mono font-bold text-black flex items-center gap-1.5 shadow-lg shadow-sky-500/15 transition-transform hover:scale-[1.02] active:scale-95"
          >
            <span>VIEW CV &gt;</span>
          </button>

          <div className="flex items-center gap-2">
            <a href="https://www.instagram.com/devsharma/" target="_blank" rel="noreferrer" title="Instagram profile Link"
              className="p-2.5 bg-[#0c1017] border border-[#1e293b] hover:border-sky-500 hover:text-sky-400 rounded-full text-slate-400 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noreferrer" title="Youtube channel Link"
              className="p-2.5 bg-[#0c1017] border border-[#1e293b] hover:border-sky-500 hover:text-sky-400 rounded-full text-slate-400 transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
            <a href={PORTFOLIO_BIO.github} target="_blank" rel="noreferrer" title="GitHub Profile Link"
              className="p-2.5 bg-[#0c1017] border border-[#1e293b] hover:border-sky-500 hover:text-sky-400 rounded-full text-slate-400 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href={PORTFOLIO_BIO.linkedin} target="_blank" rel="noreferrer" title="LinkedIn Profile Link"
              className="p-2.5 bg-[#0c1017] border border-[#1e293b] hover:border-sky-500 hover:text-sky-400 rounded-full text-slate-400 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Right column: orbital avatar ── */}
      <div className="lg:col-span-5 flex justify-center items-center py-6 relative" id="hero-right-celestial">
        {/* Glowing aura */}
        <div className="absolute w-80 h-80 rounded-full bg-sky-500/10 blur-3xl" />

        {/* Concentric orbits */}
        <div className="relative w-80 h-80 flex items-center justify-center">
          {/* Orbit 1 — outermost, slow */}
          <div className="absolute w-full h-full border border-dashed border-[#1e293b] rounded-full animate-spin" style={{ animationDuration: "60s" }}>
            <div className="absolute top-1/4 right-[2%] w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]" />
          </div>

          {/* Orbit 2 — middle */}
          <div className="absolute w-[82%] h-[82%] border border-dashed border-[#1e293b]/70 rounded-full animate-spin" style={{ animationDuration: "40s" }}>
            <div className="absolute bottom-[10%] left-[10%] w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
          </div>

          {/* Orbit 3 — innermost, fast */}
          <div className="absolute w-[64%] h-[64%] border border-dashed border-[#1e293b]/50 rounded-full animate-spin" style={{ animationDuration: "25s" }}>
            <div className="absolute top-[8%] left-1/2 w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_8px_#f43f5e]" />
          </div>

          {/* Center avatar */}
          <div
            className="absolute w-[48%] h-[48%] rounded-full p-[3px] bg-gradient-to-tr from-sky-500 via-[#1e293b] to-purple-500 shadow-[0_0_40px_rgba(56,189,248,0.3)] animate-pulse"
            style={{ animationDuration: "4s" }}
          >
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
  );
}
