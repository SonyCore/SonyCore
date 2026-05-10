import { type ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title?: string;
  eyebrow?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export function Section({
  id,
  title,
  eyebrow,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-16 md:py-24", className)}>
      <div className={cn("container", containerClassName)}>
        {(title || eyebrow) && (
          <Reveal className="mb-10 flex flex-col items-center text-center">
            {eyebrow && (
              <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                {title}
              </h2>
            )}
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary/30 via-primary to-primary/30" />
          </Reveal>
        )}
        <Reveal delay={120}>{children}</Reveal>
      </div>
    </section>
  );
}
