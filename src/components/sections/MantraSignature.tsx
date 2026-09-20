import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const facets = ["Mind", "Body", "Purpose", "Community", "Opportunity", "Leadership", "Talent", "Research"];

export function MantraSignature() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.9]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.5], ["-0.02em", "0.05em"]);
  const wordOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const wordY = useTransform(scrollYProgress, [0.15, 0.35], [24, 0]);

  if (reduced) {
    return (
      <section className="border-t border-line py-28">
        <div className="container-mantra text-center">
          <h2 className="font-display text-6xl text-paper md:text-8xl">MANTRA</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-mist">
            {facets.map((facet) => (
              <span key={facet} className="text-lg">{facet}</span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[260vh] border-t border-line">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <motion.h2
          style={{ scale, letterSpacing }}
          className="select-none font-display text-[20vw] leading-none text-paper md:text-[16rem]"
        >
          MANTRA
        </motion.h2>
        <motion.div
          style={{ opacity: wordOpacity, y: wordY }}
          className="pointer-events-none absolute inset-x-0 bottom-[18%] flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6"
        >
          {facets.map((facet, i) => (
            <span key={facet} className={i % 2 === 0 ? "text-ember" : "text-indigo-soft"} style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.25rem)" }}>
              {facet}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
