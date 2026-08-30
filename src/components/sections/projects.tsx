import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";

export function Projects() {
  const { t } = useLocale();
  return (
    <Section
      id="projects"
      eyebrow={t.section.work}
      title={t.section.projectsTitle}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resume.projects.map((p, i) => {
          const tp =
            t.projects.items[p.id as keyof typeof t.projects.items] ??
            ({ description: "" } as { description: string });
          return (
            <Reveal key={p.id} delay={i * 60} className="h-full">
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${t.projects.viewOnGithub}: ${p.name}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors duration-200 hover:border-input focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
              >
                {/* Filename strip — the panel header from the reference. */}
                <div className="panel-head">
                  <span className="truncate text-muted-foreground transition-colors group-hover:text-brand">
                    {p.name}
                  </span>
                  {p.date && (
                    <span className="shrink-0 text-faint" dir="ltr">
                      {p.date}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between gap-6 p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {tp.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-subtle transition-colors group-hover:text-foreground">
                    {t.projects.viewOnGithub}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
