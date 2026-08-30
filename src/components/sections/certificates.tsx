import { Section } from "@/components/section";
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
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h3 className="mono-label mb-5">{t.certificates.heading}</h3>
          <ul className="border-t border-border">
            {t.certificates.items.map((c, i) => (
              <li
                key={i}
                className="flex gap-4 border-b border-border py-3.5 text-sm text-muted-foreground"
              >
                <span className="font-mono text-[10px] leading-6 text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mono-label mb-5">
            {t.certificates.languagesHeading}
          </h3>
          <dl className="border-t border-border">
            {resume.languages.map((l) => (
              <div
                key={l.name}
                className="flex items-baseline justify-between gap-4 border-b border-border py-3.5"
              >
                <dt className="text-sm">
                  {t.languages[l.name as keyof typeof t.languages] ?? l.name}
                </dt>
                <dd className="font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">
                  {t.proficiency[l.level as keyof typeof t.proficiency] ??
                    l.level}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
