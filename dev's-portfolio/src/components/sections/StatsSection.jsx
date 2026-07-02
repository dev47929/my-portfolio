import React from "react";
import { motion } from "motion/react";
import AnimatedCounter from "../ui/AnimatedCounter";
import { CORE_STATS } from "../../data.js";

const COUNTER_CFG = {
  "Cumulative CGPA":           { decimals: 2, duration: 4000 },
  "Latest SGPA":               { decimals: 1, duration: 3600 },
  "Hackathons & Events Led":   { decimals: 0, duration: 3000 },
};

export default function StatsSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      id="stats-sec"
    >
      {CORE_STATS.map((stat, i) => {
        const cfg = COUNTER_CFG[stat.label] ?? { decimals: 0, duration: 1200 };
        return (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-[#0c1017]/80 hover:bg-[#0c1017] border border-[#1e293b]/60 hover:border-sky-500/30 p-6 rounded-2xl flex flex-col justify-center transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-sky-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-4xl text-white tracking-tight group-hover:text-sky-400 transition-colors">
                <AnimatedCounter value={stat.value} {...cfg} />
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            </div>
            <span className="text-xs font-mono text-slate-400 mt-2 uppercase tracking-wider">
              {stat.label}
            </span>
          </motion.div>
        );
      })}
    </motion.section>
  );
}
