import React from "react";
import { Github, Linkedin, Mail, Code2, Sparkles, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_BIO } from "../../data.js";
import TerminalAvatar from "../TerminalAvatar.jsx";
import HighlightText from "../ui/HighlightText.jsx";

export default function HeroSection({ onScrollToContact }) {
  return (
    <>
      {/* ── Custom Animations & Styles ── */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(56, 189, 248, 0.1); }
          50% { box-shadow: 0 0 40px rgba(56, 189, 248, 0.3); }
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }

        .anim-fade-up { 
          opacity: 0; 
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
        .anim-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Shine effect for CV Button */
        .shine-btn { position: relative; overflow: hidden; }
        .shine-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.6s ease-in-out;
        }
        .shine-btn:hover::before { left: 100%; }

        /* Animated background grid */
        .bg-grid {
          background-image: 
            linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridMove 8s linear infinite;
        }
      `}</style>

      <section
        className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-0 md:pt-0 min-h-[85vh] overflow-hidden"
        id="hero-sec"
      >
        {/* ── Ambient Background Effects ── */}
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] pointer-events-none z-0" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

        {/* ── Left column ── */}
        <div className="lg:col-span-7 flex flex-col gap-6 relative z-10">
          
          {/* Role badge */}
          <div 
            className="anim-fade-up flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-widest bg-sky-500/10 border border-sky-500/30 px-4 py-2 rounded-full w-fit backdrop-blur-sm"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span>{PORTFOLIO_BIO.title}</span>
          </div>

          {/* Name headline */}
          <h1 
            className="anim-fade-up font-display font-extrabold text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05] tracking-tight"
            style={{ animationDelay: '0.3s' }}
          >
            <span className="block text-slate-300/80">Hello I'm</span>
            <HighlightText
              className="inline font-black text-5xl sm:text-7xl md:text-8xl drop-shadow-[0_0_25px_rgba(56,189,248,0.3)]"
              highlightColor="#38bdf8"
              direction="right"
              duration={0.6}
              textColor="#e2e8f0"
              activeTextColor="#0a0a0a"
              padding="0.05em 0.15em"
            >
              Dev Sharma
            </HighlightText>
          </h1>

          {/* Subtitle */}
          <p 
            className="anim-fade-up text-base md:text-lg text-slate-400 font-sans leading-relaxed max-w-xl border-l-2 border-sky-500/40 pl-4"
            style={{ animationDelay: '0.5s' }}
          >
            {PORTFOLIO_BIO.subTitle}
          </p>

          {/* CTA */}
          <div 
            className="anim-fade-up flex flex-wrap items-center gap-4 mt-2" 
            id="hero-actions"
            style={{ animationDelay: '0.7s' }}
          >
            <a
              href="https://drive.google.com/file/d/1VRMfiQeXxCh71OLh7f7XgqsM8uaJz_v5/view"
              target="_blank"
              rel="noreferrer"
              className="shine-btn group px-7 py-3.5 bg-sky-500 hover:bg-sky-400 rounded-full text-xs font-mono font-bold text-black flex items-center gap-2 shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              <span>VIEW CV</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {onScrollToContact && (
              <button 
                onClick={onScrollToContact}
                className="px-7 py-3.5 bg-transparent border border-slate-700 hover:border-sky-500/50 rounded-full text-xs font-mono font-bold text-slate-300 hover:text-sky-400 transition-all hover:scale-105 active:scale-95"
              >
                GET IN TOUCH
              </button>
            )}
          </div>

          {/* ── Social banner ── */}
          <div 
            className="anim-fade-up mt-6 backdrop-blur-md bg-slate-900/40 border border-slate-800 rounded-2xl p-5 w-full max-w-xl shadow-2xl"
            style={{ animationDelay: '0.9s' }}
          >
            <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400/70 uppercase block mb-3 flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Find Me Online
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { Icon: Github, label: "GitHub", href: PORTFOLIO_BIO.github },
                { Icon: Linkedin, label: "LinkedIn", href: PORTFOLIO_BIO.linkedin },
                { Icon: Code2, label: "LeetCode", href: PORTFOLIO_BIO.leetcode },
                { Icon: Mail, label: "Email", href: `mailto:${PORTFOLIO_BIO.email}` }
              ].map(({ Icon, label, href }, i) => (
                <a 
                  key={label} 
                  href={href} 
                  target="_blank" 
                  rel="noreferrer" 
                  title={label}
                  className="group relative flex flex-col items-center justify-center gap-2 px-3 py-4 bg-[#0c1017] border border-[#1e293b] rounded-xl text-slate-400 transition-all duration-300 hover:border-sky-500/50 hover:-translate-y-1 hover:text-sky-400 overflow-hidden"
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/5 transition-colors duration-300"></div>
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 z-10" />
                  <span className="text-[10px] font-mono font-medium z-10">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right column: Terminal Avatar ── */}
        <div 
          className="anim-fade-up lg:col-span-5 relative z-10 flex justify-center lg:justify-end"
          id="hero-right-terminal"
          style={{ animationDelay: '0.6s' }}
        >
          {/* Glow effect behind terminal */}
          <div className="absolute inset-0 bg-sky-500/10 blur-[80px] rounded-full anim-float" style={{ animationDelay: '0s' }}></div>
          
          <div className="anim-float relative w-full max-w-md" style={{ animationDelay: '0s' }}>
            <TerminalAvatar />
          </div>
        </div>
      </section>
    </>
  );
}