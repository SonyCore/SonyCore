import { Section } from "@/components/section";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";

export function About() {
  const { t } = useLocale();
  return (
    <Section id="about" title={t.section.aboutTitle}>
      <p>{t.resume.about}</p>
      <p className="mt-3 text-muted-foreground">
        {t.resume.tagline}. I work best through{" "}
        {resume.softSkills
          .map((k) => t.softSkills[k as keyof typeof t.softSkills].name.toLowerCase())
          .join(", ")}
        .
      </p>
    </Section>
  );
}
