import { VERTEX_MESH } from "@/data/vertex-portrait";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const EDGE = { width: 0.106, opacity: 0.2 };

const NODES = [
  { key: "dimmest", width: 0.213, opacity: 0.3 },
  { key: "dim", width: 0.342, opacity: 0.48 },
  { key: "mid", width: 0.517, opacity: 0.7 },
  { key: "bright", width: 0.699, opacity: 0.88 },
  { key: "brightest", width: 0.874, opacity: 1 },
] as const;

export function VertexPortrait({ className }: { className?: string }) {
  const { theme } = useTheme();
  const light = theme === "light";
  const ink = (o: number) => Math.min(1, o * (light ? 1.45 : 1));
  const weight = (w: number) => (light ? w * 1.08 : w);

  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className={cn("text-brand", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <path
        d={VERTEX_MESH.edges}
        strokeWidth={weight(EDGE.width)}
        opacity={ink(EDGE.opacity)}
      />
      {NODES.map(({ key, width, opacity }) => (
        <path
          key={key}
          d={VERTEX_MESH.nodes[key]}
          strokeWidth={weight(width)}
          opacity={ink(opacity)}
        />
      ))}
    </svg>
  );
}
