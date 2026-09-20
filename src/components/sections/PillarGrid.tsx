import { useState } from "react";
import { motion } from "framer-motion";
import { pillars } from "../../data/pillars";
import { SectionHeading } from "../ui/SectionHeading";
import { cn } from "../../lib/utils";

export function PillarGrid() {
  const [active, setActive] = useState(pillars[0].slug);
  const activePillar = pillars.find((p) => p.slug === active) ?? pillars[0];

  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="container-mantra">
        <SectionHeading
          label="What MANTRA is built on"
          title="Eight pillars, one institution."
          description="Each pillar is a distinct area of work — together, they form the ecosystem MANTRA is building for African men."
        />

        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col">
            {pillars.map((pillar) => (
              <button
                key={pillar.slug}
                onMouseEnter={() => setActive(pillar.slug)}
                onFocus={() => setActive(pillar.slug)}
                className={cn(
                  "flex items-center justify-between border-b border-line py-5 text-left transition-colors",
                  active === pillar.slug ? "text-paper" : "text-mist hover:text-paper/80"
                )}
              >
                <span className="font-display text-2xl md:text-3xl">{pillar.title}</span>
                <span className="hidden text-sm md:block">{pillar.short}</span>
              </button>
            ))}
          </div>

          <motion.div
            key={activePillar.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "flex flex-col justify-between border border-line p-8 md:p-10",
              activePillar.color === "ember" && "bg-gradient-to-br from-ember/10 to-transparent",
              activePillar.color === "indigo" && "bg-gradient-to-br from-indigo/15 to-transparent"
            )}
          >
            <div>
              <p className="text-sm text-ember">{activePillar.short}</p>
              <h3 className="mt-5 font-display text-4xl text-paper md:text-5xl">{activePillar.title}</h3>
              <p className="mt-6 max-w-md text-lg text-mist">{activePillar.description}</p>
            </div>
            <p className="mt-10 text-xs text-mist">Pillar {String(pillars.indexOf(activePillar) + 1).padStart(2, "0")} of {pillars.length}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
