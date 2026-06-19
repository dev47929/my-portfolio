import React from "react";
import { Terminal, Copy, Check } from "lucide-react";
import { BENTO_PROFILE, PORTFOLIO_BIO } from "../../data.js";
import MagicBento from "../ui/MagicBento.jsx";

const portfolioCardData = [
  {
    color: "#120F17",
    title: "Backend Developer",
    description: "Java, Spring Boot & PostgreSQL specialist building production-grade RESTful APIs",
    label: "Role",
  },
  {
    color: "#120F17",
    title: "8.81 CGPA",
    description: "Latest SGPA 9.0 at LNCT Bhopal \u00B7 Computer Science & Engineering",
    label: "Academics",
  },
  {
    color: "#120F17",
    title: "Core Skills",
    description: "Java \u00B7 Spring Boot \u00B7 Spring Security \u00B7 PostgreSQL \u00B7 JWT \u00B7 React.js \u00B7 DSA \u00B7 System Design",
    label: "Stack",
  },
  {
    color: "#120F17",
    title: "Clean Architecture",
    description: "Thoughtful API design and reliable, scalable backend systems",
    label: "Philosophy",
  },
  {
    color: "#120F17",
    title: "Hackathons",
    description: "Top 4 at Tech Sageathon (200+ teams) \u00B7 Top 20 at BGI Hackathon (600+ teams)",
    label: "Achievements",
  },
  {
    color: "#120F17",
    title: PORTFOLIO_BIO.email,
    description: "Open to collaboration \u2014 let\u2019s build something great together",
    label: "Contact",
  },
];

export default function BentoSection({ onCopyEmail, copied }) {
  return (
    <section className="flex flex-col gap-6" id="bento-sec">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
        <Terminal className="w-5 h-5 text-sky-400" />
        <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
          Short Profile
        </h2>
      </div>

      <MagicBento
        cardData={portfolioCardData}
        glowColor="56, 189, 248"
        particleCount={8}
        spotlightRadius={250}
        clickEffect={true}
        enableTilt={true}
        enableMagnetism={true}
      />

      <button
        onClick={onCopyEmail}
        className="w-full max-w-[54rem] mx-auto py-3 px-6 rounded-xl font-mono text-xs font-bold text-white bg-slate-800/50 hover:bg-sky-500/10 border border-slate-700 hover:border-sky-500/40 flex items-center justify-between transition-all active:scale-[0.98]"
      >
        <span className="truncate">{PORTFOLIO_BIO.email}</span>
        {copied
          ? <Check className="w-4 h-4 text-sky-400 shrink-0" />
          : <Copy className="w-4 h-4 text-slate-400 shrink-0" />
        }
      </button>
    </section>
  );
}
