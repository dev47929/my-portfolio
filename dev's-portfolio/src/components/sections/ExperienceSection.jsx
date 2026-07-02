import React, { useEffect, useRef, useState } from "react";
import { GraduationCap } from "lucide-react";
import { EDUCATION_CARDS } from "../../data.js";

// Accent config maps accent name → gradient + shadow + symbol
const ACCENT_STYLES = {
  gold:   { classes: "bg-gradient-to-tr from-amber-400 to-yellow-600 shadow-[0_0_20px_#f59e0b] text-black", bar: "from-amber-400 to-yellow-600", symbol: "Σ" },
  purple: { classes: "bg-gradient-to-tr from-purple-500 to-pink-500 shadow-[0_0_20px_#a855f7] text-white",  bar: "from-purple-500 to-pink-500", symbol: "Ψ" },
  cyan:   { classes: "bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-[0_0_20px_#22d3ee] text-black",   bar: "from-cyan-400 to-blue-600", symbol: "Ω" },
  rose:   { classes: "bg-gradient-to-tr from-rose-500 to-red-700 shadow-[0_0_20px_#f43f5e] text-white",    bar: "from-rose-500 to-red-700", symbol: "Δ" },
};

/**
 * EducationSection
 * Renders a 2-column grid of education cards (10th, 12th, CGPA, SGPA).
 * Includes smooth scroll-reveal animations and interactive progress bars.
 */
export default function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Animate only once
        }
      },
      { threshold: 0.15 } // Trigger when 15% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="flex flex-col gap-6" id="edu-sec" ref={sectionRef}>
      {/* Section header */}
      <div 
        className={`flex items-center gap-2 pb-2 border-b border-slate-800/60 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <GraduationCap className="w-5 h-5 text-sky-400" />
        <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
          Educational Credentials
        </h2>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EDUCATION_CARDS.map((edu, index) => {
          const accent = ACCENT_STYLES[edu.accent] ?? ACCENT_STYLES.gold;
          
          return (
            <div
              key={index}
              className={`bg-[#0c1017]/85 border border-[#1e293b]/70 hover:border-sky-500/30 rounded-2xl p-6 transition-all duration-500 ease-out flex flex-col gap-4 relative overflow-hidden group
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 150}ms` }} // Staggered fade-up
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex items-start gap-4 relative z-10">
                {/* Accent orb */}
                <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-base font-bold font-display transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 ${accent.classes}`}>
                  {accent.symbol}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-display font-bold text-base text-slate-100 group-hover:text-sky-400 transition-colors duration-300">
                        {edu.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-sans mt-1">
                        {edu.institution}
                      </p>
                    </div>
                    {/* Metric (Percentage/CGPA) */}
                    <div className={`font-display font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r ${accent.bar}`}>
                      {edu.metric}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-sans mt-3 leading-relaxed">
                    {edu.desc}
                  </p>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="relative z-10 mt-auto pt-2">
                <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${accent.bar} rounded-full transition-all duration-1000 ease-out`}
                    style={{
                      width: isVisible ? `${edu.progress}%` : "0%",
                      transitionDelay: `${index * 150 + 300}ms`, // Delay the bar fill slightly
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}