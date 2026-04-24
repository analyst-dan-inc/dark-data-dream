import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ParallaxBackdrop } from "@/components/portfolio/ParallaxBackdrop";
import { SKILLS, getSkillBySlug } from "@/components/portfolio/skills-data";

export const Route = createFileRoute("/skills/$slug")({
  loader: ({ params }) => {
    const skill = getSkillBySlug(params.slug);
    if (!skill) throw notFound();
    return { skill };
  },
  head: ({ loaderData }) => {
    const skill = loaderData?.skill;
    const title = skill
      ? `${skill.name} — Alex · Data Analyst`
      : "Skill — Alex · Data Analyst";
    const description = skill?.description ?? "Skill detail page.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="relative flex min-h-screen items-center justify-center text-foreground">
      <ParallaxBackdrop />
      <div className="glass-panel relative z-10 flex flex-col items-center gap-4 rounded-2xl px-8 py-10 text-center">
        <h1 className="font-display text-3xl font-semibold">Skill not found</h1>
        <p className="text-sm text-muted-foreground">
          That skill doesn't exist (yet).
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </div>
    </main>
  ),
  component: SkillDetail,
});

function SkillDetail() {
  const { skill } = Route.useLoaderData();
  const idx = SKILLS.findIndex((s) => s.slug === skill.slug);
  const prev = SKILLS[(idx - 1 + SKILLS.length) % SKILLS.length];
  const next = SKILLS[(idx + 1) % SKILLS.length];
  const { Illustration } = skill;

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-foreground">
      <ParallaxBackdrop />

      {/* nav */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-all duration-300 hover:border-white/10 hover:bg-white/5 hover:text-foreground hover:shadow-[0_0_20px_-4px_var(--glow)]"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">Back to portfolio</span>
        </Link>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Skill {String(idx + 1).padStart(2, "0")} / {String(SKILLS.length).padStart(2, "0")}
        </div>
      </header>

      <article className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pb-16 pt-4 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* left — content */}
        <div className="flex flex-col justify-center">
          <div
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground backdrop-blur animate-fade-up"
          >
            <span className="h-1 w-1 rounded-full bg-accent-cyan animate-pulse-glow" />
            {skill.name}
          </div>

          <h1
            className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.05] tracking-tight animate-fade-up"
            style={{ animationDelay: "0.08s" }}
          >
            <span className="block text-gradient">{skill.name}</span>
          </h1>

          <p
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground animate-fade-up"
            style={{ animationDelay: "0.16s" }}
          >
            {skill.long}
          </p>

          {/* highlights */}
          <ul
            className="mt-8 grid gap-2 animate-fade-up"
            style={{ animationDelay: "0.24s" }}
          >
            {skill.highlights.map((h) => (
              <li
                key={h}
                className="glass-panel flex items-start gap-3 rounded-xl px-4 py-3 text-sm text-foreground/90"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                {h}
              </li>
            ))}
          </ul>

          {/* tools */}
          <div
            className="mt-8 animate-fade-up"
            style={{ animationDelay: "0.32s" }}
          >
            <div className="mb-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Tools & stack
            </div>
            <div className="flex flex-wrap gap-2">
              {skill.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/85 backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* right — illustration */}
        <div
          className="relative flex items-center animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div
            className="relative h-full w-full rounded-[28px] p-[1px]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.82 0.13 200 / 55%) 0%, oklch(1 0 0 / 6%) 45%, oklch(0.7 0.18 285 / 55%) 100%)",
            }}
          >
            <div className="glass-panel relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-[27px]">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="relative h-full w-full p-6 sm:p-10">
                <Illustration />
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* prev / next */}
      <nav className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-3 border-t border-white/5 px-6 py-8 sm:grid-cols-2 sm:px-10">
        <Link
          to="/skills/$slug"
          params={{ slug: prev.slug }}
          className="glass-panel group flex items-center justify-between rounded-2xl px-5 py-4 transition hover:border-accent-cyan/40"
        >
          <div className="flex items-center gap-3">
            <ArrowLeft className="h-4 w-4 text-muted-foreground transition group-hover:-translate-x-0.5 group-hover:text-foreground" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Previous
              </div>
              <div className="font-display text-base font-medium">{prev.name}</div>
            </div>
          </div>
        </Link>
        <Link
          to="/skills/$slug"
          params={{ slug: next.slug }}
          className="glass-panel group flex items-center justify-between rounded-2xl px-5 py-4 transition hover:border-accent-cyan/40 sm:flex-row-reverse"
        >
          <div className="flex items-center gap-3 sm:flex-row-reverse">
            <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
            <div className="sm:text-right">
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Next
              </div>
              <div className="font-display text-base font-medium">{next.name}</div>
            </div>
          </div>
        </Link>
      </nav>

      {/* CTA */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 sm:px-10">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition hover:text-foreground"
        >
          See all skills
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </main>
  );
}
