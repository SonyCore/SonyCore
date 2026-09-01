import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LocaleToggle } from "@/components/locale-toggle";
import { cn } from "@/lib/utils";

export type NavItem = { id: string; label: string };

export function MobileNav({
  open,
  onOpenChange,
  items,
  active,
  isRtl,
  title,
  onNavigate,
  isHome,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: NavItem[];
  active: string;
  isRtl: boolean;
  title: string;
  onNavigate: (id: string) => void;
  isHome: boolean;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={isRtl ? "left" : "right"} className="w-72">
        <SheetHeader>
          <SheetTitle className="mono-label">{title}</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col">
          {items.map((item, i) => (
            <a
              key={item.id}
              href={isHome ? `#${item.id}` : `/#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                onOpenChange(false);
                window.setTimeout(() => onNavigate(item.id), 100);
              }}
              className={cn(
                "flex items-baseline gap-3 border-b border-border py-3 text-sm transition-colors",
                active === item.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="font-mono text-[10px] text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-6 flex justify-center md:hidden">
          <LocaleToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
