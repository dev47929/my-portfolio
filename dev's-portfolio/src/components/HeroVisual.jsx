import {
  FaJava,
  FaGitAlt,
  FaDocker,
} from "react-icons/fa";

import {
  SiSpringboot,
  SiPostgresql,
  SiJavascript,
} from "react-icons/si";

export default function HeroVisual() {
  const techStack = [
    {
      icon: <FaJava size={24} />,
      className: "top-6 left-6 animate-float",
    },
    {
      icon: <SiSpringboot size={24} />,
      className: "top-10 right-5 animate-float-delayed",
    },
    {
      icon: <SiPostgresql size={24} />,
      className: "bottom-16 left-10 animate-float-slow",
    },
    {
      icon: <SiJavascript size={24} />,
      className: "bottom-6 right-8 animate-float",
    },
    {
      icon: <FaGitAlt size={24} />,
      className: "top-1/2 -left-4 animate-float-delayed",
    },
    {
      icon: <FaDocker size={24} />,
      className: "top-1/2 -right-4 animate-float-slow",
    },
  ];

  return (
    <div className="relative flex items-center justify-center w-full h-[420px]">

      {/* Glow */}
      <div className="absolute w-64 h-64 rounded-full bg-cyan-500/15 blur-[100px]" />

      {/* Floating Tech Icons (behind terminal) */}
      {techStack.map((item, index) => (
        <div
          key={index}
          className={`absolute text-cyan-400/60 z-0 ${item.className}`}
        >
          <div className="p-2.5 rounded-xl border border-cyan-500/10 bg-slate-900/40 backdrop-blur-sm">
            {item.icon}
          </div>
        </div>
      ))}
      {/* Code Editor */}
      <div className="relative z-10 w-[400px] rounded-2xl border border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.2)]">

        {/* Top Bar */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-800 rounded-t-3xl">

          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* Code */}
        <div className="p-6 font-mono text-sm leading-7 rounded-b-3xl">

          <p>
            <span className="text-purple-400">@RestController</span>
          </p>

          <p>
            <span className="text-cyan-400">public class</span>{" "}
            <span className="text-green-400">
              PortfolioController
            </span>{" "}
            {"{"}
          </p>

          <p className="ml-6">
            <span className="text-purple-400">
              @GetMapping
            </span>
            ("/")
          </p>

          <p className="ml-6">
            <span className="text-cyan-400">public String</span>{" "}
            <span className="text-yellow-300">
              aboutMe
            </span>
            () {"{"}
          </p>

          <p className="ml-12 text-orange-300">
            return "Backend Developer";
          </p>

          <p className="ml-6">{"}"}</p>

          <p>{"}"}</p>

          <div className="inline-block w-2 h-5 ml-1 bg-cyan-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
