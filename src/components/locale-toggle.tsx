import { ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "@/hooks/use-locale";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LocaleToggle({
  className,
  align = "end",
}: {
  className?: string;
  align?: "start" | "center" | "end";
}) {
  const { locale, setLocale, locales, meta, t } = useLocale();
  const current = meta[locale];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("h-9 gap-1.5 px-3", className)}
          aria-label={t.nav.languageLabel}
        >
          <Globe className="h-4 w-4" />
          <span className="font-mono text-xs font-medium">
            {current.nativeLabel}
          </span>
          <ChevronDown className="h-3.5 w-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-44">
        <DropdownMenuLabel>{t.nav.languageLabel}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(v) => setLocale(v as Locale)}
        >
          {locales.map((code) => (
            <DropdownMenuRadioItem key={code} value={code}>
              <span aria-hidden className="me-1 text-base leading-none">
                {meta[code].flag}
              </span>
              <span className="flex-1">{meta[code].nativeLabel}</span>
              <span className="font-mono text-[10px] uppercase text-muted-foreground">
                {code}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
