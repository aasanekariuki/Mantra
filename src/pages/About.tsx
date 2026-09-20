import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Shield,
  Compass,
  Zap,
  Layers,
  ArrowUpRight,
  Orbit,
  Target,
} from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ScrollReveal } from "../components/animation/ScrollReveal";
import { CTASection } from "../components/sections/CTASection";

const sections = [
  {
    label: "Why We Exist",
    title: "Men are told to be strong. Rarely are they shown how.",
    body: "African men are navigating enormous economic, social and cultural pressure with very little dedicated infrastructure, no institution built specifically to help them become healthier, more capable and more connected. MANTRA exists to be that institution.",
    icon: Shield,
    accent: "text-neon-mint",
    image: "https://bswh-p-001.sitecorecontenthub.cloud/api/public/content/cfda82dc9127490eb76335d28dc688bd?v=19efbda5",
  },
  {
    label: "What We Believe",
    title: "Wellbeing is built, not declared.",
    body: "We believe men's development happens through repetition, showing up to a Circle, a training, a mentorship session, not through a single campaign or slogan. We believe in evidence over assumption, and community over isolation.",
    icon: Sparkles,
    accent: "text-neon-cyan",
    image: "https://bondeducators.org/wp-content/uploads/2025/01/the-power-of-leadership-mentorship-and-love-in-black-communities-1024x601.jpg",
  },
  {
    label: "What We Are Building",
    title: "An ecosystem, not a single program.",
    body: "MANTRA is building interconnected programs across mental wellbeing, physical health, career development, creative talent, relationships, leadership and opportunity, all rooted in small, consistent communities called Circles.",
    icon: Layers,
    accent: "text-neon-amber",
    image: "https://100bmol.org.uk/wp-content/uploads/2021/04/mentoringWatchingSlide.png",
  },
  {
    label: "Our Values",
    title: "Honesty, evidence, and consistency.",
    body: "We would rather say 'we are building this' than overstate what already exists. We commit to publishing what we learn, including what doesn't work, as MANTRA grows.",
    icon: Zap,
    accent: "text-neon-mint",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_GbtuxwfOYCEUUOQIqTBJhRkiXRDF7GOrCyt_3uwBVHDVc1bv9rAOhYjs&s=10",
  },
  {
    label: "Our Approach",
    title: "Start small, build trust, then scale.",
    body: "MANTRA is starting with a founding chapter and founding Circles in Nairobi, learning directly from that community before expanding programs and chapters elsewhere.",
    icon: Compass,
    accent: "text-neon-cyan",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeMBHwvAFzX4jKmMeBG-XKQH6JV3lchnfv1PgjOZbkk2qWFbCH-XRi4FhL&s=10",
  },
  {
    label: "Our Future",
    title: "A long-term African institution.",
    body: "The ambition is not a single successful initiative, it's a durable institution that generations of African men can belong to, contribute to and build on.",
    icon: Sparkles,
    accent: "text-neon-amber",
    image: "https://img.magnific.com/premium-photo/businessman-portrait-happy-executive-with-arms-crossed-ceo-corporate-manager-entrepreneur-black-man-face-professional-company-employee-with-pride-confidence-vision-business_590464-191850.jpg",
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
        duration: 28,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
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
              y: [0, -18, 0],
              x: [0, 8, 0],
              opacity: [0.35, 0.7, 0.35],
            }
      }
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function SectionDecorations({
  index,
  accent,
}: {
  index: number;
  accent: string;
}) {
  const reduceMotion = useReducedMotion();

  const glow =
    index % 3 === 0
      ? "bg-neon-mint/5"
      : index % 3 === 1
        ? "bg-neon-cyan/5"
        : "bg-neon-amber/5";

  return (
    <>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute ${
          index % 2 === 0 ? "-left-24" : "-right-24"
        } top-1/2 h-80 w-80 -translate-y-1/2 rounded-full ${glow} blur-3xl`}
      />

      <FloatingObject
        className={`${
          index % 2 === 0 ? "right-[4%]" : "left-[4%]"
        } top-14 hidden xl:block`}
        delay={index * 0.35}
        duration={7 + (index % 2)}
      >
        <div
          className={`relative flex h-12 w-12 items-center justify-center rounded-2xl border border-line/80 bg-ink-soft/60 backdrop-blur-xl ${accent}`}
        >
          <span className="absolute inset-2 rounded-xl border border-current/20" />
          <Sparkles size={16} />
        </div>
      </FloatingObject>

      <FloatingObject
        className={`${
          index % 2 === 0 ? "left-[7%]" : "right-[7%]"
        } bottom-16 hidden lg:block`}
        delay={1 + index * 0.2}
        duration={9}
      >
        <div className={`h-2 w-2 rounded-full bg-current ${accent}`} />
      </FloatingObject>

      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute ${
          index % 2 === 0 ? "right-[12%]" : "left-[12%]"
        } top-[18%] hidden h-20 w-20 rotate-45 rounded-2xl border border-line/30 lg:block`}
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: [45, 55, 45],
                y: [0, -10, 0],
              }
        }
        transition={{
          duration: 8,
          delay: index * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative isolate overflow-hidden bg-ink text-paper selection:bg-neon-mint/30 selection:text-neon-mint">
      {/* Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[36rem] w-[36rem] rounded-full bg-neon-mint/10 blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10rem] top-[40%] h-[38rem] w-[38rem] rounded-full bg-neon-cyan/10 blur-[160px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] left-[25%] h-[28rem] w-[28rem] rounded-full bg-neon-amber/5 blur-[150px]"
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
            "linear-gradient(to bottom, black 30%, transparent 90%)",
        }}
      />

      {/* Vertical Rails */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[7%] top-0 hidden h-[55rem] w-px bg-gradient-to-b from-transparent via-line/40 to-transparent lg:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[7%] top-[20rem] hidden h-[45rem] w-px bg-gradient-to-b from-transparent via-line/30 to-transparent lg:block"
      />

      {/* Header / Hero */}
      <section className="relative min-h-[72vh] overflow-hidden pt-8 sm:pt-12 lg:pt-16">
        <FloatingOrb
          className="left-[15%] top-[22%] h-3 w-3 bg-neon-mint shadow-[0_0_28px_rgba(0,255,135,0.8)]"
          delay={0.4}
        />

        <FloatingOrb
          className="right-[16%] top-[34%] h-2 w-2 bg-neon-cyan shadow-[0_0_24px_rgba(0,240,255,0.8)]"
          delay={1.3}
        />

        <FloatingOrb
          className="left-[35%] top-[55%] h-2 w-2 bg-neon-amber shadow-[0_0_20px_rgba(255,190,70,0.6)]"
          delay={2}
        />

        <FloatingObject
          className="right-[8%] top-[12%] hidden lg:block"
          delay={0.3}
          duration={8}
        >
          <div className="flex items-center gap-2.5 rounded-full border border-neon-cyan/30 bg-ink-soft/80 px-4 py-2 backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
            </span>

            <span className="font-mono text-[10px] uppercase tracking-widest text-neon-cyan">
              Our Philosophy
            </span>
          </div>
        </FloatingObject>

        {/* Orbit System */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10rem] top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 lg:block"
        >
          <OrbitalRing className="inset-0" />

          <OrbitalRing
            className="inset-[12%] border-neon-cyan/20"
            delay={1}
            reverse
          />

          <OrbitalRing
            className="inset-[25%] border-neon-mint/20"
            delay={2}
          />

          <motion.div
            className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-neon-cyan shadow-[0_0_24px_rgba(0,240,255,0.8)]"
            animate={
              reduceMotion
                ? undefined
                : {
                    rotate: 360,
                  }
            }
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: "50% 17rem" }}
          />

          <div className="absolute inset-[38%] rounded-full border border-line/80 bg-ink-soft/40 backdrop-blur-md" />
        </div>

        <div className="container-mantra relative z-20">
          <PageHeader
            eyebrow="About MANTRA"
            title="An institution being built for the next generation of men."
            description="Not a campaign. Not a single program. MANTRA is a long-term African institution for men's wellbeing, development, community and opportunity."
          />

          {/* Hero Signals */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-line/80 bg-ink-soft/60 px-3.5 py-2 backdrop-blur-xl">
              <Shield size={13} className="text-neon-mint" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
                Built for men
              </span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-line/80 bg-ink-soft/60 px-3.5 py-2 backdrop-blur-xl">
              <Orbit size={13} className="text-neon-cyan" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
                Built in community
              </span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-line/80 bg-ink-soft/60 px-3.5 py-2 backdrop-blur-xl">
              <Target size={13} className="text-neon-amber" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
                Built for the long term
              </span>
            </div>
          </motion.div>

          {/* Scroll Cue */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-14 flex items-center gap-3 text-mist/60"
          >
            <span className="h-px w-10 bg-line" />

            <span className="font-mono text-[9px] uppercase tracking-[0.22em]">
              Explore the institution
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
              <ArrowUpRight size={13} className="rotate-45" />
            </motion.span>
          </motion.div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink via-ink/50 to-transparent"
        />
      </section>

      {/* Story Sections */}
      <div className="relative">
        {sections.map((section, i) => {
          const Icon = section.icon;

          return (
            <section
              key={section.label}
              className="group/section relative overflow-hidden border-t border-line/60 py-20 sm:py-24 md:py-28 lg:py-32"
            >
              <SectionDecorations
                index={i}
                accent={section.accent}
              />

              {/* Large Background Number */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 select-none font-mono text-[10rem] font-semibold leading-none tracking-[-0.08em] text-paper/[0.018] sm:block md:text-[14rem] lg:text-[18rem] ${
                  i % 2 === 0 ? "right-[-1rem]" : "left-[-1rem]"
                }`}
              >
                0{i + 1}
              </div>

              <div className="container-mantra relative z-20">
                <div
                  className={`grid items-center gap-12 md:grid-cols-2 md:gap-14 lg:gap-20 ${
                    i % 2 === 1
                      ? "md:[&>*:first-child]:order-2"
                      : ""
                  }`}
                >
                  {/* Text Content */}
                  <ScrollReveal delay={0.05}>
                    <div>
                      <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line/80 bg-ink-soft/60 px-3.5 py-2 backdrop-blur-md">
                        <span
                          className={`font-mono text-[10px] font-medium tracking-[0.18em] ${section.accent}`}
                        >
                          0{i + 1}
                        </span>

                        <span className="h-3 w-px bg-line" />

                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist">
                          {section.label}
                        </span>
                      </div>

                      <SectionHeading
                        label=""
                        title={section.title}
                        description={section.body}
                      />

                      <motion.div
                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                                x: 5,
                              }
                        }
                        transition={{
                          duration: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mt-9 flex items-center gap-3 border-t border-line/60 pt-6"
                      >
                        <span
                          className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-ink-soft/80 ${section.accent}`}
                        >
                          <span className="absolute inset-1.5 rounded-lg border border-current/10" />
                          <Icon size={15} />
                        </span>

                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist/60">
                            Core Institution Pillar
                          </p>

                          <p className="mt-1 text-xs text-paper-dim">
                            Consistency creates lasting change.
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </ScrollReveal>

                  {/* Image Block */}
                  <ScrollReveal delay={0.15}>
                    <motion.div
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              y: -7,
                            }
                      }
                      transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="group relative"
                    >
                      {/* Image Glow */}
                      <div
                        aria-hidden="true"
                        className="absolute -inset-5 rounded-[2rem] bg-neon-mint/10 opacity-0 blur-3xl transition duration-700 group-hover:opacity-40"
                      />

                      {/* Rotating Corner Object */}
                      <FloatingObject
                        className="right-[-1.25rem] top-[-1.25rem] hidden sm:block"
                        delay={i * 0.25}
                        duration={7 + (i % 3)}
                      >
                        <div
                          className={`flex h-11 w-11 rotate-12 items-center justify-center rounded-xl border border-line bg-ink-soft/80 backdrop-blur-xl ${section.accent}`}
                        >
                          <span className="h-3 w-3 rounded-full border border-current" />
                        </div>
                      </FloatingObject>

                      {/* Main Frame */}
                      <div
                        aria-hidden="true"
                        className="absolute -inset-1 rounded-[1.7rem] bg-gradient-to-r from-neon-mint/20 via-neon-cyan/10 to-transparent opacity-40 blur-xl transition duration-700 group-hover:opacity-80"
                      />

                      <div className="relative overflow-hidden rounded-[1.5rem] border border-line/80 bg-ink-soft/40 p-2 backdrop-blur-xl shadow-2xl">
                        {/* Interface Header */}
                        <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
                          <div className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-neon-mint/70" />
                            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan/50" />
                            <span className="h-1.5 w-1.5 rounded-full bg-neon-amber/50" />
                          </div>

                          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-mist/50">
                            MANTRA / 0{i + 1}
                          </span>
                        </div>

                        {/* Actual Image */}
                        <div className="group/image relative overflow-hidden rounded-xl">
                          <motion.img
                            src={section.image}
                            alt={section.label}
                            loading={i === 0 ? "eager" : "lazy"}
                            className="aspect-[4/3] w-full rounded-xl object-cover"
                            initial={
                              reduceMotion
                                ? false
                                : {
                                    scale: 1.04,
                                  }
                            }
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
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          />

                          {/* Dark Image Overlay */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10 opacity-70 transition-opacity duration-500 group-hover:opacity-50" />

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
                              delay: i * 0.6,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />

                          {/* Top Image Status */}
                          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-line/70 bg-ink/70 px-2.5 py-1.5 backdrop-blur-md">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                i % 3 === 0
                                  ? "bg-neon-mint"
                                  : i % 3 === 1
                                    ? "bg-neon-cyan"
                                    : "bg-neon-amber"
                              }`}
                            />

                            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-paper/70">
                              Active Principle
                            </span>
                          </div>

                          {/* Corner Button */}
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

                          {/* Bottom Image Information */}
                          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                            <div>
                              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-paper/50">
                                Field Note
                              </p>

                              <p className="mt-1 text-xs text-paper/80">
                                Built through repetition.
                              </p>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <span className="h-1 w-1 rounded-full bg-neon-mint" />
                              <span className="h-1 w-1 rounded-full bg-neon-cyan/70" />
                              <span className="h-1 w-1 rounded-full bg-neon-amber/50" />
                            </div>
                          </div>
                        </div>

                        {/* Image Footer */}
                        <div className="flex items-center justify-between px-3 pb-1 pt-3">
                          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-mist/40">
                            MANTRA SYSTEM
                          </span>

                          <span className="font-mono text-[8px] tracking-[0.15em] text-mist/40">
                            00{i + 1}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
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
          title="Follow MANTRA as it's built."
          description="Read our early Stories, or find a way to get involved before the next chapter launches."
          primaryLabel="Get Involved"
          primaryTo="/get-involved"
          secondaryLabel="Read Stories"
          secondaryTo="/stories"
        />
      </section>

      {/* Bottom Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-neon-mint/30 to-transparent"
      />
    </main>
  );
}