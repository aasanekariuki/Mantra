import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { ScrollReveal } from "../animation/ScrollReveal";

interface SectionHeadingProps {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ label, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <ScrollReveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {label && <p className="mb-4 text-sm text-ember">{label}</p>}
      <h2 className="text-balance text-4xl leading-[1.08] text-paper md:text-5xl">{title}</h2>
      {description && <p className="mt-5 text-balance text-lg leading-relaxed text-mist">{description}</p>}
    </ScrollReveal>
  );
}
