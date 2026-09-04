import { ChevronDown, Globe } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LocaleToggle({ className }: { className?: string }) {
  const { locale, setLocale, locales, meta, t } = useLocale();
  const current = meta[locale];

  if (locales.length < 2) return null;

  return (
    <div
      className={cn(
        "relative inline-flex h-8 items-center gap-1.5 rounded-md border border-input px-2.5 text-muted-foreground transition-colors hover:text-foreground focus-within:ring-1 focus-within:ring-brand",
        className,
      )}
    >
      <Globe className="h-4 w-4 shrink-0" />
      <span className="font-mono text-xs font-medium">
        {current.nativeLabel}
      </span>
      <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-60" />

      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        aria-label={t.nav.languageLabel}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {meta[code].flag} {meta[code].nativeLabel}
          </option>
        ))}
      </select>
    </div>
  );
}
