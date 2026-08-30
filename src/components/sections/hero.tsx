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
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { NodeGraph } from "@/components/node-graph";
import { WorldMap } from "@/components/world-map";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useElementCenter } from "@/hooks/use-element-center";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/** Soft ground-coloured halo, so copy stays legible over the node mesh. */
const HALO =
  "0 0 24px hsl(var(--background)), 0 0 12px hsl(var(--background)), 0 0 4px hsl(var(--background))";

const SOCIALS = [
  { key: "github", label: "GitHub", Icon: Github },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "telegram", label: "Telegram", Icon: Send },
  { key: "youtube", label: "YouTube", Icon: Youtube },
] as const;

function formatCoord(value: number, positive: string, negative: string) {
  return `${Math.abs(value).toFixed(2)}°${value >= 0 ? positive : negative}`;
}

export function Hero() {
  const { t } = useLocale();
  // The graph measures this element and wires the mesh into it, wherever the
  // responsive layout happens to put it. Exactly one marker is mounted so the
  // ref can't land on a display:none copy.
  const markerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isWide = useMediaQuery("(min-width: 768px)");
  // The map aligns Ankara to this exact pixel, so the marker really is the
  // city rather than a decoration parked near it.
  const markerCenter = useElementCenter(markerRef, sectionRef);

  const { city, lat, lon } = resume.coords;
  const geoLabel = `${formatCoord(lat, "N", "S")} ${formatCoord(lon, "E", "W")}`;

  const marker = (
    <figure className="flex flex-col items-center gap-5 sm:gap-10">
      <div ref={markerRef} className="relative">
        {/* Concentric rings — a map-marker / radar read. */}
        <span
          aria-hidden
          className="absolute -inset-4 rounded-full border border-border sm:-inset-7"
        />
        <span
          aria-hidden
          className="absolute -inset-2 rounded-full border border-input sm:-inset-3.5"
        />
        <img
          src="/avatar.png"
          alt={resume.name}
          width={128}
          height={128}
          fetchPriority="high"
          className="relative h-16 w-16 rounded-full border border-input object-cover sm:h-28 sm:w-28 md:h-32 md:w-32"
          style={{ backgroundColor: "hsl(var(--card))" }}
        />
        <span
          aria-hidden
          className="absolute bottom-1 end-1 h-2.5 w-2.5 rounded-full border-2 border-background bg-good"
        />
      </div>

      <figcaption
        className="whitespace-nowrap text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-muted-foreground"
        style={{ textShadow: HALO }}
      >
        {city}
        <span className="block text-subtle">{geoLabel}</span>
      </figcaption>
    </figure>
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[calc(100svh-3.75rem)] scroll-mt-20 items-center overflow-hidden border-b border-border py-8 sm:py-10 md:py-16"
    >
      <WorldMap
        lon={lon}
        lat={lat}
        at={markerCenter}
        className="pointer-events-none absolute inset-0 z-0"
      />

      <NodeGraph
        anchorRef={markerRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      />

      <div className="container relative z-10">
        {/* Narrow: the marker sits in the flow above the copy. */}
        {!isWide && (
          <div className="mb-6 flex justify-center sm:mb-8">{marker}</div>
        )}

        <div
          className="max-w-3xl animate-fade-in"
          style={{ animationDelay: "120ms", animationFillMode: "both" }}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full md:mb-7 border border-input bg-background/60 px-2.5 py-1.5 font-mono text-[11px] tracking-[0.02em] text-muted-foreground backdrop-blur-sm">
            <span className="live-dot" />
            {t.resume.specialty}
          </span>

          <h1 className="mb-3 text-balance font-sans text-[clamp(2.25rem,7.5vw,6.5rem)] font-extrabold leading-[0.96] tracking-[-0.04em]">
            {resume.name}
          </h1>

          <p
            className="mb-5 text-balance font-display md:mb-7 text-[clamp(1.125rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-subtle"
            style={{ textShadow: HALO }}
          >
            {t.resume.title}
          </p>

          <p
            className="mb-6 line-clamp-3 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:mb-9 md:line-clamp-none md:text-lg"
            style={{ textShadow: HALO }}
          >
            {t.resume.about}
          </p>

          <div
            className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[11px] text-subtle md:mb-9 md:text-xs"
            style={{ textShadow: HALO }}
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> {resume.location}
            </span>
            <a
              className="-my-2 inline-flex items-center gap-1.5 py-2 transition-colors hover:text-foreground"
              href={`mailto:${resume.email}`}
              dir="ltr"
            >
              <Mail className="h-3.5 w-3.5" /> {resume.email}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href="/resume.pdf" download="Sonia-Fatholahi-Resume.pdf">
                <Download /> {t.hero.downloadCv}
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href={resume.scheduleUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <CalendarClock /> {t.hero.scheduleMeeting}
              </a>
            </Button>
            <Button
              variant="ghost"
              className="hidden md:inline-flex"
              onClick={() => scrollToId("contact")}
            >
              <Mail /> {t.hero.contactMe}
            </Button>
          </div>

          <div className="mt-7 flex items-center gap-1 border-t border-border pt-4 font-mono text-[11px] uppercase tracking-[0.06em] sm:gap-5 sm:pt-6">
            {SOCIALS.map(({ key, label, Icon }) => (
              <a
                key={key}
                href={resume.socials[key]}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center gap-1.5 text-subtle transition-colors hover:text-foreground sm:-my-2 sm:h-auto sm:w-auto sm:justify-start sm:py-2"
              >
                <Icon className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Wide: pinned into the empty half opposite the copy. */}
        {isWide && (
          <div className="pointer-events-none absolute inset-y-0 end-0 flex w-[38%] items-center justify-center">
            {marker}
          </div>
        )}
      </div>
    </section>
  );
}
