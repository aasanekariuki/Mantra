import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Users,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Compass,
  Shield,
  CircleDot,
  Orbit,
  Target,
  Radio,
} from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ScrollReveal } from "../components/animation/ScrollReveal";
import { Tag } from "../components/ui/Tag";
import { CTASection } from "../components/sections/CTASection";

const chapters = [
  {
    city: "Nairobi",
    status: "Founding chapter",
    icon: Compass,
    accent: "text-neon-mint",
    description: "The first MANTRA chapter. Where the model is being built, tested and shaped.",
    coordinates: "01°17′S 36°49′E",
  },
  {
    city: "Mombasa",
    status: "Coming soon",
    icon: MapPin,
    accent: "text-neon-cyan",
    description: "The next coastal community waiting to connect.",
    coordinates: "04°03′S 39°40′E",
  },
  {
    city: "Kisumu",
    status: "Coming soon",
    icon: MapPin,
    accent: "text-neon-cyan",
    description: "Building community around the lake region.",
    coordinates: "00°06′S 34°45′E",
  },
  {
    city: "Nakuru",
    status: "Coming soon",
    icon: MapPin,
    accent: "text-neon-cyan",
    description: "A future chapter for men across the Rift Valley.",
    coordinates: "00°18′S 36°04′E",
  },
  {
    city: "Eldoret",
    status: "Coming soon",
    icon: MapPin,
    accent: "text-neon-cyan",
    description: "Expanding the network into western Kenya.",
    coordinates: "00°31′N 35°16′E",
  },
  {
    city: "Africa / Future",
    status: "Coming soon",
    icon: Sparkles,
    accent: "text-neon-amber",
    description: "A wider network of connected African communities.",
    coordinates: "THE NEXT CHAPTER",
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
              y: [0, -12, 0],
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
}: {
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -20, 0],
              x: [0, 8, 0],
              opacity: [0.25, 0.75, 0.25],
            }
      }
      transition={{
        duration: 7,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function OrbitalRing({
  className = "",
  delay = 0,
  reverse = false,
}: {
  className?: string;
  delay?: number;
  reverse?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-line/70 ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: reverse ? -360 : 360,
            }
      }
      transition={{
        duration: 26,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

function CommunityNetwork() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      <OrbitalRing className="right-[-11rem] top-[-7rem] h-[34rem] w-[34rem]" />

      <OrbitalRing
        className="right-[-4rem] top-0 h-[25rem] w-[25rem] border-neon-cyan/20"
        delay={1}
        reverse
      />

      <OrbitalRing
        className="right-[4rem] top-[4rem] h-[17rem] w-[17rem] border-neon-mint/20"
        delay={2}
      />

      <motion.div
        className="absolute right-[19rem] top-[7rem] h-2 w-2 rounded-full bg-neon-mint shadow-[0_0_22px_rgba(0,255,135,0.9)]"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, 18, 0],
                opacity: [0.3, 1, 0.3],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute right-[10rem] top-[19rem] h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_22px_rgba(0,240,255,0.9)]"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -16, 0],
                opacity: [0.3, 1, 0.3],
              }
        }
        transition={{
          duration: 5,
          delay: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute right-[12rem] top-[11rem] h-px w-28 rotate-[-25deg] bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
      <div className="absolute right-[7rem] top-[15rem] h-px w-24 rotate-[38deg] bg-gradient-to-r from-transparent via-neon-mint/30 to-transparent" />
    </div>
  );
}

export default function Community() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative isolate overflow-hidden bg-ink text-paper selection:bg-neon-mint/30 selection:text-neon-mint">
      {/* =========================================================
          GLOBAL ATMOSPHERE
      ========================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[36rem] w-[36rem] rounded-full bg-neon-mint/10 blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-[38%] h-[40rem] w-[40rem] rounded-full bg-neon-cyan/10 blur-[160px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] left-[20%] h-[28rem] w-[28rem] rounded-full bg-neon-amber/5 blur-[150px]"
      />

      {/* Grid */}
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
        className="pointer-events-none absolute left-[7%] top-0 hidden h-[70rem] w-px bg-gradient-to-b from-transparent via-line/40 to-transparent lg:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[7%] top-[14rem] hidden h-[70rem] w-px bg-gradient-to-b from-transparent via-line/30 to-transparent lg:block"
      />

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative overflow-hidden pb-20 pt-8 sm:pb-24 sm:pt-12 md:pb-28 lg:pb-32 lg:pt-16">
        <CommunityNetwork />

        <FloatingOrb
          className="left-[14%] top-[25%] h-3 w-3 bg-neon-mint shadow-[0_0_28px_rgba(0,255,135,0.8)]"
          delay={0.3}
        />

        <FloatingOrb
          className="left-[32%] top-[48%] h-2 w-2 bg-neon-cyan shadow-[0_0_22px_rgba(0,240,255,0.8)]"
          delay={1.2}
        />

        <FloatingOrb
          className="right-[21%] top-[30%] h-2 w-2 bg-neon-amber shadow-[0_0_20px_rgba(255,180,0,0.7)]"
          delay={1.8}
        />

        <FloatingObject
          className="right-[8%] top-[12%] hidden lg:block"
          delay={0.2}
          duration={8}
        >
          <div className="flex items-center gap-2.5 rounded-full border border-neon-mint/30 bg-ink-soft/80 px-4 py-2 backdrop-blur-xl shadow-[0_0_24px_rgba(0,255,135,0.12)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-mint" />
            </span>

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neon-mint">
              Collective & Chapters
            </span>
          </div>
        </FloatingObject>

        <div className="container-mantra relative z-20">
          <PageHeader
            eyebrow="Community"
            title="MANTRA is a community first."
            description="Not a publication. Not a resource library. A place men actually belong to — starting with small groups called Circles."
          />

          {/* Hero Data Strip */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease }}
            className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3"
          >
            <div className="rounded-xl border border-line/70 bg-ink-soft/50 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-neon-mint" />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist">
                  Foundation
                </span>
              </div>

              <p className="mt-3 font-display text-lg text-paper">
                Small Circles
              </p>
            </div>

            <div className="rounded-xl border border-line/70 bg-ink-soft/50 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Compass size={14} className="text-neon-cyan" />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist">
                  Starting Point
                </span>
              </div>

              <p className="mt-3 font-display text-lg text-paper">
                Nairobi
              </p>
            </div>

            <div className="rounded-xl border border-line/70 bg-ink-soft/50 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Orbit size={14} className="text-neon-amber" />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist">
                  Direction
                </span>
              </div>

              <p className="mt-3 font-display text-lg text-paper">
                Africa
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 flex items-center gap-3 text-mist/60"
          >
            <span className="h-px w-10 bg-line" />

            <span className="font-mono text-[9px] uppercase tracking-[0.22em]">
              Enter the network
            </span>

            <motion.span
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, 5, 0],
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
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink via-ink/50 to-transparent"
        />
      </section>

      {/* =========================================================
          MANTRA CIRCLES
      ========================================================== */}

      <section className="relative overflow-hidden border-t border-line/60 py-20 sm:py-24 md:py-28 lg:py-32">
        <FloatingObject
          className="left-[5%] top-16 hidden lg:block"
          delay={0.4}
          duration={7}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-neon-mint backdrop-blur-md">
            <Users size={20} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="right-[8%] bottom-20 hidden lg:block"
          delay={1.2}
          duration={8}
        >
          <div className="h-3 w-3 rounded-full bg-neon-cyan shadow-[0_0_18px_rgba(0,240,255,0.7)]" />
        </FloatingObject>

        <div className="container-mantra relative z-10 grid items-center gap-12 md:grid-cols-2 md:gap-14 lg:gap-20">
          {/* Image */}
          <ScrollReveal delay={0.1}>
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -7 }}
              transition={{ duration: 0.5, ease }}
              className="group relative"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-5 rounded-[2rem] bg-neon-mint/10 opacity-30 blur-3xl transition duration-700 group-hover:opacity-70"
              />

              <div className="absolute -inset-1 rounded-[1.7rem] bg-gradient-to-r from-neon-mint/20 via-neon-cyan/10 to-transparent opacity-40 blur-xl transition duration-700 group-hover:opacity-80" />

              <FloatingObject
                className="right-[-1rem] top-[-1rem] hidden sm:block"
                delay={0.8}
                duration={8}
              >
                <div className="flex h-11 w-11 rotate-12 items-center justify-center rounded-xl border border-line bg-ink-soft/80 text-neon-cyan backdrop-blur-xl">
                  <Orbit size={16} />
                </div>
              </FloatingObject>

              <div className="relative overflow-hidden rounded-[1.5rem] border border-line/80 bg-ink-soft/40 p-2 backdrop-blur-xl shadow-2xl">
                {/* Interface Header */}
                <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-neon-mint/70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan/50" />
                    <span className="h-1.5 w-1.5 rounded-full bg-neon-amber/50" />
                  </div>

                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-mist/50">
                    MANTRA / CIRCLES
                  </span>
                </div>

                {/* =================================================
                    PLACE YOUR IMAGE HERE
                    FILE:
                    public/images/mantra-circles.jpg
                ================================================== */}
                <div className="group/image relative overflow-hidden rounded-xl">
                  <motion.img
                    src="https://cdn.prod.website-files.com/6993b332c8345a6e220aff4b/6993c09ae1acd5d3230c144f_centertalk.jpeg"
                    alt="MANTRA Circles"
                    loading="eager"
                    className="aspect-square w-full rounded-xl object-cover md:aspect-[4/3]"
                    initial={reduceMotion ? false : { scale: 1.04 }}
                    whileInView={
                      reduceMotion
                        ? undefined
                        : {
                            scale: 1,
                          }
                    }
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            scale: 1.035,
                          }
                    }
                    viewport={{
                      once: true,
                      amount: 0.25,
                    }}
                    transition={{
                      duration: 1.1,
                      ease,
                    }}
                  />

                  {/* Image Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/10 opacity-80 transition-opacity duration-500 group-hover:opacity-55" />

                  {/* Scan Line */}
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/70 to-transparent"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            y: ["0%", "1200%"],
                            opacity: [0, 1, 0],
                          }
                    }
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Status */}
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-line/80 bg-ink/80 px-3 py-1.5 backdrop-blur-md">
                    <CircleDot
                      size={11}
                      className="animate-pulse text-neon-mint"
                    />

                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper">
                      Active Circles
                    </span>
                  </div>

                  {/* Floating Image Icon */}
                  <motion.div
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            scale: 1.08,
                            rotate: 5,
                          }
                    }
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-line/80 bg-ink/80 text-mist backdrop-blur-md transition-colors duration-300 group-hover:border-neon-mint group-hover:text-neon-mint"
                  >
                    <ArrowUpRight size={14} />
                  </motion.div>

                  {/* Bottom Image Content */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-paper/50">
                        Community System
                      </p>

                      <p className="mt-1 text-sm text-paper">
                        Real men. Real conversations.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-neon-mint" />
                      <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan/70" />
                      <span className="h-1.5 w-1.5 rounded-full bg-neon-amber/50" />
                    </div>
                  </div>
                </div>

                {/* Interface Footer */}
                <div className="flex items-center justify-between px-3 pb-1 pt-3">
                  <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-mist/40">
                    TRUST / ACCOUNTABILITY / GROWTH
                  </span>

                  <span className="font-mono text-[8px] text-mist/40">
                    001
                  </span>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal delay={0.2}>
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line/80 bg-ink-soft/60 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-mist backdrop-blur-md">
                <span className="text-neon-mint">01</span>
                <span className="h-2 w-px bg-line" />
                <span>Core Foundation</span>
              </div>

              <SectionHeading
                label="MANTRA Circles"
                title="Small groups. Real conversation. Real accountability."
                description="Circles are groups of men who meet consistently to talk honestly, hold each other accountable, and grow together — the foundation every other MANTRA program is built on."
              />

              <motion.div
                whileHover={reduceMotion ? undefined : { x: 5 }}
                transition={{ duration: 0.35, ease }}
                className="mt-9 flex items-center gap-3 border-t border-line/60 pt-6"
              >
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-ink-soft/80 text-neon-mint">
                  <span className="absolute inset-1.5 rounded-lg border border-current/10" />
                  <Shield size={16} />
                </span>

                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist/60">
                    Community Principle
                  </p>

                  <p className="mt-1 text-xs text-paper-dim">
                    Built on trust, discretion and consistency.
                  </p>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================
          CHAPTERS
      ========================================================== */}

      <section className="relative overflow-hidden border-t border-line/60 py-20 sm:py-24 md:py-28 lg:py-32">
        <FloatingObject
          className="right-[6%] top-16 hidden lg:block"
          delay={0.6}
          duration={6}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-neon-cyan backdrop-blur-md">
            <Compass size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="left-[8%] bottom-20 hidden xl:block"
          delay={1}
          duration={8}
        >
          <div className="h-8 w-8 rotate-45 rounded-lg border border-neon-amber/20 bg-neon-amber/5" />
        </FloatingObject>

        <div className="container-mantra relative z-10">
          <ScrollReveal delay={0.1}>
            <div className="max-w-3xl">
              <SectionHeading
                label="Chapters"
                title="Building city by city."
                description="MANTRA is starting with one chapter and expanding deliberately — building trust before scale."
              />
            </div>
          </ScrollReveal>

          {/* Chapter Stats */}
          <ScrollReveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-y border-line/60 py-5">
              <div className="flex items-center gap-2">
                <Radio size={13} className="text-neon-mint" />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist">
                  Network status
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-neon-mint">
                  Growing
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Target size={13} className="text-neon-cyan" />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist">
                  Expansion
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper-dim">
                  Deliberate
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Cards */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-5">
            {chapters.map((chapter, i) => {
              const Icon = chapter.icon;
              const isFounding = chapter.status === "Founding chapter";

              return (
                <ScrollReveal
                  key={chapter.city}
                  delay={i * 0.06}
                >
                  <motion.div
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -6,
                          }
                    }
                    transition={{
                      duration: 0.4,
                      ease,
                    }}
                    className="group relative h-full"
                  >
                    {/* Founding Glow */}
                    {isFounding && (
                      <div
                        aria-hidden="true"
                        className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-neon-mint/30 to-neon-cyan/20 opacity-60 blur-md transition duration-500 group-hover:opacity-100"
                      />
                    )}

                    {/* Card */}
                    <div className="relative flex h-full min-h-[250px] flex-col justify-between overflow-hidden rounded-2xl border border-line/80 bg-ink-soft/50 p-6 backdrop-blur-xl transition-all duration-500 group-hover:border-line group-hover:bg-ink-soft/80 sm:p-7">
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

                      {/* Top */}
                      <div className="relative z-10">
                        <div className="flex items-start justify-between gap-4">
                          <motion.span
                            whileHover={
                              reduceMotion
                                ? undefined
                                : {
                                    rotate: 8,
                                    scale: 1.06,
                                  }
                            }
                            className={`relative flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink/70 ${chapter.accent}`}
                          >
                            <span className="absolute inset-1.5 rounded-lg border border-current/10" />
                            <Icon size={18} />
                          </motion.span>

                          <Tag tone={isFounding ? "ember" : "mist"}>
                            {chapter.status}
                          </Tag>
                        </div>

                        <div className="mt-7 flex items-end justify-between gap-3">
                          <h3 className="font-display text-2xl text-paper transition-colors duration-300 group-hover:text-neon-mint">
                            {chapter.city}
                          </h3>

                          <span className="font-mono text-[8px] text-mist/40">
                            0{i + 1}
                          </span>
                        </div>

                        <p className="mt-3 max-w-sm text-sm leading-6 text-paper-dim">
                          {chapter.description}
                        </p>
                      </div>

                      {/* Bottom */}
                      <div className="relative z-10 mt-7 border-t border-line/50 pt-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-mist/50">
                              Location signal
                            </p>

                            <p className="mt-1 font-mono text-[9px] tracking-[0.12em] text-paper-dim">
                              {chapter.coordinates}
                            </p>
                          </div>

                          <motion.div
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
                            className={`${chapter.accent}`}
                          >
                            <ArrowUpRight size={15} />
                          </motion.div>
                        </div>
                      </div>

                      {/* Bottom Accent */}
                      <div
                        aria-hidden="true"
                        className={`absolute bottom-0 left-6 right-6 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-70 ${
                          isFounding
                            ? "bg-gradient-to-r from-transparent via-neon-mint to-transparent"
                            : "bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent"
                        }`}
                      />
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          EVENTS
      ========================================================== */}

      <section className="relative overflow-hidden border-t border-line/60 py-20 sm:py-24 md:py-28">
        <FloatingObject
          className="left-[8%] top-20 hidden md:block"
          delay={0.5}
          duration={8}
        >
          <div className="h-3 w-3 rounded-full bg-neon-amber/60 shadow-[0_0_16px_rgba(255,180,0,0.6)]" />
        </FloatingObject>

        <FloatingObject
          className="right-[10%] bottom-20 hidden lg:block"
          delay={1.4}
          duration={7}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-ink-soft/60 text-neon-cyan backdrop-blur-xl">
            <Sparkles size={17} />
          </div>
        </FloatingObject>

        <div className="container-mantra relative z-10">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <ScrollReveal delay={0.1}>
              <SectionHeading
                label="Community Events"
                title="Where the community meets in person."
                description="Gatherings, workshops and conversations designed to connect men across chapters."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Link
                to="/events"
                className="group inline-flex w-fit items-center gap-3 rounded-full border border-line bg-ink-soft/80 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-paper backdrop-blur-xl transition-all duration-300 hover:border-neon-mint hover:bg-neon-mint/10 hover:text-neon-mint"
              >
                <span>See all events</span>

                <motion.span
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          x: 3,
                        }
                  }
                >
                  <ArrowRight size={14} />
                </motion.span>
              </Link>
            </ScrollReveal>
          </div>

          {/* Event Preview Cards */}
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                label: "Circles",
                title: "Small rooms. Honest conversations.",
                icon: Users,
                accent: "text-neon-mint",
              },
              {
                label: "Workshops",
                title: "Practical tools for real life.",
                icon: Target,
                accent: "text-neon-cyan",
              },
              {
                label: "Gatherings",
                title: "Connection beyond the screen.",
                icon: Sparkles,
                accent: "text-neon-amber",
              },
            ].map((event, i) => {
              const Icon = event.icon;

              return (
                <ScrollReveal
                  key={event.label}
                  delay={0.1 + i * 0.06}
                >
                  <motion.div
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -4,
                          }
                    }
                    transition={{
                      duration: 0.35,
                      ease,
                    }}
                    className="group relative overflow-hidden rounded-2xl border border-line/70 bg-ink-soft/40 p-6 backdrop-blur-xl"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink/60 ${event.accent}`}
                      >
                        <Icon size={17} />
                      </span>

                      <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-mist/40">
                        0{i + 1}
                      </span>
                    </div>

                    <p className="mt-7 font-mono text-[9px] uppercase tracking-[0.18em] text-mist/50">
                      {event.label}
                    </p>

                    <h3 className="mt-2 max-w-xs font-display text-xl leading-snug text-paper">
                      {event.title}
                    </h3>

                    <div
                      aria-hidden="true"
                      className={`mt-6 h-px w-12 transition-all duration-500 group-hover:w-20 ${
                        i === 0
                          ? "bg-neon-mint/60"
                          : i === 1
                            ? "bg-neon-cyan/60"
                            : "bg-neon-amber/60"
                      }`}
                    />
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}

      <section className="relative overflow-hidden border-t border-line/60 py-4">
        <FloatingObject
          className="left-[8%] top-16 hidden md:block"
          delay={0.5}
          duration={8}
        >
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-neon-cyan/20 bg-ink-soft/60 text-neon-cyan backdrop-blur-xl">
            <div className="absolute inset-2 rounded-xl border border-current/10" />
            <Orbit size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="right-[10%] top-24 hidden lg:block"
          delay={1}
          duration={7}
        >
          <div className="h-3 w-3 rounded-full bg-neon-mint shadow-[0_0_22px_rgba(0,255,135,0.7)]" />
        </FloatingObject>

        <FloatingObject
          className="right-[18%] bottom-24 hidden xl:block"
          delay={1.7}
          duration={9}
        >
          <div className="h-8 w-8 rotate-45 rounded-lg border border-neon-amber/20 bg-neon-amber/5" />
        </FloatingObject>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-mint/5 blur-[120px]"
        />

        <CTASection
          title="Join a Circle before it starts."
          description="Founding Circles are forming now in Nairobi. Early members shape how they run."
          primaryLabel="Get Involved"
          primaryTo="/get-involved"
          secondaryLabel="See events"
          secondaryTo="/events"
        />
      </section>

      {/* Bottom Atmospheric Line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-neon-mint/30 to-transparent"
      />
    </main>
  );
}