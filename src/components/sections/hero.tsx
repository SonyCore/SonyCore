import {
  CalendarClock,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const { t } = useLocale();
  return (
    <section
      id="home"
      className="relative scroll-mt-20 overflow-hidden border-b"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.10),_transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-20 top-10 -z-10 h-72 w-72 animate-blob rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -start-20 bottom-0 -z-10 h-64 w-64 animate-blob rounded-full bg-primary/5 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />

      <div className="container flex flex-col items-center gap-10 py-16 text-center md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-12 md:py-22 md:text-start">
        {/* Text block — order-2 on mobile so the avatar sits above it; default order on md+ so it occupies the wide grid column. */}
        <div
          className="order-2 flex animate-fade-in flex-col items-center gap-6 md:order-none md:items-start"
          style={{ animationDelay: "120ms", animationFillMode: "both" }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              {resume.name}
            </span>
          </h1>

          <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 md:justify-start">
            <p className="text-xl font-medium text-muted-foreground md:text-2xl">
              {t.resume.title}
            </p>
            <span className="hidden text-muted-foreground/40 md:inline">·</span>
            <p className="font-mono text-sm font-medium text-primary md:text-base">
              {t.resume.specialty}
            </p>
          </div>

          <p className="max-w-2xl font-mono text-sm text-muted-foreground">
            {t.resume.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground md:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {resume.location}
            </span>
            <a
              className="inline-flex items-center gap-1.5 font-mono hover:text-foreground"
              href={`mailto:${resume.email}`}
            >
              <Mail className="h-4 w-4" /> {resume.email}
            </a>
            {/* <span className="inline-flex items-center gap-1.5 font-mono">
              <Phone className="h-4 w-4" /> {resume.phone}
            </span> */}
          </div>

          <div className="flex w-full flex-col items-stretch gap-3 pt-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center md:justify-start">
            <Button asChild size="lg">
              <a href="/resume.pdf" download="Sonia-Fatholahi-Resume.pdf">
                <Download /> {t.hero.downloadCv}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={resume.scheduleUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <CalendarClock /> {t.hero.scheduleMeeting}
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => scrollToId("contact")}
            >
              <Mail /> {t.hero.contactMe}
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1 md:justify-start">
            <Button asChild variant="ghost" size="icon" aria-label="GitHub">
              <a
                href={resume.socials.github}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Github />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
              <a
                href={resume.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Linkedin />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="Telegram">
              <a
                href={resume.socials.telegram}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Send />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="YouTube">
              <a
                href={resume.socials.youtube}
                target="_blank"
                rel="noreferrer noopener"
              >
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

        {/* Avatar — order-1 on mobile (lands on top); default order on md+ so it falls into the narrow auto column on the right. */}
        <div
          className="order-1 mx-auto animate-fade-in md:order-none md:mx-0"
          style={{ animationDelay: "0ms", animationFillMode: "both" }}
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary/40 via-primary/10 to-transparent blur-xl"
            />
            <Avatar className="relative h-36 w-36 border-4 border-background shadow-xl ring-1 ring-border transition-transform duration-500 hover:scale-[1.02] sm:h-44 sm:w-44 md:h-64 md:w-64">
              <AvatarImage src="/avatar.png" alt={resume.name} />
              <AvatarFallback className="text-5xl">
                {resume.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </section>
  );
}
