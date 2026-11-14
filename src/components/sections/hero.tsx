import {
  CalendarClock,
  FileText,
  Github,
  Linkedin,
  Mail,
  Send,
  Youtube,
} from "lucide-react";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";
import { ext } from "@/lib/utils";

export function Hero() {
  const { t } = useLocale();
  const links = [
    { label: "Email", href: `mailto:${resume.email}`, Icon: Mail, attrs: {} },
    {
      label: t.hero.cv,
      href: "/resume.pdf",
      Icon: FileText,
      attrs: { download: "Sony-Resume.pdf" },
    },
    { label: "GitHub", href: resume.socials.github, Icon: Github, attrs: ext },
    { label: "LinkedIn", href: resume.socials.linkedin, Icon: Linkedin, attrs: ext },
    { label: "Telegram", href: resume.socials.telegram, Icon: Send, attrs: ext },
    { label: "YouTube", href: resume.socials.youtube, Icon: Youtube, attrs: ext },
    { label: t.hero.scheduleMeeting, href: resume.scheduleUrl, Icon: CalendarClock, attrs: ext },
  ];

  return (
    <section id="home" className="pt-10 sm:pt-14">
      <h1 className="font-sans text-[2rem] font-bold leading-tight tracking-[-0.022em]">
        {resume.name}
      </h1>
      <p className="mt-1 font-sans text-[1.0625rem] font-medium">{t.resume.title}</p>
      <p className="mt-2 text-muted-foreground">
        {t.resume.specialty}
        <br />
        {resume.location} ·{" "}
        <a className="link" href={`mailto:${resume.email}`}>
          {resume.email}
        </a>
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {links.map(({ label, href, Icon, attrs }) => (
          <li key={label}>
            <a
              href={href}
              {...attrs}
              className="inline-flex items-center gap-1.5 rounded border border-input px-2.5 py-1 font-sans text-[0.8125rem] font-medium text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
