export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Rich dark plum-violet base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(155deg, #160B30 0%, #0E0720 48%, #150C26 100%)',
        }}
      />

      {/* Vivid royal purple aurora wash (top-left) */}
      <div
        className="absolute -top-32 -left-24 w-[540px] h-[500px] rounded-full opacity-75 blur-[105px]"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.55), rgba(124, 58, 237, 0.22) 55%, transparent 78%)',
        }}
      />

      {/* Sunlit yellow-gold aurora wash (top-right) */}
      <div
        className="absolute -top-20 -right-20 w-[440px] h-[440px] rounded-full opacity-65 blur-[105px]"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(250, 204, 21, 0.38), rgba(245, 158, 11, 0.16) 55%, transparent 78%)',
        }}
      />

      {/* Mid-page dual purple-yellow spotlight behind the Linktree stack */}
      <div
        className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[420px] rounded-full opacity-45 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle at 35% 50%, rgba(168, 85, 247, 0.35), rgba(250, 204, 21, 0.22) 60%, transparent 80%)',
        }}
      />

      {/* Bottom warm amber-yellow & purple glow */}
      <div
        className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-[660px] h-[400px] rounded-full opacity-60 blur-[110px]"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(250, 204, 21, 0.28), rgba(124, 58, 237, 0.32) 55%, transparent 80%)',
        }}
      />

      {/* Subtle golden-violet dot grid */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(253, 224, 71, 0.32) 1px, transparent 0)',
          backgroundSize: '26px 26px',
          maskImage:
            'radial-gradient(ellipse 80% 75% at 50% 45%, black 35%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 75% at 50% 45%, black 35%, transparent 100%)',
        }}
      />

      {/* Vibrant purple & yellow floating glass shapes on desktop */}
      <div className="hidden lg:block">
        <div className="animate-float-slow absolute top-[16%] left-[11%] xl:left-[16%] w-28 h-28 rounded-3xl border border-purple-400/30 bg-purple-500/15 backdrop-blur-md rotate-12 shadow-lg shadow-purple-900/30" />
        <div className="animate-float-reverse absolute bottom-[20%] right-[10%] xl:right-[15%] w-32 h-32 rounded-[2rem] border border-amber-300/35 bg-amber-400/12 backdrop-blur-md -rotate-12 shadow-lg shadow-amber-900/20" />
        <div className="animate-float-reverse absolute top-[32%] right-[15%] xl:right-[20%] w-12 h-12 rounded-2xl border border-amber-300/40 bg-amber-400/15 rotate-45" />
        <div className="animate-float-slow absolute bottom-[28%] left-[15%] xl:left-[20%] w-14 h-14 rounded-full border border-purple-300/35 bg-purple-500/15" />
      </div>
    </div>
  );
}
