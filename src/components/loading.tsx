import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

interface LoadingProps {
  fullScreen?: boolean;
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
      <div className="relative h-12 w-12">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border border-border"
        />
        <span
          aria-hidden
          className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-brand [animation-duration:1.1s]"
        />
        <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-brand">
          {initials}
        </span>
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
        <span className="animate-pulse">{text}</span>
        <span aria-hidden className="ms-0.5 inline-block animate-pulse">…</span>
      </p>
    </div>
  );
}
