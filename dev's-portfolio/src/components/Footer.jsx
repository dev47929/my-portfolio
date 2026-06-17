import React from "react";
import { Mail, Github, Linkedin, Globe, Code2 } from "lucide-react";
import { PORTFOLIO_BIO } from "../data.js";

export default function Footer({ setActiveTab }) {
  const year = new Date().getFullYear();

  const handleLinkClick = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#040608] border-t border-[#1e293b]/55 px-6 sm:px-12 py-10 mt-16 z-20 relative" id="app-footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
        
        {/* Profile summary */}
        <div>
          <span className="font-display font-bold text-xs tracking-widest text-[#f8fafc] block mb-2 uppercase">
            DEV SHARMA
          </span>
          <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-sm">
            CS student at LNCT Bhopal who actually enjoys building stuff — Java, Spring Boot, and backend APIs. I do hackathons, write cleanish code, and somehow keep a decent CGPA.
          </p>
        </div>

        {/* Navigation triggers */}
        <div>
          <span className="font-display font-medium text-xs tracking-widest text-sky-400 block mb-3 uppercase">
            SITE SECTIONS
          </span>
          <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
            <button onClick={() => handleLinkClick("professional")} className="text-left text-slate-400 hover:text-sky-400 transition-colors">
              // 01_PROFESSIONAL
            </button>
            <button onClick={() => handleLinkClick("projects")} className="text-left text-slate-400 hover:text-sky-400 transition-colors">
              // 02_PROJECTS
            </button>
            <button 
              onClick={() => {
                document.getElementById("let-talk-section")?.scrollIntoView({ behavior: "smooth" });
              }} 
              className="text-left text-slate-400 hover:text-sky-400 transition-colors"
            >
              // 03_CONTACT_ME
            </button>
          </div>
        </div>

        {/* Quick connect details */}
        <div>
          <span className="font-display font-medium text-xs tracking-widest text-sky-400 block mb-3 uppercase">
            SOCIAL CONNECTOR
          </span>
          <div className="flex flex-wrap gap-2">
            <a 
              href={`mailto:${PORTFOLIO_BIO.email}`} 
              title="Send mail to Dev Sharma"
              className="flex items-center gap-2 px-3 py-2 bg-[#0c1017] border border-[#1e293b] rounded-lg text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-all hover:shadow-[0_0_10px_rgba(56,189,248,0.12)]"
            >
              <Mail className="w-4 h-4" />
              <span className="text-[11px] font-mono">Email</span>
            </a>
            <a 
              href={PORTFOLIO_BIO.github} 
              target="_blank" 
              rel="noreferrer" 
              title="Github repository external link"
              className="flex items-center gap-2 px-3 py-2 bg-[#0c1017] border border-[#1e293b] rounded-lg text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-all hover:shadow-[0_0_10px_rgba(56,189,248,0.12)]"
            >
              <Github className="w-4 h-4" />
              <span className="text-[11px] font-mono">GitHub</span>
            </a>
            <a 
              href={PORTFOLIO_BIO.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              title="Linkedin external link"
              className="flex items-center gap-2 px-3 py-2 bg-[#0c1017] border border-[#1e293b] rounded-lg text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-all hover:shadow-[0_0_10px_rgba(56,189,248,0.12)]"
            >
              <Linkedin className="w-4 h-4" />
              <span className="text-[11px] font-mono">LinkedIn</span>
            </a>
            <a 
              href={PORTFOLIO_BIO.leetcode} 
              target="_blank" 
              rel="noreferrer" 
              title="Leetcode external link"
              className="flex items-center gap-2 px-3 py-2 bg-[#0c1017] border border-[#1e293b] rounded-lg text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-all hover:shadow-[0_0_10px_rgba(56,189,248,0.12)]"
            >
              <Code2 className="w-4 h-4" />
              <span className="text-[11px] font-mono">LeetCode</span>
            </a>
          </div>
          <span className="text-[10px] font-mono text-slate-500 block mt-4">
            {PORTFOLIO_BIO.location}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[#1e293b]/55 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div>
          © {year} DEV SHARMA // PORTFOLIO BUILT IN RESPONSIVE JAVASCRIPT & JSX
        </div>
        <div className="flex items-center gap-1.5 bg-[#0c1017] border border-[#1e293b] px-3 py-1 rounded">
          <Globe className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: "10s" }} />
          <span>PRESET: EN_GLOBAL_MODE_ON</span>
        </div>
      </div>
    </footer>
  );
}
