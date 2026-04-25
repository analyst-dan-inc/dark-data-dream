import { useCallback, useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Maximize2,
  RotateCcw,
  Sparkles,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { ProjectHotspot, SkillProject } from "./skills-data";

type ProjectShowcaseProps = {
  image: string;
  imageAlt: string;
  project: SkillProject;
};

const LENS_SIZE = 200; // px
const LENS_ZOOM = 2.5;

export function ProjectShowcase({ image, imageAlt, project }: ProjectShowcaseProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50, active: false });
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // zoom features
  const [lensActive, setLensActive] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [imageLightboxOpen, setImageLightboxOpen] = useState(false);
  const [pdfLightboxOpen, setPdfLightboxOpen] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      setSupportsHover(window.matchMedia("(hover: hover)").matches);
    }
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = frameRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const x = px / rect.width;
      const y = py / rect.height;

      if (lensActive) {
        // skip tilt while magnifying for accuracy
        setLensPos({ x: px, y: py });
        setTilt({ rx: 0, ry: 0, mx: x * 100, my: y * 100, active: true });
        return;
      }

      const ry = (x - 0.5) * 16;
      const rx = -(y - 0.5) * 12;
      setTilt({ rx, ry, mx: x * 100, my: y * 100, active: true });
    },
    [lensActive],
  );

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
            <div
              className={cn(
                "relative h-full w-full overflow-hidden rounded-[15px] bg-black/40 shadow-[0_40px_120px_-30px_var(--glow)]",
                lensActive && "cursor-zoom-in",
              )}
            >
              {/* image — fully visible, subtle parallax zoom on hover */}
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                draggable={false}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out",
                  !lensActive && "group-hover:scale-[1.03]",
                )}
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

              {/* magnifier lens */}
              {lensActive && tilt.active && supportsHover && (
                <div
                  className="pointer-events-none absolute z-30 rounded-full border-2 border-accent-cyan/70 shadow-[0_0_40px_-4px_var(--glow),inset_0_0_0_4px_oklch(0.16_0.02_260/40%)]"
                  style={{
                    width: LENS_SIZE,
                    height: LENS_SIZE,
                    left: lensPos.x - LENS_SIZE / 2,
                    top: lensPos.y - LENS_SIZE / 2,
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: `${LENS_ZOOM * 100}%`,
                    backgroundPosition: `${tilt.mx}% ${tilt.my}%`,
                  }}
                />
              )}

              {/* explore hint — bottom-right badge */}
              <div
                className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-background/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.3em] text-foreground/85 backdrop-blur-md"
                style={{ transform: "translateZ(60px)" }}
              >
                <Sparkles className="h-3 w-3 text-accent-cyan" />
                Explore the pins
              </div>

              {/* hotspots — numbered pins with smart-flipping captions */}
              {!lensActive &&
                hotspots.map((h, i) => (
                  <Hotspot
                    key={h.label}
                    hotspot={h}
                    index={i}
                    tilt={tilt}
                    isActive={activeHotspot === i}
                    anyActive={activeHotspot !== null}
                    onActivate={(v) => setActiveHotspot(v ? i : null)}
                  />
                ))}

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
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Featured project
              </div>
              <h3 className="mt-1 font-display text-lg font-semibold leading-tight">
                {project.name}
              </h3>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-[11px] uppercase tracking-[0.2em] text-accent-cyan">
                {project.role}
              </div>
              <div className="flex items-center gap-1.5">
                {supportsHover && (
                  <button
                    type="button"
                    onClick={() => setLensActive((v) => !v)}
                    aria-label={lensActive ? "Disable magnifier" : "Enable magnifier"}
                    title={lensActive ? "Disable magnifier" : "Magnifier"}
                    className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground/85 transition-all duration-300 hover:scale-105 hover:border-accent-cyan/50 hover:bg-white/10 hover:text-foreground hover:shadow-[0_0_20px_-4px_var(--glow)]",
                      lensActive && "border-accent-cyan/60 bg-accent-cyan/10 text-accent-cyan",
                    )}
                  >
                    {lensActive ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setImageLightboxOpen(true)}
                  aria-label="Open fullscreen"
                  title="Open fullscreen"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground/85 transition-all duration-300 hover:scale-105 hover:border-accent-cyan/50 hover:bg-white/10 hover:text-foreground hover:shadow-[0_0_20px_-4px_var(--glow)]"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>
              </div>
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

          {project.pdfUrl && (
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setPdfLightboxOpen(true)}
                className="group/pdf relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-accent-cyan/40 bg-gradient-to-r from-accent-cyan/15 to-accent-violet/15 px-4 py-2 text-xs font-medium text-foreground/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-cyan/70 hover:text-foreground hover:shadow-[0_10px_30px_-10px_var(--glow)]"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent transition-transform duration-700 ease-out group-hover/pdf:translate-x-full" />
                <FileText className="relative h-3.5 w-3.5 text-accent-cyan" />
                <span className="relative">{project.pdfLabel ?? "Preview the PDF"}</span>
                <span className="relative text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  · 5 pages
                </span>
              </button>
              <a
                href={project.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-foreground/75 transition hover:border-white/20 hover:bg-white/10 hover:text-foreground"
              >
                <ExternalLink className="h-3 w-3" />
                Open in new tab
              </a>
            </div>
          )}
        </div>
      </div>

      {/* image lightbox */}
      <ImageLightbox
        open={imageLightboxOpen}
        onOpenChange={setImageLightboxOpen}
        image={image}
        imageAlt={imageAlt}
        title={project.name}
        hotspots={hotspots}
      />

      {/* pdf lightbox */}
      {project.pdfUrl && (
        <PdfLightbox
          open={pdfLightboxOpen}
          onOpenChange={setPdfLightboxOpen}
          src={project.pdfUrl}
          title={project.name}
        />
      )}
    </div>
  );
}

/* ------------------------------ Hotspot ------------------------------ */

type HotspotProps = {
  hotspot: ProjectHotspot;
  index: number;
  tilt: { rx: number; ry: number; mx: number; my: number; active: boolean };
  isActive: boolean;
  anyActive: boolean;
  onActivate: (v: boolean) => void;
};

function Hotspot({ hotspot: h, index: i, tilt, isActive, anyActive, onActivate }: HotspotProps) {
  const depth = h.depth ?? 0.5;
  const offsetX = (tilt.mx - 50) * 0.4 * depth;
  const offsetY = (tilt.my - 50) * 0.4 * depth;
  const z = 30 + depth * 80;
  const flipX = h.x > 65 ? "right" : h.x < 35 ? "left" : "center";
  const flipY = h.y > 70 ? "top" : "bottom";
  const tooltipPos = flipY === "top" ? "bottom-full mb-3" : "top-full mt-3";
  const tooltipAlign =
    flipX === "right"
      ? "right-0 translate-x-0"
      : flipX === "left"
      ? "left-0 translate-x-0"
      : "left-1/2 -translate-x-1/2";
  return (
    <div
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
      onMouseEnter={() => onActivate(true)}
      onMouseLeave={() => onActivate(false)}
    >
      <button
        type="button"
        aria-label={h.label}
        aria-expanded={isActive}
        onClick={() => onActivate(!isActive)}
        className="group/dot relative flex h-7 w-7 items-center justify-center"
      >
        <span
          className={cn(
            "absolute inset-0 rounded-full border border-accent-cyan/40 transition-all duration-500",
            isActive
              ? "scale-150 border-accent-cyan/70 opacity-100"
              : "scale-100 opacity-60 group-hover/dot:scale-125 group-hover/dot:opacity-100",
          )}
        />
        <span
          className={cn(
            "absolute inline-flex h-5 w-5 rounded-full bg-accent-cyan/50 transition-opacity duration-300",
            anyActive ? "opacity-0" : "opacity-100 animate-ping",
          )}
        />
        <span
          className={cn(
            "relative inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold tabular-nums text-background ring-2 ring-background/80 shadow-[0_0_22px_var(--glow)] transition-all duration-300",
            isActive
              ? "scale-110 bg-gradient-to-br from-accent-cyan to-accent-violet text-background"
              : "bg-accent-cyan group-hover/dot:scale-110 group-hover/dot:bg-gradient-to-br group-hover/dot:from-accent-cyan group-hover/dot:to-accent-violet",
          )}
        >
          {i + 1}
        </span>
      </button>

      <div
        className={cn(
          "pointer-events-none absolute z-50 w-60 rounded-xl border border-white/15 bg-background/90 px-3.5 py-2.5 text-left shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300",
          tooltipPos,
          tooltipAlign,
          isActive
            ? "translate-y-0 scale-100 opacity-100"
            : `${flipY === "top" ? "translate-y-1" : "-translate-y-1"} scale-95 opacity-0`,
        )}
      >
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
}

/* ----------------------------- Image Lightbox ----------------------------- */

type ImageLightboxProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  image: string;
  imageAlt: string;
  title: string;
  hotspots: ProjectHotspot[];
};

function ImageLightbox({
  open,
  onOpenChange,
  image,
  imageAlt,
  title,
  hotspots,
}: ImageLightboxProps) {
  const { zoom, offset, dragging, setZoom, reset, onWheel, onMouseDown, onMouseMove, onMouseUp } =
    useZoomPan({ min: 1, max: 4, step: 0.25 });
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  useEffect(() => {
    if (!open) setActiveHotspot(null);
  }, [open]);

  // reset whenever opened/closed
  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  // keyboard shortcuts
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(4, +(z + 0.25).toFixed(2)));
      else if (e.key === "-" || e.key === "_") setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)));
      else if (e.key === "0") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, reset, setZoom]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="grid h-[95vh] max-h-none w-[95vw] max-w-none grid-rows-[auto_1fr] gap-0 border-white/10 bg-background/95 p-0 backdrop-blur-2xl"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <ZoomToolbar
          zoom={zoom}
          onZoomIn={() => setZoom((z) => Math.min(4, +(z + 0.25).toFixed(2)))}
          onZoomOut={() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
          onReset={reset}
          onClose={() => onOpenChange(false)}
          label={title}
        />
        <div
          className={cn(
            "relative overflow-hidden bg-black/70 select-none",
            zoom > 1 ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in",
          )}
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onClick={() => {
            if (zoom === 1) setZoom(2);
          }}
        >
          <div
            className="relative h-full w-full transition-transform duration-150 ease-out"
            style={{
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`,
              transformOrigin: "center center",
            }}
          >
            <img
              src={image}
              alt={imageAlt}
              draggable={false}
              className="h-full w-full object-contain"
            />
            {/* hotspots overlay — interactive, counter-scaled to stay readable */}
            <div className="absolute inset-0">
              {hotspots.map((h, i) => {
                const isActive = activeHotspot === i;
                const flipX = h.x > 65 ? "right" : h.x < 35 ? "left" : "center";
                const flipY = h.y > 70 ? "top" : "bottom";
                const tooltipPos = flipY === "top" ? "bottom-full mb-3" : "top-full mt-3";
                const tooltipAlign =
                  flipX === "right"
                    ? "right-0"
                    : flipX === "left"
                    ? "left-0"
                    : "left-1/2 -translate-x-1/2";
                return (
                  <div
                    key={h.label}
                    className="absolute"
                    style={{
                      left: `${h.x}%`,
                      top: `${h.y}%`,
                      transform: `translate(-50%, -50%) scale(${1 / zoom})`,
                      transformOrigin: "center center",
                      zIndex: isActive ? 50 : 10,
                    }}
                  >
                    <button
                      type="button"
                      aria-label={h.label}
                      aria-expanded={isActive}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(isActive ? null : i);
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      className="relative flex h-7 w-7 items-center justify-center"
                    >
                      <span
                        className={cn(
                          "absolute inset-0 rounded-full border border-accent-cyan/40 transition-all duration-300",
                          isActive ? "scale-150 border-accent-cyan/70 opacity-100" : "opacity-60",
                        )}
                      />
                      <span
                        className={cn(
                          "relative inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold tabular-nums text-background ring-2 ring-background/80 shadow-[0_0_22px_var(--glow)] transition-all duration-300",
                          isActive
                            ? "scale-110 bg-gradient-to-br from-accent-cyan to-accent-violet"
                            : "bg-accent-cyan",
                        )}
                      >
                        {i + 1}
                      </span>
                    </button>
                    <div
                      className={cn(
                        "pointer-events-none absolute z-50 w-60 rounded-xl border border-white/15 bg-background/95 px-3.5 py-2.5 text-left shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300",
                        tooltipPos,
                        tooltipAlign,
                        isActive
                          ? "translate-y-0 scale-100 opacity-100"
                          : `${flipY === "top" ? "translate-y-1" : "-translate-y-1"} scale-95 opacity-0`,
                      )}
                    >
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
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ----------------------------- PDF Lightbox ----------------------------- */

type PdfLightboxProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  src: string;
  title: string;
};

function PdfLightbox({ open, onOpenChange, src, title }: PdfLightboxProps) {
  const { zoom, offset, dragging, setZoom, reset, onWheel, onMouseDown, onMouseMove, onMouseUp } =
    useZoomPan({ min: 1, max: 3, step: 0.25 });

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)));
      else if (e.key === "-" || e.key === "_") setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)));
      else if (e.key === "0") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, reset, setZoom]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="grid h-[95vh] max-h-none w-[95vw] max-w-none grid-rows-[auto_1fr_auto] gap-0 border-white/10 bg-background/95 p-0 backdrop-blur-2xl"
      >
        <DialogTitle className="sr-only">{title} — PDF preview</DialogTitle>
        <ZoomToolbar
          zoom={zoom}
          onZoomIn={() => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)))}
          onZoomOut={() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
          onReset={reset}
          onClose={() => onOpenChange(false)}
          label={title}
          extraAction={
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-foreground/80 transition hover:border-accent-cyan/50 hover:bg-white/10 hover:text-foreground"
            >
              <ExternalLink className="h-3 w-3" />
              Open in new tab
            </a>
          }
        />
        <div
          className={cn(
            "relative overflow-hidden bg-black/70",
            zoom > 1 && (dragging ? "cursor-grabbing" : "cursor-grab"),
          )}
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div
            className="relative h-full w-full transition-transform duration-150 ease-out"
            style={{
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`,
              transformOrigin: "center center",
            }}
          >
            <iframe
              src={`${src}#toolbar=0&view=FitH`}
              title={`${title} — PDF`}
              className={cn(
                "h-full w-full border-0 bg-white",
                // While dragging at zoom > 1, disable iframe pointer events so drag works on the wrapper
                zoom > 1 && "pointer-events-none",
              )}
            />
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 bg-background/80 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>Preview limited to the first 5 pages</span>
          <span>Wheel · drag · + / − / 0</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ----------------------------- Zoom toolbar ----------------------------- */

function ZoomToolbar({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
  onClose,
  label,
  extraAction,
}: {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onClose: () => void;
  label: string;
  extraAction?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-background/80 px-4 py-2.5">
      <div className="min-w-0 truncate font-display text-sm font-medium text-foreground/90">
        {label}
      </div>
      <div className="flex items-center gap-1.5">
        {extraAction}
        <ToolbarButton onClick={onZoomOut} aria-label="Zoom out" title="Zoom out (−)">
          <ZoomOut className="h-4 w-4" />
        </ToolbarButton>
        <span className="min-w-[3.5rem] text-center text-[11px] tabular-nums text-muted-foreground">
          {Math.round(zoom * 100)}%
        </span>
        <ToolbarButton onClick={onZoomIn} aria-label="Zoom in" title="Zoom in (+)">
          <ZoomIn className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={onReset} aria-label="Reset zoom" title="Reset (0)">
          <RotateCcw className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={onClose} aria-label="Close" title="Close (Esc)">
          <X className="h-4 w-4" />
        </ToolbarButton>
      </div>
    </div>
  );
}

function ToolbarButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground/85 transition hover:border-accent-cyan/50 hover:bg-white/10 hover:text-foreground",
        props.className,
      )}
    >
      {children}
    </button>
  );
}

/* ----------------------------- useZoomPan hook ----------------------------- */

function useZoomPan({ min, max, step }: { min: number; max: number; step: number }) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ mx: number; my: number; ox: number; oy: number } | null>(null);

  const reset = useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setDragging(false);
    dragStart.current = null;
  }, []);

  const onWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      // Only intercept when modifier OR when wheel is large — keep it simple: always intercept
      e.preventDefault();
      const dir = e.deltaY > 0 ? -1 : 1;
      setZoom((z) => {
        const next = +(z + dir * step).toFixed(2);
        return Math.max(min, Math.min(max, next));
      });
    },
    [min, max, step],
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (zoom <= 1) return;
      setDragging(true);
      dragStart.current = {
        mx: e.clientX,
        my: e.clientY,
        ox: offset.x,
        oy: offset.y,
      };
    },
    [zoom, offset.x, offset.y],
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!dragging || !dragStart.current) return;
      const dx = e.clientX - dragStart.current.mx;
      const dy = e.clientY - dragStart.current.my;
      setOffset({ x: dragStart.current.ox + dx, y: dragStart.current.oy + dy });
    },
    [dragging],
  );

  const onMouseUp = useCallback(() => {
    setDragging(false);
    dragStart.current = null;
  }, []);

  // clamp offset back toward 0 when zoom returns to 1
  useEffect(() => {
    if (zoom === 1) setOffset({ x: 0, y: 0 });
  }, [zoom]);

  return {
    zoom,
    offset,
    dragging,
    setZoom,
    reset,
    onWheel,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
}
