import { useMemo, useState, type ReactNode } from "react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  Award,
  Briefcase,
  ChevronRight,
  CircleDot,
  Compass,
  Hexagon,
  Sparkles,
} from "lucide-react";

import { PageHeader } from "../components/layout/PageHeader";
import { FilterBar } from "../components/ui/FilterBar";
import { OpportunityCard } from "../components/cards/OpportunityCard";
import { opportunities } from "../data/opportunities";

const ease = [0.16, 1, 0.3, 1] as const;

function FloatingObject({
  className = "",
  delay = 0,
  duration = 7,
  children,
}: {
  className?: string;
  delay?: number;
  duration?: number;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -14, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.04, 1],
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

function FloatingOrb({
  className = "",
  delay = 0,
  duration = 6,
}: {
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-neon-mint shadow-[0_0_18px_rgba(0,255,135,0.8)] ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -18, 0],
              x: [0, 8, 0],
              opacity: [0.35, 1, 0.35],
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function OrbitalRing({
  className = "",
  color = "mint",
  duration = 14,
  reverse = false,
}: {
  className?: string;
  color?: "mint" | "cyan" | "amber";
  duration?: number;
  reverse?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const colorClasses = {
    mint: "border-neon-mint/25",
    cyan: "border-neon-cyan/25",
    amber: "border-neon-amber/25",
  };

  const dotClasses = {
    mint: "bg-neon-mint shadow-[0_0_14px_rgba(0,255,135,0.8)]",
    cyan: "bg-neon-cyan shadow-[0_0_14px_rgba(0,240,255,0.8)]",
    amber: "bg-neon-amber shadow-[0_0_14px_rgba(255,180,0,0.8)]",
  };

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border ${colorClasses[color]} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: reverse ? -360 : 360,
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <span
        className={`absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full ${dotClasses[color]}`}
      />
    </motion.div>
  );
}

function DecorativeCorner() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-5 top-5 h-14 w-14 opacity-50"
    >
      <div className="absolute right-0 top-0 h-7 w-7 border-r border-t border-neon-mint/30" />
      <div className="absolute bottom-0 left-0 h-7 w-7 border-b border-l border-neon-cyan/20" />
    </div>
  );
}

function SectionMarker() {
  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-2.5 w-2.5 items-center justify-center">
        <span className="absolute h-full w-full animate-ping rounded-full bg-neon-mint/40" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-neon-mint" />
      </span>

      <span className="h-px w-10 bg-line border-line bg-neon-mint/20" />

      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper-dim">
        Opportunity matrix
      </span>
    </div>
  );
}

export default function Opportunities() {
  const [type, setType] = useState("All");
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.25,
  });

  const heroY = useTransform(smoothProgress, [0, 0.35], [0, -55]);
  const heroRotate = useTransform(smoothProgress, [0, 0.35], [0, -3]);

  const types = useMemo(
    () => [
      "All",
      ...Array.from(new Set(opportunities.map((o) => o.type))),
    ],
    []
  );

  const filtered = useMemo(
    () =>
      opportunities.filter(
        (o) => type === "All" || o.type === type
      ),
    [type]
  );

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-ink text-paper selection:bg-neon-mint/30 selection:text-neon-mint">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-16 h-[38rem] w-[38rem] rounded-full bg-neon-mint/10 blur-[160px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-[32%] h-[42rem] w-[42rem] rounded-full bg-neon-cyan/10 blur-[170px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[38%] top-[58%] h-[28rem] w-[28rem] rounded-full bg-neon-amber/5 blur-[150px]"
      />

      {/* Cyber grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 255, 135, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, black 20%, transparent 88%)",
        }}
      />

      {/* Fine radial texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(0,255,135,0.08), transparent 30%), radial-gradient(circle at 100% 50%, rgba(0,240,255,0.06), transparent 30%)",
        }}
      />

      {/* Floating background objects */}
      <FloatingOrb className="left-[9%] top-[18%]" delay={0.2} />
      <FloatingOrb className="left-[17%] top-[44%]" delay={1.1} duration={7} />
      <FloatingOrb className="right-[13%] top-[25%]" delay={0.8} duration={8} />
      <FloatingOrb className="right-[20%] top-[62%]" delay={1.8} duration={7} />
      <FloatingOrb className="left-[48%] top-[78%]" delay={0.5} duration={9} />

      <FloatingObject
        className="left-[3%] top-[24%] hidden xl:block"
        delay={0.4}
        duration={9}
      >
        <div className="h-16 w-16 rotate-12 rounded-2xl border border-neon-mint/20 bg-ink-soft/30 backdrop-blur-md" />
      </FloatingObject>

      <FloatingObject
        className="right-[3%] top-[48%] hidden xl:block"
        delay={1}
        duration={8}
      >
        <div className="flex h-20 w-20 rotate-45 items-center justify-center rounded-[1.25rem] border border-neon-cyan/20 bg-ink-soft/20 backdrop-blur-md">
          <div className="h-8 w-8 rounded-lg border border-neon-cyan/20" />
        </div>
      </FloatingObject>

      {/* Hero / header */}
      <motion.div
        style={{
          y: reduceMotion ? 0 : heroY,
          rotate: reduceMotion ? 0 : heroRotate,
        }}
        className="relative pt-8 sm:pt-12"
      >
        <FloatingObject
          className="right-[8%] top-[11%] hidden lg:block"
          delay={0.3}
          duration={8}
        >
          <div className="flex items-center gap-2.5 rounded-full border border-neon-mint/30 bg-ink-soft/80 px-4 py-2 backdrop-blur-xl shadow-[0_0_25px_rgba(0,255,135,0.12)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-mint opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-mint" />
            </span>

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neon-mint">
              Pathways & Growth
            </span>
          </div>
        </FloatingObject>

        <FloatingObject
          className="left-[7%] top-[18%] hidden lg:block"
          delay={1.2}
          duration={10}
        >
          <OrbitalRing
            className="h-20 w-20"
            color="cyan"
            duration={18}
          />
        </FloatingObject>

        <PageHeader
          eyebrow="Opportunities"
          title="Scholarships, mentorship and pathways forward."
          description="MANTRA will connect men to real opportunities as partnerships confirm. Everything below is a sample of what's coming."
        />

        {/* Hero lower signal rail */}
        <div className="container-mantra relative z-20 mt-8 sm:mt-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="grid gap-3 sm:grid-cols-3"
          >
            {[
              {
                icon: Briefcase,
                label: "Pathways",
                value: "Career & work",
                accent: "text-neon-mint",
              },
              {
                icon: Award,
                label: "Development",
                value: "Mentorship",
                accent: "text-neon-cyan",
              },
              {
                icon: Compass,
                label: "Direction",
                value: "Growth opportunities",
                accent: "text-neon-amber",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.35 + index * 0.08,
                    ease,
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -3,
                          transition: { duration: 0.2 },
                        }
                  }
                  className="group relative overflow-hidden rounded-xl border border-line/60 bg-ink-soft/35 px-4 py-3 backdrop-blur-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-mint/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line/70 bg-ink/50 ${item.accent}`}
                    >
                      <Icon size={16} />
                    </div>

                    <div className="min-w-0">
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper-dim">
                        {item.label}
                      </p>
                      <p className="mt-0.5 truncate text-sm text-paper/80">
                        {item.value}
                      </p>
                    </div>

                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-line transition-colors group-hover:bg-neon-mint" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Main opportunities area */}
      <section className="relative mt-16 overflow-hidden border-t border-line/60 py-14 sm:mt-20 sm:py-20 md:py-24">
        {/* Section decorations */}
        <FloatingObject
          className="left-[4%] top-20 hidden lg:block"
          delay={0.4}
          duration={7}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-neon-mint backdrop-blur-md shadow-[0_0_20px_rgba(0,255,135,0.08)]">
            <Briefcase size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="right-[5%] bottom-16 hidden lg:block"
          delay={0.7}
          duration={6}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-neon-cyan backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.08)]">
            <Award size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="right-[15%] top-10 hidden xl:block"
          delay={1.3}
          duration={9}
        >
          <div className="relative h-14 w-14">
            <OrbitalRing
              className="inset-0 h-14 w-14"
              color="amber"
              duration={12}
              reverse
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={14} className="text-neon-amber" />
            </div>
          </div>
        </FloatingObject>

        <div className="container-mantra relative z-20">
          {/* Section intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease }}
            className="mb-9 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <SectionMarker />

              <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                Explore the pathways taking shape.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-mist sm:text-base">
                Filter the opportunity landscape and explore the areas where
                MANTRA intends to create meaningful access.
              </p>
            </div>

            <motion.div
              whileHover={reduceMotion ? undefined : { y: -2 }}
              className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-ink-soft/50 px-3.5 py-2 backdrop-blur-xl"
            >
              <CircleDot size={13} className="text-neon-mint" />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-dim">
                {filtered.length}{" "}
                {filtered.length === 1 ? "pathway" : "pathways"}
              </span>
            </motion.div>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.05, ease }}
            className="relative overflow-hidden rounded-2xl border border-line/60 bg-ink-soft/40 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:p-5"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 h-px w-1/3 bg-neon-mint/50"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-0 h-px w-1/4 bg-neon-cyan/40"
            />

            <div className="flex items-center justify-between gap-4">
              <div className="hidden items-center gap-2 sm:flex">
                <Hexagon size={14} className="text-neon-mint" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper-dim">
                  Filter matrix
                </span>
              </div>

              <div className="min-w-0 flex-1 sm:flex sm:justify-end">
                <FilterBar
                  options={types}
                  active={type}
                  onChange={setType}
                />
              </div>
            </div>
          </motion.div>

          {/* Opportunity grid */}
          <motion.div
            layout
            className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((opportunity, i) => (
              <motion.div
                key={opportunity.slug}
                layout
                initial={{
                  opacity: 0,
                  y: 22,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -18,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(i * 0.055, 0.3),
                  ease,
                }}
                className="relative"
              >
                <div className="group relative">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-[1.1rem] bg-gradient-to-br from-neon-mint/10 via-transparent to-neon-cyan/10 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="relative">
                    <OpportunityCard
                      opportunity={opportunity}
                      index={i}
                    />
                  </div>

                  {/* Tiny card signal */}
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    initial={false}
                  >
                    <span className="h-1 w-1 rounded-full bg-neon-mint" />
                    <span className="h-px w-5 bg-neon-mint/40" />
                    <ChevronRight
                      size={11}
                      className="text-neon-mint"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mt-8 overflow-hidden rounded-2xl border border-line/60 bg-ink-soft/40 px-6 py-14 text-center backdrop-blur-xl sm:py-16"
            >
              <DecorativeCorner />

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-ink text-neon-mint">
                <Compass size={20} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-paper">
                No pathways in this category yet.
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-mist">
                This space will evolve as MANTRA confirms new partnerships
                and opportunities.
              </p>
            </motion.div>
          )}

          {/* Bottom insight panel */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="relative mt-12 overflow-hidden rounded-2xl border border-line/60 bg-ink-soft/35 p-6 backdrop-blur-xl sm:mt-14 sm:p-7"
          >
            <DecorativeCorner />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-mint/40 to-transparent"
            />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neon-mint/20 bg-neon-mint/5 text-neon-mint">
                  <Sparkles size={17} />
                </div>

                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neon-mint">
                    MANTRA principle
                  </p>

                  <h3 className="mt-1.5 text-lg font-semibold text-paper">
                    Access should lead somewhere.
                  </h3>

                  <p className="mt-1.5 max-w-2xl text-sm leading-6 text-mist">
                    The goal is not simply to list opportunities. It is to
                    build pathways that connect people to development,
                    mentorship and meaningful next steps.
                  </p>
                </div>
              </div>

              <div className="hidden shrink-0 md:block">
                <div className="relative h-16 w-16">
                  <OrbitalRing
                    className="h-16 w-16"
                    color="mint"
                    duration={16}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CircleDot
                      size={15}
                      className="text-neon-mint"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing visual rail */}
      <section className="relative overflow-hidden border-t border-line/50 py-10 sm:py-12">
        <div className="container-mantra">
          <div className="relative flex items-center justify-between overflow-hidden rounded-xl border border-line/50 bg-ink-soft/25 px-4 py-3 backdrop-blur-md sm:px-5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-neon-cyan/50" />
                <span className="relative h-2 w-2 rounded-full bg-neon-cyan" />
              </span>

              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper-dim">
                Building the network
              </span>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <span className="h-px w-12 bg-line" />
              <span className="font-mono text-[9px] text-paper-dim">
                01
              </span>
              <span className="h-px w-12 bg-line" />
              <span className="font-mono text-[9px] text-paper-dim">
                MANTRA
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-mint" />
              <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-neon-amber/50" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}