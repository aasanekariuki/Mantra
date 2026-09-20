import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  Shield,
  Compass,
  Zap,
  BarChart3,
  Activity,
  ArrowUpRight,
  CircleDot,
  Hexagon,
  Orbit,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";
import { Metric } from "../components/ui/Metric";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ScrollReveal } from "../components/animation/ScrollReveal";
import { CTASection } from "../components/sections/CTASection";

const metricsData = [
  {
    value: null,
    label: "People reached",
    icon: Activity,
    accent: "text-neon-mint",
    category: "Community",
  },
  {
    value: null,
    label: "Mentorship hours",
    icon: Zap,
    accent: "text-neon-cyan",
    category: "Growth",
  },
  {
    value: null,
    label: "Training sessions",
    icon: Compass,
    accent: "text-neon-cyan",
    category: "Development",
  },
  {
    value: null,
    label: "Opportunities placed",
    icon: Shield,
    accent: "text-neon-amber",
    category: "Opportunity",
  },
  {
    value: 1,
    label: "Founding chapter",
    icon: Sparkles,
    accent: "text-neon-mint",
    category: "Foundation",
  },
  {
    value: 6,
    label: "Programs in design",
    icon: BarChart3,
    accent: "text-neon-cyan",
    category: "Programs",
  },
  {
    value: 8,
    label: "Pillars defined",
    icon: Shield,
    accent: "text-neon-amber",
    category: "Framework",
  },
  {
    value: null,
    label: "Research publications",
    icon: Activity,
    accent: "text-neon-mint",
    category: "Research",
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
  delay = 0,
  duration = 18,
}: {
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-line/50 ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: 360,
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-neon-mint/50 bg-ink shadow-[0_0_16px_rgba(0,255,135,0.45)]" />
    </motion.div>
  );
}

function FloatingOrb({
  className = "",
  color = "bg-neon-mint",
  delay = 0,
}: {
  className?: string;
  color?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${color} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -18, 0],
              x: [0, 8, 0],
              opacity: [0.35, 0.7, 0.35],
              scale: [0.9, 1.15, 0.9],
            }
      }
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function MetricCard({
  item,
  index,
}: {
  item: (typeof metricsData)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const Icon = item.icon;
  const isEstablished = item.value !== null;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.65,
        delay: index * 0.045,
        ease,
      }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className="group relative h-full"
    >
      <div
        aria-hidden="true"
        className={`absolute -inset-px rounded-2xl opacity-0 blur-lg transition duration-500 group-hover:opacity-100 ${
          isEstablished
            ? "bg-neon-mint/15"
            : "bg-neon-cyan/10"
        }`}
      />

      <div className="relative flex h-full min-h-[235px] flex-col overflow-hidden rounded-2xl border border-line/80 bg-ink-soft/50 p-6 backdrop-blur-xl transition-all duration-500 group-hover:border-line group-hover:bg-ink-soft/80 sm:p-7">
        {/* Card scan line */}
        <motion.div
          aria-hidden="true"
          className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-mint/70 to-transparent opacity-0 group-hover:opacity-100"
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
            delay: index * 0.2,
          }}
        />

        {/* Corner geometry */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-16 w-16 opacity-20"
        >
          <div className="absolute right-5 top-5 h-8 w-8 rotate-45 border border-line/70" />
          <div className="absolute right-3 top-3 h-8 w-8 rounded-full border border-line/40" />
        </div>

        <div className="relative flex items-center justify-between">
          <motion.span
            className={`flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink/70 ${item.accent}`}
            whileHover={reduceMotion ? undefined : { rotate: 8, scale: 1.08 }}
            transition={{ duration: 0.3 }}
          >
            <Icon size={19} strokeWidth={1.7} />
          </motion.span>

          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mist/50">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="relative mt-8">
          <div className="mb-2 flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${isEstablished ? "bg-neon-mint" : "bg-neon-cyan/50"}`} />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist/50">
              {item.category}
            </span>
          </div>

          <Metric value={item.value} label={item.label} />
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-line/40 pt-5">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-mist">
            <span>Status</span>
            <span
              className={
                isEstablished
                  ? "text-neon-mint"
                  : "text-paper-dim opacity-70"
              }
            >
              {isEstablished ? "Established" : "In progress"}
            </span>
          </div>

          <motion.div
            className="text-mist/40 transition-colors duration-300 group-hover:text-neon-mint"
            whileHover={reduceMotion ? undefined : { x: 3, y: -3 }}
          >
            <ArrowUpRight size={15} />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Impact() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.35],
    [0, reduceMotion ? 0 : -80]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.22],
    [1, 0.65]
  );

  return (
    <main className="relative isolate overflow-hidden bg-ink text-paper selection:bg-neon-mint/30 selection:text-neon-mint">
      {/* =========================================================
          AMBIENT BACKGROUND
      ========================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[36rem] w-[36rem] rounded-full bg-neon-mint/10 blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10rem] top-[38%] h-[38rem] w-[38rem] rounded-full bg-neon-cyan/10 blur-[160px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[35%] top-[70%] h-[24rem] w-[24rem] rounded-full bg-neon-amber/5 blur-[130px]"
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
            "linear-gradient(to bottom, black 15%, transparent 92%)",
        }}
      />

      {/* Fine radial texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "linear-gradient(to bottom, black, transparent 75%)",
        }}
      />

      {/* =========================================================
          HERO
      ========================================================== */}

      <motion.div
        style={{
          y: heroY,
          opacity: heroOpacity,
        }}
        className="relative"
      >
        <div className="relative pt-8 sm:pt-12">
          {/* Floating status */}
          <FloatingObject
            className="right-[7%] top-[12%] hidden lg:block"
            delay={0.3}
            duration={8}
          >
            <div className="flex items-center gap-2.5 rounded-full border border-neon-mint/30 bg-ink-soft/80 px-4 py-2 backdrop-blur-xl shadow-[0_0_24px_rgba(0,255,135,0.12)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-mint opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-mint" />
              </span>

              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-mint">
                Honest Metrics
              </span>
            </div>
          </FloatingObject>

          {/* Hero geometric objects */}
          <FloatingObject
            className="left-[7%] top-[22%] hidden xl:block"
            delay={0.8}
            duration={9}
          >
            <div className="relative h-14 w-14">
              <div className="absolute inset-2 rotate-45 border border-line/70" />
              <div className="absolute inset-0 rounded-full border border-neon-cyan/20" />
              <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan shadow-[0_0_12px_rgba(0,240,255,0.7)]" />
            </div>
          </FloatingObject>

          <FloatingOrb
            className="right-[18%] top-[27%] h-2 w-2 shadow-[0_0_14px_rgba(0,255,135,0.7)]"
            delay={0.5}
          />

          <FloatingOrb
            className="left-[14%] top-[43%] h-1.5 w-1.5 bg-neon-cyan shadow-[0_0_12px_rgba(0,240,255,0.7)]"
            delay={1.4}
          />

          <PageHeader
            eyebrow="Impact"
            title="We'd rather say 'building' than invent a number."
            description="MANTRA is in its founding phase. This page will fill in honestly as programs launch and Circles form — not before."
          />

          {/* Hero orbital decoration */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-12rem] top-1/2 hidden h-[30rem] w-[30rem] -translate-y-1/2 lg:block"
          >
            <OrbitalRing className="inset-12" duration={24} />
            <OrbitalRing className="inset-20 rotate-45" duration={30} delay={1} />
            <OrbitalRing className="inset-32" duration={20} delay={0.5} />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-neon-mint/20 bg-ink-soft/40 backdrop-blur-xl">
                <Orbit
                  size={28}
                  strokeWidth={1}
                  className="text-neon-mint"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* =========================================================
          METRICS
      ========================================================== */}

      <section className="relative overflow-hidden border-t border-line/60 py-20 sm:py-24 md:py-28">
        {/* Decorative objects */}
        <FloatingObject
          className="left-[3%] top-20 hidden lg:block"
          delay={0.4}
          duration={7}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-neon-mint backdrop-blur-md">
            <BarChart3 size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="right-[4%] bottom-16 hidden lg:block"
          delay={0.7}
          duration={6}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-neon-cyan backdrop-blur-md">
            <Activity size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="right-[14%] top-28 hidden xl:block"
          delay={1}
          duration={9}
        >
          <Hexagon
            size={28}
            strokeWidth={1}
            className="text-neon-amber/40"
          />
        </FloatingObject>

        <FloatingOrb
          className="left-[8%] bottom-24 h-2 w-2 bg-neon-mint shadow-[0_0_14px_rgba(0,255,135,0.7)]"
          delay={1}
        />

        <FloatingOrb
          className="right-[20%] top-20 h-1.5 w-1.5 bg-neon-cyan shadow-[0_0_12px_rgba(0,240,255,0.7)]"
          delay={2}
        />

        <div className="container-mantra relative z-10">
          <ScrollReveal delay={0.1}>
            <div className="max-w-3xl">
              <SectionHeading
                label="Where things stand"
                title="The current state of MANTRA."
                description="Real accountability means starting with clear baseline numbers — including zeros where work is still underway."
              />
            </div>
          </ScrollReveal>

          {/* Metrics intro rail */}
          <ScrollReveal delay={0.16}>
            <div className="mt-10 flex flex-col gap-4 border-y border-line/50 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-ink-soft/70 text-neon-mint">
                  <TrendingUp size={15} />
                </span>

                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
                  Transparent progress tracking
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mist/50">
                <CircleDot size={12} className="text-neon-mint" />
                Live foundation
              </div>
            </div>
          </ScrollReveal>

          {/* Metrics */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {metricsData.map((item, index) => (
              <MetricCard
                key={item.label}
                item={item}
                index={index}
              />
            ))}
          </div>

          {/* Bottom statement */}
          <ScrollReveal delay={0.25}>
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -2 }}
              className="relative mt-8 overflow-hidden rounded-2xl border border-line/60 bg-ink-soft/30 p-6 backdrop-blur-xl sm:p-7"
            >
              <div
                aria-hidden="true"
                className="absolute right-0 top-0 h-24 w-24 bg-neon-mint/5 blur-2xl"
              />

              <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-ink text-neon-mint">
                    <Shield size={17} />
                  </div>

                  <div>
                    <p className="font-display text-lg text-paper">
                      Built on evidence, not inflated numbers.
                    </p>

                    <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-mist">
                      As MANTRA grows, this dashboard becomes a record of
                      actual people, programs, hours and opportunities — not
                      projections presented as achievements.
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-neon-mint">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-mint shadow-[0_0_10px_rgba(0,255,135,0.7)]" />
                  Accountability
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}

      <div className="relative overflow-hidden">
        <FloatingObject
          className="left-[9%] top-12 hidden md:block"
          delay={0.5}
          duration={7}
        >
          <div className="h-3.5 w-3.5 rounded-full bg-neon-cyan/60 shadow-[0_0_18px_rgba(0,240,255,0.6)]" />
        </FloatingObject>

        <FloatingObject
          className="right-[11%] top-20 hidden lg:block"
          delay={1}
          duration={8}
        >
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border border-line/60" />
            <div className="absolute inset-2 rotate-45 border border-neon-mint/30" />
            <Sparkles
              size={14}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-neon-mint"
            />
          </div>
        </FloatingObject>

        <FloatingOrb
          className="bottom-24 right-[22%] h-2 w-2 bg-neon-amber shadow-[0_0_14px_rgba(255,180,0,0.65)]"
          delay={1.8}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/20 md:block"
        />

        <CTASection
          title="Help MANTRA earn its first real numbers."
          description="Every metric above becomes real through the people who join, mentor, fund and build alongside MANTRA."
          primaryLabel="Get Involved"
          primaryTo="/get-involved"
        />
      </div>
    </main>
  );
}