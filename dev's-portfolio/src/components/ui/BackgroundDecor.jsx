import DotField from "../DotField";

export default function BackgroundDecor() {
  return (
    <>
      {/* Vertical architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-between px-6 sm:px-12 md:px-24 z-0 opacity-15">
        <div className="w-px h-full bg-slate-800" />
        <div className="w-px h-full bg-slate-800" />
        <div className="w-px h-full bg-slate-800 hidden md:block" />
        <div className="w-px h-full bg-slate-800 hidden lg:block" />
      </div>

      {/* Sky neon aura blob — top-left */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-sky-500/10 to-transparent rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Purple neon aura blob — mid-right */}
      <div className="absolute top-[40%] right-[-100px] w-[500px] h-[500px] bg-gradient-to-bl from-purple-500/5 to-transparent rounded-full blur-[110px] pointer-events-none z-0" />

      {/* DotField — fixed full-viewport canvas */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <DotField
          dotRadius={2.5}
          dotSpacing={16}
          bulgeStrength={80}
          glowRadius={160}
          sparkle={true}
          waveAmplitude={0.4}
          gradientFrom="rgba(168, 85, 247, 0.6)"
          gradientTo="rgba(56, 189, 248, 0.4)"
          glowColor="#0b0d11"
        />
      </div>
    </>
  );
}
