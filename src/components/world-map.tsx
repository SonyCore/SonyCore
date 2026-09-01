import { useEffect, useRef, useState } from "react";
import { MAP_HEIGHT, MAP_WIDTH, projectToMap } from "@/lib/equirect";
import type { Point } from "@/hooks/use-element-center";
import { cn } from "@/lib/utils";

export function WorldMap({
  lon,
  lat,
  at,
  className,
}: {
  lon: number;
  lat: number;
  at: Point | null;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ width: number; height: number } | null>(null);
  const [paths, setPaths] = useState<{
    coastlines: string;
    borders: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    void import("@/data/world-map").then((m) => {
      if (!cancelled) {
        setPaths({ coastlines: m.COASTLINES, borders: m.BORDERS });
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

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

  const degreesAcross = box
    ? Math.min(130, Math.max(55, box.width / 12))
    : 120;
  const pxPerDegLon = box ? box.width / degreesAcross : 0;

  const pxPerDegLat = pxPerDegLon / Math.cos((lat * Math.PI) / 180);

  const anchor = projectToMap(lon, lat);
  const mapW = MAP_WIDTH * pxPerDegLon;
  const mapH = MAP_HEIGHT * pxPerDegLat;
  const left = at ? at.x - anchor.x * pxPerDegLon : 0;
  const top = at ? at.y - anchor.y * pxPerDegLat : 0;

  const ready = !!box && !!at && !!paths && pxPerDegLon > 0;

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={cn("overflow-hidden text-foreground", className)}
      style={
        at && box
          ? {
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
            preserveAspectRatio="none"
            style={{ position: "absolute", left, top }}
            fill="none"
            stroke="currentColor"
            vectorEffect="non-scaling-stroke"
          >
            <path
              d={paths!.coastlines}
              strokeWidth={1}
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity={0.34}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={paths!.borders}
              strokeWidth={1}
              strokeDasharray="2 3"
              opacity={0.16}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

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
