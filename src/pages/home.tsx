import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "@/components/nav-bar";
import { BackToTop } from "@/components/back-to-top";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { GitHubSection } from "@/components/sections/github";
import { Blog } from "@/components/sections/blog";
import { Certificates } from "@/components/sections/certificates";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export function HomePage() {
  const location = useLocation();

  // When arriving from a non-home route via /#section, scroll to the section
  // after the page has rendered.
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (!hash) return;
    const id = window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(id);
  }, [location.hash]);

  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <GitHubSection />
        <Blog />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
