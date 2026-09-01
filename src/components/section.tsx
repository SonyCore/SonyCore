import { type ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title?: string;
  titleMuted?: string;
  eyebrow?: string;
  aside?: ReactNode;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export function Section({
  id,
  title,
  titleMuted,
  eyebrow,
  aside,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-20 border-b border-border py-20 md:py-24", className)}
    >
      <div className={cn("container", containerClassName)}>
        {(title || eyebrow) && (
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end md:gap-10">
            <div>
              {eyebrow && <span className="mono-label mb-3.5">{eyebrow}</span>}
              {title && (
                <h2 className="max-w-2xl text-[clamp(1.875rem,3.2vw,2.625rem)] font-medium leading-[1.08] tracking-[-0.028em] text-balance">
                  {title}
                  {titleMuted && <span className="text-subtle"> {titleMuted}</span>}
                </h2>
              )}
            </div>
            {aside && (
              <p className="max-w-[340px] text-sm leading-relaxed text-muted-foreground">
                {aside}
              </p>
            )}
          </Reveal>
        )}
        <Reveal delay={120}>{children}</Reveal>
      </div>
    </section>
  );
}
