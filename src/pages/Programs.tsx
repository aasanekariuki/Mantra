import { PageHeader } from "../components/layout/PageHeader";
import { ProgramCard } from "../components/cards/ProgramCard";
import { CTASection } from "../components/sections/CTASection";
import { programs } from "../data/programs";

export default function Programs() {
  return (
    <div>
      <PageHeader
        eyebrow="What We Do"
        title="Six programs, one ecosystem."
        description="Each MANTRA program turns a pillar of wellbeing into practice — most of them still in their founding stage."
      />
      <section className="py-8 md:py-12">
        <div className="container-mantra">
          {programs.map((program, i) => (
            <ProgramCard key={program.slug} program={program} index={i} />
          ))}
          <div className="border-t border-line" />
        </div>
      </section>
      <CTASection
        title="Want to shape one of these programs?"
        description="MANTRA's programs are still being designed. Mentors, facilitators and partners can help shape them from the start."
        primaryLabel="Get Involved"
        primaryTo="/get-involved"
      />
    </div>
  );
}
