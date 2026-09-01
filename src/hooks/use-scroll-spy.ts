import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: string[], offset = 96): string {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY + offset + 1;
      let current = sectionIds[0] ?? "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollY) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        current = sectionIds[sectionIds.length - 1] ?? current;
      }
      setActive(current);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds, offset]);

  return active;
}
