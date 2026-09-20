import { useMemo, useRef, useState, type ReactNode } from "react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowDownRight,
  BookOpen,
  CircleDot,
  Hexagon,
  Newspaper,
  Orbit,
  Rss,
  Sparkles,
} from "lucide-react";

import { PageHeader } from "../components/layout/PageHeader";
import { FilterBar } from "../components/ui/FilterBar";
import { StoryCard } from "../components/cards/StoryCard";
import { stories } from "../data/stories";

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
  duration = 14,
  reverse = false,
}: {
  className?: string;
  color?: "mint" | "cyan" | "amber";
  duration?: number;
  reverse?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const border =
    color === "cyan"
      ? "border-neon-cyan/25"
      : color === "amber"
        ? "border-neon-amber/25"
        : "border-neon-mint/25";

  const dot =
    color === "cyan"
      ? "bg-neon-cyan shadow-[0_0_14px_rgba(0,240,255,0.8)]"
      : color === "amber"
        ? "bg-neon-amber shadow-[0_0_14px_rgba(255,180,0,0.8)]"
        : "bg-neon-mint shadow-[0_0_14px_rgba(0,255,135,0.8)]";

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border ${border} ${className}`}
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
        className={`absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${dot}`}
      />
    </motion.div>
  );
}

function DecorativeCorner({
  accent = "mint",
}: {
  accent?: "mint" | "cyan" | "amber";
}) {
  const line =
    accent === "cyan"
      ? "border-neon-cyan/30"
      : accent === "amber"
        ? "border-neon-amber/30"
        : "border-neon-mint/30";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 h-16 w-16 overflow-hidden"
    >
      <div
        className={`absolute right-3 top-3 h-7 w-7 rotate-45 border-r border-t ${line}`}
      />
      <div
        className={`absolute right-0 top-0 h-12 w-12 border-l border-b opacity-40 ${line}`}
      />
    </div>
  );
}

function SectionSignal({
  label,
  icon: Icon,
  accent = "mint",
}: {
  label: string;
  icon: typeof Newspaper;
  accent?: "mint" | "cyan" | "amber";
}) {
  const text =
    accent === "cyan"
      ? "text-neon-cyan"
      : accent === "amber"
        ? "text-neon-amber"
        : "text-neon-mint";

  const border =
    accent === "cyan"
      ? "border-neon-cyan/20"
      : accent === "amber"
        ? "border-neon-amber/20"
        : "border-neon-mint/20";

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease }}
      className="mb-8 flex items-center gap-3"
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl border bg-ink-soft/80 backdrop-blur-md ${border} ${text}`}
      >
        <Icon size={16} />
      </div>

      <div className="h-px w-8 bg-line" />

      <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-paper-dim">
        {label}
      </span>

      <motion.span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${text.replace(
          "text-",
          "bg-"
        )}`}
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}

export default function Stories() {
  const [category, setCategory] = useState("All");
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

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(stories.map((s) => s.category)))],
    []
  );

  const featured = stories.filter((s) => s.featured);

  const filtered = stories.filter(
    (s) => category === "All" || s.category === category
  );

  return (
    <main className="relative isolate overflow-hidden bg-ink text-paper selection:bg-neon-mint/30 selection:text-neon-mint">
      {/* Ambient atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-24 h-[38rem] w-[38rem] rounded-full bg-neon-mint/10 blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-14rem] top-[35%] h-[42rem] w-[42rem] rounded-full bg-neon-cyan/10 blur-[160px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] left-[30%] h-[24rem] w-[24rem] rounded-full bg-neon-amber/5 blur-[130px]"
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
            "linear-gradient(to bottom, black 15%, black 55%, transparent 92%)",
        }}
      />

      {/* Fine radial texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 72%)",
        }}
      />

      {/* Floating atmospheric objects */}
      <FloatingOrb className="left-[12%] top-[18rem]" delay={0.2} />
      <FloatingOrb className="right-[18%] top-[25rem]" delay={1.4} duration={7} />
      <FloatingOrb className="left-[38%] top-[42rem]" delay={2.1} duration={8} />
      <FloatingOrb className="right-[8%] top-[58rem]" delay={0.8} duration={7.5} />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[620px] overflow-hidden border-b border-line/60"
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
            {/* Hero status */}
            <FloatingObject
              className="right-[5%] top-12 hidden lg:block"
              delay={0.3}
              duration={8}
            >
              <div className="flex items-center gap-2.5 rounded-full border border-neon-mint/30 bg-ink-soft/80 px-4 py-2 backdrop-blur-xl shadow-[0_0_24px_rgba(0,255,135,0.12)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-mint opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-mint" />
                </span>

                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neon-mint">
                  Editorial & Insights
                </span>
              </div>
            </FloatingObject>

            {/* Geometric hero objects */}
            <FloatingObject
              className="right-[18%] top-28 hidden xl:block"
              delay={0.7}
              duration={9}
            >
              <div className="relative h-20 w-20 rotate-45 rounded-2xl border border-neon-cyan/20 bg-ink-soft/20 backdrop-blur-sm">
                <div className="absolute inset-3 rounded-xl border border-neon-cyan/10" />
                <div className="absolute inset-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan shadow-[0_0_16px_rgba(0,240,255,0.7)]" />
              </div>
            </FloatingObject>

            <OrbitalRing
              className="right-[3%] top-28 hidden h-36 w-36 lg:block"
              color="cyan"
              duration={18}
            />

            <OrbitalRing
              className="left-[-4rem] top-56 hidden h-44 w-44 lg:block"
              color="mint"
              duration={22}
              reverse
            />

            <FloatingObject
              className="left-[2%] top-52 hidden lg:block"
              delay={1}
              duration={7}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-soft/70 text-neon-mint backdrop-blur-md">
                <Sparkles size={17} />
              </div>
            </FloatingObject>

            <PageHeader
              eyebrow="Stories"
              title="MANTRA, in its own words."
              description="Editorial coverage of the ideas, people and community shaping MANTRA, published as it's built, not after the fact."
            />

            {/* Hero signal rail */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease }}
              className="mt-10 grid max-w-3xl grid-cols-3 overflow-hidden rounded-2xl border border-line/60 bg-ink-soft/40 backdrop-blur-xl"
            >
              {[
                ["01", "Ideas"],
                ["02", "People"],
                ["03", "Momentum"],
              ].map(([number, label], i) => (
                <div
                  key={label}
                  className={`relative flex items-center gap-3 px-4 py-4 sm:px-5 ${
                    i !== 2 ? "border-r border-line/60" : ""
                  }`}
                >
                  <span className="text-[9px] font-mono text-neon-mint/70">
                    {number}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-paper-dim">
                    {label}
                  </span>
                  <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-neon-mint/60 sm:block" />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom hero geometry */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-mint/30 to-transparent"
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-2.5rem] left-1/2 h-20 w-20 -translate-x-1/2 rotate-45 border border-neon-mint/10"
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
      </section>

      {/* Featured stories */}
      {featured.length > 0 && (
        <section className="relative overflow-hidden border-b border-line/60 py-16 sm:py-20 md:py-24">
          <FloatingObject
            className="right-[7%] top-20 hidden lg:block"
            delay={0.5}
            duration={8}
          >
            <div className="h-14 w-14 rotate-12 rounded-2xl border border-neon-cyan/20 bg-ink-soft/50 backdrop-blur-md" />
          </FloatingObject>

          <div className="container-mantra relative z-10">
            <SectionSignal
              label="Featured writings"
              icon={Newspaper}
              accent="mint"
            />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.12 }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.12,
                  },
                },
              }}
              className="grid gap-6 lg:grid-cols-2"
            >
              {featured.map((story, i) => (
                <motion.div
                  key={story.slug}
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
                  className="relative"
                >
                  {/* Card atmosphere */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -inset-3 rounded-[2rem] blur-2xl ${
                      i % 2 === 0
                        ? "bg-neon-mint/[0.025]"
                        : "bg-neon-cyan/[0.025]"
                    }`}
                  />

                  <div className="relative overflow-hidden rounded-[1.5rem]">
                    <StoryCard story={story} index={i} featured />

                    {/* Story marker */}
                    <div className="pointer-events-none absolute right-5 top-5 hidden sm:block">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-line/60 bg-ink/70 backdrop-blur-md">
                        <ArrowDownRight
                          size={14}
                          className={
                            i % 2 === 0
                              ? "text-neon-mint"
                              : "text-neon-cyan"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* All stories */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24">
        {/* Section objects */}
        <FloatingObject
          className="right-[4%] top-20 hidden lg:block"
          delay={0.6}
          duration={7}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-neon-cyan backdrop-blur-md">
            <BookOpen size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="left-[4%] bottom-20 hidden lg:block"
          delay={0.9}
          duration={8}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-neon-amber backdrop-blur-md">
            <Rss size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="right-[15%] bottom-12 hidden xl:block"
          delay={1.3}
          duration={10}
        >
          <div className="h-12 w-12 rotate-45 border border-neon-amber/20 bg-ink-soft/30 backdrop-blur-sm" />
        </FloatingObject>

        <div className="container-mantra relative z-10">
          <SectionSignal
            label="Editorial archive"
            icon={BookOpen}
            accent="cyan"
          />

          {/* Filter command panel */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease }}
            className="relative overflow-hidden rounded-2xl border border-line/60 bg-ink-soft/40 p-5 sm:p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.16)]"
          >
            <DecorativeCorner accent="cyan" />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(0,240,255,0.5) 1px, transparent 1px), linear-gradient(rgba(0,255,135,0.35) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-paper-dim">
                    Browse signal
                  </p>
                  <p className="mt-1 text-sm text-paper">
                    Filter the MANTRA editorial archive.
                  </p>
                </div>

                <div className="hidden items-center gap-2 sm:flex">
                  <CircleDot size={14} className="text-neon-cyan" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-paper-dim">
                    {filtered.length}{" "}
                    {filtered.length === 1 ? "story" : "stories"}
                  </span>
                </div>
              </div>

              <FilterBar
                options={categories}
                active={category}
                onChange={setCategory}
              />
            </div>
          </motion.div>

          {/* Story grid */}
          <motion.div
            layout
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((story, i) => (
              <motion.div
                key={story.slug}
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
                  y: -16,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.42,
                  delay: Math.min(i * 0.045, 0.3),
                  ease,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -6,
                        transition: {
                          duration: 0.25,
                          ease,
                        },
                      }
                }
                className="group relative"
              >
                {/* Hover aura */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-2 rounded-[1.5rem] bg-neon-mint/[0.025] opacity-0 blur-xl"
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                        }
                  }
                />

                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <StoryCard story={story} index={i} />

                  {/* Micro UI overlay */}
                  <div className="pointer-events-none absolute left-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-full border border-line/70 bg-ink/80 px-2.5 py-1.5 backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-neon-mint shadow-[0_0_10px_rgba(0,255,135,0.8)]" />
                      <span className="text-[9px] font-mono uppercase tracking-wider text-paper-dim">
                        Read
                      </span>
                    </div>
                  </div>

                  {/* Card corner geometry */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-3 right-3 h-7 w-7 opacity-40"
                  >
                    <div className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-neon-mint/30" />
                    <div className="absolute bottom-0 right-4 h-px w-2 bg-neon-mint/20" />
                    <div className="absolute bottom-4 right-0 h-2 w-px bg-neon-mint/20" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 rounded-2xl border border-line/60 bg-ink-soft/40 px-6 py-16 text-center backdrop-blur-xl"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-neon-cyan/20 bg-ink-soft text-neon-cyan">
                <BookOpen size={19} />
              </div>

              <h3 className="mt-5 text-lg font-medium text-paper">
                No stories in this signal.
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-paper-dim">
                Try another category to explore the wider MANTRA editorial
                archive.
              </p>
            </motion.div>
          )}

          {/* Editorial principle */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease }}
            className="relative mt-14 overflow-hidden rounded-[1.75rem] border border-line/60 bg-ink-soft/35 p-6 sm:p-8 md:p-10 backdrop-blur-xl"
          >
            <DecorativeCorner accent="mint" />

            <OrbitalRing
              className="right-[-2rem] top-[-3rem] h-32 w-32"
              color="mint"
              duration={16}
            />

            <OrbitalRing
              className="bottom-[-4rem] left-[-2rem] h-28 w-28"
              color="amber"
              duration={20}
              reverse
            />

            <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-neon-mint">
                  <Orbit size={15} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em]">
                    Editorial principle
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                  Built in public.{" "}
                  <span className="text-paper-dim">Written with intent.</span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-paper-dim sm:text-base">
                  These stories document the thinking, experiments and people
                  behind MANTRA as the work develops, keeping the signal close
                  to the source.
                </p>
              </div>

              <motion.div
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        rotate: 6,
                        scale: 1.04,
                      }
                }
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-neon-mint/20 bg-ink-soft/70 text-neon-mint shadow-[0_0_30px_rgba(0,255,135,0.08)]"
              >
                <Hexagon size={34} strokeWidth={1.2} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing visual rail */}
      <div
        aria-hidden="true"
        className="relative h-20 overflow-hidden border-t border-line/50"
      >
        <motion.div
          className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-neon-mint/20 to-transparent"
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.35, 0.8, 0.35],
                  scaleX: [0.85, 1, 0.85],
                }
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <FloatingOrb className="left-[18%] top-8" delay={0.2} />
        <FloatingOrb className="left-[50%] top-8" delay={1.2} duration={7} />
        <FloatingOrb className="right-[20%] top-8" delay={2} duration={8} />

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3">
          <span className="h-px w-8 bg-neon-mint/20" />
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-paper-dim">
            End of signal
          </span>
          <span className="h-px w-8 bg-neon-mint/20" />
        </div>
      </div>
    </main>
  );
}