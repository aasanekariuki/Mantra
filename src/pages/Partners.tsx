import { useRef, type ReactNode } from "react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  Building2,
  Compass,
  Handshake,
  Hexagon,
  Network,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import { PageHeader } from "../components/layout/PageHeader";
// import { SectionHeading } from "../components/ui/SectionHeading";
import { ScrollReveal } from "../components/animation/ScrollReveal";
import { CTASection } from "../components/sections/CTASection";
import { partnerCategories } from "../data/partners";

const categoryIcons = [
  Building2,
  Handshake,
  Shield,
  Zap,
  Compass,
  Sparkles,
];

const categoryAccents = [
  "text-neon-mint",
  "text-neon-cyan",
  "text-neon-amber",
  "text-neon-mint",
  "text-neon-cyan",
  "text-neon-amber",
];

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
              rotate: [0, 6, 0],
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
  accent = "mint",
}: {
  className?: string;
  delay?: number;
  duration?: number;
  accent?: "mint" | "cyan" | "amber";
}) {
  const reduceMotion = useReducedMotion();

  const accentClass = {
    mint: "bg-neon-mint shadow-[0_0_18px_rgba(0,255,135,0.8)]",
    cyan: "bg-neon-cyan shadow-[0_0_18px_rgba(0,240,255,0.8)]",
    amber: "bg-neon-amber shadow-[0_0_18px_rgba(255,180,0,0.8)]",
  }[accent];

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute h-1.5 w-1.5 rounded-full ${accentClass} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -18, 0],
              x: [0, 8, 0],
              opacity: [0.25, 1, 0.25],
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
  accent = "mint",
  duration = 14,
  reverse = false,
}: {
  className?: string;
  accent?: "mint" | "cyan" | "amber";
  duration?: number;
  reverse?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const borderClass = {
    mint: "border-neon-mint/25",
    cyan: "border-neon-cyan/25",
    amber: "border-neon-amber/25",
  }[accent];

  const dotClass = {
    mint: "bg-neon-mint shadow-[0_0_14px_rgba(0,255,135,0.8)]",
    cyan: "bg-neon-cyan shadow-[0_0_14px_rgba(0,240,255,0.8)]",
    amber: "bg-neon-amber shadow-[0_0_14px_rgba(255,180,0,0.8)]",
  }[accent];

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border ${borderClass} ${className}`}
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
        className={`absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full ${dotClass}`}
      />
    </motion.div>
  );
}

function DecorativeGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 255, 135, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.4) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage:
          "linear-gradient(to bottom, black 20%, transparent 90%)",
      }}
    />
  );
}

function DecorativeCorner() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-5 top-5 h-14 w-14 opacity-50"
    >
      <div className="absolute right-0 top-0 h-7 w-7 border-r border-t border-neon-mint/25 transition-all duration-500 group-hover:h-9 group-hover:w-9 group-hover:border-neon-mint/45" />
      <div className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-neon-cyan/20" />
    </div>
  );
}

export default function Partners() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.25,
  });

  const orbitY = useTransform(smoothProgress, [0, 1], [-25, 35]);
  const orbitRotate = useTransform(smoothProgress, [0, 1], [-8, 10]);

  return (
    <main className="relative isolate overflow-hidden bg-ink text-paper selection:bg-neon-mint/30 selection:text-neon-mint">
      {/* =========================================================
          AMBIENT BACKGROUND
      ========================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-10 h-[38rem] w-[38rem] rounded-full bg-neon-mint/10 blur-[160px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-[34%] h-[42rem] w-[42rem] rounded-full bg-neon-cyan/10 blur-[170px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[35%] top-[62%] h-[28rem] w-[28rem] rounded-full bg-neon-amber/5 blur-[150px]"
      />

      <DecorativeGrid />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(0,255,135,0.08), transparent 28%), radial-gradient(circle at 100% 55%, rgba(0,240,255,0.06), transparent 30%)",
        }}
      />

      {/* Floating ambient particles */}
      <FloatingOrb className="left-[8%] top-[17%]" delay={0.2} />
      <FloatingOrb
        className="left-[16%] top-[39%]"
        delay={1}
        duration={7}
        accent="cyan"
      />
      <FloatingOrb
        className="right-[11%] top-[22%]"
        delay={0.8}
        duration={8}
        accent="mint"
      />
      <FloatingOrb
        className="right-[19%] top-[58%]"
        delay={1.6}
        duration={7}
        accent="amber"
      />
      <FloatingOrb
        className="left-[46%] top-[78%]"
        delay={0.5}
        duration={9}
        accent="cyan"
      />

      {/* =========================================================
          HEADER
      ========================================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative pt-8 sm:pt-12"
      >
        {/* Floating status pill */}
        <FloatingObject
          className="right-[7%] top-[10%] hidden lg:block"
          delay={0.3}
          duration={8}
        >
          <div className="flex items-center gap-2.5 rounded-full border border-neon-mint/30 bg-ink-soft/80 px-4 py-2 backdrop-blur-xl shadow-[0_0_25px_rgba(0,255,135,0.12)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-mint opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-mint" />
            </span>

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neon-mint">
              Ecosystem & Alliances
            </span>
          </div>
        </FloatingObject>

        {/* Floating ring */}
        <FloatingObject
          className="left-[6%] top-[17%] hidden lg:block"
          delay={0.9}
          duration={9}
        >
          <div className="relative h-20 w-20">
            <OrbitalRing
              className="inset-0 h-20 w-20"
              accent="cyan"
              duration={18}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <Network size={17} className="text-neon-cyan/70" />
            </div>
          </div>
        </FloatingObject>

        <PageHeader
          eyebrow="Partners"
          title="Building MANTRA alongside institutions that care."
          description="MANTRA is not naming partners until relationships are confirmed — but here's the ecosystem we're building toward."
        />

        {/* Header signal rail */}
        <div className="container-mantra relative z-20 mt-8 sm:mt-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="grid gap-3 sm:grid-cols-3"
          >
            {[
              {
                icon: Building2,
                label: "Institutions",
                value: "Build capacity",
                accent: "text-neon-mint",
              },
              {
                icon: Handshake,
                label: "Collaboration",
                value: "Create pathways",
                accent: "text-neon-cyan",
              },
              {
                icon: Users,
                label: "Community",
                value: "Expand reach",
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
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-mint/[0.025] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

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

                      <p className="mt-0.5 text-sm text-paper/80">
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

      {/* =========================================================
          PARTNER ECOSYSTEM
      ========================================================== */}

      <section
        ref={sectionRef}
        className="relative mt-16 overflow-hidden border-t border-line/60 py-14 sm:mt-20 sm:py-20 md:py-24"
      >
        {/* Large orbital system */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-24 hidden h-72 w-72 lg:block"
          style={{
            y: reduceMotion ? 0 : orbitY,
            rotate: reduceMotion ? 0 : orbitRotate,
          }}
        >
          <OrbitalRing
            className="inset-0 h-72 w-72"
            accent="mint"
            duration={24}
          />

          <OrbitalRing
            className="inset-8 h-56 w-56"
            accent="cyan"
            duration={18}
            reverse
          />

          <OrbitalRing
            className="inset-20 h-40 w-40"
            accent="amber"
            duration={14}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-ink-soft/60 text-neon-mint backdrop-blur-xl shadow-[0_0_35px_rgba(0,255,135,0.08)]">
              <Network size={21} />
            </div>
          </div>
        </motion.div>

        {/* Floating objects */}
        <FloatingObject
          className="left-[4%] top-20 hidden lg:block"
          delay={0.4}
          duration={7}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-neon-mint backdrop-blur-md shadow-[0_0_20px_rgba(0,255,135,0.08)]">
            <Handshake size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="right-[6%] bottom-24 hidden lg:block"
          delay={0.7}
          duration={6}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-neon-cyan backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.08)]">
            <Building2 size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="left-[18%] bottom-16 hidden xl:block"
          delay={1.1}
          duration={8}
        >
          <div className="flex h-9 w-9 rotate-45 items-center justify-center rounded-lg border border-neon-amber/20 bg-ink-soft/30 backdrop-blur-md">
            <div className="h-3 w-3 rounded-sm border border-neon-amber/40" />
          </div>
        </FloatingObject>

        <div className="container-mantra relative z-20">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease }}
            className="mb-9 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-neon-mint/40" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-neon-mint" />
                </span>

                <span className="h-px w-10 bg-neon-mint/20" />

                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper-dim">
                  Partnership matrix
                </span>
              </div>

              <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                Where MANTRA needs partners.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-mist sm:text-base">
                Strategic collaborations that allow us to expand impact,
                create pathways, and build sustainable institutional capacity.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-ink-soft/50 px-3.5 py-2 backdrop-blur-xl">
              <Hexagon size={13} className="text-neon-mint" />

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-dim">
                {partnerCategories.length} categories
              </span>
            </div>
          </motion.div>

          {/* Category grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {partnerCategories.map((category, i) => {
              const Icon = categoryIcons[i % categoryIcons.length];
              const accent =
                categoryAccents[i % categoryAccents.length];
              const isFirst = i === 0;

              return (
                <ScrollReveal
                  key={category.name}
                  delay={i * 0.055}
                >
                  <motion.article
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -7,
                            transition: {
                              duration: 0.28,
                              ease,
                            },
                          }
                    }
                    className="group relative flex h-full min-h-[330px] flex-col justify-between overflow-hidden rounded-2xl border border-line/80 bg-ink-soft/45 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-colors duration-500 hover:border-line hover:bg-ink-soft/75 sm:p-6"
                  >
                    {/* Card glow */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-[60px] transition-all duration-700 ${
                        i % 2 === 0
                          ? "bg-neon-mint/8 group-hover:bg-neon-mint/15"
                          : "bg-neon-cyan/8 group-hover:bg-neon-cyan/15"
                      }`}
                    />

                    {/* First card premium outline */}
                    {isFirst && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-neon-mint/20 via-transparent to-neon-cyan/15 opacity-50 blur-sm transition-opacity duration-500 group-hover:opacity-100"
                      />
                    )}

                    {/* Card grid */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(0, 255, 135, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.035) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                        maskImage:
                          "linear-gradient(to bottom right, black, transparent 70%)",
                      }}
                    />

                    {/* Moving scan line */}
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-0 h-px w-1/3 bg-neon-mint/50"
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              x: ["0%", "210%", "0%"],
                              opacity: [0.15, 0.75, 0.15],
                            }
                      }
                      transition={{
                        duration: 8 + i * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.35,
                      }}
                    />

                    <DecorativeCorner />

                    {/* Floating mini icon */}
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute right-5 top-16"
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              y: [0, -6, 0],
                              rotate: [0, 7, 0],
                            }
                      }
                      transition={{
                        duration: 4 + (i % 3),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.12,
                      }}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-line/60 bg-ink/60 backdrop-blur-md">
                        <Sparkles
                          size={12}
                          className={`${accent} opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
                        />
                      </div>
                    </motion.div>

                    <div className="relative z-10">
                      {/* Icon + number */}
                      <div className="flex items-center justify-between gap-4 pr-9">
                        <motion.div
                          whileHover={
                            reduceMotion
                              ? undefined
                              : {
                                  rotate: 5,
                                  scale: 1.05,
                                }
                          }
                          className={`flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink/60 ${accent} backdrop-blur-md transition-all duration-300 group-hover:border-line`}
                        >
                          <Icon size={18} />
                        </motion.div>

                        <span className="font-mono text-[10px] tracking-[0.2em] text-mist/50">
                          0{i + 1}
                        </span>
                      </div>

                      {/* Mini connector */}
                      <div className="mt-5 flex items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${accent.replace(
                            "text-",
                            "bg-"
                          )}`}
                        />

                        <span className="h-px w-7 bg-line transition-all duration-300 group-hover:w-11" />

                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper-dim">
                          Alignment
                        </span>
                      </div>

                      <h3 className="mt-4 max-w-[85%] font-display text-xl leading-tight text-paper transition-colors duration-300 group-hover:text-neon-mint">
                        {category.name}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-mist transition-colors duration-300 group-hover:text-paper-dim">
                        {category.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="relative z-10 mt-7 border-t border-line/50 pt-4">
                      <div className="flex items-center justify-between gap-3 font-mono text-[10px]">
                        <span className="flex items-center gap-1.5 text-mist/70">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${accent.replace(
                              "text-",
                              "bg-"
                            )}`}
                          />
                          In Alignment Phase
                        </span>

                        <motion.div
                          whileHover={
                            reduceMotion
                              ? undefined
                              : {
                                  x: 3,
                                }
                          }
                          className={`${accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                        >
                          <Zap size={13} />
                        </motion.div>
                      </div>
                    </div>

                    {/* Bottom geometry */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-4 right-5 flex items-center gap-1 opacity-30 transition-opacity duration-300 group-hover:opacity-70"
                    >
                      <span className="h-1 w-1 rounded-full bg-neon-mint" />
                      <span className="h-px w-6 bg-neon-mint/40" />
                      <Hexagon
                        size={10}
                        className="text-neon-mint"
                      />
                    </div>
                  </motion.article>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Ecosystem statement */}
          <ScrollReveal delay={0.15}>
            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -3,
                    }
              }
              className="group relative mt-12 overflow-hidden rounded-2xl border border-line/60 bg-ink-soft/35 p-6 backdrop-blur-xl sm:mt-14 sm:p-7"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-mint/40 to-transparent"
              />

              <DecorativeCorner />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neon-mint/20 bg-neon-mint/5 text-neon-mint">
                    <Network size={18} />
                  </div>

                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neon-mint">
                      The bigger picture
                    </p>

                    <h3 className="mt-1.5 text-lg font-semibold text-paper">
                      Stronger together, built with intention.
                    </h3>

                    <p className="mt-1.5 max-w-2xl text-sm leading-6 text-mist">
                      MANTRA's ecosystem is designed around complementary
                      strengths — institutions, communities, companies and
                      people working together to create durable pathways.
                    </p>
                  </div>
                </div>

                <div className="hidden shrink-0 md:block">
                  <div className="relative h-16 w-16">
                    <OrbitalRing
                      className="h-16 w-16"
                      accent="mint"
                      duration={16}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <Handshake
                        size={16}
                        className="text-neon-mint"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}

      <div className="relative">
        <FloatingObject
          className="left-[8%] top-10 hidden md:block"
          delay={0.5}
          duration={7}
        >
          <div className="relative flex h-10 w-10 items-center justify-center">
            <OrbitalRing
              className="h-10 w-10"
              accent="cyan"
              duration={10}
            />

            <span className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.7)]" />
          </div>
        </FloatingObject>

        <FloatingObject
          className="right-[12%] top-16 hidden lg:block"
          delay={1.1}
          duration={8}
        >
          <div className="flex h-9 w-9 rotate-12 items-center justify-center rounded-lg border border-neon-amber/25 bg-ink-soft/40 text-neon-amber/70 backdrop-blur-md">
            <Sparkles size={13} />
          </div>
        </FloatingObject>

        <FloatingOrb
          className="right-[7%] bottom-14 hidden md:block"
          delay={1}
          duration={7}
          accent="mint"
        />

        <CTASection
          title="Partner with MANTRA"
          description="Whether you're a university, a company or a foundation — there is a role for you in building this."
          primaryLabel="Start a conversation"
          primaryTo="/contact"
        />
      </div>
    </main>
  );
}