import { type ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref as never}
      style={{
        // Apply the delay only when transitioning *into* the revealed state
        // so that a stagger doesn't run when the element initially mounts.
        transitionDelay: revealed ? `${delay}ms` : "0ms",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionProperty: "opacity, transform",
        willChange: revealed ? "auto" : "opacity, transform",
      }}
      className={cn(
        revealed
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
