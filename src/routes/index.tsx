import { createFileRoute } from "@tanstack/react-router";
import { ParallaxBackdrop } from "@/components/portfolio/ParallaxBackdrop";
import { SkillsCarousel } from "@/components/portfolio/SkillsCarousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Data Analyst Portfolio — Skills Showcase" },
      {
        name: "description",
        content:
          "Dark, futuristic portfolio of a data analyst — Data Viz, Reporting, ETL and Data Programming, presented as an interactive glassmorphic carousel.",
      },
      { property: "og:title", content: "Data Analyst Portfolio — Skills Showcase" },
      {
        property: "og:description",
        content:
          "Interactive showcase of a data analyst's core skills: Data Visualization, Reporting, ETL, and Data Programming.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden text-foreground">
      <ParallaxBackdrop />

      {/* top nav strip */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <div className="flex items-center gap-2.5 animate-fade-up">
          <div className="relative h-7 w-7">
            <div className="absolute inset-0 rounded-md border border-accent-cyan/60" />
            <div className="absolute inset-1 rounded-sm bg-accent-cyan/30 animate-pulse-glow" />
          </div>
          <span className="font-display text-sm font-semibold tracking-wider">
            ALEX · DATA
          </span>
        </div>
        <div className="hidden items-center gap-6 text-xs uppercase tracking-[0.25em] text-muted-foreground sm:flex animate-fade-up">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
            Available for projects
          </span>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-16 pt-6 sm:px-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:pt-12">
        {/* Left — intro */}
        <div className="flex flex-col justify-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground backdrop-blur">
              <span className="h-1 w-1 rounded-full bg-accent-cyan animate-pulse-glow" />
              Portfolio · v2026
            </div>
          </div>

          <h1
            className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="block text-foreground/95">Data, distilled</span>
            <span className="block text-gradient">into decisions.</span>
          </h1>

          <p
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            I'm a <span className="text-foreground">Data Analyst</span> turning messy
            sources into clear dashboards, reliable pipelines and reports stakeholders
            actually read. Explore my core skills →
          </p>

          <div
            className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:scale-[1.02]"
            >
              Get in touch
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* metrics row */}
          <div
            className="mt-10 grid max-w-md grid-cols-3 gap-4 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { v: "5+", l: "Years" },
              { v: "40+", l: "Dashboards" },
              { v: "12", l: "Industries" },
            ].map((m) => (
              <div key={m.l} className="glass-panel rounded-2xl px-4 py-3">
                <div className="font-display text-2xl font-semibold text-foreground">
                  {m.v}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {m.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Carousel */}
        <div
          id="skills"
          className="relative flex items-center animate-fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          <SkillsCarousel />
        </div>
      </section>

      {/* footer */}
      <footer
        id="contact"
        className="relative z-10 mt-8 border-t border-white/5"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center sm:px-10">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            © 2026 · Alex · Data Analyst
          </div>
          <div className="flex items-center gap-5 text-sm">
            <a
              href="mailto:hello@example.com"
              className="text-foreground/80 transition hover:text-foreground"
            >
              hello@example.com
            </a>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-foreground/80 transition hover:text-foreground"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
