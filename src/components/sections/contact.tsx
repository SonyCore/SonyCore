import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";
import { ext } from "@/lib/utils";

export function Contact() {
  const { t } = useLocale();
  return (
    <section id="contact" className="pt-10">
      <p className="rounded border border-border bg-muted px-4 py-3">
        {t.contact.blurb}{" "}
        <a className="link" href={`mailto:${resume.email}`}>
          {resume.email}
        </a>{" "}
        {t.contact.or}{" "}
        <a className="link" href={resume.scheduleUrl} {...ext}>
          {t.contact.schedule}
        </a>
        .
      </p>
    </section>
  );
}
