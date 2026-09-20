import { useParams, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";
import { ImageReveal } from "../components/animation/ImageReveal";
import { ScrollReveal } from "../components/animation/ScrollReveal";
import { CTASection } from "../components/sections/CTASection";
import { Tag } from "../components/ui/Tag";
import { programs } from "../data/programs";
import NotFound from "./NotFound";

export default function ProgramDetail() {
  const { slug } = useParams();
  const program = programs.find((p) => p.slug === slug);
  const index = programs.findIndex((p) => p.slug === slug);

  if (!program) return <NotFound />;

  const next = programs[(index + 1) % programs.length];

  return (
    <div>
      <PageHeader eyebrow={`Program ${program.code}`} title={program.name} description={program.tagline} />

      <section className="border-b border-line py-20 md:py-28">
        <div className="container-mantra grid gap-12 md:grid-cols-2 md:gap-16">
          <ImageReveal className="aspect-[4/3] w-full" tone={index % 2 === 0 ? "ember" : "indigo"} label={program.name} />
          <ScrollReveal>
            <Tag tone={program.status === "active" ? "ember" : "mist"}>
              {program.status === "active" ? "Active" : "Building"}
            </Tag>
            <p className="mt-6 text-lg leading-relaxed text-mist">{program.description}</p>
            <ul className="mt-8 space-y-4">
              {program.focus.map((item) => (
                <li key={item} className="flex items-start gap-3 text-paper/90">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ember" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-line py-10">
        <div className="container-mantra flex items-center justify-between">
          <span className="text-sm text-mist">Next program</span>
          <Link to={`/programs/${next.slug}`} className="font-display text-2xl text-paper transition-colors hover:text-ember">
            {next.name} &rarr;
          </Link>
        </div>
      </section>

      <CTASection
        title={`Help shape ${program.name}.`}
        description="This program is still in its founding stage — mentors, facilitators and early members can influence how it's built."
        primaryLabel="Get Involved"
        primaryTo="/get-involved"
      />
    </div>
  );
}
