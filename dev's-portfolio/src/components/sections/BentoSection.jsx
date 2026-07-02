import React, { useRef } from "react";
import { motion } from "motion/react";
import { Terminal, Copy, Check, Server, Trophy, Code2, GraduationCap, Linkedin } from "lucide-react";
import { PORTFOLIO_BIO } from "../../data.js";
import AnimatedCounter from "../ui/AnimatedCounter";

/* ─── Devicon logo URLs ─────────────────────────────────────────────────────── */
const D = {
  java:       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  spring:     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  react:      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  git:        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  js:         "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  linux:      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  cpp:        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  python:     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  tailwind:   "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  maven:      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg",
  intellij:   "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg",
  github:     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  vite:       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
};

/* ─── Card shell with spotlight glow on hover ──────────────────────────────── */
function BentoCard({ children, className = "" }) {
  const ref = useRef(null);

  function onMouseMove(e) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`relative rounded-2xl border border-[#1e293b] bg-[#0c1017] overflow-hidden group
                  hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/5
                  transition-all duration-300 p-5 ${className}`}
      style={{ "--mx": "50%", "--my": "50%" }}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx) var(--my), rgba(56,189,248,0.07), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}

function Label({ children }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-widest text-sky-400/50">
      {children}
    </span>
  );
}

/* ─── Section ───────────────────────────────────────────────────────────────── */
export default function BentoSection({ onCopyEmail, copied }) {
  return (
    <section className="flex flex-col gap-6" id="bento-sec">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-2 pb-2 border-b border-slate-800/60"
      >
        <Terminal className="w-5 h-5 text-sky-400" />
        <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
          Short Profile
        </h2>
      </motion.div>

      {/* Bento grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >

        {/* ── 1. Role ── col-span-2 ── */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
        <BentoCard className="lg:col-span-2">
          <div className="flex flex-col gap-4">
            <Label>Role</Label>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 shrink-0">
                <Server className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Backend Developer</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Building production-grade RESTful APIs, microservices & full-stack applications
              with a focus on clean architecture, security, and scalability.
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {["Java", "Spring Boot", "Spring Security", "PostgreSQL", "JWT", "React.js", "DSA"].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-[10px] font-mono text-slate-300
                             bg-slate-800/70 border border-slate-700/60 rounded-md
                             hover:border-sky-500/40 hover:text-sky-300 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </BentoCard>
        </motion.div>

        {/* ── 2. Academics ── */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
        <BentoCard>
          <div className="flex flex-col gap-4 h-full">
            <Label>Academics</Label>
            <div className="flex items-start gap-4">
              <GraduationCap className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div className="flex gap-5">
                <div>
                  <div className="text-3xl font-black text-white leading-none">
                    <AnimatedCounter value="8.81" decimals={2} duration={4000} />
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400/80 mt-0.5">CGPA</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white leading-none">
                    <AnimatedCounter value="9.0" decimals={1} duration={3600} />
                  </div>
                  <div className="text-[10px] font-mono text-sky-400/80 mt-0.5">SGPA</div>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              B.Tech CSE · LNCT Bhopal<br />2024 – 2028
            </p>
            {/* Progress bars */}
            <div className="flex flex-col gap-2 mt-auto">
              {[
                { label: "CGPA", val: 88.1, color: "from-emerald-500 to-sky-500" },
                { label: "SGPA", val: 90,   color: "from-sky-500 to-purple-500"  },
              ].map(({ label, val, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-[9px] font-mono text-slate-600 mb-1">
                    <span>{label}</span><span>{val / 10}/10</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${color} rounded-full`}
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>
        </motion.div>

        {/* ── 3. Tech Stack logos ── */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
        <BentoCard>
          <div className="flex flex-col gap-4">
            <Label>Tech Stack</Label>
            <h3 className="font-display font-bold text-sm text-white -mt-1">
              Languages &amp; Tools
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { src: D.java,       name: "Java"     },
                { src: D.spring,     name: "Spring"   },
                { src: D.postgresql, name: "PgSQL"    },
                { src: D.react,      name: "React"    },
                { src: D.cpp,        name: "C++"      },
                { src: D.js,         name: "JS"       },
                { src: D.git,        name: "Git"      },
                { src: D.linux,      name: "Linux"    },
                { src: D.tailwind,   name: "Tailwind" },
                { src: D.maven,      name: "Maven"    },
                { src: D.intellij,   name: "IntelliJ" },
                { src: D.python,     name: "Python"   },
              ].map(({ src, name }) => (
                <div key={name} className="flex flex-col items-center gap-1 group/logo">
                  <div className="w-9 h-9 flex items-center justify-center rounded-xl
                                  bg-slate-800/60 border border-slate-700/40
                                  group-hover/logo:border-sky-500/30 transition-colors p-2">
                    <img src={src} alt={name} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[8px] font-mono text-slate-600
                                   group-hover/logo:text-slate-400 transition-colors">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>
        </motion.div>

        {/* ── 4. Hackathons ── */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
        <BentoCard>
          <div className="flex flex-col gap-4">
            <Label>Achievements</Label>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <h3 className="font-display font-bold text-sm text-white">Hackathons</h3>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { rank: "Top 4",  teams: "200+",  event: "Tech Sageathon",  year: "2026", color: "text-amber-400",  bg: "bg-amber-500/5  border-amber-500/15"  },
                { rank: "Top 20", teams: "1000+", event: "BGI Hackathon",   year: "2026", color: "text-sky-400",    bg: "bg-sky-500/5    border-sky-500/15"    },
                { rank: "Top 16", teams: "100+",  event: "InnovX Season 2", year: "2025", color: "text-purple-400", bg: "bg-purple-500/5 border-purple-500/15" },
              ].map(({ rank, teams, event, year, color, bg }) => (
                <div key={event} className={`flex items-center justify-between px-3 py-2.5 rounded-xl border ${bg}`}>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs font-bold ${color}`}>{rank}</span>
                    <span className="text-[10px] text-slate-600">/ {teams}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-400">{event}</div>
                    <div className="text-[9px] font-mono text-slate-600">{year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>
        </motion.div>

        {/* ── 5. Projects ── */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
        <BentoCard>
          <div className="flex flex-col gap-4">
            <Label>Projects</Label>
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400 shrink-0" />
              <h3 className="font-display font-bold text-sm text-white">Featured Work</h3>
            </div>
            <div className="flex flex-col gap-3">
              {[
                {
                  name: "AI-Powered Job Tracker",
                  tags: ["Spring Boot", "React", "PostgreSQL", "Groq LLM"],
                  color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/15",
                },
                {
                  name: "Feature Flag Service",
                  tags: ["Spring Security", "JWT", "PostgreSQL", "H2"],
                  color: "text-sky-400 bg-sky-500/10 border-sky-500/15",
                },
              ].map(({ name, tags, color }) => (
                <div key={name} className="p-3 rounded-xl bg-slate-800/30 border border-slate-700/40
                                           hover:border-slate-600/60 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white">{name}</span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${color}`}>
                      2026
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {tags.map((t) => (
                      <span key={t} className="text-[9px] font-mono text-slate-500
                                               bg-slate-900/60 border border-slate-800 px-1.5 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>
        </motion.div>

        {/* ── 6. Contact ── */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
        <BentoCard>
          <div className="flex flex-col gap-4 h-full">
            <Label>Contact</Label>
            <h3 className="font-display font-bold text-sm text-white -mt-1">Let's connect</h3>

            {/* Email row */}
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl
                            bg-slate-800/40 border border-slate-700/40">
              <svg className="w-3.5 h-3.5 text-sky-400 shrink-0" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span className="text-[11px] font-mono text-slate-300 truncate">
                {PORTFOLIO_BIO.email}
              </span>
            </div>

            {/* Social links */}
            <div className="grid grid-cols-3 gap-2">
              {/* GitHub */}
              <a href={PORTFOLIO_BIO.github} target="_blank" rel="noreferrer"
                className="flex flex-col items-center gap-1.5 py-2.5 rounded-xl
                           bg-slate-800/40 border border-slate-700/40
                           hover:border-sky-500/40 hover:bg-sky-500/5 transition-all group/gh">
                <img src={D.github} alt="GitHub"
                  className="w-5 h-5 object-contain invert opacity-60 group-hover/gh:opacity-90 transition-opacity" />
                <span className="text-[9px] font-mono text-slate-500 group-hover/gh:text-slate-300 transition-colors">
                  GitHub
                </span>
              </a>

              {/* LinkedIn */}
              <a href={PORTFOLIO_BIO.linkedin} target="_blank" rel="noreferrer"
                className="flex flex-col items-center gap-1.5 py-2.5 rounded-xl
                           bg-slate-800/40 border border-slate-700/40
                           hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5 transition-all group/li">
                <Linkedin className="w-5 h-5 text-[#0A66C2] opacity-60 group-hover/li:opacity-90 transition-opacity" />
                <span className="text-[9px] font-mono text-slate-500 group-hover/li:text-slate-300 transition-colors">
                  LinkedIn
                </span>
              </a>

              {/* LeetCode */}
              <a href={PORTFOLIO_BIO.leetcode} target="_blank" rel="noreferrer"
                className="flex flex-col items-center gap-1.5 py-2.5 rounded-xl
                           bg-slate-800/40 border border-slate-700/40
                           hover:border-[#FFA116]/40 hover:bg-[#FFA116]/5 transition-all group/lc">
                <svg className="w-5 h-5 opacity-60 group-hover/lc:opacity-90 transition-opacity"
                  viewBox="0 0 24 24" fill="#FFA116">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                </svg>
                <span className="text-[9px] font-mono text-slate-500 group-hover/lc:text-slate-300 transition-colors">
                  LeetCode
                </span>
              </a>
            </div>

            <p className="text-[10px] text-slate-600 mt-auto leading-relaxed font-sans">
              Open to internships &amp; collaborations
            </p>
          </div>
        </BentoCard>
        </motion.div>

      </motion.div>

      {/* Copy email CTA */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        onClick={onCopyEmail}
        className="w-full max-w-[54rem] mx-auto py-3 px-6 rounded-xl font-mono text-xs font-bold
                   text-white bg-slate-800/50 hover:bg-sky-500/10 border border-slate-700
                   hover:border-sky-500/40 flex items-center justify-between
                   transition-all active:scale-[0.98]"
      >
        <span className="truncate">{PORTFOLIO_BIO.email}</span>
        {copied
          ? <Check className="w-4 h-4 text-sky-400 shrink-0" />
          : <Copy className="w-4 h-4 text-slate-400 shrink-0" />
        }
      </motion.button>
    </section>
  );
}