import React from "react";
import { Briefcase } from "lucide-react";
import { EXPERIENCE_CARDS } from "../../data.js";

// Accent config maps accent name → gradient + shadow + symbol
const ACCENT_STYLES = {
  gold:   { classes: "bg-gradient-to-tr from-amber-400 to-yellow-600 shadow-[0_0_15px_#f59e0b] text-black", symbol: "Θ" },
  purple: { classes: "bg-gradient-to-tr from-purple-500 to-pink-500 shadow-[0_0_15px_#a855f7] text-white",  symbol: "Φ" },
  cyan:   { classes: "bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-[0_0_15px_#22d3ee] text-black",   symbol: "Ω" },
  rose:   { classes: "bg-gradient-to-tr from-rose-500 to-red-700 shadow-[0_0_15px_#f43f5e] text-white",    symbol: "Δ" },
};

/**
 * ExperienceSection
 * Renders a 2-column grid of experience role cards from EXPERIENCE_CARDS.
 * Fully self-contained — no props needed.
 */
export default function ExperienceSection() {
  return (
    <section className="flex flex-col gap-6" id="xp-sec">
      {/* Section header */}
      <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
        <Briefcase className="w-5 h-5 text-sky-400" />
        <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
          My Experience
        </h2>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EXPERIENCE_CARDS.map((xp, index) => {
          const accent = ACCENT_STYLES[xp.accent] ?? ACCENT_STYLES.gold;
          return (
            <div
              key={index}
              className="bg-[#0c1017]/85 border border-[#1e293b]/70 hover:border-sky-500/30 rounded-2xl p-6 transition-all duration-300 flex items-start gap-4 hover:-translate-y-1 relative overflow-hidden group"
            >
              {/* Accent orb */}
              <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-display animate-pulse ${accent.classes}`}>
                {accent.symbol}
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-slate-100 group-hover:text-sky-400 transition-colors">
                  {xp.role}
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-2 leading-relaxed">
                  {xp.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
