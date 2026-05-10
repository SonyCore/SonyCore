import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleToggle } from "@/components/locale-toggle";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useLocale } from "@/hooks/use-locale";
import { resume } from "@/data/resume";
import { cn } from "@/lib/utils";

const NAV_IDS = [
  "home",
  "about",
  "experience",
  "skills",
  "projects",
  "github",
  "blog",
  "certificates",
  "contact",
] as const;

export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Scroll-spy only matters on the home page; on other pages we don't have
  // these sections in the DOM, so feed an empty list.
  const active = useScrollSpy(isHome ? [...NAV_IDS] : []);
  const [open, setOpen] = useState(false);
  const { t, isRtl } = useLocale();

  const navItems = NAV_IDS.map((id) => ({ id, label: t.nav[id] }));
  const initials = resume.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  function goToSection(id: string) {
    if (isHome) {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`/#${id}`);
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-mono text-sm font-semibold text-primary-foreground">
            {initials}
          </span>
          <span className="hidden sm:inline">{resume.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={isHome ? `#${item.id}` : `/#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                goToSection(item.id);
              }}
              aria-current={active === item.id ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                active === item.id
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {item.label}
              {active === item.id && (
                <span className="ms-1 inline-block h-1 w-1 -translate-y-0.5 rounded-full bg-primary align-middle" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleToggle className="hidden md:flex" />
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label={t.nav.openMenu}
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side={isRtl ? "left" : "right"} className="w-72">
              <SheetHeader>
                <SheetTitle>{resume.name}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={isHome ? `#${item.id}` : `/#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      window.setTimeout(() => goToSection(item.id), 100);
                    }}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      active === item.id
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 flex justify-center md:hidden">
                <LocaleToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
