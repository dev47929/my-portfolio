import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Server } from "lucide-react";
import { PORTFOLIO_BIO } from "../../data.js";

// ─── Preview mockups (one per project id) ───────────────────────────────────

function AiJobTrackerPreview() {
  return (
    <div className="w-[85%] h-[80%] bg-[#0c1017] border border-slate-800/80 rounded-lg p-2.5 font-mono text-[8px] text-slate-400 space-y-1.5 select-none relative">
      <div className="flex justify-between pb-1 border-b border-slate-800 text-sky-400 font-bold">
        <span>AI JOB TRACKER</span>
        <span className="animate-pulse">● ACTIVE</span>
      </div>
      <div className="flex justify-between items-center bg-[#172554]/10 p-1 rounded">
        <span className="text-blue-400">Resume Match: Groq LLM</span>
        <span className="text-green-400 font-bold">87% Match</span>
      </div>
      <div className="flex justify-between items-center bg-[#070a0f] p-1 rounded">
        <span>Bulk Import: Complete</span>
        <span>42 Jobs</span>
      </div>
      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-400 font-bold">
        JWT + BCrypt
      </div>
    </div>
  );
}

function FeatureFlagPreview() {
  return (
    <div className="w-[85%] h-[80%] flex justify-between gap-2">
      <div className="w-1/3 bg-[#0c1017] border border-slate-800 rounded-lg p-2 flex flex-col gap-1.5 select-none font-mono text-[7px] text-slate-500">
        <div className="text-cyan-400 font-bold flex items-center gap-1">
          <Server className="w-2.5 h-2.5 text-cyan-400" /> FLAGS
        </div>
        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full w-[85%] bg-cyan-400" />
        </div>
        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full w-[40%] bg-cyan-400" />
        </div>
        <div className="text-[6px]">Envs: dev/staging/prod</div>
      </div>
      <div className="flex-1 bg-[#0c1017] border border-slate-800 rounded-lg p-2.5 select-none relative flex flex-col justify-between">
        <div className="text-[8px] font-mono font-bold text-slate-300">FLAG EVALUATION ENGINE</div>
        <div className="flex justify-around items-center h-12">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          <div className="w-8 h-[1px] bg-cyan-500/40 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
        </div>
        <span className="text-[7px] font-mono text-slate-500">ROLLOUT: % HASH OK</span>
      </div>
    </div>
  );
}

function InterviewCirclePreview() {
  return (
    <div className="w-[85%] h-[80%] bg-[#0c1017] border border-slate-800/80 rounded-lg p-3 font-mono text-[8.5px] text-slate-300 space-y-1 select-none">
      <div className="text-[#a855f7] font-bold">// INTERVIEW_CIRCLE_LOGS</div>
      <div className="flex items-center gap-1.5 text-slate-400">
        <span className="text-purple-400 font-bold">[15:42:01] monaco_editor:</span> Code session started...
      </div>
      <div className="flex items-center gap-1.5 text-slate-400">
        <span className="text-sky-400 font-bold">[15:42:03] speech_engine:</span> Mock interview running
      </div>
      <div className="flex items-center gap-1.5 text-slate-400">
        <span className="text-green-400 font-bold">[15:42:05] ats_analyzer:</span> Resume scored 92/100
      </div>
    </div>
  );
}

const PREVIEW_MAP = {
  "ai-job-tracker": <AiJobTrackerPreview />,
  "feature-flag-service": <FeatureFlagPreview />,
  "interview-circle": <InterviewCirclePreview />,
};

// ─── ProjectCard ─────────────────────────────────────────────────────────────

/**
 * ProjectCard
 * A single project card: CSS preview mockup, title, tags, expand/collapse details.
 * @param {Object} project - Project data object from PROJECTS_DATA.
 * @param {boolean} isExpanded - Whether the details panel is open.
 * @param {Function} onToggleExpand - Toggles expand state.
 * @param {Function} onToast - Shows a toast message.
 */
export default function ProjectCard({ project, isExpanded, onToggleExpand, onToast }) {
  const handleLinkClick = (e) => {
    e.preventDefault();
    onToast(`Check Site link clicked to open ${project.title}`);
  };

  return (
    <div className="bg-[#0c1017]/90 border border-[#1e293b]/70 hover:border-sky-500/40 rounded-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 group">

      {/* ── Preview mockup area ── */}
      <div className="h-44 w-full bg-[#040608] border-b border-[#1e293b]/70 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        {PREVIEW_MAP[project.id] ?? null}
      </div>

      {/* ── Content ── */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Title + date */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display font-bold text-base text-slate-100 group-hover:text-sky-400 transition-colors">
              {project.title}
            </h3>
            <span className="text-[10px] font-mono text-slate-500">{project.date}</span>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-400 font-sans mt-2 leading-relaxed">
            {project.description}
          </p>

          {/* Tech tags */}
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

          {/* Expanded details */}
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
                  // CORE METRICS &amp; MILESTONES
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

        {/* ── Footer row ── */}
        <div className="pt-4 border-t border-slate-800/50 flex justify-between items-center">
          <button
            onClick={onToggleExpand}
            className="text-[10.5px] font-mono text-slate-400 hover:text-sky-400 focus:outline-none transition-colors border-b border-dotted border-slate-600/60 hover:border-sky-400"
          >
            {isExpanded ? "[-] Collapse Details" : "[+] Expand Specs & Metrics"}
          </button>

          <a
            href={PORTFOLIO_BIO.github}
            onClick={handleLinkClick}
            className="font-mono text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
          >
            <span>Check Site ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
