import React, { useEffect, useState, useRef } from "react";
import { Compass, Play, Pause, ArrowRightLeft, Database } from "lucide-react";

export default function CelestialSky() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [timelineIndex, setTimelineIndex] = useState(365); // days of the year
  const [alignedPlanets, setAlignedPlanets] = useState([]);
  const requestRef = useRef(null);

  const [planets, setPlanets] = useState([
    { id: "merc", name: "Mercury", distance: 38, speed: 0.045, size: 4, color: "#94a3b8", angle: 0, astrologicalSign: "♊" },
    { id: "venus", name: "Venus", distance: 58, speed: 0.024, size: 6, color: "#fcc419", angle: Math.PI / 4, astrologicalSign: "♉" },
    { id: "earth", name: "Earth", distance: 84, speed: 0.015, size: 7, color: "#00f0ff", angle: Math.PI / 2, astrologicalSign: "♍" },
    { id: "mars", name: "Mars", distance: 114, speed: 0.011, size: 5.5, color: "#ef4444", angle: Math.PI * 0.8, astrologicalSign: "♈" },
    { id: "jupiter", name: "Jupiter", distance: 160, speed: 0.004, size: 12, color: "#f59e0b", angle: Math.PI, astrologicalSign: "♐" },
  ]);

  const historicalAlignments = [
    { day: 90, name: "SPRING EQUINOX DEVIATION", description: "Mercury-Venus coordinates cross within 0.15 rad" },
    { day: 180, name: "SOLSTICE SYNCHRONIZATION", description: "Earth alignment on radial vector zero" },
    { day: 270, name: "AUTUMNAL ALIGNMENT MATRIX", description: "Mars and Jupiter relative nodes are aligned" },
    { day: 365, name: "YEARCYCLE HORIZON", description: "Full solar system cycle reset trajectory" }
  ];

  // Animation cycle
  useEffect(() => {
    const cycle = () => {
      if (isPlaying) {
        setPlanets((prevPlanets) => {
          const next = prevPlanets.map((p) => {
            let nextAngle = p.angle + p.speed * speedMultiplier * 0.45;
            if (nextAngle > 2 * Math.PI) nextAngle -= 2 * Math.PI;
            return {
              ...p,
              angle: nextAngle,
            };
          });

          // Check for visual alignments (if angles are close e.g., within 0.1 radians)
          const aligned = [];
          for (let i = 0; i < next.length; i++) {
            for (let j = i + 1; j < next.length; j++) {
              const diff = Math.abs(next[i].angle - next[j].angle);
              const normalizedDiff = Math.min(diff, 2 * Math.PI - diff);
              if (normalizedDiff < 0.12) {
                aligned.push(`${next[i].name} ⬌ ${next[j].name}`);
              }
            }
          }
          setAlignedPlanets(aligned.filter((v, idx, arr) => arr.indexOf(v) === idx));
          return next;
        });

        // Increment day counter
        setTimelineIndex((prevDay) => {
          let nextDay = prevDay + Math.round(speedMultiplier);
          if (nextDay > 365) nextDay = 1;
          return nextDay;
        });
      }
      requestRef.current = requestAnimationFrame(cycle);
    };

    requestRef.current = requestAnimationFrame(cycle);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speedMultiplier]);

  // Handle manual timeline scrubber change (positions planets relative to year fraction)
  const handleTimelineScrub = (value) => {
    setTimelineIndex(value);
    const fraction = value / 365;

    setPlanets((prev) =>
      prev.map((p) => ({
        ...p,
        angle: (fraction * p.speed * 400) % (2 * Math.PI),
      }))
    );
  };

  return (
    <div className="w-full flex flex-col bg-[#0d1016] border border-[#1e293b] rounded-xl overflow-hidden shadow-2xl" id="celestial-sky-outer">
      {/* Simulation display screen */}
      <div className="relative p-6 bg-[#040608] flex flex-col items-center border-b border-[#1e293b]/70 overflow-hidden min-h-[350px]">
        {/* Floating title */}
        <div className="absolute top-3 left-4 flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-[#fcc419]">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} /> ASTROSCOPE RADIAL MAP
        </div>

        {/* Central Sun & Planet Orbits */}
        <div className="relative w-72 h-72 border border-slate-800/40 rounded-full flex items-center justify-center mt-3" id="orbit-stage">
          {/* Orbits representation lines */}
          {planets.map((p) => (
            <div
              key={`orbit-line-${p.id}`}
              className="absolute border border-slate-800/35 rounded-full pointer-events-none"
              style={{
                width: `${p.distance * 2}px`,
                height: `${p.distance * 2}px`,
              }}
            />
          ))}

          {/* Core Sun */}
          <div className="absolute w-6 h-6 bg-radial from-amber-400 to-amber-600 rounded-full shadow-[0_0_15px_#f59e0b] flex items-center justify-center z-10">
            <span className="text-[10px] font-bold text-black font-display">☉</span>
          </div>

          {/* Active Planets */}
          {planets.map((p) => {
            const px = p.distance * Math.cos(p.angle);
            const py = p.distance * Math.sin(p.angle);

            return (
              <div
                key={`planet-core-${p.id}`}
                className="absolute flex flex-col items-center justify-center transition-all duration-75 group"
                style={{
                  transform: `translate(${px}px, ${py}px)`,
                }}
              >
                {/* Planet Circle */}
                <div
                  className="rounded-full shadow-lg transition-transform duration-200 group-hover:scale-125 cursor-pointer relative"
                  style={{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.color,
                    boxShadow: `0 0 8px ${p.color}`,
                  }}
                >
                  {/* Astrology Sign Label on hover */}
                  <span className="absolute -top-4 -left-1 opacity-0 group-hover:opacity-100 text-[8px] font-mono text-slate-300">
                    {p.astrologicalSign}
                  </span>
                </div>

                {/* Planet Label name */}
                <span className="absolute top-3 hidden group-hover:block px-1 bg-slate-900 border border-[#1e293b] rounded text-[8px] font-mono text-white whitespace-nowrap z-20">
                  {p.name.toUpperCase()} ({Math.round(p.angle * 100) / 100}r)
                </span>
              </div>
            );
          })}
        </div>

        {/* Real-time aligning nodes indicator */}
        {alignedPlanets.length > 0 && (
          <div className="absolute bottom-3 right-4 bg-[#38bdf8]/10 border border-[#38bdf8]/80 px-2.5 py-1 rounded text-[10px] font-mono text-[#38bdf8] flex items-center gap-1.5 animate-pulse">
            <ArrowRightLeft className="w-3.5 h-3.5" /> alignment: {alignedPlanets[0]}
          </div>
        )}
      </div>

      {/* Control panel menu bar */}
      <div className="p-4 bg-[#12161f]" id="astro-menu-controls">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Speed settings */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded-lg border transition-all ${
                isPlaying 
                  ? "bg-slate-800 border-slate-600 text-amber-400" 
                  : "bg-sky-500/10 border-sky-500 text-sky-400"
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-amber-400" /> : <Play className="w-4 h-4 fill-sky-400" />}
            </button>
            <div className="flex-1">
              <label className="text-[10px] font-mono text-slate-400 block mb-0.5">SPEED INDEX</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={speedMultiplier}
                  onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
                  className="w-full h-1 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#fcc419] outline-none"
                />
                <span className="text-[10px] font-mono text-slate-300 w-6 text-right">x{speedMultiplier}</span>
              </div>
            </div>
          </div>

          {/* Year Scrubber */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-0.5">
              YEAR TIMELINE CYCLE: <span className="text-white font-bold">{timelineIndex} / 365 DAYS</span>
            </label>
            <input
              type="range"
              min="1"
              max="365"
              value={timelineIndex}
              onChange={(e) => handleTimelineScrub(parseInt(e.target.value))}
              className="w-full h-1 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#00f0ff] outline-none"
            />
          </div>

          {/* Timeline Milestones list */}
          <div className="flex flex-col gap-1 border-l border-transparent md:border-[#1e293b]/70 pl-0 md:pl-4">
            <span className="text-[9px] font-mono text-slate-400 flex items-center gap-1">
              <Database className="w-3 h-3 text-[#fcc419]" /> MILESTONE CALCULATOR
            </span>
            <div className="text-[10px] text-slate-300 font-sans">
              {(() => {
                const activeM = historicalAlignments.find(
                  (m) => Math.abs(m.day - timelineIndex) < 25
                );
                return activeM ? (
                  <div>
                    <span className="text-[#00f0ff] font-bold">{activeM.name}</span>
                    <p className="text-[9px] text-slate-500">{activeM.description}</p>
                  </div>
                ) : (
                  <span className="text-slate-500 italic">No static alignments near this fractional coordinate</span>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
