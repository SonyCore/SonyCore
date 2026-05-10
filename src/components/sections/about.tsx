import { Section } from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";

export function About() {
  const { t } = useLocale();
  return (
    <Section id="about" eyebrow={t.section.profile} title={t.section.aboutTitle}>
      <Card className="mx-auto max-w-3xl">
        <CardContent className="p-8">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {t.resume.about}
          </p>
        </CardContent>
      </Card>

      <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
        {resume.softSkills.map((key) => {
          const s = t.softSkills[key as keyof typeof t.softSkills];
          return (
            <Card
              key={key}
              className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardContent className="p-5">
                <p className="font-semibold">{s.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.detail}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
