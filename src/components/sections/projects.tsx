import { Section } from "@/components/section";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";
import { ext } from "@/lib/utils";

export function Projects() {
  const { t } = useLocale();
  return (
    <Section id="projects" title={t.section.projectsTitle}>
      <ul className="space-y-4">
        {resume.projects.map((p) => (
          <li key={p.id}>
            <p className="font-sans">
              <a className="link font-semibold" href={p.url} {...ext}>
                {p.name}
              </a>
              {p.date !== undefined && (
                <span className="ms-2 text-[0.8125rem] text-subtle">{p.date}</span>
              )}
            </p>
            <p className="text-[0.9375rem] text-muted-foreground">
              {t.projects.items[p.id as keyof typeof t.projects.items].description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
