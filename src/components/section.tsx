import { type ReactNode } from "react";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 pt-10">
      <h2 className="mb-4 border-b border-border pb-1.5 font-sans text-[1.125rem] font-semibold tracking-[-0.01em]">
        {title}
      </h2>
      {children}
    </section>
  );
}
