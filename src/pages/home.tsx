import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { TopBar } from "@/components/top-bar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Blog } from "@/components/sections/blog";
import { Certificates } from "@/components/sections/certificates";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

const GitHubSection = lazy(() =>
  import("@/components/sections/github").then((m) => ({
    default: m.GitHubSection,
  })),
);

function WhenNear({
  children,
  minHeight,
}: {
  children: React.ReactNode;
  minHeight: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show]);

  return (
    <div ref={ref} style={show ? undefined : { minHeight }}>
      {show ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
}

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.slice(1);
    if (!hash) return;
    const id = window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(id);
  }, [location.hash]);

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const run = () => {
      void import("@/pages/blog-post").catch(() => {});
    };
    if (win.requestIdleCallback) {
      const handle = win.requestIdleCallback(run);
      return () => win.cancelIdleCallback?.(handle);
    }
    const handle = window.setTimeout(run, 1500);
    return () => window.clearTimeout(handle);
  }, []);

  return (
    <>
      <TopBar />
      <main className="wrap">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <WhenNear minHeight={180}>
          <GitHubSection />
        </WhenNear>
        <Blog />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
