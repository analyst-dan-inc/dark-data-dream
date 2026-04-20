import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DataVizIllustration,
  ETLIllustration,
  ProgrammingIllustration,
  ReportingIllustration,
} from "./SkillIllustrations";

/**
 * Skills data — edit name / description here to customize.
 */
type Skill = {
  id: string;
  name: string;
  description: string;
  Illustration: () => JSX.Element;
};

const SKILLS: Skill[] = [
  {
    id: "dataviz",
    name: "Data Visualization",
    description:
      "Translating complex datasets into clear, decision-ready visuals — dashboards, charts and narrative reports that make patterns obvious at a glance.",
    Illustration: DataVizIllustration,
  },
  {
    id: "reporting",
    name: "Reporting",
    description:
      "Building automated, stakeholder-tuned reports with the right KPIs, drill-downs and commentary to turn raw numbers into weekly business signal.",
    Illustration: ReportingIllustration,
  },
  {
    id: "etl",
    name: "ETL",
    description:
      "Designing reliable extract-transform-load pipelines that consolidate sources, enforce quality and deliver clean, modeled data downstream.",
    Illustration: ETLIllustration,
  },
  {
    id: "programming",
    name: "Data Programming",
    description:
      "Hands-on with NoSQL, Python, Excel and Power BI — querying, modeling and scripting end-to-end analytical workflows.",
    Illustration: ProgrammingIllustration,
  },
];

function SkillCard({
  skill,
  isActive,
}: {
  skill: Skill;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current || !isActive) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setTilt({
      rx: (0.5 - y) * 8,
      ry: (x - 0.5) * 10,
      gx: x * 100,
      gy: y * 100,
    });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const { Illustration } = skill;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "group relative h-full w-full transition-all duration-700",
        isActive ? "scale-100 opacity-100" : "scale-90 opacity-40 blur-[1px]",
      )}
      style={{
        transform: isActive
          ? `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
          : undefined,
        transformStyle: "preserve-3d",
        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease",
      }}
    >
      {/* gradient border wrapper */}
      <div
        className={cn(
          "relative h-full rounded-[28px] p-[1px] transition-shadow duration-500",
          isActive ? "shadow-[0_30px_80px_-30px_oklch(0_0_0/70%)]" : "",
        )}
        style={{
          background:
            "linear-gradient(135deg, oklch(0.82 0.13 200 / 55%) 0%, oklch(1 0 0 / 6%) 45%, oklch(0.7 0.18 285 / 55%) 100%)",
        }}
      >
        <div className="glass-panel relative flex h-full flex-col overflow-hidden rounded-[27px]">
          {/* cursor-reactive glow */}
          {isActive && (
            <div
              className="pointer-events-none absolute inset-0 opacity-70 transition-opacity"
              style={{
                background: `radial-gradient(420px circle at ${tilt.gx}% ${tilt.gy}%, oklch(0.82 0.13 200 / 18%), transparent 60%)`,
              }}
            />
          )}

          {/* top illustration area */}
          <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="relative h-full w-full p-4">
              <Illustration />
            </div>
            {/* shine */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(1 0 0 / 35%), transparent)",
              }}
            />
          </div>

          {/* content */}
          <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-1 w-1 rounded-full bg-accent-cyan animate-pulse-glow" />
              Skill
            </div>
            <h3 className="font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
              {skill.name}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              {skill.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillsCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: false,
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback(
    (i: number) => embla?.scrollTo(i),
    [embla],
  );
  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    onSelect();
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollPrev, scrollNext]);

  return (
    <div className="relative w-full">
      {/* arrows */}
      <button
        type="button"
        aria-label="Previous skill"
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 z-20 -translate-x-2 -translate-y-1/2 sm:-translate-x-6"
      >
        <span className="glass-panel flex h-11 w-11 items-center justify-center rounded-full text-foreground/80 transition hover:text-foreground hover:scale-105">
          <ChevronLeft className="h-5 w-5" />
        </span>
      </button>
      <button
        type="button"
        aria-label="Next skill"
        onClick={scrollNext}
        className="absolute right-0 top-1/2 z-20 translate-x-2 -translate-y-1/2 sm:translate-x-6"
      >
        <span className="glass-panel flex h-11 w-11 items-center justify-center rounded-full text-foreground/80 transition hover:text-foreground hover:scale-105">
          <ChevronRight className="h-5 w-5" />
        </span>
      </button>

      <div className="overflow-hidden px-2 sm:px-6" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.id}
              className="relative min-w-0 shrink-0 grow-0 basis-[88%] px-2 sm:basis-[78%] sm:px-3 md:basis-[70%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SKILLS.length}`}
            >
              <div className="aspect-[5/6] sm:aspect-[16/11]">
                <SkillCard skill={skill} isActive={i === selected} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {SKILLS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Go to ${s.name}`}
            onClick={() => scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === selected
                ? "w-8 bg-accent-cyan shadow-[0_0_12px_oklch(0.82_0.13_200/70%)]"
                : "w-2 bg-white/20 hover:bg-white/40",
            )}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground/70">
        Swipe · drag · or use ← →
      </p>
    </div>
  );
}
