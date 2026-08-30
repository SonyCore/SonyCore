import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const { t } = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 480);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Button
      type="button"
      size="icon"
      aria-label={t.misc.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      variant="outline"
      className={cn(
        "fixed bottom-5 end-5 z-30 h-10 w-10 border-input bg-popover/90 backdrop-blur transition-all duration-300",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp />
    </Button>
  );
}
