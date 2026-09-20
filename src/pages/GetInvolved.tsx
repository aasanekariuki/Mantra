import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  Shield,
  Compass,
  Zap,
  Orbit,
  Target,
  Users,
  Radio,
} from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";
import { ScrollReveal } from "../components/animation/ScrollReveal";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { involvementPaths } from "../data/involvement";
import type { InvolvementPath } from "../types/content";

const ease = [0.16, 1, 0.3, 1] as const;

const icons = [Shield, Compass, Zap, Sparkles];

const cardAccents = [
  {
    text: "text-neon-mint",
    border: "group-hover:border-neon-mint/40",
    glow: "bg-neon-mint/10",
  },
  {
    text: "text-neon-cyan",
    border: "group-hover:border-neon-cyan/40",
    glow: "bg-neon-cyan/10",
  },
  {
    text: "text-neon-amber",
    border: "group-hover:border-neon-amber/40",
    glow: "bg-neon-amber/10",
  },
  {
    text: "text-neon-mint",
    border: "group-hover:border-neon-mint/40",
    glow: "bg-neon-mint/10",
  },
];

function FloatingObject({
  className = "",
  delay = 0,
  duration = 7,
  children,
}: {
  className?: string;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
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

function OrbitalRing({
  className = "",
  duration = 24,
  reverse = false,
}: {
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-line/60 ${className}`}
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
    />
  );
}

function AmbientNode({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
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
              opacity: [0.25, 1, 0.25],
              scale: [0.8, 1.35, 0.8],
            }
      }
      transition={{
        duration: 3.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function NetworkDecoration() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      <OrbitalRing
        className="right-[-13rem] top-[-10rem] h-[38rem] w-[38rem]"
        duration={28}
      />

      <OrbitalRing
        className="right-[-6rem] top-[-3rem] h-[28rem] w-[28rem] border-neon-cyan/20"
        duration={20}
        reverse
      />

      <OrbitalRing
        className="right-[2rem] top-[5rem] h-[18rem] w-[18rem] border-neon-mint/20"
        duration={16}
      />

      <AmbientNode className="right-[22rem] top-[8rem]" delay={0.2} />
      <AmbientNode
        className="right-[11rem] top-[20rem] bg-neon-cyan shadow-[0_0_18px_rgba(0,240,255,0.8)]"
        delay={1}
      />
      <AmbientNode
        className="right-[28rem] top-[26rem] bg-neon-amber shadow-[0_0_18px_rgba(255,180,0,0.8)]"
        delay={1.8}
      />

      <div className="absolute right-[13rem] top-[14rem] h-px w-32 rotate-[28deg] bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
      <div className="absolute right-[22rem] top-[22rem] h-px w-28 rotate-[-24deg] bg-gradient-to-r from-transparent via-neon-mint/30 to-transparent" />

      <motion.div
        className="absolute right-[8%] top-[20%] flex h-14 w-14 rotate-12 items-center justify-center rounded-2xl border border-line bg-ink-soft/70 text-neon-cyan backdrop-blur-xl"
        animate={{
          y: [0, -10, 0],
          rotate: [12, 17, 12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-2 rounded-xl border border-current/10" />
        <Orbit size={18} />
      </motion.div>

      <motion.div
        className="absolute right-[16%] top-[47%] flex h-10 w-10 items-center justify-center rounded-xl border border-neon-mint/20 bg-ink-soft/60 text-neon-mint backdrop-blur-xl"
        animate={{
          y: [0, 12, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 6,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Target size={15} />
      </motion.div>
    </div>
  );
}

export default function GetInvolved() {
  const [selected, setSelected] = useState<InvolvementPath | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative isolate overflow-hidden bg-ink text-paper selection:bg-neon-mint/30 selection:text-neon-mint">
      {/* =========================================================
          GLOBAL ATMOSPHERE
      ========================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-16 h-[38rem] w-[38rem] rounded-full bg-neon-mint/10 blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-[35%] h-[40rem] w-[40rem] rounded-full bg-neon-cyan/10 blur-[160px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[5%] left-[25%] h-[30rem] w-[30rem] rounded-full bg-neon-amber/5 blur-[150px]"
      />

      {/* Cyber Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 255, 135, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, black 20%, transparent 92%)",
        }}
      />

      {/* Vertical Rails */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[7%] top-0 hidden h-[100rem] w-px bg-gradient-to-b from-transparent via-line/30 to-transparent lg:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[7%] top-[10rem] hidden h-[90rem] w-px bg-gradient-to-b from-transparent via-line/30 to-transparent lg:block"
      />

      <NetworkDecoration />

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative overflow-hidden pb-20 pt-8 sm:pb-24 sm:pt-12 md:pb-28 md:pt-16">
        <FloatingObject
          className="right-[8%] top-[12%] hidden lg:block"
          delay={0.3}
          duration={8}
        >
          <div className="flex items-center gap-2.5 rounded-full border border-neon-mint/30 bg-ink-soft/80 px-4 py-2 backdrop-blur-xl shadow-[0_0_24px_rgba(0,255,135,0.12)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-mint" />
            </span>

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neon-mint">
              Pathways & Participation
            </span>
          </div>
        </FloatingObject>

        <FloatingObject
          className="left-[7%] top-[30%] hidden xl:block"
          delay={1}
          duration={7}
        >
          <div className="h-8 w-8 rotate-45 rounded-lg border border-neon-cyan/20 bg-neon-cyan/5" />
        </FloatingObject>

        <div className="container-mantra relative z-20">
          <PageHeader
            eyebrow="Get Involved"
            title="Pick your way into MANTRA."
            description="Whether you have five hours a month or a whole organization behind you — there's a place to start."
          />

          {/* Hero Information Rail */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.8,
              ease,
            }}
            className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-3"
          >
            <div className="group rounded-xl border border-line/70 bg-ink-soft/45 p-4 backdrop-blur-xl transition-colors duration-300 hover:border-neon-mint/30">
              <div className="flex items-center gap-2">
                <Shield
                  size={14}
                  className="text-neon-mint transition-transform duration-300 group-hover:scale-110"
                />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist">
                  Principle
                </span>
              </div>

              <p className="mt-3 font-display text-lg text-paper">
                Trust first
              </p>
            </div>

            <div className="group rounded-xl border border-line/70 bg-ink-soft/45 p-4 backdrop-blur-xl transition-colors duration-300 hover:border-neon-cyan/30">
              <div className="flex items-center gap-2">
                <Compass
                  size={14}
                  className="text-neon-cyan transition-transform duration-300 group-hover:scale-110"
                />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist">
                  Direction
                </span>
              </div>

              <p className="mt-3 font-display text-lg text-paper">
                Find your role
              </p>
            </div>

            <div className="group rounded-xl border border-line/70 bg-ink-soft/45 p-4 backdrop-blur-xl transition-colors duration-300 hover:border-neon-amber/30">
              <div className="flex items-center gap-2">
                <Zap
                  size={14}
                  className="text-neon-amber transition-transform duration-300 group-hover:scale-110"
                />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist">
                  Movement
                </span>
              </div>

              <p className="mt-3 font-display text-lg text-paper">
                Build with us
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={{
              delay: 0.7,
              duration: 0.8,
            }}
            className="mt-12 flex items-center gap-3 text-mist/60"
          >
            <span className="h-px w-10 bg-line" />

            <span className="font-mono text-[9px] uppercase tracking-[0.22em]">
              Choose a pathway
            </span>

            <motion.span
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, 5, 0],
                    }
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowRight size={13} />
            </motion.span>
          </motion.div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink via-ink/40 to-transparent"
        />
      </section>

      {/* =========================================================
          INVOLVEMENT PATHWAYS
      ========================================================== */}

      <section className="relative overflow-hidden border-t border-line/60 py-20 sm:py-24 md:py-28 lg:py-32">
        <FloatingObject
          className="left-[4%] top-20 hidden lg:block"
          delay={0.5}
          duration={7}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-neon-mint backdrop-blur-md">
            <Compass size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="right-[5%] bottom-16 hidden lg:block"
          delay={0.8}
          duration={6}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-neon-cyan backdrop-blur-md">
            <Zap size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="right-[14%] top-[30%] hidden xl:block"
          delay={1.4}
          duration={8}
        >
          <div className="h-3 w-3 rounded-full bg-neon-amber shadow-[0_0_18px_rgba(255,180,0,0.7)]" />
        </FloatingObject>

        <div className="container-mantra relative z-10">
          {/* Section Intro */}
          <ScrollReveal delay={0.05}>
            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line/70 bg-ink-soft/50 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-mist backdrop-blur-md">
                  <span className="text-neon-mint">01</span>
                  <span className="h-2 w-px bg-line" />
                  <span>Participation paths</span>
                </div>

                <h2 className="max-w-2xl font-display text-3xl leading-tight text-paper sm:text-4xl">
                  There is more than one way to build the movement.
                </h2>
              </div>

              <div className="flex items-center gap-2 text-mist/50">
                <Radio size={13} className="text-neon-mint" />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em]">
                  Open network
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {involvementPaths.map((path, i) => {
              const Icon = icons[i % icons.length];
              const accent = cardAccents[i % cardAccents.length];
              const isAccent = i === 0;

              return (
                <ScrollReveal
                  key={path.slug}
                  delay={i * 0.07}
                >
                  <motion.div
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 24,
                          }
                    }
                    whileInView={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                            y: 0,
                          }
                    }
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.04,
                      ease,
                    }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -7,
                          }
                    }
                    className="group relative flex h-full"
                  >
                    {/* Accent Glow */}
                    {isAccent && (
                      <div
                        aria-hidden="true"
                        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-neon-mint/20 via-neon-cyan/10 to-transparent opacity-50 blur-xl transition duration-500 group-hover:opacity-100"
                      />
                    )}

                    {/* Card */}
                    <div
                      className={`relative flex min-h-[330px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-line/80 bg-ink-soft/45 p-6 backdrop-blur-xl transition-all duration-500 group-hover:bg-ink-soft/80 sm:p-7 ${accent.border}`}
                    >
                      {/* Card Grid */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                          backgroundSize: "28px 28px",
                        }}
                      />

                      {/* Corner Number */}
                      <span className="absolute right-5 top-5 font-mono text-[8px] tracking-[0.2em] text-mist/30">
                        0{i + 1}
                      </span>

                      {/* Hover Glow */}
                      <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-0 blur-3xl transition duration-700 group-hover:opacity-100 ${accent.glow}`}
                      />

                      <div className="relative z-10">
                        {/* Icon */}
                        <motion.span
                          whileHover={
                            reduceMotion
                              ? undefined
                              : {
                                  scale: 1.08,
                                  rotate: 7,
                                }
                          }
                          transition={{
                            duration: 0.35,
                            ease,
                          }}
                          className={`relative flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-ink/70 ${accent.text}`}
                        >
                          <span className="absolute inset-1.5 rounded-lg border border-current/10" />
                          <Icon size={19} />
                        </motion.span>

                        {/* Label */}
                        <p
                          className={`mt-7 font-mono text-[9px] uppercase tracking-[0.2em] ${accent.text} opacity-70`}
                        >
                          Pathway {String(i + 1).padStart(2, "0")}
                        </p>

                        {/* Title */}
                        <h3 className="mt-2 max-w-[14rem] font-display text-2xl leading-tight text-paper transition-colors duration-300 group-hover:text-neon-mint">
                          {path.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-3 text-sm leading-6 text-mist transition-colors duration-300 group-hover:text-paper-dim">
                          {path.description}
                        </p>
                      </div>

                      {/* Action */}
                      <div className="relative z-10 mt-8 border-t border-line/50 pt-5">
                        <button
                          type="button"
                          onClick={() => setSelected(path)}
                          aria-label={`Explore ${path.title}`}
                          className="group/button inline-flex w-full items-center justify-between rounded-xl border border-line/60 bg-ink/60 px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-paper transition-all duration-300 hover:border-neon-mint hover:bg-neon-mint/10 hover:text-neon-mint focus:outline-none focus:ring-2 focus:ring-neon-mint/40"
                        >
                          <span>{path.cta}</span>

                          <motion.span
                            animate={
                              reduceMotion
                                ? undefined
                                : {
                                    x: [0, 3, 0],
                                  }
                            }
                            transition={{
                              duration: 2.4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <ArrowUpRight
                              size={14}
                              className="transition-transform duration-300 group-hover/button:rotate-6"
                            />
                          </motion.span>
                        </button>
                      </div>

                      {/* Bottom Signal */}
                      <motion.div
                        aria-hidden="true"
                        className={`absolute bottom-0 left-6 h-px w-8 transition-all duration-500 group-hover:w-20 ${accent.text} bg-current opacity-40 group-hover:opacity-80`}
                      />
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Bottom Principle */}
          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-line/60 bg-ink-soft/30 p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-ink-soft/70 text-neon-mint">
                  <CheckCircle size={15} />
                </span>

                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist/50">
                    MANTRA principle
                  </p>

                  <p className="mt-1 text-sm text-paper-dim">
                    Start where you are. Contribute what you can.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pl-12 sm:pl-0">
                <Users size={13} className="text-neon-cyan" />
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-mist">
                  Everyone has a role
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================
          PARTICIPATION VISUAL
      ========================================================== */}

      <section className="relative overflow-hidden border-t border-line/60 py-20 sm:py-24 md:py-28">
        <FloatingObject
          className="left-[7%] top-16 hidden lg:block"
          delay={0.4}
          duration={8}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-ink-soft/60 text-neon-mint backdrop-blur-xl">
            <Users size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="right-[9%] bottom-16 hidden lg:block"
          delay={1.1}
          duration={7}
        >
          <div className="h-3 w-3 rounded-full bg-neon-cyan shadow-[0_0_20px_rgba(0,240,255,0.7)]" />
        </FloatingObject>

        <div className="container-mantra relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <ScrollReveal delay={0.1}>
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line/70 bg-ink-soft/50 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-mist backdrop-blur-md">
                  <span className="text-neon-cyan">02</span>
                  <span className="h-2 w-px bg-line" />
                  <span>Beyond membership</span>
                </div>

                <h2 className="font-display text-3xl leading-tight text-paper sm:text-4xl">
                  Don't just join the community.
                  <span className="mt-1 block text-paper-dim">
                    Help shape it.
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-mist">
                  MANTRA is being built with the men who will use it. Your
                  experience, skills, ideas and presence can help shape what
                  this becomes.
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <span className="h-px w-10 bg-neon-mint/50" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neon-mint">
                    Build with intention
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                {/* Decorative Rings */}
                <OrbitalRing
                  className="-right-8 -top-8 h-48 w-48 border-neon-mint/10"
                  duration={20}
                />

                <OrbitalRing
                  className="-bottom-10 -left-10 h-36 w-36 border-neon-cyan/10"
                  duration={16}
                  reverse
                />

                <div className="relative overflow-hidden rounded-2xl border border-line/80 bg-ink-soft/45 p-2 backdrop-blur-xl">
                  <div className="relative min-h-[280px] overflow-hidden rounded-xl border border-line/50 bg-ink">
                    {/* Abstract Network */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-[0.035]"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(0,255,135,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.7) 1px, transparent 1px)",
                        backgroundSize: "36px 36px",
                      }}
                    />

                    <div className="absolute left-[18%] top-[24%] h-px w-[62%] rotate-[18deg] bg-gradient-to-r from-neon-mint/10 via-neon-mint/60 to-neon-cyan/10" />

                    <div className="absolute left-[23%] top-[52%] h-px w-[50%] rotate-[-20deg] bg-gradient-to-r from-neon-cyan/10 via-neon-cyan/50 to-transparent" />

                    <div className="absolute left-[42%] top-[30%] h-[45%] w-px rotate-[32deg] bg-gradient-to-b from-transparent via-neon-mint/40 to-transparent" />

                    {/* Network Nodes */}
                    {[
                      "left-[18%] top-[27%]",
                      "left-[42%] top-[38%]",
                      "left-[72%] top-[28%]",
                      "left-[28%] top-[66%]",
                      "left-[63%] top-[62%]",
                      "left-[79%] top-[49%]",
                    ].map((position, i) => (
                      <motion.span
                        key={position}
                        className={`absolute ${position} h-2.5 w-2.5 rounded-full ${
                          i % 3 === 0
                            ? "bg-neon-mint shadow-[0_0_18px_rgba(0,255,135,0.8)]"
                            : i % 3 === 1
                              ? "bg-neon-cyan shadow-[0_0_18px_rgba(0,240,255,0.8)]"
                              : "bg-neon-amber shadow-[0_0_18px_rgba(255,180,0,0.7)]"
                        }`}
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                scale: [1, 1.4, 1],
                                opacity: [0.45, 1, 0.45],
                              }
                        }
                        transition={{
                          duration: 2.8 + i * 0.3,
                          delay: i * 0.35,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}

                    {/* Center */}
                    <motion.div
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              y: [0, -6, 0],
                            }
                      }
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neon-mint/30 bg-ink-soft/80 shadow-[0_0_60px_rgba(0,255,135,0.08)] backdrop-blur-xl"
                    >
                      <div className="absolute inset-3 rounded-full border border-line/80" />
                      <div className="absolute inset-6 rounded-full border border-neon-cyan/20" />

                      <span className="font-display text-sm tracking-[0.18em] text-paper">
                        MANTRA
                      </span>
                    </motion.div>

                    {/* Interface Labels */}
                    <div className="absolute left-5 top-5">
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-mist/40">
                        Participation network
                      </p>

                      <p className="mt-1 font-mono text-[9px] text-neon-mint">
                        CONNECTED
                      </p>
                    </div>

                    <div className="absolute bottom-5 right-5 text-right">
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-mist/40">
                        System
                      </p>

                      <p className="mt-1 font-mono text-[9px] text-paper-dim">
                        PEOPLE / PURPOSE / PROGRESS
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          MODAL
      ========================================================== */}

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ""}
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            ease,
          }}
          className="space-y-5"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-neon-mint/20 bg-neon-mint/5 text-neon-mint">
              <Sparkles size={17} />
            </span>

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist/50">
                Selected pathway
              </p>

              <p className="mt-1 text-xs text-paper-dim">
                A place to start building with MANTRA.
              </p>
            </div>
          </div>

          <p className="text-sm leading-7 text-paper-dim">
            {selected?.description}
          </p>

          <div className="flex items-start gap-3 rounded-xl border border-line/60 bg-ink-soft/60 p-4 backdrop-blur-md">
            <CheckCircle
              size={18}
              className="mt-0.5 shrink-0 text-neon-mint"
            />

            <p className="text-xs leading-6 text-mist">
              This pathway isn't accepting live applications yet — reach out
              through the contact page and MANTRA will follow up as soon as
              it's ready.
            </p>
          </div>

          <div className="flex justify-end border-t border-line/50 pt-5">
            <Button
              to="/contact"
              onClick={() => setSelected(null)}
            >
              Go to contact
            </Button>
          </div>
        </motion.div>
      </Modal>
    </main>
  );
}