import React from "react";
import { GraduationCap, Star, Calendar, BookOpen, Award } from "lucide-react";
import { EDUCATION_DATA } from "../../data.js";

/**
 * EducationSection
 * Displays the single education credential card from EDUCATION_DATA.
 * Fully self-contained — no props needed.
 */
export default function EducationSection() {
  return (
    <section className="flex flex-col gap-6" id="edu-sec">
      {/* Section header */}
      <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
        <GraduationCap className="w-5 h-5 text-sky-400" />
        <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
          Education Credentials
        </h2>
      </div>

      {/* Credential card */}
      <div className="bg-[#0c1017]/90 border border-[#1e293b]/70 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-sky-500/40 transition-colors group">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="p-3 bg-sky-500/5 border border-sky-500/20 rounded-xl text-sky-400 group-hover:bg-sky-500/10 group-hover:text-sky-300 transition-all">
            <Award className="w-6 h-6 animate-pulse" />
          </div>

          {/* Details */}
          <div>
            <h3 className="font-display font-bold text-base text-slate-100">
              {EDUCATION_DATA.title}
            </h3>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {EDUCATION_DATA.period}
              </span>
              <span>|</span>
              <span className="flex items-center gap-1 text-slate-300">
                <BookOpen className="w-3.5 h-3.5" />
                Rajiv Gandhi Proudyogiki Vishwavidyalaya
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-sans italic">
              {EDUCATION_DATA.institution}
            </p>
          </div>
        </div>

        {/* GPA badge */}
        <div className="bg-sky-500/10 border border-sky-500/30 px-3.5 py-2 rounded-xl flex items-center gap-1.5 self-end md:self-auto">
          <Star className="w-4 h-4 fill-sky-400 text-sky-400" />
          <span className="font-mono text-sm font-bold text-white">GPA {EDUCATION_DATA.gpa}</span>
        </div>
      </div>
    </section>
  );
}
