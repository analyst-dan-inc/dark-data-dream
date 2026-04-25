import { useCallback, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import type { SkillProject } from "./skills-data";

type ProjectShowcaseProps = {
  image: string;
  imageAlt: string;
  project: SkillProject;
};

export function ProjectShowcase({ image, imageAlt, project }: ProjectShowcaseProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50, active: false });
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    // tilt range ±8deg
    const ry = (x - 0.5) * 16;
    const rx = -(y - 0.5) * 12;
    setTilt({ rx, ry, mx: x * 100, my: y * 100, active: true });
  }, []);

  const handleLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50, active: false });
    setActiveHotspot(null);
  }, []);

  const hotspots = project.hotspots ?? [];

  return (
    <div className="flex h-full w-full flex-col gap-6">
      {/* tilt + parallax stage */}
      <div
        ref={frameRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative w-full"
        style={{ perspective: "1400px" }}
      >
        <div
          className="relative aspect-[16/10] w-full overflow-visible transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* gradient frame */}
          <div
            className="absolute inset-0 rounded-2xl p-[1px]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.82 0.13 200 / 70%) 0%, oklch(1 0 0 / 8%) 50%, oklch(0.7 0.18 285 / 70%) 100%)",
              transform: "translateZ(0px)",
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[15px] bg-black/40 shadow-[0_40px_120px_-30px_var(--glow)]">
              {/* image — fully visible, subtle parallax zoom on hover */}
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                style={{ transform: "translateZ(0px)" }}
              />
              {/* dynamic light sweep follows cursor */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, oklch(0.82 0.13 200 / 18%), transparent 50%)`,
                }}
              />
              {/* very light tint to keep brand cohesion — never blurs the image */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-accent-cyan/5 via-transparent to-accent-violet/10 mix-blend-screen" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

              {/* explore hint — bottom-right badge */}
              <div
                className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-background/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.3em] text-foreground/85 backdrop-blur-md"
                style={{ transform: "translateZ(60px)" }}
              >
                <Sparkles className="h-3 w-3 text-accent-cyan" />
                Explore the pins
              </div>

              {/* hotspots — numbered pins with smart-flipping captions */}
              {hotspots.map((h, i) => {
                const depth = h.depth ?? 0.5;
                const offsetX = (tilt.mx - 50) * 0.4 * depth;
                const offsetY = (tilt.my - 50) * 0.4 * depth;
                const z = 30 + depth * 80;
                const isActive = activeHotspot === i;
                const anyActive = activeHotspot !== null;
                // smart flip — keep tooltip inside frame
                const flipX = h.x > 65 ? "right" : h.x < 35 ? "left" : "center";
                const flipY = h.y > 70 ? "top" : "bottom";
                const tooltipPos =
                  flipY === "top"
                    ? "bottom-full mb-3"
                    : "top-full mt-3";
                const tooltipAlign =
                  flipX === "right"
                    ? "right-0 translate-x-0"
                    : flipX === "left"
                    ? "left-0 translate-x-0"
                    : "left-1/2 -translate-x-1/2";
                return (
                  <div
                    key={h.label}
                    className="pointer-events-auto absolute"
                    style={{
                      left: `${h.x}%`,
                      top: `${h.y}%`,
                      transform: `translate(-50%, -50%) translate3d(${offsetX}px, ${offsetY}px, ${z}px)`,
                      transition: tilt.active
                        ? "opacity 400ms ease-out"
                        : "transform 500ms ease-out, opacity 400ms ease-out",
                      zIndex: isActive ? 50 : 10,
                    }}
                    onMouseEnter={() => setActiveHotspot(i)}
                    onMouseLeave={() => setActiveHotspot(null)}
                  >
                    <button
                      type="button"
                      aria-label={h.label}
                      aria-expanded={isActive}
                      onClick={() => setActiveHotspot(isActive ? null : i)}
                      className="group/dot relative flex h-7 w-7 items-center justify-center"
                    >
                      {/* outer halo ring */}
                      <span
                        className={`absolute inset-0 rounded-full border border-accent-cyan/40 transition-all duration-500 ${
                          isActive
                            ? "scale-150 border-accent-cyan/70 opacity-100"
                            : "scale-100 opacity-60 group-hover/dot:scale-125 group-hover/dot:opacity-100"
                        }`}
                      />
                      {/* pulsing ping — hide when active or another active to reduce noise */}
                      <span
                        className={`absolute inline-flex h-5 w-5 rounded-full bg-accent-cyan/50 transition-opacity duration-300 ${
                          anyActive ? "opacity-0" : "opacity-100 animate-ping"
                        }`}
                      />
                      {/* core pin with number */}
                      <span
                        className={`relative inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold tabular-nums text-background ring-2 ring-background/80 shadow-[0_0_22px_var(--glow)] transition-all duration-300 ${
                          isActive
                            ? "scale-110 bg-gradient-to-br from-accent-cyan to-accent-violet text-background"
                            : "bg-accent-cyan group-hover/dot:scale-110 group-hover/dot:bg-gradient-to-br group-hover/dot:from-accent-cyan group-hover/dot:to-accent-violet"
                        }`}
                      >
                        {i + 1}
                      </span>
                    </button>

                    {/* tooltip — flipped to stay inside frame */}
                    <div
                      className={`pointer-events-none absolute z-50 w-60 ${tooltipPos} ${tooltipAlign} rounded-xl border border-white/15 bg-background/90 px-3.5 py-2.5 text-left shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 ${
                        isActive
                          ? "translate-y-0 scale-100 opacity-100"
                          : `${flipY === "top" ? "translate-y-1" : "-translate-y-1"} scale-95 opacity-0`
                      }`}
                    >
                      {/* gradient edge */}
                      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-violet/10" />
                      <div className="relative flex items-center gap-2">
                        <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-cyan to-accent-violet text-[9px] font-semibold text-background">
                          {i + 1}
                        </span>
                        <div className="text-[10px] uppercase tracking-[0.25em] text-accent-cyan">
                          {h.label}
                        </div>
                      </div>
                      <div className="relative mt-1.5 text-xs leading-relaxed text-foreground/90">
                        {h.detail}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* floating glow corners — parallax depth */}
              <div
                className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-accent-cyan/30 blur-3xl"
                style={{
                  transform: `translate3d(${(tilt.mx - 50) * -0.3}px, ${(tilt.my - 50) * -0.3}px, 40px)`,
                  transition: "transform 500ms ease-out",
                }}
              />
              <div
                className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-accent-violet/30 blur-3xl"
                style={{
                  transform: `translate3d(${(tilt.mx - 50) * -0.4}px, ${(tilt.my - 50) * -0.4}px, 30px)`,
                  transition: "transform 500ms ease-out",
                }}
              />
            </div>
          </div>
        </div>

        {/* drop shadow plane underneath */}
        <div
          className="pointer-events-none absolute inset-x-8 -bottom-6 h-12 rounded-full bg-black/60 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
          style={{ opacity: 0.5 }}
        />
      </div>

      {/* project caption */}
      <div className="glass-panel relative overflow-hidden rounded-2xl px-5 py-4">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/5 via-transparent to-accent-violet/5" />
        <div className="relative flex flex-col gap-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Featured project
              </div>
              <h3 className="mt-1 font-display text-lg font-semibold leading-tight">
                {project.name}
              </h3>
            </div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-accent-cyan">
              {project.role}
            </div>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            {project.context}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-foreground/85"
              >
                {s}
              </span>
            ))}
          </div>

          <ul className="grid gap-1.5">
            {project.outcomes.map((o) => (
              <li
                key={o}
                className="flex items-start gap-2 text-xs text-foreground/85"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-violet" />
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
