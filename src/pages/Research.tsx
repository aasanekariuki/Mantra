import { useRef, type ReactNode } from "react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  Activity,
  ArrowDownRight,
  BarChart3,
  Brain,
  Database,
  Hexagon,
  Microchip,
  Orbit,
  Rss,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { PageHeader } from "../components/layout/PageHeader";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ResearchCard } from "../components/cards/ResearchCard";
import { CTASection } from "../components/sections/CTASection";
import { researchItems } from "../data/research";
import { ScrollReveal } from "../components/animation/ScrollReveal";

const focusAreas = [
  {
    label: "Mental Wellbeing",
    value: 30,
    icon: Brain,
    color: "from-ember to-neon-amber",
    accent: "text-neon-amber",
    glow: "bg-neon-amber",
  },
  {
    label: "Economic Capability",
    value: 25,
    icon: BarChart3,
    color: "from-neon-mint to-neon-cyan",
    accent: "text-neon-mint",
    glow: "bg-neon-mint",
  },
  {
    label: "Community & Relationships",
    value: 25,
    icon: ShieldCheck,
    color: "from-indigo-soft to-neon-cyan",
    accent: "text-neon-cyan",
    glow: "bg-neon-cyan",
  },
  {
    label: "Physical Health",
    value: 20,
    icon: Activity,
    color: "from-neon-cyan to-ember",
    accent: "text-neon-cyan",
    glow: "bg-neon-cyan",
  },
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

  const styles = {
    mint: "bg-neon-mint shadow-[0_0_18px_rgba(0,255,135,0.8)]",
    cyan: "bg-neon-cyan shadow-[0_0_18px_rgba(0,240,255,0.8)]",
    amber: "bg-neon-amber shadow-[0_0_18px_rgba(255,180,0,0.8)]",
  };

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute h-1.5 w-1.5 rounded-full ${styles[accent]} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -18, 0],
              x: [0, 8, 0],
              opacity: [0.35, 1, 0.35],
              scale: [0.8, 1.3, 0.8],
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
  duration = 16,
  reverse = false,
}: {
  className?: string;
  color?: "mint" | "cyan" | "amber";
  duration?: number;
  reverse?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const border = {
    mint: "border-neon-mint/25",
    cyan: "border-neon-cyan/25",
    amber: "border-neon-amber/25",
  };

  const dot = {
    mint: "bg-neon-mint shadow-[0_0_14px_rgba(0,255,135,0.8)]",
    cyan: "bg-neon-cyan shadow-[0_0_14px_rgba(0,240,255,0.8)]",
    amber: "bg-neon-amber shadow-[0_0_14px_rgba(255,180,0,0.8)]",
  };

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border ${border[color]} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: reverse ? [360, 0] : [0, 360],
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <span
        className={`absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${dot[color]}`}
      />
    </motion.div>
  );
}

function DecorativeCorner({
  accent = "mint",
}: {
  accent?: "mint" | "cyan" | "amber";
}) {
  const border = {
    mint: "border-neon-mint/30",
    cyan: "border-neon-cyan/30",
    amber: "border-neon-amber/30",
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 h-20 w-20 overflow-hidden"
    >
      <div
        className={`absolute right-4 top-4 h-8 w-8 rotate-45 border-r border-t ${border[accent]}`}
      />
      <div
        className={`absolute right-0 top-0 h-14 w-14 border-l border-b opacity-40 ${border[accent]}`}
      />
    </div>
  );
}


export default function Research() {
  const heroRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.5,
  });

  const heroY = useTransform(smoothProgress, [0, 1], [0, -90]);
  const heroScale = useTransform(smoothProgress, [0, 1], [1, 0.96]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  return (
    <main className="relative isolate overflow-hidden bg-ink text-paper selection:bg-neon-cyan/30 selection:text-neon-cyan">
      {/* Ambient cyber atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-20 h-[38rem] w-[38rem] rounded-full bg-neon-cyan/10 blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-[32%] h-[40rem] w-[40rem] rounded-full bg-ember/10 blur-[160px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10%] left-[28%] h-[26rem] w-[26rem] rounded-full bg-neon-mint/5 blur-[140px]"
      />

      {/* Cyber grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 240, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 0, 0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, black 12%, black 58%, transparent 94%)",
        }}
      />

      {/* Fine radial texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 72%)",
        }}
      />

      {/* Ambient particles */}
      <FloatingOrb
        className="left-[12%] top-[18rem]"
        delay={0.2}
        accent="cyan"
      />
      <FloatingOrb
        className="right-[17%] top-[25rem]"
        delay={1.3}
        duration={7}
        accent="mint"
      />
      <FloatingOrb
        className="left-[42%] top-[42rem]"
        delay={2}
        duration={8}
        accent="amber"
      />
      <FloatingOrb
        className="right-[8%] top-[60rem]"
        delay={0.8}
        duration={7.5}
        accent="cyan"
      />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[640px] overflow-hidden border-b border-line/60"
      >
        <motion.div
          style={
            reduceMotion
              ? undefined
              : {
                  y: heroY,
                  scale: heroScale,
                  opacity: heroOpacity,
                }
          }
          className="relative z-10"
        >
          <div className="container-mantra relative pt-10 sm:pt-14 md:pt-16">
            {/* Floating status */}
            <FloatingObject
              className="right-[5%] top-12 hidden lg:block"
              delay={0.3}
              duration={8}
            >
              <div className="flex items-center gap-2.5 rounded-full border border-neon-cyan/30 bg-ink-soft/80 px-4 py-2 backdrop-blur-xl shadow-[0_0_24px_rgba(0,240,255,0.12)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
                </span>

                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neon-cyan">
                  Data & Evidence Base
                </span>
              </div>
            </FloatingObject>

            {/* Floating hex geometry */}
            <FloatingObject
              className="right-[17%] top-28 hidden xl:block"
              delay={0.7}
              duration={9}
            >
              <div className="relative flex h-20 w-20 rotate-12 items-center justify-center">
                <Hexagon
                  size={70}
                  strokeWidth={0.8}
                  className="text-neon-cyan/25"
                />
                <div className="absolute h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_18px_rgba(0,240,255,0.8)]" />
              </div>
            </FloatingObject>

            <OrbitalRing
              className="right-[2%] top-24 hidden h-40 w-40 lg:block"
              color="cyan"
              duration={18}
            />

            <OrbitalRing
              className="left-[-4rem] top-56 hidden h-48 w-48 lg:block"
              color="mint"
              duration={22}
              reverse
            />

            <FloatingObject
              className="left-[3%] top-52 hidden lg:block"
              delay={1}
              duration={7}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-soft/70 text-neon-cyan backdrop-blur-md">
                <Database size={17} />
              </div>
            </FloatingObject>

            <PageHeader
              eyebrow="Research"
              title="Understanding men. Building better systems."
              description="MANTRA is building its programs on evidence, not assumption. This page will grow as research partnerships and publications go live."
            />

            {/* Hero intelligence rail */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease }}
              className="mt-10 grid max-w-3xl grid-cols-3 overflow-hidden rounded-2xl border border-line/60 bg-ink-soft/40 backdrop-blur-xl"
            >
              {([
                ["01", "Observe", Brain, "cyan"],
                ["02", "Measure", BarChart3, "mint"],
                ["03", "Improve", Activity, "amber"],
              ] as const).map(([number, label, Icon, accent], i) => {
                const iconStyles = {
                  mint: "text-neon-mint",
                  cyan: "text-neon-cyan",
                  amber: "text-neon-amber",
                };

                return (
                  <div
                    key={String(label)}
                    className={`relative flex items-center gap-3 px-4 py-4 sm:px-5 ${
                      i !== 2 ? "border-r border-line/60" : ""
                    }`}
                  >
                    <span className="text-[9px] font-mono text-paper-dim">
                      {number}
                    </span>

                    <Icon
                      size={14}
                      className={iconStyles[accent as keyof typeof iconStyles]}
                    />

                    <span className="text-xs uppercase tracking-wider text-paper-dim">
                      {label}
                    </span>

                    <span
                      className={`ml-auto hidden h-1.5 w-1.5 rounded-full ${
                        accent === "cyan"
                          ? "bg-neon-cyan"
                          : accent === "amber"
                            ? "bg-neon-amber"
                            : "bg-neon-mint"
                      }`}
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Hero bottom geometry */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-2.5rem] left-1/2 h-20 w-20 -translate-x-1/2 rotate-45 border border-neon-cyan/10"
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: [45, 135, 45],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent"
        />
      </section>

      {/* Research focus */}
      <section className="relative overflow-hidden border-b border-line/60 py-16 sm:py-20 md:py-24">
        <FloatingObject
          className="left-[4%] top-20 hidden lg:block"
          delay={0.4}
          duration={7}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-neon-cyan backdrop-blur-md">
            <Database size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="right-[5%] bottom-20 hidden lg:block"
          delay={0.7}
          duration={6}
        >
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-ember backdrop-blur-md">
            <Microchip size={18} />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-neon-amber shadow-[0_0_12px_rgba(255,180,0,0.7)]" />
          </div>
        </FloatingObject>

        <div className="container-mantra relative z-10">
          <ScrollReveal delay={0.1}>
            <SectionHeading
              label="Early research focus"
              title="Where MANTRA's research agenda is starting."
              description="A working allocation of early research attention across MANTRA's pillars, subject to change as findings come in."
            />
          </ScrollReveal>

          {/* Focus visualization */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.7, ease }}
            className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-line/70 bg-ink-soft/40 p-5 sm:p-7 md:p-8 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
          >
            <DecorativeCorner accent="cyan" />

            {/* Inner grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,240,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.35) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Header */}
            <div className="relative z-10 mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-2 text-neon-cyan">
                  <Orbit size={15} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em]">
                    Allocation matrix
                  </span>
                </div>

                <p className="mt-2 text-sm text-paper-dim">
                  Current working distribution of research attention.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-line/60 bg-ink/50 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-mint shadow-[0_0_10px_rgba(0,255,135,0.7)]" />
                <span className="text-[9px] font-mono uppercase tracking-wider text-paper-dim">
                  Working model
                </span>
              </div>
            </div>

            <div className="relative z-10 grid gap-7">
              {focusAreas.map((area, i) => {
                const Icon = area.icon;

                return (
                  <motion.div
                    key={area.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.08,
                      ease,
                    }}
                    className="group relative"
                  >
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <motion.div
                          whileHover={
                            reduceMotion
                              ? undefined
                              : {
                                  rotate: 8,
                                  scale: 1.06,
                                }
                          }
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-ink/70 ${area.accent} backdrop-blur-md`}
                        >
                          <Icon size={15} />
                        </motion.div>

                        <div className="min-w-0">
                          <span className="block truncate text-sm font-medium text-paper transition-colors duration-200 group-hover:text-neon-cyan">
                            {area.label}
                          </span>

                          <span className="mt-0.5 block text-[9px] font-mono uppercase tracking-wider text-paper-dim">
                            Research pillar {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>

                      <motion.span
                        className={`shrink-0 font-mono text-xs ${area.accent}`}
                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                                scale: 1.08,
                              }
                        }
                      >
                        {area.value}%
                      </motion.span>
                    </div>

                    <div className="relative h-3.5 w-full overflow-hidden rounded-full border border-line/60 bg-ink/80 p-0.5">
                      <motion.div
                        className={`relative h-full rounded-full bg-gradient-to-r ${area.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${area.value}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                          duration: 1.05,
                          delay: 0.15 + i * 0.1,
                          ease,
                        }}
                      >
                        <motion.span
                          className="absolute right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-paper/80"
                          animate={
                            reduceMotion
                              ? undefined
                              : {
                                  opacity: [0.3, 1, 0.3],
                                }
                          }
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom telemetry */}
            <div className="relative z-10 mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line/50 pt-5">
              <span className="text-[9px] font-mono uppercase tracking-wider text-paper-dim">
                Evidence evolves
              </span>

              <span className="h-px w-8 bg-line" />

              <span className="text-[9px] font-mono uppercase tracking-wider text-neon-cyan">
                4 focus areas
              </span>

              <span className="ml-auto hidden items-center gap-2 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.6)]" />
                <span className="text-[9px] font-mono uppercase tracking-wider text-paper-dim">
                  Subject to findings
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reports & publications */}
      <section className="relative overflow-hidden border-b border-line/60 py-16 sm:py-20 md:py-24">
        <FloatingObject
          className="right-[5%] top-20 hidden lg:block"
          delay={0.5}
          duration={8}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-neon-mint backdrop-blur-md">
            <Sparkles size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="left-[6%] bottom-20 hidden xl:block"
          delay={1}
          duration={9}
        >
          <div className="h-12 w-12 rotate-45 border border-neon-amber/20 bg-ink-soft/30 backdrop-blur-sm" />
        </FloatingObject>

        <OrbitalRing
          className="right-[-3rem] bottom-[-4rem] hidden h-36 w-36 lg:block"
          color="mint"
          duration={20}
          reverse
        />

        <div className="container-mantra relative z-10">
          <ScrollReveal delay={0.1}>
            <SectionHeading
              label="Reports & Publications"
              title="Sample research content."
              description="These are placeholder examples of how MANTRA will publish real research and data."
            />
          </ScrollReveal>

          <div className="relative mt-10">
            {/* Grid decoration */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-5 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,255,135,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.6) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                maskImage:
                  "linear-gradient(to bottom, black, transparent 90%)",
              }}
            />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.12 }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="relative grid gap-6 md:grid-cols-2"
            >
              {researchItems.map((item, i) => (
                <motion.div
                  key={item.slug}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 28,
                      scale: 0.98,
                    },
                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.65,
                        ease,
                      },
                    },
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -5,
                        }
                  }
                  className="group relative"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-2 rounded-[1.75rem] bg-neon-cyan/[0.025] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="relative overflow-hidden rounded-[1.5rem]">
                    <ResearchCard item={item} index={i} />

                    <DecorativeCorner
                      accent={i % 3 === 0 ? "cyan" : i % 3 === 1 ? "mint" : "amber"}
                    />

                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent opacity-0 group-hover:opacity-100"
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              x: ["-100%", "100%"],
                            }
                      }
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <div className="pointer-events-none absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-line/60 bg-ink/80 text-neon-cyan backdrop-blur-md">
                        <ArrowDownRight size={14} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Evidence statement */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease }}
            className="relative mt-12 overflow-hidden rounded-[1.75rem] border border-line/60 bg-ink-soft/35 p-6 sm:p-8 backdrop-blur-xl"
          >
            <OrbitalRing
              className="right-[-2rem] top-[-3rem] h-28 w-28"
              color="cyan"
              duration={17}
            />

            <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neon-mint/20 bg-ink text-neon-mint">
                <Rss size={17} />
              </div>

              <div className="max-w-2xl">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neon-mint">
                  Evidence first
                </p>

                <p className="mt-2 text-sm leading-6 text-paper-dim">
                  As research goes live, this archive becomes a transparent
                  record of what MANTRA learns, what changes, and why.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <FloatingObject
          className="right-[10%] top-12 hidden md:block"
          delay={0.6}
          duration={7}
        >
          <div className="h-3.5 w-3.5 rounded-full bg-neon-cyan/60 shadow-[0_0_18px_rgba(0,240,255,0.6)]" />
        </FloatingObject>

        <FloatingObject
          className="left-[10%] top-16 hidden md:block"
          delay={1.2}
          duration={9}
        >
          <div className="h-8 w-8 rotate-45 border border-neon-amber/20" />
        </FloatingObject>

        <OrbitalRing
          className="right-[-3rem] top-4 hidden h-28 w-28 md:block"
          color="cyan"
          duration={15}
        />

        <OrbitalRing
          className="left-[-4rem] bottom-2 hidden h-32 w-32 md:block"
          color="amber"
          duration={19}
          reverse
        />

        <div className="relative z-20">
          <CTASection
            title="Help build MANTRA's research agenda."
            description="Academics, practitioners and data partners are welcome to shape what MANTRA studies first."
            primaryLabel="Partner with us"
            primaryTo="/partners"
          />
        </div>
      </section>

      {/* Closing signal */}
      <div
        aria-hidden="true"
        className="relative h-20 overflow-hidden border-t border-line/50"
      >
        <motion.div
          className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.3, 0.8, 0.3],
                  scaleX: [0.85, 1, 0.85],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <FloatingOrb
          className="left-[18%] top-8"
          delay={0.2}
          accent="mint"
        />

        <FloatingOrb
          className="left-[50%] top-8"
          delay={1.2}
          duration={7}
          accent="cyan"
        />

        <FloatingOrb
          className="right-[20%] top-8"
          delay={2}
          duration={8}
          accent="amber"
        />

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3">
          <span className="h-px w-8 bg-neon-cyan/20" />
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-paper-dim">
            Research in motion
          </span>
          <span className="h-px w-8 bg-neon-cyan/20" />
        </div>
      </div>
    </main>
  );
}