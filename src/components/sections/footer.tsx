import { Github, Linkedin, Mail, Send, Youtube } from "lucide-react";
import { resume } from "@/data/resume";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-muted/30">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {year} {resume.name}. {t.footer.builtWith}
        </p>
        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="icon" aria-label="GitHub">
            <a href={resume.socials.github} target="_blank" rel="noreferrer noopener">
              <Github />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
            <a href={resume.socials.linkedin} target="_blank" rel="noreferrer noopener">
              <Linkedin />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Telegram">
            <a href={resume.socials.telegram} target="_blank" rel="noreferrer noopener">
              <Send />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="YouTube">
            <a href={resume.socials.youtube} target="_blank" rel="noreferrer noopener">
              <Youtube />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Email">
            <a href={`mailto:${resume.email}`}>
              <Mail />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
