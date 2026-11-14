import { Section } from "@/components/section";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";

export function Experience() {
  const { t } = useLocale();
  return (
    <Section id="experience" title={t.section.experienceTitle}>
      <ol className="space-y-5">
        {resume.experience.map((job) => {
          const tJob = t.experience.items[job.id as keyof typeof t.experience.items];
          return (
            <li key={job.id} className="dated-row">
              <span className="date-col">
                {job.startDate} – {job.endDate ?? t.experience.present}
              </span>
              <div>
                <p>
                  <span className="font-sans font-semibold">{tJob.role}</span>,{" "}
                  {job.company}
                  {job.location !== undefined && (
                    <span className="text-subtle"> · {job.location}</span>
                  )}
                </p>
                <details className="mt-1">
                  <summary className="cursor-pointer font-sans text-[0.8125rem] font-medium text-brand">
                    {t.experience.details}
                  </summary>
                  <ul className="mt-2 list-disc space-y-1 ps-5 text-[0.9375rem] text-muted-foreground marker:text-faint">
                    {tJob.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </details>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
