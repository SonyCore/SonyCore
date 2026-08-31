import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";
import type { Translation } from "@/lib/i18n";

type SkillCategoryKey = keyof Translation["skillCategories"];

/**
 * ATS-safe resume, built from the same data as the site.
 *
 * Applicant tracking systems extract a linear text stream, so everything here
 * is deliberately plain: one column, real headings in the order parsers expect
 * (Summary, Experience, Skills, Projects, Certifications, Languages), no
 * tables, no multi-column layout, no text in images, and no glyphs that break
 * extraction. The email and profile URLs are written out in full so contact
 * fields auto-populate correctly.
 *
 * "Print to PDF" from here produces a file an ATS can read end to end.
 */
export function ResumePage() {
  const { t } = useLocale();

  useEffect(() => {
    const previous = document.title;
    document.title = `${resume.name} - ${t.resume.title}`;
    return () => {
      document.title = previous;
    };
  }, [t.resume.title]);

  const github = resume.socials.github.replace(/^https?:\/\//, "");
  const linkedin = resume.socials.linkedin.replace(/^https?:\/\//, "");

  return (
    <div className="resume-page mx-auto max-w-[820px] px-6 py-10">
      {/* Screen-only toolbar. */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-subtle transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
          ATS-friendly version
        </Link>
        <Button onClick={() => window.print()}>
          <Printer /> Print / Save as PDF
        </Button>
      </div>

      <header className="mb-5">
        <h1 className="text-[26px] font-bold tracking-[-0.01em]">
          {resume.name}
        </h1>
        <p className="mt-1 text-[15px] font-medium">
          {t.resume.title}, {t.resume.specialty}
        </p>
        {/* Plain text, no icons: these are the fields an ATS scrapes. */}
        <p className="mt-2 text-[13px] leading-relaxed" dir="ltr">
          {resume.email} · {resume.location} · {github} · {linkedin}
        </p>
      </header>

      <section className="mb-4">
        <h2 className="resume-h2">Summary</h2>
        <p className="text-[13px] leading-relaxed">{t.resume.about}</p>
      </section>

      <section className="mb-4">
        <h2 className="resume-h2">Experience</h2>
        {resume.experience.map((job) => {
          const tJob =
            t.experience.items[job.id as keyof typeof t.experience.items];
          if (!tJob) return null;
          return (
            <div key={job.id} className="mb-3">
              <h3 className="text-[14px] font-semibold">{tJob.role}</h3>
              <p className="text-[13px]" dir="ltr">
                {job.company} | {job.startDate} - {job.endDate ?? "Present"}
                {job.location ? ` | ${job.location}` : ""}
              </p>
              {tJob.metrics.length > 0 && (
                <p className="mt-1 text-[13px] font-medium">
                  {tJob.metrics.join(" · ")}
                </p>
              )}
              <ul className="mt-1.5 list-disc ps-5 text-[13px] leading-snug">
                {tJob.bullets.map((b: string, i: number) => (
                  <li key={i}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="mb-4">
        <h2 className="resume-h2">Skills</h2>
        {/* Comma-separated runs under a plain label parse far more reliably
            than chips, columns or tables. */}
        {Object.entries(resume.skills).map(([category, items]) => (
          <p key={category} className="mb-1 text-[13px] leading-snug">
            <span className="font-semibold">
              {t.skillCategories[category as SkillCategoryKey] ?? category}:
            </span>{" "}
            {items.map((s) => s.name).join(", ")}
          </p>
        ))}
        <p className="mb-1 text-[13px] leading-snug">
          <span className="font-semibold">Practices:</span> Microservices,
          Distributed Systems, Event-Driven Architecture, CI/CD, Observability,
          SLI/SLO, Incident Response, On-Call, Infrastructure as Code,
          Containerization, REST APIs
        </p>
      </section>

      <section className="mb-4">
        <h2 className="resume-h2">Projects</h2>
        {resume.projects.map((p) => {
          const tp =
            t.projects.items[p.id as keyof typeof t.projects.items] ??
            ({ description: "" } as { description: string });
          // First sentence only: the full text lives on the site, and a resume
          // wants one scannable line per project.
          const summary = tp.description.split(/(?<=\.)\s/)[0] ?? tp.description;
          return (
            <p key={p.id} className="mb-1 text-[13px] leading-snug">
              <span className="font-semibold">{p.name}</span>
              {p.date ? ` (${p.date})` : ""}: {summary}{" "}
              <span dir="ltr">
                {p.url.replace(/^https?:\/\//, "")}
              </span>
            </p>
          );
        })}
      </section>

      <section className="mb-4">
        <h2 className="resume-h2">Certifications</h2>
        <ul className="list-disc ps-5 text-[13px] leading-relaxed">
          {t.certificates.items.map((c, i) => (
            <li key={i} className="mb-1">
              {c}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="resume-h2">Languages</h2>
        <p className="text-[13px]">
          {resume.languages
            .map(
              (l) =>
                `${t.languages[l.name as keyof typeof t.languages] ?? l.name} (${
                  t.proficiency[l.level as keyof typeof t.proficiency] ?? l.level
                })`,
            )
            .join(", ")}
        </p>
      </section>

      <section className="break-inside-avoid">
        <h2 className="resume-h2">Additional</h2>
        <p className="text-[13px] leading-relaxed">
          <span className="font-semibold">Soft skills:</span>{" "}
          {resume.softSkills
            .map((k) => t.softSkills[k as keyof typeof t.softSkills].name)
            .join(", ")}
        </p>
      </section>
    </div>
  );
}
