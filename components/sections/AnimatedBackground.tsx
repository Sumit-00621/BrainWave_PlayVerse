"use client";

/**
 * The page's signature visual element: a faint radar-grid that suggests
 * the app is "scanning" the game universe on your behalf, with a slow
 * sweep line and two drifting color orbs (nova violet / circuit cyan).
 * Fixed + behind everything, pointer-events disabled so it never blocks
 * interaction. Respects reduced-motion by relying on Tailwind's animate
 * classes only (no reduced-motion override needed since the motion here
 * is ambient, not essential to understanding content).
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void-950"
    >
      {/* base grid */}
      <div className="absolute inset-0 bg-grid-scan bg-grid-cell opacity-40" />

      {/* radar sweep */}
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden">
        <div className="h-64 w-full animate-scan-sweep bg-gradient-to-b from-nova-500/10 via-nova-500/5 to-transparent" />
      </div>

      {/* drifting glow orbs */}
      <div className="absolute -left-32 top-1/4 h-96 w-96 animate-float rounded-full bg-nova-500/20 blur-[100px]" />
      <div
        className="absolute -right-32 top-1/2 h-96 w-96 animate-float rounded-full bg-circuit-500/15 blur-[110px]"
        style={{ animationDelay: "-3s" }}
      />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-pulse-glow rounded-full bg-flare-500/10 blur-[100px]" />

      {/* vignette so content stays readable at the edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-950 via-transparent to-void-950" />
    </div>
  );
}
