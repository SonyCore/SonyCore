import { ArrowUpRight, Github } from "lucide-react";
import { Section } from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";

export function Projects() {
  const { t } = useLocale();
  return (
    <Section id="projects" eyebrow={t.section.work} title={t.section.projectsTitle}>
      <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {resume.projects.map((p, i) => {
          const tp =
            t.projects.items[p.id as keyof typeof t.projects.items] ??
            ({ description: "" } as { description: string });
          return (
            <Reveal key={p.id} delay={i * 80}>
              <Card className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-mono text-base">
                      {p.name}
                    </CardTitle>
                    {p.date && (
                      <span
                        className="shrink-0 font-mono text-xs text-muted-foreground"
                        dir="ltr"
                      >
                        {p.date}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-4 pt-0">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {tp.description}
                  </p>
                  <div>
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${t.projects.viewOnGithub}: ${p.name}`}
                      >
                        <Github /> {t.projects.viewOnGithub}{" "}
                        <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
