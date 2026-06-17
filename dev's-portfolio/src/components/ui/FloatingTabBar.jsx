import React from "react";

/**
 * FloatingTabBar
 * Fixed bottom-center pill navigation between Professional and Projects tabs.
 * @param {string} activeTab - The currently active tab id.
 * @param {Function} setActiveTab - Setter to switch active tab.
 */
export default function FloatingTabBar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "professional", label: "Professional" },
    { id: "projects", label: "Projects" },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0c1017]/80 backdrop-blur-md border border-slate-700/60 p-1.5 rounded-full flex gap-1 shadow-2xl"
      id="floating-tabs-outer"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`px-5 py-2 rounded-full font-display text-[11px] font-bold tracking-wider transition-all uppercase ${
            activeTab === tab.id
              ? tab.id === "professional"
                ? "bg-sky-500 text-black shadow-lg shadow-sky-500/20"
                : "bg-slate-800 text-white border border-slate-700/60"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
