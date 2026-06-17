import React, { useEffect, useRef, useState } from "react";
import { Plus, Trash, RotateCcw, Settings, Grid, Zap, Activity } from "lucide-react";

export default function NetworkPlayground() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [nodes, setNodes] = useState([]);
  const [springs, setSprings] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [gravity, setGravity] = useState(0.15);
  const [repulsion, setRepulsion] = useState(120);
  const [showGrid, setShowGrid] = useState(true);
  const [showStats, setShowStats] = useState(true);
  const [performanceMs, setPerformanceMs] = useState(0);
  const [activePreset, setActivePreset] = useState("neural");

  // Initialize network with a few core structural nodes
  useEffect(() => {
    resetNetwork("neural");
  }, []);

  const resetNetwork = (preset = "neural") => {
    setActivePreset(preset);
    const initialNodes = [];
    const initialSprings = [];

    const centerX = 350;
    const centerY = 200;

    if (preset === "neural") {
      // Create a nice neural ring network
      const count = 6;
      for (let i = 0; i < count; i++) {
        const angle = (i * 2 * Math.PI) / count;
        const r = 110;
        initialNodes.push({
          id: `ring-${i}`,
          x: centerX + r * Math.cos(angle),
          y: centerY + r * Math.sin(angle),
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: 10 + i % 2 * 3,
          label: i === 0 ? "COGNITIVE" : i === 1 ? "VISUAL" : i === 2 ? "AURAL" : i === 3 ? "SYSTEMS" : i === 4 ? "SPATIAL" : "PARSER",
          color: i % 2 === 0 ? "#38bdf8" : "#fcc419",
          mass: i % 2 === 0 ? 1.5 : 1.0,
        });
      }
      
      // Connect ring
      for (let i = 0; i < count; i++) {
        initialSprings.push({
          u: `ring-${i}`,
          v: `ring-${(i + 1) % count}`,
          length: 120,
          k: 0.05,
        });
      }
      // Inner central core
      initialNodes.push({
        id: "core",
        x: centerX,
        y: centerY,
        vx: 0,
        vy: 0,
        radius: 17,
        label: "CORE NUCLEUS",
        color: "#ffffff",
        mass: 3.0,
      });

      // Connect everything to core
      for (let i = 0; i < count; i++) {
        initialSprings.push({
          u: "core",
          v: `ring-${i}`,
          length: 110,
          k: 0.04,
        });
      }
    } else {
      // Create a linear pipeline system
      const count = 5;
      for (let i = 0; i < count; i++) {
        initialNodes.push({
          id: `pipe-${i}`,
          x: 150 + i * 110,
          y: centerY + (i % 2 === 0 ? -40 : 40),
          vx: 0,
          vy: 0,
          radius: 12,
          label: ["SOURCE", "LEXER", "PARSER", "OPTIMIZER", "OUTPUT"][i],
          color: i === 0 ? "#38bdf8" : i === 4 ? "#10b981" : "#94a3b8",
          mass: 1.2,
        });
      }

      for (let i = 0; i < count - 1; i++) {
        initialSprings.push({
          u: `pipe-${i}`,
          v: `pipe-${i + 1}`,
          length: 105,
          k: 0.065,
        });
      }
    }

    setNodes(initialNodes);
    setSprings(initialSprings);
  };

  // Custom Physics Loop inside useEffect
  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const loop = () => {
      const startMs = performance.now();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;

      // 1. Calculate spring forces (Hooke's Law: F = -k * dx)
      const fX = new Map();
      const fY = new Map();
      
      nodes.forEach((n) => {
        fX.set(n.id, 0);
        fY.set(n.id, 0);
      });

      springs.forEach((s) => {
        const uNode = nodes.find((n) => n.id === s.u);
        const vNode = nodes.find((n) => n.id === s.v);
        if (!uNode || !vNode) return;

        const dx = vNode.x - uNode.x;
        const dy = vNode.y - uNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        const forceMag = (dist - s.length) * s.k;

        const fX_u = (dx / dist) * forceMag;
        const fY_u = (dy / dist) * forceMag;

        fX.set(s.u, (fX.get(s.u) || 0) + fX_u);
        fY.set(s.u, (fY.get(s.u) || 0) + fY_u);

        fX.set(s.v, (fX.get(s.v) || 0) - fX_u);
        fY.set(s.v, (fY.get(s.v) || 0) - fY_u);
      });

      // 2. Add electrostatic repulsion forces (Coulomb-like to avoid overlapping)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const u = nodes[i];
          const v = nodes[j];
          const dx = v.x - u.x;
          const dy = v.y - u.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
          
          if (dist < 180) {
            // Repulsion formula
            const repForce = repulsion / (dist * dist || 1);
            const rX = (dx / dist) * repForce;
            const rY = (dy / dist) * repForce;

            fX.set(u.id, (fX.get(u.id) || 0) - rX);
            fY.set(u.id, (fY.get(u.id) || 0) - rY);

            fX.set(v.id, (fX.get(v.id) || 0) + rX);
            fY.set(v.id, (fY.get(v.id) || 0) + rY);
          }
        }
      }

      // 3. Update node positions with simple Verlet Integration
      const updatedNodes = nodes.map((n) => {
        if (n.id === draggingNodeId) {
          // Controlled externally by cursor
          return n;
        }

        const forceX = fX.get(n.id) || 0;
        const forceY = fY.get(n.id) || 0;

        // Apply constant gravity pulling slightly down or toward center
        const centerY = h / 2;
        const centerX = w / 2;
        const gravityX = (centerX - n.x) * gravity * 0.02;
        const gravityY = (centerY - n.y) * gravity * 0.02;

        const ax = (forceX + gravityX) / n.mass;
        const ay = (forceY + gravityY) / n.mass;

        let vx = (n.vx + ax) * 0.94; // with substantial dampening
        let vy = (n.vy + ay) * 0.94;

        let x = n.x + vx;
        let y = n.y + vy;

        // Boundary constraint with bounce
        const padding = 20;
        if (x < padding) { x = padding; vx *= -0.5; }
        if (x > w - padding) { x = w - padding; vx *= -0.5; }
        if (y < padding) { y = padding; vy *= -0.5; }
        if (y > h - padding) { y = h - padding; vy *= -0.5; }

        return {
          ...n,
          x,
          y,
          vx,
          vy,
        };
      });

      // Avoid infinite triggers by manipulating raw values in ref, but syncing states regularly
      let modified = false;
      for (let i = 0; i < nodes.length; i++) {
        if (
          Math.abs(nodes[i].x - updatedNodes[i].x) > 0.05 ||
          Math.abs(nodes[i].y - updatedNodes[i].y) > 0.05 ||
          Math.abs(nodes[i].vx - updatedNodes[i].vx) > 0.05 ||
          Math.abs(nodes[i].vy - updatedNodes[i].vy) > 0.05
        ) {
          modified = true;
          break;
        }
      }

      if (modified || draggingNodeId) {
        setNodes(updatedNodes);
      }

      // 4. Render Layout onto Canvas
      ctx.clearRect(0, 0, w, h);

      // Rendering optional background coordinate grids
      if (showGrid) {
        ctx.strokeStyle = "rgba(30, 41, 59, 0.35)";
        ctx.lineWidth = 1;

        const gap = 30;
        for (let x = 0; x < w; x += gap) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y < h; y += gap) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      }

      // Draw Springs
      springs.forEach((s) => {
        const u = updatedNodes.find((n) => n.id === s.u);
        const v = updatedNodes.find((n) => n.id === s.v);
        if (!u || !v) return;

        const dist = Math.sqrt((v.x - u.x) ** 2 + (v.y - u.y) ** 2);
        const ratio = Math.min(1.8, Math.max(0.2, s.length / (dist || 1)));

        // Color shifts depending on current tension
        ctx.strokeStyle = ratio > 1 
          ? `rgba(56, 189, 248, ${0.15 + (ratio - 1) * 0.4})` 
          : `rgba(252, 196, 25, ${0.15 + (1 - ratio) * 0.4})`;

        ctx.lineWidth = ratio > 1 ? 2 : 1.2;
        ctx.beginPath();
        ctx.moveTo(u.x, u.y);
        ctx.lineTo(v.x, v.y);
        ctx.stroke();

        // Draw spring label/stiffness indicators in monospace
        if (dist > 30 && showGrid) {
          ctx.fillStyle = "rgba(148, 163, 184, 0.4)";
          ctx.font = "8px 'JetBrains Mono'";
          ctx.textAlign = "center";
          ctx.fillText(
            `${Math.round(dist)}px`, 
            (u.x + v.x) / 2, 
            (u.y + v.y) / 2 - 4
          );
        }
      });

      // Draw Nodes
      updatedNodes.forEach((n) => {
        const isHovered = selectedNodeId === n.id;
        const isDragging = draggingNodeId === n.id;

        // Core glow aura
        const gradient = ctx.createRadialGradient(n.x, n.y, n.radius - 2, n.x, n.y, n.radius * 2);
        gradient.addColorStop(0, n.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = isHovered || isDragging ? gradient : "transparent";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 2, 0, 2 * Math.PI);
        ctx.fill();

        // Solid node core
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, 2 * Math.PI);
        ctx.fill();

        // Border stroke outline
        ctx.strokeStyle = isHovered ? "#ffffff" : "rgba(11, 13, 17, 0.8)";
        ctx.lineWidth = isHovered ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, 2 * Math.PI);
        ctx.stroke();

        // Monospace text label
        ctx.fillStyle = isHovered ? "#ffffff" : "rgba(248, 250, 252, 0.85)";
        ctx.font = isHovered ? "bold 10px 'JetBrains Mono'" : "9px 'JetBrains Mono'";
        ctx.textAlign = "center";
        ctx.fillText(n.label, n.x, n.y - n.radius - 8);

        // Render physics vector line if fast
        if (showGrid && (Math.abs(n.vx) > 0.5 || Math.abs(n.vy) > 0.5)) {
          ctx.strokeStyle = "rgba(244, 63, 94, 0.5)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n.x + n.vx * 7, n.y + n.vy * 7);
          ctx.stroke();
        }
      });

      const endMs = performance.now();
      setPerformanceMs(Math.round((endMs - startMs) * 100) / 100);
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [nodes, springs, draggingNodeId, gravity, repulsion, showGrid, selectedNodeId]);

  // Responsive state boundaries
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;
      canvas.width = container.clientWidth;
      canvas.height = 420;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    // Initial size setting
    handleResize();

    return () => resizeObserver.disconnect();
  }, []);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // Detect if hitting node
    let foundNode = null;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const dist = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
      if (dist < n.radius + 10) {
        foundNode = n;
        break;
      }
    }

    if (foundNode) {
      setDraggingNodeId(foundNode.id);
      setSelectedNodeId(foundNode.id);
    } else {
      setSelectedNodeId(null);
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || !draggingNodeId) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === draggingNodeId
          ? { ...n, x: mx, y: my, vx: 0, vy: 0 }
          : n
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  // User adds node
  const addNewNode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const id = `node-${Date.now()}`;
    const rx = 100 + Math.random() * (canvas.width - 200);
    const ry = 100 + Math.random() * (canvas.height - 200);

    const names = ["TELEMETRY", "RENDER", "VECTOR", "SHADOW", "LIGHTWEIGHT", "CANVAS"];
    const label = names[Math.floor(Math.random() * names.length)] + `-${Math.round(Math.random() * 99)}`;

    const newNode = {
      id,
      x: rx,
      y: ry,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      radius: 11,
      label,
      color: "#38bdf8",
      mass: 1.2,
    };

    // Calculate nearest node to link inside network
    let nearestNodeId = nodes[0]?.id;
    let minDist = 99999;
    nodes.forEach((n) => {
      const d = Math.sqrt((n.x - rx) ** 2 + (n.y - ry) ** 2);
      if (d < minDist) {
        minDist = d;
        nearestNodeId = n.id;
      }
    });

    setNodes((prev) => [...prev, newNode]);
    if (nearestNodeId) {
      setSprings((prev) => [
        ...prev,
        { u: newNode.id, v: nearestNodeId, length: 110, k: 0.05 },
      ]);
    }
  };

  // Remove selected node
  const deleteSelectedNode = () => {
    if (!selectedNodeId) return;
    setNodes((prev) => prev.filter((n) => n.id !== selectedNodeId));
    setSprings((prev) => prev.filter((s) => s.u !== selectedNodeId && s.v !== selectedNodeId));
    setSelectedNodeId(null);
  };

  return (
    <div className="w-full flex flex-col bg-[#0d1016] border border-[#1e293b] rounded-xl overflow-hidden shadow-2xl" id="network-playground-outer">
      {/* Simulation Header Menu bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#12161f] border-b border-[#1e293b]" id="play-bar-header">
        <div className="flex items-center gap-3">
          <Activity className="w-4 h-4 text-[#38bdf8] animate-pulse" />
          <h4 className="font-display font-medium text-xs tracking-wider text-slate-300">
            SYSTEMS PLATFORM LAB: NODE MECHANICS
          </h4>
        </div>

        <div className="flex items-center gap-2">
          {/* Preset trigger button */}
          <button
            onClick={() => resetNetwork("neural")}
            className={`px-3 py-1 font-mono text-[10px] rounded transition-all border ${
              activePreset === "neural"
                ? "bg-sky-505/10 border-sky-500 text-sky-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            NEURAL RING
          </button>
          <button
            onClick={() => resetNetwork("pipeline")}
            className={`px-3 py-1 font-mono text-[10px] rounded transition-all border ${
              activePreset === "pipeline"
                ? "bg-[#10b981]/10 border-[#10b981] text-[#10b981]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            PIPELINE FLOW
          </button>
        </div>
      </div>

      {/* Primary Simulator Stage */}
      <div ref={containerRef} className="relative w-full bg-[#07090d]" style={{ height: "420px" }} id="canvas-wrapper">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="block w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Dynamic State Telemetry Overlay */}
        {showStats && (
          <div className="absolute top-4 left-4 p-3 bg-[#0d1016]/95 border border-[#1e293b] rounded text-[10px] font-mono text-slate-400 flex flex-col gap-1 z-10 pointers-none">
            <div className="text-[#38bdf8] font-bold pb-1 border-b border-[#1e293b]/70 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-[#38bdf8]" /> TELEMETRY SENSORS
            </div>
            <div>Total Coordinates: <span className="text-white">{nodes.length}</span></div>
            <div>Tension Vectors: <span className="text-white">{springs.length}</span></div>
            <div>Damping Coefficient: <span className="text-white">6% / frame</span></div>
            <div>Math Cycle: <span className="text-sky-400 font-bold">{performanceMs}ms</span></div>
            {selectedNodeId && (
              <div className="mt-1 pt-1 border-t border-[#1e293b]/50 text-amber-300">
                Holding: {nodes.find((n) => n.id === selectedNodeId)?.label}
              </div>
            )}
          </div>
        )}

        {/* Control floating toolbox on canvas */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#0d1016]/90 border border-[#1e293b] p-1.5 rounded-lg shadow-xl z-10">
          <button
            onClick={addNewNode}
            title="Inject node"
            className="p-1.5 hover:bg-[#1e293b] rounded text-[#38bdf8] hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={deleteSelectedNode}
            disabled={!selectedNodeId}
            title="Delete holding node"
            className={`p-1.5 rounded transition-colors ${
              selectedNodeId 
                ? "text-rose-500 hover:bg-rose-500/10 hover:text-rose-400" 
                : "text-slate-600 cursor-not-allowed"
            }`}
          >
            <Trash className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowGrid(!showGrid)}
            title="Toggle coordinate grid"
            className={`p-1.5 rounded transition-colors ${showGrid ? "text-[#fcc419]" : "text-slate-500"}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => resetNetwork(activePreset)}
            title="Reset system coordinates"
            className="p-1.5 hover:bg-[#1e293b] rounded text-slate-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Physics Parameters Panel */}
      <div className="p-4 bg-[#12161f] border-t border-[#1e293b] grid grid-cols-1 md:grid-cols-3 gap-4" id="physics-knobs-panel">
        <div>
          <label className="text-[10px] font-mono tracking-wider text-slate-400 block mb-1">
            GRAVITATIONAL CONSTANT
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0.0"
              max="0.8"
              step="0.05"
              value={gravity}
              onChange={(e) => setGravity(parseFloat(e.target.value))}
              className="w-full h-1 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#38bdf8] outline-none"
            />
            <span className="font-mono text-xs w-8 text-right text-slate-300 font-medium">
              {gravity.toFixed(2)}
            </span>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-mono tracking-wider text-slate-400 block mb-1">
            NODE COULOMB REPULSION
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="20"
              max="250"
              step="10"
              value={repulsion}
              onChange={(e) => setRepulsion(parseInt(e.target.value))}
              className="w-full h-1 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#38bdf8] outline-none"
            />
            <span className="font-mono text-xs w-8 text-right text-slate-300 font-medium">
              {repulsion}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pl-0 md:pl-6 border-l border-transparent md:border-[#1e293b]/70">
          <div className="text-[10px] font-mono text-slate-400">
            SYSTEM SENSOR MODULES
          </div>
          <button
            onClick={() => setShowStats(!showStats)}
            className={`px-3 py-1 font-mono text-[10px] rounded border transition-all ${
              showStats 
                ? "bg-[#fcc419]/10 border-[#fcc419] text-[#fcc419]" 
                : "border-[#1e293b] text-slate-500"
            }`}
          >
            {showStats ? "STAT_LOGS: ACTIVE" : "STAT_LOGS: HIDDEN"}
          </button>
        </div>
      </div>
    </div>
  );
}
