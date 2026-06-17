import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, BarChart2, Radio, Sparkles } from "lucide-react";

export default function AudioSequencer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [carrierFreq, setCarrierFreq] = useState(432); // Solfeggio frequency
  const [isMuted, setIsMuted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [beatsPerMinute, setBeatsPerMinute] = useState(68); // Slow meditation tempo
  const [breathingStage, setBreathingStage] = useState("INHALING"); // Pacing cycle
  const [breathingTimer, setBreathingTimer] = useState(0);

  // Sound Synth States using browser AudioContext API
  const audioCtxRef = useRef(null);
  const carrierNodeRef = useRef(null);
  const subNodeRef = useRef(null);
  const mainGainNodeRef = useRef(null);
  const stepIntervalRef = useRef(null);
  const breathingIntervalRef = useRef(null);
  const waveAnimationFrameRef = useRef(null);

  // SVG Wave drawing properties
  const [wavePoints, setWavePoints] = useState("");

  // Sequencer step matrix grid - fully functional
  const [matrixSquares, setMatrixSquares] = useState([
    true, false, true, false, true, false, true, false,
    false, true, false, true, false, true, false, true,
  ]);

  // Audio initialize trigger
  const initAudioCtx = () => {
    if (!audioCtxRef.current) {
      // Create lazy instance of AudioContext following developer guideline patterns
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const startSynthesis = () => {
    try {
      initAudioCtx();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      // 1. Create oscillator nodes & components
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const masterGain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(carrierFreq, ctx.currentTime);

      // Create micro binaural drift offset 4Hz
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(carrierFreq + 4.2, ctx.currentTime);

      masterGain.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);

      // 2. Connect audio node tree safely
      osc1.connect(masterGain);
      osc2.connect(masterGain);
      masterGain.connect(ctx.destination);

      // 3. Keep node references for dynamic changes
      carrierNodeRef.current = osc1;
      subNodeRef.current = osc2;
      mainGainNodeRef.current = masterGain;

      // Start frequencies
      osc1.start();
      osc2.start();
    } catch (err) {
      console.warn("Could not start audio synthesis context:", err);
    }
  };

  const stopSynthesis = () => {
    if (carrierNodeRef.current) {
      try {
        carrierNodeRef.current.stop();
        carrierNodeRef.current.disconnect();
      } catch (e) {}
      carrierNodeRef.current = null;
    }
    if (subNodeRef.current) {
      try {
        subNodeRef.current.stop();
        subNodeRef.current.disconnect();
      } catch (e) {}
      subNodeRef.current = null;
    }
    if (mainGainNodeRef.current) {
      mainGainNodeRef.current.disconnect();
      mainGainNodeRef.current = null;
    }
  };

  // Synchronize triggers of play state
  useEffect(() => {
    if (isPlaying) {
      startSynthesis();
      
      // Start Sequencer loop
      const stepDurationMs = (60 / beatsPerMinute / 2) * 1000; // eighth notes
      let curStep = 0;
      stepIntervalRef.current = window.setInterval(() => {
        curStep = (curStep + 1) % 8;
        setActiveStep(curStep);

        // Generate synthetic micro acoustic ping if note active on step (pitch variance)
        if (audioCtxRef.current && mainGainNodeRef.current) {
          const stepActive1 = matrixSquares[curStep];
          const stepActive2 = matrixSquares[curStep + 8];

          if (stepActive1 || stepActive2) {
            const ctx = audioCtxRef.current;
            const pingOsc = ctx.createOscillator();
            const pingGain = ctx.createGain();

            pingOsc.type = "triangle";
            pingOsc.frequency.setValueAtTime(
              stepActive1 ? carrierFreq * 1.5 : carrierFreq * 2.0, 
              ctx.currentTime
            );
            
            pingGain.gain.setValueAtTime(volume * 0.35, ctx.currentTime);
            // Exponential ramp release
            pingGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

            pingOsc.connect(pingGain);
            pingGain.connect(ctx.destination);

            pingOsc.start();
            pingOsc.stop(ctx.currentTime + 0.4);
          }
        }
      }, stepDurationMs);

      // Start Breathing Loop pacing cycle
      breathingIntervalRef.current = window.setInterval(() => {
        setBreathingTimer((prev) => {
          const limit = breathingStage === "HOLDING" ? 4 : 5; // seconds
          if (prev >= limit) {
            // Swap stage: INHALING (5s) -> HOLDING (4s) -> EXHALING (5s) -> INHALING...
            setBreathingStage((currentStage) => {
              if (currentStage === "INHALING") return "HOLDING";
              if (currentStage === "HOLDING") return "EXHALING";
              return "INHALING";
            });
            return 0;
          }
          return prev + 1;
        });
      }, 1000);

    } else {
      stopSynthesis();
      if (stepIntervalRef.current) {
        clearInterval(stepIntervalRef.current);
        stepIntervalRef.current = null;
      }
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
        breathingIntervalRef.current = null;
      }
    }

    return () => {
      stopSynthesis();
      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
      if (breathingIntervalRef.current) clearInterval(breathingIntervalRef.current);
    };
  }, [isPlaying, carrierFreq, volume, isMuted, beatsPerMinute, matrixSquares]);

  // Adjust frequencies on knob change
  useEffect(() => {
    if (carrierNodeRef.current && audioCtxRef.current) {
      carrierNodeRef.current.frequency.setValueAtTime(carrierFreq, audioCtxRef.current.currentTime);
    }
    if (subNodeRef.current && audioCtxRef.current) {
      subNodeRef.current.frequency.setValueAtTime(carrierFreq + 4.2, audioCtxRef.current.currentTime);
    }
  }, [carrierFreq]);

  // Adjust volume on slider change
  useEffect(() => {
    if (mainGainNodeRef.current && audioCtxRef.current) {
      mainGainNodeRef.current.gain.setValueAtTime(
        isMuted ? 0 : volume, 
        audioCtxRef.current.currentTime
      );
    }
  }, [volume, isMuted]);

  // Continuous animation of SVG wave form representing frequencies
  useEffect(() => {
    let t = 0;
    const animateWave = () => {
      t += 0.055;
      const width = 600;
      const height = 110;
      const midY = height / 2;
      const points = [];

      // Scale amplitude based on isPlaying and breathing pace
      let ampBase = isPlaying ? 22 : 6;
      if (isPlaying) {
        // Change amplitude following breathing phase (Inhaling increases amplitude, exhaling decreases)
        if (breathingStage === "INHALING") {
          ampBase = 15 + breathingTimer * 2.2;
        } else if (breathingStage === "HOLDING") {
          ampBase = 26;
        } else {
          ampBase = 26 - breathingTimer * 2.2;
        }
      }

      points.push(`M 0 ${midY}`);
      const segments = 120;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        const indexRatio = i / segments;
        // Edge dampening to keep waves pinned
        const envelope = Math.sin(indexRatio * Math.PI); 
        
        // Multi-frequency sinusoidal interference
        const yOffset = 
          Math.sin(i * 0.18 - t) * ampBase * envelope + 
          Math.sin(i * 0.08 + t * 1.8) * (ampBase * 0.35) * envelope;

        points.push(`L ${x} ${midY + yOffset}`);
      }

      setWavePoints(points.join(" "));
      waveAnimationFrameRef.current = requestAnimationFrame(animateWave);
    };

    waveAnimationFrameRef.current = requestAnimationFrame(animateWave);
    return () => {
      if (waveAnimationFrameRef.current) {
        cancelAnimationFrame(waveAnimationFrameRef.current);
      }
    };
  }, [isPlaying, breathingStage, breathingTimer]);

  const toggleSequencerSquare = (index) => {
    setMatrixSquares((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const selectFrequencyPreset = (freq) => {
    setCarrierFreq(freq);
  };

  return (
    <div className="w-full flex flex-col bg-[#0d1016] border border-[#1e293b] rounded-xl overflow-hidden shadow-2xl" id="audio-synthesizer-outer">
      {/* Wave Visualizer Box */}
      <div className="relative p-6 bg-[#040608] flex flex-col justify-center items-center border-b border-[#1e293b]/70 overflow-hidden" id="wave-stage">
        <div className="absolute top-3 left-4 flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-[#00f0ff]">
          <Radio className="w-3.5 h-3.5 animate-pulse" /> ACOUSTIC OSCIL_SCOPE
        </div>

        {/* Floating breathing helper */}
        <div className="absolute top-3 right-4 text-[10px] font-mono bg-slate-900/80 px-2 py-0.5 border border-[#1e293b] rounded-md text-slate-300">
          PACE: <span className="text-white font-bold">{breathingStage}</span> ({breathingTimer}s)
        </div>

        <svg width="100%" height="110" viewBox="0 0 600 110" preserveAspectRatio="none" className="max-w-2xl mt-4">
          {/* Echo Wave 1 */}
          <path
            d={wavePoints}
            fill="none"
            stroke="url(#purpleGlow)"
            strokeWidth="1.2"
            opacity="0.32"
          />
          {/* Active Wave 2 */}
          <path
            d={wavePoints}
            fill="none"
            stroke="url(#neonCyan)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          <defs>
            <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#05bcff" />
              <stop offset="50%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        {isPlaying && (
          <div className="text-[10px] font-mono text-slate-500 mt-2 flex items-center gap-1 animate-pulse">
            <Sparkles className="w-3 h-3 text-[#fcc419]" /> Deep Alpha-Wave Synthesis Active (432Hz Core Harmonics)
          </div>
        )}
      </div>

      {/* Sequencer step matrix boards */}
      <div className="p-4 bg-[#12161f] border-b border-[#1e293b] flex flex-col gap-3" id="sequencer-steps-section">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-400 tracking-wider">
            STEP_PING CONCEPTS MICRO-SEQUENCER
          </span>
          <span className="text-[10px] font-mono text-slate-500">
            Current Beats Multiplier: <span className="text-white">{beatsPerMinute} bpm</span>
          </span>
        </div>

        {/* Trigger matrix grid */}
        <div className="grid grid-cols-8 gap-1.5" id="step-grid-matrix">
          {/* Row 1 for High Pitch Pings */}
          {Array.from({ length: 8 }).map((_, stepIndex) => {
            const index = stepIndex;
            const isStepActive = matrixSquares[index];
            const isStepCurrentlyPlaying = activeStep === stepIndex && isPlaying;
            
            return (
              <button
                key={`grid-1-${stepIndex}`}
                onClick={() => toggleSequencerSquare(index)}
                className={`py-3 rounded transition-all flex flex-col items-center justify-center border ${
                  isStepActive
                    ? isStepCurrentlyPlaying
                      ? "bg-[#00f0ff] border-white text-black scale-105"
                      : "bg-[#00f0ff]/20 border-[#00f0ff]/60 text-[#00f0ff]"
                    : isStepCurrentlyPlaying
                    ? "bg-slate-700/60 border-slate-400 text-white"
                    : "bg-[#0d1016]/80 border-[#1e293b]/60 text-slate-600 hover:border-slate-700"
                }`}
              >
                <span className="font-mono text-[9px] font-bold">{stepIndex + 1}</span>
                <span className={`w-1 h-1 rounded-full mt-1 ${isStepActive ? "bg-[#00f0ff]" : "bg-transparent"}`} />
              </button>
            );
          })}

          {/* Row 2 for Mid Pitch Pings */}
          {Array.from({ length: 8 }).map((_, stepIndex) => {
            const index = stepIndex + 8;
            const isStepActive = matrixSquares[index];
            const isStepCurrentlyPlaying = activeStep === stepIndex && isPlaying;
            
            return (
              <button
                key={`grid-2-${stepIndex}`}
                onClick={() => toggleSequencerSquare(index)}
                className={`py-3 rounded transition-all flex flex-col items-center justify-center border ${
                  isStepActive
                    ? isStepCurrentlyPlaying
                      ? "bg-[#fcc419] border-white text-black scale-105"
                      : "bg-[#fcc419]/20 border-[#fcc419]/60 text-[#fcc419]"
                    : isStepCurrentlyPlaying
                    ? "bg-slate-700/60 border-slate-500 text-white"
                    : "bg-[#0d1016]/80 border-[#1e293b]/60 text-slate-600 hover:border-slate-700"
                }`}
              >
                <span className="font-mono text-[9px] font-bold">{stepIndex + 1}</span>
                <span className={`w-1 h-1 rounded-full mt-1 ${isStepActive ? "bg-[#fcc419]" : "bg-transparent"}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Synthesis Control Sliders & Knobs */}
      <div className="p-4 bg-[#12161f] grid grid-cols-1 md:grid-cols-4 gap-4 items-center" id="control-board">
        {/* Play Pause button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isPlaying
                ? "bg-[#f43f5e] hover:bg-rose-600 text-white shadow-lg"
                : "bg-[#00f0ff] hover:bg-[#00d0f0] text-black shadow-lg font-bold"
            }`}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-black" />}
          </button>
          <div>
            <div className="text-xs font-semibold uppercase text-slate-200">
              {isPlaying ? "STOP FREQ" : "START FREQ"}
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              AUDIO: {isPlaying ? "SYNTH_ACTIVE" : "STANDBY"}
            </div>
          </div>
        </div>

        {/* Carrier Pitch selection */}
        <div>
          <label className="text-[10px] font-mono tracking-wider text-slate-400 block mb-1">
            CARRIER CHORD: <span className="text-[#00f0ff] font-bold">{carrierFreq} Hz</span>
          </label>
          <div className="flex gap-1.5 flex-wrap">
            {[432, 528, 639, 741].map((f) => (
              <button
                key={f}
                onClick={() => selectFrequencyPreset(f)}
                className={`px-1.5 py-0.5 border text-[9px] font-mono rounded ${
                  carrierFreq === f 
                    ? "bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff] font-bold" 
                    : "border-[#1e293b] text-slate-400 hover:text-white"
                }`}
              >
                {f}Hz
              </button>
            ))}
          </div>
        </div>

        {/* Beats pacing speed dial */}
        <div>
          <label className="text-[10px] font-mono tracking-wider text-slate-400 block mb-1">
            BEATS TEMPO: <span className="text-[#fcc419] font-bold">{beatsPerMinute} bpm</span>
          </label>
          <input
            type="range"
            min="50"
            max="120"
            step="1"
            value={beatsPerMinute}
            onChange={(e) => setBeatsPerMinute(parseInt(e.target.value))}
            className="w-full h-1 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#fcc419] outline-none"
          />
        </div>

        {/* Volume setting layout */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 hover:bg-[#1e293b] rounded text-slate-400 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-slate-300" />}
          </button>
          <div className="flex-1">
            <span className="text-[9px] font-mono text-slate-400 block">DAMPING LEVEL</span>
            <input
              type="range"
              min="0.0"
              max="0.4"
              step="0.05"
              value={volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-full h-1 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#00f0ff] outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
