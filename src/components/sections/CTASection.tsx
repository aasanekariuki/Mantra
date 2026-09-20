import { Button } from "../ui/Button";
import { ScrollReveal } from "../animation/ScrollReveal";

interface CTASectionProps {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryTo: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export function CTASection({ title, description, primaryLabel, primaryTo, secondaryLabel, secondaryTo }: CTASectionProps) {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="container-mantra">
        <ScrollReveal className="max-w-2xl">
          <h2 className="text-balance font-display text-4xl leading-[1.1] text-paper md:text-5xl">{title}</h2>
          {description && <p className="mt-5 text-lg text-mist">{description}</p>}
          <div className="mt-9 flex flex-wrap gap-4">
            <Button to={primaryTo}>{primaryLabel}</Button>
            {secondaryLabel && secondaryTo && (
              <Button to={secondaryTo} variant="secondary" icon={false}>
                {secondaryLabel}
              </Button>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
