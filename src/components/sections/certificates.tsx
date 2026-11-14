import { Section } from "@/components/section";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";

export function Certificates() {
  const { t } = useLocale();
  return (
    <Section id="certificates" title={t.section.certsAndLangsTitle}>
      <ul className="list-disc space-y-1 ps-5 marker:text-faint">
        {t.certificates.items.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <p className="mt-3">
        <span className="font-sans text-[0.875rem] font-semibold">
          {t.certificates.languagesHeading}:
        </span>{" "}
        {resume.languages.map((l) => `${l.name} (${l.level})`).join(", ")}
      </p>
    </Section>
  );
}
