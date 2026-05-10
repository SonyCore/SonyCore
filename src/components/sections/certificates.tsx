import { Award, Languages } from "lucide-react";
import { Section } from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";

export function Certificates() {
  const { t } = useLocale();
  return (
    <Section
      id="certificates"
      eyebrow={t.section.credentials}
      title={t.section.certsAndLangsTitle}
    >
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Award className="h-5 w-5 text-primary" /> {t.certificates.heading}
          </h3>
          <div className="grid gap-3">
            {t.certificates.items.map((c, i) => (
              <Card
                key={i}
                className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardContent className="p-4 text-sm">{c}</CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Languages className="h-5 w-5 text-primary" />{" "}
            {t.certificates.languagesHeading}
          </h3>
          <div className="grid gap-3">
            {resume.languages.map((l) => (
              <Card
                key={l.name}
                className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardContent className="flex items-center justify-between p-4 text-sm">
                  <span className="font-medium">
                    {t.languages[l.name as keyof typeof t.languages] ?? l.name}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {t.proficiency[l.level as keyof typeof t.proficiency] ??
                      l.level}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
