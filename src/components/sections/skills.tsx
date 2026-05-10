import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resume, type Skill } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";
import type { Translation } from "@/lib/i18n";

type SkillCategoryKey = keyof Translation["skillCategories"];

function SkillIcon({ name }: { name: string }) {
  const url = `/icons/${name}.svg`;
  return (
    <span
      aria-hidden
      className="inline-block h-3.5 w-3.5 shrink-0 bg-current"
      style={{
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <a
      href={skill.url}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${skill.name} (opens in new tab)`}
      className="group inline-flex items-center gap-1.5 rounded-md border bg-secondary/60 px-2.5 py-1 font-mono text-xs font-semibold text-secondary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <SkillIcon name={skill.icon} />
      <span>{skill.name}</span>
      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-70" />
    </a>
  );
}

export function Skills() {
  const { t } = useLocale();
  return (
    <Section id="skills" eyebrow={t.section.toolbox} title={t.section.skillsTitle}>
      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(resume.skills).map(([category, items]) => (
          <Card
            key={category}
            className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                {t.skillCategories[category as SkillCategoryKey] ?? category}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 pt-0">
              {items.map((skill) => (
                <SkillChip key={skill.name} skill={skill} />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
