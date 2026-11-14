import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useLocale } from "@/hooks/use-locale";
import { resume } from "@/data/resume";
import { cn } from "@/lib/utils";

const NAV_IDS = [
  "about",
  "experience",
  "projects",
  "skills",
  "github",
  "blog",
  "certificates",
] as const;

export function TopBar() {
  const isHome = useLocation().pathname === "/";
  const active = useScrollSpy(isHome ? [...NAV_IDS] : [], 72);
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-40 border-b border-t-[3px] border-border border-t-brand bg-bar">
      <div className="wrap flex h-12 items-center gap-4">
        <Link
          to="/"
          onClick={() => isHome && window.scrollTo({ top: 0, behavior: "smooth" })}
          className="whitespace-nowrap font-sans text-[0.9375rem] font-bold tracking-[-0.011em]"
        >
          {resume.name}
        </Link>
        <nav className="nav-scroll flex min-w-0 flex-1 items-center justify-end gap-0.5 overflow-x-auto">
          {NAV_IDS.map((id) => (
            <Link
              key={id}
              to={`/#${id}`}
              aria-current={isHome && active === id ? "true" : undefined}
              className={cn(
                "whitespace-nowrap rounded px-2 py-1 font-sans text-[0.8125rem] font-medium transition-colors",
                isHome && active === id
                  ? "bg-brand/15 text-brand"
                  : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
              )}
            >
              {t.nav[id]}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
