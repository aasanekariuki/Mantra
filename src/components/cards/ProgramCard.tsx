import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Program } from "../../types/content";
import { ScrollReveal } from "../animation/ScrollReveal";

export function ProgramCard({ program, index = 0 }: { program: Program; index?: number }) {
  return (
    <ScrollReveal delay={index * 0.06}>
      <Link
        to={`/programs/${program.slug}`}
        className="group grid gap-6 border-t border-line py-10 transition-colors md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10"
      >
        <span className="font-display text-sm text-mist">{program.code}</span>
        <div>
          <h3 className="font-display text-2xl text-paper transition-colors group-hover:text-ember md:text-3xl">
            {program.name}
          </h3>
          <p className="mt-2 max-w-lg text-mist">{program.tagline}</p>
        </div>
        <ArrowUpRight
          size={26}
          className="text-mist transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ember"
        />
      </Link>
    </ScrollReveal>
  );
}
