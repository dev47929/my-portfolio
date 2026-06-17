import React from "react";
import { Terminal, Server, Cpu, Copy, Check } from "lucide-react";
import { BENTO_PROFILE, PORTFOLIO_BIO } from "../../data.js";

/**
 * BentoSection
 * 4-card short-profile bento grid displaying profile highlights,
 * tech stack, and an email copy shortcut.
 * @param {Function} onCopyEmail - Copies the email to clipboard and shows a toast.
 * @param {boolean} copied - Whether the email was just copied (shows check icon).
 */
export default function BentoSection({ onCopyEmail, copied }) {
  const barValues = [30, 45, 25, 60, 50, 85, 40, 70, 95, 65, 80, 55, 90, 75, 45];

  return (
    <section className="flex flex-col gap-6" id="bento-sec">
      {/* Section header */}
      <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
        <Terminal className="w-5 h-5 text-sky-400" />
        <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
          Short Profile
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Card 1 (col-span-6): Profile summary + live bar chart */}
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
              {BENTO_PROFILE.column1}
            </h3>
          </div>

          {/* Animated bar chart */}
          <div className="h-20 w-full mt-4 flex items-end gap-[3px] border-b border-slate-800/60 pb-1 px-1 relative">
            {barValues.map((val, idx) => (
              <div
                key={idx}
                className="flex-1 bg-sky-500/40 rounded-t-sm group-hover:bg-sky-400/80 transition-all duration-300 relative"
                style={{ height: `${val}%` }}
              >
                {idx === 12 && (
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Card 2 (col-span-6): Academics + tech stack pills */}
        <div className="md:col-span-6 bg-[#0c1017]/85 border border-[#1e293b]/75 hover:border-sky-500/30 p-6 rounded-2xl flex flex-col justify-between min-h-[220px] transition-colors group relative overflow-hidden">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
              // COMM_SKILLSET_B
            </span>
            <h3 className="font-display font-bold text-base text-slate-100">
              {BENTO_PROFILE.column2}
            </h3>
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              My primary tech stack:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <div className="px-4 py-2 bg-sky-500/10 border border-sky-500/40 rounded-full font-mono text-xs font-bold text-sky-400 flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
                <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
                <span>React, Node.js</span>
              </div>
              {["Express", "SQL", "JavaScript (.jsx)", "Data Structures"].map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-slate-800/40 border border-slate-700/50 rounded-full font-mono text-[10px] text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3 (col-span-5): Design principles + email copy */}
        <div className="md:col-span-5 bg-[#0c1017]/85 border border-[#1e293b]/75 hover:border-sky-500/30 p-6 rounded-2xl flex flex-col justify-between min-h-[190px] transition-colors group relative overflow-hidden">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
              // DESIGN_PRINCIPLES
            </span>
            <h3 className="font-display font-bold text-base text-slate-100">
              {BENTO_PROFILE.column3}
            </h3>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <span className="text-[10px] font-mono text-slate-400">
              Do you want to ask a question?
            </span>
            <button
              onClick={onCopyEmail}
              className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold text-white bg-slate-800/50 hover:bg-sky-500/10 border border-slate-700 hover:border-sky-500/40 flex items-center justify-between transition-all active:scale-[0.98]"
            >
              <span className="truncate">{PORTFOLIO_BIO.email}</span>
              {copied
                ? <Check className="w-4 h-4 text-sky-400 shrink-0" />
                : <Copy className="w-4 h-4 text-slate-400 shrink-0 hover:text-white" />
              }
            </button>
          </div>
        </div>

        {/* Card 4 (col-span-7): Core skills + mini IDE snippet */}
        <div className="md:col-span-7 bg-[#0c1017]/85 border border-[#1e293b]/75 hover:border-sky-500/30 p-6 rounded-2xl flex flex-col justify-between min-h-[190px] transition-colors group relative overflow-hidden">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
              // GENERAL_TRAJECTORY
            </span>
            <h3 className="font-display font-bold text-base text-slate-100">
              {BENTO_PROFILE.column4.title}
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-1">
              {BENTO_PROFILE.column4.text}
            </p>
          </div>

          {/* Mini IDE import block */}
          <div className="mt-4 p-3 bg-[#030508] border border-[#1e293b]/70 rounded-xl font-mono text-[9px] sm:text-[10px] text-slate-400 leading-relaxed select-none">
            <div className="text-slate-500">// Importing a single module</div>
            <div>
              <span className="text-yellow-500">import</span> moduleName{" "}
              <span className="text-yellow-500">from</span>{" "}
              <span className="text-sky-400">'modulePath'</span>
            </div>
            <div className="text-slate-500 mt-2">// Importing multiple modules</div>
            <div>
              <span className="text-yellow-500">import</span> &#123; module1, module2 &#125;{" "}
              <span className="text-yellow-500">from</span>{" "}
              <span className="text-sky-400">'modulePath'</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
