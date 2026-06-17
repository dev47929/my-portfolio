import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { PROJECTS_DATA } from "../../data.js";

const FILTERS = [
  { id: "all",         label: "ALL SYSTEMS"    },
  { id: "engineering", label: "FINTECH & SYSTEM" },
  { id: "visual",      label: "CLOUD & DEVOPS"  },
  { id: "interactive", label: "AI & MULTI-AGENT" },
];

/**
 * ProjectsPage
 * Full projects tab: filter pills, project grid, and bottom resume switch.
 * Owns its own filter + expanded state.
 * @param {Function} setActiveTab - Switches to the Professional tab.
 * @param {Function} setToastMessage - Shows a floating toast notification.
 */
export default function ProjectsPage({ setActiveTab, setToastMessage }) {
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const handleFilterChange = (id) => {
    setFilter(id);
    setExpandedId(null); // collapse any open card on filter switch
  };

  const visibleProjects = PROJECTS_DATA.filter(
    (p) => filter === "all" || p.type === filter
  );

  return (
    <div className="flex flex-col gap-8">

      {/* ── Page header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#1e293b]/70 pb-6 mb-2">
        <div>
          <span className="font-mono text-xs text-sky-400 uppercase tracking-widest block mb-1">
            // SELECTED_DEVELOPMENT_COMPENDIUM
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Selected Work
          </h2>
        </div>
        <p className="max-w-md text-xs text-slate-400 font-sans leading-relaxed">
          A curated showcase of backend systems, AI-powered tools, and hackathon-winning products.
        </p>
      </div>

      {/* ── Filter pills ── */}
      <div className="flex flex-wrap gap-2" id="project-filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => handleFilterChange(f.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium font-display tracking-wide border transition-all ${
              filter === f.id
                ? "bg-slate-800 border-sky-500 text-sky-400"
                : "bg-transparent border-[#1e293b]/65 hover:bg-[#0c1017]/70 text-slate-400 hover:text-slate-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Project grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isExpanded={expandedId === project.id}
            onToggleExpand={() => setExpandedId(expandedId === project.id ? null : project.id)}
            onToast={setToastMessage}
          />
        ))}
      </div>

      {/* ── Bottom resume switch ── */}
      <div className="bg-[#0c1017]/85 border border-[#1e293b]/70 p-5 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
        <p className="text-xs text-slate-400 font-sans">
          Need a comprehensive overview of experience, timeline, and professional bio?
        </p>
        <button
          onClick={() => {
            setActiveTab("professional");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-mono text-white transition-all text-center whitespace-nowrap"
        >
          Career Resume Profile
        </button>
      </div>
    </div>
  );
}
