import { useLayoutEffect, useState, type RefObject } from "react";

export type Point = { x: number; y: number };

export function useElementCenter(
  target: RefObject<HTMLElement | null>,
  container: RefObject<HTMLElement | null>,
): Point | null {
  const [center, setCenter] = useState<Point | null>(null);

  useLayoutEffect(() => {
    const el = target.current;
    const host = container.current;
    if (!el || !host) return;

    const measure = () => {
      const a = el.getBoundingClientRect();
      const b = host.getBoundingClientRect();
      if (!a.width || !b.width) return;
      const next = {
        x: a.left + a.width / 2 - b.left,
        y: a.top + a.height / 2 - b.top,
      };
      setCenter((prev) =>
        prev && Math.abs(prev.x - next.x) < 0.5 && Math.abs(prev.y - next.y) < 0.5
          ? prev
          : next,
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    observer.observe(host);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [target, container]);

  return center;
}
