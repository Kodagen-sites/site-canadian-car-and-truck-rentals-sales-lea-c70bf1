"use client";

// Procedural motion-bg "breather" section — beam-rays pattern.
// CSS-only, no images, no videos, no 3D. Respects prefers-reduced-motion.
// Per the variation manifest: motion_bg_pattern=beam-rays, density=subtle (1 per page).

export default function MotionBeam({ children }: { children?: React.ReactNode }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "50vh" }}
      aria-hidden={!children ? "true" : undefined}
    >
      <div className="absolute inset-0 bg-graphite" />
      <div
        className="absolute inset-0 opacity-90 animate-beam-rays"
        style={{
          background:
            "conic-gradient(from 220deg at 50% 110%, transparent 0%, rgba(255,170,64,0.18) 12%, transparent 22%, rgba(255,170,64,0.10) 35%, transparent 50%, rgba(255,170,64,0.16) 65%, transparent 78%, rgba(255,170,64,0.08) 90%, transparent 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-graphite via-graphite/40 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-graphite to-transparent" />

      {children && (
        <div className="relative container-text py-24 text-center">
          {children}
        </div>
      )}
    </section>
  );
}
