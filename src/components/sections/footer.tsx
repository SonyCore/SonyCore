import { resume } from "@/data/resume";

export function Footer() {
  return (
    <footer className="wrap mt-12 border-t border-border py-6 font-sans text-[0.8125rem] text-subtle">
      © {new Date().getFullYear()} {resume.name}
    </footer>
  );
}
