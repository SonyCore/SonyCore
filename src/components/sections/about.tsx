import { Section } from "@/components/section";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";

export function About() {
  const { t } = useLocale();
  return (
    <Section
      id="about"
      eyebrow={t.section.profile}
      title={t.section.aboutTitle}
      aside={t.resume.tagline}
    >
      <p className="max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
        {t.resume.about}
      </p>

      {/* Soft skills as a bordered grid rather than cards - the rules carry
          the structure, matching the skills and credentials sections. */}
      {/* The dl carries its own bottom rule so a partly-filled last row still
          closes with a full-width line. */}
      <dl className="mt-12 grid border-y border-border sm:grid-cols-2 lg:grid-cols-3">
        {resume.softSkills.map((key) => {
          const s = t.softSkills[key as keyof typeof t.softSkills];
          return (
            <div
              key={key}
              className="border-b border-border py-5 sm:pe-8 lg:pe-10"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-brand">
                {s.name}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.detail}
              </dd>
            </div>
          );
        })}
      </dl>
    </Section>
  );
}
