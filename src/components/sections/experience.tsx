import { Briefcase } from "lucide-react";
import { Section } from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      <ol className="relative mx-auto max-w-4xl space-y-8 border-s-2 border-border ps-8">
        {resume.experience.map((job) => {
          const tJob =
            t.experience.items[job.id as keyof typeof t.experience.items];
          if (!tJob) return null;
          const isCurrent = job.endDate === null;

          return (
            <li key={job.id} className="relative">
              <span
                className={cn(
                  "absolute -start-[2.4rem] top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 bg-background",
                  isCurrent
                    ? "border-green-500 text-green-500"
                    : "border-border text-primary",
                )}
              >
                {isCurrent && (
                  <span
                    aria-hidden
                    className="absolute -inset-0.5 animate-ping rounded-full bg-green-500/40"
                  />
                )}
                <Briefcase className="relative h-3.5 w-3.5" />
              </span>
              <Card
                className={cn(
                  "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
                  isCurrent && "border-primary/40",
                )}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col justify-between gap-1 md:flex-row md:items-baseline">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold">{tJob.role}</h3>
                        {isCurrent && (
                          <Badge className="font-mono text-[10px] uppercase tracking-wide">
                            {t.experience.currentBadge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {job.company}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground md:text-end">
                      <p className="font-mono font-medium">
                        <span dir="ltr">
                          {job.startDate} –{" "}
                          {job.endDate ?? (
                            <span className="text-primary">
                              {t.experience.present}
                            </span>
                          )}
                        </span>
                      </p>
                      {job.location && (
                        <p className="font-mono text-xs">{job.location}</p>
                      )}
                    </div>
                  </div>
                  {tJob.bullets.length > 0 && (
                    <ul className="mt-4 list-disc space-y-2 ps-5 text-sm leading-relaxed text-muted-foreground marker:text-primary/60">
                      {tJob.bullets.map((b: string, i: number) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
