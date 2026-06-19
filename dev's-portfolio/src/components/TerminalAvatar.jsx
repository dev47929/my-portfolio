import { useEffect, useRef, useState } from "react";

export default function TerminalAvatar() {
  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);
  const bodyRef = useRef(null);

  const SCRIPT = [
    { type: "cmd",    text: "whoami" },
    { type: "output", text: "Dev Sharma — Backend Developer" },
    { type: "gap" },
    { type: "cmd",    text: "cat stack.json" },
    { type: "json",   text: '{' },
    { type: "json",   text: '  "lang":      "Java, C++, JavaScript",' },
    { type: "json",   text: '  "framework": "Spring Boot",' },
    { type: "json",   text: '  "db":        "PostgreSQL",' },
    { type: "json",   text: '  "auth":      "JWT + BCrypt",' },
    { type: "json",   text: '  "tools":     "Git, Linux, Maven"' },
    { type: "json",   text: '}' },
    { type: "gap" },
    { type: "cmd",    text: "cat achievements.log" },
    { type: "success",text: "✓ Top 4/200+   Tech Sageathon" },
    { type: "success",text: "✓ Top 20/600+  BGI Hackathon" },
    { type: "success",text: "✓ Top 16/100+  National Startup" },
    { type: "gap" },
    { type: "cmd",    text: "echo $STATUS" },
    { type: "accent", text: "Open to internships & collaborations" },
  ];

  const delay = (type, idx) => {
    if (type === "cmd")     return idx === 0 ? 600 : 500;
    if (type === "gap")     return 120;
    if (type === "json")    return 110;
    if (type === "success") return 130;
    return 200;
  };

  useEffect(() => {
    let timer;
    let i = 0;

    function step() {
      if (i >= SCRIPT.length) {
        setDone(true);
        return;
      }
      const entry = SCRIPT[i];
      setLines(prev => [...prev, entry]);
      i++;
      timer = setTimeout(step, delay(entry.type, i));
    }

    timer = setTimeout(step, 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    const id = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(id);
  }, []);

  function renderLine(entry, idx) {
    switch (entry.type) {
      case "cmd":
        return (
          <div key={idx} className="flex items-center gap-1.5">
            <span className="text-sky-400 font-bold select-none">❯</span>
            <span className="text-slate-100">{entry.text}</span>
          </div>
        );
      case "output":
        return (
          <div key={idx} className="text-slate-300 pl-4">
            {entry.text}
          </div>
        );
      case "json": {
        const line = entry.text;
        const colonIdx = line.indexOf(":");
        if (colonIdx === -1) {
          return (
            <div key={idx} className="pl-4 text-purple-400 font-mono">
              {line}
            </div>
          );
        }
        const key   = line.slice(0, colonIdx + 1);
        const value = line.slice(colonIdx + 1);
        return (
          <div key={idx} className="pl-4 font-mono">
            <span className="text-amber-300">{key}</span>
            <span className="text-green-400">{value}</span>
          </div>
        );
      }
      case "success":
        return (
          <div key={idx} className="pl-4 text-emerald-400 font-mono text-xs">
            {entry.text}
          </div>
        );
      case "accent":
        return (
          <div key={idx} className="pl-4 text-sky-300 font-semibold">
            {entry.text}
          </div>
        );
      case "gap":
        return <div key={idx} className="h-2" />;
      default:
        return null;
    }
  }

  return (
    <div className="w-full flex justify-center items-center py-6">
      <div className="relative w-full max-w-sm">
        <div className="absolute -inset-1 rounded-2xl bg-sky-500/10 blur-xl pointer-events-none" />

        <div className="relative rounded-2xl overflow-hidden border border-[#1e293b] shadow-2xl shadow-sky-500/5">

          <div className="flex items-center gap-2 px-4 py-3 bg-[#0d1520] border-b border-[#1e293b]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57] block" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e] block" />
            <span className="w-3 h-3 rounded-full bg-[#28c840] block" />
            <span className="flex-1 text-center text-[11px] font-mono text-slate-500 tracking-widest select-none">
              dev@portfolio — bash
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse block" />
              <span className="text-[10px] font-mono text-emerald-500">live</span>
            </span>
          </div>

          <div
            ref={bodyRef}
            className="bg-[#07101a] px-5 py-4 font-mono text-[13px] leading-6 space-y-0.5 overflow-y-auto"
            style={{ minHeight: "320px", maxHeight: "360px" }}
          >
            {lines.map((entry, i) => renderLine(entry, i))}

            {!done && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-sky-400 font-bold select-none opacity-0">❯</span>
                <span
                  className="inline-block w-[7px] h-[14px] bg-sky-400 rounded-sm align-middle"
                  style={{ opacity: showCursor ? 1 : 0, transition: "opacity 0.1s" }}
                />
              </div>
            )}

            {done && (
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-sky-400 font-bold select-none">❯</span>
                <span
                  className="inline-block w-[7px] h-[14px] bg-sky-400 rounded-sm align-middle"
                  style={{ opacity: showCursor ? 1 : 0, transition: "opacity 0.1s" }}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between px-4 py-2 bg-[#0d1520] border-t border-[#1e293b]">
            <span className="text-[10px] font-mono text-slate-600">
              Java · Spring Boot · PostgreSQL
            </span>
            <span className="text-[10px] font-mono text-sky-600">
              LNCT Bhopal · 2024–28
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
