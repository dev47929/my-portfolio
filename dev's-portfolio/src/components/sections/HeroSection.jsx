import React from "react";
import { Github, Linkedin, Mail, Code2, Sparkles } from "lucide-react";
import { PORTFOLIO_BIO } from "../../data.js";
import HeroVisual from "../HeroVisual.jsx";

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

        {/* CTA */}
        <div className="flex flex-wrap items-center gap-4 mt-2" id="hero-actions">
          <a
            href="https://drive.google.com/file/d/1VRMfiQeXxCh71OLh7f7XgqsM8uaJz_v5/view"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-sky-500 hover:bg-sky-600 rounded-full text-xs font-mono font-bold text-black flex items-center gap-1.5 shadow-lg shadow-sky-500/15 transition-transform hover:scale-[1.02] active:scale-95"
          >
            <span>VIEW CV &gt;</span>
          </a>
        </div>

        {/* ── Social banner ── */}
        <div className="bg-sky-500/5 border border-sky-500/15 rounded-xl p-3 sm:p-4 w-full max-w-lg">
          <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400/70 uppercase block mb-2.5">
            // Find Me Online
          </span>
          <div className="flex flex-wrap gap-2">

            <a href={PORTFOLIO_BIO.github} target="_blank" rel="noreferrer" title="GitHub Profile"
              className="flex items-center gap-2 px-3 py-2 bg-[#0c1017] border border-[#1e293b] hover:border-sky-500 hover:text-sky-400 rounded-lg text-slate-400 transition-all hover:shadow-[0_0_12px_rgba(56,189,248,0.15)]">
              <Github className="w-5 h-5" />
              <span className="text-xs font-mono font-medium">GitHub</span>
            </a>
            <a href={PORTFOLIO_BIO.linkedin} target="_blank" rel="noreferrer" title="LinkedIn Profile"
              className="flex items-center gap-2 px-3 py-2 bg-[#0c1017] border border-[#1e293b] hover:border-sky-500 hover:text-sky-400 rounded-lg text-slate-400 transition-all hover:shadow-[0_0_12px_rgba(56,189,248,0.15)]">
              <Linkedin className="w-5 h-5" />
              <span className="text-xs font-mono font-medium">LinkedIn</span>
            </a>
            <a href={PORTFOLIO_BIO.leetcode} target="_blank" rel="noreferrer" title="LeetCode Profile"
              className="flex items-center gap-2 px-3 py-2 bg-[#0c1017] border border-[#1e293b] hover:border-sky-500 hover:text-sky-400 rounded-lg text-slate-400 transition-all hover:shadow-[0_0_12px_rgba(56,189,248,0.15)]">
              <Code2 className="w-5 h-5" />
              <span className="text-xs font-mono font-medium">LeetCode</span>
            </a>
            <a href={`mailto:${PORTFOLIO_BIO.email}`} title="Send Email"
              className="flex items-center gap-2 px-3 py-2 bg-[#0c1017] border border-[#1e293b] hover:border-sky-500 hover:text-sky-400 rounded-lg text-slate-400 transition-all hover:shadow-[0_0_12px_rgba(56,189,248,0.15)]">
              <Mail className="w-5 h-5" />
              <span className="text-xs font-mono font-medium">Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Right column: Hero Visual ── */}
      <div className="lg:col-span-5 flex justify-center items-center py-6 relative" id="hero-right-celestial">
        <HeroVisual />
      </div>
    </section>
  );
}
