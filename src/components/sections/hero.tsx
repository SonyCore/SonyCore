import { Download, Mail, MapPin } from "lucide-react";
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

      <div className="container grid items-center gap-12 py-20 md:grid-cols-[1fr_auto] md:py-22">
        <div className="animate-fade-in space-y-6">
          {/* <p className="font-mono text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t.hero.greeting}
          </p> */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              {resume.name}
            </span>
          </h1>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
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

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
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

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg">
              <a href="/resume.pdf" download="Sonia-Fatholahi-Resume.pdf">
                <Download /> {t.hero.downloadCv}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToId("contact")}
            >
              <Mail /> {t.hero.contactMe}
            </Button>
          </div>
        </div>

        <div
          className="mx-auto animate-fade-in md:mx-0"
          style={{ animationDelay: "120ms", animationFillMode: "both" }}
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary/40 via-primary/10 to-transparent blur-xl"
            />
            <Avatar className="relative h-48 w-48 border-4 border-background shadow-xl ring-1 ring-border transition-transform duration-500 hover:scale-[1.02] md:h-64 md:w-64">
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
