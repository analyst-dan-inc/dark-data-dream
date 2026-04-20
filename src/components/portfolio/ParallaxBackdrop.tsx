import { useEffect, useRef } from "react";

/**
 * Multi-layer parallax backdrop.
 * - Animated drifting grid
 * - Soft floating gradient orbs that respond to scroll + mouse
 * - Subtle starfield dots
 */
export function ParallaxBackdrop() {
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);
  const orb3 = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let mx = 0;
    let my = 0;
    let sy = 0;

    const apply = () => {
      if (orb1.current) {
        orb1.current.style.transform = `translate3d(${mx * 30}px, ${my * 30 - sy * 0.15}px, 0)`;
      }
      if (orb2.current) {
        orb2.current.style.transform = `translate3d(${-mx * 50}px, ${-my * 40 - sy * 0.25}px, 0)`;
      }
      if (orb3.current) {
        orb3.current.style.transform = `translate3d(${mx * 20}px, ${-sy * 0.08}px, 0)`;
      }
      if (grid.current) {
        grid.current.style.transform = `translate3d(${mx * 12}px, ${my * 12 - sy * 0.05}px, 0)`;
      }
    };

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    const onScroll = () => {
      sy = window.scrollY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* drifting grid */}
      <div ref={grid} className="absolute inset-[-10%] will-change-transform">
        <div className="grid-bg absolute inset-0 animate-drift" />
      </div>

      {/* floating orbs */}
      <div
        ref={orb1}
        className="absolute -left-32 top-[10%] h-[460px] w-[460px] rounded-full opacity-60 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.2 220 / 55%) 0%, transparent 65%)",
        }}
      />
      <div
        ref={orb2}
        className="absolute -right-24 top-[35%] h-[520px] w-[520px] rounded-full opacity-55 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle, oklch(0.5 0.22 290 / 50%) 0%, transparent 65%)",
        }}
      />
      <div
        ref={orb3}
        className="absolute left-[30%] bottom-[-10%] h-[420px] w-[420px] rounded-full opacity-40 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle, oklch(0.7 0.16 175 / 35%) 0%, transparent 65%)",
        }}
      />

      {/* tiny starfield */}
      <svg className="absolute inset-0 h-full w-full opacity-50">
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (i * 53) % 100;
          const y = (i * 89) % 100;
          const r = (i % 3) * 0.4 + 0.4;
          return (
            <circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r={r}
              fill="oklch(0.92 0.04 240)"
              opacity={0.3 + ((i * 7) % 50) / 100}
            />
          );
        })}
      </svg>

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, oklch(0.1 0.02 260 / 70%) 100%)",
        }}
      />
    </div>
  );
}
