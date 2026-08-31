import { Section } from "@/components/section";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

export function Experience() {
  const { t } = useLocale();
  return (
    <Section
      id="experience"
      eyebrow={t.section.career}
      title={t.section.experienceTitle}
    >
      {/* A rule down the left edge with a node per role - the same visual
          grammar as the hero graph, flattened to one axis. */}
      <ol className="border-s border-border">
        {resume.experience.map((job) => {
          const tJob =
            t.experience.items[job.id as keyof typeof t.experience.items];
          if (!tJob) return null;
          const isCurrent = job.endDate === null;

          return (
            <li
              key={job.id}
              className="group relative border-b border-border ps-6 last:border-b-0 md:ps-10"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute -start-[3.5px] top-9 h-[7px] w-[7px] rounded-full",
                  isCurrent ? "bg-good" : "bg-faint",
                )}
                style={
                  isCurrent
                    ? { boxShadow: "0 0 0 3px hsl(var(--good) / 0.18)" }
                    : undefined
                }
              />

              <div className="py-8 transition-colors md:grid md:grid-cols-[1fr_auto] md:gap-10">
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg font-medium tracking-[-0.01em]">
                      {tJob.role}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-brand">
                      {job.company}
                    </span>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-good">
                        <span className="live-dot" />
                        {t.experience.currentBadge}
                      </span>
                    )}
                  </div>

                  {/* Measured outcomes, if the role has them - these are what
                      a recruiter scans for before reading any prose. */}
                  {tJob.metrics.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {tJob.metrics.map((m: string, i: number) => (
                        <li
                          key={i}
                          className="rounded border border-brand/30 bg-brand/[0.07] px-2 py-1 font-mono text-[11px] tracking-[0.04em] text-brand"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}

                  {tJob.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                      {tJob.bullets.map((b: string, i: number) => (
                        <li key={i} className="flex gap-3">
                          <span
                            aria-hidden
                            className="mt-[0.6em] h-px w-3 shrink-0 bg-faint"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-3 font-mono text-[11px] text-subtle md:mt-1 md:text-end">
                  <p dir="ltr">
                    {job.startDate} –{" "}
                    {job.endDate ?? (
                      <span className="text-foreground">
                        {t.experience.present}
                      </span>
                    )}
                  </p>
                  {job.location && (
                    <p className="mt-1 text-faint">{job.location}</p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
