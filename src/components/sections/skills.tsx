import { Section } from "@/components/section";
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
      className="inline-flex items-center gap-2 rounded border border-border bg-card px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors duration-150 hover:border-brand/50 hover:bg-brand/[0.07] hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
    >
      <SkillIcon name={skill.icon} />
      <span>{skill.name}</span>
    </a>
  );
}

export function Skills() {
  const { t } = useLocale();
  const categories = Object.entries(resume.skills);

  return (
    <Section
      id="skills"
      eyebrow={t.section.toolbox}
      title={t.section.skillsTitle}
    >
      <div className="border-t border-border">
        {categories.map(([category, items], i) => (
          <div
            key={category}
            className="grid gap-4 border-b border-border py-6 sm:grid-cols-[10rem_1fr] sm:gap-8 md:grid-cols-[13rem_1fr]"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
                {t.skillCategories[category as SkillCategoryKey] ?? category}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <SkillChip key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
