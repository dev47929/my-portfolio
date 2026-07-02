import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, CheckCircle } from "lucide-react";
import { TIMELINE_JOURNEY } from "../../data.js";

/* ─── Metadata ─────────────────────────────────────────────────────────────── */

const MILESTONE_META = [
  {
    accent: "sky",
    badges: [
      { label: "TOP_4 / 200+ TEAMS",  color: "sky"    },
      { label: "TECH_SAGEATHON_2026", color: "purple" },
    ],
  },
  {
    accent: "emerald",
    badges: [
      { label: "TOP_20 / 1000+ TEAMS", color: "emerald" },
      { label: "BGI_HACKATHON_2026",   color: "sky"     },
    ],
  },
  {
    accent: "amber",
    badges: [
      { label: "TOP_16 / GRAND_FINALISTS", color: "amber" },
      { label: "INNOVX_SEASON_2",          color: "rose"  },
    ],
  },
  {
    accent: "rose",
    badges: [
      { label: "CGPA_8.82",  color: "rose" },
      { label: "B_TECH_CSE", color: "sky"  },
    ],
  },
];

const ACCENT = {
  sky:     { bar: "bg-sky-500",     dot: "bg-sky-400",     label: "text-sky-400",     check: "text-sky-400",     border: "border-sky-500"     },
  purple:  { bar: "bg-purple-500",  dot: "bg-purple-400",  label: "text-purple-400",  check: "text-purple-400",  border: "border-purple-500"  },
  emerald: { bar: "bg-emerald-500", dot: "bg-emerald-400", label: "text-emerald-400", check: "text-emerald-400", border: "border-emerald-500" },
  amber:   { bar: "bg-amber-500",   dot: "bg-amber-400",   label: "text-amber-400",   check: "text-amber-400",   border: "border-amber-500"   },
  rose:    { bar: "bg-rose-500",    dot: "bg-rose-400",    label: "text-rose-400",    check: "text-rose-400",    border: "border-rose-500"    },
};

const BADGE = {
  sky:     "bg-sky-500/5     text-sky-400     border-sky-500/15",
  purple:  "bg-purple-500/5  text-purple-400  border-purple-500/15",
  emerald: "bg-emerald-500/5 text-emerald-400 border-emerald-500/15",
  amber:   "bg-amber-500/5   text-amber-400   border-amber-500/15",
  rose:    "bg-rose-500/5    text-rose-400    border-rose-500/15",
};

const GLOW = {
  sky:     "rgba(14,165,233,0.10)",
  purple:  "rgba(168,85,247,0.10)",
  emerald: "rgba(16,185,129,0.10)",
  amber:   "rgba(245,158,11,0.10)",
  rose:    "rgba(244,63,94,0.10)",
};

/* ─── Main section ──────────────────────────────────────────────────────────── */

export default function JourneySection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const sectionRef = useRef(null);
  const rowRefs    = useRef([]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });

  // IntersectionObserver: whichever row hits the centre viewport wins
  useEffect(() => {
    const obs = rowRefs.current.map((row, idx) => {
      if (!row) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveIdx(idx); },
        { threshold: 0.45 }
      );
      o.observe(row);
      return o;
    });
    return () => obs.forEach((o) => o?.disconnect());
  }, []);

  const activeAccent = (MILESTONE_META[activeIdx] ?? MILESTONE_META[0]).accent;

  return (
    <section className="relative flex flex-col gap-8 py-2 overflow-hidden" id="journey-sec">

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 60%, ${GLOW[activeAccent]}, transparent 55%)`,
        }}
      />

      {/* ── Header ── */}
      <motion.div
        className="relative z-10 flex flex-col gap-2 pb-4 border-b border-slate-800/60"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45 }}
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-sky-400" />
          <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
            My Journey Report
          </h2>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-3xl mt-1">
          From building backend systems in Spring Boot to competing in national hackathons — scroll
          to walk through key milestones since I started my B.Tech at LNCT Bhopal in 2024.
        </p>
      </motion.div>

      {/* ── Timeline ── */}
      {/*
        Desktop grid: [28% left label] [44px dot column] [1fr card]

        The vertical line is centred in the 44px dot column:
          left = 28% + 22px  (half of 44px)

        Each milestone is its own grid row, so the left label and right card
        are always vertically paired — no sticky / h-screen tricks needed.
      */}
      <div ref={sectionRef} className="relative z-10">

        {/* Line track */}
        <div
          className="absolute hidden md:block top-0 bottom-0 w-0.5 bg-slate-800/60 rounded-full"
          style={{ left: "calc(28% + 22px)" }}
        />
        {/* Animated fill */}
        <motion.div
          className="absolute hidden md:block top-0 w-0.5 rounded-full origin-top"
          style={{
            left: "calc(28% + 22px)",
            height: "100%",
            scaleY: scrollYProgress,
            background: "linear-gradient(to bottom, #0ea5e9, #a855f7, #f43f5e)",
          }}
        />

        <div className="flex flex-col">
          {TIMELINE_JOURNEY.map((item, idx) => {
            const meta     = MILESTONE_META[idx] ?? MILESTONE_META[0];
            const ac       = ACCENT[meta.accent]  ?? ACCENT.sky;
            const isActive = activeIdx === idx;

            return (
              <div
                key={idx}
                ref={(el) => (rowRefs.current[idx] = el)}
                className="grid grid-cols-1 md:grid-cols-[28%_44px_1fr] items-start gap-0 py-6 md:py-8"
              >
                {/* Left label */}
                <motion.div
                  className="hidden md:flex flex-col items-end gap-1 pr-4 pt-3 select-none"
                  animate={{ opacity: isActive ? 1 : 0.28, x: isActive ? 0 : -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={`font-mono text-[11px] font-bold tracking-widest ${ac.label}`}>
                    {item.year}
                  </span>
                  <span className="font-display font-semibold text-sm text-white text-right leading-snug">
                    {item.title.EN}
                  </span>
                </motion.div>

                {/* Dot — centred in the 44px column, aligned with line */}
                <div className="hidden md:flex items-start justify-center pt-[14px] relative z-10">
                  <motion.div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center bg-[#07101a] transition-colors duration-300 ${
                      isActive ? ac.border : "border-slate-700"
                    }`}
                    animate={{ scale: isActive ? 1.35 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                        isActive ? ac.dot : "bg-transparent"
                      }`}
                    />
                  </motion.div>
                </div>

                {/* Card */}
                <div className="pl-0 md:pl-5">
                  <DetailCard item={item} idx={idx} meta={meta} ac={ac} isActive={isActive} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Detail card ───────────────────────────────────────────────────────────── */

function DetailCard({ item, idx, meta, ac, isActive }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0.45]);
  const y       = useTransform(scrollYProgress, [0, 0.18], [28, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y }}
      className={`relative bg-[#0c1017]/90 backdrop-blur-md border rounded-2xl p-5 md:p-7 overflow-hidden shadow-xl transition-colors duration-300 ${
        isActive ? ac.border : "border-[#1e293b]/60"
      }`}
    >
      {/* Left accent bar */}
      <div
        className={`absolute top-0 left-0 w-1.5 h-full ${ac.bar} rounded-l-2xl transition-opacity duration-300`}
        style={{ opacity: isActive ? 1 : 0.2 }}
      />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="flex flex-col gap-4 relative z-10">
        {/* Mobile: year tag */}
        <div className="md:hidden flex items-center gap-2">
          <span className={`font-mono text-[10px] font-bold ${ac.label}`}>{item.year}</span>
          <span className="text-slate-700">·</span>
          <span className="text-slate-500 text-[10px] font-mono">MILESTONE {idx + 1}</span>
        </div>

        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <span className={`font-mono text-[10px] font-bold ${ac.label} hidden md:block mb-1 tracking-wider`}>
              {item.year} · MILESTONE {idx + 1}
            </span>
            <h3 className="font-display font-bold text-xl md:text-2xl text-white leading-tight">
              {item.title.EN}
            </h3>
          </div>

          <div
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border shrink-0 mt-0.5 transition-all duration-300 ${
              isActive ? ac.border : "border-slate-700/40"
            }`}
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <CheckCircle className={`w-3.5 h-3.5 ${isActive ? ac.check : "text-slate-600"}`} />
            <span className={`font-mono text-[10px] font-bold transition-colors ${isActive ? ac.label : "text-slate-600"}`}>
              UNLOCKED
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 font-sans leading-relaxed">{item.desc.EN}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {meta.badges.map((badge) => (
            <motion.span
              key={badge.label}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`px-3 py-1 text-[10px] font-mono font-semibold border rounded-md cursor-default ${
                BADGE[badge.color] ?? BADGE.sky
              }`}
            >
              {badge.label}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}