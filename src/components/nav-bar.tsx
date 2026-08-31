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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useLocale } from "@/hooks/use-locale";
import { resume } from "@/data/resume";
import { cn } from "@/lib/utils";

// Order must match the section order in home.tsx - scroll-spy walks this list.
const NAV_IDS = [
  "home",
  "experience",
  "projects",
  "skills",
  "github",
  "about",
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
      const el = document.getElementById(id);
      if (el) {
        const HEADER_HEIGHT = 80;
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT,
          behavior: "smooth",
        });
      }
    } else {
      navigate(`/#${id}`);
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/[0.72] backdrop-blur-xl backdrop-saturate-150">
      <div className="container flex h-[60px] items-center justify-between gap-4">
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2.5 text-[15px] font-medium tracking-[-0.01em]"
        >
          <Avatar className="h-7 w-7 rounded-md border border-border">
            <AvatarImage src="/avatar.png" alt={resume.name} />
            <AvatarFallback className="rounded-md bg-card font-mono text-[10px] text-subtle">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline">{resume.name}</span>
        </Link>

        <nav className="hidden items-center gap-7 text-[13px] lg:flex">
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
                "relative py-5 transition-colors duration-150",
                active === item.id
                  ? "text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-brand"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
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
                <SheetTitle className="mono-label">{resume.name}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col">
                {navItems.map((item, i) => (
                  <a
                    key={item.id}
                    href={isHome ? `#${item.id}` : `/#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      window.setTimeout(() => goToSection(item.id), 100);
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
        </div>
      </div>
    </header>
  );
}
