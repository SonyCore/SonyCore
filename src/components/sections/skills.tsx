import { Fragment } from "react";
import { Section } from "@/components/section";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";
import { ext } from "@/lib/utils";

export function Skills() {
  const { t } = useLocale();
  return (
    <Section id="skills" title={t.section.skillsTitle}>
      <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[11rem_1fr]">
        {Object.entries(resume.skills).map(([category, items]) => (
          <Fragment key={category}>
            <dt className="pt-0.5 font-sans text-[0.875rem] font-semibold">
              {t.skillCategories[category as keyof typeof t.skillCategories]}
            </dt>
            <dd className="mb-2 text-muted-foreground sm:mb-0">
              {items.map((s, i) => (
                <Fragment key={s.name}>
                  <a className="transition-colors hover:text-brand" href={s.url} {...ext}>
                    {s.name}
                  </a>
                  {i < items.length - 1 && ", "}
                </Fragment>
              ))}
            </dd>
          </Fragment>
        ))}
      </dl>
    </Section>
  );
}
