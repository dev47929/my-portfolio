import React from "react";
import { CORE_STATS } from "../../data.js";

/**
 * StatsSection
 * Renders 3 metric cards (CGPA, SGPA, Events) from CORE_STATS.
 * Fully self-contained — no props needed.
 */
export default function StatsSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6" id="stats-sec">
      {CORE_STATS.map((stat, i) => (
        <div
          key={i}
          className="bg-[#0c1017]/80 hover:bg-[#0c1017] border border-[#1e293b]/60 hover:border-sky-500/30 p-6 rounded-2xl flex flex-col justify-center transition-all duration-300 relative overflow-hidden group"
        >
          {/* Top border glow on hover */}
          <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-sky-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-4xl text-white tracking-tight group-hover:text-sky-400 transition-colors">
              {stat.value}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          </div>
          <span className="text-xs font-mono text-slate-400 mt-2 uppercase tracking-wider">
            {stat.label}
          </span>
        </div>
      ))}
    </section>
  );
}
