import type { ReactNode } from "react";
import { AnimatedText } from "../animation/AnimatedText";
import { ScrollReveal } from "../animation/ScrollReveal";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="border-b border-line pb-16 pt-40 md:pt-48">
      <div className="container-mantra">
        {eyebrow && (
          <ScrollReveal>
            <p className="mb-5 text-sm text-ember">{eyebrow}</p>
          </ScrollReveal>
        )}
        <AnimatedText
          as="h1"
          text={title}
          className="max-w-4xl font-display text-4xl leading-[1.05] text-paper md:text-6xl"
        />
        {description && (
          <ScrollReveal delay={0.15} className="mt-6 max-w-xl text-lg text-mist">
            {description}
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
