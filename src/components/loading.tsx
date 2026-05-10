import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

interface LoadingProps {
  /** When true, fills the viewport with a backdrop. Otherwise, lays out inline at min-h-[40vh]. */
  fullScreen?: boolean;
  /** Override the default localized "Loading" label. */
  label?: string;
  className?: string;
}

export function Loading({ fullScreen = false, label, className }: LoadingProps) {
  const { t } = useLocale();
  const initials = resume.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const text = label ?? t.misc.loading;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={text}
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        fullScreen
          ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          : "min-h-[40vh] w-full p-8",
        className,
      )}
    >
      <div className="relative h-14 w-14">
        <span
          aria-hidden
          className="absolute inset-0 rounded-md border-2 border-primary/15"
        />
        <span
          aria-hidden
          className="absolute inset-0 animate-spin rounded-md border-2 border-transparent border-t-primary [animation-duration:1.1s]"
        />
        <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold text-primary">
          {initials}
        </span>
      </div>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span className="animate-pulse">{text}</span>
        <span aria-hidden className="ms-0.5 inline-block animate-pulse">…</span>
      </p>
    </div>
  );
}
