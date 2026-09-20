import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Crown,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import { HeroScene } from "../components/three/HeroScene";
import { AnimatedText } from "../components/animation/AnimatedText";
import { ScrollReveal } from "../components/animation/ScrollReveal";
import { Button } from "../components/ui/Button";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Metric } from "../components/ui/Metric";
import { PillarGrid } from "../components/sections/PillarGrid";
import { CTASection } from "../components/sections/CTASection";
import { programs } from "../data/programs";

const pillars = [
  { label: "Wellness", icon: Shield, tone: "text-neon-mint" },
  { label: "Circles", icon: Users, tone: "text-neon-cyan" },
  { label: "Growth", icon: Zap, tone: "text-neon-amber" },
];

const ease = [0.16, 1, 0.3, 1] as const;

function FloatingObject({
  className = "",
  delay = 0,
  duration = 6,
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
              rotate: [0, 6, 0],
              scale: [1, 1.05, 1],
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

function HeroDecorations() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* Neon Ambient Orbs */}
      <FloatingObject className="left-[5%] top-[22%] hidden lg:block" delay={0.2} duration={7}>
        <div className="flex items-center gap-3 rounded-full border border-neon-mint/30 bg-ink-soft/80 px-3.5 py-1.5 backdrop-blur-xl shadow-[0_0_20px_rgba(0,255,135,0.2)]">
          <div className="h-2 w-2 rounded-full bg-neon-mint animate-ping" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-neon-mint">System Live</span>
        </div>
      </FloatingObject>

      <FloatingObject className="right-[10%] top-[18%] hidden md:block" delay={1} duration={8}>
        <div className="h-4 w-4 rounded-full border border-neon-cyan/70 shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
      </FloatingObject>

      <FloatingObject className="right-[6%] top-[45%] hidden xl:block" delay={1.5} duration={6.5}>
        <div className="relative flex h-14 w-14 items-center justify-center rotate-45 rounded-2xl border border-line/80 bg-ink-soft/40 backdrop-blur-md shadow-[0_0_25px_rgba(0,255,135,0.1)]">
          <Zap className="h-5 w-5 -rotate-45 text-neon-mint" />
        </div>
      </FloatingObject>

      <FloatingObject className="left-[8%] bottom-[22%] hidden xl:block" delay={2.1} duration={7.5}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-neon-cyan/30 bg-ink-soft/60 backdrop-blur-md">
          <Shield size={20} strokeWidth={1.5} className="text-neon-cyan" />
        </div>
      </FloatingObject>

      {/* Orbit Rings */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[28%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-neon-mint/15 sm:h-[36rem] sm:w-[36rem]"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -left-1.5 top-1/2 h-3.5 w-3.5 rounded-full bg-neon-mint shadow-[0_0_18px_rgba(0,255,135,0.9)]" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[28%] h-[22rem] w-[22rem] -translate-x-1/2 rounded-full border border-neon-cyan/10 sm:h-[27rem] sm:w-[27rem]"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 rounded-full bg-neon-cyan shadow-[0_0_12px_rgba(0,240,255,0.8)]" />
      </motion.div>
    </>
  );
}

function SectionDecorations() {
  return (
    <>
      <FloatingObject className="right-[7%] top-16 hidden lg:block" delay={0.8} duration={7}>
        <div className="h-12 w-12 rotate-12 rounded-2xl border border-neon-cyan/30 bg-neon-cyan/5 backdrop-blur-sm" />
      </FloatingObject>

      <FloatingObject className="left-[4%] bottom-16 hidden lg:block" delay={1.6} duration={8}>
        <Sparkles size={24} strokeWidth={1.2} className="text-neon-mint/60" />
      </FloatingObject>
    </>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative isolate overflow-hidden bg-ink text-paper selection:bg-neon-mint/30 selection:text-neon-mint">
      {/* Electric Glow Background Elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[35rem] w-[35rem] rounded-full bg-neon-mint/10 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10rem] top-[25%] h-[38rem] w-[38rem] rounded-full bg-neon-cyan/10 blur-[150px]"
      />

      {/* Cyber Grid Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 255, 135, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 85%)",
        }}
      />

      {/* Hero Section */}
      <section className="relative flex min-h-[95svh] items-end overflow-hidden pb-16 pt-32 sm:pb-24 md:min-h-screen md:pt-40">
        <HeroScene />

        {/* Ambient Dark Overlays */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(10,11,13,0.3)_50%,#0A0B0D_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink via-ink/80 to-transparent"
        />

        <HeroDecorations />

        <div className="container-mantra relative z-10 w-full">
          {/* Top Badge */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-neon-mint/30 bg-ink-soft/80 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.24em] text-neon-mint shadow-[0_0_25px_rgba(0,255,135,0.15)] backdrop-blur-2xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-mint" />
            </span>
            <Sparkles size={12} className="animate-pulse" aria-hidden="true" />
            <span>The Future of Male Wellness</span>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] lg:items-end lg:gap-16">
            <div className="max-w-5xl">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -left-6 top-1/2 hidden h-28 w-1 -translate-y-1/2 bg-gradient-to-b from-transparent via-neon-mint to-transparent lg:block"
                />

                <AnimatedText
                  as="h1"
                  text="MANTRA"
                  className="font-display text-7xl font-bold leading-[0.78] tracking-tight text-gradient-primary drop-shadow-[0_0_45px_rgba(0,255,135,0.2)] sm:text-8xl md:text-[11rem] lg:text-[13rem]"
                />
              </div>

              <ScrollReveal delay={0.16} className="mt-8 max-w-3xl">
                <p className="text-balance font-display text-2xl font-medium leading-tight tracking-tight text-paper sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                  Building healthier, capable, and{" "}
                  <span className="text-neon-mint drop-shadow-[0_0_20px_rgba(0,255,135,0.3)]">
                    purposeful men.
                  </span>
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.26} className="mt-6 max-w-2xl">
                <p className="text-base leading-7 text-paper-dim sm:text-lg sm:leading-8">
                  An African institution for connection, capability,
                  leadership, health, opportunity, and community.
                </p>
              </ScrollReveal>
            </div>

            {/* Founding Chapter Interactive Glass Card */}
            <ScrollReveal delay={0.3} className="lg:mb-1">
              <motion.div
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -6,
                        borderColor: "rgba(0,255,135,0.4)",
                      }
                }
                transition={{ duration: 0.35 }}
                className="group relative overflow-hidden rounded-3xl border border-line/80 bg-ink-soft/70 p-6 shadow-2xl backdrop-blur-2xl"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-neon-mint/10 blur-2xl transition duration-500 group-hover:bg-neon-mint/20"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-neon-mint/60 to-transparent"
                />

                <div className="relative">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-neon-mint">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-mint opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-mint" />
                      </span>
                      Founding chapter active
                    </div>

                    <Activity size={16} className="text-mist" aria-hidden="true" />
                  </div>

                  <p className="text-sm leading-6 text-paper-dim">
                    MANTRA is establishing structured support, leadership, and
                    economic capability for modern men.
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-2 border-t border-line/60 pt-4">
                    {pillars.map(({ label, icon: Icon, tone }) => (
                      <div
                        key={label}
                        className="flex min-w-0 items-center justify-center gap-1.5 rounded-xl border border-line/60 bg-ink/60 px-2 py-2 text-[10px] font-mono uppercase tracking-wider text-mist transition-colors duration-300 group-hover:border-line"
                      >
                        <Icon size={12} className={tone} aria-hidden="true" />
                        <span className="truncate">{label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-mist">
                    <CheckCircle2 size={13} className="text-neon-mint" aria-hidden="true" />
                    <span>Building in public</span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* Action Buttons */}
          <ScrollReveal delay={0.38} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              to="/about"
              className="group relative overflow-hidden rounded-xl bg-neon-mint px-7 py-3.5 text-xs font-mono font-bold uppercase tracking-widest text-ink shadow-[0_0_30px_rgba(0,255,135,0.3)] transition-all duration-300 hover:scale-[1.02] hover:bg-neon-mint/90 hover:shadow-[0_0_45px_rgba(0,255,135,0.5)]"
            >
              Explore MANTRA
            </Button>

            <Button
              to="/get-involved"
              variant="secondary"
              icon={false}
              className="rounded-xl border border-line bg-ink-soft/60 px-7 py-3.5 text-xs font-mono uppercase tracking-widest text-paper backdrop-blur-md transition-all duration-300 hover:border-neon-mint/50 hover:bg-neon-mint/10 hover:text-neon-mint"
            >
              Get Involved
            </Button>
          </ScrollReveal>

          {/* Scroll Indicator */}
          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="mt-16 hidden items-center gap-3 text-[10px] font-mono uppercase tracking-[0.22em] text-mist md:flex"
          >
            <ArrowDown size={14} className="text-neon-mint" />
            <span>Scroll to explore</span>
          </motion.div>
        </div>
      </section>

      {/* Why MANTRA Section */}
      <section className="relative overflow-hidden border-t border-line/60 py-24 sm:py-28 md:py-36">
        <SectionDecorations />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-mint/40 to-transparent"
        />

        <div className="container-mantra relative z-10 grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
          <SectionHeading
            label="Why MANTRA exists"
            title="There is more to men's wellbeing than survival."
          />

          <ScrollReveal delay={0.1} className="space-y-6 text-base leading-8 text-paper-dim md:text-lg md:leading-9">
            <p>
              Most conversations about men&apos;s wellbeing stop at crisis messaging — telling men to speak up, without building the places where that&apos;s actually possible. MANTRA starts from a different premise: men need connection, purpose, health, opportunity, skills, and community — not just a slogan.
            </p>

            <p>
              That means economic capability alongside emotional literacy. Leadership alongside relationships. Space to develop talent alongside evidence about what actually works. MANTRA is building all of it, deliberately, as one institution rather than a scattered set of campaigns.
            </p>

            <div className="flex items-center gap-3 pt-4 text-[10px] font-mono font-bold uppercase tracking-[0.24em] text-neon-mint">
              <Crown size={15} />
              <span>Character. Capability. Community.</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pillars Grid */}
      <PillarGrid />

      {/* Programs Section */}
      <section className="relative overflow-hidden border-t border-line/60 py-24 sm:py-28 md:py-36">
        <SectionDecorations />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-neon-cyan/5 blur-[120px]"
        />

        <div className="container-mantra relative z-10">
          <SectionHeading
            label="What we're building"
            title="Six programs. One direction."
            description="Each program turns a pillar into practice — starting with the communities and Circles that hold everything else together."
          />

          <div className="mt-12 border-t border-line/60 sm:mt-16">
            {programs.map((program, i) => (
              <ScrollReveal key={program.slug} delay={i * 0.05}>
                <Link
                  to={`/programs/${program.slug}`}
                  aria-label={`Explore ${program.name}: ${program.tagline}`}
                  className="group relative flex items-center justify-between gap-6 border-b border-line/60 py-7 outline-none transition-all duration-300 hover:bg-ink-soft/40 hover:px-6 md:py-8"
                >
                  <div className="flex min-w-0 items-start gap-6 sm:gap-8">
                    <span className="pt-1 font-mono text-xs font-semibold tracking-wider text-mist transition-colors duration-300 group-hover:text-neon-mint">
                      0{i + 1}
                    </span>

                    <div className="min-w-0">
                      <h3 className="truncate font-display text-2xl font-semibold tracking-tight text-paper transition-colors duration-300 group-hover:text-neon-mint sm:text-3xl md:text-4xl">
                        {program.name}
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-paper-dim transition-colors duration-300 group-hover:text-paper sm:text-base">
                        {program.tagline}
                      </p>
                    </div>
                  </div>

                  <motion.span
                    whileHover={reduceMotion ? undefined : { scale: 1.1 }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-ink-soft/80 text-mist transition-all duration-300 group-hover:border-neon-mint group-hover:bg-neon-mint/10 group-hover:text-neon-mint group-hover:shadow-[0_0_20px_rgba(0,255,135,0.3)] sm:h-12 sm:w-12"
                  >
                    <ArrowUpRight
                      size={20}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </motion.span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="relative overflow-hidden border-t border-line/60 py-24 sm:py-28 md:py-36">
        <SectionDecorations />

        <div className="container-mantra relative z-10">
          <SectionHeading
            label="Where we are"
            title="Early, honest, and building in public."
          />

          <ScrollReveal delay={0.08} className="mt-12 sm:mt-16">
            <div className="relative overflow-hidden rounded-3xl border border-line/80 bg-ink-soft/50 p-6 backdrop-blur-xl sm:p-10">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-mint/50 to-transparent"
              />

              <div className="relative grid grid-cols-2 divide-x divide-y divide-line/60 md:grid-cols-4 md:divide-y-0">
                <div className="px-4 py-6 first:pl-0 md:px-8 md:py-2">
                  <Metric value={null} label="Men in Circles" />
                </div>

                <div className="px-4 py-6 md:px-8 md:py-2">
                  <Metric value={null} label="Programs launched" />
                </div>

                <div className="px-4 py-6 first:pl-0 md:px-8 md:py-2">
                  <Metric value={1} label="Founding chapter" />
                </div>

                <div className="px-4 py-6 md:px-8 md:py-2">
                  <Metric value={8} label="Pillars defined" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <p className="mt-8 max-w-xl text-xs font-mono leading-6 text-mist">
            MANTRA is in its founding phase. Figures will update as programs launch and Circles form — we won&apos;t publish numbers we haven&apos;t earned.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative">
        <FloatingObject className="right-[10%] top-12 hidden md:block" delay={0.7} duration={6}>
          <div className="h-3.5 w-3.5 rounded-full bg-neon-mint/70 shadow-[0_0_20px_rgba(0,255,135,0.6)]" />
        </FloatingObject>

        <FloatingObject className="left-[8%] bottom-16 hidden lg:block" delay={1.4} duration={7.5}>
          <Compass size={24} className="text-neon-cyan/50" />
        </FloatingObject>

        <CTASection
          title="MANTRA is being built. Help build it."
          description="Join a Circle, mentor a member, partner with a program, or simply follow along as MANTRA takes shape."
          primaryLabel="Get Involved"
          primaryTo="/get-involved"
          secondaryLabel="Read Our Story"
          secondaryTo="/about"
        />
      </section>
    </main>
  );
}