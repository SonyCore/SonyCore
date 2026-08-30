import { Github, Linkedin, Mail, Send, Youtube } from "lucide-react";
import { resume } from "@/data/resume";

const SOCIALS = [
  { key: "github", label: "GitHub", Icon: Github },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "telegram", label: "Telegram", Icon: Send },
  { key: "youtube", label: "YouTube", Icon: Youtube },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col-reverse items-center justify-between gap-4 py-7 font-mono text-[11px] tracking-[0.04em] text-faint sm:flex-row">
        <span dir="ltr">
          © {year} {resume.name}
        </span>
        <div className="flex items-center gap-5">
          {SOCIALS.map(({ key, label, Icon }) => (
            <a
              key={key}
              href={resume.socials[key]}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="inline-flex items-center gap-1.5 text-subtle transition-colors hover:text-foreground"
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
          <a
            href={`mailto:${resume.email}`}
            aria-label="Email"
            className="inline-flex items-center gap-1.5 text-subtle transition-colors hover:text-foreground"
          >
            <Mail className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
