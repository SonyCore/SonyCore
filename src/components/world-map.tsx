import { useEffect, useRef, useState } from "react";
import {
  BORDERS,
  COASTLINES,
  MAP_HEIGHT,
  MAP_WIDTH,
  projectToMap,
} from "@/data/world-map";
import type { Point } from "@/hooks/use-element-center";
import { cn } from "@/lib/utils";

/**
 * Semi-transparent world map behind the hero — coastlines and political
 * borders, drawn as hairlines.
 *
 * The map is scaled and offset so that (`lon`, `lat`) lands exactly on `at`,
 * the pixel where the avatar marker sits. It bleeds past the container on
 * every side and is masked to fade out around the marker, so it reads as a
 * detail view of a much larger map rather than a cropped rectangle.
 */
export function WorldMap({
  lon,
  lat,
  at,
  className,
}: {
  lon: number;
  lat: number;
  /** Where the coordinate should land, in px from the container's top-left. */
  at: Point | null;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const measure = () => {
      const rect = host.getBoundingClientRect();
      setBox((prev) =>
        prev &&
        Math.abs(prev.width - rect.width) < 0.5 &&
        Math.abs(prev.height - rect.height) < 0.5
          ? prev
          : { width: rect.width, height: rect.height },
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // Zoom: how much of the globe spans the container. Clamped so phones stay
  // regional (recognisable coastlines) and wide screens don't over-magnify.
  const degreesAcross = box
    ? Math.min(130, Math.max(55, box.width / 12))
    : 120;
  const pxPerDegree = box ? box.width / degreesAcross : 0;

  const anchor = projectToMap(lon, lat);
  const mapW = MAP_WIDTH * pxPerDegree;
  const mapH = MAP_HEIGHT * pxPerDegree;
  const left = at ? at.x - anchor.x * pxPerDegree : 0;
  const top = at ? at.y - anchor.y * pxPerDegree : 0;

  const ready = !!box && !!at && pxPerDegree > 0;

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={cn("overflow-hidden text-foreground", className)}
      style={
        at && box
          ? {
              // Concentrate the map around the marker and fade it out well
              // before the headline.
              WebkitMaskImage: `radial-gradient(ellipse ${box.width * 0.55}px ${box.height * 0.7}px at ${at.x}px ${at.y}px, #000 0%, #000 30%, transparent 88%)`,
              maskImage: `radial-gradient(ellipse ${box.width * 0.55}px ${box.height * 0.7}px at ${at.x}px ${at.y}px, #000 0%, #000 30%, transparent 88%)`,
            }
          : undefined
      }
    >
      {ready && (
        <>
          <svg
            width={mapW}
            height={mapH}
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            style={{ position: "absolute", left, top }}
            fill="none"
            stroke="currentColor"
            // Hairlines that stay hairlines at any zoom.
            vectorEffect="non-scaling-stroke"
          >
            <path
              d={COASTLINES}
              strokeWidth={1}
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity={0.34}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={BORDERS}
              strokeWidth={1}
              strokeDasharray="2 3"
              opacity={0.16}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Latitude / longitude crosshair through the marker. */}
          <div
            className="absolute inset-x-0 h-px"
            style={{
              top: at.y,
              background:
                "linear-gradient(to right, transparent, hsl(var(--foreground) / 0.16) 35%, hsl(var(--foreground) / 0.16) 65%, transparent)",
            }}
          />
          <div
            className="absolute inset-y-0 w-px"
            style={{
              left: at.x,
              background:
                "linear-gradient(to bottom, transparent, hsl(var(--foreground) / 0.16) 35%, hsl(var(--foreground) / 0.16) 65%, transparent)",
            }}
          />
        </>
      )}
    </div>
  );
}
