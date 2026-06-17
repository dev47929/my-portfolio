import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, CheckCircle } from "lucide-react";
import { TIMELINE_JOURNEY } from "../../data.js";

/**
 * JourneySection
 * Interactive timeline: click a year on the left to reveal the milestone card on the right.
 * Owns its own activeTimelineYear state — no props needed.
 */
export default function JourneySection() {
  const [activeYear, setActiveYear] = useState("2025");

  const activeMilestone = TIMELINE_JOURNEY.find((m) => m.year === activeYear);

  return (
    <section className="flex flex-col gap-6" id="journey-sec">
      {/* Section header */}
      <div className="flex flex-col gap-2 pb-2 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-sky-400" />
          <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
            My journey report
          </h2>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-3xl mt-1">
          I've had the opportunity to develop software across a variety of settings — from small
          side-jobs to large corporations, mostly building backend systems. Here's my timeline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-2">

        {/* Left: year selector */}
        <div className="md:col-span-4 flex flex-col gap-2.5" id="timeline-years">
          {TIMELINE_JOURNEY.map((item) => {
            const isActive = activeYear === item.year;
            return (
              <button
                key={item.year}
                onClick={() => setActiveYear(item.year)}
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

        {/* Right: milestone detail card */}
        <div className="md:col-span-8 min-h-[200px]" id="timeline-detail-viewport">
          <AnimatePresence mode="wait">
            {activeMilestone && (
              <motion.div
                key={activeMilestone.year}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-[#0c1017]/95 border border-[#1e293b]/70 rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col gap-4"
              >
                {/* Left accent bar */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500" />

                <div>
                  <span className="font-mono text-xs font-bold text-sky-400 block mb-1">
                    YEAR {activeMilestone.year} ARCHIVE
                  </span>
                  <h3 className="font-display font-bold text-xl text-white">
                    {activeMilestone.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {activeMilestone.desc}
                </p>

                {/* Extra badge for 2025 milestones */}
                {activeMilestone.year === "2025" && (
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
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
